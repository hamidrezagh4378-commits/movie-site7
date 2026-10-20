// Editable site content — sample/demo values, safe to replace with real data.
export const SITE = {
  name: 'LUMIÈRE',
  nameAccent: 'BEAUTY',
  tagline: 'Thoughtfully selected beauty and personal care essentials for everyday rituals.',
  // Sample announcement — editable, not a real promotion.
  announcement: { strong: 'Complimentary shipping', rest: 'on orders over $75 · Sample code GLOW15 for 15% off', href: '/shop' },
  contact: {
    email: 'hello@lumierebeauty.example', // placeholder — replace with real address
    phone: '+00 000 000 0000', // placeholder — replace or remove
    address: 'Your business address — editable placeholder',
    hours: 'Monday–Friday, 9:00–17:00 (sample)',
  },
  social: { instagram: '#', pinterest: '#', tiktok: '#' },
  freeShippingThreshold: 75,
  shippingFlat: 6.95,
  shippingExpress: 14.95,
};

export const HERO = {
  eyebrow: 'New Season Edit',
  title: ['Your Beauty,', 'Elevated.'],
  text: 'Discover thoughtfully selected skincare, makeup, and personal care essentials designed to make every routine feel extraordinary.',
  ctaPrimary: { label: 'Shop Bestsellers', to: '/shop?collection=bestsellers' },
  ctaSecondary: { label: 'Explore Skincare', to: '/shop?category=skincare' },
  image: 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?auto=format&fit=crop&w=1400&q=80',
  badge: { icon: 'sparkle', t1: 'Curated selection', t2: 'A focused edit of sample products' },
};

export const BENEFIT_STRIP = [
  { icon: 'leaf', t1: 'Carefully Selected', t2: 'Every product reviewed by our team' },
  { icon: 'shield', t1: 'Secure Checkout', t2: 'Demonstration checkout — no payment processed' },
  { icon: 'return', t1: '30-Day Returns', t2: 'Sample policy — easily configurable' },
  { icon: 'chat', t1: 'Helpful Support', t2: 'We are here to help' },
];

export const WHY_SHOP = [
  { icon: 'gem', title: 'Carefully Selected', text: 'A focused edit of skincare, makeup and personal care — chosen for quality, not quantity.' },
  { icon: 'shield', title: 'Transparent Information', text: 'Full ingredient lists, usage guidance and specifications on every product page.' },
  { icon: 'return', title: 'Clear Policies', text: 'Shipping rates, delivery times and returns are always stated up front.' },
  { icon: 'chat', title: 'Customer Support', text: 'Questions about a product or order? Our team is happy to help.' },
];

export const ROUTINES = [
  { icon: 'sun', title: 'Morning Skincare', products: ['gentle-foaming-cleanser', 'vitamin-c-brightening-serum', 'daily-moisture-cream'] },
  { icon: 'moon', title: 'Evening Skincare', products: ['gentle-foaming-cleanser', 'hydrating-glow-serum', 'daily-moisture-cream'] },
  { icon: 'brush', title: 'Everyday Makeup', products: ['radiant-foundation', 'soft-glow-blush', 'velvet-matte-lipstick'] },
  { icon: 'drop', title: 'Haircare Essentials', products: ['nourishing-hair-mask', 'repairing-hair-serum'] },
];

// Clearly identified demonstration reviews.
export const DEMO_REVIEWS = [
  { name: 'Amelia R.', initials: 'A', rating: 5, product: 'Hydrating Glow Serum', text: 'Lightweight and comfortable under makeup — my skin feels soft by evening. A lovely everyday serum.' },
  { name: 'Sofia K.', initials: 'S', rating: 5, product: 'Velvet Matte Lipstick', text: 'The matte finish does not feel dry at all. Rosewood is my perfect everyday shade.' },
  { name: 'Hana M.', initials: 'H', rating: 4, product: 'Nourishing Hair Mask', text: 'Noticeably smoother hair after two uses. A little goes a long way, so the jar lasts.' },
];

