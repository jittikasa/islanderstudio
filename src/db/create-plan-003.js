import Database from 'better-sqlite3';

const DB_PATH = './data/content.db';
const db = new Database(DB_PATH);

// Create content plan for habit tracker comparison post
const stmt = db.prepare(`
  INSERT INTO content_plan (
    content_type,
    title,
    brief,
    target_keywords,
    quality_bar,
    priority,
    status
  ) VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const title = "Best Habit Tracker Apps for iOS in 2026: Shellist vs Streaks vs Habitify vs Done";

const targetKeywords = [
  'best habit tracker iOS 2026',
  'Shellist vs Streaks',
  'Shellist vs Habitify',
  'habit tracker comparison',
  'iOS habit app comparison',
  'best habit tracking app iPhone',
  'Shellist review',
  'habit tracker with widgets'
];

const brief = `Comprehensive comparison guide targeting high-intent "vs" and "best" searches. Fair, honest comparison of top iOS habit trackers (Shellist, Streaks, Habitify, Done) with feature matrix, pricing, and use case recommendations. Highlight Shellist's unique pearl visualization and widget capabilities while acknowledging where competitors excel. Include screenshots descriptions, pros/cons for each, and clear CTA to download Shellist. Tone: Helpful and unbiased, but subtly positioning Shellist as ideal for visual learners and mindful habit builders.`;

const result = stmt.run(
  'blog',
  title,
  brief,
  JSON.stringify(targetKeywords),
  'flagship',
  6, // priority from PRD
  'planned'
);

console.log(`✅ Content plan created (ID: ${result.lastInsertRowid})`);
console.log(`Title: ${title}`);
console.log(`Type: blog (flagship quality - pillar content)`);
console.log(`Target keywords: ${targetKeywords.join(', ')}`);
console.log(`Priority: 6`);
console.log(`Status: planned`);

// Query to verify
const verify = db.prepare('SELECT * FROM content_plan WHERE id = ?').get(result.lastInsertRowid);
console.log('\n✅ Verification:');
console.log(`- Plan ID: ${verify.id}`);
console.log(`- Content type: ${verify.content_type}`);
console.log(`- Status: ${verify.status}`);

db.close();
