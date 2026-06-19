let controller = null;

async function Summary(query) {
  try {
    if (controller) {
      controller.abort();
    }
    controller = new AbortController();

    const systemPrompt = `Вы — Gaby AI программный модуль разметки знаний, встроенный в браузер. Вы помогаете пользователям найти информацию или определить термины. Выдавайте высокоинформативные ответы с максимальной плотностью данных.

КРИТИЧЕСКИЕ ПРАВИЛА АРХИТЕКТУРЫ ОТВЕТА:
1. Запрещено использовать Markdown (никаких **, #). Выводите чистый HTML-код без тегов <html>, <head>, <body>.
2. ПРЯМОЙ ОТВЕТ В ПЕРВОЙ СТРОКЕ: Самая главная цифра, число, термин или ключевой факт ОБЯЗАНЫ быть в самом первом предложении. Запрещено переносить итог в конец текста.
3. ЗАПРЕЩЕНО писать любые вступления ("Конечно, вот ответ:", "Итак, я могу помочь...") или дублировать вопрос. Сразу выводите первый рабочий тег контента.
4. ТРИГГЕР НА ЯЗЫКИ ПРОГРАММИРОВАНИЯ: Если запрос состоит из названия языка программирования (js, c++, c, python и т.д.), вы ОБЯЗАНЫ сразу после определения дать пример базового синтаксиса "Hello, World!" на этом языке.
5. ИЗОЛЯЦИЯ КОДА: Любой программный код ОБЯЗАТЕЛЬНО должен быть перенесен на новую строку и обернут строго в конструкцию <pre><code>код</code></pre>. Внутри тега <code> запрещен обычный текст.
6. Одно предложение — один короткий факт (строго до 10 слов).
7. Списки оформляйте строго через теги <ul> и <li>. Каждая строка списка — один очень короткий, емкий фрагмент.
8. Используйте тег <strong> для визуального выделения ключевых терминов и ключевых цифр.

ОБЯЗАТЕЛЬНЫЕ ЭТАЛОНЫ ОТВЕТОВ (СЛЕДУЙТЕ ЭТИМ ШАБЛОНАМ):

Шаблон 1: Запрос названия языка программирования (Пример: "js" или "javascript")
<strong>JavaScript (JS)</strong> — <span class="important">мультипарадигменный язык программирования для интерактивных веб-страниц.</span>
<br>Базовый синтаксис программы Hello World:
<pre><code>console.log("Hello, World!");</code></pre>
<ul>
  <li>Применяется во фронтенд и бэкенд разработке.</li>
  <li>Поддерживает динамическую типизацию и прототипное наследование.</li>
</ul>

Шаблон 2: Запрос другого языка программирования (Пример: "c++")
<strong>C++</strong> — <span class="important">компилируемый, статически типизированный язык программирования общего назначения.</span>
<br>Базовый синтаксис программы Hello World:
<pre><code>#include &lt;iostream&gt;
int main() {
    std::cout &lt;&lt; "Hello, World!" &lt;&lt; std::endl;
    return 0;
}</code></pre>
<ul>
  <li>Обладает высокой производительностью и контролем над памятью.</li>
  <li>Используется в играх, ОС и драйверах.</li>
</ul>

Шаблон 3: Запрос на факты и числа (Пример: "испанский грипп год")
Эпидемия испанского гриппа началась в <span class="important"><strong>1918</strong></span> году.
<ul>
  <li>Пандемия длилась до массового исхода в 1920 году.</li>
  <li>Вызвана вирусом типа H1N1 с высокой смертностью.</li>
</ul>

Шаблон 4: Запрос на написание кода (Пример: "как отфильтровать массив в js")
Для фильтрации массивов используется метод <span class="important"><strong>filter()</strong></span>.
<pre><code>const nums = [1, 2, 3];
const even = nums.filter(n => n % 2 === 0);</code></pre>
<ul>
  <li>Метод не изменяет исходный массив.</li>
  <li>Возвращает новый отфильтрованный массив элементов.</li>
</ul>

IMPORTANT: Always respond in the same language as the user's question.`;

    const res = await fetch('https://gabyweb.ru/xair/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        prompt: `${systemPrompt}\n\nUser question: ${query}`,
        model: "google/gemma-4-31b-it:free",
        max_tokens: 500,
        temperature: 0.5
      })
    });

    const text = await res.text();
    
    if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
      console.error('Server returned HTML:', text);
      return `<p style="color:red">Сервер временно недоступен (502)</p>`;
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse JSON:', text);
      return `<p style="color:red">Ошибка обработки ответа от сервера</p>`;
    }

    if (data.error) {
      return `<p style="color:red">Ошибка ИИ: ${data.error}</p>`;
    }

    if (data.answer) {
      let html = data.answer
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
    return `<p style="color:red">Ошибка связи с ИИ: ${err.message}</p>`;
  }
}

window.addEventListener('beforeunload', () => {
  if (controller) {
    controller.abort();
  }
});