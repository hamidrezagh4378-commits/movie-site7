import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../data/content.js';
import { Icon } from './ui.jsx';

const SHOP_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/shop?category=skincare', label: 'Skincare' },
  { to: '/shop?category=makeup', label: 'Makeup' },
  { to: '/shop?category=haircare', label: 'Haircare' },
  { to: '/shop?category=bodycare', label: 'Body Care' },
];

const INFO_LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
  { to: '/faq', label: 'FAQ' },
  { to: '/shipping-returns', label: 'Shipping & Returns' },
  { to: '/journal', label: 'Beauty Journal' },
];

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // {ok, message}
  const submit = (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setStatus({ ok: false, message: 'Please enter a valid email address.' });
      return;
    }
    // No email backend connected — demonstration subscription only.
    setStatus({ ok: true, message: 'Subscribed (demonstration — no email was sent).' });
    setEmail('');
  };
  return (
    <div>
      <p style={{ fontSize: 14, color: '#c4b3ba' }}>Subscribe for special offers, beauty tips and more.</p>
      <form className="newsletter-form" onSubmit={submit} noValidate>
        <label htmlFor="nl-email" className="visually-hidden">Email address</label>
        <input id="nl-email" type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={status && !status.ok} />
        <button type="submit">Subscribe</button>
      </form>
      {status && <p className={`newsletter-msg ${status.ok ? 'newsletter-msg--ok' : 'newsletter-msg--err'}`} role="status">{status.message}</p>}
    </div>
  );
}

export default function Footer() {
  const social = [
    ['Instagram', SITE.social.instagram, <path key="i" d="M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM17.2 6.8h.01" />],
    ['Pinterest', SITE.social.pinterest, <path key="p" d="M12 3a9 9 0 00-3.3 17.4c-.1-.8-.2-2 .1-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.5 1.9-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.3-.9 3.6-.3 1.1.5 2 1.6 2 2 0 3.5-2.1 3.5-5.1 0-2.7-1.9-4.5-4.7-4.5a4.9 4.9 0 00-5.1 4.9c0 1 .4 2 .9 2.6l-.4 1.4" />],
    ['TikTok', SITE.social.tiktok, <path key="t" d="M15 4c.4 2.1 1.9 3.6 4 3.9v3c-1.6 0-3-.5-4-1.3v5.9A5.5 5.5 0 119.5 10v3.1a2.5 2.5 0 102.5 2.5V4H15z" />],
  ];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <Link to="/" className="logo" aria-label="Lumière Beauty — home">
              <span className="logo__mark">✦</span>
              <span className="logo__text">LUMIÈRE <em style={{ color: '#e8c9a8' }}>BEAUTY</em></span>
            </Link>
            <p className="footer__desc">{SITE.tagline}</p>
            <div className="footer__social">
              {social.map(([label, href, path]) => (
                <a key={label} href={href} aria-label={label} onClick={(e) => href === '#' && e.preventDefault()}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{path}</svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>{SHOP_LINKS.map((l) => <li key={l.label}><Link to={l.to}>{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Customer Care</h4>
            <ul>{INFO_LINKS.map((l) => <li key={l.label}><Link to={l.to}>{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Newsletter</h4>
            <NewsletterForm />
            <div className="footer__contact" style={{ marginTop: 20 }}>
              <span>Email: {SITE.contact.email}</span>
              <span>Support hours: {SITE.contact.hours}</span>
            </div>
            <p className="footer__note">Contact details are editable placeholders — no real business information is implied.</p>
          </div>
        </div>
        <div className="footer__bottom">
          <span className="footer__copyright">© {new Date().getFullYear()} Lumière Beauty. All rights reserved.</span>
          <div className="footer__legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
            <Link to="/shipping-returns">Shipping &amp; Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
