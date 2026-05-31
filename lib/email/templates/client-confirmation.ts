interface ClientConfirmationProps {
  name: string;
  selectedPlan: string;
  language?: string;
}

interface LangStrings {
  subject:     string;
  greeting:    string;
  intro:       string;
  received:    string;
  inMeantime:  string;
  bookCall:    string;
  whatsapp:    string;
  footer:      string;
  planLabel:   string;
  notSure:     string;
}

const STRINGS: Record<string, LangStrings> = {
  en: {
    subject:    "✅ Got your message — I'll reply within 24h",
    greeting:   "Hi",
    intro:      "Thanks for reaching out to MDigitalDev!",
    received:   "I've received your inquiry and will personally get back to you within 24 hours.",
    inMeantime: "In the meantime, you can:",
    bookCall:   "📅 Book a Free 15-min Discovery Call",
    whatsapp:   "💬 WhatsApp me directly",
    footer:     "Looking forward to helping you scale your business!",
    planLabel:  "Selected Plan",
    notSure:    "Not Sure Yet",
  },
  ar: {
    subject:    "✅ استلمت رسالتك — سأرد خلال 24 ساعة",
    greeting:   "مرحبا",
    intro:      "شكرا لتواصلك مع MDigitalDev!",
    received:   "لقد استلمت استفسارك وسأرد عليك شخصيا خلال 24 ساعة.",
    inMeantime: "في غضون ذلك، يمكنك:",
    bookCall:   "📅 احجز مكالمة استكشافية مجانية لمدة 15 دقيقة",
    whatsapp:   "💬 تواصل معي مباشرة عبر واتساب",
    footer:     "أتطلع إلى مساعدتك في تنمية أعمالك!",
    planLabel:  "الباقة المختارة",
    notSure:    "غير محدد بعد",
  },
  fr: {
    subject:    "✅ Message reçu — je réponds sous 24h",
    greeting:   "Bonjour",
    intro:      "Merci de votre intérêt pour MDigitalDev!",
    received:   "J'ai bien reçu votre demande et je vous répondrai personnellement sous 24 heures.",
    inMeantime: "En attendant, vous pouvez:",
    bookCall:   "📅 Réserver un appel découverte gratuit de 15 min",
    whatsapp:   "💬 Me contacter directement sur WhatsApp",
    footer:     "Au plaisir de vous aider à développer votre activité!",
    planLabel:  "Plan sélectionné",
    notSure:    "Pas encore décidé",
  },
};

const PLAN_LABELS: Record<string, Record<string, string>> = {
  smart_starter:       { en: "Smart Starter",     ar: "Smart Starter",     fr: "Smart Starter"     },
  business_auto_pilot: { en: "Business Auto-Pilot", ar: "Business Auto-Pilot", fr: "Business Auto-Pilot" },
  enterprise:          { en: "Enterprise AI Elite", ar: "Enterprise AI Elite", fr: "Enterprise AI Elite" },
};

export function clientConfirmationSubject(language = "en"): string {
  return (STRINGS[language] ?? STRINGS.en).subject;
}

export function clientConfirmationHtml(p: ClientConfirmationProps): string {
  const lang = p.language ?? "en";
  const s    = STRINGS[lang] ?? STRINGS.en;
  const isRTL = lang === "ar";
  const dir   = isRTL ? "rtl" : "ltr";

  const planLabel = PLAN_LABELS[p.selectedPlan]?.[lang] ?? s.notSure;

  return `<!DOCTYPE html>
<html dir="${dir}" lang="${lang}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;direction:${dir}">
<div style="max-width:600px;margin:0 auto;padding:40px 16px">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#f97316,#ec4899);padding:40px 32px;border-radius:16px 16px 0 0;text-align:center">
    <h1 style="color:#fff;margin:0;font-size:28px;font-weight:700;letter-spacing:-0.5px">MDigitalDev</h1>
    <p style="color:rgba(255,255,255,.9);margin:10px 0 0;font-size:15px">${s.intro}</p>
  </div>

  <!-- Body -->
  <div style="background:#fff;padding:40px 32px;border-radius:0 0 16px 16px;color:#333;line-height:1.65">

    <p style="font-size:18px;font-weight:600;margin:0 0 16px">${s.greeting} ${p.name},</p>

    <p style="font-size:15px;margin:0 0 16px;color:#555">${s.received}</p>

    <!-- Plan badge -->
    <div style="background:#fff7ed;border-${isRTL ? "right" : "left"}:4px solid #f97316;border-radius:8px;padding:16px 20px;margin:24px 0">
      <p style="color:#999;margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:.5px">${s.planLabel}</p>
      <p style="color:#f97316;margin:0;font-size:17px;font-weight:700">${planLabel}</p>
    </div>

    <p style="font-size:15px;font-weight:600;margin:28px 0 16px;color:#333">${s.inMeantime}</p>

    <!-- CTAs -->
    <div style="text-align:center;margin:0 0 28px">
      <a href="https://calendly.com/mohamedyouli2017/30min"
         style="display:inline-block;background:linear-gradient(135deg,#f97316,#ec4899);color:#fff;padding:14px 28px;text-decoration:none;border-radius:10px;font-weight:600;font-size:14px;margin:6px">
        ${s.bookCall}
      </a>
      <br>
      <a href="https://wa.me/212669586001"
         style="display:inline-block;background:#25D366;color:#fff;padding:12px 28px;text-decoration:none;border-radius:10px;font-weight:600;font-size:14px;margin:6px">
        ${s.whatsapp}
      </a>
    </div>

    <p style="font-size:15px;margin:0 0 28px;color:#555">${s.footer}</p>

    <!-- Signature -->
    <div style="border-top:1px solid #f0f0f0;padding-top:20px;margin-top:8px">
      <p style="margin:0;font-weight:700;font-size:15px;color:#111">Mohamed Youli</p>
      <p style="margin:4px 0 0;color:#888;font-size:13px">Founder, MDigitalDev</p>
      <p style="margin:4px 0 0;font-size:13px">
        <a href="https://www.mdigitaldev.com" style="color:#f97316;text-decoration:none">mdigitaldev.com</a>
      </p>
    </div>
  </div>

  <p style="color:#aaa;font-size:11px;text-align:center;margin-top:16px">
    MDigitalDev · mdigitaldev.com
  </p>
</div>
</body>
</html>`;
}
