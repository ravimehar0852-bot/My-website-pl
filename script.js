/* ============================================
   KTS CABS — Shared behaviours
   ============================================ */

const WA_NUMBER = "918737993690";

function waLink(message){
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

function showToast(msg){
  let t = document.querySelector('.toast');
  if(!t){ t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(()=> t.classList.remove('show'), 2600);
}

document.addEventListener('DOMContentLoaded', () => {
  /* Drawer */
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close');
  function openDrawer(){ drawer?.classList.add('open'); overlay?.classList.add('open'); }
  function closeDrawer(){ drawer?.classList.remove('open'); overlay?.classList.remove('open'); }
  toggle?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:0.12});
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* WhatsApp buttons */
  document.querySelectorAll('[data-wa]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const msg = btn.getAttribute('data-wa') || "Hi KTS Cabs, I'd like to book a taxi!";
      window.open(waLink(msg), '_blank');
    });
  });

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });
  const firstFaq = document.querySelector('.faq-item');
  if(firstFaq){
    firstFaq.classList.add('open');
    const a = firstFaq.querySelector('.faq-a');
    if(a) a.style.maxHeight = a.scrollHeight + 'px';
  }

  /* Search widget tabs */
  document.querySelectorAll('.sw-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.sw-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.sw-panel').forEach(p => p.style.display = 'none');
      const panel = document.getElementById(tab.dataset.panel);
      if(panel) panel.style.display = 'block';
    });
  });

  document.querySelectorAll('.sw-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const group = pill.closest('.sw-pill-row');
      group.querySelectorAll('.sw-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  /* Default date/time fields */
  document.querySelectorAll('.js-today').forEach(el => {
    const d = new Date();
    el.value = `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`;
  });
  document.querySelectorAll('.js-now').forEach(el => {
    const d = new Date();
    let h = d.getHours(); const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    el.value = `${String(h).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')} ${ampm}`;
  });

  /* Search Cab -> go to cab-list.html */
  document.querySelectorAll('.js-search-cab').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = 'cab-list.html';
    });
  });
});
