import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cairo } from "next/font/google";
import "./globals.css";
import MagneticCursor      from "@/components/MagneticCursor";
import WhatsAppButton      from "@/components/WhatsAppButton";
import PWAInstallPrompt    from "@/components/PWAInstallPrompt";
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
  metadataBase: new URL("https://youli.dev"),
  title: {
    default:  "MDigitalDev — Web & PWA Developer for Modern Businesses",
    template: "%s | MDigitalDev",
  },
  icons: {
    icon:     "/icon.svg",
    shortcut: "/icon.svg",
    apple:    "/icon.svg",
  },
  description:
    "I build blazing-fast, PWA-ready websites for restaurants, e-commerce, corporate, healthcare, and real estate. 100/100 PageSpeed. Next.js expert.",
  keywords: [
    "Next.js developer",
    "PWA developer",
    "restaurant website",
    "e-commerce website",
    "corporate website",
    "healthcare website",
    "real estate website",
    "web developer Morocco",
    "MDigitalDev",
    "Mohamed Youli",
    "Progressive Web App",
    "online ordering system",
    "digital menu",
    "local SEO",
    "high-performance website",
  ],
  authors:  [{ name: "Mohamed Youli", url: "https://youli.dev" }],
  creator:  "MDigitalDev",
  manifest: "/manifest.json",
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         "https://youli.dev",
    siteName:    "MDigitalDev",
    title:       "MDigitalDev — Web & PWA Developer for Modern Businesses",
    description: "I build blazing-fast, PWA-ready websites for restaurants, e-commerce, corporate, healthcare, and real estate. 100/100 PageSpeed. Next.js expert.",
    images: [
      {
        url:    "/og-image.jpg",
        width:  1200,
        height: 630,
        alt:    "MDigitalDev — Premium Restaurant Web Design & PWA Solutions",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "MDigitalDev — Web & PWA Developer for Modern Businesses",
    description: "I build blazing-fast, PWA-ready websites for restaurants, e-commerce, corporate, healthcare, and real estate. 100/100 PageSpeed. Next.js expert.",
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
        "E-commerce Development",
        "Corporate Websites",
        "Healthcare Platforms",
        "Real Estate Websites",
        "Web Performance",
        "Local SEO",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id":   "https://youli.dev/#business",
      "name":  "MDigitalDev",
      "description":
        "High-performance, PWA-ready websites for restaurants, e-commerce, corporate, healthcare, and real estate. Specialising in online ordering, booking systems, local SEO, and Core Web Vitals optimisation.",
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
              "name":        "Starter — Landing Page & Digital Presence",
              "description": "Blazing-fast landing page with content, Google Maps, WhatsApp CTA, and local SEO — for any industry.",
              "offers": { "@type": "Offer", "price": "150", "priceCurrency": "USD" },
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type":       "Service",
              "name":        "Professional — Full Business System",
              "description": "Complete business website with ordering/booking system, admin dashboard, WhatsApp automation, and PWA.",
              "offers": { "@type": "Offer", "price": "1500", "priceCurrency": "USD" },
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type":       "Service",
              "name":        "Ultimate — SaaS / Cloud Platform",
              "description": "Enterprise-grade multi-branch or SaaS platform with analytics dashboard, loyalty system, and dedicated support.",
              "offers": { "@type": "Offer", "price": "4800", "priceCurrency": "USD" },
            },
          },
        ],
      },
    },
    {
      "@type":  "WebSite",
      "@id":    "https://youli.dev/#website",
      "url":    "https://youli.dev",
      "name":   "MDigitalDev",
      "description":
        "MDigitalDev — premium Restaurant Web Design, PWA development, and Digital Ordering solutions for restaurants and local businesses.",
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
    <html lang="en" className={`scroll-smooth ${plusJakarta.variable} ${cairo.variable}`}>
      <head>
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="81h_3HkfBSEORJMVfmMRzQZGKfqJjucFoUg0FZ8SSfw" />

        {/* Theme colour for mobile browser chrome */}
        <meta name="theme-color" content="#0a0a0a" />

        {/*
          Early PWA capture — runs synchronously before React hydrates.
          beforeinstallprompt fires very early; if we only listen inside
          a useEffect we always miss it. This script parks the event on
          window.__pwaPromptEvent and re-dispatches a "pwa-ready" custom
          event so the React component can pick it up whenever it mounts.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              /* ── Service worker: register immediately, no load-event delay ── */
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js').catch(function(){});
              }

              /* ── Capture beforeinstallprompt before React hydrates ── */
              window.__pwaPromptEvent = null;
              window.addEventListener('beforeinstallprompt', function(e) {
                e.preventDefault();
                window.__pwaPromptEvent = e;
                window.dispatchEvent(new Event('pwa-ready'));
              });
            `,
          }}
        />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`antialiased ${plusJakarta.className}`}>
        <LanguageProvider>
          {/* Magnetic cursor — renders only on fine-pointer (mouse) devices */}
          <MagneticCursor />
          {children}
          {/* Floating WhatsApp button — visible on every page */}
          <WhatsAppButton />
          {/* PWA install banner — mobile only */}
          <PWAInstallPrompt />
        </LanguageProvider>
      </body>
    </html>
  );
}
