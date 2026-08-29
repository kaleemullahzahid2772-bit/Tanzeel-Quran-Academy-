import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

export const metadata: Metadata = {
  title: {
    default: "Al Tanzeel Quran Academy | Online Quran Classes & Tajweed",
    template: "%s | Al Tanzeel Quran Academy",
  },
  description:
    "Online Quran Classes for all ages. Learn Quran online with certified male and female teachers. Flexible 1-on-1 classes for kids, adults, and sisters worldwide.",
  keywords: [
    "Al Tanzeel Quran Academy",
    "Online Quran Academy",
    "Learn Quran Online",
    "Tajweed Course",
    "Quran Memorization Hifz",
    "Female Quran Teacher",
    "Online Quran Classes USA",
  ],
  authors: [{ name: "Al Tanzeel Quran Academy" }],
  openGraph: {
    title: "Al Tanzeel Quran Academy | Online Quran Classes",
    description:
      "Join thousands of students learning Quran online with certified tutors. Free trial available.",
    url: "https://altanzeelquranacademy.org",
    siteName: "Al Tanzeel Quran Academy",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[var(--color-black)] text-white antialiased">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
