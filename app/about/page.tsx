import React from "react";
import Metadata from "next";
import { BookOpen, ShieldCheck, HeartHandshake, Sparkles, Target, Compass, Award } from "lucide-react";
import TeacherCard from "@/components/TeacherCard";
import { teachersData } from "@/data/teachers";

export const metadata = {
  title: "About Us",
  description: "Learn about Al Tanzeel Quran Academy's mission, leadership, and certified faculty dedicated to global Islamic education.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Authenticity & Tajweed Precision",
    description: "We preserve the sacred oral tradition of Quran recitation according to verified rules passed down through centuries.",
  },
  {
    icon: HeartHandshake,
    title: "Patient & Gentle Pedagogy",
    description: "Every student learns at their own comfortable speed. We provide special care and motivation for slow or young learners.",
  },
  {
    icon: Compass,
    title: "Global Accessibility",
    description: "Our 24/7 online infrastructure ensures families across the USA, UK, Canada, and Australia access top tutors effortlessly.",
  },
  {
    icon: Award,
    title: "Dedicated Female Faculty",
    description: "We champion female Islamic education with certified female scholars for sisters and young girls in modest environments.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Banner Header */}
      <section className="relative bg-[var(--color-black-soft)] py-20 px-4 border-b border-[var(--color-border)] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[var(--color-sky)]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
          <span className="px-4 py-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-bold uppercase tracking-wider">
            Discover Our Legacy
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white">
            About <span className="text-[var(--color-accent)]">Al Tanzeel Quran Academy</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Nurturing a deep, meaningful connection with the Holy Quran for Muslim families worldwide through modern, accessible 1-on-1 online tutoring.
          </p>
        </div>
      </section>

      {/* Story & Introduction */}
      <section className="bg-[var(--color-black)] py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-gray-300 text-sm sm:text-base leading-relaxed">
            <p className="text-lg font-semibold text-white">
              Al Tanzeel Quran Academy is committed to providing quality Quran education to Muslims around the world. Our mission is to help students develop a strong connection with the Holy Quran and understand the true teachings of Islam in a simple and effective way.
            </p>
            <p>
              At Al Tanzeel Quran Academy, we follow a structured and step-by-step learning approach that enables students of all ages to learn the Quran correctly with proper Tajweed. Our goal is not only to teach Quran recitation but also to help students build confidence and consistency in their learning journey.
            </p>
            <p>
              Our online learning system allows students to take Quran classes from the comfort of their homes. With flexible scheduling, you can easily choose class timings that fit your daily routine. Whether you are at home or traveling with your family, our online platform keeps you connected with your Quran lessons without interruption.
            </p>
          </div>

          {/* Styled Feature Highlight Box */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-sky)]/30 rounded-2xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-sky)]/10 rounded-full blur-2xl pointer-events-none" />
            <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-wider">
              Why We Stand Out
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 flex items-center justify-center shrink-0 text-[var(--color-accent)]">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Personalized 1-on-1 Focus</h4>
                  <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                    No crowded group sessions. Every minute of class is dedicated exclusively to one student's individual progress.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-sky)]/10 border border-[var(--color-sky)]/30 flex items-center justify-center shrink-0 text-[var(--color-sky)]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Certified Faculty Credentials</h4>
                  <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                    All tutors undergo rigorous background verification, Tajweed testing, and English fluency training before teaching.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="bg-[var(--color-black-soft)] py-20 px-4 border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 sm:p-10 rounded-2xl flex flex-col gap-4 shadow-lg hover:border-[var(--color-accent)]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 flex items-center justify-center text-[var(--color-accent)]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white">Our Mission</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              To empower every Muslim student—regardless of age, location, or background—with accurate Quran recitation, Tajweed mastery, and Islamic character values that enrich their daily life and spiritual standing.
            </p>
          </div>

          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 sm:p-10 rounded-2xl flex flex-col gap-4 shadow-lg hover:border-[var(--color-sky)]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-sky)]/10 border border-[var(--color-sky)]/30 flex items-center justify-center text-[var(--color-sky)]">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white">Our Vision</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              To become the world's most trusted online Quran Academy, recognized for pedagogical excellence, compassionate female and male faculty, and accessible Islamic learning resources for the global Ummah.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[var(--color-black)] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[var(--color-accent)] uppercase tracking-[0.3em] text-xs font-bold mb-2">
              Foundational Pillars
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              Our Core <span className="text-[var(--color-accent)]">Values</span>
            </h2>
            <div className="w-16 h-1 bg-[var(--color-accent)] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-2xl flex flex-col gap-3 hover:border-[var(--color-accent)]/50 transition-all shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base">{v.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Faculty Showcase (3x2 Grid) */}
      <section className="bg-[var(--color-black-soft)] py-20 px-4 border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              Meet Our Certified <span className="text-[var(--color-sky)]">Faculty</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Our scholars bring years of teaching experience, passion, and English fluency to support your Quranic growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teachersData.map((t) => (
              <TeacherCard key={t.id} teacher={t} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
