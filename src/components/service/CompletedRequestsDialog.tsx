
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
          <DialogTitle>Completed Requests</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {requestHistory.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No completed requests yet.
            </p>
          ) : (
            <div className="space-y-3">
              {requestHistory.map((request) => (
                <div key={request.id} className="bg-secondary rounded-lg p-3">
                  <div className="font-medium capitalize">
                    {request.type.replace('-', ' ')}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {request.date} at {request.time}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Employee: {request.employee}
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
