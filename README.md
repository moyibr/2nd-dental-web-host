# Dental Clinic Website Template

A mobile-first, config-driven React (Vite) + Tailwind CSS template for dental
clinic websites, plus a small standalone Express API for the appointment
form. Built to be reused across clients: **one JSON config file + one image
folder = a new client site.** No component (`.jsx`) files should ever need
to change to onboard a new clinic.

---

## Architecture

```
config/
  clinic.config.json           ← single source of truth for THIS client's content/branding
  clinic.config.template.json  ← blank starting point for the NEXT client
  README.md                    ← field-by-field docs for every config key

public/
  images/client/                ← every swappable image (logo, hero, team, gallery photos)
  robots.txt, sitemap.xml       ← auto-generated at build time from config.seo.siteUrl

src/
  config.js                     ← loads clinic.config.json; the ONLY file that imports it directly
  theme/                        ← font allow-list + CSS-variable/font injection
  layouts/, components/, pages/ ← pure UI, entirely prop/config-driven, zero hardcoded client content

server/                         ← standalone Express API for the appointment form
                                   (own package.json — deployed separately from the static frontend)

scripts/inject-meta.mjs         ← prebuild step: stamps index.html/robots.txt/sitemap.xml from config
```

**Rule of thumb:** if you're editing a `.jsx` file to change what a client's
site *says* (their name, colors, services, prices, doctors, hours...),
that content belongs in `config/clinic.config.json` instead — see
[`config/README.md`](config/README.md) for the full field reference.

---

## Quickstart (local development)

This is two apps: the static frontend (Vite) and the appointments API
(`server/`, plain Node/Express). Run both.

```bash
# 1. Frontend
npm install
cp .env.example .env          # VITE_API_URL — defaults to http://localhost:4000/api
npm run dev                   # http://localhost:5173

# 2. Backend (separate terminal)
cd server
npm install
cp .env.example .env          # SMTP is optional locally — see below
npm run dev                   # http://localhost:4000
```

Submitting the appointment form with no SMTP configured still works end to
end — the backend logs a safe, no-PII "would have emailed ___" line instead
of failing, so you can test the full flow without real email credentials.
Fill in `server/.env`'s `SMTP_*` values to actually send notification
emails.

## Production build

```bash
npm run build     # runs scripts/inject-meta.mjs first, then vite build → dist/
npm run preview   # serve the production build locally to sanity-check it
```

Before building for a real client, make sure `config/clinic.config.json`'s
`seo.siteUrl` is set to their real domain — it's used to stamp the canonical
URL, Open Graph tags, and `sitemap.xml`.

Deploy `dist/` (static hosting — Netlify, Vercel, S3/CloudFront, any static
host) and `server/` (any Node host — Render, Railway, a small VPS) as two
separate deployments. Point the frontend's `VITE_API_URL` at wherever the
backend ends up living, and the backend's `CORS_ORIGIN` at wherever the
frontend ends up living.

---

## Onboarding a new client

See [`ONBOARDING_CHECKLIST.md`](ONBOARDING_CHECKLIST.md) for the full
step-by-step. Short version:

1. Copy `config/clinic.config.template.json` → `config/clinic.config.json` and fill it in (see `config/README.md` for every field).
2. Drop their images into `public/images/client/`.
3. `npm run dev`, eyeball it, toggle `featureFlags` as needed.
4. `npm run build`, deploy `dist/` + `server/`.

---

## Security notes

- No secrets ever live in the frontend — `VITE_API_URL` is the only
  frontend env var, and it's a URL, not a credential.
- The appointment form's `service` field is validated against an
  allow-list read directly from `config/clinic.config.json` — arbitrary
  text can never reach that field.
- `server/middleware/validate.js` re-validates and sanitizes every field
  server-side, independent of the client-side checks.
- `server/middleware/honeypot.js` + `server/middleware/rateLimit.js` guard
  against basic bots/abuse.
- The backend never logs the raw appointment payload (name/email/phone/
  message) — see `server/routes/appointments.js` and `server/mailer.js`.
- All credentials live in `.env` files; the root `.gitignore`'s `.env*`
  pattern covers them anywhere in the repo (including `server/.env`) — only
  the blank `.env.example` files are committed.

## Development Commands

**Frontend** (project root): `npm run dev`, `npm run build`, `npm run preview`

**Backend** (`server/`): `npm run dev` (auto-restart), `npm start`
