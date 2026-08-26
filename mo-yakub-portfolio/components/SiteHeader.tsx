import { sections, site } from '@/content/site';

// Opaque, hairline-ruled, no blur and no pill. A clinical surface is matte.
export default function SiteHeader() {
  const navSections = sections.filter((section) => section.id !== 'top');

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-ground">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-5 md:px-10">
        <a href="#top" className="label text-ink">
          {site.person} <span aria-hidden="true">—</span> {site.brand}
        </a>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {navSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="label transition-colors hover:text-ink"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
