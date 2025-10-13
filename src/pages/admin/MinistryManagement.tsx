import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Save, 
  Users, 
  Plus, 
  Trash2,
  Building2,
  Upload,
  X
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

interface MinistryContent {
  ministryId: string;
  ministryName: string;
  description: string;
  vision: string;
  mission: string[];
  programs: string[];
}

export default function MinistryManagement() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [content, setContent] = useState<MinistryContent>({
    ministryId: "",
    ministryName: "",
    description: "",
    vision: "",
    mission: [""],
    programs: [""]
  });
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMinistryData();
  }, [currentUser]);

  const loadMinistryData = () => {
    if (!currentUser || currentUser.role !== 'menteri') {
      setIsLoading(false);
      return;
    }

    // Load content
    const savedContents = localStorage.getItem("ministryContents");
    if (savedContents) {
      try {
        const contents: MinistryContent[] = JSON.parse(savedContents);
        const myContent = contents.find(c => c.ministryName === currentUser.department);
        if (myContent) {
          setContent(myContent);
        } else {
          // Initialize dengan department name
          setContent(prev => ({
            ...prev,
            ministryName: currentUser.department || "",
            ministryId: currentUser.department || ""
          }));
        }
      } catch (error) {
        console.error("Error loading content:", error);
      }
    } else {
      setContent(prev => ({
        ...prev,
        ministryName: currentUser.department || "",
        ministryId: currentUser.department || ""
      }));
    }

    // Load team members
    const savedTeams = localStorage.getItem("ministryTeams");
    if (savedTeams) {
      try {
        const teams = JSON.parse(savedTeams);
        const myTeam = teams.find((t: any) => t.ministryName === currentUser.department);
        if (myTeam) {
          setTeamMembers(myTeam.members);
        }
      } catch (error) {
        console.error("Error loading team:", error);
      }
    }

    setIsLoading(false);
  };

  const saveContent = () => {
    const savedContents = localStorage.getItem("ministryContents");
    let contents: MinistryContent[] = savedContents ? JSON.parse(savedContents) : [];
    
    // Remove existing content for this ministry
    contents = contents.filter(c => c.ministryName !== currentUser?.department);
    
    // Add updated content
    contents.push(content);
    
    localStorage.setItem("ministryContents", JSON.stringify(contents));
    
    toast({
      title: "Berhasil Disimpan! ✅",
      description: "Konten kementerian telah diupdate",
    });
  };

  const saveTeam = () => {
    const savedTeams = localStorage.getItem("ministryTeams");
    let teams = savedTeams ? JSON.parse(savedTeams) : [];
    
    // Remove existing team for this ministry
    teams = teams.filter((t: any) => t.ministryName !== currentUser?.department);
    
    // Add updated team
    teams.push({
      ministryName: currentUser?.department,
      ministerId: currentUser?.id,
      members: teamMembers
    });
    
    localStorage.setItem("ministryTeams", JSON.stringify(teams));
    
    toast({
      title: "Tim Berhasil Disimpan! ✅",
      description: "Data tim kementerian telah diupdate",
    });
  };

  const addMissionItem = () => {
    setContent(prev => ({
      ...prev,
      mission: [...prev.mission, ""]
    }));
  };

  const removeMissionItem = (index: number) => {
    setContent(prev => ({
      ...prev,
      mission: prev.mission.filter((_, i) => i !== index)
    }));
  };

  const updateMissionItem = (index: number, value: string) => {
    setContent(prev => ({
      ...prev,
      mission: prev.mission.map((item, i) => i === index ? value : item)
    }));
  };

  const addProgramItem = () => {
    setContent(prev => ({
      ...prev,
      programs: [...prev.programs, ""]
    }));
  };

  const removeProgramItem = (index: number) => {
    setContent(prev => ({
      ...prev,
      programs: prev.programs.filter((_, i) => i !== index)
    }));
  };

  const updateProgramItem = (index: number, value: string) => {
    setContent(prev => ({
      ...prev,
      programs: prev.programs.map((item, i) => i === index ? value : item)
    }));
  };

  const addTeamMember = (role: "wakil" | "staff") => {
    const newMember: TeamMember = {
      id: `member-${Date.now()}`,
      name: "",
      role,
      email: "",
      phone: "",
      photo: "",
      description: "",
      socialMedia: {
        instagram: "",
        linkedin: "",
        twitter: ""
      }
    };
    setTeamMembers(prev => [...prev, newMember]);
  };

  const removeTeamMember = (id: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
  };

  const updateTeamMember = (id: string, field: keyof TeamMember, value: any) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  const handlePhotoUpload = (memberId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateTeamMember(memberId, 'photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!currentUser || currentUser.role !== 'menteri') {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Halaman ini hanya dapat diakses oleh Menteri
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const deputies = teamMembers.filter(m => m.role === "wakil");
  const staff = teamMembers.filter(m => m.role === "staff");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            Kelola Kementerian
          </h1>
          <p className="text-muted-foreground mt-1">
            {currentUser.department}
          </p>
        </div>
      </div>

      {/* Content Management */}
      <Card>
        <CardHeader>
          <CardTitle>Konten Halaman Kementerian</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Singkat</Label>
            <Textarea
              id="description"
              value={content.description}
              onChange={(e) => setContent(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Deskripsi singkat kementerian..."
              rows={3}
            />
          </div>

          {/* Vision */}
          <div className="space-y-2">
            <Label htmlFor="vision">Visi</Label>
            <Textarea
              id="vision"
              value={content.vision}
              onChange={(e) => setContent(prev => ({ ...prev, vision: e.target.value }))}
              placeholder="Visi kementerian..."
              rows={3}
            />
          </div>

          {/* Mission */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Misi</Label>
              <Button onClick={addMissionItem} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Misi
              </Button>
            </div>
            {content.mission.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={item}
                  onChange={(e) => updateMissionItem(index, e.target.value)}
                  placeholder={`Misi ${index + 1}`}
                />
                <Button
                  onClick={() => removeMissionItem(index)}
                  size="icon"
                  variant="ghost"
                  disabled={content.mission.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Programs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Program Kerja</Label>
              <Button onClick={addProgramItem} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Program
              </Button>
            </div>
            {content.programs.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={item}
                  onChange={(e) => updateProgramItem(index, e.target.value)}
                  placeholder={`Program ${index + 1}`}
                />
                <Button
                  onClick={() => removeProgramItem(index)}
                  size="icon"
                  variant="ghost"
                  disabled={content.programs.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button onClick={saveContent} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Simpan Konten
          </Button>
        </CardContent>
      </Card>

      {/* Team Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Kelola Tim Kementerian
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Wakil Menteri */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Wakil Menteri</h3>
              <Button onClick={() => addTeamMember("wakil")} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Wakil
              </Button>
            </div>

            {deputies.map((member) => (
              <Card key={member.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium">Wakil Menteri</h4>
                    <Button
                      onClick={() => removeTeamMember(member.id)}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nama</Label>
                      <Input
                        value={member.name}
                        onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                        placeholder="Nama lengkap"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        value={member.email}
                        onChange={(e) => updateTeamMember(member.id, 'email', e.target.value)}
                        placeholder="email@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Telepon</Label>
                      <Input
                        value={member.phone}
                        onChange={(e) => updateTeamMember(member.id, 'phone', e.target.value)}
                        placeholder="08xxxxxxxxxx"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Foto</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(member.id, e)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Deskripsi</Label>
                    <Textarea
                      value={member.description}
                      onChange={(e) => updateTeamMember(member.id, 'description', e.target.value)}
                      placeholder="Deskripsi singkat..."
                      rows={2}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Instagram</Label>
                      <Input
                        value={member.socialMedia.instagram}
                        onChange={(e) => updateTeamMember(member.id, 'socialMedia', { 
                          ...member.socialMedia, 
                          instagram: e.target.value 
                        })}
                        placeholder="@username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>LinkedIn</Label>
                      <Input
                        value={member.socialMedia.linkedin}
                        onChange={(e) => updateTeamMember(member.id, 'socialMedia', { 
                          ...member.socialMedia, 
                          linkedin: e.target.value 
                        })}
                        placeholder="linkedin.com/in/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Twitter/TikTok</Label>
                      <Input
                        value={member.socialMedia.twitter}
                        onChange={(e) => updateTeamMember(member.id, 'socialMedia', { 
                          ...member.socialMedia, 
                          twitter: e.target.value 
                        })}
                        placeholder="@username"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Staff */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Staff Kementerian</h3>
              <Button onClick={() => addTeamMember("staff")} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Staff
              </Button>
            </div>

            {staff.map((member) => (
              <Card key={member.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium">Staff</h4>
                    <Button
                      onClick={() => removeTeamMember(member.id)}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nama</Label>
                      <Input
                        value={member.name}
                        onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                        placeholder="Nama lengkap"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Foto</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(member.id, e)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Instagram</Label>
                      <Input
                        value={member.socialMedia.instagram}
                        onChange={(e) => updateTeamMember(member.id, 'socialMedia', { 
                          ...member.socialMedia, 
                          instagram: e.target.value 
                        })}
                        placeholder="@username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>LinkedIn</Label>
                      <Input
                        value={member.socialMedia.linkedin}
                        onChange={(e) => updateTeamMember(member.id, 'socialMedia', { 
                          ...member.socialMedia, 
                          linkedin: e.target.value 
                        })}
                        placeholder="linkedin.com/in/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Twitter/TikTok</Label>
                      <Input
                        value={member.socialMedia.twitter}
                        onChange={(e) => updateTeamMember(member.id, 'socialMedia', { 
                          ...member.socialMedia, 
                          twitter: e.target.value 
                        })}
                        placeholder="@username"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Button onClick={saveTeam} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Simpan Tim
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
