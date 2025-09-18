# 🚀 Vercel Deployment Instructions

## Step 1: Deploy to Vercel

Run these commands to deploy your sitemap with debug logging:

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy to production
vercel --prod

# Or for preview deployment first
vercel
```

## Step 2: Set Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `thebulletinbriefs`
3. Go to **Settings** → **Environment Variables**
4. Add these variables:
   ```
   VITE_SUPABASE_URL = your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY = your_service_role_key
   VITE_RAZORPAY_KEY_ID = rzp_test_RGK3vy1r83ba5b
   ```

## Step 3: Test the Sitemap

After deployment, test these URLs:

### Debug Mode (with logs):
```
https://thebulletinbriefs.in/sitemap.xml?debug=1
```

### Normal Mode:
```
https://thebulletinbriefs.in/sitemap.xml
```

## Step 4: Check Vercel Logs

1. Go to Vercel Dashboard → **Functions** tab
2. Click on your project
3. Look for `api/sitemap.xml.js` function logs
4. Check for debug output with emojis (🚀, 📊, ✅, etc.)

## Expected Debug Output:

```
🚀 Sitemap handler started at: 2024-01-XX...
🔍 Debug mode: true
🔧 Environment check:
- SUPABASE_URL exists: true
- SERVICE_ROLE_KEY exists: true
📊 Querying table: articles
📋 Columns: slug, updated_at
🔍 Filter: published = true
📊 Supabase query result:
- Articles count: X
- Error: null
- Sample articles: [...]
🏗️ Generating sitemap XML...
📄 Static pages count: 10
📰 Article URLs generated: X
✅ Sitemap generated successfully
```

## Step 5: Verify Results

Check that the sitemap contains:
- ✅ Static pages (home, about, contact, etc.)
- ✅ Article URLs from Supabase (`/article/slug-name`)
- ✅ Proper XML format
- ✅ No errors in Vercel logs

## Step 6: Clean Up (After Verification)

Once verified, we'll remove debug logs and set proper caching headers.
