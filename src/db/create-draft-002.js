import Database from 'better-sqlite3';
import { readFileSync } from 'fs';

const DB_PATH = './data/content.db';
const db = new Database(DB_PATH);

// Read the draft content
const draftContent = readFileSync('./content/drafts/polaroid-revival-polamoment-v1.md', 'utf8');

// Calculate word count
const wordCount = draftContent.split(/\s+/).filter(w => w.length > 0).length;

// Create draft entry
const stmt = db.prepare(`
  INSERT INTO drafts (
    plan_id,
    version,
    content,
    word_count
  ) VALUES (?, ?, ?, ?)
`);

const result = stmt.run(
  2, // plan_id from PLAN-002
  1, // version 1
  draftContent,
  wordCount
);

console.log(`✅ Draft created (ID: ${result.lastInsertRowid})`);
console.log(`Word count: ${wordCount}`);
console.log(`Version: 1`);
console.log(`Linked to plan_id: 2`);

// Update content plan status to 'writing'
const updatePlan = db.prepare(`
  UPDATE content_plan
  SET status = 'writing'
  WHERE id = 2
`);

updatePlan.run();
console.log(`✅ Content plan status updated to 'writing'`);

db.close();
