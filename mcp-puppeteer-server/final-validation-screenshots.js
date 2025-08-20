import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function takeScreenshots() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    const baseUrl = 'http://localhost:4001';
    const resultsDir = path.join(__dirname, 'results');

    // Ensure results directory exists
    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir, { recursive: true });
    }

    const pages = [
        { url: `${baseUrl}/`, filename: 'home-final.png', title: 'Home Page' },
        { url: `${baseUrl}/about`, filename: 'about-final.png', title: 'About Page' },
        { url: `${baseUrl}/contact`, filename: 'contact-final.png', title: 'Contact Page' },
        { url: `${baseUrl}/blog`, filename: 'blog-final.png', title: 'Blog Page' }
    ];

    console.log('🚀 Starting final validation screenshots...\n');

    for (const pageInfo of pages) {
        try {
            console.log(`📸 Capturing ${pageInfo.title}: ${pageInfo.url}`);
            
            // Navigate to page and wait for content to load
            await page.goto(pageInfo.url, { 
                waitUntil: 'networkidle0',
                timeout: 10000 
            });

            // Wait a bit more to ensure any animations or dynamic content loads
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Take full page screenshot
            const screenshotPath = path.join(resultsDir, pageInfo.filename);
            await page.screenshot({ 
                path: screenshotPath,
                fullPage: true,
                type: 'png'
            });

            console.log(`✅ Screenshot saved: ${pageInfo.filename}`);
        } catch (error) {
            console.error(`❌ Failed to capture ${pageInfo.title}: ${error.message}`);
        }
    }

    await browser.close();
    console.log('\n🎉 Final validation screenshots completed!');
    console.log(`📁 Screenshots saved to: ${resultsDir}`);
}

// Run the screenshot function
takeScreenshots().catch(console.error);