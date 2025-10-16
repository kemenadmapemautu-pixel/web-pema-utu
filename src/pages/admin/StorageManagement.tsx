import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  LogOut,
  Database,
  Download,
  Upload,
  Trash2,
  HardDrive,
  AlertTriangle,
  CheckCircle,
  FileJson
} from "lucide-react";
import {
  exportAllData,
  getStorageStats,
  clearAllExceptAdmin,
  handleFileImport
} from "@/utils/storageBackup";

export default function StorageManagement() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState(getStorageStats());
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    // Update stats on mount
    setStats(getStorageStats());
  }, []);

  const refreshStats = () => {
    setStats(getStorageStats());
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleExport = () => {
    try {
      exportAllData();
      toast({
        title: "Berhasil Export! 📥",
        description: "Data telah didownload sebagai file JSON"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal export data",
        variant: "destructive"
      });
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    handleFileImport(file, (result) => {
      if (result.success) {
        toast({
          title: "Berhasil Import! 📤",
          description: "Data telah berhasil di-restore. Refresh halaman untuk melihat perubahan."
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast({
          title: "Error Import",
          description: result.error || "Gagal import data",
          variant: "destructive"
        });
      }
    });
  };

  const handleClearAll = () => {
    if (
      window.confirm(
        "⚠️ PERINGATAN!\n\nApakah Anda yakin ingin menghapus SEMUA data?\n\n" +
        "Data yang akan dihapus:\n" +
        "- Semua pengurus\n" +
        "- Semua berita\n" +
        "- Semua galeri\n" +
        "- Semua program kerja\n" +
        "- Semua pesan kontak\n\n" +
        "Akun admin akan tetap tersimpan.\n\n" +
        "Tindakan ini TIDAK DAPAT DIBATALKAN!"
      )
    ) {
      setIsClearing(true);
      try {
        clearAllExceptAdmin();
        refreshStats();
        toast({
          title: "Data Dihapus ✅",
          description: "Semua data telah dihapus (akun admin tetap ada)"
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Gagal menghapus data",
          variant: "destructive"
        });
      } finally {
        setIsClearing(false);
      }
    }
  };

  const getStorageStatusColor = () => {
    if (stats.usagePercentage < 50) return "bg-green-500";
    if (stats.usagePercentage < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStorageStatusIcon = () => {
    if (stats.usagePercentage < 80) {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
    return <AlertTriangle className="h-5 w-5 text-red-600" />;
  };

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
                <h1 className="text-2xl font-bold text-primary">Kelola Penyimpanan</h1>
                <p className="text-sm text-muted-foreground">Backup, restore, dan monitor storage</p>
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
        {/* Info Banner */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Database className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800 font-medium mb-1">
                🗄️ Penyimpanan: Supabase Database (PostgreSQL)
              </p>
              <p className="text-xs text-blue-700">
                Semua data tersimpan aman di cloud database Supabase dengan backup otomatis. 
                Storage capacity: 500MB (Free tier), dapat di-upgrade sesuai kebutuhan.
              </p>
            </div>
          </div>
        </div>

        {/* Storage Overview */}
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <HardDrive className="h-6 w-6 mr-2 text-gold" />
              Storage Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    {getStorageStatusIcon()}
                    <span className="text-sm font-medium">
                      Penggunaan Storage
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stats.totalKB.toFixed(2)} KB / ~5120 KB
                  </span>
                </div>
                <Progress value={stats.usagePercentage} className="h-3" />
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.usagePercentage.toFixed(1)}% terpakai • 
                  Tersisa: {stats.availableKB.toFixed(2)} KB
                </p>
              </div>

              {/* Warning if near limit */}
              {stats.usagePercentage > 80 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-red-800 font-medium">
                        Storage Hampir Penuh!
                      </p>
                      <p className="text-xs text-red-700">
                        Hapus data yang tidak diperlukan atau export & clear untuk membersihkan storage.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Storage Breakdown */}
              <div>
                <h4 className="text-sm font-medium mb-3">Breakdown per Data Type:</h4>
                <div className="space-y-2">
                  {stats.items.map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{item.key}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-muted-foreground">
                          {item.sizeKB.toFixed(2)} KB
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">
                          ({item.percentage.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  ))}
                  {stats.items.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Belum ada data tersimpan
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Export Data */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Download className="h-5 w-5 mr-2 text-green-600" />
                Export Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Download semua data sebagai file JSON untuk backup.
              </p>
              <Button onClick={handleExport} className="w-full bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                Export Sekarang
              </Button>
            </CardContent>
          </Card>

          {/* Import Data */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Upload className="h-5 w-5 mr-2 text-blue-600" />
                Import Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Restore data dari file backup JSON yang sudah di-export.
              </p>
              <label htmlFor="import-file" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Pilih File JSON
                  </span>
                </Button>
                <input
                  id="import-file"
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </CardContent>
          </Card>

          {/* Clear All Data */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Trash2 className="h-5 w-5 mr-2 text-red-600" />
                Hapus Semua
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Hapus semua data (akun admin tetap tersimpan). Tidak dapat dibatalkan!
              </p>
              <Button
                onClick={handleClearAll}
                disabled={isClearing}
                variant="destructive"
                className="w-full"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isClearing ? "Menghapus..." : "Hapus Semua Data"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Documentation */}
        <Card className="mt-6 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileJson className="h-6 w-6 mr-2 text-gold" />
              Dokumentasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-medium mb-1">📖 Cara Backup Data:</h4>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-2">
                  <li>Klik tombol "Export Sekarang"</li>
                  <li>File JSON akan otomatis terdownload</li>
                  <li>Simpan file di tempat aman (Google Drive, USB, dll)</li>
                  <li>Ulangi backup secara berkala (1-2 minggu sekali)</li>
                </ol>
              </div>

              <div>
                <h4 className="font-medium mb-1">📥 Cara Restore Data:</h4>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-2">
                  <li>Klik tombol "Pilih File JSON"</li>
                  <li>Pilih file backup yang sudah di-export sebelumnya</li>
                  <li>Data akan otomatis di-restore</li>
                  <li>Halaman akan refresh otomatis</li>
                </ol>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-xs text-yellow-800">
                  ⚠️ <strong>Penting:</strong> localStorage dibersihkan jika user clear browser cache atau 
                  data history. Selalu backup data secara berkala untuk mencegah kehilangan data!
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Untuk dokumentasi lengkap, lihat file <code className="bg-gray-100 px-1 py-0.5 rounded">STORAGE_INFO.md</code> di root project.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
