import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  LogOut,
  Search,
  Download,
  Share2,
  Eye,
  EyeOff,
  Copy,
  Users,
  Key,
  Mail,
  MessageSquare
} from "lucide-react";
// @ts-ignore
import html2canvas from "html2canvas";

interface AccountData {
  id: string;
  nama: string;
  jabatan: string;
  username: string;
  password: string;
  role: "pimpinan" | "menteri";
  profileCompleted: boolean;
  createdAt: string;
}

export default function AccountManagement() {
  const [accounts, setAccounts] = useState<AccountData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({});
  const cardRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = () => {
    try {
      const loginUsers = JSON.parse(localStorage.getItem("loginUsers") || "[]");
      const pengurusList = JSON.parse(localStorage.getItem("pengurusList") || "[]");
      
      // Validate arrays
      if (!Array.isArray(loginUsers) || !Array.isArray(pengurusList)) {
        console.error("Invalid data format in localStorage");
        setAccounts([]);
        return;
      }
      
      // Combine data from both sources
      const accountsData: AccountData[] = loginUsers
        .filter((user: any) => user.role !== "admin")
        .map((user: any) => {
          const pengurusData = pengurusList.find((p: any) => p.id === user.id);
          return {
            id: user.id,
            nama: user.name,
            jabatan: user.position,
            username: user.username,
            password: user.password,
            role: user.role,
            profileCompleted: pengurusData?.profileCompleted || false,
            createdAt: new Date().toISOString() // In real app, this would be stored
          };
        });

      setAccounts(accountsData);
    } catch (error) {
      console.error("Error loading accounts:", error);
      setAccounts([]);
      toast({
        title: "Error",
        description: "Gagal memuat data akun. Data mungkin rusak.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const togglePasswordVisibility = (accountId: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Berhasil Disalin! ✅",
        description: `${label} telah disalin ke clipboard`
      });
    } catch (error) {
      toast({
        title: "Gagal Menyalin",
        description: "Tidak dapat menyalin ke clipboard",
        variant: "destructive"
      });
    }
  };

  const downloadAccountCard = async (account: AccountData) => {
    const cardElement = cardRefs.current[account.id];
    if (!cardElement) return;

    try {
      const canvas = await html2canvas(cardElement);
      
      const link = document.createElement('a');
      link.download = `akun-${account.username}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast({
        title: "Kartu Berhasil Diunduh! ✅",
        description: `Kartu akun ${account.nama} telah diunduh`
      });
    } catch (error) {
      toast({
        title: "Gagal Mengunduh",
        description: "Tidak dapat mengunduh kartu akun",
        variant: "destructive"
      });
    }
  };

  const shareAccountCard = async (account: AccountData) => {
    const message = `🔐 AKUN LOGIN PEMA UTU

👤 Nama: ${account.nama}
🎯 Jabatan: ${account.jabatan}
🔑 Username: ${account.username}
🔒 Password: ${account.password}

📱 Login di: [URL_WEBSITE]/login

⚠️ Harap segera login dan lengkapi profil Anda agar dapat tampil di website PEMA UTU.

Jaga kerahasiaan akun ini! 🔐`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Akun Login - ${account.nama}`,
          text: message
        });
      } catch (error) {
        // Fallback to clipboard
        copyToClipboard(message, "Informasi akun");
      }
    } else {
      copyToClipboard(message, "Informasi akun");
    }
  };

  const sendViaWhatsApp = (account: AccountData) => {
    const message = `🔐 *AKUN LOGIN PEMA UTU*

👤 *Nama:* ${account.nama}
🎯 *Jabatan:* ${account.jabatan}
🔑 *Username:* ${account.username}
🔒 *Password:* ${account.password}

📱 *Login di:* [URL_WEBSITE]/login

⚠️ Harap segera login dan lengkapi profil Anda agar dapat tampil di website PEMA UTU.

*Jaga kerahasiaan akun ini!* 🔐`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const sendViaEmail = (account: AccountData) => {
    const subject = `Akun Login PEMA UTU - ${account.nama}`;
    const body = `Halo ${account.nama},

Berikut adalah informasi akun login Anda untuk sistem PEMA UTU:

👤 Nama: ${account.nama}
🎯 Jabatan: ${account.jabatan}
🔑 Username: ${account.username}
🔒 Password: ${account.password}

📱 Silakan login di: [URL_WEBSITE]/login

⚠️ Harap segera login dan lengkapi profil Anda agar dapat tampil di website PEMA UTU.

Jaga kerahasiaan akun ini dan jangan bagikan kepada orang lain.

Terima kasih,
Admin PEMA UTU`;

    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  const filteredAccounts = accounts.filter(account =>
    account.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.jabatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <h1 className="text-2xl font-bold text-primary">Kelola Akun</h1>
                <p className="text-sm text-muted-foreground">Lihat dan kelola akun anggota kabinet</p>
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
        {/* Search & Stats */}
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-xl flex items-center">
                  <Users className="h-6 w-6 mr-2 text-gold" />
                  Akun Anggota Kabinet
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Total: {accounts.length} akun | Profil Lengkap: {accounts.filter(a => a.profileCompleted).length}
                </p>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari akun..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Account Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccounts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                {searchTerm ? "Tidak ada akun yang ditemukan" : "Belum ada akun"}
              </h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Coba kata kunci lain" : "Buat akun baru di halaman Kelola Data Pengurus"}
              </p>
            </div>
          ) : (
            filteredAccounts.map((account) => (
              <Card key={account.id} className="shadow-lg hover:shadow-xl transition-shadow">
                {/* Downloadable Card Content */}
                <div
                  ref={(el) => cardRefs.current[account.id] = el}
                  className="bg-gradient-to-br from-primary to-gold text-white p-6 rounded-t-lg"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Key className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold">{account.nama}</h3>
                    <p className="text-white/90">{account.jabatan}</p>
                    <Badge 
                      variant="secondary" 
                      className="mt-2 bg-white/20 text-white border-white/30"
                    >
                      {account.role === "pimpinan" ? "Pimpinan" : "Menteri"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 bg-white/10 rounded-lg p-4">
                    <div>
                      <p className="text-white/70 text-sm">Username</p>
                      <p className="font-mono font-bold">{account.username}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Password</p>
                      <p className="font-mono font-bold">
                        {showPasswords[account.id] ? account.password : "••••••••"}
                      </p>
                    </div>
                    <div className="text-center pt-2">
                      <p className="text-white/70 text-xs">PEMA UTU - Kabinet Samgrahita</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <Badge 
                      variant={account.profileCompleted ? "default" : "secondary"}
                      className={account.profileCompleted ? "bg-green-100 text-green-800" : ""}
                    >
                      {account.profileCompleted ? "✅ Profil Lengkap" : "⏳ Profil Belum Lengkap"}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePasswordVisibility(account.id)}
                    >
                      {showPasswords[account.id] ? 
                        <EyeOff className="h-4 w-4" /> : 
                        <Eye className="h-4 w-4" />
                      }
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {/* Copy Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(account.username, "Username")}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Username
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(account.password, "Password")}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Password
                      </Button>
                    </div>

                    {/* Download & Share */}
                    <Button
                      onClick={() => downloadAccountCard(account)}
                      className="w-full"
                      size="sm"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Kartu
                    </Button>

                    {/* Send Options */}
                    <div className="grid grid-cols-3 gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => shareAccountCard(account)}
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => sendViaWhatsApp(account)}
                        className="text-green-600"
                      >
                        <MessageSquare className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => sendViaEmail(account)}
                        className="text-blue-600"
                      >
                        <Mail className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
