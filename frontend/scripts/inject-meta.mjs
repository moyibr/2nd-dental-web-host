#!/usr/bin/env node
// frontend/scripts/inject-meta.mjs
// -----------------------------------------------------------------------------
// Prebuild step (wired into `npm run build`). Stamps index.html, public/robots.txt,
// and public/sitemap.xml from /config/clinic.config.json — so a new client never
// requires hand-editing any of those three files, only the config.
// -----------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendRoot = path.resolve(__dirname, '..');       // /frontend — where index.html/public/ live
const monorepoRoot = path.resolve(__dirname, '../..');    // repo root — where /config lives (shared with /backend)

const config = JSON.parse(fs.readFileSync(path.join(monorepoRoot, 'config/clinic.config.json'), 'utf-8'));
const { business, contact, hours, seo, trust } = config;

function escapeHtml(str = '') {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function buildJsonLd() {
    const address = contact.address || {};
    const openingHoursSpecification = (hours || [])
        .filter((d) => !d.closed)
        .map((d) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${d.day}`, opens: d.open, closes: d.close }));

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Dentist',
        name: business.name,
        image: business.ogImage || business.logo,
        url: seo.siteUrl || undefined,
        telephone: contact.phoneDial,
        address: {
            '@type': 'PostalAddress',
            streetAddress: [address.line1, address.line2].filter(Boolean).join(', '),
            addressLocality: address.city,
            addressRegion: address.state,
            postalCode: address.postalCode,
            addressCountry: address.country,
        },
        openingHoursSpecification,
        priceRange: business.currency ? `${business.currency}${business.currency}` : undefined,
    };

    if (contact.geo?.lat && contact.geo?.lng) {
        schema.geo = { '@type': 'GeoCoordinates', latitude: contact.geo.lat, longitude: contact.geo.lng };
    }
    if (trust?.rating && trust?.reviewCount) {
        schema.aggregateRating = { '@type': 'AggregateRating', ratingValue: String(trust.rating), reviewCount: String(trust.reviewCount) };
    }
    return schema;
}

function buildHeadBlock() {
    const keywords = (seo.keywords || []).join(', ');
    const lines = [
        `<title>${escapeHtml(seo.title || business.name)}</title>`,
        `<meta name="description" content="${escapeHtml(seo.description)}" />`,
        keywords && `<meta name="keywords" content="${escapeHtml(keywords)}" />`,
        `<meta name="author" content="${escapeHtml(business.name)}" />`,
        seo.siteUrl && `<link rel="canonical" href="${escapeHtml(seo.siteUrl)}" />`,
        `<meta property="og:type" content="business.business" />`,
        `<meta property="og:title" content="${escapeHtml(seo.title || business.name)}" />`,
        `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
        business.ogImage && `<meta property="og:image" content="${escapeHtml(business.ogImage)}" />`,
        seo.siteUrl && `<meta property="og:url" content="${escapeHtml(seo.siteUrl)}" />`,
        `<meta property="og:locale" content="en_IN" />`,
        `<script type="application/ld+json">${JSON.stringify(buildJsonLd())}</script>`,
    ].filter(Boolean);
    return lines.map((l) => `    ${l}`).join('\n');
}

function stampIndexHtml() {
    const indexPath = path.join(frontendRoot, 'index.html');
    const html = fs.readFileSync(indexPath, 'utf-8');
    const startMarker = '<!--SEO_HEAD_START-->';
    const endMarker = '<!--SEO_HEAD_END-->';
    const startIdx = html.indexOf(startMarker);
    const endIdx = html.indexOf(endMarker);
    if (startIdx === -1 || endIdx === -1) {
        throw new Error(`index.html is missing ${startMarker}/${endMarker} markers — cannot stamp SEO meta.`);
    }
    const before = html.slice(0, startIdx + startMarker.length);
    const after = html.slice(endIdx);
    const stamped = `${before}\n${buildHeadBlock()}\n    ${after}`;
    fs.writeFileSync(indexPath, stamped);
    console.log('[inject-meta] Stamped index.html from config/clinic.config.json');
}

function writeRobotsTxt() {
    const siteUrl = seo.siteUrl || '';
    const content = [
        'User-agent: *',
        'Allow: /',
        siteUrl && `Sitemap: ${siteUrl.replace(/\/$/, '')}/sitemap.xml`,
    ].filter(Boolean).join('\n') + '\n';
    fs.writeFileSync(path.join(frontendRoot, 'public/robots.txt'), content);
    console.log('[inject-meta] Wrote public/robots.txt');
}

function writeSitemapXml() {
    const siteUrl = (seo.siteUrl || '').replace(/\/$/, '');
    if (!siteUrl) {
        console.warn('[inject-meta] seo.siteUrl is empty — skipping sitemap.xml (set it in config/clinic.config.json before deploying).');
        return;
    }
    // This is a single-page site: one canonical URL, not one entry per in-page
    // anchor (fragment identifiers aren't separate pages and shouldn't be
    // listed as such in a sitemap).
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeHtml(siteUrl)}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
    fs.writeFileSync(path.join(frontendRoot, 'public/sitemap.xml'), xml);
    console.log('[inject-meta] Wrote public/sitemap.xml');
}

stampIndexHtml();
writeRobotsTxt();
writeSitemapXml();
