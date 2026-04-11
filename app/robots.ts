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
    sitemap:    "https://youli.dev/sitemap.xml",
    host:       "https://youli.dev",
  };
}
