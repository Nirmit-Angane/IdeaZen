/**
 * Mock localStorage utilities for testing
 */

export class LocalStorageMock {
  private store: Record<string, string> = {};

  clear() {
    this.store = {};
  }

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  get length() {
    return Object.keys(this.store).length;
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
}

/**
 * Setup localStorage mock for tests
 */
export function setupLocalStorageMock() {
  const localStorageMock = new LocalStorageMock();
  global.localStorage = localStorageMock as any;
  return localStorageMock;
}

/**
 * Restore original localStorage
 */
export function restoreLocalStorage() {
  // In jsdom, localStorage is already available
  // This function is here for completeness
}

/**
 * Helper to populate localStorage with test data
 */
export function populateLocalStorage(data: Record<string, any>) {
  Object.entries(data).forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value));
  });
}

/**
 * Helper to clear all localStorage data
 */
export function clearLocalStorage() {
  localStorage.clear();
}
