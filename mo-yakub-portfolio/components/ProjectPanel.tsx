'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import SafeLink from '@/components/SafeLink';
import { ArrowIcon } from '@/components/icons';
import type { Project } from '@/content/site';

/**
 * The signature element: a project mounted on a light box.
 *
 * The panel sits on the page's ground colour with the screenshot dimmed, like
 * a radiograph on an unlit viewer. When it scrolls into view the light comes
 * on — background to white, image to full opacity and saturation. That is the
 * only motion on this page apart from the rail indicator, and it is disabled
 * entirely under prefers-reduced-motion (the CSS lights the panel up front).
 */
export default function ProjectPanel({ project }: { project: Project }) {
  const panelRef = useRef<HTMLElement>(null);
  const [isLit, setIsLit] = useState(false);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLit(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 },
    );

    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={panelRef}
      className={`lightbox border border-hairline ${isLit ? 'is-lit' : ''}`}
    >
      <div className="p-4 md:p-10">
        <Image
          src={project.image}
          alt={project.alt}
          width={1600}
          height={1000}
          sizes="(min-width: 1024px) 62rem, 100vw"
          className="lightbox-plate h-auto w-full"
        />
      </div>

      <div className="grid gap-5 border-t border-hairline p-5 md:grid-cols-[1fr_auto] md:items-end md:gap-10 md:p-8">
        <div>
          <h3 className="font-display text-lg font-semibold tracking-[-0.01em] md:text-xl">
            {project.name}
          </h3>
          <p className="mt-2 max-w-xl text-sm text-steel md:text-base">
            {project.descriptor}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {project.tech.map((tech) => (
              <li key={tech} className="label">
                {tech}
              </li>
            ))}
            <li className="label text-hairline" aria-hidden="true">
              |
            </li>
            <li className="label">{project.palette}</li>
          </ul>
        </div>

        <SafeLink
          href={project.url}
          external
          placeholder="Live link coming soon"
          className="label inline-flex min-h-11 items-center gap-2 text-surgical transition-colors hover:text-ink"
          aria-label={`View the live site for ${project.name}`}
        >
          View live site
          <ArrowIcon className="h-4 w-4" />
        </SafeLink>
      </div>
    </article>
  );
}
