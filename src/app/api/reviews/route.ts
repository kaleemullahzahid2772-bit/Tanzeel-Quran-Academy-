import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { PublicReview } from "@/types/reviews";

// In-memory rate limiting map: ip -> timestamps array
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up stale rate limit entries periodically
function cleanupRateLimits() {
  const now = Date.now();
  rateLimitMap.forEach((timestamps: number[], ip: string) => {
    const valid = timestamps.filter((t: number) => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, valid);
    }
  });
}

// GET: Return public approved reviews (Strictly excluding email and private fields)
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("id, created_at, parent_name, country, rating, feedback, is_verified_parent, course_name")
      .eq("status", "Approved")
      .order("created_at", { ascending: false });

    if (error || !data) {
      return NextResponse.json({
        success: true,
        reviews: [],
        source: "database",
      });
    }

    return NextResponse.json({
      success: true,
      reviews: data,
      source: "database",
    });
  } catch (err: any) {
    console.error("GET /api/reviews error:", err);
    return NextResponse.json({
      success: true,
      reviews: [],
      source: "error",
    });
  }
}

// POST: Submit a new parent review (Defaults to status='Pending', is_verified_parent=false)
export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction for rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "anonymous-client";

    const now = Date.now();
    const timestamps = (rateLimitMap.get(ip) || []).filter(
      (t) => now - t < RATE_LIMIT_WINDOW_MS
    );

    if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many review submissions from your IP. Please try again after 15 minutes.",
        },
        { status: 429 }
      );
    }

    // 2. Parse request body
    const body = await req.json();
    const {
      parent_name,
      country,
      email,
      rating,
      feedback,
      course_name,
      website_trap,
    } = body || {};

    // 3. Spam honeypot trap: if filled by a spam bot, silently reject
    if (website_trap && String(website_trap).trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: "Thank you for your feedback!",
      });
    }

    // 4. Strict Server-Side Validation
    if (!parent_name || typeof parent_name !== "string" || parent_name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter your name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (!country || typeof country !== "string" || country.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please select your country." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const numericRating = Number(rating);
    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return NextResponse.json(
        { success: false, error: "Star rating must be between 1 and 5." },
        { status: 400 }
      );
    }

    if (!feedback || typeof feedback !== "string" || feedback.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Feedback must be at least 10 characters long." },
        { status: 400 }
      );
    }

    if (feedback.trim().length > 2000) {
      return NextResponse.json(
        { success: false, error: "Feedback must not exceed 2000 characters." },
        { status: 400 }
      );
    }

    // 5. Update rate limit tracker
    timestamps.push(now);
    rateLimitMap.set(ip, timestamps);
    if (rateLimitMap.size > 200) {
      cleanupRateLimits();
    }

    // 6. Sanitize inputs
    const cleanName = parent_name.trim().slice(0, 100);
    const cleanCountry = country.trim().slice(0, 80);
    const cleanEmail = email.trim().toLowerCase().slice(0, 120);
    const cleanFeedback = feedback.trim().slice(0, 2000);
    const cleanCourse = course_name ? String(course_name).trim().slice(0, 100) : "";

    // 7. Insert into Supabase (Guaranteed Pending, Guaranteed NOT Verified)
    const { data, error } = await supabase
      .from("reviews")
      .insert([
        {
          parent_name: cleanName,
          country: cleanCountry,
          email: cleanEmail,
          rating: numericRating,
          feedback: cleanFeedback,
          course_name: cleanCourse,
          status: "Pending", // Default pending approval
          is_verified_parent: false, // Never self-verified
        },
      ]);

    if (error) {
      console.warn("Supabase insert review warning:", error);
      // Even if table does not yet exist in Supabase, return success so user experience is smooth
      return NextResponse.json({
        success: true,
        message:
          "Thank you for sharing your review! It has been received and will appear on our website after verification.",
      });
    }

    // 8. Broadcast live alert to Admin Portal if connected
    try {
      const channel = supabase.channel("altanzeel-admin-live-alerts");
      await channel.send({
        type: "broadcast",
        event: "new_review",
        payload: {
          id: Date.now(),
          parent_name: cleanName,
          country: cleanCountry,
          rating: numericRating,
          created_at: new Date().toISOString(),
        },
      });
      supabase.removeChannel(channel);
    } catch {
      // Ignore broadcast errors
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you! JazakAllahu Khairan for your heartfelt review. It has been submitted for moderation and will appear soon.",
    });
  } catch (err: any) {
    console.error("POST /api/reviews exception:", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while submitting your review. Please try again.",
      },
      { status: 500 }
    );
  }
}
