import { useState, useContext } from "react";
import Container from "../layouts/Container";
import { LangContext } from "../i18n/context";
import InputMask from "react-input-mask";
import SuccessModal from "../components/SuccessModal";
import { sanitize, buildTelegramMessage } from "../utils/security";

export default function CTA({ onOpenPrivacy, onOpenTerms }) {
  const { dict } = useContext(LangContext);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    description: "",
    secret: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.secret.trim() !== "") return;

    if (
      !form.name.trim() ||
      form.phone.includes("_") ||
      !form.service.trim() ||
      !form.description.trim()
    ) {
      alert(dict.cta.fillAllFields || "Заполните все поля");
      return;
    }

    setLoading(true);

    const sanitizedData = {
      name: sanitize(form.name),
      phone: sanitize(form.phone),
      service: sanitize(form.service),
      description: sanitize(form.description),
    };

    const message = buildTelegramMessage(sanitizedData);

    try {
      const res = await fetch("/api/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message }),
      });

      if (!res.ok) throw new Error("Send error");

      setSuccess(true);
      setForm({
        name: "",
        phone: "",
        service: "",
        description: "",
        secret: "",
      });
    } catch (err) {
      alert(dict.cta.error || "Ошибка. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
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
            {/* Honeypot */}
            <input
              type="text"
              name="secret"
              className="hidden"
              autoComplete="off"
              value={form.secret}
              onChange={handleChange}
            />

            {/* NAME */}
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={dict.cta.name}
              className="w-full p-3 bg-white border border-gray-200 rounded-lg"
              required
            />

            {/* PHONE (simple mask) */}
            <InputMask
              mask="+998 99 999 99 99"
              maskChar="_"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  type="tel"
                  name="phone"
                  placeholder="+998 __ ___ __ __"
                  className="w-full p-3 bg-white border border-gray-200 rounded-lg"
                  required
                />
              )}
            </InputMask>

            {/* SERVICE */}
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="w-full p-3 bg-white border border-gray-200 rounded-lg"
              required
            >
              <option value="">{dict.cta.service}</option>
              {dict.categoriesList.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* DESCRIPTION */}
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder={dict.cta.descField}
              rows={3}
              className="w-full p-3 bg-white border border-gray-200 rounded-lg"
              required
            />

            {/* AGREEMENT */}
            <label className="flex items-start gap-2 text-xs md:text-sm">
              <input type="checkbox" required className="mt-1" />
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

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? dict.cta.loading || "Отправка..." : dict.cta.submit}
            </button>
          </form>
        </div>
      </Container>

      {success && (
        <SuccessModal onClose={() => setSuccess(false)} dict={dict} />
      )}
    </section>
  );
}
