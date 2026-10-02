import fs from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';
const ids=['clash-shadowrocket-demo','dns-troubleshooting','iepl-line-review','singbox-guide','clash-verge-guide','shadowrocket-guide','shadowrocket-deep-guide','clash-deep-guide','airport-coupon-codes'];
const covers={
  'clash-shadowrocket-demo':'./public/assets/images/home-banner.webp',
  'dns-troubleshooting':'./public/assets/images/dns-troubleshooting-banner.svg',
  'iepl-line-review':'./public/assets/images/recommend-banner.png',
  'singbox-guide':'./public/assets/images/singbox-banner.svg',
  'clash-verge-guide':'./public/assets/images/clash-banner.png',
  'shadowrocket-guide':'./public/assets/images/shadowrocket-banner.png',
  'shadowrocket-deep-guide':'./public/assets/images/shadowrocket-banner.png',
  'clash-deep-guide':'./public/assets/images/clash-banner.png',
  'airport-coupon-codes':'./public/assets/images/airport-coupon-banner.svg'
};
const airportRecommendationLink='<a href="javascript:void(0)" data-internal-article="clash-shadowrocket-demo" onclick="openArticleDetail(\'2026 高速稳定机场推荐与 Clash / Shadowrocket 节点配置教程\', \'机场推荐\', \'2026-09-23\', \'clash-shadowrocket-demo\'); return false;">查看站内机场推荐文章</a>';
const ieplRecommendationLink='<a href="javascript:void(0)" data-internal-article="iepl-line-review" onclick="openArticleDetail(\'2026 高性价比机场推荐 稳定 | 全球优质 BGP / IEPL 专线选购指南\', \'机场推荐\', \'2026-09-28\', \'iepl-line-review\'); return false;">查看更多站内机场评测</a>';
const defaultActions='<div class="article-footer-actions"><a href="https://shadowrrocket.com.cn/tutorial" target="_blank" rel="noopener noreferrer">查看小火箭官方使用教程</a><a href="https://shadowrrocket.com.cn/download.html" target="_blank" rel="noopener noreferrer">前往小火箭官方下载页面</a></div>';
const actionsById={
  'clash-deep-guide':`<div class="article-footer-actions"><a href="https://github.com/clashbk/clash" target="_blank" rel="noopener noreferrer">前往 Clash 官方项目</a>${airportRecommendationLink}</div>`,
  'singbox-guide':`<div class="article-footer-actions">${airportRecommendationLink}</div>`,
  'dns-troubleshooting':`<div class="article-footer-actions">${airportRecommendationLink}</div>`,
  'clash-shadowrocket-demo':`<div class="article-footer-actions">${ieplRecommendationLink}</div>`
};
const out={};
for(const id of ids){
  const $=load(fs.readFileSync(path.join('dist','article',id,'index.html'),'utf8'));
  const article=$('article.vh-article-main').clone();
  const content=article.children('main').first().length ? article.children('main').first() : article;
  content.find('header,.article-copyright,.vh-comment,.comment,.prev-next-article,.article-prev-next,footer,script,.tag-list,.loading,.loader,.spinner').remove();
  content.find('svg').remove();
  content.find('p').each((_,element)=>{
    const paragraph=$(element);
    const text=paragraph.text().trim();
    if(text.startsWith(':::btn')) paragraph.remove();
  });
  content.find('img').each((_,element)=>{
    const image=$(element);
    const realSource=image.attr('data-vh-lz-src') || image.attr('data-src') || image.attr('data-lazy-src');
    if(realSource) image.attr('src',realSource);
    image.attr('loading','lazy');
    image.removeAttr('width').removeAttr('height').removeAttr('style');
    image.removeAttr('data-vh-lz-src').removeAttr('data-src').removeAttr('data-lazy-src');
    image.removeClass('lazy vh-lazy');
  });
  content.addClass('article-rendered');
  content.find('h2').each((_,element)=>{
    const heading=$(element);
    if(!/目录索引|quick navigation/i.test(heading.text())) return;
    const list=heading.nextAll('ul,ol').first();
    if(!list.length) return;
    heading.prev('hr').remove();
    list.next('hr').remove();
    heading.addClass('article-toc-title');
    list.addClass('article-toc-list');
    heading.add(list).wrapAll('<nav class="article-toc" aria-label="文章目录"></nav>');
    list.find('a[href^="#"]').removeAttr('target').removeAttr('rel');
  });
  content.find('table').each((_,element)=>{
    const table=$(element);
    if(!table.parent().hasClass('article-table-scroll')) table.wrap('<div class="article-table-scroll"></div>');
  });
  const coverAsset=covers[id].replace('./public','');
  const hasCover=content.find('img').toArray().some((element)=>{
    const source=$(element).attr('src') || '';
    return source.endsWith(coverAsset);
  });
  const hero=id==='iepl-line-review' || hasCover ? '' : `<div class="article-hero"><img src="${covers[id]}" alt="${id} 文章封面" loading="eager"></div>`;
  const actions=id==='iepl-line-review' ? '' : (actionsById[id] || defaultActions);
  out[id]=hero+(content.html()||'').replaceAll('src="/assets/','src="./public/assets/')+actions;
}
const generated=`window.__ARTICLE_CONTENT__=${JSON.stringify(out)};\n`;
fs.writeFileSync(path.join('public','article-content.js'),generated,'utf8');
if(fs.existsSync('dist')) fs.writeFileSync(path.join('dist','article-content.js'),generated,'utf8');
console.log(`Synced ${ids.length} full articles`);
