import MinistryPage from "../MinistryPage";

export default function KomunikasiInformasi() {
  return (
    <MinistryPage
      ministryKey="komunikasi"
      ministryName="Kementerian Komunikasi dan Informasi"
      description="Mengelola komunikasi dan penyebaran informasi organisasi kepada mahasiswa"
      vision="Menjadi pusat informasi dan komunikasi yang efektif, transparan, dan inovatif"
      mission={[
        "Mengelola media komunikasi dan informasi organisasi",
        "Membangun citra positif PEMA UTU di internal dan eksternal",
        "Mendokumentasikan setiap kegiatan organisasi",
        "Mengelola media sosial dan website resmi",
        "Menyebarkan informasi kegiatan dan program kerja"
      ]}
      programs={[
        "Media Center - Pengelolaan media sosial",
        "Press Release Program Kerja",
        "Podcast PEMA UTU",
        "Newsletter Bulanan",
        "Workshop Desain Grafis dan Konten Kreator",
        "Dokumentasi Kegiatan",
        "Website Management"
      ]}
    />
  );
}
