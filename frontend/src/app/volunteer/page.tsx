import type { Metadata } from "next";
import VolunteerForm from "@/components/VolunteerForm";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Join Second Start Initiative and make a meaningful impact in the lives of young adults transitioning out of children's homes.",
};

export default function VolunteerPage() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <h1 className="font-display text-4xl sm:text-5xl">Volunteer With Us</h1>
      <p className="mt-6 leading-relaxed text-ink/75">
        Join Second Start Initiative and make a meaningful impact in the
        lives of young adults transitioning out of children’s homes. Fill
        out the form below and we’ll follow up by email or phone.
      </p>

      <div className="mt-12">
        <VolunteerForm />
      </div>
    </section>
  );
}
