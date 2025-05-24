
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useTranslation } from '@/utils/translations';

interface User {
  username: string;
  email?: string;
}

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  language: 'en' | 'bg';
  userLocation: { lat: number; lng: number };
  login: (user: User) => void;
  logout: () => void;
  setLanguage: (language: 'en' | 'bg') => void;
  setUserLocation: (location: { lat: number; lng: number }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default location is Sofia, Bulgaria
  const defaultLocation = { lat: 42.698334, lng: 23.319941 };
  
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguageState] = useState<'en' | 'bg'>('en');
  const [userLocation, setUserLocationState] = useState(defaultLocation);
  
  // Try to get user location on initial load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocationState({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          const t = useTranslation(language);
          toast({
            title: t("location-access-denied"),
            description: t("location-access-message"),
            variant: "destructive",
          });
        }
      );
    }
  }, [language]);
  
  const login = (userData: User) => {
    setUser(userData);
  };
  
  const logout = () => {
    setUser(null);
  };
  
  const setLanguage = (newLanguage: 'en' | 'bg') => {
    setLanguageState(newLanguage);
  };
  
  const setUserLocation = (location: { lat: number; lng: number }) => {
    setUserLocationState(location);
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    language,
    userLocation,
    login,
    logout,
    setLanguage,
    setUserLocation
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
