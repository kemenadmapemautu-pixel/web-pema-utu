import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, User, Eye, ArrowLeft, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import '@/styles/news-content.css';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  views: number;
  featured: boolean;
  image?: string;
  publishedDate?: string;
  publishedBy?: string;
}

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = () => {
      const savedNews = localStorage.getItem("newsList");
      if (savedNews && id) {
        try {
          const newsList: NewsItem[] = JSON.parse(savedNews);
          const foundNews = newsList.find(n => n.id === id);
          
          if (foundNews) {
            // Migrate news data to add new fields
            const migratedNews = {
              ...foundNews,
              publishedDate: foundNews.publishedDate || new Date().toISOString().split('T')[0],
              publishedBy: foundNews.publishedBy || "Administrator"
            };
            
            // Increment views
            const updatedNews = newsList.map(n => 
              n.id === id ? { ...migratedNews, views: n.views + 1 } : n
            );
            localStorage.setItem("newsList", JSON.stringify(updatedNews));
            setNews({ ...migratedNews, views: migratedNews.views + 1 });
          }
        } catch (error) {
          console.error("Error parsing news data:", error);
        }
      }
      setLoading(false);
    };

    loadNews();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Program": "bg-blue-100 text-blue-800",
      "Kegiatan": "bg-green-100 text-green-800", 
      "Pendidikan": "bg-purple-100 text-purple-800",
      "Kemahasiswaan": "bg-indigo-100 text-indigo-800",
      "Prestasi": "bg-yellow-100 text-yellow-800",
      "Pengumuman": "bg-cyan-100 text-cyan-800",
      "Press Release": "bg-red-100 text-red-700 font-medium"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const handleShare = () => {
    if (navigator.share && news) {
      navigator.share({
        title: news.title,
        text: news.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link berhasil disalin ke clipboard!");
    }
  };

  const isHTMLContent = (content: string) => {
    // Check if content contains HTML tags
    return /<[a-z][\s\S]*>/i.test(content);
  };

  const formatContent = (content: string) => {
    // If content contains HTML (from rich text editor), render as HTML
    if (isHTMLContent(content)) {
      return (
        <div 
          className="ql-editor-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }
    
    // Otherwise, format as plain text with line breaks
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      return (
        <p key={index} className="mb-4 leading-relaxed text-gray-700">
          {paragraph.trim()}
        </p>
      );
    }).filter(Boolean);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat berita...</p>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Berita Tidak Ditemukan</h1>
          <p className="text-muted-foreground mb-6">Berita yang Anda cari tidak tersedia.</p>
          <Button onClick={() => navigate("/news")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Berita
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/news")}
            className="text-primary hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Berita
          </Button>
        </div>

        {/* Article */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            {/* Header */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <Badge className={getCategoryColor(news.category)}>
                  {news.category}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleShare}
                  className="text-primary"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Bagikan
                </Button>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-primary leading-tight">
                {news.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{news.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Diterbitkan oleh {news.publishedBy || "Administrator"} pada {
                      news.publishedDate ? 
                        formatDate(news.publishedDate) : 
                        formatDate(news.date)
                    }
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>{news.views} views</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {news.image && (
              <div className="mb-8">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Excerpt */}
            <div className="mb-8 p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-lg text-primary font-medium leading-relaxed">
                {news.excerpt}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-base leading-relaxed news-content">
                {formatContent(news.content)}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="text-sm text-muted-foreground">
                  Diterbitkan oleh <span className="font-medium text-primary">{news.author}</span> pada {formatDate(news.date)}
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleShare}
                  className="text-primary"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Bagikan Berita
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related News Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Berita Terkait</h2>
          <div className="text-center py-8 text-muted-foreground">
            <p>Fitur berita terkait akan segera hadir...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
