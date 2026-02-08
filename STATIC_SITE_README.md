# Nysa - 100% Static Website

This is now a completely static HTML/CSS/JavaScript website with **zero dependencies**, **no build tools**, and **no database**. Everything runs as plain files.

## Directory Structure

```
.
├── index.html                           # Home page
├── our-story.html                       # About page
├── projects.html                        # Projects page
├── learn-more.html                      # Article listing with filters
├── article-*.html                       # Individual article pages (4 articles)
├── privacy-policy.html                  # Legal page
├── terms-of-use.html                    # Legal page
├── css/
│   └── style.css                        # All styling (no build needed)
├── js/
│   └── main.js                          # Navigation & filtering (vanilla JS)
├── public/
│   └── images/
│       └── articles/                    # Place article images here
├── CNAME                                # GitHub Pages custom domain
└── .gitignore                           # Git configuration
```

## Features

✅ **No Framework Dependencies** - Pure HTML, CSS, and JavaScript  
✅ **No Build Process** - No npm, webpack, Vite, TypeScript compilation  
✅ **No Database** - All content is static  
✅ **Fast Loading** - Optimized CSS and minimal JavaScript  
✅ **Mobile Responsive** - Works on all devices  
✅ **GitHub Pages Ready** - Deploy directly to GitHub Pages  

## How to Use

### Adding Articles

1. Create a new HTML file: `article-your-article-slug.html`
2. Copy the structure from any existing article page (e.g., `article-traditional-commandaria-viticulture.html`)
3. Update the title, description, and content
4. Add a matching image to `public/images/articles/`
5. Add the article card to `learn-more.html`

### Adding Images

Place article images in `public/images/articles/` and reference them in the HTML:
```html
<img src="/images/articles/your-image.jpg" alt="Description">
```

### Customizing Styling

Edit `css/style.css` to change colors, fonts, or layout. All CSS variables are at the top of the file:

```css
:root {
  --primary: #1f4d1f;        /* Deep olive green */
  --accent: #d4a850;         /* Gold */
  --background: #faf5f0;     /* Warm cream */
  /* etc... */
}
```

### Testing Locally

Option 1: Using Python (if installed)
```bash
python -m http.server 8000
```

Option 2: Using Node.js
```bash
node -e "const http = require('http'); const fs = require('fs'); const path = require('path'); const server = http.createServer((req, res) => { const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url); const ext = path.extname(filePath); const mimes = {'.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png'}; res.writeHead(200, {'Content-Type': mimes[ext] || 'application/octet-stream'}); res.end(fs.readFileSync(filePath.includes('.') ? filePath : filePath + '.html')); }); server.listen(8000); console.log('Open http://localhost:8000');"
```

Open `http://localhost:8000` in your browser.

### Deploying to GitHub Pages

1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Update site"
   git push origin main
   ```

2. Go to repository Settings → Pages
3. Set source to "Deploy from a branch"
4. Select `main` branch and root (`/`) folder
5. Your site will be available at `https://nysa.earth` (or your custom domain)

## Navigation

The site has a mobile menu that automatically appears on small screens. Menu items are configured in each HTML file's `<nav>` section.

## Mobile Responsiveness

The CSS includes responsive utilities:
- Desktop layout: Grid columns, full navigation  
- Tablet (768px+): Adjusted spacing  
- Mobile (<768px): Menu toggle, single column layout  

## Browser Support

Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 12+, Android 5+)

## No Build Steps Needed

Simply edit the HTML/CSS/JS files and they work immediately. No webpack, TypeScript compilation, or other build tools required.

## Remove node_modules

If you want to completely remove Node.js dependencies:
```bash
rmdir /s /q node_modules
del package.json
del bun.lockb
```

The site will work fine without these—they're only present from the previous Vite/React setup.

## SEO & Meta Tags

Each page has proper meta tags for search engines and social media. Update them in each HTML file's `<head>` section.

## Analytics & Tracking

Currently, the site doesn't use any tracking. To add Google Analytics or similar, add the tracking code to the `<head>` section of `index.html` and it will be available site-wide.

---

**This is now a true static website.** It can be hosted anywhere that serves HTML files: GitHub Pages, Netlify, Vercel, Apache, Nginx, or any web server.
