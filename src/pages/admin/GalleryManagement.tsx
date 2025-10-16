import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useGallery } from "@/contexts/GalleryContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Search,
  LogOut,
  Image as ImageIcon,
  Video,
  Eye,
  Calendar,
  Upload,
  Link as LinkIcon,
  Pencil
} from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  type: "image" | "video";
  date: string;
  category: string;
  description: string;
  views: number;
  thumbnail: string;
  url?: string; // For video URLs (YouTube, etc)
  uploadedBy: string;
  createdAt: string;
}

const categories = [
  "Pelantikan",
  "Pengabdian",
  "Workshop",
  "Seminar",
  "Campaign",
  "Internal",
  "Entrepreneurship",
  "Sosial",
  "Olahraga",
  "Seni & Budaya",
  "Lainnya"
];

export default function GalleryManagement() {
  // PERBAIKAN: Gunakan Context untuk shared state dengan halaman Gallery publik
  const { galleryItems, addItem, updateItem, deleteItem, clearAll } = useGallery();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedType, setSelectedType] = useState<"all" | "image" | "video">("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null);
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState<GalleryItem>({
    id: "",
    title: "",
    type: "image",
    date: new Date().toISOString().split('T')[0],
    category: "",
    description: "",
    views: 0,
    thumbnail: "",
    url: "",
    uploadedBy: "",
    createdAt: new Date().toISOString()
  });

  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // PERBAIKAN: Data sekarang dikelola oleh GalleryContext
  // Tidak perlu useEffect untuk load/save data
  useEffect(() => {
    // Component initialization
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAdd = () => {
    setCurrentItem(null);
    setIsEditing(false);
    setUploadMethod("file");
    setFormData({
      id: "",
      title: "",
      type: "image",
      date: new Date().toISOString().split('T')[0],
      category: "",
      description: "",
      views: 0,
      thumbnail: "",
      url: "",
      uploadedBy: currentUser?.name || "Administrator",
      createdAt: new Date().toISOString()
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: GalleryItem) => {
    setCurrentItem(item);
    setIsEditing(true);
    setFormData(item);
    setUploadMethod(item.url ? "url" : "file");
    setIsDialogOpen(true);
  };

  const handleDelete = (item: GalleryItem) => {
    setCurrentItem(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentItem) {
      // PERBAIKAN: Gunakan deleteItem dari context (sudah handle cleanup Object URL)
      deleteItem(currentItem.id);
      
      toast({
        title: "Berhasil Dihapus! 🗑️",
        description: `${currentItem.type === "image" ? "Foto" : "Video"} telah dihapus dari galeri`
      });
      setIsDeleteDialogOpen(false);
      setCurrentItem(null);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("⚠️ Apakah Anda yakin ingin menghapus SEMUA media di galeri?\n\nTindakan ini tidak dapat dibatalkan!")) {
      // PERBAIKAN: Gunakan clearAll dari context (sudah handle cleanup Object URL)
      clearAll();
      
      toast({
        title: "Galeri Dikosongkan! 🗑️",
        description: "Semua foto dan video telah dihapus dari galeri"
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Mohon lengkapi judul dan kategori",
        variant: "destructive"
      });
      return;
    }

    // Validasi untuk image
    if (formData.type === "image" && !formData.thumbnail && uploadMethod === "file" && !isEditing) {
      toast({
        title: "File Belum Diupload",
        description: "Mohon upload file gambar",
        variant: "destructive"
      });
      return;
    }

    // Validasi untuk video file upload
    if (formData.type === "video" && uploadMethod === "file" && !formData.url && !isEditing) {
      toast({
        title: "Video Belum Diupload",
        description: "Mohon upload file video",
        variant: "destructive"
      });
      return;
    }

    // Validasi untuk video URL
    if (formData.type === "video" && uploadMethod === "url" && !formData.thumbnail && !isEditing) {
      toast({
        title: "Thumbnail Belum Diupload",
        description: "Mohon upload thumbnail untuk video",
        variant: "destructive"
      });
      return;
    }

    if (formData.type === "video" && uploadMethod === "url" && !formData.url) {
      toast({
        title: "URL Video Kosong",
        description: "Mohon masukkan URL video",
        variant: "destructive"
      });
      return;
    }

    if (isEditing && currentItem) {
      // PERBAIKAN: Update menggunakan context
      updateItem(currentItem.id, { ...formData, id: currentItem.id });
      
      toast({
        title: "Berhasil Diperbarui! ✅",
        description: `${formData.type === "image" ? "Foto" : "Video"} berhasil diperbarui`
      });
    } else {
      // PERBAIKAN: Add menggunakan context
      const newItem = {
        ...formData,
        id: Date.now().toString(),
        views: 0,
        createdAt: new Date().toISOString()
      };

      addItem(newItem);
      
      toast({
        title: "Berhasil Ditambahkan! ✅",
        description: `${formData.type === "image" ? "Foto" : "Video"} berhasil ditambahkan ke galeri`
      });
    }
    
    setIsDialogOpen(false);
    setIsEditing(false);
    setFormData({
      id: "",
      title: "",
      type: "image",
      date: new Date().toISOString().split('T')[0],
      category: "",
      description: "",
      views: 0,
      thumbnail: "",
      url: "",
      uploadedBy: currentUser?.name || "Administrator",
      createdAt: new Date().toISOString()
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);

    // Validate file size based on type
    const maxSize = formData.type === "video" && uploadMethod === "file" ? 20 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setIsUploading(false);
      toast({
        title: "File Terlalu Besar",
        description: `Ukuran file maksimal ${maxSize / (1024 * 1024)}MB. File Anda: ${(file.size / (1024 * 1024)).toFixed(2)}MB`,
        variant: "destructive"
      });
      return;
    }

    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    
    // Untuk thumbnail video dengan URL method, hanya terima gambar
    if (formData.type === "video" && uploadMethod === "url") {
      if (!validImageTypes.includes(file.type)) {
        setIsUploading(false);
        toast({
          title: "Format Tidak Valid",
          description: "Upload gambar untuk thumbnail: JPG, PNG, GIF, WEBP",
          variant: "destructive"
        });
        return;
      }
    }
    // Untuk image type, hanya terima gambar
    else if (formData.type === "image" && !validImageTypes.includes(file.type)) {
      setIsUploading(false);
      toast({
        title: "Format Tidak Valid",
        description: "Format gambar: JPG, PNG, GIF, WEBP",
        variant: "destructive"
      });
      return;
    }
    // Untuk video dengan file upload, terima video atau gambar (untuk thumbnail)
    else if (formData.type === "video" && uploadMethod === "file") {
      if (!validImageTypes.includes(file.type) && !validVideoTypes.includes(file.type)) {
        setIsUploading(false);
        toast({
          title: "Format Tidak Valid",
          description: "Format: JPG, PNG, GIF, WEBP (thumbnail) atau MP4, WEBM, OGG (video)",
          variant: "destructive"
        });
        return;
      }
    }

    // PERBAIKAN: Gunakan Object URL untuk semua file (tidak lagi base64)
    // Object URL lebih efisien dan tidak menyebabkan QuotaExceededError
    
    if (formData.type === "video" && uploadMethod === "file" && validVideoTypes.includes(file.type)) {
      // Video file - gunakan Object URL
      const videoUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        url: videoUrl,
        thumbnail: "" // Will need separate thumbnail upload
      }));
      setIsUploading(false);
      toast({
        title: "Video Berhasil Diupload! ✅",
        description: "Video berhasil diupload. Upload thumbnail untuk preview yang lebih baik."
      });
    } else {
      // PERBAIKAN: Untuk gambar/thumbnail, gunakan Object URL (bukan base64)
      // Ini mencegah QuotaExceededError karena tidak menyimpan data besar
      try {
        const imageUrl = URL.createObjectURL(file);
        setFormData(prev => ({
          ...prev,
          thumbnail: imageUrl
        }));
        setIsUploading(false);
        toast({
          title: "File Berhasil Diupload! ✅",
          description: `${formData.type === "image" ? "Gambar" : "Thumbnail"} berhasil diupload`
        });
      } catch (error) {
        console.error("Error processing file:", error);
        setIsUploading(false);
        toast({
          title: "Error Upload",
          description: "Gagal memproses file. Silakan coba lagi.",
          variant: "destructive"
        });
      }
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
    const file = files[0];
    
    if (file) {
      const fakeEvent = {
        target: {
          files: [file]
        }
      } as any;
      handleFileChange(fakeEvent);
    }
  };

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory;
    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  const stats = {
    total: galleryItems.length,
    images: galleryItems.filter(item => item.type === "image").length,
    videos: galleryItems.filter(item => item.type === "video").length,
    totalViews: galleryItems.reduce((sum, item) => sum + item.views, 0)
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
                <h1 className="text-2xl font-bold text-primary">Kelola Galeri</h1>
                <p className="text-sm text-muted-foreground">Manajemen foto dan video PEMA UTU</p>
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
        {/* Info untuk admin */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 font-medium mb-1">ℹ️ Informasi Penting</p>
          <p className="text-xs text-blue-700">
            Data galeri disimpan di localStorage browser. File gambar/video menggunakan Object URL yang lebih efisien. 
            Untuk penyimpanan permanen dan file besar, disarankan menggunakan backend API dengan cloud storage.
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Media</p>
                  <p className="text-2xl font-bold text-primary">{stats.total}</p>
                </div>
                <ImageIcon className="h-8 w-8 text-gold/20" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Foto</p>
                  <p className="text-2xl font-bold text-primary">{stats.images}</p>
                </div>
                <ImageIcon className="h-8 w-8 text-blue-500/20" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Video</p>
                  <p className="text-2xl font-bold text-primary">{stats.videos}</p>
                </div>
                <Video className="h-8 w-8 text-red-500/20" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalViews.toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-green-500/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Actions */}
        <Card className="shadow-lg mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-xl">Galeri Media</CardTitle>
              <div className="flex gap-2">
                {galleryItems.length > 0 && (
                  <Button onClick={handleClearAll} variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Kosongkan Semua
                  </Button>
                )}
                <Button onClick={handleAdd} className="bg-gold hover:bg-gold/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Media
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari judul atau deskripsi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Type Filter */}
              <Tabs value={selectedType} onValueChange={(value) => setSelectedType(value as any)}>
                <TabsList>
                  <TabsTrigger value="all">Semua</TabsTrigger>
                  <TabsTrigger value="image">
                    <ImageIcon className="h-4 w-4 mr-1" />
                    Foto
                  </TabsTrigger>
                  <TabsTrigger value="video">
                    <Video className="h-4 w-4 mr-1" />
                    Video
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Semua Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Semua">Semua Kategori</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                {searchTerm || selectedCategory !== "Semua" || selectedType !== "all" 
                  ? "Tidak ada media yang ditemukan" 
                  : "Belum ada media"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedCategory !== "Semua" || selectedType !== "all"
                  ? "Coba ubah filter pencarian"
                  : "Klik tombol Tambah Media untuk memulai"}
              </p>
              {!searchTerm && selectedCategory === "Semua" && selectedType === "all" && (
                <Button onClick={handleAdd} className="bg-gold hover:bg-gold/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Media
                </Button>
              )}
            </div>
          ) : (
            filteredItems.map((item) => (
              <Card key={item.id} className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
                <div className="relative">
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                        {item.type === "image" ? (
                          <ImageIcon className="h-16 w-16 text-gray-400" />
                        ) : (
                          <Video className="h-16 w-16 text-gray-400" />
                        )}
                      </div>
                    )}
                    {/* Type Badge */}
                    <div className="absolute top-2 left-2">
                      <Badge className={item.type === "image" ? "bg-blue-600" : "bg-red-600"}>
                        {item.type === "image" ? (
                          <><ImageIcon className="h-3 w-3 mr-1" /> Foto</>
                        ) : (
                          <><Video className="h-3 w-3 mr-1" /> Video</>
                        )}
                      </Badge>
                    </div>
                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(item);
                        }}
                        className="bg-white/90 hover:bg-white"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <h3 className="font-semibold text-primary line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(item.date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {item.views}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Add Media Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Media" : "Tambah Media Baru"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Perbarui informasi media" : "Upload foto atau video untuk galeri PEMA UTU"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              {/* Type Selection */}
              <div className="space-y-2">
                <Label>Tipe Media *</Label>
                <Tabs value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as "image" | "video" }))}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="image">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Foto
                    </TabsTrigger>
                    <TabsTrigger value="video">
                      <Video className="h-4 w-4 mr-2" />
                      Video
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Upload Method for Video */}
              {formData.type === "video" && (
                <div className="space-y-2">
                  <Label>Metode Upload Video *</Label>
                  <Tabs value={uploadMethod} onValueChange={(value) => setUploadMethod(value as "file" | "url")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="file">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload File
                      </TabsTrigger>
                      <TabsTrigger value="url">
                        <LinkIcon className="h-4 w-4 mr-2" />
                        URL Video
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              )}

              {/* File Upload */}
              {uploadMethod === "file" && (
                <div className="space-y-4">
                  {formData.type === "video" ? (
                    // Video file upload dengan warning
                    <>
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800 font-medium mb-2">⚠️ Perhatian Upload Video File</p>
                        <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
                          <li>Video disimpan di localStorage browser (persisten)</li>
                          <li>Untuk video besar, gunakan metode "URL Video" (YouTube/Vimeo)</li>
                          <li>Max file size: 20MB</li>
                          <li>Untuk file lebih besar, gunakan backend API dengan cloud storage</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="videoFile">Upload Video File *</Label>
                        <div 
                          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors"
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                        >
                          <input
                            type="file"
                            id="videoFile"
                            accept="video/mp4,video/webm,video/ogg"
                            onChange={handleFileChange}
                            className="sr-only"
                          />
                          <label 
                            htmlFor="videoFile" 
                            className="cursor-pointer flex flex-col items-center space-y-2 w-full h-full"
                          >
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                              <Video className="w-6 h-6 text-gray-400" />
                            </div>
                            <div className="text-sm text-center">
                              <span className="font-medium text-primary">Klik untuk upload video</span>
                              <p className="text-gray-500">atau drag & drop file di sini</p>
                            </div>
                          </label>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          🎥 Format: MP4, WEBM, OGG | Maksimal: 20MB
                        </p>
                        
                        {/* Video Preview */}
                        {formData.url && (
                          <div className="mt-2 p-3 border rounded-lg bg-gray-50">
                            <div className="space-y-2">
                              <video 
                                src={formData.url} 
                                controls 
                                className="w-full rounded-lg max-h-48"
                              />
                              <div className="flex items-center justify-between">
                                <p className="text-sm text-green-600 font-medium">
                                  ✅ Video berhasil diupload
                                </p>
                                <button
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, url: "", thumbnail: "" }))}
                                  className="text-xs text-red-600 hover:underline"
                                >
                                  🗑️ Hapus video
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Thumbnail for video */}
                      <div className="space-y-2">
                        <Label htmlFor="videoThumbnail">Upload Thumbnail (Opsional)</Label>
                        <div 
                          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors"
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                        >
                          <input
                            type="file"
                            id="videoThumbnail"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="sr-only"
                          />
                          <label 
                            htmlFor="videoThumbnail" 
                            className="cursor-pointer flex flex-col items-center space-y-2 w-full h-full"
                          >
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-gray-400" />
                            </div>
                            <div className="text-sm text-center">
                              <span className="font-medium text-primary">Klik untuk upload thumbnail</span>
                              <p className="text-gray-500">atau gunakan auto-thumbnail dari video</p>
                            </div>
                          </label>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          📷 Format: JPG, PNG, GIF, WEBP | Maksimal: 5MB
                        </p>
                        
                        {/* Thumbnail Preview */}
                        {formData.thumbnail && (
                          <div className="mt-2 p-3 border rounded-lg bg-gray-50">
                            <div className="flex items-center space-x-3">
                              <img
                                src={formData.thumbnail}
                                alt="Thumbnail"
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <p className="text-sm text-green-600 font-medium">
                                  ✅ Thumbnail berhasil diupload
                                </p>
                                <button
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, thumbnail: "" }))}
                                  className="text-xs text-red-600 hover:underline mt-1"
                                >
                                  🗑️ Hapus thumbnail
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    // Image upload (original)
                    <div className="space-y-2">
                      <Label htmlFor="file">Upload Foto *</Label>
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          id="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                        <label 
                          htmlFor="file" 
                          className="cursor-pointer flex flex-col items-center space-y-2 w-full h-full"
                        >
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                          </div>
                          <div className="text-sm text-center">
                            <span className="font-medium text-primary">Klik untuk upload</span>
                            <p className="text-gray-500">atau drag & drop file di sini</p>
                          </div>
                        </label>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        📷 Format: JPG, PNG, GIF, WEBP | Maksimal: 5MB
                      </p>
                      
                      {/* Loading State */}
                      {isUploading && (
                        <div className="mt-2 p-4 border rounded-lg bg-blue-50 flex items-center space-x-3">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                          <p className="text-sm text-primary font-medium">Mengupload file...</p>
                        </div>
                      )}
                      
                      {/* Preview */}
                      {!isUploading && formData.thumbnail && (
                        <div className="mt-2 p-3 border rounded-lg bg-gray-50">
                          <div className="flex items-center space-x-3">
                            <img
                              src={formData.thumbnail}
                              alt="Preview"
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <p className="text-sm text-green-600 font-medium">
                                ✅ File berhasil diupload
                              </p>
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, thumbnail: "" }))}
                                className="text-xs text-red-600 hover:underline mt-1"
                              >
                                🗑️ Hapus file
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Video URL */}
              {uploadMethod === "url" && formData.type === "video" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="url">URL Video (YouTube, Vimeo, dll) *</Label>
                    <Input
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleChange}
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                    <p className="text-xs text-muted-foreground">
                      💡 Paste URL video dari YouTube, Vimeo, atau platform lainnya
                    </p>
                  </div>

                  {/* Thumbnail Upload for Video URL */}
                  <div className="space-y-2">
                    <Label htmlFor="videoThumbnail">Upload Thumbnail Video *</Label>
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        id="videoThumbnailUrl"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                      <label 
                        htmlFor="videoThumbnailUrl" 
                        className="cursor-pointer flex flex-col items-center space-y-2 w-full h-full"
                      >
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="text-sm text-center">
                          <span className="font-medium text-primary">Klik untuk upload thumbnail</span>
                          <p className="text-gray-500">atau drag & drop gambar di sini</p>
                        </div>
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      📷 Upload gambar thumbnail untuk preview video (JPG, PNG, max 5MB)
                    </p>
                    
                    {/* Preview */}
                    {formData.thumbnail && (
                      <div className="mt-2 p-3 border rounded-lg bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <img
                            src={formData.thumbnail}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="text-sm text-green-600 font-medium">
                              ✅ Thumbnail berhasil diupload
                            </p>
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, thumbnail: "" }))}
                              className="text-xs text-red-600 hover:underline mt-1"
                            >
                              🗑️ Hapus thumbnail
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Judul *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Masukkan judul media"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Kategori *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({...prev, category: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tulis deskripsi singkat..."
                  rows={3}
                  required
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date">Tanggal *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setIsDialogOpen(false);
                setIsEditing(false);
              }}>
                Batal
              </Button>
              <Button type="submit" className="bg-gold hover:bg-gold/90">
                {isEditing ? "Perbarui Media" : "Tambah ke Galeri"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <Trash2 className="h-5 w-5 mr-2" />
              Konfirmasi Hapus
            </DialogTitle>
            <DialogDescription>
              <div className="space-y-3 pt-4">
                <p>
                  Apakah Anda yakin ingin menghapus <strong>{currentItem?.title}</strong>?
                </p>
                <p className="text-sm text-muted-foreground">
                  Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Hapus Media
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
