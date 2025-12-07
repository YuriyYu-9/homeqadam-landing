import { useContext } from "react";
import Container from "../layouts/Container";
import { LangContext } from "../i18n/context";

export default function About() {
  const { dict } = useContext(LangContext);

  return (
    <section className="pt-20 pb-24 bg-white" id="about">
      <Container>
        <h2 className="mb-8 text-3xl font-bold text-center">
          {dict.about.title}
        </h2>

        <div className="max-w-3xl mx-auto text-lg leading-relaxed text-center text-gray-700">
          <p className="mb-6">{dict.about.p1}</p>
          <p className="mb-6">{dict.about.p2}</p>
          <p>{dict.about.p3}</p>
        </div>
      </Container>
    </section>
  );
}
