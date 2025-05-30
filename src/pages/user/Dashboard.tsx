
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import { toast } from '@/components/ui/use-toast';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardServices from '@/components/dashboard/DashboardServices';
import DashboardModals from '@/components/dashboard/DashboardModals';
import ExitConfirmDialog from '@/components/dashboard/ExitConfirmDialog';

type ServiceType = 'flat-tyre' | 'out-of-fuel' | 'other-car-problems' | 'tow-truck' | 'emergency' | 'support' | 'car-battery';

const Dashboard: React.FC = () => {
  const { isAuthenticated, userLocation, setUserLocation, language, setLanguage, ongoingRequest, logout } = useApp();
  const navigate = useNavigate();
  const t = useTranslation(language);
  
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [showEmergencyServices, setShowEmergencyServices] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showOngoingRequests, setShowOngoingRequests] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  
  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/user');
    }
  }, [isAuthenticated, navigate]);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      setShowExitConfirm(true);
      // Push the current state back to prevent actual navigation
      window.history.pushState(null, '', window.location.pathname);
    };

    // Push initial state
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  
  const handleServiceSelect = (service: ServiceType) => {
    // Check if there's an ongoing request
    if (ongoingRequest) {
      toast({
        title: "Request in Progress",
        description: "Please wait for your current request to be completed before making a new one.",
        variant: "destructive"
      });
      return;
    }
    
    if (service === 'emergency') {
      setShowEmergencyServices(true);
    } else if (service === 'support') {
      // Contact support is now handled in ServiceCard
      return;
    } else {
      setSelectedService(service);
    }
  };
  
  const handleRequestClose = () => {
    setSelectedService(null);
  };
  
  const handleLocationChange = (location: { lat: number; lng: number }) => {
    setUserLocation(location);
    setShowLocationPicker(false);
    toast({
      title: t('location-updated'),
      description: t('location-updated-msg')
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/user');
  };

  const handleViewRequest = () => {
    if (ongoingRequest) {
      setSelectedService(ongoingRequest.type as ServiceType);
    }
  };
  
  return (
    <div className="min-h-screen bg-background pb-16 font-clash">
      <DashboardHeader
        language={language}
        t={t}
        onEmergencyClick={() => setShowEmergencyServices(true)}
        onLocationClick={() => setShowLocationPicker(true)}
        onSettingsClick={() => setShowSettings(true)}
        onLanguageToggle={() => setLanguage(language === 'en' ? 'bg' : 'en')}
        onOngoingRequestsClick={() => setShowOngoingRequests(true)}
      />
      
      <DashboardServices onServiceSelect={handleServiceSelect} />
      
      <DashboardModals
        selectedService={selectedService}
        showEmergencyServices={showEmergencyServices}
        showSettings={showSettings}
        showLocationPicker={showLocationPicker}
        showOngoingRequests={showOngoingRequests}
        userLocation={userLocation}
        language={language}
        t={t}
        onServiceRequestClose={handleRequestClose}
        onEmergencyServicesClose={() => setShowEmergencyServices(false)}
        onSettingsClose={() => setShowSettings(false)}
        onLocationPickerClose={() => setShowLocationPicker(false)}
        onOngoingRequestsClose={() => setShowOngoingRequests(false)}
        onLocationChange={handleLocationChange}
        onLanguageChange={setLanguage}
        onViewRequest={handleViewRequest}
      />

      <ExitConfirmDialog
        open={showExitConfirm}
        onClose={() => setShowExitConfirm(false)}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default Dashboard;
