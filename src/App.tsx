
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/user/Auth";
import Dashboard from "./pages/user/Dashboard";
import EmployeeAuth from "./pages/employee/EmployeeAuth";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Main landing page */}
            <Route path="/" element={<Index />} />
            
            {/* User app routes */}
            <Route path="/user" element={<Auth />} />
            <Route path="/user/dashboard" element={<Dashboard />} />
            
            {/* Employee app routes */}
            <Route path="/employee" element={<EmployeeAuth />} />
            <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
            
            {/* 404 catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
