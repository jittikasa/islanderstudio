---
name: ralph-marketer
description: Autonomous AI copywriting for SaaS marketing through iterative loops with SQLite database-driven content management. Provides /ralph-marketer-init, /ralph-marketer, /ralph-marketer-status, and /ralph-marketer-cancel commands.
license: MIT
---

# Ralph Marketer Skill

Autonomous AI copywriting system for SaaS marketing. Uses iterative Ralph loops with SQLite database for content source management and structured output tracking.

## Commands

| Command | Description |
|---------|-------------|
| `/ralph-marketer-init` | Initialize project with database, templates, 12 default stories |
| `/ralph-marketer` | Start autonomous marketing loop (invokes `/ralph-loop`) |
| `/ralph-marketer-status` | Check pipeline health, story progress, content metrics |
| `/ralph-marketer-cancel` | Terminate active loop (invokes `/cancel-ralph`) |

---

## Command: /ralph-marketer-init

Initialize a new project with the complete Ralph Marketer infrastructure.

### Workflow

1. **Check Prerequisites**
   - Verify Node.js is installed: `node --version`
   - If not installed, stop and inform user to install Node.js

2. **Create Directory Structure**
   ```
   scripts/ralph/
   src/db/
   src/content/
   content/drafts/
   content/published/
   data/
   ```

3. **Create All Files** using the templates below

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Initialize Database**
   ```bash
   npm run db:reset
   ```

6. **Verify Setup**
   ```bash
   npm run db:status
   ```

7. **Git Commit** (if in git repo)
   ```bash
   git add -A
   git commit -m "Initialize Ralph Marketer project structure"
   ```

8. **Report Success**
   - Show created structure
   - Show database status
   - Suggest next command: `/ralph-marketer`

---

## Command: /ralph-marketer

Start the autonomous marketing content loop.

### Workflow

1. **Verify Initialization**
   - Check `data/content.db` exists
   - Check `scripts/ralph/prompt.md` exists
   - If missing, tell user to run `/ralph-marketer-init` first

2. **Check Database Status**
   ```bash
   npm run db:status
   ```

3. **Read the Prompt Template**
   - Read `scripts/ralph/prompt.md`

4. **Invoke Ralph Loop**
   - Call `/ralph-loop` with the prompt content
   - Use completion promise: `COMPLETE`
   - Use max iterations: 50 (configurable)

Example invocation:
```
/ralph-loop [contents of prompt.md] --completion-promise 'COMPLETE' --max-iterations 50
```

---

## Command: /ralph-marketer-status

Check pipeline health and story progress.

### Workflow

1. **Check if Initialized**
   - Verify `data/content.db` exists

2. **Run Database Status**
   ```bash
   npm run db:status
   ```

3. **Check PRD Progress**
   - Read `scripts/ralph/prd.json`
   - Read `scripts/ralph/progress.txt`
   - Show stories completed vs pending

4. **Check Content Stats**
   - Count files in `content/drafts/`
   - Count files in `content/published/`

5. **Check Loop Status**
   - Check if `.claude/ralph-loop.local.md` exists
   - If exists, show current iteration

---

## Command: /ralph-marketer-cancel

Terminate the active Ralph Marketer loop.

### Workflow

1. **Invoke Cancel Ralph**
   - Call `/cancel-ralph` to terminate the loop

2. **Report Status**
   - Show cancellation result
   - Suggest `/ralph-marketer-status` to see progress

---

## File Templates

### scripts/ralph/prd.json

