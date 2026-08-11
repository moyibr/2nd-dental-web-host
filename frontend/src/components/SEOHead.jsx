// SEOHead — Sets <title>/meta/canonical/Open Graph and injects Dentist JSON-LD,
// entirely from clinic.config.json. Renders nothing; it only manages <head>.
//
// Note: this covers the client-rendered case (and keeps things correct if
// clinic.config.json changes without re-running the build). For crawlers
// that don't execute JS, `npm run build` also runs scripts/inject-meta.mjs
// to stamp the same values into the static index.html.
import { useEffect } from 'react';
import { config } from '../config.js';

function setMetaTag(attr, key, content) {
    if (!content) return;
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

function buildJsonLd() {
    const { business, contact, hours, seo, trust } = config;
    const address = contact.address || {};

    const openingHoursSpecification = (hours || [])
        .filter((d) => !d.closed)
        .map((d) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: `https://schema.org/${d.day}`,
            opens: d.open,
            closes: d.close,
        }));

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
        schema.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: String(trust.rating),
            reviewCount: String(trust.reviewCount),
        };
    }

    return schema;
}

export default function SEOHead() {
    useEffect(() => {
        const { business, seo } = config;

        document.title = seo.title || business.name;
        setMetaTag('name', 'description', seo.description);
        if (seo.keywords?.length) setMetaTag('name', 'keywords', seo.keywords.join(', '));
        setMetaTag('name', 'author', business.name);

        // Canonical
        if (seo.siteUrl) {
            let canonical = document.head.querySelector('link[rel="canonical"]');
            if (!canonical) {
                canonical = document.createElement('link');
                canonical.setAttribute('rel', 'canonical');
                document.head.appendChild(canonical);
            }
            canonical.setAttribute('href', seo.siteUrl);
        }

        // Open Graph
        setMetaTag('property', 'og:type', 'business.business');
        setMetaTag('property', 'og:title', seo.title || business.name);
        setMetaTag('property', 'og:description', seo.description);
        setMetaTag('property', 'og:image', business.ogImage);
        setMetaTag('property', 'og:url', seo.siteUrl);
        setMetaTag('property', 'og:locale', 'en_IN');

        // JSON-LD — replace any existing tag rather than duplicating it
        const existing = document.getElementById('ld-json-dentist');
        if (existing) existing.remove();
        const script = document.createElement('script');
        script.id = 'ld-json-dentist';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(buildJsonLd());
        document.head.appendChild(script);
    }, []);

    return null;
}
