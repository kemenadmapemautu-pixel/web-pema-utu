import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute, AdminOnlyRoute } from "@/components/ProtectedRoute";
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
import Structure from "./pages/Structure";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import PengurusManagement from "./pages/admin/PengurusManagement";
import NewsManagement from "./pages/admin/NewsManagement";
import MessagesManagement from "./pages/admin/MessagesManagement";
import AccountManagement from "./pages/admin/AccountManagement";
import ProgramManagement from "./pages/admin/ProgramManagement";
import ProfileEdit from "./pages/admin/ProfileEdit";
import NotFound from "./pages/NotFound";

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
            <Route path="/programs" element={<Layout><Programs /></Layout>} />
            <Route path="/news" element={<Layout><News /></Layout>} />
            <Route path="/news/:id" element={<Layout><NewsDetail /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/vision-mission" element={<Layout><VisionMission /></Layout>} />
            <Route path="/activities" element={<Layout><Activities /></Layout>} />
            <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
            <Route path="/structure" element={<Layout><Structure /></Layout>} />

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
                <AccountManagement />
              </AdminOnlyRoute>
            } />
            <Route path="/admin/programs" element={
              <AdminOnlyRoute>
                <ProgramManagement />
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

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
