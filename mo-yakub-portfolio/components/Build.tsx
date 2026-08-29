import Section from '@/components/Section';
import { sections, site } from '@/content/site';

const meta = sections.find((section) => section.id === 'build')!;

/**
 * Nine capabilities, framed as what a patient meets and what the clinic gets —
 * not a technology grid. Laid out as a hairline table: no cards, no shadows.
 */
export default function Build() {
  return (
    <Section
      id={meta.id}
      index={meta.index}
      label={meta.label}
      heading={site.build.heading}
      intro={site.build.intro}
    >
      <ul className="mt-10 grid border-t border-l border-hairline sm:grid-cols-2 lg:grid-cols-3">
        {site.build.items.map((item) => (
          <li
            key={item.title}
            className="border-r border-b border-hairline bg-surface p-5 md:p-7"
          >
            <h3 className="font-display text-base font-semibold tracking-[-0.01em] md:text-lg">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-steel">{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
