# ⚡ QUICK START FOR NEXT CLAUDE INSTANCE

## Immediate Context:
- **Project**: Jekyll portfolio site for Hadi Rickit (cybersecurity consultant)
- **Location**: `/Users/hadi.rickit/dev/jekyll-netlify-boilerplate`
- **Status**: Styling issues need immediate fixing

## Start Here:

### 1. Test Current Site (2 minutes)
```bash
bundle exec jekyll serve --port 4001
# Visit: http://127.0.0.1:4001
# Check: about page buttons, contact form, overall consistency
```

### 2. Fix Critical Issues (Priority Order):

#### A. Contact Form Not Rendering
- **File**: `pages/contact.md` line 25
- **Issue**: `{% include contact-form.html %}` broken
- **Quick Fix**: Check if form needs wrapper div or styling

#### B. About Page Button Styling
- **File**: `pages/about.md` lines 53-54
- **Issue**: `.btn--primary` and `.btn--secondary` not working
- **Quick Fix**: Verify button classes in `_sass/partials/_design-system.scss`

#### C. About Page Visual Interest
- **Issue**: Page looks boring, needs spark
- **Reference**: `collaboration/design-notes.md` for recommendations
- **Goal**: Add subtle animations, visual cards while maintaining sophistication

### 3. Read Agent Feedback:
- `collaboration/design-notes.md` - Visual enhancement strategy
- `collaboration/review-notes.md` - Template debugging steps

### 4. Maintain Standards:
- **Aesthetic**: boring.industries minimal sophistication
- **Consistency**: All sections should match visually  
- **Quality**: Professional, clean, sleek, competent

## Key Commands:
- **Build**: `bundle exec jekyll build`
- **Serve**: `bundle exec jekyll serve --port 4001`
- **JSMAW**: Use collaboration files for agent coordination

## Success Criteria:
✅ Contact form renders and works
✅ About page buttons styled correctly  
✅ Visual interest added without breaking sophistication
✅ All sections have consistent styling
✅ Site feels cohesive and professional

**Time Estimate**: 1-2 hours for complete fixes