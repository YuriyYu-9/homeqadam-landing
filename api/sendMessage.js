export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, phone, serviceType, description } = req.body;

    if (!name || !phone || !serviceType || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return res.status(500).json({ error: "Bot token or chat ID not set" });
    }

    const text =
      `📝 *Новая заявка*\n\n` +
      `👤 *Имя:* ${name}\n` +
      `📞 *Телефон:* ${phone}\n` +
      `🔧 *Услуга:* ${serviceType}\n` +
      `✍️ *Описание:* ${description}`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const telegramRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    });

    const data = await telegramRes.json();

    if (!data.ok) {
      return res.status(500).json({ error: "Failed to send", data });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
