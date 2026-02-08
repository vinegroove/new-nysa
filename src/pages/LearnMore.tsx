import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { useArticles, useTopics } from "@/hooks/useArticles";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/constants";
import type { Database } from "@/integrations/supabase/types";

type ArticleTopic = Database["public"]["Enums"]["article_topics"];

const LearnMore = () => {
  const [selectedTopic, setSelectedTopic] = useState<ArticleTopic | "">("");
  const { articles, loading, error } = useArticles(selectedTopic || undefined);
  const { topics: dbTopics, loading: topicsLoading } = useTopics();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Combine "All Articles" with dynamic topics from database
  const topics = ["All Articles", ...dbTopics];

  const handleTopicFilter = (topic: string) => {
    setSelectedTopic(topic === "All Articles" ? "" : topic as ArticleTopic);
  };

  const handleJoinCommunity = () => {
    if (user) {
      navigate(ROUTES.DASHBOARD);
    } else {
      navigate(ROUTES.AUTH);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-16 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-wide text-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-6">
            Read & Learn More
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore articles on sustainable living, traditional crafts, and regenerative practices. 
            Learn from our community's collective wisdom and experience.
          </p>
        </section>

        {/* Topic Filter */}
        <section className="pb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {topicsLoading ? (
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-8 w-20 bg-muted rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              topics.map((topic) => (
                <Button
                  key={topic}
                  variant={selectedTopic === (topic === "All Articles" ? "" : topic) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTopicFilter(topic)}
                >
                  {topic}
                </Button>
              ))
            )}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-muted rounded-t-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Failed to load articles. Please try again later.</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-4">No Articles Found</h3>
              <p className="text-muted-foreground mb-8">
                {selectedTopic 
                  ? `No articles found for "${selectedTopic}". Try selecting a different topic.`
                  : "No articles have been published yet. Check back soon for new content!"
                }
              </p>
              {selectedTopic && (
                <Button onClick={() => setSelectedTopic("")}>
                  View All Articles
                </Button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        {!loading && articles.length > 0 && (
          <section className="py-16 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-semibold tracking-wide bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-6">
                Want to Share Your Knowledge?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join our community and contribute your own articles and experiences to help others on their sustainable living journey.
              </p>
              <Button size="lg" onClick={handleJoinCommunity}>
                {user ? "Go to Dashboard" : "Join the Community"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default LearnMore;
