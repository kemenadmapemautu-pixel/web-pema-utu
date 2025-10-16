import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Home, Users, Target, Briefcase, FileText, Mail, LogIn, LayoutDashboard, Image, Calendar, Eye, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { scrollToSection } from "@/lib/scrollUtils";
import pemaLogo from "@/assets/pema-logo.png";
import kabinetLogo from "@/assets/kabinet-logo.png";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Menu yang ditampilkan di header desktop
const headerNavItems = [{
  name: "Beranda",
  path: "/",
  icon: Home
}, {
  name: "Tentang Kami",
  path: "/about",
  icon: Target
}, {
  name: "Kabinet",
  path: "/cabinet",
  icon: Users
}, {
  name: "Galeri",
  path: "/gallery",
  icon: Image
}, {
  name: "Program Kerja",
  path: "/programs",
  icon: Briefcase
}, {
  name: "Warta Pema",
  path: "/news",
  icon: FileText
}];

// Semua menu (untuk hamburger menu & mobile)
const allNavItems = [{
  name: "Beranda",
  path: "/",
  icon: Home
}, {
  name: "Tentang Kami",
  path: "/about",
  icon: Target
}, {
  name: "Kabinet",
  path: "/cabinet",
  icon: Users
}, {
  name: "Kementerian",
  path: "/ministries",
  icon: Building2
}, {
  name: "Visi & Misi",
  path: "/vision-mission",
  icon: Eye
}, {
  name: "Program Kerja",
  path: "/programs",
  icon: Briefcase
}, {
  name: "Kegiatan",
  path: "/activities",
  icon: Calendar
}, {
  name: "Galeri",
  path: "/gallery",
  icon: Image
}, {
  name: "Warta Pema",
  path: "/news",
  icon: FileText
}, {
  name: "Kontak",
  path: "/contact",
  icon: Mail
}];
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useAuth();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Handle navigation with smooth scroll
  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    
    if (location.pathname === path) {
      // Jika sudah di halaman yang sama, scroll ke top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate ke halaman baru
      navigate(path);
    }
    
    // Close mobile menu
    setIsOpen(false);
    setIsSheetOpen(false);
  };
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group transition-all duration-300">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <img src={pemaLogo} alt="PEMA UTU Logo" className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain transition-transform duration-300 group-hover:scale-110" />
              <img src={kabinetLogo} alt="Kabinet Samgrahita Logo" className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-primary text-sm lg:text-base transition-colors group-hover:text-gold">PEMA UTU</div>
              <div className="text-[10px] lg:text-xs text-gold font-medium">Kabinet Samgrahita</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {/* Header Menu Items */}
            {headerNavItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <a
                  key={item.path} 
                  href={item.path}
                  onClick={(e) => handleNavigation(e, item.path)}
                  className={cn(
                    "px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-300 relative cursor-pointer group", 
                    isActive 
                      ? "text-gold bg-primary/10" 
                      : "text-foreground hover:text-gold hover:bg-primary/5"
                  )}
                >
                  {item.name}
                  {isActive && <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gold rounded-full" />}
                  {!isActive && <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gold rounded-full group-hover:w-8 transition-all duration-300" />}
                </a>
              );
            })}
          
          {/* Auth Button */}
          {isAuthenticated ? (
            <Link 
              to="/admin/dashboard" 
              className="flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-medium bg-gold text-primary hover:bg-gold-dark transition-all duration-300 hover:shadow-gold hover:scale-105 active:scale-95"
            >
              <LayoutDashboard className="h-4 w-4 lg:h-5 lg:w-5" />
              <span className="hidden lg:inline">Dashboard</span>
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-medium border-2 border-gold text-gold hover:bg-gold hover:text-primary transition-all duration-300 hover:shadow-gold hover:scale-105 active:scale-95"
            >
              <LogIn className="h-4 w-4 lg:h-5 lg:w-5" />
              <span className="hidden lg:inline">Login</span>
            </Link>
          )}
          
          {/* Desktop Menu Sheet */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-2 hover:bg-primary/10 transition-colors">
                <Menu className="h-5 w-5 lg:h-6 lg:w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle className="text-xl font-bold text-primary">Menu Navigasi</SheetTitle>
                <SheetDescription className="text-sm">
                  Akses semua halaman PEMA UTU Kabinet Samgrahita
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col space-y-1 mt-6">
                {allNavItems.map(item => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      onClick={(e) => handleNavigation(e, item.path)}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer group",
                        isActive
                          ? "text-gold bg-primary/10 shadow-sm"
                          : "text-foreground hover:text-gold hover:bg-primary/5 hover:translate-x-1"
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span>{item.name}</span>
                      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />}
                    </a>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden hover:bg-primary/10 transition-all duration-300" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-5 duration-300">
            <div className="flex flex-col space-y-1">
              {allNavItems.map(item => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return <a 
              key={item.path} 
              href={item.path}
              onClick={(e) => handleNavigation(e, item.path)}
              className={cn("flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer group", isActive ? "text-gold bg-primary/10 shadow-sm" : "text-foreground hover:text-gold hover:bg-primary/5 hover:translate-x-1")}>
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item.name}</span>
                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />}
                  </a>;
          })}
          
          {/* Mobile Auth Button */}
          <div className="border-t border-border pt-3 mt-3">
            {isAuthenticated ? (
              <Link 
                to="/admin/dashboard" 
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium bg-gold text-primary transition-all duration-300 hover:bg-gold-dark shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard ({currentUser?.name})</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium border-2 border-gold text-gold transition-all duration-300 hover:bg-gold hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                <LogIn className="h-5 w-5" />
                <span>Login Admin</span>
              </Link>
            )}
          </div>
            </div>
          </div>}
      </div>
    </nav>;
}