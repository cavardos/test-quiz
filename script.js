const questions = [
  { text: 'มันผิดศีลธรรมที่จะทำร้ายร่างกายตัวเองหรือดูแลสุขภาพไม่ดี', foundation: 'Care' },
  { text: 'ชายและหญิงควรได้รับโอกาสเท่าเทียม', foundation: 'Fairness' },
  // ... เพิ่มคำถามให้ครบตามต้องการ
];

let current = 0;
const scores = { Care:0, Fairness:0, Liberty:0, Loyalty:0, Authority:0, Purity:0 };

function showQuestion() {
  const q = questions[current];
  const container = document.getElementById('question-container');
  container.innerHTML = `<p>${q.text}</p>`;
  ['strongly_agree','agree','slightly_agree','neutral','slightly_disagree','disagree','strongly_disagree'].forEach(opt=>{
    container.innerHTML += `
      <div>
        <input type="radio" name="answer" id="${opt}" value="${opt}">
        <label for="${opt}">${opt.replace('_',' ').split(' ').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ')}</label>
      </div>`;
  });
}

function getAnswerScore(value) {
  const map = {
    strongly_agree:6, agree:5, slightly_agree:4,
    neutral:3, slightly_disagree:2, disagree:1, strongly_disagree:0
  };
  return map[value] || 0;
}

document.getElementById('next-btn').addEventListener('click', () => {
  const sel = document.querySelector('input[name="answer"]:checked');
  if (!sel) return alert('กรุณาเลือกคำตอบก่อน');
  const q = questions[current];
  scores[q.foundation] += getAnswerScore(sel.value);
  current++;
  if (current < questions.length) showQuestion();
  else showResults();
});

function showResults() {
  const container = document.getElementById('app');
  container.innerHTML = '<h2>ผลลัพธ์ของคุณ</h2>';
  const maxScore = questions.filter(q=>q.foundation==='Care').length * 6;
  for (const f in scores) {
    const percent = Math.round(scores[f]/(questions.filter(q=>q.foundation===f).length*6)*100);
    container.innerHTML += `
      <p>${f}: ${percent}%</p>
      <div style="background:#eee; height:10px; width:100%">
        <div style="background:#6cace4; height:10px; width:${percent}%"></div>
      </div>`;
  }
}

showQuestion();
