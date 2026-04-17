import PartnerApplyForm from "./PartnerApplyForm";

export const metadata = {
  title: "Become a Co-Marketing Partner — DealPulse",
  description:
    "Put your brand in front of active homebuyers every single day. Co-marketing partners get placement on deal pages, daily subscriber emails, and social media posts — $250/month.",
};

export default function PartnerApplyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-2xl px-6 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-primary mb-2">
            Co-Marketing Partner Application
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            Your brand in front of buyers — every day
          </h1>
          <p className="mt-3 text-slate-600">
            DealPulse publishes a new featured deal every morning. Your logo, tagline, and
            CTA appear on every deal page, every subscriber email, and every social post.
            Buyers come to you already looking at a specific deal.
          </p>
        </div>

        {/* What you get bar */}
        <div className="mb-8 grid grid-cols-3 gap-3 text-center">
          {[
            { icon: "🌐", label: "Deal pages",  sub: "Daily fresh content" },
            { icon: "📧", label: "Daily emails", sub: "8 AM every morning" },
            { icon: "📱", label: "Social posts", sub: "FB · IG · LinkedIn" },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-slate-200 bg-white px-3 py-4">
              <div className="text-2xl">{item.icon}</div>
              <p className="mt-1 text-sm font-semibold text-slate-800">{item.label}</p>
              <p className="text-xs text-slate-500">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-8">
          <PartnerApplyForm />
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Questions? Email{" "}
          <a href="mailto:tobie@elitewichita.com" className="underline">
            tobie@elitewichita.com
          </a>
        </p>
      </div>
    </div>
  );
}
