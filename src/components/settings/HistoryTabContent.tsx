
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { History as HistoryIcon } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

interface HistoryTabContentProps {
  t: (key: string) => string;
}

const HistoryTabContent: React.FC<HistoryTabContentProps> = ({ t }) => {
  const { requestHistory } = useApp();

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="text-center py-4 flex-shrink-0">
        <HistoryIcon className="h-12 w-12 mx-auto text-green-600 mb-2" />
        <h3 className="text-lg font-medium mb-1">{t('request-history')}</h3>
        <p className="text-sm text-muted-foreground mb-2">
          {t('requests-desc')}
        </p>
      </div>
      
      <ScrollArea className="flex-grow">
        <div className="space-y-2 pb-4">
          {requestHistory && requestHistory.length > 0 ? (
            requestHistory.map((request) => (
              <div key={request.id} className="p-3 bg-secondary rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{t(request.type)}</span>
                  <span className="text-sm text-green-600">{t(request.status)}</span>
                </div>
                <p className="text-sm text-muted-foreground">{request.date} - {request.time}</p>
                <p className="text-sm text-muted-foreground">{t('completed-time')}: {request.completedTime}</p>
                <p className="text-sm text-muted-foreground">{t('user')}: {request.user}</p>
                <p className="text-sm text-muted-foreground">{t('employee')}: {request.employee}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground">{t('no-requests')}</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default HistoryTabContent;
