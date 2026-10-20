import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Reveal, Icon, SmartImage } from '../components/ui.jsx';
import { JOURNAL, FAQS, SITE } from '../data/content.js';

export function About() {
  return (
    <div className="page container">
      <div className="page-head">
        <span className="eyebrow eyebrow--rose">Our Story</span>
        <h1>Beauty, Thoughtfully Curated</h1>
      </div>
      <div className="prose">
        <p>
          Lumière Beauty began with a simple observation: most beauty shopping is overwhelming. Thousands of
          products, conflicting advice, and no clear way to know what actually fits your routine.
        </p>
        <p>
          We take a different approach — a focused, carefully reviewed edit across skincare, makeup, haircare,
          body care and personal hygiene. Every product page states plainly what is inside, how to use it, and
          what we can honestly say about it. Where we do not know something, we say so.
        </p>
        <h2>What guides us</h2>
        <ul>
          <li>Editorial, not promotional — we recommend products as we would to a friend.</li>
          <li>Clear information — full ingredient lists and usage guidance on every product.</li>
          <li>No invented claims — we do not publish certifications or results we cannot verify.</li>
        </ul>
        <p>
          This storefront is a demonstration build: product data, reviews and checkout are sample content,
          structured so a real catalogue, customer accounts and payments can be connected without redesign.
        </p>
        <Link className="btn btn--primary" to="/shop" style={{ marginTop: 10 }}>Explore the Collection</Link>
      </div>
      <div style={{ marginTop: 48 }}>
        <SmartImage src="https://images.unsplash.com/photo-1601049676869-702ea24cfd58?auto=format&fit=crop&w=1200&q=80" alt="Skincare products on natural stone" className="img-fallback" style={{ width: '100%', aspectRatio: '16/7', objectFit: 'cover', borderRadius: 'var(--radius-l)' }} />
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
    if (!form.name.trim()) errs.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email address.';
    if (form.message.trim().length < 10) errs.message = 'Please write at least a short message.';
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="page container">
      <div className="page-head">
        <span className="eyebrow eyebrow--rose">We're Here to Help</span>
        <h1>Contact Us</h1>
      </div>
      <div className="contact-layout">
        <div className="prose">
          <h2 style={{ marginTop: 0 }}>Customer Support</h2>
          <p>Email: <strong>{SITE.contact.email}</strong> <span className="tag-pill">placeholder</span></p>
          <p>Support hours: {SITE.contact.hours}</p>
          <p>Phone: {SITE.contact.phone} <span className="tag-pill">placeholder</span></p>
          <h2>Business Address</h2>
          <p>{SITE.contact.address}</p>
          <p className="form-note">Contact details are editable placeholders — replace them with your real business information.</p>
        </div>
        <form className="summary-card" style={{ position: 'static' }} onSubmit={submit} noValidate>
          <h2 style={{ fontSize: 19 }}>Send a Message</h2>
          {sent && <p className="banner-msg banner-msg--success" role="status">Message recorded (demonstration — no email was sent).</p>}
          <div className={`field ${errors.name ? 'has-error' : ''}`}>
            <label htmlFor="ct-name">Name</label>
            <input id="ct-name" className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-invalid={!!errors.name} />
            {errors.name && <p className="field-error" role="alert">{errors.name}</p>}
          </div>
          <div className={`field ${errors.email ? 'has-error' : ''}`}>
            <label htmlFor="ct-email">Email</label>
            <input id="ct-email" className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} aria-invalid={!!errors.email} />
            {errors.email && <p className="field-error" role="alert">{errors.email}</p>}
          </div>
          <div className={`field ${errors.message ? 'has-error' : ''}`}>
            <label htmlFor="ct-msg">Message</label>
            <textarea id="ct-msg" className="textarea" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} aria-invalid={!!errors.message} />
            {errors.message && <p className="field-error" role="alert">{errors.message}</p>}
          </div>
          <button className="btn btn--primary btn--block" type="submit">Send Message</button>
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
        <span className="eyebrow eyebrow--rose">Help Center</span>
        <h1>Frequently Asked Questions</h1>
      </div>
      <div className="prose" style={{ maxWidth: 800 }}>
        {FAQS.map((f, i) => (
          <div className={`faq-item ${open === i ? 'faq-item--open' : ''}`} key={f.q}>
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
  return (
    <div className="page container">
      <div className="page-head">
        <span className="eyebrow eyebrow--rose">Policies</span>
        <h1>Shipping &amp; Returns</h1>
      </div>
      <div className="prose">
        <h2>Shipping (sample configuration)</h2>
        <p>Standard delivery is a flat ${SITE.shippingFlat.toFixed(2)} and becomes complimentary on orders over ${SITE.freeShippingThreshold.toFixed(2)}. Express delivery is available at checkout for ${SITE.shippingExpress.toFixed(2)} and arrives in 1–2 business days, versus 3–5 for standard.</p>
        <p>These are demonstration rates for the sample storefront — replace them with your real carrier configuration.</p>
        <h2>Returns</h2>
        <p>Unopened products in resalable condition may be returned within 30 days of delivery. Contact us first so we can issue return instructions; return shipping is the customer's responsibility unless the item arrived damaged or incorrect.</p>
        <h2>Damaged or Missing Items</h2>
        <p>If an item arrives damaged or your order is incomplete, contact us within 48 hours of delivery and we will make it right. In a live store this is where the real claims process would be described.</p>
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <div className="page container">
      <div className="page-head">
        <span className="eyebrow eyebrow--rose">Legal</span>
        <h1>Privacy Policy</h1>
      </div>
      <div className="prose">
        <p>This demonstration storefront stores your shopping bag, wishlist, recently viewed products and any demonstration account or orders in your own browser's local storage. Nothing is sent to a server, and nothing is shared with third parties.</p>
        <h2>What we do not do</h2>
        <ul>
          <li>We do not collect payment details — the checkout is a demonstration and processes no payments.</li>
          <li>We do not send marketing email — the newsletter form is a demonstration.</li>
          <li>We do not use tracking cookies or analytics in this build.</li>
        </ul>
        <h2>Clearing your data</h2>
        <p>You can clear everything this site has stored by signing out (on the account page) and clearing your browser's local storage for this site.</p>
        <p>Before going live, replace this page with a privacy policy describing your real data practices, and ensure compliance with the regulations that apply to your customers.</p>
      </div>
    </div>
  );
}

export function Terms() {
  return (
    <div className="page container">
      <div className="page-head">
        <span className="eyebrow eyebrow--rose">Legal</span>
        <h1>Terms &amp; Conditions</h1>
      </div>
      <div className="prose">
        <h2>Demonstration storefront</h2>
        <p>This website is a demonstration build. Products, prices, reviews, promotional codes and policies are sample content — they are not verified commercial offers. No payment is processed and no real orders are fulfilled.</p>
        <h2>Sample content</h2>
        <p>Product descriptions describe sample formulations and are labelled as demonstration data. We make no medical, dermatological or clinical claims. Product specifications are placeholders for real catalog data.</p>
        <h2>Intellectual property</h2>
        <p>The Lumière Beauty name, design system and code in this build are the property of the site owner. Photography used in this demonstration is sourced from stock libraries and must be replaced with licensed product imagery before commercial use.</p>
        <h2>Going live</h2>
        <p>Before commercial launch: connect real product data, a payment provider, authentication and order management, and replace this document with terms reviewed for your jurisdiction.</p>
      </div>
    </div>
  );
}

export function JournalIndex() {
  return (
    <div className="page container">
      <div className="page-head">
        <span className="eyebrow eyebrow--rose">Editorial</span>
        <h1>Beauty Journal</h1>
        <p>Product guides and routine ideas from the Lumière team.</p>
      </div>
      <div className="journal-grid">
        {JOURNAL.map((a) => (
          <Link className="journal-card" key={a.slug} to={`/journal/${a.slug}`}>
            <div className="journal-card__img"><SmartImage src={a.image} alt={a.title} /></div>
            <span className="journal-card__date">{new Date(a.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
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
          <h3>Article not found</h3>
          <Link className="btn btn--outline" to="/journal">Back to Journal</Link>
        </div>
      </div>
    );
  }
  return (
    <div className="page container">
      <article className="article">
        <Link className="btn-link" to="/journal">← All Articles</Link>
        <h1 style={{ fontSize: 'clamp(30px, 3.6vw, 42px)', marginTop: 18 }}>{article.title}</h1>
        <span className="article__date">{new Date(article.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} · Beauty Journal</span>
        <div className="article__img"><SmartImage src={article.image} alt={article.title} eager /></div>
        {article.body.map((p, i) => <p key={i}>{p}</p>)}
        <p className="form-note" style={{ marginTop: 26 }}>Editorial guidance only — this article is general in nature and is not medical or dermatological advice.</p>
        <Reveal>
          <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link className="btn btn--primary" to="/shop">Shop the Products</Link>
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
        <h3 style={{ fontSize: 30 }}>Page not found</h3>
        <p className="muted">The page you are looking for does not exist.</p>
        <Link className="btn btn--primary" to="/">Back to Home</Link>
      </div>
    </div>
  );
}
