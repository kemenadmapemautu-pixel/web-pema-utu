import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  LogOut,
  Users,
  Plus,
  Pencil,
  Trash2,
  Upload
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: "wakil" | "staff"; // wakil = deputy minister, staff = staff
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

export default function MinistryTeamManagement() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [teamData, setTeamData] = useState<MinistryTeam | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<TeamMember>({
    id: "",
    name: "",
    role: "staff",
    email: "",
    phone: "",
    photo: "",
    description: "",
    socialMedia: {
      instagram: "",
      linkedin: "",
      twitter: ""
    }
  });

  useEffect(() => {
    loadTeamData();
  }, [currentUser]);

  const loadTeamData = () => {
    if (!currentUser) return;

    const savedTeams = localStorage.getItem("ministryTeams");
    if (savedTeams) {
      try {
        const teams: MinistryTeam[] = JSON.parse(savedTeams);
        const myTeam = teams.find(t => t.ministerId === currentUser.id);
        
        if (myTeam) {
          setTeamData(myTeam);
        } else {
          // Create new team entry
          const newTeam: MinistryTeam = {
            ministryName: currentUser.department || "Kementerian",
            ministerId: currentUser.id || "",
            members: []
          };
          setTeamData(newTeam);
        }
      } catch (error) {
        console.error("Error loading team data:", error);
      }
    } else {
      // Create new team entry
      const newTeam: MinistryTeam = {
        ministryName: currentUser.department || "Kementerian",
        ministerId: currentUser.id || "",
        members: []
      };
      setTeamData(newTeam);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const openDialog = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      setFormData(member);
    } else {
      setEditingMember(null);
      setFormData({
        id: Date.now().toString(),
        name: "",
        role: "staff",
        email: "",
        phone: "",
        photo: "",
        description: "",
        socialMedia: {
          instagram: "",
          linkedin: "",
          twitter: ""
        }
      });
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingMember(null);
  };

  const handleInputChange = (field: keyof TeamMember, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File terlalu besar",
        description: "Ukuran file maksimal 5MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      handleInputChange("photo", base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Nama harus diisi",
        variant: "destructive"
      });
      return;
    }

    if (!teamData) return;

    let updatedMembers: TeamMember[];
    
    if (editingMember) {
      // Update existing member
      updatedMembers = teamData.members.map(m => 
        m.id === editingMember.id ? formData : m
      );
    } else {
      // Add new member
      updatedMembers = [...teamData.members, formData];
    }

    const updatedTeam: MinistryTeam = {
      ...teamData,
      members: updatedMembers
    };

    // Save to localStorage
    const savedTeams = localStorage.getItem("ministryTeams");
    let teams: MinistryTeam[] = savedTeams ? JSON.parse(savedTeams) : [];
    
    const existingIndex = teams.findIndex(t => t.ministerId === currentUser?.id);
    if (existingIndex >= 0) {
      teams[existingIndex] = updatedTeam;
    } else {
      teams.push(updatedTeam);
    }

    localStorage.setItem("ministryTeams", JSON.stringify(teams));
    setTeamData(updatedTeam);
    
    toast({
      title: "Berhasil!",
      description: editingMember ? "Anggota tim berhasil diperbarui" : "Anggota tim berhasil ditambahkan"
    });

    closeDialog();
  };

  const handleDelete = (memberId: string) => {
    if (!teamData) return;
    
    if (!confirm("Apakah Anda yakin ingin menghapus anggota tim ini?")) return;

    const updatedMembers = teamData.members.filter(m => m.id !== memberId);
    const updatedTeam: MinistryTeam = {
      ...teamData,
      members: updatedMembers
    };

    // Save to localStorage
    const savedTeams = localStorage.getItem("ministryTeams");
    let teams: MinistryTeam[] = savedTeams ? JSON.parse(savedTeams) : [];
    
    const existingIndex = teams.findIndex(t => t.ministerId === currentUser?.id);
    if (existingIndex >= 0) {
      teams[existingIndex] = updatedTeam;
      localStorage.setItem("ministryTeams", JSON.stringify(teams));
    }

    setTeamData(updatedTeam);
    
    toast({
      title: "Berhasil!",
      description: "Anggota tim berhasil dihapus"
    });
  };

  if (!teamData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat data tim...</p>
        </div>
      </div>
    );
  }

  const deputies = teamData.members.filter(m => m.role === "wakil");
  const staffMembers = teamData.members.filter(m => m.role === "staff");

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-gold/5">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/admin/dashboard")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-primary">Kelola Tim Kementerian</h1>
                <p className="text-sm text-muted-foreground">{teamData.ministryName}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Wakil Menteri Section */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center">
                <Users className="h-6 w-6 mr-2 text-gold" />
                Wakil Menteri
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Kelola wakil menteri di kementerian Anda
              </p>
            </div>
            <Button onClick={() => {
              setFormData({ ...formData, role: "wakil" });
              openDialog();
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Wakil Menteri
            </Button>
          </CardHeader>
          <CardContent>
            {deputies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {deputies.map(member => (
                  <Card key={member.id} className="overflow-hidden">
                    <div className="relative">
                      {member.photo ? (
                        <img 
                          src={member.photo} 
                          alt={member.name}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center">
                          <Users className="h-16 w-16 text-gray-300" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => openDialog(member)}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete(member.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-primary">{member.name}</h3>
                      <p className="text-sm text-gold">Wakil Menteri</p>
                      {member.email && (
                        <p className="text-xs text-muted-foreground mt-2">{member.email}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p>Belum ada wakil menteri ditambahkan</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Staff Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center">
                <Users className="h-6 w-6 mr-2 text-blue-500" />
                Staff Kementerian
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Kelola staff di kementerian Anda
              </p>
            </div>
            <Button onClick={() => {
              setFormData({ ...formData, role: "staff" });
              openDialog();
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Staff
            </Button>
          </CardHeader>
          <CardContent>
            {staffMembers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {staffMembers.map(member => (
                  <Card key={member.id} className="overflow-hidden">
                    <div className="relative">
                      {member.photo ? (
                        <img 
                          src={member.photo} 
                          alt={member.name}
                          className="w-full h-40 object-cover"
                        />
                      ) : (
                        <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <Users className="h-12 w-12 text-gray-300" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => openDialog(member)}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete(member.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-primary text-sm">{member.name}</h3>
                      <p className="text-xs text-muted-foreground">Staff</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p>Belum ada staff ditambahkan</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingMember ? "Edit Anggota Tim" : "Tambah Anggota Tim"}
            </DialogTitle>
            <DialogDescription>
              Lengkapi informasi anggota tim kementerian
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Role Selection */}
            <div className="space-y-2">
              <Label>Posisi</Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="wakil"
                    checked={formData.role === "wakil"}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className="w-4 h-4"
                  />
                  <span>Wakil Menteri</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="staff"
                    checked={formData.role === "staff"}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className="w-4 h-4"
                  />
                  <span>Staff</span>
                </label>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <Label>Foto</Label>
              <div className="flex items-center space-x-4">
                {formData.photo && (
                  <img
                    src={formData.photo}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label 
                    htmlFor="photo" 
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Foto
                  </label>
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Nama lengkap"
              />
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+62 812-3456-7890"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Deskripsi singkat tentang anggota tim..."
                rows={3}
              />
            </div>

            {/* Social Media */}
            <div className="space-y-2">
              <Label>Media Sosial</Label>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  value={formData.socialMedia.instagram}
                  onChange={(e) => handleSocialMediaChange("instagram", e.target.value)}
                  placeholder="@instagram"
                />
                <Input
                  value={formData.socialMedia.linkedin}
                  onChange={(e) => handleSocialMediaChange("linkedin", e.target.value)}
                  placeholder="LinkedIn"
                />
                <Input
                  value={formData.socialMedia.twitter}
                  onChange={(e) => handleSocialMediaChange("twitter", e.target.value)}
                  placeholder="@twitter"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Batal
            </Button>
            <Button onClick={handleSave}>
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
