import { MetadataRoute } from "next";
import { coursesData } from "@/data/courses";
import { downloadsData } from "@/data/downloads";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.altanzeelquranacademy.com";
  const now = new Date();

  // Core Static Pages
  const staticRoutes: { route: string; priority: number; changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" }[] = [
    { route: "", priority: 1.0, changeFrequency: "weekly" },
    { route: "/about", priority: 0.8, changeFrequency: "monthly" },
    { route: "/courses", priority: 0.9, changeFrequency: "weekly" },
    { route: "/downloads", priority: 0.85, changeFrequency: "weekly" },
    { route: "/student-gallery", priority: 0.7, changeFrequency: "monthly" },
    { route: "/faq", priority: 0.8, changeFrequency: "monthly" },
    { route: "/contact", priority: 0.85, changeFrequency: "monthly" },
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  // Individual Course Detail Pages (7 Courses)
  const coursePages: MetadataRoute.Sitemap = coursesData.map((c) => ({
    url: `${baseUrl}/courses/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Individual Download Detail Pages (6 Resources)
  const downloadPages: MetadataRoute.Sitemap = downloadsData.map((d) => ({
    url: `${baseUrl}/downloads/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticPages, ...coursePages, ...downloadPages];
}
