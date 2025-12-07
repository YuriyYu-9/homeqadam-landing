import { useState, useContext } from "react";
import Container from "../layouts/Container";
import { LangContext } from "../i18n/context";

export default function Header() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const { lang, dict, changeLang } = useContext(LangContext);

  const toggleMobileMenu = () => setOpenMobileMenu((prev) => !prev);
  const closeMobileMenu = () => setOpenMobileMenu(false);

  return (
    <header className="sticky top-0 z-40 py-4 bg-white border-b">
      <Container className="flex items-center justify-between">
        {/* Лого */}
        <div className="text-xl font-bold text-blue-600">
          HomeQadam
        </div>

        {/* Десктоп-меню */}
        <nav className="hidden gap-8 text-sm md:flex">
          <a href="#services" className="hover:text-blue-600">
            {dict.header.services}
          </a>
          <a href="#how" className="hover:text-blue-600">
            {dict.header.how}
          </a>
          <a href="#contacts" className="hover:text-blue-600">
            {dict.header.contacts}
          </a>
          <a href="#about" className="hover:text-blue-600">
            {dict.header.about}
          </a>
        </nav>

        {/* Язык + бургер */}
        <div className="flex items-center gap-4">
          {/* Переключатель языка */}
          <select
            value={lang}
            onChange={(e) => changeLang(e.target.value)}
            className="px-2 py-1 text-sm bg-transparent border border-gray-200 rounded"
          >
            <option value="ru">RU</option>
            <option value="uz">UZ</option>
            <option value="en">EN</option>
          </select>

          {/* Бургер — только на мобиле */}
          <button
            type="button"
            className="flex flex-col justify-center gap-1 md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Меню"
          >
            <span className="block w-5 h-0.5 bg-gray-800" />
            <span className="block w-5 h-0.5 bg-gray-800" />
            <span className="block w-5 h-0.5 bg-gray-800" />
          </button>
        </div>
      </Container>

      {/* Мобильное меню */}
      {openMobileMenu && (
        <div className="bg-white border-t md:hidden">
          <Container className="py-4">
            <nav className="flex flex-col gap-4 text-sm">
              <a href="#services" onClick={closeMobileMenu}>
                {dict.header.services}
              </a>
              <a href="#how" onClick={closeMobileMenu}>
                {dict.header.how}
              </a>
              <a href="#contacts" onClick={closeMobileMenu}>
                {dict.header.contacts}
              </a>
              <a href="#about" onClick={closeMobileMenu}>
                {dict.header.about}
              </a>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
