// Data kementerian untuk navigasi dan referensi
export interface MinistryInfo {
  id: string;
  name: string;
  shortName: string;
  url: string;
  description: string;
  icon: string; // emoji icon
}

export const MINISTRIES: MinistryInfo[] = [
  {
    id: "advokasi",
    name: "Kementerian Advokasi dan Hak Mahasiswa",
    shortName: "Advokasi & Hak Mahasiswa",
    url: "/ministry/advokasi-hak-mahasiswa",
    description: "Memperjuangkan hak-hak mahasiswa dan memberikan advokasi",
    icon: "⚖️"
  },
  {
    id: "komunikasi",
    name: "Kementerian Komunikasi dan Informasi",
    shortName: "Komunikasi & Informasi",
    url: "/ministry/komunikasi-informasi",
    description: "Mengelola komunikasi dan penyebaran informasi organisasi",
    icon: "📢"
  },
  {
    id: "perempuan",
    name: "Kementerian Pemberdayaan dan Perlindungan Perempuan",
    shortName: "Pemberdayaan Perempuan",
    url: "/ministry/pemberdayaan-perempuan",
    description: "Memberdayakan dan melindungi hak-hak perempuan",
    icon: "👩"
  },
  {
    id: "agama",
    name: "Kementerian Agama",
    shortName: "Agama",
    url: "/ministry/agama",
    description: "Membina kehidupan beragama dan spiritual mahasiswa",
    icon: "🕌"
  },
  {
    id: "hubungan",
    name: "Kementerian Hubungan Internal dan Eksternal",
    shortName: "Hubungan Internal & Eksternal",
    url: "/ministry/hubungan-internal-eksternal",
    description: "Menjalin hubungan internal dan eksternal organisasi",
    icon: "🤝"
  },
  {
    id: "sdm",
    name: "Kementerian Pengembangan SDM",
    shortName: "Pengembangan SDM",
    url: "/ministry/pengembangan-sdm",
    description: "Mengembangkan kompetensi dan kualitas mahasiswa",
    icon: "🎓"
  },
  {
    id: "pemuda",
    name: "Kementerian Pemuda dan Olahraga",
    shortName: "Pemuda & Olahraga",
    url: "/ministry/pemuda-olahraga",
    description: "Mengembangkan potensi pemuda melalui olahraga",
    icon: "⚽"
  },
  {
    id: "pariwisata",
    name: "Kementerian Pariwisata dan Seni Budaya",
    shortName: "Pariwisata & Seni Budaya",
    url: "/ministry/pariwisata-seni-budaya",
    description: "Melestarikan seni budaya dan mempromosikan pariwisata",
    icon: "🎭"
  },
  {
    id: "pendidikan",
    name: "Kementerian Pendidikan dan Akademik",
    shortName: "Pendidikan & Akademik",
    url: "/ministry/pendidikan-akademik",
    description: "Meningkatkan kualitas pendidikan dan prestasi akademik",
    icon: "📚"
  },
  {
    id: "kesehatan",
    name: "Kementerian Kesehatan Masyarakat",
    shortName: "Kesehatan Masyarakat",
    url: "/ministry/kesehatan-masyarakat",
    description: "Meningkatkan kesadaran dan kualitas kesehatan",
    icon: "🏥"
  },
  {
    id: "sosial",
    name: "Kementerian Sosial dan Lingkungan Hidup",
    shortName: "Sosial & Lingkungan Hidup",
    url: "/ministry/sosial-lingkungan-hidup",
    description: "Mengembangkan kepedulian sosial dan lingkungan",
    icon: "🌱"
  },
  {
    id: "ekonomi",
    name: "Kementerian Ekonomi Kreatif",
    shortName: "Ekonomi Kreatif",
    url: "/ministry/ekonomi-kreatif",
    description: "Mengembangkan jiwa kewirausahaan mahasiswa",
    icon: "💼"
  }
];

// Helper function untuk mendapatkan ministry berdasarkan ID
export const getMinistryById = (id: string): MinistryInfo | undefined => {
  return MINISTRIES.find(m => m.id === id);
};

// Helper function untuk mendapatkan ministry berdasarkan nama
export const getMinistryByName = (name: string): MinistryInfo | undefined => {
  return MINISTRIES.find(m => 
    m.name.toLowerCase().includes(name.toLowerCase()) ||
    m.shortName.toLowerCase().includes(name.toLowerCase())
  );
};
