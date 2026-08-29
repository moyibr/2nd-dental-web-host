import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  /** Matches the number on the measure rail. */
  index: string;
  label: string;
  heading: string;
  intro?: string;
  children?: ReactNode;
};

/**
 * Shared section shell: a hairline top rule, the mono "02 / WORK" label, the
 * display heading, and an optional intro line. Every section on the page is
 * built from this so the vertical rhythm never drifts.
 */
export default function Section({
  id,
  index,
  label,
  heading,
  intro,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-14 border-t border-hairline py-16 md:py-28"
    >
      {/* Every section — and the header and footer — shares this container, so
          the page keeps a single left edge from the masthead to the footer. */}
      <div className="mx-auto w-full max-w-6xl px-5 md:px-10">
        <p className="label">
          {index} <span aria-hidden="true">/</span> {label}
        </p>
        <h2
          id={`${id}-heading`}
          className="mt-4 max-w-3xl font-display text-2xl font-semibold tracking-[-0.02em] text-balance md:text-4xl"
        >
          {heading}
        </h2>
        {intro ? (
          <p className="mt-4 max-w-2xl text-base text-steel md:text-lg">{intro}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
