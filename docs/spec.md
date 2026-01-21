# Islander Studio - Technical Specification & Sprint Plan

## Project Overview

**Islander Studio** is a React-based marketing website for iOS applications (Shellist, PolaMoment) featuring:
- Public-facing app showcase pages
- Blog with CMS capabilities
- Admin dashboard with authentication
- Cloudflare-native infrastructure (Workers, D1, R2, Pages)

### Tech Stack
- **Frontend:** React 18, Vite, React Router v6, Motion (Framer Motion)
- **Backend:** Cloudflare Workers (serverless API)
- **Database:** Cloudflare D1 (SQLite at edge)
- **Storage:** Cloudflare R2 (S3-compatible object storage)
- **Hosting:** Cloudflare Pages
- **Rich Text:** TipTap editor

---

## Current Implementation Status

### Already Implemented (Verified in Codebase)

The following features are **already complete** and production-ready:

#### Infrastructure
- [x] D1 database created (`database_id: 7a69bf73-d4df-494b-a025-5d549c98164d`)
- [x] R2 bucket `blog-media` configured
- [x] Workers project structure in `/workers/src/`
- [x] Health endpoint at `/api/health`
- [x] CORS middleware configured

#### Database Schema
- [x] Posts table with all fields
- [x] Authors table
- [x] Categories table
- [x] Tags table
- [x] Apps table (seeded with Shellist, PolaMoment)
- [x] Sessions table
- [x] Media table
- [x] All junction tables (post_categories, post_tags, post_apps)

#### API - Read Operations
- [x] GET /api/posts (paginated, filterable)
- [x] GET /api/posts/:slug
- [x] GET /api/posts/by-app/:appName
- [x] GET /api/authors
- [x] GET /api/categories
- [x] GET /api/tags
- [x] GET /api/apps
- [x] Response caching

#### API - Write Operations
- [x] POST /api/posts (create)
- [x] PUT /api/posts/:id (update)
- [x] DELETE /api/posts/:id
- [x] Full CRUD for authors, categories, tags, apps
- [x] POST /api/media (upload to R2)
- [x] DELETE /api/media/:id
- [x] GET /api/media (list)

#### Authentication
- [x] POST /api/auth/login (password)
- [x] POST /api/auth/logout
- [x] GET /api/auth/verify
- [x] JWT-based sessions
- [x] Google OAuth flow (`/workers/src/google-auth.js`)
- [x] Session verification middleware

#### Frontend - Public Pages
- [x] Blog listing page (`/src/pages/Blog.jsx`)
- [x] Blog post detail page (`/src/pages/BlogPost.jsx`)
- [x] API client library (`/src/lib/api.js`)
- [x] RSS feed endpoint (`/workers/src/api/feed.js`)
- [x] JSON feed endpoint
- [x] Sitemap endpoint (`/workers/src/api/sitemap.js`)
- [x] SEO component (`/src/components/SEO.jsx`)

#### Frontend - Admin
- [x] Admin login page (`/src/pages/AdminLogin.jsx`)
- [x] Admin dashboard (`/src/pages/AdminDashboard.jsx`)
- [x] Post editor with TipTap (`/src/components/admin/PostEditor.jsx`)
- [x] Post manager (`/src/components/admin/PostManager.jsx`)
- [x] Author manager (`/src/components/admin/AuthorManager.jsx`)
- [x] Category manager (`/src/components/admin/CategoryManager.jsx`)
- [x] Tag manager (`/src/components/admin/TagManager.jsx`)
- [x] App manager (`/src/components/admin/AppManager.jsx`)
- [x] Media library (`/src/components/admin/MediaLibrary.jsx`)
- [x] Auth context (`/src/contexts/AuthContext.jsx`)
- [x] Protected route component

#### Other
- [x] Email sending endpoint (`/workers/src/api/email.js`)

---

## Sprint Breakdown - Remaining Work

Based on codebase audit, the following sprints cover **new features and improvements** not yet implemented.

---

# SPRINT 1: Blog Public UI Enhancements

**Goal:** Add missing filtering, search, and UX features to the public blog. Demoable as fully filterable blog with improved reading experience.

---

## Ticket 1.1: Add Category Filter UI to Blog Page

**Description:** Add clickable category pills to filter posts on the blog listing page.

**Tasks:**
1. Fetch categories from `/api/categories` on mount
2. Display category pills/buttons above post list
3. Update URL query param when category selected (e.g., `/blog?category=tutorials`)
4. Filter posts using `category` param in API call
5. Add "All" option to clear filter
6. Highlight active category

**Acceptance Criteria:**
- [ ] Categories load and display as clickable pills
- [ ] Clicking category filters posts immediately
- [ ] URL updates to reflect filter state
- [ ] "All" button clears filter
- [ ] Active category visually highlighted

