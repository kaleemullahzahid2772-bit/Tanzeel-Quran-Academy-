import { MetadataRoute } from "next";
import { coursesData } from "@/data/courses";
import { downloadsData } from "@/data/downloads";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.alburhanquranacademy.org";

  const staticPages = [
    "",
    "/about",
    "/courses",
    "/downloads",
    "/student-gallery",
    "/faq",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const coursePages = coursesData.map((c) => ({
    url: `${baseUrl}/courses/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const downloadPages = downloadsData.map((d) => ({
    url: `${baseUrl}/downloads/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...coursePages, ...downloadPages];
}
