import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  Instagram, 
  Linkedin, 
  Twitter,
  Users,
  Building2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: "wakil" | "staff";
  email: string;
  phone: string;
  photo: string;
  description: string;
  socialMedia: {
    instagram: string;
    linkedin: string;
    twitter: string;
  };
}

interface MinistryTeam {
  ministryName: string;
  ministerId: string;
  members: TeamMember[];
}

interface Minister {
  id: string;
  nama: string;
  jabatan: string;
  departemen: string;
  foto: string;
  email: string;
  telepon: string;
  deskripsi: string;
  socialMedia?: {
    instagram: string;
    linkedin: string;
    twitter: string;
  };
}

interface MinistryPageProps {
  ministryKey: string;
  ministryName: string;
  description: string;
  vision: string;
  mission: string[];
  programs: string[];
}

interface MinistryContent {
  ministryId: string;
  ministryName: string;
  description: string;
  vision: string;
  mission: string[];
  programs: string[];
}

export default function MinistryPage({ 
  ministryKey, 
  ministryName, 
  description: defaultDescription, 
  vision: defaultVision, 
  mission: defaultMission,
  programs: defaultPrograms 
}: MinistryPageProps) {
  const [minister, setMinister] = useState<Minister | null>(null);
  const [teamData, setTeamData] = useState<MinistryTeam | null>(null);
  const [content, setContent] = useState({
    description: defaultDescription,
    vision: defaultVision,
    mission: defaultMission,
    programs: defaultPrograms
  });
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);

  useEffect(() => {
    loadMinisterData();
    loadTeamData();
    loadCustomContent();
  }, [ministryKey, ministryName]);

  const loadMinisterData = () => {
    const savedPengurus = localStorage.getItem("pengurusList");
    if (savedPengurus) {
      try {
        const pengurusList = JSON.parse(savedPengurus);
        const ministerData = pengurusList.find((p: any) => 
          p.departemen === ministryName && 
          p.jabatan?.toLowerCase().includes("menteri") &&
          !p.jabatan?.toLowerCase().includes("wakil")
        );
        if (ministerData) {
          setMinister(ministerData);
        }
      } catch (error) {
        console.error("Error loading minister data:", error);
      }
    }
  };

  const loadTeamData = () => {
    const savedTeams = localStorage.getItem("ministryTeams");
    if (savedTeams) {
      try {
        const teams: MinistryTeam[] = JSON.parse(savedTeams);
        const team = teams.find(t => t.ministryName === ministryName);
        if (team) {
          setTeamData(team);
        }
      } catch (error) {
        console.error("Error loading team data:", error);
      }
    }
  };

  const loadCustomContent = () => {
    const savedContents = localStorage.getItem("ministryContents");
    if (savedContents) {
      try {
        const contents: MinistryContent[] = JSON.parse(savedContents);
        const customContent = contents.find(c => c.ministryName === ministryName);
        if (customContent) {
          setContent({
            description: customContent.description,
            vision: customContent.vision,
            mission: customContent.mission,
            programs: customContent.programs
          });
        }
      } catch (error) {
        console.error("Error loading custom content:", error);
      }
    }
  };

  const deputies = teamData?.members.filter(m => m.role === "wakil") || [];
  const staffMembers = teamData?.members.filter(m => m.role === "staff") || [];
  
  // Gabungkan semua pengurus: Menteri, Wakil, Staff
  const allMembers = [
    ...(minister ? [{ ...minister, role: 'menteri', name: minister.nama, photo: minister.foto, description: minister.deskripsi, email: minister.email, phone: minister.telepon }] : []),
    ...deputies.map(d => ({ ...d, role: 'wakil' })),
    ...staffMembers.map(s => ({ ...s, role: 'staff' }))
  ];

  const nextMember = () => {
    setCurrentMemberIndex((prev) => (prev + 1) % allMembers.length);
  };

  const prevMember = () => {
    setCurrentMemberIndex((prev) => (prev - 1 + allMembers.length) % allMembers.length);
  };

  const currentMember = allMembers[currentMemberIndex];
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-gold/5">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-gold text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Building2 className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{ministryName}</h1>
            <p className="text-xl text-white/90">{content.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Visi & Misi */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Visi</h2>
              <p className="text-muted-foreground leading-relaxed">{content.vision}</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Misi</h2>
              <ul className="space-y-2">
                {content.mission.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-6 h-6 rounded-full bg-gold/20 text-gold text-sm flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Pengurus Kementerian Carousel */}
        {allMembers.length > 0 && currentMember && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              Pengurus Kementerian
            </h2>
            <Card className="shadow-card max-w-4xl mx-auto relative">
              {/* Navigation Buttons */}
              {allMembers.length > 1 && (
                <>
                  <button
                    onClick={prevMember}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
                    aria-label="Previous member"
                  >
                    <ChevronLeft className="h-6 w-6 text-primary" />
                  </button>
                  <button
                    onClick={nextMember}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
                    aria-label="Next member"
                  >
                    <ChevronRight className="h-6 w-6 text-primary" />
                  </button>
                </>
              )}
              
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="w-48 h-48 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
                    {currentMember.photo ? (
                      <img 
                        src={currentMember.photo} 
                        alt={currentMember.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-gold/20 flex items-center justify-center">
                        <Users className="h-20 w-20 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-primary mb-2">{currentMember.name}</h3>
                    <p className="text-gold font-medium text-lg mb-1">
                      {currentMember.role === 'menteri' ? (currentMember as any).jabatan : 
                       currentMember.role === 'wakil' ? 'Wakil Menteri' : 'Staff Kementerian'}
                    </p>
                    {/* Role Badge */}
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
                         style={{
                           backgroundColor: currentMember.role === 'menteri' ? '#fbbf24' : 
                                          currentMember.role === 'wakil' ? '#60a5fa' : '#a78bfa',
                           color: 'white'
                         }}>
                      {currentMember.role === 'menteri' ? 'Menteri' : 
                       currentMember.role === 'wakil' ? 'Wakil Menteri' : 'Staff'}
                    </div>
                    {currentMember.description && (
                      <p className="text-muted-foreground mb-6 leading-relaxed">{currentMember.description}</p>
                    )}
                    <div className="space-y-2">
                      {currentMember.email && (
                        <div className="flex items-center justify-center md:justify-start text-sm text-muted-foreground">
                          <Mail className="h-4 w-4 mr-2" />
                          {currentMember.email}
                        </div>
                      )}
                      {currentMember.phone && (
                        <div className="flex items-center justify-center md:justify-start text-sm text-muted-foreground">
                          <Phone className="h-4 w-4 mr-2" />
                          {currentMember.phone}
                        </div>
                      )}
                      {currentMember.socialMedia && (
                        <div className="flex items-center justify-center md:justify-start space-x-4 pt-2">
                          {currentMember.socialMedia.instagram && (
                            <a 
                              href={(() => {
                                const ig = currentMember.socialMedia.instagram;
                                if (ig.startsWith('http')) return ig;
                                if (ig.startsWith('@')) return `https://instagram.com/${ig.substring(1)}`;
                                if (ig.includes('instagram.com')) return `https://${ig.replace(/^(https?:\/\/)?(www\.)?/, '')}`;
                                return `https://instagram.com/${ig}`;
                              })()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-pink-600 hover:text-pink-700 transition-colors"
                              title="Instagram"
                            >
                              <Instagram className="h-5 w-5" />
                            </a>
                          )}
                          {currentMember.socialMedia.linkedin && (
                            <a 
                              href={(() => {
                                const li = currentMember.socialMedia.linkedin;
                                if (li.startsWith('http')) return li;
                                if (li.includes('linkedin.com')) return `https://${li.replace(/^(https?:\/\/)?(www\.)?/, '')}`;
                                return `https://linkedin.com/in/${li}`;
                              })()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 transition-colors"
                              title="LinkedIn"
                            >
                              <Linkedin className="h-5 w-5" />
                            </a>
                          )}
                          {currentMember.socialMedia.twitter && (
                            <a 
                              href={(() => {
                                const tw = currentMember.socialMedia.twitter;
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
                              className="text-sky-500 hover:text-sky-600 transition-colors"
                              title={currentMember.socialMedia.twitter.includes('tiktok') ? 'TikTok' : 'Twitter'}
                            >
                              <Twitter className="h-5 w-5" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Pagination Dots */}
            {allMembers.length > 1 && (
              <div className="flex justify-center items-center gap-3 mt-6">
                {allMembers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMemberIndex(index)}
                    className={`transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      index === currentMemberIndex
                        ? 'w-8 h-3 bg-primary rounded-full'
                        : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-primary/50 hover:scale-125'
                    }`}
                    aria-label={`Go to member ${index + 1}`}
                    aria-current={index === currentMemberIndex ? 'true' : 'false'}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Programs */}
        {content.programs.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">Program Kerja</h2>
            <Card className="shadow-card">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {content.programs.map((program, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-gold/5">
                      <span className="inline-block w-8 h-8 rounded-full bg-gold text-white text-sm flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-muted-foreground pt-1">{program}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
