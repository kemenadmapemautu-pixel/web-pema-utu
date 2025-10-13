import MinistryPage from "../MinistryPage";

export default function EkonomiKreatif() {
  return (
    <MinistryPage
      ministryKey="ekonomi"
      ministryName="Kementerian Ekonomi Kreatif"
      description="Mengembangkan jiwa kewirausahaan dan ekonomi kreatif mahasiswa"
      vision="Mencetak mahasiswa yang memiliki jiwa entrepreneur dan inovatif"
      mission={[
        "Memfasilitasi pengembangan usaha mahasiswa",
        "Mengadakan pelatihan kewirausahaan",
        "Menyelenggarakan bazar dan pameran produk mahasiswa",
        "Memberikan mentoring bisnis",
        "Membangun ekosistem startup kampus"
      ]}
      programs={[
        "Entrepreneurship Bootcamp",
        "Business Plan Competition",
        "Bazar UMKM Mahasiswa",
        "Digital Marketing Workshop",
        "Startup Incubator",
        "Mentoring Bisnis",
        "Expo Produk Kreatif",
        "Investment & Funding Workshop"
      ]}
    />
  );
}
