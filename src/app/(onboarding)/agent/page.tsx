import Link from "next/link";

export default function AgentHomePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-5xl font-bold">
        Set up your <span className="text-brand-primary">Deal of the Day</span> site
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
        A 10-minute onboarding gets your branded daily deal site live in 24-48 hours.
        Your market, your brand, your leads.
      </p>
      <Link
        href="/agent/apply"
        className="mt-10 inline-block rounded-md bg-brand-primary px-8 py-4 text-lg font-semibold text-white hover:bg-sky-600"
      >
        Start your application →
      </Link>
      <div className="mt-16 grid gap-6 text-left md:grid-cols-3">
        {[
          ["1. Tell us about you", "Name, brokerage, license, contact."],
          ["2. Brand & market", "Colors, logo, MLS, zip codes."],
          ["3. Pay & launch", "$1,500/mo — or $1,250 with a lender sponsor."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-lg border border-slate-200 bg-white p-6">
            <h3 className="font-semibold">{t}</h3>
            <p className="mt-1 text-sm text-slate-600">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
