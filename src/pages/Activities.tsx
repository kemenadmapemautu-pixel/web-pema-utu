import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, ExternalLink, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  participants: number;
  maxParticipants?: number;
  status: "upcoming" | "ongoing" | "completed";
  organizer: string;
  registrationLink?: string;
}

const categories = ["Semua", "Workshop", "Seminar", "Kompetisi", "Talkshow", "Pelatihan", "Sosial"];

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    const saved = localStorage.getItem("activities");
    if (saved) {
      try {
        setActivities(JSON.parse(saved));
      } catch (error) {
        console.error("Error parsing activities:", error);
      }
    }
  }, []);

  const filteredActivities = activities.filter(activity => {
    const matchesCategory = selectedCategory === "Semua" || activity.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || activity.status === selectedStatus;
    return matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: Activity["status"]) => {
    const variants = {
      upcoming: "bg-blue-100 text-blue-800",
      ongoing: "bg-green-100 text-green-800",
      completed: "bg-gray-100 text-gray-800"
    };
    
    const labels = {
      upcoming: "Akan Datang",
      ongoing: "Sedang Berlangsung", 
      completed: "Selesai"
    };
    
    return (
      <Badge className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Workshop": "bg-purple-100 text-purple-800",
      "Seminar": "bg-blue-100 text-blue-800",
      "Kompetisi": "bg-orange-100 text-orange-800",
      "Talkshow": "bg-green-100 text-green-800",
      "Pelatihan": "bg-yellow-100 text-yellow-800",
      "Sosial": "bg-pink-100 text-pink-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary">
            Kegiatan & <span className="text-gradient-accent">Acara</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ikuti berbagai kegiatan menarik yang diselenggarakan PEMA UTU untuk pengembangan diri dan kontribusi sosial.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              <Filter className="h-5 w-5 text-muted-foreground mt-2" />
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
              variant={selectedStatus === "all" ? "default" : "outline"}
              size="sm" 
              onClick={() => setSelectedStatus("all")}
            >
              Semua Status
            </Button>
            <Button
              variant={selectedStatus === "upcoming" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("upcoming")}
            >
              Mendatang
            </Button>
            <Button
              variant={selectedStatus === "ongoing" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("ongoing")}
            >
              Berlangsung
            </Button>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActivities.map((activity) => (
            <Card key={activity.id} className="shadow-card hover:shadow-primary transition-smooth group">
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <Badge className={getCategoryColor(activity.category)}>
                    {activity.category}
                  </Badge>
                  {getStatusBadge(activity.status)}
                </div>
                
                <CardTitle className="text-xl text-primary group-hover:text-gold transition-smooth">
                  {activity.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {activity.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-gold" />
                    <span className="font-medium">{formatDate(activity.date)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gold" />
                    <span>{activity.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4 text-gold" />
                    <span>
                      {activity.participants} peserta
                      {activity.maxParticipants && ` / ${activity.maxParticipants} maks`}
                    </span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      <p>Penyelenggara:</p>
                      <p className="font-medium text-primary">{activity.organizer}</p>
                    </div>
                    
                    {activity.registrationLink && activity.status === "upcoming" && (
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Daftar
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-primary mb-2">Tidak ada kegiatan ditemukan</h3>
            <p className="text-muted-foreground">Coba ubah filter kategori atau status untuk melihat kegiatan lainnya.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20">
          <Card className="gradient-primary text-white p-8 text-center">
            <CardContent className="space-y-6">
              <h2 className="text-3xl font-bold">Punya Ide Kegiatan?</h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Kami selalu terbuka untuk ide kegiatan baru dan kerjasama yang bermanfaat bagi mahasiswa dan masyarakat. 
                Sampaikan proposal kegiatan Anda kepada kami!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:activities@pema.utu.ac.id" 
                  className="bg-gold text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gold-dark transition-smooth"
                >
                  Kirim Proposal
                </a>
                <a 
                  href="/contact" 
                  className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-smooth"
                >
                  Hubungi Kami
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}