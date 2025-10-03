import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Plus, 
  Pencil, 
  Trash2, 
  Search,
  LogOut,
  FileText,
  Eye
} from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  views: number;
  featured: boolean;
  image?: string;
  publishedDate: string;
  publishedBy: string;
}

const categories = [
  "Press Release",
  "Program",
  "Kegiatan", 
  "Pendidikan",
  "Kemahasiswaan",
  "Prestasi",
  "Pengumuman"

];

export default function NewsManagement() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState<NewsItem | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState<NewsItem>({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    author: "",
    date: "",
    category: "",
    views: 0,
    featured: false,
    image: "",
    publishedDate: new Date().toISOString().split('T')[0],
    publishedBy: "Administrator"
  });

  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Migrate existing news to add new fields
  const migrateNews = (newsList: NewsItem[]) => {
    return newsList.map(news => ({
      ...news,
      publishedDate: news.publishedDate || new Date().toISOString().split('T')[0],
      publishedBy: news.publishedBy || "Administrator"
    }));
  };

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("newsList");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        const migratedData = migrateNews(parsedData);
        setNewsList(migratedData);
        
        // Save migrated data back to localStorage
        localStorage.setItem("newsList", JSON.stringify(migratedData));
      } catch (error) {
        console.error("Error parsing news data:", error);
        setNewsList([]);
      }
    } else {
      setNewsList([]);
    }
    setIsLoaded(true);
  }, [currentUser]);

  // Save to localStorage whenever list changes (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("newsList", JSON.stringify(newsList));
    }
  }, [newsList, isLoaded]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleClearAllNews = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus semua berita? Tindakan ini tidak dapat dibatalkan.")) {
      setNewsList([]);
      localStorage.removeItem("newsList");
      toast({
        title: "Berhasil!",
        description: "Semua berita telah dihapus"
      });
    }
  };

  const handleAdd = () => {
    setCurrentNews(null);
    setFormData({
      id: "",
      title: "",
      excerpt: "",
      content: "",
      author: currentUser?.name || "",
      date: new Date().toISOString().split('T')[0],
      category: "",
      views: 0,
      featured: false,
      image: "",
      publishedDate: new Date().toISOString().split('T')[0],
      publishedBy: "Administrator"
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (news: NewsItem) => {
    setCurrentNews(news);
    setFormData({
      ...news,
      publishedDate: news.publishedDate || new Date().toISOString().split('T')[0],
      publishedBy: news.publishedBy || "Administrator"
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (news: NewsItem) => {
    setCurrentNews(news);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentNews) {
      const updatedList = newsList.filter(n => n.id !== currentNews.id);
      setNewsList(updatedList);
      toast({
        title: "Berhasil!",
        description: "Berita telah dihapus"
      });
      setIsDeleteDialogOpen(false);
      setCurrentNews(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentNews) {
      // Update existing
      const updatedList = newsList.map(n => 
        n.id === currentNews.id ? formData : n
      );
      setNewsList(updatedList);
      toast({
        title: "Berhasil!",
        description: "Berita telah diperbarui"
      });
    } else {
      // Add new
      const newNews = {
        ...formData,
        id: Date.now().toString(),
        author: currentUser?.name || "Admin",
        date: new Date().toISOString().split('T')[0]
      };
      setNewsList([newNews, ...newsList]);
      toast({
        title: "Berhasil!",
        description: "Berita baru telah ditambahkan"
      });
    }
    
    setIsDialogOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const processImageFile = (file: File) => {
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
        image: base64String
      }));
      toast({
        title: "Berhasil!",
        description: "Gambar berhasil diupload"
      });
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      processImageFile(imageFile);
    } else {
      toast({
        title: "File tidak valid",
        description: "Silakan drop file gambar",
        variant: "destructive"
      });
    }
  };

  const handleImageDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const filteredNews = newsList.filter(news => {
    const matchesCategory = selectedCategory === "Semua" || news.category === selectedCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                <h1 className="text-2xl font-bold text-primary">Kelola Berita</h1>
                <p className="text-sm text-muted-foreground">Manajemen konten berita dan artikel</p>
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
              <CardTitle className="text-xl flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-gold" />
                  Daftar Berita
                </div>
                <div className="text-sm font-normal text-muted-foreground">
                  Total: {newsList.length} berita
                </div>
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Semua">Semua Kategori</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari berita..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAdd}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Berita
                  </Button>
                  {newsList.length > 0 && (
                    <Button 
                      variant="outline" 
                      onClick={handleClearAllNews}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Hapus Semua
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Penulis</TableHead>
                    <TableHead>Publikasi</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNews.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Tidak ada berita ditemukan
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredNews.map((news) => (
                      <TableRow key={news.id}>
                        <TableCell className="font-medium max-w-xs">
                          <div>
                            <p className="truncate">{news.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{news.excerpt}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs ${
                            news.category === "Press Release" 
                              ? "bg-red-100 text-red-700 font-medium" 
                              : "bg-primary/10 text-primary"
                          }`}>
                            {news.category}
                          </span>
                        </TableCell>
                        <TableCell>{news.author}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium">
                              {news.publishedBy || "Administrator"}
                            </div>
                            <div className="text-muted-foreground">
                              {news.publishedDate ? 
                                new Date(news.publishedDate).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'long', 
                                  year: 'numeric'
                                }) : 
                                new Date(news.date).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })
                              }
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1 text-muted-foreground" />
                            {news.views}
                          </div>
                        </TableCell>
                        <TableCell>
                          {news.featured && (
                            <span className="px-2 py-1 bg-gold/20 text-gold rounded text-xs">
                              Featured
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(news)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(news)}
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
              {currentNews ? "Edit Berita" : "Tambah Berita Baru"}
            </DialogTitle>
            <DialogDescription>
              Lengkapi form di bawah ini untuk {currentNews ? "memperbarui" : "menambahkan"} berita
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="title">Judul Berita *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Masukkan judul berita"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Kategori *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({...prev, category: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                        {cat === "Press Release" && (
                          <span className="text-xs text-muted-foreground ml-2">- Siaran pers resmi</span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.category === "Press Release" && (
                  <p className="text-xs text-blue-600">
                    📢 Press Release: Untuk siaran pers resmi dan pengumuman penting organisasi
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Gambar Berita (Opsional)</Label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors"
                  onDrop={handleImageDrop}
                  onDragOver={handleImageDragOver}
                >
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label 
                    htmlFor="image" 
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div className="text-sm text-center">
                      <span className="font-medium text-primary">Klik untuk upload</span>
                      <p className="text-gray-500">atau drag & drop gambar di sini</p>
                    </div>
                  </label>
                </div>
                <p className="text-xs text-muted-foreground">
                  📷 Format: JPG, PNG, GIF | Maksimal: 5MB
                </p>
                
                {/* Preview Gambar */}
                {formData.image && (
                  <div className="mt-2">
                    <Label className="text-sm text-muted-foreground">Preview:</Label>
                    <div className="mt-1 p-3 border rounded-lg bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <img
                          src={formData.image}
                          alt="Preview gambar"
                          className="w-20 h-20 object-cover rounded-lg border-2 border-white shadow-sm"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-green-600 font-medium">
                            ✅ Gambar berhasil diupload
                          </p>
                          <div className="flex space-x-2 mt-1">
                            <label 
                              htmlFor="image" 
                              className="text-xs text-blue-600 hover:underline cursor-pointer"
                            >
                              🔄 Ganti gambar
                            </label>
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                              className="text-xs text-red-600 hover:underline"
                            >
                              🗑️ Hapus
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="excerpt">Ringkasan *</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Tulis ringkasan singkat berita..."
                  rows={3}
                  required
                />
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="content">Konten Berita *</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Tulis konten lengkap berita..."
                  rows={8}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="publishedDate">Tanggal Publikasi *</Label>
                  <Input
                    id="publishedDate"
                    type="date"
                    value={formData.publishedDate || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, publishedDate: e.target.value }))}
                    max={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publishedBy">Diterbitkan Oleh *</Label>
                  <Input
                    id="publishedBy"
                    type="text"
                    value={formData.publishedBy || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, publishedBy: e.target.value }))}
                    placeholder="Administrator"
                    maxLength={50}
                    required
                  />
                </div>
              </div>
              
              <div className="md:col-span-2 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="rounded"
                />
                <Label htmlFor="featured">Jadikan berita unggulan</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit">
                {currentNews ? "Perbarui" : "Tambah"} Berita
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
              Apakah Anda yakin ingin menghapus berita <strong>"{currentNews?.title}"</strong>? 
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
    </div>
  );
}
