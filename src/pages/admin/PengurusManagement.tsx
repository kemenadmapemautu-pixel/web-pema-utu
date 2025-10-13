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
  UserPlus, 
  Pencil, 
  Trash2, 
  Search,
  LogOut,
  Key,
  Eye,
  EyeOff,
  Download
} from "lucide-react";

// List 12 Kementerian
const KEMENTERIAN_LIST = [
  "Kementerian Advokasi dan Hak Mahasiswa",
  "Kementerian Komunikasi dan Informasi",
  "Kementerian Pemberdayaan dan Perlindungan Perempuan",
  "Kementerian Agama",
  "Kementerian Hubungan Internal dan Eksternal",
  "Kementerian Pengembangan SDM",
  "Kementerian Pemuda dan Olahraga",
  "Kementerian Pariwisata dan Seni Budaya",
  "Kementerian Pendidikan dan Akademik",
  "Kementerian Kesehatan Masyarakat",
  "Kementerian Sosial dan Lingkungan Hidup",
  "Kementerian Ekonomi Kreatif"
];

// List 6 Jabatan Pimpinan
const JABATAN_PIMPINAN_LIST = [
  "Presiden Mahasiswa",
  "Wakil Presiden Mahasiswa",
  "Sekretariat Jenderal",
  "Wakil Sekretariat Jenderal",
  "Bendahara Umum",
  "Wakil Bendahara Umum"
];

// List Fakultas dan Program Studi (Data Resmi UTU)
const FAKULTAS_PRODI_MAP: Record<string, string[]> = {
  "Fakultas Pertanian": [
    "Program Studi Agribisnis",
    "Program Studi Agroteknologi",
    "Program Studi Teknologi Hasil Pertanian",
    "Program Studi Peternakan"
  ],
  "Fakultas Ekonomi & Bisnis": [
    "Program Studi Ekonomi Pembangunan",
    "Program Studi Manajemen",
    "Program Studi Akuntansi",
    "Program Studi Bisnis Digital"
  ],
  "Fakultas Ilmu Kesehatan": [
    "Program Studi Kesehatan Masyarakat",
    "Program Studi Gizi",
    "Program Studi Keselamatan dan Kesehatan Kerja"
  ],
  "Fakultas Teknik": [
    "Program Studi Teknik Sipil",
    "Program Studi Teknik Mesin",
    "Program Studi Teknik Industri",
    "Program Studi Teknologi Informasi"
  ],
  "Fakultas Perikanan & Ilmu Kelautan": [
    "Program Studi Perikanan",
    "Program Studi Akuakultur (Budidaya Perairan)",
    "Program Studi Manajemen Sumber Daya Akuatik (Manajemen Sumber Daya Perairan)",
    "Program Studi Ilmu Kelautan"
  ],
  "Fakultas Ilmu Sosial & Ilmu Politik": [
    "Program Studi Ilmu Administrasi Negara",
    "Program Studi Ilmu Komunikasi",
    "Program Studi Sosiologi",
    "Program Studi Ilmu Hukum"
  ]
};

const FAKULTAS_LIST = Object.keys(FAKULTAS_PRODI_MAP);

