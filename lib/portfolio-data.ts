/* ─────────────────────────────────────────────────────────────────────────────
   PORTFOLIO / LIVE DEMOS DATA
   All projects are "coming-soon" demo placeholders.
   Set status: "live" and liveUrl once each demo is deployed.
───────────────────────────────────────────────────────────────────────────── */

export interface TechSpec {
  category: string;
  items: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface PortfolioProject {
  id:          string;
  title:       string;
  category:    string;
  niche:       string;   // filter category: "Restaurant" | "E-commerce" | "Corporate" | "Healthcare" | "Real Estate"
  img:         string;   // card thumbnail
  heroImg:     string;   // full-bleed detail hero
  tags:        string[];
  client:      string;
  year:        string;
  timeline:    string;
  description: string;
  status?:     "live" | "coming-soon";

  /* ── Enhanced fields ───────────────────────────────────── */
  challenge:   string;
  solution:    string;
  techSpecs:   TechSpec[];
  testimonial?: Testimonial;
  seoKeywords: string[];
  relatedIds:  string[];
  liveUrl?:    string;

  /* ── Original fields ───────────────────────────────────── */
  scope: {
    icon:  string;
    title: string;
    items: string[];
  }[];
  features: {
    icon:  string;
    title: string;
    desc:  string;
  }[];
  results: {
    value:  string;
    suffix: string;
    label:  string;
  }[];
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [

  /* ─── 1 · Restaurant Ordering Demo ─────────────────────────────────────── */
  {
    id:       "restaurant-ordering-demo",
    title:    "Restaurant Ordering Demo",
    category: "Ordering System",
    niche:    "Restaurant",
    img:      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85",
    heroImg:  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=90",
    tags:     ["Next.js", "PWA", "Ordering"],
    client:   "Live Demo",
    year:     "2025",
    timeline: "Coming Soon",
    status:   "coming-soon",

    description:
      "A fully functional restaurant ordering experience — digital menu, live cart, WhatsApp order notifications, and PWA install. Built with Next.js 14 to demonstrate the complete ordering flow your customers would use.",

    challenge:
      "Showing restaurants a complete digital ordering flow they can experience and test before committing to a build.",

    solution:
      "A production-grade demo with real cart logic, dynamic menu, WhatsApp notifications, and an installable PWA — same stack used in real client sites.",

    techSpecs: [
      { category: "Frontend",        items: ["Next.js 14", "TailwindCSS", "Framer Motion"] },
      { category: "PWA",             items: ["Service Worker", "Web App Manifest", "Offline Cache"] },
      { category: "Integrations",    items: ["WhatsApp API", "Google Maps"] },
      { category: "Infrastructure",  items: ["Vercel Edge CDN", "Static Generation"] },
    ],

    seoKeywords: ["restaurant ordering demo", "Next.js restaurant website", "PWA ordering system", "digital menu demo", "online food ordering"],
    relatedIds:  ["clinic-booking-demo", "ecommerce-checkout-demo"],

    scope: [
      { icon: "ShoppingCart", title: "Digital Menu & Cart", items: ["Category-based menu", "Live cart with totals", "Item customization"] },
      { icon: "MessageCircle", title: "WhatsApp Integration", items: ["Instant order notification", "Order summary message", "Customer contact link"] },
      { icon: "Smartphone", title: "PWA Experience", items: ["Home screen install", "Offline menu access", "Fast load on mobile"] },
    ],

    features: [
      { icon: "Globe",        title: "Digital Menu",          desc: "Category-organized, image-rich menu" },
      { icon: "ShoppingCart", title: "Live Cart",             desc: "Real-time cart with item count & totals" },
      { icon: "MessageCircle",title: "WhatsApp Orders",       desc: "Instant notification sent to the owner" },
      { icon: "Smartphone",   title: "PWA Install",           desc: "Add to home screen, works offline" },
      { icon: "Search",       title: "SEO Optimized",         desc: "100/100 PageSpeed, meta tags, sitemap" },
      { icon: "Zap",          title: "< 1s Load Time",        desc: "Static generation + edge CDN" },
    ],

    results: [
      { value: "100", suffix: "/100", label: "PageSpeed Score" },
      { value: "<1",  suffix: "s",    label: "Load Time" },
      { value: "PWA", suffix: "",     label: "Installable" },
      { value: "0",   suffix: "$",    label: "App Store Fee" },
    ],
  },

  /* ─── 2 · E-commerce Checkout Demo ─────────────────────────────────────── */
  {
    id:       "ecommerce-checkout-demo",
    title:    "E-commerce Checkout Demo",
    category: "Online Store",
    niche:    "E-commerce",
    img:      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=85",
    heroImg:  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=90",
    tags:     ["Next.js", "Cart", "Payments"],
    client:   "Live Demo",
    year:     "2025",
    timeline: "Coming Soon",
    status:   "coming-soon",

    description:
      "A complete online store demo — product catalog, add to cart, checkout flow, and order confirmation. Designed to showcase the conversion-optimized UX that turns browsers into buyers.",

    challenge:
      "Demonstrating a full e-commerce flow that looks and feels like a real production store, not a template.",

    solution:
      "A high-fidelity demo with product grid, filters, cart management, and a smooth checkout — ready to be connected to any payment gateway.",

    techSpecs: [
      { category: "Frontend",       items: ["Next.js 14", "TailwindCSS", "Framer Motion"] },
      { category: "Commerce",       items: ["Cart Context", "Product Filters", "Order Summary"] },
      { category: "Payments",       items: ["Stripe-ready", "COD option", "Invoice generation"] },
      { category: "Infrastructure", items: ["Vercel Edge CDN", "Image Optimization"] },
    ],

    seoKeywords: ["e-commerce demo", "Next.js online store", "checkout demo", "shopping cart demo", "online store template"],
    relatedIds:  ["restaurant-ordering-demo", "corporate-landing-demo"],

    scope: [
      { icon: "Package",      title: "Product Catalog",   items: ["Grid & list views", "Category filters", "Search functionality"] },
      { icon: "ShoppingCart", title: "Cart & Checkout",   items: ["Live cart updates", "Promo codes", "Order confirmation"] },
      { icon: "BarChart2",    title: "Admin Dashboard",   items: ["Order management", "Product CRUD", "Sales overview"] },
    ],

    features: [
      { icon: "Package",      title: "Product Catalog",     desc: "Grid view with filters and search" },
      { icon: "ShoppingCart", title: "Cart System",          desc: "Real-time cart with quantity controls" },
      { icon: "TrendingUp",   title: "Checkout Flow",        desc: "Multi-step checkout with validation" },
      { icon: "Award",        title: "Order Confirmation",   desc: "Email + WhatsApp order receipt" },
      { icon: "Smartphone",   title: "Mobile-optimized",     desc: "Thumb-friendly, fast on any device" },
      { icon: "Zap",          title: "Performance",          desc: "100/100 PageSpeed on mobile & desktop" },
    ],

    results: [
      { value: "100", suffix: "/100", label: "PageSpeed Score" },
      { value: "2×",  suffix: "",     label: "Higher Conversion" },
      { value: "<1",  suffix: "s",    label: "Load Time" },
      { value: "0",   suffix: "%",    label: "Cart Abandonment Fix" },
    ],
  },

  /* ─── 3 · Corporate Landing Demo ───────────────────────────────────────── */
  {
    id:       "corporate-landing-demo",
    title:    "Corporate Landing Demo",
    category: "Corporate Website",
    niche:    "Corporate",
    img:      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85",
    heroImg:  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=90",
    tags:     ["Next.js", "SEO", "Lead Gen"],
    client:   "Live Demo",
    year:     "2025",
    timeline: "Coming Soon",
    status:   "coming-soon",

    description:
      "A high-converting corporate landing page — hero section, services showcase, team profiles, case studies, and a lead capture form. SEO-optimized and built to generate qualified leads from day one.",

    challenge:
      "Most corporate sites look outdated, load slowly, and fail to convert visitors into leads.",

    solution:
      "A modern Next.js landing page with structured data, fast load times, and a conversion-first layout that guides visitors toward contact.",

    techSpecs: [
      { category: "Frontend",       items: ["Next.js 14", "TailwindCSS", "Framer Motion"] },
      { category: "SEO",            items: ["JSON-LD Schema", "Open Graph", "Sitemap", "robots.txt"] },
      { category: "Forms",          items: ["Server Actions", "Email notifications", "WhatsApp CTA"] },
      { category: "Infrastructure", items: ["Vercel Edge CDN", "Static + ISR"] },
    ],

    seoKeywords: ["corporate website demo", "business landing page", "Next.js corporate site", "lead generation website", "professional business website"],
    relatedIds:  ["ecommerce-checkout-demo", "real-estate-listings-demo"],

    scope: [
      { icon: "Globe",      title: "Brand Identity",  items: ["Hero + brand story", "Services section", "Team profiles"] },
      { icon: "Search",     title: "SEO Foundation",  items: ["JSON-LD structured data", "Meta optimization", "Sitemap"] },
      { icon: "TrendingUp", title: "Lead Capture",    items: ["Contact form", "WhatsApp CTA", "Calendar booking"] },
    ],

    features: [
      { icon: "Globe",       title: "Hero Section",    desc: "Brand-first impact above the fold" },
      { icon: "Layers",      title: "Services Showcase", desc: "Cards with icons, descriptions, CTAs" },
      { icon: "Users",       title: "Team Profiles",   desc: "Photo, role, LinkedIn — credibility block" },
      { icon: "Search",      title: "Local SEO",       desc: "Google Business Profile + JSON-LD" },
      { icon: "Monitor",     title: "Contact Form",    desc: "Server-side form with email notifications" },
      { icon: "Zap",         title: "Fast Performance", desc: "100/100 PageSpeed for better rankings" },
    ],

    results: [
      { value: "100", suffix: "/100", label: "PageSpeed Score" },
      { value: "+40", suffix: "%",    label: "More Leads" },
      { value: "#1",  suffix: "",     label: "Local SEO Ready" },
      { value: "3×",  suffix: "",     label: "More Trust" },
    ],
  },

  /* ─── 4 · Clinic Booking Demo ───────────────────────────────────────────── */
  {
    id:       "clinic-booking-demo",
    title:    "Clinic Booking Demo",
    category: "Booking System",
    niche:    "Healthcare",
    img:      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=85",
    heroImg:  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=90",
    tags:     ["Next.js", "Booking", "PWA"],
    client:   "Live Demo",
    year:     "2025",
    timeline: "Coming Soon",
    status:   "coming-soon",

    description:
      "A full clinic booking demo — appointment scheduling, doctor profiles, service listings, and booking confirmation via WhatsApp. Designed for healthcare providers who want to automate scheduling and reduce phone calls.",

    challenge:
      "Clinics spend hours on phone bookings and no-shows, losing revenue and wasting staff time.",

    solution:
      "A self-service booking portal where patients pick a doctor, date, and time — confirmed instantly via WhatsApp to both parties.",

    techSpecs: [
      { category: "Frontend",       items: ["Next.js 14", "TailwindCSS", "Framer Motion"] },
      { category: "Booking Engine", items: ["Calendar picker", "Availability slots", "Conflict prevention"] },
      { category: "Notifications",  items: ["WhatsApp confirmation", "Reminder logic", "Cancellation flow"] },
      { category: "Infrastructure", items: ["Vercel Edge CDN", "Serverless API"] },
    ],

    seoKeywords: ["clinic booking demo", "healthcare appointment system", "doctor booking website", "medical appointment Next.js", "clinic website demo"],
    relatedIds:  ["restaurant-ordering-demo", "corporate-landing-demo"],

    scope: [
      { icon: "Calendar",     title: "Booking Calendar",   items: ["Doctor selection", "Time slot picker", "Availability engine"] },
      { icon: "Users",        title: "Doctor Profiles",    items: ["Photo, bio, specialty", "Availability display", "Direct booking"] },
      { icon: "MessageCircle",title: "Confirmation Flow",  items: ["WhatsApp confirmation", "Booking summary", "Cancellation link"] },
    ],

    features: [
      { icon: "Calendar",      title: "Appointment Booking",  desc: "Real-time slot picker per doctor" },
      { icon: "Users",         title: "Doctor Profiles",      desc: "Photo, specialty, and availability" },
      { icon: "Bell",          title: "WhatsApp Confirmation", desc: "Instant confirmation to patient & clinic" },
      { icon: "Smartphone",    title: "Mobile PWA",           desc: "Install on home screen, works offline" },
      { icon: "Globe",         title: "Service Listings",     desc: "Medical services with pricing" },
      { icon: "Zap",           title: "Fast Performance",     desc: "100/100 PageSpeed for SEO" },
    ],

    results: [
      { value: "100", suffix: "/100", label: "PageSpeed Score" },
      { value: "-60", suffix: "%",    label: "Phone Calls" },
      { value: "24",  suffix: "/7",   label: "Bookings Open" },
      { value: "0",   suffix: "$",    label: "No-show Fee" },
    ],
  },

  /* ─── 5 · Real Estate Listings Demo ────────────────────────────────────── */
  {
    id:       "real-estate-listings-demo",
    title:    "Real Estate Listings Demo",
    category: "Property Showcase",
    niche:    "Real Estate",
    img:      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=85",
    heroImg:  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=90",
    tags:     ["Next.js", "Filters", "Maps"],
    client:   "Live Demo",
    year:     "2025",
    timeline: "Coming Soon",
    status:   "coming-soon",

    description:
      "A modern real estate listings demo — property cards, advanced search filters, map view, and lead capture forms. Built for agents and agencies to showcase properties and capture serious buyer interest.",

    challenge:
      "Real estate agents rely on WhatsApp and Instagram to share listings — no professional platform to showcase properties and capture qualified leads.",

    solution:
      "A searchable property portal with filters (price, type, location), an interactive map, and a WhatsApp lead capture on every listing.",

    techSpecs: [
      { category: "Frontend",       items: ["Next.js 14", "TailwindCSS", "Framer Motion"] },
      { category: "Listings",       items: ["Dynamic filters", "Search engine", "Gallery viewer"] },
      { category: "Maps",           items: ["Google Maps API", "Location pins", "Nearby search"] },
      { category: "Infrastructure", items: ["Vercel Edge CDN", "Static Generation + ISR"] },
    ],

    seoKeywords: ["real estate website demo", "property listings Next.js", "real estate agent website", "property search demo", "real estate lead capture"],
    relatedIds:  ["corporate-landing-demo", "ecommerce-checkout-demo"],

    scope: [
      { icon: "Globe",   title: "Property Listings",  items: ["Card grid with photos", "Price & details", "Availability badge"] },
      { icon: "Search",  title: "Search & Filters",   items: ["Price range", "Property type", "Location filter"] },
      { icon: "MapPin",  title: "Map View",            items: ["Google Maps pins", "Cluster view", "Click to detail"] },
    ],

    features: [
      { icon: "Globe",        title: "Property Grid",      desc: "Photo-rich cards with key details" },
      { icon: "Search",       title: "Smart Filters",      desc: "Price, type, beds, location" },
      { icon: "MapPin",       title: "Map View",           desc: "Interactive map with property pins" },
      { icon: "MessageCircle",title: "WhatsApp Lead",      desc: "One-tap contact per listing" },
      { icon: "Camera",       title: "Photo Gallery",      desc: "Full-screen image carousel per property" },
      { icon: "Zap",          title: "Fast Performance",   desc: "100/100 PageSpeed for SEO" },
    ],

    results: [
      { value: "100", suffix: "/100", label: "PageSpeed Score" },
      { value: "+55", suffix: "%",    label: "More Inquiries" },
      { value: "24",  suffix: "/7",   label: "Listings Online" },
      { value: "0",   suffix: "$",    label: "Portal Fee" },
    ],
  },

];
