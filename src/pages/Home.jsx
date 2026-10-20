import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import ProductCarousel from '../components/ProductCarousel.jsx';
import { Reveal, SmartImage, SectionHead, Icon, Stars } from '../components/ui.jsx';
import { PRODUCTS, CATEGORIES, productBySlug, categoryName, formatPrice } from '../data/catalog.js';
import { HERO, BENEFIT_STRIP, WHY_SHOP, ROUTINES, DEMO_REVIEWS, JOURNAL, SITE } from '../data/content.js';

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="hero" aria-label="Featured campaign">
      <div className="container">
        <div className="hero__grid">
          <div className="hero__content">
            <span className="eyebrow eyebrow--rose">{HERO.eyebrow}</span>
            <h1 className="display-1">{HERO.title[0]}<br />{HERO.title[1]}</h1>
            <p className="lead">{HERO.text}</p>
            <div className="hero__ctas">
              <Link className="btn btn--primary" to={HERO.ctaPrimary.to}>{HERO.ctaPrimary.label}</Link>
              <Link className="btn btn--outline" to={HERO.ctaSecondary.to}>{HERO.ctaSecondary.label}</Link>
            </div>
          </div>
          <div className="hero__media hero__media--round">
            <SmartImage src={HERO.image} alt="Premium skincare bottles and cream jars arranged on soft pink stone" eager />
            <div className="hero__badge">
              <Icon name={HERO.badge.icon} size={22} />
              <div><span className="t1">{HERO.badge.t1}</span><br /><span className="t2">{HERO.badge.t2}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Benefit strip ---------------- */
