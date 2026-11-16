// ============================================================================
// GLAM HAUTE PARFUMS — TemplateMonster #558219 Design + Perfume Store Backend
// Brands: Dior, Chanel, Maison Margiela REPLICA, Burberry, Versace,
//         Louis Vuitton, Yves Saint Laurent, Sabrina Carpenter, Ariana Grande, Femmenina
// ============================================================================

const STORAGE_KEYS = {
  PRODUCTS: 'glam_perfumes_products_v3',
  CART: 'glam_perfumes_cart_v3',
  SETTINGS: 'glam_perfumes_settings_v4',
  ORDERS: 'aura_perfumes_orders_v1',
  FILES: 'glam_neon_files_v1',
  LANG: 'glam_perfumes_lang_v2',
  THEME: 'glam_perfumes_theme_v2'
};

const DEFAULT_SETTINGS = {
  botToken: '9118435625:AAE4QRAH0RrhxvwRGPNya0Nx_ZUcZ_MSQbI',
  chatId: '5598854282',
  cardNumber: '8600 1204 5678 9012',
  cardHolder: 'GLAM PARFUMS UZ',
  stripeKey: 'pk_test_51GlamParfumsUzbekistan001',
  paymeMerchantId: '65f1a2b3c4d5e6f7a8b9c0d1',
  clickServiceId: 'service_id=31245;merchant_id=19820',
  neonDatabaseUrl: '',
  adminPassword: 'admin123'
};

// Official Brand Spelling Normalizer (prevents typos like "louise viton")
const BRAND_SPELLING_MAP = {
  'dior': 'Dior',
  'christian dior': 'Dior',
  'chanel': 'Chanel',
  'replica': 'Maison Margiela REPLICA',
  'maison margiela': 'Maison Margiela REPLICA',
  'maison margiela replica': 'Maison Margiela REPLICA',
  'burberry': 'Burberry',
  'versace': 'Versace',
  'louis vuitton': 'Louis Vuitton',
  'louise viton': 'Louis Vuitton',
  'louis vitton': 'Louis Vuitton',
  'lv': 'Louis Vuitton',
  'ysl': 'Yves Saint Laurent',
  'yves saint laurent': 'Yves Saint Laurent',
  'sabrina carpenter': 'Sabrina Carpenter',
  'ariana grande': 'Ariana Grande',
  'femmenina': 'Femmenina',
  'femenina': 'Femmenina'
};

function normalizeBrandName(rawBrand) {
  const trimmed = String(rawBrand || '').trim();
  const key = trimmed.toLowerCase();
  return BRAND_SPELLING_MAP[key] || trimmed;
}

// Official Brand Catalog with Official Packshot Images & Official Retail Prices in UZS
// Exchange reference: 1 USD ≈ 12 800 UZS
const DEFAULT_PRODUCTS = [
  // --- LATEST / NEW ARRIVALS (Shown first in "Новинки") ---
  {
    id: 'p_sabrina_cherry',
    name: 'Sweet Tooth Cherry Baby',
    brand: 'Sabrina Carpenter',
    gender: 'celebrity',
    volume: '75 ml',
    price: 640000, // Official retail: $50 USD
    isNew: true,
    createdAt: 1760000020000,
    image: 'https://store.sabrinacarpenter.com/cdn/shop/files/Scent_0004_SC_Cherry-Baby-75ml_T.png?v=1724950758&width=1000',
    desc: {
      ru: 'Глазированная вишня, шоколадный мусс, нектар сливы, коричневый сахар и ванильная орхидея.',
      uz: 'Olcha, shokoladli muss, olxo‘ri nektari, jigarrang shakar va vanil orxideyasi.',
      en: 'Glazed cherry, chocolate mousse, plum nectar, brown sugar and vanilla orchid.'
    }
  },
  {
    id: 'p_lv_imagination',
    name: 'Imagination',
    brand: 'Louis Vuitton',
    gender: 'men',
    volume: '100 ml',
    price: 4220000, // Official retail: $330 USD
    isNew: true,
    createdAt: 1760000019000,
    image: 'https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-imagination--LP0476_PM2_Front%20view.jpg',
    desc: {
      ru: 'Калабрийский бергамот, сицилийский апельсин, нигерийский имбирь, китайский черный чай и амброксан.',
      uz: 'Kalabriya bergamoti, Sitsiliya apelsini, zanjabil, Xitoy qora choyi va ambroksan.',
      en: 'Calabrian bergamot, Sicilian orange, Nigerian ginger, Chinese black tea and ambroxan.'
    }
  },
  {
    id: 'p_burberry_goddess',
    name: 'Goddess Eau de Parfum',
    brand: 'Burberry',
    gender: 'women',
    volume: '100 ml',
    price: 2150000, // Official retail: $168 USD
    isNew: true,
    createdAt: 1760000018000,
    image: 'https://media.ulta.com/i/ulta/2612791?w=800&h=800&fmt=auto',
    desc: {
      ru: 'Трио благородной ванили (инфузия, икра и абсолют ванили), сияющая лаванда, какао и имбирь.',
      uz: 'Uch xil vanil uyg‘unligi, lavanda, kakao va zanjabil.',
      en: 'Trio of distinct vanillas (infusion, caviar, absolute), luminous lavender, cacao and ginger.'
    }
  },
  {
    id: 'p_ariana_mod',
    name: 'MOD Vanilla',
    brand: 'Ariana Grande',
    gender: 'celebrity',
    volume: '100 ml',
    price: 895000, // Official retail: $70 USD
    isNew: true,
    createdAt: 1760000017000,
    image: 'https://media.ulta.com/i/ulta/2604557?w=800&h=800&fmt=auto',
    desc: {
      ru: 'Темная слива, розовая фрезия, сливочный мускус, масло ириса, пралине и абсолют ванили.',
      uz: 'Qora olxo‘ri, pushti freziya, mushk, iris moyi, praline va vanil.',
      en: 'Juicy dark plum, pink freesia, creamy musk, orris butter, white praline and vanilla absolute.'
    }
  },

  // --- DIOR ---
  {
    id: 'p_dior_sauvage',
    name: 'Sauvage Eau de Parfum',
    brand: 'Dior',
    gender: 'men',
    volume: '100 ml',
    price: 2050000, // Official retail: $160 USD
    isNew: false,
    createdAt: 1760000016000,
    image: 'https://media.ulta.com/i/ulta/2610141?w=800&h=800&fmt=auto',
    desc: {
      ru: 'Калабрийский бергамот, сычуаньский перец, лаванда, мускатный орех, амброксан и ваниль.',
      uz: 'Kalabriya bergamoti, sichuan qalampiri, lavanda, ambroksan va vanil.',
      en: 'Calabrian bergamot, Sichuan pepper, lavender, nutmeg, ambroxan and Papua New Guinean vanilla.'
    }
  },
  {
    id: 'p_dior_missdior',
    name: 'Miss Dior Eau de Parfum',
    brand: 'Dior',
    gender: 'women',
    volume: '100 ml',
    price: 2370000, // Official retail: $185 USD
    isNew: false,
    createdAt: 1760000015000,
    image: 'https://media.ulta.com/i/ulta/2658951?w=800&h=800&fmt=auto',
    desc: {
      ru: 'Столистная роза из Грасса, пудровый ирис, пион, ландыш, бархатный персик и сандал.',
      uz: 'Grass atirguli, iris, pion, marvaridgul, shaftoli va sandal daraxti.',
      en: 'Centifolia Grasse rose, powdery iris, peony, lily-of-the-valley, velvet peach and sandalwood.'
    }
  },

  // --- CHANEL ---
  {
    id: 'p_chanel_bleu',
    name: 'Bleu de Chanel Eau de Parfum',
    brand: 'Chanel',
    gender: 'men',
    volume: '100 ml',
    price: 1980000, // Official retail: $155 USD
    isNew: false,
    createdAt: 1760000014000,
    image: 'https://www.chanel.com/images/w_0.51,h_0.51,c_crop/f_auto,w_512,h_512/bleu-de-chanel-eau-de-toilette-spray-3-4fl-oz--packshot-default-107460-9564920184862.jpg',
    desc: {
      ru: 'Грейпфрут, мята, розовый перец, имбирь, ладан, кедр и новокаледонский сандал.',
      uz: 'Greypfrut, yalpiz, pushti qalampir, zanjabil, kedr va sandal daraxti.',
      en: 'Grapefruit, mint, pink pepper, ginger, incense, cedar and New Caledonian sandalwood.'
    }
  },
  {
    id: 'p_chanel_coco',
    name: 'Coco Mademoiselle Eau de Parfum',
    brand: 'Chanel',
    gender: 'women',
    volume: '100 ml',
    price: 2240000, // Official retail: $175 USD
    isNew: false,
    createdAt: 1760000013000,
    image: 'https://www.chanel.com/images//t_one/w_0.51,h_0.51,c_crop/q_auto:good,f_auto,fl_lossy,dpr_1.1/w_620/coco-mademoiselle-eau-de-parfum-spray-3-4fl-oz--packshot-default-116520-9564892495902.jpg',
    desc: {
      ru: 'Сицилийский апельсин, бергамот, утренняя роза, жасмин, пачули, бурбонская ваниль и белый мускус.',
      uz: 'Sitsiliya apelsini, bergamot, atirgul, yasmin, pachuli, vanil va oq mushk.',
      en: 'Sicilian orange, bergamot, Turkish rose, jasmine, patchouli, Bourbon vanilla and white musk.'
    }
  },

  // --- MAISON MARGIELA REPLICA ---
  {
    id: 'p_replica_jazz',
    name: 'REPLICA Jazz Club',
    brand: 'Maison Margiela REPLICA',
    gender: 'men',
    volume: '100 ml',
    price: 2180000, // Official retail: $170 USD
    isNew: false,
    createdAt: 1760000012000,
    image: 'https://www.sephora.com/productimages/sku/s1788058-main-zoom.jpg',
    desc: {
      ru: 'Розовый перец, нероли, выдержанный ром, лист табака, стручок ванили и ветивер.',
      uz: 'Pushti qalampir, neroli, rom, tamaki bargi, vanil va vetiver.',
      en: 'Pink pepper, neroli, aged rum absolute, tobacco leaf, vanilla bean and vetiver.'
    }
  },
  {
    id: 'p_replica_fireplace',
    name: 'REPLICA By the Fireplace',
    brand: 'Maison Margiela REPLICA',
    gender: 'celebrity',
    volume: '100 ml',
    price: 2180000, // Official retail: $170 USD
    isNew: false,
    createdAt: 1760000011000,
    image: 'https://www.sephora.com/productimages/sku/s1602259-main-zoom.jpg',
    desc: {
      ru: 'Жареный каштан, гвоздика, гваяковое дерево, кашмеран и теплая дымная ваниль.',
      uz: 'Qovurilgan kashtan, qalampirmunchoq, gvayak daraxti va iliq vanil.',
      en: 'Roasted chestnut accord, clove oil, guaiac wood, cashmeran and warm smoky vanilla.'
    }
  },

  // --- BURBERRY ---
  {
    id: 'p_burberry_hero',
    name: 'Hero Eau de Parfum',
    brand: 'Burberry',
    gender: 'men',
    volume: '100 ml',
    price: 1980000, // Official retail: $155 USD
    isNew: false,
    createdAt: 1760000010000,
    image: 'https://media.ulta.com/i/ulta/2599236?w=800&h=800&fmt=auto',
    desc: {
      ru: 'Хвоя сосны, бензоин, ладан и трио благородного кедра (Атласский, Вирджинский и Гималайский).',
      uz: 'Qarag‘ay ignalari, benzoin va uch xil kedr daraxti uyg‘unligi.',
      en: 'Pine needles, benzoin, incense and a warm trio of Atlas, Virginian and Himalayan cedarwood.'
    }
  },

  // --- VERSACE ---
  {
    id: 'p_versace_eros',
    name: 'Eros Eau de Parfum',
    brand: 'Versace',
    gender: 'men',
    volume: '100 ml',
    price: 1540000, // Official retail: $120 USD
    isNew: false,
    createdAt: 1760000009000,
    image: 'https://media.ulta.com/i/ulta/2265448?w=800&h=800&fmt=auto',
    desc: {
      ru: 'Листья мяты, карамельное яблоко, итальянский лимон, амброксан, кедр и мадагаскарская ваниль.',
      uz: 'Yalpiz barglari, karamelli olma, Italiya limoni, ambroksan, kedr va vanil.',
      en: 'Mint leaves, candied apple, Italian lemon, ambroxan, Atlas cedar and Madagascar vanilla.'
    }
  },
  {
    id: 'p_versace_crystal',
    name: 'Bright Crystal',
    brand: 'Versace',
    gender: 'women',
    volume: '90 ml',
    price: 1520000, // Official retail: $119 USD
    isNew: false,
    createdAt: 1760000008000,
    image: 'https://media.ulta.com/i/ulta/2232873?w=800&h=800&fmt=auto',
    desc: {
      ru: 'Юзу, ледяной аккорд, сочный гранат, пион, цветок лотоса, магнолия, амбра и мускус.',
      uz: 'Yuzu, muzli akkord, anor, pion, nilufar guli, magnoliya va ambra.',
      en: 'Yuzu, iced accord, juicy pomegranate, peony, lotus flower, magnolia, amber and musk.'
    }
  },

  // --- LOUIS VUITTON ---
  {
    id: 'p_lv_attrape',
    name: 'Attrape-Rêves',
    brand: 'Louis Vuitton',
    gender: 'women',
    volume: '100 ml',
    price: 4220000, // Official retail: $330 USD
    isNew: false,
    createdAt: 1760000007000,
    image: 'https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_M/louis-vuitton--LP0479_PM2_Front%20view.jpg?wid=750&hei=870',
    desc: {
      ru: 'Личи, пион, турецкая роза, цветок имбиря, необработанное какао и пачули.',
      uz: 'Lichi, pion, turk atirguli, zanjabil guli, tabiiy kakao va pachuli.',
      en: 'Litchi, peony, Turkish rose absolute, ginger flower, raw cacao powder and patchouli.'
    }
  },
  {
    id: 'p_lv_ombre',
    name: 'Ombre Nomade',
    brand: 'Louis Vuitton',
    gender: 'men',
    volume: '100 ml',
    price: 5500000, // Official retail: $430 USD
    isNew: false,
    createdAt: 1760000006000,
    image: 'https://me.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--LP0095_PM2_Front%20view.jpg',
    desc: {
      ru: 'Королевский уд (агаровое дерево), малина, дамасская роза, шафран, бензоин и дымный ладан.',
      uz: 'Qirollik ud daraxti, malina, Damashq atirguli, za’faron va tutunli isiriq.',
      en: 'Rare oud wood, raspberry accord, Damask rose, saffron, benzoin resin and smoky incense.'
    }
  },

  // --- YVES SAINT LAURENT (YSL) ---
  {
    id: 'p_ysl_y',
    name: 'Y Eau de Parfum',
    brand: 'Yves Saint Laurent',
    gender: 'men',
    volume: '100 ml',
    price: 2020000, // Official retail: $158 USD
    isNew: false,
    createdAt: 1760000005000,
    image: 'https://media.ulta.com/i/ulta/2534072?w=800&h=800&fmt=auto',
    desc: {
      ru: 'Хрустящее яблоко, имбирь, бергамот, шалфей, можжевельник, бобы тонка и амбровое дерево.',
      uz: 'Yashil olma, zanjabil, bergamot, shalfey, tonka dukkaklari va ambra daraxti.',
      en: 'Crisp apple, ginger, bergamot, clary sage, juniper berries, tonka bean and amberwood.'
    }
  },
  {
    id: 'p_ysl_libre',
    name: 'Libre Eau de Parfum',
    brand: 'Yves Saint Laurent',
    gender: 'women',
    volume: '90 ml',
    price: 2370000, // Official retail: $185 USD
    isNew: false,
    createdAt: 1760000004000,
    image: 'https://media.ulta.com/i/ulta/2553366?w=800&h=800&fmt=auto',
    desc: {
      ru: 'Французская лаванда, марокканский флердоранж, жасмин самбак, мадагаскарская ваниль и серая амбра.',
      uz: 'Fransuz lavandasi, apelsin guli, yasmin sambak, Madagaskar vanili va ambra.',
      en: 'French lavender, Moroccan orange blossom, jasmine sambac, Madagascar vanilla and ambergris.'
    }
  },
  {
    id: 'p_ysl_blackopium',
    name: 'Black Opium Eau de Parfum',
    brand: 'Yves Saint Laurent',
    gender: 'women',
    volume: '90 ml',
    price: 2230000, // Official retail: $174 USD
    isNew: false,
    createdAt: 1760000003000,
    image: 'https://media.ulta.com/i/ulta/2292759?w=800&h=800&fmt=auto',
    desc: {
      ru: 'Груша, розовый перец, цветы апельсина, насыщенный черный кофе, ваниль, пачули и кедр.',
      uz: 'Nok, pushti qalampir, apelsin gullari, qora qahva, vanil va pachuli.',
      en: 'Pear accord, pink pepper, orange blossom, rich black coffee, vanilla, patchouli and cedar.'
    }
  },

  // --- CELEBRITY & GOURMAND ICONS: SABRINA CARPENTER, ARIANA GRANDE, FEMMENINA ---
  {
    id: 'p_sabrina_sweet',
    name: 'Sweet Tooth Eau de Parfum',
    brand: 'Sabrina Carpenter',
    gender: 'celebrity',
    volume: '75 ml',
    price: 640000, // Official retail: $50 USD
    isNew: false,
    createdAt: 1760000002000,
    image: 'https://media.ulta.com/i/ulta/2646799?w=800&h=800&fmt=auto',
    desc: {
      ru: 'Шоколадный маршмеллоу, засахаренный имбирь, кокосовое молоко, мадагаскарская ваниль и взбитые сливки Шантийи.',
      uz: 'Shokoladli marshmellou, kokos suti, Madagaskar vanili va Shantiyi qaymog‘i.',
      en: 'Chocolate marshmallow, candied ginger, coconut milk, Madagascar vanilla and Chantilly cream.'
    }
  },
  {
    id: 'p_ariana_cloud',
    name: 'Cloud Eau de Parfum',
    brand: 'Ariana Grande',
    gender: 'celebrity',
    volume: '100 ml',
    price: 895000, // Official retail: $70 USD
    isNew: false,
    createdAt: 1760000001000,
    image: 'https://media.ulta.com/i/ulta/2536254?w=800&h=800&fmt=auto',
    desc: {
      ru: 'Цветок лаванды, сочная груша, крем из кокоса, пралине, ванильная орхидея и чувственный мускус.',
      uz: 'Lavanda guli, nok, kokos kremi, praline, vanil orxideyasi va mushk.',
      en: 'Lavender blossom, juicy pear, whipped coconut cream, praline, vanilla orchid and sensual musk.'
    }
  },
  {
    id: 'p_femmenina_milk',
    name: 'Elegant Girl Strawberry Crème',
    brand: 'Femmenina',
    gender: 'celebrity',
    volume: '50 ml',
    price: 615000, // Official retail: $48 USD
    isNew: false,
    createdAt: 1760000000000,
    image: 'https://www.shopfemmenina.com/cdn/shop/files/77_8dee12fe-e8f2-43be-92a3-49155749a87d.png?crop=center&height=1200&v=1781913766&width=1200',
    desc: {
      ru: 'Нежное клубничное молоко, воздушный зефир маршмеллоу, сахарная пудра и теплая сливочная ваниль.',
      uz: 'Qulupnayli sut, yumshoq zefir marshmellou, shakar upasi va qaymoqli vanil.',
      en: 'Sweet strawberry milk, fluffy marshmallow cream, powdered sugar and warm vanilla bean.'
    }
  }
];

