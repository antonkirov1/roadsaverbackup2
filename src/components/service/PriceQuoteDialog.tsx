
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';

interface PriceQuoteDialogProps {
  open: boolean;
  onClose: () => void;
  serviceType: string;
  priceQuote: number;
  onAccept: () => void;
  onDecline: () => void;
  onCancelRequest: () => void;
}

const PriceQuoteDialog: React.FC<PriceQuoteDialogProps> = ({
  open,
  onClose,
  serviceType,
  priceQuote,
  onAccept,
  onDecline,
  onCancelRequest
}) => {
  const { language } = useApp();
  const t = useTranslation(language);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleCancelRequest = () => {
    setShowCancelConfirm(true);
  };

  const confirmCancel = () => {
    onCancelRequest();
    setShowCancelConfirm(false);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Price Quote Received</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="rounded-md bg-secondary p-3">
              <h3 className="font-medium mb-2">Service Request</h3>
              <p className="text-sm">{t(serviceType)}</p>
            </div>
            
            <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-3">
              <h3 className="font-medium mb-2">Price Quote</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {priceQuote.toFixed(2)} BGN
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 mt-6">
            <Button 
              onClick={onAccept}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Accept
            </Button>
            <Button 
              onClick={onDecline}
              variant="outline"
              className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
            >
              Decline
            </Button>
            <Button 
              onClick={handleCancelRequest}
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50"
            >
              Cancel Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Request?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your service request?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowCancelConfirm(false)}>
              No, don't cancel my request
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmCancel}
              className="bg-red-600 hover:bg-red-700"
            >
              Yes, I am sure
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PriceQuoteDialog;
