import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  LogOut,
  FileText,
  Save,
  Plus,
  Trash2,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";

interface MinistryContent {
  ministryId: string;
  ministryName: string;
  description: string;
  vision: string;
  mission: string[];
  programs: string[];
}

export default function MinistryContentManagement() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [content, setContent] = useState<MinistryContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // URL mapping untuk preview
  const getMinistryUrl = () => {
    const urlMap: { [key: string]: string } = {
      "Kementerian Advokasi dan Hak Mahasiswa": "/ministry/advokasi-hak-mahasiswa",
      "Kementerian Komunikasi dan Informasi": "/ministry/komunikasi-informasi",
      "Kementerian Pemberdayaan dan Perlindungan Perempuan": "/ministry/pemberdayaan-perempuan",
      "Kementerian Agama": "/ministry/agama",
      "Kementerian Hubungan Internal dan Eksternal": "/ministry/hubungan-internal-eksternal",
      "Kementerian Pengembangan SDM": "/ministry/pengembangan-sdm",
      "Kementerian Pemuda dan Olahraga": "/ministry/pemuda-olahraga",
      "Kementerian Pariwisata dan Seni Budaya": "/ministry/pariwisata-seni-budaya",
      "Kementerian Pendidikan dan Akademik": "/ministry/pendidikan-akademik",
      "Kementerian Kesehatan Masyarakat": "/ministry/kesehatan-masyarakat",
      "Kementerian Sosial dan Lingkungan Hidup": "/ministry/sosial-lingkungan-hidup",
      "Kementerian Ekonomi Kreatif": "/ministry/ekonomi-kreatif"
    };
    return urlMap[currentUser?.department || ""] || "/ministries";
  };

  useEffect(() => {
    loadContent();
  }, [currentUser]);

  const loadContent = () => {
    if (!currentUser) return;

    const savedContents = localStorage.getItem("ministryContents");
    if (savedContents) {
      try {
        const contents: MinistryContent[] = JSON.parse(savedContents);
        const myContent = contents.find(c => c.ministryName === currentUser.department);
        
        if (myContent) {
          setContent(myContent);
        } else {
          // Create default content
          const defaultContent: MinistryContent = {
            ministryId: currentUser.id || "",
            ministryName: currentUser.department || "",
            description: "Deskripsi kementerian akan muncul di sini",
            vision: "Visi kementerian",
            mission: ["Misi 1", "Misi 2", "Misi 3"],
            programs: ["Program 1", "Program 2", "Program 3"]
          };
          setContent(defaultContent);
        }
      } catch (error) {
        console.error("Error loading content:", error);
      }
    } else {
      // Create default content for first time
      const defaultContent: MinistryContent = {
        ministryId: currentUser.id || "",
        ministryName: currentUser.department || "",
        description: "Deskripsi kementerian akan muncul di sini",
        vision: "Visi kementerian",
        mission: ["Misi 1", "Misi 2", "Misi 3"],
        programs: ["Program 1", "Program 2", "Program 3"]
      };
      setContent(defaultContent);
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChange = (field: keyof MinistryContent, value: string) => {
    if (!content) return;
    setContent(prev => ({
      ...prev!,
      [field]: value
    }));
  };

  const handleMissionChange = (index: number, value: string) => {
    if (!content) return;
    const newMission = [...content.mission];
    newMission[index] = value;
    setContent(prev => ({
      ...prev!,
      mission: newMission
    }));
  };

  const addMission = () => {
    if (!content) return;
    setContent(prev => ({
      ...prev!,
      mission: [...prev!.mission, ""]
    }));
  };

  const removeMission = (index: number) => {
    if (!content) return;
    const newMission = content.mission.filter((_, i) => i !== index);
    setContent(prev => ({
      ...prev!,
      mission: newMission
    }));
  };

  const handleProgramChange = (index: number, value: string) => {
    if (!content) return;
    const newPrograms = [...content.programs];
    newPrograms[index] = value;
    setContent(prev => ({
      ...prev!,
      programs: newPrograms
    }));
  };

  const addProgram = () => {
    if (!content) return;
    setContent(prev => ({
      ...prev!,
      programs: [...prev!.programs, ""]
    }));
  };

  const removeProgram = (index: number) => {
    if (!content) return;
    const newPrograms = content.programs.filter((_, i) => i !== index);
    setContent(prev => ({
      ...prev!,
      programs: newPrograms
    }));
  };

  const handleSave = () => {
    if (!content || !currentUser) return;

    setIsSaving(true);
    try {
      const savedContents = localStorage.getItem("ministryContents");
      let contents: MinistryContent[] = savedContents ? JSON.parse(savedContents) : [];
      
      const existingIndex = contents.findIndex(c => c.ministryName === currentUser.department);
      if (existingIndex >= 0) {
        contents[existingIndex] = content;
      } else {
        contents.push(content);
      }

      localStorage.setItem("ministryContents", JSON.stringify(contents));

      toast({
        title: "Berhasil Disimpan! ✅",
        description: "Konten kementerian telah diperbarui dan akan tampil di halaman publik"
      });
    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Gagal Menyimpan",
        description: "Terjadi kesalahan saat menyimpan konten",
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
          <p className="text-muted-foreground">Memuat konten kementerian...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Data Tidak Ditemukan</h1>
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
                <h1 className="text-2xl font-bold text-primary">Kelola Konten Kementerian</h1>
                <p className="text-sm text-muted-foreground">{content.ministryName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link to={getMinistryUrl()} target="_blank">
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Halaman
                </Button>
              </Link>
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
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Basic Info */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <FileText className="h-6 w-6 mr-2 text-gold" />
                Informasi Dasar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi Kementerian</Label>
                <Textarea
                  id="description"
                  value={content.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Deskripsi singkat tentang kementerian..."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Deskripsi ini akan muncul di hero section halaman kementerian
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Visi</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content.vision}
                onChange={(e) => handleChange("vision", e.target.value)}
                placeholder="Visi kementerian..."
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Misi</CardTitle>
              <Button onClick={addMission} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Misi
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {content.mission.map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="inline-block w-6 h-6 rounded-full bg-gold/20 text-gold text-sm flex items-center justify-center mt-2 flex-shrink-0">
                    {index + 1}
                  </span>
                  <Textarea
                    value={item}
                    onChange={(e) => handleMissionChange(index, e.target.value)}
                    placeholder={`Misi ${index + 1}...`}
                    rows={2}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeMission(index)}
                    className="text-red-600 mt-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {content.mission.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Belum ada misi ditambahkan
                </p>
              )}
            </CardContent>
          </Card>

          {/* Programs */}
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Program Kerja</CardTitle>
              <Button onClick={addProgram} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Program
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {content.programs.map((program, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="inline-block w-8 h-8 rounded-full bg-gold text-white text-sm flex items-center justify-center mt-1 flex-shrink-0">
                    {index + 1}
                  </span>
                  <Input
                    value={program}
                    onChange={(e) => handleProgramChange(index, e.target.value)}
                    placeholder={`Program ${index + 1}...`}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeProgram(index)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {content.programs.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Belum ada program kerja ditambahkan
                </p>
              )}
            </CardContent>
          </Card>

          {/* Save Button */}
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <Button 
                onClick={handleSave} 
                disabled={isSaving}
                size="lg"
                className="w-full"
              >
                <Save className="h-5 w-5 mr-2" />
                {isSaving ? "Menyimpan..." : "Simpan Semua Perubahan"}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Perubahan akan langsung tampil di halaman publik kementerian
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
