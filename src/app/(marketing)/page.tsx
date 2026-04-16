import Link from "next/link";
import TellMeMoreModal from "@/components/TellMeMoreModal";

const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL || "https://deals.rehmertandrews.com";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark to-slate-800 text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-primary">
            What does every agent want more of?
          </p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">
            Leads. Hot leads.
            <br />
            <span className="text-brand-primary">Social media. SEO.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-300">
            One web app that does it all — under your name, in your market, every single morning.
            Everything is branded to you. Your logo. Your colors. Your marketing.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <TellMeMoreModal />
            <Link
              href="/agent/apply"
              className="rounded-md border border-slate-500 px-6 py-3 font-semibold hover:bg-slate-700 transition-colors"
            >
              Launch your site →
            </Link>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-slate-500 px-6 py-3 font-semibold hover:bg-slate-700 transition-colors"
            >
              See a live example →
            </a>
          </div>
        </div>
      </section>

      {/* The Value — Why This Is Such a Good Deal */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold">Five things every agent needs — handled.</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          Stop paying for five separate tools. DealPulse gives you lead generation, social media, SEO, email marketing, and CRM integration in one automated platform.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* SEO */}
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sky-100 text-2xl">
                🔍
              </div>
              <div>
                <h3 className="text-xl font-semibold">Higher Google Rankings</h3>
                <p className="mt-2 text-slate-600">
                  A brand new page is created on your site every single day with fresh, unique content. Google rewards sites that publish consistently — your SEO compounds over time while competitors stay static.
                </p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sky-100 text-2xl">
                📱
              </div>
              <div>
                <h3 className="text-xl font-semibold">Social Media — Done For You</h3>
                <p className="mt-2 text-slate-600">
                  Branded posts go out to Facebook, Instagram, and LinkedIn at 9 AM every morning — with professional overlays, listing attribution, and a link back to your site. You never touch it.
                </p>
              </div>
            </div>
          </div>

          {/* Warm Leads */}
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sky-100 text-2xl">
                🔥
              </div>
              <div>
                <h3 className="text-xl font-semibold">Warm Leads Into Your CRM</h3>
                <p className="mt-2 text-slate-600">
                  Every visitor who signs up for deal alerts is automatically loaded into your CRM as a warm lead. They&apos;re already interested in deals in your market — they came to you.
                </p>
              </div>
            </div>
          </div>

          {/* Hot Leads */}
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-100 text-2xl">
                🎯
              </div>
              <div>
                <h3 className="text-xl font-semibold">Hot Leads Emailed Directly To You</h3>
                <p className="mt-2 text-slate-600">
                  When someone clicks &ldquo;I want to make an offer,&rdquo; you get an email instantly with their name, phone number, and the property they&apos;re interested in. That&apos;s a hot lead — ready to go.
                </p>
              </div>
            </div>
          </div>

          {/* Daily Email */}
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md md:col-span-2">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl">
                📧
              </div>
              <div>
                <h3 className="text-xl font-semibold">Morning Email to Every Subscriber — Every Day at 8 AM</h3>
                <p className="mt-2 text-slate-600">
                  Every person who signs up on your site receives the day&apos;s best deal in their inbox at 8 AM — automatically. Your brand, your deal, their inbox. It keeps your audience engaged daily, builds trust over time, and puts you in front of buyers before they open any other app. No newsletter to write. No scheduling. It goes out every morning without you touching a thing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Live demo preview */}
        <div className="mt-16">
          <h3 className="text-center text-xl font-semibold">See a live deployment</h3>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-500">
            This is a real DealPulse site running for the Rehmert Andrews team in Wichita, KS — updated daily with fresh deals.
          </p>
          <div className="mx-auto mt-8 max-w-4xl">
            <div className="overflow-hidden rounded-xl border border-slate-300 shadow-lg">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="ml-2 flex-1 rounded-md bg-white px-3 py-1 text-xs text-slate-500">
                  deals.rehmertandrews.com
                </div>
              </div>
              <a href={DEMO_URL} target="_blank" rel="noreferrer" className="group block">
                <img
                  src="/images/Homepage-desktop.png"
                  alt="Live DealPulse deployment"
                  className="w-full transition group-hover:opacity-90"
                />
                <div className="bg-brand-dark px-6 py-4 text-center">
                  <span className="font-semibold text-brand-primary group-hover:underline">
                    Open the live demo →
                  </span>
                </div>
              </a>
            </div>
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
          <h2 className="text-center text-3xl font-bold">One plan. Everything included.</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
            No tiers. No add-ons. No surprises. Just one flat monthly fee for the full platform.
          </p>

          {/* Single pricing card */}
          <div className="mx-auto mt-12 max-w-lg rounded-xl border-2 border-brand-primary bg-white p-10 shadow-lg">
            <div className="text-center">
              <p className="text-5xl font-bold">
                $1,000<span className="text-lg font-normal text-slate-500">/mo</span>
              </p>
              <p className="mt-2 text-sm text-slate-500">Month-to-month. No contract. Cancel anytime.</p>
            </div>
            <ul className="mt-8 space-y-3 text-slate-700">
              <li>✓ Your custom Deal of the Day site on your domain</li>
              <li>✓ Daily AI-powered deal scoring &amp; selection</li>
              <li>✓ Daily 8 AM subscriber email — sent automatically every morning</li>
              <li>✓ Social media auto-posting (Facebook, Instagram, LinkedIn)</li>
              <li>✓ MLS Grid integration for your market</li>
              <li>✓ Investor tools &amp; Deal Optimizer</li>
              <li>✓ Email &amp; SMS lead forwarding</li>
              <li>✓ Search alerts &amp; &ldquo;We Called It&rdquo; tracking</li>
              <li>✓ Branded image overlays on every post</li>
              <li>✓ Ongoing support &amp; updates</li>
            </ul>
            <Link
              href="/agent/apply"
              className="mt-8 block rounded-md bg-brand-primary px-6 py-3.5 text-center text-lg font-semibold text-white hover:bg-sky-600"
            >
              Get started
            </Link>
          </div>

          {/* Co-marketing partners callout */}
          <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-amber-200 bg-amber-50 p-8">
            <h3 className="text-center text-lg font-semibold text-amber-900">
              Lower your cost with co-marketing partners
            </h3>
            <p className="mt-3 text-center text-amber-800">
              Bring in partners — a lender, insurance agent, title company, or home inspector —
              who get co-branding placement on your deal pages, emails, and social posts.
              They help cover the subscription cost, and you keep the full platform.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Lender", cta: "Get pre-approved →" },
                { label: "Insurance", cta: "Get a quote →" },
                { label: "Title Company", cta: "Estimate closing costs →" },
                { label: "Inspector", cta: "Schedule inspection →" },
              ].map((partner) => (
                <div
                  key={partner.label}
                  className="rounded-lg border border-amber-300 bg-white px-3 py-3 text-center"
                >
                  <p className="text-sm font-semibold text-amber-900">{partner.label}</p>
                  <p className="mt-1 text-xs text-amber-700">{partner.cta}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/pricing" className="text-brand-primary hover:underline">
              See full pricing details →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ — AEO-optimized for real estate agent search queries */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold">Questions agents are asking</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          The answers every real estate professional needs about lead generation, social media, and SEO.
        </p>
        <div className="mt-10 space-y-6">
          {[
            {
              q: "How do I automate my real estate social media posts?",
              a: "DealPulse automatically posts branded deal content to your Facebook, Instagram, and LinkedIn every morning at 9 AM. Each post includes a professional image overlay with your branding, MLS-compliant listing attribution, and a link back to your deal website. You never create a post, write a caption, or schedule anything \u2014 it\u2019s fully automated, every single day.",
            },
            {
              q: "How can I get more real estate leads from my website?",
              a: "DealPulse creates a new deal page on your branded website every day with fresh, AI-scored property listings. Every page includes an email capture form that feeds leads directly into your CRM. Visitors who sign up become warm leads automatically. When someone clicks \u201CI want to make an offer,\u201D you get an email instantly with their name, phone number, and the property they\u2019re interested in \u2014 that\u2019s a hot lead, ready to call.",
            },
            {
              q: "Does SEO still work for real estate agents in 2026?",
              a: "Yes \u2014 but only if your website publishes fresh, unique content consistently. Most agent websites are static and rarely updated, which means Google ignores them. DealPulse creates a new SEO-optimized page on your site every single day with unique property analysis, deal scores, and market data. Over time, this daily publishing compounds your domain authority and helps you rank for hyperlocal search terms like \u201Cbest deals in [your city]\u201D and \u201Cundervalued homes near me.\u201D",
            },
            {
              q: "What is the best way for real estate agents to generate leads online?",
              a: "The most effective approach combines three things: consistent content that drives organic traffic (SEO), daily social media presence that builds trust, and lead capture forms that convert visitors into contacts. DealPulse handles all three automatically \u2014 fresh deal pages for SEO, branded social posts for visibility, and email/SMS capture that loads warm leads into your CRM and emails hot leads directly to you.",
            },
            {
              q: "How much does social media management cost for real estate agents?",
              a: "Hiring a social media manager typically costs $1,500\u2013$3,000/month. Comprehensive marketing platforms with CRM and AI content generation run $200\u2013$600/month. DealPulse is $1,000/month and includes everything: daily social media auto-posting, a branded deal website, SEO content, lead capture, CRM integration, and investor tools. You can also bring in co-marketing partners (lender, inspector, insurance, title) to help offset the cost.",
            },
            {
              q: "How do I get my real estate website to rank higher on Google?",
              a: "Google rewards websites that publish fresh, relevant content consistently. DealPulse adds a new page to your site every day with original AI-generated deal analysis, property data, and market insights. Each page is SEO-optimized with Schema.org structured data, clean URLs, and mobile-responsive design. After 30\u201360 days of daily publishing, agents typically see measurable improvements in local search rankings.",
            },
            {
              q: "What is the best real estate lead generation tool?",
              a: "The best lead generation tool is one that works without you touching it. DealPulse runs a fully automated daily pipeline: it pulls MLS listings, scores them with AI, publishes the best deals to your branded website, posts to your social media accounts, and captures leads into your CRM \u2014 all before you wake up. Warm leads are loaded automatically. Hot leads are emailed directly to you.",
            },
            {
              q: "How do co-marketing partners work with DealPulse?",
              a: "You can bring in partners \u2014 like a lender, insurance agent, title company, or home inspector \u2014 who get co-branding placement on your deal pages, emails, and social posts. They help cover your subscription cost, and you keep the full platform. Partner arrangements are between you and your sponsors \u2014 DealPulse handles the branding placement.",
            },
            {
              q: "How quickly can I get my Deal of the Day site live?",
              a: "Most agents are live within 24\u201348 hours of completing onboarding. You submit your brand assets (logo, colors, domain) and MLS Grid credentials, and DealPulse builds your custom site and connects your social media accounts. Deals start posting the next morning.",
            },
            {
              q: "Can I cancel DealPulse at any time?",
              a: "Yes. DealPulse is month-to-month with no long-term contract. You can cancel anytime with 30 days\u2019 notice. When you cancel, you receive an export of all your lead data.",
            },
          ].map((f) => (
            <div key={f.q} className="rounded-lg border border-slate-200 p-6">
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-2 text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQPage Schema.org structured data for AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How do I automate my real estate social media posts?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "DealPulse automatically posts branded deal content to your Facebook, Instagram, and LinkedIn every morning at 9 AM. Each post includes a professional image overlay with your branding, MLS-compliant listing attribution, and a link back to your deal website. You never create a post, write a caption, or schedule anything \u2014 it\u2019s fully automated, every single day.",
                },
              },
              {
                "@type": "Question",
                name: "How can I get more real estate leads from my website?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "DealPulse creates a new deal page on your branded website every day with fresh, AI-scored property listings. Every page includes an email capture form that feeds leads directly into your CRM. Visitors who sign up become warm leads automatically. When someone clicks \u201CI want to make an offer,\u201D you get an email instantly with their name, phone number, and the property they\u2019re interested in.",
                },
              },
              {
                "@type": "Question",
                name: "Does SEO still work for real estate agents in 2026?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes \u2014 but only if your website publishes fresh, unique content consistently. DealPulse creates a new SEO-optimized page on your site every single day with unique property analysis, deal scores, and market data. Over time, this daily publishing compounds your domain authority and helps you rank for hyperlocal search terms.",
                },
              },
              {
                "@type": "Question",
                name: "What is the best way for real estate agents to generate leads online?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The most effective approach combines consistent content that drives organic traffic (SEO), daily social media presence that builds trust, and lead capture forms that convert visitors into contacts. DealPulse handles all three automatically.",
                },
              },
              {
                "@type": "Question",
                name: "How much does social media management cost for real estate agents?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Hiring a social media manager typically costs $1,500\u2013$3,000/month. DealPulse is $1,000/month and includes everything: daily social media auto-posting, a branded deal website, SEO content, lead capture, CRM integration, and investor tools. You can also bring in co-marketing partners to help offset the cost.",
                },
              },
              {
                "@type": "Question",
                name: "How do I get my real estate website to rank higher on Google?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Google rewards websites that publish fresh, relevant content consistently. DealPulse adds a new page to your site every day with original AI-generated deal analysis, property data, and market insights. Each page is SEO-optimized with Schema.org structured data, clean URLs, and mobile-responsive design.",
                },
              },
              {
                "@type": "Question",
                name: "What is the best real estate lead generation tool?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "DealPulse runs a fully automated daily pipeline: it pulls MLS listings, scores them with AI, publishes the best deals to your branded website, posts to your social media accounts, and captures leads into your CRM \u2014 all before you wake up. Warm leads are loaded automatically. Hot leads are emailed directly to you.",
                },
              },
            ],
          }),
        }}
      />

      {/* CTA */}
      <section className="bg-brand-dark py-16 text-center text-white">
        <h2 className="text-3xl font-bold">Ready to launch?</h2>
        <p className="mt-4 text-slate-300">Set up your Deal of the Day site in minutes.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <TellMeMoreModal />
          <Link
            href="/agent/apply"
            className="inline-block rounded-md border border-slate-500 px-8 py-3 font-semibold hover:bg-slate-700 transition-colors"
          >
            Start onboarding →
          </Link>
        </div>
      </section>
    </>
  );
}
