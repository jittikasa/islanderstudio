# SEO Content Researcher & Writer Skill

## Overview
This skill enables Claude to research, analyze, and create SEO-optimized content that aligns with islanderStudio's brand voice and values. The skill combines comprehensive keyword research, competitor analysis, content strategy, and HTML-formatted content creation.

---

## Skill Capabilities

### 1. SEO Research & Analysis
- Keyword research and clustering
- Search intent analysis
- Competitor content gap analysis
- SERP feature identification
- Topic authority mapping
- Content opportunity identification

### 2. Content Strategy
- Content brief creation
- Editorial calendar planning
- Topic clustering and pillar pages
- Internal linking strategy
- Content optimization recommendations

### 3. Content Creation
- SEO-optimized blog posts and articles
- Product descriptions
- Landing page copy
- Category descriptions
- Meta tags (title, description, schema)
- HTML-formatted output ready for CMS

### 4. Brand Integration
- Applies islanderStudio brand voice (warm, curious, delightful)
- Uses approved color palette and design principles
- Maintains "Tropical Modernism" aesthetic in content tone
- Follows brand messaging guidelines

---

## Workflow Process

### Phase 1: Research & Discovery
When you request SEO content, Claude will:

1. **Understand the Topic**
   - Clarify the main topic/product/service
   - Identify target audience
   - Determine content goals (awareness, conversion, education)

2. **Keyword Research**
   - Primary keyword identification
   - Secondary keyword opportunities
   - Long-tail keyword variations
   - Search volume estimation (when available)
   - Keyword difficulty assessment

3. **Search Intent Analysis**
   - Informational intent
   - Navigational intent
   - Transactional intent
   - Commercial investigation intent

4. **Competitor Analysis**
   - Top-ranking content review
   - Content gaps identification
   - Unique angle opportunities
   - Best practices extraction

### Phase 2: Content Planning

5. **Content Brief Creation**
   Claude generates a structured brief including:
   - Target keyword(s)
   - Recommended word count
   - Content structure/outline
   - Headings hierarchy (H1, H2, H3)
   - Key points to cover
   - Internal linking opportunities
   - External authority sources
   - Meta title and description
   - Suggested images/media

### Phase 3: Content Creation

6. **Writing Optimized Content**
   - Engaging introduction with keyword integration
   - Clear, logical structure with proper heading hierarchy
   - Natural keyword placement (avoiding stuffing)
   - Readability optimization (short paragraphs, varied sentence length)
   - Brand voice alignment (islanderStudio: warm, curious, delightful)
   - Call-to-action placement
   - Internal and external linking

7. **HTML Formatting**
   - Semantic HTML5 structure
   - Proper heading tags (H1-H6)
   - Optimized image alt text
   - Schema markup (when applicable)
   - Meta tags
   - Clean, CMS-ready code

### Phase 4: Optimization & Delivery

8. **SEO Checklist**
   - Keyword density check
   - Heading optimization
   - Meta tag optimization
   - Image optimization recommendations
   - Internal linking verification
   - Readability score estimation
   - Mobile-friendliness considerations

---

## Brand Voice Integration

### islanderStudio Tone of Voice
All content follows islanderStudio's voice characteristics:

**Warm**
- Conversational but professional
- Approachable without being casual
- Like a thoughtful friend sharing expertise

**Curious**
- Ask engaging questions
- Explore ideas with genuine interest
- Invite dialogue and exploration

**Delightful**
- Find moments to surprise and charm
- Thoughtful word choices
- Human touches that create connection

**Clear & Deliberate**
- Say more with less
- Every word earns its place
- Edited ruthlessly for clarity
- Respect reader's time

### Content Rules from Brand Guidelines

**DO:**
- Write with empathy and care for the reader
- Use natural language, not corporate jargon
- Cut unnecessary content
- Distill complex ideas simply
- Find small moments to delight
- Iterate and refine drafts

**DON'T:**
- Rush content creation
- Use quick, sloppy copy
- Overuse corporate speak
- Overwhelm with unnecessary words