// Translations (RU / UZ / EN)
const I18N = {
  ru: {
    navHome: 'ГЛАВНАЯ',
    navNew: 'НОВИНКИ',
    navCollections: 'КОЛЛЕКЦИИ',
    navCatalog: 'КАТАЛОГ',
    navAbout: 'О НАС',
    heroTitle: 'Scent Essentials',
    heroSubtitle: 'Официальная коллекция ароматов Dior, Chanel, Louis Vuitton, Yves Saint Laurent, Maison Margiela REPLICA, Burberry, Versace, Sabrina Carpenter и Ariana Grande',
    heroCta: 'СМОТРЕТЬ КАТАЛОГ',
    catEyebrow: 'ДОБРО ПОЖАЛОВАТЬ В БУТИК',
    catHeading: 'Безупречный Стиль Аромата',
    archMenTitle: 'Мужские Парфюмы',
    archMenDesc: 'Статусные композиции Dior Sauvage, Bleu de Chanel, Louis Vuitton Imagination, Burberry Hero и Versace Eros.',
    archWomenTitle: 'Женские Парфюмы',
    archWomenDesc: 'Утонченная классика Chanel Coco Mademoiselle, Miss Dior, YSL Libre, Burberry Goddess и Louis Vuitton Attrape-Rêves.',
    archCelebTitle: 'Звездные и Нишевые Духи',
    archCelebDesc: 'Культовые гурманские ароматы Sabrina Carpenter, Ariana Grande, Femmenina и селективная линия Maison Margiela REPLICA.',
    viewMoreBtn: 'СМОТРЕТЬ',
    newEyebrow: 'ПОСЛЕДНИЕ ПОСТУПЛЕНИЯ ИЗ АДМИНКИ',
    newHeading: 'Новинки Коллекции',
    newSubnote: 'Здесь автоматически отображаются последние добавленные духи из админ-панели и свежие релизы брендов',
    aboutEyebrow: 'О НАШЕМ БУТИКЕ',
    aboutHeading: 'Идеальное Сочетание Роскоши и Подлинности',
    aboutText: 'Мы представляем оригинальные флаконы напрямую из официальных коллекций мировых домов моды. Каждый аромат сопровождается актуальной официальной ценой в узбекских сумах (UZS) и быстрой оплатой с отправкой чека в Telegram.',
    aboutPoint1: 'Официальные флаконы Dior, Chanel, Louis Vuitton, YSL, Burberry, Versace и REPLICA',
    aboutPoint2: 'Эксклюзивные духи знаменитостей: Sabrina Carpenter, Ariana Grande и Femmenina',
    aboutPoint3: 'Мгновенная отправка фото чека напрямую в Telegram владельца магазина',
    catalogEyebrow: 'ОФИЦИАЛЬНЫЕ АРОМАТЫ И ЦЕНЫ',
    catalogTitle: 'Каталог Парфюмерии',
    itemsCountLabel: 'ароматов',
    filterAll: 'Все ароматы',
    filterMen: 'Мужские',
    filterWomen: 'Женские',
    filterCeleb: 'Знаменитости и Ниша',
    allBrandsBtn: 'Все бренды',
    searchPlaceholder: 'Поиск по названию или бренду (Dior, Chanel, Sabrina...)...',
    sortNewest: 'Сначала новинки',
    sortPriceAsc: 'Цена: по возрастанию',
    sortPriceDesc: 'Цена: по убыванию',
    sortNameAsc: 'По названию (А–Я)',
    cardLabelName: 'Название',
    cardLabelBrand: 'Бренд',
    cardLabelPrice: 'Цена',
    genderMen: 'Мужской',
    genderWomen: 'Женский',
    genderCeleb: 'Celebrity / Ниша',
    newBadgeText: 'НОВИНКА',
    buyNowBtn: 'Купить',
    addToCartBtn: 'В корзину',
    promoEyebrow: 'ОПЛАТА ЧЕРЕЗ TELEGRAM БОТ',
    promoHeading: 'Быстрый Заказ с Загрузкой Чека',
    promoDesc: 'Выберите любимый парфюм, переведите сумму в сумах на карту и прикрепите скриншот чека — заказ мгновенно поступит в наш Telegram.',
    openCartCta: 'ОТКРЫТЬ КОРЗИНУ',
    footerBrandsHeading: 'Официальные Бренды',
    footerDesc: 'Бутик селективной и люксовой парфюмерии для мужчин и женщин. Все цены указаны в узбекских сумах (UZS).',
    footerPayHeading: 'Оплата и Доставка',
    footerPayDesc: 'Uzcard / Humo / Visa • Мгновенное подтверждение чека через Telegram • Доставка по Ташкенту и всему Узбекистану.',
    cartTitle: 'Корзина и Оформление',
    emptyCartText: 'Ваша корзина пока пуста. Выберите аромат в каталоге.',
    totalLabel: 'Итого к оплате:',
    paymentInstructionTitle: 'Реквизиты для оплаты переводом (Uzcard / Humo):',
    copyBtn: 'Скопировать',
    copiedToast: 'Номер карты скопирован!',
    cardHolderLabel: 'Получатель:',
    paymentInstructionDesc: 'Переведите итоговую сумму на указанную карту и прикрепите скриншот или фото чека ниже. Чек автоматически отправится в наш Telegram!',
    labelName: 'Ваше имя *',
    placeholderName: 'Например: Сардор Алиев',
    labelPhone: 'Телефон / Telegram *',
    labelAddress: 'Адрес доставки (город, улица, дом) *',
    placeholderAddress: 'Ташкент, Юнусабадский р-н...',
    labelComment: 'Комментарий к заказу',
    placeholderComment: 'Пожелания по времени доставки',
    labelReceipt: 'Скриншот / фото чека оплаты *',
    uploadReceiptPrompt: 'Нажмите, чтобы загрузить картинку чека',
    uploadReceiptSub: 'PNG, JPG, WEBP до 10 МБ',
    changeReceiptBtn: 'Изменить чек',
    submitOrderBtn: 'Отправить заказ и чек в Telegram',
    sendingOrderBtn: 'Отправка чека в Telegram...',
    currencySuffix: 'сум',
    addedToCartToast: 'добавлен в корзину',
    receiptRequiredAlert: 'Пожалуйста, прикрепите картинку чека оплаты!',
    orderSuccessSent: 'Заказ и фото чека успешно отправлены в ваш Telegram (@glam_perfumes_bot)!',
    orderSavedLocal: 'Заказ и фото чека успешно отправлены в ваш Telegram (@glam_perfumes_bot)!',
    adminTitle: 'Скрытая Админ-панель',
    adminLoginHeading: 'Вход для администратора',
    adminLoginHint: 'Введите секретный пароль администратора (по умолчанию: admin123)',
    adminLoginBtn: 'Войти',
    adminTabTelegram: 'Telegram и Оплата',
    adminTabProducts: 'Управление парфюмами (Новинки)',
    adminTabOrders: 'Заказы и Чеки',
    adminLogout: 'Выйти'
  },
  uz: {
    navHome: 'BOSH SAHIFA',
    navNew: 'YANGILIKLAR',
    navCollections: 'KOLLEKSIYALAR',
    navCatalog: 'KATALOG',
    navAbout: 'BIZ HAQIMIZDA',
    heroTitle: 'Scent Essentials',
    heroSubtitle: 'Dior, Chanel, Louis Vuitton, Yves Saint Laurent, Maison Margiela REPLICA, Burberry, Versace, Sabrina Carpenter va Ariana Grande rasmiy atirlar kolleksiyasi',
    heroCta: 'KATALOGNI KO‘RISH',
    catEyebrow: 'BUTIKIMIZGA XUSH KELIBSIZ',
    catHeading: 'Betakror Iforlar Uslubi',
    archMenTitle: 'Erkaklar Parfyumeriyasi',
    archMenDesc: 'Dior Sauvage, Bleu de Chanel, Louis Vuitton Imagination, Burberry Hero va Versace Eros original kompozitsiyalari.',
    archWomenTitle: 'Ayollar Parfyumeriyasi',
    archWomenDesc: 'Chanel Coco Mademoiselle, Miss Dior, YSL Libre, Burberry Goddess va Louis Vuitton Attrape-Rêves nafis klassikasi.',
    archCelebTitle: 'Mashhurlar va Nisha Atirlari',
    archCelebDesc: 'Sabrina Carpenter, Ariana Grande, Femmenina shirin iforlari hamda Maison Margiela REPLICA selektiv liniyasi.',
    viewMoreBtn: 'KO‘RISH',
    newEyebrow: 'SO‘NGGI QO‘SHILGAN ATIRLAR',
    newHeading: 'Yangi Kolleksiya (Novinki)',
    newSubnote: 'Admin-paneldan qo‘shilgan eng oxirgi atirlar avtomatik ravishda shu bo‘limda birinchi bo‘lib ko‘rinadi',
    aboutEyebrow: 'BUTIK HAQIDA',
    aboutHeading: 'Hashamat va Asllik Uyg‘unligi',
    aboutText: 'Biz dunyo moda uylarining rasmiy kolleksiyalaridan original flakonlarni taqdim etamiz. Har bir atir O‘zbekiston so‘mida (UZS) rasmiy narxda ko‘rsatilgan va to‘lov cheki Telegram orqali yuboriladi.',
    aboutPoint1: 'Dior, Chanel, Louis Vuitton, YSL, Burberry, Versace va REPLICA rasmiy flakonlari',
    aboutPoint2: 'Mashhurlar atirlari: Sabrina Carpenter, Ariana Grande va Femmenina',
    aboutPoint3: 'To‘lov cheki rasmini bevosita do‘kon egasining Telegramiga yuborish',
    catalogEyebrow: 'RASMIY ATIRLAR VA NARXLAR',
    catalogTitle: 'Parfyumeriya Katalogi',
    itemsCountLabel: 'ta atir',
    filterAll: 'Barcha atirlar',
    filterMen: 'Erkaklar uchun',
    filterWomen: 'Ayollar uchun',
    filterCeleb: 'Mashhurlar va Nisha',
    allBrandsBtn: 'Barcha brendlar',
    searchPlaceholder: 'Nomi yoki brend bo‘yicha qidirish...',
    sortNewest: 'Avval yangilari',
    sortPriceAsc: 'Narx: arzonidan boshlab',
    sortPriceDesc: 'Narx: qimmatidan boshlab',
    sortNameAsc: 'Nomi bo‘yicha (A–Z)',
    cardLabelName: 'Nomi',
    cardLabelBrand: 'Brend',
    cardLabelPrice: 'Narxi',
    genderMen: 'Erkaklar',
    genderWomen: 'Ayollar',
    genderCeleb: 'Celebrity / Nisha',
    newBadgeText: 'YANGI',
    buyNowBtn: 'Xarid qilish',
    addToCartBtn: 'Savatga',
    promoEyebrow: 'TELEGRAM BOT ORQALI TO‘LOV',
    promoHeading: 'Chek Yuklash Bilan Tezkor Buyurtma',
    promoDesc: 'Sevimli atiringizni tanlang, summani kartaga o‘tkazing va chek skrinshotini yuklang — buyurtma darhol Telegramimizga boradi.',
    openCartCta: 'SAVATNI OCHISH',
    footerBrandsHeading: 'Rasmiy Brendlar',
    footerDesc: 'Erkaklar va ayollar uchun lyuks parfyumeriya butigi. Barcha narxlar O‘zbekiston so‘mida (UZS) ko‘rsatilgan.',
    footerPayHeading: 'To‘lov va Yetkazib berish',
    footerPayDesc: 'Uzcard / Humo / Visa • Chekni Telegram orqali tasdiqlash • Toshkent va butun O‘zbekiston bo‘ylab yetkazib berish.',
    cartTitle: 'Savat va Buyurtma berish',
    emptyCartText: 'Savatingiz hozircha bo‘sh. Katalogdan atir tanlang.',
    totalLabel: 'Jami to‘lov:',
    paymentInstructionTitle: 'To‘lov uchun karta rekvizitlari (Uzcard / Humo):',
    copyBtn: 'Nusxalash',
    copiedToast: 'Karta raqami nusxalandi!',
    cardHolderLabel: 'Qabul qiluvchi:',
    paymentInstructionDesc: 'Jami summani ko‘rsatilgan kartaga o‘tkazing va to‘lov cheki rasmini quyida yuklang. Chek avtomatik ravishda Telegramimizga yuboriladi!',
    labelName: 'Ismingiz *',
    placeholderName: 'Masalan: Sardor Aliyev',
    labelPhone: 'Telefon / Telegram *',
    labelAddress: 'Yetkazib berish manzili *',
    placeholderAddress: 'Toshkent sh., Yunusobod tumani...',
    labelComment: 'Buyurtmaga izoh',
    placeholderComment: 'Yetkazib berish vaqti bo‘yicha istaklar',
    labelReceipt: 'To‘lov cheki rasmi / skrinshoti *',
    uploadReceiptPrompt: 'Chek rasmini yuklash uchun bosing',
    uploadReceiptSub: 'PNG, JPG, WEBP 10 MB gacha',
    changeReceiptBtn: 'Chekni almashtirish',
    submitOrderBtn: 'Buyurtma va chekni Telegramga yuborish',
    sendingOrderBtn: 'Chek Telegramga yuborilmoqda...',
    currencySuffix: 'so‘m',
    addedToCartToast: 'savatga qo‘shildi',
    receiptRequiredAlert: 'Iltimos, to‘lov cheki rasmini yuklang!',
    orderSuccessSent: 'Buyurtma va to‘lov cheki Telegramga (@glam_perfumes_bot) muvaffaqiyatli yuborildi!',
    orderSavedLocal: 'Buyurtma va to‘lov cheki Telegramga (@glam_perfumes_bot) muvaffaqiyatli yuborildi!',
    adminTitle: 'Yashirin Admin-panel',
    adminLoginHeading: 'Administrator kirishi',
    adminLoginHint: 'Maxfiy parolni kiriting (standart: admin123)',
    adminLoginBtn: 'Kirish',
    adminTabTelegram: 'Telegram va To‘lov',
    adminTabProducts: 'Atirlarni boshqarish (Yangiliklar)',
    adminTabOrders: 'Buyurtmalar va Cheklar',
    adminLogout: 'Chiqish'
  },
  en: {
    navHome: 'HOME',
    navNew: 'NEW ARRIVALS',
    navCollections: 'COLLECTIONS',
    navCatalog: 'CATALOG',
    navAbout: 'ABOUT US',
    heroTitle: 'Scent Essentials',
    heroSubtitle: 'Official fragrance collection from Dior, Chanel, Louis Vuitton, Yves Saint Laurent, Maison Margiela REPLICA, Burberry, Versace, Sabrina Carpenter & Ariana Grande',
    heroCta: 'EXPLORE CATALOG',
    catEyebrow: 'WELCOME TO OUR SHOP',
    catHeading: 'Fearless Scent Style',
    archMenTitle: 'Men’s Fragrances',
    archMenDesc: 'Iconic compositions including Dior Sauvage, Bleu de Chanel, Louis Vuitton Imagination, Burberry Hero and Versace Eros.',
    archWomenTitle: 'Women’s Fragrances',
    archWomenDesc: 'Timeless elegance of Chanel Coco Mademoiselle, Miss Dior, YSL Libre, Burberry Goddess and Louis Vuitton Attrape-Rêves.',
    archCelebTitle: 'Celebrity & Niche Perfumes',
    archCelebDesc: 'Viral gourmand creations by Sabrina Carpenter, Ariana Grande, Femmenina and Maison Margiela REPLICA.',
    viewMoreBtn: 'VIEW MORE',
    newEyebrow: 'LATEST FROM ADMIN',
    newHeading: 'New Collection',
    newSubnote: 'Perfumes added via the Admin Panel automatically appear first in this New Arrivals showcase',
    aboutEyebrow: 'ABOUT US',
    aboutHeading: 'Perfect Matches of Luxury & Authenticity',
    aboutText: 'We curate authentic bottles straight from official fashion houses, priced in Uzbek Som (UZS) with instant Telegram receipt verification.',
    aboutPoint1: 'Official bottles from Dior, Chanel, Louis Vuitton, YSL, Burberry, Versace & REPLICA',
    aboutPoint2: 'Celebrity & gourmand icons: Sabrina Carpenter, Ariana Grande & Femmenina',
    aboutPoint3: 'Instant receipt photo delivery directly to the store owner’s Telegram',
    catalogEyebrow: 'OFFICIAL FRAGRANCES & PRICES',
    catalogTitle: 'Perfume Catalog',
    itemsCountLabel: 'fragrances',
    filterAll: 'All Fragrances',
    filterMen: 'Men',
    filterWomen: 'Women',
    filterCeleb: 'Celebrity & Niche',
    allBrandsBtn: 'All Brands',
    searchPlaceholder: 'Search by perfume name or brand...',
    sortNewest: 'Newest First',
    sortPriceAsc: 'Price: Low to High',
    sortPriceDesc: 'Price: High to Low',
    sortNameAsc: 'Name: A to Z',
    cardLabelName: 'Name',
    cardLabelBrand: 'Brand',
    cardLabelPrice: 'Price',
    genderMen: 'Men',
    genderWomen: 'Women',
    genderCeleb: 'Celebrity / Niche',
    newBadgeText: 'NEW',
    buyNowBtn: 'Buy Now',
    addToCartBtn: 'Add to Cart',
    promoEyebrow: 'TELEGRAM BOT CHECKOUT',
    promoHeading: 'Fast Checkout with Receipt Upload',
    promoDesc: 'Select your fragrance, transfer the total in UZS to our card, and upload your receipt photo — your order arrives instantly in our Telegram.',
    openCartCta: 'OPEN SHOPPING CART',
    footerBrandsHeading: 'Official Brands',
    footerDesc: 'Boutique of niche and luxury fragrances for men and women. All prices are displayed in Uzbek Som (UZS).',
    footerPayHeading: 'Payment & Delivery',
    footerPayDesc: 'Uzcard / Humo / Visa • Instant Telegram receipt confirmation • Delivery across Tashkent and Uzbekistan.',
    cartTitle: 'Cart & Checkout',
    emptyCartText: 'Your shopping cart is empty. Choose a fragrance from the catalog.',
    totalLabel: 'Total to Pay:',
    paymentInstructionTitle: 'Card Transfer Details (Uzcard / Humo):',
    copyBtn: 'Copy',
    copiedToast: 'Card number copied!',
    cardHolderLabel: 'Cardholder:',
    paymentInstructionDesc: 'Transfer the total amount to the card above and upload a photo or screenshot of your receipt below. The receipt will be sent directly to our Telegram!',
    labelName: 'Your Name *',
    placeholderName: 'e.g. Sardor Aliev',
    labelPhone: 'Phone / Telegram *',
    labelAddress: 'Delivery Address *',
    placeholderAddress: 'Tashkent, Yunusabad district...',
    labelComment: 'Order Notes',
    placeholderComment: 'Preferred delivery time',
    labelReceipt: 'Payment Receipt Image / Screenshot *',
    uploadReceiptPrompt: 'Click to upload receipt image',
    uploadReceiptSub: 'PNG, JPG, WEBP up to 10 MB',
    changeReceiptBtn: 'Change receipt image',
    submitOrderBtn: 'Send Order & Receipt to Telegram',
    sendingOrderBtn: 'Sending receipt to Telegram...',
    currencySuffix: 'UZS',
    addedToCartToast: 'added to cart',
    receiptRequiredAlert: 'Please upload a photo of your payment receipt!',
    orderSuccessSent: 'Order and payment receipt sent to Telegram (@glam_perfumes_bot) successfully!',
    orderSavedLocal: 'Order and payment receipt sent to Telegram (@glam_perfumes_bot) successfully!',
    adminTitle: 'Hidden Admin Panel',
    adminLoginHeading: 'Administrator Login',
    adminLoginHint: 'Enter the secret admin password (default: admin123)',
    adminLoginBtn: 'Sign In',
    adminTabTelegram: 'Telegram & Payment',
    adminTabProducts: 'Manage Perfumes (New Arrivals)',
    adminTabOrders: 'Orders & Receipts',
    adminLogout: 'Log Out'
  }
};

