

# Fix GitHub Pages Deployment for nysa.earth

## Problem
Your site breaks on GitHub Pages because it uses client-side routing (React Router with `BrowserRouter`), but GitHub Pages only serves static files. When a user visits any route other than `/` (e.g., `/auth`, `/dashboard`), GitHub Pages can't find a matching file and returns its default 404 page instead of your app.

## Solution

### Step 1: Add a `404.html` SPA fallback
Create a `public/404.html` file that redirects all 404s back to your app. GitHub Pages serves this file for any URL that doesn't match a real file. The file will contain a small script that preserves the original URL path, so React Router can handle it correctly.

### Step 2: Update `index.html` to handle the redirect
Add a small script in `index.html` that reads the redirected path from the 404 page and restores the correct URL in the browser's address bar, so React Router picks up the right route.

### Step 3: Verify `vite.config.ts`
Your Vite config doesn't need a `base` property since you're using a custom domain (`nysa.earth`), which is served from the root. No changes needed here.

---

## Technical Details

### File: `public/404.html` (new)
This is a well-known GitHub Pages SPA workaround. The 404 page will:
- Capture the current URL path and query string
- Redirect to `index.html` with the path encoded as a query parameter
- This happens transparently to the user

### File: `index.html` (modify)
Add a small inline script in the `<head>` that:
- Checks if the URL contains the redirect query parameter from `404.html`
- Uses `window.history.replaceState` to restore the original URL
- React Router then picks up the correct route as if the user navigated normally

### No changes needed to:
- `vite.config.ts` -- base `/` is correct for custom domains
- `src/App.tsx` -- `BrowserRouter` is the right choice; the 404 fallback handles the SPA routing
- Asset imports -- `hero-vineyard.jpg` is correctly imported via ES6 import, which Vite handles properly

