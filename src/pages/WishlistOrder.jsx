import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { formatPrice, PRODUCTS } from '../data/catalog.js';
import { Icon } from '../components/ui.jsx';

export function OrderConfirmation() {
  const { id } = useParams();
  const { orders } = useStore();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="page container">
        <div className="empty-state">
          <h3>Order not found</h3>
          <p className="muted">This order reference does not exist in this browser.</p>
          <Link className="btn btn--outline" to="/shop">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page container">
      <div className="order-confirm">
        <div className="order-confirm__icon"><Icon name="check" size={34} /></div>
        <h1 style={{ fontSize: 'clamp(28px, 3.4vw, 40px)' }}>Thank you, {order.info.name.split(' ')[0]}!</h1>
        <p className="muted" style={{ marginTop: 12 }}>
          Your demonstration order <strong>{order.id}</strong> has been recorded in this browser only.
          No payment was processed and no real order was placed.
        </p>
        <div className="order-box">
          {order.items.map((i) => (
            <div className="order-item-line" key={i.productId + (i.variant || '')}>
              <span><span className="n">{i.qty}×</span> {i.name}{i.variant ? ` — ${i.variant}` : ''}</span>
              <span>{formatPrice(i.unitPrice * i.qty)}</span>
            </div>
          ))}
          <div className="drawer__summary" style={{ marginTop: 14 }}>
            <div className="summary-row"><span>Subtotal</span><span>{formatPrice(order.totals.subtotal)}</span></div>
            {order.totals.discount > 0 && <div className="summary-row"><span>Discount</span><span>−{formatPrice(order.totals.discount)}</span></div>}
            <div className="summary-row"><span>Shipping</span><span>{order.totals.shipping === 0 ? 'Complimentary' : formatPrice(order.totals.shipping)}</span></div>
            <div className="summary-row summary-row--total"><span>Total</span><span>{formatPrice(order.totals.total)}</span></div>
          </div>
          <p className="form-note" style={{ marginTop: 14 }}>
            Delivering to: {order.info.address} · {order.info.delivery} · {order.info.payment}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
          <Link className="btn btn--primary" to="/shop">Continue Shopping</Link>
          <Link className="btn btn--outline" to="/account">View Order History</Link>
        </div>
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const items = wishlist.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  const moveAll = () => {
    items.filter((p) => p.stock > 0).forEach((p) => addToCart(p, null, 1, { openDrawer: false }));
  };

  if (items.length === 0) {
    return (
      <div className="page container">
        <div className="page-head"><h1>Wishlist</h1></div>
        <div className="empty-state">
          <Icon name="heart" size={46} />
          <h3>Your wishlist is empty</h3>
          <p className="muted">Tap the heart on any product to save it for later.</p>
          <Link className="btn btn--primary" to="/shop">Discover Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page container">
      <div className="page-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1>Wishlist</h1>
          <p>{items.length} saved item{items.length !== 1 && 's'}</p>
        </div>
        <button className="btn btn--outline" onClick={moveAll}>Move Available Items to Bag</button>
      </div>
      <div className="product-grid">
        {items.map((p) => (
          <div key={p.id}>
            <div className="product-card">
              <div className="product-card__media">
                <Link to={`/product/${p.slug}`}>
                  <img className="product-card__img-main" src={p.images[0]} alt={p.name} loading="lazy" />
                </Link>
                {p.stock === 0 && <div className="product-card__badges"><span className="badge badge--oos">Sold out</span></div>}
                <button className="product-card__wish is-active" aria-label={`Remove ${p.name} from wishlist`} onClick={() => toggleWishlist(p.id)}>
                  <Icon name="heart" />
                </button>
              </div>
              <div className="product-card__body">
                <span className="product-card__brand">{p.brand}</span>
                <Link to={`/product/${p.slug}`} className="product-card__name">{p.name}</Link>
                <div className="product-card__price-row"><span className="product-card__price">{formatPrice(p.price)}</span></div>
                <div className="product-card__cta">
                  <button className="btn btn--outline btn--sm btn--block" disabled={p.stock === 0} onClick={() => addToCart(p, null, 1)}>
                    {p.stock === 0 ? 'Sold Out' : 'Move to Bag'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
