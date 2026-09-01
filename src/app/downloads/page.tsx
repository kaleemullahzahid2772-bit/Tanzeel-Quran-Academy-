import React from "react";
import type { Metadata } from "next";
import DownloadCard from "@/components/DownloadCard";
import { downloadsData } from "@/data/downloads";
import { Download } from "lucide-react";
import { getBreadcrumbSchema, SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Free Quran & Islamic PDF Downloads | Al Tanzeel Quran Academy",
  description:
    "Download free Tajweedi Quran PDF (13-line color coded), Word-by-Word English translation, English Noorani Qaida for kids, Six Kalimas, Namaz guide & Daily Sunnah Duas.",
  alternates: {
    canonical: `${SITE_URL}/downloads`,
  },
  openGraph: {
    title: "Free Quran & Islamic PDF Downloads | Al Tanzeel Quran Academy",
    description:
      "Access our curated collection of free Quranic resources, color-coded Tajweed Quran, and daily Islamic learning materials in PDF format at zero cost.",
    url: `${SITE_URL}/downloads`,
    siteName: "Al Tanzeel Quran Academy",
    images: [
      {
        url: "/downloads/colorful-tajweed-quran.jpg",
        width: 1200,
        height: 630,
        alt: "Free Islamic & Quran PDF Downloads at Al Tanzeel Quran Academy",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Quran & Islamic PDF Downloads | Al Tanzeel Quran Academy",
    description:
      "Free color-coded Tajweed Quran PDF, English translation, Noorani Qaida, Namaz guide, and essential Duas.",
    images: ["/downloads/colorful-tajweed-quran.jpg"],
  },
};

export default function DownloadsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Islamic Downloads", url: "/downloads" },
  ]);

  return (
    <div className="flex flex-col w-full">
      {/* Schema.org BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[var(--color-black-soft)] py-20 px-4 border-b border-[var(--color-border)]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-sky)]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-bold uppercase tracking-wider">
            <Download className="w-3.5 h-3.5" />
            <span>Free Learning Resources</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            Free Islamic & Quranic <span className="text-[var(--color-accent)]">PDF Downloads</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Access our curated collection of free Quranic resources, Tajweed color guides, and daily Islamic learning materials — all available to download at zero cost.
          </p>

          <div className="flex items-center gap-8 mt-2">
            <div className="text-center">
              <p className="text-2xl font-black text-[var(--color-accent)]">{downloadsData.length}</p>
              <p className="text-gray-500 text-[10px] uppercase tracking-wider mt-0.5">Collections</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-[var(--color-accent)]">Free</p>
              <p className="text-gray-500 text-[10px] uppercase tracking-wider mt-0.5">Always</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-[var(--color-accent)]">PDF</p>
              <p className="text-gray-500 text-[10px] uppercase tracking-wider mt-0.5">Format</p>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads Grid */}
      <section className="bg-[var(--color-black)] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
              Explore Islamic Books, Guides & <span className="text-[var(--color-accent)]">Quran PDFs</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Click any collection below to read directly online or download high-resolution PDF copies for offline study.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {downloadsData.map((item) => (
              <DownloadCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
