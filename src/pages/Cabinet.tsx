import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, MapPin, Calendar, Award } from "lucide-react";
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

const cabinetMembers: CabinetMember[] = [
  {
    id: "president",
    name: "Ahmad Fauzi Rahman",
    position: "Presiden Mahasiswa",
    faculty: "Fakultas Teknik",
    department: "Teknik Informatika",
    email: "president@pema.utu.ac.id",
    phone: "+62 812-3456-7890",
    image: presidentImg,
    description: "Memimpin dengan visi untuk mewujudkan kampus yang inovatif dan berkualitas. Berpengalaman dalam organisasi kemahasiswaan dan memiliki dedikasi tinggi untuk kemajuan universitas.",
    achievements: ["Juara 1 Lomba Debat Nasional 2023", "Best Speaker ASEAN Youth Conference", "Founder StartupTech Community"],
    period: "2024-2025"
  },
  {
    id: "vice-president",
    name: "Siti Nurhaliza",
    position: "Wakil Presiden",
    faculty: "Fakultas Ekonomi",
    department: "Manajemen Bisnis",
    email: "vicepresident@pema.utu.ac.id",
    phone: "+62 813-4567-8901",
    image: vicePresidentImg,
    description: "Mendukung kepemimpinan presiden dengan fokus pada pengembangan soft skill mahasiswa dan program kewirausahaan. Aktif dalam berbagai kegiatan sosial kemasyarakatan.",
    achievements: ["Wirausaha Muda Terbaik 2023", "Koordinator Program CSR Universitas", "Mentor Startup Incubator"],
    period: "2024-2025"
  },
  {
    id: "minister-education",
    name: "Rizki Pratama",
    position: "Menteri Pendidikan",
    faculty: "Fakultas Keguruan",
    department: "Pendidikan Matematika",
    email: "education@pema.utu.ac.id",
    phone: "+62 814-5678-9012",
    image: minister1Img,
    description: "Mengelola program-program akademik dan pengembangan kualitas pendidikan di kampus. Berpengalaman sebagai tutor dan asisten dosen dengan track record yang baik.",
    achievements: ["Mahasiswa Berprestasi 2023", "Tutor Terbaik Fakultas", "Penerima Beasiswa Unggulan"],
    period: "2024-2025"
  },
  {
    id: "minister-student-affairs",
    name: "Fatimah Azzahra",
    position: "Menteri Kemahasiswaan",
    faculty: "Fakultas Hukum",
    department: "Ilmu Hukum",
    email: "studentaffairs@pema.utu.ac.id",
    phone: "+62 815-6789-0123",
    image: minister2Img,
    description: "Bertanggung jawab atas kesejahteraan mahasiswa dan pengembangan organisasi kemahasiswaan. Aktif dalam advokasi hak-hak mahasiswa dan program pengembangan karakter.",
    achievements: ["Aktivis Hak Mahasiswa Terbaik", "Koordinator Program Beasiswa", "Volunteer Award 2023"],
    period: "2024-2025"
  }
];

export default function Cabinet() {
  const [selectedMember, setSelectedMember] = useState<CabinetMember | null>(null);

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
              {cabinetMembers.slice(0, 2).map(member => renderMemberCard(member, true))}
            </div>
          </TabsContent>

          <TabsContent value="ministers" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cabinetMembers.slice(2).map(member => renderMemberCard(member))}
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
                    
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-3 flex items-center">
                        <Award className="h-5 w-5 text-gold mr-2" />
                        Prestasi & Pencapaian
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