**Validation:**
- Visit /blog - all categories shown as pills
- Click "Tutorials" - only tutorial posts shown, URL becomes `/blog?category=tutorials`
- Refresh page - filter persists from URL
- Click "All" - all posts shown, URL becomes `/blog`

**Files:**
- `src/pages/Blog.jsx`
- `src/pages/Blog.css`

---

## Ticket 1.2: Add Tag Filter UI to Blog Page

**Description:** Display popular tags and enable tag-based filtering.

**Tasks:**
1. Fetch popular tags (top 10 by post count) from `/api/tags`
2. Display as tag cloud or pills
3. Support `?tag=slug` URL parameter
4. Combine with category filter (AND logic)
5. Show tag in post cards

**Acceptance Criteria:**
- [ ] Popular tags displayed
- [ ] Clicking tag filters posts
- [ ] Can combine tag + category filters
- [ ] URL reflects both filters

**Validation:**
```
/blog?category=tutorials&tag=automation
Expected: Posts with tutorials category AND automation tag
```

**Files:**
- `src/pages/Blog.jsx`

---

## Ticket 1.3: Implement Post Search with Debouncing

**Description:** Add search input to find posts by keyword.

**Tasks:**
1. Add search input above post list
2. Implement 300ms debounce on input
3. Call `/api/posts?search=keyword` API
4. Display results as user types
5. Show "No results found" state
6. Clear search button

**Acceptance Criteria:**
- [ ] Search input visible on blog page
- [ ] Results update as user types (debounced)
- [ ] Empty results handled gracefully
- [ ] Search combines with existing filters

**Validation:**
- Type "automation" - posts mentioning automation appear
- Type "xyz123nonexistent" - "No results found" shown
- Clear search - all posts return

**Files:**
- `src/pages/Blog.jsx`
- `src/components/SearchInput.jsx` (new)

---

## Ticket 1.4: Add Search Endpoint to API

**Description:** Backend endpoint to search posts by keyword.

**Tasks:**
1. Extend GET `/api/posts` to accept `?search=` parameter
2. Search in title, excerpt, and body fields
3. Use SQLite LIKE with wildcards
4. Return relevance-sorted results
5. Limit to 20 results max

**Acceptance Criteria:**
- [ ] Search returns matching posts
- [ ] Searches title, excerpt, body
- [ ] Case-insensitive search
- [ ] Empty search returns normal listing

**Validation:**
```bash
curl "https://api.islanderstudio.app/api/posts?search=habit"
# Expected: Posts containing "habit" in title, excerpt, or body
```

**Files:**
- `workers/src/api/posts.js`

---

## Ticket 1.5: Add Reading Time Display

**Description:** Calculate and display estimated reading time on posts.

**Tasks:**
1. Create `src/lib/readingTime.js` utility
2. Calculate from body word count (200 words/minute)
3. Display on post cards in blog listing
4. Display on post detail page header
5. Format as "X min read"

**Acceptance Criteria:**
- [ ] Reading time shown on all post cards
- [ ] Reading time shown on post detail
- [ ] Accurate calculation (200 wpm baseline)
- [ ] 0 min for empty content

**Validation:**
- 200-word post shows "1 min read"
- 450-word post shows "3 min read"

**Files:**
- `src/lib/readingTime.js` (new)
- `src/pages/Blog.jsx`
- `src/pages/BlogPost.jsx`

---

## Ticket 1.6: Implement Related Posts Section

**Description:** Show related posts at bottom of post detail page.

**Tasks:**
1. Query posts sharing categories or tags with current post
2. Exclude current post from results
3. Limit to 3 posts
4. Display as horizontal cards
5. Add "Related Posts" heading

**Acceptance Criteria:**
- [ ] 3 related posts shown below main content
- [ ] Posts share at least 1 category or tag
- [ ] Current post not included
- [ ] Links work correctly

**Validation:**
- Post with "automation" tag shows other posts with "automation" tag
- Post with no matching tags shows nothing (or fallback to category)

**Files:**
- `src/pages/BlogPost.jsx`

---

## Ticket 1.7: Add App-Related Posts to App Pages

**Description:** Show related blog posts on Shellist and PolaMoment pages.

**Tasks:**
1. Call `/api/posts/by-app/shellist` on Shellist page
2. Call `/api/posts/by-app/polamoment` on PolaMoment page
3. Display latest 3 posts in styled section
4. Add "View All Posts" link to filtered blog
5. Handle empty state gracefully

**Acceptance Criteria:**
- [ ] Shellist page shows Shellist-related posts
- [ ] PolaMoment page shows PolaMoment-related posts
- [ ] "View All" links to `/blog?app=shellist`
- [ ] Empty state says "No posts yet"

