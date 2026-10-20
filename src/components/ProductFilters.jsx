import React from 'react';
import { CATEGORIES, PRODUCTS, categoryName } from '../data/catalog.js';

/*
 * Product filters. Only attribute groups relevant to the currently
 * selected categories are shown (e.g. Skin Type appears for skincare only).
 */
export default function ProductFilters({ filters, onChange, relevantAttrs }) {
  const brands = [...new Set(PRODUCTS.map((p) => p.brand))].sort();

  const toggle = (group, value) => {
    const cur = filters[group] || [];
    const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
    onChange({ ...filters, [group]: next });
  };
  const setPrice = (min, max) => onChange({ ...filters, priceMin: min, priceMax: max });

  const groups = [
    { key: 'category', title: 'Category', options: CATEGORIES.map((c) => ({ value: c.id, label: c.name })) },
    { key: 'brand', title: 'Brand', options: brands.map((b) => ({ value: b, label: b })) },
  ];

  const attrGroups = Object.entries(relevantAttrs || {}).map(([key, values]) => ({
    key: `attr:${key}`,
    title: key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()),
    options: values.sort().map((v) => ({ value: v, label: v })),
  }));

  return (
    <div className="filters" role="group" aria-label="Product filters">
      {groups.map((g) => (
        <div className="filters__group" key={g.key}>
          <p className="filters__title">{g.title}</p>
          <div className="filters__options">
            {g.options.map((o) => {
              const count = PRODUCTS.filter((p) =>
                g.key === 'category' ? p.category === o.value : p.brand === o.value
              ).length;
              return (
                <label key={o.value} className="filter-check">
                  <input
                    type="checkbox"
                    checked={(filters[g.key] || []).includes(o.value)}
                    onChange={() => toggle(g.key, o.value)}
                  />
                  {o.label}
                  <span className="n">{count}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}

      <div className="filters__group">
        <p className="filters__title">Price</p>
        <div className="price-inputs">
          <label className="visually-hidden" htmlFor="f-min">Minimum price</label>
          <input id="f-min" type="number" min="0" placeholder="Min" value={filters.priceMin ?? ''} onChange={(e) => setPrice(e.target.value === '' ? null : Number(e.target.value), filters.priceMax)} />
          <span>–</span>
          <label className="visually-hidden" htmlFor="f-max">Maximum price</label>
          <input id="f-max" type="number" min="0" placeholder="Max" value={filters.priceMax ?? ''} onChange={(e) => setPrice(filters.priceMin, e.target.value === '' ? null : Number(e.target.value))} />
        </div>
      </div>

      <div className="filters__group">
        <p className="filters__title">Rating</p>
        <div className="filters__options">
          {[4.5, 4, 3.5].map((r) => (
            <label key={r} className="filter-check">
              <input type="checkbox" checked={filters.minRating === r} onChange={() => onChange({ ...filters, minRating: filters.minRating === r ? null : r })} />
              {r}+ ★
            </label>
          ))}
        </div>
      </div>

      <div className="filters__group">
        <p className="filters__title">Availability</p>
        <label className="filter-check">
          <input type="checkbox" checked={!!filters.inStockOnly} onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })} />
          In stock only
        </label>
      </div>

      {attrGroups.map((g) => (
        <div className="filters__group" key={g.key}>
          <p className="filters__title">{g.title}</p>
          <div className="filters__options">
            {g.options.map((o) => (
              <label key={o.value} className="filter-check">
                <input type="checkbox" checked={(filters[g.key] || []).includes(o.value)} onChange={() => toggle(g.key, o.value)} />
                {o.label}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
