const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL || "https://deals.rehmertandrews.com";

export default function DemoPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Live demo</h1>
        <p className="mt-3 text-slate-600">
          This is the Rehmert Andrews team site — a real DealPulse deployment.
        </p>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-brand-primary hover:underline"
        >
          Open in new tab →
        </a>
      </div>
      <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 shadow-lg">
        <iframe
          src={DEMO_URL}
          title="Rehmert Andrews DealPulse demo"
          className="h-[80vh] w-full"
        />
      </div>
    </div>
  );
}
