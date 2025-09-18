# 🔧 Vercel 500 Error Fix Guide

## ❌ Problem
The serverless function is crashing with:
- **Error**: 500 INTERNAL_SERVER_ERROR
- **Code**: FUNCTION_INVOCATION_FAILED
- **ID**: bom1::wxp8q-1758167329607-9b211e02917a

## ✅ Root Cause & Fix

### **Issue**: ES Module Import Problem
Vercel serverless functions have issues with ES module imports (`import` statements) in some configurations.

### **Solution**: Converted to CommonJS
- ✅ Changed `import` to `require()`
- ✅ Changed `export default` to `module.exports`
- ✅ Removed `dotenv/config` dependency
- ✅ Simplified error handling

## 🚀 Fixed Files

### **`api/sitemap.xml.js`** (Updated)
- ✅ Uses CommonJS syntax (`require`, `module.exports`)
- ✅ Simplified logging for better debugging
- ✅ Removed complex dependencies
- ✅ Better error handling

## 📋 Deployment Steps

### 1. **Deploy to Vercel**
```bash
# Install Vercel CLI if needed
npm i -g vercel

# Deploy to production
vercel --prod
```

### 2. **Set Environment Variables**
In Vercel Dashboard → Settings → Environment Variables:
```
VITE_SUPABASE_URL = your_supabase_url
SUPABASE_SERVICE_ROLE_KEY = your_service_role_key
```

### 3. **Test the Function**
```
https://thebulletinbriefs.in/sitemap.xml?debug=1
```

## 🔍 Debug Information

### **Expected Logs in Vercel:**
```
🚀 Sitemap handler started
Environment check: { hasUrl: true, hasKey: true }
Query result: { articleCount: X, error: null }
Generated sitemap: { staticPages: 10, articles: X, xmlLength: XXXX }
```

### **What to Check:**
1. ✅ No more 500 errors
2. ✅ Environment variables loaded
3. ✅ Supabase query successful
4. ✅ XML generated with articles
5. ✅ Proper headers set

## 🧪 Local Testing

You can test locally with:
```bash
node test-sitemap.js
```

## 📊 Expected Results

### **Success Indicators:**
- ✅ Function returns 200 status
- ✅ XML content with static pages
- ✅ Dynamic article URLs from Supabase
- ✅ Proper `Content-Type: application/xml` header

### **If Still Failing:**
1. Check Vercel function logs
2. Verify environment variables are set
3. Test Supabase connection separately
4. Check for any remaining ES module issues

## 🎯 Next Steps

1. **Deploy** the fixed version
2. **Test** the sitemap URL
3. **Verify** articles appear in XML
4. **Switch** to clean version after verification
5. **Submit** to Google Search Console

The function should now work without the 500 error! 🎉
