"use client";

import { FormEvent, useState } from "react";
import { submitVolunteerApplication } from "@/lib/api";
import { AREAS_OF_INTEREST } from "@/lib/site-data";
import FormStatus, { FormState } from "@/components/FormStatus";

type Errors = Partial<
  Record<
    "fullName" | "email" | "phone" | "location" | "areaOfInterest" | "message" | "consent",
    string
  >
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function VolunteerForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [errors, setErrors] = useState<Errors>({});

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const get = (k: string) => String(data.get(k) ?? "").trim();

    if (!get("fullName")) next.fullName = "Enter your full name.";
    if (!get("email")) next.email = "Enter your email address.";
    else if (!EMAIL_RE.test(get("email"))) next.email = "Enter a valid email address.";
    if (!get("phone")) next.phone = "Enter a phone number we can reach you on.";
    if (!get("location")) next.location = "Tell us which town or city you're in.";
    if (!get("areaOfInterest")) next.areaOfInterest = "Choose an area of interest.";
    if (!get("message") || get("message").length < 20)
      next.message = "Tell us a little more (at least 20 characters).";
    if (data.get("consent") !== "on")
      next.consent = "Please confirm you're okay with us storing this information.";

    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const validationErrors = validate(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setState({ status: "submitting" });

    const result = await submitVolunteerApplication({
      fullName: String(data.get("fullName")),
      email: String(data.get("email")),
      phone: String(data.get("phone")),
      location: String(data.get("location")),
      areaOfInterest: String(data.get("areaOfInterest")),
      skills: String(data.get("skills") ?? ""),
      availability: String(data.get("availability") ?? ""),
      message: String(data.get("message")),
      consent: true,
    });

    if (result.ok) {
      setState({
        status: "success",
        message:
          "Thank you. Your volunteer application has been received — we'll be in touch soon.",
      });
      form.reset();
    } else {
      setState({ status: "error", message: result.error });
    }
  }

  const fieldClass =
    "w-full rounded-sm border border-ink-line bg-paper px-4 py-3 text-ink placeholder:text-ink/40 focus:border-marigold-deep";

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-6">
      <Field label="Full name" htmlFor="fullName" error={errors.fullName}>
        <input id="fullName" name="fullName" type="text" autoComplete="name" className={fieldClass} />
      </Field>

      <Field label="Email address" htmlFor="email" error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" className={fieldClass} />
      </Field>

      <Field label="Phone number" htmlFor="phone" error={errors.phone}>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
      </Field>

      <Field label="Location (town / city)" htmlFor="location" error={errors.location}>
        <input id="location" name="location" type="text" className={fieldClass} />
      </Field>

      <Field label="Area of interest" htmlFor="areaOfInterest" error={errors.areaOfInterest}>
        <select id="areaOfInterest" name="areaOfInterest" defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Choose one
          </option>
          {AREAS_OF_INTEREST.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Relevant skills (optional)" htmlFor="skills">
        <input id="skills" name="skills" type="text" className={fieldClass} placeholder="e.g. career coaching, graphic design" />
      </Field>

      <Field label="Availability (optional)" htmlFor="availability">
        <input id="availability" name="availability" type="text" className={fieldClass} placeholder="e.g. weekday evenings, one Saturday a month" />
      </Field>

      <Field label="Why do you want to volunteer?" htmlFor="message" error={errors.message}>
        <textarea id="message" name="message" rows={5} className={fieldClass} />
      </Field>

      <div>
        <label htmlFor="consent" className="flex items-start gap-3 text-sm text-ink/75">
          <input id="consent" name="consent" type="checkbox" className="mt-1 h-4 w-4" />
          <span>
            I agree that Second Start Initiative can store this information
            to process my volunteer application.
          </span>
        </label>
        {errors.consent && (
          <p role="alert" className="mt-1 text-sm text-red-700">
            {errors.consent}
          </p>
        )}
      </div>

      <div className="flex flex-col items-start gap-4">
        <button
          type="submit"
          disabled={state.status === "submitting"}
          className="rounded-full bg-marigold px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-marigold-deep disabled:opacity-60"
        >
          {state.status === "submitting" ? "Submitting…" : "Submit application"}
        </button>
        <FormStatus state={state} />
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
