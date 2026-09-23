import type { Metadata } from "next";
import Link from "next/link";
import InquiryForm from "@/components/InquiryForm";
import { INVOLVEMENT_PATHWAYS, ORG } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Volunteer, partner, mentor, or donate to support Second Start Initiative's work with young adults transitioning out of children's homes.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h1 className="max-w-xl font-display text-4xl leading-[1.1] sm:text-5xl">
            Get Involved
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
            Your contribution makes a real difference — choose the way that
            fits you best.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-px overflow-hidden rounded-sm border border-ink-line bg-ink-line sm:grid-cols-2">
          {INVOLVEMENT_PATHWAYS.map((pathway) => (
            <div key={pathway.title} className="bg-paper p-8">
              <h2 className="font-display text-2xl">{pathway.title}</h2>
              <p className="mt-3 text-ink/70">{pathway.description}</p>
              <Link
                href={pathway.href}
                className="mt-5 inline-block text-sm font-medium text-marigold-deep underline underline-offset-4 hover:text-marigold"
              >
                {pathway.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper-dim">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="font-display text-2xl sm:text-3xl">
            Reach out directly
          </h2>
          <p className="mt-4 text-ink/70">
            Partnering, mentoring, or something else in mind? Tell us about
            it and we’ll get back to you — or reach us directly at{" "}
            <a href={`mailto:${ORG.email}`} className="text-marigold-deep underline underline-offset-4">
              {ORG.email}
            </a>{" "}
            or on{" "}
            <a href={ORG.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-marigold-deep underline underline-offset-4">
              WhatsApp
            </a>
            .
          </p>
          <div className="mt-10">
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
