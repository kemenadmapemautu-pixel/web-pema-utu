import { useState } from "react";
import { Image, Play, Calendar, Eye, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGallery } from "@/contexts/GalleryContext";

interface MediaItem {
  id: string;
  title: string;
  type: "image" | "video";
  date: string;
  category: string;
  description: string;
  views: number;
  thumbnail: string;
  url?: string;
  uploadedBy?: string;
  createdAt?: string;
}

const dummyMediaItems: MediaItem[] = [
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
  // PERBAIKAN: Gunakan Context untuk mendapatkan data dari admin
  const { galleryItems: mediaItems } = useGallery();
  
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  // Debug: Log jumlah items
  console.log("Gallery - Total items:", mediaItems.length);
  console.log("Gallery - Items:", mediaItems);

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
    <div className="min-h-screen py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">
            Galeri <span className="text-gradient-accent">Media</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Dokumentasi visual dari berbagai kegiatan dan program PEMA UTU Kabinet Samgrahita.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-3 mb-8">
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
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Image className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Galeri Masih Kosong</h3>
            <p className="text-muted-foreground mb-4">
              {mediaItems.length === 0 
                ? "Belum ada media yang diupload. Admin dapat menambahkan foto dan video melalui dashboard."
                : "Tidak ada media yang sesuai dengan filter yang dipilih."}
            </p>
            <p className="text-sm text-muted-foreground">
              Total media tersedia: <strong>{mediaItems.length}</strong>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
            {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className="shadow-card hover:shadow-primary transition-smooth group cursor-pointer"
              onClick={() => setSelectedMedia(item)}
            >
              <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
                {/* Display actual thumbnail */}
                {item.thumbnail ? (
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                    {item.type === "image" ? (
                      <Image className="h-12 w-12 text-white/70" />
                    ) : (
                      <Play className="h-12 w-12 text-white/70" />
                    )}
                  </div>
                )}
                
                {/* Media Type Indicator */}
                <div className="absolute top-2 right-2">
                  <div className="w-7 h-7 bg-black/50 rounded-full flex items-center justify-center">
                    {item.type === "image" ? (
                      <Image className="h-3.5 w-3.5 text-white" />
                    ) : (
                      <Play className="h-3.5 w-3.5 text-white" />
                    )}
                  </div>
                </div>
                
                {/* Views Counter */}
                <div className="absolute bottom-2 right-2">
                  <div className="bg-black/50 text-white text-xs px-2 py-0.5 rounded-full flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{item.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <Badge className={`${getCategoryColor(item.category)} text-xs`}>
                    {item.category}
                  </Badge>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs">{formatDate(item.date)}</span>
                  </div>
                </div>
                
                <h3 className="text-sm sm:text-base font-semibold text-primary group-hover:text-gold transition-smooth line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
          </div>
        )}

        {/* Media Detail Modal */}
        {selectedMedia && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedMedia(null)}>
            <div className="bg-background rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-1.5">
                    <Badge className={`${getCategoryColor(selectedMedia.category)} text-xs`}>
                      {selectedMedia.category}
                    </Badge>
                    <h2 className="text-lg sm:text-xl font-bold text-primary">{selectedMedia.title}</h2>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedMedia(null)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                  {selectedMedia.type === "image" ? (
                    selectedMedia.thumbnail ? (
                      <img
                        src={selectedMedia.thumbnail}
                        alt={selectedMedia.title}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )
                  ) : (
                    selectedMedia.url ? (
                      <div className="w-full h-full">
                        {selectedMedia.url.includes('youtube.com') || selectedMedia.url.includes('youtu.be') ? (
                          <iframe
                            width="100%"
                            height="100%"
                            src={selectedMedia.url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                            title={selectedMedia.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-lg"
                          />
                        ) : (
                          <video
                            controls
                            className="w-full h-full rounded-lg"
                            src={selectedMedia.url}
                          >
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                    ) : selectedMedia.thumbnail ? (
                      <video
                        controls
                        className="w-full h-full rounded-lg"
                        src={selectedMedia.thumbnail}
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Play className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <h3 className="text-base font-semibold text-primary mb-2">Deskripsi</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedMedia.description}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-2">Detail Media</h4>
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
      </div>
    </div>
  );
}