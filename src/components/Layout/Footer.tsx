import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
export function Footer() {
  return <footer className="gradient-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 flex items-center justify-center bg-white/10 rounded-lg">
                <img 
                  src="/pema-logo.png" 
                  alt="Logo PEMA UTU" 
                  className="w-full h-full object-contain rounded-lg"
                  onError={(e) => {
                    // Fallback jika gambar gagal load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<span class="text-gold font-bold text-2xl">PEMA</span>';
                  }}
                />
              </div>
              <div>
                <div className="text-xl font-bold">PEMA UTU</div>
                <div className="text-gold text-sm">Kabinet Samgrahita</div>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">Mewujudkan kepemimpinan  mahasiswa yang responsif, aspiratif, dan berintegritas sebagai mitra strategis dalam menciptakan lingkungan kampus yang inovatif, inklusif, serta berdaya saing tinggi </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gold">Navigasi</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-white/80 hover:text-gold transition-smooth">Tentang Kami</Link></li>
              <li><Link to="/cabinet" className="text-sm text-white/80 hover:text-gold transition-smooth">Kabinet</Link></li>
              <li><Link to="/programs" className="text-sm text-white/80 hover:text-gold transition-smooth">Program Kerja</Link></li>
              <li><Link to="/news" className="text-sm text-white/80 hover:text-gold transition-smooth">Berita</Link></li>
              <li><Link to="/vision-mission" className="text-sm text-white/80 hover:text-gold transition-smooth">Visi & Misi</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gold">Program Kerja</h3>
            <ul className="space-y-2">
              <li><Link to="/programs" className="text-sm text-white/80 hover:text-gold transition-smooth">Pendidikan</Link></li>
              <li><Link to="/programs" className="text-sm text-white/80 hover:text-gold transition-smooth">Kemahasiswaan</Link></li>
              <li><Link to="/programs" className="text-sm text-white/80 hover:text-gold transition-smooth">Teknologi</Link></li>
              <li><Link to="/programs" className="text-sm text-white/80 hover:text-gold transition-smooth">Kewirausahaan</Link></li>
              <li><Link to="/activities" className="text-sm text-white/80 hover:text-gold transition-smooth">Lainnya</Link></li>
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
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold hover:text-primary transition-smooth">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold hover:text-primary transition-smooth">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold hover:text-primary transition-smooth">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/60">© 2024 Pemerintahan Mahasiswa Universitas Teuku Umar. All Kabinet Reserved.</p>
            <div className="flex space-x-6 text-sm text-white/60">
              
              
            </div>
          </div>
        </div>
      </div>
    </footer>;
}