// -----------------------------------------------------------------------------
// SITE CONTENT — the only file you need to edit.
// -----------------------------------------------------------------------------
// Every string, link and project on the page lives here. Components read this
// file and render it; nothing is hardcoded in JSX.
//
// Values written as {{LIKE_THIS}} are placeholders you have to replace before
// going live. Until you do, the page renders them as a quiet "coming soon"
// state instead of a broken link — see components/SafeLink.tsx. The full list
// is in README.md.
// -----------------------------------------------------------------------------

export type Project = {
  /** Slug used for the image filename and React key. */
  id: string;
  name: string;
  /** One line, plain language — what the site actually contains. */
  descriptor: string;
  /** Shown as mono tags under the name. */
  tech: string[];
  /** Palette note. Keeps the three projects visually distinguishable in text. */
  palette: string;
  /** Screenshot in /public/work/. Replace the file, keep the path. */
  image: string;
  /** Describe what the screenshot shows, for screen readers and broken images. */
  alt: string;
  /** Replace with the deployed URL. */
  url: string;
};

export const projects: Project[] = [
  {
    id: 'ridge-dental',
    name: 'The Ridge Dental Clinic',
    descriptor:
      'Full dental clinic site — treatments, doctor profiles, smile gallery, appointment enquiry form, patient reviews and Google Maps.',
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    palette: 'Blue and white medical palette',
    image: '/work/ridge-dental.png',
    alt: 'Homepage of The Ridge Dental Clinic concept site, in a blue and white medical palette, showing the hero, treatment cards and an appointment enquiry form.',
    url: '{{PROJECT_1_URL}}',
  },
  {
    id: 'ridge-hair',
    name: 'The Ridge Hair Transplant Studio',
    descriptor:
      'Hair transplant studio site — FUE treatment breakdown, results section, surgeon profiles, consultation booking and trust indicators.',
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    palette: 'Green and cream palette',
    image: '/work/ridge-hair.png',
    alt: 'Homepage of The Ridge Hair Transplant Studio concept site, in a green and cream palette, showing the FUE treatment breakdown and a consultation booking panel.',
    url: '{{PROJECT_2_URL}}',
  },
  {
    id: 'ridge-wellness',
    name: 'The Ridge Wellness Clinic',
    descriptor:
      'Multi-specialty clinic site — service categories, health packages, doctor listings, preventive care sections and appointment enquiry.',
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    palette: 'Teal palette',
    image: '/work/ridge-wellness.png',
    alt: 'Homepage of The Ridge Wellness Clinic concept site, in a teal palette, showing service categories, health packages and a doctor listing.',
    url: '{{PROJECT_3_URL}}',
  },
];

export const contact = {
  whatsappNumber: '{{WHATSAPP_NUMBER}}',
  email: '{{EMAIL}}',
  fiverrUrl: '{{FIVERR_URL}}',
  githubUrl: '{{GITHUB_URL}}',
  /** Prefilled WhatsApp message. Encoded when the link is built. */
  whatsappMessage:
    'Hi Hadi, I run a clinic and I would like a website. Here is my clinic name and the treatments we offer:',
};

/** Section order — drives the measure rail, the header nav and the page itself. */
export const sections = [
  { id: 'top', index: '01', label: 'Start' },
  { id: 'work', index: '02', label: 'Work' },
  { id: 'build', index: '03', label: 'Build' },
  { id: 'process', index: '04', label: 'Process' },
  { id: 'about', index: '05', label: 'About' },
  { id: 'contact', index: '06', label: 'Contact' },
] as const;

