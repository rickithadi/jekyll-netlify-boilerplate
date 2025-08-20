import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function captureLetsChatBar() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });

  try {
    const page = await browser.newPage();
    
    // Navigate to the About page
    console.log('🚀 Navigating to About page...');
    await page.goto('http://localhost:4001/about', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Wait for the Let's Chat section to be visible
    console.log('⏳ Waiting for Let\'s Chat section...');
    await page.waitForSelector('.chat-bar', { timeout: 10000 });
    
    // Desktop screenshot - Full section
    console.log('📸 Capturing desktop view...');
    const letsChatElement = await page.$('.chat-bar');
    if (letsChatElement) {
      await letsChatElement.screenshot({
        path: path.join(__dirname, 'results', 'chat-bar-final.png'),
        type: 'png'
      });
      console.log('✅ Desktop screenshot saved');
    }

    // Capture hover states by triggering hover on key elements
    console.log('🎯 Capturing hover states...');
    
    // Hover over primary button
    const primaryBtn = await page.$('.cta-primary');
    if (primaryBtn) {
      await primaryBtn.hover();
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait for animation
      
      await letsChatElement.screenshot({
        path: path.join(__dirname, 'results', 'chat-bar-hover-primary.png'),
        type: 'png'
      });
      console.log('✅ Primary button hover captured');
    }

    // Hover over secondary link
    const secondaryLink = await page.$('.cta-secondary');
    if (secondaryLink) {
      await secondaryLink.hover();
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait for animation
      
      await letsChatElement.screenshot({
        path: path.join(__dirname, 'results', 'chat-bar-hover-secondary.png'),
        type: 'png'
      });
      console.log('✅ Secondary link hover captured');
    }

    // Mobile view
    console.log('📱 Switching to mobile view...');
    await page.setViewport({ width: 375, height: 812 });
    await page.reload({ waitUntil: 'networkidle0' });
    await page.waitForSelector('.chat-bar', { timeout: 10000 });
    
    const letsChatElementMobile = await page.$('.chat-bar');
    if (letsChatElementMobile) {
      await letsChatElementMobile.screenshot({
        path: path.join(__dirname, 'results', 'chat-bar-mobile.png'),
        type: 'png'
      });
      console.log('✅ Mobile screenshot saved');
    }

    // Capture page metrics for analysis
    const metrics = await page.evaluate(() => {
      const chatBar = document.querySelector('.chat-bar');
      
      if (chatBar) {
        const rect = chatBar.getBoundingClientRect();
        return {
          chatBarHeight: rect.height,
          chatBarWidth: rect.width,
          hasShimmerEffect: !!document.querySelector('.shimmer'),
          hasPulseStatus: !!document.querySelector('.pulse-dot'),
          hasArrowAnimation: !!document.querySelector('.cta-arrow'),
          primaryButtonExists: !!document.querySelector('.cta-primary'),
          secondaryLinkExists: !!document.querySelector('.cta-secondary'),
          statusIndicatorExists: !!document.querySelector('.chat-pulse')
        };
      }
      return null;
    });

    console.log('📊 Design metrics:', metrics);
    
    // Save metrics to file
    fs.writeFileSync(
      path.join(__dirname, 'results', 'chat-bar-metrics.json'),
      JSON.stringify(metrics, null, 2)
    );

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    try {
      // Take a full page screenshot for debugging
      await page.screenshot({
        path: path.join(__dirname, 'results', 'debug-full-page.png'),
        fullPage: true
      });
      console.log('🔍 Debug screenshot saved');
    } catch (debugError) {
      console.error('Could not take debug screenshot:', debugError.message);
    }
    
  } finally {
    await browser.close();
  }
}

// Ensure results directory exists
const resultsDir = path.join(__dirname, 'results');
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

captureLetsChatBar()
  .then(() => console.log('🎉 Chat bar validation complete!'))
  .catch(console.error);