import type { Lang } from "./translations";

export type PolicyType = "privacy" | "terms";

export interface PolicySection {
  heading: string;
  body: string;
}

export interface PolicyDoc {
  title: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export const policies: Record<Lang, Record<PolicyType, PolicyDoc>> = {

  /* ─────────────────────── ENGLISH ─────────────────────── */
  en: {
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: May 2026",
      sections: [
        {
          heading: "Introduction",
          body: "MDigitalDev (\"we,\" \"us,\" \"our\") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information when you interact with our website or services. Services are operated by Mohamed Youli, founder of MDigitalDev.",
        },
        {
          heading: "1. Information We Collect",
          body: "Information You Provide: Name and contact details (email, phone) · Business information (company name, industry) · Project requirements and specifications · Payment information (processed securely via third-party providers) · Communication content (messages, calls, support tickets).\n\nInformation from AI Interactions: Our AI Assistant may process conversation data to better assist your inquiries. This data is encrypted and used only to improve service quality.\n\nAutomatically Collected Information: IP address and approximate location · Browser type and device information · Pages visited and time spent on the website · Referral sources.\n\nClient Project Data (Active Clients Only): For maintenance clients we may store — website analytics data · AI conversation logs (for monitoring and improvement) · API usage statistics · Workflow execution data · System backups (retained for 30 days).",
        },
        {
          heading: "2. How We Use Your Information",
          body: "We use your data to: respond to inquiries and provide project quotes · deliver AI and automation services · process payments and manage billing · maintain professional communication during and after project delivery · monitor and maintain client systems (active maintenance clients) · improve our services and AI models · comply with legal obligations.\n\nWe do NOT sell, rent, or share your personal data with third parties for marketing purposes.",
        },
        {
          heading: "3. Third-Party Services & Infrastructure",
          body: "Infrastructure & Security: Cloudflare (security, CDN, DNS) · VPS hosting providers · SSL/TLS encryption providers.\n\nCommunication: WhatsApp Business (real-time support) · Email service providers · Calendar and scheduling tools.\n\nAI & Automation: OpenAI / Anthropic / Google AI APIs · n8n (workflow automation) · Voice synthesis and image generation services.\n\nPayment Processing: Secure payment gateways (Stripe, PayPal, or as specified at invoicing).\n\nThese providers have their own privacy policies and security measures. We select partners who meet high privacy standards.",
        },
        {
          heading: "4. Data Retention",
          body: "Inquiries from non-clients: 12 months · Active client data: duration of maintenance contract + 90 days · Payment records: 7 years (legal requirement) · AI conversation logs: 6 months · Backups: 30 days rolling · Marketing communications: until you unsubscribe.",
        },
        {
          heading: "5. Your Rights",
          body: "Under GDPR, CCPA, and global privacy standards, you have the right to: access your personal data · correct inaccurate information · request deletion of your data (\"right to be forgotten\") · restrict or object to processing · data portability (export your data) · withdraw consent at any time · lodge a complaint with a supervisory authority.\n\nTo exercise these rights, contact: contact@mdigitaldev.com. We will respond within 30 days.",
        },
        {
          heading: "6. Security Measures",
          body: "We protect your data using: HTTPS/TLS encryption for all transmissions · encrypted storage for sensitive data · access controls and authentication · regular security audits · secure backup procedures · API key encryption and rotation.\n\nWhile we implement industry-standard security, no system is 100% secure. We will notify affected clients within 72 hours of any confirmed data breach.",
        },
        {
          heading: "7. Cookies & Tracking",
          body: "We use essential cookies (required for site functionality) and privacy-focused, anonymized analytics cookies. We do not use third-party advertising cookies. You can control cookie preferences through your browser settings.",
        },
        {
          heading: "8. Children's Privacy",
          body: "Our services are not intended for users under 18. We do not knowingly collect data from minors. If we discover such data has been collected, we will delete it promptly.",
        },
        {
          heading: "9. International Data Transfers",
          body: "Your data may be processed in countries outside your residence. We ensure adequate protection through Standard Contractual Clauses (where applicable), working exclusively with GDPR-compliant providers, and encryption during all transfers.",
        },
        {
          heading: "10. Changes to This Policy",
          body: "We may update this policy from time to time. Significant changes will be communicated via email to active clients at least 30 days in advance. The \"Last updated\" date at the top reflects the most recent revision.",
        },
        {
          heading: "11. Contact Information",
          body: "For privacy concerns, data requests, or questions:\n\nMDigitalDev — Founded by Mohamed Youli\nEmail: contact@mdigitaldev.com\nWhatsApp: +212 669 586 001\n\nWe aim to respond to all privacy inquiries within 7 business days.",
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      lastUpdated: "Last updated: May 2026",
      sections: [
        {
          heading: "1. Services",
          body: "MDigitalDev provides web design, PWA development, AI Agent development, intelligent workflow automation, business process automation, digital ordering solutions, third-party API integrations, and automated communication channel setups, across multiple industries including restaurants, e-commerce, corporate, healthcare, and real estate. All services and their scope are agreed upon in writing before any work commences. Services are operated by Mohamed Youli, founder of MDigitalDev.",
        },
        {
          heading: "2. Project Timelines & Asset Delivery",
          body: "Delivery timelines are project-specific and will be defined in the official proposal or invoice. The countdown begins only after all required assets are received in full. Required assets include, but are not limited to: brand logo files · photography or image assets · written copy and content · colour palette specifications · domain or hosting access credentials.\n\nAny delay caused by late or incomplete asset submission will extend the delivery timeline proportionally. MDigitalDev shall not be held liable for missed deadlines arising from the client's failure to provide assets in a timely and complete manner.",
        },
        {
          heading: "3. Payment Terms",
          body: "Setup Fees: A non-refundable deposit of 50% of the setup fee is required before project work begins. The remaining 50% balance must be paid in full before the final project is delivered, made live, or transferred to the client. No handover of any deliverable — including source files, credentials, or live deployment — will occur until 100% of the setup fee has been received.\n\nMonthly Maintenance: Monthly maintenance fees are billed in advance on the same calendar day each month. The first maintenance payment is due upon project delivery. Failure to pay maintenance fees within 7 days of the due date may result in service suspension, including pausing AI agents, suspending automations, and disabling website hosting.\n\nCommitment Periods: Smart Starter requires a 3-month minimum commitment. Business Auto-Pilot requires a 6-month minimum commitment. Enterprise AI Elite requires a 12-month minimum commitment. Early termination before the commitment period ends will result in a fee equivalent to 50% of the remaining months on the contract.\n\nPre-Paid Discounts: Clients who choose to pre-pay 6 or 12 months upfront receive a discount as specified on the pricing page. Pre-paid amounts are non-refundable but may be paused (deferred) for up to 30 days within the contract period upon written request.\n\nCurrency & Payment Methods: Payments are accepted in USD or as agreed in the invoice. Accepted methods include bank transfer, credit/debit card, and other methods specified at invoicing.",
        },
        {
          heading: "4. Intellectual Property",
          body: "Upon receipt of full payment of the setup fee, the client is granted a perpetual licence to use the final delivered product — including the live website and its visual design — for their business purposes. The underlying source code, development frameworks, proprietary tools, and any reusable components developed by MDigitalDev remain the exclusive intellectual property of MDigitalDev and are not transferred to the client as part of the standard agreement.\n\nFull transfer of source code ownership is available exclusively through a separate written buyout agreement, subject to an additional agreed fee. MDigitalDev retains the right to display the completed work in its portfolio and case studies, unless the client formally requests otherwise in writing.\n\nAI workflows, automation logic, and custom integrations developed for clients remain proprietary to MDigitalDev. Clients receive usage rights, not ownership rights.",
        },
        {
          heading: "5. Hosting & Infrastructure",
          body: "Client websites and AI systems are hosted on MDigitalDev's secure infrastructure as part of the maintenance agreement. This includes: server hosting and bandwidth · SSL certificates · daily automated backups (retained for 30 days) · security monitoring.\n\nShould the client wish to migrate to their own infrastructure, MDigitalDev will provide reasonable assistance subject to a migration fee. Source code and credentials transfer is subject to the Intellectual Property provisions in Section 4.",
        },
        {
          heading: "6. Support & Maintenance Plans",
          body: "Smart Starter Maintenance ($97/month): Hosting on MDigitalDev infrastructure · SSL Certificate · Daily Backups · Security Updates · Email support (48-hour response) · Up to 2 hours of minor edits per month · Performance monitoring.\n\nBusiness Auto-Pilot Maintenance ($297/month): All Smart Starter features · AI Models updates and adjustments · n8n workflow monitoring · Priority bug fixes · Up to 5 hours of edits per month · Email support (24-hour response) · Monthly performance report · API costs included up to $50/month.\n\nEnterprise AI Elite Maintenance ($797/month): All Business Auto-Pilot features · 24/7 system monitoring · Priority support (12-hour response) · Up to 10 hours of edits per month · Custom integrations as needed · Dedicated VPS resources · API costs included up to $200/month · WhatsApp direct support · Quarterly strategy calls.",
        },
        {
          heading: "6.2 Out-of-Scope Work",
          body: "New features, design redesigns, or major structural changes are not covered under any maintenance plan and will be scoped and billed separately as additional projects.",
        },
        {
          heading: "6.3 Support Channels",
          body: "During active maintenance, clients may reach out via WhatsApp: +212 669 586 001 or Email: contact@mdigitaldev.com. Support requests submitted through other channels cannot be guaranteed a response.",
        },
        {
          heading: "7. Revisions Policy",
          body: "Each project includes a defined number of revision rounds during the setup phase: Smart Starter — 2 rounds · Business Auto-Pilot — 4 rounds · Enterprise AI Elite — 6 rounds.\n\nAdditional revisions during setup will be billed at $75/hour. A revision is defined as adjustments to existing delivered work and does not include new features or structural redesigns.\n\nPost-launch edits are covered under the Monthly Maintenance plan according to the hours included in each tier.",
        },
        {
          heading: "8. Limitation of Liability",
          body: "MDigitalDev is not liable for indirect, incidental, or consequential damages arising from the use of or inability to use the delivered product. MDigitalDev's total liability in any circumstance is limited to the amount the client paid for the specific service in question during the previous 3 months.\n\nMDigitalDev bears no responsibility for any changes, updates, feature modifications, service interruptions, or price increases introduced by third-party service providers — including but not limited to API providers (OpenAI, Anthropic, etc.), hosting platforms, and cloud services — after the project has been delivered. Any additional costs arising from such changes are the responsibility of the client and may result in maintenance plan adjustments.\n\nMDigitalDev guarantees 99% uptime for hosted services. Downtime caused by third-party providers, force majeure events, or scheduled maintenance windows is excluded from this guarantee.",
        },
        {
          heading: "9. Client Responsibilities",
          body: "The client agrees to: provide accurate and complete information for project execution · respond to communication within reasonable timeframes · not use the delivered services for illegal, harmful, or unethical purposes · comply with all applicable laws regarding their use of AI agents and automations · pay all fees on time as per the agreed schedule.\n\nFailure to meet these responsibilities may result in service suspension or termination without refund.",
        },
        {
          heading: "10. Termination",
          body: "Either party may terminate the maintenance agreement after the commitment period by providing 30 days written notice. Setup fees are non-refundable. Pre-paid maintenance fees beyond the commitment period are refundable on a pro-rata basis.\n\nMDigitalDev reserves the right to immediately terminate services for non-payment, breach of these terms, or use of services in a manner that risks legal liability.",
        },
        {
          heading: "11. Confidentiality",
          body: "MDigitalDev agrees to keep all client-provided materials, business data, and project details strictly confidential. Client information will not be disclosed, shared, or used for purposes outside the scope of the agreed project. This confidentiality obligation remains in effect indefinitely after project completion.",
        },
        {
          heading: "12. Governing Law & Disputes",
          body: "Any dispute shall first be addressed through direct communication or mediation. If unresolved, the governing law and jurisdiction will be determined based on the specific project agreement or mutual location of the parties. The client agrees that any legal action shall be brought in the appropriate venue as agreed in the project contract.",
        },
        {
          heading: "13. Changes to Terms",
          body: "MDigitalDev reserves the right to update these Terms of Service. Existing clients will be notified 30 days in advance of any material changes. Continued use of services after the effective date constitutes acceptance of the updated terms.",
        },
        {
          heading: "14. Contact",
          body: "For questions about these terms:\nEmail: contact@mdigitaldev.com\nWhatsApp: +212 669 586 001",
        },
      ],
    },
  },

  /* ─────────────────────── FRANÇAIS ─────────────────────── */
  fr: {
    privacy: {
      title: "Politique de Confidentialité",
      lastUpdated: "Dernière mise à jour : mai 2026",
      sections: [
        {
          heading: "Introduction",
          body: "MDigitalDev (\"nous\") s'engage à protéger votre vie privée. Cette politique explique comment nous collectons, utilisons et protégeons vos informations lorsque vous interagissez avec notre site ou nos services. Les services sont opérés par Mohamed Youli, fondateur de MDigitalDev.",
        },
        {
          heading: "1. Informations Collectées",
          body: "Informations que vous fournissez : Nom et coordonnées (e-mail, téléphone) · Informations professionnelles (nom de l'entreprise, secteur) · Exigences et spécifications du projet · Informations de paiement (traitées de manière sécurisée par des prestataires tiers) · Contenu des communications (messages, appels, tickets de support).\n\nInformations issues des interactions IA : Notre assistant IA peut traiter des données de conversation pour mieux répondre à vos demandes. Ces données sont chiffrées et utilisées uniquement pour améliorer la qualité du service.\n\nInformations collectées automatiquement : Adresse IP et localisation approximative · Type de navigateur et informations sur l'appareil · Pages consultées et temps passé sur le site · Sources de référence.\n\nDonnées de projet client (clients actifs uniquement) : Pour les clients en maintenance, nous pouvons stocker — données d'analyse web · journaux de conversations IA (pour la surveillance et l'amélioration) · statistiques d'utilisation des API · données d'exécution des workflows · sauvegardes système (conservées 30 jours).",
        },
        {
          heading: "2. Utilisation de Vos Informations",
          body: "Nous utilisons vos données pour : répondre aux demandes et fournir des devis · livrer des services IA et d'automatisation · traiter les paiements et gérer la facturation · maintenir une communication professionnelle pendant et après la livraison du projet · surveiller et maintenir les systèmes clients (clients actifs en maintenance) · améliorer nos services et modèles IA · respecter les obligations légales.\n\nNous ne vendons, ne louons ni ne partageons pas vos données personnelles avec des tiers à des fins commerciales.",
        },
        {
          heading: "3. Services Tiers & Infrastructure",
          body: "Infrastructure & Sécurité : Cloudflare (sécurité, CDN, DNS) · Fournisseurs d'hébergement VPS · Fournisseurs de chiffrement SSL/TLS.\n\nCommunication : WhatsApp Business (support en temps réel) · Fournisseurs de services e-mail · Outils de calendrier et de planification.\n\nIA & Automatisation : APIs OpenAI / Anthropic / Google AI · n8n (automatisation des workflows) · Services de synthèse vocale et de génération d'images.\n\nTraitement des paiements : Passerelles de paiement sécurisées (Stripe, PayPal, ou tel que spécifié à la facturation).\n\nCes prestataires disposent de leurs propres politiques de confidentialité et mesures de sécurité. Nous sélectionnons uniquement des partenaires répondant à des standards élevés de protection des données.",
        },
        {
          heading: "4. Conservation des Données",
          body: "Demandes de non-clients : 12 mois · Données clients actifs : durée du contrat de maintenance + 90 jours · Enregistrements de paiement : 7 ans (obligation légale) · Journaux de conversations IA : 6 mois · Sauvegardes : 30 jours glissants · Communications marketing : jusqu'à désinscription.",
        },
        {
          heading: "5. Vos Droits",
          body: "Conformément au RGPD, au CCPA et aux normes mondiales de confidentialité, vous avez le droit de : accéder à vos données personnelles · corriger des informations inexactes · demander la suppression de vos données (\"droit à l'effacement\") · restreindre ou vous opposer au traitement · la portabilité des données (exporter vos données) · retirer votre consentement à tout moment · déposer une plainte auprès d'une autorité de contrôle.\n\nPour exercer ces droits, contactez : contact@mdigitaldev.com. Nous répondrons dans un délai de 30 jours.",
        },
        {
          heading: "6. Mesures de Sécurité",
          body: "Nous protégeons vos données via : le chiffrement HTTPS/TLS pour toutes les transmissions · le stockage chiffré des données sensibles · les contrôles d'accès et l'authentification · des audits de sécurité réguliers · des procédures de sauvegarde sécurisées · le chiffrement et la rotation des clés API.\n\nBien que nous appliquions des mesures de sécurité conformes aux standards du secteur, aucun système n'est infaillible à 100%. Nous notifierons les clients concernés dans les 72 heures suivant toute violation de données confirmée.",
        },
        {
          heading: "7. Cookies & Suivi",
          body: "Nous utilisons des cookies essentiels (nécessaires au fonctionnement du site) et des cookies d'analyse axés sur la confidentialité et anonymisés. Nous n'utilisons pas de cookies publicitaires tiers. Vous pouvez contrôler vos préférences en matière de cookies via les paramètres de votre navigateur.",
        },
        {
          heading: "8. Protection des Mineurs",
          body: "Nos services ne sont pas destinés aux utilisateurs de moins de 18 ans. Nous ne collectons pas sciemment de données personnelles auprès de mineurs. Si nous détectons une telle collecte, nous supprimerons ces données sans délai.",
        },
        {
          heading: "9. Transferts Internationaux de Données",
          body: "Vos données peuvent être traitées dans des pays différents du vôtre. Nous garantissons une protection adéquate via les Clauses Contractuelles Standard (le cas échéant), en travaillant exclusivement avec des prestataires conformes au RGPD, et en chiffrant toutes les données lors des transferts.",
        },
        {
          heading: "10. Modifications de cette Politique",
          body: "Nous pouvons mettre à jour cette politique ponctuellement. Les modifications significatives seront communiquées par e-mail aux clients actifs au moins 30 jours à l'avance. La date \"Dernière mise à jour\" en haut de ce document reflète la révision la plus récente.",
        },
        {
          heading: "11. Coordonnées",
          body: "Pour toute question relative à la confidentialité ou demande de données :\n\nMDigitalDev — Fondé par Mohamed Youli\nE-mail : contact@mdigitaldev.com\nWhatsApp : +212 669 586 001\n\nNous nous engageons à répondre à toutes les demandes de confidentialité dans un délai de 7 jours ouvrés.",
        },
      ],
    },
    terms: {
      title: "Conditions d'Utilisation",
      lastUpdated: "Dernière mise à jour : mai 2026",
      sections: [
        {
          heading: "1. Services",
          body: "MDigitalDev fournit des services de conception web, développement PWA, développement d'agents IA, automatisation intelligente des flux de travail, automatisation des processus métier, solutions de commande digitale, intégrations d'API tierces et mise en place de canaux de communication automatisés, dans de nombreux secteurs dont la restauration, le commerce en ligne, le corporate, la santé et l'immobilier. Toute prestation et sa portée sont définies par écrit avant le début des travaux. Les services sont opérés par Mohamed Youli, fondateur de MDigitalDev.",
        },
        {
          heading: "2. Délais de Livraison & Fourniture des Ressources",
          body: "Les délais de livraison sont spécifiques à chaque projet et seront définis dans le devis ou la facture officielle. Le compte à rebours commence uniquement après réception complète de toutes les ressources requises. Ces ressources comprennent notamment : fichiers logo · visuels et photos · textes rédigés et contenus · spécifications de couleurs · accès au nom de domaine et à l'hébergement.\n\nTout retard causé par une fourniture tardive ou incomplète des ressources prolongera proportionnellement le délai de livraison. MDigitalDev ne saurait être tenu responsable des retards imputables au manquement du client à fournir les ressources en temps voulu et de manière complète.",
        },
        {
          heading: "3. Conditions de Paiement",
          body: "Frais d'installation : Un acompte non remboursable de 50% des frais d'installation est exigé avant le début des travaux. Le solde restant de 50% doit être intégralement réglé avant la livraison finale, la mise en ligne ou le transfert du projet au client. Aucune remise de livrable — fichiers sources, identifiants ou déploiement en ligne — n'interviendra avant réception de 100% des frais d'installation.\n\nMaintenance mensuelle : Les frais de maintenance mensuelle sont facturés à l'avance, le même jour calendaire chaque mois. Le premier paiement de maintenance est dû à la livraison du projet. Le non-paiement des frais de maintenance dans un délai de 7 jours après l'échéance peut entraîner une suspension des services, incluant notamment la mise en pause des agents IA, la suspension des automatisations et la désactivation de l'hébergement.\n\nPériodes d'engagement : Smart Starter — engagement minimum de 3 mois. Business Auto-Pilot — engagement minimum de 6 mois. Enterprise AI Elite — engagement minimum de 12 mois. La résiliation anticipée avant la fin de la période d'engagement entraîne des frais équivalents à 50% des mois restants au contrat.\n\nRemises prépayées : Les clients qui choisissent de prépayer 6 ou 12 mois bénéficient d'une remise telle que précisée sur la page tarifs. Les montants prépayés sont non remboursables mais peuvent être suspendus (différés) jusqu'à 30 jours dans la période contractuelle sur demande écrite.\n\nDevise & Modes de paiement : Les paiements sont acceptés en USD ou selon accord dans la facture. Les méthodes acceptées incluent virement bancaire, carte de crédit/débit et autres méthodes précisées à la facturation.",
        },
        {
          heading: "4. Propriété Intellectuelle",
          body: "À réception du paiement intégral des frais d'installation, le client se voit accorder une licence perpétuelle d'utilisation du produit final livré — incluant le site web en ligne et son design visuel — à des fins professionnelles. Le code source sous-jacent, les frameworks de développement, les outils propriétaires et tous les composants réutilisables développés par MDigitalDev demeurent la propriété intellectuelle exclusive de MDigitalDev et ne sont pas cédés au client dans le cadre de l'accord standard.\n\nLe transfert complet de la propriété du code source est disponible uniquement via un accord de rachat écrit séparé, moyennant des frais supplémentaires convenus. MDigitalDev conserve le droit de présenter le travail accompli dans son portfolio et ses études de cas, sauf demande contraire du client formulée par écrit.\n\nLes workflows IA, la logique d'automatisation et les intégrations personnalisées développées pour les clients restent la propriété de MDigitalDev. Les clients reçoivent des droits d'usage, non des droits de propriété.",
        },
        {
          heading: "5. Hébergement & Infrastructure",
          body: "Les sites web et systèmes IA des clients sont hébergés sur l'infrastructure sécurisée de MDigitalDev dans le cadre du contrat de maintenance. Cela inclut : hébergement serveur et bande passante · certificats SSL · sauvegardes automatisées quotidiennes (conservées 30 jours) · surveillance sécurité.\n\nSi le client souhaite migrer vers sa propre infrastructure, MDigitalDev fournira une assistance raisonnable sous réserve de frais de migration. Le transfert du code source et des identifiants est soumis aux dispositions de propriété intellectuelle de l'article 4.",
        },
        {
          heading: "6. Plans de Support & Maintenance",
          body: "Smart Starter ($97/mois) : Hébergement sur l'infrastructure MDigitalDev · Certificat SSL · Sauvegardes quotidiennes · Mises à jour de sécurité · Support e-mail (réponse sous 48h) · Jusqu'à 2h de modifications mineures par mois · Surveillance des performances.\n\nBusiness Auto-Pilot ($297/mois) : Tout le Smart Starter · Mises à jour et ajustements des modèles IA · Surveillance des workflows n8n · Corrections de bugs prioritaires · Jusqu'à 5h de modifications par mois · Support e-mail (réponse sous 24h) · Rapport de performance mensuel · Coûts API inclus jusqu'à 50$/mois.\n\nEnterprise AI Elite ($797/mois) : Tout le Business Auto-Pilot · Surveillance 24h/24 · Support prioritaire (réponse sous 12h) · Jusqu'à 10h de modifications par mois · Intégrations personnalisées selon besoin · Ressources VPS dédiées · Coûts API inclus jusqu'à 200$/mois · Support WhatsApp direct · Appels stratégiques trimestriels.",
        },
        {
          heading: "6.2 Travaux Hors Périmètre",
          body: "Les nouvelles fonctionnalités, refontes de design ou modifications structurelles majeures ne sont pas couvertes par les plans de maintenance et feront l'objet d'un devis et d'une facturation séparés en tant que projets additionnels.",
        },
        {
          heading: "6.3 Canaux de Support",
          body: "Pendant la maintenance active, les clients peuvent nous contacter via WhatsApp : +212 669 586 001 ou E-mail : contact@mdigitaldev.com. Les demandes soumises par d'autres canaux ne peuvent être garanties d'une réponse.",
        },
        {
          heading: "7. Politique de Révisions",
          body: "Chaque projet inclut un nombre défini de cycles de révisions pendant la phase d'installation : Smart Starter — 2 cycles · Business Auto-Pilot — 4 cycles · Enterprise AI Elite — 6 cycles.\n\nLes révisions supplémentaires pendant la phase d'installation seront facturées à 75$/heure. Une révision est définie comme des ajustements au travail livré existant et n'inclut pas de nouvelles fonctionnalités ni de refonte structurelle.\n\nLes modifications post-lancement sont couvertes par le plan de maintenance mensuelle selon les heures incluses dans chaque formule.",
        },
        {
          heading: "8. Limitation de Responsabilité",
          body: "MDigitalDev ne saurait être tenu responsable des dommages indirects, accessoires ou consécutifs liés à l'utilisation du produit livré ou à l'impossibilité de l'utiliser. La responsabilité totale de MDigitalDev est limitée au montant payé par le client pour le service concerné au cours des 3 mois précédents.\n\nMDigitalDev décline toute responsabilité pour les modifications, mises à jour, changements de fonctionnalités, interruptions de service ou hausses de tarifs introduits par des prestataires tiers — notamment les fournisseurs d'API (OpenAI, Anthropic, etc.), plateformes d'hébergement et services cloud — postérieurement à la livraison. Tout coût supplémentaire en découlant est à la charge du client et peut entraîner des ajustements du plan de maintenance.\n\nMDigitalDev garantit une disponibilité de 99% pour les services hébergés. Les indisponibilités causées par des prestataires tiers, des cas de force majeure ou des fenêtres de maintenance planifiées sont exclues de cette garantie.",
        },
        {
          heading: "9. Responsabilités du Client",
          body: "Le client s'engage à : fournir des informations exactes et complètes pour l'exécution du projet · répondre aux communications dans des délais raisonnables · ne pas utiliser les services livrés à des fins illégales, nuisibles ou contraires à l'éthique · respecter toutes les lois applicables concernant l'utilisation des agents IA et automatisations · régler toutes les factures dans les délais convenus.\n\nLe non-respect de ces obligations peut entraîner la suspension ou la résiliation des services sans remboursement.",
        },
        {
          heading: "10. Résiliation",
          body: "L'une ou l'autre des parties peut résilier le contrat de maintenance après la période d'engagement en fournissant un préavis écrit de 30 jours. Les frais d'installation sont non remboursables. Les frais de maintenance prépayés au-delà de la période d'engagement sont remboursables au prorata.\n\nMDigitalDev se réserve le droit de résilier immédiatement les services en cas de non-paiement, de violation de ces conditions, ou d'utilisation des services susceptible d'engager une responsabilité légale.",
        },
        {
          heading: "11. Confidentialité",
          body: "MDigitalDev s'engage à maintenir strictement confidentiels tous les documents fournis par le client, les données commerciales et les détails du projet. Ces informations ne seront ni divulguées, ni partagées, ni utilisées à des fins extérieures au périmètre du projet convenu. Cette obligation de confidentialité reste en vigueur indéfiniment après l'achèvement du projet.",
        },
        {
          heading: "12. Droit Applicable & Litiges",
          body: "Tout litige sera d'abord traité par voie de communication directe ou de médiation. En l'absence de résolution, la loi applicable et la juridiction compétente seront déterminées en fonction de l'accord de projet spécifique ou de la localisation mutuelle des parties. Le client accepte que toute action légale soit intentée devant la juridiction appropriée convenue dans le contrat de projet.",
        },
        {
          heading: "13. Modifications des Conditions",
          body: "MDigitalDev se réserve le droit de mettre à jour ces Conditions d'Utilisation. Les clients existants seront notifiés 30 jours avant toute modification substantielle. La poursuite de l'utilisation des services après la date d'entrée en vigueur vaut acceptation des conditions mises à jour.",
        },
        {
          heading: "14. Contact",
          body: "Pour toute question relative à ces conditions :\nE-mail : contact@mdigitaldev.com\nWhatsApp : +212 669 586 001",
        },
      ],
    },
  },

  /* ─────────────────────── ARABIC ─────────────────────── */
  ar: {
    privacy: {
      title: "سياسة الخصوصية",
      lastUpdated: "آخر تحديث: مايو 2026",
      sections: [
        {
          heading: "مقدمة",
          body: "تلتزم MDigitalDev (\"نحن\") بحماية خصوصيتك. توضح هذه السياسة كيفية جمع معلوماتك واستخدامها وحمايتها عند تفاعلك مع موقعنا أو خدماتنا. تُدار الخدمات من قِبَل محمد يولي، مؤسس MDigitalDev.",
        },
        {
          heading: "١. المعلومات التي نجمعها",
          body: "المعلومات التي تقدمها: الاسم وبيانات التواصل (البريد الإلكتروني، الهاتف) · معلومات العمل (اسم الشركة، القطاع) · متطلبات المشروع ومواصفاته · معلومات الدفع (تُعالج بأمان عبر مزودين تابعين لجهات خارجية) · محتوى التواصل (الرسائل، المكالمات، طلبات الدعم).\n\nمعلومات من تفاعلات الذكاء الاصطناعي: قد يعالج مساعدنا الذكي بيانات المحادثة لتقديم مساعدة أفضل. هذه البيانات مشفرة وتُستخدم فقط لتحسين جودة الخدمة.\n\nمعلومات تُجمع تلقائياً: عنوان IP والموقع التقريبي · نوع المتصفح ومعلومات الجهاز · الصفحات المزارة والوقت المقضي على الموقع · مصادر الإحالة.\n\nبيانات مشاريع العملاء (العملاء النشطون فقط): للعملاء في عقد الصيانة قد نحتفظ بـ — بيانات تحليلات الموقع · سجلات محادثات الذكاء الاصطناعي (للمراقبة والتحسين) · إحصاءات استخدام API · بيانات تنفيذ مسارات العمل · نسخ احتياطية (تُحفظ 30 يوماً).",
        },
        {
          heading: "٢. كيفية استخدام معلوماتك",
          body: "نستخدم بياناتك من أجل: الرد على الاستفسارات وتقديم عروض الأسعار · تقديم خدمات الذكاء الاصطناعي والأتمتة · معالجة المدفوعات وإدارة الفواتير · الحفاظ على التواصل المهني خلال المشروع وبعده · مراقبة وصيانة أنظمة العملاء (العملاء النشطون في الصيانة) · تحسين خدماتنا ونماذج الذكاء الاصطناعي · الامتثال للالتزامات القانونية.\n\nنحن لا نبيع بياناتك الشخصية أو نؤجرها أو نشاركها مع أطراف ثالثة لأغراض تسويقية.",
        },
        {
          heading: "٣. خدمات الأطراف الثالثة والبنية التحتية",
          body: "البنية التحتية والأمان: Cloudflare (الأمان، CDN، DNS) · مزودو استضافة VPS · مزودو تشفير SSL/TLS.\n\nالتواصل: واتساب للأعمال (الدعم الفوري) · مزودو خدمة البريد الإلكتروني · أدوات التقويم والجدولة.\n\nالذكاء الاصطناعي والأتمتة: واجهات برمجة OpenAI / Anthropic / Google AI · n8n (أتمتة مسارات العمل) · خدمات توليف الصوت وإنشاء الصور.\n\nمعالجة المدفوعات: بوابات دفع آمنة (Stripe وPayPal أو حسب ما هو محدد عند الفوترة).\n\nيمتلك هؤلاء المزودون سياسات خصوصية وإجراءات أمنية خاصة بهم. نختار شركاء يستوفون معايير خصوصية عالية.",
        },
        {
          heading: "٤. الاحتفاظ بالبيانات",
          body: "استفسارات غير العملاء: 12 شهراً · بيانات العملاء النشطين: مدة عقد الصيانة + 90 يوماً · سجلات الدفع: 7 سنوات (متطلب قانوني) · سجلات محادثات الذكاء الاصطناعي: 6 أشهر · النسخ الاحتياطية: 30 يوماً متجدداً · الاتصالات التسويقية: حتى إلغاء الاشتراك.",
        },
        {
          heading: "٥. حقوقك",
          body: "وفقاً للائحة GDPR وقانون CCPA ومعايير الخصوصية العالمية، يحق لك: الوصول إلى بياناتك الشخصية · تصحيح المعلومات غير الدقيقة · طلب حذف بياناتك (\"الحق في النسيان\") · تقييد المعالجة أو الاعتراض عليها · قابلية نقل البيانات (تصدير بياناتك) · سحب موافقتك في أي وقت · تقديم شكوى إلى جهة رقابية.\n\nللممارسة هذه الحقوق، تواصل معنا على: contact@mdigitaldev.com. سنرد خلال 30 يوماً.",
        },
        {
          heading: "٦. إجراءات الأمان",
          body: "نحمي بياناتك باستخدام: تشفير HTTPS/TLS لجميع عمليات النقل · تخزين مشفر للبيانات الحساسة · ضوابط الوصول والمصادقة · عمليات تدقيق أمني منتظمة · إجراءات نسخ احتياطي آمنة · تشفير مفاتيح API وتدويرها.\n\nرغم تطبيقنا لمعايير أمان الصناعة، لا يوجد نظام آمن بنسبة 100%. سنُبلّغ العملاء المتضررين خلال 72 ساعة من أي اختراق مؤكد للبيانات.",
        },
        {
          heading: "٧. ملفات تعريف الارتباط والتتبع",
          body: "نستخدم ملفات تعريف ارتباط أساسية (ضرورية لعمل الموقع) وملفات تعريف ارتباط تحليلية تركز على الخصوصية ومجهولة الهوية. لا نستخدم ملفات تعريف ارتباط إعلانية تابعة لجهات خارجية. يمكنك التحكم في تفضيلات ملفات تعريف الارتباط من خلال إعدادات متصفحك.",
        },
        {
          heading: "٨. خصوصية الأطفال",
          body: "خدماتنا غير موجهة للمستخدمين دون سن 18 عاماً. لا نجمع بياناتهم الشخصية عن قصد. إذا اكتشفنا جمع مثل هذه البيانات، سنحذفها فوراً.",
        },
        {
          heading: "٩. نقل البيانات الدولي",
          body: "قد تُعالَج بياناتك في دول خارج بلد إقامتك. نضمن الحماية الكافية من خلال البنود التعاقدية القياسية (حيثما ينطبق)، والعمل حصرياً مع مزودين ممتثلين للائحة GDPR، وتشفير جميع البيانات أثناء النقل.",
        },
        {
          heading: "١٠. التغييرات في هذه السياسة",
          body: "قد نُحدّث هذه السياسة من وقت لآخر. ستُبلَّغ التغييرات الجوهرية للعملاء النشطين عبر البريد الإلكتروني قبل 30 يوماً على الأقل. يعكس تاريخ \"آخر تحديث\" في أعلى الصفحة آخر مراجعة.",
        },
        {
          heading: "١١. معلومات التواصل",
          body: "لأي استفسارات تتعلق بالخصوصية أو طلبات البيانات:\n\nMDigitalDev — تأسست بواسطة محمد يولي\nالبريد الإلكتروني: contact@mdigitaldev.com\nواتساب: ‎+212 669 586 001\n\nنهدف إلى الرد على جميع استفسارات الخصوصية في غضون 7 أيام عمل.",
        },
      ],
    },
    terms: {
      title: "شروط الخدمة",
      lastUpdated: "آخر تحديث: مايو 2026",
      sections: [
        {
          heading: "١. الخدمات",
          body: "تقدم MDigitalDev خدمات تصميم المواقع وتطوير تطبيقات PWA وتطوير وكلاء الذكاء الاصطناعي وأتمتة سير العمل الذكية وأتمتة العمليات التجارية وحلول الطلب الرقمي وتكاملات API من أطراف ثالثة وإعداد قنوات التواصل الآلية، عبر قطاعات متعددة تشمل المطاعم والتجارة الإلكترونية والشركات والرعاية الصحية والعقارات. تُحدَّد جميع الخدمات ونطاقها كتابياً قبل بدء أي عمل. تُدار الخدمات من قِبَل محمد يولي، مؤسس MDigitalDev.",
        },
        {
          heading: "٢. مواعيد التسليم وتسليم الأصول",
          body: "تُحدَّد مواعيد التسليم بحسب طبيعة كل مشروع وتُوضَّح في العرض الرسمي أو الفاتورة. يبدأ العد التنازلي فقط بعد استلام جميع الأصول المطلوبة بشكل كامل. تشمل الأصول المطلوبة على سبيل المثال لا الحصر: ملفات الشعار · الصور والمرئيات · النصوص المكتوبة والمحتوى · مواصفات الألوان · بيانات الوصول للنطاق والاستضافة.\n\nأي تأخير ناجم عن عدم توفير الأصول في الوقت المناسب أو بصورة مكتملة سيؤدي إلى تمديد موعد التسليم بشكل متناسب. لا تتحمل MDigitalDev المسؤولية عن التأخيرات الناجمة عن إخفاق العميل في توفير الأصول.",
        },
        {
          heading: "٣. شروط الدفع",
          body: "رسوم الإعداد: يُشترط دفع عربون غير قابل للاسترداد بنسبة 50٪ من رسوم الإعداد قبل بدء العمل. يجب سداد الرصيد المتبقي البالغ 50٪ بالكامل قبل التسليم النهائي أو الإطلاق أو نقل المشروع للعميل. لن يتم تسليم أي مُخرَج — بما في ذلك الملفات المصدرية أو بيانات الوصول أو النشر المباشر — إلا بعد استلام 100٪ من رسوم الإعداد.\n\nالصيانة الشهرية: تُفوتَر رسوم الصيانة الشهرية مسبقاً في نفس اليوم التقويمي كل شهر. يستحق أول دفع صيانة عند تسليم المشروع. قد يؤدي عدم سداد رسوم الصيانة خلال 7 أيام من تاريخ الاستحقاق إلى تعليق الخدمات، بما يشمل إيقاف وكلاء الذكاء الاصطناعي وتعليق الأتمتة وتعطيل الاستضافة.\n\nفترات الالتزام: Smart Starter يتطلب التزاماً بحد أدنى 3 أشهر. Business Auto-Pilot يتطلب التزاماً بحد أدنى 6 أشهر. Enterprise AI Elite يتطلب التزاماً بحد أدنى 12 شهراً. الإنهاء المبكر قبل انتهاء فترة الالتزام يترتب عليه رسوم تعادل 50٪ من الأشهر المتبقية في العقد.\n\nخصومات الدفع المسبق: يحصل العملاء الذين يختارون الدفع المسبق لـ 6 أو 12 شهراً على خصم كما هو محدد في صفحة الأسعار. المبالغ المدفوعة مسبقاً غير قابلة للاسترداد لكن يمكن تأجيلها حتى 30 يوماً خلال فترة العقد بناءً على طلب كتابي.\n\nالعملة وطرق الدفع: تُقبَل المدفوعات بالدولار الأمريكي أو حسب ما هو متفق عليه في الفاتورة. تشمل الطرق المقبولة التحويل البنكي وبطاقات الائتمان/الخصم وطرق أخرى تُحدد عند الفوترة.",
        },
        {
          heading: "٤. الملكية الفكرية",
          body: "عند استلام الدفع الكامل لرسوم الإعداد، يُمنح العميل ترخيصاً دائماً لاستخدام المنتج النهائي المُسلَّم — بما في ذلك الموقع الإلكتروني المنشور وتصميمه البصري — لأغراضه التجارية. يبقى الكود المصدري الأساسي وأطر العمل التقنية والأدوات الخاصة وأي مكونات قابلة لإعادة الاستخدام طوّرتها MDigitalDev ملكاً فكرياً حصرياً لـ MDigitalDev ولا تُنقل إلى العميل ضمن الاتفاقية المعيارية.\n\nلا يكون النقل الكامل لملكية الكود المصدري متاحاً إلا من خلال اتفاقية شراء مستقلة موثقة كتابياً، مقابل رسوم إضافية يُتفق عليها. تحتفظ MDigitalDev بحق عرض العمل المنجز في معرض أعمالها ودراسات الحالة، ما لم يطلب العميل خلاف ذلك كتابياً.\n\nتظل مسارات عمل الذكاء الاصطناعي ومنطق الأتمتة والتكاملات المخصصة المطورة للعملاء ملكاً خاصاً بـ MDigitalDev. يحصل العملاء على حقوق استخدام وليس حقوق ملكية.",
        },
        {
          heading: "٥. الاستضافة والبنية التحتية",
          body: "تُستضاف مواقع العملاء وأنظمة الذكاء الاصطناعي على البنية التحتية الآمنة لـ MDigitalDev ضمن اتفاقية الصيانة. يشمل ذلك: استضافة الخوادم وعرض النطاق الترددي · شهادات SSL · نسخ احتياطي آلي يومي (يُحفظ 30 يوماً) · مراقبة أمنية.\n\nإذا رغب العميل في الانتقال إلى بنيته التحتية الخاصة، ستقدم MDigitalDev مساعدة معقولة مقابل رسوم ترحيل. يخضع نقل الكود المصدري وبيانات الوصول لأحكام الملكية الفكرية في المادة الرابعة.",
        },
        {
          heading: "٦. خطط الدعم والصيانة",
          body: "Smart Starter (97$/شهر): الاستضافة على بنية MDigitalDev · شهادة SSL · نسخ احتياطي يومي · تحديثات أمنية · دعم بريد إلكتروني (رد خلال 48 ساعة) · ما يصل إلى ساعتين من التعديلات البسيطة شهرياً · مراقبة الأداء.\n\nBusiness Auto-Pilot (297$/شهر): كل مميزات Smart Starter · تحديثات وتعديلات نماذج الذكاء الاصطناعي · مراقبة مسارات n8n · إصلاح الأخطاء بأولوية · ما يصل إلى 5 ساعات تعديلات شهرياً · دعم بريد إلكتروني (رد خلال 24 ساعة) · تقرير أداء شهري · تكاليف API مشمولة حتى 50$/شهر.\n\nEnterprise AI Elite (797$/شهر): كل مميزات Business Auto-Pilot · مراقبة على مدار الساعة · دعم أولوي (رد خلال 12 ساعة) · ما يصل إلى 10 ساعات تعديلات شهرياً · تكاملات مخصصة حسب الحاجة · موارد VPS مخصصة · تكاليف API مشمولة حتى 200$/شهر · دعم واتساب مباشر · جلسات استراتيجية فصلية.",
        },
        {
          heading: "٦.٢ العمل خارج النطاق",
          body: "الميزات الجديدة وإعادة تصميم الواجهة والتغييرات الهيكلية الجوهرية غير مشمولة بأي خطة صيانة، وستُسعَّر وتُفوتَر بصورة منفصلة كمشاريع إضافية.",
        },
        {
          heading: "٦.٣ قنوات الدعم",
          body: "خلال الصيانة النشطة، يمكن للعملاء التواصل عبر واتساب: ‎+212 669 586 001 أو البريد الإلكتروني: contact@mdigitaldev.com. لا يمكن ضمان الرد على طلبات الدعم المُقدَّمة عبر قنوات أخرى.",
        },
        {
          heading: "٧. سياسة المراجعات",
          body: "يشمل كل مشروع عدداً محدداً من جولات المراجعة خلال مرحلة الإعداد: Smart Starter — جولتان · Business Auto-Pilot — 4 جولات · Enterprise AI Elite — 6 جولات.\n\nستُفوتَر المراجعات الإضافية خلال مرحلة الإعداد بمعدل 75$/ساعة. تُعرَّف المراجعة بأنها تعديلات على العمل المُسلَّم الحالي ولا تشمل ميزات جديدة أو إعادة تصميم هيكلية.\n\nالتعديلات بعد الإطلاق مشمولة ضمن خطة الصيانة الشهرية وفق الساعات المتضمنة في كل مستوى.",
        },
        {
          heading: "٨. تحديد المسؤولية",
          body: "لا تتحمل MDigitalDev المسؤولية عن الأضرار غير المباشرة أو العرضية أو التبعية الناجمة عن استخدام المنتج المُسلَّم أو تعذُّر استخدامه. تقتصر المسؤولية الإجمالية لـ MDigitalDev في جميع الأحوال على المبلغ الذي دفعه العميل مقابل الخدمة المعنية خلال الأشهر الثلاثة السابقة.\n\nلا تتحمل MDigitalDev أي مسؤولية عن أي تغييرات أو تحديثات أو تعديلات في الميزات أو انقطاعات في الخدمة أو رفع في الأسعار تُجريها مزودو الخدمات من أطراف ثالثة — بما في ذلك مزودو API (OpenAI وAnthropic وغيرهم) ومنصات الاستضافة والخدمات السحابية — بعد تسليم المشروع. أي تكاليف إضافية ناجمة عن هذه التغييرات تقع على عاتق العميل وقد تستوجب تعديلات في خطة الصيانة.\n\nتضمن MDigitalDev توفر الخدمات المستضافة بنسبة 99٪. تُستثنى من هذا الضمان فترات التوقف الناجمة عن مزودين خارجيين أو القوة القاهرة أو نوافذ الصيانة المجدولة.",
        },
        {
          heading: "٩. مسؤوليات العميل",
          body: "يوافق العميل على: تقديم معلومات دقيقة ومكتملة لتنفيذ المشروع · الرد على التواصل في أطر زمنية معقولة · عدم استخدام الخدمات المُسلَّمة لأغراض غير قانونية أو ضارة أو غير أخلاقية · الامتثال لجميع القوانين المعمول بها فيما يخص استخدام وكلاء الذكاء الاصطناعي والأتمتة · سداد جميع الرسوم في مواعيدها وفق الجدول الزمني المتفق عليه.\n\nقد يؤدي عدم الوفاء بهذه المسؤوليات إلى تعليق الخدمات أو إنهائها دون استرداد.",
        },
        {
          heading: "١٠. الإنهاء",
          body: "يحق لأي من الطرفين إنهاء اتفاقية الصيانة بعد انتهاء فترة الالتزام بتقديم إشعار كتابي قبل 30 يوماً. رسوم الإعداد غير قابلة للاسترداد. رسوم الصيانة المدفوعة مسبقاً التي تتجاوز فترة الالتزام تُسترَد بالتناسب.\n\nتحتفظ MDigitalDev بحق إنهاء الخدمات فوراً في حالات عدم السداد أو الإخلال بهذه الشروط أو استخدام الخدمات بطريقة قد تستوجب مسؤولية قانونية.",
        },
        {
          heading: "١١. السرية",
          body: "تلتزم MDigitalDev بالحفاظ على سرية تامة لجميع المواد التي يوفرها العميل وبيانات الأعمال وتفاصيل المشروع. لن يتم الإفصاح عن أي معلومات تخص العميل أو مشاركتها أو استخدامها لأغراض خارج نطاق المشروع المتفق عليه. يظل هذا الالتزام بالسرية سارياً إلى أجل غير مسمى بعد اكتمال المشروع.",
        },
        {
          heading: "١٢. القانون الحاكم وتسوية النزاعات",
          body: "يُعالَج أي نزاع أولاً عبر التواصل المباشر أو الوساطة. إذا تعذّر الحل، يُحدَّد القانون الحاكم والاختصاص القضائي بناءً على اتفاقية المشروع المحددة أو الموقع المشترك للطرفين. يوافق العميل على أن تُرفع أي دعوى قانونية أمام الجهة القضائية المناسبة المتفق عليها في عقد المشروع.",
        },
        {
          heading: "١٣. التغييرات في الشروط",
          body: "تحتفظ MDigitalDev بحق تحديث شروط الخدمة هذه. سيُبلَّغ العملاء الحاليون بأي تغييرات جوهرية قبل 30 يوماً من نفاذها. يُعدّ استمرار استخدام الخدمات بعد تاريخ النفاذ قبولاً للشروط المحدثة.",
        },
        {
          heading: "١٤. التواصل",
          body: "لأي استفسارات حول هذه الشروط:\nالبريد الإلكتروني: contact@mdigitaldev.com\nواتساب: ‎+212 669 586 001",
        },
      ],
    },
  },
};
