'use client';

import { useEffect, useState } from 'react';
import { sections } from '@/content/site';

/**
 * The measure rail — a calibration scale down the left edge of the page.
 *
 * It looks like the measuring column in an examination room, but it is real
 * navigation: each number is an anchor link, and the tick beside the section
 * currently in view extends and turns surgical blue. Desktop only; on smaller
 * screens each section prints its own "02 / WORK" label inline instead.
 */
export default function MeasureRail() {
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    // A narrow band across the middle of the viewport: whichever section
    // crosses it owns the indicator.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed top-0 left-0 z-30 hidden h-screen w-(--rail-w) border-r border-hairline lg:block"
    >
      {/* The ruler itself: one gradient, no DOM nodes. */}
      <div
        aria-hidden="true"
        className="rail-scale absolute top-0 right-0 h-full w-1.5 opacity-70"
      />
      <ul className="flex h-full flex-col justify-center gap-7 pl-4">
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? 'true' : undefined}
                className="rail-item group flex items-center gap-2 py-1"
              >
                <span className="rail-tick" aria-hidden="true" />
                <span className="rail-num label text-[0.625rem] transition-colors group-hover:text-ink">
                  {section.index}
                </span>
                <span className="sr-only">{section.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
