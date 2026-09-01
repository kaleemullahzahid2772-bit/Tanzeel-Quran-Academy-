import React from "react";
import type { Metadata } from "next";
import { Camera } from "lucide-react";
import StudentGalleryClient from "@/components/StudentGalleryClient";
import { getBreadcrumbSchema, SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Student Gallery | Learning Moments | Al Tanzeel Academy",
  description:
    "Explore real moments of student learning, online classes, and Quranic achievements at Al Tanzeel Quran Academy. See our global community of young and adult learners.",
  alternates: {
    canonical: `${SITE_URL}/student-gallery`,
  },
  openGraph: {
    title: "Student Gallery | Al Tanzeel Quran Academy",
    description:
      "Real moments of learning, growth, and Quranic education at Al Tanzeel Quran Academy.",
    url: `${SITE_URL}/student-gallery`,
    siteName: "Al Tanzeel Quran Academy",
    images: [
      {
        url: "/gallery/student-1.jpg",
        width: 1200,
        height: 630,
        alt: "Student Gallery - Al Tanzeel Quran Academy",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Gallery | Al Tanzeel Quran Academy",
    description:
      "Explore learning moments and student achievements at Al Tanzeel Quran Academy.",
    images: ["/gallery/student-1.jpg"],
  },
};

export default function StudentGalleryPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Student Gallery", url: "/student-gallery" },
  ]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Schema.org BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Hero Header Banner */}
      <section className="relative bg-[var(--color-black-soft)] py-20 px-4 border-b border-[var(--color-border)] overflow-hidden">
        {/* Background Radial Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[#429cd5]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-bold uppercase tracking-wider">
            <Camera className="w-4 h-4" />
            <span>Authentic Academy Moments</span>
          </span>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
            Student <span className="text-[var(--color-accent)]">Gallery</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Real moments of learning, growth and Quranic education at Al Tanzeel Quran Academy.
          </p>
        </div>
      </section>

      {/* Main Gallery Client Component */}
      <StudentGalleryClient />
    </div>
  );
}
