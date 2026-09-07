import React from "react";
import type { Metadata } from "next";
import { BookOpen, Sparkles } from "lucide-react";
import BlogClient from "@/components/BlogClient";
import { blogPosts } from "@/data/blog";
import { getBreadcrumbSchema, SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Quran Learning Guides & Islamic Articles | Al Tanzeel Quran Academy",
  description:
    "Explore comprehensive Islamic educational guides on learning Quran online, Tajweed rules, Makharij articulation, Noorani Qaida, and Quran memorization (Hifz) tips.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Quran Learning Guides & Articles | Al Tanzeel Quran Academy",
    description:
      "Educational resources and guides for students, parents, and adults learning the Holy Quran online with certified scholars.",
    url: `${SITE_URL}/blog`,
    siteName: "Al Tanzeel Quran Academy",
    images: [
      {
        url: "/courses/quran-recitation.jpg",
        width: 1200,
        height: 630,
        alt: "Quran Learning Guides - Al Tanzeel Quran Academy",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quran Learning Guides & Articles | Al Tanzeel",
    description:
      "Step-by-step guides on online Quran learning, Tajweed rules, and Hifz memorization.",
    images: ["/courses/quran-recitation.jpg"],
  },
};

export default function BlogPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog & Learning Guides", url: "/blog" },
  ]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[var(--color-black-soft)] py-20 px-4 border-b border-[var(--color-border)]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-sky)]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Topical Islamic Knowledge & Guidance</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            Quran Learning <span className="text-[var(--color-accent)]">Guides & Articles</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            In-depth educational articles, Tajweed pronunciation guides, parent tips for teaching kids, and practical strategies for online Quran learners worldwide.
          </p>
        </div>
      </section>

      {/* Interactive Blog Component */}
      <section className="bg-[var(--color-black)] flex-1">
        <BlogClient posts={blogPosts} />
      </section>
    </div>
  );
}
