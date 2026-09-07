import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  Award,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  HeartHandshake,
  MessageCircle,
} from "lucide-react";
import TeacherCard from "@/components/TeacherCard";
import { teachersData } from "@/data/teachers";
import { getBreadcrumbSchema, getTeacherListSchema, getFAQPageSchema, SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Online Quran Teacher | Certified Male & Female Quran Tutors | Al Tanzeel",
  description:
    "Find a certified online Quran teacher at Al Tanzeel Quran Academy. 1-on-1 live lessons with Ijazah-certified male & female tutors fluent in English for kids and adults. Book a free 3-day trial class!",
  alternates: {
    canonical: `${SITE_URL}/online-quran-teacher`,
  },
  openGraph: {
    title: "Online Quran Teacher | Certified Male & Female Tutors | Al Tanzeel",
    description:
      "Learn Quran online with qualified Quran teachers. 1-on-1 private classes for children, adults, and sisters worldwide with flexible timings. Free 3-day demo class!",
    url: `${SITE_URL}/online-quran-teacher`,
    siteName: "Al Tanzeel Quran Academy",
    images: [
      {
        url: "/why-choose-us.jpg",
        width: 1200,
        height: 630,
        alt: "Certified Online Quran Teachers at Al Tanzeel Quran Academy",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Quran Teacher | Certified Quran Tutors Online",
    description:
      "1-on-1 online Quran classes with certified male and female scholars. Flexible scheduling across USA, UK, Canada & worldwide.",
    images: ["/why-choose-us.jpg"],
  },
};

const teacherFaqs = [
  {
    id: "teacher-faq-1",
    category: "Tutors" as const,
    question: "What qualifications do your online Quran teachers hold?",
    answer:
      "All our male and female Quran teachers are certified graduates from recognized Islamic universities and hold verified Ijazah (Sanad) in Tajweed and Quran recitation. They undergo rigorous background screening, Tajweed pronunciation testing, and English fluency training before teaching.",
  },
  {
    id: "teacher-faq-2",
    category: "Tutors" as const,
    question: "Are female Quran teachers available for sisters and daughters?",
    answer:
      "Yes. We have dedicated certified female Quran teachers (Qarias & Hafizas) who provide private 1-on-1 lessons exclusively for sisters, young girls, and children in a safe, modest, and comfortable environment.",
  },
  {
    id: "teacher-faq-3",
    category: "Classes" as const,
    question: "How does 1-on-1 online Quran tutoring work?",
    answer:
      "Classes are conducted live over Zoom, Skype, or Microsoft Teams. The teacher shares a digital color-coded Quran Mushaf on screen, listens to the student's recitation, corrects phonetic errors in real time, and provides personalized feedback.",
  },
  {
    id: "teacher-faq-4",
    category: "Classes" as const,
    question: "Can I request a change of Quran tutor if needed?",
    answer:
      "Yes, student satisfaction is our top priority. If you feel a different teacher would better suit your or your child's learning style, our academic coordinator will arrange a replacement tutor immediately with zero hassle.",
  },
];

export default function OnlineQuranTeacherPage() {
  const teacherListSchema = getTeacherListSchema(teachersData);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Online Quran Teacher", url: "/online-quran-teacher" },
  ]);
  const faqSchema = getFAQPageSchema(teacherFaqs);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teacherListSchema) }}
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
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-sky)]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Certified Male & Female Scholars</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            Learn Quran with a Certified <span className="text-[var(--color-accent)]">Online Quran Teacher</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Experience the highest quality 1-on-1 Quran education from home. Our experienced online Quran tutors provide patient, structured guidance in Tajweed, Qaida, and Hifz for children, adults, and sisters worldwide.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <a
              href="https://wa.me/923274816872"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(250,132,30,0.5)] transition-all hover:scale-105"
            >
              <span>Book a Free Trial Class</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-white font-bold text-xs uppercase tracking-wider transition-all hover:bg-white/5"
            >
              <BookOpen className="w-4 h-4 text-[var(--color-sky)]" />
              <span>Explore All Courses</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Learn with a Dedicated Quran Tutor */}
      <section className="bg-[var(--color-black)] py-20 px-4 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-gray-300 text-sm sm:text-base leading-relaxed">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Why 1-on-1 <span className="text-[var(--color-accent)]">Online Quran Teaching</span> is the Most Effective Method
            </h2>
            <p>
              Reciting the Holy Quran accurately requires hearing the correct pronunciation from a qualified master and having your own vocal articulation points corrected in real time. In a traditional crowded classroom, teachers often cannot dedicate sufficient individual time to each student.
            </p>
            <p>
              With our <strong>online Quran teachers</strong>, every single minute of your class is focused exclusively on you or your child. The teacher listens to every vowel, identifies subtle phonetic hesitation, and adjusts the lesson pace to ensure total mastery before moving forward.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                "100% Dedicated 1-on-1 Focus",
                "Female Tutors for Sisters",
                "Ijazah & Sanad Certified",
                "Fluent English Communication",
                "Flexible Western Timezones",
                "Monthly Progress Reports",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-white font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--color-surface)] border border-[var(--color-sky)]/30 rounded-2xl p-8 sm:p-10 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[var(--color-accent)]" />
              <span>Our Rigorous Teacher Selection Process</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-gray-300">
              <div className="p-4 rounded-xl bg-[var(--color-black-soft)] border border-[var(--color-border)] flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                <div>
                  <h4 className="font-bold text-white">Academic & Ijazah Verification</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Verification of classical Sanad credentials, degrees from recognized Islamic universities, and Tajweed mastery.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--color-black-soft)] border border-[var(--color-border)] flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[var(--color-sky)]/20 text-[var(--color-sky)] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                <div>
                  <h4 className="font-bold text-white">Oral Tajweed & Qirat Audition</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Live examination by senior scholars assessing 17 Makharij precision, Sifaat, and rhythmic recitation fluency.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--color-black-soft)] border border-[var(--color-border)] flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                <div>
                  <h4 className="font-bold text-white">English Fluency & Child Pedagogy Training</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Specialized training in positive reinforcement, slow-learner coaching, and virtual classroom engagement.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Showcase */}
      <section className="bg-[var(--color-black-soft)] py-20 px-4 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              Meet Our Certified <span className="text-[var(--color-sky)]">Quran Tutors</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Learn from verified Huffaz, Qaris, and Islamic Scholars dedicated to helping you and your family succeed in your Quranic journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teachersData.map((t) => (
              <TeacherCard key={t.id} teacher={t} />
            ))}
          </div>
        </div>
      </section>

      {/* How Online Quran Classes Work */}
      <section className="bg-[var(--color-black)] py-20 px-4 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              How <span className="text-[var(--color-accent)]">Online Quran Teaching</span> Works
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Starting your online Quran lessons takes less than 2 minutes with our streamlined 4-step process.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Book Free Trial",
                desc: "Fill out the demo request form with your preferred days, times, and course interest.",
              },
              {
                step: "02",
                title: "Tutor Matching",
                desc: "We match you with a certified male or female teacher suited to your language and schedule.",
              },
              {
                step: "03",
                title: "Live 1-on-1 Class",
                desc: "Connect via Zoom or Skype. Experience live interactive digital screen-sharing and recitation correction.",
              },
              {
                step: "04",
                title: "Regular Progress",
                desc: "Receive monthly progress reports and personalized feedback as you advance toward fluent recitation.",
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
              Frequently Asked Questions About <span className="text-[var(--color-accent)]">Quran Teachers</span>
            </h2>
            <p className="text-gray-400 text-sm">
              Clear answers regarding tutor qualifications, scheduling, and trial lessons.
            </p>
          </div>

          <div className="space-y-4">
            {teacherFaqs.map((faq, idx) => (
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
