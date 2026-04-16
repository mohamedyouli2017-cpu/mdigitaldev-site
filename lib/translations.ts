export type Lang = "en" | "fr" | "ar";

export interface LangTranslations {
  nav: {
    about: string; whyMe: string; services: string;
    portfolio: string; process: string; contact: string; cta: string;
  };
  hero: {
    badge: string; h1a: string; h1b: string; h1c: string;
    sub: string; cta1: string; cta2: string; scroll: string;
    stats: { projects: string; pagespeed: string; revenue: string; response: string };
  };
  about: {
    pill: string; headline1: string; headline2: string;
    bodyPre: string; name: string; bodyMid: string;
    highlight: string; bodyEnd: string; available: string;
    stats: { label: string; desc: string }[];
  };
  powerTrio: {
    label: string; headline1: string; headline2: string; sub: string;
    items: { title: string; desc: string; bullets: string[] }[];
  };
  services: {
    label: string; headline1: string; headline2: string; sub: string;
    footerNote: string; estimate: string; popular: string;
    items: { tier: string; name: string; desc: string; features: string[]; cta: string; waMsg: string }[];
  };
  industries: {
    label: string; headline: string; sub: string;
    items: { name: string; desc: string; tags: string[] }[];
  };
  portfolio: {
    label: string; headline: string; sub: string;
    filterAll: string; filterRestaurants: string;
    filterEcommerce: string; filterCorporate: string;
    filterHealthcare: string; filterRealEstate: string;
    empty: string; viewProject: string;
    labels: {
      client: string; year: string; timeline: string; category: string;
      challenge: string; solution: string; aboutProject: string;
      scopeOfWork: string; whatWeBuilt: string; techSpecs: string;
      underTheHood: string; keyFeatures: string; everythingIncluded: string;
      impact: string; realResults: string; relatedProjects: string;
      youMightAlsoLike: string; viewDemo: string; comingSoon: string;
      comingSoonTitle: string; comingSoonDesc: string;
      backToPortfolio: string; viewAllProjects: string; startOnWhatsApp: string;
      requestBuild: string; overview: string; features: string; techStack: string;
    };
  };
  process: {
    label: string; headline: string; sub: string; timeNote: string;
    items: { number: string; title: string; desc: string }[];
  };
  contact: {
    label: string; headline1: string; headline2: string; sub: string;
    whatsapp: string; email: string; cta: string;
  };
  footer: { madeWith: string; passion: string; rights: string; privacyLink: string; termsLink: string };
}

