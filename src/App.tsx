import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import PaymentSuccess from "./pages/PaymentSuccess";
import FreeIQTest from "./pages/FreeIQTest";
import PersonalityTest from "./pages/PersonalityTest";
import ADHDTest from "./pages/ADHDTest";
import PersonalityTypePage from "./pages/PersonalityTypePage";
import NotFound from "./pages/NotFound";
import Organizations from "./pages/Organizations";
import Research from "./pages/Research";
import About from "./pages/About";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/free-iq-test" element={<FreeIQTest />} />
              <Route path="/personality-test" element={<PersonalityTest />} />
              <Route path="/adhd-test" element={<ADHDTest />} />
              <Route path="/personality/:typeCode" element={<PersonalityTypePage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/organizations" element={<Organizations />} />
              <Route path="/research" element={<Research />} />
              <Route path="/about" element={<About />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
