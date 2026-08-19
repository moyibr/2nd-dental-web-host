# Freelancer Guide — Plain-Language Reference

This one's written for you, not for another developer. If you just need to
get a client's website running, customized, and deployed, this is the only
file you should need to keep open. (There's a more technical `README.md` and
`config/README.md` too, for when you want the deeper "why" — you don't need
them for day-to-day client work.)

---

## 1. How to run the project (see it on your own computer)

You need two things running at once: the website itself, and the small
service that handles the "Book Appointment" form. Open **two terminal
windows**.

**Terminal 1 — the website:**
```bash
cd frontend
npm install        # only needed the first time, or after updating the template
npm run dev
```
Then open the link it prints (usually `http://localhost:5173`) in your browser.

**Terminal 2 — the booking form's backend:**
```bash
cd backend
npm install         # only needed the first time
npm run dev
```
Leave both terminals open while you're working. If you close them, the site
stops running locally (this doesn't affect anything already deployed live).

---

## 2. How to build the project (prepare it for a real client to see live)

```bash
cd frontend
npm run build
```
This creates a `frontend/dist` folder — that's the finished, ready-to-upload
website. If this command shows a red error instead of finishing, something
in the config file is wrong (usually a typo in `config/clinic.config.json`)
— fix that before deploying.

---

## 3. How to deploy it (put it on the internet for the client)

You need to host two separate things:
- **The website** (`frontend/dist` after building) — any static host works:
  Vercel, Netlify, etc.
- **The booking form service** (`backend/`) — needs an actual Node.js host,
  e.g. Vercel (it's already set up for this — see `backend/api/`), Render,
  or Railway.

After both are live, you need to connect them:
- On the website's hosting dashboard, set an environment variable
  `VITE_API_URL` to the backend's URL + `/api` (e.g.
  `https://clientclinic-api.vercel.app/api`), then re-deploy the website
  (this value gets baked in when you build, so changing it always needs a
  fresh build/deploy).
- On the backend's hosting dashboard, set `CORS_ORIGIN` to the website's
  URL, so the booking form is allowed to talk to it.

If this is your first time deploying, ask me (in a new session) to walk you
through it step by step for whichever host you're using.

---

## 4. Where clinic information is stored

**One file: `config/clinic.config.json`.** This is the single most important
file for every client project — it holds the clinic's name, tagline, phone,
address, hours, everything. Open it in any text editor. It's plain JSON —
every piece of text is in `"quotes"`, separated by commas.

**Before you touch it for a new client**, read `config/README.md` once —
it explains every single field with examples. Keep it open in a second tab
while you edit.

## 5. Where doctor information is stored

Same file, under `"team"`. Each doctor is one entry:
```json
{ "name": "Dr. Full Name", "qualification": "BDS, MDS", "registrationNumber": "", "specialization": "General Dentistry", "bio": "One or two sentences.", "photo": "/images/doctors/dr-name.jpg", "socials": {} }
```
If you don't have a doctor's name yet, use a role instead — `"Lead Dentist"`
— never make up a name. `registrationNumber` is their dental council
registration number if the clinic gives it to you; leave it `""` if not.

## 6. Where services are stored

Same file, under `"services"`. Each service is one entry:
```json
{ "icon": "🦷", "title": "Root Canal Treatment", "description": "...", "price": null, "duration": null }
```
`price` and `duration` are both optional — leave them as `null` (no quotes)
to hide them on the site, or fill in real values like `"3,500"` and
`"60 min"` to show them.

## 7. Where testimonials are stored

Same file, under `"testimonials"`. Each one needs `name`, `quote`, `source`
(usually `"Google Review"`), and `date`. **Only use real reviews you have
permission to publish.** If you don't have a name to attach to a quote, use
`"name": "Verified Patient"` — don't invent a person.

## 8. Where images are stored

`frontend/public/images/`, split into three folders:
- `clinic/` — logo, favicon, hero photos, about photo, social-share image
- `doctors/` — one photo per team member
- `gallery/` — facility/equipment photos

Give files real, descriptive names (`lead-dentist.jpg`, not `1.jpg`) — future
you will thank present you. Then point to them from `clinic.config.json`
using a path starting with `/images/...`, e.g. `/images/doctors/lead-dentist.jpg`.

**Never link directly to an image on someone else's website** (Google
Images, a stock photo site, etc.) — always download it and put a copy in
one of the folders above. External links can vanish or break without
warning (it happened once already while building this template).

