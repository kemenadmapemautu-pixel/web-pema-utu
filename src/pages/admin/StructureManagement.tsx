import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  ArrowLeft,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface StructureConfig {
  id: string;
  leadershipTitle: string;
  leadershipSubtitle: string;
  showConnector: boolean;
  ministerGridCols: number;
  infoText: string;
  updatedAt: string;
  updatedBy: string;
}

export default function StructureManagement() {
  const { toast } = useToast();
  const [config, setConfig] = useState<StructureConfig>({
    id: "structure-config",
    leadershipTitle: "Pimpinan Kabinet",
    leadershipSubtitle: "Presiden & Wakil Presiden",
    showConnector: true,
    ministerGridCols: 3,
    infoText: "Struktur organisasi berdasarkan data kabinet aktif",
    updatedAt: new Date().toISOString(),
    updatedBy: "Admin"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempConfig, setTempConfig] = useState<StructureConfig>(config);

  useEffect(() => {
    // Load config from localStorage
    const savedConfig = localStorage.getItem("structureConfig");
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);
      setConfig(parsed);
      setTempConfig(parsed);
    }
  }, []);

  const handleSave = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const updatedConfig = {
      ...tempConfig,
      updatedAt: new Date().toISOString(),
      updatedBy: currentUser.name || "Admin"
    };

    localStorage.setItem("structureConfig", JSON.stringify(updatedConfig));
    setConfig(updatedConfig);
    setIsEditing(false);

    toast({
      title: "Berhasil",
      description: "Konfigurasi struktur organisasi berhasil diperbarui",
    });
  };

  const handleCancel = () => {
    setTempConfig(config);
    setIsEditing(false);
  };

  const handleReset = () => {
    const defaultConfig: StructureConfig = {
      id: "structure-config",
      leadershipTitle: "Pimpinan Kabinet",
      leadershipSubtitle: "Presiden & Wakil Presiden",
      showConnector: true,
      ministerGridCols: 3,
      infoText: "Struktur organisasi berdasarkan data kabinet aktif",
      updatedAt: new Date().toISOString(),
      updatedBy: "Admin"
    };

    setTempConfig(defaultConfig);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/admin/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-primary flex items-center">
                <Building2 className="h-8 w-8 mr-3 text-gold" />
                Kelola Struktur Organisasi
              </h1>
              <p className="text-muted-foreground mt-1">
                Atur tampilan hierarki organisasi di halaman publik
              </p>
            </div>
          </div>

          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-gold hover:bg-gold-dark text-primary">
              <Edit className="h-4 w-4 mr-2" />
              Edit Konfigurasi
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleCancel} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Batal
              </Button>
              <Button onClick={handleSave} className="bg-gold hover:bg-gold-dark text-primary">
                <Save className="h-4 w-4 mr-2" />
                Simpan
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-gold" />
                Konfigurasi Tampilan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Leadership Title */}
              <div className="space-y-2">
                <Label htmlFor="leadershipTitle">Judul Pimpinan</Label>
                <Input
                  id="leadershipTitle"
                  value={tempConfig.leadershipTitle}
                  onChange={(e) => setTempConfig({ ...tempConfig, leadershipTitle: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Pimpinan Kabinet"
                />
                <p className="text-xs text-muted-foreground">
                  Teks yang ditampilkan di box pimpinan (warna gold)
                </p>
              </div>

              {/* Leadership Subtitle */}
              <div className="space-y-2">
                <Label htmlFor="leadershipSubtitle">Subtitle Pimpinan</Label>
                <Input
                  id="leadershipSubtitle"
                  value={tempConfig.leadershipSubtitle}
                  onChange={(e) => setTempConfig({ ...tempConfig, leadershipSubtitle: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Presiden & Wakil Presiden"
                />
                <p className="text-xs text-muted-foreground">
                  Teks kecil di bawah judul pimpinan
                </p>
              </div>

              {/* Show Connector */}
              <div className="space-y-2">
                <Label htmlFor="showConnector">Tampilkan Garis Penghubung</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showConnector"
                    checked={tempConfig.showConnector}
                    onChange={(e) => setTempConfig({ ...tempConfig, showConnector: e.target.checked })}
                    disabled={!isEditing}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-muted-foreground">
                    Tampilkan garis vertikal antara pimpinan dan menteri
                  </span>
                </div>
              </div>

              {/* Minister Grid Columns */}
              <div className="space-y-2">
                <Label htmlFor="ministerGridCols">Jumlah Kolom Grid Menteri</Label>
                <select
                  id="ministerGridCols"
                  value={tempConfig.ministerGridCols}
                  onChange={(e) => setTempConfig({ ...tempConfig, ministerGridCols: parseInt(e.target.value) })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value={2}>2 Kolom</option>
                  <option value={3}>3 Kolom</option>
                  <option value={4}>4 Kolom</option>
                </select>
                <p className="text-xs text-muted-foreground">
                  Jumlah kolom untuk menampilkan box menteri (desktop)
                </p>
              </div>

              {/* Info Text */}
              <div className="space-y-2">
                <Label htmlFor="infoText">Teks Informasi</Label>
                <Textarea
                  id="infoText"
                  value={tempConfig.infoText}
                  onChange={(e) => setTempConfig({ ...tempConfig, infoText: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Struktur organisasi berdasarkan data kabinet aktif"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Teks informasi di bawah hierarki organisasi
                </p>
              </div>

              {/* Reset Button */}
              {isEditing && (
                <Button 
                  onClick={handleReset} 
                  variant="outline" 
                  className="w-full"
                >
                  Reset ke Default
                </Button>
              )}

              {/* Last Updated Info */}
              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Terakhir diperbarui: {new Date(config.updatedAt).toLocaleString('id-ID')}
                </p>
                <p className="text-xs text-muted-foreground">
                  Oleh: {config.updatedBy}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-gold" />
                Preview Tampilan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-primary/5 to-gold/5 p-6 rounded-lg">
                <div className="flex flex-col items-center space-y-6">
                  {/* Leadership Preview */}
                  <div className="text-center">
                    <div className="inline-block bg-gold text-primary px-8 py-4 rounded-lg shadow-lg">
                      <div className="font-bold text-lg">{tempConfig.leadershipTitle}</div>
                      <div className="text-sm mt-1">{tempConfig.leadershipSubtitle}</div>
                      <div className="text-xs mt-1 opacity-80">2 orang</div>
                    </div>
                  </div>

                  {/* Connector Preview */}
                  {tempConfig.showConnector && (
                    <div className="w-px h-12 bg-gradient-to-b from-gold to-primary"></div>
                  )}

                  {/* Ministers Preview */}
                  <div className={`grid grid-cols-${tempConfig.ministerGridCols} gap-4 w-full`}>
                    {[1, 2, 3].slice(0, tempConfig.ministerGridCols).map((i) => (
                      <div key={i} className="bg-primary text-white px-4 py-3 rounded-lg shadow-md text-center">
                        <div className="font-semibold text-sm">Menteri {i}</div>
                        <div className="text-xs mt-1 opacity-80">Nama Menteri</div>
                      </div>
                    ))}
                  </div>

                  {/* Info Text Preview */}
                  <div className="text-center text-sm text-muted-foreground mt-4">
                    <Building2 className="h-4 w-4 inline mr-2" />
                    {tempConfig.infoText}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Catatan:</strong> Preview ini menampilkan tampilan hierarki organisasi yang akan terlihat di halaman publik. Data anggota kabinet akan diambil dari menu "Kelola Pengurus".
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Card */}
        <Card className="mt-8 shadow-card bg-gradient-to-r from-primary/5 to-gold/5">
          <CardContent className="p-6">
            <h3 className="font-semibold text-primary mb-3 flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-gold" />
              Cara Kerja Struktur Organisasi
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• <strong>Data Anggota:</strong> Diambil dari menu "Kelola Pengurus" yang sudah melengkapi profil</p>
              <p>• <strong>Pimpinan:</strong> Menampilkan pengurus dengan tipe "Pimpinan"</p>
              <p>• <strong>Menteri:</strong> Menampilkan pengurus dengan tipe "Menteri"</p>
              <p>• <strong>Tampilan:</strong> Konfigurasi di halaman ini mengatur layout dan teks yang ditampilkan</p>
              <p>• <strong>Update Real-time:</strong> Perubahan langsung terlihat di halaman publik</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