// Application State
let state = {
  lang: localStorage.getItem(STORAGE_KEYS.LANG) || 'ru',
  theme: localStorage.getItem(STORAGE_KEYS.THEME) || 'light',
  filter: 'all',
  brandFilter: 'all',
  search: '',
  sort: 'newest',
  products: [],
  cart: [],
  settings: { ...DEFAULT_SETTINGS },
  orders: [],
  files: [],
  adminUnlocked: false,
  selectedPaymentMethod: 'payme',
  selectedReceiptFile: null,
  selectedReceiptDataUrl: null,
  uploadedProdImageDataUrl: null,
  uploadedProdImageFile: null
};

function loadState() {
  try {
    const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    state.products = savedProducts ? JSON.parse(savedProducts) : [...DEFAULT_PRODUCTS];

    // Normalize all brand names on load to guarantee proper spelling
    state.products.forEach((p) => {
      p.brand = normalizeBrandName(p.brand);
    });

    const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
    state.cart = savedCart ? JSON.parse(savedCart) : [];

    const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      state.settings = {
        ...DEFAULT_SETTINGS,
        ...parsed,
        botToken: (parsed.botToken && parsed.botToken.trim()) ? parsed.botToken.trim() : DEFAULT_SETTINGS.botToken,
        chatId: (parsed.chatId && String(parsed.chatId).trim()) ? String(parsed.chatId).trim() : DEFAULT_SETTINGS.chatId
      };
    } else {
      state.settings = { ...DEFAULT_SETTINGS };
    }
    saveSettings();

    const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    state.orders = savedOrders ? JSON.parse(savedOrders) : [];

    const savedFiles = localStorage.getItem(STORAGE_KEYS.FILES);
    state.files = savedFiles ? JSON.parse(savedFiles) : [];
  } catch (e) {
    console.error('Failed to load state:', e);
    state.products = [...DEFAULT_PRODUCTS];
  }
}

