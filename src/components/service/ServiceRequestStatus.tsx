
import React from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import { MapPin, Clock, CheckCircle, XCircle, Phone } from 'lucide-react';

interface ServiceRequestStatusProps {
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  declineReason: string;
  userLocation: { lat: number; lng: number };
  employeeLocation?: { lat: number; lng: number };
  onContactSupport: () => void;
  onClose: () => void;
  onReviewPriceQuote?: () => void;
  hasPriceQuote?: boolean;
}

const ServiceRequestStatus: React.FC<ServiceRequestStatusProps> = ({
  message,
  status,
  declineReason,
  userLocation,
  employeeLocation,
  onContactSupport,
  onClose,
  onReviewPriceQuote,
  hasPriceQuote = false
}) => {
  const { language } = useApp();
  const t = useTranslation(language);

  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return <Clock className="h-6 w-6 text-yellow-600" />;
      case 'accepted':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'declined':
        return <XCircle className="h-6 w-6 text-red-600" />;
      default:
        return <Clock className="h-6 w-6 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'declined':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Service Request Status</h2>
        <div className="flex items-center justify-center gap-3">
          {getStatusIcon()}
          <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor()}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>
        
        {/* Add Review Price Quote button for pending requests with price quotes */}
        {status === 'pending' && hasPriceQuote && onReviewPriceQuote && (
          <div className="mt-4">
            <Button 
              onClick={onReviewPriceQuote}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
            >
              Review the price and decide
            </Button>
          </div>
        )}
      </div>

      {/* Request Details */}
      <div className="bg-secondary rounded-lg p-4">
        <h3 className="font-semibold mb-2">Request Details</h3>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>

      {/* Location Information */}
      <div className="bg-secondary rounded-lg p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Location Information
        </h3>
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium">Your Location:</p>
            <p className="text-sm text-muted-foreground">
              {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
            </p>
          </div>
          {employeeLocation && (
            <div>
              <p className="text-sm font-medium">Employee Location:</p>
              <p className="text-sm text-muted-foreground">
                {employeeLocation.lat.toFixed(4)}, {employeeLocation.lng.toFixed(4)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Status-specific content */}
      {status === 'declined' && declineReason && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-semibold text-red-800 mb-2">Decline Reason</h3>
          <p className="text-sm text-red-700">{declineReason}</p>
        </div>
      )}

      {status === 'accepted' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">Service Accepted</h3>
          <p className="text-sm text-green-700">
            Your request has been accepted! The employee will contact you shortly.
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <Button 
          onClick={onContactSupport}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Phone className="h-4 w-4" />
          Contact Support
        </Button>
        
        <Button 
          onClick={onClose}
          variant="secondary"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default ServiceRequestStatus;
