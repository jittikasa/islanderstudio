import Database from 'better-sqlite3';
import { readFileSync } from 'fs';

const DB_PATH = './data/content.db';
const db = new Database(DB_PATH);

// Read the draft content
const draftContent = readFileSync('./content/drafts/best-habit-tracker-ios-2026-comparison-v1.md', 'utf8');

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
  3, // plan_id from PLAN-003
  1, // version 1
  draftContent,
  wordCount
);

console.log(`✅ Draft created (ID: ${result.lastInsertRowid})`);
console.log(`Word count: ${wordCount}`);
console.log(`Version: 1`);
console.log(`Linked to plan_id: 3`);

// Update content plan status to 'writing'
const updatePlan = db.prepare(`
  UPDATE content_plan
  SET status = 'writing'
  WHERE id = 3
`);

updatePlan.run();
console.log(`✅ Content plan status updated to 'writing'`);

db.close();
