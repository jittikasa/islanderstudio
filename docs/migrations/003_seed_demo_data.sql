-- Seed Data for Islander Studio Blog Demo
-- Run with: wrangler d1 execute blog-database --remote --file=../docs/migrations/003_seed_demo_data.sql

-- Insert Demo Authors
INSERT OR IGNORE INTO authors (id, name, email, bio, avatar_url, created_at, updated_at) VALUES
  ('author-1', 'Islander Team', 'team@islanderstudio.app', 'The Islander Studio team crafts beautiful iOS apps with soul and purpose. We believe in thoughtful design and meaningful experiences.', 'https://islanderstudio.app/branding/Logomark-dark.png', datetime('now'), datetime('now')),
  ('author-2', 'Design Corner', 'design@islanderstudio.app', 'Exploring the intersection of design, technology, and user experience.', NULL, datetime('now'), datetime('now'));

-- Insert Demo Categories
INSERT OR IGNORE INTO categories (id, title, slug, description, color, created_at, updated_at) VALUES
  ('cat-1', 'Tutorials', 'tutorials', 'Step-by-step guides to get the most out of our apps', '#6366f1', datetime('now'), datetime('now')),
  ('cat-2', 'Updates', 'updates', 'News and updates about our apps and company', '#10b981', datetime('now'), datetime('now')),
  ('cat-3', 'Behind the Scenes', 'behind-the-scenes', 'A look at how we build and design our apps', '#f59e0b', datetime('now'), datetime('now')),
  ('cat-4', 'Tips & Tricks', 'tips-tricks', 'Quick tips to enhance your productivity', '#ec4899', datetime('now'), datetime('now'));

-- Insert Demo Tags
INSERT OR IGNORE INTO tags (id, title, slug, created_at, updated_at) VALUES
  ('tag-1', 'Shellist', 'shellist', datetime('now'), datetime('now')),
  ('tag-2', 'PolaMoment', 'polamoment', datetime('now'), datetime('now')),
  ('tag-3', 'iOS', 'ios', datetime('now'), datetime('now')),
  ('tag-4', 'Design', 'design', datetime('now'), datetime('now')),
  ('tag-5', 'Productivity', 'productivity', datetime('now'), datetime('now')),
  ('tag-6', 'Photography', 'photography', datetime('now'), datetime('now')),
  ('tag-7', 'SwiftUI', 'swiftui', datetime('now'), datetime('now')),
  ('tag-8', 'Automation', 'automation', datetime('now'), datetime('now'));

-- Insert Demo Apps
INSERT OR IGNORE INTO apps (id, title, slug, description, icon_url, app_store_url, created_at, updated_at) VALUES
  ('app-1', 'Shellist', 'shellist', 'The beautiful habit tracker that helps you build lasting routines', 'https://islanderstudio.app/shellist-icon.png', 'https://apps.apple.com/app/shellist', datetime('now'), datetime('now')),
  ('app-2', 'PolaMoment', 'polamoment', 'Capture memories with vintage polaroid-style photos', 'https://islanderstudio.app/polamoment-icon.png', 'https://apps.apple.com/app/polamoment', datetime('now'), datetime('now'));

