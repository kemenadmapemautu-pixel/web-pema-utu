import { Users, ChevronDown, ChevronRight, Mail, Phone, ArrowRight, Eye, Building2, Network } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

// Data struktur organisasi akan diambil dari localStorage (dikelola via admin dashboard)
const structureData: Division[] = [];

export default function Structure() {
  const [expandedDivision, setExpandedDivision] = useState<string | null>("leadership");
  const [cabinetMembers, setCabinetMembers] = useState<any[]>([]);
  const [dynamicStructure, setDynamicStructure] = useState<Division[]>([]);
  const [structureConfig, setStructureConfig] = useState({
    leadershipTitle: "Pimpinan Kabinet",
    leadershipSubtitle: "Presiden & Wakil Presiden",
    showConnector: true,
    ministerGridCols: 3,
    infoText: "Struktur organisasi berdasarkan data kabinet aktif"
  });

  useEffect(() => {
    // Load data pengurus dari localStorage untuk sinkronisasi
    const savedPengurus = localStorage.getItem("pengurusList");
    if (savedPengurus) {
      const pengurusList = JSON.parse(savedPengurus);
      const completedMembers = pengurusList.filter((p: any) => p.profileCompleted === true);
      setCabinetMembers(completedMembers);
    }

    // Load structure configuration dari localStorage
    const savedConfig = localStorage.getItem("structureConfig");
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      setStructureConfig(parsedConfig);
    }
  }, []);

  const toggleDivision = (divisionId: string) => {
    setExpandedDivision(expandedDivision === divisionId ? null : divisionId);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary">
            Struktur <span className="text-gradient-accent">Organisasi</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Struktur organisasi PEMA UTU Kabinet Samgrahita yang terdiri dari berbagai divisi dengan fungsi dan tanggung jawab yang spesifik.
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

        {/* Organization Hierarchy Chart */}
        {cabinetMembers.length > 0 ? (
          <div className="mb-16">
            <Card className="shadow-card bg-gradient-to-br from-primary/5 to-gold/5">
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center">
                  <Building2 className="h-6 w-6 mr-2 text-gold" />
                  Hierarki Organisasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-6 py-4">
                  {/* Level 1: Leadership */}
                  <div className="text-center">
                    <div className="inline-block bg-gold text-primary px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-smooth">
                      <div className="font-bold text-lg">{structureConfig.leadershipTitle}</div>
                      <div className="text-sm mt-1">{structureConfig.leadershipSubtitle}</div>
                      {cabinetMembers.filter((m: any) => m.tipe === 'pimpinan').length > 0 && (
                        <div className="text-xs mt-1 opacity-80">
                          {cabinetMembers.filter((m: any) => m.tipe === 'pimpinan').length} orang
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Connector */}
                  {structureConfig.showConnector && cabinetMembers.filter((m: any) => m.tipe === 'menteri').length > 0 && (
                    <div className="w-px h-12 bg-gradient-to-b from-gold to-primary"></div>
                  )}

                  {/* Level 2: Ministers */}
                  {cabinetMembers.filter((m: any) => m.tipe === 'menteri').length > 0 && (
                    <div className={`grid grid-cols-2 md:grid-cols-${structureConfig.ministerGridCols} gap-6 w-full max-w-4xl`}>
                      {cabinetMembers.filter((m: any) => m.tipe === 'menteri').map((member: any) => (
                        <div key={member.id} className="flex flex-col items-center">
                          <div className="bg-primary text-white px-4 py-3 rounded-lg shadow-md text-center hover:bg-primary/90 hover:shadow-lg transition-smooth w-full">
                            <div className="font-semibold text-sm">{member.jabatan}</div>
                            <div className="text-xs mt-1 opacity-80">{member.nama}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Info Text */}
                  <div className="text-center text-sm text-muted-foreground mt-4">
                    <Network className="h-4 w-4 inline mr-2" />
                    {structureConfig.infoText}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="mb-16">
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
          </div>
        )}

        {/* Detailed Division Structure - Hidden karena menggunakan data dinamis dari localStorage */}
        {cabinetMembers.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary text-center mb-8">
              Daftar Anggota Kabinet
            </h2>
            
            {/* Leadership Section */}
            {cabinetMembers.filter((m: any) => m.tipe === 'pimpinan').length > 0 && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center">
                    <Users className="h-6 w-6 mr-2" />
                    Pimpinan Kabinet
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cabinetMembers.filter((m: any) => m.tipe === 'pimpinan').map((member: any) => (
                      <Card key={member.id} className="bg-gold/10">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-primary">{member.nama}</h4>
                          <p className="text-sm text-gold">{member.jabatan}</p>
                          <p className="text-xs text-muted-foreground">{member.fakultas}</p>
                          <div className="mt-3 space-y-1">
                            <div className="flex items-center space-x-2 text-xs">
                              <Mail className="h-3 w-3 text-gold" />
                              <span className="text-muted-foreground">{member.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs">
                              <Phone className="h-3 w-3 text-gold" />
                              <span className="text-muted-foreground">{member.telepon}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Ministers Section */}
            {cabinetMembers.filter((m: any) => m.tipe === 'menteri').length > 0 && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center">
                    <Users className="h-6 w-6 mr-2" />
                    Menteri 
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cabinetMembers.filter((m: any) => m.tipe === 'menteri').map((member: any) => (
                      <Card key={member.id} className="hover:shadow-card transition-smooth">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-primary">{member.nama}</h4>
                          <p className="text-sm text-gold">{member.jabatan}</p>
                          <p className="text-xs text-muted-foreground">{member.fakultas}</p>
                          <div className="mt-3 space-y-1">
                            <div className="flex items-center space-x-2 text-xs">
                              <Mail className="h-3 w-3 text-gold" />
                              <span className="text-muted-foreground truncate">{member.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs">
                              <Phone className="h-3 w-3 text-gold" />
                              <span className="text-muted-foreground">{member.telepon}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Old structure data - commented out */}
        <div className="space-y-6 hidden">
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
        {cabinetMembers.length > 0 && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 shadow-card">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">
                    {cabinetMembers.length}
                  </h3>
                  <p className="text-muted-foreground">Total Anggota Kabinet</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 shadow-card">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-white">
                    {cabinetMembers.filter((m: any) => m.tipe === 'pimpinan').length}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">
                    {cabinetMembers.filter((m: any) => m.tipe === 'pimpinan').length}
                  </h3>
                  <p className="text-muted-foreground">Pimpinan</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 shadow-card">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-white">
                    {cabinetMembers.filter((m: any) => m.tipe === 'menteri').length}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">
                    {cabinetMembers.filter((m: any) => m.tipe === 'menteri').length}
                  </h3>
                  <p className="text-muted-foreground">Menteri</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Link to Cabinet Page */}
        <div className="mt-16 text-center">
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
