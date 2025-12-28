# Sanity Schema for Islander Studio Blog

This directory contains the Sanity schema files needed to set up your blog content structure.

## Quick Setup Guide

### 1. Create a Sanity Project

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Create a new Sanity Studio project
sanity init

# Follow the prompts:
# - Create new project or use existing
# - Project name: "Islander Studio Blog"
# - Dataset: "production"
# - Template: "Clean project with no predefined schema"
```

### 2. Add the Schemas

Copy the schema files from this directory to your Sanity Studio project:

```bash
# In your Sanity Studio project directory
# Copy schemas to the schemas folder
cp /path/to/sanity-schema/*.js schemas/
```

Then update your `schemas/index.js` (or `schemaTypes/index.js` in newer versions):

```javascript
import post from './post'
import author from './author'
import category from './category'

export const schemaTypes = [post, author, category]
```

### 3. Deploy Sanity Studio

```bash
# In your Sanity Studio project directory
sanity deploy
```

This will give you a URL like: `https://your-project.sanity.studio`

### 4. Configure Environment Variables

Create a `.env` file in your Islander Studio web project root:

```env
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

Get your project ID from:
- Sanity Studio dashboard: https://sanity.io/manage
- Or from `sanity.json` in your Sanity Studio project

### 5. Create Your First Blog Post

1. Go to your deployed Sanity Studio URL
2. Create an Author first (you!)
3. Create some Categories (e.g., "Updates", "Tutorials", "News")
4. Create a Blog Post:
   - Add title (slug will auto-generate)
   - Select author
   - Upload main image
   - Add categories
   - Set published date
   - Write excerpt
   - Write body content
5. Click "Publish"

### 6. Test in Your Website

Start your development server:

```bash
npm run dev
```

Visit `http://localhost:5173/blog` to see your posts!

## Schema Overview

### Post (`post.js`)
Main blog post content structure:
- Title
- Slug (URL-friendly version of title)
- Author (reference to Author)
- Main Image (with alt text)
- Categories (array of Category references)
- Published Date
- Excerpt (short description)
- Body (rich text with images)

### Author (`author.js`)
Author information:
- Name
- Slug
- Profile Image
- Bio

### Category (`category.js`)
Blog post categories:
- Title
- Slug
- Description

## Free Tier Limits

Sanity's free tier includes:
- ✅ 50,000 documents (plenty for a blog!)
- ✅ 1M API requests/month
- ✅ 500GB bandwidth/month
- ✅ 20 users
- ✅ Image CDN with transforms

Perfect for Islander Studio's blog needs!

## Need Help?

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Schema Reference](https://www.sanity.io/docs/schema-types)
- [Sanity Studio Guide](https://www.sanity.io/docs/sanity-studio)
