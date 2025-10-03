import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Users, Target, Briefcase, FileText, Mail, LogIn, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import pemaLogo from "@/assets/pema-logo.png";
import kabinetLogo from "@/assets/kabinet-logo.png";

const navItems = [{
  name: "Beranda",
  path: "/",
  icon: Home
}, {
  name: "Tentang",
  path: "/about",
  icon: Target
}, {
  name: "Kabinet",
  path: "/cabinet",
  icon: Users
}, {
  name: "Program Kerja",
  path: "/programs",
  icon: Briefcase
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
  const location = useLocation();
  const { isAuthenticated, currentUser } = useAuth();
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <img src={pemaLogo} alt="PEMA UTU Logo" className="w-10 h-10 object-contain" />
              <img src={kabinetLogo} alt="Kabinet Samgrahita Logo" className="w-10 h-10 shadow-blue-100 " />
            </div>
            <div className="hidden sm:block">
              <div className="text-gold-light font-bold text-primary-dark text-primary-dark \n">PEMA UTU</div>
              <div className="text-xs text-gold">Kabinet Samgrahita</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return <Link key={item.path} to={item.path} className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-smooth relative", isActive ? "text-gold bg-primary/10" : "text-foreground hover:text-gold hover:bg-primary/5")}>
                  {item.name}
                  {isActive && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gold rounded-full" />}
                </Link>;
          })}
          
          {/* Auth Button */}
          {isAuthenticated ? (
            <Link 
              to="/admin/dashboard" 
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium bg-gold text-primary hover:bg-gold-dark transition-smooth"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium border border-gold text-gold hover:bg-gold hover:text-primary transition-smooth"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Link>
          )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navItems.map(item => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return <Link key={item.path} to={item.path} className={cn("flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth", isActive ? "text-gold bg-primary/10" : "text-foreground hover:text-gold hover:bg-primary/5")} onClick={() => setIsOpen(false)}>
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>;
          })}
          
          {/* Mobile Auth Button */}
          <div className="border-t border-border pt-2 mt-2">
            {isAuthenticated ? (
              <Link 
                to="/admin/dashboard" 
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium bg-gold text-primary"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard ({currentUser?.name})</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium border border-gold text-gold"
                onClick={() => setIsOpen(false)}
              >
                <LogIn className="h-4 w-4" />
                <span>Login Admin</span>
              </Link>
            )}
          </div>
            </div>
          </div>}
      </div>
    </nav>;
}