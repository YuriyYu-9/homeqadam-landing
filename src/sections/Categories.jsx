import { useContext } from "react";
import Container from "../layouts/Container";
import { categories } from "../assets/data/categories";
import { LangContext } from "../i18n/context";

export default function Categories() {
  const { dict } = useContext(LangContext);

  return (
    <section className="pt-20 pb-20 bg-white" id="services">
      <Container>
        <h2 className="mb-12 text-3xl font-bold text-center">
          {dict.categories.title}
        </h2>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((c) => {
            const Icon = c.icon;

            return (
              <div
                key={c.id}
                className="flex flex-col items-center justify-center py-10 transition shadow-sm cursor-pointer  bg-gray-50 rounded-xl hover:shadow-lg"
              >
                <Icon className="mb-4 text-4xl text-blue-600" />
                <div className="text-lg font-semibold text-center">
                  {dict.categoriesList[c.key]}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
