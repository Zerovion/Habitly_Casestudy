/* Habitly Case Study — script.js */

// ── Nav scroll effect ─────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Scroll reveal ─────────────────────────────────────────────
const reveals = document.querySelectorAll(
  '.summary-card, .problem-card, .persona, .stat-card, .feature-card, ' +
  '.market-stat, .arch-decision, .lesson, .ba-col, .rm-phase, ' +
  '.kpi-card, .dash-card, .dash-wide, .dash-narrow, .insight-box, ' +
  '.ai-decision, .ai-pipeline, .guardrails, .prompt-strategy'
);
reveals.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

// ── Animated counters ─────────────────────────────────────────
function animateCounter(el, target, duration = 1800) {
  if (isNaN(target)) return;
  const start = performance.now();
  const startVal = 0;
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(startVal + (target - startVal) * eased);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const kpiCards = document.querySelectorAll('.kpi-card');
const kpiObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const count = parseFloat(card.dataset.count);
      const counter = card.querySelector('.counter');
      if (counter && !isNaN(count)) animateCounter(counter, count);
      kpiObserver.unobserve(card);
    }
  });
}, { threshold: 0.5 });
kpiCards.forEach(c => kpiObserver.observe(c));

// ── Chart defaults ────────────────────────────────────────────
Chart.defaults.color = 'rgba(240,240,255,0.45)';
Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 11;

const violet = '#8b5cf6';
const violet2 = '#a78bfa';
const violet3 = 'rgba(139,92,246,0.15)';
const green = '#10b981';
const amber = '#f59e0b';

// ── Market Growth Chart ───────────────────────────────────────
const marketCtx = document.getElementById('marketChart');
if (marketCtx) {
  new Chart(marketCtx, {
    type: 'line',
    data: {
      labels: ['2020', '2021', '2022', '2023', '2024', '2025e', '2026e', '2027e', '2028e'],
      datasets: [
        {
          label: 'Total Habit App Market ($B)',
          data: [1.8, 2.2, 2.8, 3.4, 4.2, 5.1, 6.3, 7.7, 9.4],
          borderColor: violet, backgroundColor: violet3,
          fill: true, tension: 0.45, borderWidth: 2.5,
          pointBackgroundColor: violet, pointRadius: 4,
        },
        {
          label: 'AI-Native Segment ($B)',
          data: [0, 0, 0.1, 0.2, 0.4, 0.9, 2.0, 3.8, 6.2],
          borderColor: green, backgroundColor: 'rgba(16,185,129,0.08)',
          fill: true, tension: 0.45, borderWidth: 2,
          borderDash: [4, 3],
          pointBackgroundColor: green, pointRadius: 3,
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { usePointStyle: true, pointStyleWidth: 10 } },
        tooltip: {
          backgroundColor: 'rgba(13,13,26,0.95)',
          borderColor: 'rgba(139,92,246,0.3)', borderWidth: 1,
          callbacks: { label: ctx => ` $${ctx.raw}B` }
        }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' } },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { callback: v => `$${v}B` }
        }
      }
    }
  });
}

// ── Latency Sparkline ─────────────────────────────────────────
const latencyCtx = document.getElementById('latencyChart');
if (latencyCtx) {
  new Chart(latencyCtx, {
    type: 'bar',
    data: {
      labels: ['OpenAI', 'Anthropic', 'Gemini', 'Groq'],
      datasets: [{
        data: [2400, 1900, 1600, 420],
        backgroundColor: ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.08)', 'rgba(255,255,255,0.08)', violet],
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${ctx.raw}ms` } } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { callback: v => `${v}ms` } }
      }
    }
  });
}

// ── Retention Line ────────────────────────────────────────────
const retentionCtx = document.getElementById('retentionChart');
if (retentionCtx) {
  new Chart(retentionCtx, {
    type: 'line',
    data: {
      labels: ['D1','D3','D7','D14','D30'],
      datasets: [
        {
          label: 'Habitly',
          data: [92, 81, 71, 62, 58],
          borderColor: violet, backgroundColor: violet3,
          fill: true, tension: 0.4, borderWidth: 2.5, pointRadius: 3,
        },
        {
          label: 'Industry Avg',
          data: [75, 52, 27, 18, 12],
          borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.03)',
          fill: true, tension: 0.4, borderWidth: 1.5, borderDash: [3,3], pointRadius: 2,
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${ctx.raw}%` } } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { callback: v => `${v}%` } }
      }
    }
  });
}

