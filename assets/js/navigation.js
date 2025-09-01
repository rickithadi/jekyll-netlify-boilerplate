// Enhanced Navigation Script with Performance Optimizations
console.log('Navigation script loaded');

(function() {
  'use strict';
  
  // Performance optimizations
  let isAnimating = false;
  const ANIMATION_DURATION = 300;
  
  // Wait for DOM to be ready
  function initNavigation() {
    console.log('Initializing navigation...');
    
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navigation = document.querySelector('.navigation');
    const body = document.body;
    
    // Check if all elements exist
    if (!navToggle || !navLinks || !navigation) {
      console.error('Navigation elements not found:', {
        navToggle: !!navToggle,
        navLinks: !!navLinks,
        navigation: !!navigation
      });
      return;
    }
    
    console.log('Navigation initialized successfully');
    
    function toggleMenu() {
      // Prevent multiple rapid clicks during animation
      if (isAnimating) {
        console.log('Animation in progress, ignoring toggle');
        return;
      }
      
      isAnimating = true;
      const isOpen = navLinks.classList.contains('nav-links--open');
      console.log('Toggling menu. Currently open:', isOpen);
      
      // Use requestAnimationFrame for smooth animations
      requestAnimationFrame(() => {
        navLinks.classList.toggle('nav-links--open');
        navToggle.classList.toggle('nav-toggle--open');
        navigation.classList.toggle('navigation--open');
        navToggle.setAttribute('aria-expanded', !isOpen);
        
        // Prevent body scroll when menu is open
        if (!isOpen) {
          body.style.overflow = 'hidden';
          body.setAttribute('data-nav-open', 'true');
          console.log('Menu opened, body scroll disabled');
        } else {
          body.style.overflow = '';
          body.removeAttribute('data-nav-open');
          console.log('Menu closed, body scroll enabled');
        }
      });
      
      // Reset animation flag after animation completes
      setTimeout(() => {
        isAnimating = false;
      }, ANIMATION_DURATION);
    }
    
    function closeMenu() {
      if (isAnimating) {
        console.log('Animation in progress, ignoring close');
        return;
      }
      
      console.log('Closing menu');
      isAnimating = true;
      
      requestAnimationFrame(() => {
        navLinks.classList.remove('nav-links--open');
        navToggle.classList.remove('nav-toggle--open');
        navigation.classList.remove('navigation--open');
        navToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
        body.removeAttribute('data-nav-open');
      });
      
      setTimeout(() => {
        isAnimating = false;
      }, ANIMATION_DURATION);
    }
    
    // Add click handler to toggle button
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Toggle button clicked');
      toggleMenu();
    });
    
    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    console.log('Found navigation links:', links.length);
    links.forEach(link => {
      link.addEventListener('click', function() {
        console.log('Navigation link clicked');
        closeMenu();
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navigation.contains(event.target) && navLinks.classList.contains('nav-links--open')) {
        console.log('Clicked outside navigation, closing menu');
        closeMenu();
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && navLinks.classList.contains('nav-links--open')) {
        console.log('Escape key pressed, closing menu');
        closeMenu();
      }
    });
    
    // Handle window resize with debouncing
    let resizeTimeout;
    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 1024) { // Above tablet breakpoint
          console.log('Window resized to desktop, closing menu');
          closeMenu();
        }
      }, 150); // Debounce resize events
    }
    
    window.addEventListener('resize', handleResize);
    
    // Test button visibility
    const computedStyle = window.getComputedStyle(navToggle);
    console.log('Toggle button display:', computedStyle.display);
    console.log('Current window width:', window.innerWidth);
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();