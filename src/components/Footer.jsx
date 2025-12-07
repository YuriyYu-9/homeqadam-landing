import { useContext } from "react";
import Container from "../layouts/Container";
import { LangContext } from "../i18n/context";

export default function Footer({ onOpenPrivacy, onOpenTerms }) {
  const { dict } = useContext(LangContext);

  return (
    <footer className="py-10 text-gray-300 bg-gray-900" id="contacts">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Логотип */}
          <div className="text-xl font-semibold">
            HomeQadam
          </div>

          {/* Навигация */}
          <div className="flex gap-6 text-sm">
            <a href="#services" className="hover:text-white">
              {dict.header.services}
            </a>
            <a href="#how" className="hover:text-white">
              {dict.header.how}
            </a>
            <a href="#about" className="hover:text-white">
              {dict.header.about}
            </a>
          </div>

          {/* Юридические ссылки */}
          <div className="flex gap-6 text-sm">
            <button
              onClick={onOpenPrivacy}
              className="underline hover:text-white"
            >
              {dict.footer.privacy}
            </button>

            <button
              onClick={onOpenTerms}
              className="underline hover:text-white"
            >
              {dict.footer.terms}
            </button>
          </div>
        </div>

        <div className="mt-10 text-xs text-center text-gray-500">
          © {new Date().getFullYear()} HomeQadam. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
