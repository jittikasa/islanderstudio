import Database from 'better-sqlite3';
import { readFileSync, copyFileSync } from 'fs';

const DB_PATH = './data/content.db';
const db = new Database(DB_PATH);

// Copy draft to published folder
const draftPath = './content/drafts/building-lasting-habits-pearl-visualization-v1.md';
const publishedPath = './content/published/building-lasting-habits-pearl-visualization-final.md';

console.log('📄 Copying draft to published folder...');
copyFileSync(draftPath, publishedPath);
console.log(`✅ Published to: ${publishedPath}`);

// Read the published content
const publishedContent = readFileSync(publishedPath, 'utf8');
const wordCount = publishedContent.split(/\s+/).filter(w => w.length > 0).length;

// Extract meta information from the content
const metaTitle = "Building Lasting Habits: How the Pearl Visualization Method Transforms Habit Tracking";
const metaDescription = "Discover the science behind lasting habits and how Shellist's pearl visualization method makes habit tracking intuitive, beautiful, and effective for iOS users.";
const keywords = "habit tracker iOS, best habit tracking app, pearl visualization, streak tracking app, iOS habit formation, building habits, habit tracker with widgets, visual habit tracker";

// Create published entry in database
const stmt = db.prepare(`
  INSERT INTO published (
    plan_id,
    draft_id,
    final_content,
    meta_description,
    final_version,
    iterations_required,
    performance_notes
  ) VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const performanceNotes = `
Title: ${metaTitle}
Keywords: ${keywords}
Word count: ${wordCount}
Slug: building-lasting-habits-pearl-visualization
Status: Published and ready for Islander Studio blog
`;

const result = stmt.run(
  1, // plan_id
  1, // draft_id
  publishedContent,
  metaDescription,
  1, // final_version
  1, // iterations_required (one draft iteration)
  performanceNotes
);

console.log(`\n✅ Published entry created (ID: ${result.lastInsertRowid})`);
console.log(`Title: ${metaTitle}`);
console.log(`Slug: building-lasting-habits-pearl-visualization`);
console.log(`Word count: ${wordCount}`);
console.log(`Meta description: ${metaDescription.substring(0, 50)}...`);

// Update content plan status to 'published'
const updatePlan = db.prepare(`
  UPDATE content_plan
  SET status = 'published'
  WHERE id = 1
`);

updatePlan.run();
console.log(`\n✅ Content plan status updated to 'published'`);

// Log publish activity to agent_log
const logActivity = db.prepare(`
  INSERT INTO agent_log (
    phase,
    action,
    details
  ) VALUES (?, ?, ?)
`);

const logDetails = `Story: PUBLISH-001
Published ID: ${result.lastInsertRowid}
Draft ID: 1
Plan ID: 1
Title: ${metaTitle}
Word count: ${wordCount}
Status: Published to content/published/building-lasting-habits-pearl-visualization-final.md`;

logActivity.run('publish', 'content_published', logDetails);
console.log(`✅ Publish activity logged to agent_log`);

// Query final status
console.log('\n📊 Final Status:');
const planStatus = db.prepare('SELECT id, title, status FROM content_plan WHERE id = 1').get();
console.log(`- Content plan: ${planStatus.title} → ${planStatus.status}`);

const publishedEntry = db.prepare('SELECT id, published_at FROM published WHERE id = ?').get(result.lastInsertRowid);
console.log(`- Published: ID ${publishedEntry.id} at ${publishedEntry.published_at}`);

db.close();

console.log('\n🎉 PUBLISH-001 COMPLETE - First SEO blog published for Islander Studio!');
