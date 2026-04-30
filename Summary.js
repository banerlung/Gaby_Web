const API = "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";
const url = "https://api.groq.com/openai/v1/chat/completions";
async function Summary(query) {
    const url = "https://api.groq.com/openai/v1/chat/completions";

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [{
                role: "user",
                content: `Ты — умный ассистент браузера Gaby. Твоя задача — дать краткий, но структурированный ответ на вопрос пользователя в виде HTML-фрагмента.

Правила:
1. Начни с заголовка <h3>Обзор от ИИ</h3>
2. Первое предложение должно быть определением или прямым ответом — выдели его тегом <strong>.
3. Если есть перечисление — используй <ul><li>...</li></ul>.
4. Если упоминаются ресурсы (сайты, документация) — оберни их в <a href="URL">название</a>. Если URL неизвестен — оставь как текст. ссылки должны быть просто серыми, такимиже как остальной текст
5. Не используй markdown, только чистый HTML.
6. Максимум 5–7 строк текста + список. Без воды.
7. не используй никаких стилей цветов, все должно быть одинакого цвета обязательнор!
Вопрос пользователя: ${query}`
            }]
        })
    });
    const data = await response.json();
    return data.choices[0].message.content;
}