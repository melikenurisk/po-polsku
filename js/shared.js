// shared.js — Navigation, dark mode, and shared utilities

(function() {
  'use strict';

  // ===== DARK MODE =====
  const THEME_KEY = 'polishHub_theme';

  function getTheme() {
    return localStorage.getItem(THEME_KEY) || 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeToggle(theme);
  }

  function toggleTheme() {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  }

  function updateThemeToggle(theme) {
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  // Initialize theme on load
  function initTheme() {
    // Migrate old keys to unified key
    const oldKeys = [
      'polishHubTheme', 'polish-vocab-theme', 'theme',
      'plquiz_dark', 'polishQuizDark', 'polishGrammarTheme'
    ];
    if (!localStorage.getItem(THEME_KEY)) {
      for (const key of oldKeys) {
        const val = localStorage.getItem(key);
        if (val === 'dark' || val === 'true') {
          localStorage.setItem(THEME_KEY, 'dark');
          break;
        }
      }
    }
    setTheme(getTheme());
  }

  // ===== NAVIGATION =====
  function getCurrentPage() {
    const path = window.location.pathname;
    const file = path.split('/').pop() || 'index.html';
    return file;
  }

  function createNav() {
    const currentPage = getCurrentPage();

    const nav = document.createElement('nav');
    nav.className = 'top-nav';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Main navigation');

    nav.innerHTML = `
      <a href="index.html" class="top-nav__brand">
        <span class="top-nav__flag"><span class="top-nav__flag-top"></span><span class="top-nav__flag-bottom"></span></span>
        <span>Polish Hub</span>
      </a>
      <ul class="top-nav__links">
        <li><a href="index.html" class="top-nav__link ${currentPage === 'index.html' ? 'active' : ''}"><span class="icon">🏠</span> Home</a></li>
        <li><a href="vocabulary.html" class="top-nav__link ${currentPage === 'vocabulary.html' ? 'active' : ''}"><span class="icon">📖</span> Vocabulary</a></li>
        <li><a href="grammar.html" class="top-nav__link ${currentPage === 'grammar.html' ? 'active' : ''}"><span class="icon">📚</span> Grammar</a></li>
        <li class="top-nav__dropdown">
          <a href="#" class="top-nav__link ${currentPage.startsWith('quiz') ? 'active' : ''}" aria-haspopup="true" aria-expanded="false" onclick="event.preventDefault();var dd=this.parentElement;dd.classList.toggle('open');this.setAttribute('aria-expanded',dd.classList.contains('open'))"><span class="icon">✏️</span> Quizzes ▾</a>
          <div class="top-nav__dropdown-menu" role="menu">
            <a href="quiz-pl-en.html" class="top-nav__dropdown-item ${currentPage === 'quiz-pl-en.html' ? 'active' : ''}" role="menuitem"><span class="icon">🇵🇱→🇬🇧</span> Polish → English</a>
            <a href="quiz-en-pl.html" class="top-nav__dropdown-item ${currentPage === 'quiz-en-pl.html' ? 'active' : ''}" role="menuitem"><span class="icon">🇬🇧→🇵🇱</span> English → Polish</a>
            <a href="quiz-grammar.html" class="top-nav__dropdown-item ${currentPage === 'quiz-grammar.html' ? 'active' : ''}" role="menuitem"><span class="icon">🧠</span> Grammar Quiz</a>
          </div>
        </li>
      </ul>
      <button class="top-nav__hamburger" onclick="window.polishHub.toggleMobileNav()" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">☰</button>
    `;

    return nav;
  }

  function createMobileNav() {
    const currentPage = getCurrentPage();

    const overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    overlay.onclick = closeMobileNav;

    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.id = 'mobile-nav';
    mobileNav.innerHTML = `
      <a href="index.html" class="mobile-nav__link ${currentPage === 'index.html' ? 'active' : ''}">🏠 Home</a>
      <a href="vocabulary.html" class="mobile-nav__link ${currentPage === 'vocabulary.html' ? 'active' : ''}">📖 Vocabulary</a>
      <a href="grammar.html" class="mobile-nav__link ${currentPage === 'grammar.html' ? 'active' : ''}">📚 Grammar</a>
      <div class="mobile-nav__divider"></div>
      <div class="mobile-nav__label">Quizzes</div>
      <a href="quiz-pl-en.html" class="mobile-nav__link ${currentPage === 'quiz-pl-en.html' ? 'active' : ''}">🇵🇱→🇬🇧 Polish → English</a>
      <a href="quiz-en-pl.html" class="mobile-nav__link ${currentPage === 'quiz-en-pl.html' ? 'active' : ''}">🇬🇧→🇵🇱 English → Polish</a>
      <a href="quiz-grammar.html" class="mobile-nav__link ${currentPage === 'quiz-grammar.html' ? 'active' : ''}">🧠 Grammar Quiz</a>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(mobileNav);

    return { overlay, mobileNav };
  }

  let mobileNavEls = null;

  function toggleMobileNav() {
    if (!mobileNavEls) mobileNavEls = createMobileNav();
    mobileNavEls.overlay.classList.toggle('active');
    mobileNavEls.mobileNav.classList.toggle('active');
    var isOpen = mobileNavEls.mobileNav.classList.contains('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    var hamburger = document.querySelector('.top-nav__hamburger');
    if (hamburger) hamburger.setAttribute('aria-expanded', String(isOpen));
  }

  function closeMobileNav() {
    if (mobileNavEls) {
      mobileNavEls.overlay.classList.remove('active');
      mobileNavEls.mobileNav.classList.remove('active');
      document.body.style.overflow = '';
      var hamburger = document.querySelector('.top-nav__hamburger');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    }
  }

  // ===== SKIP LINK =====
  function createSkipLink() {
    const skip = document.createElement('a');
    skip.href = '#main-content';
    skip.className = 'skip-link';
    skip.textContent = 'Skip to content';
    return skip;
  }

  // ===== THEME TOGGLE BUTTON =====
  function createThemeToggle() {
    const btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.onclick = toggleTheme;
    return btn;
  }

  // ===== BREADCRUMBS =====
  function createBreadcrumbs(items) {
    // items: [{label, href}, ...] — last item is current (no href)
    const nav = document.createElement('nav');
    nav.className = 'breadcrumbs';
    nav.setAttribute('aria-label', 'Breadcrumb');

    items.forEach((item, i) => {
      if (i > 0) {
        const sep = document.createElement('span');
        sep.className = 'sep';
        sep.textContent = '›';
        nav.appendChild(sep);
      }
      if (item.href && i < items.length - 1) {
        const a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.label;
        nav.appendChild(a);
      } else {
        const span = document.createElement('span');
        span.className = 'current';
        span.textContent = item.label;
        nav.appendChild(span);
      }
    });

    return nav;
  }

  // ===== INITIALIZATION =====
  function init() {
    // Insert skip link
    document.body.prepend(createSkipLink());

    // Insert navigation
    document.body.prepend(createNav());

    // Insert theme toggle
    document.body.appendChild(createThemeToggle());

    // Initialize theme
    initTheme();

    // Close mobile nav on escape and dropdown keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobileNav();
        // Close any open dropdown
        var openDD = document.querySelector('.top-nav__dropdown.open');
        if (openDD) {
          openDD.classList.remove('open');
          var trigger = openDD.querySelector('.top-nav__link');
          if (trigger) {
            trigger.setAttribute('aria-expanded', 'false');
            trigger.focus();
          }
        }
      }

      // Dropdown keyboard navigation
      var dropdown = document.querySelector('.top-nav__dropdown');
      if (dropdown) {
        var trigger = dropdown.querySelector('.top-nav__link');
        var items = dropdown.querySelectorAll('.top-nav__dropdown-item');

        // Enter/Space on trigger opens dropdown
        if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === trigger) {
          e.preventDefault();
          dropdown.classList.toggle('open');
          trigger.setAttribute('aria-expanded', dropdown.classList.contains('open'));
          if (dropdown.classList.contains('open') && items.length > 0) {
            items[0].focus();
          }
        }

        // Arrow keys inside open dropdown
        if (dropdown.classList.contains('open') && items.length > 0) {
          var focusedIdx = Array.from(items).indexOf(document.activeElement);
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            var nextIdx = focusedIdx < items.length - 1 ? focusedIdx + 1 : 0;
            items[nextIdx].focus();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            var prevIdx = focusedIdx > 0 ? focusedIdx - 1 : items.length - 1;
            items[prevIdx].focus();
          }
        }
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.top-nav__dropdown')) {
        document.querySelectorAll('.top-nav__dropdown.open').forEach(d => {
          d.classList.remove('open');
          var t = d.querySelector('.top-nav__link');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  // Expose API
  window.polishHub = {
    toggleTheme,
    getTheme,
    setTheme,
    toggleMobileNav,
    closeMobileNav,
    createBreadcrumbs,
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
