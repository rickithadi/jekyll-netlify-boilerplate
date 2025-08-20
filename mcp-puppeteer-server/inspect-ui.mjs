import puppeteer from 'puppeteer';

async function inspectSite() {
  console.log('Starting UI inspection...');
  
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  try {
    // 1. Homepage inspection
    console.log('Inspecting homepage...');
    await page.goto('http://localhost:4001', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: '/tmp/homepage.png', fullPage: true });
    
    // 2. About page inspection
    console.log('Inspecting about page...');
    try {
      await page.goto('http://localhost:4001/about', { waitUntil: 'networkidle0' });
      await page.screenshot({ path: '/tmp/about.png', fullPage: true });
      
      // Check layout issues
      const aboutLayout = await page.evaluate(() => {
        const issues = [];
        
        // Check for overlapping elements
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
          const rect = section.getBoundingClientRect();
          if (rect.height === 0) {
            issues.push(`Section ${index} has zero height`);
          }
        });
        
        // Check for missing content
        const containers = document.querySelectorAll('.container');
        if (containers.length === 0) {
          issues.push('No containers found on about page');
        }
        
        // Check page title
        const title = document.querySelector('h1');
        if (!title) {
          issues.push('No h1 title found on about page');
        }
        
        return issues;
      });
      
      console.log('About page layout issues:', aboutLayout);
      
    } catch (aboutError) {
      console.log('About page error:', aboutError.message);
    }
    
    // 3. Contact page inspection
    console.log('Inspecting contact page...');
    try {
      await page.goto('http://localhost:4001/contact', { waitUntil: 'networkidle0' });
      await page.screenshot({ path: '/tmp/contact.png', fullPage: true });
      
      // Check form elements
      const contactIssues = await page.evaluate(() => {
        const issues = [];
        
        // Check if contact form exists
        const forms = document.querySelectorAll('form');
        if (forms.length === 0) {
          issues.push('No contact form found');
        }
        
        forms.forEach((form, index) => {
          const inputs = form.querySelectorAll('input, textarea, select');
          inputs.forEach(input => {
            if (!input.id && !input.name) {
              issues.push(`Form ${index}: input without id or name`);
            }
            
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (!label && !input.getAttribute('aria-label') && !input.getAttribute('placeholder')) {
              issues.push(`Form ${index}: ${input.type} input missing label`);
            }
          });
        });
        
        return issues;
      });
      
      console.log('Contact page issues:', contactIssues);
      
    } catch (contactError) {
      console.log('Contact page error:', contactError.message);
    }
    
    // 4. Blog page inspection  
    console.log('Inspecting blog page...');
    try {
      await page.goto('http://localhost:4001/blog', { waitUntil: 'networkidle0' });
      await page.screenshot({ path: '/tmp/blog.png', fullPage: true });
      
      // Check blog layout and posts
      const blogIssues = await page.evaluate(() => {
        const issues = [];
        
        // Check for blog posts
        const postItems = document.querySelectorAll('.post-item, article');
        if (postItems.length === 0) {
          issues.push('No blog posts found');
        }
        
        // Check post titles
        const postTitles = document.querySelectorAll('.post-title, h1, h2');
        postTitles.forEach((title, index) => {
          if (!title.textContent.trim()) {
            issues.push(`Post ${index}: Empty title`);
          }
        });
        
        // Check for broken links
        const links = document.querySelectorAll('a[href]');
        links.forEach((link, index) => {
          if (link.href.includes('undefined') || link.href.includes('null')) {
            issues.push(`Broken link ${index}: ${link.href}`);
          }
        });
        
        return issues;
      });
      
      console.log('Blog page issues:', blogIssues);
      
    } catch (blogError) {
      console.log('Blog page error:', blogError.message);
    }
    
    // 5. Mobile responsive test
    console.log('Testing mobile responsiveness...');
    await page.setViewport({ width: 375, height: 667 }); // iPhone size
    await page.goto('http://localhost:4001', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: '/tmp/mobile.png', fullPage: true });
    
    const mobileIssues = await page.evaluate(() => {
      const issues = [];
      
      // Check for horizontal overflow
      const body = document.body;
      if (body.scrollWidth > window.innerWidth + 5) { // +5px tolerance
        issues.push(`Horizontal overflow: ${body.scrollWidth}px > ${window.innerWidth}px`);
      }
      
      // Check navigation menu visibility
      const navToggle = document.querySelector('.nav-toggle');
      if (navToggle) {
        const style = window.getComputedStyle(navToggle);
        if (style.display === 'none') {
          issues.push('Navigation toggle not visible on mobile');
        }
      }
      
      // Check hero section on mobile
      const hero = document.querySelector('.hero');
      if (hero) {
        const heroRect = hero.getBoundingClientRect();
        if (heroRect.height < 200) {
          issues.push(`Hero section too short on mobile: ${heroRect.height}px`);
        }
      }
      
      return issues;
    });
    
    console.log('Mobile issues:', mobileIssues);
    
    console.log('✅ UI inspection complete! Screenshots saved to /tmp/');
    console.log('📸 Screenshots: homepage.png, about.png, contact.png, blog.png, mobile.png');
    
  } catch (error) {
    console.error('❌ Error during inspection:', error);
  } finally {
    await browser.close();
  }
}

inspectSite();