// Data Initial Pengurus PEMA UTU 2024-2025
const INITIAL_PENGURUS_DATA: Pengurus[] = [
  // PIMPINAN (6 orang)
  {
    id: "pim-001",
    nama: "Putra Rahmat",
    nim: "2105906020152",
    jabatan: "Presiden Mahasiswa",
    tipe: "pimpinan",
    email: "putra.rahmat@student.utu.ac.id",
    telepon: "081234567801",
    fakultas: "Fakultas Ekonomi & Bisnis",
    prodi: "Program Studi Manajemen",
    periode: "2024-2025",
    username: "Pim_putrarahmat_001",
    password: "06020152",
    hasAccount: true,
    profileCompleted: false
  },
  {
    id: "pim-002",
    nama: "Yayas Hariadi",
    nim: "2105905040061",
    jabatan: "Wakil Presiden Mahasiswa",
    tipe: "pimpinan",
    email: "yayas.hariadi@student.utu.ac.id",
    telepon: "081234567802",
    fakultas: "Fakultas Ilmu Sosial & Ilmu Politik",
    prodi: "Program Studi Ilmu Hukum",
    periode: "2024-2025",
    username: "Pim_yayashariadi_002",
    password: "05040061",
    hasAccount: true,
    profileCompleted: false
  },
  {
    id: "pim-003",
    nama: "M.R. Ansharullah",
    nim: "2205903040070",
    jabatan: "Sekretariat Jenderal",
    tipe: "pimpinan",
    email: "mr.ansharullah@student.utu.ac.id",
    telepon: "081234567803",
    fakultas: "Fakultas Teknik",
    prodi: "Program Studi Teknologi Informasi",
    periode: "2024-2025",
    username: "Pim_mransharullah_003",
    password: "03040070",
    hasAccount: true,
    profileCompleted: false
  },
  {
    id: "pim-004",
    nama: "Scherly Susanti",
    nim: "2305905010123",
    jabatan: "Wakil Sekretariat Jenderal",
    tipe: "pimpinan",
    email: "scherly.susanti@student.utu.ac.id",
    telepon: "081234567804",
    fakultas: "Fakultas Ilmu Sosial & Ilmu Politik",
    prodi: "Program Studi Ilmu Administrasi Negara",
    periode: "2024-2025",
    username: "Pim_scherlysusanti_004",
    password: "05010123",
    hasAccount: true,
    profileCompleted: false
  },
  {
    id: "pim-005",
    nama: "Miftahul Ananda",
    nim: "2205902020076",
    jabatan: "Bendahara Umum",
    tipe: "pimpinan",
    email: "miftahul.ananda@student.utu.ac.id",
    telepon: "081234567805",
    fakultas: "Fakultas Ilmu Kesehatan",
    prodi: "Program Studi Gizi",
    periode: "2024-2025",
    username: "Pim_miftahulananda_005",
    password: "02020076",
    hasAccount: true,
    profileCompleted: false
  },
  {
    id: "pim-006",
    nama: "Fuja Hermawati",
    nim: "2205906020099",
    jabatan: "Wakil Bendahara Umum",
    tipe: "pimpinan",
    email: "fuja.hermawati@student.utu.ac.id",
    telepon: "081234567806",
    fakultas: "Fakultas Ekonomi & Bisnis",
    prodi: "Program Studi Manajemen",
    periode: "2024-2025",
    username: "Pim_fujahermawati_006",
    password: "06020099",
    hasAccount: true,
    profileCompleted: false
  },
  // MENTERI (12 orang)
  {
    id: "men-001",
    nama: "M. Khavi Badrian",
    nim: "2305906020069",
    jabatan: "Menteri Advokasi dan Hak Mahasiswa",
    departemen: "Kementerian Advokasi dan Hak Mahasiswa",
    tipe: "menteri",
    email: "khavi.badrian@student.utu.ac.id",
    telepon: "081234567807",
    fakultas: "Fakultas Ekonomi & Bisnis",
    prodi: "Program Studi Manajemen",
    periode: "2024-2025",
    username: "Men_mkhavibadrian_01",
    password: "06020069",
    hasAccount: true,
    profileCompleted: false
  },
  {
    id: "men-002",
    nama: "Riki Saputra",
    nim: "2205905030050",
    jabatan: "Menteri Komunikasi dan Informasi",
    departemen: "Kementerian Komunikasi dan Informasi",
    tipe: "menteri",
    email: "riki.saputra@student.utu.ac.id",
    telepon: "081234567808",
    fakultas: "Fakultas Ilmu Sosial & Ilmu Politik",
    prodi: "Program Studi Ilmu Komunikasi",
    periode: "2024-2025",
    username: "Men_rikisaputra_02",
    password: "05030050",
    hasAccount: true,
    profileCompleted: false
  },
  {
    id: "men-003",
    nama: "Putri Nola Munthe",
    nim: "2205906020084",
    jabatan: "Menteri Pemberdayaan dan Perlindungan Perempuan",
    departemen: "Kementerian Pemberdayaan dan Perlindungan Perempuan",
    tipe: "menteri",
    email: "putri.nola@student.utu.ac.id",
    telepon: "081234567809",
    fakultas: "Fakultas Ekonomi & Bisnis",
    prodi: "Program Studi Manajemen",
    periode: "2024-2025",
    username: "Men_putrinolamunthe_03",
    password: "06020084",
    hasAccount: true,
    profileCompleted: false
  },
  {
    id: "men-004",
    nama: "Ananda Ulil Albab",
    nim: "2205901010079",
    jabatan: "Menteri Agama",
    departemen: "Kementerian Agama",
    tipe: "menteri",
    email: "ananda.ulil@student.utu.ac.id",
    telepon: "081234567810",
    fakultas: "Fakultas Pertanian",
    prodi: "Program Studi Agribisnis",
    periode: "2024-2025",
    username: "Men_anandaulilalbab_04",
    password: "01010079",
    hasAccount: true,
    profileCompleted: false
  },
  {
    id: "men-005",
    nama: "Syahrul Ramazani",
    nim: "2205906030040",
    jabatan: "Menteri Hubungan Internal dan Eksternal",
    departemen: "Kementerian Hubungan Internal dan Eksternal",
    tipe: "menteri",
    email: "syahrul.ramazani@student.utu.ac.id",
    telepon: "081234567811",
    fakultas: "Fakultas Ekonomi & Bisnis",
    prodi: "Program Studi Akuntansi",
    periode: "2024-2025",
    username: "Men_syahrulramazani_05",
    password: "06030040",
    hasAccount: true,
    profileCompleted: false
  },
  {
    id: "men-006",
    nama: "Chairul Amri",
    nim: "2105901010057",
    jabatan: "Menteri Pengembangan SDM",
    departemen: "Kementerian Pengembangan SDM",
    tipe: "menteri",
    email: "chairul.amri@student.utu.ac.id",
    telepon: "081234567812",
    fakultas: "Fakultas Pertanian",
    prodi: "Program Studi Agribisnis",
    periode: "2024-2025",
    username: "Men_chairulamri_06",
    password: "01010057",
    hasAccount: true,
    profileCompleted: false
  },
  {
    id: "men-007",
    nama: "Syahrul Maulidin",
    nim: "2205905010091",
    jabatan: "Menteri Pemuda dan Olahraga",
    departemen: "Kementerian Pemuda dan Olahraga",
    tipe: "menteri",
    email: "syahrul.maulidin@student.utu.ac.id",
    telepon: "081234567813",
    fakultas: "Fakultas Ilmu Sosial & Ilmu Politik",
    prodi: "Program Studi Ilmu Administrasi Negara",
    periode: "2024-2025",
    username: "Men_syahrulmaulidin_07",
    password: "05010091",
    hasAccount: true,
    profileCompleted: false
  },
  {
    id: "men-008",
    nama: "Ihya Ulmuslimah",
    nim: "2205901010011",
    jabatan: "Menteri Pariwisata dan Seni Budaya",
    departemen: "Kementerian Pariwisata dan Seni Budaya",
    tipe: "menteri",
    email: "ihya.ulmuslimah@student.utu.ac.id",
    telepon: "081234567814",
    fakultas: "Fakultas Pertanian",
    prodi: "Program Studi Agribisnis",
    periode: "2024-2025",
    username: "Men_ihyaulmuslimah_08",
    password: "01010011",
    hasAccount: true,
    profileCompleted: false
  },
  {
    id: "men-009",
    nama: "Delfa Zebua",
    nim: "2205905040005",
    jabatan: "Menteri Pendidikan dan Akademik",
    departemen: "Kementerian Pendidikan dan Akademik",
    tipe: "menteri",
    email: "delfa.zebua@student.utu.ac.id",
    telepon: "081234567815",
    fakultas: "Fakultas Ilmu Sosial & Ilmu Politik",
    prodi: "Program Studi Ilmu Hukum",
    periode: "2024-2025",
    username: "Men_delfazebua_09",
    password: "05040005",
    hasAccount: true,
    profileCompleted: false
  },
  {
    id: "men-010",
    nama: "Mutiara Hasnah",
    nim: "2305902010091",
    jabatan: "Menteri Kesehatan Masyarakat",
    departemen: "Kementerian Kesehatan Masyarakat",
    tipe: "menteri",
    email: "mutiara.hasnah@student.utu.ac.id",
    telepon: "081234567816",
    fakultas: "Fakultas Ilmu Kesehatan",
    prodi: "Program Studi Kesehatan Masyarakat",
    periode: "2024-2025",
    username: "Men_mutiarahasnah_10",
    password: "02010091",
    hasAccount: true,
    profileCompleted: false
  },
  {
    id: "men-011",
    nama: "Musrizal",
    nim: "2205903020057",
    jabatan: "Menteri Sosial dan Lingkungan Hidup",
    departemen: "Kementerian Sosial dan Lingkungan Hidup",
    tipe: "menteri",
    email: "musrizal@student.utu.ac.id",
    telepon: "081234567817",
    fakultas: "Fakultas Teknik",
    prodi: "Program Studi Teknik Sipil",
    periode: "2024-2025",
    username: "Men_musrizal_11",
    password: "03020057",
    hasAccount: true,
    profileCompleted: false
  },
  {
    id: "men-012",
    nama: "Deni Sahputra",
    nim: "2205901010045",
    jabatan: "Menteri Ekonomi Kreatif",
    departemen: "Kementerian Ekonomi Kreatif",
    tipe: "menteri",
    email: "deni.sahputra@student.utu.ac.id",
    telepon: "081234567818",
    fakultas: "Fakultas Pertanian",
    prodi: "Program Studi Agribisnis",
    periode: "2024-2025",
    username: "Men_denisahputra_12",
    password: "01010045",
    hasAccount: true,
    profileCompleted: false
  }
];

