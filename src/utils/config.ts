import 'dotenv/config';

function require_env(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required env var: ${key}`);
  return val;
}

export const config = {
  anthropicApiKey: require_env('ANTHROPIC_API_KEY'),
  claudeModel:     process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-5',

  chromaUrl:       process.env.CHROMA_URL ?? '',       // empty = in-memory
  chromaCollection: 'rag_docs',

  port:            parseInt(process.env.PORT ?? '3000'),
  nodeEnv:         process.env.NODE_ENV ?? 'development',

  chunkSize:       parseInt(process.env.CHUNK_SIZE    ?? '400'),
  chunkOverlap:    parseInt(process.env.CHUNK_OVERLAP ?? '80'),
  topK:            parseInt(process.env.TOP_K         ?? '8'),
  bm25Weight:      parseFloat(process.env.BM25_WEIGHT   ?? '0.4'),
  vectorWeight:    parseFloat(process.env.VECTOR_WEIGHT ?? '0.6'),
} as const;
