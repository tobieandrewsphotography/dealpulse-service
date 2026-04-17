"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { partnerSchema, PARTNER_TYPES, type PartnerInput, type PartnerTypeValue } from "@/lib/partner-schema";

export default function PartnerApplyForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PartnerInput>({
    resolver: zodResolver(partnerSchema),
    defaultValues: { ctaText: "Learn More" },
  });

  const selectedType = watch("partnerType") as PartnerTypeValue | undefined;

  // Auto-fill suggested CTA text when partner type is selected
  function selectType(value: PartnerTypeValue) {
    setValue("partnerType", value);
    const suggested = PARTNER_TYPES.find((t) => t.value === value)?.cta ?? "";
    setValue("ctaText", suggested);
  }

  const onSubmit = async (data: PartnerInput) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/partner/submit", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Submission failed");
      const { checkoutUrl, manual } = await res.json();
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else if (manual) {
        // Stripe not configured yet — redirect to success anyway
        window.location.href = "/partner/success";
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const Field = ({
    label, name, type = "text", placeholder, hint, required,
  }: {
    label: string; name: keyof PartnerInput; type?: string;
    placeholder?: string; hint?: string; required?: boolean;
  }) => (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
      />
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      {errors[name] && (
        <p className="mt-1 text-xs text-red-600">{errors[name]?.message as string}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

      {/* ── Step 1: Partner type ── */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-1">What kind of partner are you?</h2>
        <p className="text-sm text-slate-500 mb-4">
          Your type determines how you&apos;re presented on deal pages.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {PARTNER_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => selectType(t.value)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-4 py-4 text-sm font-semibold transition-all ${
                selectedType === t.value
                  ? "border-brand-primary bg-sky-50 text-brand-primary"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="text-2xl">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
        {errors.partnerType && (
          <p className="mt-2 text-xs text-red-600">{errors.partnerType.message}</p>
        )}
      </section>

      {/* ── Step 2: Business details ── */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Your business</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Business name"   name="businessName"  placeholder="Neighborhood Loans, Inc." required />
          <Field label="Your name"       name="contactName"   placeholder="Chris Waipa"              required />
          <Field label="Email"           name="email"         type="email" placeholder="chris@example.com" required />
          <Field label="Phone"           name="phone"         type="tel"   placeholder="316-555-0100" required />
          <Field label="Website"         name="website"       type="url"   placeholder="https://mortgagepunk.com" />
          <Field label="Logo URL"        name="logoUrl"       type="url"   placeholder="https://... (PNG or SVG)"
                 hint="Hosted image link. We'll display this on deal pages and emails." />
          {(selectedType === "lender") && (
            <Field label="NMLS #" name="nmlsNumber" placeholder="222982"
                   hint="Required for mortgage lenders" />
          )}
          {(selectedType === "insurance" || selectedType === "title") && (
            <Field label="License #" name="licenseNumber" placeholder="Your state license number" />
          )}
          <div className="sm:col-span-2">
            <Field label="Target market" name="targetMarket" placeholder="Wichita, KS — or leave blank for all markets" />
          </div>
        </div>
      </section>

      {/* ── Step 3: Your CTA placement ── */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-1">Your placement on deal pages</h2>
        <p className="text-sm text-slate-500 mb-4">
          This is the call-to-action buyers see on every deal page, in emails, and on social posts.
        </p>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 mb-4 text-sm text-slate-600">
          <strong>Preview:</strong>{" "}
          <span className="italic">
            &ldquo;{watch("tagline") || "Your tagline here — e.g. Get pre-approved before someone else grabs this deal."}&rdquo;
          </span>{" "}
          <span className="inline-block mt-1 rounded-md bg-brand-primary px-3 py-1 text-white text-xs font-bold">
            {watch("ctaText") || "Your CTA button text"}
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Tagline <span className="text-red-500">*</span>
            </label>
            <input
              {...register("tagline")}
              placeholder="Get pre-approved before someone else grabs this deal."
              className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
            <p className="mt-1 text-xs text-slate-500">One compelling sentence. This appears above your CTA button.</p>
            {errors.tagline && <p className="mt-1 text-xs text-red-600">{errors.tagline.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              CTA button text <span className="text-red-500">*</span>
            </label>
            <input
              {...register("ctaText")}
              placeholder="Get Pre-Approved"
              className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
            <p className="mt-1 text-xs text-slate-500">Short action phrase, 3–6 words.</p>
            {errors.ctaText && <p className="mt-1 text-xs text-red-600">{errors.ctaText.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              CTA button link <span className="text-red-500">*</span>
            </label>
            <input
              {...register("ctaUrl")}
              type="url"
              placeholder="https://your-application-link.com"
              className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
            <p className="mt-1 text-xs text-slate-500">Where buyers land when they click your button.</p>
            {errors.ctaUrl && <p className="mt-1 text-xs text-red-600">{errors.ctaUrl.message}</p>}
          </div>
        </div>
      </section>

      {/* ── Step 4: Notes + submit ── */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Anything else?</h2>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Notes / questions (optional)</label>
          <textarea
            {...register("notes")}
            rows={3}
            placeholder="Any special requests or questions for Tobie..."
            className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
          />
        </div>
      </section>

      {/* ── Pricing summary + submit ── */}
      <div className="rounded-xl border-2 border-brand-primary bg-sky-50 p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="font-bold text-slate-900 text-lg">Co-Marketing Partner</p>
            <p className="text-sm text-slate-600 mt-0.5">
              Your brand on every deal page, email, and social post — every single day.
            </p>
            <p className="text-xs text-slate-500 mt-2">Month-to-month · Cancel anytime · 30-day notice to cancel</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-3xl font-bold text-slate-900">$250<span className="text-base font-normal text-slate-500">/mo</span></p>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 w-full rounded-md bg-brand-primary px-6 py-3.5 text-base font-bold text-white hover:bg-sky-600 disabled:opacity-60 transition-colors"
        >
          {submitting ? "Processing..." : "Continue to Payment →"}
        </button>
        <p className="mt-3 text-center text-xs text-slate-500">
          Secure checkout via Stripe. You won&apos;t be charged until after review.
        </p>
      </div>
    </form>
  );
}
