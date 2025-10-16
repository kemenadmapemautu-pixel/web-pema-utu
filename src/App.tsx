import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { GalleryProvider } from '@/contexts/GalleryContext';
import { Toaster } from '@/components/ui/toaster';
import { Layout } from '@/components/Layout/Layout';

// Import pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import VisionMission from '@/pages/VisionMission';
import Cabinet from '@/pages/Cabinet';
import Structure from '@/pages/Structure';
import Ministries from '@/pages/Ministries';
import MinistryPage from '@/pages/MinistryPage';
import Programs from '@/pages/Programs';
import Activities from '@/pages/Activities';
import News from '@/pages/News';
import NewsDetail from '@/pages/NewsDetail';
import Gallery from '@/pages/Gallery';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';

// Import admin pages
import Dashboard from '@/pages/admin/Dashboard';
import PengurusManagement from '@/pages/admin/PengurusManagement';
import AccountManagement from '@/pages/admin/AccountManagement';
import MinistryManagement from '@/pages/admin/MinistryManagement';
import MinistryTeamManagement from '@/pages/admin/MinistryTeamManagement';
import MinistryContentManagement from '@/pages/admin/MinistryContentManagement';
import ProgramManagement from '@/pages/admin/ProgramManagement';
import NewsManagement from '@/pages/admin/NewsManagement';
import GalleryManagement from '@/pages/admin/GalleryManagement';
import MessagesManagement from '@/pages/admin/MessagesManagement';
import StatsManagement from '@/pages/admin/StatsManagement';
import StorageManagement from '@/pages/admin/StorageManagement';
import ProfileEdit from '@/pages/admin/ProfileEdit';
import ActivitiesManagement from '@/pages/admin/ActivitiesManagement';
import ActivityForm from '@/components/ActivityForm';

function App() {
  return (
    <AuthProvider>
      <GalleryProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            {/* Public Routes - With Layout (Header & Footer) */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/vision-mission" element={<Layout><VisionMission /></Layout>} />
            <Route path="/cabinet" element={<Layout><Cabinet /></Layout>} />
            <Route path="/structure" element={<Layout><Structure /></Layout>} />
            <Route path="/ministries" element={<Layout><Ministries /></Layout>} />
            <Route path="/ministry/:slug" element={<Layout><MinistryPage /></Layout>} />
            <Route path="/programs" element={<Layout><Programs /></Layout>} />
            <Route path="/activities" element={<Layout><Activities /></Layout>} />
            <Route path="/news" element={<Layout><News /></Layout>} />
            <Route path="/news/:id" element={<Layout><NewsDetail /></Layout>} />
            <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            
            {/* Login - No Layout */}
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/pengurus" element={<PengurusManagement />} />
            <Route path="/admin/accounts" element={<AccountManagement />} />
            <Route path="/admin/ministries" element={<MinistryManagement />} />
            <Route path="/admin/ministry-teams" element={<MinistryTeamManagement />} />
            <Route path="/admin/ministry-content" element={<MinistryContentManagement />} />
            <Route path="/admin/programs" element={<ProgramManagement />} />
            <Route path="/admin/news" element={<NewsManagement />} />
            <Route path="/admin/gallery" element={<GalleryManagement />} />
            <Route path="/admin/messages" element={<MessagesManagement />} />
            <Route path="/admin/stats" element={<StatsManagement />} />
            <Route path="/admin/storage" element={<StorageManagement />} />
            <Route path="/admin/profile" element={<ProfileEdit />} />
            <Route path="/admin/activities" element={<ActivitiesManagement />} />
            <Route path="/admin/activities/new" element={<ActivityForm />} />
            <Route path="/admin/activities/edit/:id" element={<ActivityForm />} />
          </Routes>
        </Router>
        <Toaster />
      </GalleryProvider>
    </AuthProvider>
  );
}

export default App;