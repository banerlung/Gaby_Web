let controller = null;

async function Summary(query) {
  try {
    if (controller) {
      controller.abort();
    }
    controller = new AbortController();

    const res = await fetch('https://gabyweb.ru/xair/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: "gemma3:1b",
        messages: [
          { role: "system", content: "Отвечай на русском. Только 1 предложение. Только суть. Без HTML, без форматирования. Просто текст." },
          { role: "user", content: query }
        ],
        stream: false
      })
    });

    const text = await res.text();
    
    if (!text || text.startsWith('<!') || text.startsWith('<html')) return '';

    const data = JSON.parse(text);
    return data.message?.content?.trim() || '';

  } catch (err) {
    if (err.name === 'AbortError') return '';
    return '';
  }
}

window.addEventListener('beforeunload', () => {
  if (controller) controller.abort();
});
