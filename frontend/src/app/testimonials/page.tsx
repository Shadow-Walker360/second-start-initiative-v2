import type { Metadata } from "next";
import Link from "next/link";
import { ORG } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Stories from people involved with Second Start Initiative.",
};

export default function TestimonialsPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <h1 className="font-display text-4xl sm:text-5xl">
        What People Are Saying
      </h1>

      <div className="mt-10 rounded-sm border border-ink-line bg-paper-dim px-6 py-10 sm:px-10">
        <p className="font-display text-xl">
          We’re still collecting real stories here.
        </p>
        <p className="mt-4 leading-relaxed text-ink/70">
          Rather than publish placeholder quotes, we’re leaving this page
          open until we can share real, consented testimonials from
          volunteers, mentors, and young people who’ve been part of Second
          Start Initiative.
        </p>
        <p className="mt-4 leading-relaxed text-ink/70">
          Been part of SSI and want to share your experience? We’d love to
          hear from you.
        </p>
        <a
          href={`mailto:${ORG.email}?subject=Testimonial for Second Start Initiative`}
          className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
        >
          Share your story
        </a>
      </div>

      <p className="mt-10 text-sm text-ink/60">
        Looking for ways to get involved instead?{" "}
        <Link
          href="/get-involved"
          className="font-medium text-marigold-deep underline underline-offset-4 hover:text-marigold"
        >
          See how you can help
        </Link>
        .
      </p>
    </section>
  );
}