**Validation:**
- Visit /shellist - related posts section visible (if posts exist)
- Click "View All Posts" - goes to /blog filtered by app

**Files:**
- `src/pages/Shellist.jsx`
- `src/pages/PolaMoment.jsx`

---

## Ticket 1.8: Update SEO Meta Tags for Blog Posts

**Description:** Ensure dynamic SEO tags from post data.

**Tasks:**
1. Verify SEO component receives post data
2. Use `seo_meta_title` or fallback to title
3. Use `seo_meta_description` or fallback to excerpt
4. Use `seo_og_image_url` or `main_image_url` for og:image
5. Add BlogPosting structured data (JSON-LD)

**Acceptance Criteria:**
- [ ] Each post has unique meta title/description
- [ ] OG image populates from post data
- [ ] Structured data validates in Google Rich Results Test

**Validation:**
```bash
curl -s https://islanderstudio.app/blog/my-post | grep -E "<meta|<script type=\"application/ld\+json"
# Expected: Unique meta tags and valid JSON-LD
```

**Files:**
- `src/components/SEO.jsx`
- `src/pages/BlogPost.jsx`

---

## Sprint 1 Demo Checklist
- [ ] Category filter pills functional
- [ ] Tag filtering works
- [ ] Search returns relevant results
- [ ] Reading time displayed
- [ ] Related posts section shows relevant content
- [ ] App pages show related blog posts
- [ ] SEO meta tags dynamic

---

# SPRINT 2: Admin Dashboard Improvements

**Goal:** Enhance admin UI with missing features and UX improvements. Demoable as polished admin experience.

---

## Ticket 2.1: Add Dashboard Overview Stats Cards

**Description:** Display statistics cards on admin dashboard.

**Tasks:**
1. Create stat card component
2. Fetch counts: posts, authors, categories, tags
3. Display in 4-column grid
4. Show "+X this week" for posts
5. Add icons (using Lucide)

**Acceptance Criteria:**
- [ ] 4 stat cards displayed
- [ ] Accurate counts from API
- [ ] "This week" counter for posts
- [ ] Islander Studio styling

**Validation:**
- Visit /admin/dashboard
- Cards show accurate counts
- "Posts" card shows "+X this week" where X matches posts created in last 7 days

**Files:**
- `src/pages/AdminDashboard.jsx`
- `src/components/admin/StatCard.jsx` (new)

---

## Ticket 2.2: Add Recent Posts List to Dashboard

**Description:** Show list of recent posts on dashboard.

**Tasks:**
1. Fetch 5 most recent posts (any status)
2. Display as list with title, date, status badge
3. Status badge colors (draft=gray, review=yellow, published=green)
4. Click to edit
5. Show empty state if no posts

**Acceptance Criteria:**
- [ ] 5 recent posts shown
- [ ] Status badges color-coded
- [ ] Click navigates to editor
- [ ] Empty state handled

**Files:**
- `src/pages/AdminDashboard.jsx`

---

## Ticket 2.3: Add Quick Action Buttons to Dashboard

**Description:** Prominent buttons for common actions.

**Tasks:**
1. Add "+ New Post" button (primary)
2. Add "Media Library" button (secondary)
3. Position below stats cards
4. Navigate to respective routes

**Acceptance Criteria:**
- [ ] "New Post" creates new post
- [ ] "Media Library" opens media section
- [ ] Buttons styled correctly

**Files:**
- `src/pages/AdminDashboard.jsx`

---

## Ticket 2.4: Implement Tag Merge Functionality

**Description:** Allow merging duplicate tags.

**Tasks:**
1. Add "Merge" action to tag manager
2. Show modal with target tag selector
3. Update all post_tags records to new tag
4. Delete old tag
5. Show confirmation with affected post count

**Acceptance Criteria:**
- [ ] Merge modal opens from tag action
- [ ] Can select target tag
- [ ] Shows affected post count
- [ ] Post relations updated correctly
- [ ] Old tag deleted

**Validation:**
- Merge "javascript" into "js"
- Verify all posts previously tagged "javascript" now tagged "js"
- Verify "javascript" tag deleted

**Files:**
- `src/components/admin/TagManager.jsx`
- `workers/src/api/tags.js` (add merge endpoint)

---

## Ticket 2.5: Add Bulk Delete for Unused Tags

**Description:** Delete all tags with zero posts.

**Tasks:**
1. Add "Delete Unused" button to tag manager
2. Show confirmation with count of tags to delete
3. Delete tags where post_count = 0
4. Refresh tag list

**Acceptance Criteria:**
- [ ] Button shows count of unused tags
- [ ] Confirmation required
- [ ] Only zero-post tags deleted
- [ ] List refreshes after delete