---

## SEO Best Practices

### Keyword Optimization
- **Primary keyword**: Include in H1, first paragraph, URL, meta title, meta description
- **Secondary keywords**: Distribute naturally throughout content
- **LSI keywords**: Use semantic variations to show topical authority
- **Keyword density**: 1-2% for primary keyword (natural, not forced)

### Content Structure
```
H1 (Page Title - Primary Keyword)
├── Introduction (150-200 words with primary keyword)
├── H2 (Main Section - Secondary Keyword)
│   ├── Paragraph
│   ├── H3 (Subsection)
│   └── Paragraph
├── H2 (Main Section - Secondary Keyword)
│   ├── Paragraph
│   └── List/Table/Visual element
└── Conclusion with CTA
```

### Meta Tags
- **Title tag**: 50-60 characters, include primary keyword, brand if space
- **Meta description**: 150-160 characters, compelling with CTA, include keyword
- **URL slug**: Short, keyword-rich, hyphen-separated

### Internal Linking
- Link to relevant pillar content
- Use descriptive anchor text (not "click here")
- 2-5 internal links per 1000 words
- Link to related products/services

### External Linking
- Link to authoritative sources
- Open in new tab (target="_blank" rel="noopener")
- Use for statistics, studies, definitions
- 1-3 external links per 1000 words

### Readability
- Paragraph length: 2-4 sentences maximum
- Sentence length: Vary between short (5-10 words) and medium (15-20 words)
- Use bullet points and numbered lists
- Include visual breaks (images, quotes, tables)
- Grade level: 8th-9th grade (Flesch-Kincaid)

---

## HTML Output Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[SEO-Optimized Title - 50-60 chars]</title>
    <meta name="description" content="[Compelling meta description - 150-160 chars]">
    <!-- Schema Markup (if applicable) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "[Article Headline]",
        "author": {
            "@type": "Organization",
            "name": "islanderStudio"
        },
        "datePublished": "[YYYY-MM-DD]",
        "image": "[Featured Image URL]"
    }
    </script>
</head>
<body>
    <article>
        <header>
            <h1>[Primary Keyword-Rich H1 Title]</h1>
        </header>
        
        <section>
            <p>[Introduction paragraph with primary keyword and hook]</p>
        </section>
        
        <section>
            <h2>[Section Heading with Secondary Keyword]</h2>
            <p>[Content paragraph]</p>
            
            <h3>[Subsection Heading]</h3>
            <p>[Content paragraph]</p>
            
            <ul>
                <li>[List item]</li>
                <li>[List item]</li>
            </ul>
        </section>
        
        <section>
            <h2>[Section Heading with Secondary Keyword]</h2>
            <p>[Content paragraph with <a href="/internal-link">descriptive anchor text</a>]</p>
            
            <figure>
                <img src="[image-url]" alt="[Descriptive, keyword-rich alt text]" width="800" height="600">
                <figcaption>[Image caption]</figcaption>
            </figure>
        </section>
        
        <section>
            <h2>Conclusion</h2>
            <p>[Summary paragraph]</p>
            <p><strong>Call to Action:</strong> [Compelling CTA with link]</p>
        </section>
    </article>
