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
    <div className="min-h-screen py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
            Tentang <span className="text-gradient-accent drop-shadow-lg">Kami</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            PEMA UTU Kabinet Samgrahita hadir sebagai representasi suara mahasiswa untuk membangun universitas yang lebih baik.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-12 lg:mb-16">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-4">Sejarah Singkat</h2>
              <div className="space-y-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
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

          <div className="space-y-6">
            <Card className="gradient-primary text-white p-5 sm:p-6 shadow-lg-custom border border-white/10">
              <CardContent className="space-y-4">
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Filosofi Samgrahita</h3>
                  <p className="text-gold text-base sm:text-lg font-bold">"Satu Visi, Seribu Aksi"</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold mb-2 text-gold text-base sm:text-lg">Satu Visi</h4>
                    <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                      Menyatukan seluruh civitas akademika dalam satu tujuan besar: 
                      membangun universitas yang unggul, inovatif, dan berdaya saing.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-2 text-gold text-base sm:text-lg">Seribu Aksi</h4>
                    <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                      Mengimplementasikan berbagai program dan kegiatan nyata yang 
                      memberikan dampak positif bagi mahasiswa dan kemajuan universitas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-4">Komitmen Kami</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0 shadow-gold"></div>
                  <span className="text-muted-foreground text-sm sm:text-base leading-relaxed">Transparansi dan akuntabilitas dalam setiap kegiatan</span>
                </li>
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0 shadow-gold"></div>
                  <span className="text-muted-foreground text-sm sm:text-base leading-relaxed">Partisipasi aktif mahasiswa dalam pengambilan keputusan</span>
                </li>
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0 shadow-gold"></div>
                  <span className="text-muted-foreground text-sm sm:text-base leading-relaxed">Inovasi berkelanjutan dalam program kemahasiswaan</span>
                </li>
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0 shadow-gold"></div>
                  <span className="text-muted-foreground text-sm sm:text-base leading-relaxed">Kerjasama dengan seluruh stakeholder universitas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-3">Nilai-Nilai Kami</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Empat nilai fundamental yang menjadi pedoman dalam setiap langkah dan keputusan kami
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center p-4 lg:p-5 shadow-card hover:shadow-hover transition-all duration-300 group border border-border/50 hover:border-primary/40 bg-card hover:bg-card/90 card-hover">
                  <CardContent className="space-y-3">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 gradient-primary rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-primary">
                      <Icon className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-primary group-hover:text-gold transition-colors">{value.title}</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{value.description}</p>
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