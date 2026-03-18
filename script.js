// Scroll-based fade-in animations
document.addEventListener('DOMContentLoaded', () => {
  // Add fade-in class to elements
  const animateElements = document.querySelectorAll(
    '.section-header, .strength-intro, .strength-card, .cta-button, ' +
    '.service-left, .service-right, .work-card, .seminar-item, .news-item'
  );

  animateElements.forEach(el => {
    el.classList.add('fade-in');
  });

  // Intersection Observer for fade-in
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Parallax effect on hero blobs
  const blobs = document.querySelectorAll('.blob');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        blobs.forEach((blob, i) => {
          const speed = 0.1 + i * 0.05;
          blob.style.transform = `translateY(${scrollY * speed}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });
});
