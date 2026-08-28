"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import TrialClassModal from "./TrialClassModal";

export interface HeroSlide {
  src: string;
  mobileSrc: string;
  alt: string;
  title: string;
  highlight: string;
  subtitle: string;
  tagline: string;
}

// 3 High-Resolution Images (Desktop & Dedicated Mobile) Provided by User in Exact Order
const originalSlides: HeroSlide[] = [
  {
    src: "/hero/slide-1.jpg",
    mobileSrc: "/hero/mobile-slide-1.jpg",
    alt: "Holy Quran gracefully displayed on marble table with warm ambient lamp light",
    title: "Online Qur'an",
    highlight: "Classes",
    subtitle: "Al Tanzeel Quran Academy",
    tagline: "Learn, Recite, Understand",
  },
  {
    src: "/hero/slide-2.jpg",
    mobileSrc: "/hero/mobile-slide-2.jpg",
    alt: "Young Muslim boy attending live 1-on-1 online Quran class on laptop",
    title: "Learn Tajweed",
    highlight: "From Home",
    subtitle: "Qualified Male & Female Tutors",
    tagline: "1-on-1 Interactive Lessons",
  },
  {
    src: "/hero/slide-3.png",
    mobileSrc: "/hero/mobile-slide-3.jpg",
    alt: "Young Muslim girl taking online Quran lesson with female scholar on laptop",
    title: "Memorize Holy",
    highlight: "Quran (Hifz)",
    subtitle: "Structured Progress & Daily Revision",
    tagline: "For All Ages Worldwide",
  },
];

// Append Clone of First Slide to enable infinite horizontal slide loop (Slide 3 -> Slide 1)
const trackSlides: HeroSlide[] = [...originalSlides, originalSlides[0]];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [renderKey, setRenderKey] = useState(0);

  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNextSlide = useCallback(() => {
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }, []);

  // Handle seamless infinite loop jump when reaching the cloned first slide (Index 3 -> Index 0)
  const handleTransitionEnd = useCallback(() => {
    if (currentIndex >= trackSlides.length - 1) {
      setIsAnimating(false);
      setCurrentIndex(0);
    }
  }, [currentIndex]);

  // Safety fallback if onTransitionEnd doesn't fire (e.g. background tab)
  useEffect(() => {
    if (isAnimating && currentIndex >= trackSlides.length - 1) {
      transitionTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
        setCurrentIndex(0);
      }, 1200);
    }

    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [currentIndex, isAnimating]);

  // Automatic 5-second slide timer (only active when tab is visible)
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const startTimer = () => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        timer = setInterval(() => {
          handleNextSlide();
        }, 5000);
      }
    };

    startTimer();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timer) clearInterval(timer);
      } else {
        // Tab became visible again: reset any stuck animation state and resume slider
        setIsAnimating(false);
        setCurrentIndex((prev) => (prev >= trackSlides.length - 1 ? 0 : prev));
        setRenderKey((k) => k + 1);
        if (timer) clearInterval(timer);
        startTimer();
      }
    };

    const handleFocus = () => {
      setIsAnimating(false);
      setRenderKey((k) => k + 1);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      if (timer) clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [currentIndex, handleNextSlide]);

  // Real slide index for text overlay content
  const activeSlideIndex = currentIndex % originalSlides.length;

  return (
    <>
      <section className="relative w-full min-h-[85vh] sm:min-h-[92vh] lg:h-[92vh] flex items-center justify-center overflow-hidden bg-black select-none">
        {/* Preload All Hero Images for High Performance */}
        {originalSlides.map((slide, i) => (
          <React.Fragment key={i}>
            <link rel="preload" as="image" href={slide.src} media="(min-width: 768px)" />
            <link rel="preload" as="image" href={slide.mobileSrc} media="(max-width: 767px)" />
          </React.Fragment>
        ))}

        {/* Full-Width Horizontal Sliding Track */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div
            key={renderKey}
            className="flex w-full h-full"
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: isAnimating
                ? "transform 1100ms cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
          >
            {trackSlides.map((slide, idx) => (
              <div
                key={idx}
                className="w-full h-full shrink-0 relative overflow-hidden"
              >
                {/* Responsive HTML5 Picture Element (Desktop vs Mobile specific images) */}
                <picture className="w-full h-full block">
                  <source media="(max-width: 767px)" srcSet={slide.mobileSrc} />
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full h-full object-cover object-center transform scale-[1.02] transition-transform duration-[5000ms] ease-out"
                    loading="eager"
                    // @ts-ignore
                    fetchPriority="high"
                    onError={(e) => {
                      // Fallback reload if browser dropped GPU texture on tab switch
                      const target = e.currentTarget;
                      const currentSrc = target.src;
                      target.src = "";
                      target.src = currentSrc;
                    }}
                  />
                </picture>

                {/* Subtle Dark & Emerald Overlay for Superior Text Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-emerald-950/35 pointer-events-none" />
                <div className="absolute inset-0 bg-black/25 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center">
          {/* Bismillah Calligraphy */}
          <div
            className="arabic text-3xl sm:text-5xl md:text-6xl text-white mb-6 animate-fade-in drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
            aria-label="Bismillah ir-Rahman ir-Rahim"
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>

          {/* Subtitle pill */}
          <p className="text-xs sm:text-sm md:text-base text-[var(--color-sky-light)] font-bold tracking-[0.25em] uppercase mb-4 flex items-center gap-2 drop-shadow-md">
            <Sparkles className="w-4 h-4 text-[var(--color-accent)] animate-pulse" />
            <span>{originalSlides[activeSlideIndex].subtitle}</span>
            <Sparkles className="w-4 h-4 text-[var(--color-accent)] animate-pulse" />
          </p>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6 tracking-tight drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
            {originalSlides[activeSlideIndex].title}{" "}
            <span className="gold-shimmer-text">
              {originalSlides[activeSlideIndex].highlight}
            </span>
          </h1>

          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 border border-white/30 px-5 py-2 rounded-full backdrop-blur-md bg-black/40 mb-8 sm:mb-10 shadow-lg">
            <BookOpen className="w-4 h-4 text-[var(--color-accent)]" />
            <span className="text-white text-xs sm:text-sm tracking-widest uppercase font-semibold">
              {originalSlides[activeSlideIndex].tagline}
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold text-sm tracking-wider uppercase shadow-[0_4px_30px_rgba(250,132,30,0.6)] transition-all hover:scale-105 active:scale-95 group"
            >
              <span>Request Demo Class</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="https://wa.me/923274816872"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/30 bg-black/40 hover:bg-black/60 text-white font-bold text-sm tracking-wider uppercase backdrop-blur-md transition-all hover:border-[#25D366]/60 hover:text-[#25D366]"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {originalSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsAnimating(true);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to Slide ${idx + 1}`}
              className={`rounded-full transition-all duration-500 ${
                activeSlideIndex === idx
                  ? "w-10 h-3 bg-[var(--color-accent)] shadow-[0_0_15px_rgba(250,132,30,0.9)]"
                  : "w-3 h-3 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Trial Class Popup Modal */}
      <TrialClassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
