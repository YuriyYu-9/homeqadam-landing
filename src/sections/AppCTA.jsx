import { useContext } from "react";
import Container from "../layouts/Container";
import { LangContext } from "../i18n/context";

export default function AppCTA() {
  const { dict } = useContext(LangContext);

  return (
    <section className="py-20 bg-blue-600">
      <Container>
        <div className="flex flex-col items-center text-center text-white">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {dict.appCta.title}
          </h2>

          <p className="max-w-2xl mb-8 text-base text-blue-100 md:text-lg">
            {dict.appCta.text}
          </p>

          <a
            href="https://osonlyapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 text-lg font-semibold text-blue-600 transition bg-white rounded-xl hover:bg-blue-50"
          >
            {dict.appCta.button}
          </a>
        </div>
      </Container>
    </section>
  );
}
