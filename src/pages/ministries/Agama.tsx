import MinistryPage from "../MinistryPage";

export default function Agama() {
  return (
    <MinistryPage
      ministryKey="agama"
      ministryName="Kementerian Agama"
      description="Membina kehidupan beragama dan spiritual mahasiswa"
      vision="Mewujudkan mahasiswa yang religius, toleran, dan berakhlak mulia"
      mission={[
        "Menyelenggarakan kegiatan keagamaan rutin",
        "Memfasilitasi kajian dan diskusi keagamaan",
        "Memperkuat nilai-nilai toleransi antar umat beragama",
        "Membina akhlak dan moral mahasiswa",
        "Mengadakan pelatihan keagamaan"
      ]}
      programs={[
        "Kajian Rutin Keagamaan",
        "Pesantren Ramadhan",
        "Peringatan Hari Besar Keagamaan",
        "Bakti Sosial Keagamaan",
        "Pelatihan Dai dan Pendakwah",
        "Dialog Lintas Agama",
        "Mentoring Spiritual",
        "Qurban dan Zakat Kampus"
      ]}
    />
  );
}
