import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Globe,
  Award,
  Users,
} from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { coursesData } from "@/data/courses";
import { getBreadcrumbSchema, getCourseCatalogSchema, getFAQPageSchema, SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Online Quran Classes | Learn Quran Online with 1-on-1 Live Lessons",
  description:
    "Join online Quran classes at Al Tanzeel Quran Academy. 1-on-1 live lessons for kids and adults with Tajweed, Noorani Qaida, Hifz, and Translation taught by certified scholars. Free 3-day trial!",
  alternates: {
    canonical: `${SITE_URL}/online-quran-classes`,
  },
  openGraph: {
    title: "Online Quran Classes | Learn Quran Online | Al Tanzeel Quran Academy",
    description:
      "Structured 1-on-1 online Quran classes for children, adults, and sisters worldwide. Learn with Tajweed, Hifz, and Qaida at your own flexible pace.",
    url: `${SITE_URL}/online-quran-classes`,
    siteName: "Al Tanzeel Quran Academy",
    images: [
      {
        url: "/courses/quran-recitation.jpg",
        width: 1200,
        height: 630,
        alt: "Online Quran Classes - Al Tanzeel Quran Academy",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Quran Classes | Learn Quran Online with Certified Scholars",
    description:
      "1-on-1 online Quran classes tailored for all ages. Flexible schedules across USA, UK, Canada, Australia & worldwide.",
    images: ["/courses/quran-recitation.jpg"],
  },
};

const classesFaqs = [
  {
    id: "classes-faq-1",
    category: "Classes" as const,
    question: "How do online Quran classes work?",
    answer:
      "Our online Quran classes are conducted 1-on-1 via video software like Zoom or Skype. The tutor shares digital Quranic pages on screen, listens to the student, and provides real-time pronunciation and Tajweed correction.",
  },
  {
    id: "classes-faq-2",
    category: "Classes" as const,
    question: "What is the duration and frequency of online Quran lessons?",
    answer:
      "Standard lessons are 30 minutes or 45 minutes long. You can choose class plans for 2 days, 3 days, 4 days, or 5 days per week according to your family's routine.",
  },
  {
    id: "classes-faq-3",
    category: "Classes" as const,
    question: "Can beginners or adults with no Arabic background start online Quran classes?",
    answer:
      "Yes! Our beginner Noorani Qaida course starts from the absolute basics, teaching the shape, sound, and articulation of each Arabic letter before progressing to full Quranic words.",
  },
  {
    id: "classes-faq-4",
    category: "Classes" as const,
    question: "Is there a free trial before enrolling?",
    answer:
      "Yes, we offer a 100% free 3-day trial class with no credit card or commitment required so you can experience our teaching quality firsthand.",
  },
];

export default function OnlineQuranClassesPage() {
  const catalogSchema = getCourseCatalogSchema(coursesData);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Online Quran Classes", url: "/online-quran-classes" },
  ]);
  const faqSchema = getFAQPageSchema(classesFaqs);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogSchema) }}
      />
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
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-sky)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-sky)]/30 bg-[var(--color-sky)]/10 text-[var(--color-sky-light)] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Structured 1-on-1 Curriculum</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            Personalized <span className="text-[var(--color-accent)]">Online Quran Classes</span> for All Ages
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Learn Quran online with certified male and female scholars. Whether you are a complete beginner starting Noorani Qaida, looking to polish your Tajweed, or memorizing the Holy Quran, our structured online classes guide you every step of the way.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <a
              href="https://wa.me/923274816872"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(250,132,30,0.5)] transition-all hover:scale-105"
            >
              <span>Book 3-Day Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/online-quran-teacher"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-white font-bold text-xs uppercase tracking-wider transition-all hover:bg-white/5"
            >
              <Users className="w-4 h-4 text-[var(--color-sky)]" />
              <span>Meet Our Teachers</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Overview of Learning Pathways */}
      <section className="bg-[var(--color-black)] py-20 px-4 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              Our 3-Stage <span className="text-[var(--color-accent)]">Quran Learning Pathway</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              A structured step-by-step methodology taking learners from their first Arabic letter to fluent recitation and memorization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-2xl flex flex-col gap-4 shadow-lg hover:border-[var(--color-accent)]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-black text-xl flex items-center justify-center">1</div>
              <h3 className="text-xl font-bold text-white">Beginner Foundation (Noorani Qaida)</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Ideal for children and adult beginners. Learn the 28 Arabic letters, articulation points (Makharij), short vowels (Harakat), and word-joining rules.
              </p>
              <Link href="/courses/quranic-qaidah" className="text-[var(--color-accent)] text-xs font-bold uppercase tracking-wider mt-auto inline-flex items-center gap-1 hover:underline">
                <span>View Qaida Details</span> &rarr;
              </Link>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-2xl flex flex-col gap-4 shadow-lg hover:border-[var(--color-sky)]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-sky)]/10 text-[var(--color-sky)] font-black text-xl flex items-center justify-center">2</div>
              <h3 className="text-xl font-bold text-white">Tajweed & Fluent Recitation</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Master theoretical and practical Tajweed rules including Noon Sakinah, Madd elongation, and Waqf pausing rules to recite with flawless beauty.
              </p>
              <Link href="/courses/tajweed-course" className="text-[var(--color-sky)] text-xs font-bold uppercase tracking-wider mt-auto inline-flex items-center gap-1 hover:underline">
                <span>View Tajweed Details</span> &rarr;
              </Link>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-2xl flex flex-col gap-4 shadow-lg hover:border-emerald-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 font-black text-xl flex items-center justify-center">3</div>
              <h3 className="text-xl font-bold text-white">Quran Memorization (Hifz) & Tafseer</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Commit chosen Surahs or the full Quran to memory with our disciplined 3-pillar revision system, paired with word-for-word translation.
              </p>
              <Link href="/courses/quran-memorizing" className="text-emerald-400 text-xs font-bold uppercase tracking-wider mt-auto inline-flex items-center gap-1 hover:underline">
                <span>View Hifz Details</span> &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All Structured Courses Grid */}
      <section className="bg-[var(--color-black-soft)] py-20 px-4 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              Explore Our Complete <span className="text-[var(--color-sky)]">Course Offerings</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Select any of our specialized 1-on-1 courses tailored for children, sisters, and adults.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesData.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Global Timezone Coverage */}
      <section className="bg-[var(--color-black)] py-16 px-4 border-b border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 flex items-center justify-center shrink-0 text-[var(--color-accent)] shadow-md">
            <Globe className="w-8 h-8" />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-bold text-white">24/7 Global Timezone Availability</h3>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              We operate across all international timezones including Eastern (EST), Central (CST), Pacific (PST), Greenwich (GMT), and Australian Eastern (AEST). Choose class timings before school, after work, or on weekends.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-[var(--color-black-soft)] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
              Frequently Asked Questions About <span className="text-[var(--color-accent)]">Online Quran Classes</span>
            </h2>
            <p className="text-gray-400 text-sm">
              Answers regarding schedules, curriculum, and trial classes.
            </p>
          </div>

          <div className="space-y-4">
            {classesFaqs.map((faq, idx) => (
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
