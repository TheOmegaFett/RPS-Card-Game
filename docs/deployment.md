# Deployment Guide

> **Quick Summary:** Step-by-step instructions for deploying to Render, Netlify, Vercel, and GitHub Pages. Includes build optimization, server configuration, environment variables, and troubleshooting tips. Choose your preferred platform and get deployed in minutes!

## Overview

This guide covers deploying the Rock Paper Scissors Card Game to various hosting platforms.

## 📦 Building for Production

### Prerequisites
- Node.js 16+ and npm installed
- All dependencies installed (`npm install`)

### Create Production Build

```bash
npm run build
```

This creates an optimized production build in the `build/` directory with:
- ✅ Minified JavaScript and CSS
- ✅ Cache-busting filenames (e.g., `main.abc123.js`)
- ✅ Optimized images and assets
- ✅ Source maps for debugging

### Build Output

```
build/
├── static/
│   ├── css/
│   │   └── main.[hash].css
│   ├── js/
│   │   └── main.[hash].js
│   └── media/
├── index.html
├── manifest.json
└── favicon.ico
```

**Build Size**: ~50KB gzipped

## 🚀 Deployment Platforms

### Option 1: Render (Recommended)

**Platform**: [https://render.com](https://render.com)

#### Quick Deploy

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Create New Static Site**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

3. **Configure Build Settings**
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Branch**: `Main` (or your default branch)

4. **Deploy**
   - Click "Create Static Site"
   - Render will automatically build and deploy
   - You'll get a URL like `https://your-app.onrender.com`

#### Custom Domain (Optional)

1. Go to your site settings
2. Click "Custom Domains"
3. Add your domain
4. Configure DNS records as shown

#### Auto-Deploy

Every push to your main branch will automatically trigger a new deployment.

---

### Option 2: Netlify

**Platform**: [https://www.netlify.com](https://www.netlify.com)

#### Deploy with Git

1. **Connect Repository**
   - Sign in to Netlify
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository

2. **Build Settings**
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`
   - **Branch**: `Main`

3. **Deploy**
   - Click "Deploy site"
   - Netlify builds and deploys automatically

#### Deploy from CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build project
npm run build

# Deploy
netlify deploy --prod --dir=build
```

#### Environment Variables

If needed, add in Site Settings → Environment Variables:
```
REACT_APP_API_URL=https://api.example.com
```

---

### Option 3: Vercel

**Platform**: [https://vercel.com](https://vercel.com)

#### Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

#### Deploy with Git

1. Import repository at [vercel.com/new](https://vercel.com/new)
2. Vercel auto-detects Create React App
3. Click "Deploy"

**No configuration needed** - Vercel automatically detects React apps!

---

### Option 4: GitHub Pages

#### Using gh-pages Package

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/RPS-Card-Game",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: `gh-pages` branch
   - Save

**Live at**: `https://yourusername.github.io/RPS-Card-Game`

---

### Option 5: Manual Deployment

#### Static File Server

Any static file server can host the built app:

```bash
# Using serve
npm install -g serve
serve -s build -l 3000

# Using Python
cd build
python -m http.server 8000

# Using Node.js http-server
npx http-server build
```

#### Upload to Web Host

1. Build the project: `npm run build`
2. Upload `build/` folder contents to your web server
3. Configure server to serve `index.html` for all routes

## 🔧 Server Configuration

### SPA Routing

React Router requires server-side configuration to handle client-side routes.

#### Apache (.htaccess)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Nginx

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

#### Render / Netlify / Vercel

These platforms handle SPA routing automatically - no configuration needed!

### Headers (Recommended)

#### Security Headers

```nginx
# X-Content-Type-Options
add_header X-Content-Type-Options "nosniff" always;

# X-Frame-Options
add_header X-Frame-Options "DENY" always;

# X-XSS-Protection
add_header X-XSS-Protection "1; mode=block" always;

# Content-Security-Policy
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;" always;
```

#### Caching Headers

```nginx
# Cache static assets with hash in filename
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}

# Don't cache HTML
location ~* \.html$ {
  add_header Cache-Control "public, max-age=0, must-revalidate";
}
```

**Note**: Render, Netlify, and Vercel handle headers automatically or via config files.

## 🌍 Environment Variables

### Development

Create `.env.local`:
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENVIRONMENT=development
```

### Production

Set in your hosting platform's dashboard:
```env
REACT_APP_API_URL=https://api.production.com
REACT_APP_ENVIRONMENT=production
```

**Important**: Only variables prefixed with `REACT_APP_` are accessible in the app.

## 📊 Monitoring

### Deployment Checklist

After deploying, verify:

- [ ] Site loads correctly
- [ ] All routes work (/, /game, etc.)
- [ ] No console errors
- [ ] Images load properly
- [ ] Emojis render correctly
- [ ] Game functionality works
- [ ] Deck import/export works
- [ ] Mobile responsive
- [ ] HTTPS enabled

### Performance

Run Lighthouse audit:
```bash
# Chrome DevTools > Lighthouse
# Or use CLI
npm install -g lighthouse
lighthouse https://your-app.com --view
```

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

## 🔄 Continuous Deployment

### GitHub Actions (Example)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Render

on:
  push:
    branches: [Main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Test
        run: npm test --passWithNoTests
```

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### Routes Don't Work

- Ensure server is configured for SPA routing
- Check that `homepage` in package.json is correct
- Verify `BrowserRouter` is used (not `HashRouter`)

### Assets Not Loading

- Check `homepage` field in package.json
- Verify `PUBLIC_URL` environment variable
- Ensure paths use `%PUBLIC_URL%` in index.html

### Slow Load Times

- Check bundle size: `npm run build` shows size report
- Enable gzip compression on server
- Use CDN for static assets
- Optimize images

## 📞 Support

For deployment issues:
- Check platform documentation
- Review [CONTRIBUTING.md](CONTRIBUTING.md)
- Open GitHub issue

---

**Recommended Platform**: Render (free tier, automatic SSL, easy setup)  
**Alternative**: Netlify (excellent performance, generous free tier)  
**Advanced**: Vercel (best for Next.js, but works great for React too)
