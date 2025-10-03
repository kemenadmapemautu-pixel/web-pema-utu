import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Lock, User } from "lucide-react";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  // Admin credentials - hanya admin yang bisa login langsung
  const adminUser = {
    username: "adminpemautu",
    password: "luckystrike26",
    role: "admin" as const,
    name: "Administrator PEMA UTU",
    id: "admin-001"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi login
    setTimeout(() => {
      let user = null;

      // Cek admin credentials
      if (credentials.username === adminUser.username && credentials.password === adminUser.password) {
        user = adminUser;
      } else {
        // Cek akun yang dibuat admin
        const dynamicUsers = JSON.parse(localStorage.getItem("loginUsers") || "[]");
        user = dynamicUsers.find((u: any) => 
          u.username === credentials.username && u.password === credentials.password
        );
      }

      if (user) {
        // Use AuthContext login function
        login(user);
        
        toast({
          title: "Login Berhasil! ✅",
          description: `Selamat datang, ${user.name} (${user.role})`,
        });
        
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Login Gagal",
          description: "Username atau password salah",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-gold/10 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            PEMA UTU
          </h1>
          <p className="text-muted-foreground">Kabinet Samgrahita</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Lock className="h-6 w-6 text-gold" />
              Login Admin
            </CardTitle>
            <CardDescription className="text-center">
              Masukkan kredensial Anda untuk mengakses dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Masukkan username"
                    value={credentials.username}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Masukkan password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Memproses..."
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Login
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-2">ℹ️ Informasi Login:</p>
              <div className="text-xs space-y-1 text-muted-foreground">
                <p><strong>Admin:</strong> Gunakan credentials admin untuk kelola sistem</p>
                <p><strong>Anggota Kabinet:</strong> Gunakan akun yang dibuat oleh admin</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2 italic">
                Hubungi admin jika belum memiliki akun atau lupa password
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-primary"
          >
            ← Kembali ke Beranda
          </Button>
        </div>
      </div>
    </div>
  );
}
