console.log('Navigation script loaded');

(function() {
  'use strict';
  
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
      const isOpen = navLinks.classList.contains('nav-links--open');
      console.log('Toggling menu. Currently open:', isOpen);
      
      navLinks.classList.toggle('nav-links--open');
      navToggle.classList.toggle('nav-toggle--open');
      navigation.classList.toggle('navigation--open');
      navToggle.setAttribute('aria-expanded', !isOpen);
      
      // Prevent body scroll when menu is open
      if (!isOpen) {
        body.style.overflow = 'hidden';
        console.log('Menu opened, body scroll disabled');
      } else {
        body.style.overflow = '';
        console.log('Menu closed, body scroll enabled');
      }
    }
    
    function closeMenu() {
      console.log('Closing menu');
      navLinks.classList.remove('nav-links--open');
      navToggle.classList.remove('nav-toggle--open');
      navigation.classList.remove('navigation--open');
      navToggle.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
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
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 1024) { // Above tablet breakpoint
        console.log('Window resized to desktop, closing menu');
        closeMenu();
      }
    });
    
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