import { useEffect, useState } from "react";
import { useArticles, useCategories } from "@/hooks/use-articles";

export default function SitemapXML() {
  const { data: articlesData, isLoading: articlesLoading } = useArticles(undefined, 1, 1000);
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const [xmlContent, setXmlContent] = useState<string>("");

  useEffect(() => {
    if (articlesData?.articles && categories && !articlesLoading && !categoriesLoading) {
      const sitemapXml = generateSitemap(articlesData.articles, categories);
      setXmlContent(sitemapXml);
      
      // Set proper XML response headers
      const response = new Response(sitemapXml, {
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        },
      });
      
      // Create blob URL and replace current page
      const blob = new Blob([sitemapXml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      window.location.replace(url);
    }
  }, [articlesData, categories, articlesLoading, categoriesLoading]);

  // Show loading state
  if (articlesLoading || categoriesLoading || !xmlContent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Generating Sitemap...</h1>
          <p className="text-muted-foreground">
            Please wait while we generate your dynamic sitemap.
          </p>
        </div>
      </div>
    );
  }

  return null;
}

function generateSitemap(articles: any[], categories: any[]) {
  const baseUrl = "https://thebulletinbriefs.in";
  const currentDate = new Date().toISOString().split('T')[0];

  let urlEntries = "";

  // Homepage - Priority 1.0
  urlEntries += `  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

  // Static pages - Priority 0.7
  const staticPages = [
    { path: '/about', changefreq: 'monthly' },
    { path: '/contact', changefreq: 'monthly' },
    { path: '/editorial-guidelines', changefreq: 'monthly' },
    { path: '/subscription', changefreq: 'weekly' },
    { path: '/privacy', changefreq: 'monthly' },
    { path: '/terms', changefreq: 'monthly' },
    { path: '/cookies', changefreq: 'monthly' },
    { path: '/disclaimer', changefreq: 'monthly' }
  ];

  staticPages.forEach(page => {
    urlEntries += `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>0.7</priority>
  </url>
`;
  });

  // Category pages - Priority 0.8
  categories.forEach(category => {
    urlEntries += `  <url>
    <loc>${baseUrl}/category/${category.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  // Article pages - Priority 0.8 (as requested)
  articles.filter(article => article.published).forEach(article => {
    const lastmod = article.updated_at 
      ? new Date(article.updated_at).toISOString().split('T')[0] 
      : currentDate;
    
    urlEntries += `  <url>
    <loc>${baseUrl}/article/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  // RSS Feed - Priority 0.5
  urlEntries += `  <url>
    <loc>${baseUrl}/rss</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>
`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}</urlset>`;
}