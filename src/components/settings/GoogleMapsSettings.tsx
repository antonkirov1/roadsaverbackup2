
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Key } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const GoogleMapsSettings: React.FC = () => {
  const hasApiKey = !!localStorage.getItem('google_maps_api_key');

  const handleResetApiKey = () => {
    localStorage.removeItem('google_maps_api_key');
    toast({
      title: "API Key Reset",
      description: "Google Maps API key has been removed. You'll be prompted to enter it again when viewing maps."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Google Maps
        </CardTitle>
        <CardDescription>
          Manage your Google Maps integration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">API Key Status</p>
            <p className="text-xs text-muted-foreground">
              {hasApiKey ? 'API key is configured' : 'No API key configured'}
            </p>
          </div>
          <div className={`w-3 h-3 rounded-full ${hasApiKey ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>
        
        {hasApiKey && (
          <Button 
            variant="outline" 
            onClick={handleResetApiKey}
            className="w-full"
          >
            <Key className="h-4 w-4 mr-2" />
            Reset API Key
          </Button>
        )}
        
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700">
            <strong>Need an API key?</strong><br />
            Visit Google Cloud Console to create and configure your Maps JavaScript API key.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleMapsSettings;
