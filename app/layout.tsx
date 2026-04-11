import type { Metadata } from "next";
import "./globals.css";
import MagneticCursor from "@/components/MagneticCursor";
import WhatsAppButton from "@/components/WhatsAppButton";

/* ─────────────────────────────────────────────────────────────────────────────
   SITE-WIDE METADATA  (enhanced for SEO)
───────────────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://youli.dev"),
  title: {
    default:  "Mohamed Youli — High-Performance Web Solutions",
    template: "%s | Mohamed Youli",
  },
  description:
    "I build blazing-fast, PWA-ready websites for restaurants and local businesses that turn visitors into loyal customers. Next.js expert specialising in online ordering, digital menus, and local SEO.",
  keywords: [
    "web developer",
    "restaurant website",
    "PWA developer",
    "Next.js developer",
    "online ordering system",
    "digital menu",
    "local SEO",
    "Mohamed Youli",
    "restaurant app developer",
  ],
  authors:  [{ name: "Mohamed Youli", url: "https://youli.dev" }],
  creator:  "Mohamed Youli",
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         "https://youli.dev",
    siteName:    "Mohamed Youli — Web Solutions",
    title:       "Mohamed Youli — High-Performance Web Solutions",
    description: "Blazing-fast, PWA-ready websites for restaurants & local businesses.",
    images: [
      {
        url:    "/og-image.jpg",
        width:  1200,
        height: 630,
        alt:    "Mohamed Youli — Web Developer Portfolio",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Mohamed Youli — High-Performance Web Solutions",
    description: "Blazing-fast, PWA-ready websites for restaurants & local businesses.",
    images:      ["/og-image.jpg"],
  },
  robots: {
    index:             true,
    follow:            true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },
  alternates: {
    canonical: "https://youli.dev",
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   JSON-LD  —  Schema.org structured data
   • Person            — author identity
   • ProfessionalService — the business offering
   • WebSite           — site entity + sitelinks searchbox
───────────────────────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id":   "https://youli.dev/#person",
      "name":  "Mohamed Youli",
      "jobTitle": "Full-Stack Web Developer",
      "url":   "https://youli.dev",
      "sameAs": ["https://wa.me/212669586001"],
      "knowsAbout": [
        "Next.js",
        "React",
        "Progressive Web Apps",
        "Restaurant Websites",
        "Web Performance",
        "Local SEO",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id":   "https://youli.dev/#business",
      "name":  "Mohamed Youli — Web Solutions",
      "description":
        "High-performance, PWA-ready websites for restaurants and local businesses. Specialising in online ordering systems, digital menus, local SEO, and Core Web Vitals optimisation.",
      "url":         "https://youli.dev",
      "telephone":   "+212669586001",
      "founder":     { "@id": "https://youli.dev/#person" },
      "serviceType": "Web Development",
      "areaServed":  "Worldwide",
      "priceRange":  "$$",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name":  "Web Development Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type":       "Service",
              "name":        "Starter — Landing Page",
              "description": "Single-page restaurant landing page with digital menu, WhatsApp CTA, Google Maps, and local SEO.",
              "offers": { "@type": "Offer", "price": "80", "priceCurrency": "USD" },
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type":       "Service",
              "name":        "Professional — Full Website + Ordering",
              "description": "Full Next.js restaurant site with online ordering, PWA, WhatsApp notifications, and analytics dashboard.",
              "offers": { "@type": "Offer", "price": "150", "priceCurrency": "USD" },
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type":       "Service",
              "name":        "Enterprise — SaaS / Multi-branch Platform",
              "description": "Enterprise-grade multi-branch restaurant management platform with BI dashboard, RBAC, and cloud infrastructure.",
              "offers": { "@type": "Offer", "price": "480", "priceCurrency": "USD" },
            },
          },
        ],
      },
    },
    {
      "@type":  "WebSite",
      "@id":    "https://youli.dev/#website",
      "url":    "https://youli.dev",
      "name":   "Mohamed Youli",
      "description":
        "Portfolio of Mohamed Youli — high-performance web solutions for restaurants and local businesses.",
      "publisher": { "@id": "https://youli.dev/#person" },
      "potentialAction": {
        "@type":       "SearchAction",
        "target":      "https://youli.dev/?s={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT LAYOUT
───────────────────────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Font preconnects for fastest possible load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {/* Magnetic cursor — renders only on fine-pointer (mouse) devices */}
        <MagneticCursor />
        {children}
        {/* Floating WhatsApp button — visible on every page */}
        <WhatsAppButton />
      </body>
    </html>
  );
}
