import React from "react";
import type { Metadata } from "next";
import CourseCard from "@/components/CourseCard";
import { coursesData } from "@/data/courses";
import { BookOpen, Sparkles, CheckCircle2 } from "lucide-react";
import { getBreadcrumbSchema, getCourseCatalogSchema, SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Online Quran Courses & Tajweed Classes | Al Tanzeel",
  description:
    "Explore structured 1-on-1 online Quran courses: Noorani Qaida, Tajweed Masterclass, Quran Memorization (Hifz), Quran Gateway, Translation & Women's Quranic course with certified tutors.",
  alternates: {
    canonical: `${SITE_URL}/courses`,
  },
  openGraph: {
    title: "Online Quran Courses & Tajweed Classes | Al Tanzeel Quran Academy",
    description:
      "Structured 1-on-1 online Quran courses with certified male & female teachers. From basic Qaida to advanced Hifz & Tajweed. Free 3-day trial!",
    url: `${SITE_URL}/courses`,
    siteName: "Al Tanzeel Quran Academy",
    images: [
      {
        url: "/courses/quranic-qaida.jpg",
        width: 1200,
        height: 630,
        alt: "Online Quran Courses at Al Tanzeel Quran Academy",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Quran Courses & Tajweed Classes | Al Tanzeel",
    description:
      "Explore 1-on-1 online Quran courses tailored for kids, adults, and sisters with flexible scheduling.",
    images: ["/courses/quranic-qaida.jpg"],
  },
};

export default function CoursesPage() {
  const catalogSchema = getCourseCatalogSchema(coursesData);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Online Quran Courses", url: "/courses" },
  ]);

  return (
    <div className="flex flex-col w-full">
      {/* Schema.org Course Catalog & BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(catalogSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Hero Header */}
      <section className="relative bg-[var(--color-black-soft)] py-20 px-4 border-b border-[var(--color-border)] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-sky)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-sky)]/30 bg-[var(--color-sky)]/10 text-[var(--color-sky-light)] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Structured Quranic Education</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white">
            Our Online <span className="text-[var(--color-accent)]">Quran Courses</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Al Tanzeel Quran Academy offers structured Quranic and Islamic courses tailored to meet the needs of every student. Guided by certified male and female teachers fluent in English.
          </p>
        </div>
      </section>

      {/* Course Listing Grid */}
      <section className="bg-[var(--color-black)] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
              Explore Our Comprehensive <span className="text-[var(--color-accent)]">Curriculum</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              From beginner Arabic reading fundamentals to advanced Hifz and classical Tajweed rules, find the ideal course for your learning goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesData.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Learning Approach Highlights */}
      <section className="bg-[var(--color-black-soft)] py-16 px-4 border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 sm:p-12">
          <h3 className="text-2xl font-black text-white mb-6 text-center">
            Included with Every <span className="text-[var(--color-accent)]">Course</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "1-on-1 Private Live Lessons",
              "Choice of Male or Female Tutor",
              "Flexible Class Rescheduling",
              "Monthly Parent Progress Reports",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-[var(--color-black-soft)] p-4 rounded-xl border border-[var(--color-border)]">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-white text-xs sm:text-sm font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
