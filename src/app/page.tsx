import React from "react";
import type { Metadata } from "next";
import HeroSlider from "@/components/HeroSlider";
import StatsSection from "@/components/StatsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import QuranVerseBanner from "@/components/QuranVerseBanner";
import { getCourseCatalogSchema, SITE_URL } from "@/lib/schema";
import { coursesData } from "@/data/courses";

export const metadata: Metadata = {
  title: "Online Quran Classes for Kids & Adults | Al Tanzeel Quran Academy",
  description:
    "Learn Quran online with certified male and female scholars at Al Tanzeel Quran Academy. 1-on-1 personalized classes with Tajweed, Hifz & Noorani Qaida for kids & adults worldwide. Book your 3-day free trial today!",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Online Quran Classes for Kids & Adults | Al Tanzeel Quran Academy",
    description:
      "Join students worldwide learning Quran online with certified male and female scholars. Flexible 1-on-1 classes for kids, adults, and sisters. Book your 3-day free trial!",
    url: SITE_URL,
    siteName: "Al Tanzeel Quran Academy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Al Tanzeel Quran Academy - Online Quran Classes for Kids & Adults",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Quran Classes for Kids & Adults | Al Tanzeel Quran Academy",
    description:
      "Online Quran classes for kids and adults with certified male and female scholars. Book a 3-day free trial class today!",
    images: ["/og-image.jpg"],
  },
};

export default function HomePage() {
  const catalogSchema = getCourseCatalogSchema(coursesData);

  return (
    <div className="flex flex-col w-full">
      {/* Course Catalog ItemList JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(catalogSchema),
        }}
      />

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
