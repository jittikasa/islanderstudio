# SEO Content Skill - Quick Reference Guide

## How to Use This Skill

### Basic Request Format
```
"Create [content type] about [topic] for [audience] targeting [keyword]"
```

## Common Content Types

### 1. Blog Post
**Request:** "Write an SEO blog post about [topic]"
**Output:** 1,500-2,500 words, HTML formatted, with meta tags

### 2. Product Description
**Request:** "Create product description for [product name]"
**Output:** 150-300 words, schema markup, compelling copy

### 3. Landing Page
**Request:** "Build landing page for [service/product]"
**Output:** 800-1,500 words, conversion-focused, HTML + schema

### 4. Content Brief Only
**Request:** "Create content brief for [topic]"
**Output:** Research, outline, keywords, strategy (no full content)

### 5. Content Optimization
**Request:** "Optimize this content: [paste existing content]"
**Output:** Improved version with SEO recommendations

---

## What Claude Will Deliver

### Standard Delivery Package:
1. ✅ **HTML Content** - Clean, semantic, CMS-ready
2. ✅ **Meta Tags** - Title, description, keywords
3. ✅ **Schema Markup** - When applicable
4. ✅ **SEO Checklist** - Verification of optimization
5. ✅ **Recommendations** - Internal links, related content

### Optional Additions:
- 📋 Content brief with research
- 🔍 Competitor analysis
- 🎯 Keyword strategy
- 📊 Content cluster suggestions

---

## SEO Optimization Checklist

### ✅ On-Page SEO
- [ ] Primary keyword in H1, first paragraph, meta title
- [ ] Secondary keywords distributed naturally
- [ ] Meta title: 50-60 characters
- [ ] Meta description: 150-160 characters
- [ ] URL slug: keyword-rich, short
- [ ] Heading hierarchy: H1 → H2 → H3
- [ ] Image alt text: descriptive + keywords
- [ ] 2-5 internal links per 1,000 words
- [ ] 1-3 external authority links

### ✅ Content Quality
- [ ] Engaging introduction
- [ ] Short paragraphs (2-4 sentences)
- [ ] Bullet points for scannability
- [ ] Clear value proposition
- [ ] Strong call-to-action
- [ ] 8th-9th grade reading level
- [ ] No keyword stuffing (1-2% density)

### ✅ Brand Alignment
- [ ] Warm, conversational tone
- [ ] Curious and engaging
- [ ] Delightful moments
- [ ] Concise and deliberate
- [ ] islanderStudio voice

---

## Brand Voice Quick Guide

### islanderStudio Tone Characteristics

**Warm** 🌴
- Conversational but professional
- Like a thoughtful friend
- NOT: Corporate, cold, robotic

**Curious** 🔍
- Ask engaging questions
- Explore ideas with interest
- NOT: Bland, prescriptive, preachy

**Delightful** ✨
- Thoughtful word choices
- Small moments of charm
- NOT: Gimmicky, overly clever, forced

**Clear** 💎
- Say more with less
- Every word earns its place
- NOT: Wordy, repetitive, fluffy

### Voice Examples

❌ **Generic Tech Writing:**
"Our iOS app development services utilize cutting-edge technologies and industry best practices to deliver high-performance mobile applications that exceed client expectations."

✅ **islanderStudio Voice:**
"We craft iOS apps that feel effortless to use. Every interaction is thoughtfully designed, every detail carefully considered."

---

## HTML Output Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[SEO Title 50-60 chars]</title>
    <meta name="description" content="[Meta desc 150-160 chars]">
    <!-- Schema Markup -->
    <script type="application/ld+json">
    { /* Schema JSON */ }
    </script>
</head>
<body>
    <article>
        <header>
            <h1>[Primary Keyword H1]</h1>
        </header>
        
        <section>
            <p>[Introduction with hook + keyword]</p>
        </section>
        
        <section>
            <h2>[Secondary Keyword]</h2>
            <p>[Content]</p>
            <h3>[Subsection]</h3>
            <ul>
                <li>[Points]</li>
            </ul>
        </section>
        
        <section>
            <h2>Conclusion</h2>
            <p>[Summary + CTA]</p>
        </section>
    </article>
</body>
</html>
```

---

## Content Length Guidelines

| Content Type | Optimal Length |
|--------------|----------------|
| Blog Post | 1,500-2,500 words |
| Pillar Content | 3,000-5,000 words |
| Product Description | 150-300 words |
| Category Description | 100-200 words |
| Landing Page | 800-1,500 words |
| Meta Description | 150-160 characters |

---

## Keyword Strategy

### Primary Keyword Usage
- ✅ H1 (page title)
- ✅ First paragraph
- ✅ Meta title
- ✅ Meta description
- ✅ URL slug
- ✅ Image alt text
- 🎯 Density: 1-2%

### Secondary Keywords
- ✅ H2 headings
- ✅ Throughout content
- ✅ Natural variations
- 🎯 Density: 0.5-1% each

### LSI Keywords
- ✅ Semantic variations
- ✅ Related terms
- ✅ Synonyms
- 🎯 Shows topical authority

---

## Internal Linking Strategy

### When to Link
- Related blog posts
- Pillar content
- Product/service pages
- Case studies
- About/contact pages

### Anchor Text Best Practices
✅ DO: "iOS app design trends"
✅ DO: "our mobile development services"
❌ DON'T: "click here"
❌ DON'T: "read more"

### Linking Frequency
- 2-5 internal links per 1,000 words
- Natural placement within context
- Link to higher-authority pages
- Distribute link equity strategically

---

## Common SEO Content Requests

### Example 1: Blog Post
```
Request: "Write an SEO blog post about iOS app monetization strategies for indie developers"

