const puppeteer = require('puppeteer');
const fs = require('fs');

async function inspectSite() {
  console.log('Starting UI inspection...');
  
  const browser = await puppeteer.launch({
    headless: false, // Show browser so we can see what's happening
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  try {
    // 1. Homepage inspection
    console.log('Inspecting homepage...');
    await page.goto('http://localhost:4001', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: '/tmp/homepage.png', fullPage: true });
    
    // Check for console errors
    const homepageErrors = await page.evaluate(() => {
      return window.console_errors || [];
    });
    
    // 2. About page inspection
    console.log('Inspecting about page...');
    await page.goto('http://localhost:4001/about', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: '/tmp/about.png', fullPage: true });
    
    // Check layout issues
    const aboutLayout = await page.evaluate(() => {
      const issues = [];
      
      // Check for overlapping elements
      const elements = document.querySelectorAll('.section, .hero, .container');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.height === 0) {
          issues.push(`Zero height element: ${el.className}`);
        }
        if (rect.width === 0) {
          issues.push(`Zero width element: ${el.className}`);
        }
      });
      
      // Check for missing images
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.complete || img.naturalHeight === 0) {
          issues.push(`Broken image: ${img.src}`);
        }
      });
      
      return issues;
    });
    
    console.log('About page layout issues:', aboutLayout);
    
    // 3. Contact page inspection
    console.log('Inspecting contact page...');
    await page.goto('http://localhost:4001/contact', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: '/tmp/contact.png', fullPage: true });
    
    // Check form elements
    const contactIssues = await page.evaluate(() => {
      const issues = [];
      
      // Check form accessibility
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          const label = form.querySelector(`label[for="${input.id}"]`);
          if (!label && !input.getAttribute('aria-label')) {
            issues.push(`Missing label for input: ${input.name || input.id}`);
          }
        });
      });
      
      return issues;
    });
    
    console.log('Contact page issues:', contactIssues);
    
    // 4. Blog page inspection  
    console.log('Inspecting blog page...');
    await page.goto('http://localhost:4001/blog', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: '/tmp/blog.png', fullPage: true });
    
    // Check blog layout and links
    const blogIssues = await page.evaluate(() => {
      const issues = [];
      
      // Check for broken links
      const links = document.querySelectorAll('a[href]');
      links.forEach(link => {
        if (link.href.includes('localhost:4001') || link.href.startsWith('/')) {
          // This is an internal link, check if it looks valid
          if (link.href.includes('undefined') || link.href.includes('null')) {
            issues.push(`Invalid link: ${link.href}`);
          }
        }
      });
      
      // Check post grid layout
      const postItems = document.querySelectorAll('.post-item');
      if (postItems.length === 0) {
        issues.push('No blog posts found');
      }
      
      return issues;
    });
    
    console.log('Blog page issues:', blogIssues);
    
    // 5. Mobile responsive test
    console.log('Testing mobile responsiveness...');
    await page.setViewport({ width: 375, height: 667 }); // iPhone size
    await page.goto('http://localhost:4001', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: '/tmp/mobile.png', fullPage: true });
    
    const mobileIssues = await page.evaluate(() => {
      const issues = [];
      
      // Check for horizontal overflow
      const body = document.body;
      if (body.scrollWidth > window.innerWidth) {
        issues.push('Horizontal overflow detected on mobile');
      }
      
      // Check navigation menu
      const navToggle = document.querySelector('.nav-toggle');
      const navLinks = document.querySelector('.nav-links');
      if (navToggle && window.getComputedStyle(navToggle).display === 'none') {
        issues.push('Navigation toggle not visible on mobile');
      }
      
      return issues;
    });
    
    console.log('Mobile issues:', mobileIssues);
    
    console.log('UI inspection complete! Screenshots saved to /tmp/');
    
  } catch (error) {
    console.error('Error during inspection:', error);
  } finally {
    await browser.close();
  }
}

inspectSite();