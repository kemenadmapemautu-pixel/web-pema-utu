import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Lock, User, Mail } from "lucide-react";
import { isSupabaseEnabled } from "@/lib/supabase";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, loginWithSupabase } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Try Supabase login first if configured
      if (isSupabaseEnabled()) {
        const result = await loginWithSupabase(credentials.username, credentials.password);
        
        if (result.success && result.user) {
          toast({
            title: "Login Berhasil! ✅",
            description: `Selamat datang, ${result.user.name} (${result.user.role})`,
          });
          navigate("/admin/dashboard");
          return;
        } else if (result.error && !result.error.includes("Supabase not configured")) {
          // If not a config error, try localStorage fallback
          console.log("Supabase login failed, trying localStorage fallback...");
        }
      }

      // Fallback to localStorage
      const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
      const foundAccount = accounts.find((acc: any) => 
        acc.username === credentials.username && acc.password === credentials.password
      );

      if (foundAccount) {
        const user = {
          username: foundAccount.username,
          name: foundAccount.name,
          role: foundAccount.role,
          id: foundAccount.id,
          position: foundAccount.position,
          department: foundAccount.department
        };

        login(user);
        
        toast({
          title: "Login Berhasil! ✅",
          description: `Selamat datang, ${user.name} (${user.role})`,
        });
        
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Login Gagal",
          description: "Email/Username atau password salah.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat login.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
                <Label htmlFor="username">Email atau Username</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Email atau Username"
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

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm font-semibold mb-2 text-blue-900 dark:text-blue-100">🔐 Informasi Login</p>
              <div className="text-xs space-y-2 text-blue-700 dark:text-blue-300">
                <p><strong>Admin Default:</strong></p>
                <p>Email: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">pemautusamgrahita@gmail.com</code></p>
                <p>Password: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">Luckystrike26</code></p>
                <p className="text-[10px] italic mt-2">Atau gunakan username: adminpemautu</p>
              </div>
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
