import { useEffect } from 'react'

export default function SEO({
  title = 'islander. — Crafting Beautiful iOS Apps',
  description = 'islander. creates beautifully crafted iOS apps that blend functionality with artistry. Discover Shellist, PolaMoment, and more.',
  image = 'https://islanderstudio.app/branding/Logo-primary.png',
  url = 'https://islanderstudio.app',
  type = 'website',
  keywords = 'iOS apps, mobile apps, app studio, Shellist, PolaMoment, habit tracker, polaroid camera, indie apps',
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

    // Standard meta tags
    updateMetaTag('description', description, true)
    updateMetaTag('keywords', keywords, true)

    // Open Graph
    updateMetaTag('og:title', title)
    updateMetaTag('og:description', description)
    updateMetaTag('og:image', image)
    updateMetaTag('og:url', url)
    updateMetaTag('og:type', type)
    updateMetaTag('og:site_name', 'islander. studio')

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image', true)
    updateMetaTag('twitter:title', title, true)
    updateMetaTag('twitter:description', description, true)
    updateMetaTag('twitter:image', image, true)

    // Additional SEO tags
    updateMetaTag('author', 'islander.', true)
    updateMetaTag('robots', 'index, follow', true)

  }, [title, description, image, url, type, keywords])

  return null
}

// JSON-LD Structured Data Component
export function StructuredData({ data }) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(data)
    script.id = 'structured-data'

    // Remove existing structured data if present
    const existing = document.getElementById('structured-data')
    if (existing) {
      existing.remove()
    }

    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById('structured-data')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [data])

  return null
}

// Organization Schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Islander Studio',
  url: 'https://islanderstudio.app',
  logo: 'https://islanderstudio.app/logo.png',
  description: 'Independent iOS app studio creating beautifully designed applications that respect privacy and delight users.',
  email: 'support@islanderstudio.app',
  foundingDate: '2024',
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
  image: 'https://islanderstudio.app/shellist-icon.png',
  screenshot: 'https://islanderstudio.app/shellist-screenshot.png',
  downloadUrl: 'https://apps.apple.com/us/app/shellist/id6755242144',
  author: {
    '@type': 'Organization',
    name: 'Islander Studio',
  },
  creator: {
    '@type': 'Organization',
    name: 'Islander Studio',
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
  image: 'https://islanderstudio.app/pola-assets/Icon-1024.png',
  screenshot: 'https://islanderstudio.app/pola-assets/Image-1.jpeg',
  author: {
    '@type': 'Organization',
    name: 'Islander Studio',
  },
  creator: {
    '@type': 'Organization',
    name: 'Islander Studio',
  },
}

// WebSite Schema
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Islander Studio',
  url: 'https://islanderstudio.app',
  description: 'Creating beautifully designed iOS applications that inspire and delight.',
  publisher: {
    '@type': 'Organization',
    name: 'Islander Studio',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://islanderstudio.app/?s={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}
