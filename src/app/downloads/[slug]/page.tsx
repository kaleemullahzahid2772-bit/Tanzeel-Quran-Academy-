import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { downloadsData } from "@/data/downloads";
import DownloadDetailClient from "@/components/DownloadDetailClient";
import { getBreadcrumbSchema, getDigitalDocumentSchema, SITE_URL } from "@/lib/schema";

interface DownloadDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return downloadsData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: DownloadDetailPageProps): Promise<Metadata> {
  const item = downloadsData.find((d) => d.slug === params.slug);

  if (!item) {
    return {
      title: "Resource Not Found | Al Tanzeel Quran Academy",
      description: "The requested Islamic PDF resource was not found.",
    };
  }

  const pageUrl = `${SITE_URL}/downloads/${item.slug}`;
  const imageUrl = item.image.startsWith("http")
    ? item.image
    : `${SITE_URL}${item.image}`;

  return {
    title: `${item.title} PDF Free Download | Al Tanzeel Academy`,
    description: item.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${item.title} PDF Free Download | Al Tanzeel Quran Academy`,
      description: item.description,
      url: pageUrl,
      siteName: "Al Tanzeel Quran Academy",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${item.title} - Free Islamic PDF Resource`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} PDF Free Download | Al Tanzeel`,
      description: item.description,
      images: [imageUrl],
    },
  };
}

export default function DownloadDetailPage({ params }: DownloadDetailPageProps) {
  const item = downloadsData.find((d) => d.slug === params.slug);

  if (!item) {
    notFound();
  }

  const docSchema = getDigitalDocumentSchema(item);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Islamic Downloads", url: "/downloads" },
    { name: item.title, url: `/downloads/${item.slug}` },
  ]);

  return (
    <>
      {/* Schema.org DigitalDocument & BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(docSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <DownloadDetailClient item={item} />
    </>
  );
}
