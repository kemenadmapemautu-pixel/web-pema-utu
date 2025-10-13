import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MINISTRIES } from "@/data/ministriesData";
import { ArrowRight, Building2 } from "lucide-react";

export default function Ministries() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-gold/5">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-gold text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Building2 className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Kementerian PEMA UTU
            </h1>
            <p className="text-xl text-white/90">
              12 Kementerian yang siap melayani dan memberdayakan mahasiswa
            </p>
          </div>
        </div>
      </div>

      {/* Ministries Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MINISTRIES.map((ministry) => (
            <Card 
              key={ministry.id} 
              className="shadow-card hover:shadow-primary transition-all group"
            >
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className="text-5xl">{ministry.icon}</div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 group-hover:text-gold transition-colors">
                      {ministry.shortName}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {ministry.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link to={ministry.url}>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-all"
                  >
                    Lihat Selengkapnya
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="shadow-card">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Tentang Kementerian
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Setiap kementerian PEMA UTU memiliki fokus dan program kerja yang berbeda untuk melayani 
                dan memberdayakan mahasiswa. Klik pada setiap kementerian untuk melihat visi, misi, 
                tim, dan program kerja mereka secara detail.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gradient-to-br from-primary/5 to-gold/5 rounded-lg">
                  <p className="text-3xl font-bold text-primary">12</p>
                  <p className="text-sm text-muted-foreground">Kementerian</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-primary/5 to-gold/5 rounded-lg">
                  <p className="text-3xl font-bold text-gold">100+</p>
                  <p className="text-sm text-muted-foreground">Program Kerja</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-primary/5 to-gold/5 rounded-lg">
                  <p className="text-3xl font-bold text-primary">∞</p>
                  <p className="text-sm text-muted-foreground">Dedikasi</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
