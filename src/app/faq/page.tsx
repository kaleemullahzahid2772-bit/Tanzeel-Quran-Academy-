import React from "react";
import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import FAQClient from "@/components/FAQClient";
import { faqsData } from "@/data/faqs";
import { getBreadcrumbSchema, getFAQPageSchema, SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Online Quran Classes FAQ",
  description:
    "Find answers about online 1-on-1 Quran classes, certified female teachers, trial class booking, fee structure, Western timezone scheduling (USA, UK, Canada, Australia), and software setup.",
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
  openGraph: {
    title: "Frequently Asked Questions | Al Tanzeel Quran Academy",
    description:
      "Instant answers to common questions regarding online Quran classes, female teachers, trial bookings, and course structures.",
    url: `${SITE_URL}/faq`,
    siteName: "Al Tanzeel Quran Academy",
    images: [
      {
        url: "/why-choose-us.jpg",
        width: 1200,
        height: 630,
        alt: "Frequently Asked Questions - Al Tanzeel Quran Academy",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | Al Tanzeel Quran Academy",
    description:
      "Find instant answers to questions regarding online 1-on-1 Quran classes and trial registration.",
    images: ["/why-choose-us.jpg"],
  },
};

export default function FAQPage() {
  const faqSchema = getFAQPageSchema(faqsData);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Frequently Asked Questions", url: "/faq" },
  ]);

  return (
    <div className="flex flex-col w-full">
      {/* Schema.org FAQPage & BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[var(--color-black-soft)] py-20 px-4 border-b border-[var(--color-border)]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-[var(--color-sky)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-sky)]/30 bg-[var(--color-sky)]/10 text-[var(--color-sky-light)] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help Center</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white">
            Frequently Asked <span className="text-[var(--color-accent)]">Questions</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Find instant answers to common questions regarding our online 1-on-1 Quran classes, female teachers, trial class bookings, and technical setup.
          </p>

          <FAQClient />
        </div>
      </section>
    </div>
  );
}
