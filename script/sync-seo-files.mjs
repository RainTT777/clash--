import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');

for (const fileName of ['robots.txt', 'sitemap.xml']) {
  copyFileSync(resolve(projectRoot, fileName), resolve(projectRoot, 'public', fileName));
}

console.log('Synced robots.txt and sitemap.xml to public');
