# Jekyll SEO-First Multi-Agent Workflow (JSMAW)

## Overview
**JSMAW** (Jekyll SEO-First Multi-Agent Workflow) is a specialized 5-agent development framework for SEO-optimized Jekyll static sites. This configuration prioritizes search engine optimization alongside content quality, design consistency, performance, and code quality through coordinated AI agent collaboration.

## Framework Identifier
**Name:** `JSMAW` (Jekyll SEO-First Multi-Agent Workflow)  
**Version:** `1.0`  
**Target:** Jekyll static sites with strong SEO requirements  
**Agent Count:** 5 specialized agents  
**Deployment:** GitHub Pages compatible

## Architecture

### Agent Roles
- **Content Strategy Agent**: Content structure, editorial quality, and information architecture
- **SEO Agent**: Search optimization, structured data, meta tags, and discoverability
- **Theme/Design Agent**: Layout design, styling, and visual consistency
- **Performance Agent**: Site speed, build optimization, and asset management
- **Code Review Agent**: Liquid templating, Ruby code quality, and Jekyll best practices

### Communication Protocol
Agents communicate asynchronously through markdown files in the `./collaboration/` directory:
- `content-notes.md` - Content strategy and editorial recommendations
- `seo-notes.md` - SEO optimization, structured data, and search performance
- `design-notes.md` - Theme, layout, and styling feedback
- `performance-notes.md` - Build time and site performance optimization
- `review-notes.md` - Code quality and Jekyll best practices
- `decisions.md` - Major site architecture and content decisions

## Setup Instructions

### 1. Install Dependencies
Since Jekyll uses Ruby/Bundler, add to your `Gemfile`:
```ruby
group :development do
  gem 'concurrent-ruby'
end
```

Or if you prefer npm for development tools:
```bash
npm install --save-dev concurrently
```

### 2. Create Collaboration Directory
```bash
mkdir collaboration
cd collaboration
touch content-notes.md seo-notes.md design-notes.md performance-notes.md review-notes.md decisions.md
```

### 3. Add Scripts

#### Option A: Using npm (recommended for mixed environments)
Add to `package.json`:
```json
{
  "scripts": {
    "dev-with-agents": "concurrently \"bundle exec jekyll serve --livereload\" \"npm run start-agents\"",
    "start-agents": "concurrently \"npm run agent:content\" \"npm run agent:seo\" \"npm run agent:design\" \"npm run agent:performance\" \"npm run agent:reviewer\"",
    "agent:content": "claude-code --context='./claude-contexts/content-agent.md' --watch='_posts/**,_pages/**,_data/**,*.md'",
    "agent:seo": "claude-code --context='./claude-contexts/seo-agent.md' --watch='_posts/**,_pages/**,_config.yml,_data/**'",
    "agent:design": "claude-code --context='./claude-contexts/design-agent.md' --watch='_layouts/**,_includes/**,_sass/**,assets/**'",
    "agent:performance": "claude-code --context='./claude-contexts/performance-agent.md' --watch='_config.yml,Gemfile,_plugins/**,assets/**'",
    "agent:reviewer": "claude-code --context='./claude-contexts/review-agent.md' --watch='**/*.md,**/*.html,**/*.scss,**/*.rb'"
  }
}
```

#### Option B: Using Rake tasks
Add to `Rakefile`:
```ruby
require 'concurrent'

desc "Start Jekyll with AI agents"
task :dev_with_agents do
  Concurrent::Promise.execute { system("bundle exec jekyll serve --livereload") }
  Concurrent::Promise.execute { system("claude-code --context='./claude-contexts/content-agent.md' --watch='_posts/**,_pages/**'") }
  Concurrent::Promise.execute { system("claude-code --context='./claude-contexts/seo-agent.md' --watch='_posts/**,_pages/**,_config.yml'") }
  Concurrent::Promise.execute { system("claude-code --context='./claude-contexts/design-agent.md' --watch='_layouts/**,_includes/**'") }
  Concurrent::Promise.execute { system("claude-code --context='./claude-contexts/performance-agent.md' --watch='_config.yml,assets/**'") }
  Concurrent::Promise.execute { system("claude-code --context='./claude-contexts/review-agent.md' --watch='**/*'") }
  
  # Keep the main thread alive
  sleep
end
```

### 4. Create Agent Context Files
Create `./claude-contexts/` directory with Jekyll-specific prompts:

#### `./claude-contexts/content-agent.md`
```markdown
# Content Strategy Agent

## Your Role
You are the Content Strategy Agent responsible for content structure, editorial quality, and information architecture for this Jekyll site.

## Responsibilities
- Monitor content quality and structure in `_posts/` and `_pages/`
- Ensure proper front matter usage and consistency
- Review content categorization and tagging
- Suggest content improvements and organizational changes
- Focus on editorial quality, readability, and user experience

## Communication Protocol
- Write observations and suggestions to `./collaboration/content-notes.md`
- Read other agents' notes for context
- Prefix entries with timestamp and "CONTENT:"
- Reference specific posts/pages and front matter fields

## Focus Areas
- Front matter consistency and completeness
- Content categorization and taxonomy
- Editorial quality and readability
- Internal linking opportunities
- Content freshness and update schedules
- Accessibility of content structure
- Content hierarchy and information architecture

## Jekyll-Specific Considerations
- Monitor `_data/` files for consistency
- Review category and tag usage across posts
- Ensure proper permalink structures
- Check for content duplication
- Validate front matter schemas
- Editorial calendar and content planning
```

