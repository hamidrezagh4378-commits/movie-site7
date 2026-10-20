import React, { useEffect, useRef, useState } from 'react';

/* Reveal-on-scroll wrapper (respects reduced motion via CSS) */
export function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

/* Image with graceful fallback — a styled block with a monogram */
export function SmartImage({ src, alt, className = '', monogram, eager = false, ...rest }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div className={`img-fallback ${className}`} role="img" aria-label={alt}>
        <span>{(monogram || alt || 'L').trim().charAt(0)}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}

/* Star rating (half-star free; render full/empty only for simplicity) */
export function Stars({ value = 0, count, size = 13 }) {
  const stars = [1, 2, 3, 4, 5].map((i) => i <= Math.round(value));
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }} aria-label={`Rated ${value} out of 5${count ? `, ${count} reviews` : ''}`}>
      <span style={{ display: 'inline-flex', gap: 1 }}>
        {stars.map((filled, i) => (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.4" style={{ color: '#c2a06b' }} aria-hidden="true">
            <path d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.3 1.3-6.6L2.5 9.5l6.6-.8L12 2.5z" />
          </svg>
        ))}
      </span>
      {count !== undefined && <span style={{ fontSize: 12.5, color: 'var(--text-soft)' }}>({count})</span>}
    </span>
  );
}

/* Section heading block */
export function SectionHead({ eyebrow, title, text, split = false, children }) {
  const cls = split ? 'section-head section-head--split' : 'section-head';
  return (
    <div className={cls}>
      <div>
        {eyebrow && <span className="eyebrow eyebrow--rose">{eyebrow}</span>}
        <h2 className="display-2">{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {children}
    </div>
  );
}

/* Quantity selector */
export function Qty({ value, min = 1, max = 99, onChange, label = 'Quantity' }) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button type="button" aria-label="Decrease quantity" disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))}>−</button>
      <span aria-live="polite">{value}</span>
      <button type="button" aria-label="Increase quantity" disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))}>+</button>
    </div>
  );
}

/* Simple SVG icon set */
const paths = {
  search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" /></>,
  heart: <path d="M12 21C7 16.5 3 13.2 3 8.9 3 6 5.2 4 7.8 4c1.7 0 3.3.9 4.2 2.3C12.9 4.9 14.5 4 16.2 4 18.8 4 21 6 21 8.9c0 4.3-4 7.6-9 12.1z" />,
  bag: <><path d="M6 8h12l1 13H5L6 8z" /><path d="M9 8V6a3 3 0 016 0v2" /></>,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  arrowRight: <path d="M4 12h16m-6-6l6 6-6 6" />,
  chevronLeft: <path d="M15 5l-7 7 7 7" />,
  chevronRight: <path d="M9 5l7 7-7 7" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  leaf: <><path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15z" /><path d="M5 19c3-5 7-8 11-9" /></>,
  shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" /></>,
  return: <><path d="M3 12a9 9 0 109-9 9.7 9.7 0 00-6.7 2.7L3 8" /><path d="M3 3v5h5" /></>,
  chat: <><path d="M21 12a8 8 0 01-8 8H4l2-3a8 8 0 1115-5z" /></>,
  gem: <><path d="M6 3h12l3 6-9 12L3 9l3-6z" /><path d="M3 9h18M12 3l-3 6 3 12 3-12-3-6" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" /></>,
  moon: <path d="M20 14A8.5 8.5 0 019.5 3.5 8.5 8.5 0 1020 14z" />,
  brush: <><circle cx="12" cy="12" r="8" /><circle cx="9" cy="10" r="0.8" fill="currentColor" /><circle cx="13" cy="9" r="0.8" fill="currentColor" /><circle cx="14.5" cy="13" r="0.8" fill="currentColor" /></>,
  drop: <path d="M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z" />,
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="M5 13l4 4L19 7" />,
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  truck: <><path d="M1 6h14v10H1zM15 9h4l3 3v4h-7z" /><circle cx="6" cy="18" r="1.6" /><circle cx="18" cy="18" r="1.6" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></>,
};

export function Icon({ name, size = 18, className = '', ...rest }) {
  const solid = name === 'heart';
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={solid ? 'none' : 'none'}
      stroke="currentColor"
      strokeWidth={solid ? 1.6 : 1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

/* Small toast-free feedback: inline status via aria-live region */
export function LiveStatus({ children }) {
  return <span className="visually-hidden" aria-live="polite">{children}</span>;
}
