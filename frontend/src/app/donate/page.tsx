import type { Metadata } from "next";
import DonateForm from "@/components/DonateForm";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Second Start Initiative's work with young adults transitioning out of children's homes in Kenya.",
};

export default function DonatePage() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="text-sm font-medium text-marigold-deep">Support Our Mission</p>
      <h1 className="mt-4 font-display text-4xl sm:text-5xl">
        Every contribution creates real impact
      </h1>
      <p className="mt-6 leading-relaxed text-ink/75">
        A donation funds transitional housing, mentorship, and skills
        training for young adults leaving children’s homes. Choose an
        amount and a way to pay below.
      </p>

      <div className="mt-12">
        <DonateForm />
      </div>

      <dl className="mt-14 grid grid-cols-1 gap-6 border-t border-ink-line pt-10 sm:grid-cols-3">
        <div>
          <dt className="font-display text-lg">Secure</dt>
          <dd className="mt-1 text-sm text-ink/65">
            Payments are handled by licensed processors — we never see or
            store your card details.
          </dd>
        </div>
        <div>
          <dt className="font-display text-lg">Transparent</dt>
          <dd className="mt-1 text-sm text-ink/65">
            Every donation is recorded and reconciled against what our
            programs spend.
          </dd>
        </div>
        <div>
          <dt className="font-display text-lg">Receipted</dt>
          <dd className="mt-1 text-sm text-ink/65">
            You’ll get an emailed receipt once your donation is confirmed.
          </dd>
        </div>
      </dl>
    </section>
  );
}
