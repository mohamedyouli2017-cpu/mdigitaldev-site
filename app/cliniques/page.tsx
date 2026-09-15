import type { Metadata } from "next";
import CliniquesClient from "./CliniquesClient";
import { isClinicLang } from "./translations";

const TITLE       = "Système digital pour cabinets dentaires au Maroc";
const DESCRIPTION =
  "Site web professionnel, rendez-vous via WhatsApp, rappels automatiques et assistant IA pour votre cabinet dentaire — actif 24h/24, 7j/7. Installation offerte et premier mois gratuit.";

export const metadata: Metadata = {
  title:       TITLE,
  description: DESCRIPTION,
  keywords: [
    "cabinet dentaire Maroc",
    "site web dentiste",
    "rendez-vous WhatsApp",
    "rappels automatiques patients",
    "assistant IA clinique",
    "logiciel cabinet dentaire",
    "MDigitalDev",
  ],
  alternates: {
    canonical: "/cliniques",
    languages: {
      fr: "/cliniques",
      ar: "/cliniques?lang=ar",
      en: "/cliniques?lang=en",
    },
  },
  openGraph: {
    type:            "website",
    locale:          "fr_MA",
    alternateLocale: ["ar_MA", "en_US"],
    url:             "/cliniques",
    siteName:        "MDigitalDev",
    title:           `${TITLE} | MDigitalDev`,
    description:     DESCRIPTION,
  },
  twitter: {
    card:        "summary_large_image",
    title:       `${TITLE} | MDigitalDev`,
    description: DESCRIPTION,
  },
};

export default async function CliniquesPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const { lang } = await searchParams;
  // Server-render the requested language so ?lang=ar arrives already RTL (no flash)
  const initialLang = isClinicLang(lang) ? lang : "fr";
  return <CliniquesClient initialLang={initialLang} />;
}
