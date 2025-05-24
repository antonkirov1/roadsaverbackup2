
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state
import { AlertCircle, History } from 'lucide-react';
import { RequestHistoryItem } from '@/types/history';
import { useQuery } from '@tanstack/react-query';
import { fetchRequestHistory } from '@/utils/api';

interface HistoryTabContentProps {
  t: (key: string) => string;
}

const HistoryTabContent: React.FC<HistoryTabContentProps> = ({ t }) => {
  const { 
    data: requestHistory, 
    isLoading, 
    error 
  } = useQuery<RequestHistoryItem[], Error>({
    queryKey: ['requestHistory'], 
    queryFn: fetchRequestHistory
  });

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
            {isLoading && (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="p-3 bg-secondary rounded-lg space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              ))
            )}

            {error && (
              <div className="flex flex-col items-center justify-center text-destructive p-4">
                <AlertCircle className="h-8 w-8 mb-2" />
                <p>{t('error-loading-history') || 'Error loading history. Please try again.'}</p>
                <p className="text-xs">{error.message}</p>
              </div>
            )}

            {!isLoading && !error && requestHistory && requestHistory.length > 0 ? (
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
            ) : null}

            {!isLoading && !error && (!requestHistory || requestHistory.length === 0) && (
              <p className="text-center text-muted-foreground">{t('no-requests')}</p>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default HistoryTabContent;
