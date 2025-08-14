// Enhanced About Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Typewriter effect
  const typewriterElement = document.querySelector(".typewriter-text");
  if (typewriterElement) {
    const text = typewriterElement.textContent;
    typewriterElement.textContent = "";
    typewriterElement.style.opacity = "1";

    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        typewriterElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }

    // Start typewriter after a short delay
    setTimeout(typeWriter, 500);
  }

  // Smooth scroll for scroll indicator
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      const expertiseSection = document.querySelector(".expertise-section");
      if (expertiseSection) {
        expertiseSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.8s ease forwards";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".focus-card, .value-pillar, .interest-card-enhanced, .timeline-step"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    observer.observe(el);
  });

  // Counter animation for experience years
  const counterElement = document.querySelector(".experience-number");
  if (counterElement) {
    const targetNumber = 5;
    let currentNumber = 0;
    const increment = targetNumber / 50;

    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
              currentNumber = targetNumber;
              clearInterval(timer);
            }
            counterElement.innerHTML =
              Math.floor(currentNumber) +
              '<span class="counter-suffix">+</span>';
          }, 50);
          counterObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    counterObserver.observe(counterElement);
  }

  // Parallax effect for background elements
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(
      ".parallax-elements .element"
    );

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });

  // Add hover effects to cards
  const cards = document.querySelectorAll(
    ".focus-card, .value-pillar, .interest-card-enhanced"
  );
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Dynamic badge interactions
  const badges = document.querySelectorAll(".badge-dynamic");
  badges.forEach((badge) => {
    badge.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.05)";
    });

    badge.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Avatar glow effect on scroll
  window.addEventListener("scroll", function () {
    const avatar = document.querySelector(".avatar-enhanced");
    if (avatar) {
      const scrollPercent =
        window.pageYOffset /
        (document.documentElement.scrollHeight - window.innerHeight);
      const glowOpacity = Math.min(scrollPercent * 2, 0.3);
      const avatarGlow = avatar.querySelector(".avatar-glow");
      if (avatarGlow) {
        avatarGlow.style.opacity = glowOpacity;
      }
    }
  });
});
