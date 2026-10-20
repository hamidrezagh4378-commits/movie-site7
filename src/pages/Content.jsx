import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Reveal, Icon, SmartImage } from '../components/ui.jsx';
import { JOURNAL, FAQS, SITE } from '../data/content.js';
import { t, formatDate } from '../i18n/lang.js';
import { S } from '../i18n/strings.js';

const P = {
  aboutEyebrow: { en: 'Our Story', fa: 'داستان ما' },
  aboutTitle: { en: 'Beauty, Thoughtfully Curated', fa: 'زیبایی، با گزینشی سنجیده' },
  aboutP1: { en: 'Lumière Beauty began with a simple observation: most beauty shopping is overwhelming. Thousands of products, conflicting advice, and no clear way to know what actually fits your routine.', fa: 'لومیر بیوتی با یک مشاهده ساده آغاز شد: بیشتر خریدهای زیبایی گیج‌کننده است. هزاران محصول، توصیه‌های متناقض و هیچ راه روشنی برای فهمیدن اینکه چه چیزی واقعاً با روتین شما سازگار است.' },
  aboutP2: { en: 'We take a different approach — a focused, carefully reviewed edit across skincare, makeup, haircare, body care and personal hygiene. Every product page states plainly what is inside, how to use it, and what we can honestly say about it. Where we do not know something, we say so.', fa: 'ما رویکردی متفاوت داریم — گزیده‌ای متمرکز و بررسی‌شده در مراقبت پوست، آرایش، مو، بدن و بهداشت شخصی. صفحه هر محصول به‌روشنی می‌گوید چه چیزی درون آن است، چگونه استفاده می‌شود و چه چیزی را می‌توانیم صادقانه درباره آن بگوییم. آنچه را نمی‌دانیم، می‌گوییم.' },
  aboutH2: { en: 'What guides us', fa: 'آنچه ما را راهنمایی می‌کند' },
  aboutL1: { en: 'Editorial, not promotional — we recommend products as we would to a friend.', fa: 'تحلیلی، نه تبلیغاتی — محصولات را همان‌گونه توصیه می‌کنیم که به یک دوست توصیه می‌کنیم.' },
  aboutL2: { en: 'Clear information — full ingredient lists and usage guidance on every product.', fa: 'اطلاعات شفاف — فهرست کامل ترکیبات و راهنمای مصرف برای هر محصول.' },
  aboutL3: { en: 'No invented claims — we do not publish certifications or results we cannot verify.', fa: 'بدون ادعای ساختگی — گواهی یا نتیجه‌ای که نتوانیم تأیید کنیم منتشر نمی‌کنیم.' },
  aboutP3: { en: 'This storefront is a demonstration build: product data, reviews and checkout are sample content, structured so a real catalogue, customer accounts and payments can be connected without redesign.', fa: 'این فروشگاه یک نمونه نمایشی است: داده محصولات، دیدگاه‌ها و پرداخت، محتوای نمونه هستند و طوری ساخته شده‌اند که کاتالوگ واقعی، حساب کاربری و پرداخت بدون بازطراحی بتوانند متصل شوند.' },
  aboutImgAlt: { en: 'Skincare products on natural stone', fa: 'محصولات مراقبت پوست روی سنگ طبیعی' },
  contactEyebrow: { en: "We're Here to Help", fa: 'برای کمک در اینجا هستیم' },
  contactTitle: { en: 'Contact Us', fa: 'تماس با ما' },
  support: { en: 'Customer Support', fa: 'پشتیبانی مشتریان' },
  businessAddress: { en: 'Business Address', fa: 'نشانی کسب‌وکار' },
  contactNote: { en: 'Contact details are editable placeholders — replace them with your real business information.', fa: 'اطلاعات تماس نمونه و قابل ویرایش هستند — آن‌ها را با اطلاعات واقعی کسب‌وکار خود جایگزین کنید.' },
  sendMessage: { en: 'Send a Message', fa: 'ارسال پیام' },
  messageRecorded: { en: 'Message recorded (demonstration — no email was sent).', fa: 'پیام ثبت شد (نمایشی — ایمیلی ارسال نشده است).' },
  message: { en: 'Message', fa: 'پیام' },
  eMessage: { en: 'Please write at least a short message.', fa: 'لطفاً دست‌کم یک پیام کوتاه بنویسید.' },
  sendBtn: { en: 'Send Message', fa: 'ارسال پیام' },
  helpCenter: { en: 'Help Center', fa: 'مرکز راهنما' },
  faqTitle: { en: 'Frequently Asked Questions', fa: 'پرسش‌های متداول' },
  policies: { en: 'Policies', fa: 'سیاست‌ها' },
  shipH2: { en: 'Shipping (sample configuration)', fa: 'ارسال (تنظیم نمونه)' },
  shipBody: { en: 'Standard delivery is a flat ${a} and becomes complimentary on orders over ${b}. Express delivery is available at checkout for ${c} and arrives in 1–2 business days, versus 3–5 for standard.', fa: 'ارسال استاندارد ${a} ثابت است و برای سفارش‌های بالای ${b} رایگان می‌شود. ارسال اپرس در مرحله پرداخت با هزینه ${c} در دسترس است و در ۱ تا ۲ روز کاری می‌رسد، در مقابل ۳ تا ۵ روز برای ارسال استاندارد.' },
  shipDemoNote: { en: 'These are demonstration rates for the sample storefront — replace them with your real carrier configuration.', fa: 'این نرخ‌ها نمایشی و مربوط به فروشگاه نمونه هستند — آن‌ها را با تنظیمات واقعی پست یا باربری خود جایگزین کنید.' },
  returnsH2: { en: 'Returns', fa: 'مرجوعی' },
  returnsBody: { en: "Unopened products in resalable condition may be returned within 30 days of delivery. Contact us first so we can issue return instructions; return shipping is the customer's responsibility unless the item arrived damaged or incorrect.", fa: 'محصولات بازنشده و قابل فروش تا ۳۰ روز پس از تحویل قابل مرجوع شدن هستند. ابتدا با ما تماس بگیرید تا دستورالعمل مرجوعی را صادر کنیم؛ هزینه ارسال مرجوعی بر عهده مشتری است مگر اینکه کالا آسیب‌دیده یا اشتباهی رسیده باشد.' },
  damagedH2: { en: 'Damaged or Missing Items', fa: 'کالاهای آسیب‌دیده یا ناقص' },
  damagedBody: { en: 'If an item arrives damaged or your order is incomplete, contact us within 48 hours of delivery and we will make it right. In a live store this is where the real claims process would be described.', fa: 'اگر کالایی آسیب‌دیده رسید یا سفارش شما ناقص بود، تا ۴۸ ساعت پس از تحویل با ما تماس بگیرید تا جبران کنیم. در فروشگاه واقعی، فرایند اعتراض واقعی در اینجا توضیح داده می‌شود.' },
  legal: { en: 'Legal', fa: 'حقوقی' },
  privacyBody1: { en: "This demonstration storefront stores your shopping bag, wishlist, recently viewed products and any demonstration account or orders in your own browser's local storage. Nothing is sent to a server, and nothing is shared with third parties.", fa: 'این فروشگاه نمایشی سبد خرید، علاقه‌مندی‌ها، بازدیدهای اخیر و حساب یا سفارش‌های نمایشی شما را در حافظه محلی مرورگر خودتان ذخیره می‌کند. هیچ چیز به سروری ارسال نمی‌شود و با هیچ شخص ثالثی به اشتراک گذاشته نمی‌شود.' },
  privacyNotH2: { en: 'What we do not do', fa: 'کارهایی که انجام نمی‌دهیم' },
  privacyN1: { en: 'We do not collect payment details — the checkout is a demonstration and processes no payments.', fa: 'جزئیات پرداخت جمع نمی‌کنیم — پرداخت نمایشی است و پرداختی انجام نمی‌شود.' },
  privacyN2: { en: 'We do not send marketing email — the newsletter form is a demonstration.', fa: 'ایمیل تبلیغاتی ارسال نمی‌کنیم — فرم خبرنامه نمایشی است.' },
  privacyN3: { en: 'We do not use tracking cookies or analytics in this build.', fa: 'در این نسخه از کوکی رهگیری یا آمارگیر استفاده نمی‌کنیم.' },
  privacyClearH2: { en: 'Clearing your data', fa: 'پاک‌کردن داده‌های شما' },
  privacyClearBody: { en: "You can clear everything this site has stored by signing out (on the account page) and clearing your browser's local storage for this site.", fa: 'می‌توانید با خروج از حساب (در صفحه حساب کاربری) و پاک‌کردن حافظه محلی مرورگر برای این سایت، همه داده‌های ذخیره‌شده را پاک کنید.' },
  privacyGoLive: { en: 'Before going live, replace this page with a privacy policy describing your real data practices, and ensure compliance with the regulations that apply to your customers.', fa: 'پیش از عرضه عمومی، این صفحه را با سیاست حفظ حریم خصوصی واقعی جایگزین کنید و با مقررات مربوط به مشتریان خود سازگار باشید.' },
  termsDemoH2: { en: 'Demonstration storefront', fa: 'فروشگاه نمایشی' },
  termsDemoBody: { en: 'This website is a demonstration build. Products, prices, reviews, promotional codes and policies are sample content — they are not verified commercial offers. No payment is processed and no real orders are fulfilled.', fa: 'این وب‌سایت یک نمونه نمایشی است. محصولات، قیمت‌ها، دیدگاه‌ها، کدهای تخفیف و سیاست‌ها محتوای نمونه هستند — پیشنهاد تجاری تأییدشده نیستند. هیچ پرداختی انجام نمی‌شود و سفارش واقعی ارسال نمی‌گردد.' },
  termsSampleH2: { en: 'Sample content', fa: 'محتوای نمونه' },
  termsSampleBody: { en: 'Product descriptions describe sample formulations and are labelled as demonstration data. We make no medical, dermatological or clinical claims. Product specifications are placeholders for real catalog data.', fa: 'توضیحات محصولات، فرمولاسیون‌های نمونه را توصیف می‌کنند و به‌عنوان داده نمایشی برچسب‌گذاری شده‌اند. هیچ ادعای پزشکی، پوستی یا بالینی نداریم. مشخصات محصولات، جای‌نگهدار داده کاتالوگ واقعی هستند.' },
  termsIpH2: { en: 'Intellectual property', fa: 'مالکیت فکری' },
  termsIpBody: { en: 'The Lumière Beauty name, design system and code in this build are the property of the site owner. Photography used in this demonstration is sourced from stock libraries and must be replaced with licensed product imagery before commercial use.', fa: 'نام لومیر بیوتی، سامانه طراحی و کد این نسخه متعلق به مالک سایت است. عکس‌های استفاده‌شده در این نسخه نمایشی از کتابخانه‌های استوک تهیه شده و پیش از استفاده تجاری باید با تصاویر دارای مجوز جایگزین شوند.' },
  termsLiveH2: { en: 'Going live', fa: 'عرضه عمومی' },
  termsLiveBody: { en: 'Before commercial launch: connect real product data, a payment provider, authentication and order management, and replace this document with terms reviewed for your jurisdiction.', fa: 'پیش از راه‌اندازی تجاری: داده واقعی محصولات، درگاه پرداخت، احراز هویت و مدیریت سفارش را متصل کنید و این سند را با قوانین بررسی‌شده برای حوزه قضایی خود جایگزین کنید.' },
  journalSub: { en: 'Product guides and routine ideas from the Lumière team.', fa: 'راهنمای محصولات و ایده‌های روتین از تیم لومیر.' },
  articleDisclaimer: { en: 'Editorial guidance only — this article is general in nature and is not medical or dermatological advice.', fa: 'فقط راهنمای تحلیلی — این مقاله ماهیتی کلی دارد و توصیه پزشکی یا پوستی نیست.' },
};

