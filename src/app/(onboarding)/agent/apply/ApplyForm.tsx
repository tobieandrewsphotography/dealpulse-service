"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema, type OnboardingInput } from "@/lib/onboarding-schema";

const STEPS = ["Your Info", "Your Brand", "Your Market", "Payment"] as const;

export default function ApplyForm() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<OnboardingInput>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      primaryColor: "#0EA5E9",
      secondaryColor: "#0F172A",
      lenderSponsor: false,
    },
    mode: "onTouched",
  });

  const stepFields: (keyof OnboardingInput)[][] = [
    ["fullName", "brokerageName", "licenseNumber", "city", "state", "phone", "email"],
    ["primaryColor", "secondaryColor", "tagline", "siteTitle", "logoUrl"],
    ["mlsName", "mlsGridToken", "zipCodes", "facebookPageId", "instagramHandle", "linkedinUrl"],
    ["lenderSponsor"],
  ];

  const next = async () => {
    const ok = await trigger(stepFields[step]);
    if (ok) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const onSubmit = async (data: OnboardingInput) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/onboarding/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Submission failed");
      const { checkoutUrl } = await res.json();
      window.location.href = checkoutUrl;
    } catch (e: any) {
      setError(e.message);
      setSubmitting(false);
    }
  };

  const lender = watch("lenderSponsor");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center gap-2 text-sm">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                i <= step ? "bg-brand-primary text-white" : "bg-slate-200 text-slate-500"
              }`}
            >
              {i + 1}
            </div>
            <span className={i === step ? "font-semibold" : "text-slate-500"}>{s}</span>
            {i < STEPS.length - 1 && <span className="text-slate-300">—</span>}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="grid gap-4">
          <Field label="Full name" err={errors.fullName?.message}>
            <input {...register("fullName")} className={input} />
          </Field>
          <Field label="Brokerage name" err={errors.brokerageName?.message}>
            <input {...register("brokerageName")} className={input} />
          </Field>
          <Field label="Real estate license number" err={errors.licenseNumber?.message}>
            <input {...register("licenseNumber")} className={input} />
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field label="City" err={errors.city?.message}>
              <input {...register("city")} className={input} />
            </Field>
            <Field label="State" err={errors.state?.message}>
              <input {...register("state")} maxLength={2} placeholder="KS" className={input} />
            </Field>
            <Field label="Phone" err={errors.phone?.message}>
              <input {...register("phone")} className={input} />
            </Field>
          </div>
          <Field label="Email" err={errors.email?.message}>
            <input type="email" {...register("email")} className={input} />
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Primary color" err={errors.primaryColor?.message}>
              <input type="color" {...register("primaryColor")} className="h-10 w-full rounded" />
            </Field>
            <Field label="Secondary color" err={errors.secondaryColor?.message}>
              <input type="color" {...register("secondaryColor")} className="h-10 w-full rounded" />
            </Field>
          </div>
          <Field label="Site title" err={errors.siteTitle?.message}>
            <input {...register("siteTitle")} placeholder="Wichita Deal of the Day" className={input} />
          </Field>
          <Field label="Tagline" err={errors.tagline?.message}>
            <input {...register("tagline")} placeholder="Your daily source for the best deals in Wichita" className={input} />
          </Field>
          <Field
            label="Logo URL"
            hint="Paste a hosted link (PNG/JPG). Upload support coming — for now, use Dropbox/Drive public link."
            err={errors.logoUrl?.message}
          >
            <input {...register("logoUrl")} placeholder="https://..." className={input} />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4">
          <Field label="MLS name" err={errors.mlsName?.message}>
            <input {...register("mlsName")} placeholder="South Central Kansas MLS" className={input} />
          </Field>
          <Field label="MLS Grid API token" err={errors.mlsGridToken?.message}>
            <input {...register("mlsGridToken")} className={input} />
          </Field>
          <Field label="Target zip codes" hint="Comma-separated" err={errors.zipCodes?.message}>
            <input {...register("zipCodes")} placeholder="67202, 67203, 67206" className={input} />
          </Field>
          <Field label="Facebook Page ID" err={errors.facebookPageId?.message}>
            <input {...register("facebookPageId")} className={input} />
          </Field>
          <Field label="Instagram handle" err={errors.instagramHandle?.message}>
            <input {...register("instagramHandle")} placeholder="@yourhandle" className={input} />
          </Field>
          <Field label="LinkedIn URL" err={errors.linkedinUrl?.message}>
            <input {...register("linkedinUrl")} placeholder="https://linkedin.com/in/..." className={input} />
          </Field>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <label className="flex items-start gap-3 rounded-lg border border-slate-200 p-4 hover:bg-slate-50 cursor-pointer">
            <input type="checkbox" {...register("lenderSponsor")} className="mt-1 h-5 w-5" />
            <div>
              <div className="font-semibold">I have a co-marketing partner (lender, inspector, title, etc.)</div>
              <div className="text-sm text-slate-600">
                Reduced plan at $750/mo instead of $1,000/mo. Your partner pays $250/mo for co-branding placement on your deal pages, emails, and social posts.
              </div>
            </div>
          </label>

          {/* Partner info — shown when checkbox is checked */}
          {lender && (
            <div className="rounded-lg border border-sky-200 bg-sky-50 p-5 space-y-4">
              <p className="text-sm font-semibold text-sky-900">
                Partner details — we&apos;ll notify them when your site goes live.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Partner business name *</label>
                  <input
                    {...register("partnerBusinessName")}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    placeholder="Equity Bank"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Partner contact name *</label>
                  <input
                    {...register("partnerContactName")}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    placeholder="Ernest Warren"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Partner email *</label>
                  <input
                    {...register("partnerEmail")}
                    type="email"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    placeholder="ewarren@equitybank.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Partner phone</label>
                  <input
                    {...register("partnerPhone")}
                    type="tel"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    placeholder="(316) 555-1234"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Partner website</label>
                  <input
                    {...register("partnerWebsite")}
                    type="url"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    placeholder="https://equitybank.com/mortgage"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Partner logo URL</label>
                  <input
                    {...register("partnerLogoUrl")}
                    type="url"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          )}

          <div className="rounded-lg bg-slate-50 p-6">
            <div className="text-sm text-slate-600">Your plan</div>
            <div className="mt-1 text-3xl font-bold">
              ${lender ? "750" : "1,000"}
              <span className="text-base font-normal text-slate-500">/month</span>
            </div>
            {lender && (
              <p className="mt-1 text-sm text-sky-700 font-medium">
                Your partner pays $250/mo — you pay $750/mo.
              </p>
            )}
            <p className="mt-3 text-sm text-slate-600">
              You&apos;ll be redirected to Stripe to complete payment. Your site goes live within 24-48 hours.
            </p>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-md border border-slate-300 px-5 py-2 text-sm disabled:opacity-40"
        >
          Back
        </button>
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="rounded-md bg-brand-primary px-6 py-2 font-semibold text-white hover:bg-sky-600"
          >
            Next →
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-brand-accent px-6 py-2 font-semibold text-white hover:bg-amber-600 disabled:opacity-50"
          >
            {submitting ? "Redirecting…" : "Continue to payment →"}
          </button>
        )}
      </div>
    </form>
  );
}

const input =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary";

function Field({
  label,
  hint,
  err,
  children,
}: {
  label: string;
  hint?: string;
  err?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {hint && !err && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
      {err && <span className="mt-1 block text-xs text-red-600">{err}</span>}
    </label>
  );
}
