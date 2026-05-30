import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cairo } from "next/font/google";
import "./globals.css";
import MagneticCursor      from "@/components/MagneticCursor";
import WhatsAppButton      from "@/components/WhatsAppButton";
import PWAInstallPrompt    from "@/components/PWAInstallPrompt";
import PWAInit             from "@/components/PWAInit";
import ChatWidget          from "@/components/ChatWidget";
import { LanguageProvider } from "@/contexts/LanguageContext";

/* ── Font (next/font — zero layout shift, self-hosted automatically) ── */
const cairo = Cairo({
  subsets:  ["arabic", "latin"],
  weight:   ["400", "600", "700", "800"],
  display:  "swap",
  variable: "--font-cairo",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600", "700", "800"],
  style:    ["normal", "italic"],
  display:  "swap",
  variable: "--font-plus-jakarta",
});

/* ─────────────────────────────────────────────────────────────────────────────
   SITE-WIDE METADATA  (enhanced for SEO)
───────────────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.mdigitaldev.com"),
  title: {
    default:  "MDigitalDev — AI Automation & Custom AI Solutions for Business",
    template: "%s | MDigitalDev",
  },
  icons: {
    icon:     "/icon.svg",
    shortcut: "/icon.svg",
    apple:    "/icon.svg",
  },
  description:
    "I build intelligent AI agents and automated workflows that help businesses save time, capture leads, and scale operations 24/7. Custom AI automation solutions powered by modern tech.",
  keywords: [
    "AI automation",
    "AI agents",
    "workflow automation",
    "business automation",
    "AI chatbot",
    "n8n automation",
    "lead generation automation",
    "custom AI solutions",
    "AI integration",
    "MDigitalDev",
    "Mohamed Youli",
  ],
  authors:  [{ name: "Mohamed Youli", url: "https://www.mdigitaldev.com" }],
  creator:  "MDigitalDev",
  manifest: "/manifest.json",
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         "https://www.mdigitaldev.com",
    siteName:    "MDigitalDev",
    title:       "MDigitalDev — AI Automation & Custom AI Solutions for Business",
    description: "I build intelligent AI agents and automated workflows that help businesses save time, capture leads, and scale operations 24/7. Custom AI automation solutions powered by modern tech.",
    images: [
      {
        url:    "https://www.mdigitaldev.com/og-image.jpg",
        width:  1200,
        height: 630,
        alt:    "MDigitalDev — AI Automation & Custom AI Solutions for Business",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "MDigitalDev — AI Automation & Custom AI Solutions for Business",
    description: "I build intelligent AI agents and automated workflows that help businesses save time, capture leads, and scale operations 24/7. Custom AI automation solutions powered by modern tech.",
    images:      ["https://www.mdigitaldev.com/og-image.jpg"],
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
    canonical: "https://www.mdigitaldev.com",
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
      "@id":   "https://www.mdigitaldev.com/#person",
      "name":  "Mohamed Youli",
      "jobTitle": "Full-Stack Web Developer",
      "url":   "https://www.mdigitaldev.com",
      "sameAs": ["https://wa.me/212669586001"],
      "knowsAbout": [
        "AI Automation",
        "AI Agents",
        "Workflow Automation",
        "Business Process Automation",
        "AI Integration",
        "Custom AI Solutions",
      ],
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id":   "https://www.mdigitaldev.com/#business",
      "name":  "MDigitalDev",
      "description":
        "I build intelligent AI agents and automated workflows that help businesses save time, capture leads, and scale operations 24/7. Custom AI automation solutions powered by modern tech.",
      "url":         "https://www.mdigitaldev.com",
      "telephone":   "+212669586001",
      "founder":     { "@id": "https://www.mdigitaldev.com/#person" },
      "serviceType": "AI Automation & Custom AI Solutions",
      "areaServed":  "Worldwide",
      "priceRange":  "$$",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name":  "AI Automation & Custom AI Solutions",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type":       "Service",
              "name":        "Smart Starter",
              "description": "Professional AI-powered landing page with a 24/7 AI FAQ bot, fast hosting, and SEO.",
              "offers": { "@type": "Offer", "price": "497", "priceCurrency": "USD" },
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type":       "Service",
              "name":        "Business Auto-Pilot",
              "description": "Full AI business system: multi-page website, advanced AI sales agent that qualifies leads 24/7, and workflow automations.",
              "offers": { "@type": "Offer", "price": "1800", "priceCurrency": "USD" },
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type":       "Service",
              "name":        "Enterprise AI Elite",
              "description": "Fully custom AI ecosystem: bespoke AI agents, end-to-end business process automation, and CRM integration.",
              "offers": { "@type": "Offer", "price": "4800", "priceCurrency": "USD" },
            },
          },
        ],
      },
    },
    {
      "@type":  "WebSite",
      "@id":    "https://www.mdigitaldev.com/#website",
      "url":    "https://www.mdigitaldev.com",
      "name":   "MDigitalDev",
      "description":
        "I build intelligent AI agents and automated workflows that help businesses save time, capture leads, and scale operations 24/7. Custom AI automation solutions powered by modern tech.",
      "publisher": { "@id": "https://www.mdigitaldev.com/#person" },
      "potentialAction": {
        "@type":       "SearchAction",
        "target":      "https://www.mdigitaldev.com/?s={search_term_string}",
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
    <html lang="en" className={`scroll-smooth ${plusJakarta.variable} ${cairo.variable}`}>
      <head>
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="81h_3HkfBSEORJMVfmMRzQZGKfqJjucFoUg0FZ8SSfw" />

        {/* Theme colour for mobile browser chrome */}
        <meta name="theme-color" content="#0a0a0a" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`antialiased ${plusJakarta.className}`} suppressHydrationWarning>
        <LanguageProvider>
          {/* Magnetic cursor — renders only on fine-pointer (mouse) devices */}
          <MagneticCursor />
          {children}
          {/* AI chat widget — above WhatsApp button */}
          <ChatWidget />
          {/* Floating WhatsApp button — visible on every page */}
          <WhatsAppButton />
          {/* PWA install banner — mobile only */}
          <PWAInstallPrompt />
          {/* SW registration + beforeinstallprompt capture */}
          <PWAInit />
        </LanguageProvider>
      </body>
    </html>
  );
}
