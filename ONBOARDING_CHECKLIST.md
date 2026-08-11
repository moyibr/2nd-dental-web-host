# New Client Onboarding Checklist

Follow this top to bottom for every new dental clinic client. Nothing here
should require editing a `.jsx` file — if you find yourself needing to,
something's missing from the config shape (fix that instead, so the next
client doesn't hit the same wall).

## 1. Set up the config

- [ ] `cp config/clinic.config.template.json config/clinic.config.json`
- [ ] Fill in **every** field — use [`config/README.md`](config/README.md) as
      the field-by-field reference while you go.
- [ ] Double-check `contact.phoneDial` and `contact.whatsappNumber` are
      correct — these silently break `tel:`/`wa.me` links if wrong, with no
      error to warn you.
- [ ] Get a real `contact.mapEmbedUrl` from Google Maps → Share → Embed a
      map (copy the `src="..."` value), not a guessed URL.
- [ ] Set `seo.siteUrl` to the client's **real domain** (no trailing slash).
      This drives canonical URLs, Open Graph tags, and `sitemap.xml` — easy
      to forget since nothing breaks visibly if it's wrong, it just quietly
      hurts SEO/social sharing.
- [ ] Set `business.currency` to match the client's market (₹, $, £, ...).
- [ ] Pick `theme.font` from the allow-list in `src/theme/fonts.js` — don't
      paste an arbitrary Google Fonts URL into the config.

## 2. Content honesty checks

- [ ] **Team**: only include real staff. If you don't have names yet, use
      role titles (`"Lead Dentist"`) — never invent a person.
- [ ] **Testimonials**: only real reviews/quotes you have permission to
      publish. Unattributed quotes → `"name": "Verified Patient"`, not a
      made-up name.
- [ ] **`trust.rating` / `trust.reviewCount`**: must match the clinic's
      actual Google Business Profile — this renders as a public claim.
- [ ] **`featureFlags.showBeforeAfter`**: leave `false` unless you have real,
      consented before/after patient photos. Never enable it with stock
      images.
- [ ] **Pricing**: confirm with the client whether to show real prices,
      "starting from" placeholders (keep `pricing.note` visible either way),
      or disable the section entirely (`featureFlags.showPricing: false`).

## 3. Images

- [ ] Replace everything in `public/images/client/`: `logo.svg`,
      `favicon.svg`, `og-image.jpg` (1200×630), plus `hero/`, `doctors/`,
      `gallery/` as referenced in the config.
- [ ] Keep files reasonably small (hero ≤ ~300KB, others ≤ ~150KB) — there's
      no automatic image optimization pipeline.
- [ ] For the hero, supply both `imageMobile` (portrait, ~900×1100) and
      `imageDesktop` (wide, ~1600×800) per slide.
- [ ] Update any config fields still pointing at placeholder Unsplash URLs.

## 4. Feature flags

Go through every flag in `config/clinic.config.json` → `featureFlags` and
decide deliberately (don't just leave the template defaults):
`showPricing`, `showBlog`, `showBeforeAfter`, `showGallery`,
`showInsurance`, `showFAQ`, `showTestimonials`, `enableOnlineBooking`.

- [ ] If a section is disabled, remove its entry from `navigation[]` too
      (so the menu doesn't link to a hidden section).

## 5. Backend (`server/`)

- [ ] `cd server && npm install`
- [ ] `cp .env.example .env` and fill in:
  - [ ] `CORS_ORIGIN` — the frontend's real production URL
  - [ ] `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM`
        — real credentials for sending notification emails
  - [ ] `NOTIFY_EMAIL` — where appointment requests should land (defaults to
        `config.contact.email` if left blank)
- [ ] Deploy `server/` to a Node host (Render, Railway, a VPS, etc.) — it's
      a separate deployment from the frontend.
- [ ] Set the frontend's `VITE_API_URL` (in `.env`, and in whatever env-var
      UI your static host uses for the production build) to the deployed
      backend's URL + `/api`.

## 6. Pre-launch checks

- [ ] `npm run dev` — click through every nav link, submit the appointment
      form end to end (with the backend running), confirm the map loads.
- [ ] Resize to ~360px, ~768px, ~1024px, ~1440px — check for horizontal
      scroll and that the sticky mobile Call/WhatsApp/Book bar behaves.
- [ ] `npm run build` — confirm it completes without errors, and check the
      generated `dist/index.html` has the client's real title/description
      (not the placeholder), plus `public/robots.txt` and
      `public/sitemap.xml` point at the real domain.
- [ ] Test the `tel:` and `wa.me` links on an actual phone if possible.
- [ ] Verify the JSON-LD (view page source → the `application/ld+json`
      script tag, or paste the live URL into Google's Rich Results Test)
      has the correct name/address/phone/hours.
- [ ] Confirm `.env` files were **not** committed (`git status` should show
      none) — only `.env.example` files should be in the repo.

## 7. Post-launch

- [ ] Submit the site to Google Search Console and submit `sitemap.xml`.
- [ ] Verify the Google Business Profile listing matches the site's NAP
      (Name, Address, Phone) exactly — mismatches hurt local SEO.
- [ ] Confirm the client actually receives a test appointment-request email
      in their real inbox, not just spam-checked in dev.
