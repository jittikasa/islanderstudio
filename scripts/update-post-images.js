#!/usr/bin/env node
/**
 * Batch Update Post Images
 *
 * Updates main_image_url and seo_og_image_url for blog posts.
 * Run with: node scripts/update-post-images.js
 *
 * Before running:
 * 1. Upload images to R2 bucket (blog-media)
 * 2. Update the POST_IMAGES config below with your image URLs
 * 3. Run: npx wrangler d1 execute blog-database --remote --file=scripts/update-post-images.sql
 */

// Configuration - Update these URLs after uploading images to R2
const POST_IMAGES = {
  'post-001': {
    title: 'Building Lasting Habits: Pearl Visualization',
    mainImageUrl: 'https://pub-9c7eeff067e24dd4942b72316471fc86.r2.dev/blog/pearl-visualization-hero.jpg',
    mainImageAlt: 'Pearl chain visualization showing habit streaks in Shellist app',
    ogImageUrl: 'https://pub-9c7eeff067e24dd4942b72316471fc86.r2.dev/blog/pearl-visualization-og.jpg',
  },
  'post-002': {
    title: 'Best Habit Tracker Apps Comparison',
    mainImageUrl: 'https://pub-9c7eeff067e24dd4942b72316471fc86.r2.dev/blog/habit-tracker-comparison-hero.jpg',
    mainImageAlt: 'Comparison of top iOS habit tracking apps including Shellist, Streaks, and Habitify',
    ogImageUrl: 'https://pub-9c7eeff067e24dd4942b72316471fc86.r2.dev/blog/habit-tracker-comparison-og.jpg',
  },
  'post-003': {
    title: 'The Polaroid Revival',
    mainImageUrl: 'https://pub-9c7eeff067e24dd4942b72316471fc86.r2.dev/blog/polaroid-revival-hero.jpg',
    mainImageAlt: 'Vintage Polaroid-style photos created with PolaMoment app',
    ogImageUrl: 'https://pub-9c7eeff067e24dd4942b72316471fc86.r2.dev/blog/polaroid-revival-og.jpg',
  },
};

// Generate SQL statements
function generateSQL() {
  const statements = [];

  for (const [postId, data] of Object.entries(POST_IMAGES)) {
    const sql = `UPDATE posts SET
  main_image_url = '${data.mainImageUrl}',
  main_image_alt = '${data.mainImageAlt}',
  seo_og_image_url = '${data.ogImageUrl}'
WHERE id = '${postId}';`;

    statements.push(`-- ${data.title}`);
    statements.push(sql);
    statements.push('');
  }

  return statements.join('\n');
}

// Generate wrangler commands
function generateCommands() {
  const commands = [];

  for (const [postId, data] of Object.entries(POST_IMAGES)) {
    commands.push(`# ${data.title}`);
    commands.push(`npx wrangler d1 execute blog-database --remote --command="UPDATE posts SET main_image_url = '${data.mainImageUrl}', main_image_alt = '${data.mainImageAlt}', seo_og_image_url = '${data.ogImageUrl}' WHERE id = '${postId}'"`);
    commands.push('');
  }

  return commands.join('\n');
}

// Main
console.log('='.repeat(60));
console.log('BLOG POST IMAGE UPDATE SCRIPT');
console.log('='.repeat(60));
console.log('\n1. First, upload your images to R2:');
console.log('   npx wrangler r2 object put blog-media/blog/your-image.jpg --file=./path/to/image.jpg\n');

console.log('2. Update the POST_IMAGES config in this script with your R2 URLs\n');

console.log('3. Then run these commands to update the database:\n');
console.log('-'.repeat(60));
console.log(generateCommands());
console.log('-'.repeat(60));

console.log('\nAlternatively, save this SQL to a file and run with wrangler:\n');
console.log('-'.repeat(60));
console.log(generateSQL());
console.log('-'.repeat(60));

console.log('\n4. Verify the update:');
console.log('   npx wrangler d1 execute blog-database --remote --command="SELECT id, title, main_image_url FROM posts"');
console.log('\n' + '='.repeat(60));
