# Dental Clinic Website Template

A mobile-first, config-driven React (Vite) + Tailwind CSS template for dental
clinic websites, plus a small standalone Express API for the appointment
form. Built to be reused across clients: **one JSON config file + one image
folder = a new client site.** No application code should ever need to
change to onboard a new clinic.

---

## Project Structure

```
dental-clinic/
├── frontend/     ← the website (React + Vite). Everything a visitor sees.
├── backend/      ← the appointment API (Express). Nothing else.
├── config/       ← shared client data (see below). NOT frontend or backend code.
├── mo-yakub-portfolio/  ← standalone Next.js portfolio site. Unrelated to the
│                          template: its own app, deps and deploy. See its README.
├── README.md, ONBOARDING_CHECKLIST.md, CLIENT_INTAKE_CHECKLIST.md
```

**What is frontend?** [`/frontend`](frontend) — the public website: every
React component, page, layout, and static asset (images, logo). Its own
`package.json`, its own `node_modules`, deployed as a static site (Netlify,
Vercel, S3, any static host).

**What is backend?** [`/backend`](backend) — the appointment API only. A
small standalone Express app with its own `package.json`. It has no UI, no
routes, and no code shared with the frontend beyond reading the same config
file (see below). Deployed separately (Render, Railway, a VPS, etc.), on a
different host/process than the frontend.

**Where is the API?** `POST /backend/routes/appointments.js` is the only
API endpoint that does anything (`GET /health` also exists, for uptime
checks). The frontend calls it via `VITE_API_URL` — see
[`frontend/src/components/AppointmentForm.jsx`](frontend/src/components/AppointmentForm.jsx).

**Is there an admin panel?** Not currently — there's no CMS/login/dashboard
in this project. "Administering" a client's site today means editing
`config/clinic.config.json` directly (see the next section) and redeploying
— that's a deliberate choice to avoid building a whole authenticated
admin app for a template that's reused by copying the repo, not by
multi-tenant login. If a future client specifically needs a real in-browser
admin UI (non-technical staff editing content without a developer), that's
a scoped, separate `/admin` app to build on top of this — don't bolt it on
ad hoc.

**Where do I change client information?** [`config/clinic.config.json`](config/clinic.config.json)
— and nowhere else. See below.

---

## Why `/config` is shared, not inside `/frontend`

`/config/clinic.config.json` holds every piece of client-specific content
(business info, branding, contact, hours, services, team, testimonials,
pricing, SEO, feature flags — the full list is in
[`config/README.md`](config/README.md)). It sits at the repo root, as a
sibling of `/frontend` and `/backend`, rather than inside either one,
because **both** apps read it independently:

- `frontend/src/config.js` imports it to render the site.
- `backend/middleware/validate.js` reads it to build the appointment
  form's service allow-list (so `service` can never carry arbitrary text).
- `backend/mailer.js` reads it for the clinic's notification email address.

Duplicating the file into both `/frontend` and `/backend` would mean two
places to edit per client and a real risk of them drifting out of sync —
worse for the actual goal here (one clear place to change client data).
One shared, read-only data file is not the same thing as sharing
components/routes/logic between the two apps — that separation is still
completely intact. Nothing in `/frontend` imports from `/backend` or vice
versa.

---

## Quickstart (local development)

Three independent pieces: the frontend (Vite), the backend (Express API),
and the shared config. Run frontend + backend in two terminals.

```bash
# 1. Frontend
cd frontend
npm install
cp .env.example .env          # VITE_API_URL — defaults to http://localhost:4000/api
npm run dev                   # http://localhost:5173

# 2. Backend (separate terminal)
cd backend
npm install
cp .env.example .env          # SMTP is optional locally — see below
npm run dev                   # http://localhost:4000
```

Submitting the appointment form with no SMTP configured still works end to
end — the backend logs a safe, no-PII "would have emailed ___" line instead
of failing, so you can test the full flow without real email credentials.
Fill in `backend/.env`'s `SMTP_*` values to actually send notification
emails.

## Production build

