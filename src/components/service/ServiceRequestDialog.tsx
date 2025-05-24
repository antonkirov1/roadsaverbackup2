
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ServiceRequestDialogProps {
  type: 'flat-tyre' | 'out-of-fuel' | 'other-car-problems' | 'tow-truck' | 'emergency' | 'support' | 'car-battery';
  open: boolean;
  onClose: () => void;
  showRealTimeUpdate: boolean;
  children: React.ReactNode;
}

const serviceTitles = {
  'flat-tyre': 'Flat Tyre Assistance',
  'out-of-fuel': 'Out of Fuel',
  'car-battery': 'Car Battery Issues',
  'tow-truck': 'Request Tow Truck',
  'other-car-problems': 'Report Other Car Problems',
  'emergency': 'Emergency Assistance',
  'support': 'Contact Support',
};

const ServiceRequestDialog: React.FC<ServiceRequestDialogProps> = ({
  type,
  open,
  onClose,
  showRealTimeUpdate,
  children
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{serviceTitles[type]}</DialogTitle>
          <DialogDescription>
            {showRealTimeUpdate 
              ? "Real-time status of your request" 
              : "Submit your request for assistance"}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ServiceRequestDialog;
