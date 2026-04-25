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
      label: "Services & Pricing", headline1: "Choose Your", headline2: "Growth Plan.",
      sub: "One-time setup fee. All plans include custom AI configuration, seamless integrations, and post-launch support.",
      footerNote: "Looking for a custom combo or monthly AI maintenance? We offer flexible plans tailored to your growth. Contact us for a custom quote.",
      estimate: "Get a free estimate →", popular: "✦ Most Popular",
      items: [
        {
          tier: "Smart Starter", name: "Smart Starter — $497",
          desc: "Everything you need to launch a professional online presence powered by AI — delivered fast.",
          features: ["Professional Landing Page — high-performance, mobile-first design", "Basic AI FAQ Bot — answers customer questions automatically 24/7", "Ultra-Fast Hosting Setup — globally distributed, sub-second loads", "⭐ SEO Optimization — ranked and ready from day one", "⚡ One-time setup fee"],
          cta: "Get Started", waMsg: "Hello Mohamed, I'm interested in the Smart Starter plan ($497) for my business.",
        },
        {
          tier: "Business Auto-Pilot", name: "Business Auto-Pilot — $1,800",
          desc: "A complete AI-powered business system that works for you around the clock — capturing leads, closing sales, and running operations automatically.",
          features: ["Full Multi-page Website — polished, conversion-optimized & SEO-ready", "Advanced AI Sales Agent — qualifies leads and drives conversions 24/7", "⭐ Workflow Automations — eliminate manual tasks across your entire operation", "Lead Capture System — never miss a prospect again", "⚡ One-time setup fee"],
          cta: "Most Popular", waMsg: "Hello Mohamed, I'm interested in the Business Auto-Pilot plan ($1,800) for my business.",
        },
        {
          tier: "Enterprise AI Elite", name: "Enterprise AI Elite — $4,800",
          desc: "A fully bespoke AI ecosystem built around your business — automating every process, integrating every tool, and scaling without limits.",
          features: ["Custom AI Solution — tailored agents and models built for your exact needs", "Full Business Process Automation — end-to-end workflow coverage", "⭐ Advanced CRM Integration — unified data across all your business tools", "30 Days Premium Support — dedicated assistance after launch", "⚡ One-time setup fee"],
          cta: "Let's Talk", waMsg: "Hello Mohamed, I'm interested in the Enterprise AI Elite plan ($4,800) for my business.",
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
      label: "Industries", headline: "Built for Every Business.", sub: "AI-powered automation solutions crafted for the unique needs of each industry.",
      items: [
        { name: "Restaurants & Hospitality", desc: "AI-driven reservation systems and automated customer support bots to handle orders and inquiries 24/7.",                                   tags: ["AI Bots", "Auto Orders", "24/7 Support"]   },
        { name: "E-commerce & Retail",       desc: "Smart inventory automation and AI personalized shopping assistants to boost conversion rates and sales.",                                  tags: ["AI Assistants", "Smart Inventory", "Conversion"] },
        { name: "Corporate & Services",      desc: "Custom internal AI agents to automate document processing and streamline corporate workflows.",                                            tags: ["AI Agents", "Doc Processing", "Workflows"] },
        { name: "Healthcare & Wellness",     desc: "AI scheduling assistants and automated patient follow-up workflows for better clinic efficiency.",                                         tags: ["AI Scheduling", "Auto Follow-up", "Efficiency"] },
        { name: "Real Estate",               desc: "Automated lead qualification bots and AI-powered property matching for faster closures.",                                                  tags: ["Lead Bots", "AI Matching", "Fast Closures"] },
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
      label: "Services & Tarifs", headline1: "Choisissez Votre", headline2: "Plan de Croissance.",
      sub: "Frais d'installation unique. Tous les plans incluent une configuration IA sur mesure, des intégrations fluides et un support post-lancement.",
      footerNote: "Vous cherchez une offre combinée ou une maintenance IA mensuelle ? Nous proposons des plans flexibles adaptés à votre croissance. Contactez-nous pour un devis personnalisé.",
      estimate: "Obtenir un devis gratuit →", popular: "✦ Le Plus Populaire",
      items: [
        {
          tier: "Smart Starter", name: "Smart Starter — 497$",
          desc: "Tout ce qu'il faut pour lancer une présence en ligne professionnelle propulsée par l'IA — livré rapidement.",
          features: ["Landing Page professionnelle — design mobile-first haute performance", "Bot FAQ IA basique — répond automatiquement aux questions 24h/24", "Hébergement ultra-rapide — distribué mondialement, chargement < 1 s", "⭐ Optimisation SEO — référencé et prêt dès le premier jour", "⚡ Frais d'installation unique"],
          cta: "Commencer", waMsg: "Bonjour Mohamed, je suis intéressé par le plan Smart Starter (497$) pour mon activité.",
        },
        {
          tier: "Business Auto-Pilot", name: "Business Auto-Pilot — 1 800$",
          desc: "Un système d'entreprise complet propulsé par l'IA qui travaille pour vous en permanence — capturant les leads, concluant les ventes et gérant les opérations automatiquement.",
          features: ["Site multi-pages complet — optimisé pour la conversion et le SEO", "Agent commercial IA avancé — qualifie les leads et booste les ventes 24h/24", "⭐ Automatisations des flux — éliminez les tâches manuelles dans toute l'entreprise", "Système de capture de leads — ne manquez plus aucun prospect", "⚡ Frais d'installation unique"],
          cta: "Le Plus Populaire", waMsg: "Bonjour Mohamed, je suis intéressé par le plan Business Auto-Pilot (1 800$) pour mon activité.",
        },
        {
          tier: "Enterprise AI Elite", name: "Enterprise AI Elite — 4 800$",
          desc: "Un écosystème IA entièrement sur mesure construit autour de votre entreprise — automatisant chaque processus, intégrant chaque outil et évoluant sans limites.",
          features: ["Solution IA personnalisée — agents et modèles conçus pour vos besoins exacts", "Automatisation complète des processus métier — couverture workflow de bout en bout", "⭐ Intégration CRM avancée — données unifiées sur tous vos outils", "30 jours de support premium — assistance dédiée après lancement", "⚡ Frais d'installation unique"],
          cta: "Parlons-en", waMsg: "Bonjour Mohamed, je suis intéressé par le plan Enterprise AI Elite (4 800$) pour mon activité.",
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
      label: "Secteurs", headline: "Pour Chaque Activité.", sub: "Des solutions d'automatisation IA conçues pour les besoins uniques de chaque secteur.",
      items: [
        { name: "Restaurants & Hôtellerie",  desc: "Systèmes de réservation pilotés par l'IA et bots de support automatisés pour gérer commandes et demandes 24h/24.",               tags: ["Bots IA", "Commandes Auto", "Support 24h/24"] },
        { name: "E-commerce & Retail",       desc: "Automatisation intelligente des stocks et assistants shopping personnalisés par l'IA pour booster conversions et ventes.",        tags: ["Assistants IA", "Stock Intelligent", "Conversion"] },
        { name: "Corporate & Services",      desc: "Agents IA internes pour automatiser le traitement des documents et optimiser les workflows d'entreprise.",                         tags: ["Agents IA", "Docs Auto", "Workflows"] },
        { name: "Santé & Bien-être",         desc: "Assistants de planification IA et workflows automatisés de suivi patients pour une meilleure efficacité des cliniques.",          tags: ["Planning IA", "Suivi Auto", "Efficacité"] },
        { name: "Immobilier",                desc: "Bots de qualification automatique des leads et matching immobilier par l'IA pour des transactions plus rapides.",                  tags: ["Bots Leads", "Matching IA", "Clôture Rapide"] },
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
      label: "الخدمات والأسعار", headline1: "اختر", headline2: "خطة نموك.",
      sub: "رسوم إعداد لمرة واحدة. جميع الخطط تشمل تهيئة ذكاء اصطناعي مخصص وتكاملات سلسة ودعماً ما بعد الإطلاق.",
      footerNote: "هل تبحث عن عرض مخصص أو صيانة شهرية لأنظمة الذكاء الاصطناعي؟ نقدم خططاً مرنة تناسب نمو شركتك. تواصل معنا للحصول على عرض سعر خاص.",
      estimate: "احصل على تقدير مجاني ←", popular: "✦ الأكثر طلباً",
      items: [
        {
          tier: "Smart Starter", name: "Smart Starter — 497$",
          desc: "كل ما تحتاجه لإطلاق حضور رقمي احترافي مدعوم بالذكاء الاصطناعي — بسرعة وكفاءة.",
          features: ["صفحة هبوط احترافية — تصميم متجاوب عالي الأداء", "بوت رد آلي أساسي — يجيب على أسئلة العملاء تلقائياً على مدار الساعة", "إعداد استضافة فائقة السرعة — موزع عالمياً وتحميل أقل من ثانية", "⭐ تهيئة محركات البحث — محسّن ومستعد للظهور من اليوم الأول", "⚡ رسوم إعداد لمرة واحدة"],
          cta: "ابدأ الآن", waMsg: "مرحباً محمد، أنا مهتم بخطة Smart Starter (497$) لأعمالي.",
        },
        {
          tier: "Business Auto-Pilot", name: "Business Auto-Pilot — 1,800$",
          desc: "نظام أعمال متكامل مدعوم بالذكاء الاصطناعي يعمل لصالحك على مدار الساعة — يجمع العملاء ويُتمّ المبيعات ويُدير العمليات تلقائياً.",
          features: ["موقع إلكتروني متكامل متعدد الصفحات — محسّن للتحويل وهواجس محركات البحث", "وكيل مبيعات ذكي متطور — يفرز العملاء المحتملين ويعزز المبيعات 24/7", "⭐ أتمتة العمل — تخلص من المهام اليدوية في جميع عمليات شركتك", "نظام تجميع بيانات العملاء — لا تفوّت أي فرصة عمل", "⚡ رسوم إعداد لمرة واحدة"],
          cta: "الأكثر طلباً", waMsg: "مرحباً محمد، أنا مهتم بخطة Business Auto-Pilot (1,800$) لأعمالي.",
        },
        {
          tier: "Enterprise AI Elite", name: "Enterprise AI Elite — 4,800$",
          desc: "منظومة ذكاء اصطناعي متكاملة مصممة خصيصاً لشركتك — تُؤتمت كل عملية وتربط كل أداة وتنمو بلا حدود.",
          features: ["حلول ذكاء اصطناعي مخصصة — وكلاء ونماذج مبنية لاحتياجاتك الفعلية", "أتمتة كاملة لعمليات الشركة — تغطية شاملة لجميع مسارات العمل", "⭐ ربط متطور مع أنظمة CRM — بيانات موحدة عبر جميع أدوات عملك", "دعم فني متميز لمدة 30 يوماً — مساعدة متخصصة بعد الإطلاق", "⚡ رسوم إعداد لمرة واحدة"],
          cta: "تحدث معنا", waMsg: "مرحباً محمد، أنا مهتم بخطة Enterprise AI Elite (4,800$) لأعمالي.",
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
      label: "القطاعات", headline: "لكل نوع من الأعمال.", sub: "حلول أتمتة ذكاء اصطناعي مصممة للاحتياجات الفريدة لكل قطاع.",
      items: [
        { name: "المطاعم والضيافة",    desc: "أنظمة حجز مدعومة بالذكاء الاصطناعي ووكلاء رد آلي للتعامل مع الطلبات والاستفسارات على مدار الساعة.", tags: ["بوتات ذكية", "طلبات آلية", "دعم 24/7"]       },
        { name: "التجارة الإلكترونية", desc: "أتمتة ذكية للمخزون ومساعدي تسوق شخصيين بالذكاء الاصطناعي لزيادة معدلات التحويل والمبيعات.",          tags: ["مساعدو ذكاء اصطناعي", "مخزون ذكي", "تحويل"] },
        { name: "الشركات والخدمات",   desc: "وكلاء ذكاء اصطناعي مخصصين لأتمتة معالجة المستندات وتبسيط مسارات العمل المؤسسية.",                   tags: ["وكلاء ذكاء اصطناعي", "معالجة آلية", "مسارات"] },
        { name: "الصحة والعافية",      desc: "مساعدي جدولة ذكية وأنظمة متابعة تلقائية للمرضى لتحسين كفاءة العيادات.",                              tags: ["جدولة ذكية", "متابعة آلية", "كفاءة"]         },
        { name: "العقارات",            desc: "أنظمة أتمتة لفرز العملاء المحتملين وتوفيق العقارات بالذكاء الاصطناعي لإتمام الصفقات بسرعة.",          tags: ["بوتات العملاء", "توفيق ذكي", "إتمام سريع"]   },
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
