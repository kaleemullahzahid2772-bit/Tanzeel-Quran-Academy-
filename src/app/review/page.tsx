"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  User,
  Mail,
  Lock,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Heart,
  ArrowLeft,
  Globe,
  Home,
} from "lucide-react";
import CountrySelect from "@/components/CountrySelect";

const ratingLabels: Record<number, string> = {
  5: "5 Stars — Outstanding Quranic Experience ★★★★★",
  4: "4 Stars — Very Good & Recommended ★★★★☆",
  3: "3 Stars — Good Experience ★★★☆☆",
  2: "2 Stars — Fair Experience ★★☆☆☆",
  1: "1 Star — Needs Improvement ★☆☆☆☆",
};

export default function ReviewPage() {
  const [parentName, setParentName] = useState("");
  const [country, setCountry] = useState("United States");
  const [email, setEmail] = useState("");
  const [courseName, setCourseName] = useState("Quranic Qaidah");
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [honeypotTrap, setHoneypotTrap] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!parentName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    if (!country.trim()) {
      setErrorMsg("Please select your country.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address (for admin verification only).");
      return;
    }

    if (!feedback.trim() || feedback.trim().length < 10) {
      setErrorMsg("Please write at least 10 characters describing your experience.");
      return;
    }

    if (feedback.trim().length > 1000) {
      setErrorMsg("Feedback cannot exceed 1000 characters.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parent_name: parentName.trim(),
          country: country.trim(),
          email: email.trim(),
          course_name: courseName.trim(),
          rating,
          feedback: feedback.trim(),
          website_trap: honeypotTrap,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setErrorMsg(result.error || "Failed to submit review. Please try again.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMsg("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 px-4 bg-[#0a0f14] text-white flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[var(--color-accent)]/15 via-[var(--color-sky)]/10 to-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-0" />

      <div className="w-full max-w-2xl relative z-10">
        {/* Top Back Link & Academy Logo Header */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Academy</span>
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <img
              src="/tanzeel-logo.png"
              alt="Al Tanzeel Quran Academy"
              className="h-9 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Form Card Container */}
        <div className="bg-gradient-to-b from-[#151c24] to-[#0c1116] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          {submitted ? (
            /* SUCCESS CONFIRMATION STATE */
            <div className="py-8 sm:py-12 text-center space-y-6 animate-fade-in">
              <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500/20 to-amber-500/20 border-2 border-emerald-500/40 flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                <Sparkles className="w-5 h-5 text-[var(--color-accent)] absolute -top-1 -right-1 animate-pulse" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[var(--color-accent)] font-bold">
                  JazakAllahu Khairan!
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  Review Submitted Successfully
                </h1>
                <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed pt-2">
                  Thank you for sharing your valuable review about{" "}
                  <span className="text-amber-400 font-semibold">Al Tanzeel Quran Academy</span>.
                  Your review has been received and will be displayed on the website once approved by our administration.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Parent Badge in Progress</span>
                </div>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  Our team verifies reviews from enrolled student families to grant the{" "}
                  <span className="text-emerald-400 font-semibold">&quot;Verified Parent&quot;</span> trust mark.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/"
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[var(--color-accent)] to-amber-600 hover:from-[var(--color-accent-hover)] hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Visit Academy Website</span>
                </Link>
              </div>
            </div>
          ) : (
            /* SUBMISSION FORM */
            <div className="animate-fade-in">
              <div className="text-center sm:text-left mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 text-[var(--color-accent)] text-xs font-bold mb-3">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Parents Review &amp; Feedback Form</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Share Your <span className="text-[var(--color-accent)]">Experience</span>
                </h1>

                <p className="text-xs sm:text-sm text-gray-300 mt-1 leading-relaxed">
                  Your feedback helps other Muslim families across the globe find authentic, personalized 1-on-1 Quran education with Tajweed for their children.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-5 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                  <span className="font-medium">{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot for bot protection */}
                <input
                  type="text"
                  name="website_trap"
                  value={honeypotTrap}
                  onChange={(e) => setHoneypotTrap(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ display: "none", position: "absolute", left: "-9999px" }}
                />

                {/* Rating Picker */}
                <div className="bg-black/50 border border-white/10 rounded-2xl p-4 text-center">
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-bold mb-2">
                    Select Star Rating <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <div
                    className="flex items-center justify-center gap-2 sm:gap-3 py-1"
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    {[1, 2, 3, 4, 5].map((starValue) => {
                      const activeRating = hoverRating || rating;
                      const isFilled = starValue <= activeRating;
                      return (
                        <button
                          type="button"
                          key={starValue}
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHoverRating(starValue)}
                          aria-label={`Rate ${starValue} Stars`}
                          className="p-1 focus:outline-none transition-transform hover:scale-125 cursor-pointer"
                        >
                          <Star
                            className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                              isFilled
                                ? "fill-[var(--color-accent)] text-[var(--color-accent)] drop-shadow-[0_0_8px_rgba(250,132,30,0.6)]"
                                : "text-gray-600 hover:text-gray-400"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-amber-300/90 font-medium mt-1 min-h-[16px]">
                    {ratingLabels[hoverRating || rating]}
                  </p>
                </div>

                {/* Name & Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                      <span>Parent / Student Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sister Aisha / Brother Tariq"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full bg-black/60 border border-white/15 focus:border-[var(--color-accent)] text-white text-xs sm:text-sm rounded-xl px-3.5 py-3 outline-none transition shadow-inner placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Country of Residence *
                    </label>
                    <CountrySelect value={country} onChange={setCountry} required />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[var(--color-sky)]" />
                      <span>Email Address *</span>
                    </label>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" />
                      Private — Never Published
                    </span>
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="e.g. yourname@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[var(--color-accent)] text-white text-xs sm:text-sm rounded-xl px-3.5 py-3 outline-none transition shadow-inner placeholder-gray-500"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">
                    Used solely by our administration to confirm your enrollment and grant the Verified Parent badge.
                  </p>
                </div>

                {/* Course Taken */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Course Taken (Optional)
                  </label>
                  <select
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[var(--color-accent)] text-white text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none transition cursor-pointer"
                  >
                    <option value="Quranic Qaidah" className="bg-[#141414] text-white">
                      Quranic Qaidah (Noorani Qaida)
                    </option>
                    <option value="Quran Reading with Tajweed" className="bg-[#141414] text-white">
                      Quran Reading with Tajweed
                    </option>
                    <option value="Quran Memorizing (Hifz)" className="bg-[#141414] text-white">
                      Quran Memorizing (Hifz)
                    </option>
                    <option value="Women Quranic Course" className="bg-[#141414] text-white">
                      Women Quranic Course (Female Teacher)
                    </option>
                    <option value="Islamic Studies for Kids" className="bg-[#141414] text-white">
                      Islamic Studies &amp; Daily Duas for Kids
                    </option>
                    <option value="Quran Translation & Tafseer" className="bg-[#141414] text-white">
                      Quran Translation &amp; Tafseer
                    </option>
                  </select>
                </div>

                {/* Feedback Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                      <span>Your Experience &amp; Feedback *</span>
                    </label>
                    <span className="text-[10px] text-gray-400">
                      {feedback.length} / 1000
                    </span>
                  </div>
                  <textarea
                    required
                    rows={5}
                    maxLength={1000}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us about the teacher's patience, Tajweed progress, your child's learning journey, punctuality, or customer support..."
                    className="w-full bg-black/60 border border-white/15 focus:border-[var(--color-accent)] text-white text-xs sm:text-sm rounded-xl p-3.5 outline-none transition shadow-inner resize-none placeholder-gray-500 leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-[var(--color-accent)] to-amber-600 hover:from-[var(--color-accent-hover)] hover:to-amber-700 text-white shadow-[0_10px_25px_rgba(250,132,30,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Your Review...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Submit Review</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
