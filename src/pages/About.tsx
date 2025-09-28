import { Target, Users, Award, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Integritas",
      description: "Berkomitmen pada kejujuran dan transparansi dalam setiap tindakan"
    },
    {
      icon: Users,
      title: "Kolaborasi",
      description: "Membangun kerjasama yang solid untuk mencapai tujuan bersama"
    },
    {
      icon: Award,
      title: "Prestasi",
      description: "Mengutamakan kualitas dan keunggulan dalam setiap program"
    },
    {
      icon: Lightbulb,
      title: "Inovasi",
      description: "Menciptakan solusi kreatif untuk tantangan kemahasiswaan"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary">
            Tentang <span className="text-gradient-accent">Kami</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            PEMA UTU Kabinet Samgrahita hadir sebagai representasi suara mahasiswa untuk membangun universitas yang lebih baik.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Sejarah Singkat</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Kabinet Samgrahita terbentuk pada tahun 2024 dengan semangat untuk mewujudkan 
                  "Satu Visi, Seribu Aksi". Nama "Samgrahita" berasal dari bahasa Sanskerta yang 
                  berarti "mengumpulkan" atau "menyatukan", mencerminkan komitmen kami untuk 
                  menyatukan seluruh elemen kampus dalam satu tujuan mulia.
                </p>
                <p>
                  Terpilih melalui proses demokrasi yang fair dan transparan, Kabinet Samgrahita 
                  membawa misi untuk menghadirkan perubahan nyata di lingkungan Universitas Teuku Umar. 
                  Dengan dukungan penuh dari mahasiswa, kami berkomitmen untuk mewujudkan program-program 
                  inovatif yang berdampak positif.
                </p>
                <p>
                  Tim yang terdiri dari mahasiswa-mahasiswa terpilih dari berbagai fakultas ini 
                  memiliki latar belakang yang beragam namun disatukan oleh visi yang sama: 
                  memajukan kehidupan kampus dan meningkatkan kualitas pendidikan di UTU.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="gradient-primary text-white p-8">
              <CardContent className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Filosofi Samgrahita</h3>
                  <p className="text-gold text-lg font-semibold">"Satu Visi, Seribu Aksi"</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-gold">Satu Visi</h4>
                    <p className="text-sm text-white/80">
                      Menyatukan seluruh civitas akademika dalam satu tujuan besar: 
                      membangun universitas yang unggul, inovatif, dan berdaya saing.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-gold">Seribu Aksi</h4>
                    <p className="text-sm text-white/80">
                      Mengimplementasikan berbagai program dan kegiatan nyata yang 
                      memberikan dampak positif bagi mahasiswa dan kemajuan universitas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Komitmen Kami</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Transparansi dan akuntabilitas dalam setiap kegiatan</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Partisipasi aktif mahasiswa dalam pengambilan keputusan</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Inovasi berkelanjutan dalam program kemahasiswaan</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Kerjasama dengan seluruh stakeholder universitas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">Nilai-Nilai Kami</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Empat nilai fundamental yang menjadi pedoman dalam setiap langkah dan keputusan kami
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center p-6 shadow-card hover:shadow-primary transition-smooth group">
                  <CardContent className="space-y-4">
                    <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto group-hover:animate-bounce">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-primary">{value.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}