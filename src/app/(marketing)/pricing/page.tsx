const AGENT_URL = process.env.NEXT_PUBLIC_AGENT_URL || "https://dealpulseagent.com";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-center text-4xl font-bold">Pricing</h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-600">
        One flat monthly price. Everything included. Cancel anytime.
      </p>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Standard</h2>
          <p className="mt-6 text-5xl font-bold">
            $1,500
            <span className="text-lg font-normal text-slate-500">/month</span>
          </p>
          <p className="mt-2 text-sm text-slate-500">Billed monthly. No contract.</p>
          <ul className="mt-8 space-y-3 text-slate-700">
            <li>✓ Custom subdomain &amp; branding</li>
            <li>✓ Daily automated deal selection</li>
            <li>✓ MLS Grid integration</li>
            <li>✓ Social media auto-posting (FB, IG, LinkedIn)</li>
            <li>✓ Lead email + SMS forwarding</li>
            <li>✓ Unlimited target zip codes</li>
            <li>✓ Ongoing support</li>
          </ul>
          <a
            href={AGENT_URL}
            className="mt-8 block rounded-md bg-brand-primary px-6 py-3 text-center font-semibold text-white hover:bg-sky-600"
          >
            Get started
          </a>
        </div>

        <div className="rounded-xl border-2 border-brand-accent bg-white p-8 shadow-sm">
          <div className="inline-block rounded-full bg-brand-accent px-3 py-1 text-xs font-semibold text-white">
            With lender sponsor
          </div>
          <h2 className="mt-2 text-2xl font-semibold">Co-branded</h2>
          <p className="mt-6 text-5xl font-bold">
            $1,250
            <span className="text-lg font-normal text-slate-500">/month</span>
          </p>
          <p className="mt-2 text-sm text-slate-500">Lender pays the $250 difference.</p>
          <ul className="mt-8 space-y-3 text-slate-700">
            <li>✓ Everything in Standard</li>
            <li>✓ Co-branded with your preferred lender</li>
            <li>✓ Lender logo on every deal</li>
            <li>✓ Split marketing cost model</li>
          </ul>
          <a
            href={AGENT_URL}
            className="mt-8 block rounded-md bg-brand-accent px-6 py-3 text-center font-semibold text-white hover:bg-amber-600"
          >
            Get started with a sponsor
          </a>
        </div>
      </div>
    </div>
  );
}
