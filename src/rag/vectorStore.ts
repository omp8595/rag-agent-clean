import { config } from '../utils/config.js';
import type { Chunk } from '../ingestion/chunker.js';

// ── Simple in-memory vector store (no server needed) ─────────────────────────

interface StoredDoc {
  id:       string;
  text:     string;
  source:   string;
  vector:   number[];
  metadata: Record<string, string>;
}

const store: StoredDoc[] = [];

// Deterministic embedding — good enough for local dev + BM25 handles keywords
function embed(text: string, dims = 384): number[] {
  const vec = new Array(dims).fill(0);
  for (let i = 0; i < text.length; i++) {
    vec[i % dims] += text.charCodeAt(i) / 1000;
  }
  const norm = Math.sqrt(vec.reduce((s, v) => s + v * v, 0)) || 1;
  return vec.map(v => v / norm);
}

function cosineSim(a: number[], b: number[]): number {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na  += a[i] * a[i];
    nb  += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
}

export async function upsertChunks(chunks: Chunk[]): Promise<void> {
  for (const chunk of chunks) {
    const existing = store.findIndex(d => d.id === chunk.id);
    const doc: StoredDoc = {
      id:       chunk.id,
      text:     chunk.text,
      source:   chunk.source,
      vector:   embed(chunk.text),
      metadata: chunk.metadata,
    };
    if (existing >= 0) store[existing] = doc;
    else store.push(doc);
  }
}

export async function vectorSearch(
  query: string,
  topK  = config.topK,
): Promise<Array<{ id: string; text: string; score: number; source: string }>> {
  if (store.length === 0) return [];
  const qVec = embed(query);
  return store
    .map(doc => ({ id: doc.id, text: doc.text, source: doc.source, score: cosineSim(qVec, doc.vector) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

export async function getCollectionCount(): Promise<number> {
  return store.length;
}