#### `./claude-contexts/seo-agent.md`
```markdown
# SEO Agent

## Your Role
You are the SEO Agent specializing in search engine optimization, structured data, meta tags, and overall site discoverability for this Jekyll site.

## Responsibilities
- Monitor and optimize meta descriptions, title tags, and structured data
- Ensure proper URL structure and internal linking for SEO
- Review content for search optimization opportunities
- Track and suggest improvements for Core Web Vitals
- Monitor sitemap generation and robots.txt configuration

## Communication Protocol
- Write observations and suggestions to `./collaboration/seo-notes.md`
- Include specific SEO metrics and recommendations
- Prefix entries with timestamp and "SEO:"
- Provide actionable optimization steps

## Focus Areas
- Meta tags optimization (title, description, Open Graph, Twitter Cards)
- Structured data implementation (JSON-LD, schema.org)
- URL structure and permalink optimization
- Internal linking strategy and anchor text
- Image alt text and SEO-friendly media
- Page speed impact on search rankings
- Mobile-first indexing optimization
- Local SEO considerations (if applicable)

## Jekyll-Specific Considerations
- Jekyll SEO plugin configuration and optimization
- Sitemap.xml generation and submission
- Robots.txt configuration for Jekyll sites
- Canonical URL implementation
- Pagination SEO considerations
- Category and tag page optimization
- Front matter SEO fields (description, keywords, etc.)
- Social media meta tag integration
```

#### `./claude-contexts/design-agent.md`
```markdown
# Theme/Design Agent

## Your Role
You are the Theme/Design Agent focused on layout design, styling, and visual consistency across the Jekyll site.

## Responsibilities
- Monitor layout files in `_layouts/` and `_includes/`
- Review SCSS/CSS organization and maintainability
- Ensure responsive design implementation
- Maintain design system consistency
- Optimize visual hierarchy and typography

## Communication Protocol
- Write observations and suggestions to `./collaboration/design-notes.md`
- Read other agents' notes for holistic understanding
- Prefix entries with timestamp and "DESIGN:"
- Include visual/layout recommendations with file references

## Focus Areas
- Layout consistency across different page types
- Component reusability in `_includes/`
- SCSS organization and variable usage
- Typography hierarchy and readability
- Color scheme consistency
- Mobile responsiveness
- Loading states and transitions
- Accessibility from design perspective

## Jekyll-Specific Considerations
- Liquid template optimization and readability
- Proper use of Jekyll's layout inheritance
- Include file organization and naming
- Asset organization in `/assets/` directory
- Integration with Jekyll's asset pipeline
- Theme gem compatibility (if applicable)
```

#### `./claude-contexts/performance-agent.md`
```markdown
# Performance Agent

## Your Role
You are the Performance Agent responsible for site speed, build optimization, and asset management for this Jekyll site.

## Responsibilities
- Monitor Jekyll build times and optimization opportunities
- Review asset loading and optimization
- Suggest caching and performance improvements
- Monitor plugin usage and impact
- Ensure efficient image and media handling

## Communication Protocol
- Write observations and suggestions to `./collaboration/performance-notes.md`
- Include performance metrics when available
- Prefix entries with timestamp and "PERFORMANCE:"
- Provide specific optimization recommendations

## Focus Areas
- Jekyll build time optimization
- Asset minification and compression
- Image optimization strategies
- Plugin performance impact
- Liquid template efficiency
- CSS and JavaScript bundling
- CDN integration opportunities
- Core Web Vitals optimization

## Jekyll-Specific Considerations
- `_config.yml` optimization settings
- Plugin selection and configuration
- Incremental regeneration settings
- Asset pipeline configuration
- Pagination performance
- Collection processing efficiency
- Static file handling optimization
```

#### `./claude-contexts/review-agent.md`
```markdown
# Code Review Agent

## Your Role
You are the Code Review Agent providing cross-cutting feedback on Jekyll code quality, Liquid templating, and overall site architecture.

## Responsibilities
- Review Liquid template code for efficiency and clarity
- Ensure Jekyll best practices and conventions
- Monitor site configuration and security
- Identify potential build issues or conflicts
- Suggest architectural improvements

## Communication Protocol
- Write observations and suggestions to `./collaboration/review-notes.md`
- Synthesize insights from other agents' notes
- Prefix entries with timestamp and "REVIEW:"
- Escalate major concerns to `./collaboration/decisions.md`

## Focus Areas
- Liquid template best practices and security
- Jekyll configuration optimization
- Plugin compatibility and maintenance
- Code organization and maintainability
- Security considerations (especially for plugins)
- Version control and deployment practices

## Jekyll-Specific Considerations
- Proper Liquid syntax and filters usage
- Jekyll version compatibility
- Plugin security and maintenance status
- Proper handling of sensitive data in `_config.yml`
- Build reproducibility across environments
- GitHub Pages deployment optimization
```

