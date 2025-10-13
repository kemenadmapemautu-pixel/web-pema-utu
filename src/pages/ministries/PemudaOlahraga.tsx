import MinistryPage from "../MinistryPage";

export default function PemudaOlahraga() {
  return (
    <MinistryPage
      ministryKey="pemuda"
      ministryName="Kementerian Pemuda dan Olahraga"
      description="Mengembangkan potensi pemuda melalui kegiatan olahraga dan kepemudaan"
      vision="Mewujudkan mahasiswa yang sehat, aktif, dan berprestasi di bidang olahraga"
      mission={[
        "Menyelenggarakan turnamen dan kompetisi olahraga",
        "Memfasilitasi kegiatan olahraga rutin",
        "Membina atlet dan tim olahraga kampus",
        "Mengadakan penyuluhan kesehatan dan olahraga",
        "Membangun kultur hidup sehat"
      ]}
      programs={[
        "Turnamen Futsal Antar Fakultas",
        "Badminton Championship",
        "Basketball League",
        "Senam Pagi Bersama",
        "Fun Run/Marathon",
        "Healthy Lifestyle Campaign",
        "Sport Clinic",
        "E-Sport Tournament"
      ]}
    />
  );
}
