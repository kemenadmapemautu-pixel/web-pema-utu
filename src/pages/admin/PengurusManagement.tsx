import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  UserPlus, 
  Pencil, 
  Trash2, 
  Search,
  LogOut,
  Key,
  Eye,
  EyeOff
} from "lucide-react";

interface Pengurus {
  id: string;
  nama: string;
  jabatan: string;
  departemen?: string;
  email: string;
  telepon: string;
  foto?: string;
  tipe: "pimpinan" | "menteri";
  fakultas?: string;
  prodi?: string;
  deskripsi?: string;
  prestasi?: string[];
  periode?: string;
  // Login credentials (hanya untuk pimpinan & menteri)
  username?: string;
  password?: string;
  hasAccount?: boolean; // Apakah sudah punya akun login
  profileCompleted?: boolean; // Apakah profil sudah dilengkapi
}

export default function PengurusManagement() {
  const [pengurusList, setPengurusList] = useState<Pengurus[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const [currentPengurus, setCurrentPengurus] = useState<Pengurus | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [accountForm, setAccountForm] = useState({
    nama: "",
    jabatan: "",
    username: "",
    password: "",
    role: "pimpinan" as "pimpinan" | "menteri"
  });
  const [formData, setFormData] = useState<Pengurus>({
    id: "",
    nama: "",
    jabatan: "",
    departemen: "",
    email: "",
    telepon: "",
    foto: "",
    tipe: "menteri",
    fakultas: "",
    prodi: "",
    deskripsi: "",
    prestasi: [],
    periode: "2024-2025",
    username: "",
    password: "",
    hasAccount: false,
    profileCompleted: false
  });

  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("pengurusList");
    if (savedData) {
      setPengurusList(JSON.parse(savedData));
    } else {
      // Data dummy untuk demo - sekarang kosong, semua data dikelola melalui form
      const dummyData: Pengurus[] = [];
      setPengurusList(dummyData);
      localStorage.setItem("pengurusList", JSON.stringify(dummyData));
    }
  }, []);

  // Save to localStorage whenever list changes
  useEffect(() => {
    if (pengurusList.length > 0) {
      localStorage.setItem("pengurusList", JSON.stringify(pengurusList));
    }
  }, [pengurusList]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAdd = () => {
    setCurrentPengurus(null);
    setFormData({
      id: "",
      nama: "",
      jabatan: "",
      departemen: "",
      email: "",
      telepon: "",
      foto: "",
      tipe: "menteri",
      fakultas: "",
      prodi: "",
      deskripsi: "",
      prestasi: [],
      periode: "2024-2025"
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (pengurus: Pengurus) => {
    setCurrentPengurus(pengurus);
    setFormData(pengurus);
    setIsDialogOpen(true);
  };

  const handleDelete = (pengurus: Pengurus) => {
    setCurrentPengurus(pengurus);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentPengurus) {
      const updatedList = pengurusList.filter(p => p.id !== currentPengurus.id);
      setPengurusList(updatedList);
      toast({
        title: "Berhasil!",
        description: "Data pengurus telah dihapus"
      });
      setIsDeleteDialogOpen(false);
      setCurrentPengurus(null);
    }
  };

  // Generate username otomatis
  const generateUsername = (nama: string, tipe: string) => {
    const cleanName = nama.toLowerCase().replace(/\s+/g, '');
    const prefix = tipe === "pimpinan" ? "pim" : "men";
    const timestamp = Date.now().toString().slice(-3);
    return `${prefix}_${cleanName}_${timestamp}`;
  };

  // Generate password otomatis
  const generatePassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  // Handle create account
  const handleCreateAccount = () => {
    setAccountForm({
      nama: "",
      jabatan: "",
      username: "",
      password: generatePassword(),
      role: "pimpinan"
    });
    setIsCreateAccountOpen(true);
  };

  const handleAccountFormChange = (field: string, value: string) => {
    setAccountForm(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Auto-generate username when nama or role changes
    if (field === "nama" || field === "role") {
      const nama = field === "nama" ? value : accountForm.nama;
      const role = field === "role" ? value : accountForm.role;
      if (nama) {
        setAccountForm(prev => ({
          ...prev,
          username: generateUsername(nama, role)
        }));
      }
    }
  };

  const handleSubmitAccount = () => {
    if (!accountForm.nama || !accountForm.jabatan || !accountForm.username || !accountForm.password) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive"
      });
      return;
    }

    // Create basic pengurus record
    const newPengurus: Pengurus = {
      id: Date.now().toString(),
      nama: accountForm.nama,
      jabatan: accountForm.jabatan,
      departemen: "",
      email: "",
      telepon: "",
      tipe: accountForm.role,
      username: accountForm.username,
      password: accountForm.password,
      hasAccount: true,
      profileCompleted: false
    };

    // Add to pengurus list
    setPengurusList(prev => [...prev, newPengurus]);

    // Add to login system
    syncWithLoginSystem(newPengurus);

    toast({
      title: "Akun Berhasil Dibuat! ✅",
      description: `Username: ${accountForm.username} | Password: ${accountForm.password}`,
      duration: 10000 // Show longer so admin can copy
    });

    setIsCreateAccountOpen(false);
  };

  // Sync dengan sistem login
  const syncWithLoginSystem = (pengurus: Pengurus) => {
    if (!pengurus.username || !pengurus.password) return;

    const loginUsers = JSON.parse(localStorage.getItem("loginUsers") || "[]");
    
    // Cek apakah user sudah ada
    const existingUserIndex = loginUsers.findIndex((u: any) => u.id === pengurus.id);
    
    const userData = {
      id: pengurus.id,
      username: pengurus.username,
      password: pengurus.password,
      role: pengurus.tipe,
      name: pengurus.nama,
      position: pengurus.jabatan,
      department: pengurus.departemen || pengurus.fakultas
    };

    if (existingUserIndex >= 0) {
      loginUsers[existingUserIndex] = userData;
    } else {
      loginUsers.push(userData);
    }

    localStorage.setItem("loginUsers", JSON.stringify(loginUsers));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-generate credentials untuk pimpinan/menteri jika belum ada
    let finalFormData = { ...formData };
    
    if ((formData.tipe === "pimpinan" || formData.tipe === "menteri") && !formData.username) {
      finalFormData.username = generateUsername(formData.nama, formData.tipe);
      finalFormData.password = generatePassword();
      finalFormData.hasAccount = true;
      finalFormData.profileCompleted = false;
    }
    
    if (currentPengurus) {
      // Update existing
      const updatedList = pengurusList.map(p => 
        p.id === currentPengurus.id ? finalFormData : p
      );
      setPengurusList(updatedList);
      
      // Sync dengan login system
      if (finalFormData.tipe === "pimpinan" || finalFormData.tipe === "menteri") {
        syncWithLoginSystem(finalFormData);
      }
      
      toast({
        title: "Berhasil!",
        description: "Data pengurus telah diperbarui"
      });
    } else {
      // Add new
      const newPengurus = {
        ...finalFormData,
        id: Date.now().toString()
      };
      setPengurusList([...pengurusList, newPengurus]);
      
      // Sync dengan login system
      if (newPengurus.tipe === "pimpinan" || newPengurus.tipe === "menteri") {
        syncWithLoginSystem(newPengurus);
      }
      
      toast({
        title: "Berhasil!",
        description: `Pengurus baru telah ditambahkan${newPengurus.username ? `. Username: ${newPengurus.username}, Password: ${newPengurus.password}` : ""}`
      });
    }
    
    setIsDialogOpen(false);
    setFormData({
      id: "",
      nama: "",
      jabatan: "",
      departemen: "",
      email: "",
      telepon: "",
      foto: "",
      tipe: "menteri",
      fakultas: "",
      prodi: "",
      deskripsi: "",
      prestasi: [],
      periode: "2024-2025"
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio' ? value : value
    }));
  };

  const processFile = (file: File) => {
    // Validasi ukuran file (maksimal 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File terlalu besar",
        description: "Ukuran file maksimal 5MB",
        variant: "destructive"
      });
      return;
    }

    // Validasi tipe file
    if (!file.type.startsWith('image/')) {
      toast({
        title: "File tidak valid",
        description: "Hanya file gambar yang diperbolehkan",
        variant: "destructive"
      });
      return;
    }

    // Convert file to base64 untuk preview dan storage
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      setFormData(prev => ({
        ...prev,
        foto: base64String
      }));
      toast({
        title: "Berhasil!",
        description: "Foto berhasil diupload"
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      processFile(imageFile);
    } else {
      toast({
        title: "File tidak valid",
        description: "Silakan drop file gambar",
        variant: "destructive"
      });
    }
  };


  const filteredPengurus = pengurusList.filter(p =>
    p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.jabatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.departemen && p.departemen.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (p.fakultas && p.fakultas.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (p.prodi && p.prodi.toLowerCase().includes(searchTerm.toLowerCase()))
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
                <h1 className="text-2xl font-bold text-primary">Kelola Data Pengurus</h1>
                <p className="text-sm text-muted-foreground">Manajemen data pengurus kabinet</p>
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
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-xl">Daftar Pengurus</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleCreateAccount} className="bg-green-600 hover:bg-green-700">
                  <Key className="h-4 w-4 mr-2" />
                  Buat Akun
                </Button>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Tambah Pengurus
                </Button>
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari pengurus..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Jabatan</TableHead>
                    <TableHead>Fakultas/Departemen</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status Akun</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPengurus.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Tidak ada data pengurus
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPengurus.map((pengurus) => (
                      <TableRow key={pengurus.id}>
                        <TableCell className="font-medium">{pengurus.nama}</TableCell>
                        <TableCell>{pengurus.jabatan}</TableCell>
                        <TableCell>{pengurus.fakultas || pengurus.departemen || "-"}</TableCell>
                        <TableCell>{pengurus.email}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {pengurus.hasAccount ? (
                              <>
                                <Badge variant="default" className="text-xs">
                                  ✅ Punya Akun
                                </Badge>
                                {pengurus.profileCompleted ? (
                                  <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                                    ✅ Profil Lengkap
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary" className="text-xs">
                                    ⏳ Profil Belum Lengkap
                                  </Badge>
                                )}
                                {pengurus.username && (
                                  <p className="text-xs text-muted-foreground">
                                    User: {pengurus.username}
                                  </p>
                                )}
                              </>
                            ) : (
                              <Badge variant="outline" className="text-xs">
                                ❌ Belum Punya Akun
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(pengurus)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(pengurus)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentPengurus ? "Edit Data Pengurus" : "Tambah Pengurus Baru"}
            </DialogTitle>
            <DialogDescription>
              Lengkapi form di bawah ini untuk {currentPengurus ? "memperbarui" : "menambahkan"} data pengurus
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 py-4">
              {/* Tipe Pengurus */}
              <div className="space-y-2">
                <Label>Tipe Pengurus *</Label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="tipe"
                      value="pimpinan"
                      checked={formData.tipe === "pimpinan"}
                      onChange={handleChange}
                      className="text-primary"
                    />
                    <span>Pimpinan (Ketua, Wakil Ketua, dll)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="tipe"
                      value="menteri"
                      checked={formData.tipe === "menteri"}
                      onChange={handleChange}
                      className="text-primary"
                    />
                    <span>Menteri</span>
                  </label>
                </div>
              </div>

              {/* Form Fields Umum */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap *</Label>
                  <Input
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jabatan">Jabatan *</Label>
                  <Input
                    id="jabatan"
                    name="jabatan"
                    value={formData.jabatan}
                    onChange={handleChange}
                    placeholder={formData.tipe === "pimpinan" ? "Contoh: Ketua Umum" : "Contoh: Menteri Pendidikan"}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@pema.utu.ac.id"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telepon">Telepon *</Label>
                  <Input
                    id="telepon"
                    name="telepon"
                    value={formData.telepon}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    required
                  />
                </div>
              </div>

              {/* Form Fields untuk Pimpinan */}
              {formData.tipe === "pimpinan" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fakultas">Fakultas *</Label>
                      <Input
                        id="fakultas"
                        name="fakultas"
                        value={formData.fakultas || ""}
                        onChange={handleChange}
                        placeholder="Contoh: Fakultas Teknik"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prodi">Program Studi *</Label>
                      <Input
                        id="prodi"
                        name="prodi"
                        value={formData.prodi || ""}
                        onChange={handleChange}
                        placeholder="Contoh: Teknik Informatika"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deskripsi">Deskripsi/Visi Misi</Label>
                    <Textarea
                      id="deskripsi"
                      name="deskripsi"
                      value={formData.deskripsi || ""}
                      onChange={handleChange}
                      placeholder="Tulis deskripsi, visi, atau misi..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prestasi">Riwayat Organisasi (pisahkan dengan koma)</Label>
                    <Textarea
                      id="prestasi"
                      name="prestasi"
                      value={formData.prestasi?.join(", ") || ""}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        prestasi: e.target.value.split(",").map(p => p.trim()).filter(p => p)
                      }))}
                      placeholder="Ketua BEM Fakultas, Anggota UKM Musik, Koordinator Event Campus"
                      rows={3}
                    />
                  </div>
                </>
              )}

              {/* Form Fields untuk Menteri - Sama seperti Pimpinan */}
              {formData.tipe === "menteri" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fakultas">Fakultas *</Label>
                      <Input
                        id="fakultas"
                        name="fakultas"
                        value={formData.fakultas || ""}
                        onChange={handleChange}
                        placeholder="Contoh: Fakultas Teknik"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prodi">Program Studi *</Label>
                      <Input
                        id="prodi"
                        name="prodi"
                        value={formData.prodi || ""}
                        onChange={handleChange}
                        placeholder="Contoh: Teknik Informatika"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departemen">Departemen *</Label>
                    <Input
                      id="departemen"
                      name="departemen"
                      value={formData.departemen}
                      onChange={handleChange}
                      placeholder="Contoh: Pendidikan, Kemahasiswaan, dll"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deskripsi">Deskripsi/Visi Misi</Label>
                    <Textarea
                      id="deskripsi"
                      name="deskripsi"
                      value={formData.deskripsi || ""}
                      onChange={handleChange}
                      placeholder="Tulis deskripsi, visi, atau misi..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prestasi">Riwayat Organisasi (pisahkan dengan koma)</Label>
                    <Textarea
                      id="prestasi"
                      name="prestasi"
                      value={formData.prestasi?.join(", ") || ""}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        prestasi: e.target.value.split(",").map(p => p.trim()).filter(p => p)
                      }))}
                      placeholder="Ketua BEM Fakultas, Anggota UKM Musik, Koordinator Event Campus"
                      rows={3}
                    />
                  </div>
                </>
              )}

              {/* Form Fields Umum Lanjutan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="foto">Foto Profil (Opsional)</Label>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary transition-colors"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <Input
                      id="foto"
                      name="foto"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label 
                      htmlFor="foto" 
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <div className="text-sm text-center">
                        <span className="font-medium text-primary">Klik untuk upload</span>
                        <p className="text-gray-500">atau drag & drop file di sini</p>
                        <p className="text-xs text-blue-600 mt-1">Rekomendasi: 300×300px</p>
                      </div>
                    </label>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>📷 Format: JPG, PNG, GIF | Maksimal: 5MB</p>
                    <p>📐 Rekomendasi: 300×300px (persegi) untuk hasil terbaik</p>
                  </div>
                  
                  {/* Tips Box */}
                  <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                    <div className="flex items-start space-x-1">
                      <span className="text-blue-600">💡</span>
                      <div className="text-blue-800">
                        <p className="font-medium">Tips foto profil yang baik:</p>
                        <ul className="mt-1 space-y-0.5 text-xs">
                          <li>• Gunakan foto dengan wajah jelas dan terpusat</li>
                          <li>• Background polos atau tidak mengganggu</li>
                          <li>• Pencahayaan yang cukup dan tidak gelap</li>
                          <li>• Format persegi (300×300px) untuk tampilan optimal</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Preview Gambar */}
                  {formData.foto && (
                    <div className="mt-2">
                      <Label className="text-sm text-muted-foreground">Preview:</Label>
                      <div className="mt-1 p-3 border rounded-lg bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <img
                            src={formData.foto}
                            alt="Preview foto"
                            className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow-sm"
                          />
                          <div className="flex-1">
                            <p className="text-sm text-green-600 font-medium">
                              ✅ Foto berhasil diupload
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Foto akan ditampilkan di halaman Cabinet
                            </p>
                            <div className="flex space-x-2 mt-2">
                              <label 
                                htmlFor="foto" 
                                className="text-xs text-blue-600 hover:underline cursor-pointer"
                              >
                                🔄 Ganti foto
                              </label>
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, foto: "" }))}
                                className="text-xs text-red-600 hover:underline"
                              >
                                🗑️ Hapus foto
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="periode">Periode</Label>
                  <Input
                    id="periode"
                    name="periode"
                    value={formData.periode || "2024-2025"}
                    onChange={handleChange}
                    placeholder="2024-2025"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit">
                {currentPengurus ? "Perbarui" : "Tambah"} {formData.tipe === "pimpinan" ? "Pimpinan" : "Menteri"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus data <strong>{currentPengurus?.nama}</strong>? 
              Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Account Dialog */}
      <Dialog open={isCreateAccountOpen} onOpenChange={setIsCreateAccountOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Key className="h-5 w-5 mr-2 text-green-600" />
              Buat Akun Anggota Kabinet
            </DialogTitle>
            <DialogDescription>
              Buat akun login untuk anggota kabinet. Mereka akan melengkapi profil sendiri setelah login.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="account-nama">Nama Lengkap *</Label>
              <Input
                id="account-nama"
                value={accountForm.nama}
                onChange={(e) => handleAccountFormChange("nama", e.target.value)}
                placeholder="Nama lengkap anggota kabinet"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-jabatan">Jabatan *</Label>
              <Input
                id="account-jabatan"
                value={accountForm.jabatan}
                onChange={(e) => handleAccountFormChange("jabatan", e.target.value)}
                placeholder="Contoh: Ketua Umum, Menteri Pendidikan"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-role">Role *</Label>
              <select
                id="account-role"
                value={accountForm.role}
                onChange={(e) => handleAccountFormChange("role", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pimpinan">Pimpinan</option>
                <option value="menteri">Menteri</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-username">Username (Auto-generated)</Label>
              <Input
                id="account-username"
                value={accountForm.username}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-password">Password</Label>
              <div className="relative">
                <Input
                  id="account-password"
                  type={showPassword ? "text" : "password"}
                  value={accountForm.password}
                  onChange={(e) => handleAccountFormChange("password", e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAccountFormChange("password", generatePassword())}
              >
                Generate Password Baru
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateAccountOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSubmitAccount} className="bg-green-600 hover:bg-green-700">
              Buat Akun
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
