const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');

function getSavedTheme() {
  try {
    const theme = localStorage.getItem('theme');
    return theme === 'dark' || theme === 'light' ? theme : null;
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Theme switching still works when storage is unavailable.
  }
}

const savedTheme = getSavedTheme();
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  themeToggle?.setAttribute('aria-pressed', String(isDark));
  themeToggle?.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
}

applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle?.addEventListener('click', () => {
  const theme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
  saveTheme(theme);
  applyTheme(theme);
});

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
