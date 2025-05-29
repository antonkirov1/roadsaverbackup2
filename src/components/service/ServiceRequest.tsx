
import React, { useState } from 'react';
import ServiceRequestDialog from './ServiceRequestDialog';
import ServiceRequestForm from './ServiceRequestForm';
import ServiceRequestStatus from './ServiceRequestStatus';
import { useServiceRequest } from './ServiceRequestLogic';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';

interface ServiceRequestProps {
  type: 'flat-tyre' | 'out-of-fuel' | 'other-car-problems' | 'tow-truck' | 'emergency' | 'support' | 'car-battery';
  open: boolean;
  onClose: () => void;
  userLocation: { lat: number; lng: number };
}

const ServiceRequest: React.FC<ServiceRequestProps> = ({ type, open, onClose, userLocation }) => {
  const { language } = useApp();
  const t = useTranslation(language);
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

  const [showCancelConfirmDialog, setShowCancelConfirmDialog] = useState(false);

  const handleAttemptClose = () => {
    // Only show confirmation dialog for pending requests
    if (status === 'pending') {
      setShowCancelConfirmDialog(true);
    } else {
      onClose(); // Close directly for accepted, declined, or initial state
    }
  };

  const confirmCancelRequest = () => {
    onClose(); 
    setShowCancelConfirmDialog(false);
  };

  return (
    <>
      <ServiceRequestDialog
        type={type}
        open={open}
        onClose={handleAttemptClose}
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
            onCancel={handleAttemptClose}
          />
        ) : (
          <ServiceRequestStatus
            message={message}
            status={status}
            declineReason={declineReason}
            userLocation={userLocation}
            employeeLocation={employeeLocation}
            onContactSupport={handleContactSupport}
            onClose={handleAttemptClose}
          />
        )}
      </ServiceRequestDialog>

      {showCancelConfirmDialog && (
        <AlertDialog open={showCancelConfirmDialog} onOpenChange={setShowCancelConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('confirm-cancellation-title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('confirm-cancellation-desc')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowCancelConfirmDialog(false)}>{t('no')}</AlertDialogCancel>
              <AlertDialogAction onClick={confirmCancelRequest} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                {t('yes-cancel')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default ServiceRequest;
