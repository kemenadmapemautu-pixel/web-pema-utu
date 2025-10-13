import MinistryPage from "../MinistryPage";

export default function AdvokasiHakMahasiswa() {
  return (
    <MinistryPage
      ministryKey="advokasi"
      ministryName="Kementerian Advokasi dan Hak Mahasiswa"
      description="Memperjuangkan hak-hak mahasiswa dan memberikan advokasi untuk kepentingan mahasiswa"
      vision="Menjadi wadah advokasi yang kuat dalam memperjuangkan hak dan kepentingan seluruh mahasiswa"
      mission={[
        "Melakukan advokasi terhadap kebijakan kampus yang berkaitan dengan mahasiswa",
        "Memberikan pendampingan dan konsultasi hukum bagi mahasiswa",
        "Menjembatani komunikasi antara mahasiswa dengan pihak kampus",
        "Melakukan sosialisasi hak dan kewajiban mahasiswa",
        "Mengawasi implementasi kebijakan kampus yang menyangkut mahasiswa"
      ]}
      programs={[
        "Legal Clinic - Layanan konsultasi hukum gratis",
        "Workshop Hak dan Kewajiban Mahasiswa",
        "Kampanye Anti Kekerasan Kampus",
        "Pendampingan Kasus Mahasiswa",
        "Forum Diskusi Kebijakan Kampus",
        "Publikasi Panduan Hak Mahasiswa"
      ]}
    />
  );
}
