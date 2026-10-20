import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { categoryName, formatPrice, variantPrice } from '../data/catalog.js';
import { PROMO_LABELS } from '../data/content.js';
import { t } from '../i18n/lang.js';
import { S } from '../i18n/strings.js';
import { Icon, SmartImage, Stars } from './ui.jsx';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.id);
  const onSale = product.originalPrice && product.originalPrice > product.price;
  const discount = onSale ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <article className="product-card">
      <div className="product-card__media">
        <div className="product-card__badges">
          {onSale && <span className="badge badge--sale">-{discount}%</span>}
          {product.isNew && <span className="badge badge--new">{t(PROMO_LABELS.new)}</span>}
          {product.bestseller && !onSale && !product.isNew && <span className="badge">{t(PROMO_LABELS.bestseller)}</span>}
          {product.stock === 0 && <span className="badge badge--oos">{t(S.soldOut)}</span>}
        </div>
        <button
          className={`product-card__wish ${wished ? 'is-active' : ''}`}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wished}
          onClick={() => toggleWishlist(product.id)}
        >
          <Icon name="heart" />
        </button>
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
          <SmartImage className="product-card__img-main" src={product.images[0]} alt={product.name} eager={false} />
          {product.images[1] && <SmartImage className="product-card__img-alt" src={product.images[1]} alt="" />}
        </Link>
      </div>
      <div className="product-card__body">
        <span className="product-card__brand">{product.brand}</span>
        <Link to={`/product/${product.slug}`} className="product-card__name">{product.name}</Link>
        <span className="product-card__cat">{categoryName(product.category)}</span>
        <Stars value={product.rating} count={product.reviewCount} />
        <div className="product-card__price-row">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          {onSale && <span className="product-card__price-original">{formatPrice(product.originalPrice)}</span>}
        </div>
        {product.stock > 0 && product.stock <= 10 && (
          <span className="product-card__stock product-card__stock--low">{t(S.onlyLeft).replace('{n}', product.stock)}</span>
        )}
        {product.stock === 0 && <span className="product-card__stock" style={{ color: 'var(--error)' }}>{t(S.outOfStock)}</span>}
        <div className="product-card__cta">
          <button
            className="btn btn--outline btn--sm btn--block"
            disabled={product.stock === 0}
            onClick={() => addToCart(product, null, 1)}
            aria-label={`Add ${product.name} to cart`}
          >
            {product.stock === 0 ? t(S.soldOut) : t(S.addToCart)}
          </button>
        </div>
      </div>
    </article>
  );
}
