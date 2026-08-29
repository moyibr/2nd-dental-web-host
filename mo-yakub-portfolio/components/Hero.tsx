import { site } from '@/content/site';
import { ArrowDownIcon, ArrowIcon } from '@/components/icons';

/**
 * The positioning line is the largest type on the page — not the name. Both
 * audiences need "builds clinic websites" inside a second; who I am can wait
 * for the label above it.
 */
export default function Hero() {
  const { hero } = site;

  return (
    <section id="top" aria-labelledby="top-heading" className="scroll-mt-14">
      <div className="mx-auto w-full max-w-6xl px-5 pt-14 pb-16 md:px-10 md:pt-28 md:pb-24">
        <p className="label">{hero.eyebrow}</p>
        <h1
          id="top-heading"
          className="mt-5 max-w-4xl font-display text-[2rem] leading-[1.1] font-semibold tracking-[-0.03em] text-balance md:text-[3.5rem] lg:text-[4rem]"
        >
          <span className="text-steel">{hero.headlineLead} </span>
          <span className="text-ink">{hero.headlineFocus}</span>
        </h1>
        <p className="mt-7 max-w-xl text-base text-steel md:text-lg">
          {hero.support}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={hero.primaryCta.href}
            className="inline-flex h-12 items-center justify-center gap-2 bg-surgical px-6 text-sm font-medium text-surface transition-opacity hover:opacity-90"
          >
            {hero.primaryCta.label}
            <ArrowDownIcon className="h-4 w-4" />
          </a>
          <a
            href={hero.secondaryCta.href}
            className="inline-flex h-12 items-center justify-center gap-2 border border-ink px-6 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-surface"
          >
            {hero.secondaryCta.label}
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-hairline pt-5">
          {hero.stack.map((item) => (
            <li key={item} className="label">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