## 9. Where SEO information is stored

Same file, under `"seo"`: the page `title`, `description` (what shows up in
Google search results), `keywords`, and `siteUrl` (the client's real
domain — this one matters, make sure it's correct before the final build).

---

## 10. How to replace the logo

1. Get the client's logo as an SVG if possible (ask their designer, or a
   PNG with a transparent background works too).
2. Save it as `frontend/public/images/clinic/logo.svg` (replacing the
   existing file).
3. In `config/clinic.config.json`, confirm `business.logo` says
   `"/images/clinic/logo.svg"` (it already does by default — you're just
   replacing the file it points to).
4. Do the same for `business.favicon` (the little icon in the browser tab)
   — a simplified version of the logo works well here.

## 11. How to replace doctor/clinic images

Drop the new file into the right folder (`doctors/` or `clinic/`) using a
descriptive name, then update the matching path in `clinic.config.json`.
You don't have to reuse the old filename — just make sure the config points
at whatever you named the new file.

## 12. How to change phone / WhatsApp / address

All in `config/clinic.config.json` under `"contact"`:
- `phoneDisplay` — what's shown on the page (e.g. `"+91 98765 43210"`)
- `phoneDial` — same number, used for the actual click-to-call link
- `whatsappNumber` — digits only, no `+` or spaces (e.g. `"919876543210"`)
- `address` — split into `line1`, `line2`, `city`, `state`, `postalCode`

Also update `contact.mapEmbedUrl` (get this from Google Maps → Share →
Embed a map → copy the link) and `contact.directionsUrl` so the map and
"Get Directions" button point at the right place.

## 13. How to add/remove services

Add a new service by copying an existing entry in the `"services"` array
and changing the text. To remove one, delete its entire `{ ... }` block
(make sure you don't leave a stray comma behind — the last item in the
list should NOT have a comma after its closing `}`).

## 14. How to customize colors/fonts

Under `"theme"` in the config:
- `primaryColor`, `primaryDarkColor`, `primaryLightColor` — the client's
  main brand color and two shades of it (buttons, links, highlights)
- `secondaryColor` — a dark color, used for the footer
- `accentColor` — used sparingly (a star icon, a badge) — **don't reuse
  this as regular text color on a white background**, some accent colors
  are too light to read there (see `config/README.md` if you want the
  technical reason)
- `font` — must be one of: `Poppins`, `Roboto`, `Inter`, `Outfit`,
  `Nunito`, `Playfair Display`. Pick whichever fits the clinic's vibe
  (`Playfair Display` reads more upscale, `Nunito` reads friendlier/family).
  You can't type in an arbitrary font name — it has to be one of these six.

---

## 15. Required environment variables

These are small settings files that hold URLs and (for the backend)
credentials — they're never uploaded to GitHub and never shown on the
website itself.

**`frontend/.env`** (copy from `frontend/.env.example`):
- `VITE_API_URL` — where the backend lives, e.g. `http://localhost:4000/api`
  for local testing, or the real deployed backend URL once it's live.

**`backend/.env`** (copy from `backend/.env.example`):
- `PORT` — which port it runs on locally (default `4000`, doesn't matter once deployed)
- `CORS_ORIGIN` — the website's URL (so only your site can talk to this backend)
- `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM` — your
  email-sending credentials, so the clinic gets an email when someone
  submits the booking form. You can leave these blank while testing — it'll
  just print a note instead of sending an email.
- `NOTIFY_EMAIL` — which inbox booking requests go to (defaults to the
  clinic's email in the config if you leave this blank).

## 16. External services used

- **Google Fonts** — loads the chosen font (see #14). No account/key needed.
- **Google Maps** — the embedded map and directions link use a public
  Google Maps URL, no API key required.
- **ui-avatars.com** — free service that generates a simple initials-based
  avatar image for testimonials that don't have a real photo. No account
  needed; this is intentional, not something to "fix."
- **SMTP (your choice of provider)** — whatever email service you use to
  send the clinic booking notifications (Gmail, a transactional email
  service, etc.) — you provide the login details in `backend/.env`.
- **Nothing else calls out to the internet.** No analytics, no ad
  trackers, no third-party chat widgets, unless you deliberately add one
  for a specific client.
