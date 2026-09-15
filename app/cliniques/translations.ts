/**
 * /cliniques — page-local translations (FR default, AR, EN).
 * Kept separate from lib/translations.ts on purpose: the global
 * LanguageContext defaults to EN, while this flyer page must default to FR.
 */

export type ClinicLang = "fr" | "ar" | "en";

export const CLINIC_LANGS: ClinicLang[] = ["fr", "ar", "en"];

export function isClinicLang(v: unknown): v is ClinicLang {
  return v === "fr" || v === "ar" || v === "en";
}

export const WA_NUMBER    = "212669586001";
export const PHONE_TEL    = "+212669586001";
export const PHONE_PRETTY = "+212 669 586 001";

/** YouTube links — same as FLAGSHIPS_STATIC on the homepage */
export const TRUST_LINKS = [
  "https://www.youtube.com/@MDigitalDev",
  "https://youtu.be/NYB4Td3SbEk",
] as const;

export interface ClinicDict {
  waMessage:   string;
  switcherAria: string;
  hero: {
    badge:     string;
    titleLead: string;
    titleHighlight: string;
    sub:       string;
    cta:       string;
    orCall:    string;
  };
  problem: {
    label: string;
    text:  string;
    punch: string;
  };
  features: {
    label: string;
    title: string;
    items: { title: string; desc: string }[];
  };
  offer: {
    badge:        string;
    setupLabel:   string;
    setupPrice:   string;
    setupWasPrefix: string;
    setupWas:     string;
    monthLabel:   string;
    monthValue:   string;
    monthNote:    string;
    thenLabel:    string;
    thenPrice:    string;
    perMonth:     string;
    thenNote:     string;
    note:         string;
    cta:          string;
  };
  trust: {
    label: string;
    title: string;
    local: string;
    cards: { label: string; title: string; desc: string; cta: string }[];
  };
  final: {
    title:  string;
    sub:    string;
    cta:    string;
    orCall: string;
  };
  footerLink: string;
}

