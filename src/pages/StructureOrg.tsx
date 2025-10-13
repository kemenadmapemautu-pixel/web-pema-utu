import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, ArrowRight, Building2 } from "lucide-react";

interface OrgMember {
  id: string;
  nama: string;
  jabatan: string;
  level: 'rektor' | 'pimpinan' | 'sekretariat' | 'bendahara' | 'menteri';
}

export default function StructureOrg() {
  const [members, setMembers] = useState<OrgMember[]>([]);

  useEffect(() => {
    // Load data dari localStorage
    const savedPengurus = localStorage.getItem("pengurusList");
    if (savedPengurus) {
      const pengurusList = JSON.parse(savedPengurus);
      const completedMembers = pengurusList.filter((p: any) => p.profileCompleted === true);
      
      // Map data ke struktur organisasi
      const orgMembers: OrgMember[] = completedMembers.map((p: any) => ({
        id: p.id,
        nama: p.nama,
        jabatan: p.jabatan,
        level: determineLevel(p.jabatan, p.tipe)
      }));
      
      setMembers(orgMembers);
    }
  }, []);

  const determineLevel = (jabatan: string, tipe: string): OrgMember['level'] => {
    const jabatanLower = jabatan.toLowerCase();
    
    if (jabatanLower.includes('rektor')) return 'rektor';
    if (jabatanLower.includes('presiden')) return 'pimpinan';
    if (jabatanLower.includes('wakil presiden') || jabatanLower.includes('wapres')) return 'pimpinan';
    if (jabatanLower.includes('sekretaris') || jabatanLower.includes('sekjen')) return 'sekretariat';
    if (jabatanLower.includes('bendahara')) return 'bendahara';
    if (tipe === 'menteri') return 'menteri';
    
    return 'menteri'; // default
  };

  const getByLevel = (level: OrgMember['level']) => {
    return members.filter(m => m.level === level);
  };

  const rektor = getByLevel('rektor');
  const pimpinan = getByLevel('pimpinan');
  const sekretariat = getByLevel('sekretariat');
  const bendahara = getByLevel('bendahara');
  const menteri = getByLevel('menteri');

  // Pisahkan presiden dan wakil presiden
  const presiden = pimpinan.find(p => p.jabatan.toLowerCase().includes('presiden') && !p.jabatan.toLowerCase().includes('wakil'));
  const wakilPresiden = pimpinan.find(p => p.jabatan.toLowerCase().includes('wakil'));

  // Pisahkan sekretaris jenderal dan wakil
  const sekjen = sekretariat.find(s => !s.jabatan.toLowerCase().includes('wakil'));
  const wakilSekjen = sekretariat.find(s => s.jabatan.toLowerCase().includes('wakil'));

  // Pisahkan bendahara umum dan wakil
  const bendaharaUmum = bendahara.find(b => !b.jabatan.toLowerCase().includes('wakil'));
  const wakilBendahara = bendahara.find(b => b.jabatan.toLowerCase().includes('wakil'));

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary">
            Struktur <span className="text-gradient-accent">Organisasi</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bagan struktur organisasi PEMA UTU Kabinet Samgrahita
          </p>
          
          {/* Navigation to Cabinet */}
          <div className="flex justify-center gap-4 mt-6">
            <Link to="/cabinet">
              <Button variant="outline" className="group">
                <Eye className="h-4 w-4 mr-2" />
                Lihat Profil Kabinet
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Organization Chart */}
        {members.length > 0 ? (
          <div className="relative">
            {/* SVG untuk garis penghubung */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#3b82f6" />
                </marker>
              </defs>
            </svg>

            <div className="relative z-10 space-y-8">
              {/* Level 1: Rektor (jika ada) */}
              {rektor.length > 0 && (
                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    {rektor.map((member) => (
                      <Card key={member.id} className="w-64 bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-blue-400">
                        <CardContent className="p-6 text-center">
                          <div className="text-sm font-semibold uppercase tracking-wide mb-2 opacity-90">
                            {member.jabatan}
                          </div>
                          <div className="text-lg font-bold">
                            {member.nama}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {/* Connector line */}
                    <div className="w-0.5 h-12 bg-gradient-to-b from-blue-600 to-blue-500"></div>
                  </div>
                </div>
              )}

              {/* Level 2: Presiden & Wakil Presiden */}
              {(presiden || wakilPresiden) && (
                <div className="flex flex-col items-center space-y-4">
                  {presiden && (
                    <>
                      <Card className="w-64 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-blue-300">
                        <CardContent className="p-6 text-center">
                          <div className="text-sm font-semibold uppercase tracking-wide mb-2 opacity-90">
                            {presiden.jabatan}
                          </div>
                          <div className="text-lg font-bold">
                            {presiden.nama}
                          </div>
                        </CardContent>
                      </Card>
                      <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-blue-400"></div>
                    </>
                  )}
                  
                  {wakilPresiden && (
                    <>
                      <Card className="w-64 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-blue-300">
                        <CardContent className="p-6 text-center">
                          <div className="text-sm font-semibold uppercase tracking-wide mb-2 opacity-90">
                            {wakilPresiden.jabatan}
                          </div>
                          <div className="text-lg font-bold">
                            {wakilPresiden.nama}
                          </div>
                        </CardContent>
                      </Card>
                      <div className="w-0.5 h-12 bg-gradient-to-b from-blue-500 to-blue-400"></div>
                    </>
                  )}
                </div>
              )}

              {/* Level 3: Sekretariat & Bendahara (Side by Side) */}
              {((sekjen || wakilSekjen) || (bendaharaUmum || wakilBendahara)) && (
                <div className="relative">
                  {/* Horizontal connector */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-0.5 bg-blue-400" style={{ top: '-24px' }}></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Sekretariat */}
                    {(sekjen || wakilSekjen) && (
                      <div className="flex flex-col items-center space-y-4">
                        {/* Vertical connector */}
                        <div className="w-0.5 h-6 bg-blue-400"></div>
                        
                        {sekjen && (
                          <Card className="w-64 bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                            <CardContent className="p-5 text-center">
                              <div className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-90">
                                {sekjen.jabatan}
                              </div>
                              <div className="text-base font-bold">
                                {sekjen.nama}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        
                        {wakilSekjen && (
                          <Card className="w-64 bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                            <CardContent className="p-5 text-center">
                              <div className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-90">
                                {wakilSekjen.jabatan}
                              </div>
                              <div className="text-base font-bold">
                                {wakilSekjen.nama}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    )}

                    {/* Bendahara */}
                    {(bendaharaUmum || wakilBendahara) && (
                      <div className="flex flex-col items-center space-y-4">
                        {/* Vertical connector */}
                        <div className="w-0.5 h-6 bg-blue-400"></div>
                        
                        {bendaharaUmum && (
                          <Card className="w-64 bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                            <CardContent className="p-5 text-center">
                              <div className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-90">
                                {bendaharaUmum.jabatan}
                              </div>
                              <div className="text-base font-bold">
                                {bendaharaUmum.nama}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        
                        {wakilBendahara && (
                          <Card className="w-64 bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                            <CardContent className="p-5 text-center">
                              <div className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-90">
                                {wakilBendahara.jabatan}
                              </div>
                              <div className="text-base font-bold">
                                {wakilBendahara.nama}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Level 4: Kementerian */}
              {menteri.length > 0 && (
                <div className="flex flex-col items-center space-y-6 mt-12">
                  {/* Connector from top */}
                  <div className="w-0.5 h-12 bg-gradient-to-b from-blue-400 to-blue-300"></div>
                  
                  <Card className="w-80 bg-gradient-to-br from-blue-300 to-blue-400 text-white shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="text-lg font-bold uppercase tracking-wide">
                        KEMENTERIAN
                      </div>
                      <div className="text-sm mt-1 opacity-90">
                        {menteri.length} Menteri
                      </div>
                    </CardContent>
                  </Card>

                  {/* Grid Menteri */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
                    {menteri.map((member) => (
                      <Card key={member.id} className="bg-white hover:shadow-xl transition-all duration-300 border-2 border-blue-200 hover:border-blue-400">
                        <CardContent className="p-5 text-center">
                          <div className="text-sm font-semibold text-blue-600 mb-2">
                            {member.jabatan}
                          </div>
                          <div className="text-base font-bold text-gray-800">
                            {member.nama}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Empty State
          <Card className="shadow-card">
            <CardContent className="p-12 text-center">
              <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">
                Belum Ada Data Struktur Organisasi
              </h3>
              <p className="text-muted-foreground mb-6">
                Data struktur organisasi akan ditampilkan setelah admin menambahkan anggota kabinet melalui dashboard.
              </p>
              <Link to="/cabinet">
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Lihat Halaman Kabinet
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Info Card */}
        <Card className="mt-12 shadow-card bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-primary mb-3 flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-blue-600" />
              Tentang Struktur Organisasi
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Struktur organisasi menampilkan hierarki kepemimpinan PEMA UTU</p>
              <p>• Data diambil dari profil anggota kabinet yang telah dilengkapi</p>
              <p>• Untuk melihat profil lengkap setiap anggota, kunjungi halaman Kabinet</p>
            </div>
          </CardContent>
        </Card>

        {/* Link to Cabinet */}
        <div className="mt-12 text-center">
          <Card className="shadow-card bg-gradient-to-r from-primary/10 to-gold/10">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">
                Ingin Mengenal Lebih Dekat?
              </h3>
              <p className="text-muted-foreground mb-6">
                Lihat profil lengkap setiap anggota kabinet beserta prestasi dan pengalaman mereka
              </p>
              <Link to="/cabinet">
                <Button size="lg" className="bg-gold hover:bg-gold-dark text-primary font-semibold">
                  <Eye className="h-5 w-5 mr-2" />
                  Lihat Profil Kabinet
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
