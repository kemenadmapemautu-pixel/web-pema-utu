import { useState } from "react";
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
}

const newsData: NewsItem[] = [
  {
    id: "1",
    title: "PEMA UTU Luncurkan Program Learning Hub Digital",
    excerpt: "Platform inovatif untuk mendukung pembelajaran kolaboratif antar mahasiswa dengan fitur-fitur modern dan user-friendly.",
    content: "PEMA UTU dengan bangga mengumumkan peluncuran Learning Hub Digital, sebuah platform revolusioner yang dirancang untuk memfasilitasi pembelajaran kolaboratif di kalangan mahasiswa...",
    author: "Tim Redaksi PEMA",
    date: "2024-03-15",
    category: "Program",
    views: 1250,
    featured: true
  },
  {
    id: "2", 
    title: "Sukses Penyelenggaraan Community Service Week 2024",
    excerpt: "Lebih dari 1000 mahasiswa berpartisipasi dalam kegiatan pengabdian masyarakat yang menjangkau 15 desa di sekitar kampus.",
    content: "Community Service Week 2024 telah berhasil diselenggarakan dengan antusiasme yang luar biasa dari seluruh civitas akademika UTU...",
    author: "Fatimah Azzahra",
    date: "2024-03-10",
    category: "Kegiatan",
    views: 890,
    featured: true
  },
  {
    id: "3",
    title: "Mentor-Mentee Program Semester Genap Dibuka",
    excerpt: "Pendaftaran program pembimbingan akademik dan personal development untuk mahasiswa baru telah resmi dibuka.",
    content: "PEMA UTU mengundang seluruh mahasiswa untuk berpartisipasi dalam program Mentor-Mentee yang telah terbukti efektif...",
    author: "Rizki Pratama", 
    date: "2024-03-08",
    category: "Pendidikan",
    views: 654,
    featured: false
  },
  {
    id: "4",
    title: "Persiapan Tech Innovation Competition 2024",
    excerpt: "Kompetisi teknologi terbesar di UTU akan segera dimulai dengan hadiah total ratusan juta rupiah.",
    content: "Setelah sukses tahun lalu, Tech Innovation Competition kembali diselenggarakan dengan skala yang lebih besar...",
    author: "Tim Teknologi PEMA",
    date: "2024-03-05",
    category: "Kompetisi",
    views: 1100,
    featured: false
  },
  {
    id: "5",
    title: "Workshop Mental Health Awareness Raih Antusiasme Tinggi",
    excerpt: "Program kesehatan mental mendapat sambutan positif dengan partisipasi lebih dari 300 mahasiswa.",
    content: "Workshop Mental Health Awareness yang diselenggarakan PEMA UTU berhasil menarik perhatian mahasiswa...",
    author: "Tim Kesejahteraan",
    date: "2024-03-01",
    category: "Kesejahteraan", 
    views: 745,
    featured: false
  },
  {
    id: "6",
    title: "Startup Incubator UTU: Wujudkan Impian Wirausaha",
    excerpt: "Program inkubasi bisnis siap mendukung mahasiswa yang memiliki jiwa kewirausahaan dengan mentoring profesional.",
    content: "PEMA UTU meluncurkan program Startup Incubator yang dirancang khusus untuk mengembangkan potensi kewirausahaan mahasiswa...",
    author: "Siti Nurhaliza",
    date: "2024-02-28",
    category: "Kewirausahaan",
    views: 567,
    featured: false
  }
];

const categories = ["Semua", "Program", "Kegiatan", "Pendidikan", "Kompetisi", "Kesejahteraan", "Kewirausahaan"];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const filteredNews = newsData.filter(news => {
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
      "Kompetisi": "bg-orange-100 text-orange-800",
      "Kesejahteraan": "bg-pink-100 text-pink-800",
      "Kewirausahaan": "bg-yellow-100 text-yellow-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary">
            Berita & <span className="text-gradient-accent">Kegiatan</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ikuti perkembangan terbaru kegiatan PEMA UTU dan berbagai program yang sedang berlangsung.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12">
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
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-primary mb-8">Berita Utama</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map((news) => (
                <Card 
                  key={news.id} 
                  className="shadow-card hover:shadow-primary transition-smooth cursor-pointer group"
                  onClick={() => setSelectedNews(news)}
                >
                  <div className="aspect-video bg-gradient-primary rounded-t-lg"></div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className={getCategoryColor(news.category)}>
                        {news.category}
                      </Badge>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(news.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{news.views}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-primary group-hover:text-gold transition-smooth">
                      {news.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {news.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{news.author}</span>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gold group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular News */}
        {regularNews.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-primary mb-8">Berita Lainnya</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularNews.map((news) => (
                <Card 
                  key={news.id} 
                  className="shadow-card hover:shadow-primary transition-smooth cursor-pointer group"
                  onClick={() => setSelectedNews(news)}
                >
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getCategoryColor(news.category)}>
                        {news.category}
                      </Badge>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        <span>{news.views}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-primary group-hover:text-gold transition-smooth line-clamp-2">
                      {news.title}
                    </h3>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {news.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{news.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(news.date)}</span>
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
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-primary mb-2">Tidak ada berita ditemukan</h3>
            <p className="text-muted-foreground">Coba ubah kategori atau kata kunci pencarian Anda.</p>
          </div>
        )}

        {/* News Detail Modal */}
        {selectedNews && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedNews(null)}>
            <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Badge className={getCategoryColor(selectedNews.category)}>
                      {selectedNews.category}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedNews(null)}>
                      ✕
                    </Button>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-primary">{selectedNews.title}</h1>
                  
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{selectedNews.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(selectedNews.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>{selectedNews.views} views</span>
                    </div>
                  </div>
                  
                  <div className="aspect-video bg-gradient-primary rounded-lg"></div>
                  
                  <div className="prose max-w-none">
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {selectedNews.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}