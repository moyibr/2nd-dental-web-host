import { site } from '@/content/site';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="label text-ink">
          {site.name} <span aria-hidden="true">·</span> {site.role}{' '}
          <span aria-hidden="true">·</span> {site.location}
        </p>
        <p className="label">
          {site.footer.note} <span aria-hidden="true">·</span> {year}
        </p>
      </div>
    </footer>
  );
}
