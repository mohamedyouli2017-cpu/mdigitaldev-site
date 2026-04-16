export type MenuCategory = "starters" | "mains" | "desserts" | "drinks";

export type MenuItem = {
  id: string;
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  price: number;
  category: MenuCategory;
  image: string;
};

export const menuItems: MenuItem[] = [
  // ── Starters ──────────────────────────────────────────────────────────────
  {
    id: "harira",
    nameEn: "Harira",
    nameAr: "حريرة",
    descEn: "Traditional Moroccan tomato & lentil soup, spiced with cumin and fresh coriander",
    descAr: "شوربة مغربية تقليدية بالطماطم والعدس، متبّلة بالكمون والكزبرة الطازجة",
    price: 25,
    category: "starters",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
  },
  {
    id: "briouats",
    nameEn: "Briouats",
    nameAr: "بريوات",
    descEn: "Crispy phyllo triangles filled with spiced minced meat and toasted almonds",
    descAr: "مثلثات ورقة هشة محشوة باللحم المفروم المتبّل واللوز المحمص",
    price: 35,
    category: "starters",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80",
  },
  {
    id: "zaalouk",
    nameEn: "Zaalouk",
    nameAr: "زعلوك",
    descEn: "Smoky roasted eggplant and tomato salad with olive oil and Moroccan spices",
    descAr: "سلطة الباذنجان المشوي والطماطم بزيت الزيتون والتوابل المغربية",
    price: 20,
    category: "starters",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
  },

  // ── Mains ─────────────────────────────────────────────────────────────────
  {
    id: "tajine-chicken",
    nameEn: "Tajine Chicken",
    nameAr: "طاجين الدجاج",
    descEn: "Slow-cooked chicken tajine with preserved lemon, green olives, and saffron",
    descAr: "طاجين دجاج مطهو ببطء مع الليمون المعصفر والزيتون الأخضر والزعفران",
    price: 75,
    category: "mains",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
  },
  {
    id: "couscous-royal",
    nameEn: "Couscous Royal",
    nameAr: "كسكس ملكي",
    descEn: "Fluffy hand-rolled couscous with seven vegetables, merguez, and tender lamb",
    descAr: "كسكس خفيف محضّر باليد مع سبعة خضروات ومرقاز وخروف طري",
    price: 85,
    category: "mains",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80",
  },
  {
    id: "pastilla",
    nameEn: "Pastilla",
    nameAr: "بسطيلة",
    descEn: "Layered pigeon pie with almonds, cinnamon, and eggs, dusted with powdered sugar",
    descAr: "بسطيلة طبقات من الحمام واللوز والقرفة والبيض، مزيّنة بالسكر الناعم",
    price: 65,
    category: "mains",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80",
  },
  {
    id: "grilled-kefta",
    nameEn: "Grilled Kefta",
    nameAr: "كفتة مشوية",
    descEn: "Seasoned minced lamb skewers grilled over charcoal, served with harissa and warm bread",
    descAr: "أسياخ لحم ضأن مفروم ومتبّل مشوية على الفحم، مقدّمة مع الهريسة والخبز الدافئ",
    price: 55,
    category: "mains",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&q=80",
  },

  // ── Desserts ──────────────────────────────────────────────────────────────
  {
    id: "chebakia",
    nameEn: "Chebakia",
    nameAr: "شباكية",
    descEn: "Flower-shaped fried pastry soaked in honey and toasted sesame — a Ramadan classic",
    descAr: "معجنات مقلية على شكل زهرة مغطاة بالعسل والسمسم المحمص — كلاسيكية رمضانية",
    price: 30,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
  },
  {
    id: "mint-tea",
    nameEn: "Moroccan Mint Tea",
    nameAr: "أتاي",
    descEn: "Green tea poured from height with fresh mint leaves and sugar cones, served in a traditional teapot",
    descAr: "شاي أخضر يُصب من علو مع أوراق النعناع الطازجة وقوالب السكر، مقدّم في إبريق تقليدي",
    price: 15,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80",
  },
  {
    id: "orange-cinnamon",
    nameEn: "Orange Cinnamon",
    nameAr: "برتقال بالقرفة",
    descEn: "Fresh orange slices with cinnamon, orange blossom water, and fresh mint leaves",
    descAr: "شرائح برتقال طازجة بالقرفة وماء الزهر وأوراق النعناع الطازجة",
    price: 20,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
  },

  // ── Drinks ────────────────────────────────────────────────────────────────
  {
    id: "orange-juice",
    nameEn: "Fresh Orange Juice",
    nameAr: "عصير البرتقال الطازج",
    descEn: "Freshly squeezed Moroccan oranges, served chilled",
    descAr: "عصير البرتقال المغربي الطازج، مقدّم بارداً",
    price: 20,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80",
  },
  {
    id: "avocado-smoothie",
    nameEn: "Avocado Smoothie",
    nameAr: "عصير الأفوكادو",
    descEn: "Creamy avocado blended with fresh milk, honey, and a hint of vanilla",
    descAr: "أفوكادو كريمي مخلوط بالحليب الطازج والعسل ورائحة الفانيليا",
    price: 25,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80",
  },
  {
    id: "water",
    nameEn: "Mineral Water",
    nameAr: "ماء معدني",
    descEn: "Chilled still or sparkling mineral water",
    descAr: "ماء معدني طبيعي أو فوار بارد",
    price: 10,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1548445929-4f60a497f851?w=600&q=80",
  },
];

export const categories = [
  { id: "starters" as MenuCategory, labelEn: "Starters",     labelAr: "المقبلات",           icon: "🥗" },
  { id: "mains"    as MenuCategory, labelEn: "Main Course",  labelAr: "الأطباق الرئيسية",   icon: "🍽️" },
  { id: "desserts" as MenuCategory, labelEn: "Desserts",     labelAr: "الحلويات والمشروبات", icon: "🍮" },
  { id: "drinks"   as MenuCategory, labelEn: "Drinks",       labelAr: "المشروبات",           icon: "🧃" },
] as const;
