import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, MapPin, Calendar, Award, User, Instagram, Linkedin, Twitter, ExternalLink, X } from "lucide-react";
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
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-in fade-in duration-200" 
            onClick={() => setSelectedMember(null)}
          >
            <div 
              className="bg-background rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300" 
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Close Button */}
              <div className="sticky top-0 bg-gradient-to-r from-primary/5 to-gold/5 z-10 flex items-center justify-between px-6 py-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Profil</h3>
                    <p className="text-xs text-muted-foreground">Detail informasi</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="p-2 rounded-full bg-white hover:bg-red-50 hover:text-red-600 transition-all shadow-sm hover:shadow-md group"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5 text-gray-500 group-hover:text-red-600 transition-colors" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto max-h-[calc(90vh-80px)]">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-gold mx-auto md:mx-0 shadow-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = presidentImg;
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    {/* Header */}
                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-2">{selectedMember.name}</h2>
                      <Badge className="bg-gold text-primary mb-4">{selectedMember.position}</Badge>
                      <p className="text-muted-foreground leading-relaxed">{selectedMember.description}</p>
                    </div>
                    
                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg border">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-4 w-4 text-gold flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">{selectedMember.faculty}</p>
                            <p className="text-xs text-muted-foreground">{selectedMember.department}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-4 w-4 text-gold flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Periode</p>
                            <p className="text-xs text-muted-foreground">{selectedMember.period}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-4 w-4 text-gold flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-xs text-muted-foreground break-all">{selectedMember.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Phone className="h-4 w-4 text-gold flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Telepon</p>
                            <p className="text-xs text-muted-foreground">{selectedMember.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Achievements */}
                    <div className="p-4 bg-gradient-to-br from-gold/5 to-primary/5 rounded-lg border border-gold/20">
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

                    {/* Organization History */}
                    {(selectedMember as any).organizationHistory && 
                     (selectedMember as any).organizationHistory.length > 0 && (
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100">
                        <h3 className="text-lg font-semibold text-primary mb-3 flex items-center">
                          <User className="h-5 w-5 text-blue-600 mr-2" />
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

                    {/* Social Media */}
                    {(selectedMember as any).socialMedia && 
                     ((selectedMember as any).socialMedia.instagram || 
                      (selectedMember as any).socialMedia.linkedin || 
                      (selectedMember as any).socialMedia.twitter) && (
                      <div className="p-4 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-100">
                        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
                          <Mail className="h-5 w-5 text-purple-600 mr-2" />
                          Media Sosial
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {(selectedMember as any).socialMedia.instagram && (
                            <a 
                              href={(() => {
                                const ig = (selectedMember as any).socialMedia.instagram;
                                if (ig.startsWith('http')) return ig;
                                if (ig.startsWith('@')) return `https://instagram.com/${ig.substring(1)}`;
                                if (ig.includes('instagram.com')) return `https://${ig.replace(/^(https?:\/\/)?(www\.)?/, '')}`;
                                return `https://instagram.com/${ig}`;
                              })()} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 px-4 py-2 bg-pink-50 hover:bg-pink-100 rounded-lg transition-all hover:scale-105 hover:shadow-md group border border-pink-200"
                            >
                              <Instagram className="h-5 w-5 text-pink-600" />
                              <span className="text-sm text-pink-600 font-medium">Instagram</span>
                              <ExternalLink className="h-3 w-3 text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          )}
                          {(selectedMember as any).socialMedia.linkedin && (
                            <a 
                              href={(() => {
                                const li = (selectedMember as any).socialMedia.linkedin;
                                if (li.startsWith('http')) return li;
                                if (li.includes('linkedin.com')) return `https://${li.replace(/^(https?:\/\/)?(www\.)?/, '')}`;
                                return `https://linkedin.com/in/${li}`;
                              })()} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all hover:scale-105 hover:shadow-md group border border-blue-200"
                            >
                              <Linkedin className="h-5 w-5 text-blue-600" />
                              <span className="text-sm text-blue-600 font-medium">LinkedIn</span>
                              <ExternalLink className="h-3 w-3 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          )}
                          {(selectedMember as any).socialMedia.twitter && (
                            <a 
                              href={(() => {
                                const tw = (selectedMember as any).socialMedia.twitter;
                                if (tw.startsWith('http')) return tw;
                                if (tw.includes('tiktok.com')) {
                                  return tw.startsWith('http') ? tw : `https://${tw.replace(/^(https?:\/\/)?(www\.)?/, '')}`;
                                }
                                if (tw.startsWith('@')) return `https://twitter.com/${tw.substring(1)}`;
                                if (tw.includes('twitter.com') || tw.includes('x.com')) {
                                  return `https://${tw.replace(/^(https?:\/\/)?(www\.)?/, '')}`;
                                }
                                return `https://twitter.com/${tw}`;
                              })()} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 px-4 py-2 bg-sky-50 hover:bg-sky-100 rounded-lg transition-all hover:scale-105 hover:shadow-md group border border-sky-200"
                            >
                              <Twitter className="h-5 w-5 text-sky-600" />
                              <span className="text-sm text-sky-600 font-medium">
                                {(selectedMember as any).socialMedia.twitter.includes('tiktok') ? 'TikTok' : 'Twitter'}
                              </span>
                              <ExternalLink className="h-3 w-3 text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
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