import { config } from '../utils/config.js';

export interface Chunk {
  id:       string;
  text:     string;
  source:   string;
  metadata: Record<string, string>;
}

/**
 * Splits text into overlapping chunks by sentence boundaries
 * to avoid cutting mid-thought.
 */
export function chunkText(
  text:   string,
  source: string,
  metadata: Record<string, string> = {},
  chunkSize    = config.chunkSize,
  chunkOverlap = config.chunkOverlap,
): Chunk[] {
  const sentences = text
    .replace(/\r\n/g, '\n')
    .split(/(?<=[.?!])\s+/)
    .filter(s => s.trim().length > 0);

  const chunks: Chunk[] = [];
  let buffer   = '';
  let chunkIdx = 0;

  for (const sentence of sentences) {
    if ((buffer + ' ' + sentence).length > chunkSize && buffer.length > 0) {
      chunks.push({
        id:       `${source}::${chunkIdx++}`,
        text:     buffer.trim(),
        source,
        metadata: { ...metadata, chunkIndex: String(chunkIdx) },
      });
      // Keep overlap: retain last N chars of buffer
      buffer = buffer.slice(-chunkOverlap) + ' ' + sentence;
    } else {
      buffer = buffer ? buffer + ' ' + sentence : sentence;
    }
  }

  if (buffer.trim().length > 0) {
    chunks.push({
      id:       `${source}::${chunkIdx}`,
      text:     buffer.trim(),
      source,
      metadata: { ...metadata, chunkIndex: String(chunkIdx) },
    });
  }

  return chunks;
}
