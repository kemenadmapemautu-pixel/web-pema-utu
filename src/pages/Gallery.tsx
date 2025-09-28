import { useState } from "react";
import { Image, Play, Calendar, Eye, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MediaItem {
  id: string;
  title: string;
  type: "image" | "video";
  date: string;
  category: string;
  description: string;
  views: number;
  thumbnail: string;
}

const mediaItems: MediaItem[] = [
  {
    id: "1",
    title: "Pelantikan Kabinet Samgrahita 2024",
    type: "image",
    date: "2024-01-15",
    category: "Pelantikan",
    description: "Momen bersejarah pelantikan Kabinet Samgrahita periode 2024-2025",
    views: 2500,
    thumbnail: "/api/placeholder/400/300"
  },
  {
    id: "2",
    title: "Community Service Week - Desa Meunasah Blang",
    type: "image", 
    date: "2024-02-28",
    category: "Pengabdian",
    description: "Kegiatan bakti sosial di Desa Meunasah Blang bersama warga setempat",
    views: 1800,
    thumbnail: "/api/placeholder/400/300"
  },
  {
    id: "3",
    title: "Workshop Digital Marketing - Behind The Scene",
    type: "video",
    date: "2024-03-10",
    category: "Workshop",
    description: "Dokumentasi lengkap workshop digital marketing untuk UMKM",
    views: 3200,
    thumbnail: "/api/placeholder/400/300"
  },
  {
    id: "4",
    title: "Seminar Nasional Teknologi Pendidikan",
    type: "image",
    date: "2024-03-20",
    category: "Seminar",
    description: "Seminar nasional dengan tema teknologi dalam pendidikan modern",
    views: 1500,
    thumbnail: "/api/placeholder/400/300"
  },
  {
    id: "5",
    title: "Mental Health Awareness Campaign",
    type: "video",
    date: "2024-03-25",
    category: "Campaign",
    description: "Kampanye kesadaran kesehatan mental untuk mahasiswa UTU",
    views: 4100,
    thumbnail: "/api/placeholder/400/300"
  },
  {
    id: "6",
    title: "Rapat Koordinasi Kabinet Bulanan",
    type: "image",
    date: "2024-04-01",
    category: "Internal",
    description: "Rapat koordinasi rutin anggota kabinet bulan April 2024",
    views: 850,
    thumbnail: "/api/placeholder/400/300"
  },
  {
    id: "7",
    title: "Startup Incubator - Pitching Session",
    type: "video",
    date: "2024-04-05",
    category: "Entrepreneurship",
    description: "Sesi pitching dari peserta Startup Incubator UTU 2024",
    views: 2800,
    thumbnail: "/api/placeholder/400/300"
  },
  {
    id: "8",
    title: "Bakti Sosial Ramadan - Berbagi Takjil",
    type: "image",
    date: "2024-04-08",
    category: "Sosial",
    description: "Kegiatan berbagi takjil dan santunan di bulan Ramadan",
    views: 1950,
    thumbnail: "/api/placeholder/400/300"
  },
  {
    id: "9",
    title: "Tech Innovation Competition - Final",
    type: "video",
    date: "2024-04-12",
    category: "Kompetisi",
    description: "Final kompetisi inovasi teknologi dengan presentasi terbaik",
    views: 3600,
    thumbnail: "/api/placeholder/400/300"
  }
];

const categories = ["Semua", "Pelantikan", "Workshop", "Seminar", "Pengabdian", "Campaign", "Internal", "Entrepreneurship", "Sosial", "Kompetisi"];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const filteredItems = mediaItems.filter(item => {
    const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory;
    const matchesType = selectedType === "all" || item.type === selectedType;
    return matchesCategory && matchesType;
  });

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
      "Pelantikan": "bg-purple-100 text-purple-800",
      "Workshop": "bg-blue-100 text-blue-800",
      "Seminar": "bg-green-100 text-green-800",
      "Pengabdian": "bg-pink-100 text-pink-800",
      "Campaign": "bg-orange-100 text-orange-800",
      "Internal": "bg-gray-100 text-gray-800",
      "Entrepreneurship": "bg-yellow-100 text-yellow-800",
      "Sosial": "bg-red-100 text-red-800",
      "Kompetisi": "bg-indigo-100 text-indigo-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary">
            Galeri <span className="text-gradient-accent">Media</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dokumentasi visual dari berbagai kegiatan dan program PEMA UTU Kabinet Samgrahita.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12">
          <div className="flex-1">
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
          
          <div className="flex gap-2">
            <Button
              variant={selectedType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType("all")}
            >
              Semua Media
            </Button>
            <Button
              variant={selectedType === "image" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType("image")}
            >
              <Image className="h-4 w-4 mr-1" />
              Foto
            </Button>
            <Button
              variant={selectedType === "video" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType("video")}
            >
              <Play className="h-4 w-4 mr-1" />
              Video
            </Button>
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className="shadow-card hover:shadow-primary transition-smooth group cursor-pointer"
              onClick={() => setSelectedMedia(item)}
            >
              <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
                {/* Placeholder for actual image */}
                <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                  {item.type === "image" ? (
                    <Image className="h-12 w-12 text-white/70" />
                  ) : (
                    <Play className="h-12 w-12 text-white/70" />
                  )}
                </div>
                
                {/* Media Type Indicator */}
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
                    {item.type === "image" ? (
                      <Image className="h-4 w-4 text-white" />
                    ) : (
                      <Play className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>
                
                {/* Views Counter */}
                <div className="absolute bottom-4 right-4">
                  <div className="bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{item.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <Badge className={getCategoryColor(item.category)}>
                    {item.category}
                  </Badge>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-primary group-hover:text-gold transition-smooth line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-primary mb-2">Tidak ada media ditemukan</h3>
            <p className="text-muted-foreground">Coba ubah filter kategori atau tipe media untuk melihat konten lainnya.</p>
          </div>
        )}

        {/* Media Detail Modal */}
        {selectedMedia && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedMedia(null)}>
            <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="space-y-2">
                    <Badge className={getCategoryColor(selectedMedia.category)}>
                      {selectedMedia.category}
                    </Badge>
                    <h2 className="text-2xl font-bold text-primary">{selectedMedia.title}</h2>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedMedia(null)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
                  {selectedMedia.type === "image" ? (
                    <Image className="h-16 w-16 text-muted-foreground" />
                  ) : (
                    <Play className="h-16 w-16 text-muted-foreground" />
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-primary mb-3">Deskripsi</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedMedia.description}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Detail Media</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tanggal:</span>
                          <span>{formatDate(selectedMedia.date)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Kategori:</span>
                          <span>{selectedMedia.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tipe:</span>
                          <span className="capitalize">{selectedMedia.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Views:</span>
                          <span>{selectedMedia.views.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20">
          <Card className="gradient-primary text-white p-8 text-center">
            <CardContent className="space-y-6">
              <h2 className="text-3xl font-bold">Bagikan Momen Anda</h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Punya dokumentasi kegiatan PEMA UTU? Kirimkan kepada kami untuk ditampilkan di galeri media.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:media@pema.utu.ac.id" 
                  className="bg-gold text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gold-dark transition-smooth"
                >
                  Kirim Media
                </a>
                <a 
                  href="/contact" 
                  className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-smooth"
                >
                  Hubungi Tim Media
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}