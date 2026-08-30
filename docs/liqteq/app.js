/* ============================================================================
   Liqteq — page behaviour.
     1. liquidType (the signature move): the hero word is a variable font whose
        glyphs flow toward the pointer and undulate with scroll — the type
        behaves like a fluid.
     2. the project drawer ("Start a project").
     3. mount the scrollcraft engine.
   The engine (scrollcraft.js) is untouched; this reads pointer + --sc-p and its
   own DOM only.
   ========================================================================== */
(function () {
  'use strict';

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)');

  /* ---- where a project brief goes (real Liqteq contact) ------------------- */
  var CONTACT = { email: 'info@liqteq.com', phone: '(832) 579-0715' };

  /* ================================================== 1 · liquid type ======= */
  (function liquidType() {
    var host = document.querySelector('[data-liquid]');
    if (!host) return;
    var word = host.textContent;
    host.textContent = '';
    host.setAttribute('aria-label', word);
    var glyphs = [];
    for (var i = 0; i < word.length; i++) {
      var s = document.createElement('span');
      s.className = 'lq';
      s.textContent = word[i];
      s.setAttribute('aria-hidden', 'true');
      host.appendChild(s);
      glyphs.push({ el: s, w: 500, tw: 500, cx: 0, cy: 0 });
    }

    var act = host.closest('[data-sc-act]');
    var pointer = { x: -9999, y: -9999, on: false };
    var vw = innerWidth;

    function measure() {
      vw = innerWidth;
      for (var i = 0; i < glyphs.length; i++) {
        var r = glyphs[i].el.getBoundingClientRect();
        glyphs[i].cx = r.left + r.width / 2;
        glyphs[i].cy = r.top + r.height / 2;
      }
    }
    // measure after fonts settle (glyph boxes depend on the real face)
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    addEventListener('resize', measure, { passive: true });
    addEventListener('scroll', function () { /* boxes move with scroll */ measure(); }, { passive: true });
    setTimeout(measure, 300);

    if (fine.matches && !reduce) {
      addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        pointer.x = e.clientX; pointer.y = e.clientY; pointer.on = true;
      }, { passive: true });
      addEventListener('pointerleave', function () { pointer.on = false; }, { passive: true });
    }

    var radius = 260;           // px of pointer influence
    var t0 = performance.now();
    var live = true;
    if ('IntersectionObserver' in window && act) {
      new IntersectionObserver(function (es) { live = es[0].isIntersecting; }, { threshold: 0.01 })
        .observe(act);
    }

    function scrollP() {
      if (!act) return 0;
      var v = parseFloat(getComputedStyle(act).getPropertyValue('--sc-p'));
      return isNaN(v) ? 0 : v;
    }

    function frame(now) {
      requestAnimationFrame(frame);
      if (!live) return;
      var t = (now - t0) / 1000;
      var p = scrollP();
      for (var i = 0; i < glyphs.length; i++) {
        var g = glyphs[i];
        // base: a slow wave travelling across the letters
        var wave = reduce ? 0 : Math.sin(t * 1.1 + i * 0.6) * 70;
        // scroll deepens the weight as the hero settles
        var scroll = p * 130;
        // pointer pull (desktop only)
        var pull = 0;
        if (pointer.on) {
          var dx = pointer.x - g.cx, dy = pointer.y - g.cy;
          var d = Math.sqrt(dx * dx + dy * dy);
          pull = Math.max(0, 1 - d / radius);
          pull = pull * pull; // ease
        }
        g.tw = 400 + wave + scroll + pull * 300;
        // lerp toward target for a fluid, weighted feel
        g.w += (g.tw - g.w) * 0.12;
        var wv = Math.max(300, Math.min(700, g.w));
        g.el.style.fontVariationSettings = '"wght" ' + wv.toFixed(0);
        if (!reduce) {
          var lift = pull * 8 + (wave / 70) * 2;
          g.el.style.transform = 'translateY(' + (-lift).toFixed(2) + 'px) scaleY(' + (1 + pull * 0.05).toFixed(3) + ')';
        }
      }
    }
    requestAnimationFrame(frame);
  })();

  /* ================================================ 2 · project drawer ====== */
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

  /* ===================================================== 3 · mount engine === */
  if (window.ScrollCraft && ScrollCraft.mount) ScrollCraft.mount(document.body);
})();
