"use client";

import React, { useState } from "react";
import { Teacher } from "@/data/teachers";
import TrialClassModal from "./TrialClassModal";

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <>
      <div className="bg-[var(--color-surface)] border-2 border-[#429cd5] hover:border-[#429cd5] rounded-3xl p-7 sm:p-8 flex flex-col justify-between gap-6 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(66,156,213,0.3)] hover:-translate-y-1.5 group relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--color-sky)]/10 rounded-full blur-2xl group-hover:bg-[var(--color-accent)]/20 transition-all pointer-events-none" />

        {/* Top Header Row with Portrait Photo Frame & Badges */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
          {/* Portrait Photo Container (Focused on Face) */}
          <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.25)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] group-hover:scale-105 transition-all duration-300 overflow-hidden">
            {teacher.image && !imgError ? (
              <img
                src={teacher.image}
                alt={`${teacher.name} - ${teacher.role} at Al Tanzeel Quran Academy`}
                onError={() => setImgError(true)}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover rounded-2xl"
                style={{ objectPosition: teacher.imagePosition || "top" }}
              />
            ) : (
              <div className="w-full h-full bg-[var(--color-black-soft)] rounded-2xl flex items-center justify-center font-black text-4xl text-white">
                {teacher.name.charAt(0)}
              </div>
            )}
            <span className="absolute bottom-2 right-2 bg-[var(--color-accent)] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md z-10">
              5.0 ★
            </span>
          </div>

          {/* Name & Role */}
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="bg-[var(--color-sky)]/20 text-[var(--color-sky-light)] border border-[var(--color-sky)]/30 text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full">
                {teacher.gender === "Female" ? "Female Faculty" : "Male Scholar"}
              </span>
              {teacher.ijazah && (
                <span className="bg-[var(--color-accent)]/15 text-[var(--color-accent-light)] border border-[var(--color-accent)]/30 text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full">
                  {teacher.ijazah}
                </span>
              )}
            </div>

            <h3 className="font-black text-xl sm:text-2xl text-white group-hover:text-[var(--color-accent-light)] transition-colors leading-tight">
              {teacher.name}
            </h3>

            <p className="text-sm sm:text-base text-[var(--color-accent)] font-bold">
              {teacher.role}
            </p>
          </div>
        </div>

        {/* Bio Text */}
        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-[var(--color-border)] pt-4 flex-1">
          {teacher.bio}
        </p>

        {/* Footer CTA Button */}
        <div className="pt-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            Book Trial Class
          </button>
        </div>
      </div>

      <TrialClassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
