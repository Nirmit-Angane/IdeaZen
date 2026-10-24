'use client';
// All saved data lives in the browser under one versioned key. No accounts, no server storage.
import { useSyncExternalStore } from 'react';
import type { GeneratedProject, UserInputs } from './types';
import type { HackathonRoadmap, HackathonInputs } from './hackathon-types';

export type Status = 'planned' | 'building' | 'shipped';
export type SavedRecord =
  | { id: string; kind: 'project'; title: string; createdAt: number; status: Status; data: GeneratedProject; inputs: UserInputs }
  | { id: string; kind: 'hackathon'; title: string; createdAt: number; status: Status; data: HackathonRoadmap; inputs: HackathonInputs };

export interface Store {
  records: SavedRecord[];
  progress: Record<string, string[]>; // record id -> completed task keys
}

const KEY = 'ideazen:v1';
const EVENT = 'ideazen:store';
const EMPTY: Store = { records: [], progress: {} };

let rawCache: string | null | undefined;
let valCache: Store = EMPTY;
let migrated = false;

/** Pre-redesign builds saved each project under `ideazen_output_<id>`; fold them into the new store once. */
function migrateLegacy() {
  migrated = true;
  try {
    const legacy: SavedRecord[] = [];
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith('ideazen_output_')) keys.push(k);
    }
    if (!keys.length) return;
    for (const k of keys) {
      const p = JSON.parse(localStorage.getItem(k) || 'null');
      if (!p?.title) continue;
      const score = Number(p.difficultyScore) || 5;
      legacy.push({
        id: k.replace('ideazen_output_', ''), kind: 'project', title: p.title, createdAt: Date.now(), status: 'planned',
        data: p, inputs: { skillLevel: score < 4 ? 'beginner' : score < 7 ? 'intermediate' : 'advanced' },
      });
    }
    const current: Store = JSON.parse(localStorage.getItem(KEY) || 'null') || EMPTY;
    const have = new Set(current.records.map((r) => r.id));
    const next = { ...current, records: [...current.records, ...legacy.filter((r) => !have.has(r.id))] };
    localStorage.setItem(KEY, JSON.stringify(next));
    keys.forEach((k) => localStorage.removeItem(k));
  } catch { /* storage unavailable: nothing to migrate */ }
}

function read(): Store {
  try {
    if (!migrated) migrateLegacy();
    const raw = localStorage.getItem(KEY);
    if (raw === rawCache) return valCache;
    rawCache = raw;
    valCache = raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    valCache = EMPTY;
  }
  return valCache;
}

function write(s: Store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch { /* quota or private mode: changes stay in memory only until reload */ }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener('storage', cb);
  };
}

/** Returns null on the server and during hydration, so callers can render a neutral state first. */
export function useStore(): Store | null {
  return useSyncExternalStore(subscribe, read, () => null);
}

export const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

export function saveRecord(r: Omit<SavedRecord, 'id' | 'createdAt' | 'status'> & { id?: string }): string {
  const s = read();
  const id = r.id ?? newId();
  const rec = { ...r, id, createdAt: Date.now(), status: 'planned' } as SavedRecord;
  write({ ...s, records: [rec, ...s.records.filter((x) => x.id !== id)] });
  return id;
}

export function deleteRecord(id: string) {
  const s = read();
  const { [id]: _drop, ...progress } = s.progress;
  write({ records: s.records.filter((r) => r.id !== id), progress });
}

export function setStatus(id: string, status: Status) {
  const s = read();
  write({ ...s, records: s.records.map((r) => (r.id === id ? { ...r, status } : r)) });
}

export function toggleTask(id: string, key: string) {
  const s = read();
  const cur = new Set(s.progress[id] ?? []);
  cur.has(key) ? cur.delete(key) : cur.add(key);
  write({ ...s, progress: { ...s.progress, [id]: [...cur] } });
}

export function exportAll(): string {
  return JSON.stringify(read(), null, 2);
}

/** Merges a backup file into the store. Returns the number of records added. */
export function importAll(json: string): number {
  const incoming = JSON.parse(json) as Store;
  if (!Array.isArray(incoming?.records)) throw new Error('Not an IdeaZen backup file.');
  const s = read();
  const have = new Set(s.records.map((r) => r.id));
  const added = incoming.records.filter((r) => r?.id && r?.title && !have.has(r.id));
  write({ records: [...s.records, ...added], progress: { ...incoming.progress, ...s.progress } });
  return added.length;
}
