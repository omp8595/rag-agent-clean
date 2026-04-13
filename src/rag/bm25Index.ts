import winkBM25 from 'wink-bm25-text-search';
import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';
import type { Chunk } from '../ingestion/chunker.js';
import { config } from '../utils/config.js';

const nlp = winkNLP(model);
const its = nlp.its;

function tokenize(text: string): string[] {
  const doc = nlp.readDoc(text.toLowerCase());
  return doc.tokens()
    .filter((t: any) => t.out(its.type) === 'word')
    .out() as string[];
}

let _engine: any = null;
const _docMap = new Map<string, Chunk>();
const _allChunks: Chunk[] = [];

function buildEngine(chunks: Chunk[]) {
  const engine = winkBM25();
  engine.defineConfig({ fldWeights: { text: 1 } });
  engine.definePrepTasks([tokenize]);
  for (const chunk of chunks) {
    engine.addDoc({ text: chunk.text }, chunk.id);
  }
  engine.consolidate();
  return engine;
}

export function indexChunks(chunks: Chunk[]): void {
  for (const chunk of chunks) {
    _docMap.set(chunk.id, chunk);
    _allChunks.push(chunk);
  }
  _engine = buildEngine(_allChunks);
}

export function bm25Search(
  query: string,
  topK = config.topK,
): Array<{ id: string; text: string; score: number; source: string }> {
  if (!_engine || _docMap.size === 0) return [];
  const raw: Array<[string, number]> = _engine.search(query, topK);
  return raw
    .filter(([id]) => _docMap.has(id))
    .map(([id, score]) => {
      const chunk = _docMap.get(id)!;
      return { id: chunk.id, text: chunk.text, score, source: chunk.source };
    });
}

export function getBM25DocCount(): number {
  return _docMap.size;
}