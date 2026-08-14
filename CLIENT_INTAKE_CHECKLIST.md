# Client Intake Checklist

What to collect from a dental clinic client once they've said yes, before
you touch `config/clinic.config.json`. Organized so you can start building
immediately with the **Must-Have** items and slot in **Nice-to-Have** items
later without blocking the project — that's exactly how Advanced Dental
Lounge was handled (real Google listing data used immediately, generic
role titles + stock photos used as honest placeholders for what wasn't
available yet).

Send this to the client as-is, or read it out on an onboarding call.

---

## 🔴 Must-Have — can't launch without these

### Business identity
- [ ] Official clinic name (exact spelling/capitalization they use)
- [ ] Tagline / one-line description (or you draft one for their approval)
- [ ] Logo — vector if possible (AI/EPS/SVG), otherwise a large transparent
      PNG. If they don't have one, flag that logo design is a separate
      task/cost — this template doesn't generate logos.

### Contact & location
- [ ] Phone number (the one patients should actually call)
- [ ] WhatsApp number, if different from the phone number, and whether
      they even want a WhatsApp button (some clinics don't monitor it)
- [ ] Business email — ideally a dedicated inbox (`info@clinic.com`), not
      a personal Gmail, since this is where appointment requests land
- [ ] Full address: street, landmark, area, city, state, PIN/ZIP
- [ ] Their Google Business Profile link (to pull the map embed, verify
      the address matches exactly — mismatches hurt local SEO — and get
      the real rating/review count)
- [ ] Business hours for **every day of the week**, including which day(s)
      they're closed (don't assume Sunday)

### Team
- [ ] Real name(s) of every dentist to be featured, spelled correctly
- [ ] Qualifications (BDS, MDS, specialty certifications)
- [ ] One-line specialization each (e.g. "Orthodontist", "Root Canal
      Specialist")
- [ ] **If a client can't get you real names/photos in time**, use generic
      role titles instead of inventing a person — see `config/README.md`.
      Don't let this block the rest of the build.

### Services
- [ ] The actual list of treatments they offer (don't assume — ask)
- [ ] A short description for each, or approve the ones you draft

### Domain & deployment
- [ ] Do they already own a domain? What is it? (needed for
      `seo.siteUrl`, canonical URLs, `sitemap.xml`)
- [ ] If not — who's buying it (you or them) and who holds the
      registrar account long-term?
- [ ] Who's paying for/managing hosting ongoing — you, or handed off to
      them after launch?

---

## 🟡 Nice-to-Have — use a placeholder and update later

### Photos
**Exactly how many to ask for** — count it out per client rather than
asking vaguely for "some photos":

| Slot | Count | Spec |
|---|---|---|
| Logo | 1 | Vector (SVG/AI/EPS) preferred, or large transparent PNG |
| Favicon | 1 | Can reuse the logo if it's simple enough to read tiny — ask if unsure |
| Social share image (`business.ogImage`) | 1 | 1200×630px, landscape |
| Hero slides | **2 images per slide** (`imageMobile` + `imageDesktop`) | Portrait ~900×1100 for mobile, wide ~1600×800 for desktop. Default template uses 2 slides = **4 images**; confirm how many slides the client wants |
| About/clinic intro (`about.image`) | 1 | ~1200×900, landscape |
| Doctor/team photos | **1 per doctor featured** | ~800×1000px, portrait, consistent style ideally |
| Facility/gallery photos | 4–8 | ~1200×900px — reception, treatment rooms, equipment, waiting area |
| Blog post images | 1 per post, **only if `showBlog` is enabled** | ~1200×800px |

A typical clinic (2 hero slides, 4 doctors, 6 gallery photos, no blog)
works out to **1 + 1 + 1 + 4 + 1 + 4 + 6 = 18 images**. Recalculate per
client based on their actual doctor count and how many hero slides/gallery
shots they want.

- [ ] Team group photo (optional, not currently used but handy to have)
- [ ] Ask about **usage rights** if any photos are professionally shot —
      confirm you can use them on the live site.

### Video
**The template does not currently have a video feature built anywhere**
(no hero background video, no embedded clinic-tour/testimonial video). If
a client wants video, that's new scope — confirm what they want (hero
background clip, a clinic-tour section, embedded YouTube testimonials)
before quoting, since each is a different amount of work to add. Don't
collect video files from a client until that scope is agreed and built —
ask for 0 videos by default.

### Reviews & reputation
- [ ] Permission to quote their real Google reviews by name (or use
      "Verified Patient" for ones without clear consent — never invent a
      reviewer)
- [ ] Any testimonials they've collected outside Google (WhatsApp
      screenshots, feedback forms, etc.)

### Branding details
- [ ] Brand colors, if they have real guidelines (hex codes). Otherwise
      you pick something appropriate and show them for approval — don't
      wait on this to start building, since `theme.*` is a five-minute
      change at the end.
- [ ] Font preference, if any — otherwise pick from the allow-list in
      `frontend/src/theme/fonts.js` based on the clinic's positioning (e.g.
      `Playfair Display` for upscale/cosmetic, `Nunito` for a friendly
      family practice).

### Pricing
- [ ] Real prices per treatment, OR
- [ ] "Starting from" placeholder ranges with a disclaimer, OR
- [ ] Skip the pricing section entirely (`featureFlags.showPricing: false`)
      — common for clinics that prefer "consult for pricing"

### Social media
- [ ] Facebook / Instagram / YouTube URLs — only include ones they
      actually maintain; don't guess a handle

### Insurance (if `featureFlags.showInsurance` will be used)
- [ ] List of insurance providers/networks they accept

---

## ⚠️ Needs a decision before you scope the work — "payment receiver"

This template does **not** currently collect online payments anywhere —
the appointment form only sends a request, no money changes hands through
the site. Clarify which of these the client actually means, since they're
very different asks:

1. **They want online payment on the site** (e.g. a booking deposit or
   consultation fee paid at the time of appointment request). This needs a
   payment gateway integration (e.g. Razorpay/Stripe) that isn't built —
   scope it as a separate feature/cost, and you'll need their business
   bank account or payment gateway merchant account details, not just a
   UPI ID.
2. **They just want patients to know payment options accepted at the
   clinic** (cash, UPI, cards, insurance) — this is just a line of text/
   icons, trivial to add to the config as a new field if you want it.
3. **They're asking how *you* get paid for building the site** — that's
   your own invoicing process (UPI ID / bank details / contract), separate
   from the website's technical scope entirely.

Ask the client directly which one they mean before quoting a price or
timeline — #1 is meaningfully more work than #2 or #3.

---

## After you have the Must-Haves

1. `cp config/clinic.config.template.json config/clinic.config.json`
2. Fill it in using `config/README.md` as the field reference
3. Drop images into `frontend/public/images/client/`
4. Follow [`ONBOARDING_CHECKLIST.md`](ONBOARDING_CHECKLIST.md) for the
   rest of the build → deploy flow
