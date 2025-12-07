import { useContext } from "react";
import Container from "../layouts/Container";
import { steps } from "../assets/data/howItWorks";
import { LangContext } from "../i18n/context";

export default function HowItWorks() {
  const { dict } = useContext(LangContext);
  const stepsList = dict.stepsList;

  return (
    <section className="pt-20 pb-20 bg-gray-50" id="how">
      <Container>
        <h2 className="mb-12 text-3xl font-bold text-center">
          {dict.how.title}
        </h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 sm:grid-cols-2">
          {steps.map((s) => {
            const Icon = s.icon;

            return (
              <div
                key={s.id}
                className="flex flex-col items-center p-8 text-center transition transform bg-white shadow-sm  rounded-xl hover:shadow-lg hover:-translate-y-1"
              >
                <Icon className="mb-4 text-4xl text-blue-600" />
                <h3 className="mb-2 text-lg font-semibold">
                  {stepsList[s.key].title}
                </h3>
                <p className="text-sm text-gray-600">
                  {stepsList[s.key].text}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
