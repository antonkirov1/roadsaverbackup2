
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import Shell from '@/components/Shell';
import ServiceRequest from '@/components/service/ServiceRequest';
import OngoingRequestsDialog from '@/components/service/OngoingRequestsDialog';
import CompletedRequestsDialog from '@/components/service/CompletedRequestsDialog';
import { useTranslation } from '@/utils/translations';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardCards from '@/components/dashboard/DashboardCards';
import DashboardServices from '@/components/dashboard/DashboardServices';

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

  const handleReviewPriceQuote = () => {
    if (ongoingRequest) {
      setSelectedServiceType(ongoingRequest.type as any);
      setShowServiceRequest(true);
      setShowOngoingRequests(false);
    }
  };

  return (
    <Shell>
      <div className="container relative">
        <DashboardHeader 
          user={user}
          language={language}
          onLanguageChange={setLanguage}
          onSignOut={handleSignOut}
          t={t}
        />

        <DashboardCards 
          onShowOngoingRequests={() => setShowOngoingRequests(true)}
          onShowCompletedRequests={() => setShowCompletedRequests(true)}
          t={t}
        />

        <DashboardServices 
          onServiceSelect={handleServiceRequest}
          t={t}
        />
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
        onReviewPriceQuote={handleReviewPriceQuote}
      />

      <CompletedRequestsDialog
        open={showCompletedRequests}
        onClose={() => setShowCompletedRequests(false)}
      />
    </Shell>
  );
};

export default Dashboard;
