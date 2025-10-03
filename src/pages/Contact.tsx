import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Calendar, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: "unread" | "read" | "replied";
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const saveToLocalStorage = (messageData: ContactMessage) => {
    const existingMessages = localStorage.getItem("contactMessages");
    const messages: ContactMessage[] = existingMessages ? JSON.parse(existingMessages) : [];
    messages.unshift(messageData); // Add to beginning
    localStorage.setItem("contactMessages", JSON.stringify(messages));
  };

  const sendEmailJS = async (messageData: ContactMessage) => {
    // EmailJS integration - uncomment setelah setup EmailJS
    try {
      // Konfigurasi EmailJS (ganti dengan data Anda)
      const EMAILJS_SERVICE_ID = "your_service_id";
      const EMAILJS_TEMPLATE_ID = "your_template_id"; 
      const EMAILJS_PUBLIC_KEY = "your_public_key";
      
      // Uncomment untuk mengaktifkan EmailJS
      /*
      const emailjs = (await import('emailjs-com')).default;
      
      const templateParams = {
        from_name: messageData.name,
        from_email: messageData.email,
        subject: messageData.subject,
        message: messageData.message,
        to_email: "admin@pemautu.org" // Email admin
      };
      
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      */
      
      console.log("EmailJS ready for configuration:", messageData);
      return true;
    } catch (error) {
      console.error("EmailJS error:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create message object
      const messageData: ContactMessage = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        date: new Date().toISOString(),
        status: "unread"
      };

      // Save to localStorage
      saveToLocalStorage(messageData);

      // Try to send email (optional - won't fail if EmailJS not configured)
      await sendEmailJS(messageData);

      // Success notification
      toast({
        title: "Pesan Berhasil Dikirim! ✅",
        description: "Pesan Anda telah tersimpan dan akan segera ditanggapi oleh tim kami."
      });

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });

    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Gagal Mengirim Pesan",
        description: "Terjadi kesalahan. Silakan coba lagi atau hubungi kami via WhatsApp.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = "6281234567890"; // Ganti dengan nomor WhatsApp admin
    const message = formData.name && formData.subject 
      ? `Halo, saya ${formData.name}. ${formData.subject}: ${formData.message}`
      : "Halo, saya ingin menghubungi PEMA UTU.";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
      details: ["Sekretariat PEMA UTU", "Gedung Lama, Samping Paud/Tk Lentera Teuku Umar", "Universitas Teuku Umar"],
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
                  
                  <div className="space-y-3">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      <Send className="h-5 w-5 mr-2" />
                      {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                    </Button>
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">atau</span>
                      </div>
                    </div>
                    
                    <Button 
                      type="button"
                      variant="outline" 
                      size="lg" 
                      className="w-full text-green-600 border-green-600 hover:bg-green-50"
                      onClick={handleWhatsAppContact}
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Hubungi via WhatsApp
                    </Button>
                  </div>
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
              <div className="rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d850.9414585443968!2d96.19604689715011!3d4.146114999718282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNMKwMDgnNDYuMCJOIDk2wrAxMSc0OC4yIkU!5e1!3m2!1sid!2sid!4v1759434209312!5m2!1sid!2sid" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Sekretariat Pema UTU"
                ></iframe>
              </div>
              <div className="mt-4 text-center space-y-2">
                <p className="text-lg font-semibold text-primary">Sekretariat Pema UTU</p>
                <p className="text-muted-foreground">Gedung Lama, Samping Paud/Tk Lentera Teuku Umar</p>
                <p className="text-muted-foreground">Universitas Teuku Umar</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}