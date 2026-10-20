import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { formatPrice } from '../data/catalog.js';
import { Icon } from '../components/ui.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Demonstration account: local-only, clearly labelled. No real authentication. */
export default function Account({ initialTab }) {
  const { user, signIn, signOut, orders, wishlist } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const startTab = initialTab || (location.pathname === '/register' ? 'register' : 'signin');
  const [tab, setTab] = useState(startTab);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => setTab(startTab), [startTab]);

  if (!user) {
    const submit = (e) => {
      e.preventDefault();
      const errs = {};
      if (tab === 'register' && !form.name.trim()) errs.name = 'Please enter your name.';
      if (!EMAIL_RE.test(form.email)) errs.email = 'Please enter a valid email address.';
      if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.';
      setErrors(errs);
      if (Object.keys(errs).length) return;
      // Demonstration only — credentials stay in this browser, never sent anywhere.
      signIn(form.name || form.email.split('@')[0], form.email);
      setMsg({ ok: true, text: 'Signed in (demonstration account stored in this browser only).' });
      navigate('/account');
    };

    return (
      <div className="page container">
        <div className="auth-card">
          <div className="auth-tabs" role="tablist">
            <button role="tab" aria-selected={tab === 'signin'} className={tab === 'signin' ? 'is-active' : ''} onClick={() => setTab('signin')}>Sign In</button>
            <button role="tab" aria-selected={tab === 'register'} className={tab === 'register' ? 'is-active' : ''} onClick={() => setTab('register')}>Register</button>
          </div>
          <p className="banner-msg banner-msg--info">
            Demonstration account — credentials are kept in this browser only and never sent to a server. Connect a real authentication backend here.
          </p>
          {msg && <p className="banner-msg banner-msg--success" role="status">{msg.text}</p>}
          <form onSubmit={submit} noValidate>
            {tab === 'register' && (
              <div className={`field ${errors.name ? 'has-error' : ''}`}>
                <label htmlFor="ac-name">Full name</label>
                <input id="ac-name" className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                {errors.name && <p className="field-error" role="alert">{errors.name}</p>}
              </div>
            )}
            <div className={`field ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="ac-email">Email</label>
              <input id="ac-email" className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              {errors.email && <p className="field-error" role="alert">{errors.email}</p>}
            </div>
            <div className={`field ${errors.password ? 'has-error' : ''}`}>
              <label htmlFor="ac-pass">Password</label>
              <input id="ac-pass" className="input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              {errors.password && <p className="field-error" role="alert">{errors.password}</p>}
            </div>
            <button className="btn btn--primary btn--block" type="submit">{tab === 'signin' ? 'Sign In' : 'Create Account'}</button>
          </form>
          <button
            className="btn-link"
            style={{ marginTop: 16, display: 'block', textAlign: 'center', width: '100%' }}
            onClick={() => setMsg({ ok: true, text: 'In a live store a password-reset email would be sent. No email infrastructure is connected in this demonstration.' })}
          >
            Forgot your password?
          </button>
        </div>
      </div>
    );
  }

  const [section, setSection] = useState('orders');
  const sections = [
    ['orders', `Order History (${orders.length})`],
    ['wishlist', `Wishlist (${wishlist.length})`],
    ['profile', 'Profile'],
  ];

  return (
    <div className="page container">
      <div className="page-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1>My Account</h1>
          <p>Welcome back, {user.name}.</p>
        </div>
        <button className="btn btn--outline btn--sm" onClick={signOut}>Sign Out</button>
      </div>
      <div className="account-layout">
        <nav className="account-nav" aria-label="Account sections">
          {sections.map(([key, label]) => (
            <button key={key} className={section === key ? 'is-active' : ''} onClick={() => setSection(key)}>{label}</button>
          ))}
        </nav>
        <div>
          {section === 'orders' && (
            orders.length === 0 ? (
              <div className="empty-state" style={{ padding: '40px 10px' }}>
                <Icon name="bag" size={40} />
                <h3 style={{ fontSize: 20 }}>No orders yet</h3>
                <p className="muted small">Demonstration orders placed in this browser will appear here.</p>
                <Link className="btn btn--primary" to="/shop">Start Shopping</Link>
              </div>
            ) : (
              orders.map((o) => (
                <div className="order-card" key={o.id}>
                  <div>
                    <div style={{ fontWeight: 500 }}>{o.id}</div>
                    <div className="small muted">{new Date(o.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} · {o.items.length} item{o.items.length !== 1 && 's'} · {formatPrice(o.totals.total)}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span className="status-pill">{o.status}</span>
                    <Link className="btn-link" to={`/order/${o.id}`}>View <span className="arrow">→</span></Link>
                  </div>
                </div>
              ))
            )
          )}
          {section === 'wishlist' && (
            <div>
              <p className="muted" style={{ marginBottom: 18 }}>Your saved products live on the wishlist page.</p>
              <Link className="btn btn--outline" to="/wishlist">Open Wishlist</Link>
            </div>
          )}
          {section === 'profile' && (
            <div className="summary-card" style={{ position: 'static' }}>
              <h2>Profile (demonstration)</h2>
              <p className="small muted" style={{ marginBottom: 16 }}>Stored in this browser only — never sent to a server. Saved addresses and real profiles belong to a secure backend.</p>
              <div className="field">
                <label htmlFor="pr-name">Name</label>
                <input id="pr-name" className="input" defaultValue={user.name} readOnly />
              </div>
              <div className="field">
                <label htmlFor="pr-email">Email</label>
                <input id="pr-email" className="input" defaultValue={user.email} readOnly />
              </div>
              <p className="form-note">Connect a real customer-account backend to make this editable and persistent across devices.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
