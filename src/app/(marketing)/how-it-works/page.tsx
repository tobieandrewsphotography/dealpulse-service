export default function HowItWorksPage() {
  const steps = [
    {
      t: "1. You apply",
      d: "Fill out a 4-step onboarding form at DealPulseAgent.com: your info, your brand, your market, and payment. Takes about 10 minutes.",
    },
    {
      t: "2. We provision your site — web app branded to you",
      d: "Our team configures your custom subdomain, applies your brand colors and logo, and connects your MLS Grid feed to your target zip codes. Every day we publish a brand-new web page for that day's deal — driving fresh SEO value — and every social post links back to that subdomain page.",
    },
    {
      t: "3. Daily deal engine runs",
      d: "Every morning at 7am local time, our engine scores new and price-reduced listings in your market. The top-ranked 'deal of the day' is posted to your site automatically.",
    },
    {
      t: "4. Social auto-posting",
      d: "The same deal is formatted and posted to your connected Facebook page, Instagram, and LinkedIn with a link back to your site.",
    },
    {
      t: "5. Leads flow to you",
      d: "Every inquiry goes directly to you via email and SMS, and is automatically loaded into your connected CRM. DealPulse never touches your leads or your commission.",
    },
  ];
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold">How DealPulse works</h1>
      <p className="mt-4 text-lg text-slate-600">
        A daily deal marketing machine, built under your brand, running on autopilot.
      </p>
      <div className="mt-12 space-y-8">
        {steps.map((s) => (
          <div key={s.t} className="border-l-4 border-brand-primary pl-6">
            <h2 className="text-xl font-semibold">{s.t}</h2>
            <p className="mt-2 text-slate-700">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
