import { useState, useEffect } from "react";
import { articles, getArticleBySlug, getArticlesByTopic, getAllTopics } from "@/lib/articles";
import type { ArticleTopic, Article } from "@/lib/articles";

export const useArticles = (topic?: ArticleTopic) => {
  const [articlesData, setArticlesData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);

      let filteredArticles = [...articles];
      if (topic) {
        filteredArticles = getArticlesByTopic(topic);
      }

      // Sort by date descending
      filteredArticles.sort(
        (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
      );

      setArticlesData(filteredArticles);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  }, [topic]);

  return { articles: articlesData, loading, error };
};

export const useArticle = (slug: string) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);

      if (slug) {
        const found = getArticleBySlug(slug);
        if (found) {
          setArticle(found);
        } else {
          setError("Article not found");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Article not found");
      setArticle(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  return { article, loading, error };
};

export const useTopics = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);

      const allTopics = getAllTopics();
      setTopics(allTopics);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch topics");
    } finally {
      setLoading(false);
    }
  }, []);

  return { topics, loading, error };
};