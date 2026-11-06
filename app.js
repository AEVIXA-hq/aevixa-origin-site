'use strict';
(function () {
  const menuButton = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-nav');
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', function () {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
      mobileMenu.hidden = expanded;
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.hidden = true;
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
      });
    });
  }
  const form = document.getElementById('scope-form');
  if (!form) return;
  const allowed = {
    language: new Set(['python', 'mixed']),
    size: new Set(['under-50', '50-to-250', 'over-250', 'unsure']),
    goal: new Set(['risk-leads', 'maintenance-review', 'exploratory'])
  };
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const values = {
      language: document.getElementById('language').value,
      size: document.getElementById('size').value,
      goal: document.getElementById('goal').value
    };
    const message = document.getElementById('message');
    if (!allowed.language.has(values.language) || !allowed.size.has(values.size) ||
      !allowed.goal.has(values.goal) || !document.getElementById('ack').checked) {
      message.textContent = 'Select your scope and confirm the acknowledgment.';
      return;
    }
    const draft = {
      schema: 'origin.product001.scope-draft.v1',
      sample_only: true,
      no_customer_identity: true,
      scan_authorized: false,
      outreach_authorized: false,
      delivery_authorized: false,
      payment_authorized: false,
      scope: values,
      note: 'Browser-generated local draft; no inquiry was transmitted and no order placed.'
    };
    const blob = new Blob([JSON.stringify(draft, null, 2) + '\n'], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'origin-product001-scope-draft.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    message.textContent = 'Scope draft downloaded locally. No information was sent.';
  });
})();
