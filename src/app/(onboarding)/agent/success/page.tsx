export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
        ✓
      </div>
      <h1 className="mt-6 text-4xl font-bold">You&apos;re in.</h1>
      <p className="mt-4 text-lg text-slate-600">
        Payment confirmed. Welcome to DealPulse.
      </p>
      <div className="mt-10 rounded-lg border border-slate-200 bg-white p-6 text-left">
        <h2 className="font-semibold">What happens next</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>We&apos;ll review your submission within 1 business day.</li>
          <li>Your custom Deal of the Day site will be provisioned on a subdomain.</li>
          <li>Expect your site to be <strong>live within 24–48 hours</strong>.</li>
          <li>You&apos;ll receive an email with your admin link and first-day preview.</li>
        </ol>
      </div>
      <p className="mt-6 text-sm text-slate-500">
        Questions? Email{" "}
        <a href="mailto:tobie@elitewichita.com" className="text-brand-primary hover:underline">
          tobie@elitewichita.com
        </a>
        .
      </p>
    </div>
  );
}
