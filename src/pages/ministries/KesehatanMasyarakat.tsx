import MinistryPage from "../MinistryPage";

export default function KesehatanMasyarakat() {
  return (
    <MinistryPage
      ministryKey="kesehatan"
      ministryName="Kementerian Kesehatan Masyarakat"
      description="Meningkatkan kesadaran dan kualitas kesehatan mahasiswa dan masyarakat"
      vision="Mewujudkan komunitas kampus yang sehat dan peduli kesehatan masyarakat"
      mission={[
        "Menyelenggarakan program promosi kesehatan",
        "Memfasilitasi layanan kesehatan mahasiswa",
        "Mengadakan penyuluhan kesehatan",
        "Melakukan kegiatan donor darah",
        "Memberikan edukasi gaya hidup sehat"
      ]}
      programs={[
        "Medical Check-up Gratis",
        "Donor Darah Rutin",
        "Seminar Kesehatan Mental",
        "Kampanye Hidup Sehat",
        "First Aid Training",
        "Penyuluhan Gizi dan Nutrisi",
        "Healthy Food Campaign",
        "Mental Health Counseling"
      ]}
    />
  );
}
