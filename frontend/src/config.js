// frontend/src/config.js
// -----------------------------------------------------------------------------
// CONFIG LOADER
// -----------------------------------------------------------------------------
// The ONLY file that should ever import `/config/clinic.config.json` directly.
// Every component imports `config` (or the named helpers) from here instead —
// this keeps the raw JSON shape in one place and gives us a spot to validate
// it and compute small derived values (tel:/wa.me links, font resolution,
// feature-flag lookups) without repeating that logic across components.
//
// Note: /config lives at the REPO ROOT (a sibling of /frontend and /backend),
// not inside /frontend — it's shared client data, not frontend code. The
// backend reads the same file independently (server/middleware/validate.js,
// server/mailer.js) to build its service allow-list and notification email.
// This is the one deliberate exception to "frontend and backend don't share
// files": one shared *data* source beats two configs that can drift apart.
//
// To onboard a new client: edit `/config/clinic.config.json` (start from
// `/config/clinic.config.template.json`). Nothing in this file should ever
// need to change per client.
// -----------------------------------------------------------------------------

import rawConfig from '../../config/clinic.config.json';
import { resolveFont } from './theme/fonts.js';

// Fields a client config must have for the site to render sensibly. Missing
// fields fail loudly in dev (console.error) rather than silently rendering
// "undefined" across the site — catches onboarding mistakes early.
const REQUIRED_TOP_LEVEL_KEYS = [
    'business', 'theme', 'contact', 'hours', 'seo', 'featureFlags',
    'hero', 'services', 'about', 'navigation', 'footer',
];

function validateConfig(cfg) {
    const missing = REQUIRED_TOP_LEVEL_KEYS.filter((key) => !cfg[key]);
    if (missing.length > 0) {
        // eslint-disable-next-line no-console
        console.error(
            `[clinic.config.json] Missing required top-level key(s): ${missing.join(', ')}. ` +
            'The site will likely render incorrectly until these are added. See config/README.md.'
        );
    }
    if (!cfg.business?.name) {
        // eslint-disable-next-line no-console
        console.error('[clinic.config.json] business.name is required.');
    }
    if (!Array.isArray(cfg.hours) || cfg.hours.length !== 7) {
        // eslint-disable-next-line no-console
        console.warn('[clinic.config.json] hours[] should contain exactly 7 entries (one per day).');
    }
}

if (import.meta.env.DEV) {
    validateConfig(rawConfig);
}

export const config = rawConfig;

// ── Derived helpers ─────────────────────────────────────────────────────────

/** tel: link for the clinic's dial number. */
export function telLink() {
    return `tel:${config.contact.phoneDial}`;
}

/** wa.me link, pre-filled with the configured message. Returns null if no WhatsApp number is set. */
export function waLink(customMessage) {
    const number = config.contact.whatsappNumber;
    if (!number) return null;
    const message = customMessage || config.contact.whatsappPresetMessage || '';
    return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

/** mailto: link for the clinic's email. */
export function mailLink() {
    return config.contact.email ? `mailto:${config.contact.email}` : null;
}

/** Reads a boolean feature flag; defaults to false for flags that aren't present. */
export function isEnabled(flagName) {
    return Boolean(config.featureFlags?.[flagName]);
}

/** Resolves the configured theme font key to { family, url } via the allow-list. */
export function getFont() {
    return resolveFont(config.theme?.font);
}

/** Formats a single hours[] entry as "10:00 AM – 8:00 PM" / "Closed". */
export function formatHoursRange(entry) {
    if (!entry || entry.closed) return 'Closed';
    return `${formatTime(entry.open)} – ${formatTime(entry.close)}`;
}

function formatTime(value) {
    if (!value) return '';
    const [h, m] = value.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

/** Short "Mon – Sat" style summary line used in the TopBar/footer. */
export function summarizeHours() {
    const open = config.hours.filter((d) => !d.closed);
    if (open.length === 0) return 'Closed';
    const first = open[0].day.slice(0, 3);
    const last = open[open.length - 1].day.slice(0, 3);
    const sameHoursAllDays = open.every((d) => d.open === open[0].open && d.close === open[0].close);
    const range = sameHoursAllDays ? formatHoursRange(open[0]) : 'Varies by day';
    return `${first} – ${last} · ${range}`;
}

/** Full postal address as a single display string. */
export function formatAddress() {
    const a = config.contact.address;
    if (!a) return '';
    return [a.line1, a.line2, `${a.city}, ${a.state} ${a.postalCode}`].filter(Boolean).join(', ');
}
