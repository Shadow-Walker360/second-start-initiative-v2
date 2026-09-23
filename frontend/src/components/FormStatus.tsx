export type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export default function FormStatus({ state }: { state: FormState }) {
  if (state.status === "idle") return null;

  if (state.status === "submitting") {
    return (
      <p role="status" className="text-sm text-ink/60">
        Submitting…
      </p>
    );
  }

  if (state.status === "success") {
    return (
      <p
        role="status"
        className="rounded-md border border-moss/30 bg-moss/10 px-4 py-3 text-sm text-moss"
      >
        {state.message}
      </p>
    );
  }

  return (
    <p
      role="alert"
      className="rounded-md border border-red-600/30 bg-red-600/5 px-4 py-3 text-sm text-red-700"
    >
      {state.message}
    </p>
  );
}
