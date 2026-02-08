import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Database } from "@/integrations/supabase/types";

type Article = Database["public"]["Tables"]["articles"]["Row"];

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 h-full flex flex-col">
      {article.featured_image_url && (
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img 
            src={article.featured_image_url} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {article.topic}
          </Badge>
        </div>
        <CardTitle className="text-xl font-semibold tracking-wide bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          {article.title}
        </CardTitle>
        {article.excerpt && (
          <CardDescription className="text-muted-foreground">
            {article.excerpt}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <Link to={`/learn-more/${article.slug}`}>
          <Button className="w-full">
            Read Article
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;