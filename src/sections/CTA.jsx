import { useState, useContext } from "react";
import Container from "../layouts/Container";
import { LangContext } from "../i18n/context";
import InputMask from "react-input-mask";
import SuccessModal from "../components/SuccessModal";
import { sanitize, buildTelegramMessage } from "../utils/security";

export default function CTA({ onOpenPrivacy, onOpenTerms }) {
  const { dict } = useContext(LangContext);

  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "+998 00 000 00 00",
    service: "",
    description: "",
    agree: false,
    secret: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    if (form.secret.trim() !== "") return false;

    if (!/^[A-Za-zА-Яа-яЁёЎўҚқҒғҲҳ’' ]{2,30}$/.test(form.name)) {
      alert("Введите корректное имя.");
      return false;
    }

    if (!/^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(form.phone)) {
      alert("Введите корректный номер телефона в формате +998 90 000 00 00.");
      return false;
    }

    if (!form.service) {
      alert("Выберите тип услуги.");
      return false;
    }

    if (form.description.trim().length < 5) {
      alert("Опишите задачу более подробно.");
      return false;
    }

    if (!form.agree) {
      alert("Необходимо согласиться с условиями.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const safeForm = {
      name: sanitize(form.name),
      phone: sanitize(form.phone),
      service: sanitize(form.service),
      description: sanitize(form.description),
    };

    const message = buildTelegramMessage(safeForm);

    try {
      const res = await fetch("/api/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...safeForm, message }),
      });

      if (res.ok) {
        setSuccessOpen(true);
        setForm({
          name: "",
          phone: "+998 00 000 00 00",
          service: "",
          description: "",
          agree: false,
          secret: "",
        });
      } else {
        alert("Ошибка отправки. Попробуйте позже.");
      }
    } catch (err) {
      alert("Ошибка соединения. Попробуйте позже.");
    }

    setLoading(false);
  };

  return (
    <section className="pt-10 pb-14 bg-gray-50">
      <Container className="flex justify-center">
        <div className="w-full max-w-xl">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-center md:text-4xl md:text-left">
            {dict.cta.title}
          </h1>

          <p className="mb-6 text-base text-center text-gray-600 md:text-lg md:text-left">
            {dict.cta.desc}
          </p>

          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-4 border border-blue-100 shadow-md bg-blue-50 rounded-xl"
          >
            <input
              type="text"
              name="secret"
              className="hidden"
              autoComplete="off"
              value={form.secret}
              onChange={handleChange}
            />

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={dict.cta.name}
              className="w-full p-3 bg-white border border-gray-200 rounded-lg"
              required
            />

            <InputMask
              mask="+998 99 999 99 99"
              maskChar={null}
              value={form.phone}
              onChange={(e) => {
                let v = e.target.value;

                if (!v.startsWith("+998 ")) {
                  v = "+998 " + v.replace(/^\+998\s*/, "");
                }

                v = v.replace(/[^\d+ ]/g, "");

                setForm({ ...form, phone: v });
              }}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  type="text"
                  name="phone"
                  placeholder="+998 90 000 00 00"
                  className="w-full p-3 bg-white border border-gray-200 rounded-lg"
                  required
                />
              )}
            </InputMask>

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              className="w-full p-3 bg-white border border-gray-200 rounded-lg"
            >
              <option value="" disabled>
                {dict.cta.service}
              </option>

              {dict.categoriesList.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder={dict.cta.descField}
              rows={3}
              className="w-full p-3 bg-white border border-gray-200 rounded-lg"
              required
            />

            <label className="flex items-start gap-2 text-xs md:text-sm">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="mt-1"
                required
              />

              <span>
                {dict.cta.agree1}{" "}
                <button
                  type="button"
                  className="text-blue-600 underline"
                  onClick={onOpenPrivacy}
                >
                  {dict.cta.agreePrivacy}
                </button>{" "}
                {dict.cta.agreeAnd}{" "}
                <button
                  type="button"
                  className="text-blue-600 underline"
                  onClick={onOpenTerms}
                >
                  {dict.cta.agreeTerms}
                </button>
                .
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Отправка..." : dict.cta.submit}
            </button>
          </form>
        </div>
      </Container>

      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </section>
  );
}
