# Islander Studio Admin User Guide

This guide covers how to use the Islander Studio admin dashboard to manage your blog content.

## Getting Started

### Accessing the Admin Panel

1. Navigate to `https://islanderstudio.app/admin`
2. You'll be redirected to the login page if not authenticated

### Login Options

**Password Login:**
1. Enter your admin password
2. Check "Remember me" to stay logged in for 30 days
3. Click "Sign In"

**Google OAuth Login:**
1. Click "Sign in with Google"
2. Select your Google account
3. You'll be redirected back to the dashboard

### Dashboard Overview

After logging in, you'll see the admin dashboard with:
- **Stats** - Quick overview of posts, drafts, authors, categories, and tags
- **Recent Posts** - Your most recently updated posts
- **Navigation Tabs** - Posts, Media, Authors, Categories, Tags

---

## Managing Posts

### Viewing Posts

The Posts tab shows all your blog posts with:
- Title and excerpt
- Publication status (Draft, Published, Scheduled)
- Category and author
- Publication date
- Quick action buttons

**Filtering Posts:**
- Click "All" to see all posts
- Click "Drafts" to see unpublished drafts
- Click "Published" to see live posts
- Use the search box to find posts by title

### Creating a New Post

1. Click the "+ New Post" button
2. Fill in the post details:

**Basic Information:**
- **Title** - The post headline (required)
- **Slug** - URL-friendly version of title (auto-generated, can be customized)
- **Excerpt** - Short summary shown in listings (required)
- **Author** - Select from available authors
- **Categories** - Select one or more categories

**Content:**
- Use the rich text editor to write your post
- The toolbar includes:
  - **Bold** (Ctrl/Cmd + B)
  - **Italic** (Ctrl/Cmd + I)
  - **Headings** (H1, H2, H3)
  - **Bullet list**
  - **Numbered list**
  - **Block quote**
  - **Link** (Ctrl/Cmd + K)
  - **Image** (insert from URL)
  - **Code block**

**SEO Settings:**
- **Meta Title** - Custom title for search engines (50-60 characters recommended)
- **Meta Description** - Description shown in search results (150-160 characters recommended)
- **Keywords** - Comma-separated keywords for SEO

**Publication Settings:**
- **Status** - Draft (not visible), Published (live), Scheduled (publish at specific time)
- **Featured Image** - Main image for the post
- **Related Apps** - Link to Shellist or PolaMoment if relevant

3. Click "Save Draft" to save without publishing
4. Click "Publish" to make the post live

### Editing a Post

1. Click on any post in the list
2. Make your changes
3. Click "Save Changes" or "Update"

### Deleting a Post

1. Click the delete icon (trash) next to a post
2. Confirm the deletion
3. The post will be permanently removed

### Scheduling Posts

1. Set the status to "Scheduled"
2. Select the publication date and time
3. Save the post
4. It will automatically publish at the scheduled time

---

## Media Library

### Viewing Media

The Media tab shows all uploaded images in a grid view with:
- Thumbnail preview
- Filename
- Upload date
- File size

### Uploading Images

1. Click "+ Upload Image"
2. Select an image file (JPG, PNG, GIF, or WebP)
3. Wait for the upload to complete
4. The image will appear in the grid

**Limits:**
- Maximum file size: 5MB
- Supported formats: JPEG, PNG, GIF, WebP

### Using Images in Posts

1. In the Media Library, click on an image
2. Copy the image URL
3. In the post editor, click the image button
4. Paste the URL

Or use the "Insert in Editor" button when viewing image details.

### Deleting Images

1. Select the image you want to delete
2. Click "Delete"
3. Confirm the deletion
4. The image will be removed from storage

**Note:** Deleting an image will break any posts using that image.

---

## Managing Authors

### Viewing Authors

The Authors tab shows all author profiles with:
- Name and avatar
- Email address
- Bio excerpt
- Number of posts

### Creating an Author

1. Click "+ New Author"
2. Fill in the details:
   - **Name** - Display name (required)
   - **Email** - Contact email (required)
   - **Bio** - Author biography
   - **Avatar URL** - Link to profile image
   - **Social Links** - Twitter, LinkedIn, etc.
3. Click "Save Author"

### Editing an Author

1. Click on an author to view details
2. Make your changes
3. Click "Update Author"

### Deleting an Author

1. Click the delete button next to an author
2. Confirm deletion