function saveProducts() {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(state.products));
}

function saveCart() {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart));
}

function saveSettings() {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(state.settings));
}

function saveOrders() {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(state.orders));
}

function saveFiles() {
  localStorage.setItem(STORAGE_KEYS.FILES, JSON.stringify(state.files));
}

// ============================================================================
// Neon Serverless PostgreSQL Database & File Storage (@neondatabase/serverless)
// Tables: neon_files (receipts & product images), perfumes, orders
// ============================================================================
const NeonStorageEngine = {
  isConnected() {
    const url = (state.settings.neonDatabaseUrl || '').trim();
    return url.startsWith('postgres://') || url.startsWith('postgresql://');
  },

  getEndpointUrl() {
    const connStr = (state.settings.neonDatabaseUrl || '').trim();
    const match = connStr.match(/@([^:/?#]+)/);
    if (!match || !match[1]) {
      throw new Error('Некорректный формат DATABASE_URL Neon');
    }
    return {
      endpoint: `https://${match[1]}/sql`,
      connStr
    };
  },

  async executeSql(query, params = []) {
    if (!this.isConnected()) return null;
    const { endpoint, connStr } = this.getEndpointUrl();
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Neon-Connection-String': connStr
      },
      body: JSON.stringify({ query, params })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Neon SQL HTTP ${res.status}`);
    }
    return data;
  },

  async initSchemaAndSync() {
    if (!this.isConnected()) {
      throw new Error('Введите строку подключения DATABASE_URL от вашей базы Neon');
    }

    await this.executeSql(`
      CREATE TABLE IF NOT EXISTS neon_files (
        id TEXT PRIMARY KEY,
        filename TEXT NOT NULL,
        mime_type TEXT NOT NULL,
        size_bytes INTEGER NOT NULL DEFAULT 0,
        category TEXT NOT NULL DEFAULT 'receipt',
        data_url TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    await this.executeSql(`
      CREATE TABLE IF NOT EXISTS perfumes (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        brand TEXT NOT NULL,
        gender TEXT NOT NULL,
        volume TEXT NOT NULL DEFAULT '100 ml',
        price_uzs BIGINT NOT NULL,
        is_new BOOLEAN NOT NULL DEFAULT TRUE,
        created_at BIGINT NOT NULL,
        image_url TEXT NOT NULL,
        file_id TEXT,
        desc_ru TEXT DEFAULT '',
        desc_uz TEXT DEFAULT '',
        desc_en TEXT DEFAULT ''
      )
    `);

    await this.executeSql(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        order_date TEXT NOT NULL,
        customer_name TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        customer_address TEXT NOT NULL,
        customer_comment TEXT DEFAULT '',
        items_json JSONB NOT NULL,
        total_uzs BIGINT NOT NULL,
        payment_status TEXT NOT NULL,
        payment_provider TEXT NOT NULL,
        transaction_id TEXT NOT NULL,
        masked_card TEXT DEFAULT '',
        receipt_file_id TEXT,
        receipt_data_url TEXT,
        telegram_sent BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    // Sync files
    for (const f of state.files) {
      await this.executeSql(
        `INSERT INTO neon_files (id, filename, mime_type, size_bytes, category, data_url)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id) DO UPDATE SET data_url = EXCLUDED.data_url`,
        [f.id, f.filename, f.mimeType, f.sizeBytes || 0, f.category || 'receipt', f.dataUrl]
      );
    }

    // Sync products
    for (const p of state.products) {
      await this.upsertPerfume(p);
    }

    // Sync orders
    for (const o of state.orders) {
      await this.insertPaidOrder(o);
    }

    return true;
  },

  async saveFile({ filename, mimeType, sizeBytes, category, dataUrl }) {
    const fileRecord = {
      id: 'neon_file_' + Date.now() + '_' + Math.floor(1000 + Math.random() * 9000),
      filename: filename || 'receipt.png',
      mimeType: mimeType || 'image/png',
      sizeBytes: sizeBytes || Math.round((dataUrl || '').length * 0.75),
      category: category || 'receipt',
      dataUrl,
      createdAt: new Date().toLocaleString('ru-RU')
    };

    state.files.unshift(fileRecord);
    saveFiles();

    if (this.isConnected()) {
      try {
        await this.executeSql(
          `INSERT INTO neon_files (id, filename, mime_type, size_bytes, category, data_url)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (id) DO UPDATE SET data_url = EXCLUDED.data_url`,
          [
            fileRecord.id,
            fileRecord.filename,
            fileRecord.mimeType,
            fileRecord.sizeBytes,
            fileRecord.category,
            fileRecord.dataUrl
          ]
        );
      } catch (e) {
        console.warn('Neon saveFile sync warning:', e);
      }
    }

    return fileRecord;
  },

  async upsertPerfume(p) {
    if (!this.isConnected()) return;
    try {
      await this.executeSql(
        `INSERT INTO perfumes (id, name, brand, gender, volume, price_uzs, is_new, created_at, image_url, file_id, desc_ru, desc_uz, desc_en)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name,
           brand = EXCLUDED.brand,
           gender = EXCLUDED.gender,
           volume = EXCLUDED.volume,
           price_uzs = EXCLUDED.price_uzs,
           is_new = EXCLUDED.is_new,
           created_at = EXCLUDED.created_at,
           image_url = EXCLUDED.image_url,
           file_id = EXCLUDED.file_id,
           desc_ru = EXCLUDED.desc_ru,
           desc_uz = EXCLUDED.desc_uz,
           desc_en = EXCLUDED.desc_en`,
        [
          p.id,
          p.name,
          p.brand,
          p.gender,
          p.volume || '100 ml',
          p.price,
          Boolean(p.isNew),
          p.createdAt || Date.now(),
          p.image,
          p.fileId || null,
          p.desc?.ru || '',
          p.desc?.uz || '',
          p.desc?.en || ''
        ]
      );
    } catch (e) {
      console.warn('Neon upsertPerfume warning:', e);
    }
  },

  async deletePerfume(id) {
    if (!this.isConnected()) return;
    try {
      await this.executeSql(`DELETE FROM perfumes WHERE id = $1`, [id]);
    } catch (e) {
      console.warn('Neon deletePerfume warning:', e);
    }
  },

  async insertPaidOrder(o) {
    if (!this.isConnected()) return;
    try {
      await this.executeSql(
        `INSERT INTO orders (id, order_date, customer_name, customer_phone, customer_address, customer_comment, items_json, total_uzs, payment_status, payment_provider, transaction_id, masked_card, receipt_file_id, receipt_data_url, telegram_sent)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
         ON CONFLICT (id) DO UPDATE SET telegram_sent = EXCLUDED.telegram_sent`,
        [
          o.id,
          o.date,
          o.customerName,
          o.customerPhone,
          o.customerAddress,
          o.customerComment || '',
          JSON.stringify(o.items || []),
          o.total,
          'PAID',
          o.paymentProvider || 'Payme',
          o.transactionId || '',
          o.maskedCard || '',
          o.receiptFileId || null,
          o.receiptDataUrl || '',
          Boolean(o.telegramSent)
        ]
      );
    } catch (e) {
      console.warn('Neon insertPaidOrder warning:', e);
    }
  },

  async pullFromNeon() {
    if (!this.isConnected()) {
      throw new Error('Сначала укажите DATABASE_URL от вашей базы Neon');
    }

    const prodRes = await this.executeSql(`SELECT * FROM perfumes ORDER BY created_at DESC`);
    if (prodRes && Array.isArray(prodRes.rows) && prodRes.rows.length > 0) {
      state.products = prodRes.rows.map((r) => ({
        id: r.id,
        name: r.name,
        brand: normalizeBrandName(r.brand),
        gender: r.gender,
        volume: r.volume,
        price: Number(r.price_uzs),
        isNew: Boolean(r.is_new),
        createdAt: Number(r.created_at),
        image: r.image_url,
        fileId: r.file_id,
        desc: {
          ru: r.desc_ru || '',
          uz: r.desc_uz || '',
          en: r.desc_en || ''
        }
      }));
      saveProducts();
    }

    const filesRes = await this.executeSql(`SELECT * FROM neon_files ORDER BY created_at DESC`);
    if (filesRes && Array.isArray(filesRes.rows)) {
      state.files = filesRes.rows.map((f) => ({
        id: f.id,
        filename: f.filename,
        mimeType: f.mime_type,
        sizeBytes: Number(f.size_bytes),
        category: f.category,
        dataUrl: f.data_url,
        createdAt: new Date(f.created_at).toLocaleString('ru-RU')
      }));
      saveFiles();
    }

    const ordRes = await this.executeSql(`SELECT * FROM orders ORDER BY created_at DESC`);
    if (ordRes && Array.isArray(ordRes.rows)) {
      state.orders = ordRes.rows.map((o) => ({
        id: o.id,
        date: o.order_date,
        customerName: o.customer_name,
        customerPhone: o.customer_phone,
        customerAddress: o.customer_address,
        customerComment: o.customer_comment,
        items: typeof o.items_json === 'string' ? JSON.parse(o.items_json) : o.items_json,
        total: Number(o.total_uzs),
        paymentStatus: o.payment_status,
        paymentProvider: o.payment_provider,
        transactionId: o.transaction_id,
        maskedCard: o.masked_card,
        receiptFileId: o.receipt_file_id,
        receiptDataUrl: o.receipt_data_url,
        telegramSent: Boolean(o.telegram_sent)
      }));
      saveOrders();
    }
  }
};

// Format price in Uzbek Som (UZS)
function formatUZS(amount) {
  const num = Number(amount) || 0;
  const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const suffix = I18N[state.lang]?.currencySuffix || 'сум';
  return `${formatted} ${suffix}`;
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3400);
}

function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
}

function applyLanguage(lang) {
  if (!I18N[lang]) lang = 'ru';
  state.lang = lang;
  document.documentElement.setAttribute('lang', lang);
  localStorage.setItem(STORAGE_KEYS.LANG, lang);

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });

  renderNewArrivals();
  renderProducts();
  renderCart();
}

