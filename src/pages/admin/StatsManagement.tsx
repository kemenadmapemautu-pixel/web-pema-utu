import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, RotateCcw } from "lucide-react";

interface StatsData {
  ministries: {
    value: string;
    label: string;
  };
  programs: {
    value: string;
    label: string;
  };
  members: {
    value: string;
    label: string;
  };
}

const defaultStats: StatsData = {
  ministries: { value: "15+", label: "Kementerian" },
  programs: { value: "50+", label: "Program" },
  members: { value: "100+", label: "Pengurus" }
};

export default function StatsManagement() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<StatsData>(defaultStats);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Load stats from localStorage
    const savedStats = localStorage.getItem("homeStats");
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (error) {
        console.error("Error parsing stats:", error);
      }
    }
  }, [isAuthenticated, navigate]);

  const handleSave = () => {
    setIsLoading(true);
    try {
      localStorage.setItem("homeStats", JSON.stringify(stats));
      toast({
        title: "Berhasil!",
        description: "Statistik beranda berhasil diperbarui",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan statistik",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Apakah Anda yakin ingin reset ke nilai default?")) {
      setStats(defaultStats);
      localStorage.setItem("homeStats", JSON.stringify(defaultStats));
      toast({
        title: "Berhasil!",
        description: "Statistik beranda di-reset ke nilai default",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/dashboard")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary">Kelola Statistik Beranda</h1>
              <p className="text-muted-foreground mt-1">
                Atur angka statistik yang ditampilkan di halaman beranda
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card>
            <CardHeader>
              <CardTitle>Edit Statistik</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Kementerian */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold text-lg">Kementerian</h3>
                <div className="space-y-2">
                  <Label htmlFor="ministries-value">Nilai</Label>
                  <Input
                    id="ministries-value"
                    placeholder="contoh: 15+"
                    value={stats.ministries.value}
                    onChange={(e) =>
                      setStats({
                        ...stats,
                        ministries: { ...stats.ministries, value: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ministries-label">Label</Label>
                  <Input
                    id="ministries-label"
                    placeholder="contoh: Kementerian"
                    value={stats.ministries.label}
                    onChange={(e) =>
                      setStats({
                        ...stats,
                        ministries: { ...stats.ministries, label: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              {/* Program */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold text-lg">Program Kerja</h3>
                <div className="space-y-2">
                  <Label htmlFor="programs-value">Nilai</Label>
                  <Input
                    id="programs-value"
                    placeholder="contoh: 50+"
                    value={stats.programs.value}
                    onChange={(e) =>
                      setStats({
                        ...stats,
                        programs: { ...stats.programs, value: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="programs-label">Label</Label>
                  <Input
                    id="programs-label"
                    placeholder="contoh: Program"
                    value={stats.programs.label}
                    onChange={(e) =>
                      setStats({
                        ...stats,
                        programs: { ...stats.programs, label: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              {/* Pengurus */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold text-lg">Pengurus</h3>
                <div className="space-y-2">
                  <Label htmlFor="members-value">Nilai</Label>
                  <Input
                    id="members-value"
                    placeholder="contoh: 100+"
                    value={stats.members.value}
                    onChange={(e) =>
                      setStats({
                        ...stats,
                        members: { ...stats.members, value: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="members-label">Label</Label>
                  <Input
                    id="members-label"
                    placeholder="contoh: Pengurus"
                    value={stats.members.label}
                    onChange={(e) =>
                      setStats({
                        ...stats,
                        members: { ...stats.members, label: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex-1"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Perubahan
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  disabled={isLoading}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Tampilan statistik di halaman beranda:
                </p>
                
                {/* Preview Stats Cards */}
                <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-br from-primary to-primary-dark rounded-xl">
                  <div className="glass-card p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {stats.ministries.value}
                    </div>
                    <div className="text-xs text-white/80 mt-1">
                      {stats.ministries.label}
                    </div>
                  </div>
                  <div className="glass-card p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {stats.programs.value}
                    </div>
                    <div className="text-xs text-white/80 mt-1">
                      {stats.programs.label}
                    </div>
                  </div>
                  <div className="glass-card p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {stats.members.value}
                    </div>
                    <div className="text-xs text-white/80 mt-1">
                      {stats.members.label}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Tips:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Gunakan tanda "+" untuk menunjukkan "lebih dari"</li>
                    <li>• Nilai bisa berupa angka atau text (misalnya: "15+", "100", "Ratusan")</li>
                    <li>• Label sebaiknya singkat dan jelas</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
