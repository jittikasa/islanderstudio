-- Seed Data for Islander Studio Blog Demo
-- Run with: wrangler d1 execute blog-database --remote --file=docs/migrations/003_seed_demo_data.sql

-- Insert Demo Authors
INSERT OR IGNORE INTO authors (id, name, slug, email, bio, image_url, created_at) VALUES
  ('author-demo-1', 'Islander Team', 'islander-team', 'team@islanderstudio.app', 'The Islander Studio team crafts beautiful iOS apps with soul and purpose. We believe in thoughtful design and meaningful experiences.', 'https://islanderstudio.app/branding/Logomark-dark.png', datetime('now')),
  ('author-demo-2', 'Design Corner', 'design-corner', 'design@islanderstudio.app', 'Exploring the intersection of design, technology, and user experience.', NULL, datetime('now'));

-- Insert Demo Categories
INSERT OR IGNORE INTO categories (id, title, slug, description, color, created_at) VALUES
  ('cat-demo-1', 'Tutorials', 'tutorials', 'Step-by-step guides to get the most out of our apps', '#6366f1', datetime('now')),
  ('cat-demo-2', 'Updates', 'updates', 'News and updates about our apps and company', '#10b981', datetime('now')),
  ('cat-demo-3', 'Behind the Scenes', 'behind-the-scenes', 'A look at how we build and design our apps', '#f59e0b', datetime('now')),
  ('cat-demo-4', 'Tips & Tricks', 'tips-tricks', 'Quick tips to enhance your productivity', '#ec4899', datetime('now'));

-- Insert Demo Tags
INSERT OR IGNORE INTO tags (id, title, slug, created_at) VALUES
  ('tag-demo-1', 'Shellist', 'shellist', datetime('now')),
  ('tag-demo-2', 'PolaMoment', 'polamoment', datetime('now')),
  ('tag-demo-3', 'iOS', 'ios', datetime('now')),
  ('tag-demo-4', 'Design', 'design', datetime('now')),
  ('tag-demo-5', 'Productivity', 'productivity', datetime('now')),
  ('tag-demo-6', 'Photography', 'photography', datetime('now')),
  ('tag-demo-7', 'SwiftUI', 'swiftui', datetime('now')),
  ('tag-demo-8', 'Automation', 'automation', datetime('now'));

-- Insert Demo Posts
INSERT OR IGNORE INTO posts (id, title, slug, excerpt, body, author_id, content_status, featured, reading_time, published_at, created_at, updated_at, seo_meta_title, seo_meta_description) VALUES
  (
    'post-demo-1',
    'Welcome to Islander Studio Blog',
    'welcome-to-islander-studio-blog-demo',
    'We are excited to launch our new blog where we will share updates, tutorials, and behind-the-scenes content about our iOS apps.',
    '<p>Welcome to the Islander Studio blog! We are thrilled to have you here.</p>
    <h2>What You Will Find Here</h2>
    <p>This blog is your destination for:</p>
    <ul>
      <li><strong>App Updates</strong> - Stay informed about new features and improvements</li>
      <li><strong>Tutorials</strong> - Learn how to get the most out of Shellist and PolaMoment</li>
      <li><strong>Behind the Scenes</strong> - See how we design and build our apps</li>
      <li><strong>Tips & Tricks</strong> - Quick productivity and photography tips</li>
    </ul>
    <h2>About Islander Studio</h2>
    <p>At Islander Studio, we believe in crafting apps with soul. Every feature, every pixel, every interaction is designed with care and purpose. Our apps are not just tools—they are companions for your everyday moments.</p>
    <p>Stay tuned for more content, and thank you for being part of our journey!</p>',
    'author-demo-1',
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
    'post-demo-2',
    'Getting Started with Shellist: Your First Week',
    'getting-started-shellist-first-week-demo',
    'A complete guide to setting up Shellist and building your first habits. Learn the best practices for creating sustainable routines.',
    '<p>Starting a new habit tracker can be overwhelming. Here is how to set yourself up for success with Shellist.</p>
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
    <p>Focus on consistency, not perfection. If you miss a day, do not worry—just pick up where you left off. The streak feature is there to motivate you, not to punish you.</p>
    <blockquote>
      <p>"The secret to building habits is not discipline—it is making them enjoyable."</p>
    </blockquote>
    <h2>Next Steps</h2>
    <p>Once you have completed your first week, you will have a solid foundation. In our next tutorial, we will cover advanced features like habit stacking and time blocking.</p>',
    'author-demo-1',
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
    'post-demo-3',
    'PolaMoment Tips: Capturing the Perfect Shot',
    'polamoment-tips-capturing-perfect-shot-demo',
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
    <p>After taking a photo, try the shake-to-develop feature. It is a fun nod to the classic polaroid experience, and watching your photo develop never gets old.</p>
    <h2>Share Your Moments</h2>
    <p>Tag your photos with #PolaMoment on social media. We love seeing how our community uses the app!</p>',
    'author-demo-1',
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
    'post-demo-4',
    'The Design Philosophy Behind Our Apps',
    'design-philosophy-behind-our-apps-demo',
    'An inside look at how we approach design at Islander Studio. From color palettes to micro-interactions, every detail matters.',
    '<p>Design at Islander Studio is not just about how things look—it is about how they feel. Here is a glimpse into our design philosophy.</p>
    <h2>Soul Over Polish</h2>
    <p>We believe apps should have personality. While we value clean, polished interfaces, we never sacrifice warmth and character for minimal aesthetics.</p>
    <h2>Thoughtful Color Palettes</h2>
    <p>Our color choices are intentional. Shellist uses earthy, calming tones that do not overwhelm during daily use. PolaMoment embraces nostalgic, warm hues that complement vintage photography.</p>
    <h2>Micro-Interactions Matter</h2>
    <p>The small animations and haptic feedback in our apps are not decorative—they are communicative. A subtle bounce when you complete a habit, a gentle shake when developing a photo—these moments create emotional connections.</p>
    <h2>Accessibility First</h2>
    <p>Beautiful design means nothing if it is not usable. We ensure proper contrast ratios, support Dynamic Type, and design for VoiceOver compatibility from day one.</p>
    <blockquote>
      <p>"Every interaction is an opportunity to delight the user."</p>
    </blockquote>
    <h2>Looking Forward</h2>
    <p>We are constantly evolving our design language while staying true to our core values: warmth, usability, and soul.</p>',
    'author-demo-2',
    'published',
    0,
    6,
    datetime('now', '-1 days'),
    datetime('now', '-1 days'),
    datetime('now', '-1 days'),
    'The Design Philosophy Behind Islander Studio Apps',
    'Explore the design principles that guide Islander Studio. Learn about our approach to color, animation, and user experience.'
  );

-- Link posts to categories
INSERT OR IGNORE INTO post_categories (post_id, category_id) VALUES
  ('post-demo-1', 'cat-demo-2'),
  ('post-demo-2', 'cat-demo-1'),
  ('post-demo-3', 'cat-demo-1'),
  ('post-demo-3', 'cat-demo-4'),
  ('post-demo-4', 'cat-demo-3');

-- Link posts to tags
INSERT OR IGNORE INTO post_tags (post_id, tag_id) VALUES
  ('post-demo-1', 'tag-demo-3'),
  ('post-demo-2', 'tag-demo-1'),
  ('post-demo-2', 'tag-demo-5'),
  ('post-demo-3', 'tag-demo-2'),
  ('post-demo-3', 'tag-demo-6'),
  ('post-demo-4', 'tag-demo-4'),
  ('post-demo-4', 'tag-demo-7');
