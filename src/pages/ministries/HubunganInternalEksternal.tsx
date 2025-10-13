import MinistryPage from "../MinistryPage";

export default function HubunganInternalEksternal() {
  return (
    <MinistryPage
      ministryKey="hubungan"
      ministryName="Kementerian Hubungan Internal dan Eksternal"
      description="Menjalin dan memelihara hubungan internal organisasi dan eksternal dengan pihak luar"
      vision="Menjadi jembatan komunikasi yang solid antara internal dan eksternal organisasi"
      mission={[
        "Membangun kerjasama dengan organisasi mahasiswa lain",
        "Menjalin hubungan dengan alumni dan stakeholder",
        "Memperkuat solidaritas internal organisasi",
        "Mengadakan networking event",
        "Memfasilitasi kolaborasi antar fakultas"
      ]}
      programs={[
        "MOU dengan Organisasi Eksternal",
        "Gathering Alumni",
        "Study Banding ke Universitas Lain",
        "Internal Bonding Activities",
        "Networking Night",
        "Kolaborasi Program Antar Fakultas",
        "Forum Koordinasi BEM se-Indonesia"
      ]}
    />
  );
}
