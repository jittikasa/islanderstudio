#!/usr/bin/env node
/**
 * Generate Blog OG Images
 *
 * Renders the HTML template to PNG images using Puppeteer.
 *
 * Usage:
 *   npm install puppeteer --save-dev
 *   node scripts/blog-images/generate.js
 *
 * Output:
 *   scripts/blog-images/output/pearl-visualization-og.png
 *   scripts/blog-images/output/habit-tracker-comparison-og.png
 *   scripts/blog-images/output/polaroid-revival-og.png
 */

import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IMAGES = [
  { selector: '.og-pearl', filename: 'pearl-visualization-og.png' },
  { selector: '.og-comparison', filename: 'habit-tracker-comparison-og.png' },
  { selector: '.og-polaroid', filename: 'polaroid-revival-og.png' },
];

async function generateImages() {
  console.log('🎨 Generating blog OG images...\n');

  const outputDir = join(__dirname, 'output');
  await mkdir(outputDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
  });

  const page = await browser.newPage();

  // Set viewport large enough to contain the images
  await page.setViewport({ width: 1400, height: 2000 });

  // Load the HTML file
  const htmlPath = join(__dirname, 'index.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');

  for (const image of IMAGES) {
    const element = await page.$(image.selector);

    if (element) {
      const outputPath = join(outputDir, image.filename);
      await element.screenshot({
        path: outputPath,
        type: 'png',
      });
      console.log(`✅ Generated: ${image.filename}`);
    } else {
      console.log(`❌ Element not found: ${image.selector}`);
    }
  }

  await browser.close();

  console.log(`\n📁 Images saved to: scripts/blog-images/output/`);
  console.log('\n📤 Next steps:');
  console.log('   1. Upload to R2:');
  console.log('      npx wrangler r2 object put blog-media/blog/pearl-visualization-og.png --file=scripts/blog-images/output/pearl-visualization-og.png');
  console.log('      npx wrangler r2 object put blog-media/blog/habit-tracker-comparison-og.png --file=scripts/blog-images/output/habit-tracker-comparison-og.png');
  console.log('      npx wrangler r2 object put blog-media/blog/polaroid-revival-og.png --file=scripts/blog-images/output/polaroid-revival-og.png');
  console.log('\n   2. Update database with image URLs (run scripts/update-post-images.js)');
}

generateImages().catch(console.error);