Claude will:
1. Research topic and keywords
2. Analyze search intent
3. Create content structure
4. Write 1,500-2,000 words
5. Format in HTML
6. Add meta tags + schema
7. Include internal links
8. Provide SEO checklist
```

### Example 2: Product Page
```
Request: "Create product page content for our meditation app 'Calm Waves'"

Claude will:
1. Identify product keywords
2. Write benefit-focused copy
3. Create compelling headlines
4. Add product schema markup
5. Format in HTML
6. Optimize meta tags
7. Suggest related content links
```

### Example 3: Content Brief
```
Request: "Create content brief for article about SwiftUI vs UIKit"

Claude will:
1. Research keywords
2. Analyze top-ranking content
3. Identify content gaps
4. Create detailed outline
5. Suggest word count
6. Provide keyword strategy
7. Recommend internal links
8. Include competitor insights
```

---

## Schema Markup Types

### Article
```json
{
  "@type": "Article",
  "headline": "...",
  "author": "islanderStudio",
  "datePublished": "2025-01-15"
}
```

### Product
```json
{
  "@type": "Product",
  "name": "...",
  "description": "...",
  "offers": { "price": "99.00" }
}
```

### FAQ
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    { "question": "...", "answer": "..." }
  ]
}
```

### How-To
```json
{
  "@type": "HowTo",
  "name": "...",
  "step": [
    { "text": "..." }
  ]
}
```

---

## Readability Guidelines

### Target Metrics
- **Reading Level:** 8th-9th grade (Flesch-Kincaid)
- **Avg Sentence Length:** 15-20 words
- **Paragraph Length:** 2-4 sentences
- **Passive Voice:** < 10%

### Writing Tips
✅ Use short, varied sentences
✅ Break up long paragraphs
✅ Add bullet points and lists
✅ Include subheadings every 300 words
✅ Use simple, clear language
✅ Avoid jargon (or explain it)

---

## Color Palette Reference

While HTML content doesn't use colors directly, the brand palette influences tone:

**Coconut Shell** #A78A6A
→ Warm, grounded, earthy tone

**Sea Salt** #F7F0E6
→ Clean, spacious, breathing room

**Midnight Sky** #33333
→ Clear, readable, authoritative

**Golden Hour** #AFCAE8
→ Optimistic, uplifting, joyful

**Sunset Glow** #F7A173
→ Energetic, action-oriented, vibrant

---

## Troubleshooting

### "Content feels too corporate"
→ Add more conversational language
→ Ask engaging questions
→ Include human touches
→ Shorten sentences

### "SEO feels forced"
→ Reduce keyword density
→ Use more natural variations
→ Focus on readability first
→ Let keywords fit naturally

### "Missing brand voice"
→ Add warmth and personality
→ Include curious questions
→ Find delightful moments
→ Edit for conciseness

### "Content too long/short"
→ Specify word count in request
→ Focus on value, not length
→ Match competitor benchmarks
→ Consider content type norms

---

## Best Practices Reminder

### DO ✅
- Research before writing
- Write for humans first, SEO second
- Use natural keyword placement
- Create valuable, unique content
- Edit ruthlessly for clarity
- Include clear CTAs
- Link to relevant content
- Format for scannability

### DON'T ❌
- Keyword stuff
- Copy competitor content
- Ignore brand voice
- Write generic fluff
- Skip meta optimization
- Forget internal links
- Use vague anchor text
- Neglect mobile users

---

## Quick Start Template

### Your Request Format:
```
"Create [content type] about [topic]

Details:
- Target audience: [who]
- Primary keyword: [keyword] (optional - Claude can suggest)
- Goal: [awareness/consideration/conversion]
- Length: [word count] (optional)
- Special requirements: [any specific needs]"
```

### Claude's Response:
1. Content brief (if complex)
2. HTML-formatted content
3. Meta tags
4. Schema markup
5. SEO checklist
6. Recommendations

---

## Remember

**This skill combines:**
- 🔍 SEO best practices
- 🎨 islanderStudio brand voice
- ✍️ Quality content creation
- 💻 Clean HTML output
- 📊 Strategic thinking

**The goal:**
Content that ranks well, converts visitors, and feels authentically islanderStudio.

---

**Questions? Just ask!**

Claude is ready to research, write, and optimize SEO content that brings your brand to life.
