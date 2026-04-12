import Link from "next/link";

const AGENT_URL = process.env.NEXT_PUBLIC_AGENT_URL || "https://dealpulseagent.com";
const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL || "https://deals.rehmertandrews.com";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark to-slate-800 text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
            Your market. Your brand.
            <br />
            <span className="text-brand-primary">Daily deals — automated.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            White-labeled Deal of the Day real estate apps that post fresh undervalued
            listings every morning — under your name, in your market.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a
              href={AGENT_URL}
              className="rounded-md bg-brand-primary px-6 py-3 font-semibold text-white hover:bg-sky-600"
            >
              Launch your site
            </a>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-slate-500 px-6 py-3 font-semibold hover:bg-slate-700"
            >
              See a live example →
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold">How it works</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              n: "1",
              t: "Submit your brand",
              d: "Upload your logo, pick colors, share your MLS Grid token, define your target zip codes.",
            },
            {
              n: "2",
              t: "We build your site",
              d: "In 24-48 hours your custom Deal of the Day app is live on your subdomain.",
            },
            {
              n: "3",
              t: "Daily deals, automatically",
              d: "Every morning, the best undervalued listings are posted under your brand across web and social.",
            },
          ].map((s) => (
            <div key={s.n} className="rounded-lg border border-slate-200 p-6">
              <div className="text-4xl font-bold text-brand-primary">{s.n}</div>
              <h3 className="mt-2 text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-slate-600">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-3xl font-bold">Simple pricing</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-8">
              <h3 className="text-xl font-semibold">Standard</h3>
              <p className="mt-4 text-4xl font-bold">
                $1,500<span className="text-base font-normal text-slate-500">/mo</span>
              </p>
              <ul className="mt-6 space-y-2 text-slate-700">
                <li>✓ Your custom Deal of the Day site</li>
                <li>✓ Daily automated deal selection</li>
                <li>✓ Social media auto-posting</li>
                <li>✓ MLS Grid integration</li>
              </ul>
            </div>
            <div className="rounded-lg border-2 border-brand-accent bg-white p-8">
              <div className="inline-block rounded-full bg-brand-accent px-3 py-1 text-xs font-semibold text-white">
                Lender sponsored
              </div>
              <h3 className="mt-2 text-xl font-semibold">Co-branded</h3>
              <p className="mt-4 text-4xl font-bold">
                $1,250<span className="text-base font-normal text-slate-500">/mo</span>
              </p>
              <ul className="mt-6 space-y-2 text-slate-700">
                <li>✓ Everything in Standard</li>
                <li>✓ Lender logo + co-branding</li>
                <li>✓ Split cost with your preferred lender</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link href="/pricing" className="text-brand-primary hover:underline">
              See full pricing details →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold">FAQ</h2>
        <div className="mt-10 space-y-6">
          {[
            {
              q: "How quickly can I get my site live?",
              a: "Most agents are live within 24-48 hours of completing onboarding and payment.",
            },
            {
              q: "Do I need an MLS Grid token?",
              a: "Yes — MLS Grid is how we pull listing data. If you don't have one, we can help you request access through your local MLS.",
            },
            {
              q: "Can I cancel any time?",
              a: "Yes, DealPulse is month-to-month with no long-term contract.",
            },
            {
              q: "How does the lender co-brand discount work?",
              a: "If you bring a preferred lender sponsor, they split the monthly cost and their branding appears alongside yours.",
            },
          ].map((f) => (
            <div key={f.q} className="rounded-lg border border-slate-200 p-6">
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-2 text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark py-16 text-center text-white">
        <h2 className="text-3xl font-bold">Ready to launch?</h2>
        <p className="mt-4 text-slate-300">Set up your Deal of the Day site in minutes.</p>
        <a
          href={AGENT_URL}
          className="mt-8 inline-block rounded-md bg-brand-primary px-8 py-3 font-semibold hover:bg-sky-600"
        >
          Start onboarding →
        </a>
      </section>
    </>
  );
}
