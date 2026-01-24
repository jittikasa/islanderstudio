import { useEffect } from 'react'

export default function SEO({
  title = 'Jittika Sakulchit - Designer & Maker',
  description = 'Designer and maker creating thoughtful digital experiences. Building iOS apps and crafting beautiful interfaces with soul.',
  image = 'https://jittika.com/og-image.png',
  url = 'https://jittika.com',
  type = 'website',
  keywords = 'designer, maker, iOS apps, UI design, UX design, Shellist, PolaMoment, creative developer, indie apps',
  robots,
}) {
  useEffect(() => {
    // Update title
    document.title = title

    // Update or create meta tags
    const updateMetaTag = (property, content, isName = false) => {
      const attribute = isName ? 'name' : 'property'
      let element = document.querySelector(`meta[${attribute}="${property}"]`)

      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, property)
        document.head.appendChild(element)
      }

      element.setAttribute('content', content)
    }

    // Canonical link tag
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', url)

    // RSS Feed discovery
    let rssLink = document.querySelector('link[type="application/rss+xml"]')
    if (!rssLink) {
      rssLink = document.createElement('link')
      rssLink.setAttribute('rel', 'alternate')
      rssLink.setAttribute('type', 'application/rss+xml')
      rssLink.setAttribute('title', 'Jittika Blog RSS Feed')
      rssLink.setAttribute('href', 'https://api.islanderstudio.app/feed.xml')
      document.head.appendChild(rssLink)
    }

    // JSON Feed discovery
    let jsonFeedLink = document.querySelector('link[type="application/feed+json"]')
    if (!jsonFeedLink) {
      jsonFeedLink = document.createElement('link')
      jsonFeedLink.setAttribute('rel', 'alternate')
      jsonFeedLink.setAttribute('type', 'application/feed+json')
      jsonFeedLink.setAttribute('title', 'Jittika Blog JSON Feed')
      jsonFeedLink.setAttribute('href', 'https://api.islanderstudio.app/feed.json')
      document.head.appendChild(jsonFeedLink)
    }

    // Standard meta tags
    updateMetaTag('description', description, true)
    updateMetaTag('keywords', keywords, true)

    // Open Graph
    updateMetaTag('og:title', title)
    updateMetaTag('og:description', description)
    updateMetaTag('og:image', image)
    updateMetaTag('og:url', url)
    updateMetaTag('og:type', type)
    updateMetaTag('og:site_name', 'Jittika Sakulchit')

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image', true)
    updateMetaTag('twitter:title', title, true)
    updateMetaTag('twitter:description', description, true)
    updateMetaTag('twitter:image', image, true)

    // Additional SEO tags
    updateMetaTag('author', 'Jittika Sakulchit', true)
    updateMetaTag('robots', robots || 'index, follow', true)

  }, [title, description, image, url, type, keywords, robots])

  return null
}

// JSON-LD Structured Data Component
// Supports multiple schemas by using unique IDs based on @type
export function StructuredData({ data }) {
  const schemaId = `structured-data-${data['@type'] || 'unknown'}`.toLowerCase()

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(data)
    script.id = schemaId

    // Remove existing structured data with same ID if present
    const existing = document.getElementById(schemaId)
    if (existing) {
      existing.remove()
    }

    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById(schemaId)
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [data, schemaId])

  return null
}

// Person Schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jittika Sakulchit',
  url: 'https://jittika.com',
  image: 'https://jittika.com/profile.jpg',
  description: 'Designer and maker creating thoughtful digital experiences and iOS apps.',
  email: 'hello@jittika.com',
  jobTitle: 'Designer & Maker',
  sameAs: [],
}

// Software Application Schema for Shellist
export const shellistAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Shellist',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'iOS 17.0 or later',
  offers: {
    '@type': 'Offer',
    price: '2.99',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    ratingCount: '1',
  },
  description: 'Build habits like pearls. Transform your life one habit at a time with beautiful pearl visualizations, powerful analytics, and motivational tools.',
  image: 'https://jittika.com/shellist-icon.png',
  screenshot: 'https://jittika.com/shellist-screenshot.png',
  downloadUrl: 'https://apps.apple.com/us/app/shellist/id6755242144',
  author: {
    '@type': 'Person',
    name: 'Jittika Sakulchit',
  },
  creator: {
    '@type': 'Person',
    name: 'Jittika Sakulchit',
  },
}

// Software Application Schema for PolaMoment
export const polamomentAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PolaMoment',
  applicationCategory: 'PhotographyApplication',
  operatingSystem: 'iOS 14.0 or later',
  description: 'Transform your iPhone into a vintage Polaroid camera. Create instant memories with authentic retro filters, classic frames, and that iconic aesthetic.',
  image: 'https://jittika.com/pola-assets/Icon-1024.png',
  screenshot: 'https://jittika.com/pola-assets/Image-1.jpeg',
  author: {
    '@type': 'Person',
    name: 'Jittika Sakulchit',
  },
  creator: {
    '@type': 'Person',
    name: 'Jittika Sakulchit',
  },
}

// WebSite Schema
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Jittika Sakulchit',
  url: 'https://jittika.com',
  description: 'Designer and maker creating thoughtful digital experiences and iOS apps.',
  publisher: {
    '@type': 'Person',
    name: 'Jittika Sakulchit',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://jittika.com/?s={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

/**
 * Generate FAQ Schema from array of Q&A pairs
 * @param {Array<{question: string, answer: string}>} faqs
 * @returns {Object} FAQPage schema
 */
export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate HowTo Schema for instructional content
 * @param {Object} params
 * @returns {Object} HowTo schema
 */
export function generateHowToSchema({ name, description, steps, totalTime }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    totalTime,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  }
}
