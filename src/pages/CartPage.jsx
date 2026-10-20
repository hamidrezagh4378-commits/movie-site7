import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { formatPrice } from '../data/catalog.js';
import { SITE } from '../data/content.js';
import { t } from '../i18n/lang.js';
import { S } from '../i18n/strings.js';
import { Icon, SmartImage, Qty } from '../components/ui.jsx';

export function CartSummary({ couponInput = false }) {
  const { subtotal, discount, coupon, applyCoupon, removeCoupon } = useStore();
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState(null);
  const { cartDetailed } = useStore();
  const hasItems = cartDetailed.length > 0 && subtotal >= SITE.freeShippingThreshold;
  const shipping = cartDetailed.length === 0 ? 0 : hasItems ? 0 : SITE.shippingFlat;
  const total = subtotal - discount + shipping;

  const submitCoupon = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    const r = applyCoupon(code);
    setMsg(r);
    if (r.ok) setCode('');
  };

  return (
    <div className="summary-card">
      <h2>{t(S.orderSummary)}</h2>
      <div className="drawer__summary">
        <div className="summary-row"><span>{t(S.subtotal)}</span><span>{formatPrice(subtotal)}</span></div>
        {coupon && (
          <div className="summary-row">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {t(S.promo)}: {coupon.code}
              <button className="coupon-chip" onClick={() => removeCoupon()} aria-label={`${t(S.removeCoupon)} ${coupon.code}`}>
                <Icon name="close" size={11} /> {t(S.removeCoupon)}
              </button>
            </span>
            <span style={{ color: 'var(--success)' }}>−{formatPrice(discount)}</span>
          </div>
        )}
        <div className="summary-row">
          <span>{t(S.standardShip)}</span>
          {cartDetailed.length === 0 ? <span>—</span> : hasItems ? <span className="free">{t(S.complimentary)}</span> : <span>{formatPrice(shipping)}</span>}
        </div>
        <div className="summary-row summary-row--total"><span>{t(S.total)}</span><span>{formatPrice(total)}</span></div>
      </div>
      {couponInput && (
        cartDetailed.length > 0 && (
          <div>
            <form className="coupon-row" onSubmit={submitCoupon}>
              <label className="visually-hidden" htmlFor="coupon">{t(S.promoCode)}</label>
              <input id="coupon" placeholder={t(S.promoCode)} value={code} onChange={(e) => setCode(e.target.value)} />
              <button type="submit" className="btn btn--outline btn--sm">{t(S.apply)}</button>
            </form>
            {msg && <p className={`form-note ${msg.ok ? '' : 'field-error'}`} role="status">{msg.message}</p>}
            <p className="form-note">{t(S.sampleCodes)}</p>
          </div>
        )
      )}
    </div>
  );
}

export default function CartPage() {
  const { cartDetailed, setQty, removeFromCart, setCartOpen } = useStore();
  const navigate = useNavigate();

  if (cartDetailed.length === 0) {
    return (
      <div className="page container">
        <div className="empty-state">
          <Icon name="bag" size={46} />
          <h3>{t(S.yourBagEmpty)}</h3>
          <p className="muted">{t(S.bagEmptyHint2)}</p>
          <Link className="btn btn--primary" to="/shop">{t(S.continueShopping)}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page container">
      <div className="page-head">
        <h1>{t(S.shoppingBag)}</h1>
        <p>{t(S.itemsInBag).replace('{n}', cartDetailed.length)}</p>
      </div>
      <div className="cart-page">
        <div>
          {cartDetailed.map((item) => (
            <div className="cart-row" key={`${item.productId}-${item.variantId}`}>
              <Link to={`/product/${item.product.slug}`}>
                <SmartImage src={item.product.images[0]} alt={item.product.name} />
              </Link>
              <div>
                <span className="product-card__brand">{item.product.brand}</span>
                <Link to={`/product/${item.product.slug}`} className="product-card__name" style={{ display: 'block', margin: '2px 0' }}>{item.product.name}</Link>
                {item.variant && <p className="small muted">{item.variant.name}</p>}
                {item.overStock && <p className="field-error">{t(S.quantityAdjusted).replace('{n}', item.product.stock)}</p>}
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 10 }}>
                  <Qty value={item.qty} max={item.maxQty} onChange={(q) => setQty(item.productId, item.variantId, q)} />
                  <button className="cart-item__remove" onClick={() => removeFromCart(item.productId, item.variantId)}>Remove</button>
                </div>
              </div>
              <div className="cart-item__end">
                <span className="cart-item__price">{formatPrice(item.lineTotal)}</span>
                <span className="small muted">{formatPrice(item.unitPrice)} {t(S.each)}</span>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link className="btn btn--outline" to="/shop">{t(S.continueShopping)}</Link>
            <button className="btn btn--outline" onClick={() => setCartOpen(true)}>{t(S.openQuickBag)}</button>
          </div>
        </div>
        <div>
          <CartSummary couponInput />
          <button className="btn btn--primary btn--block" style={{ marginTop: 14 }} onClick={() => navigate('/checkout')}>
            {t(S.proceedToCheckout)}
          </button>
          <p className="form-note" style={{ marginTop: 10, textAlign: 'center' }}>
            {t(S.demoCheckoutNote)}
          </p>
        </div>
      </div>
    </div>
  );
}
