
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Auth from './pages/user/Auth';
import Dashboard from './pages/user/Dashboard';
import EmployeeAuth from './pages/employee/EmployeeAuth';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import { AppProvider } from './contexts/AppContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from "@/components/ui/toaster";
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-background text-foreground">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/user" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employee" element={<EmployeeAuth />} />
                <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
              <Toaster />
            </div>
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
