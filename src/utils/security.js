export function sanitize(input) {
  return String(input)
    .replace(/['"`<>;]/g, "")
    .trim();
}

export function buildTelegramMessage(data) {
  const now = new Date().toLocaleString();

  return (
    "🆕 *Новая заявка с HomeQadam*\n\n" +
    `👤 *Имя:* ${data.name}\n` +
    `📞 *Контакт:* ${data.phone}\n` +
    `🔧 *Услуга:* ${data.service}\n` +
    `📝 *Описание:* ${data.description}\n\n` +
    `⏰ *Дата:* ${now}`
  );
}
