import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  Award,
  ArrowRight,
  ShieldCheck,
  Brain,
} from "lucide-react";
import { getBreadcrumbSchema, getFAQPageSchema, SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Quran Memorization Online | 1-on-1 Hifz Quran Classes | Al Tanzeel",
  description:
    "Memorize the Holy Quran online with certified Huffaz at Al Tanzeel Quran Academy. Structured 1-on-1 Hifz program with daily Sabaq, Sabqi, and Manzil revision for kids and adults. Free trial!",
  alternates: {
    canonical: `${SITE_URL}/quran-memorization`,
  },
  openGraph: {
    title: "Quran Memorization Online | Hifz Quran Classes | Al Tanzeel",
    description:
      "Structured 1-on-1 Quran memorization with certified Huffaz. Proven daily revision and retention methods for children, youth, and adults worldwide.",
    url: `${SITE_URL}/quran-memorization`,
    siteName: "Al Tanzeel Quran Academy",
    images: [
      {
        url: "/courses/quran-hifz.jpg",
        width: 1200,
        height: 630,
        alt: "Quran Memorization Online - Al Tanzeel Quran Academy",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quran Memorization Online | 1-on-1 Hifz Classes",
    description:
      "Structured Hifz program with certified Huffaz. Book a free 3-day trial class today!",
    images: ["/courses/quran-hifz.jpg"],
  },
};

const hifzFaqs = [
  {
    id: "hifz-faq-1",
    category: "Classes" as const,
    question: "How does the online Hifz program work?",
    answer:
      "Classes take place daily (4 or 5 days a week) in 1-on-1 sessions. Each class is structured into three parts: reciting the new lesson (Sabaq), revising recent pages (Sabqi), and reciting old memorized Juz (Manzil).",
  },
  {
    id: "hifz-faq-2",
    category: "Classes" as const,
    question: "Can I memorize specific Surahs instead of the whole Quran?",
    answer:
      "Yes! We offer customized memorization tracks including Short Surahs (Juz Amma), Selected Surahs (Surah Yaseen, Al-Mulk, Al-Kahf, Ar-Rahman, Al-Waqi'ah), or the complete 30 Juz.",
  },
  {
    id: "hifz-faq-3",
    category: "Classes" as const,
    question: "What are the prerequisites for joining the Hifz course?",
    answer:
      "Students should be able to read the Holy Quran fluently with basic Tajweed rules. If reading fluency is needed first, we recommend our Quran Gateway bridge module.",
  },
];

export default function QuranMemorizationPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Quran Memorization", url: "/quran-memorization" },
  ]);
  const faqSchema = getFAQPageSchema(hifzFaqs);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[var(--color-black-soft)] py-20 px-4 border-b border-[var(--color-border)]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-sky)]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-bold uppercase tracking-wider">
            <Brain className="w-3.5 h-3.5" />
            <span>Structured Hifz-ul-Quran Program</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            1-on-1 <span className="text-[var(--color-accent)]">Quran Memorization</span> Online (Hifz)
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Commit the Holy Quran to heart with certified male and female Huffaz. Experience our proven 3-pillar daily revision system, personalized pacing, and monthly parent evaluations from home.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <a
              href="https://wa.me/923274816872"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(250,132,30,0.5)] transition-all hover:scale-105"
            >
              <span>Book Free Hifz Trial</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/courses/quran-memorizing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-white font-bold text-xs uppercase tracking-wider transition-all hover:bg-white/5"
            >
              <BookOpen className="w-4 h-4 text-[var(--color-sky)]" />
              <span>View Full Hifz Program</span>
            </Link>
          </div>
        </div>
      </section>

      {/* The 3 Pillars of Hifz */}
      <section className="bg-[var(--color-black)] py-20 px-4 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              Our Proven <span className="text-[var(--color-accent)]">3-Pillar Daily Hifz System</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Memorizing the Quran is 20% learning new verses and 80% disciplined revision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-2xl flex flex-col gap-4 shadow-lg hover:border-[var(--color-accent)]/50 transition-all">
              <span className="text-3xl font-black text-[var(--color-accent)]">01</span>
              <h3 className="text-xl font-bold text-white">Sabaq (New Lesson)</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Daily new verses (half a page to one full page) memorized with exact Tajweed and recited live to the teacher.
              </p>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-2xl flex flex-col gap-4 shadow-lg hover:border-[var(--color-sky)]/50 transition-all">
              <span className="text-3xl font-black text-[var(--color-sky)]">02</span>
              <h3 className="text-xl font-bold text-white">Sabqi (Recent Revision)</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Reciting the most recent 5 to 10 pages memorized over the past two weeks to cement them into long-term memory.
              </p>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-2xl flex flex-col gap-4 shadow-lg hover:border-emerald-500/50 transition-all">
              <span className="text-3xl font-black text-emerald-400">03</span>
              <h3 className="text-xl font-bold text-white">Manzil (Old Revision)</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Continuous rotation of older memorized Juz (half Juz to one full Juz daily) ensuring previously memorized Surahs never fade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-[var(--color-black-soft)] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
              Frequently Asked Questions About <span className="text-[var(--color-accent)]">Quran Memorization</span>
            </h2>
          </div>

          <div className="space-y-4">
            {hifzFaqs.map((faq, idx) => (
              <div key={idx} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 space-y-2 shadow-sm">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-[var(--color-accent)] font-black">Q:</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
