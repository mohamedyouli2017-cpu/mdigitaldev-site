export type Lang = "en" | "fr" | "ar";

export interface LangTranslations {
  nav: {
    about: string; whyMe: string; services: string;
    portfolio: string; contact: string; cta: string;
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
  portfolio: {
    label: string; headline: string; sub: string;
    filterAll: string; filterRestaurants: string; filterServices: string;
    empty: string; viewProject: string;
  };
  testimonials: {
    label: string; headline: string;
    items: { text: string }[];
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
      portfolio: "Portfolio", contact: "Contact", cta: "Start Project",
    },
    hero: {
      badge:  "Available for New Projects",
      h1a:    "Elevating Dining",
      h1b:    "Experiences with",
      h1c:    "Digital Solutions.",
      sub:    "I build blazing-fast, PWA-ready websites for restaurants that turn visitors into loyal customers — with speed, design, and tech that sets you apart.",
      cta1:   "Start Your Project",
      cta2:   "View Portfolio",
      scroll: "Scroll",
      stats:  { projects: "Online Orders", pagespeed: "Printing Savings", revenue: "PWA Installs", response: "Revenue Lift" },
    },
    about: {
      pill: "About Me", headline1: "The Mind Behind the", headline2: "Digital Transformation",
      bodyPre: "I'm", name: "Mohamed",
      bodyMid: ", a Web & PWA Developer specialized in creating high-performance digital ecosystems for the modern restaurant industry. I bridge the gap between",
      highlight: "gourmet hospitality", bodyEnd: "and cutting-edge tech.",
      available: "Available for projects",
      stats: [
        { label: "100% PageSpeed",   desc: "Lighthouse perfect score on every delivery" },
        { label: "Next.js Expert",   desc: "App Router, RSC & edge-ready architectures" },
        { label: "UI/UX Specialist", desc: "Pixel-perfect interfaces that convert" },
      ],
    },
    powerTrio: {
      label: "The Power Trio", headline1: "Three Things That Make",
      headline2: "Restaurants Win Online.",
      sub: "Every project is built on this foundation — no exceptions.",
      items: [
        {
          title: "Lightning Speed",
          desc: "Sub-second loads via Next.js static generation, edge CDN, and automatic image optimisation. Faster sites rank higher and keep hungry guests from bouncing.",
          bullets: ["Core Web Vitals optimised", "Edge-cached globally", "< 1 s first paint"],
        },
        {
          title: "Stunning Design",
          desc: "Apple-grade UI with micro-animations, custom typography, and layouts engineered to convert. Every pixel earns its place on every screen.",
          bullets: ["Mobile-first responsive", "Custom brand identity", "Conversion-focused UX"],
        },
        {
          title: "Installable App (PWA)",
          desc: "Customers add your restaurant to their home screen — no App Store needed. Offline menus, push notifications, and instant access keep you top-of-mind.",
          bullets: ["Home screen install", "Offline-capable menu", "Push notifications"],
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
          tier: "Starter Pack", name: "Digital Menu & Landing Page",
          desc: "A blazing-fast, beautifully designed landing page with a digital menu that replaces printed cards and drives foot traffic from Google.",
          features: ["Landing Page & Google Maps ($80) — high-performance single page", "Digital Menu with Photos ($50) — professional menu layout", "Basic SEO & WhatsApp Button ($20) — visibility & direct contact", "⚡ 24-Hour Delivery"],
          cta: "Get Started", waMsg: "Hello Mohamed, I want to start with the Starter Pack for my restaurant.",
        },
        {
          tier: "Professional Pack", name: "Full Restaurant System",
          desc: "Our core solution for scaling restaurants. Full Admin Dashboard & WhatsApp Automation included — complete online presence with ordering, alerts, reservations, and everything a modern restaurant needs.",
          features: ["Starter Pack Inclusion ($150) — full website & SEO foundation", "Online Ordering System ($450) — advanced cart & order processing", "⭐ Admin Dashboard ($500) & WhatsApp Automation ($200)", "PWA & Reservation System ($200) — mobile app + booking", "⚡ 3-Day Delivery"],
          cta: "Most Popular", waMsg: "Hello Mohamed, I'm interested in the Professional Pack to grow my business.",
        },
        {
          tier: "Ultimate Pack", name: "SaaS / Cloud Platform",
          desc: "For multi-branch enterprises and SaaS solutions. Custom cloud platforms with multi-branch management, loyalty programs, analytics dashboards, and fully scalable architecture for ambitious brands.",
          features: ["Full Professional Pack ($1,500) — complete core system", "Multi-branch Management ($1,200) — manage all locations from one dashboard", "Loyalty & Rewards System ($800) — automated coupons & customer points", "Advanced Analytics ($600) — sales reports & customer behavior insights", "⭐ Dedicated VIP Support ($700) — priority updates & 24/7 assistance", "⚡ 1-Week Delivery"],
          cta: "Let's Talk", waMsg: "Hello Mohamed, I want the full Ultimate Experience for my restaurant brand.",
        },
      ],
    },
    portfolio: {
      label: "Portfolio", headline: "Recent Work.",
      sub: "Every project is crafted with precision, purpose, and performance as the north star.",
      filterAll: "All", filterRestaurants: "Restaurants", filterServices: "Services",
      empty: "No projects in this category yet — check back soon!", viewProject: "View Project",
    },
    testimonials: {
      label: "Social Proof", headline: "What Clients Say.",
      items: [
        { text: "Our online orders increased by +35% in the first month. The site loads instantly and customers love the app experience." },
        { text: "Mohamed delivered in under a week. The design is stunning and our Google ranking jumped immediately after launch." },
        { text: "The multi-branch dashboard saved us hours every week. Absolutely worth every dirham." },
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
      portfolio: "Portfolio", contact: "Contact", cta: "Démarrer",
    },
    hero: {
      badge:  "Disponible pour de nouveaux projets",
      h1a:    "Sublimer les Expériences",
      h1b:    "Culinaires avec",
      h1c:    "le Digital.",
      sub:    "Je crée des sites ultra-rapides et installables pour les restaurants qui transforment les visiteurs en clients fidèles — avec la vitesse, le design et la tech qui vous démarquent.",
      cta1:   "Démarrer mon projet",
      cta2:   "Voir le portfolio",
      scroll: "Défiler",
      stats:  { projects: "Commandes en ligne", pagespeed: "Économies impression", revenue: "Installs PWA", response: "Hausse CA" },
    },
    about: {
      pill: "À propos", headline1: "L'Esprit Derrière la", headline2: "Transformation Digitale",
      bodyPre: "Je suis", name: "Mohamed",
      bodyMid: ", développeur Web & PWA spécialisé dans la création d'écosystèmes numériques haute performance pour la restauration moderne. Je fais le lien entre",
      highlight: "la gastronomie de luxe", bodyEnd: "et la technologie de pointe.",
      available: "Disponible pour des projets",
      stats: [
        { label: "100% PageSpeed",    desc: "Score Lighthouse parfait à chaque livraison" },
        { label: "Expert Next.js",    desc: "App Router, RSC & architectures edge" },
        { label: "Spécialiste UI/UX", desc: "Interfaces pixel-perfect qui convertissent" },
      ],
    },
    powerTrio: {
      label: "Le Trio Gagnant", headline1: "Trois Éléments qui Font",
      headline2: "Gagner les Restaurants en Ligne.",
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
          desc: "Les clients ajoutent votre restaurant sur leur écran d'accueil — sans App Store. Menus hors ligne, notifications push et accès instantané.",
          bullets: ["Installation écran d'accueil", "Menu hors-ligne", "Notifications push"],
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
          tier: "Pack Starter", name: "Menu Digital & Landing Page",
          desc: "Une landing page ultra-rapide et magnifique avec un menu digital qui remplace les cartes imprimées et génère du trafic depuis Google.",
          features: ["Landing Page & Google Maps (80$) — page haute performance", "Menu Digital avec Photos (50$) — mise en page professionnelle", "SEO de base & Bouton WhatsApp (20$) — visibilité & contact direct", "⚡ Livraison en 24h"],
          cta: "Commencer", waMsg: "Bonjour Mohamed, je veux démarrer avec le Pack Starter pour mon restaurant.",
        },
        {
          tier: "Pack Pro", name: "Système Restaurant Complet",
          desc: "Notre solution phare pour scaler les restaurants. Dashboard Admin Complet & Automatisation WhatsApp inclus — présence en ligne totale avec commandes, alertes et réservations.",
          features: ["Pack Starter inclus (150$) — site web & fondation SEO", "Système de commande en ligne (450$) — panier & traitement des commandes", "⭐ Dashboard Admin (500$) & Automatisation WhatsApp (200$)", "PWA & Système de réservation (200$) — app mobile + booking", "⚡ Livraison en 3 jours"],
          cta: "Le Plus Populaire", waMsg: "Bonjour Mohamed, je suis intéressé par le Pack Pro pour développer mon activité.",
        },
        {
          tier: "Pack Ultimate", name: "Plateforme SaaS / Cloud",
          desc: "Pour les entreprises multi-établissements et les solutions SaaS. Plateformes cloud sur mesure avec gestion multi-sites, fidélité, analytics et architecture scalable pour les grandes enseignes.",
          features: ["Pack Pro complet (1 500$) — système core complet", "Gestion multi-établissements (1 200$) — tous vos sites depuis un tableau de bord", "Programme de fidélité & récompenses (800$) — coupons & points clients", "Analytics avancés (600$) — rapports ventes & comportements clients", "⭐ Support VIP dédié (700$) — mises à jour prioritaires & assistance 24/7", "⚡ Livraison en 1 semaine"],
          cta: "Parlons-en", waMsg: "Bonjour Mohamed, je veux l'expérience Ultimate pour ma marque de restauration.",
        },
      ],
    },
    portfolio: {
      label: "Portfolio", headline: "Travaux Récents.",
      sub: "Chaque projet est conçu avec précision, intention et performance comme étoile du nord.",
      filterAll: "Tout", filterRestaurants: "Restaurants", filterServices: "Services",
      empty: "Aucun projet dans cette catégorie pour l'instant — revenez bientôt !", viewProject: "Voir le projet",
    },
    testimonials: {
      label: "Témoignages", headline: "Ce que Disent les Clients.",
      items: [
        { text: "Nos commandes en ligne ont augmenté de +35 % dès le premier mois. Le site charge instantanément et les clients adorent l'expérience application." },
        { text: "Mohamed a livré en moins d'une semaine. Le design est superbe et notre classement Google a grimpé immédiatement après le lancement." },
        { text: "Le tableau de bord multi-établissements nous a fait gagner des heures chaque semaine. Absolument rentable." },
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
      portfolio: "أعمالي", contact: "تواصل", cta: "ابدأ مشروعك",
    },
    hero: {
      badge:  "متاح لمشاريع جديدة",
      h1a:    "ارتقِ بتجربة",
      h1b:    "الطعام مع",
      h1c:    "الحلول الرقمية.",
      sub:    "أبني مواقع ويب فائقة السرعة وجاهزة للتطبيقات للمطاعم تحوّل الزوار إلى عملاء أوفياء — بالسرعة والتصميم والتقنية التي تميّزك.",
      cta1:   "ابدأ مشروعك",
      cta2:   "استعرض أعمالي",
      scroll: "انتقل",
      stats:  { projects: "الطلبات الإلكترونية", pagespeed: "توفير في الطباعة", revenue: "تثبيتات PWA", response: "نمو الإيرادات" },
    },
    about: {
      pill: "من أنا", headline1: "العقل وراء", headline2: "التحول الرقمي",
      bodyPre: "أنا", name: "محمد",
      bodyMid: "، مطوّر ويب و PWA متخصص في إنشاء أنظمة رقمية عالية الأداء لصناعة المطاعم. أجمع بين",
      highlight: "فن الضيافة الراقية", bodyEnd: "وأحدث تقنيات الويب.",
      available: "متاح للمشاريع",
      stats: [
        { label: "100% PageSpeed", desc: "درجة Lighthouse مثالية في كل تسليم" },
        { label: "خبير Next.js",   desc: "بنيات حديثة وجاهزة للحافة" },
        { label: "متخصص UI/UX",   desc: "واجهات احترافية تحقق نتائج حقيقية" },
      ],
    },
    powerTrio: {
      label: "الثلاثي القوي", headline1: "ثلاثة عوامل تجعل",
      headline2: "المطاعم تنجح على الإنترنت.",
      sub: "كل مشروع مبني على هذا الأساس — بدون استثناء.",
      items: [
        {
          title: "سرعة البرق",
          desc: "تحميل أقل من ثانية عبر التوليد الساكن في Next.js وشبكة CDN العالمية وتحسين الصور التلقائي. المواقع الأسرع تحتل مراتب أعلى وتحافظ على الزوار.",
          bullets: ["مُحسَّن لـ Core Web Vitals", "توزيع CDN عالمي", "أقل من ثانية للعرض الأول"],
        },
        {
          title: "تصميم مذهل",
          desc: "واجهات بمستوى Apple مع رسوم متحركة دقيقة وطباعة مخصصة وتخطيطات مصممة للتحويل. كل بكسل يؤدي دوره على كل شاشة.",
          bullets: ["تصميم متجاوب مع الجوال أولاً", "هوية بصرية مخصصة", "تجربة مستخدم تحوّل الزوار"],
        },
        {
          title: "تطبيق قابل للتثبيت (PWA)",
          desc: "يضيف العملاء مطعمك على شاشتهم الرئيسية دون الحاجة لمتجر التطبيقات. قوائم بدون إنترنت وإشعارات فورية وصول دائم.",
          bullets: ["تثبيت على الشاشة الرئيسية", "قائمة طعام بدون إنترنت", "إشعارات فورية"],
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
          tier: "الباقة الأساسية", name: "قائمة رقمية وصفحة هبوط",
          desc: "صفحة هبوط سريعة وجميلة مع قائمة طعام رقمية تحل محل البطاقات المطبوعة وتجذب الزيارات من Google.",
          features: ["صفحة الهبوط وخرائط Google ($80) — صفحة واحدة عالية الأداء", "قائمة طعام رقمية بالصور ($50) — تصميم احترافي للقائمة", "SEO الأساسي وزر واتساب ($20) — ظهور في البحث وتواصل مباشر", "⚡ تسليم في 24 ساعة"],
          cta: "ابدأ الآن", waMsg: "مرحباً محمد، أريد البدء بالباقة الأساسية لمطعمي.",
        },
        {
          tier: "الباقة الاحترافية", name: "نظام مطعم متكامل",
          desc: "حلنا الأساسي لتطوير المطاعم. لوحة تحكم كاملة وأتمتة واتساب — حضور إلكتروني شامل مع الطلبات والتنبيهات والحجوزات.",
          features: ["الباقة الأساسية مُدرجة ($150) — موقع كامل وأساسيات SEO", "نظام الطلب الإلكتروني ($450) — سلة متقدمة ومعالجة الطلبات", "⭐ لوحة التحكم ($500) وأتمتة واتساب ($200)", "تطبيق PWA ونظام الحجز ($200) — تجربة موبايل وحجوزات", "⚡ تسليم في 3 أيام"],
          cta: "الأكثر طلباً", waMsg: "مرحباً محمد، أنا مهتم بالباقة الاحترافية لتطوير أعمالي.",
        },
        {
          tier: "الباقة المتميزة", name: "منصة SaaS / سحابية",
          desc: "للمؤسسات متعددة الفروع وحلول SaaS. منصات سحابية مخصصة بإدارة متعددة المواقع وبرامج الولاء والتحليلات المتقدمة.",
          features: ["الباقة الاحترافية الكاملة ($1,500) — النظام الأساسي الشامل", "إدارة متعددة الفروع ($1,200) — إدارة جميع مواقعك من لوحة واحدة", "نظام الولاء والمكافآت ($800) — كوبونات تلقائية ونقاط العملاء", "التحليلات المتقدمة ($600) — تقارير المبيعات وسلوك العملاء", "⭐ دعم VIP مخصص ($700) — تحديثات ذات أولوية ومساعدة 24/7", "⚡ تسليم في أسبوع واحد"],
          cta: "تحدث معنا", waMsg: "مرحباً محمد، أريد الباقة المتميزة لعلامتي التجارية.",
        },
      ],
    },
    portfolio: {
      label: "أعمالي", headline: "أحدث المشاريع.",
      sub: "كل مشروع مُصمَّم بدقة وهدف وأداء كمحور رئيسي.",
      filterAll: "الكل", filterRestaurants: "مطاعم", filterServices: "خدمات",
      empty: "لا توجد مشاريع في هذه الفئة بعد — تابعنا قريباً!", viewProject: "عرض المشروع",
    },
    testimonials: {
      label: "آراء العملاء", headline: "ماذا يقول عملاؤنا.",
      items: [
        { text: "ارتفعت طلباتنا الإلكترونية بنسبة 35%+ في الشهر الأول. الموقع يعمل بسرعة فائقة والعملاء يعشقون تجربة التطبيق." },
        { text: "أنجز محمد المشروع في أقل من أسبوع. التصميم رائع وقفز ترتيبنا في Google فور الإطلاق." },
        { text: "لوحة التحكم متعددة الفروع وفّرت علينا ساعات كل أسبوع. تستحق كل درهم." },
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
