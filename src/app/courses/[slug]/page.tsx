import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { coursesData } from "@/data/courses";
import {
  User,
  Clock,
  CheckCircle2,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import CourseDetailClient from "@/components/CourseDetailClient";
import { getBreadcrumbSchema, getCourseSchema, SITE_URL } from "@/lib/schema";

interface CourseDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return coursesData.map((course) => ({
    slug: course.slug,
  }));
}

const courseSeoMap: Record<string, { title: string; metaDescription: string }> = {
  "quranic-qaidah": {
    title: "Noorani Qaida Online for Kids & Beginners | Al Tanzeel",
    metaDescription:
      "Learn Noorani Qaida online with certified Quran teachers. Master Arabic alphabet phonetics, Makharij articulation & basic Tajweed. Book your free 3-day trial!",
  },
  "quran-gateway": {
    title: "Quran Gateway Course | Online Quran Reading Classes | Al Tanzeel",
    metaDescription:
      "Advance into smooth, fluent Quran reading online. Master rhythmic Tajweed, pausing rules (Waqf) & essential Surahs with 1-on-1 personalized tutoring.",
  },
  "quran-memorizing": {
    title: "Online Quran Memorization (Hifz) Course | Al Tanzeel",
    metaDescription:
      "Enroll in our structured Hifz Quran Online program with certified Huffaz. Daily Sabaq, Sabqi, and Manzil revision system for kids & adults.",
  },
  "translation-holy-quran": {
    title: "Translation of The Holy Quran & Tafseer Online | Al Tanzeel",
    metaDescription:
      "Understand divine meanings, Quranic Arabic vocabulary & contextual Tafseer with qualified Islamic scholars. Deepen your faith & Salah focus.",
  },
  "women-quranic-course": {
    title: "Online Quran Classes for Women & Sisters | Al Tanzeel",
    metaDescription:
      "Private 1-on-1 online Quran classes for women, sisters & girls taught exclusively by certified female scholars (Qarias). Modest & flexible timings.",
  },
  "tajweed-course": {
    title: "Learn Quran with Tajweed Online | Tajweed Masterclass | Al Tanzeel",
    metaDescription:
      "Master 17 Makharij, Sifaat, Ahkam of Noon/Meem Sakinah & classical recitation rules with certified Qaris. Official Tajweed certification available.",
  },
  "beautiful-quran-recitation-course": {
    title: "Beautiful Quran Recitation Course | Melodious Qirat | Al Tanzeel",
    metaDescription:
      "Learn melodious Quran recitation (Husn-e-Sawt), breath control & voice modulation under expert Qaris. Beautify your recitation with heart-touching resonance.",
  },
};

export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  const course = coursesData.find((c) => c.slug === params.slug);

  if (!course) {
    return {
      title: "Course Not Found | Al Tanzeel Quran Academy",
      description: "The requested online Quran course was not found.",
    };
  }

  const seoData = courseSeoMap[course.slug] || {
    title: `${course.title} | Online Quran Course | Al Tanzeel`,
    metaDescription: course.shortDescription,
  };

  const courseUrl = `${SITE_URL}/courses/${course.slug}`;
  const courseImage = course.image.startsWith("http")
    ? course.image
    : `${SITE_URL}${course.image}`;

  return {
    title: seoData.title,
    description: seoData.metaDescription,
    alternates: {
      canonical: courseUrl,
    },
    openGraph: {
      title: `${course.title} | Al Tanzeel Quran Academy`,
      description: seoData.metaDescription,
      url: courseUrl,
      siteName: "Al Tanzeel Quran Academy",
      images: [
        {
          url: courseImage,
          width: 1200,
          height: 630,
          alt: `${course.title} - Online Quran Course at Al Tanzeel Quran Academy`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.title,
      description: seoData.metaDescription,
      images: [courseImage],
    },
  };
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const course = coursesData.find((c) => c.slug === params.slug);

  if (!course) {
    notFound();
  }

  const courseSchema = getCourseSchema(course);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Online Quran Courses", url: "/courses" },
    { name: course.title, url: `/courses/${course.slug}` },
  ]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Schema.org Course & BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

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
            <CourseDetailClient course={course} />
          </div>
        </div>
      </section>
    </div>
  );
}
