/* Site behaviour: mobile menu and light/dark theme.
   Every lookup is guarded so the same script works on every page. */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Theme ---------- */
  var THEME_KEY = 'rnbc-theme';
  var themeBtn = document.getElementById('theme-toggle');

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function currentTheme() {
    return root.getAttribute('data-theme') || (systemPrefersDark() ? 'dark' : 'light');
  }
  function syncThemeButton() {
    if (!themeBtn) return;
    var dark = currentTheme() === 'dark';
    themeBtn.setAttribute('aria-pressed', String(dark));
    themeBtn.setAttribute('aria-label', dark ? 'Gunakan tema terang' : 'Gunakan tema gelap');
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* storage blocked: theme lasts for this page only */ }
      syncThemeButton();
    });
    syncThemeButton();
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    if (!menuBtn || !nav) return;
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuBtn.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
  }

  /* ---------- Open the timeline stage named in the URL hash ---------- */
  function openFromHash() {
    if (!location.hash) return;
    var target = document.getElementById(location.hash.slice(1));
    if (!target) return;
    var details = target.tagName === 'DETAILS' ? target : target.querySelector('details');
    if (details) details.open = true;
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();
})();
