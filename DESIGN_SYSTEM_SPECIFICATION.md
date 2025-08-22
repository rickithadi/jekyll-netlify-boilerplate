# Hadi Rickit Portfolio - Design System Specification

_Professional • Competent • Muted • Friendly • Experienced_

## Table of Contents

1. [Brand Personality & Design Principles](#brand-personality--design-principles)
2. [Color System](#color-system)
3. [Typography System](#typography-system)
4. [Spacing & Layout](#spacing--layout)
5. [Component Specifications](#component-specifications)
6. [Interaction Design](#interaction-design)
7. [Implementation Guidelines](#implementation-guidelines)

---

## Brand Personality & Design Principles

### Core Personality Traits

- **Professional**: Clean, structured layouts with purposeful whitespace
- **Competent**: Confident typography hierarchy and clear information architecture
- **Muted**: Sophisticated color restraint with strategic accent usage
- **Friendly**: Warm micro-interactions and approachable content tone
- **Experienced**: Editorial-style presentation with depth and substance

### Design Philosophy

- **Clarity over Cleverness**: Every element serves a clear purpose
- **Substance over Style**: Content-first approach with design supporting narrative
- **Restraint over Excess**: Sophisticated use of color, animation, and effects
- **Accessibility First**: WCAG 2.1 AA compliance as baseline requirement

---

## Color System

### Primary Palette

```scss
// Core Brand Colors
$charcoal-black: #1c1c1c; // Primary text, headers, footer
$light-cream: #f8f6f2; // Main background
$warm-beige: #e6dfd6; // Section backgrounds, subtle fills
$soft-gray: #d6d1c9; // Secondary elements, borders
$clay-orange: #d9654a; // Accent only (5-10% usage)
$white: #ffffff; // Cards, overlays
```

### Extended Palette

```scss
// Text Hierarchy
$text-primary: #1c1c1c; // Main headings, body text
$text-secondary: #4a4a4a; // Subheadings, descriptions
$text-muted: #6b6b6b; // Meta information, captions
$text-light: #8a8a8a; // Placeholder text, disabled states

// Functional Colors
$success: #2d5a27; // Success states, positive feedback
$warning: #8b5a00; // Warning states, attention needed
$error: #8b2635; // Error states, critical feedback
$info: #1c4b5a; // Information, neutral feedback
```

### Color Usage Rules

1. **Clay Orange (#D9654A)**: Maximum 10% of design

   - Primary CTA buttons
   - Active navigation states
   - Key accent elements only

2. **Charcoal Black (#1C1C1C)**: 60% of design

   - All primary text
   - Main navigation
   - Footer background

3. **Light Cream (#F8F6F2)**: 25% of design

   - Main page background
   - Large content areas

4. **Warm Beige (#E6DFD6)**: 15% of design
   - Section dividers
   - Card backgrounds (alternate)
   - Subtle highlights

### Accessibility Requirements

- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text (18pt+)
- All interactive elements must pass color contrast tests

---

## Typography System

### Font Stack

```scss
// Primary Font (System)
$font-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  "Helvetica Neue", Arial, sans-serif;

// Secondary Font (Editorial)
$font-secondary: "Times New Roman", Times, serif;

// Monospace Font (Code)
$font-mono: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas,
  monospace;
```

### Type Scale & Hierarchy

```scss
// Display Typography (Hero sections)
$font-size-hero: clamp(4.8rem, 8vw, 8.4rem); // 48-84px
$font-weight-hero: 300;
$line-height-hero: 1.05;
$letter-spacing-hero: -0.03em;

// Heading Typography
$font-size-h1: clamp(3.6rem, 6vw, 6.4rem); // 36-64px
$font-size-h2: clamp(2.8rem, 4vw, 4.8rem); // 28-48px
$font-size-h3: clamp(2.2rem, 3vw, 3.2rem); // 22-32px
$font-size-h4: clamp(1.8rem, 2.5vw, 2.4rem); // 18-24px

$font-weight-headings: 400;
$line-height-headings: 1.2;
$letter-spacing-headings: -0.02em;

// Body Typography
$font-size-large: 1.8rem; // 18px - Intro paragraphs
$font-size-base: 1.6rem; // 16px - Body text
$font-size-small: 1.4rem; // 14px - Captions, meta
$font-size-xs: 1.2rem; // 12px - Fine print

$font-weight-body: 400;
$line-height-body: 1.6;
$letter-spacing-body: 0;
```

### Typography Usage Guidelines

1. **Hero Text**: Use sparingly, only for main page headlines
2. **H1**: Page titles, major section headers
3. **H2**: Section titles, featured content headers
4. **H3**: Subsection titles, card headers
5. **H4**: Minor headings, component titles
6. **Large Body**: Introduction paragraphs, key descriptions
7. **Base Body**: Standard content, descriptions
8. **Small Text**: Meta information, dates, tags
9. **XS Text**: Legal text, fine print

---

## Spacing & Layout

### Spacing Scale (8px Grid System)

```scss
// Base unit: 8px
$space-xs: 0.4rem; // 4px
$space-sm: 0.8rem; // 8px
$space-md: 1.6rem; // 16px
$space-lg: 2.4rem; // 24px
$space-xl: 3.2rem; // 32px
$space-2xl: 4.8rem; // 48px
$space-3xl: 6.4rem; // 64px
$space-4xl: 9.6rem; // 96px
$space-5xl: 12.8rem; // 128px
```

### Container Widths

```scss
$container-narrow: 72rem; // 720px - Blog posts, forms
$container-standard: 120rem; // 1200px - Main content
$container-wide: 140rem; // 1400px - Hero sections
$container-full: 160rem; // 1600px - Maximum width
```

### Breakpoints

```scss
$breakpoint-sm: 48rem; // 768px - Tablet
$breakpoint-md: 64rem; // 1024px - Small desktop
$breakpoint-lg: 80rem; // 1280px - Desktop
$breakpoint-xl: 120rem; // 1920px - Large desktop
```

### Layout Rules

1. **Vertical Rhythm**: All elements align to 8px grid
2. **Section Spacing**: Minimum 96px between major sections
3. **Component Spacing**: 32-48px between related components
4. **Content Spacing**: 16-24px between related content blocks
5. **Micro Spacing**: 8px for tight relationships

---

## Component Specifications

### Navigation Header

```scss
.navigation {
  height: 8rem; // 80px fixed height
  background: rgba(248, 246, 242, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(214, 209, 201, 0.3);

  .nav-brand {
    font-size: 1.8rem;
    font-weight: 500;
    color: $charcoal-black;
    letter-spacing: -0.01em;
  }

  .nav-links {
    gap: 3.2rem;

    a {
      font-size: 1.5rem;
      font-weight: 400;
      color: $text-secondary;
      text-decoration: none;
      position: relative;
      transition: color 0.3s ease;

      &:hover,
      &.active {
        color: $clay-orange;
      }

      &.active::after {
        content: "";
        position: absolute;
        bottom: -0.4rem;
        left: 0;
        width: 100%;
        height: 2px;
        background: $clay-orange;
      }
    }
  }
}
```

### Hero Section

```scss
.hero {
  padding: 12rem 0 8rem; // 120px top, 80px bottom
  background: $light-cream;
  position: relative;
  overflow: hidden;

  .hero-content {
    max-width: $container-wide;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    align-items: center;

    @media (max-width: $breakpoint-md) {
      grid-template-columns: 1fr;
      gap: 4rem;
      text-align: center;
    }
  }

  .hero-text {
    .greeting {
      display: flex;
      align-items: center;
      gap: 1.6rem;
      margin-bottom: 2.4rem;

      .emoji {
        font-size: 3.2rem;
        transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

        &:hover {
          transform: rotate(15deg) scale(1.1);
        }
      }
    }

    h1 {
      font-size: $font-size-hero;
      font-weight: $font-weight-hero;
      line-height: $line-height-hero;
      letter-spacing: $letter-spacing-hero;
      color: $charcoal-black;
      margin-bottom: 2.4rem;
    }

    .intro {
      font-size: $font-size-large;
      line-height: 1.6;
      color: $text-secondary;
      margin-bottom: 4rem;
      max-width: 48rem;
    }
  }

  .hero-avatar {
    display: flex;
    justify-content: center;

    img {
      width: 32rem;
      height: 32rem;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: 0 2rem 4rem rgba(28, 28, 28, 0.1);
      transition: transform 0.4s ease;

      &:hover {
        transform: scale(1.02);
      }
    }
  }
}
```

### Button System

```scss
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 3.2rem;
  border-radius: 3.2rem;
  font-size: 1.5rem;
  font-weight: 500;
  text-decoration: none;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  letter-spacing: 0.01em;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 0.8rem 2.4rem rgba(217, 101, 74, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  // Primary Button
  &--primary {
    background: $clay-orange;
    color: white;
    border-color: $clay-orange;

    &:hover {
      background: transparent;
      color: $clay-orange;
    }
  }

  // Secondary Button
  &--secondary {
    background: transparent;
    color: $clay-orange;
    border-color: $clay-orange;

    &:hover {
      background: $clay-orange;
      color: white;
    }
  }

  // Ghost Button
  &--ghost {
    background: transparent;
    color: $text-secondary;
    border-color: $soft-gray;

    &:hover {
      color: $charcoal-black;
      border-color: $charcoal-black;
    }
  }
}
```

### Card Components

```scss
.card {
  background: $white;
  border-radius: 0.8rem;
  padding: 3.2rem;
  box-shadow: 0 0.4rem 2rem rgba(28, 28, 28, 0.04);
  border: 1px solid rgba(214, 209, 201, 0.3);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, $clay-orange, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-0.4rem);
    box-shadow: 0 1.2rem 4rem rgba(28, 28, 28, 0.08);
    border-color: rgba(217, 101, 74, 0.2);

    &::before {
      opacity: 1;
    }
  }

  .card-header {
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    margin-bottom: 2.4rem;

    .card-icon {
      font-size: 2.8rem;
      opacity: 0.8;
    }

    .card-title {
      font-size: 2.2rem;
      font-weight: 400;
      color: $charcoal-black;
      margin: 0 0 0.8rem 0;
      line-height: 1.3;
    }

    .card-meta {
      font-size: 1.2rem;
      color: $clay-orange;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-weight: 500;
    }
  }

  .card-content {
    color: $text-secondary;
    font-size: 1.6rem;
    line-height: 1.6;
    margin-bottom: 2.4rem;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;

    .tag {
      padding: 0.4rem 1.2rem;
      background: rgba(107, 107, 107, 0.08);
      color: $text-muted;
      border-radius: 1.6rem;
      font-size: 1.2rem;
      font-weight: 400;
    }
  }
}
```

### Form Elements

```scss
.form-group {
  margin-bottom: 2.4rem;

  label {
    display: block;
    font-size: 1.4rem;
    font-weight: 500;
    color: $charcoal-black;
    margin-bottom: 0.8rem;
    letter-spacing: 0.01em;
  }

  input,
  textarea {
    width: 100%;
    padding: 1.2rem 1.6rem;
    border: 2px solid $soft-gray;
    border-radius: 0.8rem;
    font-size: 1.6rem;
    font-family: $font-primary;
    background: $white;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: $clay-orange;
      box-shadow: 0 0 0 3px rgba(217, 101, 74, 0.1);
    }

    &::placeholder {
      color: $text-light;
    }
  }

  textarea {
    min-height: 12rem;
    resize: vertical;
  }
}
```

---

## Interaction Design

### Animation Principles

1. **Subtle & Purposeful**: Animations enhance understanding, never distract
2. **Fast & Responsive**: Maximum 300ms for micro-interactions
3. **Natural Easing**: Use cubic-bezier(0.25, 0.46, 0.45, 0.94) for organic feel
4. **Reduced Motion**: Respect user preferences for reduced motion

### Micro-Interactions

```scss
// Hover States
.interactive-element {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    transform: translateY(-1px);
  }
}

// Focus States
.focusable {
  &:focus {
    outline: 2px solid $clay-orange;
    outline-offset: 2px;
  }
}

// Loading States
.loading {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2rem;
    height: 2rem;
    border: 2px solid $soft-gray;
    border-top-color: $clay-orange;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    transform: translate(-50%, -50%);
  }
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
```

### Page Transitions

```scss
// Fade in animations for content
.fade-in {
  opacity: 0;
  transform: translateY(2rem);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
}

// Staggered animations for lists
.stagger-item {
  opacity: 0;
  transform: translateY(2rem);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:nth-child(1) {
    transition-delay: 0.1s;
  }
  &:nth-child(2) {
    transition-delay: 0.2s;
  }
  &:nth-child(3) {
    transition-delay: 0.3s;
  }
  &:nth-child(4) {
    transition-delay: 0.4s;
  }

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Implementation Guidelines

### CSS Custom Properties Setup

```scss
:root {
  // Colors
  --color-charcoal: #{$charcoal-black};
  --color-cream: #{$light-cream};
  --color-beige: #{$warm-beige};
  --color-gray: #{$soft-gray};
  --color-orange: #{$clay-orange};
  --color-white: #{$white};

  // Typography
  --font-primary: #{$font-primary};
  --font-secondary: #{$font-secondary};
  --font-mono: #{$font-mono};

  // Spacing
  --space-xs: #{$space-xs};
  --space-sm: #{$space-sm};
  --space-md: #{$space-md};
  --space-lg: #{$space-lg};
  --space-xl: #{$space-xl};
  --space-2xl: #{$space-2xl};
  --space-3xl: #{$space-3xl};
  --space-4xl: #{$space-4xl};
  --space-5xl: #{$space-5xl};

  // Shadows
  --shadow-sm: 0 0.4rem 2rem rgba(28, 28, 28, 0.04);
  --shadow-md: 0 0.8rem 3rem rgba(28, 28, 28, 0.08);
  --shadow-lg: 0 1.6rem 4rem rgba(28, 28, 28, 0.12);

  // Border Radius
  --radius-sm: 0.4rem;
  --radius-md: 0.8rem;
  --radius-lg: 1.6rem;
  --radius-full: 50%;

  // Transitions
  --transition-fast: 0.15s ease;
  --transition-base: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --transition-slow: 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

### Responsive Design Strategy

```scss
// Mobile First Approach
.component {
  // Mobile styles (default)
  padding: var(--space-md);

  // Tablet and up
  @media (min-width: 48rem) {
    padding: var(--space-lg);
  }

  // Desktop and up
  @media (min-width: 64rem) {
    padding: var(--space-xl);
  }

  // Large desktop and up
  @media (min-width: 80rem) {
    padding: var(--space-2xl);
  }
}
```

### Performance Considerations

1. **Critical CSS**: Inline above-the-fold styles
2. **Font Loading**: Use font-display: swap for web fonts
3. **Image Optimization**: WebP format with fallbacks
4. **Animation Performance**: Use transform and opacity only
5. **Bundle Size**: Tree-shake unused CSS

### Accessibility Checklist

- [ ] Color contrast ratios meet WCAG 2.1 AA standards
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are clearly visible
- [ ] Screen reader friendly markup and ARIA labels
- [ ] Reduced motion preferences respected
- [ ] Text can be zoomed to 200% without horizontal scrolling
- [ ] All images have appropriate alt text

### Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **CSS Grid**: Full support required
- **CSS Custom Properties**: Full support required
- **Flexbox**: Full support required

---

## Quality Assurance

### Design Review Checklist

- [ ] Typography hierarchy is clear and consistent
- [ ] Color usage follows the 60-30-10 rule
- [ ] Spacing follows the 8px grid system
- [ ] Interactive elements have clear hover/focus states
- [ ] Components are consistent across all pages
- [ ] Mobile experience is optimized
- [ ] Loading states are designed for all async operations
- [ ] Error states are user-friendly and actionable

### Testing Requirements

- [ ] Cross-browser testing on all supported browsers
- [ ] Mobile device testing on iOS and Android
- [ ] Accessibility testing with screen readers
- [ ] Performance testing (Lighthouse score 90+)
- [ ] Visual regression testing for design consistency

---

_This design system specification ensures a cohesive, professional, and accessible user experience that reflects the desired brand personality of professional competence with friendly approachability._
