import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Search,
  LogOut,
  Mail,
  Eye,
  Trash2,
  MessageSquare,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: "unread" | "read" | "replied";
}

export default function MessagesManagement() {
  const [messagesList, setMessagesList] = useState<ContactMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Semua");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<ContactMessage | null>(null);

  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load messages from localStorage
  useEffect(() => {
    const loadMessages = () => {
      const savedMessages = localStorage.getItem("contactMessages");
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages);
          setMessagesList(parsedMessages);
        } catch (error) {
          console.error("Error parsing messages:", error);
          setMessagesList([]);
        }
      } else {
        setMessagesList([]);
      }
    };

    loadMessages();
    
    // Listen for new messages
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "contactMessages") {
        loadMessages();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsDetailOpen(true);
    
    // Mark as read if unread
    if (message.status === "unread") {
      markAsRead(message.id);
    }
  };

  const markAsRead = (messageId: string) => {
    const updatedMessages = messagesList.map(msg => 
      msg.id === messageId ? { ...msg, status: "read" as const } : msg
    );
    setMessagesList(updatedMessages);
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
  };

  const markAsReplied = (messageId: string) => {
    const updatedMessages = messagesList.map(msg => 
      msg.id === messageId ? { ...msg, status: "replied" as const } : msg
    );
    setMessagesList(updatedMessages);
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
    
    toast({
      title: "Status Diperbarui",
      description: "Pesan telah ditandai sebagai sudah dibalas"
    });
  };

  const handleDeleteMessage = (message: ContactMessage) => {
    setMessageToDelete(message);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (messageToDelete) {
      const updatedMessages = messagesList.filter(msg => msg.id !== messageToDelete.id);
      setMessagesList(updatedMessages);
      localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
      
      toast({
        title: "Pesan Dihapus",
        description: "Pesan telah berhasil dihapus"
      });
      
      setIsDeleteDialogOpen(false);
      setMessageToDelete(null);
    }
  };

  const handleReplyViaEmail = (message: ContactMessage) => {
    const subject = `Re: ${message.subject}`;
    const body = `Halo ${message.name},\n\nTerima kasih atas pesan Anda.\n\n---\nPesan asli:\n${message.message}`;
    const mailtoUrl = `mailto:${message.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
    
    // Mark as replied
    markAsReplied(message.id);
  };

  const handleReplyViaWhatsApp = (message: ContactMessage) => {
    const phoneNumber = "6281234567890"; // Nomor WhatsApp admin
    const whatsappMessage = `Halo ${message.name}, terima kasih atas pesan Anda mengenai "${message.subject}". `;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    // Mark as replied
    markAsReplied(message.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return <Badge variant="destructive" className="text-xs"><AlertCircle className="h-3 w-3 mr-1" />Belum Dibaca</Badge>;
      case "read":
        return <Badge variant="secondary" className="text-xs"><Clock className="h-3 w-3 mr-1" />Sudah Dibaca</Badge>;
      case "replied":
        return <Badge variant="default" className="text-xs bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Sudah Dibalas</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Unknown</Badge>;
    }
  };

  const filteredMessages = messagesList.filter(message => {
    const matchesStatus = selectedStatus === "Semua" || message.status === selectedStatus.toLowerCase();
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const unreadCount = messagesList.filter(msg => msg.status === "unread").length;

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
                <h1 className="text-2xl font-bold text-primary">Kelola Pesan</h1>
                <p className="text-sm text-muted-foreground">Manajemen pesan kontak dari website</p>
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
                  <MessageSquare className="h-6 w-6 mr-2 text-gold" />
                  Daftar Pesan
                </div>
                <div className="flex items-center space-x-2 text-sm font-normal text-muted-foreground">
                  <span>Total: {messagesList.length}</span>
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {unreadCount} Belum Dibaca
                    </Badge>
                  )}
                </div>
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Semua">Semua Status</SelectItem>
                    <SelectItem value="unread">Belum Dibaca</SelectItem>
                    <SelectItem value="read">Sudah Dibaca</SelectItem>
                    <SelectItem value="replied">Sudah Dibalas</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari pesan..."
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
                    <TableHead>Pengirim</TableHead>
                    <TableHead>Subjek</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        {messagesList.length === 0 ? "Belum ada pesan masuk" : "Tidak ada pesan ditemukan"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMessages.map((message) => (
                      <TableRow key={message.id} className={message.status === "unread" ? "bg-blue-50/50" : ""}>
                        <TableCell className="font-medium">
                          <div>
                            <p className="font-semibold">{message.name}</p>
                            <p className="text-xs text-muted-foreground">{message.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="truncate font-medium">{message.subject}</p>
                          <p className="text-xs text-muted-foreground truncate">{message.message}</p>
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDate(message.date)}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(message.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewMessage(message)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteMessage(message)}
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

      {/* Message Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Detail Pesan</span>
              {selectedMessage && getStatusBadge(selectedMessage.status)}
            </DialogTitle>
            <DialogDescription>
              Pesan dari {selectedMessage?.name} • {selectedMessage && formatDate(selectedMessage.date)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nama</label>
                  <p className="font-semibold">{selectedMessage.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="font-semibold">{selectedMessage.email}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Subjek</label>
                <p className="font-semibold">{selectedMessage.subject}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Pesan</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                  <p className="whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                onClick={() => selectedMessage && handleReplyViaEmail(selectedMessage)}
                className="flex-1"
              >
                <Mail className="h-4 w-4 mr-2" />
                Balas via Email
              </Button>
              <Button
                variant="outline"
                onClick={() => selectedMessage && handleReplyViaWhatsApp(selectedMessage)}
                className="flex-1 text-green-600 border-green-600 hover:bg-green-50"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Balas via WhatsApp
              </Button>
            </div>
            <Button variant="ghost" onClick={() => setIsDetailOpen(false)} className="w-full sm:w-auto">
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus pesan dari <strong>"{messageToDelete?.name}"</strong>? 
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
