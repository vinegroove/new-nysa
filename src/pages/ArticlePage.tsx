import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useArticle } from "@/hooks/useArticles";
import { format } from "date-fns";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { article, loading, error } = useArticle(slug!);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return <Navigate to="/learn-more" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <article className="max-w-4xl mx-auto px-4 py-16">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link to="/learn-more">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="secondary">
              {article.topic}
            </Badge>
            
            {/*  
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
                    {format(new Date(article.created_at), "MMMM d, yyyy")}  
            </div> 
            */}
            
          </div>
          
          <h1 className="text-4xl md:text-5xl font-semibold tracking-wide mb-6 pb-[15px] bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {article.title}
          </h1>
          
          {article.excerpt && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {article.excerpt}
            </p>
          )}
        </header>

        {/* Featured Image */}
        {article.featured_image_url && (
          <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg">
            <img 
              src={article.featured_image_url} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-foreground leading-relaxed whitespace-pre-wrap">
            {article.content}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default ArticlePage;
