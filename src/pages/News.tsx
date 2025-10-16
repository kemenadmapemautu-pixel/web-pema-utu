import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, User, Eye, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

// Categories including Press Release
const categories = [
  "Semua",
  "Press Release",
  "Program",
  "Kegiatan", 
  "Pendidikan",
  "Kemahasiswaan",
  "Prestasi",
  "Pengumuman"
];

export default function News() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const loadNewsData = () => {
      const savedNews = localStorage.getItem("newsList");
      if (savedNews) {
        try {
          const parsedNews = JSON.parse(savedNews);
          // Migrate existing news to add new fields
          const migratedNews = parsedNews.map((news: NewsItem) => ({
            ...news,
            publishedDate: news.publishedDate || new Date().toISOString().split('T')[0],
            publishedBy: news.publishedBy || "Administrator"
          }));
          setNewsData(migratedNews);
          
          // Save migrated data back to localStorage
          localStorage.setItem("newsList", JSON.stringify(migratedNews));
        } catch (error) {
          console.error("Error parsing news data:", error);
          setNewsData([]);
        }
      } else {
        setNewsData([]);
      }
    };

    loadNewsData();
    
    // Listen for storage changes (when data is updated from admin)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "newsList") {
        loadNewsData();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const allNews = newsData;

  const filteredNews = allNews.filter(news => {
    const matchesCategory = selectedCategory === "Semua" || news.category === selectedCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredNews = filteredNews.filter(news => news.featured);
  const regularNews = filteredNews.filter(news => !news.featured);

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

  return (
    <div className="min-h-screen py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">
            Warta <span className="text-gradient-accent">Pema</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Ikuti perkembangan terbaru kegiatan PEMA UTU dan berbagai program yang sedang berlangsung.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-3 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Cari berita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-smooth"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-primary mb-5">Berita Utama</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {featuredNews.map((news) => (
                <Card 
                  key={news.id} 
                  className="shadow-card hover:shadow-primary transition-smooth cursor-pointer group"
                  onClick={() => navigate(`/news/${news.id}`)}
                >
                  {news.image ? (
                    <img
                      src={news.image}
                      alt={news.title}
                      className="aspect-video w-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="aspect-video bg-gradient-primary rounded-t-lg flex items-center justify-center">
                      <div className="text-white/80 text-center">
                        <div className="text-4xl mb-2">📰</div>
                        <p className="text-sm">Berita PEMA UTU</p>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className={`${getCategoryColor(news.category)} text-xs`}>
                        {news.category}
                      </Badge>
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>
                            Diterbitkan oleh {news.publishedBy || "Administrator"} pada {
                              news.publishedDate ? 
                                formatDate(news.publishedDate) : 
                                formatDate(news.date)
                            }
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3.5 w-3.5" />
                          <span>{news.views}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-semibold text-primary group-hover:text-gold transition-smooth">
                      {news.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {news.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <User className="h-3.5 w-3.5" />
                        <span>{news.author}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gold group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {regularNews.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-primary mb-5">Berita Lainnya</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
              {regularNews.map((news) => (
                <Card 
                  key={news.id} 
                  className="shadow-card hover:shadow-primary transition-smooth cursor-pointer group"
                  onClick={() => navigate(`/news/${news.id}`)}
                >
                  {news.image ? (
                    <img
                      src={news.image}
                      alt={news.title}
                      className="aspect-video w-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="aspect-video bg-gradient-primary rounded-t-lg flex items-center justify-center">
                      <div className="text-white/80 text-center">
                        <div className="text-2xl mb-1">📰</div>
                        <p className="text-xs">PEMA UTU</p>
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className={`${getCategoryColor(news.category)} text-xs`}>
                        {news.category}
                      </Badge>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        <span>{news.views}</span>
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-primary group-hover:text-gold transition-smooth line-clamp-2">
                      {news.title}
                    </h3>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
                      {news.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{news.publishedBy || "Administrator"}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {news.publishedDate ? 
                            formatDate(news.publishedDate) : 
                            formatDate(news.date)
                          }
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-primary mb-2">Tidak ada berita ditemukan</h3>
            <p className="text-muted-foreground">Coba ubah kategori atau kata kunci pencarian Anda.</p>
          </div>
        )}

      </div>
    </div>
  );
}