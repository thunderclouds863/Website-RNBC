/* Theme toggle, active section tab, and opening the stage named in the URL.
   Every lookup is guarded so the script is safe on the 404 page too. */
(function () {
  'use strict';
  var root = document.documentElement;

  /* ---------- Theme ---------- */
  var KEY = 'rnbc-theme';
  var btn = document.getElementById('theme-toggle');
  function isDark() {
    var t = root.getAttribute('data-theme');
    if (t) return t === 'dark';
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  function syncButton() {
    if (!btn) return;
    var dark = isDark();
    btn.setAttribute('aria-pressed', String(dark));
    var label = btn.querySelector('span');
    if (label) label.textContent = dark ? 'Tema terang' : 'Tema gelap';
  }
  if (btn) {
    btn.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) { /* storage blocked: applies to this page only */ }
      syncButton();
    });
    syncButton();
  }

  /* ---------- Active tab follows the section in view ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.tabs a[href^="#"]'));
  var sections = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
  var tabList = document.querySelector('.tabs ul');
  function setActive(link) {
    links.forEach(function (a) {
      if (a === link) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
    if (link && tabList && tabList.scrollWidth > tabList.clientWidth) {
      // reveal the active tab with the smallest possible scroll
      var li = link.parentNode, left = li.offsetLeft, right = left + li.offsetWidth;
      if (left < tabList.scrollLeft) tabList.scrollLeft = left;
      else if (right > tabList.scrollLeft + tabList.clientWidth - 24) tabList.scrollLeft = right - tabList.clientWidth + 24;
    }
  }
  function updateActive() {
    var line = window.innerHeight * 0.35, current = null;
    sections.forEach(function (s, i) { if (s && s.getBoundingClientRect().top <= line) current = links[i]; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = links[links.length - 1];
    setActive(current);
  }
  if (tabList) {
    tabList.addEventListener('scroll', function () { tabList.classList.toggle('is-scrolled', tabList.scrollLeft > 2); }, { passive: true });
  }
  if (links.length) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { ticking = false; updateActive(); });
    }, { passive: true });
    updateActive();
  }

  /* ---------- Open the timeline stage or FAQ item named in the URL ---------- */
  function openFromHash() {
    if (!location.hash) return;
    var target = document.getElementById(location.hash.slice(1));
    if (!target) return;
    if (target.tagName === 'DETAILS') { target.open = true; return; }
    var d = target.querySelector('details');
    if (d && target.classList.contains('stage')) d.open = true;
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();
})();
