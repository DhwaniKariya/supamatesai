// SupaMates OS — Segment Quiz
// Agent: SnackStack | Each answer scored per segment; highest wins

const answers = { late: 0, weekend: 0, weekday: 0, rare: 0 };
let currentQ = 1;

const SEGMENTS = {
  late: {
    icon: '🍗',
    title: 'The Snack Box Squad',
    desc: `You're the heartbeat of Supermacs. Post-pub, post-match, post-everything — the snack box isn't food, it's a ritual. You've introduced more people to Supermacs than any marketing campaign ever could. Supermacs doesn't know your name yet. But with SupaMates, it will.`,
    perk: 'Late-night streak rewards. Midnight double points every Friday. Because some loyalty only comes alive after dark.',
  },
  weekend: {
    icon: '👨‍👩‍👧‍👦',
    title: 'The Family Ritualist',
    desc: `Saturday is Supermacs day. You don't overthink it — the kids love it, the price is right, and it works. You're loyal through habit, and habit is powerful. SupaMates turns that invisible loyalty into something Supermacs can finally see — and reward.`,
    perk: 'Family meal rewards. Kids-eat-free milestones. Points that stack every Saturday.',
  },
  weekday: {
    icon: '🚗',
    title: 'The Commuter Refueller',
    desc: `You're the most consistent customer Supermacs has. Fast, reliable, on the route — you probably visit more often than you realise. Your loyalty is practical, not sentimental. SupaMates gives you what you actually want: speed. Pre-order priority. Skip the queue. Your snack box waiting when you arrive.`,
    perk: 'Pre-order priority. Commuter streak bonus. Your order ready before you park.',
  },
  rare: {
    icon: '✈️',
    title: 'The Diaspora Devotee',
    desc: `You're not here often. But when you are, Supermacs is one of the first stops. You've explained the snack box to people who didn't understand, and you've given up trying. You feel it. SupaMates was built for this moment — the first scan when you land home. Welcome back.`,
    perk: '"Away on the G" recognition. Gaffer Status homecoming moment. Your loyalty doesn\'t expire just because you moved.',
  },
};

function selectAnswer(q, val) {
  // Highlight selected
  document.querySelectorAll(`[data-q="${q}"]`).forEach(btn => btn.classList.remove('selected'));
  document.querySelector(`[data-q="${q}"][data-val="${val}"]`).classList.add('selected');

  // Record answer
  answers[val]++;

  // Advance after brief delay
  setTimeout(() => advanceQuiz(q), 280);
}

function advanceQuiz(currentQ) {
  const next = currentQ + 1;
  const nextEl = document.getElementById(`q${next}`);

  if (nextEl) {
    document.getElementById(`q${currentQ}`).classList.add('hidden');
    nextEl.classList.remove('hidden');
  } else {
    // All questions answered — show result
    showResult();
  }
}

function showResult() {
  // Find winning segment
  const winner = Object.entries(answers).sort((a, b) => b[1] - a[1])[0][0];
  const seg = SEGMENTS[winner];

  document.getElementById('result-icon').textContent = seg.icon;
  document.getElementById('result-title').textContent = seg.title;
  document.getElementById('result-desc').textContent = seg.desc;
  document.getElementById('result-perk').textContent = seg.perk;

  // Hide all questions, show result
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`q${i}`);
    if (el) el.classList.add('hidden');
  }
  document.getElementById('quiz-result').classList.remove('hidden');
}

function retakeQuiz() {
  // Reset scores
  Object.keys(answers).forEach(k => answers[k] = 0);

  // Hide result, show Q1
  document.getElementById('quiz-result').classList.add('hidden');
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`q${i}`);
    if (el) {
      if (i === 1) el.classList.remove('hidden');
      else el.classList.add('hidden');
    }
  }

  // Clear selections
  document.querySelectorAll('.quiz-opt').forEach(btn => btn.classList.remove('selected'));
}

// Attach listeners
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.quiz-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      selectAnswer(parseInt(btn.dataset.q), btn.dataset.val);
    });
  });
});
