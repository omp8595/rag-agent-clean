import { bm25Search } from './bm25Index.js';
import { vectorSearch } from './vectorStore.js';
import { config } from '../utils/config.js';

export interface SearchResult {
  id:     string;
  text:   string;
  score:  number;
  source: string;
  method: 'bm25' | 'vector' | 'both';
}

/**
 * Reciprocal Rank Fusion.
 * k=60 is the standard default — dampens hyper-ranked outliers.
 */
function rrf(
  bm25Hits:   Array<{ id: string; text: string; score: number; source: string }>,
  vectorHits: Array<{ id: string; text: string; score: number; source: string }>,
  k = 60,
): SearchResult[] {
  const scores  = new Map<string, number>();
  const methods = new Map<string, Set<'bm25' | 'vector'>>();
  const docData = new Map<string, { text: string; source: string }>();

  function addHits(
    hits:   Array<{ id: string; text: string; score: number; source: string }>,
    method: 'bm25' | 'vector',
  ) {
    hits.forEach((hit, rank) => {
      scores.set(hit.id, (scores.get(hit.id) ?? 0) + 1 / (k + rank + 1));
      if (!methods.has(hit.id)) methods.set(hit.id, new Set());
      methods.get(hit.id)!.add(method);
      docData.set(hit.id, { text: hit.text, source: hit.source });
    });
  }

  addHits(bm25Hits,   'bm25');
  addHits(vectorHits, 'vector');

  return [...scores.entries()]
    .sort(([, a], [, b]) => b - a)
    .map(([id, score]) => {
      const m = methods.get(id)!;
      return {
        id,
        score,
        source: docData.get(id)!.source,
        text:   docData.get(id)!.text,
        method: m.has('bm25') && m.has('vector') ? 'both'
              : m.has('bm25')                    ? 'bm25'
              :                                    'vector',
      };
    });
}

export async function hybridSearch(
  query: string,
  topK  = config.topK,
): Promise<SearchResult[]> {
  // Run both in parallel
  const [bm25Hits, vectorHits] = await Promise.all([
    Promise.resolve(bm25Search(query, topK)),
    vectorSearch(query, topK),
  ]);

  return rrf(bm25Hits, vectorHits).slice(0, topK);
}

/**
 * Format retrieved chunks into a context block for the LLM prompt.
 */
export function buildContext(results: SearchResult[]): string {
  return results
    .map((r, i) =>
      `[${i + 1}] Source: ${r.source}\n${r.text}`
    )
    .join('\n\n---\n\n');
}