**Validation:**
- Create tag "test-unused" without assigning to posts
- Click "Delete Unused"
- Confirm "test-unused" deleted

**Files:**
- `src/components/admin/TagManager.jsx`
- `workers/src/api/tags.js`

---

## Ticket 2.6: Add Color Picker Component

**Description:** Reusable color picker for categories and apps.

**Tasks:**
1. Create ColorPicker component
2. Show Islander Studio preset colors
3. Allow custom hex input
4. Live preview of selected color
5. Validate hex format

**Acceptance Criteria:**
- [ ] Preset colors clickable
- [ ] Custom hex input works
- [ ] Invalid hex shows error
- [ ] Preview updates live

**Files:**
- `src/components/admin/ColorPicker.jsx` (new)
- `src/components/admin/ColorPicker.css`

---

## Ticket 2.7: Add Settings Page

**Description:** Admin settings page for configuration.

**Tasks:**
1. Create Settings page route
2. Add to sidebar navigation
3. Blog settings: default author, posts per page
4. Site settings: site name, description
5. Save to localStorage or API

**Acceptance Criteria:**
- [ ] Settings page accessible from sidebar
- [ ] Settings persist across sessions
- [ ] Form validation for required fields

**Files:**
- `src/pages/AdminSettings.jsx` (new)
- `src/App.jsx` (add route)

---

## Ticket 2.8: Implement Post Preview with Draft Watermark

**Description:** Preview unpublished posts before publishing.

**Tasks:**
1. Add "Preview" button to post editor
2. Generate preview URL with token
3. BlogPost page detects preview mode
4. Show "DRAFT" watermark overlay
5. Preview shows current unsaved content

**Acceptance Criteria:**
- [ ] Preview opens in new tab
- [ ] Draft watermark visible
- [ ] Shows current editor content
- [ ] Preview link expires after 1 hour

**Validation:**
- Edit draft post
- Click Preview
- New tab shows post with "DRAFT" watermark

**Files:**
- `src/components/admin/PostEditor.jsx`
- `src/pages/BlogPost.jsx`
- `workers/src/api/posts.js` (preview endpoint)

---

## Ticket 2.9: Implement Auto-Save for Post Editor

**Description:** Automatically save drafts as user edits.

**Tasks:**
1. Track changes with dirty state
2. Debounce saves (30 seconds of inactivity)
3. Save as draft via PUT API
4. Show "Saving..." indicator
5. Show "Saved at HH:MM" timestamp
6. Warn before leaving with unsaved changes

**Acceptance Criteria:**
- [ ] Auto-saves every 30 seconds of inactivity
- [ ] Save indicator visible
- [ ] Timestamp shows last save
- [ ] beforeunload prompt for unsaved changes

**Validation:**
- Edit post, wait 30 seconds
- See "Saving..." then "Saved at HH:MM"
- Refresh page, changes persisted

**Files:**
- `src/components/admin/PostEditor.jsx`

---

## Ticket 2.10: Add Post Scheduling

**Description:** Schedule posts to auto-publish at future date/time.

**Tasks:**
1. Add date/time picker for scheduled posts
2. Status: "scheduled" for future-dated posts
3. Create cron trigger to check scheduled posts
4. Auto-publish when scheduled time passed
5. Show scheduled time in post list

**Acceptance Criteria:**
- [ ] Can set future publish date
- [ ] Scheduled posts show status "Scheduled"
- [ ] Post auto-publishes at scheduled time
- [ ] Post list shows scheduled time

**Validation:**
- Schedule post for 5 minutes from now
- Wait 5 minutes
- Post status changes to "published"

**Files:**
- `src/components/admin/PostEditor.jsx`
- `workers/src/scheduled.js` (new)
- `workers/wrangler.toml` (add cron trigger)

---

## Sprint 2 Demo Checklist
- [ ] Dashboard shows stats cards
- [ ] Recent posts with status badges
- [ ] Quick action buttons work
- [ ] Tag merge functionality
- [ ] Bulk delete unused tags
- [ ] Color picker component
- [ ] Settings page
- [ ] Preview with watermark
- [ ] Auto-save working
- [ ] Post scheduling

---

# SPRINT 3: Performance & Security

**Goal:** Optimize performance, add security features, improve reliability. Demoable as fast, secure application.

---

## Ticket 3.1: Create KV Namespace for Rate Limiting

**Description:** Setup Cloudflare KV for rate limit storage.

**Tasks:**
1. Create KV namespace via Wrangler
2. Add binding to wrangler.toml
3. Document namespace ID

**Acceptance Criteria:**
- [ ] KV namespace created
- [ ] Binding configured in wrangler.toml
- [ ] Workers can read/write to KV

**Validation:**
```bash
wrangler kv:namespace list
# Expected: RATE_LIMIT_KV appears
```

