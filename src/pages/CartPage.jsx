import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { formatPrice } from '../data/catalog.js';
import { SITE } from '../data/content.js';
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
      <h2>Order Summary</h2>
      <div className="drawer__summary">
        <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        {coupon && (
          <div className="summary-row">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Promo: {coupon.code}
              <button className="coupon-chip" onClick={() => removeCoupon()} aria-label={`Remove coupon ${coupon.code}`}>
                <Icon name="close" size={11} /> remove
              </button>
            </span>
            <span style={{ color: 'var(--success)' }}>−{formatPrice(discount)}</span>
          </div>
        )}
        <div className="summary-row">
          <span>Shipping (standard)</span>
          {cartDetailed.length === 0 ? <span>—</span> : hasItems ? <span className="free">Complimentary</span> : <span>{formatPrice(shipping)}</span>}
        </div>
        <div className="summary-row summary-row--total"><span>Total</span><span>{formatPrice(total)}</span></div>
      </div>
      {couponInput && (
        cartDetailed.length > 0 && (
          <div>
            <form className="coupon-row" onSubmit={submitCoupon}>
              <label className="visually-hidden" htmlFor="coupon">Promotional code</label>
              <input id="coupon" placeholder="Promo code" value={code} onChange={(e) => setCode(e.target.value)} />
              <button type="submit" className="btn btn--outline btn--sm">Apply</button>
            </form>
            {msg && <p className={`form-note ${msg.ok ? '' : 'field-error'}`} role="status">{msg.message}</p>}
            <p className="form-note">Sample codes: GLOW15 (15% off) · WELCOME10 (10% off)</p>
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
          <h3>Your bag is empty</h3>
          <p className="muted">Once you add products, they will appear here.</p>
          <Link className="btn btn--primary" to="/shop">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page container">
      <div className="page-head">
        <h1>Shopping Bag</h1>
        <p>{cartDetailed.length} item{cartDetailed.length !== 1 && 's'} in your bag</p>
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
                {item.overStock && <p className="field-error">Only {item.product.stock} available — quantity adjusted at checkout</p>}
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 10 }}>
                  <Qty value={item.qty} max={item.maxQty} onChange={(q) => setQty(item.productId, item.variantId, q)} />
                  <button className="cart-item__remove" onClick={() => removeFromCart(item.productId, item.variantId)}>Remove</button>
                </div>
              </div>
              <div className="cart-item__end">
                <span className="cart-item__price">{formatPrice(item.lineTotal)}</span>
                <span className="small muted">{formatPrice(item.unitPrice)} each</span>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link className="btn btn--outline" to="/shop">Continue Shopping</Link>
            <button className="btn btn--outline" onClick={() => setCartOpen(true)}>Open Quick Bag</button>
          </div>
        </div>
        <div>
          <CartSummary couponInput />
          <button className="btn btn--primary btn--block" style={{ marginTop: 14 }} onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
          <p className="form-note" style={{ marginTop: 10, textAlign: 'center' }}>
            Demonstration checkout — no payment is processed.
          </p>
        </div>
      </div>
    </div>
  );
}
