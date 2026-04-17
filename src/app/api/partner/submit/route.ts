import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { partnerSchema, PARTNER_TYPES } from "@/lib/partner-schema";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = partnerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid submission", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const data = parsed.data;

    const partnerTypeLabel =
      PARTNER_TYPES.find((t) => t.value === data.partnerType)?.label ?? data.partnerType;

    // 1. Notify Tobie
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM || "DealPulse <noreply@dealpulsescore.com>",
        to:   process.env.ONBOARDING_NOTIFY_EMAIL || "tobie@elitewichita.com",
        subject: `New co-marketing partner — ${data.businessName} (${partnerTypeLabel})`,
        html: renderAdminEmail(data, partnerTypeLabel),
      });
    }

    // 2. Welcome email to partner
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from:    process.env.RESEND_FROM || "DealPulse <noreply@dealpulsescore.com>",
        to:      data.email,
        replyTo: "tobie@elitewichita.com",
        subject: `Welcome to DealPulse — your co-marketing placement is being set up`,
        html:    renderWelcomeEmail(data, partnerTypeLabel),
      });
    }

    // 3. Stripe Checkout — $250/mo co-marketing subscription
    const priceId = process.env.STRIPE_PRICE_PARTNER;
    if (!priceId) {
      // If Stripe isn't set up yet, still succeed — Tobie will invoice manually
      console.warn("[Partner] STRIPE_PRICE_PARTNER not set — skipping Stripe checkout");
      return NextResponse.json({ checkoutUrl: null, manual: true });
    }

    const origin = req.headers.get("origin") || "https://dealpulsescore.com";

    const session = await getStripe().checkout.sessions.create({
      mode:           "subscription",
      customer_email: data.email,
      line_items:     [{ price: priceId, quantity: 1 }],
      success_url:    `${origin}/partner/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:     `${origin}/partner/apply`,
      metadata: {
        partner_type:    data.partnerType,
        business_name:   data.businessName,
        contact_name:    data.contactName,
        phone:           data.phone,
        cta_text:        data.ctaText,
        cta_url:         data.ctaUrl,
        target_market:   data.targetMarket || "",
      },
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[Partner submit]", msg);
    return NextResponse.json({ error: msg || "Server error" }, { status: 500 });
  }
}

// ─── Email templates ───────────────────────────────────────────────────────

function renderAdminEmail(d: ReturnType<typeof partnerSchema.parse>, typeLabel: string) {
  const fields: [string, string][] = [
    ["Partner Type",    typeLabel],
    ["Business Name",   d.businessName],
    ["Contact Name",    d.contactName],
    ["Email",           d.email],
    ["Phone",           d.phone],
    ["Website",         d.website || "—"],
    ["Logo URL",        d.logoUrl || "—"],
    ["Tagline",         d.tagline],
    ["CTA Text",        d.ctaText],
    ["CTA URL",         d.ctaUrl],
    ["NMLS #",          d.nmlsNumber || "—"],
    ["License #",       d.licenseNumber || "—"],
    ["Target Market",   d.targetMarket || "Any"],
    ["Notes",           d.notes || "—"],
  ];

  const rows = fields
    .map(([k, v]) => `<tr>
      <td style="padding:6px 12px;font-weight:600;background:#f8fafc;white-space:nowrap">${k}</td>
      <td style="padding:6px 12px">${v}</td>
    </tr>`)
    .join("");

  return `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#0f172a;padding:24px 32px;border-radius:8px 8px 0 0">
        <h2 style="color:#38bdf8;margin:0;font-size:20px">New Co-Marketing Partner Application</h2>
        <p style="color:#94a3b8;margin:6px 0 0;font-size:13px">DealPulse · $250/mo</p>
      </div>
      <div style="background:#fff;padding:24px 32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px">
        <table style="border-collapse:collapse;font-size:14px;width:100%">
          <tbody>${rows}</tbody>
        </table>
        <div style="margin-top:20px;padding:14px;background:#f0fdf4;border-radius:6px;border-left:4px solid #22c55e">
          <p style="margin:0;font-size:13px;color:#166534">
            ✅ Applicant has been sent a welcome email. Wire up their branding in the deal app once they pay.
          </p>
        </div>
      </div>
    </div>`;
}

function renderWelcomeEmail(d: ReturnType<typeof partnerSchema.parse>, typeLabel: string) {
  const firstName = d.contactName.split(" ")[0];
  return `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#1e293b">
      <div style="background:#0ea5e9;padding:32px 40px;border-radius:8px 8px 0 0">
        <h1 style="color:#fff;margin:0;font-size:24px;font-weight:700">Welcome to DealPulse</h1>
        <p style="color:#bae6fd;margin:6px 0 0;font-size:14px">Co-Marketing Partner — ${typeLabel}</p>
      </div>
      <div style="background:#fff;padding:32px 40px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px">
        <p style="font-size:16px;margin-top:0">Hi ${firstName},</p>
        <p style="font-size:15px;line-height:1.7">
          Thanks for applying to be a DealPulse co-marketing partner. Your application has been
          received and your placement is being set up.
        </p>
        <p style="font-size:15px;line-height:1.7">
          Here's what you'll get as a <strong>DealPulse Co-Marketing Partner</strong>:
        </p>
        <ul style="font-size:15px;line-height:2;padding-left:20px;color:#334155">
          <li>Your logo and CTA (<em>&ldquo;${d.ctaText}&rdquo;</em>) on every deal page — daily fresh content</li>
          <li>Co-branding in the daily subscriber email sent to every buyer on the list</li>
          <li>Your brand mentioned in social posts going to Facebook, Instagram &amp; LinkedIn</li>
          <li>Buyers come to you pre-warmed — they're already looking at specific deals</li>
        </ul>
        <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:16px 20px;margin:20px 0">
          <p style="margin:0;font-size:14px;color:#0369a1;font-weight:600">Your subscription: $250/month</p>
          <p style="margin:4px 0 0;font-size:13px;color:#0284c7">Month-to-month. Cancel anytime with 30 days' notice.</p>
        </div>
        <p style="font-size:15px;line-height:1.7">
          Once your payment is confirmed, your branding will be live within 24–48 hours. We'll send
          you a link so you can see exactly how your placement looks.
        </p>
        <p style="font-size:15px;margin-bottom:0">
          Questions? Reply to this email or reach Tobie directly at
          <a href="mailto:tobie@elitewichita.com" style="color:#0ea5e9">tobie@elitewichita.com</a>.
        </p>
        <p style="font-size:15px;margin-top:20px;margin-bottom:0">
          — The DealPulse Team<br/>
          <a href="https://www.dealpulsescore.com" style="color:#0ea5e9;font-size:13px">dealpulsescore.com</a>
        </p>
      </div>
    </div>`;
}
