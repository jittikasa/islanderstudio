import Database from 'better-sqlite3';

const DB_PATH = './data/content.db';
const db = new Database(DB_PATH);

// Create content plan for Shellist habit tracking blog
const plan = {
  content_type: 'blog',
  title: 'Building Lasting Habits: How the Pearl Visualization Method Transforms Habit Tracking',
  brief: 'SEO-optimized blog post exploring habit formation psychology and introducing Shellist\'s unique "habits as pearls" visualization approach. Target audience: iOS users interested in self-improvement and habit building. Focus on the science of habit formation while naturally showcasing Shellist features like pearl visualization, streak tracking, widgets, and analytics.',
  target_keywords: JSON.stringify([
    'habit tracker iOS',
    'best habit tracking app',
    'pearl visualization',
    'streak tracking app',
    'iOS habit formation',
    'building habits',
    'habit tracker with widgets',
    'visual habit tracker'
  ]),
  quality_bar: 'flagship',
  priority: 2,
  status: 'planned',
  planned_date: new Date().toISOString().split('T')[0]
};

const stmt = db.prepare(`
  INSERT INTO content_plan (
    content_type,
    title,
    brief,
    target_keywords,
    quality_bar,
    priority,
    status,
    planned_date
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

const result = stmt.run(
  plan.content_type,
  plan.title,
  plan.brief,
  plan.target_keywords,
  plan.quality_bar,
  plan.priority,
  plan.status,
  plan.planned_date
);

console.log(`✅ Content plan created (ID: ${result.lastInsertRowid})`);
console.log(`\nTitle: ${plan.title}`);
console.log(`Type: ${plan.content_type}`);
console.log(`Keywords: ${plan.target_keywords}`);
console.log(`Priority: ${plan.priority}`);
console.log(`Status: ${plan.status}`);

db.close();
