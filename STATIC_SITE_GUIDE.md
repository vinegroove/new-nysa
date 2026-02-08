# Nysa - Static Site Edition

A beautiful static website for the Nysa Commandaria vineyard restoration project.

## Quick Start

### Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start dev server (http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 📝 Adding Content

#### 1. Adding Articles

Articles are stored as static data in `src/lib/articles.ts`. To add a new article:

1. Open `src/lib/articles.ts`
2. Add a new object to the `articles` array:

```typescript
{
  id: "5",
  slug: "your-article-slug",
  title: "Your Article Title",
  description: "Short description (used in article cards)",
  topic: "viticulture", // or "restoration", "community", "sustainability", "education"
  imageUrl: "/images/articles/your-image.jpg",
  author: "Author Name",
  publishedDate: "2026-02-08",
  content: `Full article text here. Supports Markdown.
  
  ## Headers
  
  - Lists
  - With bullet points
  `,
}
```

3. Save and commit. The GitHub Actions workflow will automatically build and deploy.

#### 2. Adding Images for Articles

1. Place your image in `public/images/articles/`
2. Reference it in the article's `imageUrl` field (e.g., `/images/articles/my-image.jpg`)

Images are automatically bundled with the production build.

#### 3. Topics

Available article topics:
- `viticulture` - Wine-making and grape cultivation
- `restoration` - Vineyard and terrace restoration work
- `community` - Community involvement and events
- `sustainability` - Sustainable agriculture practices
- `education` - Learning and educational content

## Deployment

The site is automatically deployed to GitHub Pages when you push to `main` or `master`:

1. Commit your changes:
```bash
git add .
git commit -m "Add article about topic"
git push origin main
```

2. GitHub Actions will build and deploy to `gh-pages` branch
3. Site updates within ~1 minute at `https://nysa.earth`

## Project Structure

```
src/
├── lib/
│   ├── articles.ts      ← Add your articles here
│   ├── constants.ts
│   ├── types.ts
│   └── utils.ts
├── pages/
│   ├── Home.tsx
│   ├── LearnMore.tsx    ← Displays articles
│   ├── ArticlePage.tsx  ← Single article view
│   ├── OurStory.tsx
│   ├── Projects.tsx
│   ├── PrivacyPolicy.tsx
│   └── TermsOfUse.tsx
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── ArticleCard.tsx
│   └── ... (UI components)
└── hooks/
    └── useArticles.ts   ← Reads from articles.ts

public/
├── images/articles/     ← Store article images here
├── robots.txt
└── 404.html

dist/                     ← Production build (auto-generated)
```

## Static Site Features

✓ No backend/database needed
✓ Fast CDN delivery via GitHub Pages
✓ Full offline support
✓ Version control for all content
✓ Free hosting

## Technology Stack

- **Vite** - Fast build tool for React
- **React** - UI framework
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **React Router** - Client-side routing

## Troubleshooting

**Images not showing?**
- Ensure image is in `public/images/articles/`
- Check the `imageUrl` path in your article (should start with `/images/`)

**Article not appearing?**
- Verify the `published` field is not missing (removed from static version)
- Check that slug doesn't have spaces or special characters
- Ensure proper topic is assigned

**Build failing?**
- Delete `node_modules` and run `npm install --legacy-peer-deps` again
- Check that article `content` field is a valid string

## Support

For more information about the Nysa project, visit:
- https://nysa.earth
- https://github.com/vinegroove/new-nysa