-- Insert Demo Posts
INSERT OR IGNORE INTO posts (id, title, slug, excerpt, body, author_id, status, featured, reading_time, published_at, created_at, updated_at, meta_title, meta_description) VALUES
  (
    'post-1',
    'Welcome to Islander Studio Blog',
    'welcome-to-islander-studio-blog',
    'We''re excited to launch our new blog where we''ll share updates, tutorials, and behind-the-scenes content about our iOS apps.',
    '<p>Welcome to the Islander Studio blog! We''re thrilled to have you here.</p>
    <h2>What You''ll Find Here</h2>
    <p>This blog is your destination for:</p>
    <ul>
      <li><strong>App Updates</strong> - Stay informed about new features and improvements</li>
      <li><strong>Tutorials</strong> - Learn how to get the most out of Shellist and PolaMoment</li>
      <li><strong>Behind the Scenes</strong> - See how we design and build our apps</li>
      <li><strong>Tips & Tricks</strong> - Quick productivity and photography tips</li>
    </ul>
    <h2>About Islander Studio</h2>
    <p>At Islander Studio, we believe in crafting apps with soul. Every feature, every pixel, every interaction is designed with care and purpose. Our apps aren''t just tools—they''re companions for your everyday moments.</p>
    <p>Stay tuned for more content, and thank you for being part of our journey!</p>',
    'author-1',
    'published',
    1,
    3,
    datetime('now', '-7 days'),
    datetime('now', '-7 days'),
    datetime('now', '-7 days'),
    'Welcome to Islander Studio Blog | Islander Studio',
    'Discover our new blog featuring updates, tutorials, and behind-the-scenes content about Shellist, PolaMoment, and more iOS apps.'
  ),
  (
    'post-2',
    'Getting Started with Shellist: Your First Week',
    'getting-started-shellist-first-week',
    'A complete guide to setting up Shellist and building your first habits. Learn the best practices for creating sustainable routines.',
    '<p>Starting a new habit tracker can be overwhelming. Here''s how to set yourself up for success with Shellist.</p>
    <h2>Day 1: Start Small</h2>
    <p>The biggest mistake people make is trying to track too many habits at once. Start with just 2-3 habits that are truly important to you.</p>
    <h3>Recommended starter habits:</h3>
    <ul>
      <li>Drink water in the morning</li>
      <li>Read for 10 minutes</li>
      <li>Take a short walk</li>
    </ul>
    <h2>Days 2-3: Customize Your Experience</h2>
    <p>Shellist offers beautiful themes and icons. Take some time to make your habits visually appealing—this small touch makes a big difference in motivation.</p>
    <h2>Days 4-7: Build Momentum</h2>
    <p>Focus on consistency, not perfection. If you miss a day, don''t worry—just pick up where you left off. The streak feature is there to motivate you, not to punish you.</p>
    <blockquote>
      <p>"The secret to building habits isn''t discipline—it''s making them enjoyable."</p>
    </blockquote>
    <h2>Next Steps</h2>
    <p>Once you''ve completed your first week, you''ll have a solid foundation. In our next tutorial, we''ll cover advanced features like habit stacking and time blocking.</p>',
    'author-1',
    'published',
    0,
    5,
    datetime('now', '-5 days'),
    datetime('now', '-5 days'),
    datetime('now', '-5 days'),
    'Getting Started with Shellist: A First Week Guide',
    'Learn how to set up Shellist and build lasting habits in your first week. Tips for sustainable routine building.'
  ),
  (
    'post-3',
    'PolaMoment Tips: Capturing the Perfect Shot',
    'polamoment-tips-capturing-perfect-shot',
    'Master the art of polaroid-style photography with these simple but effective tips for PolaMoment.',
    '<p>PolaMoment brings the charm of vintage polaroid photography to your iPhone. Here are some tips to capture stunning shots.</p>
    <h2>Embrace Natural Light</h2>
    <p>Polaroid-style photos look best in natural lighting. Golden hour—the hour after sunrise or before sunset—creates warm, magical tones that complement the vintage aesthetic.</p>
    <h2>Frame Your Subject</h2>
    <p>Leave some space around your subject. Polaroids have that characteristic white border, and your composition should account for this framing.</p>
    <h2>Use the Right Filter</h2>
    <p>PolaMoment offers several authentic filters:</p>
    <ul>
      <li><strong>Classic</strong> - Warm, slightly faded tones</li>
      <li><strong>Vintage</strong> - Stronger color shift with grain</li>
      <li><strong>Fade</strong> - Soft, dreamy look</li>
      <li><strong>Vivid</strong> - Enhanced colors for landscapes</li>
    </ul>
    <h2>The Shake Effect</h2>
    <p>After taking a photo, try the shake-to-develop feature. It''s a fun nod to the classic polaroid experience, and watching your photo "develop" never gets old.</p>
    <h2>Share Your Moments</h2>
    <p>Tag your photos with #PolaMoment on social media. We love seeing how our community uses the app!</p>',
    'author-1',
    'published',
    0,
    4,
    datetime('now', '-3 days'),
    datetime('now', '-3 days'),
    datetime('now', '-3 days'),
    'PolaMoment Photography Tips | Islander Studio',
    'Master polaroid-style photography with these tips for PolaMoment. Learn about lighting, composition, and filters.'
  ),
  (
    'post-4',
    'The Design Philosophy Behind Our Apps',
    'design-philosophy-behind-our-apps',
    'An inside look at how we approach design at Islander Studio. From color palettes to micro-interactions, every detail matters.',
    '<p>Design at Islander Studio isn''t just about how things look—it''s about how they feel. Here''s a glimpse into our design philosophy.</p>
    <h2>Soul Over Polish</h2>
    <p>We believe apps should have personality. While we value clean, polished interfaces, we never sacrifice warmth and character for minimal aesthetics.</p>
    <h2>Thoughtful Color Palettes</h2>
    <p>Our color choices are intentional. Shellist uses earthy, calming tones that don''t overwhelm during daily use. PolaMoment embraces nostalgic, warm hues that complement vintage photography.</p>
    <h2>Micro-Interactions Matter</h2>
    <p>The small animations and haptic feedback in our apps aren''t decorative—they''re communicative. A subtle bounce when you complete a habit, a gentle shake when developing a photo—these moments create emotional connections.</p>
    <h2>Accessibility First</h2>
    <p>Beautiful design means nothing if it''s not usable. We ensure proper contrast ratios, support Dynamic Type, and design for VoiceOver compatibility from day one.</p>
    <blockquote>
      <p>"Every interaction is an opportunity to delight the user."</p>
    </blockquote>
    <h2>Looking Forward</h2>
    <p>We''re constantly evolving our design language while staying true to our core values: warmth, usability, and soul.</p>',
    'author-2',
    'published',
    0,
    6,
    datetime('now', '-1 days'),
    datetime('now', '-1 days'),
    datetime('now', '-1 days'),
    'The Design Philosophy Behind Islander Studio Apps',
    'Explore the design principles that guide Islander Studio. Learn about our approach to color, animation, and user experience.'
  ),
  (
    'post-5',
    'Upcoming Features: What We''re Working On',
    'upcoming-features-what-were-working-on',
    'A sneak peek at the features coming to Shellist and PolaMoment in the next few months.',
    '<p>We''re always working to make our apps better. Here''s what''s coming soon!</p>
    <h2>Shellist Updates</h2>
    <h3>Widget Support</h3>
    <p>See your habits right on your home screen with beautiful, glanceable widgets.</p>
    <h3>Habit Templates</h3>
    <p>Quick-start templates for common goals like fitness, mindfulness, and learning.</p>
    <h3>Advanced Statistics</h3>
    <p>Detailed insights into your habit patterns with weekly and monthly reports.</p>
    <h2>PolaMoment Updates</h2>
    <h3>New Film Packs</h3>
    <p>Additional filter packs inspired by classic film stocks from the 70s and 80s.</p>
    <h3>Photo Albums</h3>
    <p>Organize your polaroid memories into themed albums.</p>
    <h3>Share Sheets</h3>
    <p>Easier sharing with custom-designed share cards.</p>
    <h2>Timeline</h2>
    <p>We''re aiming to release these features over the next quarter. Follow us on social media for the latest updates!</p>',
    'author-1',
    'draft',
    0,
    4,
    NULL,
    datetime('now'),
    datetime('now'),
    'Upcoming Features for Shellist and PolaMoment',
    'Sneak peek at new features coming to Islander Studio apps including widgets, templates, and new film packs.'
  );

-- Link posts to categories
INSERT OR IGNORE INTO post_categories (post_id, category_id) VALUES
  ('post-1', 'cat-2'),
  ('post-2', 'cat-1'),
  ('post-3', 'cat-1'),
  ('post-3', 'cat-4'),
  ('post-4', 'cat-3'),
  ('post-5', 'cat-2');

-- Link posts to tags
INSERT OR IGNORE INTO post_tags (post_id, tag_id) VALUES
  ('post-1', 'tag-3'),
  ('post-2', 'tag-1'),
  ('post-2', 'tag-5'),
  ('post-3', 'tag-2'),
  ('post-3', 'tag-6'),
  ('post-4', 'tag-4'),
  ('post-4', 'tag-7'),
  ('post-5', 'tag-1'),
  ('post-5', 'tag-2'),
  ('post-5', 'tag-3');

-- Link posts to apps
INSERT OR IGNORE INTO post_apps (post_id, app_id) VALUES
  ('post-2', 'app-1'),
  ('post-3', 'app-2'),
  ('post-5', 'app-1'),
  ('post-5', 'app-2');
