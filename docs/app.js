/* ============================================================================
   Coarts Lighting — page behaviour.
     1. the dimmer (the signature move): re-lights the whole page from two
        numbers, and remembers where the visitor left it
     2. the enquiry drawer (browse + enquire, no cart, no invented prices)
     3. mobile nav sheet + a stuck-state on the bar
     4. mount the scrollcraft engine
   The engine (scrollcraft.js) is never touched; this only reads/writes CSS
   custom properties and its own DOM.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* --- where a completed enquiry goes. The client sets these to go live; until
        then the form composes the message and opens a mail draft on their own
        domain. Nothing is invented and nothing is sent silently. -------------- */
  // Real Coarts contact. The enquiry form composes a message to the inbox; set
  // `whatsapp` (digits only, with country code) to route to WhatsApp instead.
  var CONTACT = {
    email: 'info@coartslighting.com',
    phone: '+92 21 111 509 509',
    whatsapp: '',     // e.g. '922111509509' to send the enquiry via WhatsApp
    website: 'https://www.coartslighting.com'
  };

  /* ======================================================== 1 · the dimmer == */
  var warmEl = document.querySelector('[data-warm]');
  var brightEl = document.querySelector('[data-bright]');
  var kelvinOut = document.querySelector('[data-kelvin]');
  var kelvinMark = document.querySelector('[data-kelvin-marker]');

  function kelvinFor(warm) {
    // warm 1 -> ~2200K candle, warm 0 -> ~6500K daylight. Round to a tidy 50K.
    var k = 6500 - warm * 4300;
    return Math.round(k / 50) * 50;
  }

  function applyRoom(warm, bright) {
    root.style.setProperty('--room-warm', warm.toFixed(3));
    root.style.setProperty('--room-bright', bright.toFixed(3));
    var k = kelvinFor(warm) + 'K';
    if (kelvinOut) kelvinOut.textContent = k;
    if (kelvinMark) kelvinMark.setAttribute('data-k', k);
  }

  function readDimmer() {
    var warm = (parseFloat(warmEl.value) || 0) / 100;
    var bright = (parseFloat(brightEl.value) || 0) / 100;
    applyRoom(warm, bright);
    store.set('coarts.warm', warmEl.value);
    store.set('coarts.bright', brightEl.value);
  }

  if (warmEl && brightEl) {
    // restore a remembered room
    var sw = store.get('coarts.warm'), sb = store.get('coarts.bright');
    if (sw !== null) warmEl.value = sw;
    if (sb !== null) brightEl.value = sb;
    applyRoom((parseFloat(warmEl.value) || 0) / 100, (parseFloat(brightEl.value) || 0) / 100);
    warmEl.addEventListener('input', readDimmer);
    brightEl.addEventListener('input', readDimmer);
  }

  // On small screens the dimmer can be tucked away by tapping its title.
  var dimmer = document.querySelector('[data-dimmer]');
  var dimHead = dimmer && dimmer.querySelector('.dimmer__head');
  if (dimmer && dimHead && matchMedia('(max-width: 860px)').matches) {
    dimHead.style.cursor = 'pointer';
    dimHead.addEventListener('click', function () { dimmer.classList.toggle('is-min'); });
  }

  /* =============================================== 2 · the enquiry drawer ==== */
  var drawer = document.querySelector('[data-drawer]');
  var scrim = document.querySelector('[data-enq-scrim]');
  var listEl = document.querySelector('[data-enq-list]');
  var countEl = document.querySelector('[data-enq-count]');
  var statusEl = document.querySelector('[data-enq-status]');
  var items = [];
  try { items = JSON.parse(store.get('coarts.enq') || '[]') || []; } catch (e) { items = []; }
  var lastFocus = null;

  function persist() { store.set('coarts.enq', JSON.stringify(items)); }

  function renderList() {
    if (countEl) {
      countEl.textContent = String(items.length);
      countEl.hidden = items.length === 0;
    }
    if (!listEl) return;
    if (!items.length) {
      listEl.innerHTML = '<p class="drawer__empty">No products yet. Tap <b>Enquire</b> on anything in the range and it lands here.</p>';
      return;
    }
    listEl.innerHTML = items.map(function (it, i) {
      return '<div class="enq-item"><span class="thumb" aria-hidden="true"></span>' +
        '<span class="meta"><strong>' + esc(it.name) + '</strong><span>' + esc(it.meta) + '</span></span>' +
        '<button class="rm" type="button" data-rm="' + i + '">Remove</button></div>';
    }).join('');
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function openDrawer() {
    lastFocus = document.activeElement;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    if (scrim) { scrim.hidden = false; requestAnimationFrame(function () { scrim.classList.add('is-open'); }); }
    var f = drawer.querySelector('button, input, textarea, a');
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
    if (e.key === 'Escape') closeDrawer();
    if (e.key === 'Tab') {
      var f = drawer.querySelectorAll('button, input, textarea, a, [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  function addItem(name, meta) {
    if (items.some(function (it) { return it.name === name; })) { openDrawer(); return; }
    items.push({ name: name, meta: meta });
    persist(); renderList(); openDrawer();
  }

  document.addEventListener('click', function (e) {
    var add = e.target.closest('[data-add]');
    if (add) { addItem(add.getAttribute('data-add'), add.getAttribute('data-meta') || ''); return; }
    if (e.target.closest('[data-enq-open]')) { openDrawer(); closeNav(); return; }
    if (e.target.closest('[data-enq-close]') || e.target.closest('[data-enq-scrim]')) { closeDrawer(); return; }
    var rm = e.target.closest('[data-rm]');
    if (rm) { items.splice(parseInt(rm.getAttribute('data-rm'), 10), 1); persist(); renderList(); }
  });

  var form = document.querySelector('[data-enq-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get('name') || '').toString().trim();
      var contact = (data.get('contact') || '').toString().trim();
      var note = (data.get('note') || '').toString().trim();
      var lines = ['Enquiry from ' + (name || 'a visitor') + ' (' + (contact || 'no contact given') + ')', ''];
      if (items.length) { lines.push('Pieces:'); items.forEach(function (it) { lines.push('  • ' + it.name + ' · ' + it.meta); }); lines.push(''); }
      else { lines.push('Pieces: (none selected yet)', ''); }
      if (note) lines.push('Note: ' + note);
      var body = lines.join('\n');

      var opened = false;
      if (CONTACT.whatsapp) {
        window.open('https://wa.me/' + CONTACT.whatsapp + '?text=' + encodeURIComponent(body), '_blank', 'noopener');
        opened = true;
      } else if (CONTACT.email) {
        var subject = 'Coarts enquiry' + (items.length ? ': ' + items.length + ' piece' + (items.length > 1 ? 's' : '') : '');
        window.location.href = 'mailto:' + CONTACT.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        opened = true;
      }
      if (statusEl) statusEl.textContent = opened
        ? 'Opening your message to Coarts. Thank you; we reply within a business day.'
        : 'Thank you. Your list is ready; reach us at coartslighting.com and we will follow up within a business day.';
    });
  }

  renderList();

  /* ================================================= 3 · nav sheet + bar ==== */
  var sheet = document.querySelector('[data-nav-sheet]');
  function closeNav() {
    if (!sheet) return;
    sheet.classList.remove('is-open');
    var b = document.querySelector('[data-nav-open]');
    if (b) b.setAttribute('aria-expanded', 'false');
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-nav-open]')) {
      sheet.classList.add('is-open');
      e.target.closest('[data-nav-open]').setAttribute('aria-expanded', 'true');
    }
    if (e.target.closest('[data-nav-close]')) closeNav();
    if (e.target.closest('[data-nav-link]')) closeNav();
  });

  var bar = document.getElementById('bar');
  if (bar) {
    var onScroll = function () { bar.classList.toggle('is-stuck', (window.scrollY || 0) > 24); };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  var y = document.querySelector('[data-year]');
  if (y) y.textContent = String(new Date().getFullYear());

  /* ======================================================= 4 · mount engine == */
  if (window.ScrollCraft && ScrollCraft.mount) ScrollCraft.mount(document.body);
})();