```json
{
  "project": "SaaS Marketing Content",
  "description": "Autonomous content creation for product marketing",
  "stories": [
    {
      "id": "SETUP-001",
      "title": "Initialize database and verify setup",
      "priority": 1,
      "status": "pending",
      "description": "Verify database is properly initialized with seed data. Check all tables exist and contain sample records.",
      "acceptance_criteria": [
        "Database file exists at data/content.db",
        "All 6 tables created (trends, research, communications, content_plan, drafts, published)",
        "Seed data present in input tables",
        "npm run db:status shows healthy status"
      ],
      "outputs": []
    },
    {
      "id": "PLAN-001",
      "title": "Create content plan for product launch",
      "priority": 2,
      "status": "pending",
      "description": "Using trends and communications data, create a content plan for an upcoming product launch blog post.",
      "acceptance_criteria": [
        "Content plan record created in content_plan table",
        "Plan includes target keywords from trends",
        "Plan references relevant communications",
        "Brief is clear and actionable"
      ],
      "outputs": ["content_plan record"]
    },
    {
      "id": "WRITE-001",
      "title": "Write first draft of product launch blog",
      "priority": 3,
      "status": "pending",
      "description": "Write the first draft of the product launch blog based on PLAN-001.",
      "acceptance_criteria": [
        "Draft saved to content/drafts/ directory",
        "Draft record created in drafts table",
        "Word count tracked",
        "Follows content plan brief"
      ],
      "outputs": ["draft file", "drafts record"]
    },
    {
      "id": "PLAN-002",
      "title": "Plan trend-based thought leadership blog",
      "priority": 4,
      "status": "pending",
      "description": "Analyze trends table to identify a compelling thought leadership angle. Create content plan.",
      "acceptance_criteria": [
        "High-relevance trend identified",
        "Content plan created with unique angle",
        "Target audience defined",
        "Key messages outlined"
      ],
      "outputs": ["content_plan record"]
    },
    {
      "id": "WRITE-002",
      "title": "Write thought leadership blog",
      "priority": 5,
      "status": "pending",
      "description": "Write the thought leadership blog based on PLAN-002.",
      "acceptance_criteria": [
        "Draft saved to content/drafts/",
        "Draft demonstrates expertise",
        "Incorporates trend data naturally",
        "Has clear call to action"
      ],
      "outputs": ["draft file", "drafts record"]
    },
    {
      "id": "REVIEW-001",
      "title": "Review and improve product launch draft",
      "priority": 6,
      "status": "pending",
      "description": "Review WRITE-001 draft, provide feedback, and create improved version.",
      "acceptance_criteria": [
        "Original draft reviewed",
        "Feedback recorded in drafts table",
        "New version created (version 2)",
        "Improvements documented"
      ],
      "outputs": ["updated draft", "feedback record"]
    },
    {
      "id": "PUBLISH-001",
      "title": "Finalize and publish product launch blog",
      "priority": 7,
      "status": "pending",
      "description": "Finalize the product launch blog and move to published status.",
      "acceptance_criteria": [
        "Final content saved to content/published/",
        "Published record created with meta description",
        "Content plan marked as published",
        "Git commit created"
      ],
      "outputs": ["published file", "published record"]
    },
    {
      "id": "PLAN-003",
      "title": "Plan case study content",
      "priority": 8,
      "status": "pending",
      "description": "Using research and communications data, plan a customer case study.",
      "acceptance_criteria": [
        "Research data analyzed",
        "Case study structure planned",
        "Key metrics identified",
        "Customer story angle defined"
      ],
      "outputs": ["content_plan record"]
    },
    {
      "id": "WRITE-003",
      "title": "Write case study",
      "priority": 9,
      "status": "pending",
      "description": "Write the case study based on PLAN-003.",
      "acceptance_criteria": [
        "Case study follows planned structure",
        "Includes metrics and outcomes",
        "Professional tone maintained",
        "Draft saved and recorded"
      ],
      "outputs": ["draft file", "drafts record"]
    },
    {
      "id": "SOCIAL-001",
      "title": "Create social media content batch",
      "priority": 10,
      "status": "pending",
      "description": "Create a batch of social media posts promoting published content.",
      "acceptance_criteria": [
        "At least 5 social posts created",
        "Posts reference published content",
        "Various formats (LinkedIn, Twitter/X)",
        "Saved to content/drafts/social/"
      ],
      "outputs": ["social media drafts"]
    },
    {
      "id": "NEWSLETTER-001",
      "title": "Draft weekly newsletter",
      "priority": 11,
      "status": "pending",
      "description": "Create a newsletter summarizing recent content and trends.",
      "acceptance_criteria": [
        "Newsletter includes content roundup",
        "Highlights key trends",
        "Has engaging subject line options",
        "Draft saved and recorded"
      ],
      "outputs": ["newsletter draft"]
    },
    {
      "id": "METRICS-001",
      "title": "Log final content metrics and learnings",
      "priority": 12,
      "status": "pending",
      "description": "Document all content created, metrics, and learnings from the session.",
      "acceptance_criteria": [
        "All content items catalogued",
        "Word counts summarized",
        "Learnings documented in progress.txt",
        "Final git commit created"
      ],
      "outputs": ["metrics summary", "updated progress.txt"]
    }
  ]
}
```