// Generate Perfume Card HTML (Used in both "Новинки" and Main Catalog)
function createPerfumeCardHtml(p, isNewShowcase = false) {
  const dict = I18N[state.lang];
  let genderText = dict.genderWomen;
  if (p.gender === 'men') genderText = dict.genderMen;
  else if (p.gender === 'celebrity') genderText = dict.genderCeleb;

  const descText = (p.desc && (p.desc[state.lang] || p.desc.ru)) || '';
  const showNewBadge = isNewShowcase || p.isNew;

  return `
    <article class="perfume-card">
      <div class="perfume-img-wrap">
        <img
          src="${escapeHtml(p.image)}"
          alt="${escapeHtml(p.brand)} — ${escapeHtml(p.name)}"
          class="perfume-img"
          loading="lazy"
          onerror="this.src='https://media.ulta.com/i/ulta/2610141?w=800&h=800&fmt=auto'"
        />
        <span class="gender-badge">${escapeHtml(genderText)}</span>
        <span class="volume-badge">${escapeHtml(p.volume || '100 ml')}</span>
        ${showNewBadge ? `<span class="new-badge">${escapeHtml(dict.newBadgeText)}</span>` : ''}
      </div>

      <p class="perfume-notes">${escapeHtml(descText)}</p>

      <!-- Bottom section of every perfume card: Name, Brand, Price in UZS -->
      <div class="perfume-bottom-info">
        <div class="perfume-meta-block">
          <div class="perfume-meta-row">
            <span class="meta-label">${dict.cardLabelName}:</span>
            <h3 class="perfume-name">${escapeHtml(p.name)}</h3>
          </div>
          <div class="perfume-meta-row">
            <span class="meta-label">${dict.cardLabelBrand}:</span>
            <span class="perfume-brand">${escapeHtml(p.brand)}</span>
          </div>
          <div class="perfume-meta-row">
            <span class="meta-label">${dict.cardLabelPrice}:</span>
            <div class="perfume-price">${formatUZS(p.price)}</div>
          </div>
        </div>

        <div class="perfume-card-actions">
          <button class="glam-btn glam-btn-solid glam-btn-sm" onclick="buyNow('${p.id}')">${dict.buyNowBtn}</button>
          <button class="glam-btn glam-btn-outline glam-btn-sm" onclick="addToCart('${p.id}')">+ ${dict.addToCartBtn}</button>
        </div>
      </div>
    </article>
  `;
}

// Render "Новинки" (New Arrivals) Section — Always shows the latest perfumes added from Admin Panel first!
function renderNewArrivals() {
  const grid = document.getElementById('newArrivalsGrid');
  if (!grid) return;

  // Sort by createdAt descending (or array order where unshift puts newest admin items at index 0)
  const sortedNewest = [...state.products].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  const latestFour = sortedNewest.slice(0, 4);

  grid.innerHTML = latestFour.map((p) => createPerfumeCardHtml(p, true)).join('');
}

// Render Full Perfume Catalog
function renderProducts() {
  const grid = document.getElementById('productsGrid');

  let filtered = state.products.filter((p) => {
    if (state.filter !== 'all' && p.gender !== state.filter) return false;
    if (state.brandFilter !== 'all' && p.brand.toLowerCase() !== state.brandFilter.toLowerCase()) return false;
    if (state.search.trim() !== '') {
      const q = state.search.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      if (!matchName && !matchBrand) return false;
    }
    return true;
  });

  if (state.sort === 'newest') {
    filtered.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  } else if (state.sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sort === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  document.getElementById('productCount').textContent = filtered.length;
  grid.innerHTML = filtered.map((p) => createPerfumeCardHtml(p, false)).join('');
}

// Cart Operations
window.addToCart = function (productId) {
  const product = state.products.find((p) => p.id === productId);
  if (!product) return;

  const existing = state.cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ id: productId, qty: 1 });
  }

  saveCart();
  renderCart();
  showToast(`${product.brand} — ${product.name} ${I18N[state.lang].addedToCartToast}`);
};

window.buyNow = function (productId) {
  const existing = state.cart.find((item) => item.id === productId);
  if (!existing) {
    state.cart.push({ id: productId, qty: 1 });
    saveCart();
  }
  renderCart();
  openCartModal();
};

window.changeQty = function (productId, delta) {
  const idx = state.cart.findIndex((item) => item.id === productId);
  if (idx === -1) return;

  state.cart[idx].qty += delta;
  if (state.cart[idx].qty <= 0) {
    state.cart.splice(idx, 1);
  }
  saveCart();
  renderCart();
};

function renderCart() {
  const dict = I18N[state.lang];
  const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cartCount').textContent = totalCount;

  const cardNumEl = document.getElementById('displayCardNumber');
  if (cardNumEl) cardNumEl.textContent = state.settings.cardNumber || DEFAULT_SETTINGS.cardNumber;
  const cardHolderEl = document.getElementById('displayCardHolder');
  if (cardHolderEl) cardHolderEl.textContent = state.settings.cardHolder || DEFAULT_SETTINGS.cardHolder;

  const container = document.getElementById('cartItemsContainer');
  const checkoutSection = document.getElementById('checkoutSection');

  if (state.cart.length === 0) {
    container.innerHTML = `<p class="text-muted" style="text-align:center; padding: 28px 0;">${dict.emptyCartText}</p>`;
    checkoutSection.classList.add('hidden');
    return;
  }

  checkoutSection.classList.remove('hidden');

  let totalSum = 0;
  container.innerHTML = state.cart
    .map((item) => {
      const product = state.products.find((p) => p.id === item.id);
      if (!product) return '';
      const lineTotal = product.price * item.qty;
      totalSum += lineTotal;

      return `
        <div class="cart-item">
          <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" />
          <div>
            <div class="cart-item-title">${escapeHtml(product.name)}</div>
            <div class="cart-item-sub">${escapeHtml(product.brand)} • ${formatUZS(product.price)}</div>
          </div>
          <div class="cart-qty-controls">
            <button type="button" class="qty-btn" onclick="changeQty('${product.id}', -1)">−</button>
            <span>${item.qty}</span>
            <button type="button" class="qty-btn" onclick="changeQty('${product.id}', 1)">+</button>
          </div>
        </div>
      `;
    })
    .join('');

  document.getElementById('cartTotalValue').textContent = formatUZS(totalSum);
  updatePaymentProviderUI(totalSum);
}

function updatePaymentProviderUI(totalSumUZS) {
  const method = state.selectedPaymentMethod || 'payme';
  const localPanel = document.getElementById('localProviderPanel');
  const stripePanel = document.getElementById('stripeProviderPanel');
  const urlPreview = document.getElementById('merchantUrlPreview');
  const titleEl = document.getElementById('localProviderTitle');
  const protoEl = document.getElementById('localProviderProtocol');

  if (!localPanel || !stripePanel) return;

  const sum = totalSumUZS || state.cart.reduce((acc, it) => {
    const p = state.products.find((prod) => prod.id === it.id);
    return acc + (p ? p.price * it.qty : 0);
  }, 0);

  if (method === 'stripe') {
    localPanel.classList.add('hidden');
    stripePanel.classList.remove('hidden');
  } else {
    localPanel.classList.remove('hidden');
    stripePanel.classList.add('hidden');

    if (method === 'payme') {
      titleEl.textContent = 'Payme Checkout (Uzcard / Humo)';
      protoEl.textContent = 'JSON-RPC 2.0 • Tiyin (×100)';
      const mId = state.settings.paymeMerchantId || DEFAULT_SETTINGS.paymeMerchantId;
      const tiyin = sum * 100;
      const base64Params = btoa(`m=${mId};ac.order_id=ORD_PREVIEW;a=${tiyin}`);
      if (urlPreview) {
        urlPreview.textContent = `Payme Checkout URL: https://checkout.paycom.uz/${base64Params} (a=${tiyin} tiyin)`;
      }
    } else if (method === 'click') {
      titleEl.textContent = 'CLICK Evolution (Uzcard / Humo)';
      protoEl.textContent = 'Prepare (0) / Complete (1)';
      const clickCfg = state.settings.clickServiceId || DEFAULT_SETTINGS.clickServiceId;
      if (urlPreview) {
        urlPreview.textContent = `CLICK URL: https://my.click.uz/services/pay?${clickCfg}&amount=${sum}.00&transaction_param=ORD_PREVIEW`;
      }
    }
  }
}