**Files:**
- `workers/wrangler.toml`

---

## Ticket 3.2: Implement Rate Limiting for Auth Endpoints

**Description:** Prevent brute force attacks on login.

**Tasks:**
1. Track failed login attempts by IP in KV
2. Block after 5 failures for 15 minutes
3. Return 429 Too Many Requests
4. Include Retry-After header
5. Reset counter on successful login

**Acceptance Criteria:**
- [ ] 5 failures triggers rate limit
- [ ] 429 response with Retry-After header
- [ ] Successful login resets counter
- [ ] Rate limit expires after 15 minutes

**Validation:**
```bash
# Make 6 failed login attempts from same IP
for i in {1..6}; do
  curl -X POST "https://api.example.com/api/auth/login" \
    -d '{"password":"wrong"}'
done
# 6th request should return 429
```

**Files:**
- `workers/src/middleware/rateLimit.js` (new)
- `workers/src/auth.js`

---

## Ticket 3.3: Configure Cron Triggers

**Description:** Setup scheduled tasks in Workers.

**Tasks:**
1. Add cron trigger configuration to wrangler.toml
2. Create scheduled.js handler
3. Configure session cleanup (daily at 3 AM UTC)
4. Configure scheduled post publishing (every 5 minutes)

**Acceptance Criteria:**
- [ ] Cron triggers configured
- [ ] Scheduled handler exports scheduled function
- [ ] Sessions cleaned up daily
- [ ] Scheduled posts publish on time

**Validation:**
```bash
wrangler deploy --dry-run
# Check for cron trigger in output
```

**Files:**
- `workers/wrangler.toml`
- `workers/src/scheduled.js` (new)
- `workers/src/index.js` (export scheduled)

---

## Ticket 3.4: Implement Session Cleanup Job

**Description:** Delete expired sessions automatically.

**Tasks:**
1. Query sessions where expires_at < now
2. Delete expired sessions
3. Log count of deleted sessions
4. Run via cron trigger

**Acceptance Criteria:**
- [ ] Expired sessions deleted daily
- [ ] Count logged
- [ ] Active sessions untouched

**Files:**
- `workers/src/scheduled.js`

---

## Ticket 3.5: Add Token Refresh Mechanism

**Description:** Extend session without re-login.

**Tasks:**
1. Create POST /api/auth/refresh endpoint
2. Validate current token (not expired)
3. Issue new token with extended expiration
4. Update session record in D1
5. Invalidate old token

**Acceptance Criteria:**
- [ ] Fresh token issued with valid old token
- [ ] Old token no longer works after refresh
- [ ] Cannot refresh already-expired token

**Validation:**
```bash
curl -X POST "https://api.example.com/api/auth/refresh" \
  -H "Authorization: Bearer OLD_TOKEN"
# Returns: {"token":"NEW_TOKEN", "expiresAt":"..."}
```

**Files:**
- `workers/src/auth.js`

---

## Ticket 3.6: Implement Image Optimization via Cloudflare Images

**Description:** Auto-optimize images on upload (Cloudflare Images, not sharp).

**Tasks:**
1. Enable Cloudflare Images on account
2. Use Images API for upload instead of raw R2
3. Request variants: thumbnail (200w), medium (800w), large (1600w)
4. Store variant URLs in media record
5. Serve appropriate size based on context

**Note:** sharp library does NOT work in Cloudflare Workers due to native bindings.

**Acceptance Criteria:**
- [ ] Images uploaded to Cloudflare Images
- [ ] Thumbnail, medium, large variants generated
- [ ] Variant URLs stored in database
- [ ] Original preserved

**Validation:**
- Upload 2000x1500 image
- Response includes thumbnail_url, medium_url, large_url
- Each URL serves correct size

**Files:**
- `workers/src/api/media.js`

---

## Ticket 3.7: Add Loading States Throughout App

**Description:** Consistent loading indicators.

**Tasks:**
1. Review all data-fetching components
2. Add LoadingSpinner for initial loads
3. Add skeleton loaders for content areas
4. Ensure no layout shift during load

**Acceptance Criteria:**
- [ ] All loading states have visual indicator
- [ ] Skeleton loaders match content shape
- [ ] No CLS on load completion

**Files:**
- `src/components/LoadingSpinner.jsx`
- `src/components/Skeleton.jsx` (new)
- Various page components

---

## Ticket 3.8: Add Error Boundaries

**Description:** Graceful error handling.

**Tasks:**
1. Create ErrorBoundary component
2. Wrap Blog, BlogPost, Admin sections
3. Show friendly error message
4. Add "Try Again" button
5. Log errors to console

