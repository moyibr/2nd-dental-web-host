# `clinic.config.json` Field Reference

This file is the **single source of truth** for everything that differs between
clients. It lives at the repo root (a sibling of `/frontend` and `/backend`,
not inside either) because both apps read it — see the root
[`README.md`](../README.md#why-config-is-shared-not-inside-frontend) for why.
Nothing in `/frontend/src` or `/backend` should ever need to change to
onboard a new clinic — you only edit this JSON file and swap images in
`frontend/public/images/{clinic,doctors,gallery}/`.

Start a new client by copying the template:

```bash
cp config/clinic.config.template.json config/clinic.config.json
```

Then fill in every field below. JSON has no comments, so keep this document
open while you edit.

> **JSON syntax reminders:** every key and string value needs double quotes,
> no trailing commas after the last item in an object/array, `null` (not
> empty string) for "not applicable" numeric/optional fields. Run
> `npm run build` (in `frontend/`) after editing — it will fail loudly if
> the JSON is invalid.

---

## `business`
| Field | Required | Notes |
|---|---|---|
| `name` | ✅ | Used in the title, footer, JSON-LD. |
| `hindiName` | – | Optional local-language name, shown nowhere yet but kept for future use / local SEO keywords. |
| `tagline` | ✅ | Short line shown under the name in `<title>` and TopBar. |
| `logo` | ✅ | Path under `frontend/public/images/clinic/`, e.g. `/images/clinic/logo.svg`. |
| `favicon` | ✅ | Same as above. SVG or ICO. |
| `ogImage` | ✅ | 1200×630 image used for social share previews (Open Graph). Use a local path like the others (`/images/clinic/og-image.jpg`) — it's automatically converted to a full `https://...` URL using `seo.siteUrl` when the page is built, since social platforms require an absolute URL here. |
| `currency` | ✅ | Symbol shown before prices in the pricing grid, e.g. `₹`, `$`, `£`. |

## `theme`
| Field | Required | Notes |
|---|---|---|
| `primaryColor` / `primaryDarkColor` / `primaryLightColor` | ✅ | Hex. Used for buttons, links, highlights. `Dark` = hover state, `Light` = tinted backgrounds. |
| `secondaryColor` | ✅ | Dark color for the footer / dark sections. |
| `accentColor` | ✅ | Used sparingly (badges, stars, ratings). **Contrast warning:** the accent is meant for use on dark/colored backgrounds only (e.g. a star icon over a photo overlay). Many good-looking accent colors (gold, orange, light colors) fail WCAG AA contrast (4.5:1) as text on a plain white background — the default `#C9A227` is only 2.4:1 on white, for example. Never use `text-accent` as body text on a light background; check contrast (e.g. [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/)) before picking a client's accent color if you plan to use it anywhere besides its current dark-background usage. |
| `font` | ✅ | Must be one of the keys in `frontend/src/theme/fonts.js`: `Poppins`, `Roboto`, `Inter`, `Outfit`, `Nunito`, `Playfair Display`. Pick one that suits the brand (e.g. `Playfair Display` for an upscale/cosmetic clinic, `Nunito` for a friendly family practice). |

## `contact`
| Field | Required | Notes |
|---|---|---|
| `phoneDisplay` | ✅ | Human-readable, e.g. `+91 84180 07034`. |
| `phoneDial` | ✅ | Digits-only-ish, used in `tel:` links, e.g. `+918418007034`. |
| `whatsappNumber` | – | Digits only, no `+`, used in `wa.me` links. Leave `""` to hide all WhatsApp buttons. |
| `whatsappPresetMessage` | – | Pre-filled chat message. |
| `email` | ✅ | Used in footer + `mailto:` links. |
| `emergencyContact.phone` / `.note` | – | Optional. Only fill in if the clinic actually offers a distinct emergency line — don't invent one. `phone` renders as a `tel:` link, `note` is a short line like "24/7 dental emergencies". Set both to `null` to hide it entirely (default). Rendered in the Visit Us / contact section. |
| `address` | ✅ | Structured — used for display AND JSON-LD `PostalAddress`. |
| `plusCode` | – | Google Plus Code, if known — more precise than a street address for the map embed. |
| `geo.lat` / `geo.lng` | – | Leave `null` if unknown. When set, improves JSON-LD accuracy (map pin, "near me" search). |
| `mapEmbedUrl` | ✅ | Get this from Google Maps → Share → Embed a map → copy the `src="..."` URL, OR build one as `https://www.google.com/maps?q=<url-encoded address or plus code>&output=embed`. |
| `directionsUrl` | ✅ | A link that opens Google Maps directions/search for the clinic. |

## `hours`
Array of **exactly 7 entries**, one per day (`Monday`…`Sunday`), each:
```json
{ "day": "Monday", "open": "10:00", "close": "20:00", "closed": false }
```
Use 24-hour `HH:mm`. Set `"closed": true` for days off (keep `open`/`close` present with any value — they're ignored when `closed` is true).

## `socials`
`facebook` / `instagram` / `twitter` / `youtube` — full URLs. Leave any as `""` to hide that icon (the footer skips empty ones automatically). Don't guess a URL you're not sure of.

## `seo`
| Field | Required | Notes |
|---|---|---|
| `title` | ✅ | `<title>` tag and JSON-LD name context. Keep under ~60 chars. |
| `description` | ✅ | Meta description, ~150–160 chars, shown in search results. |
| `keywords` | – | Array of phrases. Low SEO weight nowadays but harmless. |
| `siteUrl` | ✅ | The clinic's live domain, no trailing slash, e.g. `https://www.clientclinic.com`. Used for canonical URL, Open Graph, `sitemap.xml`, `robots.txt`. **Must be set correctly before the production build**, or run `npm run build` with a placeholder and remember to fix before going live. |

## `featureFlags`
All booleans. Toggle a section on/off without touching any component:

| Flag | Controls |
|---|---|
| `showPricing` | Pricing & Packages section |
| `showBlog` | Blog preview section |
| `showBeforeAfter` | A "before/after results" style gallery — **only enable this if you have real, consented before/after patient photos.** Do not enable with stock images. |
| `showGallery` | The generic facility/interior photo gallery |
| `showInsurance` | Insurance-accepted badges/section (add insurer list under `insurance` if you enable this — see template) |
| `showFAQ` | FAQ accordion |
| `showTestimonials` | Testimonials/reviews carousel |
| `enableOnlineBooking` | If `false`, the appointment form is replaced with a "Call to Book" card (some clinics prefer phone-only booking) |

## `trust`
Real, verifiable numbers only — this renders as a public claim (e.g. a Google rating badge in the hero). `rating` (0–5, one decimal) and `reviewCount` should match the clinic's actual Google Business Profile. Set both to `null` to hide the badge entirely.

## `hero.slides[]`
Each slide: `imageMobile` (portrait-ish, ~900×1100, used under 768px) and `imageDesktop` (landscape, ~1600×800, used at 768px+), `heading`, `subheading`, `cta1`/`cta2` each `{ "text": "...", "href": "#anchor" }`.

## `ctaBanner`
Full-width band between the Team and Testimonials sections: `image` (background), `heading`, `buttonText`, `buttonLink` (usually `#contact`).

## `highlights[]`
The 3-up "Why Choose Us" row next to the appointment form: `icon` (single emoji), `title`, `description`.

## `services[]`
`icon`, `title`, `description`, `price` (string like `"1,500"` or `null` to hide the price on the card), `duration` (string like `"30 min"` or `null` to hide it — optional, only fill in if the clinic gives you real typical treatment times).

## `about`
`image`, `heading`, `description`, `stats[]` (each `icon` + `target` (integer, animates counting up) + `caption`).

## `team[]`
`name`, `qualification` (e.g. `"BDS, MDS"`, can be `""`), `registrationNumber` (their state dental council registration number, e.g. `"UPDC-12345"` — a real trust signal for patients, but only fill it in if you actually have it; leave `""` to hide), `specialization`, `bio`, `photo`, `socials` (object, any of `facebook`/`instagram`/`twitter`, omit keys you don't have).

**If you don't have named doctors yet**, use role titles instead of inventing names — e.g. `"name": "Lead Dentist"` — never fabricate a person who doesn't exist at the real clinic.

## `testimonials[]`
`name`, `quote`, `source` (e.g. `"Google Review"`), `date` (e.g. `"4 months ago"`, can be `""`), `avatar` (URL or `null` — when `null` the UI auto-generates an initials avatar, so this is safe to leave empty).

**Only use real reviews/quotes you have permission to publish.** If a quote has no name attached, use `"name": "Verified Patient"` rather than inventing one.

## `gallery[]`
`image`, `caption` — facility/equipment/interior photos (see `showBeforeAfter` note above for actual before/after patient photos).

## `faq[]`
`question`, `answer` — plain text, rendered as an accordion.

## `pricing`
`note` (disclaimer shown under the pricing grid) + `plans[]` (`name`, `price` as a plain number string, `features[]`, `highlighted` boolean — highlight exactly one plan).

## `blog[]`
Only rendered when `featureFlags.showBlog` is `true`. `title`, `excerpt`, `date`, `author`, `comments` (integer), `image`.

## `navigation[]`
`label` + `href` (anchor matching a section's `id` in `Home.jsx`, e.g. `#services`). Remove entries for sections you've disabled via feature flags so the menu doesn't link to a hidden section.

## `footer`
`aboutText`, `copyrightText`.

---

## Images (`frontend/public/images/`)
Put every client-swappable image here — referenced by plain path in the JSON above. Layout:
```
frontend/public/images/
  clinic/     logo.svg, favicon.svg, og-image.jpg, hero-1-mobile.jpg, hero-1-desktop.jpg,
              hero-2-mobile.jpg, hero-2-desktop.jpg, cta-banner.jpg, about-clinic.jpg
  doctors/    one photo per team member — name files descriptively (lead-dentist.jpg,
              orthodontist.jpg, ...) rather than 1.jpg/2.jpg
  gallery/    facility/equipment photos — descriptive names (treatment-rooms.jpg,
              digital-xray.jpg, sterilization.jpg, ...)
```
Use descriptive filenames (not `1.jpg`, `2.jpg`) — it makes the folder self-explanatory
months later when you're onboarding client #5 and can't remember which file is which.

**Always use local files, never a hotlinked `https://...` URL** (even as a placeholder)
— external images can disappear or change without warning. This actually happened
during development of this template: one of the original Unsplash placeholder photos
was taken down mid-project and started 404ing. Every image shipped with this template
is a real local file for exactly that reason. The one deliberate exception is
testimonial avatars (`testimonials[].avatar`) — leaving that `null` intentionally
falls back to an auto-generated initials avatar from `ui-avatars.com`, which is the
*designed* fallback for a missing optional photo, not a risk.

Keep files reasonably sized before uploading (hero images ≤ ~300KB, others ≤ ~150KB) —
there's no automatic image optimization pipeline in this template, so oversized source
images directly slow down the site.
