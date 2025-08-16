// Classy, Subtle Animations for Professional Portfolio
// Professional • Competent • Muted • Friendly • Experienced

document.addEventListener("DOMContentLoaded", function () {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe all fade-in and stagger elements
  const fadeElements = document.querySelectorAll(".fade-in, .stagger-item");
  fadeElements.forEach((el) => observer.observe(el));

  // Navigation scroll effect
  let lastScrollTop = 0;
  const navigation = document.querySelector(".navigation");

  window.addEventListener(
    "scroll",
    () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Add/remove scrolled class for navigation styling
      if (scrollTop > 50) {
        navigation.classList.add("scrolled");
      } else {
        navigation.classList.remove("scrolled");
      }

      lastScrollTop = scrollTop;
    },
    { passive: true }
  );

  // Smooth hover effects for interactive elements
  const interactiveElements = document.querySelectorAll(".btn, .card, .badge");

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.transform = this.style.transform || "";
    });
  });

  // Parallax effect for hero section (subtle)
  const hero = document.querySelector(".hero");
  if (hero) {
    window.addEventListener(
      "scroll",
      () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
      },
      { passive: true }
    );
  }

  // Typewriter effect for hero title (subtle)
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";
    heroTitle.style.opacity = "1";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };

    // Start typewriter after a short delay
    setTimeout(typeWriter, 500);
  }

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add loading animation to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Don't add loading state for external links
      if (
        this.getAttribute("href") &&
        this.getAttribute("href").startsWith("http")
      ) {
        return;
      }

      this.classList.add("loading");

      // Remove loading state after navigation
      setTimeout(() => {
        this.classList.remove("loading");
      }, 1000);
    });
  });

  // Subtle mouse follow effect for cards
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });

  // Progressive image loading with fade-in
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", function () {
        this.classList.add("loaded");
      });
    }
  });

  // Add subtle animation delays to staggered items
  const staggerItems = document.querySelectorAll(".stagger-item");
  staggerItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
  });
});

// Add CSS for additional animation states
const additionalStyles = `
  .navigation.scrolled {
    background: rgba(248, 246, 242, 0.98);
    box-shadow: 0 2px 20px rgba(28, 28, 28, 0.08);
  }

  .btn.loading {
    position: relative;
    color: transparent;
  }

  .btn.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  img {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  img.loaded {
    opacity: 1;
  }

  .hero-title {
    opacity: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .hero {
      transform: none !important;
    }

    .card {
      transform: none !important;
    }

    .hero-title {
      opacity: 1 !important;
    }
  }
`;

// Inject additional styles
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
