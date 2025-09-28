import { BookOpen, Users, Lightbulb, Trophy, Heart, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Program {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "active" | "planned" | "completed";
  impact: string;
  timeline: string;
  participants: string;
}

const programs: Program[] = [
  {
    id: "1",
    title: "UTU Learning Hub",
    description: "Platform digital untuk berbagi materi pembelajaran, tutorial, dan sumber daya akademik antar mahasiswa dari berbagai jurusan.",
    category: "education",
    status: "active",
    impact: "500+ mahasiswa terdaftar",
    timeline: "Januari - Desember 2024",
    participants: "Semua mahasiswa UTU"
  },
  {
    id: "2",
    title: "Mentor-Mentee Program",
    description: "Program bimbingan akademik dan personal development yang menghubungkan mahasiswa senior dengan junior.",
    category: "education",
    status: "active",
    impact: "200 pasang mentor-mentee",
    timeline: "Februari - November 2024",
    participants: "Mahasiswa tahun 1-4"
  },
  {
    id: "3",
    title: "Startup Incubator UTU",
    description: "Program inkubasi bisnis untuk mahasiswa yang memiliki ide kewirausahaan dengan mentoring dan funding support.",
    category: "entrepreneurship",
    status: "planned",
    impact: "Target 20 startup baru",
    timeline: "Maret - Desember 2024",
    participants: "Mahasiswa dengan ide bisnis"
  },
  {
    id: "4",
    title: "Community Service Week",
    description: "Program pengabdian masyarakat rutin yang melibatkan seluruh mahasiswa untuk berkontribusi pada masyarakat sekitar.",
    category: "social",
    status: "completed",
    impact: "15 desa terdampak",
    timeline: "Februari 2024",
    participants: "1000+ mahasiswa"
  },
  {
    id: "5",
    title: "Tech Innovation Competition",
    description: "Kompetisi tahunan untuk mengembangkan solusi teknologi inovatif yang dapat memecahkan masalah sosial.",
    category: "technology",
    status: "planned",
    impact: "Target 100 tim peserta",
    timeline: "September - November 2024",
    participants: "Tim mahasiswa teknik"
  },
  {
    id: "6",
    title: "Mental Health Awareness",
    description: "Program kesehatan mental yang menyediakan konseling, workshop, dan support group untuk mahasiswa.",
    category: "wellness",
    status: "active",
    impact: "300+ mahasiswa terlayani",
    timeline: "Januari - Desember 2024",
    participants: "Seluruh mahasiswa UTU"
  }
];

const categories = [
  { id: "all", name: "Semua Program", icon: Globe },
  { id: "education", name: "Pendidikan", icon: BookOpen },
  { id: "social", name: "Kemahasiswaan", icon: Users },
  { id: "technology", name: "Teknologi", icon: Lightbulb },
  { id: "entrepreneurship", name: "Kewirausahaan", icon: Trophy },
  { id: "wellness", name: "Kesejahteraan", icon: Heart }
];

export default function Programs() {
  const getStatusBadge = (status: Program["status"]) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      planned: "bg-blue-100 text-blue-800", 
      completed: "bg-gray-100 text-gray-800"
    };
    
    const labels = {
      active: "Aktif",
      planned: "Direncanakan",
      completed: "Selesai"
    };
    
    return (
      <Badge className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const getCategoryIcon = (category: string) => {
    const categoryMap = {
      education: BookOpen,
      social: Users,
      technology: Lightbulb,
      entrepreneurship: Trophy,
      wellness: Heart
    };
    return categoryMap[category as keyof typeof categoryMap] || Globe;
  };

  const filterPrograms = (category: string) => {
    if (category === "all") return programs;
    return programs.filter(program => program.category === category);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary">
            Program <span className="text-gradient-accent">Kerja</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Berbagai program inovatif yang dirancang untuk memajukan kehidupan kampus dan mengembangkan potensi mahasiswa UTU.
          </p>
        </div>

        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filterPrograms(category.id).map((program) => {
                  const CategoryIcon = getCategoryIcon(program.category);
                  return (
                    <Card key={program.id} className="shadow-card hover:shadow-primary transition-smooth group">
                      <CardHeader className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center group-hover:animate-bounce">
                            <CategoryIcon className="h-6 w-6 text-white" />
                          </div>
                          {getStatusBadge(program.status)}
                        </div>
                        <CardTitle className="text-xl text-primary group-hover:text-gold transition-smooth">
                          {program.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {program.description}
                        </p>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="font-medium text-primary">Dampak:</span>
                            <span className="text-muted-foreground">{program.impact}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-primary">Timeline:</span>
                            <span className="text-muted-foreground">{program.timeline}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-primary">Peserta:</span>
                            <span className="text-muted-foreground">{program.participants}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Call to Action */}
        <div className="mt-20">
          <Card className="gradient-primary text-white p-8 text-center">
            <CardContent className="space-y-6">
              <h2 className="text-3xl font-bold">Punya Ide Program?</h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Kami selalu terbuka untuk ide dan saran program baru dari mahasiswa. 
                Mari bersama-sama membangun universitas yang lebih baik!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:programs@pema.utu.ac.id" 
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