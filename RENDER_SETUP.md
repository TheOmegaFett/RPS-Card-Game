# Render Deployment Setup

## Quick Deploy

The `render.yaml` file is included for automatic configuration, but Render static sites may require manual header setup.

## Manual Header Configuration (If Needed)

If you're still seeing warnings after deployment, configure headers manually in Render Dashboard:

### 1. Go to Your Static Site Settings

Navigate to: **Dashboard** → **Your Site** → **Headers**

### 2. Add Response Headers

Click "Add Header" and add the following:

#### Security Headers (Apply to all paths `/*`)

| Path | Header Name | Value |
|------|-------------|-------|
| `/*` | `X-Content-Type-Options` | `nosniff` |
| `/*` | `X-Frame-Options` | `DENY` |
| `/*` | `X-XSS-Protection` | `1; mode=block` |
| `/*` | `Content-Security-Policy` | `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;` |

#### Caching Headers

| Path | Header Name | Value |
|------|-------------|-------|
| `/static/js/*` | `Cache-Control` | `public, max-age=31536000, immutable` |
| `/static/css/*` | `Cache-Control` | `public, max-age=31536000, immutable` |
| `/static/media/*` | `Cache-Control` | `public, max-age=31536000, immutable` |
| `/` | `Cache-Control` | `public, max-age=0, must-revalidate` |

### 3. Enable Rewrites

Under **Redirects/Rewrites**, add:

- **Source:** `/*`
- **Destination:** `/index.html`
- **Type:** Rewrite

This ensures all routes work correctly for the SPA.

## Troubleshooting Warnings

### "Resource should use cache busting"
- ✅ This is automatically handled by Create React App
- JS/CSS files have hashes in filenames (e.g., `main.abc123.js`)
- Make sure Cache-Control headers are set correctly

### "Static resources should use cache-control with max-age=31536000"
- Add the caching headers above for `/static/js/*`, `/static/css/*`, `/static/media/*`

### "Response should include x-content-type-options"
- Add the security headers listed above

### "CSP blocks eval"
- This warning appears in dev mode only
- Production builds don't use eval
- The CSP header above is production-safe

### "Content-Type charset should be utf-8"
- Render sets this automatically for HTML files
- If warning persists, you can add manually:
  - Path: `/*.html`
  - Header: `Content-Type`
  - Value: `text/html; charset=utf-8`

## Alternative: Custom Headers via _headers File

If Blueprint (render.yaml) headers aren't working, you can try adding headers via a `_headers` file:

Create `public/_headers`:
```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'

/static/js/*
  Cache-Control: public, max-age=31536000, immutable

/static/css/*
  Cache-Control: public, max-age=31536000, immutable

/static/media/*
  Cache-Control: public, max-age=31536000, immutable

/
  Cache-Control: public, max-age=0, must-revalidate
```

Then rebuild and redeploy.

## Verification

After configuring headers, verify they're working:

```bash
curl -I https://your-site.onrender.com/
```

Check for:
- `x-content-type-options: nosniff`
- `cache-control: public, max-age=0, must-revalidate` (for HTML)

```bash
curl -I https://your-site.onrender.com/static/js/main.*.js
```

Check for:
- `cache-control: public, max-age=31536000, immutable` (for JS files)
