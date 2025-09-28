import { Users, ChevronDown, ChevronRight, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Member {
  name: string;
  position: string;
  faculty: string;
  email: string;
  phone: string;
}

interface Division {
  id: string;
  name: string;
  head: Member;
  members: Member[];
  description: string;
  responsibilities: string[];
}

const structureData: Division[] = [
  {
    id: "leadership",
    name: "Pimpinan Kabinet",
    head: {
      name: "Ahmad Fauzi Rahman",
      position: "Presiden Mahasiswa",
      faculty: "Fakultas Teknik",
      email: "president@pema.utu.ac.id",
      phone: "+62 812-3456-7890"
    },
    members: [
      {
        name: "Siti Nurhaliza",
        position: "Wakil Presiden",
        faculty: "Fakultas Ekonomi",
        email: "vicepresident@pema.utu.ac.id",
        phone: "+62 813-4567-8901"
      }
    ],
    description: "Memimpin dan mengarahkan seluruh kegiatan kabinet serta bertanggung jawab atas pencapaian visi misi organisasi.",
    responsibilities: [
      "Memimpin rapat kabinet dan koordinasi antar divisi",
      "Mewakili mahasiswa dalam forum resmi universitas",
      "Mengambil keputusan strategis organisasi",
      "Mengawasi implementasi program kerja"
    ]
  },
  {
    id: "education",
    name: "Divisi Pendidikan",
    head: {
      name: "Rizki Pratama",
      position: "Menteri Pendidikan",
      faculty: "Fakultas Keguruan",
      email: "education@pema.utu.ac.id",
      phone: "+62 814-5678-9012"
    },
    members: [
      {
        name: "Dina Amelia",
        position: "Koordinator Program Akademik",
        faculty: "Fakultas Keguruan",
        email: "academic@pema.utu.ac.id",
        phone: "+62 816-7890-1234"
      },
      {
        name: "Bayu Santoso",
        position: "Koordinator Penelitian",
        faculty: "Fakultas Teknik",
        email: "research@pema.utu.ac.id",
        phone: "+62 817-8901-2345"
      }
    ],
    description: "Mengelola program-program yang berkaitan dengan peningkatan kualitas akademik dan pendidikan mahasiswa.",
    responsibilities: [
      "Mengadakan workshop dan seminar pendidikan",
      "Mengelola program mentor-mentee",
      "Memfasilitasi kegiatan penelitian mahasiswa",
      "Mengembangkan learning hub digital"
    ]
  },
  {
    id: "student-affairs",
    name: "Divisi Kemahasiswaan",
    head: {
      name: "Fatimah Azzahra",
      position: "Menteri Kemahasiswaan",
      faculty: "Fakultas Hukum",
      email: "studentaffairs@pema.utu.ac.id",
      phone: "+62 815-6789-0123"
    },
    members: [
      {
        name: "Muhammad Ridwan",
        position: "Koordinator Organisasi",
        faculty: "Fakultas Sosial Politik",
        email: "organization@pema.utu.ac.id",
        phone: "+62 818-9012-3456"
      },
      {
        name: "Sari Indah",
        position: "Koordinator Kesejahteraan",
        faculty: "Fakultas Psikologi",
        email: "welfare@pema.utu.ac.id",
        phone: "+62 819-0123-4567"
      }
    ],
    description: "Menangani kesejahteraan mahasiswa dan mengkoordinasi kegiatan organisasi kemahasiswaan di kampus.",
    responsibilities: [
      "Mengelola program kesejahteraan mahasiswa",
      "Mengkoordinasi kegiatan UKM dan Himpunan",
      "Menyelenggarakan program pengembangan karakter",
      "Memfasilitasi kegiatan sosial kemasyarakatan"
    ]
  },
  {
    id: "technology",
    name: "Divisi Teknologi & Inovasi",
    head: {
      name: "Andi Pratama",
      position: "Menteri Teknologi",
      faculty: "Fakultas Teknik",
      email: "technology@pema.utu.ac.id",
      phone: "+62 820-1234-5678"
    },
    members: [
      {
        name: "Lisa Anggraini",
        position: "Koordinator IT",
        faculty: "Fakultas Teknik",
        email: "it@pema.utu.ac.id",
        phone: "+62 821-2345-6789"
      },
      {
        name: "Rahmat Hidayat",
        position: "Koordinator Media Digital",
        faculty: "Fakultas Komunikasi",
        email: "digital@pema.utu.ac.id",
        phone: "+62 822-3456-7890"
      }
    ],
    description: "Mengembangkan sistem teknologi informasi dan mendorong inovasi di lingkungan kampus.",
    responsibilities: [
      "Mengelola sistem informasi PEMA UTU",
      "Mengadakan kompetisi teknologi",
      "Mengembangkan platform digital kampus",
      "Memfasilitasi startup dan inovasi mahasiswa"
    ]
  },
  {
    id: "entrepreneurship",
    name: "Divisi Kewirausahaan",
    head: {
      name: "Budi Setiawan",
      position: "Menteri Kewirausahaan",
      faculty: "Fakultas Ekonomi",
      email: "entrepreneurship@pema.utu.ac.id",
      phone: "+62 823-4567-8901"
    },
    members: [
      {
        name: "Nina Karlina",
        position: "Koordinator Inkubator",
        faculty: "Fakultas Ekonomi",
        email: "incubator@pema.utu.ac.id",
        phone: "+62 824-5678-9012"
      },
      {
        name: "Faisal Rahman",
        position: "Koordinator UMKM",
        faculty: "Fakultas Ekonomi",
        email: "umkm@pema.utu.ac.id",
        phone: "+62 825-6789-0123"
      }
    ],
    description: "Mengembangkan jiwa kewirausahaan mahasiswa dan memfasilitasi pengembangan bisnis startup.",
    responsibilities: [
      "Mengelola program startup incubator",
      "Mengadakan workshop bisnis dan UMKM",
      "Memfasilitasi akses modal dan mentoring",
      "Mengorganisir business plan competition"
    ]
  },
  {
    id: "communication",
    name: "Divisi Komunikasi & Informasi",
    head: {
      name: "Dewi Sartika",
      position: "Menteri Kominfo",
      faculty: "Fakultas Komunikasi",
      email: "communication@pema.utu.ac.id",
      phone: "+62 826-7890-1234"
    },
    members: [
      {
        name: "Arif Wibowo",
        position: "Koordinator Publikasi",
        faculty: "Fakultas Komunikasi",
        email: "publication@pema.utu.ac.id",
        phone: "+62 827-8901-2345"
      },
      {
        name: "Maya Putri",
        position: "Koordinator Media Sosial",
        faculty: "Fakultas Komunikasi",
        email: "social@pema.utu.ac.id",
        phone: "+62 828-9012-3456"
      }
    ],
    description: "Mengelola komunikasi internal dan eksternal serta publikasi kegiatan PEMA UTU.",
    responsibilities: [
      "Mengelola website dan media sosial resmi",
      "Mempublikasikan kegiatan dan program kerja",
      "Menjalin hubungan dengan media massa",
      "Mengkoordinasi dokumentasi kegiatan"
    ]
  }
];

export default function Structure() {
  const [expandedDivision, setExpandedDivision] = useState<string | null>("leadership");

  const toggleDivision = (divisionId: string) => {
    setExpandedDivision(expandedDivision === divisionId ? null : divisionId);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary">
            Struktur <span className="text-gradient-accent">Organisasi</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Struktur organisasi PEMA UTU Kabinet Samgrahita yang terdiri dari berbagai divisi dengan fungsi dan tanggung jawab yang spesifik.
          </p>
        </div>

        {/* Organization Chart */}
        <div className="space-y-6">
          {structureData.map((division) => (
            <Card key={division.id} className="shadow-card">
              <CardHeader 
                className="cursor-pointer hover:bg-muted/50 transition-smooth"
                onClick={() => toggleDivision(division.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-primary">{division.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {division.members.length + 1} anggota
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {division.head.position}
                    </Badge>
                    {expandedDivision === division.id ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CardHeader>

              {expandedDivision === division.id && (
                <CardContent className="space-y-8">
                  {/* Division Description */}
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-primary mb-3">Deskripsi Divisi</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {division.description}
                    </p>
                    
                    <h4 className="font-semibold text-primary mb-2">Tanggung Jawab:</h4>
                    <ul className="space-y-2">
                      {division.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground text-sm">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Division Head */}
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-4">Ketua Divisi</h3>
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                          <div className="space-y-2">
                            <h4 className="text-lg font-semibold text-primary">{division.head.name}</h4>
                            <Badge className="bg-gold text-primary">{division.head.position}</Badge>
                            <p className="text-sm text-muted-foreground">{division.head.faculty}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                              <Mail className="h-4 w-4 text-gold" />
                              <a href={`mailto:${division.head.email}`} className="text-primary hover:text-gold transition-smooth">
                                {division.head.email}
                              </a>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Phone className="h-4 w-4 text-gold" />
                              <span className="text-muted-foreground">{division.head.phone}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Division Members */}
                  {division.members.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-4">Anggota Divisi</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {division.members.map((member, index) => (
                          <Card key={index} className="hover:shadow-card transition-smooth">
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                <div>
                                  <h4 className="font-semibold text-primary">{member.name}</h4>
                                  <p className="text-sm text-gold">{member.position}</p>
                                  <p className="text-xs text-muted-foreground">{member.faculty}</p>
                                </div>
                                
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-2 text-xs">
                                    <Mail className="h-3 w-3 text-gold" />
                                    <a href={`mailto:${member.email}`} className="text-primary hover:text-gold transition-smooth">
                                      {member.email}
                                    </a>
                                  </div>
                                  <div className="flex items-center space-x-2 text-xs">
                                    <Phone className="h-3 w-3 text-gold" />
                                    <span className="text-muted-foreground">{member.phone}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6 shadow-card">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">
                  {structureData.reduce((total, division) => total + division.members.length + 1, 0)}
                </h3>
                <p className="text-muted-foreground">Total Anggota Kabinet</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 shadow-card">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 gradle-primary rounded-xl flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">{structureData.length}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">{structureData.length}</h3>
                <p className="text-muted-foreground">Divisi Aktif</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 shadow-card">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">7</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">7</h3>
                <p className="text-muted-foreground">Fakultas Terwakili</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}