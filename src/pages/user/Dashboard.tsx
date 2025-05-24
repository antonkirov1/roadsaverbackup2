import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/service/ServiceCard';
import ServiceRequest from '@/components/service/ServiceRequest';
import EmergencyServices from '@/components/service/EmergencyServices';
import SettingsMenu from '@/components/settings/SettingsMenu';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import { toast } from '@/components/ui/use-toast';
import MapInput from '@/components/MapInput';
import { Settings, MapPin, Globe, Siren } from 'lucide-react';

type ServiceType = 'flat-tyre' | 'out-of-fuel' | 'other-car-problems' | 'tow-truck' | 'emergency' | 'support' | 'car-battery';

const Dashboard: React.FC = () => {
  const { isAuthenticated, userLocation, setUserLocation, language, setLanguage } = useApp();
  const navigate = useNavigate();
  const t = useTranslation(language);
  
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [showEmergencyServices, setShowEmergencyServices] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  
  // Redirect to auth if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/user');
    }
  }, [isAuthenticated, navigate]);
  
  const handleServiceSelect = (service: ServiceType) => {
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
      {/* Header */}
      <header className="bg-green-600 text-white p-3 sm:p-4 flex justify-between items-center sticky top-0 z-10">
        {/* Changed h1 className to match SettingsMenu banner: text-xl font-semibold font-clash */}
        <h1 className="text-xl font-semibold font-clash">RoadSaver</h1>
        <div className="flex gap-1 sm:gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowEmergencyServices(true)}
            className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10"
            title={t('emergency-services')}
          >
            <Siren className="h-4 w-4 sm:h-5 sm:w-5 animate-emergency-alert-flash" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowLocationPicker(true)}
            className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10"
            title={t('update-location')}
          >
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 animate-map-pin-bob" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowSettings(true)}
            className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10"
            title={t('settings')}
          >
            <Settings className="h-4 w-4 sm:h-5 sm:w-5 animate-settings-gear-turn" />
          </Button>
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setLanguage(language === 'en' ? 'bg' : 'en')}
              className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10"
              title={t('change-language')}
            >
              <Globe className="h-3 w-3 sm:h-4 sm:w-4 animate-globe-pulse" />
            </Button>
            <span className="absolute -bottom-1 -right-1 text-xs bg-white text-green-600 px-1 rounded">
              {language.toUpperCase()}
            </span>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container max-w-md mx-auto px-4 py-4 sm:py-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{t('services')}</h2>
        
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <ServiceCard type="flat-tyre" onClick={() => handleServiceSelect('flat-tyre')} />
          <ServiceCard type="out-of-fuel" onClick={() => handleServiceSelect('out-of-fuel')} />
          <ServiceCard type="car-battery" onClick={() => handleServiceSelect('car-battery')} />
          <ServiceCard type="other-car-problems" onClick={() => handleServiceSelect('other-car-problems')} />
          <ServiceCard type="tow-truck" onClick={() => handleServiceSelect('tow-truck')} />
          <ServiceCard type="support" onClick={() => handleServiceSelect('support')} />
        </div>
      </main>
      
      {/* Modals */}
      {selectedService && (
        <ServiceRequest
          type={selectedService}
          open={!!selectedService}
          onClose={handleRequestClose}
          userLocation={userLocation}
        />
      )}
      
      {showEmergencyServices && (
        <EmergencyServices
          open={showEmergencyServices}
          onClose={() => setShowEmergencyServices(false)}
        />
      )}
      
      {showSettings && (
        <SettingsMenu
          open={showSettings}
          onClose={() => setShowSettings(false)}
          onLanguageChange={setLanguage}
          currentLanguage={language}
        />
      )}
      
      {showLocationPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg shadow-lg p-4 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{t('update-location')}</h2>
            <MapInput 
              onLocationSelect={handleLocationChange} 
              initialLocation={userLocation} 
            />
            <Button 
              variant="outline" 
              onClick={() => setShowLocationPicker(false)}
              className="mt-4 w-full"
            >
              {t('cancel')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
