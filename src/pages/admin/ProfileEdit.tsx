import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  LogOut,
  User,
  Save,
  Upload,
  Eye,
  EyeOff
} from "lucide-react";

interface PengurusData {
  id: string;
  name: string;
  position: string;
  department: string;
  faculty: string;
  studyProgram: string;
  description: string;
  image: string;
  email: string;
  phone: string;
  socialMedia: {
    instagram: string;
    linkedin: string;
    twitter: string;
  };
  achievements: string[];
  education: string;
  experience: string;
  organizationHistory: string[];
}

export default function ProfileEdit() {
  const [profileData, setProfileData] = useState<PengurusData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadProfileData();
  }, [currentUser]);

  // Auto-save draft setiap 10 detik
  useEffect(() => {
    if (!profileData || !currentUser) return;

    const autoSaveInterval = setInterval(() => {
      const draftKey = `profile_draft_${currentUser.id}`;
      localStorage.setItem(draftKey, JSON.stringify(profileData));
    }, 10000); // Auto-save setiap 10 detik

    return () => clearInterval(autoSaveInterval);
  }, [profileData, currentUser]);

  // Load draft saat pertama kali load
  useEffect(() => {
    if (!currentUser || profileData) return;

    const draftKey = `profile_draft_${currentUser.id}`;
    const savedDraft = localStorage.getItem(draftKey);
    
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        setProfileData(draftData);
        toast({
          title: "Draft Ditemukan",
          description: "Data draft profil telah dimuat. Jangan lupa simpan perubahan Anda.",
        });
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }
  }, [currentUser, profileData, toast]);

  const loadProfileData = () => {
    if (!currentUser) return;

    const savedPengurus = localStorage.getItem("pengurusList");
    if (savedPengurus) {
      try {
        const pengurusList: any[] = JSON.parse(savedPengurus);
        
        // Find current user's profile data berdasarkan ID atau username
        const userProfile = pengurusList.find(p => 
          p.id === currentUser.id || 
          p.username === currentUser.username ||
          p.nama?.toLowerCase() === currentUser.name?.toLowerCase()
        );

        if (userProfile) {
          // Convert dari format Pengurus ke PengurusData
          const convertedProfile: PengurusData = {
            id: userProfile.id,
            name: userProfile.nama || currentUser.name,
            position: userProfile.jabatan || currentUser.position || "",
            department: userProfile.departemen || currentUser.department || "",
            faculty: userProfile.fakultas || "",
            studyProgram: userProfile.prodi || "",
            description: userProfile.deskripsi || "",
            image: userProfile.foto || "",
            email: userProfile.email || currentUser.username,
            phone: userProfile.telepon || "",
            socialMedia: userProfile.socialMedia || {
              instagram: "",
              linkedin: "",
              twitter: ""
            },
            achievements: userProfile.prestasi || [],
            education: userProfile.education || "",
            experience: userProfile.experience || "",
            organizationHistory: userProfile.organizationHistory || []
          };
          setProfileData(convertedProfile);
        } else {
          // Create default profile if not found
          const defaultProfile: PengurusData = {
            id: currentUser.id || Date.now().toString(),
            name: currentUser.name,
            position: currentUser.position || "",
            department: currentUser.department || "",
            faculty: "",
            studyProgram: "",
            description: "",
            image: "",
            email: currentUser.username,
            phone: "",
            socialMedia: {
              instagram: "",
              linkedin: "",
              twitter: ""
            },
            achievements: [],
            education: "",
            experience: "",
            organizationHistory: []
          };
          setProfileData(defaultProfile);
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChange = (field: string, value: string) => {
    if (!profileData) return;

    setProfileData(prev => ({
      ...prev!,
      [field]: value
    }));
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    if (!profileData) return;

    setProfileData(prev => ({
      ...prev!,
      socialMedia: {
        ...prev!.socialMedia,
        [platform]: value
      }
    }));
  };

  const handleAchievementChange = (index: number, value: string) => {
    if (!profileData) return;

    const newAchievements = [...profileData.achievements];
    newAchievements[index] = value;
    
    setProfileData(prev => ({
      ...prev!,
      achievements: newAchievements
    }));
  };

  const addAchievement = () => {
    if (!profileData) return;

    setProfileData(prev => ({
      ...prev!,
      achievements: [...prev!.achievements, ""]
    }));
  };

  const removeAchievement = (index: number) => {
    if (!profileData) return;

    const newAchievements = profileData.achievements.filter((_, i) => i !== index);
    setProfileData(prev => ({
      ...prev!,
      achievements: newAchievements
    }));
  };

  const handleOrganizationChange = (index: number, value: string) => {
    if (!profileData) return;

    const newOrganizations = [...profileData.organizationHistory];
    newOrganizations[index] = value;
    
    setProfileData(prev => ({
      ...prev!,
      organizationHistory: newOrganizations
    }));
  };

  const addOrganization = () => {
    if (!profileData) return;

    setProfileData(prev => ({
      ...prev!,
      organizationHistory: [...prev!.organizationHistory, ""]
    }));
  };

  const removeOrganization = (index: number) => {
    if (!profileData) return;

    const newOrganizations = profileData.organizationHistory.filter((_, i) => i !== index);
    setProfileData(prev => ({
      ...prev!,
      organizationHistory: newOrganizations
    }));
  };

  const processImageFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File terlalu besar",
        description: "Ukuran file maksimal 5MB",
        variant: "destructive"
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: "File tidak valid",
        description: "Hanya file gambar yang diperbolehkan",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      handleChange("image", base64String);
      toast({
        title: "Berhasil!",
        description: "Foto profil berhasil diupload"
      });
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleSave = async () => {
    if (!profileData || !currentUser) return;

    setIsSaving(true);
    try {
      const savedPengurus = localStorage.getItem("pengurusList");
      let pengurusList: any[] = savedPengurus ? JSON.parse(savedPengurus) : [];

      // Find existing pengurus record
      const existingIndex = pengurusList.findIndex(p => 
        p.id === currentUser.id || 
        p.username === currentUser.username ||
        p.nama?.toLowerCase() === currentUser.name?.toLowerCase()
      );

      if (existingIndex >= 0) {
        // Update existing record dengan data profil yang lengkap
        pengurusList[existingIndex] = {
          ...pengurusList[existingIndex],
          // Update fields yang bisa diedit user
          fakultas: profileData.faculty,
          prodi: profileData.studyProgram,
          deskripsi: profileData.description,
          foto: profileData.image,
          email: profileData.email,
          telepon: profileData.phone,
          prestasi: profileData.achievements,
          organizationHistory: profileData.organizationHistory,
          // Mark profile as completed
          profileCompleted: true,
          // Social media & additional info
          socialMedia: profileData.socialMedia,
          education: profileData.education,
          experience: profileData.experience
        };
      } else {
        // Create new record (shouldn't happen normally)
        const newRecord = {
          id: currentUser.id || Date.now().toString(),
          nama: profileData.name,
          jabatan: profileData.position,
          departemen: profileData.department,
          fakultas: profileData.faculty,
          prodi: profileData.studyProgram,
          email: profileData.email,
          telepon: profileData.phone,
          foto: profileData.image,
          tipe: currentUser.role,
          deskripsi: profileData.description,
          prestasi: profileData.achievements,
          organizationHistory: profileData.organizationHistory,
          username: currentUser.username,
          hasAccount: true,
          profileCompleted: true,
          socialMedia: profileData.socialMedia,
          education: profileData.education,
          experience: profileData.experience
        };
        pengurusList.push(newRecord);
      }

      localStorage.setItem("pengurusList", JSON.stringify(pengurusList));

      // Clear draft setelah berhasil save
      const draftKey = `profile_draft_${currentUser.id}`;
      localStorage.removeItem(draftKey);

      toast({
        title: "Profil Berhasil Disimpan! ✅",
        description: "Data profil Anda telah diperbarui dan akan tampil di website"
      });

    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Gagal Menyimpan",
        description: "Terjadi kesalahan saat menyimpan profil",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat data profil...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Data Profil Tidak Ditemukan</h1>
          <p className="text-muted-foreground mb-6">Silakan hubungi admin untuk setup profil Anda.</p>
          <Button onClick={() => navigate("/admin/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
    );
  }

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
                <h1 className="text-2xl font-bold text-primary">Edit Profil Saya</h1>
                <p className="text-sm text-muted-foreground">Kelola data profil yang tampil di website</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {showPreview ? "Edit" : "Preview"}
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <User className="h-6 w-6 mr-2 text-gold" />
                  Data Profil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap *</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Nama lengkap"
                      disabled={!isAdmin()} // Non-admin tidak bisa ubah nama
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Jabatan *</Label>
                    <Input
                      id="position"
                      value={profileData.position}
                      onChange={(e) => handleChange("position", e.target.value)}
                      placeholder="Contoh: Ketua Umum"
                      disabled={!isAdmin()} // Non-admin tidak bisa ubah jabatan
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Departemen/Bidang *</Label>
                  <Input
                    id="department"
                    value={profileData.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                    placeholder="Contoh: Eksekutif"
                    disabled={!isAdmin()} // Non-admin tidak bisa ubah departemen
                  />
                </div>

                {/* Fakultas & Program Studi */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="faculty">Fakultas</Label>
                    <Input
                      id="faculty"
                      value={profileData.faculty}
                      onChange={(e) => handleChange("faculty", e.target.value)}
                      placeholder="Contoh: Fakultas Teknik"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studyProgram">Program Studi</Label>
                    <Input
                      id="studyProgram"
                      value={profileData.studyProgram}
                      onChange={(e) => handleChange("studyProgram", e.target.value)}
                      placeholder="Contoh: Teknik Informatika"
                    />
                  </div>
                </div>

                {/* Photo Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image">Foto Profil</Label>
                  <div className="flex items-center space-x-4">
                    {profileData.image && (
                      <img
                        src={profileData.image}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-lg border-2 border-white shadow-sm"
                      />
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label 
                        htmlFor="image" 
                        className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Foto
                      </label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Format: JPG, PNG | Maksimal: 5MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+62 812-3456-7890"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi/Bio</Label>
                  <Textarea
                    id="description"
                    value={profileData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Ceritakan tentang diri Anda, visi, misi, atau hal menarik lainnya..."
                    rows={4}
                  />
                </div>

                {/* Education & Experience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="education">Pendidikan</Label>
                    <Textarea
                      id="education"
                      value={profileData.education}
                      onChange={(e) => handleChange("education", e.target.value)}
                      placeholder="Riwayat pendidikan..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Pengalaman</Label>
                    <Textarea
                      id="experience"
                      value={profileData.experience}
                      onChange={(e) => handleChange("experience", e.target.value)}
                      placeholder="Pengalaman organisasi, kerja, dll..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Social Media */}
                <div className="space-y-4">
                  <Label>Media Sosial</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={profileData.socialMedia.instagram}
                        onChange={(e) => handleSocialMediaChange("instagram", e.target.value)}
                        placeholder="@username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={profileData.socialMedia.linkedin}
                        onChange={(e) => handleSocialMediaChange("linkedin", e.target.value)}
                        placeholder="linkedin.com/in/username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={profileData.socialMedia.twitter}
                        onChange={(e) => handleSocialMediaChange("twitter", e.target.value)}
                        placeholder="@username"
                      />
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Prestasi & Penghargaan</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addAchievement}>
                      Tambah Prestasi
                    </Button>
                  </div>
                  {profileData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={achievement}
                        onChange={(e) => handleAchievementChange(index, e.target.value)}
                        placeholder="Prestasi atau penghargaan..."
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeAchievement(index)}
                        className="text-red-600"
                      >
                        Hapus
                      </Button>
                    </div>
                  ))}
                  {profileData.achievements.length === 0 && (
                    <p className="text-sm text-muted-foreground">Belum ada prestasi ditambahkan</p>
                  )}
                </div>

                {/* Organization History */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Riwayat Organisasi</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addOrganization}>
                      Tambah Organisasi
                    </Button>
                  </div>
                  {profileData.organizationHistory.map((organization, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={organization}
                        onChange={(e) => handleOrganizationChange(index, e.target.value)}
                        placeholder="Nama organisasi dan jabatan..."
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeOrganization(index)}
                        className="text-red-600"
                      >
                        Hapus
                      </Button>
                    </div>
                  ))}
                  {profileData.organizationHistory.length === 0 && (
                    <p className="text-sm text-muted-foreground">Belum ada riwayat organisasi ditambahkan</p>
                  )}
                </div>

                {/* Save Button */}
                <div className="pt-6 border-t">
                  <Button 
                    onClick={handleSave} 
                    disabled={isSaving}
                    size="lg"
                    className="w-full"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    {isSaving ? "Menyimpan..." : "Simpan Profil"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Preview Profil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profileData.image && (
                  <img
                    src={profileData.image}
                    alt={profileData.name}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                )}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-primary">{profileData.name}</h3>
                  <p className="text-gold font-medium">{profileData.position}</p>
                  <p className="text-sm text-muted-foreground">{profileData.department}</p>
                  {profileData.faculty && (
                    <p className="text-xs text-muted-foreground">{profileData.faculty}</p>
                  )}
                  {profileData.studyProgram && (
                    <p className="text-xs text-muted-foreground">{profileData.studyProgram}</p>
                  )}
                </div>
                
                {profileData.description && (
                  <div>
                    <h4 className="font-semibold mb-2">Tentang</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {profileData.description}
                    </p>
                  </div>
                )}

                {profileData.achievements.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Prestasi</h4>
                    <ul className="text-sm space-y-1">
                      {profileData.achievements.filter(a => a.trim()).map((achievement, index) => (
                        <li key={index} className="text-muted-foreground">• {achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {profileData.organizationHistory.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Riwayat Organisasi</h4>
                    <ul className="text-sm space-y-1">
                      {profileData.organizationHistory.filter(o => o.trim()).map((organization, index) => (
                        <li key={index} className="text-muted-foreground">• {organization}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {(profileData.socialMedia.instagram || profileData.socialMedia.linkedin || profileData.socialMedia.twitter) && (
                  <div>
                    <h4 className="font-semibold mb-2">Media Sosial</h4>
                    <div className="text-sm space-y-1">
                      {profileData.socialMedia.instagram && (
                        <p className="text-muted-foreground">📷 {profileData.socialMedia.instagram}</p>
                      )}
                      {profileData.socialMedia.linkedin && (
                        <p className="text-muted-foreground">💼 {profileData.socialMedia.linkedin}</p>
                      )}
                      {profileData.socialMedia.twitter && (
                        <p className="text-muted-foreground">🐦 {profileData.socialMedia.twitter}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="text-xs text-muted-foreground text-center pt-4 border-t">
                  Preview ini menunjukkan bagaimana profil Anda akan tampil di website
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