**Acceptance Criteria:**
- [ ] Errors caught at section level
- [ ] Friendly message displayed
- [ ] Retry button works
- [ ] App doesn't crash entirely

**Files:**
- `src/components/ErrorBoundary.jsx` (new)
- `src/App.jsx`

---

## Ticket 3.9: Add Toast Notifications

**Description:** User feedback for actions.

**Tasks:**
1. Create Toast component
2. Create ToastContext for global access
3. Variants: success (green), error (red), info (blue)
4. Auto-dismiss after 5 seconds
5. Dismissible with X button

**Acceptance Criteria:**
- [ ] Toasts appear on save/delete/error
- [ ] Distinct styling per variant
- [ ] Auto-dismiss works
- [ ] Manual dismiss works

**Files:**
- `src/components/Toast.jsx` (new)
- `src/contexts/ToastContext.jsx` (new)

---

## Ticket 3.10: Performance Audit - Lighthouse

**Description:** Measure and improve Core Web Vitals.

**Tasks:**
1. Run Lighthouse audit on homepage, blog, admin
2. Document baseline scores
3. Fix LCP issues (preload hero image, font-display)
4. Fix CLS issues (reserve space for async content)
5. Fix FID issues (minimize JS blocking)

**Acceptance Criteria:**
- [ ] Homepage Lighthouse > 90
- [ ] Blog listing > 90
- [ ] Blog post > 90
- [ ] Admin login > 85

**Validation:**
```bash
npx lighthouse https://islanderstudio.app --view
# Document scores, repeat after fixes
```

**Files:**
- Various optimization changes

---

## Ticket 3.11: Security Audit

**Description:** Review and fix security issues.

**Tasks:**
1. Audit auth implementation for vulnerabilities
2. Verify CORS only allows expected origins
3. Ensure all API input validated
4. Check for XSS in rich text rendering
5. Verify no secrets in client code

**Acceptance Criteria:**
- [ ] No XSS possible in rendered content
- [ ] CORS rejects unexpected origins
- [ ] API validates all input types
- [ ] No env vars exposed to client

**Files:**
- Various files

---

## Sprint 3 Demo Checklist
- [ ] Rate limiting prevents brute force
- [ ] Cron triggers configured
- [ ] Session cleanup runs automatically
- [ ] Token refresh works
- [ ] Image variants generated
- [ ] Loading states throughout
- [ ] Error boundaries catch failures
- [ ] Toast notifications for actions
- [ ] Lighthouse scores > 90
- [ ] Security audit passed

---

# SPRINT 4: Accessibility & Polish

**Goal:** Ensure WCAG AA compliance and polish UX details. Demoable as accessible, polished application.

---

## Ticket 4.1: Add Keyboard Navigation

**Description:** Full keyboard accessibility.

**Tasks:**
1. Audit tab order on all pages
2. Ensure logical tab sequence
3. Enter/Space activate all buttons
4. Escape closes modals and dropdowns
5. Arrow keys navigate lists

**Acceptance Criteria:**
- [ ] Can navigate entire site with keyboard only
- [ ] Tab order follows visual order
- [ ] All interactive elements keyboard-accessible
- [ ] Focus never gets trapped

**Validation:**
- Navigate homepage to blog to post using only Tab and Enter
- Complete admin login and create post using keyboard only

**Files:**
- Various components

---

## Ticket 4.2: Add Focus Indicators

**Description:** Visible focus states for accessibility.

**Tasks:**
1. Define focus style (Coconut Shell outline)
2. Apply to all focusable elements
3. Ensure 3:1 contrast ratio
4. Don't hide focus on mouse users (or use :focus-visible)

**Acceptance Criteria:**
- [ ] All focusable elements have visible focus state
- [ ] Focus style meets contrast requirements
- [ ] Focus visible during keyboard navigation

**Files:**
- `src/index.css`

---

## Ticket 4.3: Add ARIA Labels

**Description:** Screen reader accessibility.

**Tasks:**
1. Audit all interactive elements
2. Add aria-label to icon buttons
3. Add aria-describedby for complex inputs
4. Add aria-live for dynamic content
5. Test with VoiceOver/NVDA

**Acceptance Criteria:**
- [ ] All buttons have accessible names
- [ ] Form fields have labels
- [ ] Dynamic updates announced
- [ ] Screen reader navigation logical

**Validation:**
- Enable VoiceOver, navigate homepage
- All elements announced correctly
- Form fields identified by label

**Files:**
- Various components

---

## Ticket 4.4: Run Automated Accessibility Audit

**Description:** Use axe-core to find issues.

**Tasks:**
1. Install @axe-core/react or axe-core CLI
2. Run on all pages
3. Document critical/serious issues
4. Fix all critical issues
5. Fix all serious issues

