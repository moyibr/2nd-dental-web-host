# Demo Handoff — Advanced Dental Lounge (Sales Demo)

This site is currently a **sales demo**, built to show dental clinic
owners/doctors what a finished, professional website for their practice could
look like. Everything visible on it right now — the clinic name, doctor
photos, testimonials, services, pricing — is **demo content**, not a real
client's data. This document is the map for turning it into a real client's
site: where demo content lives, what's already client-agnostic by
architecture, and exactly what to touch (and never touch) when onboarding a
new clinic.

If you only read one other file, read [`config/README.md`](config/README.md)
— it's the field-by-field reference for the config file this document keeps
pointing at. This file is the shorter "where do I click" map; that one is the
detailed dictionary.

---

## 1. The one-sentence architecture

**One JSON file (`config/clinic.config.json`) + one image folder
(`frontend/public/images/`) = the entire client-specific surface of this
project.** Nothing else needs to change to onboard a new clinic. This was
verified during this audit by reading every component in `frontend/src` —
none of them hardcode client content; they all read it from config.

```
2nd-dental-web-host/
├── frontend/    the website (React + Vite + Tailwind) — deploy as a static site
├── backend/     the appointment-form API (Express) — deploy separately, any Node host
├── config/      clinic.config.json — THE FILE. Shared by both apps.
```

---

## 2. Where demo content lives (and how it's separated from real client data)

| Content type | File / location |
|---|---|
| **Everything text/data** (clinic name, doctors, services, testimonials, FAQs, pricing, hours, contact, SEO, theme colors) | `config/clinic.config.json` |
| **Blank template** to start a real client from | `config/clinic.config.template.json` — copy this, don't edit the live demo config in place |
| **Field-by-field reference** for every value in the config | `config/README.md` |
| **All images** (logo, favicon, hero photos, doctor photos, gallery photos, social-share image) | `frontend/public/images/{clinic,doctors,gallery}/` |
| **Application code** (never edit per client) | `frontend/src/**`, `backend/**` |

This separation is structural, not just a convention: `frontend/src/config.js`
is the *only* file in the codebase that imports `clinic.config.json`, and it
validates required fields on every dev-mode load (missing fields log a
console error immediately, so a broken onboarding edit is caught early, not
discovered in front of a client).

### How the current demo content is marked as demo, not real
This is not a hypothetical "figure it out later" file — the current config
already mixes two honest categories, and the intake/onboarding docs
(`CLIENT_INTAKE_CHECKLIST.md`) explicitly document which is which:
- **Real data**: the Google Business Profile info for the actual Prayagraj
  clinic this demo is modeled on (address, phone pattern, rating/review
  count, real-style Google reviews).
- **Honest placeholders where real specifics weren't available**: doctor
  entries use generic role titles (`"Lead Dentist"`, `"Orthodontist"`, etc.)
  instead of invented names, two testimonials use `"Verified Patient"`
  instead of a fabricated name, and `registrationNumber` (dental council
  registration) is left blank for all four doctors — a real client's actual
  registration number goes there, never a guessed one.

**When you take this to a real client**: don't edit `clinic.config.json` in
place and lose track of what's demo vs. real. Follow §5 below — copy the
template fresh per client.

---

## 3. Replacing each piece (quick index)

Everything below is a `config/clinic.config.json` field edit unless noted.
Full detail for every field: [`config/README.md`](config/README.md).

**Clinic**
- Name, tagline, logo, favicon, currency → `business.*`
- Address, city, phone, WhatsApp, email, hours, map → `contact.*`, `hours[]`
- Social links → `socials.*` (blank string hides that icon automatically)

**Doctor(s)**
- Name, qualification, specialization, bio, photo, socials → one entry per
  doctor in `team[]`
- **If you don't have a real name yet, use a role title** (`"Lead Dentist"`)
  — never invent a person's name. This is what the current demo already
  does.

**Services**
- Name, description, optional price/duration → `services[]`

**Content**
- About section, FAQs, testimonials, CTA banner text → `about`, `faq[]`,
  `testimonials[]`, `ctaBanner`
- **Testimonials**: only real reviews you have permission to publish. No
  name attached → `"name": "Verified Patient"`, not a made-up name.

**SEO**
- Title, description, keywords, real domain → `seo.*` (set `seo.siteUrl`
  correctly before the final build — it drives canonical URLs, Open Graph,
  and `sitemap.xml`)

