/**
 * Backend API client.
 *
 * Points at NEXT_PUBLIC_API_URL (see .env.example). Every call returns a
 * discriminated result instead of throwing, so form components can render
 * loading / success / error states without try/catch scattered everywhere.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; unreachable?: boolean };

async function postJson<T>(path: string, body: unknown): Promise<ApiResult<T>> {
  if (!API_URL) {
    return {
      ok: false,
      unreachable: true,
      error:
        "This form can't reach the server yet — NEXT_PUBLIC_API_URL isn't configured.",
    };
  }

  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    let payload: unknown = null;
    try {
      payload = await res.json();
    } catch {
      // non-JSON response — fall through to status-based handling
    }

    if (!res.ok) {
      const message =
        payload && typeof payload === "object" && "error" in payload
          ? String((payload as { error: unknown }).error)
          : `Request failed (${res.status}).`;
      return { ok: false, error: message };
    }

    return { ok: true, data: payload as T };
  } catch {
    return {
      ok: false,
      unreachable: true,
      error:
        "We couldn't reach the server. Check your connection and try again.",
    };
  }
}

export type VolunteerApplication = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  areaOfInterest: string;
  skills?: string;
  availability?: string;
  message: string;
  consent: boolean;
};

export type InquirySubmission = {
  fullName: string;
  email: string;
  phone?: string;
  pathway: string;
  message: string;
};

export type DonationInitiation = {
  amount: number;
  currency: "KES" | "USD" | "EUR";
  recurring: boolean;
  anonymous: boolean;
  provider: string;
  donor?: { name?: string; email?: string; phone?: string };
};

export function submitVolunteerApplication(payload: VolunteerApplication) {
  return postJson<{ id: string }>("/api/v1/volunteers", payload);
}

export function submitInquiry(payload: InquirySubmission) {
  return postJson<{ id: string }>("/api/v1/inquiries", payload);
}

export function initiateDonation(payload: DonationInitiation) {
  return postJson<{ reference: string; nextStep?: string }>(
    "/api/v1/donations",
    payload
  );
}
