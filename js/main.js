// Elevve — interações globais

document.addEventListener('DOMContentLoaded', () => {
  /* Nav mobile toggle */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open');
    });

    // Dropdown accordion on mobile
    document.querySelectorAll('.nav-item.has-dropdown > .nav-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 980) {
          e.preventDefault();
          link.parentElement.classList.toggle('is-open');
        }
      });
    });
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* Project filters (Projetos page) */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const filter = btn.dataset.filter;
        projectCards.forEach((card) => {
          const match = filter === 'todos' || card.dataset.sector === filter;
          card.classList.toggle('is-hidden', !match);
        });
      });
    });
  }

  /* Contact form (demo only — no backend) */
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = document.querySelector('.form-success');
      if (success) {
        success.classList.add('is-visible');
        form.reset();
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  /* Active nav link based on current path */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach((link) => {
    if (link.dataset.page === path) link.classList.add('is-active');
  });
});
