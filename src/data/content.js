// Editable site content — sample/demo values, safe to replace with real data.
// Localized fields carry a `_fa` twin resolved at render time (see src/i18n/lang.js).
import { getLang } from '../i18n/lang.js';

const bi = (obj, fields) => {
  fields.forEach((f) => {
    if (obj[`${f}_fa`] === undefined) return;
    obj[`${f}_en`] = obj[f];
    Object.defineProperty(obj, f, {
      configurable: true,
      get() { return getLang() === 'fa' ? obj[`${f}_fa`] : obj[`${f}_en`]; },
    });
  });
};

export const SITE = {
  name: 'LUMIÈRE',
  nameAccent: 'BEAUTY',
  tagline: 'Thoughtfully selected beauty and personal care essentials for everyday rituals.',
  tagline_fa: 'منتخبی از ضروریات زیبایی و مراقبت شخصی برای آیین‌های روزمره.',
  // Sample announcement — editable, not a real promotion.
  announcement: {
    strong: 'Complimentary shipping', strong_fa: 'ارسال رایگان',
    rest: 'on orders over $75 · Sample code GLOW15 for 15% off',
    rest_fa: 'برای سفارش‌های بالای ۷۵ دلار · کد نمونه GLOW15 برای ۱۵٪ تخفیف',
    href: '/shop',
  },
  contact: {
    email: 'hello@lumierebeauty.example', // placeholder — replace with real address
    phone: '+00 000 000 0000', // placeholder — replace or remove
    address: 'Your business address — editable placeholder',
    address_fa: 'نشانی کسب‌وکار شما — نمونه قابل ویرایش',
    hours: 'Monday–Friday, 9:00–17:00 (sample)',
    hours_fa: 'شنبه تا چهارشنبه، ۹:۰۰ تا ۱۷:۰۰ (نمونه)',
  },
  social: { instagram: '#', pinterest: '#', tiktok: '#' },
  freeShippingThreshold: 75,
  shippingFlat: 6.95,
  shippingExpress: 14.95,
};
bi(SITE, ['tagline']);
bi(SITE.announcement, ['strong', 'rest']);
bi(SITE.contact, ['address', 'hours']);

export const HERO = {
  eyebrow: 'New Season Edit', eyebrow_fa: 'انتخاب فصل جدید',
  title: ['Your Beauty,', 'Elevated.'],
  title_en: ['Your Beauty,', 'Elevated.'],
  title_fa: ['زیبایی شما،', 'برتر از همیشه.'],
  text: 'Discover thoughtfully selected skincare, makeup, and personal care essentials designed to make every routine feel extraordinary.',
  text_fa: 'ضروریات منتخب مراقبت پوست، آرایش و مراقبت شخصی — طراحی‌شده تا هر آیین روزانه، فوق‌العاده حس شود.',
  ctaPrimary: { label: 'Shop Bestsellers', to: '/shop?collection=bestsellers', label_fa: 'خرید پرفروش‌ها' },
  ctaSecondary: { label: 'Explore Skincare', to: '/shop?category=skincare', label_fa: 'کاوش در مراقبت پوست' },
  image: 'https://images.unsplash.com/photo-1555820585-c5ae44394b79?auto=format&fit=crop&w=1600&q=85',
  badge: {
    icon: 'sparkle',
    t1: 'Curated selection', t1_fa: 'انتخاب منتخب',
    t2: 'A focused edit of sample products', t2_fa: 'گزیده‌ای متمرکز از محصولات نمونه',
  },
};
bi(HERO, ['eyebrow', 'text']);
Object.defineProperty(HERO, 'title', {
  configurable: true,
  get() { return getLang() === 'fa' ? HERO.title_fa : HERO.title_en; },
});
bi(HERO.ctaPrimary, ['label']);
bi(HERO.ctaSecondary, ['label']);
bi(HERO.badge, ['t1', 't2']);

