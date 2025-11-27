import { useState, useEffect } from "react";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [phone, setPhone] = useState(""); // состояние номера телефона

  // Функция форматирования номера в стиль "998 90 000 00 00"
  const formatUzPhone = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 12); // только цифры, максимум 12
    const len = digits.length;

    if (len <= 3) return digits;
    if (len <= 5) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    if (len <= 8)
      return `${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5)}`;
    if (len <= 10)
      return `${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(
        5,
        8
      )} ${digits.slice(8)}`;

    return `${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(
      5,
      8
    )} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
  };

  // Контролируем изменение поля телефона
  const handlePhoneChange = (e) => {
    const formatted = formatUzPhone(e.target.value);
    setPhone(formatted);
  };

  // === handleSubmit ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Берём цифры и форматируем
    const digitsOnly = phone.replace(/\D/g, "");
    const formattedPhone = formatUzPhone(digitsOnly);

    const data = {
      name: form.name.value,
      contact: formattedPhone, // В таблицу уходит ИДЕАЛЬНО отформатированный номер
      service: form.service.value,
      task: form.task.value,
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbzX8JzJxJgjWrCDEj-RXQW-1avfGITk44gVSB69QG2lpmUx17WRG6e2ZsD_uuHBmwCwMg/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data),
        }
      );

      alert("Спасибо! Ваша заявка отправлена.");
      form.reset();
      setPhone(""); // очистить номер в state
    } catch (err) {
      console.error("Ошибка отправки формы:", err);
      alert("Ошибка при отправке. Попробуйте позже.");
    }
  };

  // --- Scroll Lock ---
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // --- Scroll reveal ---
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
      const triggerBottom = window.innerHeight * 0.9;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect().top;
        if (rect < triggerBottom) {
          el.classList.add("revealed");
        }
      });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  return (
    <div className="font-sans text-gray-900">
      <header className="fixed top-0 left-0 z-50 w-full border-b shadow-sm bg-white/80 backdrop-blur-md border-slate-200">
        <div className="flex items-center justify-between max-w-6xl px-6 py-4 mx-auto">
          {/* LOGO */}
          <div className="text-2xl font-bold tracking-tight text-blue-600 cursor-pointer">
            HomeQadam
          </div>

          {/* DESKTOP NAV */}
          <nav className="items-center hidden gap-8 font-medium md:flex text-slate-700">
            <a
              href="#categories"
              className="transition hover:text-blue-600 reveal"
            >
              Услуги
            </a>
            <a href="#how-it-works" className="transition hover:text-blue-600">
              Как работает
            </a>
            <a href="#cta" className="transition hover:text-blue-600">
              Контакты
            </a>
          </nav>

          {/* DESKTOP CTA */}
          <a
            href="#cta"
            className="hidden px-5 py-2 text-white transition-all bg-blue-600 rounded-lg md:block hover:bg-blue-700 active:scale-95"
          >
            Перейте на основной сайт
          </a>

          {/* MOBILE BURGER */}
          <button
            className="flex items-center justify-center w-10 h-10 transition border border-gray-300 rounded-md md:hidden active:scale-95"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="relative flex items-center justify-center w-6 h-6">
              {/* LINE 1 */}
              <span
                className={`absolute block h-0.5 w-full bg-gray-700 transition-all duration-300 
        ${menuOpen ? "rotate-45" : "-translate-y-2"}
      `}
                style={{ top: "50%" }}
              ></span>

              {/* LINE 2 */}
              <span
                className={`absolute block h-0.5 w-full bg-gray-700 transition-all duration-300 
        ${menuOpen ? "opacity-0" : "opacity-100"}
      `}
                style={{ top: "50%" }}
              ></span>

              {/* LINE 3 */}
              <span
                className={`absolute block h-0.5 w-full bg-gray-700 transition-all duration-300 
        ${menuOpen ? "-rotate-45" : "translate-y-2"}
      `}
                style={{ top: "50%" }}
              ></span>
            </div>
          </button>
        </div>

        {/* MOBILE DROPDOWN */}
        <div
          className={`md:hidden overflow-hidden backdrop-blur-md bg-white/95 border-t border-slate-200 shadow-sm 
                transition-all duration-300 ${
                  menuOpen ? "max-h-96" : "max-h-0"
                }`}
        >
          <nav className="flex flex-col gap-4 px-6 py-4 text-lg font-medium text-slate-700">
            <a href="#categories" onClick={() => setMenuOpen(false)}>
              Услуги
            </a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
              Как работает
            </a>
            <a href="#cta" onClick={() => setMenuOpen(false)}>
              Контакты
            </a>
          </nav>
        </div>
      </header>

      <section
        id="hero"
        className="flex items-center min-h-screen px-6 pt-32 pb-20 bg-gradient-to-b from-white to-blue-50 fade-in-up"
      >
        <div className="grid items-center w-full max-w-6xl gap-10 mx-auto md:grid-cols-2">
          {/* LEFT CONTENT */}
          <div className="order-2 text-center md:order-1 md:text-left md:max-w-lg fade-in-up">
            <h1 className="mb-5 text-4xl font-bold leading-tight md:text-5xl text-slate-800">
              Найди проверенного мастера
              <br className="hidden md:block" />
              за несколько минут
            </h1>

            <p className="mb-8 text-lg md:text-xl text-slate-600">
              Домашняя работа, ремонт, уборка, сантехника — всё в одном сервисе.
              Быстро. Удобно. Надёжно.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <a
                href="#categories"
                className="py-3 text-lg text-blue-600 transition-all border border-blue-600 rounded-lg px-7 hover:bg-blue-50 active:scale-95"
              >
                Смотреть услуги
              </a>

              <a
                href="#cta"
                className="py-3 text-lg text-white transition-all bg-blue-600 rounded-lg shadow px-7 hover:bg-blue-700 active:scale-95"
              >
                Оставить заявку
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center order-1 md:order-2 md:justify-end md:max-w-lg fade-in-up">
            <img
              src="/chill_guy.png"
              alt="HomeQadam illustration"
              className="w-64 sm:w-72 md:w-[420px] drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
            />
          </div>
        </div>
      </section>

      {/* ========================= QUICK BENEFITS ========================= */}
      <section id="advantages" className="px-6 py-20 reveal">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="mb-10 text-3xl font-bold md:text-4xl">
            Преимущества HomeQadam
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {/* 1 */}
            <div className="p-8 transition-all duration-300 shadow-sm bg-gray-50 rounded-xl hover:shadow-lg hover:-translate-y-1">
              <h3 className="mb-2 text-xl font-semibold text-slate-800">
                Быстрый отклик
              </h3>
              <p className="text-slate-600">
                Мастера быстро принимают заявки и вступают в диалог.
              </p>
            </div>

            {/* 2 */}
            <div className="p-8 transition-all duration-300 shadow-sm bg-gray-50 rounded-xl hover:shadow-lg hover:-translate-y-1">
              <h3 className="mb-2 text-xl font-semibold text-slate-800">
                Проверенные специалисты
              </h3>
              <p className="text-slate-600">
                Каждый техник заполняет профиль и категории работ.
              </p>
            </div>

            {/* 3 */}
            <div className="p-8 transition-all duration-300 shadow-sm bg-gray-50 rounded-xl hover:shadow-lg hover:-translate-y-1">
              <h3 className="mb-2 text-xl font-semibold text-slate-800">
                Удобный и простой интерфейс
              </h3>
              <p className="text-slate-600">
                Оставить заказ можно за минуту — без лишних шагов и сложностей.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= CATEGORIES ========================= */}
      <section id="categories" className="px-6 py-16 bg-white reveal">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="mb-10 text-3xl font-bold md:text-4xl">
            Категории услуг
          </h2>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {/* ЭЛЕКТРИКА */}
            <div className="flex flex-col items-center justify-center p-6 transition-all duration-300 rounded-lg shadow-sm group h-36 bg-gray-50 hover:bg-blue-50 hover:shadow-lg hover:-translate-y-1 reveal">
              <svg
                className="w-10 h-10 mb-3 text-blue-600 transition group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"
                />
              </svg>
              Электрика
            </div>

            {/* САНТЕХНИКА */}
            <div className="flex flex-col items-center justify-center p-6 transition-all duration-300 rounded-lg shadow-sm group h-36 bg-gray-50 hover:bg-blue-50 hover:shadow-lg hover:-translate-y-1 reveal">
              <svg
                className="w-10 h-10 mb-3 text-blue-600 transition group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 4h6v3H9zm3 3v6m0 6v-6m-4 0h8"
                />
              </svg>
              Сантехника
            </div>

            {/* УБОРКА */}
            <div className="flex flex-col items-center justify-center p-6 transition-all duration-300 rounded-lg shadow-sm group h-36 bg-gray-50 hover:bg-blue-50 hover:shadow-lg hover:-translate-y-1 reveal">
              <svg
                className="w-10 h-10 mb-3 text-blue-600 transition group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 20h16M8 20V4m8 16V8l-4-4"
                />
              </svg>
              Уборка
            </div>

            {/* РЕМОНТ ТЕХНИКИ */}
            <div className="flex flex-col items-center justify-center p-6 transition-all duration-300 rounded-lg shadow-sm group h-36 bg-gray-50 hover:bg-blue-50 hover:shadow-lg hover:-translate-y-1 reveal">
              <svg
                className="w-10 h-10 mb-3 text-blue-600 transition group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2a7 7 0 017 7c0 4-7 13-7 13S5 13 5 9a7 7 0 017-7z"
                />
              </svg>
              Ремонт техники
            </div>

            {/* СБОРКА МЕБЕЛИ */}
            <div className="flex flex-col items-center justify-center p-6 transition-all duration-300 rounded-lg shadow-sm group h-36 bg-gray-50 hover:bg-blue-50 hover:shadow-lg hover:-translate-y-1 reveal">
              <svg
                className="w-10 h-10 mb-3 text-blue-600 transition group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7h8l1-3h6v6h-6l-1-3H3v10h4"
                />
              </svg>
              Сборка мебели
            </div>

            {/* ГРУЗЧИКИ */}
            <div className="flex flex-col items-center justify-center p-6 transition-all duration-300 rounded-lg shadow-sm group h-36 bg-gray-50 hover:bg-blue-50 hover:shadow-lg hover:-translate-y-1 reveal">
              <svg
                className="w-10 h-10 mb-3 text-blue-600 transition group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 17h2l3 4h8l3-4h2M5 17l1-10h12l1 10M9 7V5h6v2"
                />
              </svg>
              Грузчики
            </div>

            {/* МЕЛКИЙ РЕМОНТ */}
            <div className="flex flex-col items-center justify-center p-6 transition-all duration-300 rounded-lg shadow-sm group h-36 bg-gray-50 hover:bg-blue-50 hover:shadow-lg hover:-translate-y-1 reveal">
              <svg
                className="w-10 h-10 mb-3 text-blue-600 transition group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14m-7-7v14"
                />
              </svg>
              Мелкий ремонт
            </div>

            {/* РЕПЕТИТОРСТВО */}
            <div className="flex flex-col items-center justify-center p-6 transition-all duration-300 rounded-lg shadow-sm group h-36 bg-gray-50 hover:bg-blue-50 hover:shadow-lg hover:-translate-y-1 reveal">
              <svg
                className="w-10 h-10 mb-3 text-blue-600 transition group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <circle cx="12" cy="7" r="3" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14l9-5-9-5-9 5 9 5z M12 14v7"
                />
              </svg>
              Репетиторство
            </div>
          </div>
        </div>
      </section>

      {/* ========================= HOW IT WORKS ========================= */}
      <section id="how-it-works" className="px-6 py-20 bg-gray-50 reveal">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-12 text-3xl font-bold md:text-4xl">
            Как это работает
          </h2>

          <div className="grid gap-10 md:grid-cols-4">
            {/* ШАГ 1 */}
            <div className="flex flex-col items-center p-4 text-center transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center mb-4 bg-blue-100 rounded-full shadow w-14 h-14">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <p className="text-slate-600">Создаёшь заказ</p>
            </div>

            {/* ШАГ 2 */}
            <div className="flex flex-col items-center p-4 text-center transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center mb-4 bg-blue-100 rounded-full shadow w-14 h-14">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <p className="text-slate-600">Техник принимает заявку</p>
            </div>

            {/* ШАГ 3 */}
            <div className="flex flex-col items-center p-4 text-center transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center mb-4 bg-blue-100 rounded-full shadow w-14 h-14">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <p className="text-slate-600">Общение в чате</p>
            </div>

            {/* ШАГ 4 */}
            <div className="flex flex-col items-center p-4 text-center transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center mb-4 bg-blue-100 rounded-full shadow w-14 h-14">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <p className="text-slate-600">Работа выполнена</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= CTA SECTION ========================= */}
      <section
        id="cta"
        className="px-6 py-20 text-center text-white bg-blue-600 reveal"
      >
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">
          Готов попробовать HomeQadam?
        </h2>

        <p className="max-w-xl mx-auto mb-10 text-lg text-blue-100">
          Оставьте заявку — мы свяжемся с вами и поможем оформить первый заказ.
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="max-w-xl p-8 mx-auto space-y-6 text-gray-800 bg-white shadow-lg rounded-xl"
        >
          {/* NAME */}
          <div className="text-left">
            <label className="block mb-1 font-medium">Ваше имя</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Введите имя"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PHONE */}
          <div className="text-left">
            <label className="block mb-1 font-medium">
              Телефон или Telegram
            </label>
            <input
              type="tel"
              name="contact"
              required
              inputMode="tel"
              placeholder="998 90 000 00 00"
              value={phone}
              onChange={handlePhoneChange}
              pattern="^998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$"
              title="Введите номер в формате: 998 90 000 00 00"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* SERVICE TYPE */}
          <div className="text-left">
            <label className="block mb-1 font-medium">Тип услуги</label>
            <select
              name="service"
              required
              className="w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Выберите категорию</option>
              <option>Электрика</option>
              <option>Сантехника</option>
              <option>Уборка</option>
              <option>Ремонт техники</option>
              <option>Сборка мебели</option>
              <option>Грузчики</option>
              <option>Мелкий ремонт</option>
              <option>Репетиторство</option>
            </select>
          </div>

          {/* DESCRIPTION */}
          <div className="text-left">
            <label className="block mb-1 font-medium">
              Краткое описание задачи
            </label>
            <textarea
              name="task"
              rows="4"
              placeholder="Опишите что нужно выполнить"
              className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-4 text-lg font-semibold text-white transition-all bg-blue-600 rounded-lg shadow hover:bg-blue-700 active:scale-95"
          >
            Оставить заявку
          </button>
        </form>
      </section>

      {/* ========================= FOOTER ========================= */}
      <footer className="px-6 py-6 text-sm text-center text-gray-300 bg-gray-900 revealed">
        <p>© {new Date().getFullYear()} HomeQadam. Все права защищены.</p>
      </footer>
    </div>
  );
}
