import Link from "next/link";

export function MarketingNav() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-brand-dark">
          Deal<span className="text-brand-primary">Pulse</span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/how-it-works">How it works</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/partners">Partners</Link>
          <Link href="/demo">Demo</Link>
          <a
            href={process.env.NEXT_PUBLIC_AGENT_URL || "https://dealpulseagent.com"}
            className="rounded-md bg-brand-primary px-4 py-2 font-semibold text-white hover:bg-sky-600"
          >
            Get started
          </a>
        </div>
      </nav>
    </header>
  );
}

export function OnboardingNav() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-brand-dark">
          Deal<span className="text-brand-primary">Pulse</span>
          <span className="ml-2 text-xs font-normal text-slate-500">Agent</span>
        </Link>
        <a href="https://dealpulsescore.com" className="text-sm text-slate-600">
          ← Back to marketing
        </a>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-600">
        © {new Date().getFullYear()} Deal Pulse LLC. All rights reserved.
      </div>
    </footer>
  );
}