export const JOURNAL = [
  {
    slug: 'building-a-simple-skincare-routine',
    title: 'Building a Simple, Repeatable Skincare Routine',
    date: '2026-10-08',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Three steps, done consistently, beat ten steps done occasionally. How to build a routine you will actually keep.',
    body: [
      'A routine you can repeat is worth more than a elaborate regimen you abandon after a week. For most people, three consistent steps — cleanse, treat, moisturise — cover the essentials.',
      'Start with a gentle cleanser that leaves your skin comfortable, not tight. If your skin feels squeaky after washing, the formula is likely too aggressive for daily use.',
      'A single well-chosen serum, layered under a moisturiser, is easier to stay consistent with than a shelf of actives. Introduce one new product at a time so you can tell what agrees with your skin.',
      'Finally, keep expectations gentle and realistic: skincare supports how your skin looks and feels over time. If you have a specific skin concern, a professional consultation is always the right first step.',
    ],
  },
  {
    slug: 'choosing-shades-that-feel-like-you',
    title: 'Choosing Makeup Shades That Feel Like You',
    date: '2026-09-24',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Forget rules about seasons and undertones — start with the shades you already reach for and build from there.',
    body: [
      'The most flattering shade is usually the one you feel most yourself in. A good starting point is to look at what you already own and wear most often.',
      'For lips, a shade close to your natural lip colour but slightly deeper tends to read polished without feeling like a costume. Sheer finishes are more forgiving than opaque ones.',
      'For blush, look to the colour your cheeks take on after a brisk walk — a soft, buildable powder in that family blends easily on most skin tones.',
      'Sample products and testers are your friends: if you can swatch in natural light, even better. Our team is happy to help you narrow it down.',
    ],
  },
  {
    slug: 'caring-for-hair-between-washes',
    title: 'Caring for Hair Between Washes',
    date: '2026-09-10',
    image: 'https://images.unsplash.com/photo-1747858989102-cca0f4dc4a11?auto=format&fit=crop&w=900&q=80',
    excerpt: 'A few low-effort habits keep hair feeling fresh and looking tidy on the days you skip the shower.',
    body: [
      'How often you wash is a personal matter — hair type, styling and lifestyle all play a part. What matters more is how you treat hair between washes.',
      'A lightweight serum on the mid-lengths and ends keeps frizz in check without buildup. Warm a few drops between your palms and focus on the driest parts first.',
      'Gentle detangling, starting from the ends, avoids unnecessary breakage. A soft pillowcase and a loose braid can also help hair look tidier in the morning.',
      'Once or twice a week, a nourishing mask on the ends does most of what a salon treatment does — consistency is what makes the difference visible.',
    ],
  },
];

export const FAQS = [
  { q: 'Is this a live store with real payments?', a: 'No — this is a demonstration storefront. The checkout is fully functional as a shopping experience, but no payment is processed and no real orders are placed.' },
  { q: 'How is shipping calculated?', a: 'In this sample configuration, standard shipping is a flat $6.95 and becomes complimentary on orders over $75. Express delivery is available at checkout for $14.95.' },
  { q: 'What is your returns policy?', a: 'Sample policy: unopened products can be returned within 30 days of delivery for a refund. See the Shipping & Returns page for details.' },
  { q: 'Are the product reviews genuine?', a: 'No. All reviews shown are clearly labelled demonstration content until real customer feedback is connected.' },
  { q: 'Do you test on animals?', a: 'Product pages state formulation details where available. We do not make certification claims we cannot verify — always check the product page for what is stated.' },
  { q: 'Can I change or cancel my order?', a: 'Because this is a demonstration checkout, orders are simulated. In a live store this is where cancellation and amendment rules would be described.' },
];

export const COUPONS = {
  GLOW15: { type: 'percent', value: 0.15, label: '15% off — sample code' },
  WELCOME10: { type: 'percent', value: 0.1, label: '10% off — sample code' },
};

export const PROMO_LABELS = { bestseller: 'Bestseller', new: 'New', sale: 'Sale' };
