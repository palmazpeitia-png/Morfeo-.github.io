// ===== Helpers =====
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];

// Año en footer
$('#year').textContent = new Date().getFullYear();

// ===== Navbar móvil =====
const toggleBtn = $('.nav__toggle');
const menu = $('#menu');
toggleBtn?.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  toggleBtn.setAttribute('aria-expanded', open);
});

// Cerrar menú al navegar
menu?.addEventListener('click', e => {
  if(e.target.matches('a')) {
    menu.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }
});

// ===== Modo oscuro/claro =====
const themeBtn = $('#themeToggle');
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if(saved === 'light') root.classList.add('light');

const setIcon = () => themeBtn.textContent = root.classList.contains('light') ? '🌞' : '🌙';
setIcon();

themeBtn.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  setIcon();
});

// ===== Typing effect =====
const roles = [
  "Web Developer (HTML, CSS, JS)",
  "Diseñador en Adobe (PS/AI/PR/AE)",
  "Especialista en WordPress y PHP",
  "Estratega de Marketing Digital"
];
const typingEl = $('.typing');
let ri=0, ci=0, typingForward=true;

function typeLoop(){
  const text = roles[ri];
  typingEl.textContent = text.slice(0, ci);
  ci += typingForward ? 1 : -1;

  if (ci === text.length + 1){ typingForward = false; setTimeout(typeLoop, 1000); return; }
  if (ci === 0){ typingForward = true; ri = (ri+1) % roles.length; }

  setTimeout(typeLoop, typingForward ? 55 : 25);
}
typeLoop();

// ===== Reveal on scroll (IntersectionObserver) =====
const io = new IntersectionObserver((entries)=>{
  entries.forEach(ent=>{
    if(ent.isIntersecting){
      ent.target.classList.add('is-visible');
      io.unobserve(ent.target);
    }
  });
},{threshold:.16});
$$('.reveal').forEach(el=>io.observe(el));

// ===== Filtros de proyectos =====
const chips = $$('.chip');
const cards = $$('.card');
chips.forEach(chip=>{
  chip.addEventListener('click', ()=>{
    chips.forEach(c=>c.classList.remove('is-active'));
    chip.classList.add('is-active');
    const cat = chip.dataset.filter;
    cards.forEach(card=>{
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
    });
  });
});

// ===== Modal de proyecto =====
const modal = $('#modal');
const modalTitle = $('#modalTitle');
const modalDesc = $('#modalDesc');
const modalGallery = $('#modalGallery');
const modalClose = $('.modal__close');

$$('[data-modal]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const data = JSON.parse(btn.dataset.modal);
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc || '';
    modalGallery.innerHTML = '';
    (data.imgs || []).forEach(src=>{
      const img = new Image();
      img.src = src;
      img.alt = data.title;
      modalGallery.appendChild(img);
    });
    modal.showModal();
  });
});
modalClose.addEventListener('click', ()=> modal.close());
modal.addEventListener('click', (e)=>{ if(e.target === modal) modal.close(); });

// ===== Barras de habilidades (animan al entrar en viewport) =====
const barsIO = new IntersectionObserver((entries)=>{
  entries.forEach(ent=>{
    if(ent.isIntersecting){
      const bar = ent.target;
      const val = bar.dataset.value;
      bar.querySelector('i').style.width = val + '%';
      barsIO.unobserve(bar);
    }
  });
},{threshold:.5});
$$('.bar').forEach(b=>barsIO.observe(b));

// ===== Contadores (logros) =====
const countIO = new IntersectionObserver((entries)=>{
  entries.forEach(ent=>{
    if(ent.isIntersecting){
      const el = ent.target; const target = +el.dataset.target;
      let n = 0; const step = Math.ceil(target/60);
      const t = setInterval(()=>{ n += step; if(n>=target){ n=target; clearInterval(t);} el.textContent = n; }, 20);
      countIO.unobserve(el);
    }
  });
},{threshold:.6});
$$('.count').forEach(c=>countIO.observe(c));

// ===== Slider testimonios =====
const track = $('#sliderTrack');
let idx = 0;
const go = dir => {
  const slides = $$('.slide', track);
  idx = (idx + dir + slides.length) % slides.length;
  track.scrollTo({left: slides[idx].offsetLeft, behavior: 'smooth'});
};
$('.prev').addEventListener('click', ()=>go(-1));
$('.next').addEventListener('click', ()=>go(1));

// ===== Validación simple del formulario (cliente) =====
$('#contactForm').addEventListener('submit', e=>{
  e.preventDefault();
  let ok = true;
  const nombre = $('#nombre'), email = $('#email'), msg = $('#mensaje');
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  [['Nombre', nombre, v=>v.trim().length>=2],
   ['Email', email, v=>emailRx.test(v)],
   ['Mensaje', msg, v=>v.trim().length>=10]
  ].forEach(([label, input, test])=>{
    const error = input.parentElement.querySelector('.error');
    if(!test(input.value)){
      ok = false; error.textContent = `Revisa el campo ${label.toLowerCase()}.`;
      input.setAttribute('aria-invalid','true');
    } else {
      error.textContent = ''; input.removeAttribute('aria-invalid');
    }
  });

  const formMsg = $('#formMsg');
  if(ok){
    formMsg.textContent = '¡Gracias! Te responderé a la brevedad.';
    formMsg.style.color = 'var(--brand)';
    e.target.reset();
  } else {
    formMsg.textContent = 'Faltan datos. Échales un ojo 😉';
    formMsg.style.color = '#ff6767';
  }
});

