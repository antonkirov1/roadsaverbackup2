
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import Shell from '@/components/Shell';
import ServiceRequest from '@/components/service/ServiceRequest';
import OngoingRequestsDialog from '@/components/service/OngoingRequestsDialog';
import CompletedRequestsDialog from '@/components/service/CompletedRequestsDialog';
import { useTranslation } from '@/utils/translations';
import ServiceCard from '@/components/service/ServiceCard';
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Settings, Globe } from 'lucide-react';

const Dashboard = () => {
  const { user, ongoingRequest } = useApp();
  const navigate = useNavigate();
  const { language, setLanguage } = useApp();
  const t = useTranslation(language);

  const [showServiceRequest, setShowServiceRequest] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [showOngoingRequests, setShowOngoingRequests] = useState(false);
  const [showCompletedRequests, setShowCompletedRequests] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/user');
    }

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [user, navigate]);

  const handleServiceRequest = (type: string) => {
    setSelectedServiceType(type);
    setShowServiceRequest(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    navigate('/user');
  };

  const handleViewOngoingRequest = () => {
    setShowOngoingRequests(false);
    if (ongoingRequest) {
      setSelectedServiceType(ongoingRequest.type);
      setShowServiceRequest(true);
    }
  };

  const services = [
    'flat-tyre',
    'out-of-fuel', 
    'car-battery',
    'other-car-problems',
    'tow-truck',
    'support'
  ];

  return (
    <Shell>
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* RoadSaver Header */}
        <div className="bg-green-600 text-white p-4 rounded-lg mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">RoadSaver</h1>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <Settings className="h-5 w-5" />
            <Globe className="h-5 w-5" />
            <div className="bg-white/20 px-2 py-1 rounded text-sm">EN</div>
          </div>
        </div>

        {/* Services Header and Ongoing Requests */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Services</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowOngoingRequests(true)}
            className="flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            Ongoing Requests
          </Button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 gap-4">
          {services.map((service) => (
            <ServiceCard
              key={service}
              type={service as any}
              onClick={() => handleServiceRequest(service)}
            />
          ))}
        </div>
      </div>

      {selectedServiceType && (
        <ServiceRequest
          type={selectedServiceType as any}
          open={showServiceRequest}
          onClose={() => setShowServiceRequest(false)}
          userLocation={userLocation}
        />
      )}

      <OngoingRequestsDialog
        open={showOngoingRequests}
        onClose={() => setShowOngoingRequests(false)}
        onViewRequest={handleViewOngoingRequest}
      />

      <CompletedRequestsDialog
        open={showCompletedRequests}
        onClose={() => setShowCompletedRequests(false)}
      />
    </Shell>
  );
};

export default Dashboard;