**Acceptance Criteria:**
- [ ] 0 critical violations
- [ ] 0 serious violations
- [ ] Minor violations documented

**Validation:**
```bash
npx @axe-core/cli https://islanderstudio.app
# Expected: 0 critical, 0 serious violations
```

**Files:**
- Various files based on findings

---

## Ticket 4.5: Mobile Responsive Polish

**Description:** Perfect mobile experience.

**Tasks:**
1. Test all pages at 375px width
2. Fix any horizontal overflow
3. Ensure touch targets >= 44px
4. Admin sidebar as slide-out drawer on mobile
5. Post editor stacked layout on mobile

**Acceptance Criteria:**
- [ ] No horizontal scroll on mobile
- [ ] All touch targets adequate size
- [ ] Admin usable on mobile
- [ ] Text readable without zooming

**Validation:**
- Test on iPhone SE (375px)
- All content visible without horizontal scroll
- Can complete all admin tasks on mobile

**Files:**
- Various CSS files

---

## Ticket 4.6: Add Reduced Motion Support

**Description:** Respect prefers-reduced-motion.

**Tasks:**
1. Wrap animations in media query check
2. Disable page transitions for reduced motion
3. Keep essential transitions (loading indicators)
4. Test with system setting enabled

**Acceptance Criteria:**
- [ ] Decorative animations disabled when preferred
- [ ] Loading indicators still work
- [ ] Page functional without animation

**Files:**
- `src/index.css`
- `src/App.jsx`

---

## Ticket 4.7: Implement Code Splitting

**Description:** Reduce initial bundle size.

**Tasks:**
1. Lazy load admin routes
2. Lazy load blog routes
3. Show loading spinner during chunk load
4. Preload on hover (optional)

**Acceptance Criteria:**
- [ ] Admin code not in initial bundle
- [ ] Blog chunk separate
- [ ] Initial bundle < 200KB

**Validation:**
```bash
npm run build
ls -la dist/assets/*.js
# Main bundle should be < 200KB
```

**Files:**
- `src/App.jsx`

---

## Ticket 4.8: Optimize Image Loading

**Description:** Lazy loading and responsive images.

**Tasks:**
1. Add loading="lazy" to below-fold images
2. Use srcset for responsive images
3. Add width/height to prevent CLS
4. Use WebP with JPEG fallback

**Acceptance Criteria:**
- [ ] Below-fold images lazy load
- [ ] Correct sizes served for viewport
- [ ] No layout shift from images

**Files:**
- `src/components/OptimizedImage.jsx` (new or update existing)

---

## Sprint 4 Demo Checklist
- [ ] Full keyboard navigation
- [ ] Visible focus indicators
- [ ] Screen reader tested
- [ ] 0 critical a11y violations
- [ ] Mobile responsive
- [ ] Reduced motion supported
- [ ] Code split bundles
- [ ] Optimized images

---

# SPRINT 5: Documentation & Deployment

**Goal:** Production deployment with comprehensive documentation. Demoable as production-ready site with docs.

---

## Ticket 5.1: Document Google OAuth Configuration

**Description:** Document existing OAuth implementation.

**Tasks:**
1. Document Google Cloud Console setup
2. Document required OAuth scopes
3. Document callback URL configuration
4. Add troubleshooting section
5. Update wrangler.toml comments

**Acceptance Criteria:**
- [ ] New developer can configure OAuth
- [ ] All steps documented
- [ ] Troubleshooting covers common issues

**Files:**
- `docs/GOOGLE_OAUTH_SETUP.md` (new)

---

## Ticket 5.2: Create Admin User Guide

**Description:** Documentation for content editors.

**Tasks:**
1. Document login process (password + OAuth)
2. Explain post creation workflow
3. Document media upload process
4. Explain taxonomies (categories/tags/apps)
5. Include screenshots

**Acceptance Criteria:**
- [ ] Non-technical user can follow guide
- [ ] All admin features documented
- [ ] Screenshots included

**Files:**
- `docs/ADMIN_USER_GUIDE.md` (new)

---

## Ticket 5.3: Create API Documentation

**Description:** Document all API endpoints.

**Tasks:**
1. Document all public endpoints
2. Document all admin endpoints
3. Include request/response examples
4. Document error response formats
5. Document authentication flow

**Acceptance Criteria:**
- [ ] All endpoints documented
- [ ] Examples for each endpoint
- [ ] Error codes explained
- [ ] Auth flow clear

**Files:**
- `docs/API_DOCUMENTATION.md` (new)

---

## Ticket 5.4: Update Deployment Guide

**Description:** Comprehensive deployment documentation.

**Tasks:**
1. Document all required secrets
2. Step-by-step deployment from scratch
3. Document environment variables
4. Add rollback procedure
5. Add troubleshooting section

