import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { getOrganizationSchema, getWebSiteSchema, SITE_URL } from "@/lib/schema";

export const viewport: Viewport = {
  themeColor: "#05080b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Al Tanzeel Quran Academy | Online Quran Classes & Tajweed",
    template: "%s | Al Tanzeel Quran Academy",
  },
  description:
    "Learn Quran online with certified male and female teachers at Al Tanzeel Quran Academy. 1-on-1 personalized classes with Tajweed, Hifz, Noorani Qaida, and Islamic studies for kids, adults, and sisters worldwide. Book your 3-day free trial class today!",
  keywords: [
    "online Quran academy",
    "online Quran classes",
    "Quran classes online",
    "learn Quran online",
    "online Quran teacher",
    "Quran teacher online",
    "online Quran lessons",
    "Quran learning online",
    "online Quran teaching",
    "Quran classes for kids",
    "Quran classes for adults",
    "online Quran classes for kids",
    "online Quran classes for adults",
    "Quran with Tajweed online",
    "learn Quran with Tajweed",
    "Quran memorization online",
    "Hifz Quran online",
    "online Hifz classes",
    "Quran reading classes online",
    "Noorani Qaida online",
    "Islamic studies online",
    "female Quran teacher",
    "online Quran classes USA",
    "online Quran classes UK",
    "online Quran classes Canada",
    "online Quran classes Australia",
  ],
  authors: [{ name: "Al Tanzeel Quran Academy", url: SITE_URL }],
  creator: "Al Tanzeel Quran Academy",
  publisher: "Al Tanzeel Quran Academy",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Al Tanzeel Quran Academy | Online Quran Classes & Tajweed",
    description:
      "Join thousands of students learning Quran online with certified male & female scholars. 1-on-1 live lessons for kids and adults. Book your 3-day free trial!",
    url: SITE_URL,
    siteName: "Al Tanzeel Quran Academy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Al Tanzeel Quran Academy - Online Quran Classes & Tajweed",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Al Tanzeel Quran Academy | Online Quran Classes & Tajweed",
    description:
      "Learn Quran online with certified male & female teachers. 1-on-1 classes for kids, adults, and sisters. 3-day free trial class available.",
    images: ["/og-image.jpg"],
    creator: "@altanzeelacademy",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  category: "Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = getOrganizationSchema();
  const webSiteSchema = getWebSiteSchema();

  return (
    <html lang="en">
      <head>
        {/* Schema.org EducationalOrganization & WebSite JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orgSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--color-black)] text-white antialiased">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
