import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Article = Database["public"]["Tables"]["articles"]["Row"];
type ArticleTopic = Database["public"]["Enums"]["article_topics"];

export const useArticles = (topic?: ArticleTopic) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from("articles")
          .select("*")
          .eq("published", true)
          .order("created_at", { ascending: false });

        if (topic) {
          query = query.eq("topic", topic);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setArticles(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [topic]);

  return { articles, loading, error };
};

export const useArticle = (slug: string) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("articles")
          .select("*")
          .eq("slug", slug)
          .eq("published", true)
          .single();

        if (fetchError) throw fetchError;
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Article not found");
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  return { article, loading, error };
};

export const useTopics = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("articles")
          .select("topic")
          .eq("published", true);

        if (fetchError) throw fetchError;

        // Get unique topics and sort them
        const uniqueTopics = [...new Set(data?.map(article => article.topic) || [])];
        setTopics(uniqueTopics.sort());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch topics");
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  return { topics, loading, error };
};