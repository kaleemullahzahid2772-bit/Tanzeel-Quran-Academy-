"use client";

import React, { useState, useEffect } from "react";
import {
  X,
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
} from "lucide-react";
import CountrySelect from "./CountrySelect";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const ratingLabels: Record<number, string> = {
  5: "5 Stars — Outstanding Quranic Experience ★★★★★",
  4: "4 Stars — Very Good & Recommended ★★★★☆",
  3: "3 Stars — Good Experience ★★★☆☆",
  2: "2 Stars — Fair Experience ★★☆☆☆",
  1: "1 Star — Needs Improvement ★☆☆☆☆",
};

export default function ReviewModal({ isOpen, onClose, onSuccess }: ReviewModalProps) {
  const [parentName, setParentName] = useState("");
  const [country, setCountry] = useState("United States");
  const [email, setEmail] = useState("");
  const [courseName, setCourseName] = useState("Quranic Qaidah");
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [honeypotTrap, setHoneypotTrap] = useState(""); // Anti-bot honeypot

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !loading) {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, loading]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (submitted) {
      setSubmitted(false);
      setParentName("");
      setEmail("");
      setFeedback("");
      setRating(5);
      setErrorMsg(null);
    }
    onClose();
  };

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
          website_trap: honeypotTrap, // invisible to humans
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setErrorMsg(result.error || "Failed to submit review. Please try again.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMsg("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-gradient-to-b from-[#182028] to-[#0e141a] border border-white/15 rounded-3xl p-5 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] my-auto max-h-[92vh] overflow-y-auto text-white transition-all transform animate-fade-in-up"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={loading}
          aria-label="Close Review Modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* ================= SUCCESS STATE ================= */
          <div className="py-8 sm:py-10 text-center space-y-6">
            <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500/20 to-amber-500/20 border-2 border-emerald-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.25)]">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              <Sparkles className="w-5 h-5 text-[var(--color-accent)] absolute -top-1 -right-1 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[var(--color-accent)] font-bold">
                JazakAllahu Khairan!
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Review Submitted Successfully
              </h3>
              <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed pt-2">
                Thank you for taking the time to share your feedback about{" "}
                <span className="text-amber-400 font-semibold">Al Tanzeel Quran Academy</span>.
                Your review has been received and will be displayed on the website once approved by our team.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Parent Verification in Progress</span>
              </div>
              <p className="text-gray-400 text-[11px] leading-relaxed">
                Our administration verifies reviews from genuine enrolled families to award the{" "}
                <span className="text-emerald-400 font-semibold">&quot;Verified Parent&quot;</span> trust badge.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[var(--color-accent)] to-amber-600 hover:from-[var(--color-accent-hover)] hover:to-amber-700 text-white font-black text-sm rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Back to Website
            </button>
          </div>
        ) : (
          /* ================= SUBMISSION FORM ================= */
          <div>
            {/* Header */}
            <div className="text-center sm:text-left mb-6 pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 text-[var(--color-accent)] text-xs font-bold mb-2.5">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Parent Feedback &amp; Reviews</span>
              </div>
              <h2
                id="review-modal-title"
                className="text-2xl sm:text-3xl font-black text-white tracking-tight"
              >
                Share Your <span className="text-[var(--color-accent)]">Experience</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 leading-relaxed">
                Your authentic reviews help other Muslim families choose the best online Quran education for their children.
              </p>
            </div>

            {/* Error Notification */}
            {errorMsg && (
              <div className="mb-5 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                <span className="font-medium">{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Invisible Bot Honeypot */}
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

              {/* Star Rating Picker */}
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
                        className="p-1 sm:p-1.5 focus:outline-none transition-transform hover:scale-125 cursor-pointer"
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
                <p className="text-[11px] text-amber-300/90 font-medium mt-1 transition-all min-h-[16px]">
                  {ratingLabels[hoverRating || rating]}
                </p>
              </div>

              {/* Row 1: Parent Name & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    <span>Parent / Student Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sister Aisha Malik"
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

              {/* Row 2: Email Address (With clear privacy assurance) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[var(--color-sky)]" />
                    <span>Email Address *</span>
                  </label>
                  <span className="text-[10px] text-emerald-400/90 font-semibold flex items-center gap-1">
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

              {/* Optional Course Selection */}
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
                  rows={4}
                  maxLength={1000}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us about the teacher's patience, punctuality, Tajweed guidance, your child's progress, or customer support..."
                  className="w-full bg-black/60 border border-white/15 focus:border-[var(--color-accent)] text-white text-xs sm:text-sm rounded-xl p-3.5 outline-none transition shadow-inner resize-none placeholder-gray-500 leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl font-black text-sm bg-gradient-to-r from-[var(--color-accent)] to-amber-600 hover:from-[var(--color-accent-hover)] hover:to-amber-700 text-white shadow-[0_10px_25px_rgba(250,132,30,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
}
