"use client";

import React, { useState } from "react";
import { Sparkles, Mail, MessageCircle } from "lucide-react";
import TrialClassModal from "@/components/TrialClassModal";
import { Course } from "@/data/courses";

interface CourseDetailClientProps {
  course: Course;
}

export default function CourseDetailClient({ course }: CourseDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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

      <TrialClassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
