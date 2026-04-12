import ApplyForm from "./ApplyForm";

export default function ApplyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold">Agent onboarding</h1>
      <p className="mt-2 text-slate-600">
        Four quick steps. Your site goes live in 24-48 hours.
      </p>
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <ApplyForm />
      </div>
    </div>
  );
}
