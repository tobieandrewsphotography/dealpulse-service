import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, brokerage, market, message } = body;

    if (!name || !email || !phone || !brokerage || !market) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const RESEND_KEY = process.env.RESEND_API_KEY;
    const NOTIFY_EMAIL = process.env.ONBOARDING_NOTIFY_EMAIL || "tobie@elitewichita.com";

    if (RESEND_KEY) {
      const html = `
        <h2>New DealPulse Inquiry</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold;width:140px">Name</td><td style="padding:8px">${name}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px"><a href="tel:${phone}">${phone}</a></td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold">Brokerage</td><td style="padding:8px">${brokerage}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Market</td><td style="padding:8px">${market}</td></tr>
          ${message ? `<tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold">Message</td><td style="padding:8px">${message}</td></tr>` : ""}
        </table>
        <p style="margin-top:24px;color:#666;font-size:12px">Submitted via DealPulseScore.com</p>
      `;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_KEY}`,
        },
        body: JSON.stringify({
          from: "DealPulse <noreply@dealpulsescore.com>",
          to: [NOTIFY_EMAIL],
          subject: `New DealPulse inquiry — ${name} (${market})`,
          html,
          reply_to: email,
        }),
      });
    } else {
      console.log("[contact] New inquiry:", { name, email, phone, brokerage, market, message });
    }

    // Save to Supabase inquiries table (best-effort — don't fail if DB not configured)
    try {
      const supabase = supabaseAdmin();
      await supabase.from("inquiries").insert({ name, email, phone, brokerage, market, message });
    } catch {
      // Supabase not configured yet — that's ok
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