interface Pengurus {
  id: string;
  nama: string;
  jabatan: string;
  departemen?: string;
  nim?: string; // NIM mahasiswa
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
  const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] = useState(false);
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
    nim: "",
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

  // Function to populate initial data
  // Function to download account card as image
  const downloadAccountCard = (pengurus: Pengurus) => {
    if (!pengurus.hasAccount || !pengurus.username || !pengurus.password) {
      toast({
        title: "Error",
        description: "Pengurus belum memiliki akun login",
        variant: "destructive"
      });
      return;
    }

    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size - larger for better quality
    canvas.width = 1000;
    canvas.height = 600;

    // Reset all transformations and styles
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add decorative circles (lighter)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.arc(850, 100, 180, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(150, 500, 150, 0, Math.PI * 2);
    ctx.fill();

    // Main card with shadow
    const padding = 50;
    const cardX = padding;
    const cardY = padding;
    const cardWidth = canvas.width - (padding * 2);
    const cardHeight = canvas.height - (padding * 2);

    // Shadow for card
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 15;
    
    // Draw rounded rectangle for card
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    const radius = 20;
    ctx.moveTo(cardX + radius, cardY);
    ctx.lineTo(cardX + cardWidth - radius, cardY);
    ctx.quadraticCurveTo(cardX + cardWidth, cardY, cardX + cardWidth, cardY + radius);
    ctx.lineTo(cardX + cardWidth, cardY + cardHeight - radius);
    ctx.quadraticCurveTo(cardX + cardWidth, cardY + cardHeight, cardX + cardWidth - radius, cardY + cardHeight);
    ctx.lineTo(cardX + radius, cardY + cardHeight);
    ctx.quadraticCurveTo(cardX, cardY + cardHeight, cardX, cardY + cardHeight - radius);
    ctx.lineTo(cardX, cardY + radius);
    ctx.quadraticCurveTo(cardX, cardY, cardX + radius, cardY);
    ctx.closePath();
    ctx.fill();

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Header gradient bar
    const headerGradient = ctx.createLinearGradient(cardX, cardY, cardX + cardWidth, cardY);
    headerGradient.addColorStop(0, '#667eea');
    headerGradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = headerGradient;
    ctx.beginPath();
    ctx.moveTo(cardX + radius, cardY);
    ctx.lineTo(cardX + cardWidth - radius, cardY);
    ctx.quadraticCurveTo(cardX + cardWidth, cardY, cardX + cardWidth, cardY + radius);
    ctx.lineTo(cardX + cardWidth, cardY + 120);
    ctx.lineTo(cardX, cardY + 120);
    ctx.lineTo(cardX, cardY + radius);
    ctx.quadraticCurveTo(cardX, cardY, cardX + radius, cardY);
    ctx.closePath();
    ctx.fill();

    // Header text - PEMA UTU
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PEMA UTU', canvas.width / 2, cardY + 55);
    
    ctx.font = '18px Arial, sans-serif';
    ctx.fillText('Kabinet Samgrahita 2024-2025', canvas.width / 2, cardY + 95);

    // Content area
    const contentX = cardX + 60;
    const contentY = cardY + 160;

    // Reset text alignment
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';

    // Profile section - Nama
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 32px Arial, sans-serif';
    ctx.fillText(pengurus.nama, contentX, contentY);

    // Jabatan
    ctx.fillStyle = '#4b5563';
    ctx.font = '20px Arial, sans-serif';
    ctx.fillText(pengurus.jabatan, contentX, contentY + 45);

    // NIM
    if (pengurus.nim) {
      ctx.fillStyle = '#6b7280';
      ctx.font = '18px Arial, sans-serif';
      ctx.fillText(`NIM: ${pengurus.nim}`, contentX, contentY + 80);
    }

    // Divider line
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(contentX, contentY + 110);
    ctx.lineTo(cardX + cardWidth - 60, contentY + 110);
    ctx.stroke();

    // Credentials section
    const credY = contentY + 160;
    const labelWidth = 120;

    // Username box
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(contentX, credY - 30, cardWidth - 120, 50);
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.strokeRect(contentX, credY - 30, cardWidth - 120, 50);

    // Username label
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.fillText('Username:', contentX + 15, credY - 5);

    // Username value
    ctx.fillStyle = '#111827';
    ctx.font = '20px "Courier New", monospace';
    ctx.fillText(pengurus.username || '', contentX + labelWidth + 15, credY - 5);

    // Password box
    ctx.fillStyle = '#fef2f2';
    ctx.fillRect(contentX, credY + 40, cardWidth - 120, 50);
    ctx.strokeStyle = '#fecaca';
    ctx.lineWidth = 1;
    ctx.strokeRect(contentX, credY + 40, cardWidth - 120, 50);

    // Password label
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.fillText('Password:', contentX + 15, credY + 65);

    // Password value
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 22px "Courier New", monospace';
    ctx.fillText(pengurus.password || '', contentX + labelWidth + 15, credY + 65);

    // Footer warning
    ctx.fillStyle = '#9ca3af';
    ctx.font = 'italic 16px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚠️ Simpan kredensial ini dengan aman. Jangan bagikan ke orang lain!', canvas.width / 2, cardY + cardHeight - 30);

    // Download the image
    canvas.toBlob((blob) => {
      if (!blob) return;
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const filename = `Akun_${pengurus.nama.replace(/\s+/g, '_')}_${pengurus.username}.png`;
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "✅ Berhasil!",
        description: `Kartu akun ${pengurus.nama} berhasil diunduh`
      });
    }, 'image/png');
  };

  const populateInitialData = () => {
    // Populate pengurus
    setPengurusList(INITIAL_PENGURUS_DATA);
    localStorage.setItem("pengurusList", JSON.stringify(INITIAL_PENGURUS_DATA));
    
    // Populate accounts (admin + pengurus)
    const accounts = [
      // Admin account
      {
        id: "admin-001",
        username: "adminpemautu",
        password: "Luckystrike26",
        role: "admin",
        name: "Administrator",
        position: "Administrator",
        department: ""
      },
      // Pengurus accounts
      ...INITIAL_PENGURUS_DATA.map(p => ({
        id: p.id,
        username: p.username!,
        password: p.password!,
        role: p.tipe,
        name: p.nama,
        position: p.jabatan,
        department: p.departemen || ""
      }))
    ];
    localStorage.setItem("accounts", JSON.stringify(accounts));
    
    console.log("✅ Populated 18 pengurus + 1 admin account");
    
    toast({
      title: "✅ Data Berhasil Di-populate!",
      description: "18 pengurus (6 pimpinan + 12 menteri) dan 1 admin telah ditambahkan. Semua akun siap login!"
    });
  };

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("pengurusList");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Check if array is empty, if so, populate
      if (parsedData.length === 0) {
        populateInitialData();
      } else {
        setPengurusList(parsedData);
      }
    } else {
      // No data at all, populate
      populateInitialData();
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
    // Auto-generate username & password untuk form baru
    const defaultUsername = "";
    const defaultPassword = ""; // Will be generated from NIM when submitted
    
    setFormData({
      id: "",
      nama: "",
      jabatan: "",
      departemen: "",
      nim: "",
      email: "",
      telepon: "",
      foto: "",
      tipe: "menteri",
      fakultas: "",
      prodi: "",
      deskripsi: "",
      prestasi: [],
      periode: "2024-2025",
      username: defaultUsername,
      password: defaultPassword,
      hasAccount: true,
      profileCompleted: false
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
      localStorage.setItem("pengurusList", JSON.stringify(updatedList));
      
      // Jika punya akun, hapus juga dari sistem login
      if (currentPengurus.hasAccount) {
        removeFromLoginSystem(currentPengurus.id);
      }
      
      toast({
        title: "Berhasil! 🗑️",
        description: "Profil dan akun pengurus telah dihapus"
      });
      setIsDeleteDialogOpen(false);
      setCurrentPengurus(null);
    }
  };

  const handleDeleteAccount = (pengurus: Pengurus) => {
    setCurrentPengurus(pengurus);
    setIsDeleteAccountDialogOpen(true);
  };

  const confirmDeleteAccount = () => {
    if (currentPengurus) {
      // Hapus akun dari sistem login
      removeFromLoginSystem(currentPengurus.id);
      
      // Update pengurus data - hapus credentials
      const updatedList = pengurusList.map(p => {
        if (p.id === currentPengurus.id) {
          return {
            ...p,
            username: undefined,
            password: undefined,
            hasAccount: false,
            profileCompleted: false
          };
        }
        return p;
      });
      
      setPengurusList(updatedList);
      localStorage.setItem("pengurusList", JSON.stringify(updatedList));
      
      toast({
        title: "Akun Berhasil Dihapus! 🗑️",
        description: `Akun login ${currentPengurus.nama} telah dihapus. Profil masih ada di sistem.`
      });
      setIsDeleteAccountDialogOpen(false);
      setCurrentPengurus(null);
    }
  };

  const removeFromLoginSystem = (pengurusId: string) => {
    // Remove from accounts (for login)
    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    const updatedAccounts = accounts.filter((u: any) => u.id !== pengurusId);
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
  };

  // Generate username otomatis
  const generateUsername = (nama: string, tipe: string, departemen?: string) => {
    const cleanName = nama.toLowerCase().replace(/\s+/g, '');
    const prefix = tipe === "pimpinan" ? "Pim" : "Men";
    
    if (tipe === "menteri" && departemen) {
      // Cari nomor urut kementerian (01-12)
      const kemenIndex = KEMENTERIAN_LIST.findIndex(k => k === departemen);
      const nomorUrut = kemenIndex >= 0 ? String(kemenIndex + 1).padStart(2, '0') : '00';
      return `${prefix}_${cleanName}_${nomorUrut}`;
    } else {
      // Untuk pimpinan gunakan timestamp
      const timestamp = Date.now().toString().slice(-3);
      return `${prefix}_${cleanName}_${timestamp}`;
    }
  };

  // Generate password dari NIM (gunakan 8 digit terakhir)
  const generatePassword = (nim?: string) => {
    if (nim && nim.length >= 8) {
      // Ambil 8 digit terakhir dari NIM
      return nim.slice(-8);
    }
    // Fallback: random jika NIM tidak ada
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

  // Sync dengan sistem login (accounts)
  const syncWithLoginSystem = (pengurus: Pengurus) => {
    if (!pengurus.username || !pengurus.password) return;

    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    
    // Cek apakah user sudah ada
    const existingUserIndex = accounts.findIndex((u: any) => u.id === pengurus.id);
    
    const userData = {
      id: pengurus.id,
      username: pengurus.username,
      password: pengurus.password,
      role: pengurus.tipe,
      name: pengurus.nama,
      position: pengurus.jabatan,
      department: pengurus.departemen || ""
    };

    if (existingUserIndex >= 0) {
      accounts[existingUserIndex] = userData;
    } else {
      accounts.push(userData);
    }

    localStorage.setItem("accounts", JSON.stringify(accounts));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-generate credentials untuk pimpinan/menteri jika belum ada
    let finalFormData = { ...formData };
    
    if ((formData.tipe === "pimpinan" || formData.tipe === "menteri") && !formData.username) {
      // Untuk menteri, gunakan departemen untuk nomor urut
      // Untuk pimpinan, gunakan timestamp
      finalFormData.username = generateUsername(
        formData.nama, 
        formData.tipe,
        formData.tipe === "menteri" ? formData.departemen : undefined
      );
      finalFormData.password = generatePassword(formData.nim); // Generate dari NIM
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
      
      // Show success with credentials
      if (newPengurus.username && newPengurus.password) {
        toast({
          title: "✅ Pengurus & Akun Berhasil Dibuat!",
          description: (
            <div className="space-y-2 mt-2">
              <p><strong>{newPengurus.nama}</strong> telah ditambahkan sebagai {newPengurus.tipe}</p>
              <div className="bg-white/50 p-2 rounded border">
                <p className="text-xs font-semibold">Kredensial Login:</p>
                <p className="text-xs">Username: <code className="bg-white px-1">{newPengurus.username}</code></p>
                <p className="text-xs">Password: <code className="bg-white px-1">{newPengurus.password}</code></p>
              </div>
              <p className="text-xs text-yellow-800">⚠️ Catat kredensial ini dan berikan ke {newPengurus.nama}</p>
            </div>
          ),
          duration: 15000 // Show longer so admin can copy
        });
      } else {
        toast({
          title: "Berhasil!",
          description: `Pengurus baru telah ditambahkan`
        });
      }
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
    
    // Auto-generate username saat nama berubah (hanya untuk pengurus baru)
    if (name === 'nama' && value && !currentPengurus) {
      // Untuk menteri, username perlu departemen untuk nomor urut
      // Untuk pimpinan, langsung generate
      if (formData.tipe === 'menteri' && formData.departemen) {
        const newUsername = generateUsername(value, formData.tipe, formData.departemen);
        setFormData(prev => ({
          ...prev,
          username: newUsername
        }));
      } else if (formData.tipe === 'pimpinan') {
        const newUsername = generateUsername(value, formData.tipe);
        setFormData(prev => ({
          ...prev,
          username: newUsername
        }));
      }
    }
    
    // Auto-generate password saat NIM berubah
    if (name === 'nim' && value) {
      const newPassword = generatePassword(value);
      setFormData(prev => ({
        ...prev,
        password: newPassword
      }));
    }
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
                <h1 className="text-2xl font-bold text-primary">Kelola Pengurus & Akun</h1>
                <p className="text-sm text-muted-foreground">Manajemen terpadu data pengurus dan akun kabinet</p>
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
                {pengurusList.length === 0 && (
                  <Button 
                    onClick={populateInitialData} 
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Populate Data Pengurus 2024-2025
                  </Button>
                )}
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
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="flex flex-col items-center gap-4">
                          <div className="text-muted-foreground">
                            <p className="text-lg font-semibold mb-2">📋 Belum ada data pengurus</p>
                            {pengurusList.length === 0 ? (
                              <>
                                <p className="text-sm mb-4">Klik tombol di bawah untuk populate data pengurus PEMA UTU 2024-2025</p>
                                <Button 
                                  onClick={populateInitialData} 
                                  className="bg-purple-600 hover:bg-purple-700"
                                  size="lg"
                                >
                                  <UserPlus className="h-5 w-5 mr-2" />
                                  Populate Data Pengurus 2024-2025
                                </Button>
                                <p className="text-xs mt-3 text-muted-foreground">
                                  (18 pengurus: 6 pimpinan + 12 menteri)
                                </p>
                              </>
                            ) : (
                              <p className="text-sm">Tidak ada pengurus yang sesuai dengan pencarian</p>
                            )}
                          </div>
                        </div>
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
                              title="Edit Data"
                            >
                              <Pencil className="h-4 w-4 text-blue-600" />
                            </Button>
                            {pengurus.hasAccount && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => downloadAccountCard(pengurus)}
                                  title="Download Kartu Akun"
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteAccount(pengurus)}
                                  title="Hapus Akun Login"
                                  className="text-orange-600 hover:text-orange-700"
                                >
                                  <Key className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(pengurus)}
                              title="Hapus Profil & Akun"
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
                  {formData.tipe === "menteri" ? (
                    // Dropdown Kementerian untuk Menteri
                    <Select
                      value={formData.departemen || ""} // Gunakan departemen sebagai value
                      onValueChange={(value) => {
                        // Set jabatan dan departemen sekaligus
                        const namaKementerian = value.replace('Kementerian ', '');
                        // Generate username dengan nomor urut kementerian
                        const newUsername = formData.nama ? generateUsername(formData.nama, "menteri", value) : "";
                        setFormData(prev => ({
                          ...prev,
                          jabatan: `Menteri ${namaKementerian}`,
                          departemen: value,
                          username: newUsername
                        }));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kementerian..." />
                      </SelectTrigger>
                      <SelectContent>
                        {KEMENTERIAN_LIST.map((kementerian) => (
                          <SelectItem key={kementerian} value={kementerian}>
                            {kementerian}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    // Dropdown Jabatan untuk Pimpinan
                    <Select
                      value={formData.jabatan || ""}
                      onValueChange={(value) => {
                        setFormData(prev => ({
                          ...prev,
                          jabatan: value
                        }));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Jabatan Pimpinan..." />
                      </SelectTrigger>
                      <SelectContent>
                        {JABATAN_PIMPINAN_LIST.map((jabatan) => (
                          <SelectItem key={jabatan} value={jabatan}>
                            {jabatan}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  
                  {/* Info & Preview */}
                  {formData.tipe === "menteri" && (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">
                        💡 Pilih kementerian dari dropdown
                      </p>
                      {formData.departemen && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                          <p className="text-xs text-green-700">
                            <span className="font-semibold">Jabatan yang akan dibuat:</span><br/>
                            <code className="bg-white px-1">{formData.jabatan}</code>
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  {formData.tipe === "pimpinan" && (
                    <p className="text-xs text-muted-foreground">
                      💡 Pilih jabatan pimpinan dari dropdown
                    </p>
                  )}
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
                <div className="space-y-2">
                  <Label htmlFor="nim">NIM (Nomor Induk Mahasiswa) *</Label>
                  <Input
                    id="nim"
                    name="nim"
                    value={formData.nim || ""}
                    onChange={handleChange}
                    placeholder="Contoh: 2105906020152"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    💡 Password akan di-generate otomatis dari 8 digit terakhir NIM
                  </p>
                </div>
              </div>

              {/* Form Fields untuk Pimpinan */}
              {formData.tipe === "pimpinan" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fakultas">Fakultas *</Label>
                      <Select
                        value={formData.fakultas || ""}
                        onValueChange={(value) => {
                          setFormData(prev => ({
                            ...prev,
                            fakultas: value,
                            prodi: "" // Reset prodi saat fakultas berubah
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Fakultas..." />
                        </SelectTrigger>
                        <SelectContent>
                          {FAKULTAS_LIST.map((fakultas) => (
                            <SelectItem key={fakultas} value={fakultas}>
                              {fakultas}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        💡 Pilih fakultas terlebih dahulu
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prodi">Program Studi *</Label>
                      <Select
                        value={formData.prodi || ""}
                        onValueChange={(value) => {
                          setFormData(prev => ({
                            ...prev,
                            prodi: value
                          }));
                        }}
                        disabled={!formData.fakultas}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={formData.fakultas ? "Pilih Program Studi..." : "Pilih fakultas dulu"} />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.fakultas && FAKULTAS_PRODI_MAP[formData.fakultas]?.map((prodi) => (
                            <SelectItem key={prodi} value={prodi}>
                              {prodi}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        💡 Prodi akan muncul setelah pilih fakultas
                      </p>
                    </div>
                  </div>
                  
                  {/* CREDENTIALS SECTION - Auto buat akun login untuk Pimpinan */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-semibold text-primary mb-3 flex items-center">
                      <Key className="h-4 w-4 mr-2" />
                      Akun Login (Otomatis Dibuat)
                    </h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">💡 Info:</span> Akun login akan otomatis dibuat untuk pimpinan. 
                        Username di-generate otomatis, password bisa Anda edit.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username *</Label>
                        <Input
                          id="username"
                          name="username"
                          value={formData.username || ""}
                          onChange={handleChange}
                          placeholder="Auto-generate setelah isi nama"
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Username untuk login ke dashboard
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password *</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password || ""}
                            onChange={handleChange}
                            placeholder="Password login"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Password default sudah di-generate, bisa diubah
                        </p>
                      </div>
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
                      <Select
                        value={formData.fakultas || ""}
                        onValueChange={(value) => {
                          setFormData(prev => ({
                            ...prev,
                            fakultas: value,
                            prodi: "" // Reset prodi saat fakultas berubah
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Fakultas..." />
                        </SelectTrigger>
                        <SelectContent>
                          {FAKULTAS_LIST.map((fakultas) => (
                            <SelectItem key={fakultas} value={fakultas}>
                              {fakultas}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        💡 Pilih fakultas terlebih dahulu
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prodi">Program Studi *</Label>
                      <Select
                        value={formData.prodi || ""}
                        onValueChange={(value) => {
                          setFormData(prev => ({
                            ...prev,
                            prodi: value
                          }));
                        }}
                        disabled={!formData.fakultas}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={formData.fakultas ? "Pilih Program Studi..." : "Pilih fakultas dulu"} />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.fakultas && FAKULTAS_PRODI_MAP[formData.fakultas]?.map((prodi) => (
                            <SelectItem key={prodi} value={prodi}>
                              {prodi}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        💡 Prodi akan muncul setelah pilih fakultas
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departemen">Departemen *</Label>
                    <Input
                      id="departemen"
                      name="departemen"
                      value={formData.departemen}
                      readOnly
                      disabled
                      className="bg-gray-50 cursor-not-allowed"
                      placeholder="Otomatis terisi dari pilihan kementerian di atas"
                    />
                    <p className="text-xs text-green-600">
                      ✅ Otomatis terisi saat Anda pilih kementerian di field Jabatan
                    </p>
                  </div>
                  
                  {/* CREDENTIALS SECTION - Auto buat akun login */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-semibold text-primary mb-3 flex items-center">
                      <Key className="h-4 w-4 mr-2" />
                      Akun Login (Otomatis Dibuat)
                    </h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">💡 Info:</span> Akun login akan otomatis dibuat untuk menteri. 
                        Username di-generate otomatis, password bisa Anda edit.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username *</Label>
                        <Input
                          id="username"
                          name="username"
                          value={formData.username || ""}
                          onChange={handleChange}
                          placeholder="Auto-generate setelah isi nama"
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Username untuk login ke dashboard
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password *</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password || ""}
                            onChange={handleChange}
                            placeholder="Password login"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Password default sudah di-generate, bisa diubah
                        </p>
                      </div>
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

      {/* Delete Profile Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <Trash2 className="h-5 w-5 mr-2" />
              Konfirmasi Hapus Profil
            </DialogTitle>
            <DialogDescription>
              <div className="space-y-3 pt-4">
                <p>
                  Apakah Anda yakin ingin menghapus <strong>{currentPengurus?.nama}</strong>?
                </p>
                {currentPengurus?.hasAccount && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-800 font-medium flex items-center">
                      <Key className="h-4 w-4 mr-2" />
                      Peringatan!
                    </p>
                    <p className="text-red-700 text-sm mt-1">
                      Profil ini memiliki akun login. Menghapus profil akan otomatis menghapus akun loginnya juga.
                    </p>
                  </div>
                )}
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
              Hapus Profil {currentPengurus?.hasAccount && "& Akun"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Only Dialog */}
      <Dialog open={isDeleteAccountDialogOpen} onOpenChange={setIsDeleteAccountDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-orange-600">
              <Key className="h-5 w-5 mr-2" />
              Konfirmasi Hapus Akun
            </DialogTitle>
            <DialogDescription>
              <div className="space-y-3 pt-4">
                <p>
                  Apakah Anda yakin ingin menghapus akun login <strong>{currentPengurus?.nama}</strong>?
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-800 text-sm">
                    ℹ️ Hanya akun login yang akan dihapus. Profil pengurus akan tetap ada di sistem.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteAccountDialogOpen(false)}>
              Batal
            </Button>
            <Button 
              className="bg-orange-600 hover:bg-orange-700"
              onClick={confirmDeleteAccount}
            >
              <Key className="h-4 w-4 mr-2" />
              Hapus Akun
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
