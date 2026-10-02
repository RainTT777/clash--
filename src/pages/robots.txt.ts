import type { APIRoute } from 'astro';

const getRobotsTxt = (siteURL: URL, sitemapURL: URL) => `User-agent: *
Allow: /
Disallow: /404

Sitemap: ${sitemapURL.href}
Host: ${siteURL.host}`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  return new Response(getRobotsTxt(site, sitemapURL), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
