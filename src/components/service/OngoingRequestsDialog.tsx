
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';

interface OngoingRequestsDialogProps {
  open: boolean;
  onClose: () => void;
  onViewRequest: () => void;
  onReviewPriceQuote?: () => void;
}

const OngoingRequestsDialog: React.FC<OngoingRequestsDialogProps> = ({
  open,
  onClose,
  onViewRequest,
  onReviewPriceQuote
}) => {
  const { ongoingRequest, language } = useApp();
  const t = useTranslation(language);

  if (!ongoingRequest) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ongoing Requests</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-secondary rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-lg capitalize">
                {ongoingRequest.type.replace('-', ' ')}
              </h3>
              <Badge 
                variant={ongoingRequest.status === 'pending' ? 'secondary' : 'default'}
                className={
                  ongoingRequest.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800 border-yellow-200' 
                    : ''
                }
              >
                <Clock className="h-3 w-3 mr-1" />
                {ongoingRequest.status.charAt(0).toUpperCase() + ongoingRequest.status.slice(1)}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Started: {ongoingRequest.timestamp}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Location: {ongoingRequest.location}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button onClick={onViewRequest} className="w-full">
              View Details
            </Button>
            
            {/* Green Review Price Button */}
            {ongoingRequest.status === 'pending' && onReviewPriceQuote && (
              <Button 
                onClick={onReviewPriceQuote}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Review The Price And Decide
              </Button>
            )}
            
            <Button onClick={onClose} variant="outline" className="w-full">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OngoingRequestsDialog;
