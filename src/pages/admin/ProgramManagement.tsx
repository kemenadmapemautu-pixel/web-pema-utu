import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Search,
  BookOpen
} from "lucide-react";

interface Program {
  id: string;
  nama: string;
  deskripsi: string;
  status: "sudah_terlaksana" | "belum_terlaksana" | "sedang_berjalan";
  createdAt: string;
  publishedDate: string;
  publishedBy: string;
}

export default function ProgramManagement() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    status: "belum_terlaksana" as Program["status"],
    publishedDate: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
    publishedBy: "Administrator"
  });

  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadPrograms();
  }, []);

  // Migrate existing programs to add new fields
  const migratePrograms = (programs: Program[]) => {
    return programs.map(program => {
      // Smart migration - preserve existing dates, only add missing fields
      const publishedDate = program.publishedDate || new Date().toISOString().split('T')[0];
      const publishedBy = program.publishedBy || "Administrator";

      const migrated = {
        ...program,
        publishedDate,
        publishedBy
      };

      // Log each migration for debugging
      if (!program.publishedDate || !program.publishedBy) {
        console.log("Migrating program:", program.id, "from:", program, "to:", migrated);
      }

      return migrated;
    });
  };

  const loadPrograms = () => {
    const savedPrograms = localStorage.getItem("programsList");
    if (savedPrograms) {
      const parsedPrograms = JSON.parse(savedPrograms);
      console.log("Programs data before migration:", parsedPrograms);

      const migratedPrograms = migratePrograms(parsedPrograms);
      console.log("Programs data after migration:", migratedPrograms);

      setPrograms(migratedPrograms);

      // Save migrated data back to localStorage
      localStorage.setItem("programsList", JSON.stringify(migratedPrograms));
    }
  };

  // Force refresh function for debugging
  const forceRefreshData = () => {
    const savedPrograms = localStorage.getItem("programsList");
    if (savedPrograms) {
      const parsedPrograms = JSON.parse(savedPrograms);

      // Smart migration - preserve existing dates, only add missing fields
      const smartMigratedPrograms = parsedPrograms.map((program: Program) => {
        // For force refresh, use current date for missing fields but preserve existing ones
        const publishedDate = program.publishedDate || new Date().toISOString().split('T')[0];
        const publishedBy = program.publishedBy || "Administrator";

        return {
          ...program,
          publishedDate,
          publishedBy
        };
      });

      console.log("Force migrated programs:", smartMigratedPrograms);
      setPrograms(smartMigratedPrograms);

      // Save smart migrated data back to localStorage
      localStorage.setItem("programsList", JSON.stringify(smartMigratedPrograms));

      toast({
        title: "Data Direset",
        description: "Tanggal yang sudah ada dipertahankan, field kosong diisi default"
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      deskripsi: "",
      status: "belum_terlaksana",
      publishedDate: new Date().toISOString().split('T')[0],
      publishedBy: "Administrator"
    });
    setCurrentProgram(null);
  };

  // Event handlers sederhana untuk mencegah masalah focus
  const handleNamaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, nama: e.target.value }));
  };

  const handleDeskripsiChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, deskripsi: e.target.value }));
  };

  const handleStatusChange = (value: Program["status"]) => {
    setFormData(prev => ({ ...prev, status: value }));
  };

  const handlePublishedDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, publishedDate: e.target.value }));
  };

  const handlePublishedByChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, publishedBy: e.target.value }));
  };

  const handleAdd = () => {
    resetForm();
    setIsAddDialogOpen(true);
  };

  const handleEdit = (program: Program) => {
    setCurrentProgram(program);
    setFormData({
      nama: program.nama,
      deskripsi: program.deskripsi,
      status: program.status,
      publishedDate: program.publishedDate || new Date().toISOString().split('T')[0],
      publishedBy: program.publishedBy || "Administrator"
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus program ini?")) {
      const updatedPrograms = programs.filter(p => p.id !== id);
      setPrograms(updatedPrograms);
      localStorage.setItem("programsList", JSON.stringify(updatedPrograms));
      
      toast({
        title: "Program Berhasil Dihapus! ✅",
        description: "Program kerja telah dihapus dari sistem"
      });
    }
  };

  const handleSubmit = (isEdit: boolean = false) => {
    // Validasi input
    const trimmedNama = formData.nama?.trim();
    const trimmedDeskripsi = formData.deskripsi?.trim();
    const trimmedPublishedBy = formData.publishedBy?.trim();

    if (!trimmedNama || !trimmedDeskripsi || !formData.publishedDate || !trimmedPublishedBy) {
      toast({
        title: "Form Tidak Lengkap",
        description: "Mohon isi semua field yang diperlukan",
        variant: "destructive"
      });
      return;
    }

    if (trimmedNama.length < 3) {
      toast({
        title: "Nama Program Terlalu Pendek",
        description: "Nama program minimal 3 karakter",
        variant: "destructive"
      });
      return;
    }

    if (trimmedDeskripsi.length < 10) {
      toast({
        title: "Deskripsi Terlalu Pendek",
        description: "Deskripsi program minimal 10 karakter",
        variant: "destructive"
      });
      return;
    }

    let updatedPrograms;

    if (isEdit && currentProgram) {
      // Update existing program
      updatedPrograms = programs.map(p => 
        p.id === currentProgram.id 
          ? { 
              ...p, 
              nama: trimmedNama,
              deskripsi: trimmedDeskripsi,
              status: formData.status,
              publishedDate: formData.publishedDate,
              publishedBy: formData.publishedBy.trim() || "Administrator"
            }
          : p
      );
    } else {
      // Add new program
      const newProgram: Program = {
        id: Date.now().toString(),
        nama: trimmedNama,
        deskripsi: trimmedDeskripsi,
        status: formData.status,
        createdAt: new Date().toISOString(),
        publishedDate: formData.publishedDate,
        publishedBy: formData.publishedBy.trim() || "Administrator"
      };
      updatedPrograms = [...programs, newProgram];
    }

    setPrograms(updatedPrograms);
    localStorage.setItem("programsList", JSON.stringify(updatedPrograms));

    toast({
      title: isEdit ? "Program Berhasil Diupdate! ✅" : "Program Berhasil Ditambahkan! ✅",
      description: isEdit ? "Data program kerja telah diperbarui" : "Program kerja baru telah ditambahkan"
    });

    // Reset form dan tutup dialog
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    resetForm();
  };

  const getStatusBadge = (status: Program["status"]) => {
    const variants = {
      sudah_terlaksana: "bg-green-100 text-green-800",
      sedang_berjalan: "bg-blue-100 text-blue-800", 
      belum_terlaksana: "bg-gray-100 text-gray-800"
    };
    
    const labels = {
      sudah_terlaksana: "Sudah Terlaksana",
      sedang_berjalan: "Sedang Berjalan",
      belum_terlaksana: "Belum Terlaksana"
    };
    
    return (
      <Badge className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const filteredPrograms = programs.filter(program =>
    program.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ProgramForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nama">Nama Program *</Label>
          <Input
            id="nama"
            type="text"
            value={formData.nama || ""}
            onChange={handleNamaChange}
            placeholder="Masukkan nama program kerja"
            autoComplete="off"
            maxLength={100}
          />
          <div className="text-xs text-muted-foreground text-right">
            {formData.nama?.length || 0}/100 karakter
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="deskripsi">Ringkasan/Deskripsi *</Label>
          <Textarea
            id="deskripsi"
            value={formData.deskripsi || ""}
            onChange={handleDeskripsiChange}
            placeholder="Jelaskan tujuan dan detail program kerja"
            rows={4}
            maxLength={500}
            className="resize-none"
          />
          <div className="text-xs text-muted-foreground text-right">
            {formData.deskripsi?.length || 0}/500 karakter
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status Program *</Label>
          <Select 
            value={formData.status} 
            onValueChange={handleStatusChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih status program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="belum_terlaksana">Belum Terlaksana</SelectItem>
              <SelectItem value="sedang_berjalan">Sedang Berjalan</SelectItem>
              <SelectItem value="sudah_terlaksana">Sudah Terlaksana</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="publishedDate">Tanggal Publikasi *</Label>
            <Input
              id="publishedDate"
              type="date"
              value={formData.publishedDate || ""}
              onChange={handlePublishedDateChange}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="publishedBy">Diterbitkan Oleh *</Label>
            <Input
              id="publishedBy"
              type="text"
              value={formData.publishedBy || ""}
              onChange={handlePublishedByChange}
              placeholder="Administrator"
              maxLength={50}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button 
            variant="outline" 
            onClick={() => {
              if (isEdit) {
                setIsEditDialogOpen(false);
              } else {
                setIsAddDialogOpen(false);
              }
              resetForm();
            }}
          >
            Batal
          </Button>
          <Button 
            onClick={() => handleSubmit(isEdit)}
            disabled={
              !formData.nama?.trim() || 
              !formData.deskripsi?.trim() || 
              !formData.publishedDate || 
              !formData.publishedBy?.trim()
            }
          >
            {isEdit ? "Update Program" : "Tambah Program"}
          </Button>
        </div>
      </div>
    );
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
                <h1 className="text-2xl font-bold text-primary">Kelola Program Kerja</h1>
                <p className="text-sm text-muted-foreground">Tambah, edit, dan kelola program kerja PEMA UTU</p>
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
        {/* Actions Bar */}
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-xl flex items-center">
                  <BookOpen className="h-6 w-6 mr-2 text-gold" />
                  Program Kerja PEMA UTU
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Total: {programs.length} program
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari program..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={handleAdd}>
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Program
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Tambah Program Kerja Baru</DialogTitle>
                    </DialogHeader>
                    <ProgramForm key="add-form" />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Programs Table */}
        <Card className="shadow-lg">
          <CardContent className="p-0">
            {filteredPrograms.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  {searchTerm ? "Tidak ada program yang ditemukan" : "Belum ada program kerja"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? "Coba kata kunci lain" : "Tambahkan program kerja pertama Anda"}
                </p>
                {!searchTerm && (
                  <Button onClick={handleAdd}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Program Kerja
                  </Button>
                )}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Program</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Publikasi</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrograms.map((program) => (
                    <TableRow key={program.id}>
                      <TableCell className="font-medium">{program.nama}</TableCell>
                      <TableCell className="max-w-xs">
                        <p className="truncate">{program.deskripsi}</p>
                      </TableCell>
                      <TableCell>{getStatusBadge(program.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">
                            {program.publishedBy || "Administrator"}
                          </div>
                          <div className="text-muted-foreground">
                            {program.publishedDate ? 
                              new Date(program.publishedDate).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long', 
                                year: 'numeric'
                              }) : 
                              new Date(program.createdAt).toLocaleDateString('id-ID')
                            }
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(program)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(program.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Program Kerja</DialogTitle>
            </DialogHeader>
            <ProgramForm key={`edit-form-${currentProgram?.id}`} isEdit={true} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
