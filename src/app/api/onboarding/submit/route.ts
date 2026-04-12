import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { onboardingSchema } from "@/lib/onboarding-schema";
import { supabaseAdmin } from "@/lib/supabase";
import { stripe } from "@/lib/stripe";

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

    // 3. Create Stripe Checkout session
    const priceId = data.lenderSponsor
      ? process.env.STRIPE_PRICE_LENDER
      : process.env.STRIPE_PRICE_STANDARD;
    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_AGENT_URL;

    const session = await stripe.checkout.sessions.create({
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
