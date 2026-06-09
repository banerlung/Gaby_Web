let controller = null;

async function Summary(query) {
  try {
    // Отменяем предыдущий запрос, если он ещё идёт
    if (controller) {
      controller.abort();
    }
    controller = new AbortController();

    // Запрос идёт на наш Vercel API (не напрямую в Groq!)
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: query,
        signal: controller.signal
      })
    });

    const data = await res.json();

    if (data.error) {
      return `<p style="color:red">Ошибка ИИ: ${data.error}</p>`;
    }

    if (data.response) {
      // Очищаем ответ от markdown-тегов (как у тебя было)
      let html = data.response
        .replace(/```html/g, '')
        .replace(/```javascript/g, '')
        .replace(/```/g, '')
        .trim();
      
      return html;
    }
    
    return '<p style="color:red">Пустой ответ от ИИ</p>';

  } catch (err) {
    if (err.name === 'AbortError') {
      console.log('Запрос отменён');
      return '';
    }
    console.error('Error:', err);
    return '<p style="color:red">Ошибка связи с ИИ</p>';
  }
}

// Исправил баг: было aiController, стало controller
window.addEventListener('beforeunload', () => {
  if (controller) {
    controller.abort();
  }
});