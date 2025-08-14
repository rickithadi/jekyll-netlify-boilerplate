// Minimal About Page JavaScript - Professional & Clean

document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections for animation
  const sections = document.querySelectorAll('.section-minimal');
  sections.forEach(section => {
    observer.observe(section);
  });

  // Subtle hover enhancements for interactive elements
  const interactiveElements = document.querySelectorAll('.content-item, .value-item, .interest-item, .location-badge');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
  });

  // Smooth scroll for CTA buttons
  const ctaButtons = document.querySelectorAll('.btn-minimal-primary, .btn-minimal-secondary');
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Add professional loading state
  document.body.classList.add('loaded');
});