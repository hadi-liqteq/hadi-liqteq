/* ============================================================================
   Liqteq — page behaviour.
     1. the project drawer ("Start a project").
     2. mount the scrollcraft engine.
   The signature move (the shipped-apps rack that assembles as you scroll) is
   pure CSS driven off the act's --sc-p; no JS needed for it. The engine
   (scrollcraft.js) is untouched.
   ========================================================================== */
(function () {
  'use strict';

  var CONTACT = { email: 'info@liqteq.com', phone: '(832) 579-0715' };

  var drawer = document.querySelector('[data-drawer]');
  var scrim = document.querySelector('[data-proj-scrim]');
  var statusEl = document.querySelector('[data-proj-status]');
  var lastFocus = null;

  function openDrawer() {
    lastFocus = document.activeElement;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    if (scrim) { scrim.hidden = false; requestAnimationFrame(function () { scrim.classList.add('is-open'); }); }
    var f = drawer.querySelector('input, button, textarea, a');
    if (f) f.focus();
    document.addEventListener('keydown', onKey);
  }
  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    if (scrim) { scrim.classList.remove('is-open'); setTimeout(function () { scrim.hidden = true; }, 260); }
    document.removeEventListener('keydown', onKey);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function onKey(e) {
    if (e.key === 'Escape') return closeDrawer();
    if (e.key !== 'Tab') return;
    var f = drawer.querySelectorAll('input, button, textarea, a, [tabindex]:not([tabindex="-1"])');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-proj-open]')) return openDrawer();
    if (e.target.closest('[data-proj-close]') || e.target.closest('[data-proj-scrim]')) return closeDrawer();
    var chip = e.target.closest('[data-chip]');
    if (chip) { chip.setAttribute('aria-pressed', chip.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); }
    if (e.target.closest('[data-proj-send]')) submitBrief();
  });

  function val(sel) { var el = drawer.querySelector(sel); return el ? el.value.trim() : ''; }

  function submitBrief() {
    var form = drawer.querySelector('[data-proj-form]');
    if (form && !form.reportValidity()) return;
    var needs = Array.prototype.slice
      .call(drawer.querySelectorAll('[data-chip][aria-pressed="true"]'))
      .map(function (c) { return c.getAttribute('data-chip'); });
    var lines = [
      'Project brief from ' + (val('#p-name') || 'a visitor') + (val('#p-company') ? ' (' + val('#p-company') + ')' : ''),
      'Email: ' + (val('#p-email') || 'not given'),
      '',
      'Needs: ' + (needs.length ? needs.join(', ') : 'not specified'),
      '',
      'About: ' + (val('#p-note') || '(none)')
    ];
    var subject = 'New project brief' + (needs.length ? ': ' + needs.join(', ') : '');
    window.location.href = 'mailto:' + CONTACT.email +
      '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
    if (statusEl) statusEl.textContent = 'Opening your email to Liqteq. Thank you; we reply within a business day.';
  }

  var y = document.querySelector('[data-year]');
  if (y) y.textContent = String(new Date().getFullYear());

  // Real screenshots (.shot) are optional: if one can't load (offline preview,
  // blocked origin, broken URL), fall back to the branded placeholder screen
  // that's already underneath it rather than showing a broken image.
  function dropShot(img) {
    var iphone = img.closest('.iphone');
    if (iphone) iphone.classList.remove('has-shot');
    img.remove();
  }
  Array.prototype.forEach.call(document.querySelectorAll('.iphone.has-shot .shot'), function (img) {
    if (img.complete && img.naturalWidth === 0) return dropShot(img);
    img.addEventListener('error', function () { dropShot(img); });
  });

  if (window.ScrollCraft && ScrollCraft.mount) ScrollCraft.mount(document.body);
})();