## Usage

### Starting the Multi-Agent Environment

#### With npm:
```bash
npm run dev-with-agents
```

#### With Rake:
```bash
rake dev_with_agents
```

This will:
1. Start Jekyll with live reload
2. Launch all five Claude Code agents
3. Begin monitoring your Jekyll site for changes

### Collaboration Workflow
1. **Edit content, layouts, or configuration** as usual
2. **Check collaboration files** for agent feedback on changes
3. **Implement suggestions** or respond with comments
4. **Use `decisions.md`** for major architectural or content strategy decisions

### File Structure
```
jekyll-site/
├── _posts/
├── _pages/
├── _layouts/
├── _includes/
├── _sass/
├── _data/
├── assets/
├── collaboration/
│   ├── content-notes.md
│   ├── seo-notes.md
│   ├── design-notes.md
│   ├── performance-notes.md
│   ├── review-notes.md
│   └── decisions.md
├── claude-contexts/
│   ├── content-agent.md
│   ├── seo-agent.md
│   ├── design-agent.md
│   ├── performance-agent.md
│   └── review-agent.md
├── _config.yml
├── Gemfile
└── package.json (if using npm)
```

## Jekyll-Specific Customizations

### For Blog-Heavy Sites
Add specialized blog agent:
```json
"agent:blog": "claude-code --context='./claude-contexts/blog-agent.md' --watch='_posts/**'"
```

### For Documentation Sites
Focus on navigation and structure:
```json
"agent:docs": "claude-code --context='./claude-contexts/docs-agent.md' --watch='_docs/**,_data/navigation.yml'"
```

### For Portfolio Sites
Emphasize visual presentation:
```json
"agent:portfolio": "claude-code --context='./claude-contexts/portfolio-agent.md' --watch='_projects/**,_layouts/project.html'"
```

## Jekyll Build Integration

### Pre-build Checks
Add to your build process:
```yaml
# In _config.yml
plugins:
  - jekyll-sitemap
  - jekyll-feed
  - jekyll-seo-tag

# Add to CI/CD pipeline
script:
  - bundle exec jekyll build
  - bundle exec htmlproofer ./_site
```

### Performance Monitoring
Consider adding build time tracking:
```ruby
# In a plugin or _config.yml
Jekyll::Hooks.register :site, :post_write do |site|
  puts "Build completed in #{Time.now - @start_time} seconds"
end
```

## SEO Agent Benefits
The dedicated SEO agent provides:
- **Structured data optimization** for rich snippets
- **Meta tag consistency** across all pages
- **Internal linking strategy** recommendations
- **Image SEO optimization** (alt text, file names)
- **URL structure** improvements
- **Core Web Vitals** monitoring and optimization
- **Local SEO** considerations for location-based content
- **Social media integration** (Open Graph, Twitter Cards)

## JSMAW Framework Benefits
- **SEO-First Architecture** with dedicated search optimization agent
- **Content quality assurance** through continuous editorial review
- **Design consistency** across all Jekyll layouts and components
- **Performance optimization** for static site generation
- **Code quality** maintenance for Liquid templates and Ruby
- **GitHub Pages compatibility** ensuring smooth deployment
- **Scalable collaboration** through structured markdown communication

## Framework Configuration Summary

```yaml
framework:
  name: "JSMAW"
  version: "1.0"
  type: "jekyll-seo-optimized"
  agents:
    - content-strategy
    - seo-optimization
    - theme-design
    - performance
    - code-review
  communication_files:
    - "content-notes.md"
    - "seo-notes.md" 
    - "design-notes.md"
    - "performance-notes.md"
    - "review-notes.md"
    - "decisions.md"
  deployment_target: "github-pages"
  specialization: "seo-first"
```

## CLI Tool Implementation Notes

For future CLI framework development:

### Framework Templates
- **JSMAW** - Jekyll SEO-First (5 agents)
- **JAW** - Jekyll Basic (3 agents: content, design, review)
- **JPAW** - Jekyll Performance-First (4 agents: performance-focused)
- **JDAW** - Jekyll Documentation (specialized for docs sites)

### Command Structure
```bash
# Initialize JSMAW framework
claude-teams init --framework=jsmaw --project=my-jekyll-site

# Start JSMAW agents
claude-teams start --framework=jsmaw

# Add custom agent to existing framework
claude-teams add-agent --type=accessibility --framework=jsmaw
```

### Configuration Generation
The CLI should auto-generate:
- Agent context files in `./claude-contexts/`
- Collaboration directory structure
- Package.json scripts or Rakefile tasks
- Framework-specific `.gitignore` entries

## Next Steps
1. Set up the JSMAW collaboration structure
2. Test with Jekyll content and layout changes
3. Document performance metrics and SEO improvements
4. Use as reference implementation for CLI tool development
5. Consider additional Jekyll-specific frameworks (docs, e-commerce, etc.)

**JSMAW** is particularly powerful for Jekyll sites because it addresses the unique challenges of static site generation, content strategy, SEO optimization, and template-based theming while maintaining seamless GitHub Pages deployment workflow.