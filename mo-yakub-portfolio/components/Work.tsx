import ProjectPanel from '@/components/ProjectPanel';
import Section from '@/components/Section';
import { projects, sections, site } from '@/content/site';

const meta = sections.find((section) => section.id === 'work')!;

export default function Work() {
  return (
    <Section
      id={meta.id}
      index={meta.index}
      label={meta.label}
      heading={site.work.heading}
    >
      {/* Stated plainly and up front: these are demos, not clients. */}
      <p className="mt-6 max-w-2xl border-l-2 border-hairline pl-4 text-sm text-steel md:text-base">
        {site.work.note}
      </p>

      <div className="mt-10 space-y-10 md:mt-14 md:space-y-16">
        {projects.map((project) => (
          <ProjectPanel key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
