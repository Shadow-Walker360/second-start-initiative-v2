"use client";

import { FormEvent, useState } from "react";
import { initiateDonation } from "@/lib/api";
import FormStatus, { FormState } from "@/components/FormStatus";

const PRESET_AMOUNTS = [10, 25, 50, 100] as const;
const CURRENCIES = ["KES", "USD", "EUR"] as const;

const PROVIDERS = [
  { id: "mpesa", label: "M-Pesa", group: "Mobile money", needsPhone: true },
  { id: "airtel", label: "Airtel Money", group: "Mobile money", needsPhone: true },
  { id: "mtn", label: "MTN Mobile Money", group: "Mobile money", needsPhone: true },
  { id: "card", label: "Credit / Debit card", group: "Card", needsPhone: false },
  { id: "paypal", label: "PayPal", group: "Wallet", needsPhone: false },
  { id: "bank", label: "Bank transfer", group: "Bank", needsPhone: false },
  { id: "crypto", label: "Cryptocurrency", group: "Crypto", needsPhone: false },
] as const;

export default function DonateForm() {
  const [amount, setAmount] = useState<number | "custom">(25);
  const [customAmount, setCustomAmount] = useState("");
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("KES");
  const [recurring, setRecurring] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [provider, setProvider] = useState<(typeof PROVIDERS)[number]["id"]>("mpesa");
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [error, setError] = useState<string | null>(null);

  const selectedProvider = PROVIDERS.find((p) => p.id === provider)!;
  const resolvedAmount = amount === "custom" ? Number(customAmount) : amount;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!resolvedAmount || resolvedAmount <= 0) {
      setError("Enter an amount greater than zero.");
      return;
    }

    const data = new FormData(e.currentTarget);
    const donor = anonymous
      ? undefined
      : {
          name: String(data.get("name") ?? "") || undefined,
          email: String(data.get("email") ?? "") || undefined,
          phone: String(data.get("phone") ?? "") || undefined,
        };

    if (selectedProvider.needsPhone && !donor?.phone) {
      setError("Enter the phone number to send the payment prompt to.");
      return;
    }

    setState({ status: "submitting" });

    const result = await initiateDonation({
      amount: resolvedAmount,
      currency,
      recurring,
      anonymous,
      provider,
      donor,
    });

    if (result.ok) {
      setState({
        status: "success",
        message: result.data.nextStep
          ? `Donation started — reference ${result.data.reference}. ${result.data.nextStep}`
          : `Donation started — reference ${result.data.reference}. Follow the instructions sent to complete it.`,
      });
    } else {
      setState({ status: "error", message: result.error });
    }
  }

  const fieldClass =
    "w-full rounded-sm border border-ink-line bg-paper px-4 py-3 text-ink placeholder:text-ink/40 focus:border-marigold-deep";

  return (
    <form onSubmit={handleSubmit} className="grid gap-8">
      <fieldset>
        <legend className="mb-3 text-sm font-medium text-ink">Amount</legend>
        <div className="flex flex-wrap gap-3">
          {PRESET_AMOUNTS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmount(preset)}
              aria-pressed={amount === preset}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                amount === preset
                  ? "border-marigold bg-marigold text-ink"
                  : "border-ink-line text-ink hover:border-marigold-deep"
              }`}
            >
              {preset}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setAmount("custom")}
            aria-pressed={amount === "custom"}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
              amount === "custom"
                ? "border-marigold bg-marigold text-ink"
                : "border-ink-line text-ink hover:border-marigold-deep"
            }`}
          >
            Custom
          </button>
        </div>
        {amount === "custom" && (
          <input
            type="number"
            min={1}
            step="1"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Enter amount"
            aria-label="Custom donation amount"
            className={`${fieldClass} mt-3 max-w-xs`}
          />
        )}
      </fieldset>

      <div>
        <label htmlFor="currency" className="mb-2 block text-sm font-medium text-ink">
          Currency
        </label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as (typeof CURRENCIES)[number])}
          className={`${fieldClass} max-w-xs`}
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-ink/80">
          <input
            type="checkbox"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
            className="h-4 w-4"
          />
          Make this a monthly donation
        </label>
        <label className="flex items-center gap-2 text-sm text-ink/80">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            className="h-4 w-4"
          />
          Donate anonymously
        </label>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-ink">Payment method</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {PROVIDERS.map((p) => (
            <label
              key={p.id}
              className={`flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 text-sm transition-colors ${
                provider === p.id
                  ? "border-marigold-deep bg-marigold/10"
                  : "border-ink-line hover:border-ink/30"
              }`}
            >
              <input
                type="radio"
                name="provider"
                value={p.id}
                checked={provider === p.id}
                onChange={() => setProvider(p.id)}
                className="h-4 w-4"
              />
              <span>
                {p.label}
                <span className="block text-xs text-ink/50">{p.group}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {!anonymous && (
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
              Name (optional)
            </label>
            <input id="name" name="name" type="text" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
              Email (for your receipt)
            </label>
            <input id="email" name="email" type="email" className={fieldClass} />
          </div>
          {selectedProvider.needsPhone && (
            <div className="sm:col-span-2">
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-ink">
                Phone number for {selectedProvider.label}
              </label>
              <input id="phone" name="phone" type="tel" className={fieldClass} placeholder="+254…" />
            </div>
          )}
        </div>
      )}

      {anonymous && selectedProvider.needsPhone && (
        <div>
          <label htmlFor="phone-anon" className="mb-2 block text-sm font-medium text-ink">
            Phone number for {selectedProvider.label}
          </label>
          <input id="phone-anon" name="phone" type="tel" className={fieldClass} placeholder="+254…" />
        </div>
      )}

      {error && (
        <p role="alert" className="rounded-md border border-red-600/30 bg-red-600/5 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex flex-col items-start gap-4">
        <button
          type="submit"
          disabled={state.status === "submitting"}
          className="rounded-full bg-marigold px-8 py-3 text-sm font-medium text-ink transition-colors hover:bg-marigold-deep disabled:opacity-60"
        >
          {state.status === "submitting" ? "Starting…" : "Continue"}
        </button>
        <FormStatus state={state} />
        <p className="text-xs text-ink/50">
          You won’t be charged on this page — this starts the donation with
          our payment processor, who will guide you through completing it
          securely.
        </p>
      </div>
    </form>
  );
}
