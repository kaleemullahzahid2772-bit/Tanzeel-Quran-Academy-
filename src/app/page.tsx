import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Users,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  GraduationCap,
  Heart,
  Globe,
} from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import StatsSection from "@/components/StatsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import QuranVerseBanner from "@/components/QuranVerseBanner";
import CourseCard from "@/components/CourseCard";
import TeacherCard from "@/components/TeacherCard";
import FAQAccordion from "@/components/FAQAccordion";
import { getCourseCatalogSchema, getFAQPageSchema, SITE_URL } from "@/lib/schema";
import { coursesData } from "@/data/courses";
import { teachersData } from "@/data/teachers";
import { faqsData } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Al Tanzeel Quran Academy | Online Quran Classes & Certified Teachers",
  description:
    "Al Tanzeel Quran Academy is a premier online Quran academy offering 1-on-1 personalized Quran classes with certified male & female scholars. Learn Noorani Qaida, Tajweed, and Hifz from home. Book a 3-day free trial!",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Al Tanzeel Quran Academy | Online Quran Classes & Certified Teachers",
    description:
      "Join students worldwide learning Quran online with certified scholars. 1-on-1 classes for kids, adults, and sisters. Book your 3-day free trial!",
    url: SITE_URL,
    siteName: "Al Tanzeel Quran Academy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Al Tanzeel Quran Academy - Online Quran Classes & Tajweed",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Al Tanzeel Quran Academy | Online Quran Classes & Teachers",
    description:
      "1-on-1 online Quran classes for kids and adults with certified male and female scholars. Book a 3-day free trial today!",
    images: ["/og-image.jpg"],
  },
};