</body>
</html>
```

---

## Usage Examples

### Example 1: Blog Post Request
**User:** "Write an SEO blog post about iOS app design trends for 2025"

**Claude's Process:**
1. Research current iOS design trends
2. Identify primary keyword: "iOS app design trends 2025"
3. Find secondary keywords: "iOS design patterns", "mobile UI trends", "Apple design guidelines"
4. Analyze search intent: Informational (users want to learn about trends)
5. Create content brief with structure
6. Write 1500-2000 word article
7. Format in HTML with proper tags
8. Include meta tags and schema
9. Add internal links to islanderStudio portfolio/services
10. Provide SEO checklist

### Example 2: Product Description
**User:** "Create SEO product description for our meditation app"

**Claude's Process:**
1. Identify product features and benefits
2. Research keywords: "meditation app", "mindfulness app", specific features
3. Analyze competitor descriptions
4. Write compelling, benefit-focused copy (150-300 words)
5. Include primary and secondary keywords naturally
6. Add schema markup for Product
7. Create compelling meta description
8. Format in clean HTML
9. Suggest internal links to related content

### Example 3: Landing Page
**User:** "Build an SEO landing page for our iOS development services"

**Claude's Process:**
1. Identify target keyword: "iOS app development services"
2. Research commercial intent keywords
3. Analyze top-ranking competitor pages
4. Create persuasive hero section
5. Structure benefits, features, process, social proof
6. Write clear CTAs throughout
7. Optimize for conversion + SEO
8. Format in semantic HTML
9. Include LocalBusiness schema (if applicable)
10. Provide on-page SEO recommendations

---

## Content Brief Template

When creating a content brief, Claude uses this structure:

```markdown
# Content Brief: [Topic]

## Target Information
- **Primary Keyword:** [keyword] (Search Volume: est. X/month)
- **Secondary Keywords:** [keyword 1], [keyword 2], [keyword 3]
- **Search Intent:** [Informational/Transactional/Commercial/Navigational]
- **Target Audience:** [Description]
- **Content Goal:** [Awareness/Consideration/Conversion]

## Content Specifications
- **Recommended Length:** [word count] words
- **Tone:** Warm, curious, delightful (islanderStudio brand voice)
- **Format:** Blog post / Landing page / Product description / Guide

## Content Outline
1. **H1:** [Title with primary keyword]
   
2. **Introduction** (150-200 words)
   - Hook with question/statistic/story
   - Primary keyword introduction
   - Overview of what reader will learn

3. **H2:** [Main Section 1 - Secondary Keyword]
   - Key points to cover:
     - Point 1
     - Point 2
   - H3: [Subsection if needed]

4. **H2:** [Main Section 2 - Secondary Keyword]
   - Key points to cover:
     - Point 1
     - Point 2

5. **H2:** [Main Section 3]
   - Key points to cover:
     - Point 1
     - Point 2

6. **Conclusion**
   - Summary
   - Call to action

## SEO Elements
- **Meta Title:** [50-60 characters]
- **Meta Description:** [150-160 characters]
- **URL Slug:** /[keyword-rich-slug]
- **Featured Image:** [Suggestion]
- **Alt Text:** [Suggestion]

## Linking Strategy
- **Internal Links:**
  - [Relevant page 1]
  - [Relevant page 2]
  - [Relevant page 3]

- **External Links:**
  - [Authority source 1]
  - [Authority source 2]

## Competitor Analysis
- **Top Ranking Content:**
  1. [URL] - [Key strengths/gaps]
  2. [URL] - [Key strengths/gaps]
  3. [URL] - [Key strengths/gaps]

