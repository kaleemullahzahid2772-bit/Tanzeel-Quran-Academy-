import React from "react";
import type { Metadata } from "next";
import { teachersData } from "@/data/teachers";
import { FAQItem } from "@/data/faqs";
import {
  SITE_URL,
  getBreadcrumbSchema,
  getFAQPageSchema,
  getTeacherCatalogSchema,
  getQuranTeacherPageSchema,
} from "@/lib/schema";
import OnlineQuranTeacherClient from "@/components/OnlineQuranTeacherClient";

export const metadata: Metadata = {
  title: "Best Online Quran Teacher | Certified 1-on-1 Male & Female Tutors",
  description:
    "Learn Quran with certified online Quran teachers at Al Tanzeel Quran Academy. 1-on-1 personalized classes with Tajweed, Hifz, and Noorani Qaida for kids & adults across USA, UK, Canada & Australia. Book your 3-day free trial!",
  alternates: {
    canonical: `${SITE_URL}/online-quran-teacher`,
  },
  openGraph: {
    title: "Best Online Quran Teacher | Certified 1-on-1 Male & Female Tutors",
    description:
      "Find certified male and female online Quran teachers for 1-on-1 interactive lessons. Available 24/7 across USA, UK, Canada, Australia and worldwide. Start with a 3-day free trial!",
    url: `${SITE_URL}/online-quran-teacher`,
    siteName: "Al Tanzeel Quran Academy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Best Online Quran Teacher - Al Tanzeel Quran Academy",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Online Quran Teacher | Certified 1-on-1 Male & Female Tutors",
    description:
      "1-on-1 personalized Quran tutoring with certified male and female scholars. Flexible schedules for USA, UK, Canada & Australia. Free 3-day trial class!",
    images: ["/og-image.jpg"],
  },
};

const teacherFAQs: FAQItem[] = [
  {
    id: "faq-teacher-1",
    category: "Tutors",
    question: "How do I choose the best online Quran teacher for my child?",
    answer:
      "Look for certified scholars who have verified Ijazah in Tajweed, proven experience teaching children, patient communication skills, and native or fluent English/Urdu. At Al Tanzeel Quran Academy, all tutors undergo strict background vetting and trial evaluations before teaching young students.",
  },
  {
    id: "faq-teacher-2",
    category: "Tutors",
    question: "Are certified female Quran teachers available for sisters and daughters?",
    answer:
      "Yes, Al Tanzeel Quran Academy has a dedicated faculty of certified female Islamic scholars, Huffaz, and Qarias. Sisters and young girls can take private 1-on-1 online classes in a completely comfortable, modest, and secure home environment.",
  },
  {
    id: "faq-teacher-3",
    category: "Classes",
    question: "Can I schedule classes according to USA, UK, Canada, or Australia time zones?",
    answer:
      "Absolutely. Our online Quran teachers operate 24/7 across Eastern (EST), Central (CST), Pacific (PST), GMT, and Australian Eastern (AEST) time zones. You choose the exact time slot and days of the week that fit your family's routine.",
  },
  {
    id: "faq-teacher-4",
    category: "Tutors",
    question: "What qualifications do your online Quran teachers hold?",
    answer:
      "Our male and female tutors are graduates of reputable Islamic institutions, hold authentic Sanad and Ijazah in classical Qira'at (Hafs 'an 'Asim and others), and possess extensive experience in teaching Noorani Qaida, Tajweed rules, and Quran memorization (Hifz).",
  },
  {
    id: "faq-teacher-5",
    category: "Classes",
    question: "How do 1-on-1 online Quran classes work?",
    answer:
      "Classes take place live via interactive screen sharing (Zoom, Teams, or Skype). The teacher displays the digital Quran or Noorani Qaida on screen, listens to the student recite, points out exact articulation points (Makharij), and corrects mistakes in real-time.",
  },
  {
    id: "faq-teacher-6",
    category: "General",
    question: "How does the 3-day free trial class work?",
    answer:
      "When you submit our trial booking form, we pair you with an ideal teacher based on your age, level, language, and preferred schedule. You take three complete 30-minute private 1-on-1 trial classes with no payment or credit card required before making any commitment.",
  },
];

export default function OnlineQuranTeacherPage() {
  const pageSchema = getQuranTeacherPageSchema();
  const teacherCatalogSchema = getTeacherCatalogSchema(teachersData);
  const faqSchema = getFAQPageSchema(teacherFAQs);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Online Quran Teacher", url: "/online-quran-teacher" },
  ]);

  return (
    <>
      {/* Schema.org WebPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema),
        }}
      />

      {/* Schema.org ItemList (Teachers) JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(teacherCatalogSchema),
        }}
      />

      {/* Schema.org FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Schema.org BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Interactive Page Body */}
      <OnlineQuranTeacherClient teachers={teachersData} faqs={teacherFAQs} />
    </>
  );
}
