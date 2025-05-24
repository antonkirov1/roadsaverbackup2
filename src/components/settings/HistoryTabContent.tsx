
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { History } from 'lucide-react'; // Icon for the heading, TabTrigger icon is separate

interface RequestItem {
  id: number;
  type: string;
  date: string;
  time: string;
  completedTime: string;
  status: string;
  user: string;
  employee: string;
}

interface HistoryTabContentProps {
  t: (key: string) => string;
  requestHistory: RequestItem[];
}

const HistoryTabContent: React.FC<HistoryTabContentProps> = ({ t, requestHistory }) => {
  return (
    <div className="mt-0">
      <div className="text-center py-4">
        <History className="h-12 w-12 mx-auto text-green-600 mb-4" />
        <h3 className="text-lg font-medium mb-2">{t('request-history')}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {t('requests-desc')}
        </p>
        
        <ScrollArea className="h-[250px] w-full">
          <div className="space-y-2 text-left px-2">
            {requestHistory.length > 0 ? (
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
    </div>
  );
};

export default HistoryTabContent;
