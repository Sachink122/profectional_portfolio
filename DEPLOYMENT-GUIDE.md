# Deployment Guide 🚀

This guide will help you deploy your portfolio website to various hosting platforms.

## Pre-Deployment Checklist ✅

Before deploying, ensure:
- [ ] All links are working (social media, projects, contact)
- [ ] Resume PDF is accessible in `assets/images/`
- [ ] Formspree form ID is configured: `mgonywjy`
- [ ] Images are optimized for web
- [ ] All sections have real content (no placeholders)
- [ ] CSS and JavaScript are error-free
- [ ] Chatbot is tested and working
- [ ] Contact form is tested and working

## Deployment Options

### Option 1: GitHub Pages (Recommended - Free)

#### Step 1: Create GitHub Repository
```bash
# Initialize git repository (if not already)
git init
git add .
git commit -m "Initial commit"

# Create repository on GitHub and push
git remote add origin https://github.com/Sachink122/portfolio.git
git branch -M main
git push -u origin main
```

#### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** > **Pages**
3. Under **Source**, select **main** branch
4. Click **Save**
5. Your site will be available at: `https://sachink122.github.io/portfolio/`

#### Step 3: Configure Custom Domain (Optional)
1. Add a file named `CNAME` in the root directory with your domain
2. Update DNS settings with your domain provider:
   - Type: `CNAME`
   - Name: `@` or `www`
   - Value: `sachink122.github.io`

---

### Option 2: Netlify (Easy, Free, Fast)

