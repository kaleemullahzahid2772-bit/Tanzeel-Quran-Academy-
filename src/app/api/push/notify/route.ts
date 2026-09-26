import { NextResponse } from "next/server";
import webPush from "@/lib/webpush";
import { supabase } from "@/lib/supabase";
import { inMemorySubscriptions } from "@/lib/subscriptionStore";

export async function POST(req: Request) {
  try {
    const { title, body, url, data } = await req.json();

    const payload = JSON.stringify({
      title: title || "🔔 New Registration Received!",
      body: body || "A new student inquiry has arrived at Al Tanzeel Quran Academy.",
      icon: "/admin-icon-192.png",
      badge: "/admin-icon-192.png",
      tag: `trial-reg-${Date.now()}`,
      vibrate: [300, 150, 300, 150, 400],
      data: {
        url: url || "/admin/dashboard",
        ...(data || {}),
      },
    });

    // 1. Gather all unique subscriptions
    const subMap = new Map<
      string,
      { endpoint: string; keys: { p256dh: string; auth: string } }
    >();

    // From memory
    inMemorySubscriptions.forEach((sub, ep) => {
      subMap.set(ep, sub);
    });

    // From Supabase
    try {
      const { data: dbSubs, error } = await supabase
        .from("admin_push_subscriptions")
        .select("endpoint, p256dh, auth");

      if (dbSubs && !error) {
        for (const item of dbSubs) {
          if (item.endpoint && item.p256dh && item.auth) {
            subMap.set(item.endpoint, {
              endpoint: item.endpoint,
              keys: {
                p256dh: item.p256dh,
                auth: item.auth,
              },
            });
          }
        }
      }
    } catch (dbErr) {
      console.warn("Supabase fetch subs warning (non-fatal):", dbErr);
    }

    const subscriptions: Array<{
      endpoint: string;
      keys: { p256dh: string; auth: string };
    }> = [];
    subMap.forEach((v) => subscriptions.push(v));

    if (subscriptions.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No admin push subscriptions found",
        sent: 0,
      });
    }

    // 2. Dispatch push to all devices concurrently
    let sentCount = 0;
    const expiredEndpoints: string[] = [];

    const sendPromises = subscriptions.map(async (sub) => {
      try {
        await webPush.sendNotification(sub, payload);
        sentCount++;
      } catch (err: any) {
        if (err.statusCode === 404 || err.statusCode === 410) {
          // Subscription has expired or user unsubscribed
          expiredEndpoints.push(sub.endpoint);
          inMemorySubscriptions.delete(sub.endpoint);
        } else {
          console.warn("Web Push dispatch warning for endpoint:", sub.endpoint, err.message);
        }
      }
    });

    await Promise.all(sendPromises);

    // Clean up expired endpoints from Supabase if any
    if (expiredEndpoints.length > 0) {
      try {
        await supabase
          .from("admin_push_subscriptions")
          .delete()
          .in("endpoint", expiredEndpoints);
      } catch (delErr) {
        // ignore
      }
    }

    return NextResponse.json({
      success: true,
      sent: sentCount,
      total: subscriptions.length,
    });
  } catch (err: any) {
    console.error("Push notify error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to dispatch push notification" },
      { status: 500 }
    );
  }
}
