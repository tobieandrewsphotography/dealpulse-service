import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import type Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, sig, secret);
  } catch (err: any) {
    console.error("Stripe webhook verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = supabaseAdmin();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const submissionId = session.metadata?.submission_id;
      const customerEmail = session.customer_email || session.customer_details?.email;

      if (submissionId) {
        await supabase
          .from("onboarding_submissions")
          .update({ status: "paid", stripe_customer_id: session.customer as string })
          .eq("id", submissionId);
      }

      await supabase.from("subscribers").upsert(
        {
          email: customerEmail,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          submission_id: submissionId,
          status: "active",
          lender_sponsor: session.metadata?.lender_sponsor === "true",
        },
        { onConflict: "stripe_customer_id" }
      );
      break;
    }
    case "customer.subscription.deleted":
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      await supabase
        .from("subscribers")
        .update({ status: sub.status })
        .eq("stripe_subscription_id", sub.id);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
