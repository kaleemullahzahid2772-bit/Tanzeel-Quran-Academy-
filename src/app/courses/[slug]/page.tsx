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

  const courseUrl = `${SITE_URL}/courses/${course.slug}`;
  const courseImage = course.image.startsWith("http")
    ? course.image
    : `${SITE_URL}${course.image}`;

  return {
    title: `${course.title} | Online Quran Course | Al Tanzeel`,
    description: course.shortDescription,
    alternates: {
      canonical: courseUrl,
    },
    openGraph: {
      title: `${course.title} | Al Tanzeel Quran Academy`,
      description: course.shortDescription,
      url: courseUrl,
      siteName: "Al Tanzeel Quran Academy",
      images: [
        {
          url: courseImage,
          width: 1200,
          height: 630,
          alt: `${course.title} - Online Quran Course`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} | Al Tanzeel Quran Academy`,
      description: course.shortDescription,
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
