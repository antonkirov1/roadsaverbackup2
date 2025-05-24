import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import { toast } from '@/components/ui/use-toast';
import { Toggle } from "@/components/ui/toggle";

const Auth: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const { login, language, setLanguage } = useApp();
  const t = useTranslation(language);
  
  const handleLogin = (credentials: { username: string; password: string }) => {
    login({ username: credentials.username });
    navigate('/user/dashboard');
    toast({
      title: t("login-successful"),
      description: t("welcome-to-roadsaver")
    });
  };
  
  const handleRegister = (userData: { username: string; email: string; password: string; gender?: string; phoneNumber?: string }) => {
    login({ username: userData.username, email: userData.email });
    navigate('/user/dashboard');
    toast({
      title: t("registration-successful"),
      description: t("account-created-welcome")
    });
  };
  
  if (showRegister) {
    return (
      <RegisterForm 
        onRegister={handleRegister} 
        onCancel={() => setShowRegister(false)} 
      />
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-green-600/10 to-background p-4 font-clash relative">
      
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <Toggle
          pressed={language === 'en'}
          onPressedChange={() => setLanguage('en')}
          aria-label={t('switch-to-english')}
          className={`px-3 py-1.5 text-xs sm:text-sm ${language === 'en' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
        >
          EN
        </Toggle>
        <Toggle
          pressed={language === 'bg'}
          onPressedChange={() => setLanguage('bg')}
          aria-label={t('switch-to-bulgarian')}
          className={`px-3 py-1.5 text-xs sm:text-sm ${language === 'bg' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
        >
          BG
        </Toggle>
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">RoadSaver</h1>
          <p className="text-muted-foreground">{t('emergency-road-assistance')}</p>
        </div>
        
        <LoginForm 
          onLogin={handleLogin} 
          onCreateAccount={() => setShowRegister(true)} 
        />
      </div>
    </div>
  );
};

export default Auth;
