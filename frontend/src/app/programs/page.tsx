import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PROGRAMS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Transitional support, mentorship, skills and career development, and entrepreneurship programs run by Second Start Initiative.",
};

export default function ProgramsPage() {
  return (
    <>
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h1 className="max-w-2xl font-display text-4xl leading-[1.1] sm:text-5xl">
            Our Programs
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
            Each initiative under Second Start Initiative is built around
            dignity, skill, and opportunity.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col gap-16 sm:gap-24">
          {PROGRAMS.map((program, i) => (
            <article
              key={program.slug}
              id={program.slug}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl">
                  {program.title}
                </h2>
                <p className="mt-4 leading-relaxed text-ink/80">
                  {program.summary}
                </p>
                <p className="mt-4 leading-relaxed text-ink/65">
                  {program.details}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-paper-dim">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-20">
          <div className="max-w-lg">
            <h2 className="font-display text-2xl sm:text-3xl">
              Want to support a program directly?
            </h2>
            <p className="mt-3 text-ink/70">
              Volunteers, mentors, and donors all make these programs
              possible.
            </p>
          </div>
          <Link
            href="/get-involved"
            className="shrink-0 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
          >
            Get Involved
          </Link>
        </div>
      </section>
    </>
  );
}