function BenefitStrip() {
  return (
    <div className="benefit-strip">
      <div className="container">
        <div className="benefit-strip__grid">
          {BENEFIT_STRIP.map((b) => (
            <div className="benefit" key={b.t1}>
              <Icon name={b.icon} size={30} />
              <div><div className="b1">{b.t1}</div><div className="b2">{b.t2}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Categories ---------------- */
function CategoryGrid() {
  return (
    <section className="section" aria-labelledby="cat-title">
      <div className="container">
        <SectionHead eyebrow="Curated Collections" title="Shop by Category" text="Five focused edits, from daily skincare rituals to colour and care." />
        <div className="cat-grid">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.id} delay={i * 60}>
              <Link className="cat-card" to={`/shop?category=${c.id}`}>
                <div className="cat-card__img"><SmartImage src={c.image} alt={`${c.name} collection`} /></div>
                <div className="cat-card__name">{c.name}</div>
                <div className="cat-card__tag">{c.tagline}</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Brand story ---------------- */
function BrandStory() {
  return (
    <section className="section section--cream" aria-labelledby="story-title">
      <div className="container">
        <div className="story-grid">
          <Reveal className="story__text">
            <span className="eyebrow">Our Philosophy</span>
            <h2 id="story-title" className="display-2">Beauty Begins With Care</h2>
            <p className="lead">
              At Lumière Beauty, we believe that everyday beauty routines should feel thoughtful, effortless,
              and personal. We bring together carefully selected skincare, cosmetics, and personal care
              essentials to help you discover products that fit your needs and your lifestyle.
            </p>
            <Link className="btn-link" to="/about">Discover Our Story <span className="arrow">→</span></Link>
          </Reveal>
          <Reveal delay={120} className="story__media">
            <div className="story__media-main">
              <SmartImage src="https://images.unsplash.com/photo-1601049676869-702ea24cfd58?auto=format&fit=crop&w=900&q=80" alt="Premium skincare products arranged on a natural stone surface" />
            </div>
            <div className="story__media-side">
              <SmartImage src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=600&q=80" alt="Editorial close-up of botanical beauty ingredients" />
            </div>
            <Link className="story__arrow" to="/about" aria-label="Discover our story"><Icon name="arrowRight" /></Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Featured / bestsellers ---------------- */
function Featured() {
  const featured = PRODUCTS.filter((p) => p.featured);
  const bestsellers = PRODUCTS.filter((p) => p.bestseller && !p.featured);
  return (
    <section className="section" aria-labelledby="feat-title">
      <div className="container">
        <SectionHead eyebrow="Bestsellers" title="Customer Favorites" text="Discover the products customers return to, from daily skincare essentials to beauty must-haves." />
        <ProductCarousel products={featured} ariaLabel="Featured bestsellers" />
        {bestsellers.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <SectionHead split eyebrow="More Loved" title="Also in the Spotlight" />
            <div className="product-grid">
              {bestsellers.map((p, i) => <Reveal key={p.id} delay={i * 50}><ProductCard product={p} /></Reveal>)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- Routines ---------------- */
function Routines() {
  const icons = { sun: 'sun', moon: 'moon', brush: 'brush', drop: 'drop' };
  return (
    <section className="section section--blush" aria-labelledby="routines-title">
      <div className="container">
        <SectionHead eyebrow="Curated" title="Beauty Routines" text="Simple, repeatable rituals built from products in our catalogue." />
        <div className="routine-grid">
          {ROUTINES.map((r, i) => (
            <Reveal key={r.title} delay={i * 70}>
              <div className="routine-card">
                <div className="routine-card__icon"><Icon name={icons[r.icon] || 'sparkle'} /></div>
                <h3>{r.title}</h3>
                <div className="routine-card__products">
                  {r.products.map((slug) => {
                    const p = productBySlug(slug);
                    return p ? <Link key={slug} to={`/product/${slug}`}>{p.name} · {formatPrice(p.price)}</Link> : null;
                  })}
                </div>
                <Link className="btn-link" to="/shop">Shop All <span className="arrow">→</span></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why shop ---------------- */
function WhyShop() {
  return (
    <section className="section" aria-labelledby="why-title">
      <div className="container">
        <SectionHead eyebrow="Our Promise" title="Why Shop With Us" text="What we hold ourselves to, on every page and every order." />
        <div className="why-grid">
          {WHY_SHOP.map((w, i) => (
            <Reveal key={w.title} delay={i * 60}>
              <div className="why-item">
                <Icon name={w.icon} size={34} />
                <div className="w1">{w.title}</div>
                <div className="w2">{w.text}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- New arrivals ---------------- */
function NewArrivals() {
  const items = PRODUCTS.filter((p) => p.isNew);
  return (
    <section className="section section--cream" aria-labelledby="na-title">
      <div className="container">
        <SectionHead split eyebrow="Just Landed" title="New Arrivals" />
        <div className="product-grid">
          {items.map((p, i) => <Reveal key={p.id} delay={i * 50}><ProductCard product={p} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Reviews ---------------- */
function Reviews() {
  return (
    <section className="section" aria-labelledby="rev-title">
      <div className="container">
        <SectionHead eyebrow="Kind Words" title="Customer Reviews" text="Demonstration reviews shown until genuine customer feedback is connected." />
        <div className="review-grid">
          {DEMO_REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 70}>
              <div className="review-card">
                <Stars value={r.rating} />
                <blockquote>“{r.text}”</blockquote>
                <div className="review-card__meta">
                  <span className="review-card__avatar">{r.initials}</span>
                  <div><div className="review-card__name">{r.name}</div><div className="review-card__tag">Sample review · {r.product}</div></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Journal ---------------- */
export function JournalSection() {
  return (
    <section className="section section--cream" aria-labelledby="journal-title">
      <div className="container">
        <SectionHead split eyebrow="Editorial" title="Beauty Journal" />
        <div className="journal-grid">
          {JOURNAL.map((a, i) => (
            <Reveal key={a.slug} delay={i * 70}>
              <Link className="journal-card" to={`/journal/${a.slug}`}>
                <div className="journal-card__img"><SmartImage src={a.image} alt={a.title} /></div>
                <span className="journal-card__date">{new Date(a.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <h3>{a.title}</h3>
                <p>{a.excerpt}</p>
                <span className="btn-link" style={{ marginTop: 8 }}>Read More <span className="arrow">→</span></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CtaSection() {
  return (
    <section className="section cta-section" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-card">
          <div>
            <div className="cta-card__ornament">
              <svg width="54" height="30" viewBox="0 0 54 30" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M27 3c-4 6-4 18 0 24M13 8c-2 5-2 9 0 14M41 8c2 5 2 9 0 14" strokeLinecap="round" />
                <circle cx="27" cy="15" r="2.2" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <h2 id="cta-title">Your Next Beauty Favorite Awaits.</h2>
            <p>Explore thoughtfully selected essentials and create a beauty routine that feels uniquely yours.</p>
          </div>
          <Link className="btn btn--gold" to="/shop">Explore the Collection →</Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <BenefitStrip />
      <CategoryGrid />
      <BrandStory />
      <Featured />
      <Routines />
      <WhyShop />
      <NewArrivals />
      <Reviews />
      <JournalSection />
      <CtaSection />
    </>
  );
}