- **Our Unique Angle:** [How we'll differentiate]

## Additional Notes
- [Any specific requirements]
- [Brand integration opportunities]
- [Visual elements needed]
```

---

## Quality Checklist

Before delivering content, Claude verifies:

### SEO Checklist
- [ ] Primary keyword in H1
- [ ] Primary keyword in first paragraph
- [ ] Primary keyword in meta title
- [ ] Primary keyword in meta description
- [ ] Primary keyword in URL slug
- [ ] Secondary keywords distributed naturally
- [ ] Heading hierarchy (H1 → H2 → H3) is logical
- [ ] 2-5 internal links with descriptive anchors
- [ ] 1-3 external links to authority sites
- [ ] Image alt text is descriptive and keyword-rich
- [ ] Meta title is 50-60 characters
- [ ] Meta description is 150-160 characters
- [ ] URL slug is short and keyword-rich
- [ ] Schema markup included (when applicable)

### Content Quality Checklist
- [ ] Engaging introduction with hook
- [ ] Clear value proposition
- [ ] Logical flow and structure
- [ ] Short paragraphs (2-4 sentences)
- [ ] Varied sentence length
- [ ] Bullet points/lists for scannability
- [ ] Clear call-to-action
- [ ] No jargon or complex language
- [ ] Readability grade level: 8th-9th
- [ ] Spell-checked and grammar-checked

### Brand Alignment Checklist
- [ ] Tone is warm and conversational
- [ ] Content shows curiosity
- [ ] Includes delightful moments
- [ ] Words are deliberate and edited
- [ ] No unnecessary fluff
- [ ] Respects reader's time
- [ ] Feels human, not corporate
- [ ] Aligns with "Tropical Modernism" values

### HTML Quality Checklist
- [ ] Semantic HTML5 tags used
- [ ] Proper heading hierarchy
- [ ] Clean, well-formatted code
- [ ] No inline styles (unless necessary)
- [ ] Accessible markup
- [ ] Mobile-responsive considerations
- [ ] Images have width/height attributes
- [ ] Links have appropriate rel attributes

---

## Advanced Features

### Schema Markup Integration

Claude can add appropriate schema markup for:

**Article Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "author": {
    "@type": "Organization",
    "name": "islanderStudio"
  },
  "datePublished": "2025-01-15",
  "dateModified": "2025-01-15",
  "image": "https://example.com/image.jpg",
  "publisher": {
    "@type": "Organization",
    "name": "islanderStudio",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  }
}
```

**Product Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "description": "Product description",
  "brand": {
    "@type": "Brand",
    "name": "islanderStudio"
  },
  "offers": {
    "@type": "Offer",
    "price": "99.00",
    "priceCurrency": "USD"
  }
}
```

**FAQ Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text"
      }
    }
  ]
}
```

### Keyword Research Methodology

When Claude doesn't have access to real-time keyword data, it:

1. **Analyzes Topic Clusters**
   - Core topic keywords
   - Related subtopics
   - Question-based keywords
   - Long-tail variations

2. **Estimates Search Intent**
   - Informational keywords (how to, what is, guide)
   - Commercial keywords (best, top, review, vs)
   - Transactional keywords (buy, price, discount)
   - Navigational keywords (brand + product)

3. **Suggests Keyword Variations**
   - Plural/singular forms
   - Synonyms and related terms
   - Industry-specific terminology
   - Location-based keywords (when relevant)

### Content Gap Analysis

Claude identifies opportunities by:

1. Analyzing what competitors cover
2. Finding topics they miss
3. Identifying unique islanderStudio angles
4. Suggesting complementary content pieces
5. Recommending content clusters

---

## Integration with islanderStudio Brand

### Color Palette Usage in Content

While HTML content doesn't directly use brand colors, Claude considers:

