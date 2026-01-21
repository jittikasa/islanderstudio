# Ralph Marketer Quick Reference

## Commands

| Command | What it does |
|---------|--------------|
| `/ralph-marketer-init` | Initialize project with DB, templates, 12 stories |
| `/ralph-marketer` | Start autonomous content loop |
| `/ralph-marketer-status` | Check progress and metrics |
| `/ralph-marketer-cancel` | Stop active loop |

## NPM Scripts

```bash
npm run db:init      # Create tables
npm run db:seed      # Load sample data
npm run db:status    # Pipeline health
npm run db:reset     # Init + seed (fresh start)
npm run db:query "SQL"  # Run query
npm run content:list # Show all content sources
npm run test         # Verify setup
```

## Database Tables

### Input (Content Sources)
| Table | Fields |
|-------|--------|
| `trends` | topic, description, source, relevance_score, status |
| `research` | title, summary, key_findings, category, status |
| `communications` | type, title, details, key_messages, target_audience, priority |

### Output (Ralph's Work)
| Table | Fields |
|-------|--------|
| `content_plan` | content_type, title, brief, target_keywords, status |
| `drafts` | plan_id, version, content, word_count, feedback |
| `published` | plan_id, final_content, meta_description |
| `agent_log` | action, details, story_id |

## The 12 Stories

| # | ID | Task |
|---|-----|------|
| 1 | SETUP-001 | Verify database setup |
| 2 | PLAN-001 | Plan product launch blog |
| 3 | WRITE-001 | Write product launch draft |
| 4 | PLAN-002 | Plan thought leadership |
| 5 | WRITE-002 | Write thought leadership |
| 6 | REVIEW-001 | Review and improve draft |
| 7 | PUBLISH-001 | Publish product launch blog |
| 8 | PLAN-003 | Plan case study |
| 9 | WRITE-003 | Write case study |
| 10 | SOCIAL-001 | Create social batch |
| 11 | NEWSLETTER-001 | Draft newsletter |
| 12 | METRICS-001 | Final metrics and summary |

## Content Directories

```
content/
  drafts/
    blog/
    social/
    newsletter/
    case-study/
  published/
    blog/
    social/
    newsletter/
    case-study/
```

## Loop Completion

The loop exits when:
1. All 12 stories have `"status": "completed"` in `prd.json`
2. Claude outputs: `<promise>COMPLETE</promise>`

## Quick Queries

```bash
# Active trends by relevance
npm run db:query "SELECT topic, relevance_score FROM trends WHERE status='active' ORDER BY relevance_score DESC"

# Pending communications
npm run db:query "SELECT title, priority FROM communications WHERE status='pending' ORDER BY priority"

# Content pipeline status
npm run db:query "SELECT status, COUNT(*) FROM content_plan GROUP BY status"

# Recent activity
npm run db:query "SELECT action, story_id, created_at FROM agent_log ORDER BY created_at DESC LIMIT 10"
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| DB not found | `npm run db:reset` |
| Loop won't stop | Check all stories completed in prd.json |
| Install fails | `npm install --build-from-source better-sqlite3` |
| No content | Check content/drafts and content/published directories |
