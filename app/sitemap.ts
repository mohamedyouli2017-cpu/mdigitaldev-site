import { MetadataRoute } from "next";
import { PORTFOLIO_PROJECTS } from "@/lib/portfolio-data";

const BASE_URL = "https://mdigitaldev-site.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const portfolioRoutes = PORTFOLIO_PROJECTS.map((project) => ({
    url:          `${BASE_URL}/portfolio/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority:     0.7,
  }));

  return [
    {
      url:             BASE_URL,
      lastModified:    new Date(),
      changeFrequency: "weekly",
      priority:        1,
    },
    ...portfolioRoutes,
  ];
}
