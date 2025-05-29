
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import { toast } from '@/components/ui/use-toast';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardServices from '@/components/dashboard/DashboardServices';
import DashboardModals from '@/components/dashboard/DashboardModals';

type ServiceType = 'flat-tyre' | 'out-of-fuel' | 'other-car-problems' | 'tow-truck' | 'emergency' | 'support' | 'car-battery';

const Dashboard: React.FC = () => {
  const { isAuthenticated, userLocation, setUserLocation, language, setLanguage, ongoingRequest } = useApp();
  const navigate = useNavigate();
  const t = useTranslation(language);
  
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [showEmergencyServices, setShowEmergencyServices] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showOngoingRequests, setShowOngoingRequests] = useState(false);
  
  // Redirect to auth if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/user');
    }
  }, [isAuthenticated, navigate]);
  
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
      />
    </div>
  );
};

export default Dashboard;
