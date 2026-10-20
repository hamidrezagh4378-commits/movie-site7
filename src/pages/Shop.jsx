import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import ProductFilters from '../components/ProductFilters.jsx';
import { Icon } from '../components/ui.jsx';
import { PRODUCTS, categoryName } from '../data/catalog.js';
import { useStore } from '../context/StoreContext.jsx';
import { t } from '../i18n/lang.js';
import { S } from '../i18n/strings.js';

const SORTS = [
  ['popularity', S.mostPopular],
  ['price-asc', S.priceLowHigh],
  ['price-desc', S.priceHighLow],
  ['newest', S.newest],
  ['rating', S.customerRating],
];

const PAGE_SIZE = 9;

const activeAttrValues = (products, key) =>
  [...new Set(products.flatMap((p) => p.attributes?.[key] || []))].filter(Boolean);

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const urlCategory = params.get('category');
  const collection = params.get('collection');

  const [filters, setFilters] = useState({ category: urlCategory ? [urlCategory] : [], brand: [], priceMin: null, priceMax: null, minRating: null, inStockOnly: false });
  const [sort, setSort] = useState('popularity');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { setCartOpen } = useStore();
  const topRef = useRef(null);

  useEffect(() => {
    setFilters((f) => ({ ...f, category: urlCategory ? [urlCategory] : [] }));
    setVisible(PAGE_SIZE);
  }, [urlCategory, q, collection]);

  // Relevant attribute groups for the selected categories (union)
  const relevantAttrs = useMemo(() => {
    const cats = filters.category.length ? filters.category : null;
    const pool = cats ? PRODUCTS.filter((p) => cats.includes(p.category)) : PRODUCTS;
    const keys = [...new Set(pool.flatMap((p) => Object.keys(p.attributes || [])))];
    const out = {};
    keys.forEach((k) => { const vals = activeAttrValues(pool, k); if (vals.length) out[k] = vals; });
    return out;
  }, [filters.category]);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (q && !`${p.name} ${p.brand} ${p.description}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (filters.category.length && !filters.category.includes(p.category)) return false;
      if (filters.brand.length && !filters.brand.includes(p.brand)) return false;
      if (filters.priceMin != null && p.price < filters.priceMin) return false;
      if (filters.priceMax != null && p.price > filters.priceMax) return false;
      if (filters.minRating && p.rating < filters.minRating) return false;
      if (filters.inStockOnly && p.stock === 0) return false;
      if (collection === 'bestsellers' && !p.bestseller) return false;
      if (collection === 'new' && !p.isNew) return false;
      if (collection === 'sale' && !(p.originalPrice && p.originalPrice > p.price)) return false;
      // Attribute filters
      for (const [fKey, values] of Object.entries(filters)) {
        if (!fKey.startsWith('attr:') || !values?.length) continue;
        const attrKey = fKey.slice(5);
        const pvals = p.attributes?.[attrKey] || [];
        if (!values.some((v) => pvals.includes(v))) return false;
      }
      return true;
    });
    const order = { 'price-asc': (a, b) => a.price - b.price, 'price-desc': (a, b) => b.price - a.price, newest: (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.reviewCount - a.reviewCount, rating: (a, b) => b.rating - a.rating, popularity: (a, b) => b.reviewCount - a.reviewCount };
    list = [...list].sort(order[sort] || order.popularity);
    return list;
  }, [q, filters, sort, collection]);

  const chips = [];
  filters.category.forEach((c) => chips.push({ group: 'category', value: c, label: categoryName(c) }));
  filters.brand.forEach((b) => chips.push({ group: 'brand', value: b, label: b }));
  if (filters.priceMin != null || filters.priceMax != null) chips.push({ group: 'price', label: `$${filters.priceMin ?? 0} – $${filters.priceMax ?? '∞'}` });
  if (filters.minRating) chips.push({ group: 'minRating', label: `${filters.minRating}+ ★` });
  if (filters.inStockOnly) chips.push({ group: 'inStockOnly', label: t(S.inStockChip) });
  Object.entries(filters).forEach(([k, v]) => {
    if (k.startsWith('attr:') && v?.length) v.forEach((val) => chips.push({ group: k, value: val, label: val }));
  });

  const removeChip = (chip) => {
    if (chip.group === 'price') setFilters({ ...filters, priceMin: null, priceMax: null });
    else if (chip.group === 'minRating') setFilters({ ...filters, minRating: null });
    else if (chip.group === 'inStockOnly') setFilters({ ...filters, inStockOnly: false });
    else {
      const cur = filters[chip.group] || [];
      setFilters({ ...filters, [chip.group]: cur.filter((x) => x !== chip.value) });
    }
  };

  const clearAll = () => {
    setFilters({ category: [], brand: [], priceMin: null, priceMax: null, minRating: null, inStockOnly: false });
    if (q) setParams({});
  };

  const shown = filtered.slice(0, visible);

  const filtersPanel = (
    <ProductFilters filters={filters} onChange={(f) => { setFilters(f); setVisible(PAGE_SIZE); }} relevantAttrs={relevantAttrs} />
  );

  return (
    <div className="page">
      <div className="container" ref={topRef}>
        <div className="page-head">
          <span className="eyebrow eyebrow--rose">
            {q ? t(S.searchResults) : collection ? t(S.collection) : filters.category.length === 1 ? categoryName(filters.category[0]) : t(S.shopAllTitle)}
          </span>
          <h1>{q ? `“${q}”` : collection ? collection === 'bestsellers' ? t(S.bestsellersTitle) : collection === 'sale' ? t(S.saleTitle) : t(S.newArrivalsTitle) : filters.category.length === 1 ? categoryName(filters.category[0]) : t(S.shopAllTitle)}</h1>
          <p>{t(S.shopSubtitle)}</p>
        </div>

        <div className="shop-layout">
          <aside className="shop-sidebar" aria-label="Filters">
            {filtersPanel}
          </aside>

          <div>
            <div className="shop-toolbar">
              <span className="shop-toolbar__count" aria-live="polite">
                {t(S.productsCount).replace('{n}', filtered.length)}
                {q && ` ${t(S.forQuery).replace('{q}', q)}`}
              </span>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <button className="filters-toggle" aria-expanded={drawerOpen} onClick={() => setDrawerOpen(true)}>
                  <Icon name="filter" size={15} /> {t(S.filters)}
                </button>
                <label className="visually-hidden" htmlFor="sort">{t(S.sortProducts)}</label>
                <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                  {SORTS.map(([v, l]) => <option key={v} value={v}>{t(l)}</option>)}
                </select>
              </div>
            </div>

            {chips.length > 0 && (
              <div className="chips">
                {chips.map((c, i) => (
                  <button key={`${c.group}-${c.value}-${i}`} className="chip" onClick={() => removeChip(c)}>
                    {c.label} <Icon name="close" size={11} />
                  </button>
                ))}
                <button className="chip chip--clear" onClick={clearAll}>{t(S.clearAll)}</button>
              </div>
            )}

            {shown.length === 0 ? (
              <div className="empty-state">
                <Icon name="search" size={46} />
                <h3>{t(S.noProductsMatch)}</h3>
                <p className="muted">{t(S.tryAdjusting)}</p>
                <button className="btn btn--outline" onClick={clearAll}>{t(S.clearAllFilters)}</button>
              </div>
            ) : (
              <>
                <div className="product-grid">
                  {shown.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
                {visible < filtered.length && (
                  <div className="load-more">
                    <button className="btn btn--outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                      {t(S.loadMore)} {t(S.remaining).replace('{n}', filtered.length - visible)}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div className={`drawer filter-drawer ${drawerOpen ? 'drawer--open' : ''}`} role="dialog" aria-modal="true" aria-label="Filters" aria-hidden={!drawerOpen}>
        <div className="drawer__scrim" onClick={() => setDrawerOpen(false)} />
        <div className="drawer__panel">
          <div className="drawer__head">
            <h2>{t(S.filters)}</h2>
            <button className="icon-btn" aria-label="Close filters" onClick={() => setDrawerOpen(false)}><Icon name="close" /></button>
          </div>
          <div className="drawer__body">{filtersPanel}</div>
          <div className="drawer__foot">
            <button className="btn btn--primary btn--block" onClick={() => setDrawerOpen(false)}>{t(S.showNProducts).replace('{n}', filtered.length)}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