export const BENEFIT_STRIP = [
  { icon: 'leaf', t1: 'Carefully Selected', t1_fa: 'با دقت انتخاب‌شده', t2: 'Every product reviewed by our team', t2_fa: 'هر محصول توسط تیم ما بررسی می‌شود' },
  { icon: 'shield', t1: 'Secure Checkout', t1_fa: 'پرداخت امن', t2: 'Demonstration checkout — no payment processed', t2_fa: 'پرداخت نمایشی — بدون پرداخت واقعی' },
  { icon: 'return', t1: '30-Day Returns', t1_fa: '۳۰ روز مهلت مرجوعی', t2: 'Sample policy — easily configurable', t2_fa: 'سیاست نمونه — به‌آسانی قابل تنظیم' },
  { icon: 'chat', t1: 'Helpful Support', t1_fa: 'پشتیبانی پاسخگو', t2: 'We are here to help', t2_fa: 'ما برای کمک در اینجا هستیم' },
];
BENEFIT_STRIP.forEach((b) => bi(b, ['t1', 't2']));

export const WHY_SHOP = [
  { icon: 'gem', title: 'Carefully Selected', title_fa: 'با دقت انتخاب‌شده', text: 'A focused edit of skincare, makeup and personal care — chosen for quality, not quantity.', text_fa: 'گزیده‌ای متمرکز از مراقبت پوست، آرایش و مراقبت شخصی — با معیار کیفیت، نه تعداد.' },
  { icon: 'shield', title: 'Transparent Information', title_fa: 'شفافیت اطلاعاتی', text: 'Full ingredient lists, usage guidance and specifications on every product page.', text_fa: 'فهرست کامل ترکیبات، راهنمای مصرف و مشخصات در صفحه هر محصول.' },
  { icon: 'return', title: 'Clear Policies', title_fa: 'سیاست‌های شفاف', text: 'Shipping rates, delivery times and returns are always stated up front.', text_fa: 'نرخ ارسال، زمان تحویل و شرایط مرجوعی همیشه پیشاپیش اعلام می‌شود.' },
  { icon: 'chat', title: 'Customer Support', title_fa: 'پشتیبانی مشتریان', text: 'Questions about a product or order? Our team is happy to help.', text_fa: 'پرسشی درباره یک محصول یا سفارش دارید؟ تیم ما خوشحال است کمک کند.' },
];
WHY_SHOP.forEach((w) => bi(w, ['title', 'text']));

export const ROUTINES = [
  { icon: 'sun', title: 'Morning Skincare', title_fa: 'مراقبت پوست صبحگاهی', products: ['gentle-foaming-cleanser', 'vitamin-c-brightening-serum', 'daily-moisture-cream'] },
  { icon: 'moon', title: 'Evening Skincare', title_fa: 'مراقبت پوست شبانه', products: ['gentle-foaming-cleanser', 'hydrating-glow-serum', 'daily-moisture-cream'] },
  { icon: 'brush', title: 'Everyday Makeup', title_fa: 'آرایش روزمره', products: ['radiant-foundation', 'soft-glow-blush', 'velvet-matte-lipstick'] },
  { icon: 'drop', title: 'Haircare Essentials', title_fa: 'ضروریات مراقبت مو', products: ['nourishing-hair-mask', 'repairing-hair-serum'] },
];
ROUTINES.forEach((r) => bi(r, ['title']));

