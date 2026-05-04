async function Summary(query) {
  try {
    // 1. Запрос идёт НА НАШ СЕРВЕР, а не в Groq напрямую
    const res = await fetch('/api/groq', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
        // Заголовок Authorization УБРАН, ключа тут нет
      },
      body: JSON.stringify({ query })
    });

    // 2. Ждём ответ от сервера
    const data = await res.json();

    // 3. Если сервер вернул ответ — показываем его
    if (data.answer) {
      return data.answer; 
    }
    let answer = data.answer;
    let AI = document.getElementById("AI");
    AI.innerHTML = "";
    AI.innerHTML = output.innerHTML = `
        <div style="animation: fadeIn 0.5s;">
          <h3 style="color: #99c3ff; margin-bottom: 10px;">🤖 Ответ:</h3>
          <div style="line-height: 1.5; color: white;">${answer}</div>
        </div>
      `;;
    return `<p style="color:red">Ошибка ИИ: ${data.error || 'Неизвестная ошибка'}</p>`;

  } catch (err) {
    console.error('Network error:', err);
    return '<p>Ошибка сети при запросе к ИИ</p>';
  }
}