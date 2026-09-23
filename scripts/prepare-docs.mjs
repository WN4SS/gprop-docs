import { cp, mkdir, readdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';

// Only these generated MkDocs artifacts can ever be served by the app.
const entries = ['index.html', '404.html', 'assets', 'algorithms', 'pipeline', 'reference', 'contributing', 'search', 'sitemap.xml', 'sitemap.xml.gz'];
const root = path.resolve('private-docs');
await rm(root, { recursive: true, force: true });
await mkdir(root, { recursive: true });
for (const entry of entries) await cp(entry, path.join(root, entry), { recursive: true });
async function walk(dir, prefix = '') {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const name = prefix + entry.name;
    if (entry.isDirectory()) result.push(...await walk(path.join(dir, entry.name), name + '/'));
    else if (entry.isFile()) result.push(name);
  }
  return result;
}
await writeFile(path.join(root, 'manifest.json'), JSON.stringify(await walk(root).then(names => names.filter(n => n !== 'manifest.json'))));
