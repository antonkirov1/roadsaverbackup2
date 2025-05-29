
import React from 'react';
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { X } from 'lucide-react';
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
    <div className="space-y-3 pb-4">
      {/* X button for declined status */}
      {status === 'declined' && (
        <div className="flex justify-end -mt-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
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
          <div className="rounded-md bg-red-50 p-3">
            <p className="text-sm font-medium text-red-800">Request Declined</p>
            <p className="text-sm text-red-700 mt-1">{declineReason}</p>
          </div>
        )}
      </div>
      
      <GoogleMap 
        userLocation={userLocation} 
        employeeLocation={employeeLocation}
        height="180px" 
      />
      
      <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
        {status === 'declined' ? (
          <div className="flex gap-2 w-full">
            <Button 
              onClick={onContactSupport}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Contact Support
            </Button>
            <Button 
              onClick={onClose}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Close
            </Button>
          </div>
        ) : (
          <Button 
            onClick={onClose}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
          >
            {status === 'accepted' ? 'Close' : 'Cancel'}
          </Button>
        )}
      </DialogFooter>
    </div>
  );
};

export default ServiceRequestStatus;
