/**
 * SEO Helper Functions for Sanity Studio
 */

/**
 * Calculate reading time based on word count
 * Average reading speed: 200-250 words per minute
 */
export function calculateReadingTime(text: any[]): number {
  if (!text || !Array.isArray(text)) return 0

  const plainText = text
    .filter((block) => block._type === 'block')
    .map((block) => {
      if (!block.children) return ''
      return block.children.map((child: any) => child.text || '').join('')
    })
    .join(' ')

  const wordCount = plainText.trim().split(/\s+/).length
  const wordsPerMinute = 225
  return Math.ceil(wordCount / wordsPerMinute)
}

/**
 * Generate SEO checklist for content editors
 */
export function getSEOChecklist(post: any) {
  const checks = {
    hasTitle: !!post.title,
    hasTitleOptimalLength: post.title && post.title.length >= 30 && post.title.length <= 60,
    hasExcerpt: !!post.excerpt,
    hasMetaDescription: !!post.seo?.metaDescription,
    hasMetaDescriptionOptimalLength:
      post.seo?.metaDescription &&
      post.seo.metaDescription.length >= 120 &&
      post.seo.metaDescription.length <= 160,
    hasFocusKeyword: !!post.seo?.focusKeyword,
    hasMainImage: !!post.mainImage,
    hasMainImageAlt: !!post.mainImage?.alt,
    hasOGImage: !!post.seo?.ogImage,
    hasCategories: post.categories && post.categories.length > 0,
    hasAuthor: !!post.author,
    hasBody: post.body && post.body.length > 0,
    hasPublishDate: !!post.publishedAt,
  }

  const passedChecks = Object.values(checks).filter(Boolean).length
  const totalChecks = Object.keys(checks).length
  const score = Math.round((passedChecks / totalChecks) * 100)

  return {
    checks,
    score,
    passedChecks,
    totalChecks,
  }
}

/**
 * Get SEO recommendations based on content
 */
export function getSEORecommendations(post: any): string[] {
  const recommendations: string[] = []
  const checklist = getSEOChecklist(post)

  if (!checklist.checks.hasTitle) {
    recommendations.push('Add a title to your post')
  } else if (!checklist.checks.hasTitleOptimalLength) {
    recommendations.push('Title should be 30-60 characters for optimal SEO')
  }

  if (!checklist.checks.hasMetaDescription) {
    recommendations.push('Add a custom meta description in SEO settings')
  } else if (!checklist.checks.hasMetaDescriptionOptimalLength) {
    recommendations.push('Meta description should be 120-160 characters')
  }

  if (!checklist.checks.hasFocusKeyword) {
    recommendations.push('Add a focus keyword to target for SEO')
  }

  if (!checklist.checks.hasMainImage) {
    recommendations.push('Add a featured image')
  } else if (!checklist.checks.hasMainImageAlt) {
    recommendations.push('Add alt text to your featured image for accessibility and SEO')
  }

  if (!checklist.checks.hasOGImage) {
    recommendations.push('Consider adding a custom social share image (1200x630px)')
  }

  if (!checklist.checks.hasCategories) {
    recommendations.push('Add at least one category to help with content organization')
  }

  if (!checklist.checks.hasAuthor) {
    recommendations.push('Assign an author to this post')
  }

  return recommendations
}

/**
 * Generate slug preview
 */
export function generateSlugPreview(slug: string, baseUrl: string = 'https://islanderstudio.com'): string {
  return `${baseUrl}/blog/${slug}`
}

/**
 * Validate focus keyword presence in content
 */
export function checkKeywordInContent(focusKeyword: string, title: string, body: any[]): {
  inTitle: boolean
  inBody: boolean
  density: number
} {
  if (!focusKeyword) {
    return {inTitle: false, inBody: false, density: 0}
  }

  const keyword = focusKeyword.toLowerCase()
  const inTitle = title ? title.toLowerCase().includes(keyword) : false

  let bodyText = ''
  if (body && Array.isArray(body)) {
    bodyText = body
      .filter((block) => block._type === 'block')
      .map((block) => {
        if (!block.children) return ''
        return block.children.map((child: any) => child.text || '').join('')
      })
      .join(' ')
      .toLowerCase()
  }

  const inBody = bodyText.includes(keyword)
  const keywordCount = (bodyText.match(new RegExp(keyword, 'g')) || []).length
  const totalWords = bodyText.trim().split(/\s+/).length
  const density = totalWords > 0 ? (keywordCount / totalWords) * 100 : 0

  return {
    inTitle,
    inBody,
    density: Math.round(density * 100) / 100,
  }
}
