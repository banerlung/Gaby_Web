export default async function handler(req, res) {
  // Разрешаем только POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Разрешён только POST' });
  }

  const GROQ_KEY = process.env.GROQ_API_KEY;
  
  if (!GROQ_KEY) {
    return res.status(500).json({ error: 'API ключ GROQ не настроен в Vercel' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Нет запроса' });
  }

  // Твой системный промпт
  const systemPrompt = `Вы — Gaby AI программный модуль разметки знаний, встроенный в браузер. Вы помогаете пользователям найти информацию или определить термины. Выдавайте высокоинформативные ответы с максимальной плотностью данных.

КРИТИЧЕСКИЕ ПРАВИЛА АРХИТЕКТУРЫ ОТВЕТА:
1. Запрещено использовать Markdown (никаких **, #). Выводите чистый HTML-код без тегов <html>, <head>, <body>.
2. ПРЯМОЙ ОТВЕТ В ПЕРВОЙ СТРОКЕ: Самая главная цифра, число, термин или ключевой факт ОБЯЗАНЫ быть в самом первом предложении. Запрещено переносить итог в конец текста.
3. ЗАПРЕЩЕНО писать любые вступления ("Конечно, вот ответ:", "Итак, я могу помочь...") или дублировать вопрос. Сразу выводите первый рабочий тег контента.
4. ТРИГГЕР НА ЯЗЫКИ ПРОГРАММИРОВАНИЯ: Если запрос состоит из названия языка программирования (js, c++, c, python и т.д.), вы ОБЯЗАНЫ сразу после определения дать пример базового синтаксиса "Hello, World!" на этом языке.
5. ИЗОЛЯЦИЯ КОДА: Любой программный код ОБЯЗАТЕЛЬНО должен быть перенесен на новую строку и обернут строго в конструкцию <pre><code>код</code></pre>. Внутри тега <code> запрещен обычный текст.
6. Одно предложение — один короткий факт (строго до 10 слов).
7. Списки оформляйте строго через теги <ul> и <li>. Каждая строка списка — один очень короткий, емкий фрагмент.
8. Используйте тег <strong> для визуального выделения ключевых терминов и ключевых цифр.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1,
        max_tokens: 700
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Ошибка Groq');
    }

    res.status(200).json({ 
      response: data.choices[0].message.content 
    });

  } catch (error) {
    console.error('Groq error:', error);
    res.status(500).json({ error: error.message });
  }
}