```bash
cd frontend
npm run build     # runs scripts/inject-meta.mjs first, then vite build → frontend/dist/
npm run preview   # serve the production build locally to sanity-check it
```

Before building for a real client, make sure `config/clinic.config.json`'s
`seo.siteUrl` is set to their real domain — it's used to stamp the canonical
URL, Open Graph tags, and `sitemap.xml`.

Deploy `frontend/dist/` (static hosting) and `/backend` (any Node host) as
two separate deployments. Point the frontend's `VITE_API_URL` at wherever
the backend ends up living, and the backend's `CORS_ORIGIN` at wherever the
frontend ends up living.

### Deploying to Vercel

Both `/frontend` and `/backend` deploy to Vercel as **two separate
projects** from the same GitHub repo — same "completely separate" split as
the folders themselves, just extended to hosting:

- **Frontend project** — Root Directory: `frontend`. Vercel auto-detects
  Vite; no other settings needed. Set env var `VITE_API_URL` to the
  backend project's URL + `/api` (e.g. `https://your-backend.vercel.app/api`),
  then redeploy (Vite bakes env vars in at build time, so a plain restart
  isn't enough — trigger a new deployment after changing it).
- **Backend project** — Root Directory: `backend`. `backend/api/index.js` +
  `backend/vercel.json` adapt the Express app to Vercel's serverless
  functions (the app itself, its routes, and all its middleware are
  unchanged — `backend/index.js` with `app.listen()` still works exactly
  the same for any other Node host). Set env vars `CORS_ORIGIN` (the
  frontend project's URL), `SMTP_*`, `NOTIFY_EMAIL`, and the
  `RATE_LIMIT_*` pair in the Vercel dashboard — never in a committed file.

One caveat worth knowing: `backend/middleware/rateLimit.js` uses an
in-memory store, which resets on cold start and isn't shared across
serverless instances — it still meaningfully slows down a bot hammering
the endpoint from one region/instance, but it's not as strict a guarantee
as on a persistent server. Fine for a single clinic's traffic; worth
revisiting (e.g. a Redis-backed limiter) if a client's form ever sees real
abuse.

---

## Onboarding a new client

See [`CLIENT_INTAKE_CHECKLIST.md`](CLIENT_INTAKE_CHECKLIST.md) for what to
collect from the client, and [`ONBOARDING_CHECKLIST.md`](ONBOARDING_CHECKLIST.md)
for the build → deploy steps once you have it. Short version:

1. Copy `config/clinic.config.template.json` → `config/clinic.config.json` and fill it in (see `config/README.md` for every field).
2. Drop their images into `frontend/public/images/{clinic,doctors,gallery}/`.
3. `cd frontend && npm run dev`, eyeball it, toggle `featureFlags` as needed.
4. `npm run build`, deploy `frontend/dist/` + `/backend` separately.

Nothing in `frontend/src/` or `backend/` should need to change for a new
client — if you find yourself editing a `.jsx` or route file to change what
a site *says*, that content is missing from the config shape. Fix the
config shape (and `config/README.md`), not the component.

---

## Security notes

- No secrets ever live in the frontend — `VITE_API_URL` is the only
  frontend env var, and it's a URL, not a credential.
- The appointment form's `service` field is validated against an
  allow-list read directly from `config/clinic.config.json` — arbitrary
  text can never reach that field.
- `backend/middleware/validate.js` re-validates and sanitizes every field
  server-side, independent of the client-side checks.
- `backend/middleware/honeypot.js` + `backend/middleware/rateLimit.js`
  guard against basic bots/abuse.
- The backend never logs the raw appointment payload (name/email/phone/
  message) — see `backend/routes/appointments.js` and `backend/mailer.js`.
- All credentials live in `.env` files; the root `.gitignore`'s `.env*`
  pattern covers them anywhere in the repo (including `backend/.env`) —
  only the blank `.env.example` files are committed.

## Development Commands

**Frontend** (`frontend/`): `npm run dev`, `npm run build`, `npm run preview`

**Backend** (`backend/`): `npm run dev` (auto-restart), `npm start`
