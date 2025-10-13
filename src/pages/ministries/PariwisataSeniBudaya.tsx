import MinistryPage from "../MinistryPage";

export default function PariwisataSeniBudaya() {
  return (
    <MinistryPage
      ministryKey="pariwisata"
      ministryName="Kementerian Pariwisata dan Seni Budaya"
      description="Melestarikan dan mengembangkan seni budaya serta mempromosikan pariwisata lokal"
      vision="Menjadi wadah apresiasi seni budaya dan promosi pariwisata daerah"
      mission={[
        "Melestarikan seni dan budaya lokal",
        "Mengadakan pertunjukan seni dan budaya",
        "Memfasilitasi pengembangan bakat seni mahasiswa",
        "Mempromosikan destinasi wisata lokal",
        "Membangun awareness terhadap kearifan lokal"
      ]}
      programs={[
        "Festival Seni Budaya Kampus",
        "Pentas Seni Mahasiswa",
        "Workshop Tari Tradisional",
        "Musik dan Teater Kampus",
        "Trip Wisata Budaya",
        "Pameran Karya Seni",
        "Lomba Fotografi Budaya",
        "Cultural Night"
      ]}
    />
  );
}
