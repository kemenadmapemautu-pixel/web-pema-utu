import { Target, Eye, Compass, Star, Lightbulb, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function VisionMission() {
  const missionPoints = [
    {
      icon: Users,
      title: "Memperkuat Solidaritas",
      description: "Membangun kebersamaan dan solidaritas di antara seluruh mahasiswa UTU melalui berbagai program kolaboratif."
    },
    {
      icon: Lightbulb,
      title: "Mengembangkan Inovasi",
      description: "Mendorong kreativitas dan inovasi mahasiswa dalam bidang akademik, teknologi, dan kewirausahaan."
    },
    {
      icon: Star,
      title: "Meningkatkan Prestasi",
      description: "Memfasilitasi mahasiswa untuk meraih prestasi terbaik di tingkat regional, nasional, dan internasional."
    },
    {
      icon: Compass,
      title: "Menjadi Jembatan Aspirasi",
      description: "Menyalurkan aspirasi mahasiswa kepada pihak universitas dan stakeholder terkait secara efektif."
    }
  ];

  const values = [
    {
      title: "Transparansi",
      description: "Keterbukaan dalam setiap proses pengambilan keputusan dan pertanggungjawaban program kerja.",
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Integritas", 
      description: "Konsistensi antara ucapan dan tindakan dengan menjunjung tinggi nilai-nilai moral.",
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Kolaborasi",
      description: "Kerjasama yang sinergis dengan seluruh elemen kampus untuk mencapai tujuan bersama.",
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "Inovasi",
      description: "Pemikiran kreatif dan solusi inovatif dalam menghadapi tantangan kemahasiswaan.",
      color: "bg-orange-100 text-orange-800"
    },
    {
      title: "Dedikasi",
      description: "Komitmen penuh dalam melayani kepentingan mahasiswa dan kemajuan universitas.",
      color: "bg-pink-100 text-pink-800"
    },
    {
      title: "Adaptabilitas",
      description: "Kemampuan untuk beradaptasi dengan perubahan zaman dan kebutuhan mahasiswa.",
      color: "bg-indigo-100 text-indigo-800"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary">
            Visi & <span className="text-gradient-accent">Misi</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fondasi ideologi yang mengarahkan setiap langkah dan keputusan PEMA UTU Kabinet Samgrahita.
          </p>
        </div>

        {/* Vision Section */}
        <div className="mb-20">
          <Card className="gradient-primary text-white p-8 lg:p-12">
            <CardContent className="text-center space-y-8">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center">
                  <Eye className="h-10 w-10 text-primary" />
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-gold">VISI</h2>
                <p className="text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto font-medium">
                  "Mewujudkan PEMA UTU sebagai organisasi mahasiswa yang inovatif, representatif, 
                  dan berdaya saing tinggi dalam membangun generasi mahasiswa yang berkarakter, 
                  berprestasi, dan berkontribusi positif bagi masyarakat."
                </p>
              </div>
              
              <div className="pt-4">
                <p className="text-lg text-white/80 italic">
                  Samgrahita: Satu Visi, Seribu Aksi
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center">
                <Target className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">MISI</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Empat pilar utama yang menjadi panduan dalam merealisasikan visi kami
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missionPoints.map((mission, index) => {
              const Icon = mission.icon;
              return (
                <Card key={index} className="shadow-card hover:shadow-primary transition-smooth group">
                  <CardContent className="p-8 space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 group-hover:animate-bounce">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-primary group-hover:text-gold transition-smooth">
                          {mission.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {mission.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Nilai-Nilai Dasar</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Prinsip-prinsip fundamental yang menjadi landasan karakter dan budaya kerja kami
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="shadow-card hover:shadow-primary transition-smooth group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${value.color}`}>
                    {value.title}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="gradient-primary text-white p-8">
            <CardContent className="space-y-6">
              <h2 className="text-3xl font-bold">Mari Bersama Mewujudkan Visi</h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Bergabunglah dengan kami dalam mewujudkan universitas yang lebih baik. 
                Setiap kontribusi Anda sangat berarti untuk kemajuan bersama.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="bg-gold text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gold-dark transition-smooth"
                >
                  Hubungi Kami
                </a>
                <a 
                  href="/programs" 
                  className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-smooth"
                >
                  Lihat Program
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}