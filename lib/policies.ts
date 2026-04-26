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
      lastUpdated: "Last updated: April 25, 2026",
      sections: [
        {
          heading: "1. Data We Collect",
          body: "We collect information you voluntarily provide when contacting MDigitalDev via our contact form, email, or WhatsApp. This includes your name, professional email, phone number, and project requirements. Our AI Assistant (Chatbot) may also process session data to better assist your inquiries.",
        },
        {
          heading: "2. AI Interaction & Privacy",
          body: "Interactions with our AI assistant are used solely to improve customer service. We ensure that sensitive project details shared during these interactions are handled with strict confidentiality and are not sold or misused.",
        },
        {
          heading: "3. How We Use Your Data",
          body: "Your data is used exclusively to: respond to inquiries and provide project quotes; deliver AI and automation services; and maintain professional communication during and after project delivery. We do not sell or share your data with third parties for marketing purposes.",
        },
        {
          heading: "4. Third-Party Services & Infrastructure",
          body: "To provide a secure and fast experience, we use industry-leading providers: Cloudflare for security and professional communication infrastructure; WhatsApp Business for real-time support; and secure AI APIs for our chatbot and automation tools. We do not share your data with third parties for marketing purposes.",
        },
        {
          heading: "5. Cookies & Tracking",
          body: "We use essential cookies to maintain site functionality. Any analytics used are privacy-focused, anonymized, and designed to improve user experience without tracking personal identities.",
        },
        {
          heading: "6. Data Protection & Your Rights",
          body: "All data is stored securely using encrypted protocols. Under global privacy standards, you have the right to access, rectify, or request the permanent deletion of your data. Contact us at any time to exercise these rights.",
        },
        {
          heading: "7. Contact Information",
          body: "For any privacy concerns, contact the MDigitalDev team: contact@mdigitaldev.com · WhatsApp: +212 669 586 001",
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      lastUpdated: "Last updated: April 2026",
      sections: [
        {
          heading: "1. Services",
          body: "MDigitalDev provides web design, PWA development, AI Agent development, intelligent workflow automation, business process automation, digital ordering solutions, third-party API integrations, and automated communication channel setups, across multiple industries including restaurants, e-commerce, corporate, healthcare, and real estate. All services and their scope are agreed upon in writing before any work commences.",
        },
        {
          heading: "2. Project Timelines & Asset Delivery",
          body: "Quoted delivery timelines — ranging from 24 hours to 7 business days depending on the selected package — begin only once the client has supplied all required assets in full. Required assets include, but are not limited to: brand logo files, photography or image assets, written copy and menu content, colour palette specifications, and domain or hosting access credentials.\n\nAny delay caused by late or incomplete asset submission will extend the delivery timeline proportionally. MDigitalDev shall not be held liable for missed deadlines arising from the client's failure to provide assets in a timely and complete manner.",
        },
        {
          heading: "3. Payment Terms",
          body: "A non-refundable deposit of 50% is required before project work begins. The remaining 50% balance must be paid in full before the final project is delivered, made live, or transferred to the client. No handover of any deliverable — including source files, credentials, or live deployment — will occur until 100% of the agreed payment has been received. Accepted payment methods include bank transfer (virement bancaire) and Payoneer. All prices are quoted in the currency agreed upon in writing prior to project commencement, which may include USD, EUR, AED, SAR, or any other mutually agreed currency. MDigitalDev operates internationally and does not restrict transactions to any single currency.",
        },
        {
          heading: "4. Intellectual Property",
          body: "Upon receipt of full payment, the client is granted a perpetual licence to use the final delivered product — including the live website and its visual design — for their business purposes. The underlying source code, development frameworks, proprietary tools, and any reusable components developed by MDigitalDev remain the exclusive intellectual property of MDigitalDev and are not transferred to the client as part of the standard agreement. Full transfer of source code ownership is available exclusively through a separate written buyout agreement, subject to an additional agreed fee. MDigitalDev retains the right to display the completed work in its portfolio and case studies, unless the client formally requests otherwise in writing.",
        },
        {
          heading: "5. Limitation of Liability",
          body: "MDigitalDev is not liable for indirect, incidental, or consequential damages arising from the use of or inability to use the delivered product. Our total liability in any circumstance is limited to the amount the client paid for the specific service in question.\n\nFurthermore, MDigitalDev bears no responsibility for any changes, updates, feature modifications, service interruptions, or price increases introduced by third-party service providers — including but not limited to API providers, hosting platforms, and cloud services — after the project has been delivered. Any additional costs arising from such changes are the sole responsibility of the client.",
        },
        {
          heading: "6. Governing Law & Disputes",
          body: "These terms are governed by Moroccan Commercial Law. Any dispute shall first be addressed through direct communication between both parties. If unresolved within 30 days, both parties agree to seek mediation. Should mediation fail to produce a resolution, the dispute shall be submitted to the competent courts of Morocco for final adjudication.",
        },
        {
          heading: "7. Support & Maintenance",
          body: "MDigitalDev provides 30 days of complimentary technical support following the official project delivery date. This support covers bug fixes and technical issues directly attributable to the delivered work only. Content updates, design modifications, new feature requests, or any changes outside the original project scope are not covered under this free support period and will be scoped and billed separately. Upon expiry of the 30-day support period, all ongoing support and maintenance services are subject to a separate maintenance agreement or billed at the applicable rate. During the 30-day support period, clients may reach out via WhatsApp at +212669586001 or by email at contact@mdigitaldev.com. Support requests submitted through other channels cannot be guaranteed a response.",
        },
        {
          heading: "8. Revisions Policy",
          body: "Each project plan includes a defined number of revision rounds as specified at the time of agreement. The Smart Starter plan includes 1 round of revisions. The Business Auto-Pilot plan includes 2 rounds of revisions. The Enterprise AI Elite plan includes 3 rounds of revisions. Additional revisions beyond the included rounds will be scoped and billed separately. A revision is defined as minor adjustments to existing delivered work and does not include new features or structural redesigns.",
        },
        {
          heading: "9. Confidentiality",
          body: "MDigitalDev agrees to keep all client-provided materials, business data, and project details strictly confidential. We will not disclose, share, or use any client information for purposes outside the scope of the agreed project. This confidentiality obligation remains in effect indefinitely after project completion.",
        },
      ],
    },
  },

  /* ─────────────────────── FRANÇAIS ─────────────────────── */
  fr: {
    privacy: {
      title: "Politique de Confidentialité",
      lastUpdated: "Dernière mise à jour : 25 avril 2026",
      sections: [
        {
          heading: "1. Données Collectées",
          body: "Nous collectons les informations que vous fournissez volontairement lors de votre contact avec MDigitalDev via notre formulaire, e-mail ou WhatsApp. Cela inclut votre nom, e-mail professionnel, numéro de téléphone et les détails de votre projet. Notre assistant IA (Chatbot) peut également traiter des données de session pour mieux répondre à vos demandes.",
        },
        {
          heading: "2. Interactions IA & Confidentialité",
          body: "Les interactions avec notre assistant IA sont utilisées uniquement pour améliorer le service client. Nous garantissons que les détails sensibles de projet partagés lors de ces interactions sont traités avec une stricte confidentialité et ne sont ni vendus ni utilisés à mauvais escient.",
        },
        {
          heading: "3. Utilisation de Vos Données",
          body: "Vos données sont utilisées exclusivement pour : répondre à vos demandes et fournir des devis ; livrer nos services IA et d'automatisation ; et maintenir une communication professionnelle pendant et après la réalisation du projet. Nous ne vendons ni ne partageons vos données à des fins marketing.",
        },
        {
          heading: "4. Services & Infrastructure Tiers",
          body: "Pour offrir une expérience sécurisée et rapide, nous utilisons des prestataires de premier plan : Cloudflare pour la sécurité et l'infrastructure de communication ; WhatsApp Business pour le support en temps réel ; et des API IA sécurisées pour notre chatbot et nos outils d'automatisation. Nous ne partageons pas vos données à des fins marketing.",
        },
        {
          heading: "5. Cookies & Suivi",
          body: "Nous utilisons des cookies essentiels au fonctionnement du site. Toute analyse mise en œuvre est axée sur la confidentialité, anonymisée et conçue pour améliorer l'expérience utilisateur sans traçage d'identités personnelles.",
        },
        {
          heading: "6. Protection des Données & Vos Droits",
          body: "Toutes les données sont stockées de manière sécurisée via des protocoles chiffrés. Conformément aux normes mondiales de confidentialité, vous avez le droit d'accéder à vos données, de les rectifier ou d'en demander la suppression définitive. Contactez-nous à tout moment pour exercer ces droits.",
        },
        {
          heading: "7. Coordonnées",
          body: "Pour toute question relative à la confidentialité, contactez l'équipe MDigitalDev : contact@mdigitaldev.com · WhatsApp : +212 669 586 001",
        },
      ],
    },
    terms: {
      title: "Conditions d'Utilisation",
      lastUpdated: "Dernière mise à jour : avril 2026",
      sections: [
        {
          heading: "1. Services",
          body: "MDigitalDev fournit des services de conception web, développement PWA, développement d'agents IA, automatisation intelligente des flux de travail, automatisation des processus métier, solutions de commande digitale, intégrations d'API tierces et mise en place de canaux de communication automatisés, dans de nombreux secteurs d'activité dont la restauration, le commerce en ligne, le corporate, la santé et l'immobilier. Toute prestation et sa portée sont définies par écrit avant le début des travaux.",
        },
        {
          heading: "2. Délais de Livraison & Fourniture des Ressources",
          body: "Les délais de livraison annoncés — de 24 heures à 7 jours ouvrables selon le forfait sélectionné — commencent uniquement à partir de la réception complète de toutes les ressources requises de la part du client. Ces ressources comprennent notamment : fichiers logo, visuels et photos, textes rédigés et contenu du menu, spécifications de couleurs, accès au nom de domaine et à l'hébergement.\n\nTout retard causé par une fourniture tardive ou incomplète des ressources prolongera proportionnellement le délai de livraison. MDigitalDev ne saurait être tenu responsable des retards imputables au client.",
        },
        {
          heading: "3. Conditions de Paiement",
          body: "Un acompte non remboursable de 50 % est exigé avant le début des travaux. Le solde restant de 50 % doit être intégralement réglé avant la livraison finale du projet, sa mise en ligne ou son transfert au client. Aucune remise de livrable — fichiers sources, identifiants ou déploiement en ligne — n'interviendra avant réception de 100 % du paiement convenu. Les moyens de paiement acceptés comprennent le virement bancaire et Payoneer. Tous les prix sont exprimés dans la devise convenue par écrit avant le début du projet, pouvant inclure USD, EUR, AED, SAR ou toute autre devise mutuellement acceptée. MDigitalDev opère à l'international et ne restreint pas ses transactions à une seule devise.",
        },
        {
          heading: "4. Propriété Intellectuelle",
          body: "À réception du paiement intégral, le client se voit accorder une licence perpétuelle d'utilisation du produit final livré — incluant le site web en ligne et son design visuel — à des fins professionnelles. Le code source sous-jacent, les frameworks de développement, les outils propriétaires et tous les composants réutilisables développés par MDigitalDev demeurent la propriété intellectuelle exclusive de MDigitalDev et ne sont pas cédés au client dans le cadre de l'accord standard. Le transfert complet de la propriété du code source est disponible uniquement via un accord de rachat écrit séparé, moyennant des frais supplémentaires convenus. MDigitalDev conserve le droit de présenter le travail accompli dans son portfolio, sauf demande contraire du client formulée par écrit.",
        },
        {
          heading: "5. Limitation de Responsabilité",
          body: "MDigitalDev ne saurait être tenu responsable des dommages indirects, accessoires ou consécutifs liés à l'utilisation du produit livré. Notre responsabilité totale est limitée au montant effectivement payé par le client pour le service concerné.\n\nPar ailleurs, MDigitalDev décline toute responsabilité concernant les modifications, mises à jour, changements de fonctionnalités, interruptions de service ou hausses de tarifs introduits par des prestataires tiers — notamment les fournisseurs d'API, plateformes d'hébergement et services cloud — postérieurement à la livraison du projet. Tout coût supplémentaire découlant de tels changements est à la charge exclusive du client.",
        },
        {
          heading: "6. Droit Applicable & Litiges",
          body: "Les présentes conditions sont régies par le droit commercial marocain. Tout litige sera traité en priorité par voie de dialogue direct entre les parties. À défaut de résolution sous 30 jours, les parties s'engagent à recourir à la médiation. Si la médiation échoue, le litige sera soumis aux tribunaux compétents du Maroc pour résolution définitive.",
        },
        {
          heading: "7. Support & Maintenance",
          body: "MDigitalDev assure 30 jours de support technique gratuit à compter de la date de livraison officielle du projet. Ce support couvre uniquement la correction des bugs et des anomalies techniques directement imputables au travail livré. Les mises à jour de contenu, modifications de design, ajouts de fonctionnalités ou tout changement hors du périmètre initial du projet ne sont pas couverts par cette période de support gratuit et feront l'objet d'un devis et d'une facturation séparés. À l'expiration des 30 jours, tout support et maintenance continus sont soumis à un contrat de maintenance distinct ou facturés au tarif applicable. Pendant la période de support de 30 jours, les clients peuvent nous contacter via WhatsApp au +212669586001 ou par e-mail à contact@mdigitaldev.com. Les demandes de support soumises par d'autres canaux ne peuvent être garanties d'une réponse.",
        },
        {
          heading: "8. Politique de Révisions",
          body: "Chaque plan de projet comprend un nombre défini de cycles de révisions tel que spécifié au moment de l'accord. Le forfait Smart Starter inclut 1 cycle de révisions. Le forfait Business Auto-Pilot inclut 2 cycles de révisions. Le forfait Enterprise AI Elite inclut 3 cycles de révisions. Les révisions supplémentaires au-delà des cycles inclus feront l'objet d'un devis et d'une facturation séparés. Une révision est définie comme des ajustements mineurs au travail livré et n'inclut pas de nouvelles fonctionnalités ni de refonte structurelle.",
        },
        {
          heading: "9. Confidentialité",
          body: "MDigitalDev s'engage à maintenir strictement confidentiels tous les documents fournis par le client, les données commerciales et les détails du projet. Nous ne divulguerons, ne partagerons ni n'utiliserons aucune information client à des fins extérieures au périmètre du projet convenu. Cette obligation de confidentialité reste en vigueur indéfiniment après l'achèvement du projet.",
        },
      ],
    },
  },

  /* ─────────────────────── ARABIC ─────────────────────── */
  ar: {
    privacy: {
      title: "سياسة الخصوصية",
      lastUpdated: "آخر تحديث: 25 أبريل 2026",
      sections: [
        {
          heading: "١. البيانات التي نجمعها",
          body: "نجمع المعلومات التي تقدمها طوعاً عند تواصلك مع MDigitalDev عبر نموذج الاتصال أو البريد الإلكتروني أو واتساب. تشمل هذه المعلومات اسمك وبريدك الإلكتروني المهني ورقم هاتفك ومتطلبات مشروعك. قد يُعالج مساعدنا الذكي (الشات بوت) أيضاً بيانات الجلسة لتقديم مساعدة أفضل.",
        },
        {
          heading: "٢. التفاعل مع الذكاء الاصطناعي والخصوصية",
          body: "تُستخدم التفاعلات مع مساعدنا الذكي حصراً لتحسين خدمة العملاء. نضمن أن تفاصيل المشاريع الحساسة المُشاركة خلال هذه التفاعلات تُعالج بسرية تامة ولا تُباع أو تُساء استخدامها.",
        },
        {
          heading: "٣. كيفية استخدام بياناتك",
          body: "تُستخدم بياناتك حصراً من أجل: الرد على الاستفسارات وتقديم عروض الأسعار؛ وتسليم خدمات الذكاء الاصطناعي والأتمتة؛ والحفاظ على التواصل المهني خلال المشروع وبعده. لا نبيع بياناتك أو نشاركها مع أطراف ثالثة لأغراض تسويقية.",
        },
        {
          heading: "٤. خدمات البنية التحتية وأطراف ثالثة",
          body: "لتوفير تجربة آمنة وسريعة، نستخدم مزودين من الدرجة الأولى: Cloudflare للأمان وبنية الاتصال المهنية؛ وواتساب للأعمال للدعم الفوري؛ وواجهات برمجة الذكاء الاصطناعي الآمنة لروبوت الدردشة وأدوات الأتمتة. لا نشارك بياناتك مع أطراف ثالثة لأغراض تسويقية.",
        },
        {
          heading: "٥. ملفات تعريف الارتباط والتتبع",
          body: "نستخدم ملفات تعريف ارتباط أساسية للحفاظ على وظائف الموقع. أي تحليلات مُستخدمة تُركّز على الخصوصية، ومجهولة الهوية، ومصممة لتحسين تجربة المستخدم دون تتبع الهويات الشخصية.",
        },
        {
          heading: "٦. حماية البيانات وحقوقك",
          body: "يتم تخزين جميع البيانات بأمان باستخدام بروتوكولات مشفرة. وفقاً لمعايير الخصوصية العالمية، يحق لك الوصول إلى بياناتك أو تصحيحها أو طلب حذفها نهائياً. تواصل معنا في أي وقت لممارسة هذه الحقوق.",
        },
        {
          heading: "٧. معلومات التواصل",
          body: "لأي استفسارات تتعلق بالخصوصية، تواصل مع فريق MDigitalDev: contact@mdigitaldev.com · واتساب: ‎+212 669 586 001",
        },
      ],
    },
    terms: {
      title: "شروط الخدمة",
      lastUpdated: "آخر تحديث: أبريل 2026",
      sections: [
        {
          heading: "١. الخدمات",
          body: "تقدم MDigitalDev خدمات تصميم المواقع وتطوير تطبيقات PWA وتطوير وكلاء الذكاء الاصطناعي وأتمتة سير العمل الذكية وأتمتة العمليات التجارية وحلول الطلب الرقمي وتكاملات واجهات برمجة التطبيقات من أطراف ثالثة وإعداد قنوات التواصل الآلية، عبر صناعات متعددة تشمل المطاعم والتجارة الإلكترونية والشركات والرعاية الصحية والعقارات. تُحدَّد جميع الخدمات ونطاقها كتابياً قبل بدء أي عمل.",
        },
        {
          heading: "٢. مواعيد التسليم وتسليم الأصول",
          body: "تبدأ مواعيد التسليم المحددة — من 24 ساعة إلى 7 أيام عمل حسب الباقة المختارة — فقط بعد أن يوفر العميل جميع الأصول المطلوبة بشكل كامل. تشمل الأصول المطلوبة على سبيل المثال لا الحصر: ملفات الشعار، الصور والمرئيات، النصوص المكتوبة ومحتوى القائمة، مواصفات الألوان، وبيانات الوصول للنطاق والاستضافة.\n\nأي تأخير ناجم عن عدم توفير الأصول في الوقت المناسب أو بصورة مكتملة سيؤدي إلى تمديد موعد التسليم بشكل متناسب. لا تتحمل MDigitalDev المسؤولية عن التأخيرات الناجمة عن إخفاق العميل في توفير الأصول.",
        },
        {
          heading: "٣. شروط الدفع",
          body: "يُشترط دفع عربون غير قابل للاسترداد بنسبة 50٪ قبل بدء العمل. يجب سداد الرصيد المتبقي البالغ 50٪ بالكامل قبل التسليم النهائي للمشروع أو إطلاقه أو نقله إلى العميل. لن يتم تسليم أي مُخرَج — بما في ذلك الملفات المصدرية أو بيانات الوصول أو النشر المباشر — إلا بعد استلام 100٪ من المبلغ المتفق عليه كاملاً. تشمل طرق الدفع المقبولة التحويل البنكي (virement bancaire) وPayoneer. تُحدَّد جميع الأسعار بالعملة المتفق عليها كتابياً قبل بدء المشروع، والتي قد تشمل الدولار الأمريكي (USD) أو اليورو (EUR) أو الدرهم الإماراتي (AED) أو الريال السعودي (SAR) أو أي عملة أخرى يتفق عليها الطرفان. تعمل MDigitalDev على المستوى الدولي ولا تقتصر معاملاتها على عملة واحدة.",
        },
        {
          heading: "٤. الملكية الفكرية",
          body: "عند استلام الدفع الكامل، يُمنح العميل ترخيصاً دائماً لاستخدام المنتج النهائي المُسلَّم — بما في ذلك الموقع الإلكتروني المنشور وتصميمه البصري — لأغراضه التجارية. يبقى الكود المصدري الأساسي وأطر العمل التقنية والأدوات الخاصة وأي مكونات قابلة لإعادة الاستخدام طوّرتها MDigitalDev ملكاً فكرياً حصرياً لـ MDigitalDev ولا تُنقل إلى العميل ضمن الاتفاقية المعيارية. لا يكون النقل الكامل لملكية الكود المصدري متاحاً إلا من خلال اتفاقية شراء مستقلة وموثقة كتابياً، مقابل رسوم إضافية يُتفق عليها. تحتفظ MDigitalDev بحق عرض العمل المنجز في معرض أعمالها ودراسات الحالة، ما لم يطلب العميل خلاف ذلك كتابياً.",
        },
        {
          heading: "٥. تحديد المسؤولية",
          body: "لا تتحمل MDigitalDev المسؤولية عن الأضرار غير المباشرة أو العرضية أو التبعية الناجمة عن استخدام المنتج المسلَّم أو تعذُّر استخدامه. تقتصر مسؤوليتنا الإجمالية في جميع الأحوال على المبلغ الذي دفعه العميل مقابل الخدمة المعنية.\n\nعلاوة على ذلك، لا تتحمل MDigitalDev أي مسؤولية عن أي تغييرات أو تحديثات أو تعديلات في الميزات أو انقطاعات في الخدمة أو رفع في الأسعار تُجريها مزودو الخدمات من أطراف ثالثة — بما في ذلك مزودو واجهات برمجة التطبيقات ومنصات الاستضافة والخدمات السحابية — بعد تسليم المشروع. أي تكاليف إضافية ناجمة عن هذه التغييرات تقع على عاتق العميل وحده.",
        },
        {
          heading: "٦. القانون الحاكم وتسوية النزاعات",
          body: "تخضع هذه الشروط للقانون التجاري المغربي. يُعالج أي نزاع بالتراضي عبر التواصل المباشر بين الطرفين أولاً. إذا لم يُحسم خلال 30 يوماً، يتفق الطرفان على اللجوء إلى الوساطة. في حال فشل الوساطة في التوصل إلى حل، يُحال النزاع إلى المحاكم المختصة في المغرب للبت فيه نهائياً.",
        },
        {
          heading: "٧. الدعم الفني والصيانة",
          body: "تقدم MDigitalDev 30 يوماً من الدعم الفني المجاني اعتباراً من تاريخ التسليم الرسمي للمشروع. يقتصر هذا الدعم على إصلاح الأخطاء التقنية والمشكلات الناجمة مباشرة عن العمل المُسلَّم. لا تشمل هذه الفترة المجانية تحديثات المحتوى، أو تعديلات التصميم، أو إضافة ميزات جديدة، أو أي تغييرات خارج نطاق المشروع الأصلي؛ وتخضع هذه الطلبات للتسعير والفوترة المنفصلة. بعد انتهاء فترة الـ 30 يوماً، تخضع جميع خدمات الدعم والصيانة المستمرة لاتفاقية صيانة مستقلة أو تُحتسب وفق التعريفة المعمول بها. خلال فترة الدعم البالغة 30 يوماً، يمكن للعملاء التواصل معنا عبر واتساب على الرقم +212669586001 أو عبر البريد الإلكتروني على contact@mdigitaldev.com. لا يمكن ضمان الرد على طلبات الدعم المُقدَّمة عبر قنوات أخرى.",
        },
        {
          heading: "٨. سياسة المراجعات",
          body: "يتضمن كل خطة مشروع عدداً محدداً من جولات المراجعة كما هو محدد وقت الاتفاق. تشمل خطة Smart Starter جولة مراجعة واحدة. تشمل خطة Business Auto-Pilot جولتَي مراجعة. تشمل خطة Enterprise AI Elite 3 جولات مراجعة. ستُسعَّر المراجعات الإضافية التي تتجاوز الجولات المضمنة وتُفوتَر بصورة منفصلة. تُعرَّف المراجعة بأنها تعديلات طفيفة على العمل المُسلَّم ولا تشمل ميزات جديدة أو إعادة تصميم هيكلية.",
        },
        {
          heading: "٩. السرية",
          body: "تلتزم MDigitalDev بالحفاظ على سرية تامة لجميع المواد التي يوفرها العميل وبيانات الأعمال وتفاصيل المشروع. لن نُفصح عن أي معلومات تخص العميل أو نشاركها أو نستخدمها لأغراض خارج نطاق المشروع المتفق عليه. يظل هذا الالتزام بالسرية سارياً إلى أجل غير مسمى بعد اكتمال المشروع.",
        },
      ],
    },
  },
};
