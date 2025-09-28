import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih atas pesan Anda. Tim kami akan segera merespons."
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: ["pema@utu.ac.id", "info@pemautu.org"],
      description: "Kirim email untuk pertanyaan umum atau kerjasama"
    },
    {
      icon: Phone,
      title: "Telepon",
      details: ["+62 812-3456-7890", "+62 813-4567-8901"],
      description: "Hubungi kami langsung untuk urusan mendesak"
    },
    {
      icon: MapPin,
      title: "Alamat",
      details: ["Sekretariat PEMA UTU", "Gedung Student Center, Lantai 2", "Universitas Teuku Umar"],
      description: "Kunjungi sekretariat kami di kampus"
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      details: ["Senin - Jumat: 08:00 - 17:00", "Sabtu: 08:00 - 12:00", "Minggu: Tutup"],
      description: "Waktu terbaik untuk menghubungi kami"
    }
  ];

  const departments = [
    {
      icon: Users,
      name: "Kabinet",
      email: "kabinet@pema.utu.ac.id",
      description: "Informasi tentang struktur organisasi dan anggota kabinet"
    },
    {
      icon: Calendar,
      name: "Program Kerja",
      email: "programs@pema.utu.ac.id", 
      description: "Konsultasi dan kerjasama program kegiatan"
    },
    {
      icon: MessageSquare,
      name: "Hubungan Masyarakat",
      email: "humas@pema.utu.ac.id",
      description: "Media relations dan publikasi kegiatan"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary">
            Hubungi <span className="text-gradient-accent">Kami</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kami siap mendengar aspirasi, saran, dan masukan Anda. Jangan ragu untuk menghubungi kami kapan saja.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center">
                  <Send className="h-6 w-6 mr-3 text-gold" />
                  Kirim Pesan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Masukkan nama lengkap Anda"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nama@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subjek</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Topik pesan Anda"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tulis pesan Anda di sini..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full">
                    <Send className="h-5 w-5 mr-2" />
                    Kirim Pesan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Informasi Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-primary">{info.title}</h3>
                      </div>
                      <div className="ml-13 space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm text-foreground">{detail}</p>
                        ))}
                        <p className="text-xs text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Departments */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Departemen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {departments.map((dept, index) => {
                  const Icon = dept.icon;
                  return (
                    <div key={index} className="p-4 border border-border rounded-lg hover:border-gold transition-smooth">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-semibold text-primary text-sm">{dept.name}</h4>
                          <p className="text-xs text-muted-foreground">{dept.description}</p>
                          <a 
                            href={`mailto:${dept.email}`}
                            className="text-xs text-gold hover:text-gold-dark transition-smooth"
                          >
                            {dept.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center">
                <MapPin className="h-6 w-6 mr-3 text-gold" />
                Lokasi Kami
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="h-12 w-12 text-gold mx-auto" />
                  <p className="text-lg font-semibold text-primary">Sekretariat PEMA UTU</p>
                  <p className="text-muted-foreground">Gedung Student Center, Lantai 2</p>
                  <p className="text-muted-foreground">Universitas Teuku Umar</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}