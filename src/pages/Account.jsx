import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { formatPrice } from '../data/catalog.js';
import { t, formatDate } from '../i18n/lang.js';
import { S } from '../i18n/strings.js';
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
      if (tab === 'register' && !form.name.trim()) errs.name = t(S.eNameShort);
      if (!EMAIL_RE.test(form.email)) errs.email = t(S.eEmail);
      if (form.password.length < 6) errs.password = t(S.ePassword);
      setErrors(errs);
      if (Object.keys(errs).length) return;
      // Demonstration only — credentials stay in this browser, never sent anywhere.
      signIn(form.name || form.email.split('@')[0], form.email);
      setMsg({ ok: true, text: t(S.signedInDemo) });
      navigate('/account');
    };

    return (
      <div className="page container">
        <div className="auth-card">
          <div className="auth-tabs" role="tablist">
            <button role="tab" aria-selected={tab === 'signin'} className={tab === 'signin' ? 'is-active' : ''} onClick={() => setTab('signin')}>{t(S.signIn)}</button>
            <button role="tab" aria-selected={tab === 'register'} className={tab === 'register' ? 'is-active' : ''} onClick={() => setTab('register')}>{t(S.register)}</button>
          </div>
          <p className="banner-msg banner-msg--info">{t(S.demoAccountNote)}</p>
          {msg && <p className="banner-msg banner-msg--success" role="status">{msg.text}</p>}
          <form onSubmit={submit} noValidate>
            {tab === 'register' && (
              <div className={`field ${errors.name ? 'has-error' : ''}`}>
                <label htmlFor="ac-name">{t(S.fullName)}</label>
                <input id="ac-name" className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                {errors.name && <p className="field-error" role="alert">{errors.name}</p>}
              </div>
            )}
            <div className={`field ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="ac-email">{t(S.email)}</label>
              <input id="ac-email" className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              {errors.email && <p className="field-error" role="alert">{errors.email}</p>}
            </div>
            <div className={`field ${errors.password ? 'has-error' : ''}`}>
              <label htmlFor="ac-pass">{t(S.password)}</label>
              <input id="ac-pass" className="input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              {errors.password && <p className="field-error" role="alert">{errors.password}</p>}
            </div>
            <button className="btn btn--primary btn--block" type="submit">{tab === 'signin' ? t(S.signIn) : t(S.createAccount)}</button>
          </form>
          <button
            className="btn-link"
            style={{ marginTop: 16, display: 'block', textAlign: 'center', width: '100%' }}
            onClick={() => setMsg({ ok: true, text: t(S.forgotPasswordMsg) })}
          >
            {t(S.forgotPassword)}
          </button>
        </div>
      </div>
    );
  }

  const [section, setSection] = useState('orders');
  const sections = [
    ['orders', `${t(S.orderHistory)} (${orders.length})`],
    ['wishlist', `${t(S.wishlist)} (${wishlist.length})`],
    ['profile', t(S.profile)],
  ];

  return (
    <div className="page container">
      <div className="page-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1>{t(S.myAccount)}</h1>
          <p>{t(S.welcomeBack).replace('{name}', user.name)}</p>
        </div>
        <button className="btn btn--outline btn--sm" onClick={signOut}>{t(S.signOut)}</button>
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
                <h3 style={{ fontSize: 20 }}>{t(S.noOrdersYet)}</h3>
                <p className="muted small">{t(S.noOrdersHint)}</p>
                <Link className="btn btn--primary" to="/shop">{t(S.startShopping)}</Link>
              </div>
            ) : (
              orders.map((o) => (
                <div className="order-card" key={o.id}>
                  <div>
                    <div style={{ fontWeight: 500 }}>{o.id}</div>
                    <div className="small muted">{formatDate(o.date)} · {o.items.length} · {formatPrice(o.totals.total)}</div>
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
              <p className="muted" style={{ marginBottom: 18 }}>{t(S.savedOnWishlist)}</p>
              <Link className="btn btn--outline" to="/wishlist">{t(S.openWishlist)}</Link>
            </div>
          )}
          {section === 'profile' && (
            <div className="summary-card" style={{ position: 'static' }}>
              <h2>{t(S.profileDemo)}</h2>
              <p className="small muted" style={{ marginBottom: 16 }}>{t(S.profileDemoHint)}</p>
              <div className="field">
                <label htmlFor="pr-name">{t(S.name)}</label>
                <input id="pr-name" className="input" defaultValue={user.name} readOnly />
              </div>
              <div className="field">
                <label htmlFor="pr-email">{t(S.email)}</label>
                <input id="pr-email" className="input" defaultValue={user.email} readOnly />
              </div>
              <p className="form-note">{t(S.profileDemoHint)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
