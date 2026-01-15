import Database from 'better-sqlite3';

const DB_PATH = './data/content.db';
const db = new Database(DB_PATH);

// Create content plan for PolaMoment nostalgia blog
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

const title = "The Polaroid Revival: Why Instant Photography Is Making a Comeback (And Why PolaMoment Is Better)";

const targetKeywords = [
  'polaroid camera app',
  'vintage photo filters',
  'instant camera iOS',
  'polaroid app iPhone',
  'retro camera app',
  'instant photo app',
  'polaroid style photos',
  'nostalgic photography app'
];

const brief = `SEO blog post targeting the Polaroid photography revival trend. Content should hook into 2020s nostalgia for analog photography while showcasing PolaMoment as the modern alternative. Include comparison of PolaMoment vs physical Polaroid cameras (cost, convenience, features). Emphasize social media sharing, parties, travel, and creative journaling use cases. Tone: Nostalgic yet practical.`;

const result = stmt.run(
  'blog',
  title,
  brief,
  JSON.stringify(targetKeywords),
  'flagship',
  4, // priority from PRD
  'planned'
);

console.log(`✅ Content plan created (ID: ${result.lastInsertRowid})`);
console.log(`Title: ${title}`);
console.log(`Type: blog (flagship quality)`);
console.log(`Target keywords: ${targetKeywords.join(', ')}`);
console.log(`Priority: 4 (high)`);
console.log(`Status: planned`);

// Query to verify
const verify = db.prepare('SELECT * FROM content_plan WHERE id = ?').get(result.lastInsertRowid);
console.log('\n✅ Verification:');
console.log(`- Plan ID: ${verify.id}`);
console.log(`- Content type: ${verify.content_type}`);
console.log(`- Status: ${verify.status}`);

db.close();
