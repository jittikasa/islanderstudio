import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const imagesToOptimize = [
  'public/shellist/images/screenshots/Screens-1.png',
  'public/shellist/images/screenshots/Screens-2.png',
  'public/shellist/images/screenshots/Screens-3.png',
  'public/shellist/images/screenshots/Screens-4.png',
];

async function optimizeImages() {
  console.log('Starting image optimization...\n');

  for (const imagePath of imagesToOptimize) {
    const fullPath = path.join(__dirname, imagePath);
    const outputPath = fullPath.replace('.png', '.webp');

    try {
      const originalStats = await fs.stat(fullPath);
      const originalSize = (originalStats.size / 1024 / 1024).toFixed(2);

      // Convert to WebP with 80% quality
      await sharp(fullPath)
        .webp({ quality: 80 })
        .toFile(outputPath);

      const newStats = await fs.stat(outputPath);
      const newSize = (newStats.size / 1024 / 1024).toFixed(2);
      const savings = ((1 - newStats.size / originalStats.size) * 100).toFixed(1);

      console.log(`✓ ${path.basename(imagePath)}`);
      console.log(`  ${originalSize}MB → ${newSize}MB (${savings}% smaller)\n`);

    } catch (error) {
      console.error(`✗ Failed to optimize ${imagePath}:`, error.message);
    }
  }

  console.log('Image optimization complete!');
}

optimizeImages();
