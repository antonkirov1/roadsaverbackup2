
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import { useApp } from '@/contexts/AppContext';
import { toast } from '@/components/ui/use-toast';
import { useTranslation } from '@/utils/translations';
import { Button } from "@/components/ui/button";
import { Globe } from 'lucide-react';
import ThemeToggle from '@/components/ui/theme-toggle';

const AdminAuth: React.FC = () => {
  const navigate = useNavigate();
  const { login, language, setLanguage } = useApp();
  const t = useTranslation(language);
  
  const handleLogin = (credentials: { username: string; password: string }) => {
    // For demo purposes, check for admin credentials
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      login({ username: credentials.username });
      navigate('/migration');
      toast({
        title: "Admin Login Successful",
        description: "Welcome to RoadSaver Account Manager"
      });
    } else {
      toast({
        title: t("auth-error"),
        description: "Invalid admin credentials",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-purple-600/10 to-background p-4 font-clash relative">
      
      {/* Top right controls with theme toggle and language switcher */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <ThemeToggle showLabels={false} size="sm" />
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setLanguage(language === 'en' ? 'bg' : 'en')}
            aria-label={t(language === 'en' ? 'switch-to-bulgarian' : 'switch-to-english')}
            className="h-10 w-10 bg-purple-600 text-white hover:bg-purple-700"
          >
            <Globe className="h-4 w-4" />
          </Button>
          <span className="absolute -bottom-1 -right-1 text-xs bg-white text-purple-600 px-1 rounded">
            {language.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">RoadSaver</h1>
          <p className="text-muted-foreground">Account Manager Panel</p>
        </div>
        
        <LoginForm 
          onLogin={handleLogin}
        />
      </div>
    </div>
  );
};

export default AdminAuth;
