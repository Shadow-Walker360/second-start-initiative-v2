import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CORE_VALUES, MISSION, VISION } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Second Start Initiative's mission, vision, and core values — supporting young adults transitioning out of children's homes in Kenya.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-sm font-medium text-marigold">About</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] sm:text-5xl">
            Second Start Initiative
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
            We are committed to empowering young adults transitioning from
            children’s homes, helping them step confidently into independent,
            fulfilling lives.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="border-l-2 border-marigold pl-6">
            <h2 className="font-display text-2xl">Our Mission</h2>
            <p className="mt-4 leading-relaxed text-ink/75">{MISSION}</p>
          </div>
          <div className="border-l-2 border-moss pl-6">
            <h2 className="font-display text-2xl">Our Vision</h2>
            <p className="mt-4 leading-relaxed text-ink/75">{VISION}</p>
          </div>
        </div>
      </section>

      <section className="bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="font-display text-2xl sm:text-3xl">Our Core Values</h2>
          <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
            {CORE_VALUES.map((value) => (
              <li key={value} className="font-display text-xl">
                {value}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
            <Image
              src="/images/founder.jpg"
              alt="Second Start Initiative's founder"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl">
              Where it started
            </h2>
            <p className="mt-4 leading-relaxed text-ink/75">
              Second Start Initiative began with people who had seen, up
              close, what young adults face when they age out of children’s
              homes with nowhere structured to land.
            </p>
            <Link
              href="/founders-story"
              className="mt-6 inline-block text-sm font-medium text-marigold-deep underline underline-offset-4 hover:text-marigold"
            >
              Read the founder’s story →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