// Clearly identified demonstration reviews.
export const DEMO_REVIEWS = [
  { name: 'Amelia R.', initials: 'A', rating: 5, product: 'Hydrating Glow Serum', text: 'Lightweight and comfortable under makeup — my skin feels soft by evening. A lovely everyday serum.', text_fa: 'سبک و راحت زیر آرایش — تا عصر پوستم نرم می‌ماند. یک سرم روزمره دلنشین.' },
  { name: 'Sofia K.', initials: 'S', rating: 5, product: 'Velvet Matte Lipstick', text: 'The matte finish does not feel dry at all. Rosewood is my perfect everyday shade.', text_fa: 'پایان‌بندی مات آن اصلاً خشک نیست. رزوود رنگ روزمره بی‌نقص من است.' },
  { name: 'Hana M.', initials: 'H', rating: 4, product: 'Nourishing Hair Mask', text: 'Noticeably smoother hair after two uses. A little goes a long way, so the jar lasts.', text_fa: 'پس از دو بار استفاده، مو به‌وضوح صاف‌تر شد. مقدار کمی کافی است و بسته‌بندی مدت زیادی دوام دارد.' },
];
DEMO_REVIEWS.forEach((r) => bi(r, ['text']));

export const JOURNAL = [
  {
    slug: 'building-a-simple-skincare-routine',
    title: 'Building a Simple, Repeatable Skincare Routine',
    title_fa: 'ساختن یک روتین ساده و تکرارپذیر مراقبت از پوست',
    date: '2026-10-08',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=85',
    excerpt: 'Three steps, done consistently, beat ten steps done occasionally. How to build a routine you will actually keep.',
    excerpt_fa: 'سه گامِ پیوسته، از ده گامِ گاه‌به‌گاه بهتر است. چطور روتینی بسازید که واقعاً حفظش کنید.',
    body: [
      'A routine you can repeat is worth more than a elaborate regimen you abandon after a week. For most people, three consistent steps — cleanse, treat, moisturise — cover the essentials.',
      'Start with a gentle cleanser that leaves your skin comfortable, not tight. If your skin feels squeaky after washing, the formula is likely too aggressive for daily use.',
      'A single well-chosen serum, layered under a moisturiser, is easier to stay consistent with than a shelf of actives. Introduce one new product at a time so you can tell what agrees with your skin.',
      'Finally, keep expectations gentle and realistic: skincare supports how your skin looks and feels over time. If you have a specific skin concern, a professional consultation is always the right first step.',
    ],
    body_fa: [
      'روتینی که بتوانید تکرار کنید، از رژیمی پیچیده که پس از یک هفته رهایش می‌کنید ارزشمندتر است. برای بیشتر افراد، سه گام ثابت — پاک‌سازی، درمان و آبرسانی — ضروریات را پوشش می‌دهد.',
      'با شوینده‌ای ملایم شروع کنید که پوست را آرام نگه دارد، نه کشیده و خشک. اگر پوست شما پس از شست‌وشو صدای «سفیدک» می‌دهد، احتمالاً این فرمول برای استفاده روزانه بیش از حد قوی است.',
      'یک سرم خوبِ انتخاب‌شده، زیر مرطوب‌کننده، از قفسه‌ای پر از محصولات فعال راحت‌تر ادامه‌پذیر است. هر بار فقط یک محصول جدید معرفی کنید تا بدانید چه چیزی با پوست شما سازگار است.',
      'در نهایت، انتظارات را ملایم و واقع‌بینانه نگه دارید: مراقبت از پوست به زیبایی و حس پوست در گذر زمان کمک می‌کند. اگر نگرانی مشخصی دارید، مشورت با متخصص همیشه اولین گام درست است.',
    ],
  },
  {
    slug: 'choosing-shades-that-feel-like-you',
    title: 'Choosing Makeup Shades That Feel Like You',
    title_fa: 'انتخاب رنگ‌های آرایشی که شبیه شما هستند',
    date: '2026-09-24',
    image: 'https://images.unsplash.com/photo-1643168343279-3f93c2e592ef?auto=format&fit=crop&w=1200&q=85',
    excerpt: 'Forget rules about seasons and undertones — start with the shades you already reach for and build from there.',
    excerpt_fa: 'قوانین فصل و زیررنگ را کنار بگذارید — از رنگ‌هایی که همیشه انتخاب می‌کنید شروع کنید و از آنجا بسازید.',
    body: [
      'The most flattering shade is usually the one you feel most yourself in. A good starting point is to look at what you already own and wear most often.',
      'For lips, a shade close to your natural lip colour but slightly deeper tends to read polished without feeling like a costume. Sheer finishes are more forgiving than opaque ones.',
      'For blush, look to the colour your cheeks take on after a brisk walk — a soft, buildable powder in that family blends easily on most skin tones.',
      'Sample products and testers are your friends: if you can swatch in natural light, even better. Our team is happy to help you narrow it down.',
    ],
    body_fa: [
      'رنگ‌هایی که بیشترین جذابیت را دارند معمولاً همان‌هایی هستند که در آن‌ها بیشترین حس «خود بودن» را دارید. نقطه شروع خوب، نگاهی به چیزی است که اکنون دارید و بیشترین استفاده را می‌کنید.',
      'برای لب، رنگی نزدیک به رنگ طبیعی لب اما کمی تیره‌تر، معمولاً مرتب و پخته به نظر می‌رسد بدون آنکه شبیه نقاب باشد. بافت‌های شفاف از بافت‌های کاملاً پوشاننده بخشنده‌ترند.',
      'برای رژگونه، به رنگی نگاه کنید که گونه‌های شما پس از پیاده‌روی تند می‌گیرند — پودری نرم و قابل افزایش از آن خانواده روی بیشتر رنگ‌های پوست به‌راحتی محو می‌شود.',
      'محصولات نمونه و تستر دوستان شما هستند: اگر بتوانید در نور طبیعی تست کنید، بهتر است. تیم ما خوشحال است در انتخاب شما را یاری کند.',
    ],
  },
  {
    slug: 'caring-for-hair-between-washes',
    title: 'Caring for Hair Between Washes',
    title_fa: 'مراقبت از مو در فاصله بین شست‌وشوها',
    date: '2026-09-10',
    image: 'https://images.unsplash.com/photo-1747858989102-cca0f4dc4a11?auto=format&fit=crop&w=1200&q=85',
    excerpt: 'A few low-effort habits keep hair feeling fresh and looking tidy on the days you skip the shower.',
    excerpt_fa: 'چند عادت کم‌زحمت، مو را در روزهایی که دوش را کنار می‌گذارید، تازه و مرتب نگه می‌دارد.',
    body: [
      'How often you wash is a personal matter — hair type, styling and lifestyle all play a part. What matters more is how you treat hair between washes.',
      'A lightweight serum on the mid-lengths and ends keeps frizz in check without buildup. Warm a few drops between your palms and focus on the driest parts first.',
      'Gentle detangling, starting from the ends, avoids unnecessary breakage. A soft pillowcase and a loose braid can also help hair look tidier in the morning.',
      'Once or twice a week, a nourishing mask on the ends does most of what a salon treatment does — consistency is what makes the difference visible.',
    ],
    body_fa: [
      'تعداد دفعات شست‌وشو امری شخصی است — نوع مو، حالت‌دهی و سبک زندگی همه نقش دارند. آنچه مهم‌تر است، نحوه مراقبت از مو در فاصله بین شست‌وشوهاست.',
      'یک سرم سبک روی تنه و نوک مو، وز‌شدگی را بدون باقی‌مانده مهار می‌کند. چند قطره را میان کف دست گرم کنید و ابتدا بر خشک‌ترین بخش‌ها تمرکز کنید.',
      'شانه‌کردن ملایم که از نوک مو آغاز می‌شود، از شکنندگی غیرضروری جلوگیری می‌کند. روکش بالش نرم و بافتن موی شل نیز به مرتب‌تر بودن مو در صبح کمک می‌کند.',
      'یک یا دو بار در هفته، یک ماسک مغذی روی نوک مو بیشتر کار درمان سالنی را انجام می‌دهد — پیوستگی است که تفاوت را نمایان می‌کند.',
    ],
  },
];
JOURNAL.forEach((a) => {
  bi(a, ['title', 'excerpt']);
  a.body_en = a.body;
  Object.defineProperty(a, 'body', {
    configurable: true,
    get() { return getLang() === 'fa' ? a.body_fa : a.body_en; },
  });
});

