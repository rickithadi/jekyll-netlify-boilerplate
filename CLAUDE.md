# Claude Code Instructions for Jekyll Site

## Project Overview
This is a Jekyll-based personal portfolio website with a focus on cybersecurity consulting and software engineering. The design is inspired by boring.industries with minimal aesthetics, tight spacing, and card-based layouts.

## Design System
- **Typography**: Tight kerning (-0.02em to -0.04em), minimal line heights
- **Spacing**: Ultra-tight sections (32px desktop, 24px mobile)
- **Cards**: Grid-based work examples with hover underlines
- **Colors**: Earth tones with coral accents ($earth-coral)

## Development Guidelines

### CSS/SCSS
- All styles are in `_sass/partials/_design-system.scss`
- Use existing spacing variables (`$space-*`)
- Follow mobile-first responsive design
- Maintain boring.industries aesthetic: minimal, tight, sophisticated

### Navigation
- Mobile hamburger menu with sliding dropdown
- Fixed header with backdrop blur
- JavaScript in `_includes/navigation.html`

### Content Structure
- Hero section: `_includes/hero-section.html`
- Work examples: `_includes/featured-work.html` 
- Blog posts: `_includes/recent-posts.html`
- Layout: `_layouts/home.html`

### Commands
- **Serve**: `bundle exec jekyll serve --livereload`
- **Build**: `bundle exec jekyll build`

## Key Files
- `_config.yml` - Jekyll configuration
- `assets/main.scss` - Main stylesheet imports
- `_sass/partials/` - All SCSS partials
- `_includes/` - Reusable components
- `_layouts/` - Page templates
- `pages/` - Static pages

## Responsive Breakpoints
- `$breakpoint-sm: 48rem` (768px)
- `$breakpoint-md: 64rem` (1024px) 
- `$breakpoint-lg: 80rem` (1280px)

## Work Cards Layout
Grid system with auto-fit columns:
- Desktop: `minmax(250px, 1fr)`
- Tablet: `minmax(200px, 1fr)`
- Mobile: `1fr` (single column)

## Mobile Considerations
- Hamburger menu with proper animations
- Touch-friendly tap targets
- Progressive spacing reduction
- Typography scaling for readability

Always maintain the minimal, sophisticated aesthetic inspired by boring.industries.[byterover-mcp]

# important 
always use byterover-retrieve-knowledge tool to get the related context before any tasks 
always use byterover-store-knowledge to store all the critical informations after sucessful tasks