export const clinicTranslations: Record<ClinicLang, ClinicDict> = {
  /* ─────────────────────────── FRANÇAIS ─────────────────────────── */
  fr: {
    waMessage:
      "Bonjour, j'ai vu votre flyer et je souhaite en savoir plus sur le système pour mon cabinet",
    switcherAria: "Choisir la langue",
    hero: {
      badge:          "Pour les cabinets dentaires au Maroc",
      titleLead:      "Un système digital qui aide votre cabinet",
      titleHighlight: "24h/24, 7j/7",
      sub:
        "Site web professionnel, réception des rendez-vous via WhatsApp, rappels automatiques et assistant IA — le tout fonctionne même en dehors des heures d'ouverture.",
      cta:    "Discuter sur WhatsApp",
      orCall: "ou appelez le",
    },
    problem: {
      label: "Le constat",
      text:
        "Un patient écrit à votre cabinet le soir pour demander un rendez-vous — sans réponse jusqu'au lendemain. Et souvent, il a déjà réservé ailleurs.",
      punch: "Le problème n'est pas votre service — c'est le timing.",
    },
    features: {
      label: "Le système",
      title: "10 fonctionnalités qui travaillent pour votre cabinet",
      items: [
        { title: "Site web professionnel",     desc: "Présence solide sur Google qui attire de nouveaux patients." },
        { title: "Rendez-vous via WhatsApp",   desc: "Le patient demande un rendez-vous à toute heure." },
        { title: "Rappels automatiques",       desc: "Réduit nettement les absences." },
        { title: "Confirmation en un clic",    desc: "Le patient confirme ou annule, libérant le créneau." },
        { title: "Assistant IA multilingue",   desc: "Comprend et répond dans n'importe quelle langue — idéal pour les patients étrangers." },
        { title: "Demande d'avis Google",      desc: "Invite les patients satisfaits à laisser un avis." },
        { title: "Tableau de bord",            desc: "Suivi des rendez-vous et statistiques." },
        { title: "Liste d'attente intelligente", desc: "Chaque annulation est proposée à un autre patient." },
        { title: "Suivi post-traitement",      desc: "Message après la visite, renforce la fidélité." },
        { title: "Rapports hebdomadaires",     desc: "Rendez-vous, absences, nouveaux patients." },
      ],
    },
    offer: {
      badge:          "Offre spéciale — premiers cabinets",
      setupLabel:     "Frais d'installation",
      setupPrice:     "0 DH",
      setupWasPrefix: "au lieu de",
      setupWas:       "12 000 DH",
      monthLabel:     "Premier mois",
      monthValue:     "OFFERT",
      monthNote:      "Essai complet",
      thenLabel:      "Ensuite",
      thenPrice:      "900 DH",
      perMonth:       "/mois",
      thenNote:       "Hébergement, maintenance et support inclus",
      note:
        "Sans engagement long — essayez le premier mois, puis décidez en toute liberté.",
      cta: "Profiter de l'offre",
    },
    trust: {
      label: "Qui est derrière",
      title: "Des systèmes réels, construits de A à Z et en production",
      local:
        "Je conçois des systèmes d'automatisation pour les cliniques et les petites entreprises au Maroc.",
      cards: [
        {
          label: "Système en production",
          title: "Pipeline de contenu IA autonome",
          desc:
            "Il recherche les sujets, rédige les scripts, génère la voix et les vidéos sous-titrées, puis publie chaque jour sur YouTube — sans aucune intervention manuelle.",
          cta: "Voir la chaîne YouTube",
        },
        {
          label: "Système en production",
          title: "Système automatisé de leads et de communication",
          desc:
            "Il collecte et vérifie les contacts, analyse chaque dossier avec l'IA et rédige un message personnalisé — validé en un clic avant l'envoi. La machine fait le travail, l'humain garde le dernier mot.",
          cta: "Voir la démo vidéo",
        },
      ],
    },
    final: {
      title:  "Prêt à en discuter ?",
      sub:    "Posez vos questions directement sur WhatsApp — sans engagement.",
      cta:    "Discuter sur WhatsApp",
      orCall: "ou appelez le",
    },
    footerLink: "MDigitalDev — voir le site complet",
  },

  /* ─────────────────────────── العربية ─────────────────────────── */
  ar: {
    waMessage:
      "مرحباً، رأيت الإعلان المطبوع وأود معرفة المزيد عن النظام الخاص بعيادتي",
    switcherAria: "اختر اللغة",
    hero: {
      badge:          "لعيادات طب الأسنان في المغرب",
      titleLead:      "نظام رقمي يساعد عيادتك",
      titleHighlight: "على مدار الساعة، طوال الأسبوع",
      sub:
        "موقع إلكتروني احترافي، استقبال المواعيد عبر واتساب، تذكيرات تلقائية ومساعد ذكاء اصطناعي — كل ذلك يعمل حتى خارج أوقات العمل.",
      cta:    "تواصل عبر واتساب",
      orCall: "أو اتصل على",
    },
    problem: {
      label: "المشكلة",
      text:
        "مريض يراسل عيادتك مساءً لطلب موعد — ولا يتلقى رداً حتى اليوم التالي. وفي الغالب، يكون قد حجز في مكان آخر.",
      punch: "المشكلة ليست في خدمتك — بل في التوقيت.",
    },
    features: {
      label: "النظام",
      title: "10 ميزات تعمل لصالح عيادتك",
      items: [
        { title: "موقع إلكتروني احترافي",   desc: "حضور قوي على Google يجذب مرضى جدداً." },
        { title: "المواعيد عبر واتساب",      desc: "يطلب المريض موعداً في أي وقت." },
        { title: "تذكيرات تلقائية",          desc: "تقلل بشكل واضح من حالات الغياب." },
        { title: "تأكيد بنقرة واحدة",        desc: "يؤكد المريض أو يلغي، فيتحرر الموعد لغيره." },
        { title: "مساعد ذكاء اصطناعي متعدد اللغات", desc: "يفهم ويرد بأي لغة — مثالي للمرضى الأجانب." },
        { title: "طلب تقييمات Google",       desc: "يدعو المرضى الراضين إلى ترك تقييم." },
        { title: "لوحة تحكم",                desc: "متابعة المواعيد والإحصائيات." },
        { title: "قائمة انتظار ذكية",        desc: "كل إلغاء يُعرض تلقائياً على مريض آخر." },
        { title: "متابعة بعد العلاج",        desc: "رسالة بعد الزيارة تعزز ولاء المرضى." },
        { title: "تقارير أسبوعية",           desc: "المواعيد، الغيابات، والمرضى الجدد." },
      ],
    },
    offer: {
      badge:          "عرض خاص — لأولى العيادات",
      setupLabel:     "رسوم التركيب",
      setupPrice:     "0 درهم",
      setupWasPrefix: "بدلاً من",
      setupWas:       "12,000 درهم",
      monthLabel:     "الشهر الأول",
      monthValue:     "مجاناً",
      monthNote:      "تجربة كاملة",
      thenLabel:      "بعد ذلك",
      thenPrice:      "900 درهم",
      perMonth:       "/شهرياً",
      thenNote:       "الاستضافة والصيانة والدعم مشمولة",
      note:
        "بدون التزام طويل — جرّب الشهر الأول، ثم قرّر بكل حرية.",
      cta: "استفد من العرض",
    },
    trust: {
      label: "من وراء هذا النظام",
      title: "أنظمة حقيقية، مبنية بالكامل وتعمل فعلياً",
      local:
        "أصمّم أنظمة الأتمتة للعيادات والمقاولات الصغيرة في المغرب.",
      cards: [
        {
          label: "نظام قيد التشغيل",
          title: "نظام محتوى ذاتي بالذكاء الاصطناعي",
          desc:
            "يبحث عن المواضيع، يكتب النصوص، يولّد الصوت والفيديوهات المترجمة، ثم ينشر يومياً على YouTube — دون أي تدخل يدوي.",
          cta: "شاهد قناة YouTube",
        },
        {
          label: "نظام قيد التشغيل",
          title: "نظام آلي لإدارة العملاء المحتملين والتواصل",
          desc:
            "يجمع جهات الاتصال ويتحقق منها، يحلل كل ملف بالذكاء الاصطناعي ويكتب رسالة مخصصة — تُعتمد بنقرة واحدة قبل الإرسال. الآلة تنجز العمل، والقرار الأخير للإنسان.",
          cta: "شاهد الفيديو التوضيحي",
        },
      ],
    },
    final: {
      title:  "مستعد للحديث؟",
      sub:    "اطرح أسئلتك مباشرة عبر واتساب — بدون أي التزام.",
      cta:    "تواصل عبر واتساب",
      orCall: "أو اتصل على",
    },
    footerLink: "MDigitalDev — عرض الموقع الكامل",
  },

  /* ─────────────────────────── ENGLISH ─────────────────────────── */
  en: {
    waMessage:
      "Hello, I saw your flyer and I'd like to learn more about the system for my clinic",
    switcherAria: "Choose language",
    hero: {
      badge:          "For dental clinics in Morocco",
      titleLead:      "A digital system that supports your clinic",
      titleHighlight: "24/7",
      sub:
        "Professional website, appointment requests via WhatsApp, automatic reminders and an AI assistant — all working even outside opening hours.",
      cta:    "Chat on WhatsApp",
      orCall: "or call",
    },
    problem: {
      label: "The problem",
      text:
        "A patient messages your clinic in the evening to book an appointment — and gets no reply until the next day. Often, they've already booked elsewhere.",
      punch: "The problem isn't your service — it's the timing.",
    },
    features: {
      label: "The system",
      title: "10 features working for your clinic",
      items: [
        { title: "Professional website",        desc: "A strong Google presence that attracts new patients." },
        { title: "Appointments via WhatsApp",   desc: "Patients can request an appointment at any time." },
        { title: "Automatic reminders",         desc: "Significantly reduces no-shows." },
        { title: "One-click confirmation",      desc: "Patients confirm or cancel, freeing up the slot." },
        { title: "Multilingual AI assistant",   desc: "Understands and replies in any language — ideal for foreign patients." },
        { title: "Google review requests",      desc: "Invites satisfied patients to leave a review." },
        { title: "Dashboard",                   desc: "Track appointments and statistics." },
        { title: "Smart waiting list",          desc: "Every cancellation is offered to another patient." },
        { title: "Post-treatment follow-up",    desc: "A message after the visit builds loyalty." },
        { title: "Weekly reports",              desc: "Appointments, no-shows, new patients." },
      ],
    },
    offer: {
      badge:          "Special offer — first clinics",
      setupLabel:     "Setup fee",
      setupPrice:     "0 DH",
      setupWasPrefix: "instead of",
      setupWas:       "12,000 DH",
      monthLabel:     "First month",
      monthValue:     "FREE",
      monthNote:      "Full trial",
      thenLabel:      "After that",
      thenPrice:      "900 DH",
      perMonth:       "/month",
      thenNote:       "Hosting, maintenance and support included",
      note:
        "No long-term commitment — try the first month, then decide freely.",
      cta: "Claim the offer",
    },
    trust: {
      label: "Who's behind this",
      title: "Real systems, built end-to-end and running in production",
      local:
        "I build automation systems for clinics and small businesses in Morocco.",
      cards: [
        {
          label: "Running in production",
          title: "Autonomous AI content pipeline",
          desc:
            "It researches topics, writes scripts, generates voiceovers and subtitled videos, then publishes daily to YouTube — with zero manual work.",
          cta: "See the YouTube channel",
        },
        {
          label: "Running in production",
          title: "Automated lead & communication system",
          desc:
            "It collects and verifies contacts, analyses each case with AI and drafts a personalised message — approved in one click before sending. The machine does the work; a human makes the final call.",
          cta: "Watch the demo video",
        },
      ],
    },
    final: {
      title:  "Ready to talk?",
      sub:    "Ask your questions directly on WhatsApp — no commitment.",
      cta:    "Chat on WhatsApp",
      orCall: "or call",
    },
    footerLink: "MDigitalDev — view the full site",
  },
};

/** wa.me link with the message pre-filled in the visitor's current language */
export function waLink(lang: ClinicLang): string {
  // encodeURIComponent leaves apostrophes as-is; encode them to match the flyer link exactly
  const text = encodeURIComponent(clinicTranslations[lang].waMessage).replace(/'/g, "%27");
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}
