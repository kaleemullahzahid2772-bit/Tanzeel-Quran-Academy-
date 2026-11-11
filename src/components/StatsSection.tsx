"use client";

import React, { useEffect, useRef, useState } from "react";

interface StatItem {
  target: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    target: 500,
    suffix: "+",
    label: "Active Students",
    description: "Learners worldwide in USA, UK, Canada & Australia",
  },
  {
    target: 30,
    suffix: "+",
    label: "Qualified Tutors",
    description: "Certified male & female Huffaz and Scholars",
  },
  {
    target: 7,
    suffix: "+",
    label: "Structured Courses",
    description: "From beginner Noorani Qaida to advanced Hifz & Tajweed",
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState<number[]>([1, 1, 1]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    let animFrameId: number | null = null;
    let isCurrentlyVisible = false;

    const runCountUp = () => {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }

      // Respect user's motion preferences
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        setCounts(stats.map((s) => s.target));
        return;
      }

      const duration = 1200; // Fast & smooth 1.2s counting duration
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth cubic ease-out curve: starts fast and settles smoothly at target
        const ease = 1 - Math.pow(1 - progress, 3);

        setCounts(
          stats.map((s) => {
            const val = Math.round(1 + (s.target - 1) * ease);
            return Math.min(val, s.target);
          })
        );

        if (progress < 1) {
          animFrameId = requestAnimationFrame(animate);
        }
      };

      animFrameId = requestAnimationFrame(animate);
    };

    const resetToStart = () => {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }
      setCounts([1, 1, 1]);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isCurrentlyVisible = true;
            runCountUp();
          } else {
            // Whenever scrolled out of view (upwards or downwards),
            // reset back to 1 so the counting animation re-triggers every time
            if (isCurrentlyVisible) {
              isCurrentlyVisible = false;
              resetToStart();
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(node);

    return () => {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--color-black)] py-16 px-4 border-y border-[var(--color-border)]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group flex flex-col items-center text-center py-10 px-6 rounded-2xl border border-[var(--color-sky)]/20 bg-[var(--color-sky)]/5 cursor-pointer transition-all duration-300 hover:border-orange-500/60 hover:bg-orange-500/10 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] hover:-translate-y-1"
          >
            <div className="text-5xl sm:text-6xl font-black text-[var(--color-sky)] mb-2 transition-colors duration-300 group-hover:text-orange-400 tabular-nums">
              <span>{counts[index]}</span>
              <span>{stat.suffix}</span>
            </div>
            <div className="text-white font-bold text-lg sm:text-xl mb-1 transition-colors duration-300 group-hover:text-orange-300">
              {stat.label}
            </div>
            <div className="text-gray-400 text-xs sm:text-sm transition-colors duration-300 group-hover:text-orange-200/80">
              {stat.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
