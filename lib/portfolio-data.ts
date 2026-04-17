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

/* ── Per-language content overrides ─────────────────────────────────────── */
export interface ProjectLocale {
  title?:               string;
  category?:            string;
  description?:         string;
  challenge?:           string;
  solution?:            string;
  techSpecCategories?:  string[];           // replaces techSpecs[i].category in order
  features?:            { title: string; desc: string }[];
  scope?:               { title: string; items: string[] }[];
  results?:             { label: string }[];
}

export interface PortfolioProject {
  id:          string;
  title:       string;
  category:    string;
  niche:       string;   // filter key — never translated
  img:         string;
  heroImg:     string;
  tags:        string[];
  client:      string;
  year:        string;
  timeline:    string;
  description: string;
  status?:     "live" | "coming-soon";

  challenge:   string;
  solution:    string;
  techSpecs:   TechSpec[];
  testimonial?: Testimonial;
  seoKeywords: string[];
  relatedIds:  string[];
  liveUrl?:    string;

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

  /* FR / AR overrides */
  i18n?: {
    fr?: ProjectLocale;
    ar?: ProjectLocale;
  };
}

/* ── Helper: return a project merged with the requested locale ───────────── */
export function getProjectLocale(
  project: PortfolioProject,
  lang: string
): PortfolioProject {
  if (lang === "en" || !project.i18n) return project;
  const locale = project.i18n[lang as "fr" | "ar"];
  if (!locale) return project;

  return {
    ...project,
    title:       locale.title       ?? project.title,
    category:    locale.category    ?? project.category,
    description: locale.description ?? project.description,
    challenge:   locale.challenge   ?? project.challenge,
    solution:    locale.solution    ?? project.solution,

    techSpecs: locale.techSpecCategories
      ? project.techSpecs.map((spec, i) => ({
          ...spec,
          category: locale.techSpecCategories![i] ?? spec.category,
        }))
      : project.techSpecs,

    features: locale.features
      ? project.features.map((f, i) => ({
          ...f,
          title: locale.features![i]?.title ?? f.title,
          desc:  locale.features![i]?.desc  ?? f.desc,
        }))
      : project.features,

    scope: locale.scope
      ? project.scope.map((s, i) => ({
          ...s,
          title: locale.scope![i]?.title ?? s.title,
          items: locale.scope![i]?.items ?? s.items,
        }))
      : project.scope,

    results: locale.results
      ? project.results.map((r, i) => ({
          ...r,
          label: locale.results![i]?.label ?? r.label,
        }))
      : project.results,
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECT DATA
═══════════════════════════════════════════════════════════════════════════ */
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
    timeline: "Live",
    liveUrl:  "https://daralyasmine.netlify.app",
    status:   "live",

    description:
      "A fully functional restaurant ordering experience — digital menu, live cart, WhatsApp order notifications, and PWA install. Built with Next.js 14 to demonstrate the complete ordering flow your customers would use.",

    challenge:
      "Showing restaurants a complete digital ordering flow they can experience and test before committing to a build.",

    solution:
      "A production-grade demo with real cart logic, dynamic menu, WhatsApp notifications, and an installable PWA — same stack used in real client sites.",

    techSpecs: [
      { category: "Frontend",       items: ["Next.js 14", "TailwindCSS", "Framer Motion"] },
      { category: "PWA",            items: ["Service Worker", "Web App Manifest", "Offline Cache"] },
      { category: "Integrations",   items: ["WhatsApp API", "Google Maps"] },
      { category: "Infrastructure", items: ["Vercel Edge CDN", "Static Generation"] },
    ],

    seoKeywords: ["restaurant ordering demo", "Next.js restaurant website", "PWA ordering system", "digital menu demo", "online food ordering"],
    relatedIds:  ["clinic-booking-demo", "ecommerce-checkout-demo"],

    scope: [
      { icon: "ShoppingCart",  title: "Digital Menu & Cart",     items: ["Category-based menu", "Live cart with totals", "Item customization"] },
      { icon: "MessageCircle", title: "WhatsApp Integration",    items: ["Instant order notification", "Order summary message", "Customer contact link"] },
      { icon: "Smartphone",    title: "PWA Experience",          items: ["Home screen install", "Offline menu access", "Fast load on mobile"] },
    ],

    features: [
      { icon: "Globe",         title: "Digital Menu",      desc: "Category-organized, image-rich menu" },
      { icon: "ShoppingCart",  title: "Live Cart",         desc: "Real-time cart with item count & totals" },
      { icon: "MessageCircle", title: "WhatsApp Orders",   desc: "Instant notification sent to the owner" },
      { icon: "Smartphone",    title: "PWA Install",       desc: "Add to home screen, works offline" },
      { icon: "Search",        title: "SEO Optimized",     desc: "100/100 PageSpeed, meta tags, sitemap" },
      { icon: "Zap",           title: "< 1s Load Time",    desc: "Static generation + edge CDN" },
    ],

    results: [
      { value: "100", suffix: "/100", label: "PageSpeed Score" },
      { value: "<1",  suffix: "s",    label: "Load Time" },
      { value: "PWA", suffix: "",     label: "Installable" },
      { value: "0",   suffix: "$",    label: "App Store Fee" },
    ],

    i18n: {
      fr: {
        title:       "Démo Commande Restaurant",
        category:    "Système de Commande",
        description: "Une expérience complète de commande en restaurant — menu digital, panier en direct, notifications WhatsApp et installation PWA. Conçu avec Next.js 14 pour démontrer le parcours de commande complet que vos clients utiliseraient.",
        challenge:   "Montrer aux restaurateurs un système de commande digital complet qu'ils peuvent tester et expérimenter avant de s'engager.",
        solution:    "Une démo de qualité professionnelle avec une vraie logique de panier, un menu dynamique, des notifications WhatsApp et un PWA installable — la même stack qu'en production.",
        techSpecCategories: ["Frontend", "PWA", "Intégrations", "Infrastructure"],
        features: [
          { title: "Menu Digital",         desc: "Menu organisé par catégories, riche en images" },
          { title: "Panier en Direct",     desc: "Panier temps réel avec compteur et totaux" },
          { title: "Commandes WhatsApp",   desc: "Notification instantanée envoyée au propriétaire" },
          { title: "Installation PWA",     desc: "Ajouter à l'écran d'accueil, fonctionne hors ligne" },
          { title: "SEO Optimisé",         desc: "PageSpeed 100/100, balises meta, sitemap" },
          { title: "< 1s Chargement",      desc: "Génération statique + CDN edge" },
        ],
        scope: [
          { title: "Menu & Panier Digital",  items: ["Menu par catégories", "Panier en direct avec totaux", "Personnalisation des articles"] },
          { title: "Intégration WhatsApp",   items: ["Notification de commande instantanée", "Message récapitulatif", "Lien contact client"] },
          { title: "Application PWA",        items: ["Installation écran d'accueil", "Accès menu hors ligne", "Chargement rapide mobile"] },
        ],
        results: [
          { label: "Score PageSpeed" },
          { label: "Temps de Chargement" },
          { label: "Installable" },
          { label: "Frais App Store" },
        ],
      },
      ar: {
        title:       "نموذج طلبات المطاعم",
        category:    "نظام الطلبات",
        description: "تجربة طلب مطعم متكاملة — قائمة طعام رقمية، سلة حية، إشعارات واتساب، وتثبيت PWA. مبني بـ Next.js 14 لعرض تدفق الطلب الكامل الذي سيستخدمه عملاؤك.",
        challenge:   "إظهار تدفق الطلب الرقمي الكامل للمطاعم بطريقة يمكن تجربتها واختبارها قبل الالتزام.",
        solution:    "نموذج بجودة إنتاجية مع منطق سلة حقيقي وقائمة ديناميكية وإشعارات واتساب وـPWA قابل للتثبيت — نفس التقنية المستخدمة في مواقع العملاء الحقيقيين.",
        techSpecCategories: ["الواجهة الأمامية", "PWA", "التكاملات", "البنية التحتية"],
        features: [
          { title: "قائمة رقمية",        desc: "قائمة منظمة بالفئات وغنية بالصور" },
          { title: "سلة حية",            desc: "سلة تسوق بوقت فعلي مع عداد وإجماليات" },
          { title: "طلبات واتساب",       desc: "إشعار فوري يُرسل للمالك" },
          { title: "تثبيت PWA",          desc: "أضف للشاشة الرئيسية، يعمل بدون إنترنت" },
          { title: "تحسين SEO",          desc: "PageSpeed 100/100، علامات تعريفية، خريطة موقع" },
          { title: "أقل من ثانية",       desc: "توليد ثابت + CDN عالمي" },
        ],
        scope: [
          { title: "القائمة والسلة الرقمية", items: ["قائمة بالفئات", "سلة حية بالإجماليات", "تخصيص الأصناف"] },
          { title: "تكامل واتساب",           items: ["إشعار الطلب الفوري", "رسالة ملخص الطلب", "رابط تواصل العميل"] },
          { title: "تطبيق PWA",              items: ["التثبيت على الشاشة الرئيسية", "الوصول للقائمة بدون إنترنت", "تحميل سريع على الجوال"] },
        ],
        results: [
          { label: "درجة PageSpeed" },
          { label: "وقت التحميل" },
          { label: "قابل للتثبيت" },
          { label: "رسوم متجر التطبيقات" },
        ],
      },
    },
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
    timeline: "2025",
    status:   "live",
    liveUrl:  "https://novashope.netlify.app",

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
      { icon: "Package",      title: "Product Catalog",  items: ["Grid & list views", "Category filters", "Search functionality"] },
      { icon: "ShoppingCart", title: "Cart & Checkout",  items: ["Live cart updates", "Promo codes", "Order confirmation"] },
      { icon: "BarChart2",    title: "Admin Dashboard",  items: ["Order management", "Product CRUD", "Sales overview"] },
    ],

    features: [
      { icon: "Package",      title: "Product Catalog",   desc: "Grid view with filters and search" },
      { icon: "ShoppingCart", title: "Cart System",        desc: "Real-time cart with quantity controls" },
      { icon: "TrendingUp",   title: "Checkout Flow",      desc: "Multi-step checkout with validation" },
      { icon: "Award",        title: "Order Confirmation", desc: "Email + WhatsApp order receipt" },
      { icon: "Smartphone",   title: "Mobile-optimized",   desc: "Thumb-friendly, fast on any device" },
      { icon: "Zap",          title: "Performance",        desc: "100/100 PageSpeed on mobile & desktop" },
    ],

    results: [
      { value: "100", suffix: "/100", label: "PageSpeed Score" },
      { value: "2×",  suffix: "",     label: "Higher Conversion" },
      { value: "<1",  suffix: "s",    label: "Load Time" },
      { value: "0",   suffix: "%",    label: "Cart Abandonment Fix" },
    ],

    i18n: {
      fr: {
        title:       "Démo E-commerce",
        category:    "Boutique en Ligne",
        description: "Une démo complète de boutique en ligne — catalogue produits, ajout au panier, tunnel de paiement et confirmation de commande. Conçu pour démontrer l'UX optimisée pour la conversion qui transforme les visiteurs en acheteurs.",
        challenge:   "Démontrer un parcours e-commerce complet qui ressemble à une vraie boutique en production, pas à un template.",
        solution:    "Une démo haute-fidélité avec grille produits, filtres, gestion du panier et un tunnel d'achat fluide — prête à être connectée à n'importe quelle passerelle de paiement.",
        techSpecCategories: ["Frontend", "Commerce", "Paiements", "Infrastructure"],
        features: [
          { title: "Catalogue Produits",   desc: "Vue en grille avec filtres et recherche" },
          { title: "Système de Panier",    desc: "Panier temps réel avec contrôle des quantités" },
          { title: "Tunnel d'Achat",       desc: "Checkout multi-étapes avec validation" },
          { title: "Confirmation Commande", desc: "Reçu par email + WhatsApp" },
          { title: "Optimisé Mobile",      desc: "Ergonomique, rapide sur tous les appareils" },
          { title: "Performance",          desc: "PageSpeed 100/100 mobile & desktop" },
        ],
        scope: [
          { title: "Catalogue Produits", items: ["Vue grille et liste", "Filtres par catégorie", "Fonctionnalité de recherche"] },
          { title: "Panier & Paiement",  items: ["Mise à jour panier en direct", "Codes promo", "Confirmation commande"] },
          { title: "Tableau de Bord",    items: ["Gestion commandes", "CRUD produits", "Aperçu des ventes"] },
        ],
        results: [
          { label: "Score PageSpeed" },
          { label: "Meilleure Conversion" },
          { label: "Temps de Chargement" },
          { label: "Abandon Panier Réduit" },
        ],
      },
      ar: {
        title:       "نموذج التجارة الإلكترونية",
        category:    "متجر إلكتروني",
        description: "نموذج متجر إلكتروني متكامل — كتالوج منتجات، إضافة للسلة، تدفق الدفع وتأكيد الطلب. مصمم لعرض تجربة المستخدم المحسّنة للتحويل التي تحوّل الزوار إلى مشترين.",
        challenge:   "عرض تدفق تجارة إلكترونية كامل يبدو ويشعر مثل متجر إنتاج حقيقي، لا قالب جاهز.",
        solution:    "نموذج عالي الدقة بشبكة منتجات وفلاتر وإدارة سلة وتدفق دفع سلس — جاهز للربط بأي بوابة دفع.",
        techSpecCategories: ["الواجهة الأمامية", "التجارة", "المدفوعات", "البنية التحتية"],
        features: [
          { title: "كتالوج المنتجات",   desc: "عرض شبكي مع فلاتر وبحث" },
          { title: "نظام السلة",        desc: "سلة تسوق بوقت فعلي مع التحكم في الكميات" },
          { title: "تدفق الدفع",        desc: "دفع متعدد الخطوات مع التحقق" },
          { title: "تأكيد الطلب",       desc: "إيصال بالبريد الإلكتروني + واتساب" },
          { title: "محسّن للجوال",      desc: "سهل الاستخدام وسريع على أي جهاز" },
          { title: "الأداء",            desc: "PageSpeed 100/100 على الجوال والديسكتوب" },
        ],
        scope: [
          { title: "كتالوج المنتجات", items: ["عرض شبكي وقائمة", "فلاتر الفئات", "وظيفة البحث"] },
          { title: "السلة والدفع",    items: ["تحديث السلة في الوقت الفعلي", "رموز الخصم", "تأكيد الطلب"] },
          { title: "لوحة التحكم",    items: ["إدارة الطلبات", "إضافة وتعديل المنتجات", "نظرة عامة على المبيعات"] },
        ],
        results: [
          { label: "درجة PageSpeed" },
          { label: "تحويل أعلى" },
          { label: "وقت التحميل" },
          { label: "تقليل التخلي عن السلة" },
        ],
      },
    },
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
    timeline: "Live",
    liveUrl:  "https://strategicgrowth.netlify.app",
    status:   "live",

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
      { icon: "Globe",      title: "Brand Identity", items: ["Hero + brand story", "Services section", "Team profiles"] },
      { icon: "Search",     title: "SEO Foundation", items: ["JSON-LD structured data", "Meta optimization", "Sitemap"] },
      { icon: "TrendingUp", title: "Lead Capture",   items: ["Contact form", "WhatsApp CTA", "Calendar booking"] },
    ],

    features: [
      { icon: "Globe",    title: "Hero Section",      desc: "Brand-first impact above the fold" },
      { icon: "Layers",   title: "Services Showcase", desc: "Cards with icons, descriptions, CTAs" },
      { icon: "Users",    title: "Team Profiles",     desc: "Photo, role, LinkedIn — credibility block" },
      { icon: "Search",   title: "Local SEO",         desc: "Google Business Profile + JSON-LD" },
      { icon: "Monitor",  title: "Contact Form",      desc: "Server-side form with email notifications" },
      { icon: "Zap",      title: "Fast Performance",  desc: "100/100 PageSpeed for better rankings" },
    ],

    results: [
      { value: "100", suffix: "/100", label: "PageSpeed Score" },
      { value: "+40", suffix: "%",    label: "More Leads" },
      { value: "#1",  suffix: "",     label: "Local SEO Ready" },
      { value: "3×",  suffix: "",     label: "More Trust" },
    ],

    i18n: {
      fr: {
        title:       "Démo Site d'Entreprise",
        category:    "Site Corporate",
        description: "Une landing page corporate haute conversion — section héro, présentation des services, profils d'équipe, études de cas et formulaire de capture de leads. Optimisé SEO et conçu pour générer des leads qualifiés dès le lancement.",
        challenge:   "La plupart des sites corporate sont obsolètes, lents à charger et ne convertissent pas les visiteurs en leads.",
        solution:    "Une landing page Next.js moderne avec données structurées, temps de chargement rapide et une mise en page orientée conversion qui guide les visiteurs vers le contact.",
        techSpecCategories: ["Frontend", "SEO", "Formulaires", "Infrastructure"],
        features: [
          { title: "Section Héro",         desc: "Impact de marque en premier plan" },
          { title: "Présentation Services", desc: "Cartes avec icônes, descriptions, CTAs" },
          { title: "Profils Équipe",        desc: "Photo, rôle, LinkedIn — bloc de crédibilité" },
          { title: "SEO Local",            desc: "Google Business Profile + JSON-LD" },
          { title: "Formulaire Contact",   desc: "Formulaire côté serveur avec notifications email" },
          { title: "Performance",          desc: "PageSpeed 100/100 pour un meilleur référencement" },
        ],
        scope: [
          { title: "Identité de Marque", items: ["Héro + histoire de marque", "Section services", "Profils équipe"] },
          { title: "Fondation SEO",      items: ["Données structurées JSON-LD", "Optimisation meta", "Sitemap"] },
          { title: "Capture de Leads",   items: ["Formulaire contact", "CTA WhatsApp", "Réservation agenda"] },
        ],
        results: [
          { label: "Score PageSpeed" },
          { label: "Plus de Leads" },
          { label: "SEO Local Prêt" },
          { label: "Plus de Confiance" },
        ],
      },
      ar: {
        title:       "نموذج موقع الشركة",
        category:    "موقع الشركة",
        description: "صفحة هبوط للشركات عالية التحويل — قسم البطل، عرض الخدمات، ملفات الفريق، دراسات الحالة، ونموذج التقاط العملاء. محسّن لمحركات البحث ومصمم لتوليد عملاء مؤهلين من اليوم الأول.",
        challenge:   "معظم مواقع الشركات قديمة المظهر، بطيئة التحميل، وتفشل في تحويل الزوار إلى عملاء محتملين.",
        solution:    "صفحة هبوط حديثة بـ Next.js مع بيانات منظمة وأوقات تحميل سريعة وتخطيط يركز على التحويل ويوجه الزوار نحو التواصل.",
        techSpecCategories: ["الواجهة الأمامية", "SEO", "النماذج", "البنية التحتية"],
        features: [
          { title: "قسم البطل",        desc: "تأثير العلامة التجارية في المقدمة" },
          { title: "عرض الخدمات",      desc: "بطاقات مع أيقونات وأوصاف ودعوات للعمل" },
          { title: "ملفات الفريق",     desc: "صورة، دور، لينكدإن — كتلة المصداقية" },
          { title: "SEO المحلي",       desc: "Google Business Profile + JSON-LD" },
          { title: "نموذج التواصل",    desc: "نموذج من جانب الخادم مع إشعارات بريد إلكتروني" },
          { title: "الأداء",           desc: "PageSpeed 100/100 لتصنيف أفضل" },
        ],
        scope: [
          { title: "هوية العلامة التجارية", items: ["البطل + قصة العلامة", "قسم الخدمات", "ملفات الفريق"] },
          { title: "أسس SEO",               items: ["بيانات JSON-LD المنظمة", "تحسين العلامات التعريفية", "خريطة الموقع"] },
          { title: "التقاط العملاء",         items: ["نموذج التواصل", "CTA واتساب", "حجز التقويم"] },
        ],
        results: [
          { label: "درجة PageSpeed" },
          { label: "عملاء محتملون أكثر" },
          { label: "SEO محلي جاهز" },
          { label: "ثقة أكبر" },
        ],
      },
    },
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
      { category: "Frontend",        items: ["Next.js 14", "TailwindCSS", "Framer Motion"] },
      { category: "Booking Engine",  items: ["Calendar picker", "Availability slots", "Conflict prevention"] },
      { category: "Notifications",   items: ["WhatsApp confirmation", "Reminder logic", "Cancellation flow"] },
      { category: "Infrastructure",  items: ["Vercel Edge CDN", "Serverless API"] },
    ],

    seoKeywords: ["clinic booking demo", "healthcare appointment system", "doctor booking website", "medical appointment Next.js", "clinic website demo"],
    relatedIds:  ["restaurant-ordering-demo", "corporate-landing-demo"],

    scope: [
      { icon: "Calendar",      title: "Booking Calendar",  items: ["Doctor selection", "Time slot picker", "Availability engine"] },
      { icon: "Users",         title: "Doctor Profiles",   items: ["Photo, bio, specialty", "Availability display", "Direct booking"] },
      { icon: "MessageCircle", title: "Confirmation Flow", items: ["WhatsApp confirmation", "Booking summary", "Cancellation link"] },
    ],

    features: [
      { icon: "Calendar",      title: "Appointment Booking",   desc: "Real-time slot picker per doctor" },
      { icon: "Users",         title: "Doctor Profiles",       desc: "Photo, specialty, and availability" },
      { icon: "Bell",          title: "WhatsApp Confirmation", desc: "Instant confirmation to patient & clinic" },
      { icon: "Smartphone",    title: "Mobile PWA",            desc: "Install on home screen, works offline" },
      { icon: "Globe",         title: "Service Listings",      desc: "Medical services with pricing" },
      { icon: "Zap",           title: "Fast Performance",      desc: "100/100 PageSpeed for SEO" },
    ],

    results: [
      { value: "100", suffix: "/100", label: "PageSpeed Score" },
      { value: "-60", suffix: "%",    label: "Phone Calls" },
      { value: "24",  suffix: "/7",   label: "Bookings Open" },
      { value: "0",   suffix: "$",    label: "No-show Fee" },
    ],

    i18n: {
      fr: {
        title:       "Démo Réservation Clinique",
        category:    "Système de Réservation",
        description: "Une démo complète de réservation en clinique — prise de rendez-vous, profils de médecins, liste des services et confirmation via WhatsApp. Conçu pour les prestataires de santé qui souhaitent automatiser les planifications.",
        challenge:   "Les cliniques passent des heures au téléphone pour les réservations et souffrent des absences, perdant des revenus et gaspillant le temps du personnel.",
        solution:    "Un portail de réservation en libre-service où les patients choisissent un médecin, une date et une heure — confirmé instantanément via WhatsApp aux deux parties.",
        techSpecCategories: ["Frontend", "Moteur de Réservation", "Notifications", "Infrastructure"],
        features: [
          { title: "Prise de Rendez-vous",    desc: "Sélecteur de créneaux en temps réel par médecin" },
          { title: "Profils Médecins",         desc: "Photo, spécialité et disponibilité" },
          { title: "Confirmation WhatsApp",    desc: "Confirmation instantanée au patient et à la clinique" },
          { title: "PWA Mobile",              desc: "Installer sur l'écran d'accueil, fonctionne hors ligne" },
          { title: "Liste des Services",       desc: "Services médicaux avec tarification" },
          { title: "Performance",             desc: "PageSpeed 100/100 pour le référencement" },
        ],
        scope: [
          { title: "Calendrier de Réservation", items: ["Sélection du médecin", "Sélecteur de créneaux", "Moteur de disponibilité"] },
          { title: "Profils Médecins",           items: ["Photo, bio, spécialité", "Affichage des disponibilités", "Réservation directe"] },
          { title: "Flux de Confirmation",       items: ["Confirmation WhatsApp", "Récapitulatif de réservation", "Lien d'annulation"] },
        ],
        results: [
          { label: "Score PageSpeed" },
          { label: "Appels Téléphoniques" },
          { label: "Réservations Ouvertes" },
          { label: "Frais d'Absence" },
        ],
      },
      ar: {
        title:       "نموذج حجز العيادة",
        category:    "نظام الحجز",
        description: "نموذج حجز عيادة كامل — جدولة المواعيد، ملفات الأطباء، قوائم الخدمات، وتأكيد الحجز عبر واتساب. مصمم لمقدمي الرعاية الصحية الذين يريدون أتمتة الجدولة وتقليل المكالمات الهاتفية.",
        challenge:   "تقضي العيادات ساعات في الحجوزات الهاتفية وتعاني من الغياب، مما يُفقدها الإيرادات ويُهدر وقت الموظفين.",
        solution:    "بوابة حجز ذاتية الخدمة حيث يختار المرضى الطبيب والتاريخ والوقت — يُؤكَّد فوراً عبر واتساب لكلا الطرفين.",
        techSpecCategories: ["الواجهة الأمامية", "محرك الحجز", "الإشعارات", "البنية التحتية"],
        features: [
          { title: "حجز المواعيد",       desc: "منتقي الفترات الزمنية في الوقت الفعلي لكل طبيب" },
          { title: "ملفات الأطباء",      desc: "صورة وتخصص وتوفر" },
          { title: "تأكيد واتساب",       desc: "تأكيد فوري للمريض والعيادة" },
          { title: "PWA للجوال",         desc: "تثبيت على الشاشة الرئيسية، يعمل بدون إنترنت" },
          { title: "قائمة الخدمات",      desc: "الخدمات الطبية مع التسعير" },
          { title: "الأداء",             desc: "PageSpeed 100/100 لتحسين SEO" },
        ],
        scope: [
          { title: "تقويم الحجز",       items: ["اختيار الطبيب", "منتقي الفترات الزمنية", "محرك التوفر"] },
          { title: "ملفات الأطباء",     items: ["صورة وسيرة ذاتية وتخصص", "عرض التوفر", "الحجز المباشر"] },
          { title: "تدفق التأكيد",      items: ["تأكيد واتساب", "ملخص الحجز", "رابط الإلغاء"] },
        ],
        results: [
          { label: "درجة PageSpeed" },
          { label: "المكالمات الهاتفية" },
          { label: "الحجوزات مفتوحة" },
          { label: "رسوم الغياب" },
        ],
      },
    },
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
      { icon: "Globe",  title: "Property Listings", items: ["Card grid with photos", "Price & details", "Availability badge"] },
      { icon: "Search", title: "Search & Filters",  items: ["Price range", "Property type", "Location filter"] },
      { icon: "MapPin", title: "Map View",           items: ["Google Maps pins", "Cluster view", "Click to detail"] },
    ],

    features: [
      { icon: "Globe",         title: "Property Grid",    desc: "Photo-rich cards with key details" },
      { icon: "Search",        title: "Smart Filters",    desc: "Price, type, beds, location" },
      { icon: "MapPin",        title: "Map View",         desc: "Interactive map with property pins" },
      { icon: "MessageCircle", title: "WhatsApp Lead",    desc: "One-tap contact per listing" },
      { icon: "Camera",        title: "Photo Gallery",    desc: "Full-screen image carousel per property" },
      { icon: "Zap",           title: "Fast Performance", desc: "100/100 PageSpeed for SEO" },
    ],

    results: [
      { value: "100", suffix: "/100", label: "PageSpeed Score" },
      { value: "+55", suffix: "%",    label: "More Inquiries" },
      { value: "24",  suffix: "/7",   label: "Listings Online" },
      { value: "0",   suffix: "$",    label: "Portal Fee" },
    ],

    i18n: {
      fr: {
        title:       "Démo Annonces Immobilières",
        category:    "Vitrine Immobilière",
        description: "Une démo moderne d'annonces immobilières — fiches propriétés, filtres de recherche avancés, vue carte et formulaires de capture de leads. Conçu pour les agents et agences souhaitant présenter des biens et capter des acheteurs sérieux.",
        challenge:   "Les agents immobiliers s'appuient sur WhatsApp et Instagram pour partager les annonces — sans plateforme professionnelle pour les présenter et capter des leads qualifiés.",
        solution:    "Un portail immobilier consultable avec filtres (prix, type, localisation), une carte interactive et un lien WhatsApp sur chaque annonce.",
        techSpecCategories: ["Frontend", "Annonces", "Cartes", "Infrastructure"],
        features: [
          { title: "Grille Propriétés", desc: "Fiches riches en photos avec détails clés" },
          { title: "Filtres Intelligents", desc: "Prix, type, chambres, localisation" },
          { title: "Vue Carte",          desc: "Carte interactive avec épingles de propriétés" },
          { title: "Lead WhatsApp",      desc: "Contact en un clic par annonce" },
          { title: "Galerie Photos",     desc: "Carrousel plein écran par propriété" },
          { title: "Performance",        desc: "PageSpeed 100/100 pour le référencement" },
        ],
        scope: [
          { title: "Annonces Propriétés", items: ["Grille de cartes avec photos", "Prix et détails", "Badge de disponibilité"] },
          { title: "Recherche & Filtres", items: ["Fourchette de prix", "Type de bien", "Filtre localisation"] },
          { title: "Vue Carte",           items: ["Épingles Google Maps", "Vue cluster", "Clic vers détail"] },
        ],
        results: [
          { label: "Score PageSpeed" },
          { label: "Plus de Demandes" },
          { label: "Annonces en Ligne" },
          { label: "Frais de Portail" },
        ],
      },
      ar: {
        title:       "نموذج قوائم العقارات",
        category:    "عرض العقارات",
        description: "نموذج حديث لقوائم العقارات — بطاقات العقارات، فلاتر البحث المتقدمة، عرض الخريطة، ونماذج التقاط العملاء. مبني للوكلاء والوكالات لعرض العقارات والتقاط اهتمام المشترين الجادين.",
        challenge:   "يعتمد وكلاء العقارات على واتساب وإنستغرام لمشاركة القوائم — دون منصة احترافية لعرضها والتقاط العملاء المؤهلين.",
        solution:    "بوابة عقارية قابلة للبحث مع فلاتر (السعر، النوع، الموقع)، وخريطة تفاعلية، ورابط واتساب في كل قائمة.",
        techSpecCategories: ["الواجهة الأمامية", "القوائم", "الخرائط", "البنية التحتية"],
        features: [
          { title: "شبكة العقارات",   desc: "بطاقات غنية بالصور مع التفاصيل الرئيسية" },
          { title: "فلاتر ذكية",      desc: "السعر، النوع، غرف النوم، الموقع" },
          { title: "عرض الخريطة",    desc: "خريطة تفاعلية مع دبابيس العقارات" },
          { title: "عميل واتساب",    desc: "تواصل بنقرة واحدة في كل قائمة" },
          { title: "معرض الصور",     desc: "عرض شرائح بشاشة كاملة لكل عقار" },
          { title: "الأداء",          desc: "PageSpeed 100/100 لتحسين SEO" },
        ],
        scope: [
          { title: "قوائم العقارات",  items: ["شبكة بطاقات مع صور", "السعر والتفاصيل", "شارة التوفر"] },
          { title: "البحث والفلاتر", items: ["نطاق السعر", "نوع العقار", "فلتر الموقع"] },
          { title: "عرض الخريطة",   items: ["دبابيس Google Maps", "عرض المجموعات", "انقر للتفاصيل"] },
        ],
        results: [
          { label: "درجة PageSpeed" },
          { label: "استفسارات أكثر" },
          { label: "القوائم متاحة" },
          { label: "رسوم البوابة" },
        ],
      },
    },
  },

];
