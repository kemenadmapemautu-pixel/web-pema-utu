import MinistryPage from "../MinistryPage";

export default function PemberdayaanPerempuan() {
  return (
    <MinistryPage
      ministryKey="perempuan"
      ministryName="Kementerian Pemberdayaan dan Perlindungan Perempuan"
      description="Memberdayakan dan melindungi hak-hak perempuan di lingkungan kampus"
      vision="Menciptakan lingkungan kampus yang ramah, aman, dan memberdayakan perempuan"
      mission={[
        "Meningkatkan kesadaran kesetaraan gender di kampus",
        "Memberikan perlindungan dan advokasi untuk perempuan",
        "Mengadakan pelatihan pemberdayaan perempuan",
        "Mencegah dan menangani kekerasan berbasis gender",
        "Memfasilitasi pengembangan potensi perempuan"
      ]}
      programs={[
        "Women Leadership Workshop",
        "Kampanye Anti Kekerasan Seksual",
        "Self Defense Training",
        "Female Mentorship Program",
        "Seminar Kesetaraan Gender",
        "Women Safe Space",
        "Entrepreneurship untuk Perempuan"
      ]}
    />
  );
}
