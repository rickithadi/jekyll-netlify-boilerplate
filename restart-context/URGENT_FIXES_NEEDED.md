# 🚨 URGENT FIXES FOR NEXT CLAUDE INSTANCE

## Current Status: Jekyll Site Styling Issues

### 🎯 **IMMEDIATE PRIORITIES:**

1. **BROKEN CONTACT PAGE** - Form not rendering properly
2. **BROKEN ABOUT PAGE BUTTONS** - Styling issues with .btn--primary/.btn--secondary
3. **VISUAL BOREDOM** - About page needs more spark/animations
4. **INCONSISTENT SECTIONS** - Recent posts vs recent works styling mismatch

### 🔧 **SPECIFIC ACTIONS REQUIRED:**

#### 1. Fix Contact Form (BLOCKING)
- Location: `pages/contact.md` line 25: `{% include contact-form.html %}`
- Issue: Template not rendering, possible styling problems
- File: `_includes/contact-form.html` exists but may need form wrapper

#### 2. Fix Button Styling (HIGH PRIORITY)
- Location: `pages/about.md` lines 53-54
- Problem: `.btn--primary` and `.btn--secondary` classes broken
- Check: `_sass/partials/_design-system.scss` button definitions

#### 3. Add Visual Interest to About Page
- Current: Plain text blocks, very boring
- Needed: Subtle animations, visual cards, better expertise presentation
- Reference: Design agent recommendations in `collaboration/design-notes.md`

#### 4. Standardize Section Styling
- Issue: Recent posts and recent works have different visual treatments
- Goal: Unified, cohesive visual language across all sections

### 📁 **KEY FILES TO MODIFY:**

1. `_sass/partials/_design-system.scss` - Button fixes and expertise cards
2. `pages/about.md` - Enhanced visual structure
3. `pages/contact.md` - Form rendering fix
4. `_includes/contact-form.html` - Styling improvements
5. `_includes/featured-work.html` - Consistency with recent posts
6. `_includes/recent-posts.html` - Match work section styling

### 🎨 **DESIGN SYSTEM NEEDS:**

- **Sophistication**: Maintain boring.industries aesthetic
- **Cohesion**: All sections should feel unified
- **Visual Interest**: Add subtle animations without being flashy
- **Professional**: Clean, sleek, competent structure

### 📊 **CURRENT PROGRESS:**
- ✅ Phases 1 & 2 complete (SEO, performance, typography)
- ❌ Styling consistency broken
- ❌ Visual interest lacking
- ❌ Contact functionality broken

**GOAL**: Beautiful, cohesive, sophisticated site with consistent styling