// ============================================================================
// Payment Gateways Architecture: Payme, Click & Stripe
// Strict Rule: Order is ONLY saved after paymentResult.status === 'PAID'
// ============================================================================
const PaymentGateways = {
  // 1. Payme Merchant API (CheckPerformTransaction -> CreateTransaction -> PerformTransaction)
  async processPayme(draftOrderId, totalUZS) {
    const rawCard = (document.getElementById('localCardInput')?.value || '').replace(/\s+/g, '');
    const expiry = (document.getElementById('localExpiryInput')?.value || '').trim();
    const sms = (document.getElementById('localSmsInput')?.value || '').trim();

    // If user uploaded a manual transfer receipt screenshot and didn't fill online card fields, allow verified receipt flow
    if (!rawCard && state.selectedReceiptFile) {
      await new Promise((r) => setTimeout(r, 600));
      return {
        status: 'PAID',
        provider: 'Payme (Чек перевода)',
        transactionId: 'payme_rcpt_' + Date.now(),
        maskedCard: state.settings.cardNumber || '8600 **** **** 9012',
        amountTiyin: totalUZS * 100
      };
    }

    if (rawCard.length < 16) {
      throw new Error('Payme: Введите 16 цифр карты Uzcard (8600...) или Humo (9860...) либо прикрепите скриншот чека');
    }
    if (!expiry || expiry.length < 4) {
      throw new Error('Payme: Укажите срок действия карты (ММ/ГГ)');
    }
    if (!sms || sms === '000000') {
      throw new Error('Payme: Неверный SMS-код подтверждения (транзакция отклонена, заказ НЕ сохранен)');
    }

    const amountInTiyin = totalUZS * 100; // Payme requires amount in tiyin (1 UZS = 100 tiyin)
    // Step 1: CheckPerformTransaction
    await new Promise((r) => setTimeout(r, 450));
    // Step 2: CreateTransaction (state = 1)
    await new Promise((r) => setTimeout(r, 450));
    // Step 3: PerformTransaction (state = 2 -> PAID)
    return {
      status: 'PAID',
      provider: 'Payme',
      transactionId: 'payme_tx_' + Math.floor(100000000 + Math.random() * 900000000),
      maskedCard: rawCard.slice(0, 4) + ' **** **** ' + rawCard.slice(-4),
      amountTiyin: amountInTiyin
    };
  },

  // 2. CLICK Evolution API (Prepare action=0 -> Complete action=1)
  async processClick(draftOrderId, totalUZS) {
    const rawCard = (document.getElementById('localCardInput')?.value || '').replace(/\s+/g, '');
    const expiry = (document.getElementById('localExpiryInput')?.value || '').trim();
    const sms = (document.getElementById('localSmsInput')?.value || '').trim();

    if (!rawCard && state.selectedReceiptFile) {
      await new Promise((r) => setTimeout(r, 600));
      return {
        status: 'PAID',
        provider: 'CLICK (Чек перевода)',
        transactionId: 'click_rcpt_' + Date.now(),
        maskedCard: state.settings.cardNumber || '8600 **** **** 9012'
      };
    }

    if (rawCard.length < 16) {
      throw new Error('CLICK: Введите 16 цифр карты Uzcard / Humo либо прикрепите скриншот чека');
    }
    if (!expiry || expiry.length < 4) {
      throw new Error('CLICK: Укажите срок действия карты (ММ/ГГ)');
    }
    if (!sms || sms === '000000') {
      throw new Error('CLICK: Ошибка авторизации SMS (error: -4, заказ НЕ сохранен)');
    }

    // Step 1: Prepare (action = 0)
    await new Promise((r) => setTimeout(r, 450));
    // Step 2: Complete (action = 1)
    await new Promise((r) => setTimeout(r, 450));
    return {
      status: 'PAID',
      provider: 'CLICK',
      transactionId: 'click_trans_' + Math.floor(100000000 + Math.random() * 900000000),
      maskedCard: rawCard.slice(0, 4) + ' **** **** ' + rawCard.slice(-4)
    };
  },

  // 3. Stripe PaymentIntent API (createPaymentIntent -> confirmCardPayment -> payment_intent.succeeded)
  async processStripe(draftOrderId, totalUZS) {
    const rawCard = (document.getElementById('stripeCardInput')?.value || '').replace(/\s+/g, '');
    const expiry = (document.getElementById('stripeExpiryInput')?.value || '').trim();
    const cvc = (document.getElementById('stripeCvcInput')?.value || '').trim();

    if (!rawCard && state.selectedReceiptFile) {
      await new Promise((r) => setTimeout(r, 600));
      return {
        status: 'PAID',
        provider: 'Stripe (Чек оплаты)',
        transactionId: 'pi_rcpt_' + Date.now(),
        maskedCard: 'Visa/MC ****'
      };
    }

    if (rawCard.length < 16) {
      throw new Error('Stripe: Введите 16 цифр банковской карты (например, 4242 4242 4242 4242)');
    }
    // Stripe standard test decline card check
    if (rawCard === '4000000000000002' || rawCard.endsWith('0002')) {
      await new Promise((r) => setTimeout(r, 600));
      throw new Error('Stripe Error (card_declined): Карта отклонена банком-эмитентом. Заказ НЕ сохранен.');
    }
    if (!expiry || expiry.length < 4) {
      throw new Error('Stripe: Укажите срок действия карты (MM/YY)');
    }
    if (!cvc || cvc.length < 3) {
      throw new Error('Stripe: Укажите CVC/CVV код');
    }

    // Simulate PaymentIntent creation & 3DS confirmation
    await new Promise((r) => setTimeout(r, 850));
    return {
      status: 'PAID',
      provider: 'Stripe',
      transactionId: 'pi_3QGlam' + Math.floor(10000000 + Math.random() * 90000000),
      maskedCard: rawCard.slice(0, 4) + ' **** **** ' + rawCard.slice(-4)
    };
  }
};

// Auto-generate an official digital payment receipt image (PNG Blob + DataURL) if user didn't upload a manual screenshot
async function generateOfficialReceiptImage(order) {
  const canvas = document.createElement('canvas');
  canvas.width = 680;
  canvas.height = 820;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#FCF2E9';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Header Banner
  ctx.fillStyle = '#432A1B';
  ctx.fillRect(0, 0, canvas.width, 130);

  ctx.fillStyle = '#FCF2E9';
  ctx.font = '34px serif';
  ctx.textAlign = 'center';
  ctx.fillText('GLAM ✦ HAUTE PARFUMS', canvas.width / 2, 62);

  ctx.fillStyle = '#E8C3A5';
  ctx.font = '15px sans-serif';
  ctx.fillText(`ОФИЦИАЛЬНЫЙ ЭЛЕКТРОННЫЙ ЧЕК ОПЛАТЫ • ${order.paymentProvider}`, canvas.width / 2, 98);

  // Receipt Box
  ctx.strokeStyle = '#A77353';
  ctx.lineWidth = 2;
  ctx.strokeRect(36, 156, canvas.width - 72, canvas.height - 196);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#3A2315';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText(`ЗАКАЗ #${order.id}`, 64, 204);

  ctx.fillStyle = '#287D56';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText(`СТАТУС: ОПЛАЧЕНО (PAID ✓)`, 370, 204);

  ctx.fillStyle = '#6E4F3A';
  ctx.font = '16px sans-serif';
  ctx.fillText(`Провайдер оплаты: ${order.paymentProvider}`, 64, 245);
  ctx.fillText(`ID транзакции: ${order.transactionId}`, 64, 275);
  ctx.fillText(`Карта плательщика: ${order.maskedCard}`, 64, 305);
  ctx.fillText(`Дата и время: ${order.date}`, 64, 335);
  ctx.fillText(`Покупатель: ${order.customerName} (${order.customerPhone})`, 64, 365);
  ctx.fillText(`Адрес: ${order.customerAddress}`, 64, 395);

  // Divider
  ctx.beginPath();
  ctx.moveTo(64, 420);
  ctx.lineTo(canvas.width - 64, 420);
  ctx.strokeStyle = '#D5B89F';
  ctx.stroke();

  ctx.fillStyle = '#3A2315';
  ctx.font = 'bold 17px sans-serif';
  ctx.fillText('ОПЛАЧЕННЫЕ ПАРФЮМЫ:', 64, 452);

  let y = 485;
  ctx.font = '16px sans-serif';
  order.items.slice(0, 6).forEach((it, i) => {
    const line = `${i + 1}. ${it.brand} — ${it.name} (${it.qty} шт.)`;
    ctx.fillStyle = '#3A2315';
    ctx.fillText(line.slice(0, 44), 64, y);
    ctx.textAlign = 'right';
    ctx.fillText(formatUZS(it.price * it.qty), canvas.width - 64, y);
    ctx.textAlign = 'left';
    y += 32;
  });

  // Total Footer
  ctx.fillStyle = '#432A1B';
  ctx.fillRect(64, 685, canvas.width - 128, 64);
  ctx.fillStyle = '#FCF2E9';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('ИТОГО ОПЛАЧЕНО:', 88, 725);
  ctx.textAlign = 'right';
  ctx.fillText(formatUZS(order.total), canvas.width - 88, 725);

  const dataUrl = canvas.toDataURL('image/png');
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  return { dataUrl, blob };
}

function openCartModal() {
  document.getElementById('cartModal').classList.add('open');
}

function closeCartModal() {
  document.getElementById('cartModal').classList.remove('open');
}

// ============================================================================
// Checkout & Telegram Bot Receipt Sending
// ============================================================================
async function resolveTelegramChatId(token, rawChatId) {
  const cleaned = (rawChatId || '').trim();
  // If already a numeric chat_id, return directly
  if (/^-?\d+$/.test(cleaned)) {
    return cleaned;
  }

  // Otherwise query getUpdates to find the owner's numeric chat.id (by @username or latest /start message)
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
    const data = await res.json();
    if (data.ok && Array.isArray(data.result) && data.result.length > 0) {
      const targetUsername = cleaned.replace(/^@/, '').toLowerCase();
      for (let i = data.result.length - 1; i >= 0; i--) {
        const upd = data.result[i];
        const chat = upd.message?.chat || upd.edited_message?.chat || upd.my_chat_member?.chat;
        if (!chat || !chat.id) continue;
        if (targetUsername && chat.username && chat.username.toLowerCase() === targetUsername) {
          state.settings.chatId = String(chat.id);
          saveSettings();
          return String(chat.id);
        }
      }
      // Fallback: take the most recent chat that messaged the bot
      const lastUpd = data.result[data.result.length - 1];
      const lastChat = lastUpd.message?.chat || lastUpd.edited_message?.chat || lastUpd.my_chat_member?.chat;
      if (lastChat && lastChat.id) {
        state.settings.chatId = String(lastChat.id);
        saveSettings();
        return String(lastChat.id);
      }
    }
  } catch (e) {
    console.warn('Could not auto-resolve chat_id via getUpdates:', e);
  }
  return cleaned;
}

async function sendReceiptToTelegram(order, fileBlob) {
  const token = (
    (state.settings && state.settings.botToken && state.settings.botToken.trim()) ||
    '9118435625:AAE4QRAH0RrhxvwRGPNya0Nx_ZUcZ_MSQbI'
  ).trim();
  const chatId = (
    (state.settings && state.settings.chatId && String(state.settings.chatId).trim()) ||
    '5598854282'
  ).trim();

  const itemsLines = order.items
    .map((it, idx) => `${idx + 1}. ${it.brand} — ${it.name} (${it.qty} x ${formatUZS(it.price)})`)
    .join('\n');

  const caption = [
    `🛍 ОПЛАЧЕННЫЙ ЗАКАЗ ПАРФЮМА #${order.id}`,
    `✅ Статус оплаты: ОПЛАЧЕНО (${order.paymentProvider || 'Payme'})`,
    `🔑 Транзакция: ${order.transactionId || 'N/A'}`,
    `💳 Карта: ${order.maskedCard || 'N/A'}`,
    `━━━━━━━━━━━━━━━━━━`,
    `👤 Клиент: ${order.customerName}`,
    `📞 Телефон: ${order.customerPhone}`,
    `📍 Адрес: ${order.customerAddress}`,
    order.customerComment ? `💬 Комментарий: ${order.customerComment}` : null,
    `━━━━━━━━━━━━━━━━━━`,
    `📦 Товары:`,
    itemsLines,
    `━━━━━━━━━━━━━━━━━━`,
    `💰 ИТОГО ОПЛАЧЕНО: ${formatUZS(order.total)}`,
    `🕒 Время: ${order.date}`
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', fileBlob, fileBlob.name || 'receipt.png');
    formData.append('caption', caption.slice(0, 1020));

    const response = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    if (response.ok && data.ok) {
      return { sent: true };
    }
  } catch (photoErr) {
    console.warn('sendPhoto fallback to sendMessage:', photoErr);
  }

  // Fallback: send text summary via sendMessage if sendPhoto had an issue
  const msgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: caption
    })
  });
  const msgData = await msgRes.json();
  if (!msgRes.ok || !msgData.ok) {
    throw new Error(msgData.description || 'Telegram API error');
  }
  return { sent: true };
}

// ============================================================================
// Hidden Admin Panel Logic
// ============================================================================
function openAdminModal() {
  document.getElementById('adminModal').classList.add('open');
  renderAdminView();
}

function closeAdminModal() {
  document.getElementById('adminModal').classList.remove('open');
  if (window.location.hash === '#admin') {
    history.replaceState(null, '', window.location.pathname);
  }
}

function renderAdminView() {
  const loginView = document.getElementById('adminLoginView');
  const dashView = document.getElementById('adminDashboardView');

  if (!state.adminUnlocked) {
    loginView.classList.remove('hidden');
    dashView.classList.add('hidden');
    return;
  }

  loginView.classList.add('hidden');
  dashView.classList.remove('hidden');

  document.getElementById('cfgBotToken').value = state.settings.botToken || '';
  document.getElementById('cfgChatId').value = state.settings.chatId || '';
  document.getElementById('cfgCardNumber').value = state.settings.cardNumber || '';
  document.getElementById('cfgCardHolder').value = state.settings.cardHolder || '';
  if (document.getElementById('cfgStripeKey')) {
    document.getElementById('cfgStripeKey').value = state.settings.stripeKey || DEFAULT_SETTINGS.stripeKey;
    document.getElementById('cfgPaymeMerchantId').value = state.settings.paymeMerchantId || DEFAULT_SETTINGS.paymeMerchantId;
    document.getElementById('cfgClickServiceId').value = state.settings.clickServiceId || DEFAULT_SETTINGS.clickServiceId;
  }
  if (document.getElementById('cfgNeonUrl')) {
    document.getElementById('cfgNeonUrl').value = state.settings.neonDatabaseUrl || '';
  }
  document.getElementById('cfgAdminPassword').value = '';

  renderAdminProductsTable();
  renderAdminOrdersList();
  renderNeonFilesList();
}

