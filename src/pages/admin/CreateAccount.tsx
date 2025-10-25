import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { createUser, isUsernameAvailable, isEmailAvailable } from "@/lib/database";
import { ArrowLeft, Loader2, UserPlus } from "lucide-react";

export default function CreateAccount() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    name: "",
    role: "menteri" as "admin" | "pimpinan" | "menteri",
    position: "",
    department: "",
    kementerian: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = async () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    } else {
      const { available } = await isEmailAvailable(formData.email);
      if (!available) {
        newErrors.email = "Email sudah digunakan";
      }
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username wajib diisi";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username minimal 3 karakter";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Username hanya boleh mengandung huruf, angka, dan underscore";
    } else {
      const { available } = await isUsernameAvailable(formData.username);
      if (!available) {
        newErrors.username = "Username sudah digunakan";
      }
    }

    // Name validation
    if (!formData.name) {
      newErrors.name = "Nama lengkap wajib diisi";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password wajib diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
    }

    // Role-specific validation
    if (formData.role === "menteri" && !formData.kementerian) {
      newErrors.kementerian = "Kementerian wajib diisi untuk role Menteri";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = await validateForm();
    if (!isValid) {
      toast({
        title: "Validasi Gagal",
        description: "Mohon periksa kembali form Anda",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const result = await createUser({
        email: formData.email,
        password: formData.password,
        username: formData.username,
        name: formData.name,
        role: formData.role,
        position: formData.position || undefined,
        department: formData.department || undefined,
        kementerian: formData.kementerian || undefined,
      });

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Akun berhasil dibuat",
        });
        navigate("/admin/users");
      } else {
        toast({
          title: "Gagal",
          description: result.error || "Gagal membuat akun",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Terjadi kesalahan",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Button
        variant="ghost"
        onClick={() => navigate("/admin/users")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Kembali
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Buat Akun Baru
          </CardTitle>
          <CardDescription>
            Buat akun pengguna baru untuk sistem PEMA UTU
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="user@example.com"
                disabled={loading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                placeholder="username"
                disabled={loading}
              />
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username}</p>
              )}
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Nama Lengkap"
                disabled={loading}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Minimal 6 karakter"
                disabled={loading}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmasi Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Ketik ulang password"
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Select
                value={formData.role}
                onValueChange={(value: any) => handleInputChange("role", value)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="pimpinan">Pimpinan</SelectItem>
                  <SelectItem value="menteri">Menteri</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Position */}
            <div className="space-y-2">
              <Label htmlFor="position">Jabatan</Label>
              <Input
                id="position"
                type="text"
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                placeholder="Contoh: Ketua, Wakil Ketua"
                disabled={loading}
              />
            </div>

            {/* Department */}
            <div className="space-y-2">
              <Label htmlFor="department">Departemen</Label>
              <Input
                id="department"
                type="text"
                value={formData.department}
                onChange={(e) => handleInputChange("department", e.target.value)}
                placeholder="Contoh: Departemen Pendidikan"
                disabled={loading}
              />
            </div>

            {/* Kementerian (only for menteri role) */}
            {formData.role === "menteri" && (
              <div className="space-y-2">
                <Label htmlFor="kementerian">Kementerian *</Label>
                <Input
                  id="kementerian"
                  type="text"
                  value={formData.kementerian}
                  onChange={(e) => handleInputChange("kementerian", e.target.value)}
                  placeholder="Nama Kementerian"
                  disabled={loading}
                />
                {errors.kementerian && (
                  <p className="text-sm text-destructive">{errors.kementerian}</p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Membuat Akun...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Buat Akun
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/users")}
                disabled={loading}
              >
                Batal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
