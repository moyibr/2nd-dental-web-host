import Section from '@/components/Section';
import { sections, site } from '@/content/site';

const meta = sections.find((section) => section.id === 'about')!;

export default function About() {
  return (
    <Section
      id={meta.id}
      index={meta.index}
      label={meta.label}
      heading={site.about.heading}
    >
      <div className="mt-8 max-w-2xl space-y-5">
        {site.about.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="text-base text-steel md:text-lg">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