**Note:** You cannot delete an author who has published posts. Reassign their posts first.

---

## Managing Categories

### Viewing Categories

The Categories tab shows all blog categories with:
- Title and slug
- Description
- Color badge
- Number of posts

### Creating a Category

1. Click "+ New Category"
2. Fill in the details:
   - **Title** - Category name (required)
   - **Slug** - URL-friendly version (auto-generated)
   - **Description** - Brief description of the category
   - **Color** - Color for the category badge (hex code)
3. Click "Save Category"

### Editing a Category

1. Click on a category to view details
2. Make your changes
3. Click "Update Category"

### Deleting a Category

1. Click the delete button next to a category
2. Confirm deletion

**Note:** Deleting a category will remove it from all posts using that category.

---

## Managing Tags

### Viewing Tags

The Tags tab shows all blog tags with:
- Title and slug
- Number of posts using the tag

### Creating a Tag

1. Click "+ New Tag"
2. Enter the tag name
3. The slug will be auto-generated
4. Click "Save Tag"

### Merging Tags

If you have duplicate or similar tags:
1. Select the tags you want to merge
2. Click "Merge Tags"
3. Select the target tag (the one to keep)
4. All posts will be updated to use the target tag

### Bulk Delete Unused Tags

1. Click "Clean Up Tags"
2. This will remove any tags not used by any posts

### Deleting a Tag

1. Click the delete button next to a tag
2. Confirm deletion

---

## Best Practices

### Writing Good Posts

1. **Use descriptive titles** - Include relevant keywords
2. **Write compelling excerpts** - This is what readers see first
3. **Structure content** - Use headings, lists, and short paragraphs
4. **Optimize images** - Use WebP format and compress images
5. **Add alt text** - Describe images for accessibility

### SEO Tips

1. **Meta title** - Keep it under 60 characters
2. **Meta description** - Aim for 150-160 characters
3. **Use keywords naturally** - Don't stuff keywords
4. **Internal linking** - Link to related posts
5. **Unique content** - Avoid duplicate content

### Content Organization

1. **Categories** - Use 3-5 main categories
2. **Tags** - Use specific, relevant tags (5-10 per post)
3. **Featured images** - Every post should have one
4. **Consistent naming** - Use clear, descriptive slugs

---

## Keyboard Shortcuts

### Post Editor

| Shortcut | Action |
|----------|--------|
| Ctrl/Cmd + B | Bold |
| Ctrl/Cmd + I | Italic |
| Ctrl/Cmd + K | Insert link |
| Ctrl/Cmd + S | Save |
| Ctrl/Cmd + Shift + 1 | Heading 1 |
| Ctrl/Cmd + Shift + 2 | Heading 2 |
| Ctrl/Cmd + Shift + 3 | Heading 3 |

### Navigation

| Shortcut | Action |
|----------|--------|
| Tab | Move to next element |
| Shift + Tab | Move to previous element |
| Enter | Activate button/link |
| Escape | Close modal |

---

## Troubleshooting

### Can't Log In

1. Check your password is correct
2. Try clearing browser cache
3. If using OAuth, ensure your email is authorized
4. Wait 15 minutes if you're rate limited

### Images Not Uploading

1. Check file is under 5MB
2. Ensure file is a valid image format
3. Try a different browser
4. Check your internet connection

### Changes Not Saving

1. Check for validation errors (highlighted fields)
2. Ensure all required fields are filled
3. Try refreshing the page
4. Check browser console for errors

### Post Not Appearing on Blog

1. Ensure status is "Published" (not Draft or Scheduled)
2. Check the publication date is in the past
3. Clear browser cache
4. Wait a few minutes for CDN propagation

---

## Security

### Password Security

- Use a strong password (12+ characters)
- Include uppercase, lowercase, numbers, and symbols
- Never share your admin password
- Change password periodically

### Session Management

- Sessions expire after 30 days
- Click "Logout" when done
- Clear sessions if you suspect unauthorized access

### OAuth Security

- Only authorized emails can access admin
- Review the list of authorized emails regularly
- Remove access for former team members

---

## Getting Help

If you encounter issues:

1. Check this documentation first
2. Review the [Deployment Guide](./DEPLOYMENT_GUIDE.md) for setup issues
3. Check the [API Documentation](./API_DOCUMENTATION.md) for technical details
4. Contact support at support@islanderstudio.app
