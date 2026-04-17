import Link from "next/link";

export const metadata = {
  title: "Co-Marketing Partners — DealPulse",
  description:
    "Put your brand in front of active homebuyers every single day. Lenders, insurance agents, title companies, and home inspectors — $250/month gets you placement on every deal page, every email, and every social post.",
};

const PARTNER_TYPES = [
  {
    icon: "🏦",
    title: "Lenders & Mortgage Brokers",
    pitch: "Buyers browsing a deal with a score of 82 on a $140K house are already thinking about financing. Your \"Get Pre-Approved\" button is right there.",
    examples: "Community banks · Credit unions · Mortgage brokers · Hard money lenders · DSCR lenders",
  },
  {
    icon: "🛡️",
    title: "Insurance Agents",
    pitch: "Every buyer needs homeowners insurance. Yours is the first name they see — before they've even called an agent.",
    examples: "State Farm · Farmers · Erie · Independent brokers · Any licensed P&C agent",
  },
  {
    icon: "📄",
    title: "Title Companies",
    pitch: "\"Estimate your closing costs\" is one of the first questions buyers ask. Be the answer on every single deal page.",
    examples: "Title agencies · Escrow companies · Real estate attorneys",
  },
  {
    icon: "🔎",
    title: "Home Inspectors",
    pitch: "Serious buyers schedule inspections before they make offers. Your calendar link is one tap away.",
    examples: "Certified home inspectors · Specialty inspectors · Radon & mold testing",
  },
  {
    icon: "🏠",
    title: "Home Warranty Companies",
    pitch: "Every buyer needs a home warranty. Position yours at the exact moment they're falling in love with a deal.",
    examples: "American Home Shield · Choice Home Warranty · Local warranty providers",
  },
];

const PLACEMENTS = [
  {
    icon: "🌐",
    title: "On every deal page",
    description:
      "A dedicated co-marketing block — your logo, tagline, and CTA button — appears on every deal page published. New deal, new page, your brand front and center.",
  },
  {
    icon: "📧",
    title: "In the daily subscriber email",
    description:
      "The 8 AM deal email goes to every subscriber on the list. Your co-marketing block rides along with it — every morning, every subscriber.",
  },
  {
    icon: "📱",
    title: "Called out in social posts",
    description:
      "Social posts go to Facebook, Instagram, and LinkedIn daily. Your partnership is credited in the caption copy.",
  },
];

export default function PartnersPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-brand-dark to-slate-800 text-white">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-primary mb-3">
            Co-Marketing Partners
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl leading-tight">
            Your brand in front of <br className="hidden md:block" />
            <span className="text-brand-primary">active buyers — every single day</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            DealPulse publishes a new featured deal every morning. Buyers come to the site,
            browse the deal, run the numbers — and right there, they see your logo and your CTA.
            Not a banner ad. A branded co-marketing placement on content they actually care about.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/partner/apply"
              className="rounded-md bg-brand-primary px-8 py-3.5 text-base font-bold text-white hover:bg-sky-600 transition-colors"
            >
              Apply to be a partner →
            </Link>
            <a
              href="https://deals.rehmertandrews.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-slate-500 px-8 py-3.5 font-semibold hover:bg-slate-700 transition-colors"
            >
              See a live example
            </a>
          </div>
          <p className="mt-5 text-sm text-slate-400">$250/month · Month-to-month · Cancel anytime</p>
        </div>
      </section>

      {/* ── Where you appear ── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold text-slate-900">
          Three placements. One flat fee.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          Your brand goes everywhere the deal goes — the website, the email list, and social media.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {PLACEMENTS.map((p) => (
            <div key={p.title} className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Partner types ── */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900">Who this is for</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
            Any business that serves homebuyers is a natural fit.
          </p>
          <div className="mt-12 space-y-5">
            {PARTNER_TYPES.map((pt) => (
              <div key={pt.title} className="flex gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-4xl shrink-0">{pt.icon}</div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{pt.title}</h3>
                  <p className="mt-1 text-slate-600 text-sm leading-relaxed">{pt.pitch}</p>
                  <p className="mt-2 text-xs text-slate-400 italic">{pt.examples}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Numbers ── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold text-slate-900 mb-12">
          The reach behind $250/month
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 text-center">
          {[
            { n: "365",  label: "deal pages published per year", sub: "Each one carries your brand" },
            { n: "5×",   label: "social posts per day",          sub: "FB, IG & LinkedIn daily" },
            { n: "Daily",label: "8 AM subscriber email",        sub: "Your brand in every send" },
            { n: "∞",    label: "evergreen pages",              sub: "Old pages stay live and rank" },
          ].map((s) => (
            <div key={s.n} className="rounded-xl border border-slate-200 p-6">
              <p className="text-4xl font-bold text-brand-primary">{s.n}</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{s.label}</p>
              <p className="mt-0.5 text-xs text-slate-500">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-lg px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Simple, flat pricing</h2>
          <p className="mt-3 text-slate-600">No contracts. No setup fees. No CPM or impression billing.</p>
          <div className="mt-8 rounded-2xl border-2 border-brand-primary bg-white p-10 shadow-lg">
            <p className="text-5xl font-bold text-slate-900">
              $250<span className="text-lg font-normal text-slate-500">/mo</span>
            </p>
            <p className="mt-2 text-sm text-slate-500">Month-to-month. Cancel anytime.</p>
            <ul className="mt-8 space-y-3 text-left text-sm text-slate-700">
              <li>✓ Your logo + tagline on every deal page</li>
              <li>✓ CTA button linking buyers directly to you</li>
              <li>✓ Co-branding in every daily subscriber email</li>
              <li>✓ Credited in social media post copy</li>
              <li>✓ Placement live within 24–48 hours</li>
              <li>✓ Works alongside an agent&apos;s full DealPulse subscription</li>
            </ul>
            <Link
              href="/partner/apply"
              className="mt-8 block rounded-md bg-brand-primary px-6 py-3.5 text-center text-base font-bold text-white hover:bg-sky-600 transition-colors"
            >
              Apply to be a partner →
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Want to discuss a custom arrangement?{" "}
            <a href="mailto:tobie@elitewichita.com" className="text-brand-primary underline">
              Email Tobie directly
            </a>
          </p>
        </div>
      </section>

      {/* ── National expansion pitch ── */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-primary mb-3">
          Thinking bigger?
        </p>
        <h2 className="text-2xl font-bold text-slate-900">
          DealPulse is expanding to new markets
        </h2>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto leading-relaxed">
          As DealPulse grows — new agents, new cities, new MLS markets — your co-marketing placement
          can grow with it. If you serve buyers in multiple markets (or want to), get in early.
          First-mover partners get preferred placement as new markets come online.
        </p>
        <Link
          href="/partner/apply"
          className="mt-8 inline-block rounded-md bg-brand-primary px-8 py-3.5 font-bold text-white hover:bg-sky-600 transition-colors"
        >
          Claim your spot →
        </Link>
      </section>
    </>
  );
}
