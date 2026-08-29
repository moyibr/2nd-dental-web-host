import Section from '@/components/Section';
import { sections, site } from '@/content/site';

const meta = sections.find((section) => section.id === 'process')!;

export default function Process() {
  return (
    <Section
      id={meta.id}
      index={meta.index}
      label={meta.label}
      heading={site.process.heading}
    >
      <ol className="mt-10 grid gap-px bg-hairline md:grid-cols-4">
        {site.process.steps.map((step) => (
          <li key={step.index} className="bg-ground p-5 md:p-6">
            <span className="label text-surgical">{step.index}</span>
            <h3 className="mt-3 font-display text-base font-semibold tracking-[-0.01em] md:text-lg">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-steel">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
