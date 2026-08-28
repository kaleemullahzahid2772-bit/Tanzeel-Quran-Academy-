"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Calendar, Clock, BookOpen, ArrowRight } from "lucide-react";
import { Course } from "@/data/courses";
import TrialClassModal from "./TrialClassModal";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <>
      <div
        id={course.slug}
        className="bg-[var(--color-surface)] rounded-2xl flex flex-col group cursor-pointer border border-[#5b9bc6]/40 hover:border-[#5b9bc6] transition-all duration-300 shadow-[0_6px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(91,155,198,0.4)] hover:-translate-y-1.5 overflow-hidden"
      >
        {/* Top Image Banner */}
        <div className="relative h-52 w-full overflow-hidden bg-[var(--color-black-soft)] border-b border-[#5b9bc6]/20">
          {course.image && !imgError ? (
            <img
              src={course.image}
              alt={course.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="relative h-full w-full flex items-center justify-center p-6 bg-gradient-to-tr from-[var(--color-green)]/40 via-[var(--color-surface)] to-[var(--color-sky)]/30">
              <div className="relative z-10 text-center flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-black-soft)]/80 border border-[#5b9bc6]/30 flex items-center justify-center shadow-lg group-hover:bg-[var(--color-accent)] transition-colors">
                  <BookOpen className="w-7 h-7 text-[var(--color-accent)] group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs font-bold text-[var(--color-sky-light)] uppercase tracking-wider">
                  {course.level}
                </span>
              </div>
            </div>
          )}

          {course.badge && (
            <span className="absolute top-3 right-3 bg-[var(--color-accent)] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md z-20">
              {course.badge}
            </span>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col gap-3 flex-1">
          <h3 className="font-black text-xl text-white group-hover:text-[var(--color-accent-light)] transition-colors duration-300">
            {course.title}
          </h3>

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-1 line-clamp-3">
            {course.shortDescription}
          </p>

          {/* Metadata badges */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-3 border-t border-[#5b9bc6]/20 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>{course.ageGroup}</span>
            </span>

            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>{course.duration}</span>
            </span>

            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>{course.classDuration}</span>
            </span>
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex items-center justify-between gap-3 pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
            >
              Enroll Now
            </button>

            <Link
              href={`/courses/${course.slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-accent)] hover:text-white uppercase tracking-wider transition-colors group/link"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      <TrialClassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
