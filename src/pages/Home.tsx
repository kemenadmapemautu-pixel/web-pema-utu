import { ArrowRight, Target, Users, Briefcase, Star, Sparkles, TrendingUp, Award, FileText, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-illustration.jpg";
import { useEffect, useState } from "react";
import { scrollToSection } from "@/lib/scrollUtils";

// Latest News Component
function LatestNews() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const savedNews = localStorage.getItem("newsList");
    if (savedNews) {
      const newsList = JSON.parse(savedNews);
      // Ambil 3 berita terbaru
      const latestNews = newsList.slice(0, 3);
      setNews(latestNews);
    }
  }, []);

  if (news.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-muted-foreground">Belum ada berita tersedia</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => (
        <Link key={item.id} to={`/news/${item.id}`}>
          <Card className="shadow-card hover:shadow-hover transition-all duration-300 border border-border/50 hover:border-primary/40 bg-card hover:bg-card/90 card-hover h-full">
            <CardContent className="p-0">
              {item.image && (
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              )}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-primary line-clamp-2 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {item.content.replace(/<[^>]*>/g, '').substring(0, 120)}...
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

interface StatsData {
  ministries: { value: string; label: string };
  programs: { value: string; label: string };
  members: { value: string; label: string };
}

const defaultStats: StatsData = {
  ministries: { value: "15+", label: "Kementerian" },
  programs: { value: "50+", label: "Program" },
  members: { value: "100+", label: "Pengurus" }
};

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState<StatsData>(defaultStats);
  
  // Auto scroll ke section jika ada parameter dari footer
  useEffect(() => {
    const sectionId = sessionStorage.getItem('scrollToSection');
    if (sectionId) {
      setTimeout(() => scrollToSection(sectionId), 300);
      sessionStorage.removeItem('scrollToSection');
    }
    
    // Trigger animations on mount
    setTimeout(() => setIsVisible(true), 100);

    // Load stats from localStorage
    const savedStats = localStorage.getItem('homeStats');
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    }
  }, []);

  // Smooth parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    const throttledScroll = () => {
      window.requestAnimationFrame(handleScroll);
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);
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
      {/* Hero Section with Background Image */}
      <section 
        id="beranda" 
        className="text-white pt-20 pb-12 md:pt-20 md:pb-16 lg:pt-22 lg:pb-20 min-h-[60vh] md:min-h-[65vh] flex items-center relative overflow-hidden"
      >
        {/* Background with parallax */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: `translate3d(0, ${scrollY * 0.3}px, 0)`,
          }}
        >
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(13,42,87,0.92)] via-[rgba(20,66,114,0.88)] to-[rgba(13,42,87,0.92)] z-[1]"></div>
          <div className="absolute inset-0 z-[2]" style={{
            background: `radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)`
          }}></div>
        </div>
        <div className="hero-content container mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="max-w-3xl mx-auto text-center">
              <div className="space-y-4 sm:space-y-6">
                {/* Badge with animation */}
                <div 
                  className={`inline-flex items-center gap-2 glass-card-strong px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{transitionDelay: '0.1s'}}
                >
                  <Sparkles className="h-3 w-3 text-yellow-400 animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-semibold text-yellow-400">Kabinet 2025-2026</span>
                </div>

                <h1 
                  className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{transitionDelay: '0.3s'}}
                >
                  <span className="block text-white/90 font-light text-base sm:text-lg md:text-xl lg:text-2xl mb-1.5">PEMA UTU</span>
                  <span className="text-gradient-accent inline-block drop-shadow-lg px-2 py-1">Kabinet Samgrahita</span>
                </h1>
                
                <div 
                  className={`space-y-3 sm:space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{transitionDelay: '0.5s'}}
                >
                  <div className="inline-flex items-center gap-2 bg-yellow-400/15 backdrop-blur-sm border border-yellow-400/30 px-3 py-1.5 rounded-full shadow-lg">
                    <Award className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                    <span className="text-xs sm:text-sm font-bold text-yellow-400">Satu Visi, Seribu Aksi</span>
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-white/85 leading-relaxed max-w-xl mx-auto">
                    Mewujudkan kepemimpinan mahasiswa yang responsif, aspiratif, dan berintegritas sebagai mitra strategis dalam menciptakan lingkungan kampus yang inovatif, inklusif, serta berdaya saing tinggi
                  </p>
                </div>

                {/* Stats Cards - Controlled by Admin */}
                <div 
                  className={`grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{transitionDelay: '0.7s'}}
                >
                  <div className="glass-card-strong p-2 sm:p-3 lg:p-4 rounded-lg text-center group hover:scale-105 hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/10 shadow-lg">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-400 mb-0.5">{stats.ministries.value}</div>
                    <div className="text-[9px] sm:text-[10px] lg:text-xs text-white/80 font-semibold">{stats.ministries.label}</div>
                  </div>
                  <div className="glass-card-strong p-2 sm:p-3 lg:p-4 rounded-lg text-center group hover:scale-105 hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/10 shadow-lg">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-400 mb-0.5">{stats.programs.value}</div>
                    <div className="text-[9px] sm:text-[10px] lg:text-xs text-white/80 font-semibold">{stats.programs.label}</div>
                  </div>
                  <div className="glass-card-strong p-2 sm:p-3 lg:p-4 rounded-lg text-center group hover:scale-105 hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/10 shadow-lg">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-400 mb-0.5">{stats.members.value}</div>
                    <div className="text-[9px] sm:text-[10px] lg:text-xs text-white/80 font-semibold">{stats.members.label}</div>
                  </div>
                </div>
              </div>
              
              <div 
                className={`flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{transitionDelay: '0.9s'}}
              >
                <Button asChild size="default" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold shadow-gold hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-sm">
                  <Link to="/about">
                    <span>Pelajari Lebih Lanjut</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="default" variant="outline" className="border-2 border-white/30 bg-white/10 backdrop-blur-md text-white font-bold hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 active:scale-95 text-sm">
                  <Link to="/cabinet">
                    <span>Lihat Kabinet</span>
                    <Users className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section id="keunggulan" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.05),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="text-center space-y-4 sm:space-y-5 mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 shadow-sm">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-xs sm:text-sm font-bold text-primary">Keunggulan Kami</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
              Empat Pilar Utama
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Kekuatan yang menjadi fondasi PEMA UTU Kabinet Samgrahita
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
            {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return <Card 
              key={index} 
              className="text-center shadow-card hover:shadow-hover transition-all duration-300 group border border-border/50 hover:border-primary/40 bg-card hover:bg-card/90 card-hover"
            >
                  <CardContent className="space-y-3 p-4 sm:p-5 lg:p-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-primary">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-primary group-hover:text-gold transition-colors">{highlight.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{highlight.description}</p>
                    </div>
                  </CardContent>
                </Card>;
          })}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section id="berita-terbaru" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 shadow-sm">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-xs sm:text-sm font-bold text-primary">Warta Terkini</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
              Berita Terbaru
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Informasi dan kegiatan terbaru dari PEMA UTU
            </p>
          </div>
          
          <LatestNews />
        </div>
      </section>

      {/* Quick Access Section */}
      <section id="akses-cepat" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-[32rem] lg:h-[32rem] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-[32rem] lg:h-[32rem] bg-yellow-400/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="text-center space-y-4 sm:space-y-5 mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 rounded-full border border-yellow-400/20 shadow-sm">
              <TrendingUp className="h-4 w-4 text-yellow-600" />
              <span className="text-xs sm:text-sm font-bold text-yellow-600">Navigasi Cepat</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
              Akses Cepat
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Temukan informasi yang Anda butuhkan dengan mudah dan cepat
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="shadow-card hover:shadow-hover transition-all duration-300 group border border-border/50 hover:border-primary/40 bg-card hover:bg-card/90 card-hover">
              <CardContent className="p-5 lg:p-6 text-center space-y-4">
                <div className="w-14 h-14 lg:w-16 lg:h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-primary">
                  <Users className="h-7 w-7 lg:h-8 lg:w-8 text-white" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg lg:text-xl font-bold text-primary group-hover:text-gold transition-colors">Kabinet</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">Kenali tim kabinet dan struktur organisasi kami</p>
                </div>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-bold transition-all duration-300 hover:shadow-primary text-base">
                  <Link to="/cabinet">
                    <span>Lihat Kabinet</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="shadow-hover hover:shadow-lg-custom transition-all duration-300 group border-2 border-yellow-400/30 hover:border-yellow-400/50 bg-gradient-to-br from-yellow-400/10 to-card hover:from-yellow-400/15 card-hover relative">
              <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow-md">Populer</div>
              <CardContent className="p-5 lg:p-6 text-center space-y-4">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-gold">
                  <Briefcase className="h-7 w-7 lg:h-8 lg:w-8 text-gray-900" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg lg:text-xl font-bold text-primary group-hover:text-yellow-600 transition-colors">Program Kerja</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">Jelajahi program-program inovatif kami</p>
                </div>
                <Button asChild className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold transition-all duration-300 hover:shadow-gold text-base">
                  <Link to="/programs">
                    <span>Lihat Program</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="shadow-card hover:shadow-hover transition-all duration-300 group border border-border/50 hover:border-primary/40 bg-card hover:bg-card/90 card-hover">
              <CardContent className="p-5 lg:p-6 text-center space-y-4">
                <div className="w-14 h-14 lg:w-16 lg:h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-primary">
                  <Star className="h-7 w-7 lg:h-8 lg:w-8 text-white" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg lg:text-xl font-bold text-primary group-hover:text-gold transition-colors">Warta Pema</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">Ikuti berita dan kegiatan terbaru kami</p>
                </div>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-bold transition-all duration-300 hover:shadow-primary text-base">
                  <Link to="/news">
                    <span>Baca Berita</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>;
}