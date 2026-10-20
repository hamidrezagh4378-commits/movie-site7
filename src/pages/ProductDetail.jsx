import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery.jsx';
import ProductCarousel from '../components/ProductCarousel.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { Icon, Stars, Qty } from '../components/ui.jsx';
import { productBySlug, categoryName, relatedProducts, formatPrice, variantPrice, PRODUCTS } from '../data/catalog.js';
import { DEMO_REVIEWS, SITE } from '../data/content.js';
import { t, formatDate } from '../i18n/lang.js';
import { S } from '../i18n/strings.js';
import { useStore } from '../context/StoreContext.jsx';

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`pd-panel ${open ? 'pd-panel--open' : ''}`}>
      <button className="pd-panel__head" aria-expanded={open} onClick={() => setOpen(!open)}>
        {title}
        <span className="chev"><Icon name="plus" size={16} /></span>
      </button>
      {open && <div className="pd-panel__body">{children}</div>}
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = productBySlug(slug);
  const { addToCart, toggleWishlist, isWishlisted, viewProduct, recent, setCartOpen } = useStore();

  const [variantId, setVariantId] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      viewProduct(product.id);
      setVariantId(product.variants?.[0]?.id || null);
      setQty(1);
    }
    window.scrollTo(0, 0);
  }, [product?.id]);

  if (!product) {
    return (
      <div className="page container">
        <div className="empty-state">
          <h3>{t(S.productNotFound)}</h3>
          <Link className="btn btn--outline" to="/shop">{t(S.backToShop)}</Link>
        </div>
      </div>
    );
  }

  const variant = product.variants?.find((v) => v.id === variantId) || product.variants?.[0];
  const price = variantPrice(product, variantId);
  const onSale = product.originalPrice && product.originalPrice > product.price;
  const discount = onSale ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const wished = isWishlisted(product.id);
  const out = product.stock === 0;

  const reviews = DEMO_REVIEWS.filter((r) => r.product === product.name).length
    ? DEMO_REVIEWS.filter((r) => r.product === product.name)
    : DEMO_REVIEWS.slice(0, 2);

  const related = relatedProducts(product);
  const recentProducts = recent.map((id) => PRODUCTS.find((p) => p.id === id)).filter((p) => p && p.id !== product.id).slice(0, 4);

  const addNow = (goCheckout = false) => {
    if (out) return;
    addToCart(product, variantId, qty, { openDrawer: !goCheckout });
    if (goCheckout) navigate('/checkout');
  };

  return (
    <>
      <div className="container page" style={{ paddingBottom: 40 }}>
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">{t(S.home)}</Link><span className="sep">/</span>
          <Link to="/shop">{t(S.shop)}</Link><span className="sep">/</span>
          <Link to={`/shop?category=${product.category}`}>{categoryName(product.category)}</Link><span className="sep">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="pd-layout">
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          <div className="pd__info">
            <span className="pd__brand">{product.brand} · {categoryName(product.category)}</span>
            <h1 className="pd__title">{product.name}</h1>
            <div className="pd__rating">
              <Stars value={product.rating} />
              <span>{product.rating} · {product.reviewCount} {t(S.reviews)}</span>
            </div>
            <div className="pd__price-row">
              <span className="pd__price">{formatPrice(price)}</span>
              {onSale && <span className="pd__price-original">{formatPrice(product.originalPrice)}</span>}
              {onSale && <span className="badge badge--sale">-{discount}%</span>}
            </div>
            <p className={`pd__stock ${out ? 'pd__stock--out' : product.stock <= 10 ? 'pd__stock--low' : 'pd__stock--in'}`}>
              {out
                ? `✕ ${t(S.outOfStock)}`
                : product.stock <= 10
                  ? `● ${t(S.onlyLeft).replace('{n}', product.stock)} — ${t(S.orderSoon)}`
                  : `● ${t(S.inStock)} — ${t(S.availableCount).replace('{n}', product.stock)}`}
            </p>
            <p className="pd__desc">{product.description}</p>

            {product.variants?.length > 1 && (
              <div>
                <p className="pd__label" id="variant-label">{variant?.swatch ? t(S.shade) : t(S.sizeLabel)}</p>
                <div className="pd__variants" role="radiogroup" aria-labelledby="variant-label">
                  {product.variants.map((v) => {
                    const available = product.stock > 0;
                    return (
                      <button
                        key={v.id}
                        role="radio"
                        aria-checked={v.id === variantId}
                        className={`variant-btn ${v.id === variantId ? 'is-active' : ''}`}
                        disabled={!available}
                        onClick={() => setVariantId(v.id)}
                      >
                        {v.name}{v.priceDelta ? <span className="vp"> +{formatPrice(v.priceDelta)}</span> : ''}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <p className="pd__label">{t(S.quantity)}</p>
            <div className="pd__buy">
              <Qty value={qty} max={Math.max(1, product.stock)} onChange={setQty} />
              <button className="btn btn--primary" disabled={out} onClick={() => addNow(false)}>
                {out ? t(S.soldOut) : t(S.addToCart)}
              </button>
              <button className="btn btn--dark" disabled={out} onClick={() => addNow(true)}>{t(S.buyNow)}</button>
              <button
                className={`icon-btn product-card__wish ${wished ? 'is-active' : ''}`}
                style={{ position: 'static', width: 50, height: 50, border: '1px solid var(--border)' }}
                aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                aria-pressed={wished}
                onClick={() => toggleWishlist(product.id)}
              >
                <Icon name="heart" />
              </button>
            </div>
            <p className="form-note">SKU: {product.sku} · Size: {product.size}</p>

            <div className="pd__meta-list">
              <span><Icon name="truck" /> {t(S.pdShipNote1).replace('{a}', formatPrice(SITE.shippingFlat)).replace('{b}', formatPrice(SITE.freeShippingThreshold))}</span>
              <span><Icon name="return" /> {t(S.pdShipNote2)}</span>
              <span><Icon name="shield" /> {t(S.demoCheckoutNote)}</span>
            </div>

            <div className="pd-panels">
              <Accordion title={t(S.keyFeatures)} defaultOpen>
                <ul style={{ listStyle: 'disc', paddingLeft: 20 }}>
                  {product.specs.map((s) => <li key={s.label}>{s.label}: {s.value}</li>)}
                </ul>
              </Accordion>
              {product.ingredients && (
                <Accordion title={t(S.ingredients)}>
                  <p>{product.ingredients}</p>
                </Accordion>
              )}
              {product.usage && (
                <Accordion title={t(S.howToUse)}>
                  <p>{product.usage}</p>
                </Accordion>
              )}
              <Accordion title={t(S.specifications)}>
                <table className="spec-table">
                  <tbody>
                    {product.specs.map((s, i) => <tr key={i}><td>{s.label}</td><td>{s.value}</td></tr>)}
                    <tr><td>{t(S.sku)}</td><td>{product.sku}</td></tr>
                    <tr><td>{t(S.category)}</td><td>{categoryName(product.category)}</td></tr>
                  </tbody>
                </table>
              </Accordion>
              <Accordion title={t(S.shippingReturns)}>
                <p>{t(S.pdShipBody).replace('{a}', formatPrice(SITE.shippingFlat)).replace('{b}', formatPrice(SITE.freeShippingThreshold))} <Link to="/shipping-returns" style={{ textDecoration: 'underline' }}>{t(S.shippingReturns)}</Link></p>
              </Accordion>
            </div>
          </div>
        </div>

        <section className="pd-section" aria-label={t(S.customerReviews)}>
          <div className="pd-section__head">
            <h2 className="display-3">{t(S.customerReviews)}</h2>
            <Stars value={product.rating} count={product.reviewCount} />
          </div>
          {reviews.map((r) => (
            <div className="pd-review" key={r.name}>
              <div className="pd-review__head">
                <Stars value={r.rating} size={12} />
                <span className="pd-review__name">{r.name}</span>
                <span className="pd-review__date">{t(S.demoReview)}</span>
              </div>
              <p>{r.text}</p>
            </div>
          ))}
          <p className="review-sample-note">{t(S.reviewsNote)}</p>
        </section>

        {related.length > 0 && (
          <section className="pd-section" aria-label="Related products">
            <div className="pd-section__head"><h2 className="display-3">{t(S.youMayAlsoLike)}</h2></div>
            <div className="product-grid">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}

        {recentProducts.length > 0 && (
          <section className="pd-section" aria-label="Recently viewed">
            <div className="pd-section__head"><h2 className="display-3">{t(S.recentlyViewed)}</h2></div>
            <div className="product-grid">
              {recentProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>

      {/* Mobile sticky purchase bar */}
      <div className="sticky-buy">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="sb-name">{product.name}</div>
          <div className="sb-price">{formatPrice(price)}</div>
        </div>
        <button className="btn btn--primary" disabled={out} onClick={() => addNow(false)} aria-label={`Add ${product.name} to cart`}>
          {out ? t(S.soldOut) : t(S.addToCart)}
        </button>
      </div>
    </>
  );
}
