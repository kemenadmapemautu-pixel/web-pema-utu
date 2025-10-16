import { useState, useEffect } from "react";
import { BookOpen, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Program {
  id: string;
  nama: string;
  deskripsi: string;
  status: "sudah_terlaksana" | "belum_terlaksana" | "sedang_berjalan";
  createdAt: string;
  publishedDate?: string;
  publishedBy?: string;
}

export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const loadProgramsData = () => {
      const savedPrograms = localStorage.getItem("programsList");
      if (savedPrograms) {
        const parsedPrograms = JSON.parse(savedPrograms);
        console.log("Programs data before migration:", parsedPrograms);

        // Smart migration - preserve existing dates, only add missing fields
        const smartMigratedPrograms = parsedPrograms.map((program: Program) => {
          // Preserve existing publishedDate if it exists, otherwise use today
          const publishedDate = program.publishedDate || new Date().toISOString().split('T')[0];
          const publishedBy = program.publishedBy || "Administrator";

          return {
            ...program,
            publishedDate,
            publishedBy
          };
        });

        console.log("Programs data after smart migration:", smartMigratedPrograms);

        // Check if any migration was needed
        const needsMigration = parsedPrograms.some((p: Program) =>
          !p.publishedDate || !p.publishedBy
        );

        if (needsMigration) {
          console.log("Migration was needed, saving to localStorage");
          localStorage.setItem("programsList", JSON.stringify(smartMigratedPrograms));
        }

        setPrograms(smartMigratedPrograms);
      }
    };

    loadProgramsData();
  }, []);

  const getStatusBadge = (status: Program["status"]) => {
    const variants = {
      sudah_terlaksana: "bg-green-100 text-green-800",
      sedang_berjalan: "bg-blue-100 text-blue-800",
      belum_terlaksana: "bg-gray-100 text-gray-800"
    };

    const labels = {
      sudah_terlaksana: "Sudah Terlaksana",
      sedang_berjalan: "Sedang Berjalan",
      belum_terlaksana: "Belum Terlaksana"
    };

    return (
      <Badge className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">
            Program <span className="text-gradient-accent">Kerja</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Berbagai program inovatif yang dirancang untuk memajukan kehidupan kampus dan mengembangkan potensi mahasiswa UTU.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
          {programs.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-base font-semibold text-muted-foreground mb-2">
                Belum ada program kerja
              </h3>
              <p className="text-sm text-muted-foreground">
                Program kerja akan ditampilkan setelah admin menambahkannya
              </p>
            </div>
          ) : (
            programs.map((program) => (
              <Card key={program.id} className="shadow-card hover:shadow-primary transition-smooth group">
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center group-hover:animate-bounce">
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    {getStatusBadge(program.status)}
                  </div>
                  <CardTitle className="text-base sm:text-lg text-primary group-hover:text-gold transition-smooth">
                    {program.nama}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {program.deskripsi}
                  </p>
                  
                  <div className="text-xs text-muted-foreground">
                    Diterbitkan oleh {program.publishedBy || "Administrator"} pada {
                      program.publishedDate ? 
                        new Date(program.publishedDate).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        }) : 
                        new Date(program.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })
                    }
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-12">
          <Card className="gradient-primary text-white p-5 sm:p-6 text-center">
            <CardContent className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold">Punya Ide Program?</h2>
              <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
                Kami selalu terbuka untuk ide dan saran program baru dari mahasiswa. 
                Mari bersama-sama membangun universitas yang lebih baik!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a 
                  href="mailto:programs@pema.utu.ac.id" 
                  className="bg-gold text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gold-dark transition-smooth"
                >
                  Kirim Proposal
                </a>
                <a 
                  href="/contact" 
                  className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-smooth"
                >
                  Hubungi Kami
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
