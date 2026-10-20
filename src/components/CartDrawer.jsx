import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { formatPrice } from '../data/catalog.js';
import { SITE } from '../data/content.js';
import { Icon, SmartImage, Qty } from './ui.jsx';

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cartDetailed, subtotal, itemCount, setQty, removeFromCart } = useStore();
  const navigate = useNavigate();
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setCartOpen(false);
    if (cartOpen) {
      window.addEventListener('keydown', onKey);
      setTimeout(() => closeRef.current?.focus(), 80);
    }
    return () => window.removeEventListener('keydown', onKey);
  }, [cartOpen, setCartOpen]);

  const remaining = Math.max(0, SITE.freeShippingThreshold - subtotal);

  return (
    <div className={`drawer ${cartOpen ? 'drawer--open' : ''}`} role="dialog" aria-modal="true" aria-label="Shopping bag" aria-hidden={!cartOpen}>
      <div className="drawer__scrim" onClick={() => setCartOpen(false)} />
      <div className="drawer__panel">
        <div className="drawer__head">
          <h2>Shopping Bag {itemCount > 0 && <span className="muted small">({itemCount})</span>}</h2>
          <button ref={closeRef} className="icon-btn" aria-label="Close bag" onClick={() => setCartOpen(false)}><Icon name="close" /></button>
        </div>

        {cartDetailed.length === 0 ? (
          <div className="cart-empty" style={{ margin: 'auto' }}>
            <Icon name="bag" size={44} />
            <p style={{ fontWeight: 500, color: 'var(--charcoal)' }}>Your bag is empty</p>
            <p className="small muted">Discover bestsellers, new arrivals and everyday essentials.</p>
            <button className="btn btn--primary" onClick={() => { setCartOpen(false); navigate('/shop'); }}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="drawer__body">
              {remaining > 0 && (
                <p className="ship-progress">Add {formatPrice(remaining)} more for complimentary standard shipping.</p>
              )}
              {cartDetailed.map((item) => (
                <div className="cart-item" key={`${item.productId}-${item.variantId}`}>
                  <Link to={`/product/${item.product.slug}`} onClick={() => setCartOpen(false)}>
                    <SmartImage src={item.product.images[0]} alt={item.product.name} />
                  </Link>
                  <div>
                    <Link to={`/product/${item.product.slug}`} onClick={() => setCartOpen(false)} className="cart-item__name">{item.product.name}</Link>
                    {item.variant && item.variant.name !== 'Standard' && <p className="cart-item__variant">{item.variant.name}</p>}
                    <Qty value={item.qty} max={item.maxQty} onChange={(q) => setQty(item.productId, item.variantId, q)} />
                    {item.overStock && <p className="field-error" style={{ marginTop: 4 }}>Only {item.product.stock} in stock</p>}
                  </div>
                  <div className="cart-item__end">
                    <span className="cart-item__price">{formatPrice(item.lineTotal)}</span>
                    <button className="cart-item__remove" onClick={() => removeFromCart(item.productId, item.variantId)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="drawer__foot">
              <div className="drawer__summary">
                <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="summary-row"><span>Shipping</span><span>Calculated at checkout</span></div>
              </div>
              <div className="drawer__actions">
                <button className="btn btn--primary btn--block" onClick={() => { setCartOpen(false); navigate('/checkout'); }}>Proceed to Checkout</button>
                <Link className="btn btn--outline btn--block" to="/cart" onClick={() => setCartOpen(false)}>View Bag</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
