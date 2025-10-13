import MinistryPage from "../MinistryPage";

export default function PengembanganSDM() {
  return (
    <MinistryPage
      ministryKey="sdm"
      ministryName="Kementerian Pengembangan SDM"
      description="Mengembangkan kompetensi dan kualitas sumber daya mahasiswa"
      vision="Mencetak mahasiswa yang kompeten, berkualitas, dan siap bersaing"
      mission={[
        "Mengadakan pelatihan soft skill dan hard skill",
        "Memfasilitasi pengembangan kepemimpinan mahasiswa",
        "Menyelenggarakan workshop dan seminar pengembangan diri",
        "Memberikan mentoring dan coaching",
        "Membangun kultur belajar berkelanjutan"
      ]}
      programs={[
        "Leadership Training",
        "Public Speaking Workshop",
        "Time Management Training",
        "Emotional Intelligence Seminar",
        "Critical Thinking Workshop",
        "Personal Branding Class",
        "Mentoring Program",
        "Career Development Series"
      ]}
    />
  );
}
