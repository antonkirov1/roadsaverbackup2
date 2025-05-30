import React, { useState } from 'react';
import ServiceRequestDialog from './ServiceRequestDialog';
import ServiceRequestForm from './ServiceRequestForm';
import ServiceRequestStatus from './ServiceRequestStatus';
import PriceQuoteDialog from './PriceQuoteDialog';
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
    showPriceQuote,
    setShowPriceQuote,
    priceQuote,
    employeeLocation,
    status,
    declineReason,
    handleSubmit,
    handleAcceptQuote,
    handleDeclineQuote,
    handleCancelRequest,
    handleContactSupport
  } = useServiceRequest(type, userLocation);

  const [showCancelConfirmDialog, setShowCancelConfirmDialog] = useState(false);
  const [hasDeclinedOnce, setHasDeclinedOnce] = useState(false);

  const handleAttemptClose = () => {
    // If price quote is showing, just close the dialog but keep the request in price quote state
    if (showPriceQuote) {
      onClose();
      return;
    }
    
    // Only show confirmation dialog for pending requests (not in price quote state)
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

  const handleDecline = () => {
    if (!hasDeclinedOnce) {
      setHasDeclinedOnce(true);
      // Don't close the dialog yet, wait for potential revision
    } else {
      handleDeclineQuote();
    }
  };

  const handlePriceQuoteClose = () => {
    // Close the price quote dialog but keep the ongoing request active in price quote state
    // When user reopens from ongoing requests, they'll see the price quote again
    onClose();
  };

  return (
    <>
      <ServiceRequestDialog
        type={type}
        open={open && !showPriceQuote}
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

      <PriceQuoteDialog
        open={showPriceQuote}
        onClose={handlePriceQuoteClose}
        serviceType={type}
        priceQuote={priceQuote}
        onAccept={handleAcceptQuote}
        onDecline={handleDecline}
        onCancelRequest={handleCancelRequest}
        hasDeclinedOnce={hasDeclinedOnce}
      />

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
