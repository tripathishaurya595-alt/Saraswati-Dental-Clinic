const CONFIG = {
  businessName: "Saraswati Dental Clinic",
  tagline: "Trusted Dental Care for the Whole Family",
  phone: "+91-92353-98009",
  phoneTel: "+919235398009",
  whatsapp: "919235398009",
  whatsappMessage: "Hi, I'd like to book an appointment at Saraswati Dental Clinic.",
  address: "123, Hazratganj, Lucknow, Uttar Pradesh - 226001",
  email: "info@saraswatidental.in",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.8!2d80.9462!3d26.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUwJzQ4LjEiTiA4MMKwNTYnNDYuMyJF!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin",
  googleReviewUrl: "#",
  doctorName: "Dr. Devesh Mishra",
  doctorQual: "BDS, MDS – Oral & Maxillofacial Surgery",
  year: "2024"
};

// Inject CONFIG values into DOM
function applyConfig() {
  document.querySelectorAll('[data-config]').forEach(el => {
    const key = el.getAttribute('data-config');
    if (CONFIG[key]) el.textContent = CONFIG[key];
  });

  document.querySelectorAll('[data-config-href]').forEach(el => {
    const key = el.getAttribute('data-config-href');
    if (key === 'phone') el.href = `tel:${CONFIG.phoneTel}`;
    if (key === 'whatsapp') el.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
    if (key === 'email') el.href = `mailto:${CONFIG.email}`;
    if (key === 'mapEmbed') el.src = CONFIG.mapEmbedUrl;
  });

  document.querySelectorAll('[data-config-map]').forEach(el => {
    el.src = CONFIG.mapEmbedUrl;
  });

  document.querySelectorAll('.footer-year').forEach(el => {
    el.textContent = CONFIG.year;
  });
}

// Mobile nav toggle
function initMobileNav() {
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('nav-overlay');

  if (!burger) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });

  overlay.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });

  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      overlay.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });
}

// Sticky header
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// Active nav link
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Intersection Observer for fade-in
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

// Contact form validation + success
function initContactForm() {
  const form = document.getElementById('appointment-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      }
    });

    if (valid) {
      const name = form.querySelector('[name="fname"]').value.split(' ')[0];
      form.innerHTML = `
        <div class="form-success">
          <div class="success-icon">✓</div>
          <h3>Thank you, ${name}!</h3>
          <p>We've received your Form and will reply you within 2 hours during clinic hours.</p>
          <p style="margin-top:0.5rem;font-size:0.875rem;color:var(--text-muted)">For urgent needs, call us directly at <a href="tel:${CONFIG.phoneTel}" style="color:var(--teal)">${CONFIG.phone}</a></p>
        </div>`;
    }
  });
}

// Newsletter form (blog page)
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.innerHTML = `<p class="newsletter-success">✓ You're subscribed! Dental tips coming your way.</p>`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  initMobileNav();
  initStickyHeader();
  setActiveNav();
  initScrollAnimations();
  initContactForm();
  initNewsletterForm();
});
