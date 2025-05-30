
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const EmployeeAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, isAuthenticated } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/employee/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (username: string) => {
    login({ 
      username, 
      name: username // Use username as name for now
    });
  };

  const handleRegister = (username: string, email: string) => {
    login({ 
      username, 
      name: username, // Use username as name for now
      email 
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Employee Portal</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Access your employee dashboard</p>
        </div>
        
        {isLogin ? (
          <LoginForm 
            onLogin={handleLogin}
            onSwitchToRegister={() => setIsLogin(false)}
          />
        ) : (
          <RegisterForm 
            onRegister={handleRegister}
            onSwitchToLogin={() => setIsLogin(true)}
          />
        )}
      </div>
    </div>
  );
};

export default EmployeeAuth;