export const FAQS = [
  { q: 'Is this a live store with real payments?', q_fa: 'آیا این فروشگاه واقعی با پرداخت واقعی است؟', a: 'No — this is a demonstration storefront. The checkout is fully functional as a shopping experience, but no payment is processed and no real orders are placed.', a_fa: 'خیر — این یک فروشگاه نمایشی است. فرایند خرید به‌طور کامل قابل تجربه است، اما هیچ پرداختی انجام نمی‌شود و سفارش واقعی ثبت نمی‌گردد.' },
  { q: 'How is shipping calculated?', q_fa: 'هزینه ارسال چگونه محاسبه می‌شود؟', a: 'In this sample configuration, standard shipping is a flat $6.95 and becomes complimentary on orders over $75. Express delivery is available at checkout for $14.95.', a_fa: 'در این تنظیم نمونه، ارسال استاندارد ۶.۹۵ دلار ثابت است و برای سفارش‌های بالای ۷۵ دلار رایگان می‌شود. ارسال اپرس در مرحله پرداخت با هزینه ۱۴.۹۵ دلار در دسترس است.' },
  { q: 'What is your returns policy?', q_fa: 'سیاست مرجوعی شما چیست؟', a: 'Sample policy: unopened products can be returned within 30 days of delivery for a refund. See the Shipping & Returns page for details.', a_fa: 'سیاست نمونه: محصولات بازنشده تا ۳۰ روز پس از تحویل قابل مرجوع شدن و استرداد وجه هستند. جزئیات در صفحه «ارسال و مرجوعی».' },
  { q: 'Are the product reviews genuine?', q_fa: 'آیا دیدگاه‌های محصولات واقعی هستند؟', a: 'No. All reviews shown are clearly labelled demonstration content until real customer feedback is connected.', a_fa: 'خیر. تا زمان اتصال نظرات واقعی مشتریان، تمام دیدگاه‌ها به‌وضوح محتوای نمایشی برچسب‌گذاری شده‌اند.' },
  { q: 'Do you test on animals?', q_fa: 'آیا محصولاتی روی حیوانات آزمایش می‌کنید؟', a: 'Product pages state formulation details where available. We do not make certification claims we cannot verify — always check the product page for what is stated.', a_fa: 'صفحات محصول جزئیات فرمولاسیون را در صورت وجود بیان می‌کنند. ما ادعای گواهی‌هایی که نتوانیم تأیید کنیم نمی‌سازیم — همیشه جزئیات را در صفحه محصول ببینید.' },
  { q: 'Can I change or cancel my order?', q_fa: 'آیا می‌توانم سفارش خود را تغییر یا لغو کنم؟', a: 'Because this is a demonstration checkout, orders are simulated. In a live store this is where cancellation and amendment rules would be described.', a_fa: 'چون پرداخت نمایشی است، سفارش‌ها شبیه‌سازی شده‌اند. در فروشگاه واقعی، قوانین لغو و تغییر سفارش در اینجا توضیح داده می‌شود.' },
];
FAQS.forEach((f) => bi(f, ['q', 'a']));

export const COUPONS = {
  GLOW15: { type: 'percent', value: 0.15, label: '15% off — sample code', label_fa: '۱۵٪ تخفیف — کد نمونه' },
  WELCOME10: { type: 'percent', value: 0.1, label: '10% off — sample code', label_fa: '۱۰٪ تخفیف — کد نمونه' },
};
Object.values(COUPONS).forEach((c) => bi(c, ['label']));

export const PROMO_LABELS = { bestseller: 'Bestseller', new: 'New', sale: 'Sale', bestseller_fa: 'پرفروش', new_fa: 'جدید', sale_fa: 'تخفیف' };
bi(PROMO_LABELS, ['bestseller', 'new', 'sale']);
