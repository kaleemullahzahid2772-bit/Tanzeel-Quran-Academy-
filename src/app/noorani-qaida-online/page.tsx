import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  Award,
  ArrowRight,
  ShieldCheck,
  Languages,
} from "lucide-react";
import { getBreadcrumbSchema, getFAQPageSchema, SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Noorani Qaida Online for Beginners & Kids | Al Tanzeel Quran Academy",
  description:
    "Learn Noorani Qaida online from scratch with certified Quran teachers. Master Arabic alphabet phonetics, Makharij pronunciation, and vowel marks in 1-on-1 live classes. Book a free trial!",
  alternates: {
    canonical: `${SITE_URL}/noorani-qaida-online`,
  },
  openGraph: {
    title: "Noorani Qaida Online for Beginners & Kids | Al Tanzeel",
    description:
      "Master Arabic letters and Quran reading basics with our 1-on-1 Noorani Qaida online course. Gentle, patient guidance for children and adults.",
    url: `${SITE_URL}/noorani-qaida-online`,
    siteName: "Al Tanzeel Quran Academy",
    images: [
      {
        url: "/courses/quranic-qaida.jpg",
        width: 1200,
        height: 630,
        alt: "Noorani Qaida Online - Al Tanzeel Quran Academy",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noorani Qaida Online | Beginner Quran Reading Course",
    description:
      "Learn Arabic alphabets and Quran reading fundamentals with certified tutors. 3-day free trial!",
    images: ["/courses/quranic-qaida.jpg"],
  },
};

const qaidaFaqs = [
  {
    id: "qaida-faq-1",
    category: "Classes" as const,
    question: "What is Noorani Qaida and why is it recommended for beginners?",
    answer:
      "Noorani Qaida is the classical beginner primer for learning to read the Holy Quran. It systematically teaches the 28 Arabic letters, articulation points (Makharij), short vowels (Harakat), Tanween, Sukoon, and Tashdeed through authentic Quranic examples.",
  },
  {
    id: "qaida-faq-2",
    category: "Classes" as const,
    question: "How long does it take for a child or adult to finish Noorani Qaida?",
    answer:
      "With regular 1-on-1 lessons (3 to 5 days a week), adults and older children typically complete the Qaida in 6 to 8 weeks, while young children (ages 4–7) progress comfortably over 3 to 5 months.",
  },
  {
    id: "qaida-faq-3",
    category: "Classes" as const,
    question: "What happens after completing Noorani Qaida?",
    answer:
      "Upon completion, students transition seamlessly into our Quran Gateway or Tajweed Course, reciting complete Surahs directly from the Mushaf with fluency and correct pronunciation.",
  },
];

export default function NooraniQaidaOnlinePage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Noorani Qaida Online", url: "/noorani-qaida-online" },
  ]);
  const faqSchema = getFAQPageSchema(qaidaFaqs);

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
            <Languages className="w-3.5 h-3.5" />
            <span>Beginner Quran Reading Primer</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            Learn <span className="text-[var(--color-accent)]">Noorani Qaida Online</span> for Kids & Beginners
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Master the Arabic alphabet and start reading the Holy Quran from scratch. Our certified male and female teachers guide you step by step through Makharij phonetics, letter joining, and basic Tajweed rules.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <a
              href="https://wa.me/923274816872"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(250,132,30,0.5)] transition-all hover:scale-105"
            >
              <span>Book Free Qaida Trial</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/downloads/english-quranic-qaidah"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-white font-bold text-xs uppercase tracking-wider transition-all hover:bg-white/5"
            >
              <BookOpen className="w-4 h-4 text-[var(--color-sky)]" />
              <span>Download Free Qaida PDF</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Steps in Qaida */}
      <section className="bg-[var(--color-black)] py-20 px-4 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              Step-by-Step <span className="text-[var(--color-accent)]">Noorani Qaida Curriculum</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              A gentle, systematic learning path designed to build reading confidence without frustration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Alphabet & Makharij",
                desc: "Recognizing all 28 Arabic letters in isolated form and mastering correct throat and mouth articulation points.",
              },
              {
                step: "02",
                title: "Compound Letters",
                desc: "Learning how Arabic letters change shapes when connected at the beginning, middle, and end of words.",
              },
              {
                step: "03",
                title: "Vowel Marks (Harakat)",
                desc: "Short vowels (Fatha, Kasra, Damma), double vowels (Tanween), standing vowels, and soft letters (Huroof Leen).",
              },
              {
                step: "04",
                title: "Sukoon & Tashdeed",
                desc: "Practicing connecting sounds with Sukoon and Tashdeed, and applying essential rules of Noon & Meem Sakinah.",
              },
            ].map((s, idx) => (
              <div key={idx} className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-2xl flex flex-col gap-3 shadow-md hover:border-[var(--color-accent)]/50 transition-all">
                <span className="text-3xl font-black text-[var(--color-accent)]">{s.step}</span>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-[var(--color-black-soft)] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
              Frequently Asked Questions About <span className="text-[var(--color-accent)]">Noorani Qaida</span>
            </h2>
          </div>

          <div className="space-y-4">
            {qaidaFaqs.map((faq, idx) => (
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
