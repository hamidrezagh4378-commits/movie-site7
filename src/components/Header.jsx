import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { PRODUCTS, formatPrice } from '../data/catalog.js';
import { SITE } from '../data/content.js';
import { Icon, SmartImage } from './ui.jsx';

function AnnouncementBar() {
  const { announcement } = SITE;
  return (
    <div className="announce">
      <Link to={announcement.href}>
        <strong>{announcement.strong}</strong> · {announcement.rest}
      </Link>
    </div>
  );
}

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/shop?category=skincare', label: 'Skincare' },
  { to: '/shop?category=makeup', label: 'Makeup' },
  { to: '/shop?category=haircare', label: 'Haircare' },
  { to: '/shop?category=bodycare', label: 'Body Care' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);
  useEffect(() => {
    if (open) {
      setQ('');
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      const onKey = (e) => e.key === 'Escape' && onClose();
      window.addEventListener('keydown', onKey);
      return () => { clearTimeout(t); window.removeEventListener('keydown', onKey); };
    }
  }, [open, onClose]);
  if (!open) return null;
  const results = q.trim().length >= 2
    ? PRODUCTS.filter((p) => `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 6)
    : [];
  const go = (slug) => { onClose(); navigate(`/product/${slug}`); };
  return (
    <div className={`search-overlay ${open ? 'search-overlay--open' : ''}`} role="dialog" aria-modal="true" aria-label="Search products">
      <div className="search-overlay__scrim" onClick={onClose} />
      <div className="search-overlay__panel">
        <div className="container">
          <form
            className="search-overlay__bar"
            onSubmit={(e) => { e.preventDefault(); if (q.trim()) { onClose(); navigate(`/shop?q=${encodeURIComponent(q.trim())}`); } }}
          >
            <Icon name="search" size={20} />
            <input
              ref={inputRef}
              type="search"
              placeholder="Search serums, lipsticks, masks…"
              aria-label="Search products"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button type="button" className="icon-btn" aria-label="Close search" onClick={onClose}><Icon name="close" /></button>
          </form>
          {results.length > 0 && (
            <div className="search-results">
              {results.map((p) => (
                <button key={p.id} className="search-result" style={{ width: '100%', border: 0, background: 'none', textAlign: 'left', cursor: 'pointer' }} onClick={() => go(p.slug)}>
                  <SmartImage src={p.images[0]} alt={p.name} />
                  <span className="search-result__meta">
                    <span className="brand" style={{ display: 'block' }}>{p.brand}</span>
                    <span className="name">{p.name}</span>
                  </span>
                  <span style={{ fontWeight: 600, fontSize: 13.5 }}>{formatPrice(p.price)}</span>
                </button>
              ))}
            </div>
          )}
          {q.trim().length >= 2 && results.length === 0 && (
            <p className="search-results__empty">No products match “{q}”. Try “serum”, “lipstick” or “mask”.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ open, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  return (
    <div className={`mobile-menu ${open ? 'mobile-menu--open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
      <div className="mobile-menu__scrim" onClick={onClose} />
      <div className="mobile-menu__panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="logo__text">Menu</span>
          <button className="icon-btn" aria-label="Close menu" onClick={onClose}><Icon name="close" /></button>
        </div>
        <nav>
          {NAV.map((n) => (
            <NavLink key={n.label} to={n.to} end={n.to === '/'} onClick={onClose}>{n.label}</NavLink>
          ))}
        </nav>
        <div className="mobile-menu__foot">
          <Link to="/account" className="btn btn--outline btn--block" onClick={onClose}>Account</Link>
          <Link to="/wishlist" className="btn btn--outline btn--block" onClick={onClose}>Wishlist</Link>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, wishlist, setCartOpen, user } = useStore();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [location.pathname, location.search]);

  return (
    <>
      <AnnouncementBar />
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="container header__inner">
          <button className="icon-btn hamburger" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
            <Icon name="menu" />
          </button>

          <Link to="/" className="logo" aria-label="Lumière Beauty — home">
            <span className="logo__mark">✦</span>
            <span>
              <span className="logo__text">LUMIÈRE <em>BEAUTY</em></span>
              <span className="logo__sub">SKIN · COLOR · CARE</span>
            </span>
          </Link>

          <nav className="nav" aria-label="Primary">
            {NAV.map((n) => (
              <NavLink key={n.label} to={n.to} end={n.to === '/'}>{n.label}</NavLink>
            ))}
          </nav>

          <div className="header__actions">
            <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(true)}><Icon name="search" /></button>
            <Link className="icon-btn" aria-label={user ? `Account (${user.name})` : 'Account'} to="/account"><Icon name="user" /></Link>
            <Link className="icon-btn" aria-label={`Wishlist, ${wishlist.length} items`} to="/wishlist">
              <Icon name="heart" />
              {wishlist.length > 0 && <span className="icon-btn__count">{wishlist.length}</span>}
            </Link>
            <button className="icon-btn" aria-label={`Shopping bag, ${itemCount} items`} onClick={() => setCartOpen(true)}>
              <Icon name="bag" />
              {itemCount > 0 && <span className="icon-btn__count">{itemCount}</span>}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