export const site = {
  name: 'Hadi — Moyibr',
  brand: 'Moyibr',
  person: 'Hadi',
  role: 'Clinic websites — dental, hair transplant, medical',
  location: 'Greater Noida, India',
  metaTitle: 'Hadi — Moyibr · Websites for dental, hair transplant and medical clinics',
  metaDescription:
    'I design and build custom-coded websites for dental clinics, hair transplant studios and multi-specialty clinics. Next.js, React and Tailwind CSS. Mobile-first, fast, built from scratch.',

  hero: {
    eyebrow: 'Hadi — Moyibr',
    // Split so the clinic types can carry full ink weight while the framing
    // half of the sentence sits back. Both halves render inside one <h1>.
    headlineLead: 'I design and build websites for',
    headlineFocus: 'dental, hair transplant, and medical clinics.',
    support:
      'Custom-coded in Next.js — not a template and not a page builder. Designed for the phone first, because that is where your patients are searching. Built and delivered in weeks, not months.',
    primaryCta: { label: 'See the work', href: '#work' },
    secondaryCta: { label: 'Start a project', href: '#contact' },
    stack: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
  },

  work: {
    heading: 'Three clinic sites, built end to end.',
    // Honesty: these are self-built demos. Do not turn this into client work.
    note: 'Concept projects — self-built to show how I structure a clinic site. These are demo builds, not paid client work, and none of the clinics shown are real practices.',
  },

  build: {
    heading: 'What I build for clinics.',
    intro:
      'Not a list of technologies. This is what a patient runs into on your site, and what you get out of it.',
    items: [
      {
        title: 'Mobile-first design',
        body: 'Most patients find you on a phone, mid-search, in a hurry. The phone layout gets designed first — the desktop one follows.',
      },
      {
        title: 'Treatment and service pages',
        body: 'Each procedure explained in plain language: what it involves, what it costs, what recovery looks like. Fewer of the same questions on the phone.',
      },
      {
        title: 'Doctor profiles',
        body: 'Qualifications, registration, years of experience and a photo. Patients pick a person before they pick a clinic.',
      },
      {
        title: 'Appointment enquiry forms',
        body: 'A short form — name, treatment, preferred time — that reaches you by email or straight to WhatsApp.',
      },
      {
        title: 'Before/after and clinic galleries',
        body: 'Result photos and clinic interiors, compressed properly so they still open on a slow mobile connection.',
      },
      {
        title: 'Patient reviews section',
        body: 'Your own Google reviews placed where a new patient actually reads them, in your words and theirs — never invented.',
      },
      {
        title: 'Google Maps and directions',
        body: 'An embedded map, a one-tap directions link and your opening hours, where nobody has to hunt for them.',
      },
      {
        title: 'SEO-ready structure',
        body: 'Clean headings, page titles, local business schema and a sitemap, so you have a real chance in \u201cdentist near me\u201d searches.',
      },
      {
        title: 'Fast load times',
        body: 'Hand-written code and sized images. No page-builder bloat, so the page opens before the patient gives up.',
      },
    ],
  },

  process: {
    heading: 'How the project runs.',
    steps: [
      {
        index: '01',
        title: 'Brief',
        body: 'We talk about your clinic, your treatments, and the questions patients ask you most. Nothing technical needed from your side.',
      },
      {
        index: '02',
        title: 'Design',
        body: 'I send you a preview before the full build starts, so you can see the direction and change it while changing it is cheap.',
      },
      {
        index: '03',
        title: 'Build',
        body: 'Custom coded, then tested on real phones — not just a resized desktop browser window.',
      },
      {
        index: '04',
        title: 'Launch',
        body: 'Domain connected, hosted, live. You own the domain, the code and the content. Nothing is locked to me.',
      },
    ],
  },

  about: {
    heading: 'About',
    paragraphs: [
      'I am a third-year B.Tech Computer Science student at GNIOT, Greater Noida, specialising in AI. I build websites for clinics under the name Moyibr.',
      'I chose this niche deliberately. Most clinics I looked at either had no website at all or an auto-generated one that fell apart on a phone — which is where nearly every patient is searching from. Clinic sites also have a clear job: explain the treatment, show the doctor, make it easy to enquire. That is a problem worth being good at.',
      'I am early on. The sites above are my own concept builds rather than client work, so I am taking projects at student-friendly rates while I build up a portfolio. What you get in exchange is someone who answers messages and keeps working on it until it is right.',
    ],
  },

  contactSection: {
    heading: 'Tell me about your clinic.',
    line: 'Send me your clinic name and the treatments you offer, and I will build you a free demo page — so you can see what it would look like before you decide anything.',
  },

  footer: {
    note: 'Designed and built from scratch in Next.js, React and Tailwind CSS.',
  },
} as const;

/** True when a value is still an unreplaced {{TOKEN}} placeholder. */
export function isToken(value: string): boolean {
  return /^\{\{.+\}\}$/.test(value.trim());
}

/** wa.me link with the prefilled message, or the raw token if unreplaced. */
export function whatsappHref(): string {
  if (isToken(contact.whatsappNumber)) return contact.whatsappNumber;
  const digits = contact.whatsappNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(contact.whatsappMessage)}`;
}

/** mailto link, or the raw token if unreplaced. */
export function emailHref(): string {
  if (isToken(contact.email)) return contact.email;
  return `mailto:${contact.email}?subject=${encodeURIComponent('Clinic website enquiry')}`;
}

// Development-only nudge: list anything still unreplaced, once, in the terminal.
if (process.env.NODE_ENV === 'development') {
  const unreplaced = [
    ...projects.map((p) => p.url),
    contact.whatsappNumber,
    contact.email,
    contact.fiverrUrl,
    contact.githubUrl,
  ].filter(isToken);
  if (unreplaced.length > 0) {
    console.warn(
      `\n[content/site.ts] ${unreplaced.length} placeholder(s) still to replace: ${unreplaced.join(', ')}\n`,
    );
  }
}
