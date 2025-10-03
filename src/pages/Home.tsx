import { ArrowRight, Target, Users, Briefcase, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-illustration.png";
export default function Home() {
  const highlights = [{
    icon: Target,
    title: "Visi Jelas",
    description: "Mewujudkan mahasiswa yang berkarakter dan berprestasi"
  }, {
    icon: Users,
    title: "Tim Solid",
    description: "Kabinet yang kompak dengan komitmen tinggi"
  }, {
    icon: Briefcase,
    title: "Program Terbaik",
    description: "Inovasi program kerja untuk kemajuan kampus"
  }, {
    icon: Star,
    title: "Prestasi Nyata",
    description: "Hasil kerja yang terukur dan berdampak positif"
  }];
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  PEMA UTU
                  <br />
                  <span className="text-gradient-accent">Kabinet Samgrahita</span>
                </h1>
                <p className="text-xl lg:text-2xl font-semibold text-gold">
                  Samgrahita: Satu Visi, Seribu Aksi
                </p>
                <p className="text-lg text-white/80 leading-relaxed max-w-md">Mewujudkan kepemimpinan  mahasiswa yang responsif, aspiratif, dan berintegritas sebagai mitra strategis dalam menciptakan lingkungan kampus yang inovatif, inklusif, serta berdaya saing tinggi </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-primary font-semibold shadow-gold">
                  <Link to="/about">
                    Pelajari Lebih Lanjut
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Link 
                  to="/cabinet"
                  className="inline-flex items-center justify-center border border-yellow-400 text-yellow-400 font-semibold px-5 py-3 rounded-xl hover:bg-yellow-400 hover:text-black transition"
                >
                  Lihat Kabinet
                </Link>
              </div>
            </div>
            
            <div className="lg:order-2 animate-float">
              <img src={heroImage} alt="3D illustration representing digital innovation and connectivity" className="w-full h-auto max-w-lg mx-auto" />
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-gold/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">
              Keunggulan Kami
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Empat pilar utama yang menjadi kekuatan PEMA UTU Kabinet Samgrahita
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return <Card key={index} className="text-center p-6 shadow-card hover:shadow-primary transition-smooth group">
                  <CardContent className="space-y-4">
                    <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto group-hover:animate-bounce">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-primary">{highlight.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{highlight.description}</p>
                    </div>
                  </CardContent>
                </Card>;
          })}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">
              Akses Cepat
            </h2>
            <p className="text-lg text-muted-foreground">
              Temukan informasi yang Anda butuhkan dengan mudah
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-card hover:shadow-primary transition-smooth group">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary">Kabinet</h3>
                <p className="text-muted-foreground">Kenali tim kabinet dan struktur organisasi kami</p>
                <Button asChild className="w-full" variant="outline">
                  <Link to="/cabinet">Lihat Kabinet</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="shadow-card hover:shadow-primary transition-smooth group">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary">Program Kerja</h3>
                <p className="text-muted-foreground">Jelajahi program-program inovatif kami</p>
                <Button asChild className="w-full" variant="outline">
                  <Link to="/programs">Lihat Program</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="shadow-card hover:shadow-primary transition-smooth group">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary">Warta Pema</h3>
                <p className="text-muted-foreground">Ikuti berita dan kegiatan terbaru kami</p>
                <Button asChild className="w-full" variant="outline">
                  <Link to="/news">Baca Berita</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>;
}