// Navigation toggle with performance and accessibility support
(function() {
  'use strict';

  var isAnimating = false;
  var ANIMATION_DURATION = 300;

  function initNavigation() {
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    var navigation = document.querySelector('.navigation');
    var body = document.body;

    if (!navToggle || !navLinks || !navigation) {
      return;
    }

    function toggleMenu() {
      if (isAnimating) {
        return;
      }

      isAnimating = true;
      var isOpen = navLinks.classList.contains('nav-links--open');

      requestAnimationFrame(function() {
        navLinks.classList.toggle('nav-links--open');
        navToggle.classList.toggle('nav-toggle--open');
        navigation.classList.toggle('navigation--open');
        navToggle.setAttribute('aria-expanded', !isOpen);

        if (!isOpen) {
          body.style.overflow = 'hidden';
          body.setAttribute('data-nav-open', 'true');
        } else {
          body.style.overflow = '';
          body.removeAttribute('data-nav-open');
        }
      });

      setTimeout(function() {
        isAnimating = false;
      }, ANIMATION_DURATION);
    }

    function closeMenu() {
      if (isAnimating) {
        return;
      }

      isAnimating = true;

      requestAnimationFrame(function() {
        navLinks.classList.remove('nav-links--open');
        navToggle.classList.remove('nav-toggle--open');
        navigation.classList.remove('navigation--open');
        navToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
        body.removeAttribute('data-nav-open');
      });

      setTimeout(function() {
        isAnimating = false;
      }, ANIMATION_DURATION);
    }

    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });

    var links = navLinks.querySelectorAll('a');
    links.forEach(function(link) {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });

    document.addEventListener('click', function(event) {
      if (!navigation.contains(event.target) && navLinks.classList.contains('nav-links--open')) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && navLinks.classList.contains('nav-links--open')) {
        closeMenu();
      }
    });

    var resizeTimeout;
    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        if (window.innerWidth > 1024) {
          closeMenu();
        }
      }, 150);
    }

    window.addEventListener('resize', handleResize);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();
