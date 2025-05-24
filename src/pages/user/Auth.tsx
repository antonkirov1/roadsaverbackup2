
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import { toast } from '@/components/ui/use-toast';

const Auth: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const { login, language } = useApp();
  const t = useTranslation(language);
  
  const handleLogin = (credentials: { username: string; password: string }) => {
    login({ username: credentials.username });
    navigate('/user/dashboard');
    toast({
      title: "Login Successful",
      description: "Welcome to RoadSaver!"
    });
  };
  
  const handleRegister = (userData: { username: string; email: string; password: string; gender?: string }) => {
    login({ username: userData.username, email: userData.email });
    navigate('/user/dashboard');
    toast({
      title: "Registration Successful",
      description: "Welcome to RoadSaver! Your account has been created."
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-green-600/10 to-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">RoadSaver</h1>
          <p className="text-muted-foreground">Emergency Road Assistance</p>
        </div>
        
        {!showRegister ? (
          <LoginForm 
            onLogin={handleLogin} 
            onCreateAccount={() => setShowRegister(true)} 
          />
        ) : (
          <RegisterForm 
            onRegister={handleRegister} 
            onCancel={() => setShowRegister(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default Auth;
