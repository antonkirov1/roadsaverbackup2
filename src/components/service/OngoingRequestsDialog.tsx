
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import { Clock, MapPin, Phone } from 'lucide-react';

interface OngoingRequestsDialogProps {
  open: boolean;
  onClose: () => void;
}

const OngoingRequestsDialog: React.FC<OngoingRequestsDialogProps> = ({ open, onClose }) => {
  const { language, ongoingRequest } = useApp();
  const t = useTranslation(language);

  const handleCallEmployee = () => {
    if (ongoingRequest?.employeePhone) {
      window.location.href = `tel:${ongoingRequest.employeePhone}`;
    }
  };

  const openEmployeeLocationDialog = () => {
    // This will open a new dialog showing employee location on map
    console.log('Opening employee location dialog');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {t('ongoing-requests')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {!ongoingRequest ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>{t('no-ongoing-requests')}</p>
            </div>
          ) : (
            <div className="border rounded-lg p-4 space-y-3 cursor-pointer hover:bg-gray-50" onClick={openEmployeeLocationDialog}>
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{t(ongoingRequest.type)}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  ongoingRequest.status === 'accepted' 
                    ? 'bg-green-100 text-green-800' 
                    : ongoingRequest.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {t(ongoingRequest.status)}
                </span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                {ongoingRequest.timestamp}
              </div>
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {ongoingRequest.location}
              </div>

              {ongoingRequest.status === 'accepted' && ongoingRequest.employeeName && (
                <div className="pt-2 border-t">
                  <p className="text-sm font-medium text-green-600 mb-2">
                    {t('employee-assigned')}: {ongoingRequest.employeeName}
                  </p>
                  {ongoingRequest.employeePhone && (
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCallEmployee();
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      size="sm"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      {t('call-employee')}
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OngoingRequestsDialog;
