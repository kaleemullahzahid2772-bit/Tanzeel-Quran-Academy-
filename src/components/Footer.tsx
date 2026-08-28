"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Mail,
  Facebook,
  Instagram,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import TrialClassModal from "./TrialClassModal";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-[var(--color-black-nav)] border-t border-[var(--color-border)] pt-16 pb-8 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Upper CTA Banner inside Footer */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-surface-raised)] to-[var(--color-black-soft)] border border-[var(--color-border)] p-8 sm:p-12 mb-16 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 text-[var(--color-accent-light)] text-xs font-bold uppercase tracking-wider mb-4">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Start Your Quran Journey Today</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                  Book Your 3-Day <span className="text-[var(--color-accent)]">Free Trial Class</span>
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
                  No credit card required. Experience live 1-on-1 interactive lessons with expert Quran scholars from the comfort of your home.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(250,132,30,0.5)] transition-all hover:scale-105 active:scale-95"
                >
                  <span>Book Free Trial Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/923274816872"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>

          {/* 4 Main Footer Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[var(--color-border)]">
            {/* Column 1: Brand & Logo */}
            <div className="flex flex-col gap-5">
              <Link href="/" className="inline-block">
                <div className="relative w-52 h-14">
                  <img
                    src="/tanzeel-logo.png"
                    alt="Tanzeel Quran Academy"
                    className="h-full w-auto object-contain"
                  />
                </div>
              </Link>

              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Al Tanzeel Quran Academy is a premier online Islamic institute dedicated to teaching Tajweed, Quran Recitation, Hifz, Arabic Language, and Islamic Studies to students worldwide.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://wa.me/923274816872"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[#25D366] text-[#25D366] flex items-center justify-center transition-all hover:scale-110"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="mailto:info@altanzeelquranacademy.com"
                  aria-label="Email"
                  className="w-9 h-9 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-accent)] flex items-center justify-center transition-all hover:scale-110"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-sky)] text-[var(--color-sky)] flex items-center justify-center transition-all hover:scale-110"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-accent)] flex items-center justify-center transition-all hover:scale-110"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h4 className="text-white font-bold text-sm uppercase tracking-wider">
                  Quick Navigation
                </h4>
                <div className="w-8 h-0.5 bg-[var(--color-accent)] rounded-full" />
              </div>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
                <li>
                  <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[var(--color-accent)] transition-colors">
                    About Academy
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-[var(--color-accent)] transition-colors">
                    All Courses
                  </Link>
                </li>
                <li>
                  <Link href="/student-gallery" className="hover:text-[var(--color-accent)] transition-colors">
                    Student Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[var(--color-accent)] transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-[var(--color-accent)] transition-colors">
                    Frequently Asked Questions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Featured Courses */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h4 className="text-white font-bold text-sm uppercase tracking-wider">
                  Featured Courses
                </h4>
                <div className="w-8 h-0.5 bg-[var(--color-accent)] rounded-full" />
              </div>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
                <li>
                  <Link href="/courses/noorani-qaida" className="hover:text-[var(--color-accent)] transition-colors">
                    Noorani Qaida for Beginners
                  </Link>
                </li>
                <li>
                  <Link href="/courses/quran-reading-with-tajweed" className="hover:text-[var(--color-accent)] transition-colors">
                    Quran Recitation with Tajweed
                  </Link>
                </li>
                <li>
                  <Link href="/courses/quran-memorization-hifz" className="hover:text-[var(--color-accent)] transition-colors">
                    Quran Memorization (Hifz)
                  </Link>
                </li>
                <li>
                  <Link href="/courses/islamic-studies-and-duas" className="hover:text-[var(--color-accent)] transition-colors">
                    Islamic Studies & Essential Duas
                  </Link>
                </li>
                <li>
                  <Link href="/courses/arabic-language" className="hover:text-[var(--color-accent)] transition-colors">
                    Quranic Arabic Language
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Academy Info */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h4 className="text-white font-bold text-sm uppercase tracking-wider">
                  Contact Us
                </h4>
                <div className="w-8 h-0.5 bg-[var(--color-accent)] rounded-full" />
              </div>
              <ul className="flex flex-col gap-4">
                <li>
                  <a
                    href="https://wa.me/923274816872"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 text-gray-400 text-xs sm:text-sm hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center shrink-0 group-hover:border-[#25D366]/40 transition-colors">
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-0.5">
                        WhatsApp
                      </p>
                      <p className="font-semibold text-white">+92 327 4816872</p>
                    </div>
                  </a>
                </li>

                <li>
                  <a
                    href="mailto:info@altanzeelquranacademy.com"
                    className="group flex items-start gap-3 text-gray-400 text-xs sm:text-sm hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center shrink-0 group-hover:border-[var(--color-sky)]/40 transition-colors">
                      <Mail className="w-4 h-4 text-[var(--color-accent)]" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-0.5">
                        Email
                      </p>
                      <p className="font-semibold text-white">info@altanzeelquranacademy.com</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Guarantee */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Al Tanzeel Quran Academy. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-gray-400">
                <ShieldCheck className="w-4 h-4 text-[var(--color-accent)]" />
                <span>Certified Islamic Educators</span>
              </span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>1-on-1 Personalized Classes</span>
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Trial Class Popup Modal */}
      <TrialClassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
