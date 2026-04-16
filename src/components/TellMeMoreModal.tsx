"use client";

import { useState } from "react";

export default function TellMeMoreModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      brokerage: (form.elements.namedItem("brokerage") as HTMLInputElement).value,
      market: (form.elements.namedItem("market") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please email tobie@elitewichita.com directly.");
      }
    } catch {
      setError("Something went wrong. Please email tobie@elitewichita.com directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-brand-primary px-6 py-3 font-semibold text-white hover:bg-sky-600 transition-colors"
      >
        Tell me more
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            {/* Close */}
            <button
              onClick={() => { setOpen(false); setSubmitted(false); }}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 text-2xl leading-none"
              aria-label="Close"
            >
              ×
            </button>

            <div className="px-8 py-8">
              {submitted ? (
                <div className="text-center py-6">
                  <div className="text-5xl mb-4">🎉</div>
                  <h2 className="text-2xl font-bold text-slate-900">Got it — we&apos;ll be in touch!</h2>
                  <p className="mt-3 text-slate-600">
                    Tobie will reach out within 1 business day to walk you through the platform
                    and answer any questions.
                  </p>
                  <button
                    onClick={() => { setOpen(false); setSubmitted(false); }}
                    className="mt-6 rounded-md bg-brand-primary px-6 py-2.5 font-semibold text-white hover:bg-sky-600"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-slate-900">Get more information</h2>
                  <p className="mt-2 text-slate-500 text-sm">
                    Tell us a little about yourself and your market. We&apos;ll reach out within 1 business day.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full name *</label>
                        <input
                          name="name"
                          required
                          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                          placeholder="Jane Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
                        <input
                          name="phone"
                          required
                          type="tel"
                          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                          placeholder="(316) 555-1234"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                      <input
                        name="email"
                        required
                        type="email"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        placeholder="jane@myrealty.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Brokerage *</label>
                      <input
                        name="brokerage"
                        required
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        placeholder="My Real Estate Team"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Your market (city &amp; state) *</label>
                      <input
                        name="market"
                        required
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        placeholder="Wichita, KS"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Questions or comments</label>
                      <textarea
                        name="message"
                        rows={3}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary resize-none"
                        placeholder="What questions do you have?"
                      />
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-lg bg-brand-primary py-3 font-semibold text-white hover:bg-sky-600 disabled:opacity-60 transition-colors"
                    >
                      {loading ? "Sending..." : "Send my info →"}
                    </button>

                    <p className="text-center text-xs text-slate-400">
                      No spam. No commitment. Just a conversation.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
