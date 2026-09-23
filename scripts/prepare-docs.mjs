import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

// Publish only generated documentation, excluding source and local configuration.
const entries = ['index.html', '404.html', 'assets', 'algorithms', 'pipeline', 'reference', 'contributing', 'search', 'sitemap.xml', 'sitemap.xml.gz'];
const root = path.resolve('site');
await rm(root, { recursive: true, force: true });
await mkdir(root, { recursive: true });
for (const entry of entries) await cp(entry, path.join(root, entry), { recursive: true });
