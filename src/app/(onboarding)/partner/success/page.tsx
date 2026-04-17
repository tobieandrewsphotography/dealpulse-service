export const metadata = {
  title: "You're in — DealPulse Co-Marketing Partner",
};

export default function PartnerSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-slate-900">You&apos;re in.</h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed">
          Your co-marketing application is confirmed and your payment is set up.
          Your brand will be live on deal pages, emails, and social posts within{" "}
          <strong>24–48 hours</strong>.
        </p>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-left space-y-3">
          <h2 className="font-bold text-slate-800 text-base">What happens next</h2>
          {[
            { step: "1", text: "Tobie reviews your placement details and configures your branding" },
            { step: "2", text: "Your logo and CTA go live on the deal site within 24–48 hours" },
            { step: "3", text: "You'll get a link to see exactly how your brand looks" },
            { step: "4", text: "Buyers browsing daily deals will start seeing your call-to-action" },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white text-xs font-bold">
                {item.step}
              </div>
              <p className="text-sm text-slate-600 pt-0.5">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Questions? Email Tobie directly at{" "}
          <a href="mailto:tobie@elitewichita.com" className="text-brand-primary underline">
            tobie@elitewichita.com
          </a>
        </p>

        <a
          href="https://deals.rehmertandrews.com"
          className="mt-8 inline-block rounded-md bg-brand-primary px-6 py-3 font-semibold text-white hover:bg-sky-600 transition-colors"
        >
          See the live deal site →
        </a>
      </div>
    </div>
  );
}
