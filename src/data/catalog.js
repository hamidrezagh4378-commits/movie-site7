/* Central product catalog — sample demonstration data.
 * Replace or connect to a real database later; keep this shape.
 * Each localized field has a `_fa` variant; accessors in `localize()` below
 * resolve it against the active language (see src/i18n/lang.js).
 */
import { getLang } from '../i18n/lang.js';

const u = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`;

export const CATEGORIES = [
  { id: 'skincare', name: 'Skincare', tagline: 'Serums, creams & cleansers', image: u('1785581778868-79100f7fe56c', 800), name_fa: 'مراقبت پوست', tagline_fa: 'سرم، کرم و شوینده' },
  { id: 'makeup', name: 'Makeup', tagline: 'Everyday colour essentials', image: u('1583209814683-c023dd293cc6', 800), name_fa: 'آرایش', tagline_fa: 'ضروریات رنگی روزمره' },
  { id: 'haircare', name: 'Haircare', tagline: 'Care for every hair type', image: u('1747098393451-6b985f62a2c2', 800), name_fa: 'مراقبت مو', tagline_fa: 'مراقبت برای هر نوع مو' },
  { id: 'bodycare', name: 'Body Care', tagline: 'Nourishing body rituals', image: u('1631729371254-42c2892f0e6e', 800), name_fa: 'مراقبت بدن', tagline_fa: 'آیین‌های مغذی بدن' },
  { id: 'personalcare', name: 'Personal Care', tagline: 'Daily hygiene essentials', image: u('1655892810227-c0cffe1d9717', 800), name_fa: 'مراقبت شخصی', tagline_fa: 'ضروریات بهداشتی روزانه' },
];

export const PRODUCTS = [
  {
    id: 'p1', slug: 'hydrating-glow-serum', name: 'Hydrating Glow Serum', brand: 'Lumière Skin',
    category: 'skincare', price: 32, originalPrice: null, sku: 'LS-SER-030',
    images: [u('1787569499510-ef18cc7ba7a5'), u('1764694187667-f28a05a52c0e')],
    stock: 24, rating: 4.8, reviewCount: 214, featured: true, bestseller: true, isNew: false,
    name_fa: 'سرم آبرسان درخشش',
    description: 'A lightweight, fast-absorbing serum formulated with hyaluronic acid and niacinamide. It layers comfortably under moisturiser and leaves skin feeling soft, supple and comfortably hydrated throughout the day.',
    description_fa: 'سرمی سبک و سریع‌جذب با هیالورونیک اسید و نیاسینامید. به‌راحتی زیر مرطوب‌کننده قرار می‌گیرد و پوست را در طول روز نرم، لطیف و آبرسانی‌شده نگه می‌دارد.',
    size: '30 ml',
    variants: [{ id: 'p1-30', name: '30 ml', priceDelta: 0 }, { id: 'p1-50', name: '50 ml', priceDelta: 12 }],
    attributes: { skinType: ['Dry', 'Normal', 'Combination'], concern: ['Hydration', 'Dullness'], format: ['Serum'] },
    ingredients: 'Aqua, Glycerin, Sodium Hyaluronate, Niacinamide, Panthenol, Tocopherol, Xanthan Gum, Citric Acid, Phenoxyethanol, Ethylhexylglycerin.',
    usage: 'Apply 2–3 drops to cleansed skin morning and evening, before moisturiser. Patch test before first use.',
    usage_fa: 'روز و شب، پیش از مرطوب‌کننده، ۲ تا ۳ قطره روی پوست تمیز بمالید. پیش از استفاده اول، تست حساسیت انجام دهید.',
    specs: [
      { label: 'Volume', value: '30 ml', label_fa: 'حجم' },
      { label: 'Texture', value: 'Lightweight gel-serum', label_fa: 'بافت', value_fa: 'ژل-سرم سبک' },
      { label: 'Scent', value: 'Fragrance-free', label_fa: 'رایحه', value_fa: 'بدون عطر' },
      { label: 'Suited for', value: 'All skin types', label_fa: 'مناسب برای', value_fa: 'همه انواع پوست' },
    ],
  },
  {
    id: 'p2', slug: 'daily-moisture-cream', name: 'Daily Moisture Cream', brand: 'Lumière Skin',
    category: 'skincare', price: 28, originalPrice: null, sku: 'LS-CRM-050',
    images: [u('1570172619644-dfd03ed5d881'), u('1585945037805-5fd82c2e60b1')],
    stock: 31, rating: 4.7, reviewCount: 168, featured: true, bestseller: true, isNew: false,
    name_fa: 'کرم مرطوب‌کننده روزانه',
    description: 'A comfortable daily moisturiser with ceramides and squalane that supports the skin barrier and leaves a smooth, never-greasy finish. Suitable under makeup.',
    description_fa: 'مرطوب‌کننده‌ای روزانه و آرامش‌بخش با سرامید و اسکوالان که از سد دفاعی پوست حمایت می‌کند و پایانی صیقلی و بدون چربی برجا می‌گذارد. مناسب برای استفاده زیر آرایش.',
    size: '50 ml',
    variants: [{ id: 'p2-50', name: '50 ml', priceDelta: 0 }],
    attributes: { skinType: ['Dry', 'Normal', 'Sensitive'], concern: ['Dryness', 'Barrier care'], format: ['Cream'] },
    ingredients: 'Aqua, Squalane, Glycerin, Cetearyl Alcohol, Ceramide NP, Butyrospermum Parkii Butter, Panthenol, Allantoin, Tocopherol, Phenoxyethanol.',
    usage: 'Massage a small amount onto face and neck after serum, morning and evening.',
    usage_fa: 'صبح و شب، پس از سرم، مقدار کمی را روی صورت و گردن ماساژ دهید.',
    specs: [
      { label: 'Volume', value: '50 ml', label_fa: 'حجم' },
      { label: 'Texture', value: 'Rich cream', label_fa: 'بافت', value_fa: 'کرم غنی' },
      { label: 'Scent', value: 'Fragrance-free', label_fa: 'رایحه', value_fa: 'بدون عطر' },
    ],
  },
  {
    id: 'p3', slug: 'gentle-foaming-cleanser', name: 'Gentle Foaming Cleanser', brand: 'Lumière Skin',
    category: 'skincare', price: 22, originalPrice: null, sku: 'LS-CLN-150',
    images: [u('1620916566398-39f1143ab7be'), u('1608068811588-3a67006b7489')],
    stock: 40, rating: 4.6, reviewCount: 139, featured: false, bestseller: true, isNew: false,
    name_fa: 'شوینده کف ملایم',
    description: 'A soft, low-foam cleanser that lifts away makeup, SPF and daily grime without stripping. Skin feels clean, calm and never tight after rinsing.',
    description_fa: 'شوینده‌ای ملایم با کف کم که آرایش، ضدآفتاب و آلودگی روزانه را بدون خشک‌کردن پوست پاک می‌کند. پس از آب‌کشی، پوست تمیز و آرام است و هرگز کشیده نمی‌شود.',
    size: '150 ml',
    variants: [{ id: 'p3-150', name: '150 ml', priceDelta: 0 }],
    attributes: { skinType: ['All', 'Sensitive'], concern: ['Cleansing'], format: ['Cleanser'] },
    ingredients: 'Aqua, Glycerin, Cocamidopropyl Betaine, Sodium Cocoyl Isethionate, Panthenol, Chamomilla Recutita Extract, Citric Acid, Phenoxyethanol.',
    usage: 'Massage over damp skin, then rinse thoroughly. Use morning and evening.',
    usage_fa: 'روی پوست نم‌دار ماساژ دهید و سپس کاملاً آب‌کشی کنید. صبح و شب استفاده کنید.',
    specs: [
      { label: 'Volume', value: '150 ml', label_fa: 'حجم' },
      { label: 'Texture', value: 'Soft foam', label_fa: 'بافت', value_fa: 'کف نرم' },
      { label: 'pH', value: 'Approx. 5.5', label_fa: 'pH' },
    ],
  },
  {
    id: 'p4', slug: 'vitamin-c-brightening-serum', name: 'Vitamin C Brightening Serum', brand: 'Lumière Skin',
    category: 'skincare', price: 36, originalPrice: null, sku: 'LS-VCB-030',
    images: [u('1612817288484-6f916006741a'), u('1748543668687-624e058c367c')],
    stock: 18, rating: 4.7, reviewCount: 176, featured: true, bestseller: false, isNew: true,
    name_fa: 'سرم روشن‌کننده ویتامین C',
    description: 'A stabilised vitamin C serum with ferulic acid, designed to help skin look brighter and more even over time. Wear sunscreen during the day while using vitamin C.',
    description_fa: 'سرم ویتامین C پایدار با اسید فرولیک که با گذشت زمان به درخشان‌تر و یکدست‌تر شدن رنگ پوست کمک می‌کند. در طول مصرف ویتامین C، روزها از ضدآفتاب استفاده کنید.',
    size: '30 ml',
    variants: [{ id: 'p4-30', name: '30 ml', priceDelta: 0 }],
    attributes: { skinType: ['Normal', 'Combination', 'Oily'], concern: ['Dullness', 'Uneven tone'], format: ['Serum'] },
    ingredients: 'Aqua, Ascorbic Acid, Ferulic Acid, Glycerin, Propanediol, Sodium Hyaluronate, Tocopherol, Phenoxyethanol.',
    usage: 'Apply 2–3 drops in the morning before sunscreen. Introduce gradually if you are new to vitamin C.',
    usage_fa: 'صبح‌ها ۲ تا ۳ قطره پیش از ضدآفتاب بمالید. اگر تازه با ویتامین C شروع کرده‌اید، استفاده را تدریجی آغاز کنید.',
    specs: [
      { label: 'Volume', value: '30 ml', label_fa: 'حجم' },
      { label: 'Texture', value: 'Lightweight fluid', label_fa: 'بافت', value_fa: 'مایع سبک' },
      { label: 'Storage', value: 'Keep away from direct light', label_fa: 'نگهداری', value_fa: 'دور از نور مستقیم' },
    ],
  },
  {
    id: 'p5', slug: 'velvet-matte-lipstick', name: 'Velvet Matte Lipstick', brand: 'Lumière Color',
    category: 'makeup', price: 24, originalPrice: null, sku: 'LC-LIP-VEL',
    images: [u('1631214499500-2e34edcaccfe'), u('1512496015851-a90fb38ba796')],
    stock: 27, rating: 4.5, reviewCount: 121, featured: true, bestseller: true, isNew: false,
    name_fa: 'رژ لب مخملی مات',
    description: 'A weightless velvet-matte lipstick with a comfortable, non-drying feel. Pigment-rich in a single swipe with a softly blurred finish.',
    description_fa: 'رژ لب مخملی مات و فوق‌سبک با حس خوشایند و بدون خشکی. رنگی غنی با یک حرکت و پایانی لطیف و مات محو.',
    size: '3.8 g',
    variants: [
      { id: 'p5-rosewood', name: 'Rosewood', swatch: '#a5565c', priceDelta: 0, name_fa: 'رزوود' },
      { id: 'p5-terracotta', name: 'Terracotta', swatch: '#b96a4e', priceDelta: 0, name_fa: 'تراکوتا' },
      { id: 'p5-mauve', name: 'Muted Mauve', swatch: '#9c6a72', priceDelta: 0, name_fa: 'موو ملایم' },
    ],
    attributes: { makeupCategory: ['Lips'], finish: ['Matte'] },
    ingredients: 'Ricinus Communis Seed Oil, Candelilla Wax, Squalane, Tocopherol, Iron Oxides (CI 77491, CI 77492), Mica.',
    usage: 'Apply directly from the bullet, blot and reapply for a deeper stain.',
    usage_fa: 'مستقیم از رژ بمالید، با دستمال بگیرید و برای رنگ عمیق‌تر دوباره بمالید.',
    specs: [
      { label: 'Net weight', value: '3.8 g', label_fa: 'وزن خالص' },
      { label: 'Finish', value: 'Velvet matte', label_fa: 'پایان‌بندی', value_fa: 'مات مخملی' },
      { label: 'Cruelty-free formula', value: 'Formulated without animal testing', label_fa: 'فرمول بدون آزمایش حیوانی', value_fa: 'بدون آزمایش روی حیوانات' },
    ],
  },
  {
    id: 'p6', slug: 'radiant-foundation', name: 'Radiant Foundation', brand: 'Lumière Color',
    category: 'makeup', price: 34, originalPrice: null, sku: 'LC-FND-RAD',
    images: [u('1598528738936-c50861cc75a9'), u('1583209814683-c023dd293cc6')],
    stock: 22, rating: 4.4, reviewCount: 98, featured: false, bestseller: true, isNew: false,
    name_fa: 'کرم‌پودر درخشنده',
    description: 'A buildable, medium-coverage foundation with a natural satin finish. Blends easily and wears comfortably through the day.',
    description_fa: 'کرم‌پودری با پوشش متوسط و قابل افزایش با پایانی ساتن طبیعی. به‌راحتی مخلوط می‌شود و در طول روز آرام می‌نشیند.',
    size: '30 ml',
    variants: [
      { id: 'p6-l1', name: 'Light 1', swatch: '#ecc8b3', priceDelta: 0, name_fa: 'روشن ۱' },
      { id: 'p6-l2', name: 'Light 2', swatch: '#e0b39c', priceDelta: 0, name_fa: 'روشن ۲' },
      { id: 'p6-m1', name: 'Medium 1', swatch: '#cf9c82', priceDelta: 0, name_fa: 'متوسط ۱' },
      { id: 'p6-m2', name: 'Medium 2', swatch: '#bd8266', priceDelta: 0, name_fa: 'متوسط ۲' },
    ],
    attributes: { makeupCategory: ['Face'], finish: ['Satin'], coverage: ['Medium, buildable'] },
    ingredients: 'Aqua, Dimethicone, Glycerin, Titanium Dioxide, Iron Oxides, Squalane, Tocopherol, Phenoxyethanol.',
    usage: 'Apply with a damp sponge or brush, building coverage in thin layers.',
    usage_fa: 'با اسفنج نمدار یا براش بمالید و پوشش را در لایه‌های نازک افزایش دهید.',
    specs: [
      { label: 'Volume', value: '30 ml', label_fa: 'حجم' },
      { label: 'Finish', value: 'Natural satin', label_fa: 'پایان‌بندی', value_fa: 'ساتن طبیعی' },
      { label: 'Shades', value: '4 core shades', label_fa: 'طیف رنگ', value_fa: '۴ رنگ اصلی' },
    ],
  },
  {
    id: 'p7', slug: 'soft-glow-blush', name: 'Soft Glow Blush', brand: 'Lumière Color',
    category: 'makeup', price: 26, originalPrice: null, sku: 'LC-BLS-SFG',
    images: [u('1522335789203-aabd1fc54bc9'), u('1596462502278-27bfdc403348')],
    stock: 33, rating: 4.6, reviewCount: 87, featured: false, bestseller: false, isNew: true,
    name_fa: 'رژگونه درخشش ملایم',
    description: 'A finely-milled powder blush that melts into skin with a soft, diffused glow. Buildable colour from a whisper to a noticeable flush.',
    description_fa: 'پودر رژگونه با آسیاب ریز که با درخششی لطیف و پخش‌شده با پوست یکی می‌شود. رنگی قابل افزایش، از حداقلی تا گل‌انداختی مشهود.',
    size: '5 g',
    variants: [
      { id: 'p7-peony', name: 'Peony', swatch: '#d98b96', priceDelta: 0, name_fa: 'پئونی' },
      { id: 'p7-apricot', name: 'Apricot', swatch: '#dd9d7a', priceDelta: 0, name_fa: 'زردآلویی' },
    ],
    attributes: { makeupCategory: ['Cheeks'], finish: ['Soft glow'] },
    ingredients: 'Talc, Mica, Dimethicone, Squalane, Iron Oxides, Carmine (CI 75470).',
    usage: 'Sweep onto the apples of the cheeks with a fluffy brush, blending upward.',
    usage_fa: 'با براش پفکی روی گونه‌ها بمالید و به سمت بالا محو کنید.',
    specs: [
      { label: 'Net weight', value: '5 g', label_fa: 'وزن خالص' },
      { label: 'Finish', value: 'Soft glow', label_fa: 'پایان‌بندی', value_fa: 'درخشش ملایم' },
    ],
  },
  {
    id: 'p8', slug: 'lengthening-mascara', name: 'Lengthening Mascara', brand: 'Lumière Color',
    category: 'makeup', price: 21, originalPrice: 27, sku: 'LC-MSC-LEN',
    images: [u('1526947425960-945c6e72858f'), u('1701992678972-d5a053ad0fb0')],
    stock: 9, rating: 4.3, reviewCount: 76, featured: false, bestseller: false, isNew: false,
    name_fa: 'ریمل طول‌دهنده',
    description: 'A flexible tubing-style formula that lifts and separates lashes without flaking or smudging. Removes easily with warm water.',
    description_fa: 'فرمول انعطاف‌پذیر از نوع تیوبینگ که مژه‌ها را بلندتر و جداکننده می‌کند، بدون بریزینگ یا لکه‌شدن. با آب گرم به‌راحتی پاک می‌شود.',
    size: '9 ml',
    variants: [{ id: 'p8-black', name: 'Black', swatch: '#1d1a1a', priceDelta: 0, name_fa: 'مشکی' }, { id: 'p8-brown', name: 'Brown', swatch: '#4a382c', priceDelta: 0, name_fa: 'قهوه‌ای' }],
    attributes: { makeupCategory: ['Eyes'], finish: ['Natural length'] },
    ingredients: 'Aqua, Acrylates Copolymer, Beeswax, Panthenol, Biotin, Iron Oxides (CI 77499).',
    usage: 'Wiggle the brush from the base of the lashes to the tips. Remove with warm water and gentle pressure.',
    usage_fa: 'براش را از ریشه تا نوک مژه‌ها حرکت دهید. با آب گرم و فشار ملایم پاک کنید.',
    specs: [
      { label: 'Volume', value: '9 ml', label_fa: 'حجم' },
      { label: 'Effect', value: 'Length & separation', label_fa: 'اثر', value_fa: 'طول و جداسازی' },
    ],
  },
  {
    id: 'p9', slug: 'nourishing-hair-mask', name: 'Nourishing Hair Mask', brand: 'Lumière Care',
    category: 'haircare', price: 25, originalPrice: null, sku: 'LCH-MAS-200',
    images: [u('1747858989102-cca0f4dc4a11'), u('1747098393451-6b985f62a2c2')],
    stock: 26, rating: 4.7, reviewCount: 143, featured: true, bestseller: false, isNew: false,
    name_fa: 'ماسک مو مغذی',
    description: 'A weekly deep-conditioning mask with shea butter and hydrolysed keratin that leaves hair feeling soft, smooth and easier to style.',
    description_fa: 'ماسک مغذی هفتگی با کره شی و کراتین آب‌پروتئین‌شده که مو را نرم، صاف و آسان برای حالت‌دهی نگه می‌دارد.',
    size: '200 ml',
    variants: [{ id: 'p9-200', name: '200 ml', priceDelta: 0 }],
    attributes: { hairType: ['Dry', 'Damaged', 'All'], concern: ['Hydration', 'Smoothness'], productType: ['Mask'] },
    ingredients: 'Aqua, Cetearyl Alcohol, Butyrospermum Parkii Butter, Hydrolysed Keratin, Glycerin, Behentrimonium Methosulfate, Panthenol, Phenoxyethanol.',
    usage: 'Apply to mid-lengths and ends after shampooing. Leave for 5–10 minutes, then rinse.',
    usage_fa: 'پس از شامپو، روی تنه و نوک مو بمالید. ۵ تا ۱۰ دقیقه بماند و سپس آب‌کشی کنید.',
    specs: [
      { label: 'Volume', value: '200 ml', label_fa: 'حجم' },
      { label: 'Use', value: '1–2 times per week', label_fa: 'دفعات مصرف', value_fa: '۱ تا ۲ بار در هفته' },
      { label: 'Scent', value: 'Soft floral', label_fa: 'رایحه', value_fa: 'گل‌های ملایم' },
    ],
  },
  {
    id: 'p10', slug: 'repairing-hair-serum', name: 'Repairing Hair Serum', brand: 'Lumière Care',
    category: 'haircare', price: 29, originalPrice: null, sku: 'LCH-SER-060',
    images: [u('1786725009844-3daea6bd1fb0'), u('1764694187688-454d172e5ca0')],
    stock: 21, rating: 4.5, reviewCount: 92, featured: false, bestseller: false, isNew: true,
    name_fa: 'سرم ترمیم مو',
    description: 'A featherlight serum with argan and camellia oils that tames frizz and adds shine without weighing hair down.',
    description_fa: 'سرمی بسیار سبک با روغن آرگان و کاملیا که موخوره را مهار و درخشندگی را افزایش می‌دهد، بدون سنگین‌کردن مو.',
    size: '60 ml',
    variants: [{ id: 'p10-60', name: '60 ml', priceDelta: 0 }],
    attributes: { hairType: ['Frizz-prone', 'All'], concern: ['Frizz', 'Shine'], productType: ['Serum'] },
    ingredients: 'Cyclopentasiloxane, Argania Spinosa Kernel Oil, Camellia Oleifera Seed Oil, Tocopherol, Fragrance.',
    usage: 'Warm 2–3 drops between palms and apply to damp or dry hair, avoiding the roots.',
    usage_fa: '۲ تا ۳ قطره را میان کف دست گرم کنید و روی موی نم‌دار یا خشک، دور از ریشه، بمالید.',
    specs: [
      { label: 'Volume', value: '60 ml', label_fa: 'حجم' },
      { label: 'Texture', value: 'Lightweight oil-serum', label_fa: 'بافت', value_fa: 'سرم-روغن سبک' },
    ],
  },
  {
    id: 'p11', slug: 'silky-body-lotion', name: 'Silky Body Lotion', brand: 'Lumière Care',
    category: 'bodycare', price: 19, originalPrice: null, sku: 'LCB-LOT-250',
    images: [u('1551446339-1e5c6f164ec2'), u('1631729371254-42c2892f0e6e')],
    stock: 45, rating: 4.6, reviewCount: 118, featured: false, bestseller: true, isNew: false,
    name_fa: 'لوسیون بدن ابریشمی',
    description: 'A fast-absorbing lotion with shea butter and glycerin that keeps skin feeling soft and smooth from morning to night.',
    description_fa: 'لوسیونی با جذب سریع و کره شی و گلیسیرین که پوست را از صبح تا شب نرم و لطیف نگه می‌دارد.',
    size: '250 ml',
    variants: [
      { id: 'p11-250', name: '250 ml', priceDelta: 0 },
      { id: 'p11-400', name: '400 ml', priceDelta: 10 },
    ],
    attributes: { concern: ['Hydration'], productType: ['Lotion'], scent: ['Soft Vanilla', 'Unscented'] },
    ingredients: 'Aqua, Glycerin, Butyrospermum Parkii Butter, Cetearyl Alcohol, Dimethicone, Tocopherol, Phenoxyethanol, Parfum.',
    usage: 'Smooth over clean skin after bathing, concentrating on dry areas.',
    usage_fa: 'پس از استحمام روی پوست تمیز بمالید و بر نقاط خشک‌تر تمرکز کنید.',
    specs: [
      { label: 'Volume', value: '250 ml', label_fa: 'حجم' },
      { label: 'Texture', value: 'Silky lotion', label_fa: 'بافت', value_fa: 'لوسیون ابریشمی' },
      { label: 'Scent', value: 'Soft vanilla', label_fa: 'رایحه', value_fa: 'وانیل ملایم' },
    ],
  },
  {
    id: 'p12', slug: 'gentle-daily-body-wash', name: 'Gentle Daily Body Wash', brand: 'Lumière Care',
    category: 'personalcare', price: 17, originalPrice: null, sku: 'LPC-WSH-300',
    images: [u('1629380108660-bd39c778a721'), u('1624939461078-66a124b3539c')],
    stock: 38, rating: 4.4, reviewCount: 64, featured: false, bestseller: false, isNew: false,
    name_fa: 'شوینده بدن ملایم روزانه',
    description: 'A mild, sulfate-free body wash suitable for the whole family. Leaves skin feeling comfortably clean with a light botanical scent.',
    description_fa: 'شوینده بدنی ملایم و بدون سولفات، مناسب تمام اعضای خانواده. پوست را با رایحه‌ای سبک گیاهی، به‌طور مطبوع پاک نگه می‌دارد.',
    size: '300 ml',
    variants: [{ id: 'p12-300', name: '300 ml', priceDelta: 0 }],
    attributes: { productType: ['Body wash'], scent: ['Botanical'] },
    ingredients: 'Aqua, Coco-Glucoside, Glycerin, Cocamidopropyl Betaine, Aloe Barbadensis Leaf Juice, Panthenol, Citric Acid, Phenoxyethanol, Parfum.',
    usage: 'Lather over damp skin and rinse well. Suitable for daily use.',
    usage_fa: 'روی پوست نم‌دار کف کنید و خوب آب‌کشی کنید. مناسب استفاده روزانه.',
    specs: [
      { label: 'Volume', value: '300 ml', label_fa: 'حجم' },
      { label: 'Formula', value: 'Sulfate-free', label_fa: 'فرمول', value_fa: 'بدون سولفات' },
    ],
  },
];

/* --- Localization accessors ---------------------------------------------
 * Fields that have a `_fa` twin resolve at render time against the active
 * language, so consumers keep using `product.name`, `spec.label`, etc.
 */
function localize(list, fields) {
  list.forEach((obj) => fields.forEach((f) => {
    if (obj[`${f}_fa`] === undefined) return;
    obj[`${f}_en`] = obj[f];
    Object.defineProperty(obj, f, {
      configurable: true,
      get() { return getLang() === 'fa' ? obj[`${f}_fa`] : obj[`${f}_en`]; },
    });
  }));
}

CATEGORIES.forEach((c) => localize([c], ['name', 'tagline']));
PRODUCTS.forEach((p) => {
  localize([p], ['name', 'description', 'usage']);
  localize(p.variants || [], ['name']);
  localize(p.specs || [], ['label', 'value']);
});

export const categoryById = (id) => CATEGORIES.find((c) => c.id === id);
export const productBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug);
export const productById = (id) => PRODUCTS.find((p) => p.id === id);
export const categoryName = (id) => categoryById(id)?.name || id;
export const relatedProducts = (product, max = 4) =>
  PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, max);
export const formatPrice = (n) => `$${Number(n).toFixed(2)}`;
export const variantPrice = (product, variantId) => {
  const v = product.variants?.find((x) => x.id === variantId) || product.variants?.[0];
  return (product.price || 0) + (v?.priceDelta || 0);
};
