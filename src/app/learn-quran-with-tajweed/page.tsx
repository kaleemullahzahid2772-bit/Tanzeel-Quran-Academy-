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
  Volume2,
} from "lucide-react";
import { getBreadcrumbSchema, getFAQPageSchema, SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Learn Quran with Tajweed Online | Certified Tajweed Classes & Rules",
  description:
    "Master Quran recitation with authentic Tajweed rules at Al Tanzeel Quran Academy. 1-on-1 online classes covering 17 Makharij articulation points, Noon Sakinah, Madd, and Waqf. Book a free trial!",
  alternates: {
    canonical: `${SITE_URL}/learn-quran-with-tajweed`,
  },
  openGraph: {
    title: "Learn Quran with Tajweed Online | Al Tanzeel Quran Academy",
    description:
      "Master the science of Tajweed with certified Qaris. 1-on-1 personalized recitation correction, oral practice, and Makharij mastery.",
    url: `${SITE_URL}/learn-quran-with-tajweed`,
    siteName: "Al Tanzeel Quran Academy",
    images: [
      {
        url: "/courses/tajweed-course.jpg",
        width: 1200,
        height: 630,
        alt: "Learn Quran with Tajweed Online - Al Tanzeel Quran Academy",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Quran with Tajweed Online | Online Tajweed Classes",
    description:
      "Master 17 Makharij, Noon Sakinah, and classical Tajweed rules with certified Qaris. 3-day free trial!",
    images: ["/courses/tajweed-course.jpg"],
  },
};

const tajweedFaqs = [
  {
    id: "tajweed-faq-1",
    category: "Classes" as const,
    question: "Why is learning Tajweed obligatory for reciting the Holy Quran?",
    answer:
      "Allah commands in the Quran: 'And recite the Qur'an with measured recitation.' (73:4). Tajweed preserves the exact oral tradition of how Prophet Muhammad ﷺ received and recited the revelation, preventing pronunciation errors that alter Arabic meanings.",
  },
  {
    id: "tajweed-faq-2",
    category: "Classes" as const,
    question: "What are the 17 Makharij (Articulation Points)?",
    answer:
      "Makharij are the specific physical locations in the throat, tongue, lips, oral cavity, and nasal cavity where each Arabic letter sound originates. Mastering Makharij ensures clear distinction between similar letters like Qaaf/Kaaf and Haa/Haa.",
  },
  {
    id: "tajweed-faq-3",
    category: "Classes" as const,
    question: "Do I need prior Arabic knowledge to learn Tajweed?",
    answer:
      "Basic ability to recognize Arabic letters is recommended. If you are starting from zero, we begin with our Noorani Qaida module before progressing into formal Tajweed principles.",
  },
];

export default function LearnQuranWithTajweedPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Learn Quran with Tajweed", url: "/learn-quran-with-tajweed" },
  ]);
  const faqSchema = getFAQPageSchema(tajweedFaqs);

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
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[var(--color-sky)]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-bold uppercase tracking-wider">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Classical Tajweed Science & Makharij</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            Learn <span className="text-[var(--color-accent)]">Quran with Tajweed</span> Online
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Recite the Holy Quran with the exact beauty, rhythm, and precision revealed to the Prophet Muhammad ﷺ. Master the 17 articulation points, letter attributes, and recitation rules under certified Qaris.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <a
              href="https://wa.me/923274816872"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(250,132,30,0.5)] transition-all hover:scale-105"
            >
              <span>Book Free Tajweed Trial</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/courses/tajweed-course"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-white font-bold text-xs uppercase tracking-wider transition-all hover:bg-white/5"
            >
              <BookOpen className="w-4 h-4 text-[var(--color-sky)]" />
              <span>View Tajweed Syllabus</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Tajweed Topics Grid */}
      <section className="bg-[var(--color-black)] py-20 px-4 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              Core Pillars of <span className="text-[var(--color-accent)]">Tajweed Mastery</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Our curriculum blends theoretical understanding (Ahkam) with extensive oral practice (Talaqqi).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-2xl flex flex-col gap-4 shadow-lg hover:border-[var(--color-accent)]/50 transition-all">
              <span className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold flex items-center justify-center">1</span>
              <h3 className="text-xl font-bold text-white">Makharij & Sifaat</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Detailed study of the 17 anatomical articulation points and letter characteristics (whispering, softness, echoing Qalqalah, heavy vs light letters).
              </p>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-2xl flex flex-col gap-4 shadow-lg hover:border-[var(--color-sky)]/50 transition-all">
              <span className="w-10 h-10 rounded-xl bg-[var(--color-sky)]/10 text-[var(--color-sky)] font-bold flex items-center justify-center">2</span>
              <h3 className="text-xl font-bold text-white">Noon & Meem Sakinah</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Comprehensive practical application of Izhar, Idgham (with and without Ghunnah), Iqlab, and Ikhfa across Quranic passages.
              </p>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-2xl flex flex-col gap-4 shadow-lg hover:border-emerald-500/50 transition-all">
              <span className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center">3</span>
              <h3 className="text-xl font-bold text-white">Madd & Waqf Rules</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Natural vs derived elongation (2, 4, 5, and 6 counts), stopping and pausing symbols, and breath control techniques.
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
              Frequently Asked Questions About <span className="text-[var(--color-accent)]">Tajweed Classes</span>
            </h2>
          </div>

          <div className="space-y-4">
            {tajweedFaqs.map((faq, idx) => (
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
