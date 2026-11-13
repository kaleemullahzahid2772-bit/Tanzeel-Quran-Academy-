"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  Quote,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  MessageSquareHeart,
  Globe,
  Sparkles,
  HeartHandshake,
  MessageSquare,
} from "lucide-react";
import ReviewModal from "./ReviewModal";
import { PublicReview } from "@/types/reviews";
import { getFlagUrl, countriesData } from "@/data/countries";

export default function ParentsReviewsSection() {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Fetch approved reviews from API
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data = await res.json();
        if (data.reviews && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        } else {
          setReviews([]);
        }
      }
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Helper to find flag for country
  const getFlagForCountry = (countryName: string) => {
    const match = countriesData.find(
      (c) => c.name.toLowerCase() === countryName?.trim().toLowerCase()
    );
    return match ? getFlagUrl(match.code) : null;
  };

  // Slider navigation
  const totalSlides = reviews.length;

  const nextSlide = () => {
    if (totalSlides > 0) {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }
  };

  const prevSlide = () => {
    if (totalSlides > 0) {
      setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };

  // Touch swipe support for mobile
  const touchStartXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartXRef.current = null;
  };

  // Dynamic real rating calculation based ONLY on real approved reviews
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length
        ).toFixed(1)
      : null;

  return (
    <section
      id="parents-reviews"
      aria-label="What Parents Say About Us"
      className="relative py-20 sm:py-24 px-4 bg-[#0a0f14] overflow-hidden"
    >
      {/* Background Decorative Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[var(--color-accent)]/10 via-[var(--color-sky)]/10 to-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-0" />
      <div className="absolute -bottom-10 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[90px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 text-[var(--color-accent)] text-xs font-bold uppercase tracking-[0.25em] mb-3.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>What Parents Say About Us</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Authentic Reviews from{" "}
            <span className="text-[var(--color-accent)]">Our Academy Parents</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-[var(--color-accent)] to-amber-400 mx-auto rounded-full my-5" />

          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Genuine feedback and ratings from parents across the globe whose children are currently enrolled in our personalized online Quran and Tajweed classes.
          </p>

          {/* Trust Metrics Bar */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-gray-300">
            {averageRating && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex text-[var(--color-accent)]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-white ml-1">{averageRating} / 5.0</span>
                <span className="text-gray-400">Average Rating</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-semibold">100% Genuine Parent Feedback</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 backdrop-blur-sm">
              <Globe className="w-4 h-4" />
              <span className="font-semibold">Global Student Family</span>
            </div>
          </div>
        </div>

        {/* ==============================================================
            CONDITIONAL DISPLAY: REAL REVIEWS OR WELCOMING INVITATION
           ============================================================== */}
        {loading ? (
          <div className="py-16 text-center text-gray-400 text-xs">
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          /* Zero Fake Reviews: Pure welcoming state when no approved reviews yet */
          <div className="max-w-xl mx-auto bg-gradient-to-b from-[#141b22] to-[#0c1116] border border-white/10 rounded-3xl p-8 sm:p-10 text-center shadow-2xl mb-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 mx-auto flex items-center justify-center text-[var(--color-accent)] shadow-inner">
              <MessageSquare className="w-8 h-8" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Be the First Parent to Share Your Experience!
            </h3>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-md mx-auto">
              Are your children learning with Al Tanzeel Quran Academy? We would love to hear your feedback on our teachers, Tajweed progress, and flexible scheduling.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[var(--color-accent)] to-amber-600 hover:from-[var(--color-accent-hover)] hover:to-amber-700 shadow-[0_10px_25px_rgba(250,132,30,0.35)] transition-all cursor-pointer"
              >
                <MessageSquareHeart className="w-4 h-4" />
                <span>Write a Review</span>
              </button>
            </div>
          </div>
        ) : (
          /* REAL APPROVED REVIEWS DISPLAY */
          <>
            {/* 1. MOBILE SLIDER */}
            <div className="block lg:hidden relative mb-10">
              <div
                className="overflow-hidden touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                >
                  {reviews.map((review) => {
                    const flagUrl = getFlagForCountry(review.country);
                    return (
                      <div key={review.id} className="w-full shrink-0 px-2">
                        <div className="h-full bg-gradient-to-b from-[#141b22] to-[#0c1116] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between relative group">
                          <div>
                            <div className="flex items-start justify-between gap-3 mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[var(--color-accent)] to-amber-600 flex items-center justify-center text-white font-black text-lg shadow-md shrink-0">
                                  {review.parent_name.charAt(0)}
                                </div>
                                <div>
                                  <h3 className="font-bold text-white text-base leading-snug">
                                    {review.parent_name}
                                  </h3>
                                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                                    {flagUrl ? (
                                      <img
                                        src={flagUrl}
                                        alt={review.country}
                                        className="w-4 h-3 object-cover rounded-xs border border-white/20 shrink-0"
                                      />
                                    ) : (
                                      <Globe className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                    )}
                                    <span>{review.country}</span>
                                  </div>
                                </div>
                              </div>

                              {review.is_verified_parent && (
                                <span
                                  title="Officially verified enrollment by Al Tanzeel Academy"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold shadow-sm shrink-0"
                                >
                                  <ShieldCheck className="w-3.5 h-3.5" />
                                  <span>Verified</span>
                                </span>
                              )}
                            </div>

                            {/* Stars */}
                            <div className="flex items-center gap-1 mb-3.5">
                              {[...Array(review.rating || 5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 fill-[var(--color-accent)] text-[var(--color-accent)] drop-shadow-[0_0_6px_rgba(250,132,30,0.4)]"
                                />
                              ))}
                            </div>

                            {/* Feedback Text */}
                            <div className="relative text-gray-200 text-sm leading-relaxed mb-6 font-normal">
                              <Quote className="w-6 h-6 text-amber-500/20 absolute -top-2 -left-2 -z-0 rotate-180" />
                              <p className="relative z-10 italic">
                                &ldquo;{review.feedback}&rdquo;
                              </p>
                            </div>
                          </div>

                          {review.course_name && (
                            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                              <span className="text-[var(--color-accent-light)] font-medium">
                                {review.course_name}
                              </span>
                              <span className="text-[11px] text-gray-400">Enrolled Family</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Controls */}
              {totalSlides > 1 && (
                <div className="flex items-center justify-between mt-5 px-3">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous Review"
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition active:scale-95 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {reviews.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === activeSlide
                            ? "w-6 bg-[var(--color-accent)] shadow-[0_0_8px_rgba(250,132,30,0.8)]"
                            : "w-2 bg-white/25 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextSlide}
                    aria-label="Next Review"
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition active:scale-95 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* 2. DESKTOP GRID */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-12">
              {reviews.map((review) => {
                const flagUrl = getFlagForCountry(review.country);
                return (
                  <div
                    key={review.id}
                    className="bg-gradient-to-b from-[#131a22] to-[#0c1116] border border-white/10 hover:border-[var(--color-accent)]/50 rounded-3xl p-7 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(250,132,30,0.18)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[var(--color-accent)] to-amber-600 flex items-center justify-center text-white font-black text-lg shadow-md shrink-0 group-hover:scale-105 transition-transform">
                            {review.parent_name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-base group-hover:text-[var(--color-accent-light)] transition-colors">
                              {review.parent_name}
                            </h3>
                            <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                              {flagUrl ? (
                                <img
                                  src={flagUrl}
                                  alt={review.country}
                                  className="w-4 h-3 object-cover rounded-xs border border-white/20 shrink-0"
                                />
                              ) : (
                                <Globe className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              )}
                              <span>{review.country}</span>
                            </div>
                          </div>
                        </div>

                        {review.is_verified_parent && (
                          <span
                            title="Officially verified enrollment by Al Tanzeel Academy"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold shadow-sm shrink-0"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Verified</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(review.rating || 5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-[var(--color-accent)] text-[var(--color-accent)] drop-shadow-[0_0_6px_rgba(250,132,30,0.5)]"
                          />
                        ))}
                      </div>

                      <div className="relative text-gray-300 text-sm leading-relaxed mb-6">
                        <Quote className="w-7 h-7 text-amber-500/15 absolute -top-3 -left-3 -z-0 rotate-180" />
                        <p className="relative z-10 italic">
                          &ldquo;{review.feedback}&rdquo;
                        </p>
                      </div>
                    </div>

                    {review.course_name && (
                      <div className="pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                        <span className="text-[var(--color-accent-light)] font-medium">
                          {review.course_name}
                        </span>
                        <span className="text-[11px] text-gray-400">Enrolled Family</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Write Review Button when reviews exist */}
            <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-[var(--color-accent)] to-amber-600 hover:from-[var(--color-accent-hover)] hover:to-amber-700 shadow-[0_10px_30px_rgba(250,132,30,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <MessageSquareHeart className="w-5 h-5 text-white" />
                <span>Write a Review</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Review Submission Modal Popup */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          fetchReviews();
        }}
      />
    </section>
  );
}
