import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function takeScreenshots() {
  console.log('Starting browser automation for design consistency analysis...');
  
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const baseUrl = 'http://localhost:4001';
  const pages = [
    { name: 'home', url: `${baseUrl}/`, filename: 'home-design-analysis.png' },
    { name: 'about', url: `${baseUrl}/about`, filename: 'about-design-analysis.png' },
    { name: 'contact', url: `${baseUrl}/contact`, filename: 'contact-design-analysis.png' },
    { name: 'blog', url: `${baseUrl}/blog`, filename: 'blog-design-analysis.png' }
  ];

  // Create screenshots directory if it doesn't exist
  const screenshotDir = path.join(__dirname, '../screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }

  for (const pageInfo of pages) {
    try {
      console.log(`Capturing screenshot of ${pageInfo.name} page...`);
      await page.goto(pageInfo.url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Wait a bit more for any animations to complete
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Take full page screenshot
      await page.screenshot({ 
        path: path.join(screenshotDir, pageInfo.filename),
        fullPage: true,
        type: 'png'
      });
      
      console.log(`✓ Screenshot saved: ${pageInfo.filename}`);
    } catch (error) {
      console.error(`✗ Failed to capture ${pageInfo.name} page:`, error.message);
    }
  }

  await browser.close();
  console.log('Screenshot capture complete!');
}

takeScreenshots().catch(console.error);