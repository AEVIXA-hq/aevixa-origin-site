"use strict";
(function () {
  const f = document.getElementById('scope-form');
  if (!f) return;
  const valid = {
    language: new Set(['python','mixed']),
    size: new Set(['under-50','50-to-250','over-250','unsure']),
    goal: new Set(['risk-leads','maintenance-review','exploratory'])
  };
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    const v = {language:document.getElementById('language').value,
      size:document.getElementById('size').value,
      goal:document.getElementById('goal').value};
    const msg = document.getElementById('message');
    if (!valid.language.has(v.language) || !valid.size.has(v.size) ||
      !valid.goal.has(v.goal) || !document.getElementById('ack').checked) {
      msg.textContent = 'Please complete the scope fields and acknowledgment.'; return;
    }
    const request = {
      schema:'origin.product001.scope-draft.v1',
      sample_only:true,
      no_customer_identity:true,
      scan_authorized:false,
      outreach_authorized:false,
      delivery_authorized:false,
      payment_authorized:false,
      scope:v,
      note:'Browser-generated local draft; no inquiry was transmitted and no order placed.'
    };
    const blob = new Blob([JSON.stringify(request, null, 2)+'\n'], {type:'application/json'});
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url; link.download = 'origin-product001-scope-draft.json';
    document.body.appendChild(link); link.click(); link.remove();
    URL.revokeObjectURL(url);
    msg.textContent = 'Scope draft saved on this device. No information was sent.';
  });
})();
