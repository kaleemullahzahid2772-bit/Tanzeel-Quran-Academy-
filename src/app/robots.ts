import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://www.altanzeelquranacademy.com/sitemap.xml",
    host: "https://www.altanzeelquranacademy.com",
  };
}
