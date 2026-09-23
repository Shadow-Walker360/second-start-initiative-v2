"use client";

import { FormEvent, useState } from "react";
import { submitInquiry } from "@/lib/api";
import FormStatus, { FormState } from "@/components/FormStatus";

const PATHWAYS = ["Partner", "Mentor", "General question", "Something else"] as const;

type Errors = Partial<Record<"fullName" | "email" | "pathway" | "message", string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function InquiryForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [errors, setErrors] = useState<Errors>({});

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const get = (k: string) => String(data.get(k) ?? "").trim();

    if (!get("fullName")) next.fullName = "Enter your full name.";
    if (!get("email")) next.email = "Enter your email address.";
    else if (!EMAIL_RE.test(get("email"))) next.email = "Enter a valid email address.";
    if (!get("pathway")) next.pathway = "Choose what this is about.";
    if (!get("message") || get("message").length < 10)
      next.message = "Add a few details so we know how to help.";

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

    const result = await submitInquiry({
      fullName: String(data.get("fullName")),
      email: String(data.get("email")),
      phone: String(data.get("phone") ?? ""),
      pathway: String(data.get("pathway")),
      message: String(data.get("message")),
    });

    if (result.ok) {
      setState({
        status: "success",
        message: "Thank you — we've received your message and will reply soon.",
      });
      form.reset();
    } else {
      setState({ status: "error", message: result.error });
    }
  }

  const fieldClass =
    "w-full rounded-sm border border-ink-line bg-paper px-4 py-3 text-ink placeholder:text-ink/40 focus:border-marigold-deep";

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-6" id="inquiry">
      <div>
        <label htmlFor="i-fullName" className="mb-2 block text-sm font-medium text-ink">
          Full name
        </label>
        <input id="i-fullName" name="fullName" type="text" autoComplete="name" className={fieldClass} />
        {errors.fullName && <p role="alert" className="mt-1 text-sm text-red-700">{errors.fullName}</p>}
      </div>

      <div>
        <label htmlFor="i-email" className="mb-2 block text-sm font-medium text-ink">
          Email address
        </label>
        <input id="i-email" name="email" type="email" autoComplete="email" className={fieldClass} />
        {errors.email && <p role="alert" className="mt-1 text-sm text-red-700">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="i-phone" className="mb-2 block text-sm font-medium text-ink">
          Phone number (optional)
        </label>
        <input id="i-phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="i-pathway" className="mb-2 block text-sm font-medium text-ink">
          What&rsquo;s this about?
        </label>
        <select id="i-pathway" name="pathway" defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Choose one
          </option>
          {PATHWAYS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {errors.pathway && <p role="alert" className="mt-1 text-sm text-red-700">{errors.pathway}</p>}
      </div>

      <div>
        <label htmlFor="i-message" className="mb-2 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea id="i-message" name="message" rows={5} className={fieldClass} />
        {errors.message && <p role="alert" className="mt-1 text-sm text-red-700">{errors.message}</p>}
      </div>

      <div className="flex flex-col items-start gap-4">
        <button
          type="submit"
          disabled={state.status === "submitting"}
          className="rounded-full bg-ink px-7 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink-soft disabled:opacity-60"
        >
          {state.status === "submitting" ? "Sending…" : "Send message"}
        </button>
        <FormStatus state={state} />
      </div>
    </form>
  );
}
