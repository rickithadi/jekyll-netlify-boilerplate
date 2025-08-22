# Designer Claude Restart Guide

## Context Summary
This Jekyll portfolio site is being developed with two Claude instances:
- **Coder Claude**: Implements design changes and code modifications
- **Designer Claude**: Provides design feedback and visual critique

## Project Overview
- **Site**: Jekyll-based personal portfolio for cybersecurity consultant
- **Design Goal**: Achieve boring.industries-inspired minimal aesthetic
- **Dev Server**: Running at `http://127.0.0.1:4000`
- **Design System**: Ultra-tight spacing, sophisticated typography, monochrome + coral palette

## Current Design Status (August 20, 2025)

### ✅ Major Improvements Completed:
1. **Ultra-tight spacing**: 20px desktop sections (reduced from 24px)
2. **Typography refinement**: H1 letter-spacing at -0.05em for dramatic contrast
3. **Hero section compression**: 25% padding reduction for tighter feel
4. **Button sophistication**: Refined hover states with subtler effects
5. **Work card optimization**: Tighter typography and reduced line-heights
6. **Color system**: Pure monochrome + coral accent implementation
7. **Mobile responsive**: Proper breakpoint behavior maintained

### 🎯 Design Goals Achieved:
- Ultra-minimal aesthetic inspired by boring.industries ✅
- Sophisticated typography with tight kerning ✅
- Editorial-style layout with clean cards ✅
- Mobile-first responsive design ✅

## Key Design References
- **Inspiration**: boring.industries minimal aesthetic
- **Typography**: Tight kerning (-0.02em to -0.06em), compressed line-heights
- **Spacing**: Ultra-tight sections (20px desktop, 16px mobile)
- **Colors**: Pure black/white/gray + coral ($earth-coral) accent only

## Technical Setup

### MCP Servers Configured:
- **Puppeteer**: `@modelcontextprotocol/server-puppeteer` ✅
- **Playwright**: `@playwright/mcp` ✅ (newly installed)

### Development Commands:
- **Serve**: `bundle exec jekyll serve --livereload`
- **Build**: `bundle exec jekyll build`

## Files to Monitor for Design Changes:
- `_sass/partials/_design-system.scss` - Main styling
- `_includes/featured-work.html` - Work cards component
- `_includes/recent-posts.html` - Blog posts component
- `_includes/hero-section.html` - Hero layout
- `_layouts/home.html` - Homepage structure
- `pages/about.md`, `pages/contact.md` - Content pages

## Design Feedback Process:

### 1. **Initial Analysis** (Always Start Here):
```
WebFetch http://127.0.0.1:4000 to analyze current state
```

### 2. **Screenshot Analysis** (With Playwright MCP):
- Take desktop screenshots at 1280px width
- Take mobile screenshots at 375px width  
- Compare against boring.industries reference
- Document specific visual issues

### 3. **Update Design Notes**:
- Always update `DESIGN_IMPLEMENTATION.md` with feedback
- Use specific recommendations for coder Claude
- Mark completed items and track progress

## Current Priority Areas:

### 🔄 Next Design Reviews Needed:
1. **Blog page modernization** - Ensure minimal aesthetic consistency
2. **Form styling** - Contact forms should match minimal design
3. **Final responsive verification** - All breakpoints need testing
4. **Typography consistency** - Verify all pages use same hierarchy
5. **Visual regression testing** - Compare before/after states

### 🎨 Design Quality Checklist:
- [ ] Typography feels "tight" not "loose" (boring.industries standard)
- [ ] Sections have ultra-minimal spacing (20px max desktop)
- [ ] Color palette is strictly monochrome + coral
- [ ] Mobile navigation is sophisticated and functional
- [ ] Work cards follow editorial list format (not grid)
- [ ] All interactions feel refined and subtle

## Restart Instructions for Designer Claude:

1. **Check development server**: `curl -I http://127.0.0.1:4000`
2. **Analyze current design**: Use WebFetch to view homepage
3. **Test Playwright MCP**: Look for `mcp__` tools after restart
4. **Review recent changes**: Read `DESIGN_IMPLEMENTATION.md` thoroughly
5. **Update design notes**: Add new feedback to implementation file
6. **Provide specific recommendations**: Give coder Claude actionable tasks

## Communication Protocol:
- **For Coder Claude**: Update `DESIGN_IMPLEMENTATION.md` with specific technical recommendations
- **For User**: Provide high-level design assessment and priority areas
- **Always maintain**: Ultra-minimal, sophisticated, boring.industries-inspired aesthetic

---

**Last Updated**: August 20, 2025  
**Design Status**: ✅ Major improvements implemented, ready for final refinements  
**Next Session Goal**: Use Playwright MCP for enhanced visual analysis and complete remaining design polish