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
    billingMonthly: string;
    billingAnnual: string;
    oneTimeSetup: string;
    perMonth: string;
    setupLabel: string;
    maintenanceLabel: string;
    annualSaveLabel: string;
    whyTitle: string;
    whyClose: string;
    whyPoints: { icon: string; title: string; desc: string }[];
    items: {
      tier: string; name: string; desc: string;
      features: string[];
      setupFeatures: string[];
      maintenanceFeatures: string[];
      minimum: string;
      cta: string; waMsg: string;
    }[];
  };
  industries: {
    label: string; headline: string; sub: string;
    items: { name: string; desc: string; tags: string[] }[];
  };
  portfolio: {
    label: string; headline: string; sub: string; aiNote: string;
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
  realAutomation: {
    label: string; headline: string; sub: string;
    flagshipLabel: string; flagshipTitle: string; flagshipDesc: string; flagshipCta: string;
    cap1Title: string; cap1Desc: string;
    cap2Title: string; cap2Desc: string;
    cap3Title: string; cap3Desc: string;
    cap4Title: string; cap4Desc: string;
    footer: string;
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
  booking: {
    modalTitle: string; selectedPlanLabel: string;
    bookCallTitle: string; bookCallDesc: string; bookCallSub: string; scheduleBtn: string;
    orText: string;
    sendMsgTitle: string; sendMsgDesc: string; continueBtn: string; closeBtn: string;
    formTitle: string; backBtn: string;
    fieldName: string; fieldEmail: string; fieldPhone: string;
    fieldBusinessType: string; fieldSelectedPlan: string; fieldProjectDetails: string; fieldBudget: string;
    consentText: string; submitBtn: string; sendingText: string;
    bizOptions: string[]; planOptions: string[]; budgetOptions: string[];
    successTitle: string; successMsg: string; successCalendlyBtn: string; successCloseBtn: string;
    calendarTitle: string; calendarDesc: string; calendarBtn: string;
    waTitle: string; waDesc: string; waBtn: string;
    emailTitle: string; emailCopyBtn: string; emailOpenBtn: string; emailCopiedToast: string; emailCopyFailed: string;
    orFormLabel: string;
    errName: string; errEmail: string; errBusinessType: string; errProjectDetails: string; errConsent: string;
  };
}

export const translations: Record<Lang, LangTranslations> = {
  /* ─────────────────── ENGLISH ─────────────────── */
  en: {
    nav: {
      about: "About", whyMe: "Why Me", services: "Services",
      portfolio: "Work", process: "Process", contact: "Contact", cta: "Start Project",
    },
    hero: {
      badge:  "Available for New Projects",
      h1a:    "Scale Your",
      h1b:    "Business with",
      h1c:    "AI-Powered Automation.",
      sub:    "I build intelligent AI Agents and seamless workflows to automate your operations 24/7.",
      cta1:   "Start Your Project",
      cta2:   "See My Work",
      scroll: "Scroll",
      stats:  { projects: "AI Solutions", pagespeed: "Web Stack", revenue: "Support Available", response: "Architecture" },
    },
    about: {
      pill: "About Me", headline1: "The Mind Behind the", headline2: "Digital Transformation",
      bodyPre: "I'm", name: "Mohamed Youli",
      bodyMid: ", founder of MDigitalDev. I help businesses scale with intelligent AI automation and high-performance websites. Combining modern web development with cutting-edge AI tools, I deliver custom solutions",
      highlight: "tailored to your unique business needs.", bodyEnd: "",
      available: "Now Accepting Clients",
      stats: [
        { label: "Quality Standard",    desc: "100/100 Lighthouse score on every delivery" },
        { label: "Advanced Tech Stack", desc: "Scalable and secure architectures tailored for modern business needs." },
        { label: "Innovation Hub",      desc: "Blending creative design with AI to transform your digital presence." },
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
          desc: "I connect advanced AI models into your existing business tools for a unified digital ecosystem.",
          bullets: ["Connects to existing tools", "Unified digital ecosystem", "Zero disruption setup"],
        },
      ],
    },
    services: {
      label: "Services & Pricing", headline1: "Choose Your", headline2: "Growth Plan.",
      sub: "One-time setup fee + monthly maintenance. Every plan includes custom AI configuration, seamless integrations, and ongoing support.",
      footerNote: "Looking for a custom solution or have specific requirements? Let's discuss your project — I offer flexible plans tailored to your business growth.",
      estimate: "Get a free estimate →", popular: "✦ Most Popular",
      billingMonthly: "Monthly",
      billingAnnual: "Annual",
      oneTimeSetup: "one-time setup",
      perMonth: "/month",
      setupLabel: "Setup Includes",
      maintenanceLabel: "Maintenance Includes",
      annualSaveLabel: "Save",
      whyTitle: "Why Monthly Maintenance Matters",
      whyClose: "Without maintenance, AI systems degrade fast. With it, they get smarter and more valuable every month.",
      whyPoints: [
        { icon: "🔄", title: "Continuous Updates", desc: "APIs change, models improve, and security patches are released regularly" },
        { icon: "🛡️", title: "Active Monitoring", desc: "I watch your system 24/7 to catch issues before they affect your business" },
        { icon: "🚀", title: "Performance Optimization", desc: "As your business grows, I scale your AI to match" },
        { icon: "🆘", title: "Priority Support", desc: "When something needs attention, you don't wait in line" },
        { icon: "💡", title: "Strategic Improvements", desc: "I continuously refine your workflows for better results" },
      ],
      items: [
        {
          tier: "Smart Starter", name: "Smart Starter",
          desc: "Everything you need to launch a professional online presence powered by AI — delivered fast.",
          features: [],
          setupFeatures: [
            "Professional Landing Page — high-performance, mobile-first design",
            "Basic AI FAQ Bot — answers customer questions automatically 24/7",
            "Ultra-Fast Hosting Setup — globally distributed, sub-second loads",
            "SEO Optimization — ranked and ready from day one",
            "1-hour onboarding call",
          ],
          maintenanceFeatures: [
            "Hosting on our servers",
            "SSL Certificate & Security Updates",
            "Daily Backups",
            "Email support (48h response)",
            "2 hours of edits/month",
            "Performance monitoring",
          ],
          minimum: "Required · 3-month minimum",
          cta: "Get Started", waMsg: "Hello Mohamed, I'm interested in the Smart Starter package ($497 setup + $97/month) for my business.",
        },
        {
          tier: "Business Auto-Pilot", name: "Business Auto-Pilot",
          desc: "A complete AI-powered business system that works for you around the clock — capturing leads, closing sales, and running operations automatically.",
          features: [],
          setupFeatures: [
            "Full Multi-page Website — polished, conversion-optimized & SEO-ready",
            "Advanced AI Sales Agent — qualifies leads and drives conversions 24/7",
            "Workflow Automations — eliminate manual tasks across your entire operation",
            "Lead Capture System — never miss a prospect again",
            "SEO + Conversion optimization",
            "30 days post-launch support",
          ],
          maintenanceFeatures: [
            "Everything in Smart Starter +",
            "AI Models updates",
            "n8n workflow monitoring",
            "Priority bug fixes",
            "5 hours of edits/month",
            "Monthly performance report",
            "API costs included (up to $50/mo)",
          ],
          minimum: "Required · 6-month minimum",
          cta: "Get Started", waMsg: "Hello Mohamed, I'm interested in the Business Auto-Pilot package ($1,800 setup + $297/month) for my business.",
        },
        {
          tier: "Enterprise AI Elite", name: "Enterprise AI Elite",
          desc: "A fully bespoke AI ecosystem built around your business — automating every process, integrating every tool, and scaling without limits.",
          features: [],
          setupFeatures: [
            "Custom AI Solution — tailored agents and models built for your exact needs",
            "Full Business Process Automation — end-to-end workflow coverage",
            "Advanced CRM Integration — unified data across all your business tools",
            "30 Days Premium Support — dedicated assistance after launch",
            "Quarterly strategy calls",
          ],
          maintenanceFeatures: [
            "Everything above +",
            "24/7 system monitoring",
            "Priority support (12h response)",
            "10 hours of edits/month",
            "Custom integrations",
            "Dedicated VPS resources",
            "API costs included (up to $200/mo)",
            "WhatsApp direct support",
          ],
          minimum: "12-month commitment required",
          cta: "Let's Talk", waMsg: "Hello Mohamed, I'm interested in the Enterprise AI Elite package ($4,800 setup + $797/month) for my business.",
        },
      ],
    },
    portfolio: {
      label: "AI-READY SOLUTIONS", headline: "AI-Ready Solutions.",
      sub: "High-performance frameworks built as the foundation for my AI & Automation implementations. Each demo represents the quality and architecture I deliver.",
      aiNote: "These demos represent the visual and structural quality of my work. AI and Automation features are custom-built per project.",
      filterAll: "All", filterRestaurants: "Restaurants",
      filterEcommerce: "E-commerce", filterCorporate: "Corporate",
      filterHealthcare: "Healthcare", filterRealEstate: "Real Estate",
      empty: "No demos in this category yet — check back soon!", viewProject: "View Demo",
      labels: {
        client: "CLIENT", year: "YEAR", timeline: "TIMELINE", category: "CATEGORY",
        challenge: "The Challenge", solution: "The Solution",
        aboutProject: "About the Demo", scopeOfWork: "Scope of Work", whatWeBuilt: "What Was Built",
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
    realAutomation: {
      label:         "REAL AI AUTOMATION",
      headline:      "Built & Running — Not Just Concepts.",
      sub:           "I don't just talk about automation — I build systems that run themselves. Here's a real autonomous AI system I built, plus what I can build for your business.",
      flagshipLabel: "Flagship System",
      flagshipTitle: "Autonomous AI Content System",
      flagshipDesc:  "A fully automated AI pipeline I built from scratch — it researches trending topics, writes scripts, generates voiceovers, produces videos with subtitles, and publishes daily to YouTube. Zero manual work, running 24/7.",
      flagshipCta:   "Watch it in action",
      cap1Title:     "AI Customer Support Bots",
      cap1Desc:      "24/7 automated support that answers customer questions instantly and accurately.",
      cap2Title:     "Lead Capture & Qualification",
      cap2Desc:      "Automatically capture, qualify, and route leads — even while you sleep.",
      cap3Title:     "Workflow Automation",
      cap3Desc:      "Eliminate repetitive manual tasks across your entire operation.",
      cap4Title:     "AI Integrations",
      cap4Desc:      "Connect AI to your existing tools — CRM, email, calendars, and more.",
      footer:        "Every system above is custom-built for your business. The flagship is proof I deliver what I promise.",
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
      sub: "From first conversation to deployment — here's how every project moves forward.",
      timeNote: "I prioritize quality and speed, ensuring each solution is rigorously tested and optimized before delivery.",
      items: [
        {
          number: "01", title: "Discovery & Strategy",
          desc: "I analyze your business bottlenecks to identify where AI and Automation can save you time and increase revenue.",
        },
        {
          number: "02", title: "Blueprint & Solution Design",
          desc: "I design a custom architecture for your AI agents and automated workflows, ensuring they align perfectly with your brand.",
        },
        {
          number: "03", title: "Intelligent Build & Integrate",
          desc: "I build your AI-ready ecosystem, integrating advanced models and connecting all your business tools seamlessly.",
        },
        {
          number: "04", title: "Launch & Scaling Support",
          desc: "I deploy your system for maximum performance and provide 30-day support to ensure smooth operations and growth.",
        },
      ],
    },
    contact: {
      label: "Let's Build Together", headline1: "Ready to Automate",
      headline2: "Your Success?",
      sub: "Let's discuss how AI and intelligent automation can scale your business. Schedule a discovery call today. Expert consultation for businesses ready to scale.",
      whatsapp: "WhatsApp", email: "Email",
      cta: "Start on WhatsApp — It's Free",
    },
    footer: { madeWith: "Developed by", passion: "Mohamed Youli — MDigitalDev", rights: "© 2026 MDigitalDev. All rights reserved.", privacyLink: "Privacy Policy", termsLink: "Terms of Service" },
    booking: {
      modalTitle: "How would you like to start?",
      selectedPlanLabel: "Selected Plan",
      bookCallTitle: "Book a Free Call",
      bookCallDesc: "15-min discovery call",
      bookCallSub: "Pick your time, no spam",
      scheduleBtn: "Schedule Call",
      orText: "OR",
      sendMsgTitle: "Send a Message",
      sendMsgDesc: "Quick form, response 24h",
      continueBtn: "Continue",
      closeBtn: "Close",
      formTitle: "Tell me about your project",
      backBtn: "Back",
      fieldName: "Full Name",
      fieldEmail: "Email Address",
      fieldPhone: "Phone (WhatsApp preferred)",
      fieldBusinessType: "Business Type",
      fieldSelectedPlan: "Selected Plan",
      fieldProjectDetails: "Project Details",
      fieldBudget: "Budget Range",
      consentText: "I agree to be contacted via WhatsApp / Email",
      submitBtn: "Submit My Inquiry",
      sendingText: "Sending…",
      bizOptions: ["Restaurant", "E-commerce", "Corporate", "Healthcare", "Real Estate", "Other"],
      planOptions: ["Smart Starter", "Business Auto-Pilot", "Enterprise AI Elite", "Not Sure Yet"],
      budgetOptions: ["Under $1,000", "$1,000 – $3,000", "$3,000 – $5,000", "$5,000+", "Let's Discuss"],
      successTitle: "Message Sent Successfully!",
      successMsg: "I'll get back to you within 24 hours.",
      successCalendlyBtn: "Book a Free Call",
      successCloseBtn: "Close",
      calendarTitle: "Book a Free Call",
      calendarDesc: "15-min discovery call",
      calendarBtn: "Schedule on Calendly",
      waTitle: "WhatsApp",
      waDesc: "Fast response",
      waBtn: "Open WhatsApp",
      emailTitle: "Email",
      emailCopyBtn: "Copy",
      emailOpenBtn: "Copy Email",
      emailCopiedToast: "📋 Email copied to clipboard!",
      emailCopyFailed: "Could not copy — please copy manually: contact@mdigitaldev.com",
      orFormLabel: "OR FILL THIS FORM",
      errName: "Full name is required",
      errEmail: "A valid email address is required",
      errBusinessType: "Please select a business type",
      errProjectDetails: "Please describe your project (min. 10 characters)",
      errConsent: "Please accept to continue",
    },
  },

  /* ─────────────────── FRANÇAIS ─────────────────── */
  fr: {
    nav: {
      about: "À propos", whyMe: "Pourquoi moi", services: "Services",
      portfolio: "Réalisations", process: "Processus", contact: "Contact", cta: "Démarrer",
    },
    hero: {
      badge:  "Disponible pour de nouveaux projets",
      h1a:    "Propulsez votre",
      h1b:    "entreprise avec",
      h1c:    "l'automatisation IA.",
      sub:    "Je conçois des agents IA intelligents et des flux de travail automatisés pour automatiser vos opérations 24h/24.",
      cta1:   "Démarrer mon projet",
      cta2:   "Voir mes Réalisations",
      scroll: "Défiler",
      stats:  { projects: "Solutions IA", pagespeed: "Stack Moderne", revenue: "Support Disponible", response: "Architecture" },
    },
    about: {
      pill: "À propos de moi", headline1: "L'Esprit Derrière la", headline2: "Transformation Digitale",
      bodyPre: "Je suis", name: "Mohamed Youli",
      bodyMid: ", fondateur de MDigitalDev. J'aide les entreprises à évoluer grâce à l'automatisation IA intelligente et des sites web haute performance. En combinant le développement web moderne avec des outils IA de pointe, je propose des solutions",
      highlight: "adaptées à vos besoins uniques.", bodyEnd: "",
      available: "Accepte de nouveaux clients",
      stats: [
        { label: "Standard Qualité",       desc: "Score Lighthouse 100/100 à chaque livraison" },
        { label: "Technologies de Pointe", desc: "Des architectures évolutives et sécurisées adaptées aux besoins modernes." },
        { label: "Pôle d'Innovation",      desc: "Allier design créatif et IA pour transformer votre présence numérique." },
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
          desc: "Je connecte des modèles IA avancés à vos outils existants pour un écosystème numérique unifié.",
          bullets: ["Connexion aux outils existants", "Écosystème numérique unifié", "Mise en place sans interruption"],
        },
      ],
    },
    services: {
      label: "Services & Tarifs", headline1: "Choisissez Votre", headline2: "Plan de Croissance.",
      sub: "Frais d'installation unique + maintenance mensuelle. Tous les plans incluent une configuration IA sur mesure, des intégrations fluides et un support continu.",
      footerNote: "Vous cherchez une solution sur mesure ou avez des besoins spécifiques ? Discutons de votre projet — je propose des plans flexibles adaptés à votre croissance.",
      estimate: "Obtenir un devis gratuit →", popular: "✦ Le Plus Populaire",
      billingMonthly: "Mensuel",
      billingAnnual: "Annuel",
      oneTimeSetup: "installation unique",
      perMonth: "/mois",
      setupLabel: "L'installation comprend",
      maintenanceLabel: "La maintenance comprend",
      annualSaveLabel: "Économie",
      whyTitle: "Pourquoi la Maintenance Mensuelle est Essentielle",
      whyClose: "Sans maintenance, les systèmes IA se dégradent rapidement. Avec elle, ils deviennent plus intelligents et plus précieux chaque mois.",
      whyPoints: [
        { icon: "🔄", title: "Mises à jour continues", desc: "Les API évoluent, les modèles s'améliorent et les correctifs de sécurité sont publiés régulièrement" },
        { icon: "🛡️", title: "Surveillance active", desc: "Je surveille votre système 24h/24 pour détecter les problèmes avant qu'ils n'affectent votre activité" },
        { icon: "🚀", title: "Optimisation des performances", desc: "À mesure que votre entreprise grandit, j'adapte votre IA en conséquence" },
        { icon: "🆘", title: "Support prioritaire", desc: "Quand quelque chose nécessite attention, vous n'attendez pas en queue" },
        { icon: "💡", title: "Améliorations stratégiques", desc: "Je peaufine continuellement vos workflows pour de meilleurs résultats" },
      ],
      items: [
        {
          tier: "Smart Starter", name: "Smart Starter",
          desc: "Tout ce qu'il faut pour lancer une présence en ligne professionnelle propulsée par l'IA — livré rapidement.",
          features: [],
          setupFeatures: [
            "Landing Page professionnelle — design mobile-first haute performance",
            "Bot FAQ IA basique — répond automatiquement aux questions 24h/24",
            "Hébergement ultra-rapide — distribué mondialement, chargement < 1 s",
            "Optimisation SEO — référencé et prêt dès le premier jour",
            "Appel d'intégration d'1 heure",
          ],
          maintenanceFeatures: [
            "Hébergement sur nos serveurs",
            "Certificat SSL & Mises à jour sécurité",
            "Sauvegardes quotidiennes",
            "Support e-mail (réponse 48h)",
            "2 heures de modifications/mois",
            "Monitoring des performances",
          ],
          minimum: "Requis · 3 mois minimum",
          cta: "Commencer", waMsg: "Bonjour Mohamed, je suis intéressé par le plan Smart Starter (497$ installation + 97$/mois) pour mon activité.",
        },
        {
          tier: "Business Auto-Pilot", name: "Business Auto-Pilot",
          desc: "Un système d'entreprise complet propulsé par l'IA qui travaille pour vous en permanence — capturant les leads, concluant les ventes et gérant les opérations automatiquement.",
          features: [],
          setupFeatures: [
            "Site multi-pages complet — optimisé pour la conversion et le SEO",
            "Agent commercial IA avancé — qualifie les leads et booste les ventes 24h/24",
            "Automatisations des flux — éliminez les tâches manuelles dans toute l'entreprise",
            "Système de capture de leads — ne manquez plus aucun prospect",
            "SEO + Optimisation conversion",
            "30 jours de support post-lancement",
          ],
          maintenanceFeatures: [
            "Tout du Smart Starter +",
            "Mises à jour des modèles IA",
            "Monitoring des workflows n8n",
            "Corrections prioritaires",
            "5 heures de modifications/mois",
            "Rapport de performance mensuel",
            "Coûts API inclus (jusqu'à 50$/mois)",
          ],
          minimum: "Requis · 6 mois minimum",
          cta: "Commencer", waMsg: "Bonjour Mohamed, je suis intéressé par le plan Business Auto-Pilot (1 800$ installation + 297$/mois) pour mon activité.",
        },
        {
          tier: "Enterprise AI Elite", name: "Enterprise AI Elite",
          desc: "Un écosystème IA entièrement sur mesure construit autour de votre entreprise — automatisant chaque processus, intégrant chaque outil et évoluant sans limites.",
          features: [],
          setupFeatures: [
            "Solution IA personnalisée — agents et modèles conçus pour vos besoins exacts",
            "Automatisation complète des processus métier — couverture workflow de bout en bout",
            "Intégration CRM avancée — données unifiées sur tous vos outils",
            "30 jours de support premium — assistance dédiée après lancement",
            "Appels stratégiques trimestriels",
          ],
          maintenanceFeatures: [
            "Tout ci-dessus +",
            "Monitoring 24h/24",
            "Support prioritaire (réponse 12h)",
            "10 heures de modifications/mois",
            "Intégrations personnalisées",
            "Ressources VPS dédiées",
            "Coûts API inclus (jusqu'à 200$/mois)",
            "Support WhatsApp direct",
          ],
          minimum: "Engagement 12 mois requis",
          cta: "Parlons-en", waMsg: "Bonjour Mohamed, je suis intéressé par le plan Enterprise AI Elite (4 800$ installation + 797$/mois) pour mon activité.",
        },
      ],
    },
    portfolio: {
      label: "SOLUTIONS PRÊTES POUR L'IA", headline: "Solutions Prêtes pour l'IA.",
      sub: "Des frameworks haute performance conçus comme fondation pour mes implémentations IA & Automatisation. Chaque démo reflète la qualité et l'architecture que je livre.",
      aiNote: "Ces démos représentent la qualité visuelle et structurelle de mon travail. Les fonctionnalités IA et Automatisation sont développées sur mesure pour chaque projet.",
      filterAll: "Tout", filterRestaurants: "Restaurants",
      filterEcommerce: "E-commerce", filterCorporate: "Corporate",
      filterHealthcare: "Santé", filterRealEstate: "Immobilier",
      empty: "Aucune démo dans cette catégorie pour l'instant — revenez bientôt !", viewProject: "Voir la démo",
      labels: {
        client: "CLIENT", year: "ANNÉE", timeline: "DURÉE", category: "CATÉGORIE",
        challenge: "Le Défi", solution: "La Solution",
        aboutProject: "À propos de la démo", scopeOfWork: "Périmètre", whatWeBuilt: "Ce qui a été construit",
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
    realAutomation: {
      label:         "AUTOMATISATION IA RÉELLE",
      headline:      "Conçu et Opérationnel — Pas de Simples Concepts.",
      sub:           "Je ne fais pas que parler d'automatisation — je construis des systèmes autonomes. Voici un vrai système IA autonome que j'ai créé, et ce que je peux construire pour votre entreprise.",
      flagshipLabel: "Système Phare",
      flagshipTitle: "Système de Contenu IA Autonome",
      flagshipDesc:  "Un pipeline IA entièrement automatisé que j'ai créé de zéro — il recherche les sujets tendance, rédige les scripts, génère les voix, produit des vidéos sous-titrées et publie quotidiennement sur YouTube. Zéro travail manuel, 24/7.",
      flagshipCta:   "Voir en action",
      cap1Title:     "Bots de Support Client IA",
      cap1Desc:      "Support automatisé 24/7 qui répond aux questions des clients instantanément et avec précision.",
      cap2Title:     "Capture & Qualification de Prospects",
      cap2Desc:      "Capturez, qualifiez et orientez les prospects automatiquement — même pendant votre sommeil.",
      cap3Title:     "Automatisation des Flux",
      cap3Desc:      "Éliminez les tâches manuelles répétitives dans toute votre activité.",
      cap4Title:     "Intégrations IA",
      cap4Desc:      "Connectez l'IA à vos outils existants — CRM, email, agendas, et plus.",
      footer:        "Chaque système ci-dessus est conçu sur mesure pour votre entreprise. Le système phare est la preuve que je tiens mes promesses.",
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
      sub: "De la première conversation au déploiement — voici comment chaque projet avance.",
      timeNote: "Je privilégie la qualité et la rapidité, en veillant à ce que chaque solution soit rigoureusement testée et optimisée avant la livraison.",
      items: [
        {
          number: "01", title: "Découverte & Stratégie",
          desc: "J'analyse les points de friction de votre entreprise pour identifier où l'IA et l'Automatisation peuvent vous faire gagner du temps et augmenter vos revenus.",
        },
        {
          number: "02", title: "Plan & Conception de Solution",
          desc: "Je conçois une architecture sur mesure pour vos agents IA et workflows automatisés, pour qu'ils s'alignent parfaitement avec votre marque.",
        },
        {
          number: "03", title: "Construction Intelligente & Intégration",
          desc: "Je construis votre écosystème IA, en intégrant des modèles avancés et en connectant tous vos outils métier en toute transparence.",
        },
        {
          number: "04", title: "Lancement & Support de Croissance",
          desc: "Je déploie votre système pour une performance maximale et fournis 30 jours de support pour assurer des opérations fluides et votre croissance.",
        },
      ],
    },
    contact: {
      label: "Construisons Ensemble", headline1: "Prêt à Automatiser",
      headline2: "Votre Succès ?",
      sub: "Discutons de la façon dont l'IA et l'automatisation intelligente peuvent faire évoluer votre entreprise. Planifiez un appel découverte aujourd'hui. Consultation d'expert pour les entreprises prêtes à évoluer.",
      whatsapp: "WhatsApp", email: "E-mail",
      cta: "Démarrer sur WhatsApp — C'est Gratuit",
    },
    footer: { madeWith: "Développé par", passion: "Mohamed Youli — MDigitalDev", rights: "© 2026 MDigitalDev. Tous droits réservés.", privacyLink: "Politique de Confidentialité", termsLink: "Conditions d'Utilisation" },
    booking: {
      modalTitle: "Comment souhaitez-vous commencer ?",
      selectedPlanLabel: "Plan sélectionné",
      bookCallTitle: "Réserver un appel gratuit",
      bookCallDesc: "Appel découverte gratuit de 15 minutes",
      bookCallSub: "Choisissez votre créneau, sans spam",
      scheduleBtn: "Planifier l'appel",
      orText: "OU",
      sendMsgTitle: "Envoyer un message",
      sendMsgDesc: "Formulaire rapide, réponse sous 24h",
      continueBtn: "Continuer",
      closeBtn: "Fermer",
      formTitle: "Parlez-moi de votre projet",
      backBtn: "Retour",
      fieldName: "Nom complet",
      fieldEmail: "Adresse email",
      fieldPhone: "Téléphone (WhatsApp de préférence)",
      fieldBusinessType: "Type d'entreprise",
      fieldSelectedPlan: "Plan sélectionné",
      fieldProjectDetails: "Détails du projet",
      fieldBudget: "Budget",
      consentText: "J'accepte d'être contacté par WhatsApp / Email",
      submitBtn: "Envoyer ma demande",
      sendingText: "Envoi en cours…",
      bizOptions: ["Restaurant", "E-commerce", "Entreprise", "Santé", "Immobilier", "Autre"],
      planOptions: ["Smart Starter", "Business Auto-Pilot", "Enterprise AI Elite", "Pas encore sûr"],
      budgetOptions: ["Moins de 1 000 $", "1 000 $ – 3 000 $", "3 000 $ – 5 000 $", "5 000 $+", "À discuter"],
      successTitle: "Message envoyé avec succès !",
      successMsg: "Je vous répondrai dans les 24 heures.",
      successCalendlyBtn: "Réserver un appel gratuit",
      successCloseBtn: "Fermer",
      calendarTitle: "Réserver un appel gratuit",
      calendarDesc: "Appel découverte gratuit de 15 minutes",
      calendarBtn: "Planifier sur Calendly",
      waTitle: "WhatsApp",
      waDesc: "Réponse rapide",
      waBtn: "Ouvrir WhatsApp",
      emailTitle: "E-mail",
      emailCopyBtn: "Copier",
      emailOpenBtn: "Copier l'email",
      emailCopiedToast: "📋 E-mail copié dans le presse-papier !",
      emailCopyFailed: "Impossible de copier — veuillez copier manuellement : contact@mdigitaldev.com",
      orFormLabel: "OU REMPLISSEZ CE FORMULAIRE",
      errName: "Le nom complet est requis",
      errEmail: "Une adresse e-mail valide est requise",
      errBusinessType: "Veuillez sélectionner un type d'entreprise",
      errProjectDetails: "Veuillez décrire votre projet (min. 10 caractères)",
      errConsent: "Veuillez accepter pour continuer",
    },
  },

  /* ─────────────────── ARABIC ─────────────────── */
  ar: {
    nav: {
      about: "من أنا", whyMe: "لماذا أنا", services: "الخدمات",
      portfolio: "أعمالي", process: "طريقة العمل", contact: "تواصل", cta: "ابدأ مشروعك",
    },
    hero: {
      badge:  "متاح لمشاريع جديدة",
      h1a:    "ضاعف إنتاجية",
      h1b:    "عملك عبر",
      h1c:    "أتمتة الذكاء الاصطناعي.",
      sub:    "أبني وكلاء ذكاء اصطناعي وأنظمة أتمتة تعمل لخدمتك على مدار الساعة.",
      cta1:   "ابدأ مشروعك",
      cta2:   "شاهد أعمالي",
      scroll: "انتقل",
      stats:  { projects: "حلول ذكاء اصطناعي", pagespeed: "تقنيات حديثة", revenue: "دعم متاح", response: "بنية متطورة" },
    },
    about: {
      pill: "عني", headline1: "العقل وراء", headline2: "التحول الرقمي",
      bodyPre: "أنا", name: "محمد يولي",
      bodyMid: "، مؤسس MDigitalDev. أساعد الشركات على النمو بالأتمتة الذكية والمواقع الإلكترونية عالية الأداء. بالجمع بين تطوير الويب الحديث وأدوات الذكاء الاصطناعي المتقدمة، أقدم حلولاً",
      highlight: "مصممة خصيصاً لاحتياجات عملك.", bodyEnd: "",
      available: "متاح لعملاء جدد",
      stats: [
        { label: "معيار الجودة",        desc: "درجة Lighthouse 100/100 في كل تسليم" },
        { label: "بنية تقنية متطورة",   desc: "أنظمة برمجية قابلة للتوسع وآمنة مصممة لتلبية احتياجات الأعمال الحديثة." },
        { label: "مركز الابتكار",       desc: "دمج التصميم الإبداعي مع الذكاء الاصطناعي لتحويل حضوركم الرقمي." },
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
          desc: "أربط نماذج الذكاء الاصطناعي المتطورة بأدوات عملك الحالية لإنشاء نظام رقمي موحد.",
          bullets: ["يتصل بالأدوات الحالية", "نظام رقمي موحد", "إعداد بدون انقطاع"],
        },
      ],
    },
    services: {
      label: "الخدمات والأسعار", headline1: "اختر", headline2: "خطة نموك.",
      sub: "رسوم إعداد لمرة واحدة + صيانة شهرية. جميع الخطط تشمل تهيئة ذكاء اصطناعي مخصص وتكاملات سلسة ودعماً مستمراً.",
      footerNote: "هل تبحث عن حل مخصص أو لديك متطلبات محددة؟ دعنا نناقش مشروعك — أقدم خططاً مرنة تناسب نمو عملك.",
      estimate: "احصل على تقدير مجاني ←", popular: "✦ الأكثر طلباً",
      billingMonthly: "شهري",
      billingAnnual: "سنوي",
      oneTimeSetup: "رسوم إعداد",
      perMonth: "/شهر",
      setupLabel: "يشمل الإعداد",
      maintenanceLabel: "تشمل الصيانة",
      annualSaveLabel: "وفّر",
      whyTitle: "لماذا الصيانة الشهرية ضرورية؟",
      whyClose: "بدون صيانة، تتدهور أنظمة الذكاء الاصطناعي بسرعة. ومعها، تصبح أكثر ذكاءً وقيمةً كل شهر.",
      whyPoints: [
        { icon: "🔄", title: "تحديثات مستمرة", desc: "تتغير الـ API، تتطور النماذج، وتُصدر تحديثات الأمان باستمرار" },
        { icon: "🛡️", title: "مراقبة نشطة", desc: "أراقب نظامك على مدار الساعة لاكتشاف المشكلات قبل أن تؤثر على عملك" },
        { icon: "🚀", title: "تحسين الأداء", desc: "مع نمو عملك، أطور الذكاء الاصطناعي ليواكب احتياجاتك" },
        { icon: "🆘", title: "دعم أولوي", desc: "عندما يحتاج شيء اهتماماً، لا تنتظر في الطابور" },
        { icon: "💡", title: "تحسينات استراتيجية", desc: "أطور مسارات عملك باستمرار لتحقيق نتائج أفضل" },
      ],
      items: [
        {
          tier: "Smart Starter", name: "Smart Starter",
          desc: "كل ما تحتاجه لإطلاق حضور رقمي احترافي مدعوم بالذكاء الاصطناعي — بسرعة وكفاءة.",
          features: [],
          setupFeatures: [
            "صفحة هبوط احترافية — تصميم متجاوب عالي الأداء",
            "بوت رد آلي أساسي — يجيب على أسئلة العملاء تلقائياً 24/7",
            "إعداد استضافة فائقة السرعة — موزع عالمياً وتحميل أقل من ثانية",
            "تهيئة محركات البحث — محسّن ومستعد للظهور من اليوم الأول",
            "جلسة تأهيلية لمدة ساعة",
          ],
          maintenanceFeatures: [
            "الاستضافة على خوادمنا",
            "شهادة SSL وتحديثات الأمان",
            "نسخ احتياطي يومي",
            "دعم بالبريد الإلكتروني (رد خلال 48 ساعة)",
            "ساعتان من التعديلات شهرياً",
            "مراقبة الأداء",
          ],
          minimum: "مطلوب · 3 أشهر كحد أدنى",
          cta: "ابدأ الآن", waMsg: "مرحباً محمد، أنا مهتم بخطة Smart Starter (497$ إعداد + 97$/شهر) لأعمالي.",
        },
        {
          tier: "Business Auto-Pilot", name: "Business Auto-Pilot",
          desc: "نظام أعمال متكامل مدعوم بالذكاء الاصطناعي يعمل لصالحك على مدار الساعة — يجمع العملاء ويُتمّ المبيعات ويُدير العمليات تلقائياً.",
          features: [],
          setupFeatures: [
            "موقع إلكتروني متكامل متعدد الصفحات — محسّن للتحويل ومحركات البحث",
            "وكيل مبيعات ذكي متطور — يفرز العملاء ويعزز المبيعات 24/7",
            "أتمتة العمل — تخلص من المهام اليدوية في جميع عمليات شركتك",
            "نظام تجميع بيانات العملاء — لا تفوّت أي فرصة عمل",
            "تحسين SEO والتحويل",
            "30 يوماً من الدعم بعد الإطلاق",
          ],
          maintenanceFeatures: [
            "كل ما في خطة Smart Starter +",
            "تحديثات نماذج الذكاء الاصطناعي",
            "مراقبة مسارات n8n",
            "إصلاح الأخطاء بأولوية",
            "5 ساعات من التعديلات شهرياً",
            "تقرير أداء شهري",
            "تكاليف API مشمولة (حتى 50$/شهر)",
          ],
          minimum: "مطلوب · 6 أشهر كحد أدنى",
          cta: "ابدأ الآن", waMsg: "مرحباً محمد، أنا مهتم بخطة Business Auto-Pilot (1,800$ إعداد + 297$/شهر) لأعمالي.",
        },
        {
          tier: "Enterprise AI Elite", name: "Enterprise AI Elite",
          desc: "منظومة ذكاء اصطناعي متكاملة مصممة خصيصاً لشركتك — تُؤتمت كل عملية وتربط كل أداة وتنمو بلا حدود.",
          features: [],
          setupFeatures: [
            "حلول ذكاء اصطناعي مخصصة — وكلاء ونماذج مبنية لاحتياجاتك الفعلية",
            "أتمتة كاملة لعمليات الشركة — تغطية شاملة لجميع مسارات العمل",
            "ربط متطور مع أنظمة CRM — بيانات موحدة عبر جميع أدوات عملك",
            "دعم فني متميز لمدة 30 يوماً — مساعدة متخصصة بعد الإطلاق",
            "جلسات استراتيجية فصلية",
          ],
          maintenanceFeatures: [
            "كل ما سبق +",
            "مراقبة على مدار الساعة",
            "دعم أولوي (رد خلال 12 ساعة)",
            "10 ساعات من التعديلات شهرياً",
            "تكاملات مخصصة",
            "موارد VPS مخصصة",
            "تكاليف API مشمولة (حتى 200$/شهر)",
            "دعم مباشر عبر واتساب",
          ],
          minimum: "التزام 12 شهراً مطلوب",
          cta: "تحدث معنا", waMsg: "مرحباً محمد، أنا مهتم بخطة Enterprise AI Elite (4,800$ إعداد + 797$/شهر) لأعمالي.",
        },
      ],
    },
    portfolio: {
      label: "حلول جاهزة للذكاء الاصطناعي", headline: "حلول جاهزة للذكاء الاصطناعي.",
      sub: "أطر عمل عالية الأداء مبنية كأساس لتطبيقات الذكاء الاصطناعي والأتمتة. كل نموذج يعكس الجودة والبنية التقنية التي أقدمها.",
      aiNote: "هذه النماذج تمثل الجودة البصرية والهيكلية لعملي. ميزات الذكاء الاصطناعي والأتمتة يتم بناؤها خصيصاً حسب كل مشروع.",
      filterAll: "الكل", filterRestaurants: "مطاعم",
      filterEcommerce: "تجارة إلكترونية", filterCorporate: "شركات",
      filterHealthcare: "صحة", filterRealEstate: "عقارات",
      empty: "لا توجد نماذج في هذه الفئة بعد — تابعنا قريباً!", viewProject: "شاهد النموذج",
      labels: {
        client: "العميل", year: "السنة", timeline: "المدة", category: "الفئة",
        challenge: "التحدي", solution: "الحل",
        aboutProject: "عن النموذج", scopeOfWork: "نطاق العمل", whatWeBuilt: "ما تم بناؤه",
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
    realAutomation: {
      label:         "أتمتة ذكاء اصطناعي حقيقية",
      headline:      "مبني ويعمل — ليست مجرد أفكار.",
      sub:           "أنا لا أتحدث فقط عن الأتمتة — بل أبني أنظمة تعمل ذاتياً. إليك نظام ذكاء اصطناعي حقيقي بنيته، وما يمكنني بناؤه لأعمالك.",
      flagshipLabel: "النظام الرئيسي",
      flagshipTitle: "نظام محتوى ذكاء اصطناعي ذاتي",
      flagshipDesc:  "منظومة ذكاء اصطناعي مؤتمتة بالكامل بنيتها من الصفر — تبحث عن المواضيع الرائجة، تكتب النصوص، تولّد التعليق الصوتي، تنتج فيديوهات مترجمة، وتنشر يومياً على يوتيوب. بدون عمل يدوي، تعمل 24/7.",
      flagshipCta:   "شاهده يعمل",
      cap1Title:     "روبوتات دعم العملاء بالذكاء الاصطناعي",
      cap1Desc:      "دعم آلي 24/7 يجيب على أسئلة العملاء فوراً وبدقة.",
      cap2Title:     "التقاط وتأهيل العملاء المحتملين",
      cap2Desc:      "التقط وأهّل ووجّه العملاء المحتملين تلقائياً — حتى أثناء نومك.",
      cap3Title:     "أتمتة سير العمل",
      cap3Desc:      "تخلّص من المهام اليدوية المتكررة في جميع عملياتك.",
      cap4Title:     "تكاملات الذكاء الاصطناعي",
      cap4Desc:      "اربط الذكاء الاصطناعي بأدواتك الحالية — CRM، البريد، التقويمات، والمزيد.",
      footer:        "كل نظام أعلاه مصمّم خصيصاً لأعمالك. النظام الرئيسي دليل على أنني أحقّق ما أعد به.",
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
      sub: "من أول محادثة حتى الإطلاق — هكذا يتقدّم كل مشروع.",
      timeNote: "أولي الأولوية للجودة والسرعة، مع ضمان اختبار كل حل وتحسينه بدقة قبل التسليم النهائي.",
      items: [
        {
          number: "01", title: "الاستكشاف والاستراتيجية",
          desc: "أحلل تحديات عملك لتحديد المجالات التي يمكن للذكاء الاصطناعي والأتمتة فيها توفير الوقت وزيادة الأرباح.",
        },
        {
          number: "02", title: "التخطيط وتصميم الحل",
          desc: "أصمم بنية مخصصة لوكلاء الذكاء الاصطناعي ومسارات العمل الآلية، لضمان توافقها التام مع علامتك التجارية.",
        },
        {
          number: "03", title: "البناء الذكي والدمج",
          desc: "أبني نظامك الذكي، مع دمج النماذج المتقدمة وربط جميع أدوات عملك بسلاسة.",
        },
        {
          number: "04", title: "الإطلاق ودعم النمو",
          desc: "أطلق نظامك بأقصى أداء، وأوفر دعماً لمدة 30 يوماً لضمان سير العمليات ونمو مشروعك بسلاسة.",
        },
      ],
    },
    contact: {
      label: "لنبني معاً", headline1: "هل أنت مستعد",
      headline2: "لأتمتة نجاحك؟",
      sub: "لنناقش كيف يمكن للذكاء الاصطناعي والأتمتة الذكية مضاعفة نمو أعمالك. احجز جلسة استشارية اليوم. استشارات خبيرة للشركات المستعدة للنمو.",
      whatsapp: "واتساب", email: "البريد الإلكتروني",
      cta: "ابدأ عبر واتساب — مجاناً",
    },
    footer: { madeWith: "طُوِّر بواسطة", passion: "محمد يولي — MDigitalDev", rights: "© 2026 MDigitalDev. جميع الحقوق محفوظة.", privacyLink: "سياسة الخصوصية", termsLink: "شروط الخدمة" },
    booking: {
      modalTitle: "كيف تريد أن نبدأ؟",
      selectedPlanLabel: "الباقة المختارة",
      bookCallTitle: "احجز مكالمة مجانية",
      bookCallDesc: "مكالمة استكشافية مجانية لمدة 15 دقيقة",
      bookCallSub: "اختر وقتك، بدون إزعاج",
      scheduleBtn: "جدولة المكالمة",
      orText: "أو",
      sendMsgTitle: "أرسل رسالة",
      sendMsgDesc: "نموذج سريع، الرد خلال 24 ساعة",
      continueBtn: "متابعة",
      closeBtn: "إغلاق",
      formTitle: "أخبرني عن مشروعك",
      backBtn: "رجوع",
      fieldName: "الاسم الكامل",
      fieldEmail: "عنوان البريد الإلكتروني",
      fieldPhone: "الهاتف (واتساب مفضل)",
      fieldBusinessType: "نوع العمل",
      fieldSelectedPlan: "الباقة المختارة",
      fieldProjectDetails: "تفاصيل المشروع",
      fieldBudget: "نطاق الميزانية",
      consentText: "أوافق على التواصل عبر واتساب / البريد الإلكتروني",
      submitBtn: "إرسال الاستفسار",
      sendingText: "جارٍ الإرسال…",
      bizOptions: ["مطعم", "تجارة إلكترونية", "شركات", "صحة", "عقارات", "أخرى"],
      planOptions: ["Smart Starter", "Business Auto-Pilot", "Enterprise AI Elite", "لست متأكداً بعد"],
      budgetOptions: ["أقل من 1,000 $", "1,000 $ – 3,000 $", "3,000 $ – 5,000 $", "5,000 $+", "للنقاش"],
      successTitle: "تم إرسال الرسالة بنجاح!",
      successMsg: "سأرد عليك خلال 24 ساعة.",
      successCalendlyBtn: "احجز مكالمة مجانية",
      successCloseBtn: "إغلاق",
      calendarTitle: "احجز مكالمة مجانية",
      calendarDesc: "مكالمة استكشافية مجانية لمدة 15 دقيقة",
      calendarBtn: "جدولة على Calendly",
      waTitle: "واتساب",
      waDesc: "رد سريع",
      waBtn: "فتح واتساب",
      emailTitle: "البريد الإلكتروني",
      emailCopyBtn: "نسخ",
      emailOpenBtn: "نسخ البريد",
      emailCopiedToast: "📋 تم نسخ البريد الإلكتروني!",
      emailCopyFailed: "تعذّر النسخ — يرجى النسخ يدوياً: contact@mdigitaldev.com",
      orFormLabel: "أو املأ هذا النموذج",
      errName: "الاسم الكامل مطلوب",
      errEmail: "يرجى إدخال عنوان بريد إلكتروني صحيح",
      errBusinessType: "يرجى اختيار نوع العمل",
      errProjectDetails: "يرجى وصف مشروعك (10 أحرف على الأقل)",
      errConsent: "يرجى الموافقة للمتابعة",
    },
  },
};