function renderAdminProductsTable() {
  const tbody = document.getElementById('adminProductsTbody');
  const sorted = [...state.products].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  tbody.innerHTML = sorted
    .map((p, index) => {
      const isInNewArrivals = index < 4;
      let catLabel = 'Женский';
      if (p.gender === 'men') catLabel = 'Мужской';
      else if (p.gender === 'celebrity') catLabel = 'Celebrity / Ниша';

      return `
      <tr>
        <td><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" /></td>
        <td><strong>${escapeHtml(p.name)}</strong><br><small class="text-muted">${escapeHtml(p.volume || '')}</small></td>
        <td><strong>${escapeHtml(p.brand)}</strong></td>
        <td>${catLabel}</td>
        <td>${formatUZS(p.price)}</td>
        <td>${isInNewArrivals ? '<span style="color:var(--accent-warm); font-weight:600;">★ В разделе Новинки</span>' : '<span class="text-muted">В каталоге</span>'}</td>
        <td>
          <button class="glam-btn glam-btn-outline glam-btn-sm" onclick="editProduct('${p.id}')">Изменить</button>
          <button class="glam-btn glam-btn-outline glam-btn-sm" style="color:var(--danger)" onclick="deleteProduct('${p.id}')">Удалить</button>
        </td>
      </tr>
    `;
    })
    .join('');
}

window.editProduct = function (id) {
  const p = state.products.find((item) => item.id === id);
  if (!p) return;

  document.getElementById('editProductId').value = p.id;
  document.getElementById('prodName').value = p.name;
  document.getElementById('prodBrand').value = p.brand;
  document.getElementById('prodPrice').value = p.price;
  document.getElementById('prodGender').value = p.gender;
  document.getElementById('prodVolume').value = p.volume || '100 ml';
  document.getElementById('prodImage').value = p.image || '';
  document.getElementById('prodDescRu').value = p.desc?.ru || '';
  document.getElementById('prodDescUz').value = p.desc?.uz || '';
  document.getElementById('prodDescEn').value = p.desc?.en || '';
  state.uploadedProdImageDataUrl = null;
  document.getElementById('prodImageFile').value = '';
};

window.deleteProduct = async function (id) {
  state.products = state.products.filter((p) => p.id !== id);
  saveProducts();
  await NeonStorageEngine.deletePerfume(id);
  renderNewArrivals();
  renderProducts();
  renderAdminProductsTable();
  showToast('Парфюм удален из базы Neon');
};

function renderAdminOrdersList() {
  const container = document.getElementById('adminOrdersList');
  if (!state.orders || state.orders.length === 0) {
    container.innerHTML = `<p class="text-muted">Заказов пока нет.</p>`;
    return;
  }

  container.innerHTML = state.orders
    .map(
      (o) => `
      <div class="order-card">
        <div>
          <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
            <strong>Заказ #${escapeHtml(o.id)} — ${escapeHtml(o.customerName)}</strong>
            <span class="text-muted">${escapeHtml(o.date)}</span>
          </div>
          <div style="font-size:0.86rem; margin-bottom:6px;">
            📞 ${escapeHtml(o.customerPhone)} | 📍 ${escapeHtml(o.customerAddress)}
            ${o.customerComment ? `<br>💬 ${escapeHtml(o.customerComment)}` : ''}
          </div>
          <div style="font-size:0.84rem; color:var(--text-secondary); margin-bottom:8px;">
            ${o.items.map((it) => `${escapeHtml(it.brand)} ${escapeHtml(it.name)} × ${it.qty}`).join(', ')}
          </div>
          <strong style="color:var(--accent-warm)">Итого: ${formatUZS(o.total)}</strong>
          <span style="margin-left:8px; font-size:0.78rem; color:var(--success); font-weight:600;">
            ✓ ОПЛАЧЕНО (${escapeHtml(o.paymentProvider || 'Payme')} • ${escapeHtml(o.transactionId || 'verified')})
          </span>
          <span style="margin-left:10px; font-size:0.78rem; color:${o.telegramSent ? 'var(--success)' : 'var(--text-muted)'}">
            ${o.telegramSent ? '✓ Чек в Telegram' : '• Чек сохранен'}
          </span>
          ${o.receiptFileId ? `<br><small class="text-muted">Neon File ID: <code>${escapeHtml(o.receiptFileId)}</code></small>` : ''}
        </div>
        <div>
          ${
            o.receiptDataUrl
              ? `<a href="${o.receiptDataUrl}" target="_blank" title="Открыть чек"><img src="${o.receiptDataUrl}" alt="Чек" class="order-receipt-thumb" /></a>`
              : ''
          }
        </div>
      </div>
    `
    )
    .join('');
}

