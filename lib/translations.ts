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
      ctaTitle1: string; ctaTitle2: string; ctaSub: string;
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
      h1a:    "Scale Your",
      h1b:    "Business with",
      h1c:    "AI-Powered Automation.",
      sub:    "We build intelligent AI Agents and seamless workflows to automate your operations 24/7.",
      cta1:   "Start Your Project",
      cta2:   "View Live Demos",
      scroll: "Scroll",
      stats:  { projects: "AI Agents Built", pagespeed: "Automations Live", revenue: "Operations Saved", response: "Powered by AI" },
    },
    about: {
      pill: "About the Agency", headline1: "The Mind Behind the", headline2: "Digital Transformation",
      bodyPre: "Led by", name: "Mohamed",
      bodyMid: ", MDigitalDev is a premier AI & Automation Agency powered by a team of specialized developers and AI experts. Our agency",
      highlight: "empowers businesses", bodyEnd: "with intelligent automation, AI Agents, and high-performance web apps.",
      available: "Now Accepting Clients",
      stats: [
        { label: "Agency Standards",  desc: "100/100 Lighthouse score on every delivery" },
        { label: "Advanced Tech Stack", desc: "Scalable and secure architectures tailored for modern business needs." },
        { label: "Innovation Hub",    desc: "Blending creative design with AI to transform your digital presence." },
      ],
    },
    powerTrio: {
      label: "The Power Trio", headline1: "Three Things That Make",
      headline2: "Businesses Win Online.",
      sub: "Every project is built on this foundation — no exceptions.",
      items: [
        {
          title: "Intelligent Performance",
          desc: "AI-optimized systems that deliver results faster and more accurately than traditional methods.",
          bullets: ["AI-optimized workflows", "Real-time processing", "Consistent, accurate results"],
        },
        {
          title: "Strategic Automation",
          desc: "Custom workflows designed to eliminate repetitive tasks and scale your operations 24/7.",
          bullets: ["24/7 automated operations", "Eliminate manual tasks", "Scale without limits"],
        },
        {
          title: "Seamless Integration",
          desc: "We connect advanced AI models into your existing business tools for a unified digital ecosystem.",
          bullets: ["Connects to existing tools", "Unified digital ecosystem", "Zero disruption setup"],
        },
      ],
    },
    services: {
      label: "Services & Pricing", headline1: "Choose Your", headline2: "Automation Level.",
      sub: "Transparent pricing. All tiers include custom AI setup, seamless integrations, and post-launch support.",
      footerNote: "Prices are starting points — final quote depends on scope.",
      estimate: "Get a free estimate →", popular: "✦ Most Popular",
      items: [
        {
          tier: "Agent Pack", name: "Custom AI Agent",
          desc: "A purpose-built AI Agent that handles customer inquiries, lead capture, and FAQs — 24/7, without human intervention.",
          features: ["AI Chatbot & Lead Capture ($80) — responds to customers automatically", "WhatsApp & Web Integration ($50) — deploy on every channel", "Custom Knowledge Base ($20) — trained on your business data", "⚡ 48-Hour Delivery"],
          cta: "Get Started", waMsg: "Hello Mohamed, I want a Custom AI Agent for my business.",
        },
        {
          tier: "Automation Pack", name: "Workflow Automation (Make / Zapier)",
          desc: "End-to-end automation of your core business operations. Connect your apps, eliminate manual tasks, and let AI handle follow-ups automatically.",
          features: ["Custom AI Agent included ($150) — chatbot & lead capture foundation", "Make / Zapier Workflows ($450) — automated triggers & multi-app connections", "⭐ CRM Integration & Auto Follow-ups ($500) — never miss a lead again", "Real-time Dashboard ($200) — monitor every automation live", "⚡ 3-Day Delivery"],
          cta: "Most Popular", waMsg: "Hello Mohamed, I'm interested in Workflow Automation for my business.",
        },
        {
          tier: "Growth Pack", name: "AI-Enhanced Web App",
          desc: "A full-stack web application with embedded AI automation — intelligent booking, smart recommendations, and predictive workflows that scale with your business.",
          features: ["Full Automation Pack included ($1,500) — complete workflow foundation", "AI-Powered Next.js Web App ($1,200) — blazing-fast & automation-ready", "Smart Booking & Scheduling ($800) — AI handles appointments autonomously", "Predictive Analytics ($600) — AI insights on customer behavior & revenue", "⭐ Dedicated AI Support ($700) — priority updates & 24/7 AI monitoring", "⚡ 1-Week Delivery"],
          cta: "Let's Talk", waMsg: "Hello Mohamed, I want the full AI-Enhanced Web App for my business.",
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
        ctaTitle1: "Ready to Build Something",
        ctaTitle2: "Like This?",
        ctaSub: "Free consultation. I respond within 24 hours.",
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
      h1a:    "Propulsez votre",
      h1b:    "entreprise avec",
      h1c:    "l'automatisation IA.",
      sub:    "Nous concevons des agents IA intelligents et des flux de travail automatisés pour automatiser vos opérations 24h/24.",
      cta1:   "Démarrer mon projet",
      cta2:   "Voir les démos",
      scroll: "Défiler",
      stats:  { projects: "Agents IA créés", pagespeed: "Automations actives", revenue: "Opérations sauvées", response: "Propulsé par IA" },
    },
    about: {
      pill: "L'Agence", headline1: "L'Esprit Derrière la", headline2: "Transformation Digitale",
      bodyPre: "Dirigée par", name: "Mohamed",
      bodyMid: ", MDigitalDev est une agence IA & Automatisation de premier plan, portée par une équipe de développeurs spécialisés et d'experts IA. Notre agence",
      highlight: "propulse les entreprises", bodyEnd: "avec des automatisations intelligentes, des agents IA et des apps web haute performance.",
      available: "Accepte de nouveaux clients",
      stats: [
        { label: "Normes Agence",         desc: "Score Lighthouse 100/100 à chaque livraison" },
        { label: "Technologies de Pointe", desc: "Des architectures évolutives et sécurisées adaptées aux besoins modernes." },
        { label: "Pôle d'Innovation",     desc: "Allier design créatif et IA pour transformer votre présence numérique." },
      ],
    },
    powerTrio: {
      label: "Le Trio Gagnant", headline1: "Trois Éléments qui Font",
      headline2: "Gagner les Entreprises en Ligne.",
      sub: "Chaque projet repose sur ces fondations — sans exception.",
      items: [
        {
          title: "Performance Intelligente",
          desc: "Des systèmes optimisés par l'IA qui livrent des résultats plus vite et précisément que les méthodes traditionnelles.",
          bullets: ["Flux de travail optimisés par l'IA", "Traitement en temps réel", "Résultats précis et constants"],
        },
        {
          title: "Automatisation Stratégique",
          desc: "Des workflows personnalisés conçus pour éliminer les tâches répétitives et faire évoluer vos opérations 24h/24.",
          bullets: ["Opérations automatisées 24h/24", "Éliminer les tâches manuelles", "Scalabilité sans limites"],
        },
        {
          title: "Intégration Transparente",
          desc: "Nous connectons des modèles IA avancés à vos outils existants pour un écosystème numérique unifié.",
          bullets: ["Connexion aux outils existants", "Écosystème numérique unifié", "Mise en place sans interruption"],
        },
      ],
    },
    services: {
      label: "Services & Tarifs", headline1: "Choisissez Votre", headline2: "Niveau d'Automatisation.",
      sub: "Tarifs transparents. Tous les packs incluent une configuration IA sur mesure, des intégrations fluides et un support post-lancement.",
      footerNote: "Les prix sont des points de départ — le devis final dépend du périmètre.",
      estimate: "Obtenir un devis gratuit →", popular: "✦ Le Plus Populaire",
      items: [
        {
          tier: "Pack Agent", name: "Agent IA Personnalisé",
          desc: "Un agent IA sur mesure qui gère les demandes clients, la capture de leads et les FAQ — 24h/24, sans intervention humaine.",
          features: ["Chatbot IA & Capture de leads (80$) — répond automatiquement", "Intégration WhatsApp & Web (50$) — déployé sur tous vos canaux", "Base de connaissances personnalisée (20$) — formée sur vos données métier", "⚡ Livraison en 48h"],
          cta: "Commencer", waMsg: "Bonjour Mohamed, je veux un Agent IA personnalisé pour mon activité.",
        },
        {
          tier: "Pack Automatisation", name: "Automatisation des flux (Make / Zapier)",
          desc: "Automatisation de bout en bout de vos opérations clés. Connectez vos apps, éliminez les tâches manuelles et laissez l'IA gérer les relances.",
          features: ["Agent IA inclus (150$) — chatbot & capture de leads", "Workflows Make / Zapier (450$) — déclencheurs automatiques & connexions multi-apps", "⭐ Intégration CRM & relances automatiques (500$) — ne ratez plus aucun lead", "Dashboard temps réel (200$) — surveillez chaque automatisation en direct", "⚡ Livraison en 3 jours"],
          cta: "Le Plus Populaire", waMsg: "Bonjour Mohamed, je suis intéressé par l'Automatisation des flux pour mon activité.",
        },
        {
          tier: "Pack Croissance", name: "Application Web propulsée par l'IA",
          desc: "Une application web full-stack avec IA intégrée — réservation intelligente, recommandations et flux prédictifs qui évoluent avec votre entreprise.",
          features: ["Pack Automatisation complet (1 500$) — socle complet", "App Next.js propulsée IA (1 200$) — ultra-rapide & prête à l'automatisation", "Réservation intelligente (800$) — l'IA gère vos rendez-vous de façon autonome", "Analytics prédictifs (600$) — insights sur le comportement client & revenus", "⭐ Support IA dédié (700$) — mises à jour prioritaires & surveillance 24/7", "⚡ Livraison en 1 semaine"],
          cta: "Parlons-en", waMsg: "Bonjour Mohamed, je veux l'App Web IA complète pour mon entreprise.",
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
        ctaTitle1: "Prêt à Créer Quelque Chose",
        ctaTitle2: "Comme Ça ?",
        ctaSub: "Consultation gratuite. Je réponds en 24 heures.",
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
      h1a:    "ضاعف إنتاجية",
      h1b:    "عملك عبر",
      h1c:    "أتمتة الذكاء الاصطناعي.",
      sub:    "بناء وكلاء ذكاء اصطناعي وأنظمة أتمتة تعمل لخدمتك على مدار الساعة.",
      cta1:   "ابدأ مشروعك",
      cta2:   "شاهد النماذج الحية",
      scroll: "انتقل",
      stats:  { projects: "وكلاء ذكاء اصطناعي", pagespeed: "أتمتة نشطة", revenue: "عمليات موفّرة", response: "مدعوم بالذكاء الاصطناعي" },
    },
    about: {
      pill: "عن الوكالة", headline1: "العقل وراء", headline2: "التحول الرقمي",
      bodyPre: "بقيادة", name: "محمد",
      bodyMid: "، MDigitalDev هي وكالة رائدة متخصصة في الذكاء الاصطناعي والأتمتة، تضم فريقاً من الخبراء التقنيين الملتزمين بابتكار حلول رقمية تضاعف نمو الشركات. وكالتنا",
      highlight: "تُمكّن الشركات", bodyEnd: "بالأتمتة الذكية ووكلاء الذكاء الاصطناعي وتطبيقات الويب عالية الأداء.",
      available: "نقبل عملاء جدداً",
      stats: [
        { label: "معايير الوكالة",      desc: "درجة Lighthouse 100/100 في كل تسليم" },
        { label: "بنية تقنية متطورة", desc: "أنظمة برمجية قابلة للتوسع وآمنة مصممة لتلبية احتياجات الأعمال الحديثة." },
        { label: "مركز الابتكار",      desc: "دمج التصميم الإبداعي مع الذكاء الاصطناعي لتحويل حضوركم الرقمي." },
      ],
    },
    powerTrio: {
      label: "الثلاثي القوي", headline1: "ثلاثة عوامل تجعل",
      headline2: "الأعمال تنجح على الإنترنت.",
      sub: "كل مشروع مبني على هذا الأساس — بدون استثناء.",
      items: [
        {
          title: "أداء ذكي",
          desc: "أنظمة محسنة بالذكاء الاصطناعي تحقق النتائج بسرعة ودقة تفوق الطرق التقليدية.",
          bullets: ["مسارات عمل محسّنة بالذكاء الاصطناعي", "معالجة فورية في الوقت الحقيقي", "نتائج دقيقة ومتسقة"],
        },
        {
          title: "أتمتة استراتيجية",
          desc: "مسارات عمل مخصصة مصممة لإلغاء المهام المتكررة ومضاعفة عملياتك على مدار الساعة.",
          bullets: ["عمليات آلية على مدار الساعة", "إلغاء المهام اليدوية", "توسّع بلا حدود"],
        },
        {
          title: "تكامل سلس",
          desc: "نربط نماذج الذكاء الاصطناعي المتطورة بأدوات عملك الحالية لإنشاء نظام رقمي موحد.",
          bullets: ["يتصل بالأدوات الحالية", "نظام رقمي موحد", "إعداد بدون انقطاع"],
        },
      ],
    },
    services: {
      label: "الخدمات والأسعار", headline1: "اختر", headline2: "مستوى أتمتتك.",
      sub: "أسعار شفافة. جميع الباقات تشمل إعداد ذكاء اصطناعي مخصص وتكاملات سلسة ودعماً ما بعد الإطلاق.",
      footerNote: "الأسعار نقطة انطلاق — السعر النهائي يعتمد على نطاق المشروع.",
      estimate: "احصل على تقدير مجاني ←", popular: "✦ الأكثر طلباً",
      items: [
        {
          tier: "باقة الوكيل", name: "وكيل ذكاء اصطناعي مخصص",
          desc: "وكيل ذكاء اصطناعي مصمم خصيصاً للرد على استفسارات العملاء وجمع بيانات العملاء والأسئلة الشائعة — على مدار الساعة، بدون تدخل بشري.",
          features: ["روبوت دردشة ذكي وجمع العملاء ($80) — يرد تلقائياً على كل استفسار", "تكامل واتساب والويب ($50) — انشر على جميع قنواتك", "قاعدة معرفة مخصصة ($20) — مدرّبة على بيانات عملك", "⚡ تسليم في 48 ساعة"],
          cta: "ابدأ الآن", waMsg: "مرحباً محمد، أريد وكيل ذكاء اصطناعي مخصص لأعمالي.",
        },
        {
          tier: "باقة الأتمتة", name: "أتمتة سير العمل (Make / Zapier)",
          desc: "أتمتة شاملة لعمليات أعمالك الأساسية. اربط تطبيقاتك وتخلص من المهام اليدوية ودع الذكاء الاصطناعي يتولى المتابعة تلقائياً.",
          features: ["وكيل الذكاء الاصطناعي مشمول ($150) — روبوت الدردشة وجمع العملاء", "مسارات Make / Zapier ($450) — مشغّلات تلقائية وتكاملات متعددة التطبيقات", "⭐ تكامل CRM ومتابعة تلقائية ($500) — لا تفوّت أي عميل محتمل", "لوحة تحكم فورية ($200) — راقب كل أتمتة في الوقت الفعلي", "⚡ تسليم في 3 أيام"],
          cta: "الأكثر طلباً", waMsg: "مرحباً محمد، أنا مهتم بأتمتة سير العمل لأعمالي.",
        },
        {
          tier: "باقة النمو", name: "تطبيق ويب مدعوم بالذكاء الاصطناعي",
          desc: "تطبيق ويب متكامل مع ذكاء اصطناعي مدمج — حجز ذكي وتوصيات تلقائية ومسارات تنبؤية تنمو مع أعمالك.",
          features: ["باقة الأتمتة الكاملة مشمولة ($1,500) — الأساس الشامل", "تطبيق Next.js بالذكاء الاصطناعي ($1,200) — سريع فائق وجاهز للأتمتة", "الحجز الذكي والجدولة ($800) — الذكاء الاصطناعي يدير مواعيدك تلقائياً", "تحليلات تنبؤية ($600) — رؤى بالذكاء الاصطناعي حول سلوك العملاء والإيرادات", "⭐ دعم ذكاء اصطناعي مخصص ($700) — تحديثات ذات أولوية ومراقبة 24/7", "⚡ تسليم في أسبوع واحد"],
          cta: "تحدث معنا", waMsg: "مرحباً محمد، أريد تطبيق الويب المدعوم بالذكاء الاصطناعي لأعمالي.",
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
        ctaTitle1: "هل أنت مستعد لبناء شيء",
        ctaTitle2: "مثل هذا؟",
        ctaSub: "استشارة مجانية. أرد خلال 24 ساعة.",
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
