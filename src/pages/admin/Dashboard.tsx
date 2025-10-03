import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LogOut, 
  Users, 
  UserPlus, 
  LayoutDashboard,
  Settings,
  FileText,
  MessageSquare,
  Key,
  BookOpen
} from "lucide-react";

export default function Dashboard() {
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [profileCompleted, setProfileCompleted] = useState(true);

  // Check profile completion status
  useEffect(() => {
    if (currentUser && !isAdmin()) {
      const savedPengurus = localStorage.getItem("pengurusList");
      if (savedPengurus) {
        try {
          const pengurusList = JSON.parse(savedPengurus);
          const userProfile = pengurusList.find((p: any) => 
            p.id === currentUser.id || 
            p.username === currentUser.username ||
            p.nama?.toLowerCase() === currentUser.name?.toLowerCase()
          );
          
          if (userProfile) {
            setProfileCompleted(userProfile.profileCompleted || false);
          } else {
            setProfileCompleted(false);
          }
        } catch (error) {
          console.error("Error checking profile status:", error);
          setProfileCompleted(false);
        }
      } else {
        setProfileCompleted(false);
      }
    }
  }, [currentUser, isAdmin]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Menu items berdasarkan role
  const getMenuItems = () => {
    const baseMenuItems = [
      {
        title: "Data Saya",
        description: "Lihat dan edit profil Anda",
        icon: Settings,
        path: "/admin/profile",
        color: "bg-orange-500",
        roles: ["admin", "pimpinan", "menteri"] // Semua role bisa akses
      }
    ];

    const adminMenuItems = [
        {
          title: "Kelola Data Pengurus",
          description: "Tambah, edit, atau hapus data pengurus kabinet",
          icon: Users,
          path: "/admin/pengurus",
          color: "bg-blue-500",
          roles: ["admin"]
        },
        {
          title: "Kelola Akun",
          description: "Lihat dan kelola akun login anggota kabinet",
          icon: Key,
          path: "/admin/accounts",
          color: "bg-emerald-500",
          roles: ["admin"]
        },
        {
          title: "Kelola Berita",
          description: "Tulis, edit, atau hapus berita dan artikel",
          icon: FileText,
          path: "/admin/news",
          color: "bg-green-500",
          roles: ["admin"]
        },
        {
          title: "Kelola Program Kerja",
          description: "Tambah, edit, dan kelola program kerja PEMA UTU",
          icon: BookOpen,
          path: "/admin/programs",
          color: "bg-indigo-500",
          roles: ["admin"]
        },
        {
          title: "Kelola Pesan",
          description: "Lihat dan balas pesan dari form kontak",
          icon: MessageSquare,
          path: "/admin/messages",
          color: "bg-purple-500",
          roles: ["admin"]
        },
        {
          title: "Tambah Pengurus Baru",
          description: "Daftarkan anggota kabinet baru",
          icon: UserPlus,
          path: "/admin/pengurus/tambah",
          color: "bg-orange-500",
          roles: ["admin"]
        }
      ];

    // Return menu berdasarkan role
    if (isAdmin()) {
      return [...adminMenuItems, ...baseMenuItems];
    } else {
      return baseMenuItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-gold/5">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <LayoutDashboard className="h-8 w-8 text-gold" />
              <div>
                <h1 className="text-2xl font-bold text-primary">
                  Dashboard {isAdmin() ? "Admin" : currentUser?.role === "pimpinan" ? "Pimpinan" : "Menteri"}
                </h1>
                <p className="text-sm text-muted-foreground">PEMA UTU - Kabinet Samgrahita</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-primary">{currentUser?.name}</p>
                <p className="text-sm text-muted-foreground">{currentUser?.role}</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Profile Completion Alert for Non-Admin */}
        {!isAdmin() && !profileCompleted && (
          <Card className="mb-8 shadow-lg border-t-4 border-t-orange-500 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-orange-800 mb-1">
                    🚨 Profil Belum Lengkap
                  </h3>
                  <p className="text-orange-700 text-sm mb-3">
                    Lengkapi profil Anda agar dapat tampil di website PEMA UTU dengan baik.
                  </p>
                  <Button 
                    onClick={() => navigate("/admin/profile")}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    Lengkapi Profil Sekarang
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Welcome Card */}
        <Card className="mb-8 shadow-lg border-t-4 border-t-gold">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-primary mb-2">
              Selamat Datang, {currentUser?.name}! 👋
            </h2>
            <p className="text-muted-foreground">
              {isAdmin() 
                ? "Kelola data pengurus dan kabinet PEMA UTU dengan mudah melalui dashboard ini."
                : profileCompleted 
                  ? "Profil Anda sudah lengkap dan tampil di website PEMA UTU."
                  : "Silakan lengkapi profil Anda untuk tampil di website PEMA UTU."
              }
            </p>
          </CardContent>
        </Card>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={index}
                className="shadow-card hover:shadow-primary transition-all cursor-pointer group"
                onClick={() => navigate(item.path)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-gold transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Pengurus</p>
                  <p className="text-3xl font-bold text-primary">
                    {localStorage.getItem("pengurusList") 
                      ? JSON.parse(localStorage.getItem("pengurusList") || "[]").length 
                      : 0}
                  </p>
                </div>
                <Users className="h-12 w-12 text-gold/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Berita</p>
                  <p className="text-3xl font-bold text-primary">
                    {localStorage.getItem("newsList") 
                      ? JSON.parse(localStorage.getItem("newsList") || "[]").length 
                      : 0}
                  </p>
                </div>
                <FileText className="h-12 w-12 text-gold/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Departemen</p>
                  <p className="text-3xl font-bold text-primary">8</p>
                </div>
                <LayoutDashboard className="h-12 w-12 text-gold/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-3xl font-bold text-green-600">Aktif</p>
                </div>
                <Settings className="h-12 w-12 text-gold/20" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
