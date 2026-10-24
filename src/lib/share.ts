// Share links carry the spec inside the URL fragment (never sent to a server): gzip + base64url.
export type Shared = { k: 'project' | 'hackathon'; d: unknown };

const toB64 = (b: Uint8Array) => btoa(String.fromCharCode(...b)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromB64 = (s: string) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));

async function pipe(bytes: Uint8Array, stream: CompressionStream | DecompressionStream) {
  const out = new Blob([bytes as BlobPart]).stream().pipeThrough(stream);
  return new Uint8Array(await new Response(out).arrayBuffer());
}

export async function encodeShare(v: Shared): Promise<string> {
  return toB64(await pipe(new TextEncoder().encode(JSON.stringify(v)), new CompressionStream('gzip')));
}

export async function decodeShare(s: string): Promise<Shared> {
  const v = JSON.parse(new TextDecoder().decode(await pipe(fromB64(s), new DecompressionStream('gzip'))));
  if ((v?.k !== 'project' && v?.k !== 'hackathon') || !v.d) throw new Error('Invalid share link');
  return v;
}