**Images**
- Drop the file in `frontend/public/images/{clinic,doctors,gallery}/`, then
  point to it by path in the matching config field. See §4.

None of this requires touching a single `.jsx` file. If a real client's
requirement genuinely can't be expressed through the config as it exists
today, that's a signal to extend the config shape (and document it in
`config/README.md`), not to hardcode something in a component.

---

## 4. Replacing images

| Slot | Folder | Points to it from config |
|---|---|---|
| Logo | `frontend/public/images/clinic/logo.svg` | `business.logo` |
| Favicon | `frontend/public/images/clinic/favicon.svg` | `business.favicon` |
| Social share image (1200×630) | `frontend/public/images/clinic/og-image.jpg` | `business.ogImage` |
| Hero slides (mobile + desktop crop, per slide) | `frontend/public/images/clinic/hero-*.jpg` | `hero.slides[].imageMobile` / `.imageDesktop` |
| About/clinic photo | `frontend/public/images/clinic/about-clinic.jpg` | `about.image` |
| CTA banner background | `frontend/public/images/clinic/cta-banner.jpg` | `ctaBanner.image` |
| Doctor photos (one per team member) | `frontend/public/images/doctors/` | `team[].photo` |
| Facility/gallery photos | `frontend/public/images/gallery/` | `gallery[].image` |

**Rule, no exceptions**: every image must be a local file under
`frontend/public/images/`, referenced by a `/images/...` path — never a
hotlinked `https://...` URL, even temporarily. This was actually violated
once in this repo's own demo blog content (three Unsplash URLs) and was
fixed during this pass by pointing those slots at existing local demo
photos instead — see §8.

Keep files reasonably sized: hero images ≤ ~300KB, everything else
≤ ~150KB. There's no automatic image-optimization pipeline in this project
— oversized uploads directly slow the site down.

---

## 5. Starting a new client from this demo

```bash
cp config/clinic.config.template.json config/clinic.config.json
```
Then fill in every field using `config/README.md` as the reference, replace
the images per §4, and go through `ONBOARDING_CHECKLIST.md` top to bottom
(config → content honesty checks → images → feature flags → backend env
vars → pre-launch checks → post-launch). `CLIENT_INTAKE_CHECKLIST.md` is
what to actually ask the client for before you start.

