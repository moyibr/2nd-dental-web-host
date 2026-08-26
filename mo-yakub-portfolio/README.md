# Hadi — Moyibr · Portfolio

A single-page portfolio for **Hadi (Mo Yakub)**, who builds websites for dental
clinics, hair transplant studios and multi-specialty medical clinics under the
brand **Moyibr**.

Built with **Next.js 16 (App Router)**, **TypeScript** and **Tailwind CSS v4**.
Three dependencies total — `next`, `react`, `react-dom`. No animation library,
no icon library, no UI kit.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

Node 20 or newer.

---

## 1. Replace the placeholder tokens

Everything you need to fill in lives in **one file: [`content/site.ts`](content/site.ts)**.
Values written as `{{LIKE_THIS}}` are placeholders. Until you replace them the
page renders a quiet "coming soon" state instead of a broken link — so the site
is presentable at every stage of filling it in.

| Token | Where | Replace with |
|---|---|---|
| `{{PROJECT_1_URL}}` | `content/site.ts` → `projects[0].url` | Live URL of The Ridge Dental Clinic |
| `{{PROJECT_2_URL}}` | `content/site.ts` → `projects[1].url` | Live URL of The Ridge Hair Transplant Studio |
| `{{PROJECT_3_URL}}` | `content/site.ts` → `projects[2].url` | Live URL of The Ridge Wellness Clinic |
| `{{WHATSAPP_NUMBER}}` | `content/site.ts` → `contact.whatsappNumber` | Your number in international format, digits only — e.g. `919876543210`. The `wa.me/` link is built for you. |
| `{{EMAIL}}` | `content/site.ts` → `contact.email` | Your email address. The `mailto:` link is built for you. |
| `{{FIVERR_URL}}` | `content/site.ts` → `contact.fiverrUrl` | Full URL of your Fiverr profile |
| `{{GITHUB_URL}}` | `content/site.ts` → `contact.githubUrl` | Full URL of your GitHub profile |

Run `npm run dev` after editing — any token still unreplaced is listed in the
terminal on each render.

To confirm none are left:

```bash
grep -rn "{{" content/site.ts
```

Nothing else in the codebase contains a token.

---

## 2. Drop in the three screenshots

Replace these files, keeping the **same filenames and paths**:

| File | Project |
|---|---|
| `public/work/ridge-dental.png` | The Ridge Dental Clinic |
| `public/work/ridge-hair.png` | The Ridge Hair Transplant Studio |
| `public/work/ridge-wellness.png` | The Ridge Wellness Clinic |

- **Size: 1600 × 1000 px** (16:10). Other sizes work, but update `width` and
  `height` in [`components/ProjectPanel.tsx`](components/ProjectPanel.tsx) to
  match the real aspect ratio, or the layout will reserve the wrong space.
- PNG or JPG. Next.js optimises and serves modern formats automatically.
- The files currently sitting there are **placeholder cards**, not mockups —
  each one prints the path you need to overwrite.

While you're in `content/site.ts`, update each project's `alt` text so it
describes what your screenshot actually shows. That text is what screen-reader
users and anyone on a failed image load will get.

### Open Graph preview image

`public/og.png` (1200 × 630) is the card shown when the link is shared on
WhatsApp, LinkedIn or X. Replace it if you want a different preview.

---

## 3. Everything else you might edit

All copy lives in `content/site.ts` — hero, the nine "what I build" items, the
four process steps, About, contact lines, footer. Components only render it.

The `sections` array in the same file drives three things at once: the header
nav, the numbered measure rail, and the order of the page. Add or reorder there
and the rest follows.

---

## 4. Deploy to Vercel

The project deploys with zero configuration, but this app lives in a
**subdirectory** of the repository, so the root directory has to be set.

1. Push the repository to GitHub.
2. In Vercel: **Add New → Project**, import the repository.
3. **Root Directory → `mo-yakub-portfolio`**. This is the one setting that
   matters; Vercel then auto-detects Next.js, `npm install` and `next build`.
4. Add an environment variable:

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` (your final URL) |

   Used for the canonical URL, the Open Graph image, `robots.txt` and
   `sitemap.xml`. Without it the code falls back to
   `https://moyibr.vercel.app`. See [`.env.example`](.env.example).
5. **Deploy**, then add your custom domain under Settings → Domains and update
   `NEXT_PUBLIC_SITE_URL` to match.

Or from the CLI:

```bash
npm i -g vercel
vercel --cwd mo-yakub-portfolio
```

---

## Design notes

The visual language is taken from clinical spaces — cool lit surfaces, hairline
joins, square corners, labelled equipment — rather than from portfolio fashion.

**Palette** (defined in [`app/globals.css`](app/globals.css) under `@theme`):

| Token | Hex | Role |
|---|---|---|
| `--color-ground` | `#F7F8F8` | page ground |
| `--color-surface` | `#FFFFFF` | lit panels |
| `--color-ink` | `#12171A` | text |
| `--color-steel` | `#55636A` | secondary text |
| `--color-hairline` | `#DFE4E5` | every rule and frame |
| `--color-surgical` | `#0F5E78` | the only saturated colour |

**Type:** Archivo (display — signage), Public Sans (body — institutional),
IBM Plex Mono (micro-labels only). Self-hosted by `next/font`, so the browser
never requests anything from Google.

**Signature:** the *light box*. Each project is mounted on a white viewing
panel; when it scrolls into view the panel illuminates — background to white,
screenshot to full opacity. That is the only motion on the page apart from the
rail indicator, and it is disabled entirely under `prefers-reduced-motion`.

**Measure rail:** the numbered scale down the left edge on large screens is real
navigation — anchor links with the active section marked `aria-current`. Below
1024px each section prints its own `02 / WORK` label instead.

---

## Accessibility and performance

Verified in a real browser: no horizontal overflow at 360/390/768/1024/1440px,
one `<h1>`, every section `aria-labelledby`, a visible focus ring on every tab
stop, all text at 5.8:1 contrast or better, the full page readable with
JavaScript disabled, and reduced-motion honoured.

Images go through `next/image` with explicit dimensions and lazy loading. Client
JavaScript is limited to two small `IntersectionObserver`s (the rail and the
lightbox reveal); everything else is a server component.

---

## A note on the projects

The three Ridge sites are **self-built concept projects, not client work**, and
the page says so where they are shown. There are no testimonials, review counts
or client statistics anywhere in this codebase — please don't add invented ones.
