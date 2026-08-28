"use client";

import React from "react";
import Link from "next/link";
import { Camera, ArrowRight } from "lucide-react";
import { galleryImages } from "@/data/gallery";

export default function StudentGallerySection() {
  const previewImages = galleryImages.slice(0, 4);

  return (
    <section className="bg-[var(--color-black-soft)] py-20 px-4 border-t border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-bold uppercase tracking-wider mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>Real Academy Activities</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Student <span className="text-[var(--color-accent)]">Gallery</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-xl">
              Real moments of learning, growth and Quranic education at Al Tanzeel Quran Academy.
            </p>
          </div>

          <Link
            href="/student-gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-md group shrink-0"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-4 h-4 text-[var(--color-accent)] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Preview Photo Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewImages.map((item) => (
            <Link
              key={item.id}
              href="/student-gallery"
              className="group relative bg-[var(--color-surface)] border-2 border-[#429cd5]/30 hover:border-[#429cd5] rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(66,156,213,0.3)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-black)]">
                <img
                  src={item.image}
                  alt={item.caption || "Student Gallery Photo"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-2xl"
                />
              </div>

              {item.caption && (
                <div className="p-4 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
                  <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-[var(--color-accent-light)] transition-colors truncate">
                    {item.caption}
                  </h3>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