export const translations: Record<Lang, LangTranslations> = {
  /* ─────────────────── ENGLISH ─────────────────── */
  en: {
    nav: {
      about: "About", whyMe: "Why Me", services: "Services",
      portfolio: "Demos", process: "Process", contact: "Contact", cta: "Start Project",
    },
    hero: {
      badge:  "Available for New Projects",
      h1a:    "Elevating",
      h1b:    "Businesses with",
      h1c:    "Digital Solutions.",
      sub:    "I build blazing-fast, PWA-ready websites for restaurants, e-commerce, corporate, healthcare, and real estate — with speed, design, and tech that sets you apart.",
      cta1:   "Start Your Project",
      cta2:   "View Live Demos",
      scroll: "Scroll",
      stats:  { projects: "Conversions", pagespeed: "Operational Costs", revenue: "PWA Installs", response: "Revenue Lift" },
    },
    about: {
      pill: "About Me", headline1: "The Mind Behind the", headline2: "Digital Transformation",
      bodyPre: "I'm", name: "Mohamed",
      bodyMid: ", a Web & PWA Developer specialized in creating high-performance digital ecosystems for modern businesses. I bridge the gap between",
      highlight: "diverse industries", bodyEnd: "and cutting-edge tech.",
      available: "Available for projects",
      stats: [
        { label: "100% PageSpeed",   desc: "Lighthouse perfect score on every delivery" },
        { label: "Next.js Expert",   desc: "App Router, RSC & edge-ready architectures" },
        { label: "UI/UX Specialist", desc: "Pixel-perfect interfaces that convert" },
      ],
    },
    powerTrio: {
      label: "The Power Trio", headline1: "Three Things That Make",
      headline2: "Businesses Win Online.",
      sub: "Every project is built on this foundation — no exceptions.",
      items: [
        {
          title: "Lightning Speed",
          desc: "Sub-second loads via Next.js static generation, edge CDN, and automatic image optimisation. Faster sites rank higher and keep potential customers from bouncing.",
          bullets: ["Core Web Vitals optimised", "Edge-cached globally", "< 1 s first paint"],
        },
        {
          title: "Stunning Design",
          desc: "Apple-grade UI with micro-animations, custom typography, and layouts engineered to convert. Every pixel earns its place on every screen.",
          bullets: ["Mobile-first responsive", "Custom brand identity", "Conversion-focused UX"],
        },
        {
          title: "Installable App (PWA)",
          desc: "Customers add your business to their home screen — no App Store needed. Offline content, push notifications, and instant access keep you top-of-mind.",
          bullets: ["Home screen install", "Offline-capable content", "Push notifications"],
        },
      ],
    },
    services: {
      label: "Services & Pricing", headline1: "Choose Your", headline2: "Growth Level.",
      sub: "Transparent pricing. All tiers include clean code, mobile-first design, and post-launch support.",
      footerNote: "Prices are starting points — final quote depends on scope.",
      estimate: "Get a free estimate →", popular: "✦ Most Popular",
      items: [
        {
          tier: "Starter Pack", name: "Landing Page & Digital Presence",
          desc: "A blazing-fast, beautifully designed landing page that replaces outdated sites and drives traffic from Google — for any industry.",
          features: ["Landing Page & Google Maps ($80) — high-performance single page", "Content/Menu/Catalog with Photos ($50) — professional layout", "Basic SEO & WhatsApp Button ($20) — visibility & direct contact", "⚡ 24-Hour Delivery"],
          cta: "Get Started", waMsg: "Hello Mohamed, I want to start with the Starter Pack for my business.",
        },
        {
          tier: "Professional Pack", name: "Full Business System",
          desc: "Our core solution for scaling businesses. Full Admin Dashboard & WhatsApp Automation included — complete online presence with ordering/booking, alerts, and everything a modern business needs.",
          features: ["Starter Pack Inclusion ($150) — full website & SEO foundation", "Ordering/Booking System ($450) — advanced cart & processing", "⭐ Admin Dashboard ($500) & WhatsApp Automation ($200)", "PWA & Reservation/Scheduling System ($200) — mobile app + booking", "⚡ 3-Day Delivery"],
          cta: "Most Popular", waMsg: "Hello Mohamed, I'm interested in the Professional Pack to grow my business.",
        },
        {
          tier: "Ultimate Pack", name: "SaaS / Cloud Platform",
          desc: "For multi-branch enterprises and SaaS solutions. Custom cloud platforms with multi-branch management, loyalty programs, analytics dashboards, and fully scalable architecture.",
          features: ["Full Professional Pack ($1,500) — complete core system", "Multi-branch Management ($1,200) — manage all locations from one dashboard", "Loyalty & Rewards System ($800) — automated coupons & customer points", "Advanced Analytics ($600) — sales reports & customer behavior insights", "⭐ Dedicated VIP Support ($700) — priority updates & 24/7 assistance", "⚡ 1-Week Delivery"],
          cta: "Let's Talk", waMsg: "Hello Mohamed, I want the full Ultimate Experience for my business.",
        },
      ],
    },
    portfolio: {
      label: "LIVE DEMOS", headline: "Capabilities in Action.",
      sub: "Interactive demos showcasing the systems I build. Click any demo to explore a fully functional prototype.",
      filterAll: "All", filterRestaurants: "Restaurants",
      filterEcommerce: "E-commerce", filterCorporate: "Corporate",
      filterHealthcare: "Healthcare", filterRealEstate: "Real Estate",
      empty: "No demos in this category yet — check back soon!", viewProject: "View Demo",
      labels: {
        client: "CLIENT", year: "YEAR", timeline: "TIMELINE", category: "CATEGORY",
        challenge: "The Challenge", solution: "The Solution",
        aboutProject: "About the Demo", scopeOfWork: "Scope of Work", whatWeBuilt: "What We Built",
        techSpecs: "Technical Specifications", underTheHood: "Under the Hood",
        keyFeatures: "Key Features", everythingIncluded: "Everything Included",
        impact: "Impact", realResults: "Real Results",
        relatedProjects: "You Might Also Like", youMightAlsoLike: "Related Demos",
        viewDemo: "Open Live Demo", comingSoon: "Coming Soon",
        comingSoonTitle: "Demo Coming Soon",
        comingSoonDesc: "This interactive demo is currently being built. Request a similar build for your business now.",
        backToPortfolio: "All Demos", viewAllProjects: "View All Demos",
        startOnWhatsApp: "Start on WhatsApp",
        requestBuild: "Request Similar Build →",
        overview: "Overview", features: "Features", techStack: "Tech Stack",
      },
    },
    industries: {
      label: "Industries", headline: "Built for Every Business.", sub: "Specialized solutions crafted for the unique needs of each industry.",
      items: [
        { name: "Restaurants & Hospitality", desc: "Digital menus, online ordering, reservations, and PWA experiences that turn diners into regulars.", tags: ["Menu", "Ordering", "Reservations"] },
        { name: "E-commerce & Retail",       desc: "High-converting online stores with cart systems, payment integration, and inventory dashboards.",  tags: ["Store", "Payments", "Analytics"] },
        { name: "Corporate & Services",      desc: "Professional websites that build trust, generate leads, and establish authority in your market.",    tags: ["Branding", "Lead Gen", "SEO"]   },
        { name: "Healthcare & Wellness",     desc: "HIPAA-conscious booking systems, patient portals, and clinic websites that inspire confidence.",    tags: ["Booking", "Portals", "Privacy"] },
        { name: "Real Estate",               desc: "Property showcases with advanced filters, virtual tours, and lead capture for agents and agencies.", tags: ["Listings", "Filters", "Maps"]   },
      ],
    },
    process: {
      label: "HOW I WORK", headline: "A Proven Process, Every Time.",
      sub: "From first message to launch — here's how your project moves forward.",
      timeNote: "Most projects launch within 24 hours to 3 days.",
      items: [
        {
          number: "01", title: "Discovery & Brief",
          desc: "We talk on WhatsApp. I understand your business, goals, and constraints. You get a clear scope and fixed price.",
        },
        {
          number: "02", title: "Design & Prototype",
          desc: "I craft a pixel-perfect design in Figma or directly in code. You review and approve before any development.",
        },
        {
          number: "03", title: "Build & Integrate",
          desc: "Clean Next.js code, PWA-ready, SEO-optimized. WhatsApp, payments, dashboards — integrated to match your workflow.",
        },
        {
          number: "04", title: "Launch & Support",
          desc: "Deployed on fast global CDN with 100/100 PageSpeed. Post-launch support included — you're never stuck alone.",
        },
      ],
    },
    contact: {
      label: "Let's Work Together", headline1: "Ready to Get a Website",
      headline2: "That Actually Works?",
      sub: "Let's discuss your project. I respond within 24 hours and offer a free consultation for every new client.",
      whatsapp: "WhatsApp", email: "Email",
      cta: "Start on WhatsApp — It's Free",
    },
    footer: { madeWith: "Developed by", passion: "MDigitalDev", rights: "MDigitalDev. All rights reserved.", privacyLink: "Privacy Policy", termsLink: "Terms of Service" },
  },

  /* ─────────────────── FRANÇAIS ─────────────────── */
  fr: {
    nav: {
      about: "À propos", whyMe: "Pourquoi moi", services: "Services",
      portfolio: "Démos", process: "Processus", contact: "Contact", cta: "Démarrer",
    },
    hero: {
      badge:  "Disponible pour de nouveaux projets",
      h1a:    "Propulser les",
      h1b:    "Entreprises avec",
      h1c:    "le Digital.",
      sub:    "Je crée des sites ultra-rapides et installables pour les restaurants, e-commerce, entreprises, santé et immobilier — avec la vitesse, le design et la tech qui vous démarquent.",
      cta1:   "Démarrer mon projet",
      cta2:   "Voir les démos",
      scroll: "Défiler",
      stats:  { projects: "Conversions", pagespeed: "Économies opérationnelles", revenue: "Installs PWA", response: "Hausse CA" },
    },
    about: {
      pill: "À propos", headline1: "L'Esprit Derrière la", headline2: "Transformation Digitale",
      bodyPre: "Je suis", name: "Mohamed",
      bodyMid: ", développeur Web & PWA spécialisé dans la création d'écosystèmes numériques haute performance pour les entreprises modernes. Je fais le lien entre",
      highlight: "des secteurs variés", bodyEnd: "et la technologie de pointe.",
      available: "Disponible pour des projets",
      stats: [
        { label: "100% PageSpeed",    desc: "Score Lighthouse parfait à chaque livraison" },
        { label: "Expert Next.js",    desc: "App Router, RSC & architectures edge" },
        { label: "Spécialiste UI/UX", desc: "Interfaces pixel-perfect qui convertissent" },
      ],
    },
    powerTrio: {
      label: "Le Trio Gagnant", headline1: "Trois Éléments qui Font",
      headline2: "Gagner les Entreprises en Ligne.",
      sub: "Chaque projet repose sur ces fondations — sans exception.",
      items: [
        {
          title: "Vitesse Éclair",
          desc: "Chargements en moins d'une seconde grâce à Next.js, CDN mondial et optimisation automatique des images. Des sites plus rapides = mieux classés = moins d'abandons.",
          bullets: ["Core Web Vitals optimisés", "CDN mondial", "Premier affichage < 1 s"],
        },
        {
          title: "Design Époustouflant",
          desc: "UI niveau Apple avec micro-animations, typographie sur mesure et maquettes conçues pour convertir. Chaque pixel justifie sa place sur chaque écran.",
          bullets: ["Responsive mobile-first", "Identité de marque sur mesure", "UX orientée conversion"],
        },
        {
          title: "App Installable (PWA)",
          desc: "Les clients ajoutent votre activité sur leur écran d'accueil — sans App Store. Contenu hors ligne, notifications push et accès instantané.",
          bullets: ["Installation écran d'accueil", "Contenu hors-ligne", "Notifications push"],
        },
      ],
    },
    services: {
      label: "Services & Tarifs", headline1: "Choisissez Votre", headline2: "Niveau de Croissance.",
      sub: "Tarifs transparents. Tous les packs incluent code propre, design mobile-first et support post-lancement.",
      footerNote: "Les prix sont des points de départ — le devis final dépend du périmètre.",
      estimate: "Obtenir un devis gratuit →", popular: "✦ Le Plus Populaire",
      items: [
        {
          tier: "Pack Starter", name: "Landing Page & Présence Digitale",
          desc: "Une landing page ultra-rapide et magnifique qui remplace les sites obsolètes et génère du trafic depuis Google — pour tout secteur d'activité.",
          features: ["Landing Page & Google Maps (80$) — page haute performance", "Contenu/Menu/Catalogue avec Photos (50$) — mise en page professionnelle", "SEO de base & Bouton WhatsApp (20$) — visibilité & contact direct", "⚡ Livraison en 24h"],
          cta: "Commencer", waMsg: "Bonjour Mohamed, je veux démarrer avec le Pack Starter pour mon activité.",
        },
        {
          tier: "Pack Pro", name: "Système Complet",
          desc: "Notre solution phare pour scaler les entreprises. Dashboard Admin Complet & Automatisation WhatsApp inclus — présence en ligne totale avec commandes/réservations, alertes et tout ce qu'il faut.",
          features: ["Pack Starter inclus (150$) — site web & fondation SEO", "Système de commande/réservation (450$) — panier & traitement avancé", "⭐ Dashboard Admin (500$) & Automatisation WhatsApp (200$)", "PWA & Système de réservation/planification (200$) — app mobile + booking", "⚡ Livraison en 3 jours"],
          cta: "Le Plus Populaire", waMsg: "Bonjour Mohamed, je suis intéressé par le Pack Pro pour développer mon activité.",
        },
        {
          tier: "Pack Ultimate", name: "Plateforme SaaS / Cloud",
          desc: "Pour les entreprises multi-établissements et les solutions SaaS. Plateformes cloud sur mesure avec gestion multi-sites, fidélité, analytics et architecture scalable.",
          features: ["Pack Pro complet (1 500$) — système core complet", "Gestion multi-établissements (1 200$) — tous vos sites depuis un tableau de bord", "Programme de fidélité & récompenses (800$) — coupons & points clients", "Analytics avancés (600$) — rapports ventes & comportements clients", "⭐ Support VIP dédié (700$) — mises à jour prioritaires & assistance 24/7", "⚡ Livraison en 1 semaine"],
          cta: "Parlons-en", waMsg: "Bonjour Mohamed, je veux l'expérience Ultimate pour mon entreprise.",
        },
      ],
    },
    portfolio: {
      label: "DÉMOS EN DIRECT", headline: "Les Capacités en Action.",
      sub: "Démos interactives présentant les systèmes que je construis. Cliquez sur une démo pour explorer un prototype fonctionnel.",
      filterAll: "Tout", filterRestaurants: "Restaurants",
      filterEcommerce: "E-commerce", filterCorporate: "Corporate",
      filterHealthcare: "Santé", filterRealEstate: "Immobilier",
      empty: "Aucune démo dans cette catégorie pour l'instant — revenez bientôt !", viewProject: "Voir la démo",
      labels: {
        client: "CLIENT", year: "ANNÉE", timeline: "DURÉE", category: "CATÉGORIE",
        challenge: "Le Défi", solution: "La Solution",
        aboutProject: "À propos de la démo", scopeOfWork: "Périmètre", whatWeBuilt: "Ce que nous avons construit",
        techSpecs: "Spécifications techniques", underTheHood: "Sous le capot",
        keyFeatures: "Fonctionnalités clés", everythingIncluded: "Tout inclus",
        impact: "Impact", realResults: "Résultats concrets",
        relatedProjects: "Vous pourriez aussi aimer", youMightAlsoLike: "Démos similaires",
        viewDemo: "Ouvrir la démo", comingSoon: "Bientôt disponible",
        comingSoonTitle: "Démo bientôt disponible",
        comingSoonDesc: "Cette démo interactive est en cours de construction. Demandez une réalisation similaire dès maintenant.",
        backToPortfolio: "Toutes les démos", viewAllProjects: "Voir toutes les démos",
        startOnWhatsApp: "Démarrer sur WhatsApp",
        requestBuild: "Demander une réalisation →",
        overview: "Aperçu", features: "Fonctionnalités", techStack: "Stack technique",
      },
    },
    industries: {
      label: "Secteurs", headline: "Pour Chaque Activité.", sub: "Des solutions spécialisées adaptées aux besoins uniques de chaque secteur.",
      items: [
        { name: "Restaurants & Hôtellerie",  desc: "Menus digitaux, commandes en ligne, réservations et PWA qui fidélisent les clients.", tags: ["Menu", "Commandes", "Réservations"] },
        { name: "E-commerce & Retail",       desc: "Boutiques en ligne à fort taux de conversion avec panier, paiement intégré et tableau de bord inventaire.", tags: ["Boutique", "Paiements", "Analytics"] },
        { name: "Corporate & Services",      desc: "Sites professionnels qui inspirent confiance, génèrent des leads et établissent l'autorité sur votre marché.", tags: ["Branding", "Leads", "SEO"] },
        { name: "Santé & Bien-être",         desc: "Systèmes de réservation conformes, portails patients et sites de cliniques qui inspirent confiance.", tags: ["Réservation", "Portails", "Confidentialité"] },
        { name: "Immobilier",                desc: "Vitrines de propriétés avec filtres avancés, visites virtuelles et capture de leads pour agents et agences.", tags: ["Annonces", "Filtres", "Cartes"] },
      ],
    },
    process: {
      label: "MA MÉTHODE", headline: "Un Processus Éprouvé, à Chaque Fois.",
      sub: "Du premier message au lancement — voici comment votre projet avance.",
      timeNote: "La plupart des projets sont lancés en 24 heures à 3 jours.",
      items: [
        {
          number: "01", title: "Découverte & Brief",
          desc: "On parle sur WhatsApp. Je comprends votre activité, vos objectifs et vos contraintes. Vous obtenez un périmètre clair et un prix fixe.",
        },
        {
          number: "02", title: "Design & Prototype",
          desc: "Je crée un design pixel-perfect sur Figma ou directement en code. Vous validez avant tout développement.",
        },
        {
          number: "03", title: "Développement & Intégration",
          desc: "Code Next.js propre, PWA-ready, SEO-optimisé. WhatsApp, paiements, tableaux de bord — intégrés à votre flux de travail.",
        },
        {
          number: "04", title: "Lancement & Support",
          desc: "Déployé sur CDN mondial rapide avec PageSpeed 100/100. Support post-lancement inclus — vous n'êtes jamais seul.",
        },
      ],
    },
    contact: {
      label: "Travaillons Ensemble", headline1: "Prêt à Avoir un Site Web",
      headline2: "qui Performe Vraiment ?",
      sub: "Discutons de votre projet. Je réponds dans les 24 h et offre une consultation gratuite à chaque nouveau client.",
      whatsapp: "WhatsApp", email: "E-mail",
      cta: "Démarrer sur WhatsApp — C'est Gratuit",
    },
    footer: { madeWith: "Développé par", passion: "MDigitalDev", rights: "MDigitalDev. Tous droits réservés.", privacyLink: "Politique de Confidentialité", termsLink: "Conditions d'Utilisation" },
  },

  /* ─────────────────── ARABIC ─────────────────── */
  ar: {
    nav: {
      about: "من أنا", whyMe: "لماذا أنا", services: "الخدمات",
      portfolio: "النماذج", process: "طريقة العمل", contact: "تواصل", cta: "ابدأ مشروعك",
    },
    hero: {
      badge:  "متاح لمشاريع جديدة",
      h1a:    "ارتقِ",
      h1b:    "بأعمالك مع",
      h1c:    "الحلول الرقمية.",
      sub:    "أبني مواقع ويب فائقة السرعة وجاهزة للتطبيقات للمطاعم والتجارة الإلكترونية والشركات والرعاية الصحية والعقارات — بالسرعة والتصميم والتقنية التي تميّزك.",
      cta1:   "ابدأ مشروعك",
      cta2:   "شاهد النماذج الحية",
      scroll: "انتقل",
      stats:  { projects: "معدل التحويل", pagespeed: "تخفيض التكاليف", revenue: "تثبيتات PWA", response: "نمو الإيرادات" },
    },
    about: {
      pill: "من أنا", headline1: "العقل وراء", headline2: "التحول الرقمي",
      bodyPre: "أنا", name: "محمد",
      bodyMid: "، مطوّر ويب و PWA متخصص في إنشاء أنظمة رقمية عالية الأداء للأعمال الحديثة. أجمع بين",
      highlight: "مختلف القطاعات", bodyEnd: "وأحدث تقنيات الويب.",
      available: "متاح للمشاريع",
      stats: [
        { label: "100% PageSpeed", desc: "درجة Lighthouse مثالية في كل تسليم" },
        { label: "خبير Next.js",   desc: "بنيات حديثة وجاهزة للحافة" },
        { label: "متخصص UI/UX",   desc: "واجهات احترافية تحقق نتائج حقيقية" },
      ],
    },
    powerTrio: {
      label: "الثلاثي القوي", headline1: "ثلاثة عوامل تجعل",
      headline2: "الأعمال تنجح على الإنترنت.",
      sub: "كل مشروع مبني على هذا الأساس — بدون استثناء.",
      items: [
        {
          title: "سرعة البرق",
          desc: "تحميل أقل من ثانية عبر التوليد الساكن في Next.js وشبكة CDN العالمية وتحسين الصور التلقائي. المواقع الأسرع تحتل مراتب أعلى وتحافظ على العملاء المحتملين.",
          bullets: ["مُحسَّن لـ Core Web Vitals", "توزيع CDN عالمي", "أقل من ثانية للعرض الأول"],
        },
        {
          title: "تصميم مذهل",
          desc: "واجهات بمستوى Apple مع رسوم متحركة دقيقة وطباعة مخصصة وتخطيطات مصممة للتحويل. كل بكسل يؤدي دوره على كل شاشة.",
          bullets: ["تصميم متجاوب مع الجوال أولاً", "هوية بصرية مخصصة", "تجربة مستخدم تحوّل الزوار"],
        },
        {
          title: "تطبيق قابل للتثبيت (PWA)",
          desc: "يضيف العملاء نشاطك التجاري على شاشتهم الرئيسية دون الحاجة لمتجر التطبيقات. محتوى بدون إنترنت وإشعارات فورية ووصول دائم.",
          bullets: ["تثبيت على الشاشة الرئيسية", "محتوى بدون إنترنت", "إشعارات فورية"],
        },
      ],
    },
    services: {
      label: "الخدمات والأسعار", headline1: "اختر", headline2: "مستوى نموك.",
      sub: "أسعار شفافة. جميع الباقات تشمل كوداً نظيفاً وتصميماً يُقدِّم الجوال أولاً ودعماً ما بعد الإطلاق.",
      footerNote: "الأسعار نقطة انطلاق — السعر النهائي يعتمد على نطاق المشروع.",
      estimate: "احصل على تقدير مجاني ←", popular: "✦ الأكثر طلباً",
      items: [
        {
          tier: "الباقة الأساسية", name: "صفحة هبوط وحضور رقمي",
          desc: "صفحة هبوط سريعة وجميلة تحل محل المواقع القديمة وتجذب الزيارات من Google — لأي قطاع.",
          features: ["صفحة الهبوط وخرائط Google ($80) — صفحة واحدة عالية الأداء", "المحتوى/القائمة/الكتالوج بالصور ($50) — تصميم احترافي", "SEO الأساسي وزر واتساب ($20) — ظهور في البحث وتواصل مباشر", "⚡ تسليم في 24 ساعة"],
          cta: "ابدأ الآن", waMsg: "مرحباً محمد، أريد البدء بالباقة الأساسية لأعمالي.",
        },
        {
          tier: "الباقة الاحترافية", name: "نظام أعمال متكامل",
          desc: "حلنا الأساسي لتطوير الأعمال. لوحة تحكم كاملة وأتمتة واتساب — حضور إلكتروني شامل مع الطلبات/الحجوزات والتنبيهات وكل ما تحتاجه الأعمال الحديثة.",
          features: ["الباقة الأساسية مُدرجة ($150) — موقع كامل وأساسيات SEO", "نظام الطلب الإلكتروني ($450) — سلة متقدمة ومعالجة الطلبات", "⭐ لوحة التحكم ($500) وأتمتة واتساب ($200)", "تطبيق PWA ونظام الحجز ($200) — تجربة موبايل وحجوزات", "⚡ تسليم في 3 أيام"],
          cta: "الأكثر طلباً", waMsg: "مرحباً محمد، أنا مهتم بالباقة الاحترافية لتطوير أعمالي.",
        },
        {
          tier: "الباقة المتميزة", name: "منصة SaaS / سحابية",
          desc: "للمؤسسات متعددة الفروع وحلول SaaS. منصات سحابية مخصصة بإدارة متعددة المواقع وبرامج الولاء والتحليلات المتقدمة.",
          features: ["الباقة الاحترافية الكاملة ($1,500) — النظام الأساسي الشامل", "إدارة متعددة الفروع ($1,200) — إدارة جميع مواقعك من لوحة واحدة", "نظام الولاء والمكافآت ($800) — كوبونات تلقائية ونقاط العملاء", "التحليلات المتقدمة ($600) — تقارير المبيعات وسلوك العملاء", "⭐ دعم VIP مخصص ($700) — تحديثات ذات أولوية ومساعدة 24/7", "⚡ تسليم في أسبوع واحد"],
          cta: "تحدث معنا", waMsg: "مرحباً محمد، أريد الباقة المتميزة لأعمالي.",
        },
      ],
    },
    portfolio: {
      label: "نماذج حية", headline: "القدرات في تطبيق فعلي.",
      sub: "نماذج تفاعلية تُبرز الأنظمة التي أبنيها. اضغط على أي نموذج لاستكشاف نموذج وظيفي متكامل.",
      filterAll: "الكل", filterRestaurants: "مطاعم",
      filterEcommerce: "تجارة إلكترونية", filterCorporate: "شركات",
      filterHealthcare: "صحة", filterRealEstate: "عقارات",
      empty: "لا توجد نماذج في هذه الفئة بعد — تابعنا قريباً!", viewProject: "شاهد النموذج",
      labels: {
        client: "العميل", year: "السنة", timeline: "المدة", category: "الفئة",
        challenge: "التحدي", solution: "الحل",
        aboutProject: "عن النموذج", scopeOfWork: "نطاق العمل", whatWeBuilt: "ما بنيناه",
        techSpecs: "المواصفات التقنية", underTheHood: "تحت الغطاء",
        keyFeatures: "الميزات الرئيسية", everythingIncluded: "كل شيء مشمول",
        impact: "التأثير", realResults: "نتائج حقيقية",
        relatedProjects: "قد يعجبك أيضاً", youMightAlsoLike: "نماذج مشابهة",
        viewDemo: "افتح النموذج الحي", comingSoon: "قريباً",
        comingSoonTitle: "النموذج قريباً",
        comingSoonDesc: "هذا النموذج التفاعلي قيد البناء حالياً. اطلب مشروعاً مشابهاً لأعمالك الآن.",
        backToPortfolio: "كل النماذج", viewAllProjects: "عرض جميع النماذج",
        startOnWhatsApp: "ابدأ عبر واتساب",
        requestBuild: "طلب مشروع مشابه ←",
        overview: "نظرة عامة", features: "الميزات", techStack: "التقنيات المستخدمة",
      },
    },
    industries: {
      label: "القطاعات", headline: "لكل نوع من الأعمال.", sub: "حلول متخصصة مصممة للاحتياجات الفريدة لكل قطاع.",
      items: [
        { name: "المطاعم والضيافة",   desc: "قوائم رقمية وطلبات إلكترونية وحجوزات وتطبيقات PWA تحوّل الزوار إلى عملاء دائمين.", tags: ["القائمة", "الطلبات", "الحجوزات"] },
        { name: "التجارة الإلكترونية", desc: "متاجر إلكترونية عالية التحويل بأنظمة سلة وتكامل دفع ولوحات تحكم للمخزون.",         tags: ["المتجر", "الدفع", "التحليلات"] },
        { name: "الشركات والخدمات",   desc: "مواقع احترافية تبني الثقة وتولّد العملاء المحتملين وترسّخ السلطة في سوقك.",        tags: ["الهوية", "العملاء", "SEO"]      },
        { name: "الصحة والعافية",      desc: "أنظمة حجز آمنة وبوابات مرضى ومواقع عيادات تُلهم الثقة والطمأنينة.",              tags: ["الحجز", "البوابات", "الخصوصية"]  },
        { name: "العقارات",            desc: "واجهات عقارية بفلاتر متقدمة وجولات افتراضية وأدوات جذب العملاء للوكلاء والشركات.",  tags: ["الإعلانات", "الفلاتر", "الخرائط"] },
      ],
    },
    process: {
      label: "طريقة عملي", headline: "عملية مثبتة، في كل مرة.",
      sub: "من أول رسالة إلى الإطلاق — هكذا يتقدّم مشروعك.",
      timeNote: "معظم المشاريع تُطلق خلال 24 ساعة إلى 3 أيام.",
      items: [
        {
          number: "01", title: "الاستكشاف والملخص",
          desc: "نتحدث عبر واتساب. أفهم عملك وأهدافك وقيودك. تحصل على نطاق واضح وسعر ثابت.",
        },
        {
          number: "02", title: "التصميم والنموذج الأولي",
          desc: "أصمم تصميماً دقيقاً في Figma أو مباشرة في الكود. تراجع وتوافق قبل أي تطوير.",
        },
        {
          number: "03", title: "البناء والدمج",
          desc: "كود Next.js نظيف، جاهز PWA، محسّن SEO. واتساب، مدفوعات، لوحات تحكم — مدمجة لتناسب سير عملك.",
        },
        {
          number: "04", title: "الإطلاق والدعم",
          desc: "النشر على CDN عالمي سريع مع سرعة 100/100. دعم ما بعد الإطلاق مشمول — لن تكون وحيداً.",
        },
      ],
    },
    contact: {
      label: "لنعمل معاً", headline1: "هل أنت مستعد للحصول على موقع",
      headline2: "يحقق نتائج حقيقية؟",
      sub: "دعنا نناقش مشروعك. أرد خلال 24 ساعة وأقدم استشارة مجانية لكل عميل جديد.",
      whatsapp: "واتساب", email: "البريد الإلكتروني",
      cta: "ابدأ عبر واتساب — مجاناً",
    },
    footer: { madeWith: "طُوِّر بواسطة", passion: "MDigitalDev", rights: "MDigitalDev. جميع الحقوق محفوظة.", privacyLink: "سياسة الخصوصية", termsLink: "شروط الخدمة" },
  },
};
