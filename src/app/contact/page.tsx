import React from "react";
import type { Metadata } from "next";
import { MessageCircle, Mail, Globe } from "lucide-react";
import { getBreadcrumbSchema, getContactPageSchema, SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Us & Book Free Trial Class | Al Tanzeel Quran Academy",
  description:
    "Get in touch with Al Tanzeel Quran Academy. Book your 3-day free trial class or ask questions about our online Quran courses with certified male & female teachers. 24/7 global support.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact Us & Book Free Trial Class | Al Tanzeel Quran Academy",
    description:
      "Connect with Al Tanzeel Quran Academy 24/7 on WhatsApp (+92 327 4816872) or Email (info@altanzeelquranacademy.com) to schedule your free trial class.",
    url: `${SITE_URL}/contact`,
    siteName: "Al Tanzeel Quran Academy",
    images: [
      {
        url: "/why-choose-us.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Al Tanzeel Quran Academy",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us & Book Free Trial Class | Al Tanzeel Quran Academy",
    description:
      "Get in touch with Al Tanzeel Quran Academy for free trial class bookings and online course guidance.",
    images: ["/why-choose-us.jpg"],
  },
};

export default function ContactPage() {
  const contactSchema = getContactPageSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact Us", url: "/contact" },
  ]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Schema.org ContactPage & BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Header Banner */}
      <section className="relative overflow-hidden bg-[var(--color-black-soft)] py-16 sm:py-20 px-4 border-b border-[var(--color-border)]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[var(--color-sky)]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
          <span className="bg-[var(--color-accent)]/10 text-[var(--color-accent-light)] border border-[var(--color-accent)]/30 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
            24/7 Global Support
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
            Get in Touch with <span className="text-[var(--color-accent)]">Our Team</span>
          </h1>

          <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
            We are here to assist you with class schedules, tutor selection, free trial bookings, or course consultations. Reach out anytime!
          </p>
        </div>
      </section>

      {/* Direct Contact Cards Grid */}
      <section className="bg-[var(--color-black)] py-16 px-4 flex-1">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* WhatsApp Card */}
            <a
              href="https://wa.me/923274816872"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[#25D366]/50 rounded-2xl p-8 flex items-start gap-5 transition-all shadow-lg hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-all text-[#25D366] shadow-md">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">
                  WhatsApp Support
                </p>
                <p className="text-white font-black text-xl group-hover:text-[#25D366] transition-colors">
                  +92 327 4816872
                </p>
                <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
                  Instant messaging & trial class confirmation
                </p>
              </div>
            </a>

            {/* Email Card */}
            <a
              href="mailto:info@altanzeelquranacademy.com"
              className="group bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-sky)]/50 rounded-2xl p-8 flex items-start gap-5 transition-all shadow-lg hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-sky)]/10 border border-[var(--color-sky)]/30 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-sky)] group-hover:text-white transition-all text-[var(--color-sky)] shadow-md">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">
                  Official Email
                </p>
                <p className="text-white font-black text-lg sm:text-xl group-hover:text-[var(--color-sky-light)] transition-colors">
                  info@altanzeelquranacademy.com
                </p>
                <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
                  Response time within 2 to 4 hours
                </p>
              </div>
            </a>
          </div>

          {/* Global Coverage Card */}
          <div className="bg-[var(--color-surface-raised)] border border-[var(--color-border)] rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 flex items-center justify-center shrink-0 text-[var(--color-accent)] shadow-md">
              <Globe className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-white font-bold text-base mb-1">Global Student Coverage</h2>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                We serve Muslim families across the United States, Canada, United Kingdom, Australia, New Zealand, and Western Europe across all timezones.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