**Don't hand-edit the live demo config for a real client** — copy the
template fresh each time, so the demo (this repo's current state) stays
intact as a reusable sales asset for the *next* prospect too.

---

## 6. Backend, admin, environment variables

**Backend**: exists, and it's real — `backend/` is a small Express API with
exactly one working endpoint, `POST /api/appointments` (plus `GET /health`).
Pipeline: rate-limit → spam honeypot → server-side validation (independent
of the client-side checks) → email notification via `nodemailer`. No
database, no auth, no other routes — verified by reading `backend/app.js`
and `backend/routes/appointments.js` directly.

**Admin panel**: does not exist, deliberately. "Administering" a client's
site today means editing `config/clinic.config.json` and redeploying — see
`README.md` for the reasoning. Build a real `/admin` app only if a specific
client's non-technical staff need to self-edit content, or if appointment
volume outgrows "read the notification email."

**Database**: does not exist. Appointment requests are validated then
emailed to the clinic — nothing is written to disk. If SMTP delivery fails,
the request is lost (the patient does see an error message telling them to
call instead, so it's not a silent failure for them, but the clinic has no
record to recover from).

**Environment variables** — copy the `.env.example` in each app, never
commit the real `.env`:
- `frontend/.env` → `VITE_API_URL` (where the backend lives). The only
  frontend env var; it's a URL, not a secret.
- `backend/.env` → `PORT`, `CORS_ORIGIN` (must match the frontend's real
  origin exactly), `SMTP_HOST`/`PORT`/`SECURE`/`USER`/`PASS`/`FROM`,
  `NOTIFY_EMAIL`, `RATE_LIMIT_WINDOW_MINUTES`/`RATE_LIMIT_MAX_REQUESTS`.

---

## 7. Deployment

Frontend and backend deploy **separately** — a static host for the built
frontend, any Node host for the backend.

```bash
# Frontend
cd frontend && npm run build     # → frontend/dist/
# Backend — any Node host, or Vercel (backend/api/index.js is already
# wired for Vercel's serverless functions — see backend/vercel.json)
cd backend && npm start
```

After both are live: set the frontend's `VITE_API_URL` to the backend's URL
+ `/api` and rebuild/redeploy (Vite bakes env vars in at build time — a
restart alone won't pick up a changed value), and set the backend's
`CORS_ORIGIN` to the frontend's real URL. Full walkthrough, including the
Vercel two-project setup: `README.md` → "Deploying to Vercel".

---

## 8. What changed in this pass (audit + fixes)

This demo was already in strong shape going into this pass — see
[`AUDIT.md`](AUDIT.md) for the full inspection. What actually changed:

1. **Fixed a real bug found while testing the appointment form live**: after
   a successful submission, the "Appointment Requested!" confirmation
   message was rendering at `opacity: 0` — permanently invisible. A patient
   submitting the form would see the form disappear and... nothing. The
   request *was* being received and processed correctly by the backend
   (verified via a real end-to-end submission during this pass); only the
   on-screen confirmation was broken. Root cause: the confirmation panel
   reused the same scroll-reveal `ref` as the form it replaces, but the
   scroll-reveal hook only attaches its visibility observer once per
   component mount, so it never observed the freshly swapped-in confirmation
   element. Fixed in `frontend/src/components/AppointmentForm.jsx` by not
   applying the scroll-reveal animation to that panel — it doesn't need one,
   since it appears in a section the visitor is already looking at, not
   something they scroll down to.
2. **Fixed the mobile navbar clinic-name truncation**: `"Advanced Dental
   Lounge"` was being cut off to `"Advanced Dental Lo…"` on mobile widths
   even though there was ample room — an arbitrary `45vw` cap was narrower
   than necessary. Fixed in `frontend/src/layouts/Navbar.jsx` by letting the
   name use the actual available flex space instead. Verified at 320/390/
   768px.
3. **Fixed the hotlinked blog images**: three demo blog posts pointed at
   external Unsplash URLs, which the project's own documentation explicitly
   forbids (and which already broke once before, per `config/README.md`).
   Repointed to existing local demo photos (`config/clinic.config.json` →
   `blog[]`). Low visible impact today since the blog section is disabled
   by default (`featureFlags.showBlog: false`), but it removes a landmine
   for whenever it's turned on for a client.
4. **Filled in blank doctor qualifications**: all four team members had an
   empty `qualification` field, which the UI correctly hid (no broken
   layout) but left the team section without one of the strongest trust
   signals for a dental site specifically. Filled with standard, generic
   Indian dental postgraduate qualifications (`"BDS, MDS"` and specialty
   variants) — consistent with the existing generic role titles, not tied
   to any real individual.
5. **Fixed 1 dependency vulnerability**: `npm audit` in `frontend/` found
   one high-severity transitive issue (`nanoid`); `npm audit fix` resolved
   it with no code changes. `backend/` had zero vulnerabilities.

### What was verified but intentionally left alone
- `npm run build` in `frontend/` completes cleanly with no errors.
- No horizontal overflow at 320/390/768/1440px (checked in a real browser,
  not just by reading the CSS).
- The appointment form was tested against the real running backend
  end-to-end (not mocked) — submission, server-side validation, and the
  (now-fixed) confirmation state all verified live.
- The rest of the UI (services grid, team, pricing, FAQ, mobile menu, sticky
  mobile action bar) was visually reviewed at multiple breakpoints and is
  already at a professional, "ready to demo" standard — nothing else was
  redesigned, per the instruction not to touch sections that already work
  well.

### Explicitly not done in this pass (see `AUDIT.md` §22 for why)
No database, no admin panel, no authentication, no legal/privacy pages, no
analytics, and no CI/test suite were added — none of them are required for
this project's actual scope today, and adding them speculatively would be
exactly the kind of unnecessary complexity this brief asked to avoid. They're
documented as future decisions in `AUDIT.md`, not silently skipped.

---

## 9. Before showing this to a prospect — quick checklist

- [ ] `cd frontend && npm install && npm run build` — confirm it still
      builds clean (it does, as of this handoff).
- [ ] `npm run preview` and click through every section + the mobile menu.
- [ ] If demoing the booking form live, run the backend too (`cd backend &&
      npm install && cp .env.example .env && npm run dev`) so a real
      submission actually works end-to-end in front of the prospect.
- [ ] Resize to ~360/768/1024/1440px once — the audit in this pass didn't
      find layout breaks, but it's cheap insurance before a live demo.
