import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { onboardingSchema } from "@/lib/onboarding-schema";
import { supabaseAdmin } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = onboardingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid submission", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const data = parsed.data;

    // 1. Save to Supabase
    const supabase = supabaseAdmin();
    const { data: row, error: dbError } = await supabase
      .from("onboarding_submissions")
      .insert({
        full_name: data.fullName,
        brokerage_name: data.brokerageName,
        license_number: data.licenseNumber,
        city: data.city,
        state: data.state,
        phone: data.phone,
        email: data.email,
        primary_color: data.primaryColor,
        secondary_color: data.secondaryColor,
        logo_url: data.logoUrl || null,
        tagline: data.tagline,
        site_title: data.siteTitle,
        mls_name: data.mlsName,
        mls_grid_token: data.mlsGridToken,
        zip_codes: data.zipCodes,
        facebook_page_id: data.facebookPageId || null,
        instagram_handle: data.instagramHandle || null,
        linkedin_url: data.linkedinUrl || null,
        lender_sponsor: data.lenderSponsor,
        partner_business_name: data.partnerBusinessName || null,
        partner_contact_name: data.partnerContactName || null,
        partner_email: data.partnerEmail || null,
        partner_phone: data.partnerPhone || null,
        partner_website: data.partnerWebsite || null,
        partner_logo_url: data.partnerLogoUrl || null,
        status: "pending_payment",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // 2. Notify Tobie
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM || "DealPulse <noreply@dealpulsescore.com>",
        to: process.env.ONBOARDING_NOTIFY_EMAIL || "tobie@elitewichita.com",
        subject: `New DealPulse onboarding — ${data.fullName} (${data.brokerageName})`,
        html: renderEmail(data),
      });
    }

    // 2b. Notify co-marketing partner (if applicable)
    if (process.env.RESEND_API_KEY && data.lenderSponsor && data.partnerEmail) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM || "DealPulse <noreply@dealpulsescore.com>",
        to: data.partnerEmail,
        replyTo: "tobie@elitewichita.com",
        subject: `You've been added as a co-marketing partner on DealPulse`,
        html: renderPartnerEmail(data),
      });
    }

    // 3. Create Stripe Checkout session
    // Agent always pays $1,000/mo — partner co-branding is billed separately
    const priceId = process.env.STRIPE_PRICE_STANDARD;
    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_AGENT_URL;

    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      customer_email: data.email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/agent/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/agent/apply`,
      metadata: { submission_id: row.id, lender_sponsor: String(data.lenderSponsor) },
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

function renderPartnerEmail(d: any) {
  const agentName = d.fullName;
  const brokerage = d.brokerageName;
  const partnerName = d.partnerContactName || d.partnerBusinessName || "there";
  const partnerBiz = d.partnerBusinessName || "";
  return `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#1e293b">
      <div style="background:#0ea5e9;padding:32px 40px;border-radius:8px 8px 0 0">
        <h1 style="color:#fff;margin:0;font-size:24px;font-weight:700">You're in — DealPulse Co-Marketing</h1>
      </div>
      <div style="background:#fff;padding:32px 40px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px">
        <p style="font-size:16px;margin-top:0">Hi ${partnerName},</p>
        <p style="font-size:15px;line-height:1.6">
          <strong>${agentName}</strong> of <strong>${brokerage}</strong> just signed up for
          <strong>DealPulse</strong> — a daily deal-of-the-day real estate tool — and listed
          <strong>${partnerBiz}</strong> as their co-marketing partner.
        </p>
        <p style="font-size:15px;line-height:1.6">
          Here's what that means for you:
        </p>
        <ul style="font-size:15px;line-height:1.9;padding-left:20px">
          <li>Your logo and a call-to-action button will appear on every deal page they publish</li>
          <li>Buyers browsing their daily deals will see your brand and a direct link to your services</li>
          <li>You'll be co-branded on their daily email to subscribers and their social media posts</li>
          <li>Your co-marketing fee is <strong>$250/month</strong> — ${agentName} handles the rest</li>
        </ul>
        <p style="font-size:15px;line-height:1.6">
          Their site is currently being set up and will go live within 24–48 hours after payment is confirmed.
          We'll follow up once everything is live with a link so you can see your placement.
        </p>
        <p style="font-size:15px;line-height:1.6">
          Questions? Reply to this email or reach out to Tobie Andrews at
          <a href="mailto:tobie@elitewichita.com" style="color:#0ea5e9">tobie@elitewichita.com</a>.
        </p>
        <p style="font-size:15px;margin-bottom:0">
          Welcome aboard,<br/>
          <strong>The DealPulse Team</strong><br/>
          <a href="https://www.dealpulsescore.com" style="color:#0ea5e9">dealpulsescore.com</a>
        </p>
      </div>
    </div>
  `;
}

function renderEmail(d: any) {
  const rows = Object.entries(d)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px;font-weight:600;background:#f8fafc">${k}</td><td style="padding:4px 12px">${String(
          v
        )}</td></tr>`
    )
    .join("");
  return `
    <h2>New DealPulse onboarding submission</h2>
    <table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">${rows}</table>
  `;
}
