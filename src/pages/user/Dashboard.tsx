import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shell } from '@/components/Shell';
import ServiceRequest from '@/components/service/ServiceRequest';
import OngoingRequestsDialog from '@/components/service/OngoingRequestsDialog';
import CompletedRequestsDialog from '@/components/service/CompletedRequestsDialog';
import { useTranslation } from '@/utils/translations';
import { useTheme } from "@/contexts/ThemeContext"
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Dashboard = () => {
  const { user, setUser, ongoingRequest } = useApp();
  const navigate = useNavigate();
  const { language, setLanguage } = useApp();
  const t = useTranslation(language);
  const { theme, setTheme } = useTheme();

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
    setUser(null);
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
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{t('welcome')} {user?.name}</h1>
              <p className="text-muted-foreground">{t('dashboard-desc')}</p>
            </div>
          </div>

          <div className="space-x-2 flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9">
                  <span className="sr-only">Toggle Theme</span>
                  {theme === "dark" ? (
                    <SunIcon className="h-4 w-4" />
                  ) : (
                    <MoonIcon className="h-4 w-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9">
                  {language}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('bg')}>
                  Bulgarian
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" onClick={handleSignOut}>
              {t('sign-out')}
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          <Card className="hover:bg-secondary transition-colors cursor-pointer" onClick={() => setShowOngoingRequests(true)}>
            <CardHeader>
              <CardTitle>{t('new-request')}</CardTitle>
              <CardDescription>{t('request-desc')}</CardDescription>
            </CardHeader>
            <CardContent>
              {t('select-service')}
            </CardContent>
          </Card>

          <Card className="hover:bg-secondary transition-colors cursor-pointer" onClick={() => setShowCompletedRequests(true)}>
            <CardHeader>
              <CardTitle>{t('completed-requests')}</CardTitle>
              <CardDescription>{t('completed-requests-desc')}</CardDescription>
            </CardHeader>
            <CardContent>
              {t('view-completed-services')}
            </CardContent>
          </Card>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <Card className="hover:bg-secondary transition-colors cursor-pointer" onClick={() => handleServiceRequest('flat-tyre')}>
            <CardHeader>
              <CardTitle>{t('flat-tyre')}</CardTitle>
              <CardDescription>{t('flat-tyre-desc')}</CardDescription>
            </CardHeader>
            <CardContent>
              {t('flat-tyre-content')}
            </CardContent>
          </Card>

          <Card className="hover:bg-secondary transition-colors cursor-pointer" onClick={() => handleServiceRequest('out-of-fuel')}>
            <CardHeader>
              <CardTitle>{t('out-of-fuel')}</CardTitle>
              <CardDescription>{t('out-of-fuel-desc')}</CardDescription>
            </CardHeader>
            <CardContent>
              {t('out-of-fuel-content')}
            </CardContent>
          </Card>

          <Card className="hover:bg-secondary transition-colors cursor-pointer" onClick={() => handleServiceRequest('car-battery')}>
            <CardHeader>
              <CardTitle>{t('car-battery')}</CardTitle>
              <CardDescription>{t('car-battery-desc')}</CardDescription>
            </CardHeader>
            <CardContent>
              {t('car-battery-content')}
            </CardContent>
          </Card>

          <Card className="hover:bg-secondary transition-colors cursor-pointer" onClick={() => handleServiceRequest('tow-truck')}>
            <CardHeader>
              <CardTitle>{t('tow-truck')}</CardTitle>
              <CardDescription>{t('tow-truck-desc')}</CardDescription>
            </CardHeader>
            <CardContent>
              {t('tow-truck-content')}
            </CardContent>
          </Card>

          <Card className="hover:bg-secondary transition-colors cursor-pointer" onClick={() => handleServiceRequest('other-car-problems')}>
            <CardHeader>
              <CardTitle>{t('other-car-problems')}</CardTitle>
              <CardDescription>{t('other-car-problems-desc')}</CardDescription>
            </CardHeader>
            <CardContent>
              {t('other-car-problems-content')}
            </CardContent>
          </Card>

          <Card className="hover:bg-secondary transition-colors cursor-pointer" onClick={() => handleServiceRequest('support')}>
            <CardHeader>
              <CardTitle>{t('support')}</CardTitle>
              <CardDescription>{t('support-desc')}</CardDescription>
            </CardHeader>
            <CardContent>
              {t('support-content')}
            </CardContent>
          </Card>
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