- **Coconut Shell (#A78A6A)**: Warmth, groundedness in tone
- **Sea Salt (#F7F0E6)**: Clean, spacious writing style
- **Midnight Sky (#33333)**: Clear, readable typography
- **Golden Hour (#AFCAE8)**: Optimistic, uplifting moments
- **Sunset Glow (#F7A173)**: Energy, calls-to-action

### Typography in HTML

Recommended HTML structure for CMS:

```html
<style>
/* Typography hierarchy aligned with brand */
h1 {
    font-family: 'Syne', sans-serif;
    font-size: 96px;
    line-height: 120%;
}

h2 {
    font-family: 'Syne', sans-serif;
    font-size: 72px;
    line-height: 120%;
}

h3 {
    font-family: 'Syne', sans-serif;
    font-size: 36px;
    line-height: 120%;
}

p {
    font-family: 'DM Sans', sans-serif;
    font-size: 20px;
    line-height: 160%;
}
</style>
```

### Brand Voice Examples in Content

**Generic Tech Writing:**
> "Our iOS app development services utilize cutting-edge technologies and industry best practices to deliver high-performance mobile applications."

**islanderStudio Voice:**
> "We craft iOS apps that feel effortless to use. Every interaction is thoughtfully designed, every detail carefully considered. Because your users deserve more than just another app—they deserve an experience worth savoring."

---

## Limitations & Transparency

Claude will be transparent about:

1. **No Real-Time Data**: Cannot access current search volumes, ranking data, or live SERP analysis
2. **Estimated Metrics**: Keyword difficulty and search volume are educated estimates
3. **Best Practices**: Recommendations based on established SEO principles, not live testing
4. **Brand Alignment**: Content follows guidelines but may need human review for perfect brand fit

When uncertain, Claude will:
- State assumptions clearly
- Provide ranges rather than exact numbers
- Offer multiple options
- Recommend validation with SEO tools
- Suggest human review points

---

## Output Delivery Format

When delivering SEO content, Claude provides:

### 1. Content Brief (if requested)
Markdown format with research, structure, and recommendations

### 2. HTML Content
Clean, semantic HTML ready for CMS import

### 3. Meta Information
```
Title Tag: [50-60 char optimized title]
Meta Description: [150-160 char compelling description]
URL Slug: /[keyword-rich-slug]
Focus Keyword: [primary keyword]
```

### 4. SEO Checklist
Completion status of all optimization requirements

### 5. Additional Recommendations
- Internal linking opportunities
- Related content suggestions
- Future content ideas
- Optimization notes

---

## Example Request Patterns

### Effective Requests:

✅ "Create an SEO blog post about [topic] targeting [audience]"
✅ "Write a product description for [product] optimizing for [keyword]"
✅ "Build a landing page for [service] focusing on conversions"
✅ "Research and outline content about [topic] for [goal]"
✅ "Optimize this existing content: [paste content]"

### Information Claude Needs:

1. **Topic/Subject**: What's the content about?
2. **Goal**: Awareness, consideration, conversion?
3. **Target Audience**: Who's reading this?
4. **Keyword Focus**: Primary keyword (if known)
5. **Content Type**: Blog, landing page, product description, etc.
6. **Special Requirements**: Length, specific sections, CTAs, etc.

---

## Continuous Improvement

This skill improves through:

1. **Feedback Integration**: Learning from your content preferences
2. **Brand Alignment Refinement**: Better understanding islanderStudio voice
3. **SEO Best Practices**: Staying current with guidelines
4. **Performance Insights**: Adjusting based on what works

---

## Quick Reference

### Content Types & Optimal Lengths
- Blog Post: 1,500-2,500 words
- Pillar Content: 3,000-5,000 words
- Product Description: 150-300 words
- Category Description: 100-200 words
- Landing Page: 800-1,500 words
- Meta Description: 150-160 characters

### Keyword Density Guidelines
- Primary keyword: 1-2%
- Secondary keywords: 0.5-1% each
- Natural variation: Use synonyms and related terms

### Internal Linking
- 2-5 internal links per 1,000 words
- Use descriptive anchor text
- Link to relevant, related content
- Prioritize pillar pages

### Reading Level
- Target: 8th-9th grade (Flesch-Kincaid)
- Average sentence: 15-20 words
- Paragraph: 2-4 sentences max
- Use simple, clear language

---

## Getting Started

To use this skill effectively:

1. **Provide clear topic and goals**: "Write SEO content about [X] for [Y audience]"
2. **Specify content type**: Blog post, product page, landing page, etc.
3. **Share any keyword research**: If you have target keywords, include them
4. **Indicate brand requirements**: Should align with islanderStudio voice
5. **Request format**: Confirm you want HTML output

Claude will then:
1. Research and analyze the topic
2. Create a content brief (if multi-step)
3. Write optimized content
4. Format in clean HTML
5. Provide SEO checklist
6. Offer recommendations

---

## Final Notes

This skill combines:
- **SEO Best Practices**: Technical optimization for search engines
- **Brand Voice**: islanderStudio's warm, curious, delightful tone
- **Quality Content**: Valuable, engaging information for readers
- **Clean HTML**: CMS-ready, semantic markup
- **Strategic Thinking**: Content that serves business goals

The result is content that ranks well, converts visitors, and feels authentically islanderStudio.
