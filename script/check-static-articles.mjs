import fs from 'node:fs';
import vm from 'node:vm';
import { load } from 'cheerio';

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync('public/article-content.js', 'utf8'), sandbox);
const articles = sandbox.window.__ARTICLE_CONTENT__;
const clientGuideIds = new Set(['clash-verge-rev-guide','v2rayn-guide','hiddify-guide','sing-box-desktop-guide','clash-meta-android-guide','v2rayng-guide','hiddify-android-guide','sing-box-android-guide','clash-mi-guide','shadowrocket-complete-guide','stash-guide','quantumult-x-guide','surge-guide','openclash-guide','passwall-guide','sing-box-core-guide']);
let failures = 0;

for (const [id, html] of Object.entries(articles)) {
  const $ = load(html);
  const images = $('img').map((_, el) => $(el).attr('src')).get();
  const missingImages = images.filter((src) => {
    if (!src?.startsWith('./public/')) return false;
    return !fs.existsSync(src.replace('./public/', 'public/'));
  });
  const footerLinks = $('.article-footer-actions a').map((_, el) => $(el).attr('href')).get();
  const internalTargets = $('.article-footer-actions a[data-internal-article]').map((_, el) => $(el).attr('data-internal-article')).get();
  const expectedFooters = {
    'iepl-line-review': { links: [], targets: [] },
    'clash-deep-guide': { links: ['https://github.com/clashbk/clash', 'javascript:void(0)'], targets: ['clash-shadowrocket-demo'] },
    'singbox-guide': { links: ['javascript:void(0)'], targets: ['clash-shadowrocket-demo'] },
    'dns-troubleshooting': { links: ['javascript:void(0)'], targets: ['clash-shadowrocket-demo'] },
    'clash-shadowrocket-demo': { links: ['javascript:void(0)'], targets: ['iepl-line-review'] },
    'ai-tools-guide': { links: ['https://chatgpt.com/', 'https://claude.ai/'], targets: [] },
  };
  const defaultFooter = {
    links: ['https://shadowrrocket.com.cn/tutorial', 'https://shadowrrocket.com.cn/download.html'],
    targets: [],
  };
  const expectedFooter = clientGuideIds.has(id) ? { links: [], targets: [] } : (expectedFooters[id] || defaultFooter);
  const result = {
    id,
    svgCount: $('svg').length,
    rawButtonSyntax: $.text().includes(':::btn'),
    images,
    missingImages,
    footerLinks,
    internalTargets,
    placeholderImages: images.filter((src) => src?.includes('lazy-loading')),
    unwrappedTables: $('table').filter((_, el) => !$(el).parent().hasClass('article-table-scroll')).length,
    duplicateImages: images.filter((src, index) => src && images.indexOf(src) !== index),
    unstyledToc: $('h2').filter((_, el) => /目录索引|quick navigation/i.test($(el).text()) && !$(el).closest('.article-toc').length).length,
  };
  console.log(JSON.stringify(result));
  if (
    result.svgCount !== 0 ||
    result.rawButtonSyntax ||
    result.missingImages.length !== 0 ||
    result.placeholderImages.length !== 0 ||
    result.unwrappedTables !== 0 ||
    result.duplicateImages.length !== 0 ||
    result.unstyledToc !== 0 ||
    JSON.stringify(result.footerLinks) !== JSON.stringify(expectedFooter.links) ||
    JSON.stringify(result.internalTargets) !== JSON.stringify(expectedFooter.targets)
  ) failures += 1;
}

if (!fs.existsSync('dist/article-content.js')) {
  console.error('dist/article-content.js is missing');
  failures += 1;
}

if (failures) {
  console.error(`Article validation failed for ${failures} item(s).`);
  process.exit(1);
}

console.log(`Validated ${Object.keys(articles).length} articles.`);