### scripts/ralph/progress.txt

```
# Ralph Marketer Progress Log
# Auto-updated during content creation loops

## Session Started
Date: [TO BE FILLED]

## Stories Completed
[None yet]

## Content Created
- Drafts: 0
- Published: 0
- Social Posts: 0

## Learnings
[To be documented as work progresses]

## Notes
[Additional observations]
```

### scripts/ralph/prompt.md

```markdown
# Ralph Marketer - Autonomous Content Loop

You are Ralph, an autonomous AI marketer. Your job is to work through the PRD stories and create marketing content using the database-driven workflow.

## Your Context

- **PRD**: `scripts/ralph/prd.json` - Your backlog of stories to complete
- **Progress**: `scripts/ralph/progress.txt` - Track your progress here
- **Database**: `data/content.db` - Content sources and outputs

## Available Commands

```bash
# Check database status
npm run db:status

# List content sources
npm run content:list

# Query database (read-only examples)
npm run db:query "SELECT * FROM trends WHERE status = 'active'"
npm run db:query "SELECT * FROM content_plan"
npm run db:query "SELECT * FROM drafts ORDER BY created_at DESC LIMIT 5"
```

## Your Workflow

1. **Check Progress**: Read `scripts/ralph/progress.txt` and `scripts/ralph/prd.json`
2. **Find Next Story**: Pick the highest priority pending story
3. **Execute Story**: Follow acceptance criteria
4. **Update State**:
   - Update story status in prd.json
   - Update progress.txt with learnings
   - Commit changes to git
5. **Repeat**: Continue to next story

## Database Schema

### Input Tables (Read for context)
- `trends` - Market trends with relevance scores
- `research` - Research summaries and findings
- `communications` - Product communications and messaging

### Output Tables (Write your work)
- `content_plan` - Your content plans
- `drafts` - Draft versions with feedback
- `published` - Final published content
- `agent_log` - Log your actions

## Content Output Locations

- **Drafts**: Save to `content/drafts/[type]/[filename].md`
- **Published**: Save to `content/published/[type]/[filename].md`
- **Social**: Save to `content/drafts/social/[filename].md`

## Completion Criteria

When ALL 12 stories have status "completed" in prd.json:
- Final git commit with all work
- Update progress.txt with summary
- Output: <promise>COMPLETE</promise>

## Important Rules

1. Always check current state before starting work
2. One story at a time, in priority order
3. Commit after each completed story
4. Log actions to agent_log table
5. Do NOT output <promise>COMPLETE</promise> until ALL stories are truly done
6. If stuck, document the blocker and move to next feasible story

Begin by checking your current progress and finding the next story to work on.
```

### package.json

```json
{
  "name": "ralph-marketer-content",
  "version": "1.0.0",
  "description": "Ralph Marketer content management with SQLite",
  "type": "module",
  "scripts": {
    "db:init": "node src/db/init.js",
    "db:seed": "node src/db/seed.js",
    "db:status": "node src/db/status.js",
    "db:reset": "node src/db/init.js && node src/db/seed.js",
    "db:query": "node src/db/query.js",
    "content:list": "node src/content/list.js",
    "test": "node src/test.js"
  },
  "dependencies": {
    "better-sqlite3": "^11.0.0"
  }
}
```

### src/db/init.js

