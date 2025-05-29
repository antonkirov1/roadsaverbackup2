
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import { Clock, MapPin } from 'lucide-react';

interface OngoingRequestsDialogProps {
  open: boolean;
  onClose: () => void;
}

const OngoingRequestsDialog: React.FC<OngoingRequestsDialogProps> = ({ open, onClose }) => {
  const { language } = useApp();
  const t = useTranslation(language);

  // Mock data for ongoing requests - in a real app this would come from state/API
  const ongoingRequests = [
    {
      id: '1',
      type: 'flat-tyre',
      status: 'accepted',
      timestamp: '2024-01-15 14:30',
      location: 'Sofia Center, Bulgaria'
    },
    {
      id: '2', 
      type: 'out-of-fuel',
      status: 'pending',
      timestamp: '2024-01-15 15:45',
      location: 'Vitosha Boulevard, Sofia'
    }
  ];

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
          {ongoingRequests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>{t('no-ongoing-requests')}</p>
            </div>
          ) : (
            ongoingRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{t(request.type)}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    request.status === 'accepted' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {t(request.status)}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {request.timestamp}
                </div>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {request.location}
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OngoingRequestsDialog;
