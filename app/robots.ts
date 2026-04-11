import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow:     "/",
        disallow:  ["/api/"],
      },
    ],
    sitemap:    "https://mdigitaldev-site.vercel.app/sitemap.xml",
    host:       "https://mdigitaldev-site.vercel.app",
  };
}
