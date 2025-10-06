// year
document.getElementById('year').textContent = new Date().getFullYear();

// mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links  = document.querySelector('.Nav__links');
toggle?.addEventListener('click', () => links.classList.toggle('open'));

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if(id.length > 1){
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:'smooth'});
      links.classList.remove('open');
      history.pushState(null,'',id);
    }
  });
});

// contact form demo feedback
const form = document.getElementById('contactForm');
const msg  = document.getElementById('formMsg');
form?.addEventListener('submit', e=>{
  e.preventDefault();
  if(!form.reportValidity()) return;
  msg.textContent = "Thanks — I’ll get back to you soon!";
  form.reset();
});

// Simple JS lightbox
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('img');
const lbClose = lb.querySelector('.lb-close');
const galleryLinks = [...document.querySelectorAll('[data-lb]')];

function openLB(src){ lbImg.src = src; lb.hidden = false; lb.focus(); }
function closeLB(){ lb.hidden = true; lbImg.src = ''; }

galleryLinks.forEach((a,i)=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    openLB(a.getAttribute('href'));
    lb.dataset.idx = i;
  });
});

lbClose.addEventListener('click', closeLB);
lb.addEventListener('click', e=>{ if(e.target === lb) closeLB(); });
document.addEventListener('keydown', e=>{
  if(lb.hidden) return;
  if(e.key === 'Escape') closeLB();
  if(e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
    const idx = parseInt(lb.dataset.idx||'0',10);
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const next = (idx + dir + galleryLinks.length) % galleryLinks.length;
    lb.dataset.idx = next;
    openLB(galleryLinks[next].getAttribute('href'));
  }
});
