import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Founder’s Story",
  description:
    "The story behind the creation of Second Start Initiative — why it exists, and the heart driving its mission.",
};

export default function FoundersStoryPage() {
  return (
    <>
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-sm font-medium text-marigold">Founder’s Journey</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] sm:text-5xl">
            From vision to action
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
            Discover the story behind the creation of Second Start Initiative
            — why it exists, and the heart driving its mission.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
            <Image
              src="/images/founder.jpg"
              alt="Portrait of Second Start Initiative's founder"
              fill
              sizes="(min-width: 1024px) 35vw, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl">Our Founder</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
              Imanuel Otieno and Patrik K. Ekai founded Second Start
              Initiative, driven by a vision to support youth transitioning
              from care. Having witnessed the challenges first-hand, they
              committed to creating opportunities for mentorship, skills
              development, and community. Their journey is a testament to
              resilience, empathy, and actionable impact.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