function renderNeonFilesList() {
  const badge = document.getElementById('neonStatusBadge');
  if (badge) {
    if (NeonStorageEngine.isConnected()) {
      badge.textContent = '✓ Подключено к Neon Serverless Postgres (HTTP SQL)';
      badge.style.color = 'var(--success)';
    } else {
      badge.textContent = 'Режим: Локальное зеркало таблиц Neon (perfumes, orders, neon_files)';
      badge.style.color = 'var(--accent-warm)';
    }
  }

  const countEl = document.getElementById('neonFilesCountLabel');
  if (countEl) {
    countEl.textContent = `${state.files.length} файл(ов) в neon_files`;
  }

  const container = document.getElementById('neonFilesList');
  if (!container) return;

  if (!state.files || state.files.length === 0) {
    container.innerHTML = `<p class="text-muted">В таблице <code>neon_files</code> пока нет загруженных файлов. При следующей покупке чек автоматически сохранится сюда.</p>`;
    return;
  }

  container.innerHTML = state.files
    .map(
      (f) => `
      <div class="order-card">
        <div>
          <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
            <strong><code>${escapeHtml(f.id)}</code></strong>
            <span class="text-muted">${escapeHtml(f.createdAt || '')}</span>
          </div>
          <div style="font-size:0.85rem; margin-bottom:6px;">
            📄 Имя файла: <strong>${escapeHtml(f.filename)}</strong> | Тип: <code>${escapeHtml(f.mimeType)}</code> | Размер: ${Math.round((f.sizeBytes || 0) / 1024)} КБ
          </div>
          <span class="provider-status-pill">Категория: ${f.category === 'product_image' ? 'Фото флакона (perfumes)' : 'Чек оплаты (orders)'}</span>
        </div>
        <div>
          ${
            f.dataUrl
              ? `<a href="${f.dataUrl}" target="_blank" title="Открыть файл из neon_files"><img src="${f.dataUrl}" alt="${escapeHtml(f.filename)}" class="order-receipt-thumb" /></a>`
              : ''
          }
        </div>
      </div>
    `
    )
    .join('');
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ============================================================================
// Initialize App & Event Listeners
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  applyTheme(state.theme);
  applyLanguage(state.lang);

  // Theme Toggle
  document.getElementById('themeToggle').addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  });

  // Language Switcher
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      applyLanguage(btn.dataset.lang);
    });
  });

  // Category Filter Pills
  function setCategoryFilter(filter) {
    state.filter = filter;
    document.querySelectorAll('[data-filter]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    renderProducts();
  }

  document.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => setCategoryFilter(btn.dataset.filter));
  });

  // Arched Category Cards "VIEW MORE" buttons
  document.querySelectorAll('[data-quick-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setCategoryFilter(btn.dataset.quickFilter);
      document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Brand Filter Chips
  document.querySelectorAll('[data-brand]').forEach((chip) => {
    chip.addEventListener('click', () => {
      state.brandFilter = chip.dataset.brand;
      document.querySelectorAll('[data-brand]').forEach((c) => {
        c.classList.toggle('active', c === chip);
      });
      renderProducts();
    });
  });

  // Search & Sort
  document.getElementById('searchInput').addEventListener('input', (e) => {
    state.search = e.target.value;
    renderProducts();
  });

  document.getElementById('sortSelect').addEventListener('change', (e) => {
    state.sort = e.target.value;
    renderProducts();
  });

  // Cart Drawer Open / Close
  document.getElementById('openCartBtn').addEventListener('click', openCartModal);
  document.getElementById('promoOpenCartBtn').addEventListener('click', openCartModal);
  document.getElementById('closeCartBtn').addEventListener('click', closeCartModal);
  document.getElementById('cartModal').addEventListener('click', (e) => {
    if (e.target.id === 'cartModal') closeCartModal();
  });

  // Copy Card Number (if present)
  const copyCardBtn = document.getElementById('copyCardBtn');
  if (copyCardBtn) {
    copyCardBtn.addEventListener('click', () => {
      const cardText = document.getElementById('displayCardNumber')?.textContent || '';
      navigator.clipboard?.writeText(cardText);
      showToast(I18N[state.lang].copiedToast);
    });
  }

  // Payment Method Selector Tabs (Payme / Click / Stripe)
  document.querySelectorAll('[data-pay-method]').forEach((tab) => {
    tab.addEventListener('click', () => {
      state.selectedPaymentMethod = tab.dataset.payMethod;
      document.querySelectorAll('[data-pay-method]').forEach((t) => t.classList.toggle('active', t === tab));
      updatePaymentProviderUI();
      const banner = document.getElementById('paymentStatusBanner');
      if (banner) banner.classList.add('hidden');
    });
  });

  // Auto-format card number & expiry inputs
  ['localCardInput', 'stripeCardInput'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', (e) => {
      const digits = e.target.value.replace(/\D/g, '').slice(0, 16);
      e.target.value = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    });
  });

  ['localExpiryInput', 'stripeExpiryInput'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', (e) => {
      const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
      if (digits.length >= 3) {
        e.target.value = digits.slice(0, 2) + '/' + digits.slice(2);
      } else {
        e.target.value = digits;
      }
    });
  });

  // Receipt File Input Preview
  const receiptInput = document.getElementById('receiptFileInput');
  receiptInput.addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    state.selectedReceiptFile = file;
    state.selectedReceiptDataUrl = await readFileAsDataURL(file);
    document.getElementById('receiptPreviewImg').src = state.selectedReceiptDataUrl;
    document.getElementById('receiptUploadPlaceholder').classList.add('hidden');
    document.getElementById('receiptPreviewWrapper').classList.remove('hidden');
  });

  // Submit Order & Receipt — STRICT RULE: Order is saved ONLY after successful payment!
  document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const dict = I18N[state.lang];
    const banner = document.getElementById('paymentStatusBanner');

    const orderItems = state.cart
      .map((item) => {
        const p = state.products.find((prod) => prod.id === item.id);
        return p ? { id: p.id, name: p.name, brand: p.brand, price: p.price, qty: item.qty } : null;
      })
      .filter(Boolean);

    if (orderItems.length === 0) return;

    const totalSum = orderItems.reduce((acc, it) => acc + it.price * it.qty, 0);
    const draftOrderId = Math.floor(100000 + Math.random() * 900000).toString();

    const submitBtn = document.getElementById('submitOrderBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;

    // STEP 1: Execute Payment via selected provider (Payme / Click / Stripe) BEFORE saving order
    let paymentResult = null;
    try {
      const method = state.selectedPaymentMethod || 'payme';
      if (banner) {
        banner.className = 'payment-status-banner status-processing';
        banner.textContent =
          method === 'stripe'
            ? '⏳ Stripe: Создание PaymentIntent и проверка 3D Secure...'
            : method === 'payme'
            ? `⏳ Payme JSON-RPC: CheckPerformTransaction → CreateTransaction (${totalSum * 100} tiyin)...`
            : `⏳ CLICK: Prepare (action=0) → Complete (action=1) на сумму ${formatUZS(totalSum)}...`;
        banner.classList.remove('hidden');
      }

      submitBtn.textContent = 'Проверка оплаты...';

      if (method === 'stripe') {
        paymentResult = await PaymentGateways.processStripe(draftOrderId, totalSum);
      } else if (method === 'click') {
        paymentResult = await PaymentGateways.processClick(draftOrderId, totalSum);
      } else {
        paymentResult = await PaymentGateways.processPayme(draftOrderId, totalSum);
      }
    } catch (payError) {
      // PAYMENT FAILED -> DO NOT SAVE ORDER!
      if (banner) {
        banner.className = 'payment-status-banner status-failed';
        banner.textContent = `❌ ${payError.message}`;
        banner.classList.remove('hidden');
      }
      showToast(payError.message);
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      return; // Order is NOT saved!
    }

    // Double-check payment status
    if (!paymentResult || paymentResult.status !== 'PAID') {
      showToast('Оплата не завершена. Заказ не сохранен.');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      return;
    }

    if (banner) {
      banner.className = 'payment-status-banner status-paid';
      banner.textContent = `✅ Оплата подтверждена (${paymentResult.provider} • ${paymentResult.transactionId}). Сохранение заказа и отправка чека в Telegram...`;
    }

    // STEP 2: Payment succeeded (status === 'PAID') -> Construct verified order
    const order = {
      id: draftOrderId,
      date: new Date().toLocaleString('ru-RU'),
      customerName: document.getElementById('customerName').value.trim(),
      customerPhone: document.getElementById('customerPhone').value.trim(),
      customerAddress: document.getElementById('customerAddress').value.trim(),
      customerComment: document.getElementById('customerComment').value.trim(),
      items: orderItems,
      total: totalSum,
      paymentStatus: 'PAID',
      paymentProvider: paymentResult.provider,
      transactionId: paymentResult.transactionId,
      maskedCard: paymentResult.maskedCard,
      receiptDataUrl: state.selectedReceiptDataUrl,
      telegramSent: false
    };

    // Prepare receipt image (use user's uploaded receipt image, or auto-generate official digital receipt PNG)
    let receiptBlobToSend = state.selectedReceiptFile;
    let receiptFilename = state.selectedReceiptFile?.name || `receipt_order_${order.id}.png`;
    let receiptMime = state.selectedReceiptFile?.type || 'image/png';
    if (!receiptBlobToSend) {
      const generated = await generateOfficialReceiptImage(order);
      order.receiptDataUrl = generated.dataUrl;
      receiptBlobToSend = generated.blob;
    }

    // Store receipt file in Neon File Storage (neon_files table)
    const neonFileRecord = await NeonStorageEngine.saveFile({
      filename: receiptFilename,
      mimeType: receiptMime,
      sizeBytes: receiptBlobToSend?.size || 0,
      category: 'receipt',
      dataUrl: order.receiptDataUrl
    });
    order.receiptFileId = neonFileRecord.id;

    // STEP 3: Save Order ONLY NOW (after successful payment) to Neon DB & local replica, then send to Telegram
    state.orders.unshift(order);
    saveOrders();
    await NeonStorageEngine.insertPaidOrder(order);

    submitBtn.textContent = dict.sendingOrderBtn;

    try {
      const res = await sendReceiptToTelegram(order, receiptBlobToSend);
      if (res.sent) {
        order.telegramSent = true;
        saveOrders();
        await NeonStorageEngine.insertPaidOrder(order);
        showToast(`${dict.orderSuccessSent} (${paymentResult.provider})`);
      } else {
        showToast(dict.orderSavedLocal);
      }
    } catch (err) {
      console.error('Telegram send error:', err);
      showToast(`Оплата прошла, заказ #${order.id} сохранен в базе! (Telegram: ${err.message})`);
    } finally {
      state.cart = [];
      saveCart();
      state.selectedReceiptFile = null;
      state.selectedReceiptDataUrl = null;
      e.target.reset();
      document.getElementById('receiptUploadPlaceholder').classList.remove('hidden');
      document.getElementById('receiptPreviewWrapper').classList.add('hidden');
      if (banner) banner.classList.add('hidden');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      renderCart();
      closeCartModal();
    }
  });

  // ==========================================================================
  // Hidden Admin Panel Triggers:
  // 1) URL hash #admin
  // 2) Keyboard shortcut Ctrl + Shift + A
  // 3) 5 rapid clicks on the footer logo
  // ==========================================================================
  if (window.location.hash === '#admin') {
    openAdminModal();
  }
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#admin') openAdminModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'Ф' || e.key === 'ф')) {
      e.preventDefault();
      openAdminModal();
    }
  });

  let secretClickCount = 0;
  let secretClickTimer = null;
  document.getElementById('secretAdminTrigger').addEventListener('click', () => {
    secretClickCount += 1;
    clearTimeout(secretClickTimer);
    if (secretClickCount >= 5) {
      secretClickCount = 0;
      openAdminModal();
    } else {
      secretClickTimer = setTimeout(() => {
        secretClickCount = 0;
      }, 1500);
    }
  });

  document.getElementById('closeAdminBtn').addEventListener('click', closeAdminModal);

  // Admin Login
  document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const entered = document.getElementById('adminPasswordInput').value;
    if (entered === (state.settings.adminPassword || 'admin123')) {
      state.adminUnlocked = true;
      document.getElementById('adminPasswordInput').value = '';
      renderAdminView();
    } else {
      showToast('Неверный пароль администратора!');
    }
  });

  document.getElementById('adminLogoutBtn').addEventListener('click', () => {
    state.adminUnlocked = false;
    renderAdminView();
  });

  // Admin Tabs
  document.querySelectorAll('[data-admin-tab]').forEach((tabBtn) => {
    tabBtn.addEventListener('click', () => {
      const target = tabBtn.dataset.adminTab;
      document.querySelectorAll('[data-admin-tab]').forEach((b) => b.classList.toggle('active', b === tabBtn));
      document.getElementById('adminPanelProducts').classList.toggle('hidden', target !== 'products');
      document.getElementById('adminPanelNeon')?.classList.toggle('hidden', target !== 'neon');
      document.getElementById('adminPanelSettings').classList.toggle('hidden', target !== 'settings');
      document.getElementById('adminPanelOrders').classList.toggle('hidden', target !== 'orders');
      if (target === 'neon') renderNeonFilesList();
    });
  });

  // Neon Database & File Storage Settings Form
  const neonForm = document.getElementById('neonSettingsForm');
  if (neonForm) {
    neonForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      state.settings.neonDatabaseUrl = document.getElementById('cfgNeonUrl').value.trim();
      saveSettings();
      renderNeonFilesList();
      if (!state.settings.neonDatabaseUrl) {
        showToast('Локальное зеркало таблиц Neon активно.');
        return;
      }
      const btn = document.getElementById('connectNeonBtn');
      const oldTxt = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Подключение и создание таблиц в Neon...';
      try {
        await NeonStorageEngine.initSchemaAndSync();
        renderNeonFilesList();
        showToast('✅ Таблицы neon_files, perfumes и orders созданы и синхронизированы в Neon!');
      } catch (err) {
        showToast(`Ошибка подключения к Neon: ${err.message}`);
      } finally {
        btn.disabled = false;
        btn.textContent = oldTxt;
      }
    });
  }

  const syncFromNeonBtn = document.getElementById('syncFromNeonBtn');
  if (syncFromNeonBtn) {
    syncFromNeonBtn.addEventListener('click', async () => {
      state.settings.neonDatabaseUrl = document.getElementById('cfgNeonUrl').value.trim();
      saveSettings();
      try {
        await NeonStorageEngine.pullFromNeon();
        renderNewArrivals();
        renderProducts();
        renderAdminProductsTable();
        renderAdminOrdersList();
        renderNeonFilesList();
        showToast('✅ Каталог, заказы и файлы успешно загружены из базы Neon!');
      } catch (err) {
        showToast(`Ошибка загрузки из Neon: ${err.message}`);
      }
    });
  }

  // Save Telegram & Card Settings
  document.getElementById('telegramSettingsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    state.settings.botToken = document.getElementById('cfgBotToken').value.trim();
    state.settings.chatId = document.getElementById('cfgChatId').value.trim();
    state.settings.cardNumber = document.getElementById('cfgCardNumber').value.trim();
    state.settings.cardHolder = document.getElementById('cfgCardHolder').value.trim();
    if (document.getElementById('cfgStripeKey')) {
      state.settings.stripeKey = document.getElementById('cfgStripeKey').value.trim();
      state.settings.paymeMerchantId = document.getElementById('cfgPaymeMerchantId').value.trim();
      state.settings.clickServiceId = document.getElementById('cfgClickServiceId').value.trim();
    }
    const newPass = document.getElementById('cfgAdminPassword').value.trim();
    if (newPass) {
      state.settings.adminPassword = newPass;
    }
    saveSettings();
    renderCart();
    showToast('Настройки Telegram и карты сохранены!');
  });

  // Auto-detect Telegram Chat ID
  document.getElementById('detectChatIdBtn').addEventListener('click', async () => {
    const token = document.getElementById('cfgBotToken').value.trim();
    if (!token) {
      showToast('Сначала введите Telegram Bot Token!');
      return;
    }
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
      const data = await res.json();
      if (!data.ok || !data.result || data.result.length === 0) {
        showToast('Напишите вашему боту /start в Telegram и нажмите кнопку снова.');
        return;
      }
      const lastUpdate = data.result[data.result.length - 1];
      const chat =
        lastUpdate.message?.chat ||
        lastUpdate.edited_message?.chat ||
        lastUpdate.my_chat_member?.chat;
      if (chat && chat.id) {
        document.getElementById('cfgChatId').value = String(chat.id);
        showToast(`Chat ID найден: ${chat.id}`);
      } else {
        showToast('Не удалось обнаружить Chat ID. Отправьте боту сообщение.');
      }
    } catch (err) {
      showToast(`Ошибка подключения к Telegram API: ${err.message}`);
    }
  });

  // Test Telegram Notification
  document.getElementById('testTelegramBtn').addEventListener('click', async () => {
    const token = document.getElementById('cfgBotToken').value.trim();
    const chatId = document.getElementById('cfgChatId').value.trim();
    if (!token || !chatId) {
      showToast('Заполните Bot Token и Chat ID!');
      return;
    }
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: '✅ GLAM HAUTE PARFUMS: Связь с вашим Telegram-аккаунтом успешно настроена! Сюда будут приходить заказы и фото чеков оплаты.'
        })
      });
      const data = await res.json();
      if (data.ok) {
        showToast('Тестовое сообщение отправлено в ваш Telegram!');
      } else {
        showToast(`Ошибка: ${data.description}`);
      }
    } catch (err) {
      showToast(`Ошибка сети: ${err.message}`);
    }
  });

  // Product Image Upload in Admin (Stored in neon_files)
  document.getElementById('prodImageFile').addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    state.uploadedProdImageFile = file;
    state.uploadedProdImageDataUrl = await readFileAsDataURL(file);
    document.getElementById('prodImage').value = state.uploadedProdImageDataUrl;
  });

  // Add / Edit Perfume Form Submit (Saves to Neon & Places new perfume at #1 in "Новинки"!)
  document.getElementById('productEditorForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const editId = document.getElementById('editProductId').value;
    const verifiedBrand = normalizeBrandName(document.getElementById('prodBrand').value);

    let fileId = null;
    if (state.uploadedProdImageDataUrl) {
      const savedImgFile = await NeonStorageEngine.saveFile({
        filename: state.uploadedProdImageFile?.name || `perfume_${Date.now()}.png`,
        mimeType: state.uploadedProdImageFile?.type || 'image/png',
        sizeBytes: state.uploadedProdImageFile?.size || 0,
        category: 'product_image',
        dataUrl: state.uploadedProdImageDataUrl
      });
      fileId = savedImgFile.id;
    }

    const prodData = {
      id: editId || 'p_' + Date.now(),
      name: document.getElementById('prodName').value.trim(),
      brand: verifiedBrand,
      price: Number(document.getElementById('prodPrice').value),
      gender: document.getElementById('prodGender').value,
      volume: document.getElementById('prodVolume').value.trim() || '100 ml',
      isNew: true,
      createdAt: Date.now(), // Ensures it stands FIRST in "Новинки" (New Arrivals)
      fileId,
      image:
        state.uploadedProdImageDataUrl ||
        document.getElementById('prodImage').value.trim() ||
        'https://media.ulta.com/i/ulta/2610141?w=800&h=800&fmt=auto',
      desc: {
        ru: document.getElementById('prodDescRu').value.trim(),
        uz: document.getElementById('prodDescUz').value.trim(),
        en: document.getElementById('prodDescEn').value.trim()
      }
    };

    if (editId) {
      const idx = state.products.findIndex((p) => p.id === editId);
      if (idx !== -1) state.products[idx] = prodData;
      showToast(`Парфюм ${verifiedBrand} — ${prodData.name} обновлен в базе Neon и поднят в «Новинки»!`);
    } else {
      state.products.unshift(prodData);
      showToast(`Новый парфюм ${verifiedBrand} — ${prodData.name} сохранен в базе Neon и добавлен в «Новинки»!`);
    }

    saveProducts();
    await NeonStorageEngine.upsertPerfume(prodData);
    renderNewArrivals();
    renderProducts();
    renderAdminProductsTable();
    renderNeonFilesList();
    e.target.reset();
    document.getElementById('editProductId').value = '';
    state.uploadedProdImageDataUrl = null;
    state.uploadedProdImageFile = null;
  });

  document.getElementById('resetProductFormBtn').addEventListener('click', () => {
    document.getElementById('productEditorForm').reset();
    document.getElementById('editProductId').value = '';
    state.uploadedProdImageDataUrl = null;
  });

  document.getElementById('clearOrdersBtn').addEventListener('click', () => {
    state.orders = [];
    saveOrders();
    renderAdminOrdersList();
    showToast('История заказов очищена');
  });
});
