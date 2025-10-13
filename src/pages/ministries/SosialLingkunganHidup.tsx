import MinistryPage from "../MinistryPage";

export default function SosialLingkunganHidup() {
  return (
    <MinistryPage
      ministryKey="sosial"
      ministryName="Kementerian Sosial dan Lingkungan Hidup"
      description="Mengembangkan kepedulian sosial dan pelestarian lingkungan hidup"
      vision="Mewujudkan mahasiswa yang peduli sosial dan lingkungan berkelanjutan"
      mission={[
        "Menyelenggarakan kegiatan pengabdian masyarakat",
        "Melakukan kampanye pelestarian lingkungan",
        "Memfasilitasi kegiatan sosial kemasyarakatan",
        "Mengadakan program penghijauan",
        "Memberikan bantuan kepada masyarakat kurang mampu"
      ]}
      programs={[
        "Bakti Sosial ke Desa/Panti Asuhan",
        "Kampanye Zero Waste",
        "Program Penghijauan Kampus",
        "Gerakan Bersih-Bersih Lingkungan",
        "Edukasi Sampah dan Daur Ulang",
        "Bantuan Korban Bencana",
        "Green Campus Movement",
        "Penanaman Pohon"
      ]}
    />
  );
}
