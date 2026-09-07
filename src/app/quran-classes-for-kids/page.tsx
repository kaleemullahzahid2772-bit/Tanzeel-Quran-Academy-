import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Smile,
  ShieldCheck,
  Award,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Heart,
  Users,
} from "lucide-react";
import { getBreadcrumbSchema, getFAQPageSchema, SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Online Quran Classes for Kids | Fun, 1-on-1 Quran Lessons for Children",
  description:
    "Engaging 1-on-1 online Quran classes for kids aged 4-15 at Al Tanzeel Quran Academy. Certified male and female teachers, Noorani Qaida, gentle Tajweed, and monthly parent reports. Book a 3-day free trial!",
  alternates: {
    canonical: `${SITE_URL}/quran-classes-for-kids`,
  },
  openGraph: {
    title: "Online Quran Classes for Kids | Al Tanzeel Quran Academy",
    description:
      "Patient and certified online Quran teachers for children. 1-on-1 interactive lessons with Noorani Qaida, Tajweed, and daily Duas. Free 3-day trial!",
    url: `${SITE_URL}/quran-classes-for-kids`,
    siteName: "Al Tanzeel Quran Academy",
    images: [
      {
        url: "/courses/quran-gateway.jpg",
        width: 1200,
        height: 630,
        alt: "Online Quran Classes for Kids - Al Tanzeel Quran Academy",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Quran Classes for Kids | 1-on-1 Lessons for Children",
    description:
      "Interactive Quran lessons for kids with certified male and female tutors. 3-day free trial available!",
    images: ["/courses/quran-gateway.jpg"],
  },
};

const kidsFaqs = [
  {
    id: "kids-faq-1",
    category: "Classes" as const,
    question: "What is the minimum age for children to start online Quran classes?",
    answer:
      "Children can begin as young as 4 years old. For very young learners, lessons focus on fun Arabic alphabet recognition, visual letter tracing, and memorizing short supplications (Duas) with patient guidance.",
  },
  {
    id: "kids-faq-2",
    category: "Tutors" as const,
    question: "Can I choose a female Quran teacher for my daughter or young child?",
    answer:
      "Yes, absolutely. We have dedicated certified female scholars (Qarias & Hafizas) who specialize in child pedagogy and provide a warm, nurturing learning environment for young girls and boys.",
  },
  {
    id: "kids-faq-3",
    category: "Classes" as const,
    question: "How do you keep energetic or easily distracted children engaged during online class?",
    answer:
      "Our tutors utilize interactive digital screen-sharing, colorful Qaida pointers, gamified letter challenges, and frequent verbal praise. Lessons are kept to an optimal 30-minute duration to match children's attention spans.",
  },
  {
    id: "kids-faq-4",
    category: "Classes" as const,
    question: "How do parents track their child's progress?",
    answer:
      "Parents receive monthly progress evaluations covering lesson milestones, Tajweed accuracy, attendance, and areas of improvement. Parents are also welcome to sit with their child during lessons.",
  },
];

export default function QuranClassesForKidsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Quran Classes for Kids", url: "/quran-classes-for-kids" },
  ]);
  const faqSchema = getFAQPageSchema(kidsFaqs);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Header Banner */}
      <section className="relative overflow-hidden bg-[var(--color-black-soft)] py-20 px-4 border-b border-[var(--color-border)]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[var(--color-sky)]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-bold uppercase tracking-wider">
            <Smile className="w-3.5 h-3.5" />
            <span>Dedicated Kids Quran Curriculum (Ages 4–15)</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            Engaging & Patient <span className="text-[var(--color-accent)]">Online Quran Classes for Kids</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Nurture your child&apos;s love for Allah&apos;s divine book. Our certified male and female teachers use gentle, step-by-step methods to teach Noorani Qaida, Tajweed, short Surah memorization, and Islamic manners in a fun, safe online environment.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <a
              href="https://wa.me/923274816872"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(250,132,30,0.5)] transition-all hover:scale-105"
            >
              <span>Book 3-Day Free Trial for Kids</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/courses/quranic-qaidah"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-white font-bold text-xs uppercase tracking-wider transition-all hover:bg-white/5"
            >
              <BookOpen className="w-4 h-4 text-[var(--color-sky)]" />
              <span>Explore Noorani Qaida</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Parents Trust Our Kids Program */}
      <section className="bg-[var(--color-black)] py-20 px-4 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-gray-300 text-sm sm:text-base leading-relaxed">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              A Warm, Supportive Approach to <span className="text-[var(--color-accent)]">Children&apos;s Quran Education</span>
            </h2>
            <p>
              We believe that a child&apos;s earliest memories with the Holy Quran should be filled with warmth, encouragement, and positive accomplishment. Strict or harsh teaching methods often lead to anxiety and resistance; our teachers utilize gentle positive reinforcement, celebrating every completed letter and ayah.
            </p>
            <p>
              Whether your child is learning the Arabic alphabet for the first time or memorizing Juz Amma, our 1-on-1 lessons adapt to their individual learning speed, ensuring they never feel pressured or left behind.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                "Patient, Child-Friendly Teachers",
                "Female Tutors for Young Girls",
                "Special Care for Slow Learners",
                "30-Minute Focused Sessions",
                "Monthly Progress Reports",
                "Daily Duas & Islamic Manners",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-white font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Kids Curriculum Highlights Box */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-sky)]/30 rounded-2xl p-8 sm:p-10 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Heart className="w-5 h-5 text-[var(--color-accent)]" />
              <span>What Children Learn in Our Program</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-gray-300">
              <div className="p-4 rounded-xl bg-[var(--color-black-soft)] border border-[var(--color-border)] flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                <div>
                  <h4 className="font-bold text-white">Noorani Qaida & Phonetics</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Alphabet recognition, vowel marks, joining letters, and foundational Tajweed rules through interactive digital exercises.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--color-black-soft)] border border-[var(--color-border)] flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[var(--color-sky)]/20 text-[var(--color-sky)] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                <div>
                  <h4 className="font-bold text-white">Fluent Quran Recitation (Nazra)</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Reading full Surahs with correct stopping rules (Waqf) and natural rhythmic flow.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--color-black-soft)] border border-[var(--color-border)] flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                <div>
                  <h4 className="font-bold text-white">Short Surah Hifz, Duas & Salah</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Memorizing the last 10 Surahs of the Quran, step-by-step prayer (Salah) method, and essential daily Sunnah supplications.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-[var(--color-black-soft)] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
              Frequently Asked Questions About <span className="text-[var(--color-accent)]">Kids Quran Classes</span>
            </h2>
            <p className="text-gray-400 text-sm">
              Answers for parents seeking quality Islamic education for their children.
            </p>
          </div>

          <div className="space-y-4">
            {kidsFaqs.map((faq, idx) => (
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
