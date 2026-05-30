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
    sitemap:    "https://www.mdigitaldev.com/sitemap.xml",
    host:       "https://www.mdigitaldev.com",
  };
}
