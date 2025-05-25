
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import { useApp } from '@/contexts/AppContext';
import { toast } from '@/components/ui/use-toast';
import { useTranslation } from '@/utils/translations';
import { Button } from "@/components/ui/button"; // Added Button
import { Globe } from 'lucide-react'; // Added Globe

const EmployeeAuth: React.FC = () => {
  const navigate = useNavigate();
  const { login, language, setLanguage } = useApp(); // Added setLanguage
  const t = useTranslation(language);
  
  const handleLogin = (credentials: { username: string; password: string }) => {
    login({ username: credentials.username }); // Assuming employee login doesn't set email
    navigate('/employee/dashboard');
    toast({
      title: t("employee-login-successful"),
      description: t("welcome-employee-dashboard")
    });
  };
  
  return (
    // Added font-clash and relative positioning for the language button
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-600/10 to-background p-4 font-clash relative">
      
      {/* Language switcher similar to user Auth page, themed blue */}
      <div className="absolute top-4 right-4 z-10">
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setLanguage(language === 'en' ? 'bg' : 'en')}
            aria-label={t(language === 'en' ? 'switch-to-bulgarian' : 'switch-to-english')}
            className="h-10 w-10 bg-blue-600 text-white hover:bg-blue-700" // Blue theme
          >
            <Globe className="h-4 w-4" />
          </Button>
          <span className="absolute -bottom-1 -right-1 text-xs bg-white text-blue-600 px-1 rounded"> {/* Blue theme */}
            {language.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          {/* Matched h1 style to user auth screen */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">RoadSaver</h1>
          <p className="text-muted-foreground">{t("employee-dashboard")}</p>
        </div>
        
        <LoginForm 
          onLogin={handleLogin} 
          isEmployee={true} 
          // onCreateAccount is not typically for employees, so it's omitted
        />
      </div>
    </div>
  );
};

export default EmployeeAuth;
