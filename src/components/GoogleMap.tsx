
import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import GoogleMapsSetup from './GoogleMapsSetup';

interface MapProps {
  userLocation?: { lat: number; lng: number };
  employeeLocation?: { lat: number; lng: number };
  height?: string;
  onMapClick?: (e: google.maps.MapMouseEvent) => void;
}

const containerStyle = {
  width: '100%',
  borderRadius: '12px'
};

// Sofia, Bulgaria center by default
const defaultCenter = {
  lat: 42.698334,
  lng: 23.319941
};

// Default API key provided
const DEFAULT_API_KEY = 'AIzaSyCZUaQ2lpBKB7j5_BQMrPgXWAw2yLx9j20';

const MapComponent: React.FC<MapProps> = ({ 
  userLocation = defaultCenter, 
  employeeLocation,
  height = '300px',
  onMapClick
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [showSetup, setShowSetup] = useState(false);

  // Check for stored API key on component mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('google_maps_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    } else {
      // Use default API key if none is stored
      setApiKey(DEFAULT_API_KEY);
      localStorage.setItem('google_maps_api_key', DEFAULT_API_KEY);
    }
  }, []);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || DEFAULT_API_KEY
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleApiKeySet = (newApiKey: string) => {
    setApiKey(newApiKey);
    setShowSetup(false);
    // Force reload the page to reinitialize the maps with the new API key
    window.location.reload();
  };

  // Show setup only if there's an error and no API key
  if (loadError && !apiKey) {
    return (
      <div style={{ height }} className="w-full flex items-center justify-center p-4">
        <GoogleMapsSetup onApiKeySet={handleApiKeySet} />
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div 
        style={{ height }} 
        className="w-full bg-gray-200 animate-pulse rounded-lg flex items-center justify-center"
      >
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  return (
    <div style={{ height }}>
      <GoogleMap
        mapContainerStyle={{ ...containerStyle, height }}
        center={userLocation}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: true,
          fullscreenControl: true,
        }}
      >
        {/* User location marker */}
        <Marker
          position={userLocation}
          icon={{
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                <circle cx="20" cy="20" r="12" fill="#16a34a" stroke="white" stroke-width="3"/>
                <circle cx="20" cy="20" r="6" fill="white" />
                <circle cx="20" cy="20" r="3" fill="#16a34a" />
              </svg>
            `),
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 20),
          }}
          animation={google.maps.Animation.DROP}
          title="Your Location"
        />

        {/* Employee location marker */}
        {employeeLocation && (
          <Marker
            position={employeeLocation}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                  <circle cx="20" cy="20" r="12" fill="#0EA5E9" stroke="white" stroke-width="3"/>
                  <circle cx="20" cy="20" r="6" fill="white" />
                  <circle cx="20" cy="20" r="3" fill="#0EA5E9" />
                </svg>
              `),
              scaledSize: new google.maps.Size(40, 40),
              anchor: new google.maps.Point(20, 20),
            }}
            animation={google.maps.Animation.BOUNCE}
            title="Employee Location"
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
