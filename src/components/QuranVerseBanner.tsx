"use client";

import React from "react";

export default function QuranVerseBanner() {
  return (
    <section className="bg-[var(--color-black-soft)] py-16 px-4 border-y border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[var(--color-surface)] border border-[var(--color-sky)]/30 rounded-2xl px-6 sm:px-12 py-12 md:py-16 text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <h2 className="arabic text-[var(--color-sky)] text-3xl sm:text-5xl md:text-7xl font-bold leading-relaxed mb-4">
            خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
          </h2>
          <p className="text-white text-lg sm:text-2xl md:text-3xl font-semibold mb-3 max-w-4xl mx-auto leading-relaxed">
            &quot;The best among you are those who learn the Qur&#x27;an and teach it&quot;
          </p>
          <p className="text-[var(--color-accent)] text-sm sm:text-lg font-bold tracking-wider uppercase">
            Prophet Muhammad ﷺ
          </p>
        </div>
      </div>
    </section>
  );
}
