
async function Summary(query) {
  try {
    const res = await fetch('/api/groq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    const data = await res.json();

    if (data.answer) {
      return data.answer; // Просто возвращаем текст
    }
    
    return `<p style="color:red">Ошибка ИИ: ${data.error || 'Неизвестная ошибка'}</p>`;

  } catch (err) {
    console.error('Network error:', err);
    return '<p>Ошибка сети при запросе к ИИ</p>';
  }
}

// --- ОТРИСОВКА (Этот код сам найдет кнопку и блок AI) ---

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('searchB');
  const input = document.getElementById('input');
  const output = document.getElementById('AI');

  if (btn && input && output) {
    btn.onclick = async () => {
      const query = input.value.trim();
      if (!query) return;

      output.innerHTML = '<span style="color:#ccc">Думаю...</span>';
      
      const answerText = await Summary(query);
      
      output.innerHTML = `
        <div style="animation: fadeIn 0.5s;">
          <div style="line-height: 1.5; color: white;">${answerText}</div>
        </div>
      `;
    };
  }
});