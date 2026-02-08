// Static articles data for the Nysa site
// Add new articles here by creating new objects in this array

export type ArticleTopic = "viticulture" | "restoration" | "community" | "sustainability" | "education";

export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  topic: ArticleTopic;
  imageUrl: string;
  author: string;
  publishedDate: string;
}

export const articles: Article[] = [
  {
    id: "1",
    slug: "traditional-commandaria-viticulture",
    title: "Traditional Commandaria Viticulture",
    description: "Discover the ancient techniques that have shaped Commandaria wine for millennia.",
    topic: "viticulture",
    imageUrl: "/images/articles/commandaria-vineyard.jpg",
    author: "Nysa Team",
    publishedDate: "2026-01-15",
    content: `
Commandaria viticulture represents one of the world's oldest wine-making traditions, with roots tracing back thousands of years. This ancient practice combines traditional knowledge with sustainable farming methods that have been refined over generations.

## The History of Commandaria

The region of Commandaria in Cyprus has been producing wine since ancient times. The method involves careful cultivation of native grape varieties on steep, sun-exposed terraces that have been carved into the limestone landscape over centuries.

## Key Techniques

Traditional Commandaria viticulture emphasizes:

- **Terraced farming**: Using natural stone walls to prevent erosion and maximize sun exposure
- **Native varieties**: Focusing on Xynisteri and Mavro grapes adapted to the harsh Mediterranean climate
- **Water management**: Utilizing ancient irrigation methods and natural water retention
- **Sustainable practices**: Minimal pesticide use, natural composting, and crop rotation

## Modern Restoration Efforts

Today, the Nysa project works to restore these vineyards to their former glory, preserving both the agricultural heritage and the unique ecosystem of the region. By supporting these efforts, we ensure that future generations can enjoy not only exceptional wine but also the cultural and environmental benefits of this ancient tradition.
    `,
  },
  {
    id: "2",
    slug: "restoring-stone-terraces",
    title: "The Art of Restoring Ancient Stone Terraces",
    description: "Learn how we're rebuilding the traditional stone walls that define Commandaria's landscape.",
    topic: "restoration",
    imageUrl: "/images/articles/stone-terraces.jpg",
    author: "Nysa Team",
    publishedDate: "2026-01-20",
    content: `
The stone terraces of Commandaria are not merely functional structures—they are architectural heritage pieces that require skilled craftsmanship to restore and maintain. These ancient dry-stone walls represent centuries of accumulated knowledge about working with the land.

## Why Terraces Matter

Stone terraces serve multiple critical functions:

- **Erosion prevention**: Stopping soil loss on steep hillsides
- **Water conservation**: Creating natural catchment areas for rainfall
- **Microclimate management**: Creating pockets of thermal mass that protect plants
- **Biodiversity**: Providing habitats for local flora and fauna

## Restoration Challenges

Restoring these terraces involves intricate knowledge of traditional building methods, understanding of local geology, and respect for historical construction techniques. Many walls have been damaged by neglect, weather, or agricultural modernization.

## Our Approach

The Nysa project employs both traditional methods and modern conservation science to restore these terraces. We work with local experts who understand the regional building techniques and employ community volunteers who learn these traditional skills in the process.

This restoration work creates jobs, preserves cultural heritage, and improves the ecological health of the Commandaria region.
    `,
  },
  {
    id: "3",
    slug: "community-involvement-vineyard-restoration",
    title: "How Community Involvement Powers Vineyard Restoration",
    description: "Discover the impact of community volunteers in bringing Commandaria vineyards back to life.",
    topic: "community",
    imageUrl: "/images/articles/community-work.jpg",
    author: "Nysa Team",
    publishedDate: "2026-02-01",
    content: `
The Nysa project thrives on the passionate involvement of a diverse community—from local villagers to international volunteers—all united by a shared vision of restoration and sustainable agriculture.

## The Power of Collective Action

Vineyard restoration is labor-intensive work that cannot be accomplished by professionals alone. By engaging the broader community, we achieve:

- **Shared responsibility**: Making restoration a collective endeavor rather than a top-down initiative
- **Knowledge transfer**: Younger generations learning traditional techniques from elders
- **Economic empowerment**: Creating opportunities for local employment and skill development
- **Cultural pride**: Rebuilding connections to regional heritage and agricultural traditions

## Types of Involvement

Community members contribute in various ways:

- **Physical restoration work**: Rebuilding terraces, planting vines, trail maintenance
- **Educational programs**: Workshops on traditional techniques and sustainable farming
- **Environmental stewardship**: Monitoring biodiversity, managing water resources
- **Cultural events**: Celebrations that mark milestones and share the project's progress

## Join Us

Whether you're interested in hands-on work, financial support, or simply learning about the project, there are many ways to get involved. Visit our community page to see current opportunities and upcoming events.
    `,
  },
  {
    id: "4",
    slug: "sustainable-agriculture-mediterranean",
    title: "Sustainable Agriculture in the Mediterranean",
    description: "Exploring how traditional methods offer solutions for modern environmental challenges.",
    topic: "sustainability",
    imageUrl: "/images/articles/sustainable-farming.jpg",
    author: "Nysa Team",
    publishedDate: "2026-02-05",
    content: `
The Mediterranean region faces unique environmental challenges—water scarcity, soil degradation, and climate change—yet traditional agricultural practices offer proven solutions that have sustained communities for millennia.

## Traditional Wisdom Meets Modern Science

The Nysa project bridges ancestral knowledge with contemporary environmental science to develop truly sustainable farming practices that address 21st-century challenges.

## Key Sustainability Principles

### Water Conservation
Traditional terracing and stone walls create natural water retention systems. Rainfall is captured and slowly percolates into the soil, reducing the need for irrigation in an increasingly water-stressed region.

### Soil Health
By avoiding synthetic pesticides and fertilizers, and by using natural composting methods, the vineyards build soil biodiversity and long-term fertility.

### Climate Resilience
Native grape varieties have adapted to local climate conditions over centuries. By focusing on these varieties rather than imported commercial cultivars, we ensure crops that thrive in the Mediterranean climate.

### Biodiversity
Stone terraces and naturally managed vineyards create habitats for pollinators, birds, and beneficial insects essential for ecosystem health.

## The Economic Case

Sustainable practices are not just environmentally sound—they're economically viable. Wine produced from sustainably managed vineyards commands premium prices, creating incentives for long-term stewardship.

## Looking Forward

As climate change intensifies, sustainable agricultural practices like those being restored in Commandaria will become increasingly valuable. By supporting and studying these methods, we contribute to food security and environmental resilience not just locally but globally.
    `,
  },
];

// Helper functions for filtering and searching

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find((article) => article.slug === slug);
};

export const getArticlesByTopic = (topic: ArticleTopic): Article[] => {
  return articles.filter((article) => article.topic === topic);
};

export const getAllTopics = (): ArticleTopic[] => {
  const topics = new Set<ArticleTopic>();
  articles.forEach((article) => topics.add(article.topic));
  return Array.from(topics).sort();
};

export const getRecentArticles = (limit: number = 3): Article[] => {
  return [...articles]
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, limit);
};
