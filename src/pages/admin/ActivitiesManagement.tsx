import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Activity {
  id: string;
  title: string;
  date: string;
  location: string;
  status: "upcoming" | "ongoing" | "completed";
  organizer: string;
}

export default function ActivitiesManagement() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("activities");
    if (saved) {
      try {
        setActivities(JSON.parse(saved));
      } catch (error) {
        console.error("Error parsing activities:", error);
      }
    }
  }, []);

  const handleAdd = () => navigate("/admin/activities/new");
  const handleEdit = (id: string) => navigate(`/admin/activities/edit/${id}`);
  
  const handleDelete = (id: string) => {
    const updated = activities.filter(a => a.id !== id);
    setActivities(updated);
    localStorage.setItem("activities", JSON.stringify(updated));
    toast({
      title: "Berhasil",
      description: "Kegiatan telah dihapus"
    });
  };

  const getStatusBadge = (status: Activity["status"]) => {
    const variants = {
      upcoming: "bg-blue-100 text-blue-800",
      ongoing: "bg-green-100 text-green-800",
      completed: "bg-gray-100 text-gray-800"
    };
    
    const labels = {
      upcoming: "Akan Datang",
      ongoing: "Berlangsung", 
      completed: "Selesai"
    };
    
    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium ${variants[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-gold" />
              Kelola Kegiatan Kementerian
            </CardTitle>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" /> Tambah Kegiatan
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul Kegiatan</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Penyelenggara</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Belum ada kegiatan
                    </TableCell>
                  </TableRow>
                ) : (
                  activities
                    .filter(a => a.organizer === currentUser?.name || currentUser?.role === "admin")
                    .map(activity => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">{activity.title}</TableCell>
                        <TableCell>{new Date(activity.date).toLocaleDateString('id-ID')}</TableCell>
                        <TableCell>{activity.location}</TableCell>
                        <TableCell>{getStatusBadge(activity.status)}</TableCell>
                        <TableCell>{activity.organizer}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(activity.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(activity.id)}
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
  );
}
