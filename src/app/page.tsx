import React from "react";
import HeroSlider from "@/components/HeroSlider";
import StatsSection from "@/components/StatsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import QuranVerseBanner from "@/components/QuranVerseBanner";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <HeroSlider />

      {/* 2. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 3. Key Statistics Bar */}
      <StatsSection />

      {/* 4. Quran Calligraphic Verse & CTA Banner */}
      <QuranVerseBanner />
    </div>
  );
}
