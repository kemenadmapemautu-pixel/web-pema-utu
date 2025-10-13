import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";

interface OrgMember {
  id: string;
  nama: string;
  jabatan: string;
  level: 'rektor' | 'presiden' | 'wakil-presiden' | 'sekjen' | 'wakil-sekjen' | 'bendahara' | 'wakil-bendahara' | 'menteri';
}

export default function StructureFinal() {
  const [members, setMembers] = useState<OrgMember[]>([]);

  useEffect(() => {
    const savedPengurus = localStorage.getItem("pengurusList");
    if (savedPengurus) {
      const pengurusList = JSON.parse(savedPengurus);
      const completedMembers = pengurusList.filter((p: any) => p.profileCompleted === true);
      
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
    const j = jabatan.toLowerCase();
    
    if (j.includes('rektor')) return 'rektor';
    if (j.includes('presiden') && !j.includes('wakil')) return 'presiden';
    if (j.includes('wakil presiden') || j.includes('wapres')) return 'wakil-presiden';
    if (j.includes('sekretaris') && j.includes('wakil')) return 'wakil-sekjen';
    if (j.includes('sekretaris') || j.includes('sekjen')) return 'sekjen';
    if (j.includes('bendahara') && j.includes('wakil')) return 'wakil-bendahara';
    if (j.includes('bendahara')) return 'bendahara';
    
    return 'menteri';
  };

  const getByLevel = (level: OrgMember['level']) => members.filter(m => m.level === level);

  const rektor = getByLevel('rektor')[0];
  const presiden = getByLevel('presiden')[0];
  const wakilPresiden = getByLevel('wakil-presiden')[0];
  const sekjen = getByLevel('sekjen')[0];
  const wakilSekjen = getByLevel('wakil-sekjen')[0];
  const bendahara = getByLevel('bendahara')[0];
  const wakilBendahara = getByLevel('wakil-bendahara')[0];
  const menteri = getByLevel('menteri');

  const OrgBox = ({ member, size = 'md' }: { member?: OrgMember, size?: 'sm' | 'md' | 'lg' }) => {
    if (!member) return null;
    
    const sizeClasses = {
      sm: 'w-56 p-4',
      md: 'w-64 p-5',
      lg: 'w-72 p-6'
    };

    return (
      <Card className={`${sizeClasses[size]} bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-blue-300 hover:scale-105`}>
        <CardContent className="p-0 text-center">
          <div className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-90">
            {member.jabatan}
          </div>
          <div className="text-base font-bold leading-tight">
            {member.nama}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary">
            Struktur <span className="text-gradient-accent">Organisasi</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bagan struktur organisasi PEMA UTU Kabinet Samgrahita
          </p>
        </div>

        {/* Organization Chart */}
        {members.length > 0 ? (
          <div className="relative max-w-7xl mx-auto">
            {/* Container untuk garis SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {/* Garis vertikal dari Rektor ke Presiden */}
              {rektor && presiden && (
                <line x1="50%" y1="120" x2="50%" y2="200" stroke="#60a5fa" strokeWidth="2" />
              )}
              
              {/* Garis vertikal dari Presiden ke Wakil Presiden */}
              {presiden && wakilPresiden && (
                <line x1="50%" y1="280" x2="50%" y2="360" stroke="#60a5fa" strokeWidth="2" />
              )}
              
              {/* Garis vertikal dari Wakil Presiden ke tengah */}
              {wakilPresiden && (sekjen || bendahara) && (
                <line x1="50%" y1="440" x2="50%" y2="500" stroke="#60a5fa" strokeWidth="2" />
              )}
              
              {/* Garis horizontal untuk Sekretariat dan Bendahara */}
              {(sekjen || bendahara) && (
                <line x1="20%" y1="500" x2="80%" y2="500" stroke="#60a5fa" strokeWidth="2" />
              )}
              
              {/* Garis vertikal ke Sekretariat */}
              {sekjen && (
                <line x1="25%" y1="500" x2="25%" y2="540" stroke="#60a5fa" strokeWidth="2" />
              )}
              
              {/* Garis vertikal ke Bendahara */}
              {bendahara && (
                <line x1="75%" y1="500" x2="75%" y2="540" stroke="#60a5fa" strokeWidth="2" />
              )}
              
              {/* Garis vertikal dari tengah ke Kementerian */}
              {menteri.length > 0 && (
                <line x1="50%" y1="700" x2="50%" y2="760" stroke="#60a5fa" strokeWidth="2" />
              )}
            </svg>

            <div className="relative z-10 space-y-0">
              {/* Level 1: Rektor */}
              {rektor && (
                <div className="flex justify-center mb-20">
                  <OrgBox member={rektor} size="lg" />
                </div>
              )}

              {/* Level 2: Presiden */}
              {presiden && (
                <div className="flex justify-center mb-20">
                  <OrgBox member={presiden} size="lg" />
                </div>
              )}

              {/* Level 3: Wakil Presiden */}
              {wakilPresiden && (
                <div className="flex justify-center mb-20">
                  <OrgBox member={wakilPresiden} size="lg" />
                </div>
              )}

              {/* Level 4: Sekretariat & Bendahara (Side by Side) */}
              {(sekjen || wakilSekjen || bendahara || wakilBendahara) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto mb-20 mt-16">
                  {/* Sekretariat */}
                  <div className="flex flex-col items-center space-y-4">
                    {sekjen && <OrgBox member={sekjen} size="md" />}
                    {wakilSekjen && <OrgBox member={wakilSekjen} size="md" />}
                  </div>

                  {/* Bendahara */}
                  <div className="flex flex-col items-center space-y-4">
                    {bendahara && <OrgBox member={bendahara} size="md" />}
                    {wakilBendahara && <OrgBox member={wakilBendahara} size="md" />}
                  </div>
                </div>
              )}

              {/* Level 5: Kementerian */}
              {menteri.length > 0 && (
                <div className="flex flex-col items-center space-y-8 mt-20">
                  <Card className="w-80 bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-xl border-2 border-blue-300">
                    <CardContent className="p-6 text-center">
                      <div className="text-xl font-bold uppercase tracking-wider">
                        KEMENTERIAN
                      </div>
                      <div className="text-sm mt-2 opacity-90">
                        {menteri.length} Menteri
                      </div>
                    </CardContent>
                  </Card>

                  {/* Grid Menteri */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto mt-8">
                    {menteri.map((member) => (
                      <Card key={member.id} className="bg-white hover:shadow-xl transition-all duration-300 border-2 border-blue-200 hover:border-blue-400 hover:scale-105">
                        <CardContent className="p-5 text-center">
                          <div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">
                            {member.jabatan}
                          </div>
                          <div className="text-sm font-bold text-gray-800">
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
          <Card className="shadow-card max-w-2xl mx-auto">
            <CardContent className="p-12 text-center">
              <Building2 className="h-20 w-20 text-blue-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-primary mb-3">
                Belum Ada Data Struktur Organisasi
              </h3>
              <p className="text-muted-foreground text-lg">
                Data struktur organisasi akan ditampilkan setelah admin menambahkan anggota kabinet melalui dashboard.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Legend */}
        {members.length > 0 && (
          <Card className="mt-16 shadow-card bg-white max-w-3xl mx-auto">
            <CardContent className="p-6">
              <h3 className="font-semibold text-primary mb-4 text-center text-lg">
                Keterangan Struktur
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded"></div>
                  <span className="text-muted-foreground">Rektor & Pimpinan Tertinggi</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded"></div>
                  <span className="text-muted-foreground">Presiden & Wakil Presiden</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-500 rounded"></div>
                  <span className="text-muted-foreground">Sekretariat & Bendahara</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-white border-2 border-blue-200 rounded"></div>
                  <span className="text-muted-foreground">Kementerian</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
