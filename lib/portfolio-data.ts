/* ─────────────────────────────────────────────────────────────────────────────
   PORTFOLIO DATA  –  Enhanced Schema v2
   Pillars: SEO keywords · Tech specs · Client results · Related projects
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
  niche:       string;   // filter category e.g. "Restaurant" | "Service"
  img:         string;   // card thumbnail
  heroImg:     string;   // full-bleed detail hero
  tags:        string[];
  client:      string;
  year:        string;
  timeline:    string;
  description: string;

  /* ── Enhanced fields ─────────────────────────────────────── */
  challenge:   string;           // Core problem the client faced
  solution:    string;           // How we solved it (1–2 sentences)
  techSpecs:   TechSpec[];       // Detailed technical breakdown
  testimonial?: Testimonial;     // Optional client quote
  seoKeywords: string[];         // Page-specific meta keywords
  relatedIds:  string[];         // IDs of 2–3 related projects
  liveUrl?:    string;           // Optional live site link

  /* ── Original fields ─────────────────────────────────────── */
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

  /* ─── 1 · Bella Vista ───────────────────────────────────────────────────── */
  {
    id:       "bella-vista",
    title:    "Bella Vista",
    category: "Full System + PWA",
    niche:    "Restaurant",
    img:      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=85",
    heroImg:  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=90",
    tags:     ["Next.js", "PWA", "Ordering"],
    client:   "Bella Vista Group",
    year:     "2024",
    timeline: "3 Days",

    description:
      "A full-stack digital transformation for one of the city's most beloved Italian restaurants. We built a blazing-fast Next.js website with a complete online ordering system, real-time WhatsApp notifications, and an installable PWA that lives on every loyal customer's home screen.",

    challenge:
      "The restaurant relied solely on phone orders and walk-in traffic, missing 60% of evening reservations while delivery-first competitors captured the digital market. They had no online presence and no way to notify customers of daily specials.",

    solution:
      "We designed and built a full Next.js ordering system in 3 days — complete with a PWA for home-screen installs, real-time WhatsApp notifications to the owner, and a table reservation engine with automated SMS confirmations.",

    techSpecs: [
      { category: "Frontend",        items: ["Next.js 14 App Router", "React 18", "Framer Motion", "Tailwind CSS"] },
      { category: "Backend",         items: ["Next.js API Routes", "Supabase PostgreSQL", "Row-Level Security"] },
      { category: "Infrastructure",  items: ["Vercel Edge Network", "Cloudflare CDN", "ISR + SSG hybrid"] },
      { category: "Integrations",    items: ["WhatsApp Business API", "Stripe Payments", "Google Maps API", "Workbox PWA"] },
    ],

    testimonial: {
      quote:  "Our online orders grew by +35% in the first month. The PWA is a game-changer — customers love having it on their home screen like a real app.",
      author: "Marco Bellini",
      role:   "Owner, Bella Vista Group",
    },

    seoKeywords:  ["Italian restaurant website", "restaurant online ordering system", "PWA restaurant app", "Next.js restaurant website", "restaurant WhatsApp notifications"],
    relatedIds:   ["sakura-sushi", "the-green-table"],

    scope: [
      {
        icon:  "Palette",
        title: "UI / UX Design",
        items: ["Brand identity refresh", "Custom design system", "Mobile-first wireframes", "Micro-animation library"],
      },
      {
        icon:  "Code",
        title: "Development",
        items: ["Next.js 14 App Router", "Online ordering system", "Real-time WhatsApp API", "PWA with offline support"],
      },
      {
        icon:  "Search",
        title: "SEO & Growth",
        items: ["Google Business optimisation", "Schema markup", "Core Web Vitals 100/100", "Local citation building"],
      },
    ],
    features: [
      { icon: "ShoppingCart",  title: "Online Ordering",   desc: "Full cart & checkout with payment integration."       },
      { icon: "Smartphone",    title: "PWA App",           desc: "Installable on iOS & Android — no App Store needed."  },
      { icon: "MessageCircle", title: "WhatsApp Alerts",   desc: "Instant order notifications sent to the owner."       },
      { icon: "BarChart2",     title: "Admin Dashboard",   desc: "Real-time order management and sales analytics."      },
      { icon: "Calendar",      title: "Reservations",      desc: "Table booking with automated SMS confirmation."       },
      { icon: "Zap",           title: "100 PageSpeed",     desc: "Sub-800 ms first load on mobile networks."            },
    ],
    results: [
      { value: "+35",  suffix: "%", label: "Online Orders"   },
      { value: "100",  suffix: "",  label: "PageSpeed Score" },
      { value: "+40",  suffix: "%", label: "Monthly Revenue" },
      { value: "4.9",  suffix: "★", label: "Customer Rating" },
    ],
  },

  /* ─── 2 · Saffron Kitchen ───────────────────────────────────────────────── */
  {
    id:       "saffron-kitchen",
    title:    "Saffron Kitchen",
    category: "Landing Page + Menu",
    niche:    "Restaurant",
    img:      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85",
    heroImg:  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=90",
    tags:     ["Next.js", "SEO", "WhatsApp"],
    client:   "Saffron Kitchen LLC",
    year:     "2024",
    timeline: "24 Hours",

    description:
      "A pixel-perfect landing page and digital menu for a high-end Middle Eastern restaurant. The goal: dominate local Google search results, eliminate costly print menus, and convert every web visitor into a walk-in customer with a seamless WhatsApp booking flow.",

    challenge:
      "A thriving kitchen with zero online footprint — customers simply couldn't find it on Google. Paper menus cost $400/month to reprint and became outdated the moment they were printed.",

    solution:
      "Built a pixel-perfect static Next.js site engineered entirely for local SEO dominance, paired with a CMS-powered digital menu and a zero-friction WhatsApp booking button that converts visitors instantly.",

    techSpecs: [
      { category: "Frontend",     items: ["Next.js 14 Static Export", "Tailwind CSS", "CSS Animations"] },
      { category: "SEO",          items: ["JSON-LD Schema Markup", "Google My Business Integration", "Sitemap + robots.txt", "Core Web Vitals optimisation"] },
      { category: "Infrastructure", items: ["Vercel Static Hosting", "Cloudflare CDN", "99.9% uptime"] },
      { category: "Integrations", items: ["WhatsApp Click-to-Chat", "Google Maps Embed", "Google Analytics 4"] },
    ],

    testimonial: {
      quote:  "We now rank #1 on Google for our area. The digital menu pays for itself every single month — no more reprinting costs.",
      author: "Fatima Al-Hassan",
      role:   "General Manager, Saffron Kitchen",
    },

    seoKeywords:  ["Middle Eastern restaurant website", "local restaurant SEO", "digital menu QR code", "restaurant WhatsApp booking", "restaurant landing page"],
    relatedIds:   ["nomad-cafe", "bella-vista"],

    scope: [
      {
        icon:  "Palette",
        title: "Brand & Design",
        items: ["Luxury brand identity", "Custom typography pairing", "Food photography art direction", "Responsive layout system"],
      },
      {
        icon:  "Monitor",
        title: "Frontend Dev",
        items: ["Static Next.js site", "Animated digital menu", "WhatsApp booking CTA", "Google Maps embed"],
      },
      {
        icon:  "TrendingUp",
        title: "Local SEO",
        items: ["Google Business Profile", "Structured data markup", "Review generation strategy", "Keyword-optimised copy"],
      },
    ],
    features: [
      { icon: "Globe",         title: "Digital Menu",      desc: "Always up-to-date menu with photos — no printing costs." },
      { icon: "QrCode",        title: "QR Code Menu",      desc: "Table QR codes that open the menu instantly."            },
      { icon: "MapPin",        title: "Google Maps",       desc: "Embedded maps with directions and opening hours."        },
      { icon: "MessageCircle", title: "WhatsApp Booking",  desc: "One-tap booking button linked directly to WhatsApp."     },
      { icon: "Search",        title: "SEO Optimised",     desc: "Ranks #1 for 'restaurant near me' searches locally."     },
      { icon: "Camera",        title: "Photo Gallery",     desc: "Stunning food photography showcase to entice guests."    },
    ],
    results: [
      { value: "#1",  suffix: "",  label: "Google Local Rank" },
      { value: "+60", suffix: "%", label: "Foot Traffic"      },
      { value: "0.8", suffix: "s", label: "Page Load Time"    },
      { value: "-75", suffix: "%", label: "Print Savings"      },
    ],
  },

  /* ─── 3 · The Green Table ───────────────────────────────────────────────── */
  {
    id:       "the-green-table",
    title:    "The Green Table",
    category: "Full System",
    niche:    "Restaurant",
    img:      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=85",
    heroImg:  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=90",
    tags:     ["Ordering", "Dashboard", "PWA"],
    client:   "Green Table Hospitality",
    year:     "2024",
    timeline: "3 Days",

    description:
      "A complete digital ecosystem for a farm-to-table restaurant focused on sustainability. The platform includes online pre-ordering, an inventory-aware menu that hides sold-out items in real time, a customer loyalty programme, and a comprehensive analytics dashboard for management.",

    challenge:
      "A sustainability-focused restaurant managing complex needs — real-time inventory tracking, online pre-ordering, and a loyalty programme — all on top of a slow, unreliable legacy POS with no analytics capability.",

    solution:
      "Architected a modern Next.js full-stack app with Supabase real-time subscriptions, a live inventory sync that hides sold-out items automatically, Stripe payments, and a loyalty point engine with a management analytics dashboard.",

    techSpecs: [
      { category: "Frontend",       items: ["Next.js 14", "React 18", "Zustand state management", "Tailwind CSS"] },
      { category: "Backend",        items: ["Next.js Server Actions", "Supabase (Postgres + Realtime)", "Stripe Payments API"] },
      { category: "Notifications",  items: ["Web Push API", "Service Worker", "Workbox offline support"] },
      { category: "Infrastructure", items: ["Vercel Edge Functions", "Supabase Cloud", "Cloudflare CDN"] },
    ],

    testimonial: {
      quote:  "The live inventory feature alone saved us hundreds in wasted food. Our no-show rate dropped by 30% within six weeks.",
      author: "Sophie Martin",
      role:   "Co-founder, Green Table Hospitality",
    },

    seoKeywords:  ["farm-to-table restaurant website", "restaurant ordering system", "restaurant loyalty programme", "sustainable restaurant app", "real-time menu system"],
    relatedIds:   ["bella-vista", "ember-oak"],

    scope: [
      {
        icon:  "Layers",
        title: "System Architecture",
        items: ["Full-stack Next.js app", "Real-time inventory sync", "Loyalty point engine", "Role-based access control"],
      },
      {
        icon:  "Code",
        title: "Development",
        items: ["Server actions & API routes", "Stripe payment integration", "Live menu availability", "Push notification service"],
      },
      {
        icon:  "BarChart2",
        title: "Analytics",
        items: ["Revenue dashboard", "Best-seller tracking", "Customer retention metrics", "Daily & weekly reports"],
      },
    ],
    features: [
      { icon: "ShoppingCart", title: "Pre-Ordering",       desc: "Customers order ahead — kitchen is always ready."       },
      { icon: "Package",      title: "Live Inventory",     desc: "Menu hides sold-out items automatically in real time."  },
      { icon: "Award",        title: "Loyalty Programme",  desc: "Points for every order, redeemable as discounts."       },
      { icon: "Bell",         title: "Push Notifications", desc: "Order-ready alerts and daily specials notifications."   },
      { icon: "BarChart2",    title: "Analytics Dashboard",desc: "Full sales, traffic, and retention metrics."            },
      { icon: "Smartphone",   title: "PWA",                desc: "Add to home screen — works offline for the menu."       },
    ],
    results: [
      { value: "+35",  suffix: "%", label: "Online Orders"     },
      { value: "98",   suffix: "",  label: "PageSpeed Score"  },
      { value: "-30",  suffix: "%", label: "No-shows"         },
      { value: "+55",  suffix: "%", label: "Repeat Customers" },
    ],
  },

  /* ─── 4 · Nomad Café ────────────────────────────────────────────────────── */
  {
    id:       "nomad-cafe",
    title:    "Nomad Café",
    category: "Digital Menu",
    niche:    "Restaurant",
    img:      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=85",
    heroImg:  "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1600&q=90",
    tags:     ["Menu", "QR Code", "Mobile"],
    client:   "Nomad Café SAS",
    year:     "2023",
    timeline: "24 Hours",

    description:
      "A sleek, ultra-fast digital menu for a trendy specialty coffee shop. The brief was to eliminate paper menus entirely, support multi-language visitors, and make it trivially easy for the owner to update prices and items without touching any code — ever.",

    challenge:
      "A multi-lingual specialty coffee shop with high printing costs, a tourist clientele speaking French, English, and Arabic, and an owner who needed to update prices daily — with zero technical knowledge.",

    solution:
      "Built a CMS-powered digital menu with per-table QR codes, full FR/EN/AR support (including RTL), real-time owner updates through a simple Sanity Studio panel, and scan analytics to track the most-viewed items.",

    techSpecs: [
      { category: "Frontend",    items: ["Next.js 14 (ISR)", "Tailwind CSS", "Framer Motion"] },
      { category: "CMS",         items: ["Sanity.io headless CMS", "GROQ queries", "Real-time content preview"] },
      { category: "i18n",        items: ["next-intl library", "FR / EN / AR languages", "RTL layout support"] },
      { category: "QR & Analytics", items: ["node-qrcode generation", "Umami Analytics", "Per-table scan tracking"] },
    ],

    testimonial: {
      quote:  "I update the menu myself in under 5 seconds. My customers love it — and the Arabic support for our tourist guests is incredible.",
      author: "Karim Berrada",
      role:   "Owner, Nomad Café",
    },

    seoKeywords:  ["digital menu coffee shop", "QR code menu restaurant", "multilingual restaurant menu", "coffee shop website", "contactless menu"],
    relatedIds:   ["saffron-kitchen", "sakura-sushi"],

    scope: [
      {
        icon:  "Palette",
        title: "Brand Design",
        items: ["Minimalist coffee aesthetic", "Custom typography", "Icon & illustration set", "Print-ready QR assets"],
      },
      {
        icon:  "Monitor",
        title: "Menu Platform",
        items: ["CMS-powered menu items", "Owner self-edit panel", "Multi-language support (FR/EN/AR)", "Instant publish changes"],
      },
      {
        icon:  "QrCode",
        title: "QR Integration",
        items: ["Unique per-table QR codes", "Print-ready QR sheets", "Analytics per QR scan", "Deep-link to menu sections"],
      },
    ],
    features: [
      { icon: "Globe",      title: "Multi-language",      desc: "French, English, and Arabic in a single tap."           },
      { icon: "QrCode",     title: "Per-table QR Codes",  desc: "Each table has its own unique scannable QR code."       },
      { icon: "Zap",        title: "Instant Updates",     desc: "Owner updates menu live — no developer needed."         },
      { icon: "TrendingUp", title: "Scan Analytics",      desc: "Track which items are viewed and ordered most."         },
      { icon: "Smartphone", title: "Mobile-First",        desc: "Designed for comfortable one-handed mobile reading."    },
      { icon: "Star",       title: "Featured Items",      desc: "Highlight specials and seasonal offers prominently."    },
    ],
    results: [
      { value: "-75", suffix: "%", label: "Print Savings / yr"    },
      { value: "+25", suffix: "%", label: "Avg. Order Value"      },
      { value: "4.9", suffix: "★", label: "Customer Rating"       },
      { value: "5",   suffix: "s", label: "Menu Update Time"      },
    ],
  },

  /* ─── 5 · Ember & Oak ───────────────────────────────────────────────────── */
  {
    id:       "ember-oak",
    title:    "Ember & Oak",
    category: "SaaS Platform",
    niche:    "Restaurant",
    img:      "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=85",
    heroImg:  "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1600&q=90",
    tags:     ["Multi-branch", "Analytics", "Cloud"],
    client:   "Ember & Oak Group (5 branches)",
    year:     "2024",
    timeline: "1 Week",

    description:
      "An enterprise-grade SaaS platform built for a premium steakhouse group managing five branches. A single dashboard unifies menus, orders, staff, and revenue reporting across all locations — replacing four legacy systems and saving management 10+ hours every week.",

    challenge:
      "A growing restaurant group managing 5 branches through a patchwork of spreadsheets, legacy POS systems, and manual reporting — wasting 10+ hours of management time every week and lacking any cross-branch visibility.",

    solution:
      "Architected a multi-tenant SaaS platform with branch isolation, a unified BI dashboard with real-time cross-branch revenue reporting, staff management, predictive inventory alerts, and a shared loyalty programme.",

    techSpecs: [
      { category: "Frontend",       items: ["Next.js 14", "React 18", "TanStack Query v5", "Tailwind CSS"] },
      { category: "Backend",        items: ["Next.js API Routes", "Prisma ORM", "PostgreSQL on Supabase", "Redis cache"] },
      { category: "Auth & Security",items: ["NextAuth.js", "Role-based access control (RBAC)", "Branch data isolation", "JWT sessions"] },
      { category: "Infrastructure", items: ["Vercel Edge Network", "Supabase Cloud", "AWS S3 media", "Sentry error tracking"] },
    ],

    testimonial: {
      quote:  "One login for all five branches. Our management team saved 10 hours a week from day one — the ROI was immediate.",
      author: "James Hartley",
      role:   "Operations Director, Ember & Oak Group",
    },

    seoKeywords:  ["multi-branch restaurant management", "restaurant SaaS platform", "restaurant analytics dashboard", "restaurant group software", "multi-location restaurant system"],
    relatedIds:   ["the-green-table", "bella-vista"],

    scope: [
      {
        icon:  "Layers",
        title: "Platform Architecture",
        items: ["Multi-tenant SaaS design", "Branch isolation & permissions", "Shared component library", "Micro-service API layer"],
      },
      {
        icon:  "Cloud",
        title: "Cloud Infrastructure",
        items: ["Vercel edge deployment", "PostgreSQL on Supabase", "S3 media management", "99.9 % uptime SLA"],
      },
      {
        icon:  "BarChart2",
        title: "Business Intelligence",
        items: ["Cross-branch revenue reports", "Staff performance KPIs", "Customer lifetime value", "Predictive stock alerts"],
      },
    ],
    features: [
      { icon: "Layers",    title: "Multi-branch Control", desc: "One login manages all 5 branches simultaneously."       },
      { icon: "BarChart2", title: "BI Dashboard",         desc: "Real-time revenue, covers, and waste metrics."          },
      { icon: "Award",     title: "Unified Loyalty",      desc: "Points redeemable across every branch."                 },
      { icon: "Users",     title: "Staff Management",     desc: "Shift scheduling, roles, and performance tracking."     },
      { icon: "Package",   title: "Inventory Alerts",     desc: "Automated low-stock and reorder notifications."         },
      { icon: "Cloud",     title: "Cloud-native",         desc: "Scales infinitely — add a new branch in minutes."       },
    ],
    results: [
      { value: "5",    suffix: "",  label: "Branches Unified" },
      { value: "+40",  suffix: "%", label: "Group Revenue"    },
      { value: "-10",  suffix: "h", label: "Admin / Week"     },
      { value: "99.9", suffix: "%", label: "Uptime"           },
    ],
  },

  /* ─── 6 · Sakura Sushi ──────────────────────────────────────────────────── */
  {
    id:       "sakura-sushi",
    title:    "Sakura Sushi",
    category: "Full System + PWA",
    niche:    "Restaurant",
    img:      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=85",
    heroImg:  "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1600&q=90",
    tags:     ["Next.js", "PWA", "Reservations"],
    client:   "Sakura Restaurant Group",
    year:     "2024",
    timeline: "1 Week",

    description:
      "A full digital rebrand and system build for a premium Japanese sushi restaurant. The platform features online ordering with a custom sushi builder, an elegant reservation system with automated confirmations, a full PWA for loyal customers, and a bilingual French/Japanese interface.",

    challenge:
      "A premium sushi restaurant with zero online ordering, a bilingual French/Japanese clientele, and no way to retain their growing base of loyal weekly diners who wanted a proper app experience.",

    solution:
      "Built a full bilingual PWA with a custom sushi combo builder, a smart reservation engine with Twilio SMS confirmations, and Web Push notifications that bring loyal customers back every week for specials.",

    techSpecs: [
      { category: "Frontend",    items: ["Next.js 14", "React 18", "Framer Motion", "Tailwind CSS"] },
      { category: "i18n",        items: ["next-intl (FR/JP)", "RTL detection", "CMS-managed translations"] },
      { category: "PWA",         items: ["Workbox service worker", "Web Push API", "Offline menu support"] },
      { category: "Backend",     items: ["Next.js API Routes", "Prisma ORM", "Supabase", "Twilio SMS API"] },
    ],

    testimonial: {
      quote:  "The sushi builder is a work of art. Our PWA installs exceeded 1,000 users and push notifications bring customers back every single week.",
      author: "Yuki Tanaka",
      role:   "Owner, Sakura Restaurant Group",
    },

    seoKeywords:  ["sushi restaurant website", "Japanese restaurant online ordering", "bilingual restaurant website", "restaurant PWA app", "sushi ordering system"],
    relatedIds:   ["bella-vista", "nomad-cafe"],

    scope: [
      {
        icon:  "Palette",
        title: "Brand & Design",
        items: ["Japanese-minimal aesthetic", "Custom sushi icon set", "Bilingual UI (FR/JP)", "Dark-mode-first design system"],
      },
      {
        icon:  "Code",
        title: "Development",
        items: ["Custom sushi combo builder", "Reservation engine + SMS", "PWA with push notifications", "Bilingual content management"],
      },
      {
        icon:  "TrendingUp",
        title: "Growth",
        items: ["Google Ads landing page", "Instagram menu integration", "SEO for 'sushi near me'", "Referral programme"],
      },
    ],
    features: [
      { icon: "ShoppingCart", title: "Online Ordering",    desc: "Full ordering with a custom sushi combo builder."       },
      { icon: "Calendar",     title: "Smart Reservations", desc: "Book a table with automated SMS confirmation."          },
      { icon: "Smartphone",   title: "PWA App",            desc: "Installable on any device — push alerts for deals."     },
      { icon: "Bell",         title: "Push Notifications", desc: "Weekly specials and happy-hour alerts."                 },
      { icon: "Globe",        title: "Bilingual (FR/JP)",  desc: "Full site in French and Japanese."                     },
      { icon: "Zap",          title: "100 PageSpeed",      desc: "Optimised images, fonts, and critical CSS."             },
    ],
    results: [
      { value: "1,000+", suffix: "", label: "PWA Users"         },
      { value: "+35",  suffix: "%", label: "Repeat Customers"  },
      { value: "100",  suffix: "",  label: "PageSpeed Score"   },
      { value: "+50",  suffix: "%", label: "Reservation Rate"  },
    ],
  },

  /* ─── 7 · Aurora Store ─────────────────────────────────────────────────── */
  {
    id:       "aurora-store",
    title:    "Aurora Store",
    category: "E-commerce Platform",
    niche:    "E-commerce",
    img:      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=85",
    heroImg:  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=90",
    tags:     ["Next.js", "Stripe", "PWA"],
    client:   "Aurora Retail Group",
    year:     "2025",
    timeline: "1 Week",
    description: "A high-converting e-commerce platform built for Aurora Retail Group — with advanced cart logic, Stripe checkout, real-time inventory, and a full PWA experience installable from any device.",
    challenge:   "The client needed a fast, mobile-first online store that could handle high traffic, reduce cart abandonment, and provide a seamless checkout experience without a native app.",
    solution:    "Built a Next.js PWA with server-side cart logic, Stripe integration, optimistic UI updates, and a fully responsive design that installs like a native app on iOS and Android.",
    techSpecs: [
      { category: "Frontend",  items: ["Next.js 14 App Router", "Tailwind CSS", "Framer Motion"] },
      { category: "Payments",  items: ["Stripe Checkout", "Webhooks", "Refund automation"]        },
      { category: "PWA",       items: ["Service Worker", "Offline cart", "Push notifications"]    },
      { category: "Analytics", items: ["Custom dashboard", "Conversion tracking", "Heatmaps"]     },
    ],
    testimonial: {
      quote:  "Our conversion rate doubled after Mohamed rebuilt our e-commerce site. The checkout flow is seamless.",
      author: "Youssef A.",
      role:   "Founder, Aurora Store",
    },
    seoKeywords:  ["e-commerce website Morocco", "Next.js online store", "Stripe PWA", "high-converting shop"],
    relatedIds:   ["nexus-consulting", "flowsaas"],
    scope: [
      { icon: "ShoppingBag", title: "Store & Cart",    items: ["Product catalogue", "Advanced filters", "Cart & wishlist"] },
      { icon: "CreditCard",  title: "Payments",        items: ["Stripe integration", "Multi-currency", "Refund flows"]     },
      { icon: "BarChart2",   title: "Admin Dashboard", items: ["Order management", "Inventory alerts", "Sales analytics"]  },
    ],
    features: [
      { icon: "Zap",      title: "Blazing Performance", desc: "100/100 PageSpeed with lazy loading, image CDN, and edge caching."  },
      { icon: "Lock",     title: "Secure Checkout",     desc: "PCI-compliant Stripe integration with 3D Secure and fraud detection." },
      { icon: "Smartphone", title: "PWA Experience",   desc: "Install the store as a native app — offline browsing included."       },
    ],
    results: [
      { value: "+100", suffix: "%", label: "Conversion Rate" },
      { value: "100",  suffix: "",  label: "PageSpeed Score" },
      { value: "-45",  suffix: "%", label: "Cart Abandonment"},
      { value: "3x",   suffix: "",  label: "Mobile Revenue"  },
    ],
  },

  /* ─── 8 · Nexus Consulting ──────────────────────────────────────────────── */
  {
    id:       "nexus-consulting",
    title:    "Nexus Consulting",
    category: "Corporate Website",
    niche:    "Corporate",
    img:      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85",
    heroImg:  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=90",
    tags:     ["Next.js", "SEO", "CMS"],
    client:   "Nexus Consulting Group",
    year:     "2025",
    timeline: "5 Days",
    description: "A premium corporate website for Nexus Consulting Group — designed to project authority, generate qualified leads, and rank on the first page of Google for competitive B2B keywords.",
    challenge:   "The client had an outdated site that failed to convert visitors into leads and didn't reflect the premium positioning of their consulting brand.",
    solution:    "Redesigned from scratch with a trust-focused UX, integrated CMS for the blog, SEO-optimised service pages, and a lead capture system connected to their CRM.",
    techSpecs: [
      { category: "Frontend",  items: ["Next.js 14 App Router", "Tailwind CSS", "Framer Motion"]         },
      { category: "CMS",       items: ["Headless CMS integration", "Blog with MDX", "Media management"]  },
      { category: "SEO",       items: ["JSON-LD schema", "Sitemap", "Core Web Vitals optimised"]         },
      { category: "Lead Gen",  items: ["Contact forms", "CRM webhook", "Analytics tracking"]             },
    ],
    seoKeywords:  ["corporate website Morocco", "consulting website Next.js", "B2B lead generation site"],
    relatedIds:   ["aurora-store", "flowsaas"],
    scope: [
      { icon: "Briefcase",  title: "Brand & Identity", items: ["Visual identity", "Brand guidelines", "Custom illustrations"] },
      { icon: "Globe",      title: "SEO & Content",    items: ["Service pages", "Blog / CMS", "Technical SEO"]               },
      { icon: "MessageCircle", title: "Lead Gen",      items: ["Contact forms", "CRM integration", "Conversion tracking"]    },
    ],
    features: [
      { icon: "TrendingUp", title: "First-Page SEO",   desc: "Ranked for 12 target keywords within 30 days of launch."     },
      { icon: "Users",      title: "Lead Generation",  desc: "Integrated lead capture forms with automated CRM pipelines." },
      { icon: "Zap",        title: "Performance",      desc: "100/100 PageSpeed — fast enough to impress even the CFO."    },
    ],
    results: [
      { value: "+180", suffix: "%", label: "Organic Traffic"  },
      { value: "12",   suffix: "",  label: "Ranked Keywords"  },
      { value: "+65",  suffix: "%", label: "Lead Form Fills"  },
      { value: "100",  suffix: "",  label: "PageSpeed Score"  },
    ],
  },

  /* ─── 9 · VitalCare Clinic ──────────────────────────────────────────────── */
  {
    id:       "vitalcare-clinic",
    title:    "VitalCare Clinic",
    category: "Healthcare Platform",
    niche:    "Healthcare",
    img:      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=85",
    heroImg:  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=90",
    tags:     ["Booking", "Dashboard", "Privacy"],
    client:   "VitalCare Medical Group",
    year:     "2025",
    timeline: "1 Week",
    description: "A comprehensive clinic website and patient booking system for VitalCare — with real-time appointment scheduling, doctor profiles, and a patient portal that replaced phone-heavy workflows.",
    challenge:   "The clinic was losing patients to competitors with better digital presence. Their phone-based booking was slow and error-prone, straining their reception team.",
    solution:    "Built a full clinic site with online booking, automated appointment reminders via WhatsApp, a patient portal, and a staff dashboard to manage schedules.",
    techSpecs: [
      { category: "Frontend",  items: ["Next.js 14", "Tailwind CSS", "Framer Motion"]               },
      { category: "Booking",   items: ["Real-time availability", "WhatsApp reminders", "iCal sync"] },
      { category: "Dashboard", items: ["Staff management", "Patient records", "Schedule overview"]  },
      { category: "Privacy",   items: ["Encrypted data", "GDPR-aware design", "Secure forms"]       },
    ],
    testimonial: {
      quote:  "The booking system saved our receptionists hours every day. Patients love the mobile experience.",
      author: "Dr. Laila M.",
      role:   "Director, VitalCare Clinic",
    },
    seoKeywords:  ["clinic website Morocco", "healthcare booking system", "patient portal Next.js"],
    relatedIds:   ["aurora-store", "nexus-consulting"],
    scope: [
      { icon: "Heart",    title: "Clinic Website",   items: ["Doctor profiles", "Service pages", "Blog"] },
      { icon: "Calendar", title: "Booking System",   items: ["Real-time slots", "WhatsApp reminders", "Cancellations"] },
      { icon: "Shield",   title: "Patient Portal",   items: ["Secure login", "Medical history", "Appointment history"] },
    ],
    features: [
      { icon: "Calendar", title: "Smart Booking",    desc: "Patients book 24/7 with instant WhatsApp confirmations."         },
      { icon: "Shield",   title: "Privacy First",    desc: "GDPR-aware architecture — patient data is encrypted at rest."    },
      { icon: "Smartphone", title: "Mobile PWA",     desc: "Installable app experience for returning patients."              },
    ],
    results: [
      { value: "-70",  suffix: "%", label: "Phone Calls"       },
      { value: "+90",  suffix: "%", label: "Online Bookings"   },
      { value: "100",  suffix: "",  label: "PageSpeed Score"   },
      { value: "+40",  suffix: "%", label: "Patient Retention" },
    ],
  },

  /* ─── 10 · Prime Properties ─────────────────────────────────────────────── */
  {
    id:       "prime-properties",
    title:    "Prime Properties",
    category: "Real Estate Platform",
    niche:    "Real Estate",
    img:      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=85",
    heroImg:  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=90",
    tags:     ["Next.js", "Maps", "Filters"],
    client:   "Prime Properties Agency",
    year:     "2025",
    timeline: "1 Week",
    description: "A modern real estate platform for Prime Properties — with advanced property search, interactive map listings, virtual tour embeds, and a lead capture system that feeds directly into their CRM.",
    challenge:   "The agency relied on outdated PDFs and social media posts to share listings. They needed a professional platform to showcase properties and capture qualified leads.",
    solution:    "Built a property showcase with advanced multi-filter search, interactive Google Maps integration, virtual tour support, and automated lead capture workflows.",
    techSpecs: [
      { category: "Frontend",  items: ["Next.js 14", "Tailwind CSS", "Framer Motion"]               },
      { category: "Maps",      items: ["Google Maps API", "Cluster markers", "Boundary search"]     },
      { category: "Search",    items: ["Multi-filter system", "Price range", "Property type"]       },
      { category: "Lead Gen",  items: ["WhatsApp CTAs", "Inquiry forms", "CRM integration"]         },
    ],
    seoKeywords:  ["real estate website Morocco", "property listings Next.js", "immobilier site web"],
    relatedIds:   ["nexus-consulting", "vitalcare-clinic"],
    scope: [
      { icon: "Home",     title: "Property Listings", items: ["Photo galleries", "Virtual tours", "Floor plans"] },
      { icon: "Map",      title: "Map Integration",   items: ["Interactive map", "Cluster view", "Boundary search"] },
      { icon: "Users",    title: "Lead Capture",      items: ["Inquiry forms", "WhatsApp integration", "CRM sync"] },
    ],
    features: [
      { icon: "Search",  title: "Advanced Search",    desc: "Filter by price, area, bedrooms, amenities, and map boundary." },
      { icon: "Map",     title: "Interactive Map",    desc: "Google Maps with clustered markers and live listing overlays."  },
      { icon: "Zap",     title: "Fast Performance",   desc: "100/100 PageSpeed — listings load in under 1 second."          },
    ],
    results: [
      { value: "+220", suffix: "%", label: "Lead Inquiries"   },
      { value: "100",  suffix: "",  label: "PageSpeed Score"  },
      { value: "+85",  suffix: "%", label: "Time on Site"     },
      { value: "-60",  suffix: "%", label: "Bounce Rate"      },
    ],
  },

  /* ─── 11 · FlowSaaS ─────────────────────────────────────────────────────── */
  {
    id:       "flowsaas",
    title:    "FlowSaaS",
    category: "SaaS Dashboard",
    niche:    "Corporate",
    img:      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=85",
    heroImg:  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=90",
    tags:     ["Dashboard", "Analytics", "Multi-tenant"],
    client:   "FlowSaaS Inc.",
    year:     "2025",
    timeline: "2 Weeks",
    description: "A full-scale SaaS admin dashboard for FlowSaaS — with multi-tenant architecture, real-time analytics, role-based access control, and a white-label option for enterprise clients.",
    challenge:   "The startup needed a scalable, white-label SaaS dashboard that could serve multiple client organisations with isolated data, custom branding, and role-based permissions.",
    solution:    "Architected a multi-tenant Next.js dashboard with RBAC, real-time data visualisation, automated billing via Stripe, and a white-label theming system.",
    techSpecs: [
      { category: "Frontend",     items: ["Next.js 14 App Router", "Tailwind CSS", "Recharts"]        },
      { category: "Multi-tenant", items: ["Organisation isolation", "RBAC", "White-label theming"]    },
      { category: "Analytics",    items: ["Real-time charts", "Export CSV", "Custom date ranges"]     },
      { category: "Billing",      items: ["Stripe subscriptions", "Usage metering", "Invoice system"] },
    ],
    seoKeywords:  ["SaaS dashboard Next.js", "multi-tenant platform", "admin dashboard Morocco"],
    relatedIds:   ["aurora-store", "nexus-consulting"],
    scope: [
      { icon: "BarChart2", title: "Analytics",      items: ["Real-time charts", "KPI widgets", "Export reports"] },
      { icon: "Users",     title: "Multi-tenant",   items: ["Organisation isolation", "RBAC", "Audit logs"]      },
      { icon: "Settings",  title: "White-label",    items: ["Custom branding", "Domain mapping", "Theme editor"] },
    ],
    features: [
      { icon: "BarChart2",   title: "Real-time Analytics",  desc: "Live dashboards with sub-second data refresh and export."     },
      { icon: "Shield",      title: "Enterprise Security",  desc: "RBAC, audit logs, 2FA, and org-level data isolation."         },
      { icon: "Paintbrush",  title: "White-label Ready",    desc: "Full theming system — clients see their own brand, not yours."},
    ],
    results: [
      { value: "50+",  suffix: "", label: "Tenants Served"   },
      { value: "100",  suffix: "", label: "PageSpeed Score"  },
      { value: "-80",  suffix: "%",label: "Onboarding Time"  },
      { value: "99.9", suffix: "%",label: "Uptime SLA"       },
    ],
  },
];
