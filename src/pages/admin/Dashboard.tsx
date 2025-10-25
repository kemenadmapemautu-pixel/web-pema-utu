import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LogOut, 
  Users, 
  LayoutDashboard,
  Settings,
  FileText,
  MessageSquare,
  BookOpen,
  Image,
  Building2,
  BarChart3,
  HardDrive,
  Calendar
} from "lucide-react";

export default function Dashboard() {
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [profileCompleted, setProfileCompleted] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [pengurusCount, setPengurusCount] = useState(0);
  const [newsCount, setNewsCount] = useState(0);
  const [ministryCount, setMinistryCount] = useState(0);

  // Safe localStorage parsing with error handling
  const getSafeCount = (key: string): number => {
    try {
      const data = localStorage.getItem(key);
      if (!data) return 0;
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed.length : 0;
    } catch (error) {
      console.error(`Error parsing ${key} from localStorage:`, error);
      return 0;
    }
  };

  // Get unique ministries count from pengurus list
  const getMinistryCount = (): number => {
    try {
      const data = localStorage.getItem("pengurusList");
      if (!data) return 0;
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return 0;
      
      // Get unique ministries from pengurus with role "menteri"
      const uniqueMinistries = new Set(
        parsed
          .filter((p: any) => p.role === "menteri" && p.kementerian)
          .map((p: any) => p.kementerian)
      );
      
      return uniqueMinistries.size;
    } catch (error) {
      console.error("Error counting ministries:", error);
      return 0;
    }
  };

  // Update counts whenever data changes
  useEffect(() => {
    setPengurusCount(getSafeCount("pengurusList"));
    setNewsCount(getSafeCount("newsList"));
    setMinistryCount(getMinistryCount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  // Listen for localStorage changes to update stats in real-time
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "pengurusList" || e.key === "newsList" || e.key === null) {
        setRefreshKey(prev => prev + 1);
      }
    };

    // Listen for storage events from other tabs/windows
    window.addEventListener("storage", handleStorageChange);

    // Custom event for same-tab updates
    const handleCustomStorageChange = () => {
      setRefreshKey(prev => prev + 1);
    };
    window.addEventListener("localStorageUpdated", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageUpdated", handleCustomStorageChange);
    };
  }, []);

  // Check profile completion status with enhanced error handling
  useEffect(() => {
    if (currentUser && !isAdmin()) {
      try {
        const savedPengurus = localStorage.getItem("pengurusList");
        if (savedPengurus) {
          const pengurusList = JSON.parse(savedPengurus);
          
          // Validate that pengurusList is an array
          if (!Array.isArray(pengurusList)) {
            console.error("pengurusList is not an array");
            setProfileCompleted(false);
            return;
          }
          
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
        } else {
          setProfileCompleted(false);
        }
      } catch (error) {
        console.error("Error checking profile status:", error);
        // Set to false but don't crash the app
        setProfileCompleted(false);
      }
    }
  }, [currentUser, isAdmin, refreshKey]);

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

    const ministerMenuItems = [
      {
        title: "Kelola Kementerian",
        description: "Kelola halaman, konten, tim wakil menteri & staff kementerian Anda",
        icon: Building2,
        path: "/admin/ministry",
        color: "bg-gradient-to-r from-indigo-500 to-purple-500",
        roles: ["menteri"]
      },
      {
        title: "Kelola Kegiatan",
        description: "Tambah dan kelola kegiatan kementerian Anda",
        icon: Calendar,
        path: "/admin/activities",
        color: "bg-blue-500",
        roles: ["menteri"]
      },
      {
        title: "Kelola Konten Kementerian",
        description: "Edit visi, misi, deskripsi, dan program kerja kementerian Anda",
        icon: FileText,
        path: "/admin/ministry-content",
        color: "bg-indigo-500",
        roles: ["menteri"]
      },
      {
        title: "Kelola Tim Kementerian",
        description: "Tambah dan kelola Wakil Menteri & Staff kementerian Anda",
        icon: Users,
        path: "/admin/ministry-team",
        color: "bg-purple-500",
        roles: ["menteri"]
      }
    ];

    const adminMenuItems = [
        {
          title: "Kelola Pengurus & Akun",
          description: "Kelola data pengurus, akun login, tambah/hapus profil dan akun",
          icon: Users,
          path: "/admin/pengurus",
          color: "bg-blue-500",
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
          title: "Kelola Galeri",
          description: "Unggah dan kelola foto/video kegiatan",
          icon: Image,
          path: "/admin/gallery",
          color: "bg-pink-500",
          roles: ["admin"]
        },
        {
          title: "Kelola Pesan",
          description: "Lihat dan balas pesan dari pengunjung",
          icon: MessageSquare,
          path: "/admin/messages",
          color: "bg-yellow-500",
          roles: ["admin"]
        },
        {
          title: "Statistik",
          description: "Lihat statistik pengunjung dan aktivitas",
          icon: BarChart3,
          path: "/admin/stats",
          color: "bg-indigo-500",
          roles: ["admin"]
        },
        {
          title: "Penyimpanan",
          description: "Kelola file dan media",
          icon: HardDrive,
          path: "/admin/storage",
          color: "bg-gray-500",
          roles: ["admin"]
        },
        {
          title: "Kelola Kegiatan",
          description: "Kelola seluruh kegiatan kementerian",
          icon: Calendar,
          path: "/admin/activities",
          color: "bg-teal-500",
          roles: ["admin"]
        }
    ];

    // Gabungkan menu berdasarkan role
    let menuItems = [...baseMenuItems];
    
    if (currentUser?.role === 'admin') {
      menuItems = [...menuItems, ...adminMenuItems];
    } else if (currentUser?.role === 'menteri') {
      menuItems = [...menuItems, ...ministerMenuItems];
    }

    return menuItems;
  };  

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-gold/5">
      {/* Header - Responsive */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            {/* Logo & Title */}
            <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
              <LayoutDashboard className="h-6 w-6 sm:h-8 sm:w-8 text-gold flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary truncate">
                  Dashboard {isAdmin() ? "Admin" : currentUser?.role === "pimpinan" ? "Pimpinan" : "Menteri"}
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">PEMA UTU - Kabinet Samgrahita</p>
              </div>
            </div>
            
            {/* User Info & Logout - Responsive */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-3">
              <div className="text-left sm:text-right min-w-0 flex-1 sm:flex-none">
                <p className="font-semibold text-primary text-sm sm:text-base truncate">{currentUser?.name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground capitalize">{currentUser?.role}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="flex-shrink-0 text-xs sm:text-sm"
              >
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Responsive */}
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">

        {/* Profile Completion Alert for Non-Admin - Responsive */}
        {!isAdmin() && !profileCompleted && (
          <Card className="mb-6 sm:mb-8 shadow-lg border-t-4 border-t-orange-500 bg-orange-50">
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-orange-800 mb-1">
                    🚨 Profil Belum Lengkap
                  </h3>
                  <p className="text-orange-700 text-xs sm:text-sm mb-3">
                    Lengkapi profil Anda agar dapat tampil di website PEMA UTU dengan baik.
                  </p>
                  <Button 
                    onClick={() => navigate("/admin/profile")}
                    size="sm"
                    className="bg-orange-600 hover:bg-orange-700 text-xs sm:text-sm"
                  >
                    Lengkapi Profil Sekarang
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Welcome Card - Responsive */}
        <Card className="mb-6 sm:mb-8 shadow-lg border-t-4 border-t-gold">
          <CardContent className="pt-4 sm:pt-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary mb-2">
              Selamat Datang, {currentUser?.name}! 👋
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {isAdmin() 
                ? "Kelola pengurus, akun, berita, dan seluruh konten PEMA UTU dengan mudah melalui dashboard terpadu ini."
                : profileCompleted 
                  ? "Profil Anda sudah lengkap dan tampil di website PEMA UTU."
                  : "Silakan lengkapi profil Anda untuk tampil di website PEMA UTU."
              }
            </p>
          </CardContent>
        </Card>

        {/* Menu Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={index}
                className="shadow-card hover:shadow-primary transition-all cursor-pointer group h-full"
                onClick={() => navigate(item.path)}
              >
                <CardHeader className="pb-3">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${item.color} rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <CardTitle className="text-base sm:text-lg group-hover:text-gold transition-colors line-clamp-2">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats - Real-time Data */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Pengurus</p>
                  <p className="text-3xl font-bold text-primary">
                    {pengurusCount}
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
                    {newsCount}
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
                  <p className="text-sm text-muted-foreground">Kementerian Aktif</p>
                  <p className="text-3xl font-bold text-primary">
                    {ministryCount}
                  </p>
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
