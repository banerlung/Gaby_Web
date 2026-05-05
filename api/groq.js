export default async function handler(req, res) {
  // 1. Разрешаем только POST-запросы (безопасность)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 2. Достаём текст запроса из тела сообщения, которое прислал браузер
    const { query } = req.body;

    // Проверка: если запрос пустой, сразу возвращаем ошибку
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // 3. Берём ключ из "сейфа" Vercel (переменные окружения)
    // В браузере process.env не работает, тут он есть только на сервере
    const GROQ_KEY = process.env.GROQ_API_KEY;
    
    if (!GROQ_KEY) {
      return res.status(500).json({ error: 'API key not configured on server' });
    }

    // 4. Делаем запрос к настоящему Groq API ОТ ИМЕНИ СЕРВЕРА
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_KEY}`, // Ключ виден ТОЛЬКО здесь, в памяти сервера
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // Можешь поменять модель, если хочешь
        messages: [{ role: 'user', content: `Ты — умный поисковый ассистент встроенный в браузер Gaby. 
    Твоя задача — давать краткие, точные и полезные ответы.
    
    ВАЖНОЕ ПРАВИЛО ФОРМАТИРОВАНИЯ:
    Ты должен возвращать ответ в виде чистого HTML-кода, который будет вставлен напрямую в страницу.
    
    Используй следующие стили:
    1. Заголовки: используй <h3 style="color: #99c3ff; margin-bottom: 8px;"> для основных мыслей.
    2. Текст: обычный текст оборачивай в <p style="margin-bottom: 10px; line-height: 1.5;">.
    3. Списки: если перечисляешь пункты, используй <ul style="padding-left: 20px; margin-bottom: 10px;"> и <li>.
    4. Жирный шрифт: выделяй ключевые слова через <b>текст</b>.
    5. Ссылки: если упоминаешь сайт, делай ссылку <a href="URL" target="_blank" style="color: #88abe4; text-decoration: underline;">название</a>.
    6. Код: если есть код, используй <pre style="background: #2d2d2d; padding: 10px; border-radius: 5px; color: #fff; overflow-x: auto;"><code>код</code></pre>.
    
    Не пиши никаких вступлений вроде "Вот ответ:" или "Конечно". Сразу начинай с HTML-тегов.
    Отвечай на языке пользователя. запрос пользователя: ${query}` }]
      })
    });

    // 5. Получаем ответ от Groq
    const groqData = await groqResponse.json();

    // 6. Проверяем, есть ли текст ответа
    const answer = groqData.choices?.[0]?.message?.content;

    if (answer) {
      // 7. Отправляем браузеру ЧИСТЫЙ ответ. Ключа тут нет!
      return res.status(200).json({ answer });
    } else {
      return res.status(500).json({ error: 'Groq returned empty response', details: groqData });
    }

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}