"use client";

import React from "react";

const stats = [
  {
    number: "500+",
    label: "Active Students",
    description: "Learners worldwide in USA, UK, Canada & Australia",
  },
  {
    number: "30+",
    label: "Qualified Tutors",
    description: "Certified male & female Huffaz and Scholars",
  },
  {
    number: "7+",
    label: "Structured Courses",
    description: "From beginner Noorani Qaida to advanced Hifz & Tajweed",
  },
];

export default function StatsSection() {
  return (
    <section className="bg-[var(--color-black)] py-16 px-4 border-y border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group flex flex-col items-center text-center py-10 px-6 rounded-2xl border border-[var(--color-sky)]/20 bg-[var(--color-sky)]/5 cursor-pointer transition-all duration-300 hover:border-orange-500/60 hover:bg-orange-500/10 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] hover:-translate-y-1"
          >
            <div className="text-5xl sm:text-6xl font-black text-[var(--color-sky)] mb-2 transition-colors duration-300 group-hover:text-orange-400">
              {stat.number}
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
