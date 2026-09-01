import { Course } from "@/data/courses";
import { DownloadItem } from "@/data/downloads";
import { FAQItem } from "@/data/faqs";

export const SITE_URL = "https://www.altanzeelquranacademy.com";
export const ACADEMY_NAME = "Al Tanzeel Quran Academy";
export const ACADEMY_LEGAL_NAME = "Al Tanzeel Quran Academy Online";
export const ACADEMY_DESCRIPTION =
  "Premier online Quran academy offering 1-on-1 personalized Quran classes with Tajweed, Quran Memorization (Hifz), Noorani Qaida, and Islamic Studies for children, adults, and sisters worldwide.";
export const ACADEMY_PHONE = "+923274816872";
export const ACADEMY_EMAIL = "info@altanzeelquranacademy.com";
export const ACADEMY_LOGO = `${SITE_URL}/tanzeel-logo.png`;

/**
 * Generates EducationalOrganization Schema JSON-LD
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: ACADEMY_NAME,
    legalName: ACADEMY_LEGAL_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: ACADEMY_LOGO,
      width: "500",
      height: "150",
    },
    image: `${SITE_URL}/hero/slide-1.jpg`,
    description: ACADEMY_DESCRIPTION,
    email: ACADEMY_EMAIL,
    telephone: ACADEMY_PHONE,
    sameAs: [
      "https://wa.me/923274816872",
      "https://facebook.com",
      "https://instagram.com",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: ACADEMY_PHONE,
        contactType: "customer service",
        availableLanguage: ["English", "Arabic", "Urdu"],
        contactOption: "TollFree",
        areaServed: [
          "US",
          "CA",
          "GB",
          "AU",
          "AE",
          "SA",
          "NZ",
          "Worldwide",
        ],
      },
      {
        "@type": "ContactPoint",
        telephone: ACADEMY_PHONE,
        contactType: "student support",
        availableLanguage: ["English", "Arabic", "Urdu"],
      },
    ],
    offers: {
      "@type": "Offer",
      category: "Online Quran Education",
      description: "Free 3-Day Trial Quran Class with Certified Male & Female Tutors",
      price: "0",
      priceCurrency: "USD",
    },
    knowsAbout: [
      "Quran Recitation",
      "Tajweed Rules",
      "Quran Memorization (Hifz)",
      "Noorani Qaida",
      "Islamic Studies",
      "Arabic Language",
      "Quran Translation & Tafseer",
    ],
  };
}

/**
 * Generates WebSite Schema JSON-LD
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: ACADEMY_NAME,
    description: ACADEMY_DESCRIPTION,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en-US",
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generates BreadcrumbList Schema JSON-LD
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generates Course Schema JSON-LD
 */
export function getCourseSchema(course: Course) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${SITE_URL}/courses/${course.slug}#course`,
    name: `${course.title} - Online Quran Course`,
    description: course.fullDescription,
    provider: {
      "@type": "EducationalOrganization",
      name: ACADEMY_NAME,
      sameAs: SITE_URL,
      url: SITE_URL,
      logo: ACADEMY_LOGO,
    },
    educationalLevel: course.level,
    courseCode: course.id,
    teaches: course.topics.join(", "),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: course.classDuration,
      instructor: {
        "@type": "EducationalOrganization",
        name: "Certified Male & Female Quran Scholars",
      },
    },
    offers: {
      "@type": "Offer",
      category: "Free Trial",
      description: "3-Day Free Trial Class with 1-on-1 Tutor",
      price: "0",
      priceCurrency: "USD",
      url: `${SITE_URL}/courses/${course.slug}`,
      availability: "https://schema.org/InStock",
    },
    image: course.image.startsWith("http") ? course.image : `${SITE_URL}${course.image}`,
  };
}

/**
 * Generates Course Catalog ItemList Schema JSON-LD
 */
export function getCourseCatalogSchema(courses: Course[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: course.title,
        description: course.shortDescription,
        url: `${SITE_URL}/courses/${course.slug}`,
        provider: {
          "@type": "EducationalOrganization",
          name: ACADEMY_NAME,
        },
      },
    })),
  };
}

/**
 * Generates FAQPage Schema JSON-LD
 */
export function getFAQPageSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates DigitalDocument / CreativeWork Schema JSON-LD for Downloads
 */
export function getDigitalDocumentSchema(item: DownloadItem) {
  return {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: item.title,
    description: item.description,
    encodingFormat: "application/pdf",
    url: `${SITE_URL}/downloads/${item.slug}`,
    publisher: {
      "@type": "EducationalOrganization",
      name: ACADEMY_NAME,
      url: SITE_URL,
    },
    inLanguage: item.category.includes("English") ? "en" : "ar",
    isAccessibleForFree: true,
    image: item.image.startsWith("http") ? item.image : `${SITE_URL}${item.image}`,
  };
}

/**
 * Generates AboutPage Schema JSON-LD
 */
export function getAboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${ACADEMY_NAME}`,
    description:
      "Learn about Al Tanzeel Quran Academy, our certified male and female scholars, structured 1-on-1 learning pedagogy, and global mission.",
    url: `${SITE_URL}/about`,
    mainEntity: {
      "@type": "EducationalOrganization",
      name: ACADEMY_NAME,
      url: SITE_URL,
      logo: ACADEMY_LOGO,
    },
  };
}

/**
 * Generates ContactPage Schema JSON-LD
 */
export function getContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${ACADEMY_NAME}`,
    description:
      "Get in touch with Al Tanzeel Quran Academy 24/7 for free trial class scheduling, course inquiries, and tutor consultation.",
    url: `${SITE_URL}/contact`,
    mainEntity: {
      "@type": "EducationalOrganization",
      name: ACADEMY_NAME,
      telephone: ACADEMY_PHONE,
      email: ACADEMY_EMAIL,
      url: SITE_URL,
    },
  };
}
