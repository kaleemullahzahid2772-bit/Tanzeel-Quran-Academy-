"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Globe2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  BookOpen,
  UserCheck,
  Star,
  Users,
  Compass,
  CalendarCheck,
  Award,
} from "lucide-react";
import { Teacher } from "@/data/teachers";
import TeacherCard from "@/components/TeacherCard";
import TrialClassModal from "@/components/TrialClassModal";
import FAQAccordion from "@/components/FAQAccordion";
import { FAQItem } from "@/data/faqs";
import { WhatsAppIcon } from "@/components/FloatingContact";

interface OnlineQuranTeacherClientProps {
  teachers: Teacher[];
  faqs: FAQItem[];
}

const countryZones = [
  {
    country: "United States (USA)",
    flag: "🇺🇸",
    zones: "EST, CST, MST, PST",
    highlight: "Flexible after-school & weekend slots tailored for American Muslim families.",
  },
  {
    country: "United Kingdom (UK)",
    flag: "🇬🇧",
    zones: "GMT & BST",
    highlight: "After-school and evening Quran classes aligned with British school terms.",
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    zones: "EST, CST, MST, PST",
    highlight: "Personalized 1-on-1 Quran tutors for kids and adults across Ontario, Alberta, BC & beyond.",
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    zones: "AEST & AWST",
    highlight: "Convenient morning and evening lesson slots for Sydney, Melbourne, Perth & Brisbane.",
  },
];

const pillars = [
  {
    icon: GraduationCap,
    title: "Certified Islamic Scholars & Ijazah Holders",
    description:
      "All tutors are verified graduates of accredited Islamic universities and Dar-ul-Ulooms with authorized Sanad and Ijazah in classical Qira'at and Tajweed.",
  },
  {
    icon: Users,
    title: "1-on-1 Individual Attention",
    description:
      "No crowded group classes. 100% of the teacher's time is dedicated to your recitation, Tajweed Makharij correction, and pace.",
  },
  {
    icon: ShieldCheck,
    title: "Dedicated Female Quran Teachers",
    description:
      "Certified female Huffaza and scholars provide private, comfortable, and modest online lessons for sisters, women, and young girls.",
  },
  {
    icon: Clock,
    title: "24/7 Global Flexible Scheduling",
    description:
      "Book class timings that perfectly match your family's routine across USA, UK, Canada, Australia, and worldwide time zones.",
  },
  {
    icon: HeartHandshake,
    title: "Patient & Engaging Pedagogy for Kids",
    description:
      "Our tutors are specially trained in child psychology, gentle encouragement, interactive digital tools, and motivating positive reinforcement.",
  },
  {
    icon: Compass,
    title: "Multilingual English & Urdu Fluency",
    description:
      "Teachers communicate fluently in English, Urdu, and Arabic, making it effortless for Western-raised children to understand concepts.",
  },
];

const subjects = [
  {
    title: "Noorani Qaida for Beginners",
    slug: "quranic-qaidah",
    desc: "Foundational Arabic alphabet, Makharij articulation points, and vowel joins for children and beginners.",
  },
  {
    title: "Tajweed Rules Masterclass",
    slug: "tajweed-course",
    desc: "Master the 17 Makharij, Noon/Meem Sakinah, Madd elongation, and stop rules with live oral correction.",
  },
  {
    title: "Quran Memorization (Hifz)",
    slug: "quran-memorizing",
    desc: "Structured daily Sabaq, Sabqi, and Manzil system supervised by certified Hafiz mentors.",
  },
  {
    title: "Quranic Translation & Tafseer",
    slug: "translation-holy-quran",
    desc: "Word-for-word translation, grammatical context, and real-life lessons from the Holy Quran.",
  },
  {
    title: "Beautiful Quran Recitation",
    slug: "beautiful-quran-recitation-course",
    desc: "Develop rhythmic fluency, melodious tone, and confident recitation following classical Sunnah styles.",
  },
  {
    title: "Exclusive Women Quran Course",
    slug: "women-quranic-course",
    desc: "Private 1-on-1 classes for sisters and girls taught exclusively by certified female scholars.",
  },
];

const steps = [
  {
    step: "01",
    title: "Book Free 3-Day Trial",
    desc: "Fill our simple 30-second registration form. No credit card or payment commitment required.",
  },
  {
    step: "02",
    title: "Teacher Matching",
    desc: "We assign a certified male or female teacher based on your time zone, language, and learning goals.",
  },
  {
    step: "03",
    title: "Interactive Live Classes",
    desc: "Meet your teacher online 1-on-1, test our teaching methodology, and decide on a regular class schedule.",
  },
];

