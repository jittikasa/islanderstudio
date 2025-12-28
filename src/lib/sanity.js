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

// Query helper for blog posts
export async function getBlogPosts() {
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
