import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-start px-5 py-24 sm:px-8">
      <p className="text-sm font-medium text-marigold-deep">404</p>
      <h1 className="mt-4 font-display text-4xl">Page not found</h1>
      <p className="mt-4 text-ink/70">
        The page you’re looking for doesn’t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-ink-soft"
      >
        Back to home
      </Link>
    </section>
  );
}
