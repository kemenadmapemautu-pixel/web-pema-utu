import { Instagram, MessageCircle, Mail, Phone, MapPin, ExternalLink, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { scrollToSection } from "@/lib/scrollUtils";

export function Footer() {
  const navigate = useNavigate();

  const handleScrollLink = (path: string, sectionId?: string) => {
    if (window.location.pathname === path && sectionId) {
      // Jika sudah di halaman yang sama, langsung scroll
      scrollToSection(sectionId);
    } else if (sectionId) {
      // Jika beda halaman, simpan section ID dan navigate
      sessionStorage.setItem('scrollToSection', sectionId);
      navigate(path);
    } else {
      // Jika tidak ada section ID, navigate biasa
      navigate(path);
    }
  };
  return <footer className="gradient-primary text-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 xl:gap-12">
          {/* Logo & Description */}
          <div className="space-y-4 lg:space-y-5 text-center sm:text-left col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-center sm:justify-start space-x-3 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center bg-white/10 rounded-xl transition-all duration-300 group-hover:bg-white/15 group-hover:scale-110">
                <img 
                  src="/pema-logo.png" 
                  alt="Logo PEMA UTU" 
                  className="w-full h-full object-contain rounded-xl"
                  onError={(e) => {
                    // Fallback jika gambar gagal load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<span class="text-gold font-bold text-xl sm:text-2xl">PEMA</span>';
                  }}
                />
              </div>
              <div>
                <div className="text-base sm:text-lg lg:text-xl font-bold transition-colors group-hover:text-gold">PEMA UTU</div>
                <div className="text-gold text-xs sm:text-sm font-medium">Kabinet Samgrahita</div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-md mx-auto sm:mx-0">
              Mewujudkan kepemimpinan mahasiswa yang responsif, aspiratif, dan berintegritas sebagai mitra strategis dalam menciptakan lingkungan kampus yang inovatif, inklusif, serta berdaya saing tinggi.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 lg:space-y-5">
            <h3 className="text-base sm:text-lg font-bold text-gold">Navigasi Cepat</h3>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => handleScrollLink('/', 'beranda')}
                  className="text-sm text-white/80 hover:text-gold transition-all duration-300 flex items-center group hover:translate-x-1"
                >
                  Beranda
                  <ExternalLink className="h-3 w-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollLink('/about')}
                  className="text-sm text-white/80 hover:text-gold transition-all duration-300 flex items-center group hover:translate-x-1"
                >
                  Tentang Kami
                  <ExternalLink className="h-3 w-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollLink('/cabinet')}
                  className="text-sm text-white/80 hover:text-gold transition-all duration-300 flex items-center group hover:translate-x-1"
                >
                  Kabinet
                  <ExternalLink className="h-3 w-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollLink('/structure')}
                  className="text-sm text-white/80 hover:text-gold transition-all duration-300 flex items-center group hover:translate-x-1"
                >
                  Struktur Organisasi
                  <ExternalLink className="h-3 w-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </button>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4 lg:space-y-5">
            <h3 className="text-base sm:text-lg font-bold text-gold">Program & Kegiatan</h3>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => handleScrollLink('/programs')}
                  className="text-sm text-white/80 hover:text-gold transition-all duration-300 flex items-center group hover:translate-x-1"
                >
                  Semua Program
                  <ExternalLink className="h-3 w-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollLink('/activities')}
                  className="text-sm text-white/80 hover:text-gold transition-all duration-300 flex items-center group hover:translate-x-1"
                >
                  Kegiatan
                  <ExternalLink className="h-3 w-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollLink('/gallery')}
                  className="text-sm text-white/80 hover:text-gold transition-all duration-300 flex items-center group hover:translate-x-1"
                >
                  Galeri
                  <ExternalLink className="h-3 w-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollLink('/news')}
                  className="text-sm text-white/80 hover:text-gold transition-all duration-300 flex items-center group hover:translate-x-1"
                >
                  Warta Pema
                  <ExternalLink className="h-3 w-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 lg:space-y-5">
            <h3 className="text-base sm:text-lg font-bold text-gold">Hubungi Kami</h3>
            <div className="space-y-3 lg:space-y-3.5">
              {/* Email */}
              <div className="group">
                <div className="flex items-start space-x-3">
                  <Mail className="h-4 w-4 text-gold flex-shrink-0 transition-transform duration-300 group-hover:scale-110 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors block">pema@utu.ac.id</span>
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors block">info@pemautu.org</span>
                  </div>
                </div>
              </div>
              
              {/* Telepon */}
              <div className="group">
                <div className="flex items-start space-x-3">
                  <Phone className="h-4 w-4 text-gold flex-shrink-0 transition-transform duration-300 group-hover:scale-110 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors block">+62 812-3456-7890</span>
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors block">+62 813-4567-8901</span>
                  </div>
                </div>
              </div>
              
              {/* Alamat */}
              <div className="group">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-gold flex-shrink-0 transition-transform duration-300 group-hover:scale-110 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors block">Sekretariat PEMA UTU</span>
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors block">Gedung Lama, Samping Paud/Tk Lentera Teuku Umar</span>
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors block">Universitas Teuku Umar</span>
                  </div>
                </div>
              </div>
              
              {/* Jam Operasional */}
              <div className="group">
                <div className="flex items-start space-x-3">
                  <Clock className="h-4 w-4 text-gold flex-shrink-0 transition-transform duration-300 group-hover:scale-110 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors block">Senin - Jumat: 08:00 - 17:00</span>
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors block">Sabtu: 08:00 - 12:00</span>
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors block">Minggu: Tutup</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-3 pt-3">
              <a
                href="https://instagram.com/pemautu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 lg:w-11 lg:h-11 bg-white/10 rounded-xl flex items-center justify-center hover:bg-gold hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                aria-label="Instagram PEMA UTU"
              >
                <Instagram className="h-5 w-5 lg:h-5 lg:w-5 transition-transform duration-300 group-hover:rotate-12" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 lg:w-11 lg:h-11 bg-white/10 rounded-xl flex items-center justify-center hover:bg-gold hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                aria-label="WhatsApp PEMA UTU"
              >
                <MessageCircle className="h-5 w-5 lg:h-5 lg:w-5 transition-transform duration-300 group-hover:rotate-12" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-white/60 order-2 sm:order-1">
              © 2025 Pemerintahan Mahasiswa Universitas Teuku Umar. All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-white/60 order-1 sm:order-2">
              <button onClick={() => handleScrollLink('/contact')} className="hover:text-gold transition-all duration-300 hover:translate-y-[-2px]">Kontak</button>
              <span className="text-white/40">•</span>
              <button onClick={() => handleScrollLink('/vision-mission')} className="hover:text-gold transition-all duration-300 hover:translate-y-[-2px]">Visi & Misi</button>
              <span className="text-white/40">•</span>
              <span className="text-white/40 cursor-not-allowed">Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>;
}