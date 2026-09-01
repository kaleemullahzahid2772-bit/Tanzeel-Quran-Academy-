"use client";

import React from "react";

const features = [
  "Certified Islamic Educators",
  "1-on-1 Personalized Classes",
  "Free Trial Classes",
  "Special Focus on Slow Learners",
  "Online Quran Memorization",
  "Expert Teachers with English Fluency",
  "Female Teachers for Women",
  "Monthly Progress Assessment",
  "Flexible Timings That Suit You",
  "Diverse Islamic & Quranic Courses",
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[var(--color-black)] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <p className="text-[var(--color-accent)] uppercase tracking-[0.3em] text-xs sm:text-sm font-bold mb-2">
            Our Commitment
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
            Why Choose <span className="text-[var(--color-accent)]">Us?</span>
          </h2>
          <div className="w-16 h-1 bg-[var(--color-accent)] mx-auto rounded-full mb-8" />
          <p className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Al Tanzeel Quran Academy is committed to providing quality Quran education to Muslims around the world. Our mission is to help students develop a strong connection with the Holy Quran and understand the true teachings of Islam in a simple and effective way.
          </p>
        </div>

        {/* Full Image Background Container Box */}
        <div className="relative rounded-2xl overflow-hidden border border-[var(--color-border)] p-8 sm:p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {/* Background Image with Dark Overlay & Blur */}
          <div className="absolute inset-0 z-0">
            <img
              src="/why-choose-us.jpg"
              alt="Qualified Quran teacher guiding student in 1-on-1 online Quran class at Al Tanzeel Quran Academy"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-black)] via-[var(--color-black)]/90 to-[var(--color-black)]/80 md:to-[var(--color-black)]/75" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Description Column */}
            <div className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed">
              <p>
                At Al Tanzeel Quran Academy, we follow a structured and step-by-step learning approach that enables students of all ages to learn the Quran correctly with proper Tajweed. Our goal is not only to teach Quran recitation but also to help students build confidence and consistency in their learning journey.
              </p>
              <p>
                Our online learning system allows students to take Quran classes from the comfort of their homes. With flexible scheduling, you can easily choose class timings that fit your daily routine. Whether you are at home or traveling with your family, our online platform keeps you connected with your Quran lessons without interruption.
              </p>
              <p>
                Our qualified and experienced Quran teachers are dedicated to guiding every student with patience and care. They understand the importance of time and maintain punctuality in every class to ensure a smooth and reliable learning experience.
              </p>
              <p>
                By joining Al Tanzeel Quran Academy, students receive personal attention, structured guidance, and a supportive learning environment that helps them improve their Quran recitation and understanding. With regular practice and expert guidance, students can soon read the Holy Quran with confidence and fluency.
              </p>
            </div>

            {/* Right Checklist Column */}
            <div className="bg-[var(--color-black-soft)]/85 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-xl shadow-2xl">
              <h3 className="text-lg font-black text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)]" />
                Key Academy Features
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] shrink-0 shadow-[0_0_8px_rgba(250,132,30,0.8)]" />
                    <span className="text-white font-medium text-xs sm:text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
