"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Lang } from "./translations";
interface LangCtxType { lang: Lang; setLang: (l: Lang) => void; }
const LangCtx = createContext<LangCtxType>({ lang: 'he', setLang: () => {} });
export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('he');
  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
};
export const useLang = () => useContext(LangCtx);
