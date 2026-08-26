import SafeLink from '@/components/SafeLink';
import Section from '@/components/Section';
import { ArrowIcon, WhatsAppIcon } from '@/components/icons';
import { contact, emailHref, sections, site, whatsappHref } from '@/content/site';

const meta = sections.find((section) => section.id === 'contact')!;

/** The whole page exists to get someone here, so the actions are plain rows. */
export default function Contact() {
  const rows = [
    {
      label: 'Email',
      href: emailHref(),
      display: contact.email,
      placeholder: 'Email coming soon',
      external: false,
    },
    {
      label: 'Fiverr',
      href: contact.fiverrUrl,
      display: 'Fiverr profile',
      placeholder: 'Fiverr link coming soon',
      external: true,
    },
    {
      label: 'GitHub',
      href: contact.githubUrl,
      display: 'GitHub profile',
      placeholder: 'GitHub link coming soon',
      external: true,
    },
  ];

  return (
    <Section
      id={meta.id}
      index={meta.index}
      label={meta.label}
      heading={site.contactSection.heading}
      intro={site.contactSection.line}
    >
      <div className="mt-9 max-w-3xl">
        <SafeLink
          href={whatsappHref()}
          external
          placeholder="WhatsApp number coming soon"
          className="inline-flex min-h-12 items-center justify-center gap-3 bg-surgical px-6 py-3 text-sm font-medium text-surface transition-opacity hover:opacity-90"
          placeholderClassName="inline-flex min-h-12 items-center justify-center gap-3 border border-hairline bg-surface px-6 py-3 text-sm text-steel"
          aria-label="Message me on WhatsApp"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Message me on WhatsApp
        </SafeLink>
      </div>

      <ul className="mt-10 max-w-3xl border-t border-hairline">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex min-h-14 flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-hairline py-4"
          >
            <span className="label">{row.label}</span>
            <SafeLink
              href={row.href}
              external={row.external}
              placeholder={row.placeholder}
              className="inline-flex items-center gap-2 text-sm break-all text-surgical underline-offset-4 transition-colors hover:text-ink hover:underline md:text-base"
            >
              {row.display}
              <ArrowIcon className="h-4 w-4 shrink-0" />
            </SafeLink>
          </li>
        ))}
      </ul>
    </Section>
  );
}
