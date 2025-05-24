
import React from 'react';
import ServiceRequestDialog from './ServiceRequestDialog';
import ServiceRequestForm from './ServiceRequestForm';
import ServiceRequestStatus from './ServiceRequestStatus';
import { useServiceRequest } from './ServiceRequestLogic';

interface ServiceRequestProps {
  type: 'flat-tyre' | 'out-of-fuel' | 'other-car-problems' | 'tow-truck' | 'emergency' | 'support' | 'car-battery';
  open: boolean;
  onClose: () => void;
  userLocation: { lat: number; lng: number };
}

const ServiceRequest: React.FC<ServiceRequestProps> = ({ type, open, onClose, userLocation }) => {
  const {
    message,
    setMessage,
    isSubmitting,
    showRealTimeUpdate,
    employeeLocation,
    status,
    declineReason,
    handleSubmit,
    handleContactSupport
  } = useServiceRequest(type, userLocation);

  const handleClose = () => {
    if (status === 'pending') {
      if (window.confirm("Are you sure you want to cancel your request?")) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <ServiceRequestDialog
      type={type}
      open={open}
      onClose={handleClose}
      showRealTimeUpdate={showRealTimeUpdate}
    >
      {!showRealTimeUpdate ? (
        <ServiceRequestForm
          type={type}
          message={message}
          onMessageChange={setMessage}
          userLocation={userLocation}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      ) : (
        <ServiceRequestStatus
          message={message}
          status={status}
          declineReason={declineReason}
          userLocation={userLocation}
          employeeLocation={employeeLocation}
          onContactSupport={handleContactSupport}
          onClose={onClose}
        />
      )}
    </ServiceRequestDialog>
  );
};

export default ServiceRequest;
