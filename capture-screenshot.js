#!/usr/bin/env node

// Simple screenshot capture script
// Install with: npm install -D playwright
// Run with: node capture-screenshot.js

const fs = require('fs');
const path = require('path');

async function captureScreenshots() {
  let browser;
  try {
    // Try to use playwright
    const { chromium } = require('playwright');
    
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });

    console.log('Capturing screenshot of http://localhost:3000/...');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await page.screenshot({ 
      path: path.join(__dirname, 'screenshot-home.png'),
      fullPage: true 
    });
    console.log('✓ Saved screenshot-home.png');

    console.log('Capturing screenshot of http://localhost:3000/call-history...');
    await page.goto('http://localhost:3000/call-history', { waitUntil: 'networkidle' });
    await page.screenshot({ 
      path: path.join(__dirname, 'screenshot-call-history.png'),
      fullPage: true 
    });
    console.log('✓ Saved screenshot-call-history.png');

    await browser.close();
    console.log('\n✓ Screenshots captured successfully!');
  } catch (error) {
    if (browser) await browser.close();
    console.error('Error:', error.message);
    console.log('\nPlease install playwright first:');
    console.log('  npm install -D playwright');
    console.log('  npx playwright install chromium');
    process.exit(1);
  }
}

captureScreenshots();
