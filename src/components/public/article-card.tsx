import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Article } from "@/hooks/use-articles";
import { Calendar, Clock, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { LazyImage } from "@/components/performance/image-lazy-loader";
import { memo } from "react";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  compact?: boolean;
  priority?: boolean;
}

export const ArticleCard = memo(function ArticleCard({ 
  article, 
  featured = false, 
  compact = false,
  priority = false 
}: ArticleCardProps) {
  const publishedDate = article.published_at ? new Date(article.published_at) : new Date(article.created_at);
  
  if (featured) {
    return (
      <Link to={`/article/${article.slug}`} className="group animate-fade-in hover-scale">
        <Card className="overflow-hidden border-border/50 hover:shadow-accent transition-all duration-300 h-full hover:border-primary/20">
          <div className="relative">
            {article.image_url ? (
              <LazyImage
                src={article.image_url}
                alt={article.title}
                aspectRatio="16/9"
                priority={priority}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2 animate-float">
                    <span className="text-primary font-bold text-lg">
                      {article.title.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground line-clamp-2">
                    {article.title}
                  </span>
                </div>
              </div>
            )}
            <div className="absolute top-4 left-4">
              <Link 
                to={`/category/${article.categories?.slug}`} 
                onClick={(e) => e.stopPropagation()}
                className="inline-block"
              >
                <Badge 
                  className={cn(
                    "bg-primary/90 text-primary-foreground hover:bg-primary transition-colors backdrop-blur-sm",
                    "hover:scale-105 transform transition-transform duration-200"
                  )}
                >
                  {article.categories?.name}
                </Badge>
              </Link>
            </div>
          </div>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 story-link">
              {article.title}
            </h2>
            {article.excerpt && (
              <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                {article.excerpt}
              </p>
            )}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 hover:text-foreground transition-colors">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDistanceToNow(publishedDate, { addSuffix: true })}</span>
                </div>
                <div className="flex items-center space-x-1 hover:text-foreground transition-colors">
                  <Clock className="h-3 w-3" />
                  <span>{article.reading_time} min read</span>
                </div>
                <div className="flex items-center space-x-1 hover:text-foreground transition-colors">
                  <Eye className="h-3 w-3" />
                  <span>{article.views_count}</span>
                </div>
              </div>
              <span className="font-medium hover:text-foreground transition-colors">{article.author}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.slug}`} className="group animate-fade-in hover-scale">
      <Card className="overflow-hidden border-border/50 hover:shadow-accent transition-all duration-300 h-full hover:border-primary/20">
        {article.image_url ? (
          <LazyImage
            src={article.image_url}
            alt={article.title}
            aspectRatio="16/9"
            priority={priority}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="aspect-[16/9] bg-gradient-to-br from-muted/50 to-muted/80 flex items-center justify-center">
            <div className="text-center p-4">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2 animate-float">
                <span className="text-primary font-bold">
                  {article.title.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-xs text-muted-foreground line-clamp-1">
                {article.categories?.name}
              </span>
            </div>
          </div>
        )}
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Link 
              to={`/category/${article.categories?.slug}`} 
              onClick={(e) => e.stopPropagation()}
              className="inline-block"
            >
              <Badge 
                variant="secondary"
                className="text-xs hover:bg-primary/10 transition-colors hover:scale-105 transform transition-transform duration-200"
              >
                {article.categories?.name}
              </Badge>
            </Link>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(publishedDate, { addSuffix: true })}
            </span>
          </div>
          <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2 story-link">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 hover:text-foreground transition-colors">
                <Clock className="h-3 w-3" />
                <span>{article.reading_time}m</span>
              </div>
              <div className="flex items-center space-x-1 hover:text-foreground transition-colors">
                <Eye className="h-3 w-3" />
                <span>{article.views_count}</span>
              </div>
            </div>
            <span className="hover:text-foreground transition-colors">{article.author}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
});