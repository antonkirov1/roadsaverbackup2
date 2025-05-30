
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';

interface CompletedRequestsDialogProps {
  open: boolean;
  onClose: () => void;
}

const CompletedRequestsDialog: React.FC<CompletedRequestsDialogProps> = ({
  open,
  onClose
}) => {
  const { requestHistory, language } = useApp();
  const t = useTranslation(language);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t('completed-requests')}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {requestHistory.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No completed requests yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {requestHistory.map((request) => (
                <div key={request.id} className="bg-secondary rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold capitalize">
                      {request.type.replace('-', ' ')}
                    </h3>
                    <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{request.date} at {request.time}</span>
                    </div>
                    <div>
                      <span>Employee: {request.employee}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <Button onClick={onClose} variant="outline" className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompletedRequestsDialog;
