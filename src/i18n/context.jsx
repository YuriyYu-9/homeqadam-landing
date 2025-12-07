import { createContext, useState, useEffect } from "react";
import { ru } from "./ru";
import { uz } from "./uz";
import { en } from "./en";

export const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState("ru");

  const dicts = { ru, uz, en };

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved) setLang(saved);
  }, []);

  const changeLang = (v) => {
    setLang(v);
    localStorage.setItem("lang", v);
  };

  const dict = dicts[lang];

  return (
    <LangContext.Provider value={{ lang, dict, changeLang }}>
      {children}
    </LangContext.Provider>
  );
}
