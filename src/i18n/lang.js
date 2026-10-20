/* Lightweight language layer — 'en' | 'fa' (Persian, RTL).
 * Data modules read getLang() at render time; LangContext triggers a full
 * remount on change so every string re-renders in the active language.
 */
let lang = 'en';
try {
  lang = localStorage.getItem('lb_lang') === 'fa' ? 'fa' : 'en';
} catch { /* storage unavailable */ }

const listeners = new Set();

export const getLang = () => lang;
export const isFa = () => lang === 'fa';

export function setLangModule(l) {
  lang = l === 'fa' ? 'fa' : 'en';
  try { localStorage.setItem('lb_lang', lang); } catch { /* ignore */ }
  listeners.forEach((fn) => fn());
}

export function onLangChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/* t({ en: 'Add to Cart', fa: 'افزودن به سبد' }) — also passes plain strings through */
export function t(pair) {
  if (typeof pair === 'string') return pair;
  if (!pair) return '';
  return (lang === 'fa' && pair.fa != null ? pair.fa : pair.en) ?? '';
}

/* Locale-aware date: Persian calendar in Persian, Gregorian in English. */
export function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(lang === 'fa' ? 'fa-IR' : 'en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  } catch {
    return iso;
  }
}
