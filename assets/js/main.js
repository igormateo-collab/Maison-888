
// Simple media modal (image or PDF)
const modal = document.getElementById('mediaModal');
const modalContent = document.getElementById('mediaContent');
const modalTitle = document.getElementById('mediaTitle');

function openImage(src, alt='') {
  document.body.classList.add('modal-open');
  modal.classList.remove('hidden');
  modalTitle.textContent = 'Visualização de imagem';
  modalContent.innerHTML = `<img src="${src}" alt="${alt}" class="max-h-[80vh] w-auto rounded-xl" />`;
}

function openPdf(src, label='Documento') {
  document.body.classList.add('modal-open');
  modal.classList.remove('hidden');
  modalTitle.textContent = label;
  // Hint to hide default UI in some browsers
  const url = `${src}#toolbar=0&navpanes=0&scrollbar=1&zoom=page-width`;
  modalContent.innerHTML = `<iframe src="${url}" class="w-[90vw] max-w-[1100px] h-[80vh] rounded-xl bg-white" title="${label}"></iframe>`;
}

function closeModal() {
  modal.classList.add('hidden');
  modalContent.innerHTML='';
  document.body.classList.remove('modal-open');
}
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', (e)=>{ if(e.target.id==='modalOverlay'){ closeModal(); } });

// Wire thumbs
document.querySelectorAll('[data-image-src]').forEach(el=>{
  el.addEventListener('click', ()=> openImage(el.dataset.imageSrc, el.getAttribute('alt') || ''));
});

// Wire PDF view buttons
document.querySelectorAll('[data-pdf-src]').forEach(btn=>{
  btn.addEventListener('click', ()=> openPdf(btn.dataset.pdfSrc, btn.dataset.pdfTitle || 'Documento'));
});

// WhatsApp form submit (no page reload)
const leadForm = document.getElementById('leadForm');
if (leadForm) {
  leadForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = leadForm.querySelector('input[name="name"]').value.trim();
    const email = leadForm.querySelector('input[name="email"]').value.trim();
    const phone = leadForm.querySelector('input[name="phone"]').value.trim();
    const msg = leadForm.querySelector('textarea[name="message"]').value.trim();
    const base = 'https://wa.me/5571991168766?text=';
    const text = encodeURIComponent(
      `Olá! Tenho interesse no Maison 888.\n\nNome: ${name}\nE-mail: ${email}\nWhatsApp: ${phone}\n${msg ? 'Mensagem: '+msg : ''}`
    );
    window.open(base+text, '_blank');
  });
}
