import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getLang, setLangModule } from './lang.js';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(getLang());

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'fa' ? 'rtl' : 'ltr';
    html.classList.toggle('lang-fa', lang === 'fa');
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang: (l) => { setLangModule(l); setLangState(l); },
      toggle: () => {
        const next = getLang() === 'fa' ? 'en' : 'fa';
        setLangModule(next);
        setLangState(next);
      },
    }),
    [lang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
