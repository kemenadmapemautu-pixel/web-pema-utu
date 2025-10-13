import MinistryPage from "../MinistryPage";

export default function PendidikanAkademik() {
  return (
    <MinistryPage
      ministryKey="pendidikan"
      ministryName="Kementerian Pendidikan dan Akademik"
      description="Meningkatkan kualitas pendidikan dan prestasi akademik mahasiswa"
      vision="Mewujudkan mahasiswa yang berprestasi dan unggul di bidang akademik"
      mission={[
        "Memfasilitasi kegiatan akademik mahasiswa",
        "Mengadakan bimbingan belajar dan tutoring",
        "Menyelenggarakan kompetisi akademik",
        "Memberikan beasiswa dan penghargaan prestasi",
        "Melakukan advokasi kebijakan akademik"
      ]}
      programs={[
        "Bimbingan Belajar Gratis",
        "Tutorial Mata Kuliah Sulit",
        "Olimpiade Sains Kampus",
        "Seminar Metodologi Penelitian",
        "Academic Writing Workshop",
        "Beasiswa Prestasi Akademik",
        "Study Group Facilitation",
        "Perpustakaan Digital"
      ]}
    />
  );
}
