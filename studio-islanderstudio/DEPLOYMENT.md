# Sanity Studio Deployment Guide

This guide provides multiple ways to deploy your Sanity Studio with the new SEO workflow features.

## 🚀 Quick Start (Recommended)

### Method 1: GitHub Actions (Automated) ✨

This is the easiest method - deploy automatically when you push changes!

#### Setup Steps:

1. **Add Sanity Auth Token to GitHub Secrets**:
   - Go to your GitHub repository: https://github.com/jittikasa/islanderstudio
   - Click **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `SANITY_AUTH_TOKEN`
   - Value: `sklxlRMRhE2hFeEWJiVxEELSTwUkqwtJqKuYRYVjkXEguFWCd0la1u0LwG9Q3vvpxlogmptXZFBq5frZrLlz3HzKKHBq2Jn4oxg8C0TdnDjZOp5zMJ23Wnav853XTgx2A4WTFVPgtltbB3zDm9sgsl6GveFAm90H8LP655HujCbeEGXyyB11`
   - Click **Add secret**

2. **Trigger Deployment**:
   - The workflow file is already created at `.github/workflows/deploy-sanity-studio.yml`
   - Once the secret is added, you can trigger deployment by:
     - **Option A**: Push changes to the `main` branch that affect `studio-islanderstudio/`
     - **Option B**: Go to **Actions** tab → **Deploy Sanity Studio** → **Run workflow**

3. **Access Your Studio**:
   - After successful deployment, visit: **https://islanderstudio.sanity.studio**

---

### Method 2: Deploy from Local Machine

If you prefer to deploy from your computer:

```bash
# Clone the repository (if not already)
git clone https://github.com/jittikasa/islanderstudio.git
cd islanderstudio/studio-islanderstudio

# Install dependencies
npm install

# Login to Sanity (opens browser)
npx sanity login

# Deploy
npx sanity deploy
# When prompted, enter: islanderstudio
```

---

### Method 3: Deploy to Vercel (Alternative Hosting)

Deploy the studio as a regular web app:

1. **Connect to Vercel**:
   - Go to https://vercel.com
   - Click **Add New** → **Project**
   - Import `jittikasa/islanderstudio`

2. **Configure Build Settings**:
   - **Root Directory**: `studio-islanderstudio`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Deploy**:
   - Click **Deploy**
   - Your studio will be available at: `https://your-project.vercel.app`

---

### Method 4: Deploy to Netlify (Alternative Hosting)

1. **Connect to Netlify**:
   - Go to https://netlify.com
   - Click **Add new site** → **Import an existing project**
   - Connect to GitHub and select `jittikasa/islanderstudio`

2. **Configure Build Settings**:
   - **Base directory**: `studio-islanderstudio`
   - **Build command**: `npm run build`
   - **Publish directory**: `studio-islanderstudio/dist`

3. **Deploy**:
   - Click **Deploy site**
   - Your studio will be available at: `https://your-project.netlify.app`

---

## 📋 Post-Deployment Setup

After deploying your studio, complete these steps:

### 1. Configure CORS Origins

Allow your website to access the Sanity API:

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select project: **islanderstudio** (ID: `8hngvmaz`)
3. Navigate to **API** → **CORS Origins**
4. Click **Add CORS origin**
5. Add these origins:
   - `https://islanderstudio.app` (your production site)
   - `http://localhost:5173` (for local development)
   - `https://islanderstudio.sanity.studio` (your studio URL)
6. Click **Save**

### 2. Set API Visibility

Ensure your content is publicly accessible:

1. In [Sanity Manage](https://www.sanity.io/manage)
2. Select your project
3. Go to **API** → **Datasets**
4. Select **production** dataset
5. Set visibility to **Public**

### 3. Test Your Studio

1. Visit your deployed studio URL
2. Login with your Sanity credentials
3. Create a test blog post
4. Check the **SEO Preview** tab to see:
   - SEO Score
   - Google Search Preview
   - SEO Checklist
   - Recommendations

---

## 🎯 Using the SEO Workflow

Once deployed, you can start creating SEO-optimized articles:

### Create Your First Article:

1. Click **Blog Posts** → **Create** → **Blog Post**
2. Fill in the required fields:
   - Title
   - Slug
   - Published At
   - Excerpt
   - Body
3. Click the **SEO Preview** tab to see your optimization score
4. Expand **SEO Settings** to add:
   - Meta Title
   - Meta Description
   - Focus Keyword
   - Additional Keywords
   - Social Share Image
5. Aim for **80%+ SEO Score**
6. Set **Content Status** to **Published**
7. Click **Publish**

### SEO Preview Features:

- ✅ **Real-time SEO Score**: See your optimization percentage
- 🔍 **Google Preview**: See how your article appears in search
- 📊 **Character Counts**: Track title/description length
- ✓ **SEO Checklist**: Visual completion tracker
- 💡 **Recommendations**: Get actionable improvement tips

For detailed workflow instructions, see: `/docs/SEO_WORKFLOW_GUIDE.md`

---

## 🔧 Troubleshooting

### Studio Won't Deploy
- Verify your auth token is correct
- Check GitHub Actions logs for errors
- Ensure you have write access to the Sanity project

### CORS Errors
- Add your domain to CORS origins in Sanity dashboard
- Include both `http://` and `https://` versions

### Content Not Appearing
- Verify dataset visibility is set to Public
- Check that content is published (not draft)
- Ensure GROQ queries include the correct fields

### Build Failures
- Run `npm install` to ensure dependencies are up to date
- Check for TypeScript errors: `npm run build`
- Review the build logs for specific errors

---

## 📚 Additional Resources

- [Sanity Studio Documentation](https://www.sanity.io/docs/sanity-studio)
- [Deployment Documentation](https://www.sanity.io/docs/deployment)
- [SEO Workflow Guide](../docs/SEO_WORKFLOW_GUIDE.md)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## 🆘 Need Help?

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Review the build/deployment logs
3. Check [Sanity's status page](https://status.sanity.io/)
4. Contact the development team

---

**Studio URL**: https://islanderstudio.sanity.studio
**Project ID**: 8hngvmaz
**Dataset**: production
