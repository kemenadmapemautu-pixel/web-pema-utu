import { Instagram, MessageCircle, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
export function Footer() {
  return <footer className="gradient-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="space-y-4 text-center sm:text-left col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-center sm:justify-start space-x-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-white/10 rounded-lg">
                <img 
                  src="/pema-logo.png" 
                  alt="Logo PEMA UTU" 
                  className="w-full h-full object-contain rounded-lg"
                  onError={(e) => {
                    // Fallback jika gambar gagal load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<span class="text-gold font-bold text-xl sm:text-2xl">PEMA</span>';
                  }}
                />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold">PEMA UTU</div>
                <div className="text-gold text-xs sm:text-sm">Kabinet Samgrahita</div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-md mx-auto sm:mx-0">
              Mewujudkan kepemimpinan mahasiswa yang responsif, aspiratif, dan berintegritas sebagai mitra strategis dalam menciptakan lingkungan kampus yang inovatif, inklusif, serta berdaya saing tinggi
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gold">Navigasi</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-white/80 hover:text-gold transition-smooth flex items-center group">
                  Beranda
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-white/80 hover:text-gold transition-smooth flex items-center group">
                  Tentang Kami
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/cabinet" className="text-sm text-white/80 hover:text-gold transition-smooth flex items-center group">
                  Kabinet
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/structure" className="text-sm text-white/80 hover:text-gold transition-smooth flex items-center group">
                  Struktur Organisasi
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gold">Program Kerja</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/programs" className="text-sm text-white/80 hover:text-gold transition-smooth flex items-center group">
                  Semua Program
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/activities" className="text-sm text-white/80 hover:text-gold transition-smooth flex items-center group">
                  Kegiatan
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm text-white/80 hover:text-gold transition-smooth flex items-center group">
                  Galeri
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-sm text-white/80 hover:text-gold transition-smooth flex items-center group">
                  Berita
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gold">Kontak</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gold" />
                <span className="text-sm text-white/80">pema@utu.ac.id</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gold" />
                <span className="text-sm text-white/80">+62 000-0000-0000</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gold" />
                <span className="text-sm text-white/80">Universitas Teuku Umar</span>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-3 pt-2">
              <a
                href="https://instagram.com/pemautu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold hover:text-primary transition-smooth group"
                aria-label="Instagram PEMA UTU"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/62000000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold hover:text-primary transition-smooth group"
                aria-label="WhatsApp PEMA UTU"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-center sm:text-left">
            <p className="text-sm text-white/60 order-2 sm:order-1">
              © 2024 Pemerintahan Mahasiswa Universitas Teuku Umar. All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6 text-sm text-white/60 order-1 sm:order-2">
              <Link to="/contact" className="hover:text-gold transition-smooth">Kontak</Link>
              <Link to="/vision-mission" className="hover:text-gold transition-smooth">Visi & Misi</Link>
              <span className="text-white/40">•</span>
              <span className="text-white/40">Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>;
}