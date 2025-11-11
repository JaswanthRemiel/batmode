(function () {
  const STORAGE_KEY = 'site-color-scheme';
  const CLASS = 'dark';

  function prefersDark() {
    try {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  }

  function getStored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function store(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      // ignore
    }
  }

  function applyTheme(isDark) {
    const root = document.documentElement;
    if (isDark) root.classList.add(CLASS);
    else root.classList.remove(CLASS);
  }

  function init() {
    const stored = getStored();
    const isDark = stored ? (stored === 'dark') : prefersDark();
    applyTheme(isDark);
    injectToggle(isDark);
  }

  function toggleTheme() {
    const root = document.documentElement;
    const isNowDark = !root.classList.contains(CLASS);
    applyTheme(isNowDark);
    store(isNowDark ? 'dark' : 'light');
    // update aria-pressed
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.setAttribute('aria-pressed', isNowDark ? 'true' : 'false');
  }

  function injectToggle(isDark) {
    if (document.getElementById('theme-toggle')) return; // already injected

    const btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.type = 'button';
    btn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');

    const icon = document.createElement('span');
    icon.className = 'icon';
    icon.innerHTML = isDark ? '☀️' : '🌙';
    btn.appendChild(icon);

    btn.addEventListener('click', function () {
      toggleTheme();
      const iconSpan = btn.querySelector('.icon');
      const nowDark = document.documentElement.classList.contains(CLASS);
      iconSpan.innerHTML = nowDark ? '☀️' : '🌙';
      btn.title = nowDark ? 'Switch to light mode' : 'Switch to dark mode';
    });

    // Wait for DOM ready to append to body
    if (document.body) {
      document.body.appendChild(btn);
    } else {
      window.addEventListener('DOMContentLoaded', function () {
        document.body.appendChild(btn);
      });
    }
  }

  // Initialize as early as possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