#### Step 1: Sign Up
1. Visit [https://www.netlify.com](https://www.netlify.com)
2. Sign up with GitHub account

#### Step 2: Deploy from GitHub
1. Click **Add new site** > **Import an existing project**
2. Connect to GitHub and select your repository
3. Build settings:
   - **Build command:** Leave empty (static site)
   - **Publish directory:** `/` (root)
4. Click **Deploy site**

#### Step 3: Custom Domain (Optional)
1. Go to **Domain settings** > **Add custom domain**
2. Follow DNS configuration instructions
3. Netlify provides free SSL certificate automatically

**Netlify CLI Alternative:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd "c:\Users\sachi\Downloads\AI Automation\Frontend Projects\Portfolio"
netlify deploy --prod
```

---

### Option 3: Vercel (Fast, Free, Simple)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
cd "c:\Users\sachi\Downloads\AI Automation\Frontend Projects\Portfolio"
vercel
```

Follow the prompts:
- Project name: `portfolio`
- Deploy? `Y`

#### Step 3: Production Deploy
```bash
vercel --prod
```

**Or Deploy via Web Interface:**
1. Visit [https://vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Click **Deploy**

---

### Option 4: Cloudflare Pages (Free, Fast CDN)

#### Step 1: Sign Up
1. Visit [https://pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect GitHub account

#### Step 2: Create Project
1. Click **Create a project**
2. Select your repository
3. Configure build settings:
   - **Framework preset:** None
   - **Build command:** Leave empty
   - **Build output directory:** `/`
4. Click **Save and Deploy**

---

## Environment Configuration

### Update URLs for Production

1. **Update Open Graph Meta Tags** in `index.html`:
```html
<meta property="og:url" content="https://your-actual-domain.com">
<meta property="og:image" content="https://your-actual-domain.com/assets/images/profile.jpg">
```

2. **Verify Formspree Configuration**:
   - Form ID: `mgonywjy`
   - Email: `sgsk1sachin@gmail.com`
   - No additional changes needed

3. **Test Contact Form**:
   - After deployment, submit a test message
   - Check your email for notifications
   - Verify chatbot is sending conversation logs

---

## Post-Deployment Testing

### Critical Tests:
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Theme toggle (dark/light mode) works
- [ ] Contact form submits successfully
- [ ] Chatbot opens and sends messages
- [ ] Resume PDF downloads
- [ ] All project links open correctly
- [ ] Social media links work (GitHub, LinkedIn)
- [ ] Responsive design on mobile devices
- [ ] Page load speed is acceptable

### Tools for Testing:
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **SSL Test**: https://www.ssllabs.com/ssltest/
- **HTML Validator**: https://validator.w3.org/
- **CSS Validator**: https://jigsaw.w3.org/css-validator/

---

## Performance Optimization (Optional)

### Image Optimization
```bash
# Install image optimization tool
npm install -g imagemin-cli

# Optimize images
imagemin assets/images/*.jpg --out-dir=assets/images/optimized --plugin=mozjpeg
imagemin assets/images/*.png --out-dir=assets/images/optimized --plugin=pngquant
```

### Minify CSS and JavaScript
```bash
# Install minification tools
npm install -g clean-css-cli uglify-js

# Minify CSS
cleancss -o css/styles.min.css css/styles.css

# Minify JavaScript
uglifyjs js/main.js -o js/main.min.js -c -m
```

Update `index.html` to use minified files:
```html
<link rel="stylesheet" href="css/styles.min.css">
<script src="js/main.min.js" defer></script>
```

---

## Domain Configuration

### Custom Domain Setup

1. **Purchase Domain** from:
   - Namecheap: https://www.namecheap.com
   - Google Domains: https://domains.google
   - GoDaddy: https://www.godaddy.com

2. **Configure DNS** (Example for GitHub Pages):
   ```
   Type: A Record
   Host: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153

   Type: CNAME
   Host: www
   Value: sachink122.github.io
   ```

3. **Add CNAME File** to repository:
   ```
   yourdomain.com
   ```

---

## Security Headers (Optional)

Add a `_headers` file (for Netlify) or `vercel.json` (for Vercel):

**Netlify `_headers`:**
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**Vercel `vercel.json`:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

---

## Maintenance

### Regular Updates:
- Update projects section with new work
- Add new skills as you learn them
- Refresh testimonials periodically
- Update experience timeline
- Keep resume PDF current

### Monitoring:
- Check Formspree inbox regularly
- Monitor chatbot conversation logs
- Review Google Analytics (if implemented)
- Test contact form monthly
- Check for broken links quarterly

---

## Troubleshooting

### Common Issues:

**1. Contact Form Not Working**
- Verify Formspree form ID: `mgonywjy`
- Check browser console for errors
- Test with different email addresses
- Ensure CORS is not blocking requests

**2. Chatbot Not Sending Messages**
- Verify Formspree endpoint in `js/main.js`
- Check localStorage is enabled
- Test in incognito mode
- Review browser console errors

**3. Images Not Loading**
- Check file paths are correct
- Verify images exist in `assets/images/`
- Check file extensions match (case-sensitive on servers)
- Ensure images are committed to repository

**4. 404 Errors on Deployment**
- Verify build directory is set to root `/`
- Check all file paths are relative
- Ensure `index.html` is in root directory
- Review hosting platform documentation

**5. Slow Page Load**
- Optimize images (see Performance section)
- Minify CSS and JavaScript
- Enable CDN (most hosts provide this)
- Check PageSpeed Insights for recommendations

---

## Support & Resources

### Documentation:
- GitHub Pages: https://docs.github.com/pages
- Netlify: https://docs.netlify.com
- Vercel: https://vercel.com/docs
- Cloudflare Pages: https://developers.cloudflare.com/pages

### Contact:
- Email: sgsk1sachin@gmail.com
- GitHub: https://github.com/Sachink122
- LinkedIn: https://www.linkedin.com/in/sachin-kumar-941538312/

---

## Quick Deploy Commands

```bash
# GitHub Pages
git add .
git commit -m "Deploy to production"
git push origin main

# Netlify
netlify deploy --prod

# Vercel
vercel --prod

# Simple HTTP Server (Local Testing)
python -m http.server 5500
```

---

**🎉 Congratulations! Your portfolio is ready for deployment!**

Choose your preferred hosting platform and follow the steps above. GitHub Pages is recommended for beginners, while Netlify/Vercel offer more features and faster deployment times.
