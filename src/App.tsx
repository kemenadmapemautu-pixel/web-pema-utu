import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Cabinet from "./pages/Cabinet";
import Programs from "./pages/Programs";
import News from "./pages/News";
import Contact from "./pages/Contact";
import VisionMission from "./pages/VisionMission";
import Activities from "./pages/Activities";
import Gallery from "./pages/Gallery";
import Structure from "./pages/Structure";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cabinet" element={<Cabinet />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/vision-mission" element={<VisionMission />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/structure" element={<Structure />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
