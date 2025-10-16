import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

type ActivityFormData = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  status: "upcoming" | "ongoing" | "completed";
  organizer: string;
  registrationLink?: string;
};

export default function ActivityForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const { register, handleSubmit, setValue, reset } = useForm<ActivityFormData>();
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "Workshop",
    "Seminar",
    "Kompetisi",
    "Talkshow",
    "Pelatihan",
    "Sosial"
  ];

  useEffect(() => {
    if (id) {
      const activities: ActivityFormData[] = JSON.parse(localStorage.getItem("activities") || "[]");
      const activity = activities.find(a => a.id === id);
      if (activity) {
        (Object.keys(activity) as Array<keyof ActivityFormData>).forEach((key) => {
          setValue(key, activity[key]);
        });
      }
    } else {
      reset({
        organizer: currentUser?.name || "",
        status: "upcoming",
        date: new Date().toISOString().split('T')[0]
      } as ActivityFormData);
    }
  }, [id, setValue, reset, currentUser]);

  const onSubmit = (data: ActivityFormData) => {
    setIsLoading(true);
    try {
      const activities = JSON.parse(localStorage.getItem("activities") || "[]");
      
      if (id) {
        // Update existing
        const updated = activities.map((a: ActivityFormData) => 
          a.id === id ? { ...a, ...data } : a
        );
        localStorage.setItem("activities", JSON.stringify(updated));
      } else {
        // Add new
        const newActivity = { 
          ...data, 
          id: Date.now().toString(),
          organizer: currentUser?.name || ""
        };
        localStorage.setItem("activities", JSON.stringify([...activities, newActivity]));
      }
      
      toast({
        title: "Berhasil",
        description: id ? "Kegiatan diperbarui" : "Kegiatan ditambahkan"
      });
      navigate("/admin/activities");
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan kegiatan",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">
        {id ? "Edit Kegiatan" : "Tambah Kegiatan Baru"}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Kegiatan *</Label>
            <Input
              id="title"
              {...register("title", { required: true })}
              placeholder="Nama kegiatan"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Tanggal *</Label>
            <Input
              id="date"
              type="date"
              {...register("date", { required: true })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Waktu</Label>
            <Input
              id="time"
              {...register("time")}
              placeholder="Contoh: 09:00 - 17:00"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Lokasi *</Label>
            <Input
              id="location"
              {...register("location", { required: true })}
              placeholder="Tempat kegiatan"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select onValueChange={(value) => setValue("category", value)}>
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
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              onValueChange={(value: ActivityFormData["status"]) => setValue("status", value)}
              defaultValue="upcoming"
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">Akan Datang</SelectItem>
                <SelectItem value="ongoing">Berlangsung</SelectItem>
                <SelectItem value="completed">Selesai</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Deskripsi</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Detail kegiatan"
            rows={5}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="registrationLink">Link Pendaftaran (opsional)</Label>
          <Input
            id="registrationLink"
            {...register("registrationLink")}
            placeholder="https://..."
          />
        </div>
        
        <div className="flex justify-end gap-4 pt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/admin/activities")}
          >
            Batal
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </div>
  );
}
