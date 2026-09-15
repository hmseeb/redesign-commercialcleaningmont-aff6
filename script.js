/* Commercial Cleaning Monterey — interactions */
(function () {
  'use strict';

  /* ---------- Current year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById('siteHeader');
  var floatCta = document.querySelector('.float-cta');

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (header) header.classList.toggle('is-stuck', y > 8);
    if (floatCta) floatCta.classList.toggle('show', y > 620);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeNav();
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = Array.prototype.slice.call(el.parentNode.children);
        var idx = siblings.indexOf(el);
        el.style.transitionDelay = Math.min(idx, 5) * 70 + 'ms';
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Quote form ---------- */
  var form = document.getElementById('quoteForm');
  var note = document.getElementById('formNote');
  var EMAIL_TO = 'info@commercialcleaningmonterey.com';
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

  function setError(field, message) {
    var input = form.elements[field];
    var slot = form.querySelector('.err[data-for="' + field + '"]');
    if (slot) slot.textContent = message || '';
    if (input) input.classList.toggle('invalid', Boolean(message));
    return !message;
  }

  function validate() {
    var ok = true;
    var v = function (n) { return (form.elements[n].value || '').trim(); };

    ok = setError('name', v('name').length < 2 ? 'Please enter your name.' : '') && ok;
    ok = setError('email', !EMAIL_RE.test(v('email')) ? 'Please enter a valid email address.' : '') && ok;

    var phone = v('phone');
    ok = setError('phone', phone && phone.replace(/[^0-9]/g, '').length < 7 ? 'Please enter a valid phone number.' : '') && ok;

    ok = setError('message', v('message').length < 10 ? 'Please tell us a little about the facility.' : '') && ok;

    return ok;
  }

  if (form) {
    ['name', 'email', 'phone', 'message'].forEach(function (n) {
      var input = form.elements[n];
      if (!input) return;
      input.addEventListener('blur', function () {
        if (input.value.trim()) validate();
      });
      input.addEventListener('input', function () {
        if (input.classList.contains('invalid')) validate();
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validate()) {
        if (note) {
          note.textContent = 'Please correct the highlighted fields and try again.';
          note.classList.remove('success');
        }
        var firstBad = form.querySelector('.invalid');
        if (firstBad) firstBad.focus();
        return;
      }

      var get = function (n) { return (form.elements[n].value || '').trim(); };

      var subject = 'Quote request — ' + (get('company') || get('name'));
      var bodyLines = [
        'Name: ' + get('name'),
        'Email: ' + get('email'),
        'Phone: ' + (get('phone') || 'Not provided'),
        'Business / facility: ' + (get('company') || 'Not provided'),
        'Service needed: ' + get('service'),
        'Frequency: ' + get('frequency'),
        '',
        'Facility details:',
        get('message'),
        '',
        '— Sent from commercialcleaningmonterey.com'
      ];

      var href = 'mailto:' + EMAIL_TO +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(bodyLines.join('\n'));

      window.location.href = href;

      if (note) {
        note.textContent = 'Thanks, ' + get('name') + '! Your email app should open with the request ready to send. If it does not, email us directly at ' + EMAIL_TO + '.';
        note.classList.add('success');
      }
    });
  }

  /* ---------- Smooth anchor focus for accessibility ---------- */
  document.addEventListener('click', function (e) {
    var link = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!link) return;
    var id = link.getAttribute('href');
    if (!id || id === '#') return;
    var target = document.querySelector(id);
    if (!target) return;
    target.setAttribute('tabindex', '-1');
    window.setTimeout(function () { target.focus({ preventScroll: true }); }, 480);
  });
})();