// ── Adoption Donut ────────────────────────────────────────────
const adoptionCtx = document.getElementById('adoptionChart');
if (adoptionCtx) {
  new Chart(adoptionCtx, {
    type: 'doughnut',
    data: {
      labels: ['AI Coach', 'Briefing', 'Generator', 'Insights', 'Other'],
      datasets: [{
        data: [34, 26, 21, 12, 7],
        backgroundColor: [violet, '#a855f7', '#c084fc', '#e879f9', 'rgba(255,255,255,0.1)'],
        borderWidth: 0, hoverOffset: 4,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '68%',
      plugins: { legend: { position: 'right', labels: { font: { size: 10 }, boxWidth: 10, padding: 8 } } }
    }
  });
}

// ── Streak Rescue Bar ─────────────────────────────────────────
const rescueCtx = document.getElementById('rescueChart');
if (rescueCtx) {
  new Chart(rescueCtx, {
    type: 'bar',
    data: {
      labels: ['Wk 1','Wk 2','Wk 3','Wk 4','Wk 5','Wk 6'],
      datasets: [{
        label: 'Streaks rescued',
        data: [12, 18, 22, 31, 28, 35],
        backgroundColor: violet3,
        borderColor: violet,
        borderWidth: 1.5,
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, beginAtZero: true }
      }
    }
  });
}

// ── Completion Comparison ─────────────────────────────────────
const compCtx = document.getElementById('comparisonChart');
if (compCtx) {
  new Chart(compCtx, {
    type: 'bar',
    data: {
      labels: ['D1','D3','D7','D14','D21','D30'],
      datasets: [
        {
          label: 'Habitly (AI features on)',
          data: [94, 87, 78, 69, 65, 58],
          backgroundColor: violet, borderRadius: 8, barPercentage: 0.55,
        },
        {
          label: 'Static habit apps (avg)',
          data: [75, 52, 27, 18, 14, 12],
          backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8, barPercentage: 0.55,
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { usePointStyle: true, pointStyleWidth: 10 } },
        tooltip: { callbacks: { label: ctx => ` ${ctx.raw}% completion rate` } }
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { callback: v => `${v}%` }, max: 100, beginAtZero: true
        }
      }
    }
  });
}

// ── Feature Usage ─────────────────────────────────────────────
const featureCtx = document.getElementById('featureChart');
if (featureCtx) {
  new Chart(featureCtx, {
    type: 'doughnut',
    data: {
      labels: ['AI Coach','Daily Briefing','Habit Gen','Smart Insights','Skip Analyzer','Challenges','Share Card'],
      datasets: [{
        data: [28, 22, 18, 12, 9, 7, 4],
        backgroundColor: [
          '#8b5cf6','#a855f7','#c084fc','#e879f9',
          '#10b981','#f59e0b','rgba(255,255,255,0.15)'
        ],
        borderWidth: 0, hoverOffset: 4,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '60%',
      plugins: { legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 10, padding: 6 } } }
    }
  });
}

// ── GSAP hero entrance ────────────────────────────────────────
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', delay: 0.1 });
  gsap.from('.hero-title', { opacity: 0, y: 32, duration: 0.8, ease: 'power3.out', delay: 0.25 });
  gsap.from('.hero-sub', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out', delay: 0.4 });
  gsap.from('.hero-meta', { opacity: 0, y: 16, duration: 0.6, ease: 'power3.out', delay: 0.55 });
  gsap.from('.hero-actions', { opacity: 0, y: 16, duration: 0.6, ease: 'power3.out', delay: 0.65 });
  gsap.from('.kpi-card', {
    opacity: 0, y: 24, duration: 0.6, ease: 'power3.out',
    stagger: 0.1, delay: 0.8
  });
}

// ── Active nav link highlighting ──────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? '#a78bfa' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
