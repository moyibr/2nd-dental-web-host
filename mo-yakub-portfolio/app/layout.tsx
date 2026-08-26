import type { Metadata, Viewport } from 'next';
import { Archivo, Public_Sans, IBM_Plex_Mono } from 'next/font/google';
import { site } from '@/content/site';
import './globals.css';

// Three institutional faces: corridor signage, a government body copy face, and
// a technical mono used only for labels. All self-hosted by next/font — the
// browser never talks to Google.
const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
});

const publicSans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-public-sans',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500'],
  display: 'swap',
  variable: '--font-plex-mono',
});

// Set NEXT_PUBLIC_SITE_URL in Vercel once the domain is live so that Open Graph
// images resolve to absolute URLs. See README.md.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://moyibr.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.metaTitle,
  description: site.metaDescription,
  applicationName: site.brand,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    'dental clinic website',
    'hair transplant clinic website',
    'medical clinic website',
    'clinic web developer India',
    'Next.js developer',
    'Moyibr',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    title: site.metaTitle,
    description: site.metaDescription,
    locale: 'en_IN',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${site.name} — websites for dental, hair transplant and medical clinics`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.metaTitle,
    description: site.metaDescription,
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#f7f8f8',
  colorScheme: 'light',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${publicSans.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen bg-ground text-ink antialiased">
        {/* The lightbox panels start dimmed and are lit by an IntersectionObserver.
            Without JavaScript that observer never runs, so light them up front. */}
        <noscript>
          <style>{`.lightbox{background-color:#fff}.lightbox img{opacity:1;filter:none}`}</style>
        </noscript>
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-surgical focus:px-4 focus:py-3 focus:text-surface"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
