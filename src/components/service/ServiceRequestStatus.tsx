
import React from 'react';
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import GoogleMap from '@/components/GoogleMap';

interface ServiceRequestStatusProps {
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  declineReason: string;
  userLocation: { lat: number; lng: number };
  employeeLocation?: { lat: number; lng: number };
  onContactSupport: () => void;
  onClose: () => void;
}

const ServiceRequestStatus: React.FC<ServiceRequestStatusProps> = ({
  message,
  status,
  declineReason,
  userLocation,
  employeeLocation,
  onContactSupport,
  onClose
}) => {
  return (
    <div className="space-y-4">
      <div className="rounded-md p-3 bg-secondary">
        <p className="font-medium">Service Request:</p>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium">Status: 
          {status === 'pending' && (
            <span className="ml-2 text-amber-500 animate-pulse-subtle">Processing...</span>
          )}
          {status === 'accepted' && (
            <span className="ml-2 text-green-600">Accepted</span>
          )}
          {status === 'declined' && (
            <span className="ml-2 text-red-500">Declined</span>
          )}
        </p>
        
        {status === 'accepted' && (
          <p className="text-sm text-green-600">
            Your request was accepted. Help is on the way!
          </p>
        )}
        
        {status === 'declined' && (
          <div className="rounded-md bg-red-50 p-3 mt-2">
            <p className="text-sm font-medium text-red-800">Request Declined</p>
            <p className="text-sm text-red-700 mt-1">{declineReason}</p>
          </div>
        )}
      </div>
      
      <GoogleMap 
        userLocation={userLocation} 
        employeeLocation={employeeLocation}
        height="200px" 
      />
      
      <DialogFooter className="flex-col sm:flex-row gap-2">
        {status === 'declined' && (
          <Button 
            onClick={onContactSupport}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
          >
            Contact Support
          </Button>
        )}
        <Button 
          variant={status === 'declined' ? "outline" : "default"}
          onClick={onClose}
          className={`w-full sm:w-auto ${status !== 'declined' ? 'bg-green-600 hover:bg-green-700' : ''}`}
        >
          {status === 'accepted' ? 'Close' : 'Cancel'}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default ServiceRequestStatus;
