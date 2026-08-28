"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { coursesData } from "@/data/courses";
import {
  User,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowLeft,
  BookOpen,
  ShieldCheck,
  Mail,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import TrialClassModal from "@/components/TrialClassModal";

interface CourseDetailPageProps {
  params: {
    slug: string;
  };
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const course = coursesData.find((c) => c.slug === params.slug);

  if (!course) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col w-full min-h-screen">
        {/* Header Banner */}
        <section className="relative bg-[var(--color-black-soft)] py-16 px-4 border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto flex flex-col gap-4">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-accent)] hover:text-white uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Courses</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="bg-[var(--color-accent)] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {course.level}
              </span>
              {course.badge && (
                <span className="bg-[var(--color-sky)]/20 text-[var(--color-sky-light)] border border-[var(--color-sky)]/30 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {course.badge}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white">{course.title}</h1>
            <p className="text-[var(--color-accent-light)] text-base sm:text-xl font-semibold">
              {course.subtitle}
            </p>

            <div className="flex flex-wrap gap-6 pt-4 text-xs sm:text-sm text-gray-300">
              <span className="flex items-center gap-2 bg-[var(--color-surface)] px-4 py-2 rounded-xl border border-[var(--color-border)]">
                <User className="w-4 h-4 text-[var(--color-accent)]" />
                <span>Age Group: {course.ageGroup}</span>
              </span>

              <span className="flex items-center gap-2 bg-[var(--color-surface)] px-4 py-2 rounded-xl border border-[var(--color-border)]">
                <Calendar className="w-4 h-4 text-[var(--color-accent)]" />
                <span>Duration: {course.duration}</span>
              </span>

              <span className="flex items-center gap-2 bg-[var(--color-surface)] px-4 py-2 rounded-xl border border-[var(--color-border)]">
                <Clock className="w-4 h-4 text-[var(--color-accent)]" />
                <span>Class Time: {course.classDuration}</span>
              </span>
            </div>
          </div>
        </section>

        {/* Main Grid Content */}
        <section className="bg-[var(--color-black)] py-16 px-4 flex-1">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
            {/* Left 2 Columns: Description & Syllabus */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              {/* Overview */}
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 space-y-4">
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-[var(--color-accent)]" />
                  <span>Course Overview</span>
                </h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {course.fullDescription}
                </p>
              </div>

              {/* Curriculum Topics */}
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl font-black text-white mb-6">What You Will Learn</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.topics.map((topic, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-[var(--color-black-soft)] p-4 rounded-xl border border-[var(--color-border)]">
                      <CheckCircle2 className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                      <span className="text-gray-200 text-xs sm:text-sm font-medium">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl font-black text-white mb-6">Key Learning Outcomes</h2>
                <ul className="space-y-3">
                  {course.learningOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300 text-xs sm:text-sm">
                      <span className="w-2 h-2 rounded-full bg-[var(--color-sky)] shrink-0 mt-2" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Course Enrollment Sidebar */}
            <div className="flex flex-col gap-6">
              <div className="sticky top-24 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.6)] space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 text-[var(--color-accent-light)] text-[11px] font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Learning Today</span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white">Enroll in {course.title}</h3>
                  <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">
                    Take a 3-day free trial class with certified male or female tutors. No obligation or credit card required.
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(250,132,30,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book Free Trial Class
                </button>

                <div className="pt-4 border-t border-[var(--color-border)] flex flex-col gap-3 text-xs">
                  <a
                    href="mailto:info@altanzeelquranacademy.com"
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-black-soft)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span>Email: info@altanzeelquranacademy.com</span>
                  </a>

                  <a
                    href="https://wa.me/923274816872"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-[#25D366] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-black-soft)] border border-[var(--color-border)] flex items-center justify-center text-[#25D366]">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span>WhatsApp: +92 327 4816872</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <TrialClassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
