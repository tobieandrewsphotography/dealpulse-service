const AGENT_URL = process.env.NEXT_PUBLIC_AGENT_URL || "https://dealpulseagent.com";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-center text-4xl font-bold">One plan. Everything included.</h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-600">
        No tiers. No add-ons. No surprises. Just one flat monthly fee for the full platform.
      </p>

      {/* Single pricing card */}
      <div className="mx-auto mt-16 max-w-lg rounded-xl border-2 border-brand-primary bg-white p-10 shadow-lg">
        <div className="text-center">
          <p className="text-5xl font-bold">
            $1,000<span className="text-lg font-normal text-slate-500">/month</span>
          </p>
          <p className="mt-2 text-sm text-slate-500">Billed monthly. No contract. Cancel anytime.</p>
        </div>
        <ul className="mt-8 space-y-3 text-slate-700">
          <li>✓ Your custom Deal of the Day site on your domain</li>
          <li>✓ Daily AI-powered deal scoring &amp; selection</li>
          <li>✓ Social media auto-posting (Facebook, Instagram, LinkedIn)</li>
          <li>✓ MLS Grid integration for your market</li>
          <li>✓ Branded image overlays on every post</li>
          <li>✓ Investor tools &amp; Deal Optimizer</li>
          <li>✓ Search alerts &amp; &ldquo;We Called It&rdquo; sold tracking</li>
          <li>✓ Email &amp; SMS lead forwarding</li>
          <li>✓ Unlimited target zip codes</li>
          <li>✓ Ongoing support &amp; updates</li>
        </ul>
        <a
          href={AGENT_URL}
          className="mt-8 block rounded-md bg-brand-primary px-6 py-3.5 text-center text-lg font-semibold text-white hover:bg-sky-600"
        >
          Get started
        </a>
      </div>

      {/* Co-marketing partners */}
      <div className="mx-auto mt-16 max-w-2xl">
        <h2 className="text-center text-2xl font-bold">Lower your cost with co-marketing partners</h2>
        <p className="mt-4 text-center text-slate-600">
          Bring in partners who get co-branding placement on your deal pages, emails, and social posts.
          They help cover the subscription cost, and you keep the full platform.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { icon: "🏦", title: "Lender", desc: "Their logo on every deal page and email" },
            { icon: "🛡️", title: "Insurance Agent", desc: "Featured on homeowner resources" },
            { icon: "📋", title: "Title Company", desc: "Branded on closing-related content" },
            { icon: "🔍", title: "Home Inspector", desc: "Highlighted in property details" },
          ].map((p) => (
            <div key={p.title} className="rounded-lg border border-amber-200 bg-amber-50 p-5">
              <div className="text-2xl">{p.icon}</div>
              <h3 className="mt-2 font-semibold text-amber-900">{p.title}</h3>
              <p className="mt-1 text-sm text-amber-800">{p.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Partner arrangements are between you and your sponsors. Your subscription fee to DealPulse stays the same regardless — partners are additional revenue for you.
        </p>
      </div>
    </div>
  );
}
