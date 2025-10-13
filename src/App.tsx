import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute, AdminOnlyRoute, MinisterRoute } from "@/components/ProtectedRoute";
import { Layout } from "@/components/Layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Cabinet from "./pages/Cabinet";
import Programs from "./pages/Programs";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Contact from "./pages/Contact";
import VisionMission from "./pages/VisionMission";
import Activities from "./pages/Activities";
import Gallery from "./pages/Gallery";
import Ministries from "./pages/Ministries";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import PengurusManagement from "./pages/admin/PengurusManagement";
import NewsManagement from "./pages/admin/NewsManagement";
import MessagesManagement from "./pages/admin/MessagesManagement";
import ProgramManagement from "./pages/admin/ProgramManagement";
import GalleryManagement from "./pages/admin/GalleryManagement";
import ProfileEdit from "./pages/admin/ProfileEdit";
import MinistryTeamManagement from "./pages/admin/MinistryTeamManagement";
import MinistryContentManagement from "./pages/admin/MinistryContentManagement";
import MinistryManagement from "./pages/admin/MinistryManagement";
import NotFound from "./pages/NotFound";

// Ministry Pages
import AdvokasiHakMahasiswa from "./pages/ministries/AdvokasiHakMahasiswa";
import KomunikasiInformasi from "./pages/ministries/KomunikasiInformasi";
import PemberdayaanPerempuan from "./pages/ministries/PemberdayaanPerempuan";
import Agama from "./pages/ministries/Agama";
import HubunganInternalEksternal from "./pages/ministries/HubunganInternalEksternal";
import PengembanganSDM from "./pages/ministries/PengembanganSDM";
import PemudaOlahraga from "./pages/ministries/PemudaOlahraga";
import PariwisataSeniBudaya from "./pages/ministries/PariwisataSeniBudaya";
import PendidikanAkademik from "./pages/ministries/PendidikanAkademik";
import KesehatanMasyarakat from "./pages/ministries/KesehatanMasyarakat";
import SosialLingkunganHidup from "./pages/ministries/SosialLingkunganHidup";
import EkonomiKreatif from "./pages/ministries/EkonomiKreatif";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes with Layout */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/cabinet" element={<Layout><Cabinet /></Layout>} />
            <Route path="/ministries" element={<Layout><Ministries /></Layout>} />
            <Route path="/programs" element={<Layout><Programs /></Layout>} />
            <Route path="/news" element={<Layout><News /></Layout>} />
            <Route path="/news/:id" element={<Layout><NewsDetail /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/vision-mission" element={<Layout><VisionMission /></Layout>} />
            <Route path="/activities" element={<Layout><Activities /></Layout>} />
            <Route path="/gallery" element={<Layout><Gallery /></Layout>} />

            {/* Login Route (No Layout) */}
            <Route path="/login" element={<Login />} />

            {/* Protected Admin Routes (No Layout) */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Admin Only Routes */}
            <Route path="/admin/pengurus" element={
              <AdminOnlyRoute>
                <PengurusManagement />
              </AdminOnlyRoute>
            } />
            <Route path="/admin/news" element={
              <AdminOnlyRoute>
                <NewsManagement />
              </AdminOnlyRoute>
            } />
            <Route path="/admin/messages" element={
              <AdminOnlyRoute>
                <MessagesManagement />
              </AdminOnlyRoute>
            } />
            <Route path="/admin/accounts" element={
              <AdminOnlyRoute>
                <PengurusManagement />
              </AdminOnlyRoute>
            } />
            <Route path="/admin/programs" element={
              <AdminOnlyRoute>
                <ProgramManagement />
              </AdminOnlyRoute>
            } />
            <Route path="/admin/gallery" element={
              <AdminOnlyRoute>
                <GalleryManagement />
              </AdminOnlyRoute>
            } />
            <Route path="/admin/pengurus/tambah" element={
              <AdminOnlyRoute>
                <PengurusManagement />
              </AdminOnlyRoute>
            } />
            
            {/* Profile Route - All authenticated users */}
            <Route path="/admin/profile" element={
              <ProtectedRoute>
                <ProfileEdit />
              </ProtectedRoute>
            } />

            {/* Ministry Content Management - Ministers only */}
            <Route path="/admin/ministry-content" element={
              <MinisterRoute>
                <MinistryContentManagement />
              </MinisterRoute>
            } />

            {/* Ministry Team Management - Ministers only */}
            <Route path="/admin/ministry-team" element={
              <MinisterRoute>
                <MinistryTeamManagement />
              </MinisterRoute>
            } />

            {/* Ministry Management (All-in-One) - Ministers only */}
            <Route path="/admin/ministry" element={
              <MinisterRoute>
                <MinistryManagement />
              </MinisterRoute>
            } />

            {/* Ministry Pages - Public Routes with Layout */}
            <Route path="/ministry/advokasi-hak-mahasiswa" element={<Layout><AdvokasiHakMahasiswa /></Layout>} />
            <Route path="/ministry/komunikasi-informasi" element={<Layout><KomunikasiInformasi /></Layout>} />
            <Route path="/ministry/pemberdayaan-perempuan" element={<Layout><PemberdayaanPerempuan /></Layout>} />
            <Route path="/ministry/agama" element={<Layout><Agama /></Layout>} />
            <Route path="/ministry/hubungan-internal-eksternal" element={<Layout><HubunganInternalEksternal /></Layout>} />
            <Route path="/ministry/pengembangan-sdm" element={<Layout><PengembanganSDM /></Layout>} />
            <Route path="/ministry/pemuda-olahraga" element={<Layout><PemudaOlahraga /></Layout>} />
            <Route path="/ministry/pariwisata-seni-budaya" element={<Layout><PariwisataSeniBudaya /></Layout>} />
            <Route path="/ministry/pendidikan-akademik" element={<Layout><PendidikanAkademik /></Layout>} />
            <Route path="/ministry/kesehatan-masyarakat" element={<Layout><KesehatanMasyarakat /></Layout>} />
            <Route path="/ministry/sosial-lingkungan-hidup" element={<Layout><SosialLingkunganHidup /></Layout>} />
            <Route path="/ministry/ekonomi-kreatif" element={<Layout><EkonomiKreatif /></Layout>} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
