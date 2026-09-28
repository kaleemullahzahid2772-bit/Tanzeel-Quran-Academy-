import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { inMemorySubscriptions } from "@/lib/subscriptionStore";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subscription } = body;

    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return NextResponse.json(
        { error: "Invalid subscription payload" },
        {
          status: 400,
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    // 1. Save in memory cache
    inMemorySubscriptions.set(subscription.endpoint, subscription);

    // 2. Persist in Supabase if table exists
    try {
      await supabase.from("admin_push_subscriptions").upsert(
        {
          endpoint: subscription.endpoint,
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
        },
        { onConflict: "endpoint" }
      );
    } catch (dbErr) {
      console.warn("Supabase subscription persist warning (non-fatal):", dbErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Push subscription registered successfully",
      },
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
  } catch (err: any) {
    console.error("Subscription error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to register subscription" },
      {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
  }
}
