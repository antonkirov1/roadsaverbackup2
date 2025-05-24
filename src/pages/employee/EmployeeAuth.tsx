
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import { useApp } from '@/contexts/AppContext';
import { toast } from '@/components/ui/use-toast';
import { useTranslation } from '@/utils/translations';

const EmployeeAuth: React.FC = () => {
  const navigate = useNavigate();
  const { login, language } = useApp();
  const t = useTranslation(language);
  
  const handleLogin = (credentials: { username: string; password: string }) => {
    login({ username: credentials.username });
    navigate('/employee/dashboard');
    toast({
      title: t("employee-login-successful"),
      description: t("welcome-employee-dashboard")
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-600/10 to-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">RoadSaver</h1>
          <p className="text-muted-foreground">{t("employee-dashboard")}</p>
        </div>
        
        <LoginForm 
          onLogin={handleLogin} 
          isEmployee={true} 
        />
      </div>
    </div>
  );
};

export default EmployeeAuth;
