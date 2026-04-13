import { readdir, readFile } from 'fs/promises';
import { extname, basename, join } from 'path';
import { chunkText } from './chunker.js';
import { upsertChunks } from '../rag/vectorStore.js';
import { indexChunks } from '../rag/bm25Index.js';

const SUPPORTED_EXTS = new Set(['.txt', '.md', '.pdf']);

async function extractPdfText(fp) {
  const pj = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const buf = await readFile(fp);
  const doc = await pj.getDocument({ data: new Uint8Array(buf) }).promise;
  let text = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const pg = await doc.getPage(i);
    const ct = await pg.getTextContent();
    text += ct.items.map(x => x.str).join(' ') + '\n';
  }
  return { text, pages: doc.numPages };
}

export async function ingestDirectory(dirPath) {
  const files = await readdir(dirPath);
  const supported = files.filter(f => SUPPORTED_EXTS.has(extname(f).toLowerCase()));
  console.log('Found ' + supported.length + ' files in ' + dirPath);
  let totalChunks = 0;
  for (const filename of supported) {
    const fp = join(dirPath, filename);
    const source = basename(filename);
    let text = '';
    if (extname(filename).toLowerCase() === '.pdf') {
      const r = await extractPdfText(fp);
      text = r.text;
      console.log('  ' + source + ' -> ' + r.pages + ' pages');
    } else {
      text = await readFile(fp, 'utf-8');
    }
    const chunks = chunkText(text, source, { filename });
    console.log('  ' + source + ' -> ' + chunks.length + ' chunks');
    indexChunks(chunks);
    await upsertChunks(chunks);
    totalChunks += chunks.length;
  }
  console.log('Ingestion complete: ' + totalChunks + ' chunks.');
  return totalChunks;
}

export async function ingestText(text, source, metadata = {}) {
  const chunks = chunkText(text, source, metadata);
  indexChunks(chunks);
  await upsertChunks(chunks);
  return chunks.length;
}