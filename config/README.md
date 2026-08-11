# `clinic.config.json` Field Reference

This file is the **single source of truth** for everything that differs between
clients. Nothing in `src/` should ever need to change to onboard a new clinic —
you only edit this JSON file and swap images in `public/images/client/`.

Start a new client by copying the template:

```bash
cp config/clinic.config.template.json config/clinic.config.json
```

Then fill in every field below. JSON has no comments, so keep this document
open while you edit.

> **JSON syntax reminders:** every key and string value needs double quotes,
> no trailing commas after the last item in an object/array, `null` (not
> empty string) for "not applicable" numeric/optional fields. Run
> `npm run build` after editing — it will fail loudly if the JSON is invalid.

---

## `business`
| Field | Required | Notes |
|---|---|---|
| `name` | ✅ | Used in the title, footer, JSON-LD. |
| `hindiName` | – | Optional local-language name, shown nowhere yet but kept for future use / local SEO keywords. |
| `tagline` | ✅ | Short line shown under the name in `<title>` and TopBar. |
| `logo` | ✅ | Path under `public/images/client/`, e.g. `/images/client/logo.svg`. |
| `favicon` | ✅ | Same as above. SVG or ICO. |
| `ogImage` | ✅ | 1200×630 image used for social share previews (Open Graph). |
| `currency` | ✅ | Symbol shown before prices in the pricing grid, e.g. `₹`, `$`, `£`. |

## `theme`
| Field | Required | Notes |
|---|---|---|
| `primaryColor` / `primaryDarkColor` / `primaryLightColor` | ✅ | Hex. Used for buttons, links, highlights. `Dark` = hover state, `Light` = tinted backgrounds. |
| `secondaryColor` | ✅ | Dark color for the footer / dark sections. |
| `accentColor` | ✅ | Used sparingly (badges, stars, ratings). |
| `font` | ✅ | Must be one of the keys in `src/theme/fonts.js`: `Poppins`, `Roboto`, `Inter`, `Outfit`, `Nunito`, `Playfair Display`. Pick one that suits the brand (e.g. `Playfair Display` for an upscale/cosmetic clinic, `Nunito` for a friendly family practice). |

## `contact`
| Field | Required | Notes |
|---|---|---|
| `phoneDisplay` | ✅ | Human-readable, e.g. `+91 84180 07034`. |
| `phoneDial` | ✅ | Digits-only-ish, used in `tel:` links, e.g. `+918418007034`. |
| `whatsappNumber` | – | Digits only, no `+`, used in `wa.me` links. Leave `""` to hide all WhatsApp buttons. |
| `whatsappPresetMessage` | – | Pre-filled chat message. |
| `email` | ✅ | Used in footer + `mailto:` links. |
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
`icon`, `title`, `description`, `price` (string like `"1,500"` or `null` to hide the price on the card).

## `about`
`image`, `heading`, `description`, `stats[]` (each `icon` + `target` (integer, animates counting up) + `caption`).

## `team[]`
`name`, `qualification` (e.g. `"BDS, MDS"`, can be `""`), `specialization`, `bio`, `photo`, `socials` (object, any of `facebook`/`instagram`/`twitter`, omit keys you don't have).

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

## Images (`public/images/client/`)
Put every client-swappable image here — referenced by plain path in the JSON above (external `https://...` URLs also work if you don't have local files yet, e.g. temporary stock photos). Suggested layout:
```
public/images/client/
  logo.svg
  favicon.svg
  og-image.jpg
  hero/            slide-1-mobile.jpg, slide-1-desktop.jpg, ...
  doctors/         1.jpg, 2.jpg, ...
  gallery/         1.jpg, 2.jpg, ...
  blog/            1.jpg, ...
```
Keep files reasonably sized before uploading (hero images ≤ ~300KB, others ≤ ~150KB) — there's no automatic image optimization pipeline in this template, so oversized source images directly slow down the site.