```javascript
import Database from 'better-sqlite3';
import { mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';

const DB_PATH = 'data/content.db';

// Ensure data directory exists
const dataDir = dirname(DB_PATH);
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

// Remove existing database for clean init
if (existsSync(DB_PATH)) {
  const { unlinkSync } = await import('fs');
  unlinkSync(DB_PATH);
  console.log('Removed existing database');
}

const db = new Database(DB_PATH);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

console.log('Initializing Ralph Marketer database...\n');

// Input Tables (Content Sources)
db.exec(`
  -- Trends: Market and industry trends
  CREATE TABLE IF NOT EXISTS trends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic TEXT NOT NULL,
    description TEXT,
    source TEXT,
    relevance_score REAL DEFAULT 0.5,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Research: Research summaries and findings
  CREATE TABLE IF NOT EXISTS research (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    summary TEXT,
    key_findings TEXT,
    category TEXT,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Communications: Product messaging and announcements
  CREATE TABLE IF NOT EXISTS communications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    details TEXT,
    key_messages TEXT,
    target_audience TEXT,
    priority INTEGER DEFAULT 5,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

console.log('Created input tables: trends, research, communications');

// Output Tables (Ralph's Work)
db.exec(`
  -- Content Plan: Planned content pieces
  CREATE TABLE IF NOT EXISTS content_plan (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_type TEXT NOT NULL,
    title TEXT NOT NULL,
    brief TEXT,
    target_keywords TEXT,
    source_trend_id INTEGER,
    source_research_id INTEGER,
    source_comm_id INTEGER,
    status TEXT DEFAULT 'planned',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (source_trend_id) REFERENCES trends(id),
    FOREIGN KEY (source_research_id) REFERENCES research(id),
    FOREIGN KEY (source_comm_id) REFERENCES communications(id)
  );

  -- Drafts: Content drafts with versioning
  CREATE TABLE IF NOT EXISTS drafts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_id INTEGER,
    version INTEGER DEFAULT 1,
    content TEXT,
    word_count INTEGER,
    feedback TEXT,
    file_path TEXT,
    status TEXT DEFAULT 'draft',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (plan_id) REFERENCES content_plan(id)
  );

  -- Published: Final published content
  CREATE TABLE IF NOT EXISTS published (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_id INTEGER,
    draft_id INTEGER,
    final_content TEXT,
    meta_description TEXT,
    file_path TEXT,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (plan_id) REFERENCES content_plan(id),
    FOREIGN KEY (draft_id) REFERENCES drafts(id)
  );

  -- Agent Log: Track Ralph's actions
  CREATE TABLE IF NOT EXISTS agent_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action TEXT NOT NULL,
    details TEXT,
    story_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

console.log('Created output tables: content_plan, drafts, published, agent_log');

db.close();
console.log('\nDatabase initialized successfully at', DB_PATH);
```

### src/db/seed.js

```javascript
import Database from 'better-sqlite3';

const DB_PATH = 'data/content.db';
const db = new Database(DB_PATH);

console.log('Seeding Ralph Marketer database...\n');

// Seed Trends
const insertTrend = db.prepare(`
  INSERT INTO trends (topic, description, source, relevance_score, status)
  VALUES (?, ?, ?, ?, ?)
`);

const trends = [
  ['AI-Powered Automation', 'Growing adoption of AI tools for business process automation', 'Industry Report 2024', 0.95, 'active'],
  ['Developer Experience (DX)', 'Focus on improving developer productivity and satisfaction', 'Tech Blog Analysis', 0.88, 'active'],
  ['API-First Architecture', 'Companies prioritizing API design in their tech stack', 'Market Research', 0.82, 'active'],
  ['Remote-First Tooling', 'Tools designed for distributed teams becoming standard', 'Survey Data', 0.75, 'active'],
  ['Sustainable Tech', 'Growing interest in environmentally conscious technology', 'ESG Reports', 0.65, 'active']
];

trends.forEach(t => insertTrend.run(...t));
console.log(`Seeded ${trends.length} trends`);

// Seed Research
const insertResearch = db.prepare(`
  INSERT INTO research (title, summary, key_findings, category, status)
  VALUES (?, ?, ?, ?, ?)
`);

const research = [
  [
    'Developer Productivity Study 2024',
    'Survey of 500+ developers on productivity tools and practices',
    JSON.stringify(['70% use AI coding assistants', '3.5 hours saved per week on average', 'Documentation quality is top concern']),
    'productivity',
    'active'
  ],
  [
    'SaaS Buying Behavior Report',
    'Analysis of how companies evaluate and purchase SaaS tools',
    JSON.stringify(['Trial experience most important', 'Integration capabilities ranked #2', 'Price sensitivity increasing']),
    'market',
    'active'
  ],
  [
    'Content Marketing Effectiveness',
    'ROI analysis of different content marketing strategies',
    JSON.stringify(['Long-form content drives 3x more leads', 'Case studies highest conversion rate', 'Consistency beats frequency']),
    'marketing',
    'active'
  ]
];

research.forEach(r => insertResearch.run(...r));
console.log(`Seeded ${research.length} research items`);

// Seed Communications
const insertComm = db.prepare(`
  INSERT INTO communications (type, title, details, key_messages, target_audience, priority, status)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const communications = [
  [
    'product_launch',
    'New Feature: AI Writing Assistant',
    'Launching AI-powered writing assistance to help users create content faster',
    JSON.stringify(['Save 50% time on first drafts', 'Maintains your brand voice', 'Seamless integration']),
    'content creators, marketers',
    1,
    'pending'
  ],
  [
    'update',
    'Performance Improvements Q1',
    'Major performance optimizations reducing load times by 40%',
    JSON.stringify(['40% faster load times', 'Improved reliability', 'Better mobile experience']),
    'all users',
    3,
    'pending'
  ],
  [
    'announcement',
    'SOC 2 Type II Certification',
    'Achieved SOC 2 Type II compliance for enhanced security',
    JSON.stringify(['Enterprise-ready security', 'Audited controls', 'Data protection commitment']),
    'enterprise, security-conscious',
    2,
    'pending'
  ]
];

communications.forEach(c => insertComm.run(...c));
console.log(`Seeded ${communications.length} communications`);

// Log initialization
db.prepare(`
  INSERT INTO agent_log (action, details, story_id)
  VALUES (?, ?, ?)
`).run('database_seeded', 'Initial seed data loaded', 'SETUP-001');

db.close();
console.log('\nDatabase seeded successfully!');
```

### src/db/status.js

```javascript
import Database from 'better-sqlite3';
import { existsSync } from 'fs';

const DB_PATH = 'data/content.db';

console.log('Ralph Marketer Database Status\n');
console.log('='.repeat(50));

if (!existsSync(DB_PATH)) {
  console.log('\nDatabase not found at', DB_PATH);
  console.log('Run: npm run db:reset');
  process.exit(1);
}

const db = new Database(DB_PATH, { readonly: true });

// Table counts
const tables = ['trends', 'research', 'communications', 'content_plan', 'drafts', 'published', 'agent_log'];

console.log('\nTable Statistics:');
console.log('-'.repeat(40));

for (const table of tables) {
  try {
    const count = db.prepare(`SELECT COUNT(*) as count FROM ${table}`).get();
    const isInput = ['trends', 'research', 'communications'].includes(table);
    const type = isInput ? '[INPUT]' : '[OUTPUT]';
    console.log(`  ${type} ${table}: ${count.count} records`);
  } catch (e) {
    console.log(`  ${table}: ERROR - ${e.message}`);
  }
}

// Content Pipeline Status
console.log('\nContent Pipeline:');
console.log('-'.repeat(40));

const planStats = db.prepare(`
  SELECT status, COUNT(*) as count
  FROM content_plan
  GROUP BY status
`).all();

if (planStats.length === 0) {
  console.log('  No content plans yet');
} else {
  planStats.forEach(s => console.log(`  Plans ${s.status}: ${s.count}`));
}

const draftStats = db.prepare(`
  SELECT status, COUNT(*) as count
  FROM drafts
  GROUP BY status
`).all();

if (draftStats.length === 0) {
  console.log('  No drafts yet');
} else {
  draftStats.forEach(s => console.log(`  Drafts ${s.status}: ${s.count}`));
}

const publishedCount = db.prepare('SELECT COUNT(*) as count FROM published').get();
console.log(`  Published: ${publishedCount.count}`);

// Recent Activity
console.log('\nRecent Activity (last 5 actions):');
console.log('-'.repeat(40));

const recentLogs = db.prepare(`
  SELECT action, story_id, created_at
  FROM agent_log
  ORDER BY created_at DESC
  LIMIT 5
`).all();

if (recentLogs.length === 0) {
  console.log('  No activity logged yet');
} else {
  recentLogs.forEach(log => {
    const date = new Date(log.created_at).toLocaleString();
    const story = log.story_id ? `[${log.story_id}]` : '';
    console.log(`  ${date} - ${log.action} ${story}`);
  });
}

console.log('\n' + '='.repeat(50));
console.log('Status: HEALTHY');

db.close();
```

### src/db/query.js

```javascript
import Database from 'better-sqlite3';
import { existsSync } from 'fs';

const DB_PATH = 'data/content.db';

if (!existsSync(DB_PATH)) {
  console.error('Database not found. Run: npm run db:reset');
  process.exit(1);
}

const query = process.argv.slice(2).join(' ');

if (!query) {
  console.log('Usage: npm run db:query "SELECT * FROM trends"');
  console.log('\nAvailable tables:');
  console.log('  Input:  trends, research, communications');
  console.log('  Output: content_plan, drafts, published, agent_log');
  process.exit(0);
}

const db = new Database(DB_PATH, { readonly: true });

try {
  const results = db.prepare(query).all();

  if (results.length === 0) {
    console.log('No results');
  } else {
    console.log(JSON.stringify(results, null, 2));
  }
} catch (e) {
  console.error('Query error:', e.message);
  process.exit(1);
}

db.close();
```

### src/content/list.js

```javascript
import Database from 'better-sqlite3';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';

const DB_PATH = 'data/content.db';

console.log('Ralph Marketer Content Sources\n');
console.log('='.repeat(60));

if (!existsSync(DB_PATH)) {
  console.log('\nDatabase not found. Run: npm run db:reset');
  process.exit(1);
}

const db = new Database(DB_PATH, { readonly: true });

// Trends
console.log('\nTRENDS (by relevance):');
console.log('-'.repeat(60));
const trends = db.prepare(`
  SELECT topic, relevance_score, source, status
  FROM trends
  WHERE status = 'active'
  ORDER BY relevance_score DESC
`).all();

trends.forEach(t => {
  const score = (t.relevance_score * 100).toFixed(0);
  console.log(`  [${score}%] ${t.topic}`);
  console.log(`        Source: ${t.source}`);
});

// Research
console.log('\nRESEARCH:');
console.log('-'.repeat(60));
const research = db.prepare(`
  SELECT title, category, summary
  FROM research
  WHERE status = 'active'
`).all();

research.forEach(r => {
  console.log(`  [${r.category}] ${r.title}`);
  console.log(`        ${r.summary.substring(0, 60)}...`);
});

// Communications
console.log('\nCOMMUNICATIONS (by priority):');
console.log('-'.repeat(60));
const comms = db.prepare(`
  SELECT type, title, target_audience, priority, status
  FROM communications
  ORDER BY priority ASC
`).all();

comms.forEach(c => {
  const statusIcon = c.status === 'pending' ? 'PENDING' : 'DONE';
  console.log(`  [P${c.priority}] ${c.title} (${c.type})`);
  console.log(`        Audience: ${c.target_audience} | ${statusIcon}`);
});

// Content Files
console.log('\nCONTENT FILES:');
console.log('-'.repeat(60));

const showDir = (dir, label) => {
  if (existsSync(dir)) {
    const files = readdirSync(dir, { recursive: true })
      .filter(f => f.endsWith('.md'));
    console.log(`  ${label}: ${files.length} files`);
    files.slice(0, 3).forEach(f => console.log(`    - ${f}`));
    if (files.length > 3) console.log(`    ... and ${files.length - 3} more`);
  } else {
    console.log(`  ${label}: (directory not found)`);
  }
};

showDir('content/drafts', 'Drafts');
showDir('content/published', 'Published');

console.log('\n' + '='.repeat(60));
db.close();
```

### src/test.js

```javascript
import Database from 'better-sqlite3';
import { existsSync } from 'fs';

const DB_PATH = 'data/content.db';

console.log('Ralph Marketer Test Suite\n');
console.log('='.repeat(50));

let passed = 0;
let failed = 0;

const test = (name, fn) => {
  try {
    fn();
    console.log(`  PASS: ${name}`);
    passed++;
  } catch (e) {
    console.log(`  FAIL: ${name}`);
    console.log(`        ${e.message}`);
    failed++;
  }
};

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

// Test 1: Database exists
test('Database file exists', () => {
  assert(existsSync(DB_PATH), 'Database not found');
});

// Test 2: Can connect
let db;
test('Can connect to database', () => {
  db = new Database(DB_PATH);
  assert(db, 'Connection failed');
});

// Test 3: Tables exist
const requiredTables = ['trends', 'research', 'communications', 'content_plan', 'drafts', 'published', 'agent_log'];
requiredTables.forEach(table => {
  test(`Table "${table}" exists`, () => {
    const result = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`).get(table);
    assert(result, `Table ${table} not found`);
  });
});

// Test 4: Seed data present
test('Trends table has data', () => {
  const count = db.prepare('SELECT COUNT(*) as c FROM trends').get();
  assert(count.c > 0, 'No trends found');
});

test('Research table has data', () => {
  const count = db.prepare('SELECT COUNT(*) as c FROM research').get();
  assert(count.c > 0, 'No research found');
});

test('Communications table has data', () => {
  const count = db.prepare('SELECT COUNT(*) as c FROM communications').get();
  assert(count.c > 0, 'No communications found');
});

// Test 5: Can write to output tables
test('Can insert into content_plan', () => {
  const stmt = db.prepare(`
    INSERT INTO content_plan (content_type, title, brief)
    VALUES ('test', 'Test Plan', 'Test brief')
  `);
  const result = stmt.run();
  assert(result.changes === 1, 'Insert failed');

  // Clean up
  db.prepare('DELETE FROM content_plan WHERE content_type = ?').run('test');
});

test('Can insert into agent_log', () => {
  const stmt = db.prepare(`
    INSERT INTO agent_log (action, details)
    VALUES ('test_action', 'Test details')
  `);
  const result = stmt.run();
  assert(result.changes === 1, 'Insert failed');

  // Clean up
  db.prepare('DELETE FROM agent_log WHERE action = ?').run('test_action');
});

// Summary
console.log('\n' + '='.repeat(50));
console.log(`Results: ${passed} passed, ${failed} failed`);

if (db) db.close();

process.exit(failed > 0 ? 1 : 0);
```

---

## Directory Creation Commands

When running `/ralph-marketer-init`, create these directories:

```bash
mkdir -p scripts/ralph
mkdir -p src/db
mkdir -p src/content
mkdir -p content/drafts/blog
mkdir -p content/drafts/social
mkdir -p content/drafts/newsletter
mkdir -p content/drafts/case-study
mkdir -p content/published/blog
mkdir -p content/published/social
mkdir -p content/published/newsletter
mkdir -p content/published/case-study
mkdir -p data
```

---

## Integration Notes

### Using with Ralph Loop

This skill leverages the existing `/ralph-loop` command from the ralph-loop plugin. The key integration points:

1. **State Management**: Ralph-loop manages iteration state in `.claude/ralph-loop.local.md`
2. **Completion Detection**: When all stories are done, output `<promise>COMPLETE</promise>`
3. **Cancellation**: Use `/cancel-ralph` to stop the loop

### Database Operations

All database operations use better-sqlite3 for synchronous, reliable SQLite access:

- **Read operations**: Use `db.prepare(query).all()` or `.get()`
- **Write operations**: Use `db.prepare(query).run()`
- **Transactions**: Use `db.transaction()` for multi-statement operations

### Git Integration

Commit after significant milestones:
- After each completed story
- After publishing content
- At session end

---

## Troubleshooting

### "Database not found"
Run: `npm run db:reset`

### "better-sqlite3 install fails"
Requires Node.js and build tools. Try:
```bash
npm install --build-from-source better-sqlite3
```

### "Ralph loop not stopping"
Check if all 12 stories in prd.json have status "completed". The loop only exits when the completion promise is genuinely true.

### "Content not being tracked"
Ensure you're:
1. Saving files to correct directories
2. Creating database records for each piece
3. Logging actions to agent_log

---

## Example Session

```
User: /ralph-marketer-init

[Creates structure, installs deps, initializes DB]

User: /ralph-marketer

[Ralph begins autonomous loop]
[Works through SETUP-001, PLAN-001, WRITE-001...]
[Creates content, updates database, commits to git]
[After all 12 stories complete:]

Ralph: <promise>COMPLETE</promise>

[Loop exits cleanly]

User: /ralph-marketer-status

[Shows all stories completed, content metrics]
```
