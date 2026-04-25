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
      lastUpdated: "Last updated: April 2026",
      sections: [
        {
          heading: "1. Data We Collect",
          body: "When you contact MDigitalDev through our website's contact form, WhatsApp link, or email, we may collect your name, phone number, email address, and the project details you voluntarily provide. We do not collect data automatically beyond standard server logs.",
        },
        {
          heading: "2. How We Use Your Data",
          body: "Your information is used solely to respond to your enquiry, send project proposals, and communicate project updates. We do not sell, rent, or share your personal data with third parties for marketing purposes.",
        },
        {
          heading: "3. Cookies & Tracking",
          body: "Our website may use essential cookies to ensure correct functionality. No advertising or third-party tracking cookies are used. Any analytics implemented are privacy-first and fully anonymised.",
        },
        {
          heading: "4. Data Protection",
          body: "All data is stored securely. We retain your contact information only for the duration necessary to complete your project or respond to your enquiry. You may request deletion of your data at any time by contacting us.",
        },
        {
          heading: "5. Third-Party Services",
          body: "We may integrate third-party tools — such as Google Maps and WhatsApp Business — as part of client project deliverables. Each third party operates under its own independent privacy policy, and we encourage you to review them.",
        },
        {
          heading: "6. Your Rights",
          body: "You have the right to access, correct, or delete any personal information we hold about you. To exercise these rights, contact us via WhatsApp or email at any time.",
        },
        {
          heading: "7. Contact",
          body: "MDigitalDev · contact@mdigitaldev.com · WhatsApp: +212 669 586 001",
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      lastUpdated: "Last updated: April 2026",
      sections: [
        {
          heading: "1. Services",
          body: "MDigitalDev provides web design, PWA development, digital ordering solutions, third-party API integrations, and automated communication channel setups, primarily for the restaurant and hospitality industry. All services and their scope are agreed upon in writing before any work commences.",
        },
        {
          heading: "2. Project Timelines & Asset Delivery",
          body: "Quoted delivery timelines — ranging from 24 hours to 7 business days depending on the selected package — begin only once the client has supplied all required assets in full. Required assets include, but are not limited to: brand logo files, photography or image assets, written copy and menu content, colour palette specifications, and domain or hosting access credentials.\n\nAny delay caused by late or incomplete asset submission will extend the delivery timeline proportionally. MDigitalDev shall not be held liable for missed deadlines arising from the client's failure to provide assets in a timely and complete manner.",
        },
        {
          heading: "3. Payment Terms",
          body: "A non-refundable deposit of 50% is required before project work begins. The remaining 50% balance must be paid in full before the final project is delivered, made live, or transferred to the client. No handover of any deliverable — including source files, credentials, or live deployment — will occur until 100% of the agreed payment has been received. All prices are quoted in Moroccan Dirhams (MAD) unless otherwise agreed in writing.",
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
          body: "MDigitalDev provides 30 days of complimentary technical support following the official project delivery date. This support covers bug fixes and technical issues directly attributable to the delivered work only. Content updates, design modifications, new feature requests, or any changes outside the original project scope are not covered under this free support period and will be scoped and billed separately. Upon expiry of the 30-day support period, all ongoing support and maintenance services are subject to a separate maintenance agreement or billed at the applicable rate.",
        },
      ],
    },
  },

  /* ─────────────────────── FRANÇAIS ─────────────────────── */
  fr: {
    privacy: {
      title: "Politique de Confidentialité",
      lastUpdated: "Dernière mise à jour : avril 2026",
      sections: [
        {
          heading: "1. Données Collectées",
          body: "Lorsque vous contactez MDigitalDev via notre formulaire, WhatsApp ou e-mail, nous collectons votre nom, numéro de téléphone, adresse e-mail et les détails du projet que vous fournissez volontairement. Nous ne collectons pas de données automatiquement au-delà des journaux serveur standard.",
        },
        {
          heading: "2. Utilisation de Vos Données",
          body: "Vos informations sont utilisées exclusivement pour répondre à votre demande, envoyer des propositions et communiquer sur l'avancement du projet. Nous ne vendons, ne louons, ni ne partageons vos données personnelles à des fins commerciales.",
        },
        {
          heading: "3. Cookies & Suivi",
          body: "Notre site utilise uniquement des cookies essentiels au bon fonctionnement. Aucun cookie publicitaire ni de suivi tiers n'est utilisé. Les outils analytiques éventuels sont configurés en mode respectueux de la vie privée et entièrement anonymisés.",
        },
        {
          heading: "4. Protection des Données",
          body: "Toutes les données sont stockées de manière sécurisée et conservées uniquement le temps nécessaire à la réalisation de votre projet ou au traitement de votre demande. Vous pouvez demander la suppression de vos données à tout moment.",
        },
        {
          heading: "5. Services Tiers",
          body: "Nous pouvons intégrer des outils tiers (Google Maps, WhatsApp Business, etc.) dans les projets clients. Chaque tiers opère selon sa propre politique de confidentialité, que nous vous encourageons à consulter.",
        },
        {
          heading: "6. Vos Droits",
          body: "Vous avez le droit d'accéder à vos données personnelles, de les corriger ou de les supprimer. Contactez-nous via WhatsApp ou par e-mail pour exercer ces droits.",
        },
        {
          heading: "7. Contact",
          body: "MDigitalDev · contact@mdigitaldev.com · WhatsApp : +212 669 586 001",
        },
      ],
    },
    terms: {
      title: "Conditions d'Utilisation",
      lastUpdated: "Dernière mise à jour : avril 2026",
      sections: [
        {
          heading: "1. Services",
          body: "MDigitalDev fournit des services de conception web, développement PWA, solutions de commande digitale, intégrations d'API tierces et mise en place de canaux de communication automatisés, principalement pour la restauration et l'hôtellerie. Toute prestation et sa portée sont définies par écrit avant le début des travaux.",
        },
        {
          heading: "2. Délais de Livraison & Fourniture des Ressources",
          body: "Les délais de livraison annoncés — de 24 heures à 7 jours ouvrables selon le forfait sélectionné — commencent uniquement à partir de la réception complète de toutes les ressources requises de la part du client. Ces ressources comprennent notamment : fichiers logo, visuels et photos, textes rédigés et contenu du menu, spécifications de couleurs, accès au nom de domaine et à l'hébergement.\n\nTout retard causé par une fourniture tardive ou incomplète des ressources prolongera proportionnellement le délai de livraison. MDigitalDev ne saurait être tenu responsable des retards imputables au client.",
        },
        {
          heading: "3. Conditions de Paiement",
          body: "Un acompte non remboursable de 50 % est exigé avant le début des travaux. Le solde restant de 50 % doit être intégralement réglé avant la livraison finale du projet, sa mise en ligne ou son transfert au client. Aucune remise de livrable — fichiers sources, identifiants ou déploiement en ligne — n'interviendra avant réception de 100 % du paiement convenu. Tous les prix sont exprimés en dirhams marocains (MAD) sauf accord écrit contraire.",
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
          body: "MDigitalDev assure 30 jours de support technique gratuit à compter de la date de livraison officielle du projet. Ce support couvre uniquement la correction des bugs et des anomalies techniques directement imputables au travail livré. Les mises à jour de contenu, modifications de design, ajouts de fonctionnalités ou tout changement hors du périmètre initial du projet ne sont pas couverts par cette période de support gratuit et feront l'objet d'un devis et d'une facturation séparés. À l'expiration des 30 jours, tout support et maintenance continus sont soumis à un contrat de maintenance distinct ou facturés au tarif applicable.",
        },
      ],
    },
  },

  /* ─────────────────────── ARABIC ─────────────────────── */
  ar: {
    privacy: {
      title: "سياسة الخصوصية",
      lastUpdated: "آخر تحديث: أبريل 2026",
      sections: [
        {
          heading: "١. البيانات التي نجمعها",
          body: "عند تواصلك مع MDigitalDev عبر نموذج الاتصال أو واتساب أو البريد الإلكتروني، قد نجمع اسمك ورقم هاتفك وبريدك الإلكتروني وتفاصيل مشروعك التي تقدمها طوعاً. لا نجمع أي بيانات تلقائياً سوى سجلات الخادم الاعتيادية.",
        },
        {
          heading: "٢. كيفية استخدام بياناتك",
          body: "تُستخدم معلوماتك حصراً للرد على استفساراتك وإرسال العروض والتواصل بشأن تقدم المشروع. لا نبيع بياناتك الشخصية أو نؤجرها أو نشاركها مع أطراف ثالثة لأغراض تسويقية.",
        },
        {
          heading: "٣. ملفات تعريف الارتباط والتتبع",
          body: "قد يستخدم موقعنا ملفات تعريف ارتباط أساسية لضمان عمله بشكل صحيح. لا تُستخدم ملفات تتبع إعلانية أو تابعة لجهات خارجية. أي تحليلات مُطبَّقة تعمل بوضع احترام الخصوصية وتكون مجهولة الهوية تماماً.",
        },
        {
          heading: "٤. حماية البيانات",
          body: "يتم تخزين جميع البيانات بأمان والاحتفاظ بها فقط طوال المدة اللازمة لإتمام مشروعك أو الرد على استفسارك. يمكنك طلب حذف بياناتك في أي وقت بالتواصل معنا.",
        },
        {
          heading: "٥. خدمات الأطراف الثالثة",
          body: "قد ندمج أدوات جهات خارجية — كخرائط Google وواتساب للأعمال — ضمن مشاريع العملاء. تعمل كل جهة وفق سياسة خصوصيتها المستقلة الخاصة، وننصحك بالاطلاع عليها.",
        },
        {
          heading: "٦. حقوقك",
          body: "يحق لك الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها. تواصل معنا عبر واتساب أو البريد الإلكتروني في أي وقت لممارسة هذه الحقوق.",
        },
        {
          heading: "٧. التواصل",
          body: "MDigitalDev · contact@mdigitaldev.com · واتساب: ‎+212 669 586 001",
        },
      ],
    },
    terms: {
      title: "شروط الخدمة",
      lastUpdated: "آخر تحديث: أبريل 2026",
      sections: [
        {
          heading: "١. الخدمات",
          body: "تقدم MDigitalDev خدمات تصميم المواقع وتطوير تطبيقات PWA وحلول الطلب الرقمي وتكاملات واجهات برمجة التطبيقات (API) من أطراف ثالثة وإعداد قنوات التواصل الآلية، بشكل رئيسي لقطاع المطاعم والضيافة. تُحدَّد جميع الخدمات ونطاقها كتابياً قبل بدء أي عمل.",
        },
        {
          heading: "٢. مواعيد التسليم وتسليم الأصول",
          body: "تبدأ مواعيد التسليم المحددة — من 24 ساعة إلى 7 أيام عمل حسب الباقة المختارة — فقط بعد أن يوفر العميل جميع الأصول المطلوبة بشكل كامل. تشمل الأصول المطلوبة على سبيل المثال لا الحصر: ملفات الشعار، الصور والمرئيات، النصوص المكتوبة ومحتوى القائمة، مواصفات الألوان، وبيانات الوصول للنطاق والاستضافة.\n\nأي تأخير ناجم عن عدم توفير الأصول في الوقت المناسب أو بصورة مكتملة سيؤدي إلى تمديد موعد التسليم بشكل متناسب. لا تتحمل MDigitalDev المسؤولية عن التأخيرات الناجمة عن إخفاق العميل في توفير الأصول.",
        },
        {
          heading: "٣. شروط الدفع",
          body: "يُشترط دفع عربون غير قابل للاسترداد بنسبة 50٪ قبل بدء العمل. يجب سداد الرصيد المتبقي البالغ 50٪ بالكامل قبل التسليم النهائي للمشروع أو إطلاقه أو نقله إلى العميل. لن يتم تسليم أي مُخرَج — بما في ذلك الملفات المصدرية أو بيانات الوصول أو النشر المباشر — إلا بعد استلام 100٪ من المبلغ المتفق عليه كاملاً. جميع الأسعار بالدرهم المغربي (MAD) ما لم يُتفق كتابياً على خلاف ذلك.",
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
          body: "تقدم MDigitalDev 30 يوماً من الدعم الفني المجاني اعتباراً من تاريخ التسليم الرسمي للمشروع. يقتصر هذا الدعم على إصلاح الأخطاء التقنية والمشكلات الناجمة مباشرة عن العمل المُسلَّم. لا تشمل هذه الفترة المجانية تحديثات المحتوى، أو تعديلات التصميم، أو إضافة ميزات جديدة، أو أي تغييرات خارج نطاق المشروع الأصلي؛ وتخضع هذه الطلبات للتسعير والفوترة المنفصلة. بعد انتهاء فترة الـ 30 يوماً، تخضع جميع خدمات الدعم والصيانة المستمرة لاتفاقية صيانة مستقلة أو تُحتسب وفق التعريفة المعمول بها.",
        },
      ],
    },
  },
};