**Acceptance Criteria:**
- [ ] New developer can deploy from scratch
- [ ] All secrets documented
- [ ] Rollback procedure clear

**Files:**
- `docs/DEPLOYMENT_GUIDE.md` (update)

---

## Ticket 5.5: Configure Production Custom Domains

**Description:** Setup custom domains for all services.

**Tasks:**
1. Verify frontend at islanderstudio.app
2. Verify API at api.islanderstudio.app
3. Verify media at media.islanderstudio.app
4. Ensure HTTPS on all domains
5. Verify CORS allows custom domains

**Acceptance Criteria:**
- [ ] All three domains resolving
- [ ] HTTPS working everywhere
- [ ] CORS configured correctly

**Files:**
- `workers/wrangler.toml`
- Cloudflare Dashboard configuration

---

## Ticket 5.6: Setup Error Monitoring

**Description:** Configure error tracking service.

**Tasks:**
1. Choose service (Sentry recommended)
2. Integrate with frontend (src/main.jsx)
3. Integrate with Workers
4. Configure alert thresholds
5. Document access

**Acceptance Criteria:**
- [ ] Errors captured in dashboard
- [ ] Alerts configured for error spikes
- [ ] Team has access

**Files:**
- `src/main.jsx`
- `workers/src/index.js`

---

## Ticket 5.7: Setup Privacy-Respecting Analytics

**Description:** Configure analytics without tracking cookies.

**Tasks:**
1. Choose service (Cloudflare Analytics recommended - already integrated)
2. Verify page views tracked
3. Verify referrer data collected
4. Document analytics access

**Acceptance Criteria:**
- [ ] Page views visible in dashboard
- [ ] No cookies set for analytics
- [ ] GDPR compliant

**Files:**
- Documentation only (Cloudflare Analytics automatic)

---

## Ticket 5.8: Final QA Pass

**Description:** Comprehensive testing before launch.

**Tasks:**
1. Test all public pages on Chrome, Firefox, Safari
2. Test all admin features end-to-end
3. Test on iOS Safari and Android Chrome
4. Verify all links work (no 404s)
5. Check console for errors

**Acceptance Criteria:**
- [ ] Cross-browser tested
- [ ] Mobile tested
- [ ] No console errors
- [ ] All links valid

**Files:**
- N/A (testing task)

---

## Ticket 5.9: Create Seed Data for Demo

**Description:** Populate database with sample content.

**Tasks:**
1. Create 1 author profile
2. Create 3 categories
3. Create 5 tags
4. Create 3 sample blog posts
5. Upload 3 sample images

**Acceptance Criteria:**
- [ ] Blog not empty on demo
- [ ] Posts have images
- [ ] Mix of categories/tags

**Files:**
- `scripts/seed-demo-data.js` (new)

---

## Sprint 5 Demo Checklist
- [ ] OAuth documentation complete
- [ ] Admin user guide complete
- [ ] API documentation complete
- [ ] Deployment guide updated
- [ ] All custom domains working
- [ ] Error monitoring active
- [ ] Analytics tracking
- [ ] QA passed on all browsers
- [ ] Demo data populated

---

# Summary

## Sprint Overview

| Sprint | Focus | Key Deliverables |
|--------|-------|------------------|
| 1 | Blog Public UI | Filtering, search, reading time, related posts, SEO |
| 2 | Admin Improvements | Stats, scheduling, auto-save, tag merge, settings |
| 3 | Performance & Security | Rate limiting, crons, optimization, error handling |
| 4 | Accessibility | WCAG AA compliance, mobile polish, code splitting |
| 5 | Documentation | Guides, API docs, deployment, QA |

## Total New Tickets: 48

## Already Complete: ~55 features (see "Current Implementation Status" above)

## Key Technical Decisions
1. **Database:** Cloudflare D1 (SQLite at edge) - already configured
2. **Storage:** Cloudflare R2 - already configured
3. **API:** Cloudflare Workers - already implemented
4. **Frontend:** React 18 + Vite - already implemented
5. **Auth:** JWT + Google OAuth - already implemented
6. **Rich Text:** TipTap - already integrated
7. **Image Optimization:** Cloudflare Images (NOT sharp - doesn't work in Workers)
8. **Hosting:** Cloudflare Pages - already deployed

## Field Naming Convention
- **API/Database:** snake_case (e.g., `published_at`, `content_status`)
- **JavaScript/React:** camelCase (e.g., `publishedAt`, `contentStatus`)
- **Existing code mixes both** - need consistency audit

## Definition of Done
Each ticket is complete when:
- [ ] Code written and self-reviewed
- [ ] Validation criteria met manually
- [ ] No console errors
- [ ] Works on mobile viewport
- [ ] Deployed to staging/production
- [ ] Demo-ready
