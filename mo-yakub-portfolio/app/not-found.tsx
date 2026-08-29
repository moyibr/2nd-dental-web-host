import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-5 py-20 md:px-10">
      <p className="label">404 / Not found</p>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] md:text-5xl">
        That page does not exist.
      </h1>
      <p className="mt-5 max-w-lg text-base text-steel md:text-lg">
        There is only one page here — the portfolio itself.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 w-fit items-center bg-surgical px-6 text-sm font-medium text-surface transition-opacity hover:opacity-90"
      >
        Back to the portfolio
      </Link>
    </main>
  );
}