export default function HomePage() {
  const catalogSchema = getCourseCatalogSchema(coursesData);
  const homeFaqs = faqsData.slice(0, 6);
  const faqSchema = getFAQPageSchema(homeFaqs);

  return (
    <div className="flex flex-col w-full">
      {/* Schema.org Course Catalog & FAQPage JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(catalogSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* 1. Hero Section */}
      <HeroSlider />

      {/* 2. Semantic Academy Introduction */}
      <section className="bg-[var(--color-black-soft)] py-16 px-4 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Authentic Online Quran Education</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Welcome to <span className="text-[var(--color-accent)]">Al Tanzeel Quran Academy</span>
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              <strong>Al Tanzeel Quran Academy</strong> is a dedicated <strong>online Quran academy</strong> providing authentic Quran learning, Tajweed, Quran reading, Quran memorization (Hifz), and Islamic studies through interactive 1-on-1 online classes.
            </p>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              We connect Muslim students and families worldwide—across the United States, United Kingdom, Canada, Australia, UAE, and Europe—with certified male and female Quran teachers fluent in English, making high-quality Islamic education accessible from the safety of home.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/online-quran-classes"
                className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-accent)] hover:underline uppercase tracking-wider"
              >
                <span>Learn About Our Online Classes</span> &rarr;
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                href="/online-quran-teacher"
                className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-sky)] hover:underline uppercase tracking-wider"
              >
                <span>Meet Our Certified Quran Teachers</span> &rarr;
              </Link>
            </div>
          </div>

          {/* Feature Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-2xl flex flex-col gap-2 shadow-md">
              <Users className="w-6 h-6 text-[var(--color-accent)]" />
              <h3 className="text-base font-bold text-white">1-on-1 Private Tutoring</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                100% focused attention tailored to each student&apos;s individual learning pace and schedule.
              </p>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-2xl flex flex-col gap-2 shadow-md">
              <Award className="w-6 h-6 text-[var(--color-sky)]" />
              <h3 className="text-base font-bold text-white">Ijazah-Certified Scholars</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Male and female scholars with verified Sanad in Tajweed and Qirat from top Islamic universities.
              </p>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-2xl flex flex-col gap-2 shadow-md">
              <Globe className="w-6 h-6 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Flexible Global Timezones</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Convenient morning, evening, and weekend slots adjusted to USA, UK, Canada & Australia times.
              </p>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-2xl flex flex-col gap-2 shadow-md">
              <ShieldCheck className="w-6 h-6 text-purple-400" />
              <h3 className="text-base font-bold text-white">Safe for Kids & Sisters</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Dedicated female teachers for sisters and young girls, with monthly parent progress reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Structured Online Quran Courses Grid */}
      <section className="bg-[var(--color-black)] py-20 px-4 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              Our Structured <span className="text-[var(--color-accent)]">Online Quran Courses</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Choose from our comprehensive curriculum designed for beginner children, sisters, and adults.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesData.slice(0, 6).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-white font-bold text-xs uppercase tracking-wider transition-all hover:bg-white/5"
            >
              <BookOpen className="w-4 h-4 text-[var(--color-accent)]" />
              <span>View All 7 Quran Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 5. Certified Faculty Showcase */}
      <section className="bg-[var(--color-black-soft)] py-20 px-4 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-sky)]/30 bg-[var(--color-sky)]/10 text-[var(--color-sky-light)] text-xs font-bold uppercase tracking-wider mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>Verified Islamic Faculty</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              Learn with Certified <span className="text-[var(--color-sky)]">Online Quran Teachers</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Our patient male and female teachers are certified Huffaz, Qaris, and scholars fluent in English.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teachersData.slice(0, 3).map((t) => (
              <TeacherCard key={t.id} teacher={t} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/online-quran-teacher"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-sky)] text-white font-bold text-xs uppercase tracking-wider transition-all hover:bg-white/5"
            >
              <Users className="w-4 h-4 text-[var(--color-sky)]" />
              <span>Meet All Our Quran Tutors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. How Online Quran Classes Work */}
      <section className="bg-[var(--color-black)] py-20 px-4 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              How <span className="text-[var(--color-accent)]">Online Quran Learning</span> Works
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Start your online Quran learning journey in 4 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Book Free Trial",
                desc: "Fill out our quick trial request form with your preferred days, times, and course.",
              },
              {
                step: "02",
                title: "Tutor Matching",
                desc: "We assign a certified male or female scholar suited to your schedule and learning level.",
              },
              {
                step: "03",
                title: "Live 1-on-1 Class",
                desc: "Join interactive sessions via Zoom or Skype with live digital Quran screen sharing and Tajweed correction.",
              },
              {
                step: "04",
                title: "Track Progress",
                desc: "Receive monthly evaluation reports and continue advancing toward fluent recitation.",
              },
            ].map((s, idx) => (
              <div
                key={idx}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-2xl flex flex-col gap-3 shadow-md hover:border-[var(--color-accent)]/50 transition-all"
              >
                <span className="text-3xl font-black text-[var(--color-accent)]">{s.step}</span>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Dedicated Learning Pathways (Kids, Sisters, Adults) */}
      <section className="bg-[var(--color-black-soft)] py-20 px-4 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              Tailored Programs for <span className="text-[var(--color-accent)]">Every Learner</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Specialized teaching approaches designed for the unique needs of children, sisters, and adult students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-2xl flex flex-col gap-4 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center font-bold">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">For Kids & Children</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Gentle, engaging Noorani Qaida lessons with interactive digital pointers, short Surah memorization, and monthly parent updates.
              </p>
              <Link
                href="/quran-classes-for-kids"
                className="text-[var(--color-accent)] text-xs font-bold uppercase tracking-wider mt-auto inline-flex items-center gap-1 hover:underline"
              >
                <span>Explore Kids Program</span> &rarr;
              </Link>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-2xl flex flex-col gap-4 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-sky)]/10 text-[var(--color-sky)] flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">For Sisters & Women</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Private 1-on-1 classes with certified female Islamic scholars in complete modesty, covering Tajweed, recitation, and Islamic studies.
              </p>
              <Link
                href="/courses/women-quranic-course"
                className="text-[var(--color-sky)] text-xs font-bold uppercase tracking-wider mt-auto inline-flex items-center gap-1 hover:underline"
              >
                <span>Explore Sisters Program</span> &rarr;
              </Link>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-2xl flex flex-col gap-4 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">For Adults & Beginners</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Dignified, confidential 1-on-1 tutoring for adults and reverts learning Arabic phonetics, fluent reading, and Quran translation.
              </p>
              <Link
                href="/online-quran-classes"
                className="text-emerald-400 text-xs font-bold uppercase tracking-wider mt-auto inline-flex items-center gap-1 hover:underline"
              >
                <span>Explore Adult Classes</span> &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Key Statistics Bar */}
      <StatsSection />

      {/* 9. Quran Calligraphic Verse & CTA Banner */}
      <QuranVerseBanner />

      {/* 10. Frequently Asked Questions Section */}
      <section className="bg-[var(--color-black-soft)] py-20 px-4 border-t border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
              Frequently Asked Questions About <span className="text-[var(--color-accent)]">Online Quran Learning</span>
            </h2>
            <p className="text-gray-400 text-sm">
              Common questions about our online Quran academy, tutors, trial lessons, and class scheduling.
            </p>
          </div>

          <FAQAccordion items={homeFaqs} />

          <div className="text-center mt-10">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-accent)] hover:underline uppercase tracking-wider"
            >
              <span>View All Frequently Asked Questions</span> &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
