import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, MapPin, Calendar, Award, User } from "lucide-react";
import presidentImg from "@/assets/president.jpg";
import vicePresidentImg from "@/assets/vice-president.jpg";
import minister1Img from "@/assets/minister-1.jpg";
import minister2Img from "@/assets/minister-2.jpg";

interface CabinetMember {
  id: string;
  name: string;
  position: string;
  faculty: string;
  department: string;
  email: string;
  phone: string;
  image: string;
  description: string;
  achievements: string[];
  period: string;
}

interface Pengurus {
  id: string;
  nama: string;
  jabatan: string;
  departemen?: string;
  email: string;
  telepon: string;
  foto?: string;
  tipe: "pimpinan" | "menteri";
  fakultas?: string;
  prodi?: string;
  deskripsi?: string;
  prestasi?: string[];
  periode?: string;
  // Login credentials
  username?: string;
  password?: string;
  hasAccount?: boolean;
  profileCompleted?: boolean;
  // Additional profile info
  socialMedia?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  education?: string;
  experience?: string;
  organizationHistory?: string[];
}

// Data kabinet sekarang sepenuhnya dikelola melalui admin dashboard
const cabinetMembers: CabinetMember[] = [];

export default function Cabinet() {
  const [selectedMember, setSelectedMember] = useState<CabinetMember | null>(null);
  const [dynamicMembers, setDynamicMembers] = useState<CabinetMember[]>([]);

  useEffect(() => {
    // Load data pengurus dari localStorage
    const savedPengurus = localStorage.getItem("pengurusList");
    if (savedPengurus) {
      const pengurusList: Pengurus[] = JSON.parse(savedPengurus);
      
      // Convert pengurus data to cabinet member format - hanya yang profileCompleted
      const convertedMembers: (CabinetMember & { tipe: string })[] = pengurusList
        .filter(pengurus => pengurus.profileCompleted === true) // Hanya tampilkan profil lengkap
        .map(pengurus => {
          console.log('Converting pengurus:', pengurus.nama, 'organizationHistory:', pengurus.organizationHistory);
          return {
            id: pengurus.id,
            name: pengurus.nama,
            position: pengurus.jabatan,
            faculty: pengurus.fakultas || "Fakultas",
            department: pengurus.prodi || pengurus.departemen || "Program Studi",
            email: pengurus.email,
            phone: pengurus.telepon,
            image: pengurus.foto || presidentImg, // Base64 atau fallback image
            description: pengurus.deskripsi || `Anggota kabinet PEMA UTU yang bertugas sebagai ${pengurus.jabatan}. Berkomitmen untuk melayani mahasiswa dengan dedikasi tinggi.`,
            achievements: pengurus.prestasi || ["Anggota Kabinet PEMA UTU", "Aktif dalam kegiatan kemahasiswaan"],
            period: pengurus.periode || "2024-2025",
            tipe: pengurus.tipe,
            // Tambahan info dari profil lengkap
            socialMedia: pengurus.socialMedia || {},
            education: pengurus.education || "",
            experience: pengurus.experience || "",
            organizationHistory: pengurus.organizationHistory || []
          };
        });
      
      setDynamicMembers(convertedMembers);
    }
  }, []);

  // Combine static and dynamic members
  const allMembers = [...cabinetMembers, ...dynamicMembers];
  
  // Separate leadership and ministers based on tipe
  const leadership = dynamicMembers.filter((member: any) => member.tipe === "pimpinan");
  const ministers = dynamicMembers.filter((member: any) => member.tipe === "menteri");

  const renderMemberCard = (member: CabinetMember, isLeadership: boolean = false) => (
    <Card 
      key={member.id} 
      className={`shadow-card hover:shadow-primary transition-smooth cursor-pointer group ${
        isLeadership ? 'md:col-span-1' : ''
      }`}
      onClick={() => setSelectedMember(member)}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <img
              src={member.image}
              alt={`${member.name} - ${member.position}`}
              className="w-24 h-24 rounded-full object-cover border-4 border-gold/20 group-hover:border-gold transition-smooth"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = presidentImg; // Fallback to default image
              }}
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gold rounded-full flex items-center justify-center">
              <Award className="h-4 w-4 text-primary" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary group-hover:text-gold transition-smooth">
              {member.name}
            </h3>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {member.position}
            </Badge>
            <p className="text-sm text-muted-foreground">{member.faculty}</p>
            <p className="text-xs text-muted-foreground">{member.department}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary">
            Kabinet <span className="text-gradient-accent">Samgrahita</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tim solid yang berkomitmen untuk memajukan universitas dan mensejahterakan mahasiswa dengan satu visi dan seribu aksi nyata.
          </p>
        </div>

        <Tabs defaultValue="leadership" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="leadership">Pimpinan</TabsTrigger>
            <TabsTrigger value="ministers">Menteri</TabsTrigger>
          </TabsList>

          <TabsContent value="leadership" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {leadership.map(member => renderMemberCard(member, true))}
              {leadership.length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Belum ada data pimpinan yang tersedia</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="ministers" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ministers.map(member => renderMemberCard(member))}
              {ministers.length === 0 && (
                <div className="col-span-3 text-center py-12">
                  <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Belum ada data menteri yang tersedia</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Member Detail Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedMember(null)}>
            <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-gold mx-auto md:mx-0"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = presidentImg; // Fallback to default image
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-2">{selectedMember.name}</h2>
                      <Badge className="bg-gold text-primary mb-4">{selectedMember.position}</Badge>
                      <p className="text-muted-foreground leading-relaxed">{selectedMember.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-4 w-4 text-gold" />
                          <div>
                            <p className="text-sm font-medium">{selectedMember.faculty}</p>
                            <p className="text-xs text-muted-foreground">{selectedMember.department}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-4 w-4 text-gold" />
                          <div>
                            <p className="text-sm font-medium">Periode</p>
                            <p className="text-xs text-muted-foreground">{selectedMember.period}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-4 w-4 text-gold" />
                          <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-xs text-muted-foreground">{selectedMember.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Phone className="h-4 w-4 text-gold" />
                          <div>
                            <p className="text-sm font-medium">Telepon</p>
                            <p className="text-xs text-muted-foreground">{selectedMember.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Prestasi & Penghargaan */}
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-3 flex items-center">
                        <Award className="h-5 w-5 text-gold mr-2" />
                        Prestasi & Penghargaan
                      </h3>
                      <ul className="space-y-2">
                        {selectedMember.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Riwayat Organisasi */}
                    {(() => {
                      const orgHistory = (selectedMember as any).organizationHistory;
                      console.log('Organization History:', orgHistory);
                      return orgHistory && orgHistory.length > 0;
                    })() && (
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-3 flex items-center">
                          <User className="h-5 w-5 text-gold mr-2" />
                          Riwayat Organisasi
                        </h3>
                        <ul className="space-y-2">
                          {(selectedMember as any).organizationHistory.map((organization: string, index: number) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-muted-foreground">{organization}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Media Sosial */}
                    {(selectedMember as any).socialMedia && 
                     ((selectedMember as any).socialMedia.instagram || 
                      (selectedMember as any).socialMedia.linkedin || 
                      (selectedMember as any).socialMedia.twitter) && (
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-3 flex items-center">
                          <Mail className="h-5 w-5 text-gold mr-2" />
                          Media Sosial
                        </h3>
                        <div className="space-y-2">
                          {(selectedMember as any).socialMedia.instagram && (
                            <div className="flex items-center space-x-2">
                              <span className="text-pink-500">📷</span>
                              <span className="text-sm text-muted-foreground">
                                {(selectedMember as any).socialMedia.instagram}
                              </span>
                            </div>
                          )}
                          {(selectedMember as any).socialMedia.linkedin && (
                            <div className="flex items-center space-x-2">
                              <span className="text-blue-600">💼</span>
                              <span className="text-sm text-muted-foreground">
                                {(selectedMember as any).socialMedia.linkedin}
                              </span>
                            </div>
                          )}
                          {(selectedMember as any).socialMedia.twitter && (
                            <div className="flex items-center space-x-2">
                              <span className="text-blue-400">🐦</span>
                              <span className="text-sm text-muted-foreground">
                                {(selectedMember as any).socialMedia.twitter}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}