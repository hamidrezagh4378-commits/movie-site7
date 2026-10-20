import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { formatPrice } from '../data/catalog.js';
import { SITE } from '../data/content.js';
import { t } from '../i18n/lang.js';
import { S } from '../i18n/strings.js';
import { CartSummary } from './CartPage.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Checkout() {
  const { cartDetailed, subtotal, discount, coupon, placeOrder } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', postal: '', country: 'United States' });
  const [delivery, setDelivery] = useState('standard');
  const [payment, setPayment] = useState('cod');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (cartDetailed.length === 0) {
    return (
      <div className="page container">
        <div className="empty-state">
          <h3>{t(S.nothingToCheckout)}</h3>
          <p className="muted">{t(S.nothingToCheckoutHint)}</p>
          <Link className="btn btn--primary" to="/shop">{t(S.shopProducts)}</Link>
        </div>
      </div>
    );
  }

  const express = delivery === 'express';
  const freeShip = subtotal >= SITE.freeShippingThreshold;
  const shippingCost = express ? SITE.shippingExpress : freeShip ? 0 : SITE.shippingFlat;
  const total = subtotal - discount + shippingCost;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = t(S.eName);
    if (!EMAIL_RE.test(form.email)) e.email = t(S.eEmail);
    if (form.phone && !/^[+\d\s()-]{6,}$/.test(form.phone)) e.phone = t(S.ePhone);
    if (!form.address.trim()) e.address = t(S.eAddress);
    if (!form.city.trim()) e.city = t(S.eCity);
    if (!form.postal.trim()) e.postal = t(S.ePostal);
    if (!terms) e.terms = t(S.eTerms);
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) {
      document.querySelector('.checkout-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setSubmitting(true);
    const order = placeOrder({
      ...form, delivery: express ? 'Express (1–2 business days)' : 'Standard (3–5 business days)',
      shippingCost, payment: payment === 'cod' ? 'Cash on delivery' : 'Card (demonstration — not processed)',
    });
    navigate(`/order/${order.id}`);
  };

  const err = (k) => errors[k] && <p className="field-error" role="alert">{errors[k]}</p>;

  return (
    <div className="page container">
      <div className="page-head">
        <h1>{t(S.checkout)}</h1>
        <p>{t(S.demoCheckoutNote)}</p>
      </div>
      <div className="checkout-layout">
        <form onSubmit={submit} noValidate>
          <section className="checkout-section">
            <h2><span className="num">1</span> {t(S.customerInfo)}</h2>
            <div className="form-grid">
              <div className={`field ${errors.name ? 'has-error' : ''}`}>
                <label htmlFor="co-name">{t(S.fullNameStar)}</label>
                <input id="co-name" className="input" value={form.name} onChange={set('name')} aria-invalid={!!errors.name} />
                {err('name')}
              </div>
              <div className={`field ${errors.email ? 'has-error' : ''}`}>
                <label htmlFor="co-email">{t(S.emailStar)}</label>
                <input id="co-email" className="input" type="email" value={form.email} onChange={set('email')} aria-invalid={!!errors.email} />
                {err('email')}
              </div>
              <div className={`field field--full ${errors.phone ? 'has-error' : ''}`}>
                <label htmlFor="co-phone">{t(S.phoneOptional)}</label>
                <input id="co-phone" className="input" type="tel" value={form.phone} onChange={set('phone')} aria-invalid={!!errors.phone} />
                {err('phone')}
              </div>
            </div>
          </section>

          <section className="checkout-section">
            <h2><span className="num">2</span> {t(S.shippingAddress)}</h2>
            <div className="form-grid">
              <div className={`field field--full ${errors.address ? 'has-error' : ''}`}>
                <label htmlFor="co-addr">{t(S.streetAddress)}</label>
                <input id="co-addr" className="input" value={form.address} onChange={set('address')} aria-invalid={!!errors.address} />
                {err('address')}
              </div>
              <div className={`field ${errors.city ? 'has-error' : ''}`}>
                <label htmlFor="co-city">{t(S.city)}</label>
                <input id="co-city" className="input" value={form.city} onChange={set('city')} aria-invalid={!!errors.city} />
                {err('city')}
              </div>
              <div className={`field ${errors.postal ? 'has-error' : ''}`}>
                <label htmlFor="co-postal">{t(S.postalCode)}</label>
                <input id="co-postal" className="input" value={form.postal} onChange={set('postal')} aria-invalid={!!errors.postal} />
                {err('postal')}
              </div>
              <div className="field field--full">
                <label htmlFor="co-country">{t(S.country)}</label>
                <select id="co-country" className="select" value={form.country} onChange={set('country')}>
                  {['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Other'].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </section>

          <section className="checkout-section">
            <h2><span className="num">3</span> {t(S.deliveryMethod)}</h2>
            <label className={`radio-option ${delivery === 'standard' ? 'is-selected' : ''}`}>
              <input type="radio" name="delivery" value="standard" checked={delivery === 'standard'} onChange={() => setDelivery('standard')} />
              <span style={{ flex: 1 }}><span className="r1">{t(S.standardDelivery)}</span><span className="r2" style={{ display: 'block' }}>{freeShip ? t(S.freeOver).replace('{v}', formatPrice(SITE.freeShippingThreshold)) : formatPrice(SITE.shippingFlat)}</span></span>
              <span style={{ fontWeight: 600 }}>{freeShip ? t(S.complimentary) : formatPrice(SITE.shippingFlat)}</span>
            </label>
            <label className={`radio-option ${delivery === 'express' ? 'is-selected' : ''}`}>
              <input type="radio" name="delivery" value="express" checked={delivery === 'express'} onChange={() => setDelivery('express')} />
              <span style={{ flex: 1 }}><span className="r1">{t(S.expressDelivery)}</span><span className="r2" style={{ display: 'block' }}>{t(S.priorityHandling)}</span></span>
              <span style={{ fontWeight: 600 }}>{formatPrice(SITE.shippingExpress)}</span>
            </label>
          </section>

          <section className="checkout-section">
            <h2><span className="num">4</span> {t(S.paymentMethod)}</h2>
            <label className={`radio-option ${payment === 'cod' ? 'is-selected' : ''}`}>
              <input type="radio" name="payment" value="cod" checked={payment === 'cod'} onChange={() => setPayment('cod')} />
              <span><span className="r1">{t(S.cashOnDelivery)}</span><span className="r2" style={{ display: 'block' }}>{t(S.payOnArrival)}</span></span>
            </label>
            <label className={`radio-option ${payment === 'card' ? 'is-selected' : ''}`}>
              <input type="radio" name="payment" value="card" checked={payment === 'card'} onChange={() => setPayment('card')} />
              <span><span className="r1">{t(S.card)}</span><span className="r2" style={{ display: 'block' }}>{t(S.cardNote)}</span></span>
            </label>
            {payment === 'card' && (
              <p className="demo-payment-note">{t(S.cardDemoNote)}</p>
            )}
          </section>

          <section className="checkout-section">
            <h2><span className="num">5</span> {t(S.reviewAndPlace)}</h2>
            <label className={`checkbox-row ${errors.terms ? 'has-error' : ''}`} style={{ marginBottom: 16 }}>
              <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} aria-invalid={!!errors.terms} />
              <span>{t(S.agreeTermsStart)} <Link to="/terms" style={{ textDecoration: 'underline' }}>{t(S.terms)}</Link> {t(S.agreeTermsEnd)}</span>
            </label>
            {err('terms')}
            <button className="btn btn--primary btn--block" type="submit" disabled={submitting}>
              {t(S.placeOrder)} — {formatPrice(total)}
            </button>
          </section>
        </form>

        <div>
          <div className="summary-card">
            <h2>{t(S.orderSummary)}</h2>
            {cartDetailed.map((i) => (
              <div className="order-item-line" key={`${i.productId}-${i.variantId}`}>
                <span><span className="n">{i.qty}×</span> {i.product.name}{i.variant ? ` — ${i.variant.name}` : ''}</span>
                <span>{formatPrice(i.lineTotal)}</span>
              </div>
            ))}
            <div className="drawer__summary" style={{ marginTop: 14 }}>
              <div className="summary-row"><span>{t(S.subtotal)}</span><span>{formatPrice(subtotal)}</span></div>
              {coupon && <div className="summary-row"><span>{t(S.promo)}: {coupon.code}</span><span style={{ color: 'var(--success)' }}>−{formatPrice(discount)}</span></div>}
              <div className="summary-row"><span>{t(S.shipping)} ({express ? t(S.shippingExpr) : t(S.shippingStd)})</span>{shippingCost === 0 ? <span className="free">{t(S.complimentary)}</span> : <span>{formatPrice(shippingCost)}</span>}</div>
              <div className="summary-row summary-row--total"><span>{t(S.total)}</span><span>{formatPrice(total)}</span></div>
            </div>
            <p className="form-note">{t(S.couponNote)} <Link to="/cart" style={{ textDecoration: 'underline' }}>{t(S.bagPage)}</Link>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
