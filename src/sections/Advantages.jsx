import { useContext } from "react";
import Container from "../layouts/Container";
import { LangContext } from "../i18n/context";

export default function Advantages() {
  const { dict } = useContext(LangContext);
  const items = dict.advantagesList;

  return (
    <section className="pt-20 pb-20 bg-gray-50" id="advantages">
      <Container>
        <h2 className="mb-12 text-3xl font-bold text-center">
          {dict.advantages.title}
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="p-8 transition transform bg-white shadow-md rounded-xl hover:shadow-xl hover:-translate-y-1"
            >
              <div className="mb-4 text-4xl">{item.icon}</div>
              <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
