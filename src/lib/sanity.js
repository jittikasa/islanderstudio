import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client configuration
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // Use CDN for faster response times
  apiVersion: '2024-01-01', // Use current date for latest features
})

// Helper function to generate image URLs from Sanity image references
const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// Check if Sanity is configured
function checkSanityConfig() {
  if (!import.meta.env.VITE_SANITY_PROJECT_ID) {
    throw new Error('VITE_SANITY_PROJECT_ID is not configured. Please set up your Sanity project and add environment variables.')
  }
}

// Query helper for blog posts
export async function getBlogPosts() {
  checkSanityConfig()

  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "authorName": author->name,
    "authorImage": author->image,
    "categories": categories[]->title,
    mainImage,
    body
  }`

  return await client.fetch(query)
}

// Query helper for a single blog post by slug
export async function getBlogPost(slug) {
  checkSanityConfig()

  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "authorName": author->name,
    "authorBio": author->bio,
    "authorImage": author->image,
    "categories": categories[]->title,
    mainImage,
    body
  }`

  return await client.fetch(query, { slug })
}

// Query helper for recent posts (for homepage or sidebar)
export async function getRecentPosts(limit = 3) {
  checkSanityConfig()

  const query = `*[_type == "post"] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage
  }`

  return await client.fetch(query)
}

// Query helper for posts related to a specific app
export async function getPostsByApp(appName, limit = 2) {
  checkSanityConfig()

  const query = `*[_type == "post" && $appName in relatedApps] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "categories": categories[]->title,
    mainImage
  }`

  return await client.fetch(query, { appName })
}
