import Image from "next/image";
import Link from "next/link";
import { PILLARS } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
          <div>
            <p className="text-sm font-medium text-marigold">Compassion in action</p>
            <h1 className="mt-4 max-w-xl font-display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              Everyone deserves a second start.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-paper/75 sm:text-lg">
              We support young adults transitioning out of children’s homes with
              guidance, opportunity, and dignity — so they don’t have to face
              adulthood alone.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/get-involved"
                className="rounded-full bg-marigold px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-marigold-deep"
              >
                Get Involved
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-paper/30 px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-marigold hover:text-marigold"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
            <Image
              src="/images/pic2.jpg"
              alt="Young adults supported by Second Start Initiative's programs"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* CHALLENGE / RESPONSE */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl">The Challenge</h2>
            <p className="mt-4 leading-relaxed text-ink/75">
              Young people leaving children’s homes in Kenya often face
              adulthood with little family support, few resources, and no
              clear path toward independence — expected to build stable,
              dignified lives with almost nothing to start from.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl">Our Response</h2>
            <p className="mt-4 leading-relaxed text-ink/75">
              Second Start Initiative walks alongside them through that
              transition — pairing mentorship with practical life skills,
              education and work pathways, and a community that doesn’t
              disappear once they leave institutional care.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="font-display text-2xl sm:text-3xl">What We Do</h2>
          <div className="mt-10 divide-y divide-ink-line border-y border-ink-line">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="grid gap-2 py-6 sm:grid-cols-[220px_1fr] sm:items-baseline sm:gap-8"
              >
                <h3 className="font-display text-lg">{pillar.title}</h3>
                <p className="text-ink/70">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col items-start gap-6 border-t border-ink-line pt-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-lg">
            <h2 className="font-display text-2xl sm:text-3xl">
              Be part of someone’s second start
            </h2>
            <p className="mt-3 text-ink/70">
              Whether through mentorship, partnership, or support, your
              involvement can change a life.
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