export function About() {
  return (
    <div className="page container">
      <div className="page-head">
        <span className="eyebrow eyebrow--rose">{t(P.aboutEyebrow)}</span>
        <h1>{t(P.aboutTitle)}</h1>
      </div>
      <div className="prose">
        <p>{t(P.aboutP1)}</p>
        <p>{t(P.aboutP2)}</p>
        <h2>{t(P.aboutH2)}</h2>
        <ul>
          <li>{t(P.aboutL1)}</li>
          <li>{t(P.aboutL2)}</li>
          <li>{t(P.aboutL3)}</li>
        </ul>
        <p>{t(P.aboutP3)}</p>
        <Link className="btn btn--primary" to="/shop" style={{ marginTop: 10 }}>{t(S.exploreCollection)}</Link>
      </div>
      <div style={{ marginTop: 48 }}>
        <SmartImage src="https://images.unsplash.com/photo-1601049676869-702ea24cfd58?auto=format&fit=crop&w=1200&q=85" alt={t(P.aboutImgAlt)} className="img-fallback" style={{ width: '100%', aspectRatio: '16/7', objectFit: 'cover', borderRadius: 'var(--radius-l)' }} />
      </div>
    </div>
  );
}

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = t(S.eNameShort);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t(S.eEmail);
    if (form.message.trim().length < 10) errs.message = t(P.eMessage);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="page container">
      <div className="page-head">
        <span className="eyebrow eyebrow--rose">{t(P.contactEyebrow)}</span>
        <h1>{t(P.contactTitle)}</h1>
      </div>
      <div className="contact-layout">
        <div className="prose">
          <h2 style={{ marginTop: 0 }}>{t(P.support)}</h2>
          <p>Email: <strong>{SITE.contact.email}</strong> <span className="tag-pill">{t(S.placeholder)}</span></p>
          <p>{t(S.supportHours)}: {SITE.contact.hours}</p>
          <p>Phone: {SITE.contact.phone} <span className="tag-pill">{t(S.placeholder)}</span></p>
          <h2>{t(P.businessAddress)}</h2>
          <p>{SITE.contact.address}</p>
          <p className="form-note">{t(P.contactNote)}</p>
        </div>
        <form className="summary-card" style={{ position: 'static' }} onSubmit={submit} noValidate>
          <h2 style={{ fontSize: 19 }}>{t(P.sendMessage)}</h2>
          {sent && <p className="banner-msg banner-msg--success" role="status">{t(P.messageRecorded)}</p>}
          <div className={`field ${errors.name ? 'has-error' : ''}`}>
            <label htmlFor="ct-name">{t(S.name)}</label>
            <input id="ct-name" className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-invalid={!!errors.name} />
            {errors.name && <p className="field-error" role="alert">{errors.name}</p>}
          </div>
          <div className={`field ${errors.email ? 'has-error' : ''}`}>
            <label htmlFor="ct-email">{t(S.email)}</label>
            <input id="ct-email" className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} aria-invalid={!!errors.email} />
            {errors.email && <p className="field-error" role="alert">{errors.email}</p>}
          </div>
          <div className={`field ${errors.message ? 'has-error' : ''}`}>
            <label htmlFor="ct-msg">{t(P.message)}</label>
            <textarea id="ct-msg" className="textarea" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} aria-invalid={!!errors.message} />
            {errors.message && <p className="field-error" role="alert">{errors.message}</p>}
          </div>
          <button className="btn btn--primary btn--block" type="submit">{t(P.sendBtn)}</button>
        </form>
      </div>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="page container">
      <div className="page-head">
        <span className="eyebrow eyebrow--rose">{t(P.helpCenter)}</span>
        <h1>{t(P.faqTitle)}</h1>
      </div>
      <div className="prose" style={{ maxWidth: 800 }}>
        {FAQS.map((f, i) => (
          <div className={`faq-item ${open === i ? 'faq-item--open' : ''}`} key={i}>
            <button className="faq-item__q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              {f.q}
              <span className="chev"><Icon name="plus" size={17} /></span>
            </button>
            {open === i && <div className="faq-item__a">{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ShippingReturns() {
  const shipBody = t(P.shipBody)
    .replace('{a}', SITE.shippingFlat.toFixed(2))
    .replace('{b}', SITE.freeShippingThreshold.toFixed(2))
    .replace('{c}', SITE.shippingExpress.toFixed(2));
  return (
    <div className="page container">
      <div className="page-head">
        <span className="eyebrow eyebrow--rose">{t(P.policies)}</span>
        <h1>{t(S.shippingReturns)}</h1>
      </div>
      <div className="prose">
        <h2>{t(P.shipH2)}</h2>
        <p>{shipBody}</p>
        <p>{t(P.shipDemoNote)}</p>
        <h2>{t(P.returnsH2)}</h2>
        <p>{t(P.returnsBody)}</p>
        <h2>{t(P.damagedH2)}</h2>
        <p>{t(P.damagedBody)}</p>
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <div className="page container">
      <div className="page-head">
        <span className="eyebrow eyebrow--rose">{t(P.legal)}</span>
        <h1>{t(S.privacyPolicy)}</h1>
      </div>
      <div className="prose">
        <p>{t(P.privacyBody1)}</p>
        <h2>{t(P.privacyNotH2)}</h2>
        <ul>
          <li>{t(P.privacyN1)}</li>
          <li>{t(P.privacyN2)}</li>
          <li>{t(P.privacyN3)}</li>
        </ul>
        <h2>{t(P.privacyClearH2)}</h2>
        <p>{t(P.privacyClearBody)}</p>
        <p>{t(P.privacyGoLive)}</p>
      </div>
    </div>
  );
}

export function Terms() {
  return (
    <div className="page container">
      <div className="page-head">
        <span className="eyebrow eyebrow--rose">{t(P.legal)}</span>
        <h1>{t(S.terms)}</h1>
      </div>
      <div className="prose">
        <h2>{t(P.termsDemoH2)}</h2>
        <p>{t(P.termsDemoBody)}</p>
        <h2>{t(P.termsSampleH2)}</h2>
        <p>{t(P.termsSampleBody)}</p>
        <h2>{t(P.termsIpH2)}</h2>
        <p>{t(P.termsIpBody)}</p>
        <h2>{t(P.termsLiveH2)}</h2>
        <p>{t(P.termsLiveBody)}</p>
      </div>
    </div>
  );
}

export function JournalIndex() {
  return (
    <div className="page container">
      <div className="page-head">
        <span className="eyebrow eyebrow--rose">{t(S.editorial)}</span>
        <h1>{t(S.beautyJournal)}</h1>
        <p>{t(P.journalSub)}</p>
      </div>
      <div className="journal-grid">
        {JOURNAL.map((a) => (
          <Link className="journal-card" key={a.slug} to={`/journal/${a.slug}`}>
            <div className="journal-card__img"><SmartImage src={a.image} alt={a.title} /></div>
            <span className="journal-card__date">{formatDate(a.date)}</span>
            <h3>{a.title}</h3>
            <p>{a.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function JournalArticle() {
  const { slug } = useParams();
  const article = JOURNAL.find((a) => a.slug === slug);
  if (!article) {
    return (
      <div className="page container">
        <div className="empty-state">
          <h3>{t(S.articleNotFound)}</h3>
          <Link className="btn btn--outline" to="/journal">{t(S.backToJournal)}</Link>
        </div>
      </div>
    );
  }
  return (
    <div className="page container">
      <article className="article">
        <Link className="btn-link" to="/journal">{t(S.allArticles)}</Link>
        <h1 style={{ fontSize: 'clamp(30px, 3.6vw, 42px)', marginTop: 18 }}>{article.title}</h1>
        <span className="article__date">{formatDate(article.date)} · {t(S.beautyJournal)}</span>
        <div className="article__img"><SmartImage src={article.image} alt={article.title} eager /></div>
        {article.body.map((p, i) => <p key={i}>{p}</p>)}
        <p className="form-note" style={{ marginTop: 26 }}>{t(P.articleDisclaimer)}</p>
        <Reveal>
          <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link className="btn btn--primary" to="/shop">{t(S.shopTheProducts)}</Link>
          </div>
        </Reveal>
      </article>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="page container">
      <div className="empty-state">
        <h3 style={{ fontSize: 30 }}>{t(S.pageNotFound)}</h3>
        <p className="muted">{t(S.pageNotFoundHint)}</p>
        <Link className="btn btn--primary" to="/">{t(S.backToHome)}</Link>
      </div>
    </div>
  );
}