export default function OnlineQuranTeacherClient({
  teachers,
  faqs,
}: OnlineQuranTeacherClientProps) {
  const [filter, setFilter] = useState<"All" | "Male" | "Female">("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTeachers = teachers.filter((t) => {
    if (filter === "Male") return t.gender === "Male";
    if (filter === "Female") return t.gender === "Female";
    return true;
  });

  return (
    <>
      <div className="flex flex-col w-full">
        {/* 1. Hero Section */}
        <section className="relative bg-[var(--color-black-soft)] py-20 px-4 border-b border-[var(--color-border)] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-sky)]/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center gap-6">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent-light)] text-xs font-bold uppercase tracking-wider shadow-sm">
              <Star className="w-4 h-4 fill-[var(--color-accent)] text-[var(--color-accent)]" />
              <span>Rated 4.9/5 by 1,200+ Muslim Families Worldwide</span>
            </div>

            {/* Main H1 */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight max-w-4xl">
              Best <span className="text-[var(--color-accent)]">Online Quran Teacher</span> & Certified 1-on-1 Tutors
            </h1>

            {/* Subtitle */}
            <p className="text-gray-300 text-sm sm:text-lg max-w-3xl leading-relaxed">
              Learn the Holy Quran from home with certified male and female scholars holding authentic Ijazah. Personalized 1-on-1 Tajweed, Noorani Qaida, and Hifz classes tailored for kids and adults across the <strong className="text-white">USA, UK, Canada, Australia, and worldwide</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(250,132,30,0.5)] transition-all hover:scale-105 active:scale-95"
              >
                <span>Book 3-Day Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/923274816872"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 font-bold text-xs uppercase tracking-wider transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp: +92 327 4816872</span>
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 w-full max-w-4xl">
              <div className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-gray-300 font-semibold shadow-sm">
                <UserCheck className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                <span>1-on-1 Live Lessons</span>
              </div>
              <div className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-gray-300 font-semibold shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Certified Female Tutors</span>
              </div>
              <div className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-gray-300 font-semibold shadow-sm">
                <Clock className="w-4 h-4 text-[var(--color-sky)] shrink-0" />
                <span>24/7 Flexible Timings</span>
              </div>
              <div className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-gray-300 font-semibold shadow-sm">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Sanad & Ijazah Certified</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Global Time Zone & Country Support */}
        <section className="bg-[var(--color-black)] py-16 px-4 border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[var(--color-accent)] font-bold text-xs uppercase tracking-wider">
                Global Availability
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
                Online Quran Teachers for <span className="text-[var(--color-accent)]">USA, UK, Canada & Australia</span>
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
                We accommodate busy family routines, school timetables, and work shifts with round-the-clock availability across all international time zones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {countryZones.map((c) => (
                <div
                  key={c.country}
                  className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col justify-between hover:border-[var(--color-accent)]/40 transition-all shadow-md group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{c.flag}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--color-black-soft)] border border-[var(--color-border)] text-gray-300">
                        {c.zones}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">
                      {c.country}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {c.highlight}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--color-border)] mt-4">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="text-xs font-bold text-[var(--color-accent-light)] hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <span>Check Available Slots</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Meet Our Teachers (Faculty Showcase with Gender Filters) */}
        <section className="bg-[var(--color-black-soft)] py-20 px-4 border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <span className="text-[var(--color-accent)] font-bold text-xs uppercase tracking-wider">
                  Verified Faculty
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
                  Meet Our <span className="text-[var(--color-accent)]">Certified Quran Teachers</span>
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
                  Our instructors are carefully interviewed, background-verified, and evaluated on classical Tajweed rules, patient communication, and English fluency.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 bg-[var(--color-surface)] border border-[var(--color-border)] p-1.5 rounded-2xl shrink-0">
                {(["All", "Male", "Female"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      filter === tab
                        ? "bg-[var(--color-accent)] text-white shadow-md"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab === "All" ? "All Faculty" : tab === "Male" ? "Male Scholars" : "Female Teachers"}
                  </button>
                ))}
              </div>
            </div>

            {/* Teachers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTeachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>

            {/* Female Teacher Highlight Notice */}
            <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/30 via-[var(--color-surface)] to-[var(--color-surface)] border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[11px] font-bold uppercase tracking-wider border border-purple-500/30">
                  Sister & Young Girl Preference
                </span>
                <h3 className="text-xl font-bold text-white">
                  Looking for a Dedicated Female Quran Teacher?
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  We respect the privacy and comfort of our Muslim sisters. Request an accredited female Qaria or Hafiza for one-on-one private lessons in a completely modest, sister-to-sister environment.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="shrink-0 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all hover:scale-105"
              >
                Request Female Teacher
              </button>
            </div>
          </div>
        </section>

        {/* 4. Why Choose Our Online Quran Teachers (6 Pillars) */}
        <section className="bg-[var(--color-black)] py-20 px-4 border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[var(--color-accent)] font-bold text-xs uppercase tracking-wider">
                The Al Tanzeel Advantage
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
                Why Parents & Students Choose Our <span className="text-[var(--color-accent)]">Online Quran Teachers</span>
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
                We combine sacred classical Islamic traditions with modern digital learning tools to provide the most effective 1-on-1 educational experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-7 hover:border-[var(--color-accent)]/50 transition-all shadow-md group relative overflow-hidden"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 text-[var(--color-accent)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[var(--color-accent-light)] transition-colors mb-2.5">
                      {p.title}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Courses Taught by Our Teachers */}
        <section className="bg-[var(--color-black-soft)] py-20 px-4 border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[var(--color-accent)] font-bold text-xs uppercase tracking-wider">
                Structured Curriculum
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
                Courses Taught by Our <span className="text-[var(--color-accent)]">Online Quran Tutors</span>
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
                Whether you are starting from Noorani Qaida or pursuing full Quran Memorization (Hifz), our teachers follow structured step-by-step milestones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((s) => (
                <div
                  key={s.slug}
                  className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col justify-between hover:border-[var(--color-sky)]/50 transition-all shadow-md group"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-sky)]/10 border border-[var(--color-sky)]/30 text-[var(--color-sky)] flex items-center justify-center">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--color-border)] mt-4">
                    <Link
                      href={`/courses/${s.slug}`}
                      className="text-xs font-bold text-[var(--color-accent)] hover:text-white inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Explore Course Syllabus</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. How It Works (3 Steps) */}
        <section className="bg-[var(--color-black)] py-20 px-4 border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[var(--color-accent)] font-bold text-xs uppercase tracking-wider">
                Getting Started
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
                Start Learning in <span className="text-[var(--color-accent)]">3 Easy Steps</span>
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
                Begin your Quran journey in less than 2 minutes without any prior registration fees or credit cards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((st) => (
                <div
                  key={st.step}
                  className="relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 flex flex-col gap-4 shadow-md group hover:border-[var(--color-accent)]/50 transition-all"
                >
                  <div className="text-4xl font-black text-[var(--color-accent)]/40 group-hover:text-[var(--color-accent)] transition-colors">
                    {st.step}
                  </div>
                  <h3 className="text-xl font-bold text-white">{st.title}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(250,132,30,0.5)] transition-all hover:scale-105"
              >
                <span>Book Free Trial Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 7. FAQs Section (Accordion) */}
        <section className="bg-[var(--color-black-soft)] py-20 px-4 border-b border-[var(--color-border)]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[var(--color-accent)] font-bold text-xs uppercase tracking-wider">
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
                Frequently Asked <span className="text-[var(--color-accent)]">Questions</span>
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
                Everything you need to know about hiring an online Quran teacher, trial classes, and scheduling.
              </p>
            </div>

            <FAQAccordion items={faqs} />
          </div>
        </section>

        {/* 8. Bottom CTA Banner */}
        <section className="bg-[var(--color-black)] py-16 px-4">
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-surface-raised)] to-[var(--color-black-soft)] border border-[var(--color-border)] p-8 sm:p-12 text-center flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-accent)]/15 rounded-full blur-3xl pointer-events-none" />

            <span className="px-4 py-1.5 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 text-[var(--color-accent)] text-xs font-bold uppercase tracking-wider">
              Start Your Sacred Journey
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white max-w-2xl">
              Connect with an <span className="text-[var(--color-accent)]">Online Quran Teacher</span> Today
            </h2>

            <p className="text-gray-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Experience the difference of compassionate 1-on-1 Quran tutoring. Claim your 3-day free trial class today with zero payment obligations.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(250,132,30,0.5)] transition-all hover:scale-105 active:scale-95"
              >
                Book 3-Day Free Trial
              </button>
              <a
                href="https://wa.me/923274816872"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Direct WhatsApp Chat
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Trial Class Popup Modal */}
      <TrialClassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
