
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardsProps {
  onShowOngoingRequests: () => void;
  onShowCompletedRequests: () => void;
  t: (key: string) => string;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({
  onShowOngoingRequests,
  onShowCompletedRequests,
  t
}) => {
  return (
    <div className="grid sm:grid-cols-2 gap-4 mt-8">
      <Card className="hover:bg-secondary transition-colors cursor-pointer" onClick={onShowOngoingRequests}>
        <CardHeader>
          <CardTitle>{t('new-request')}</CardTitle>
          <CardDescription>{t('request-desc')}</CardDescription>
        </CardHeader>
        <CardContent>
          {t('select-service')}
        </CardContent>
      </Card>

      <Card className="hover:bg-secondary transition-colors cursor-pointer" onClick={onShowCompletedRequests}>
        <CardHeader>
          <CardTitle>{t('completed-requests')}</CardTitle>
          <CardDescription>{t('completed-requests-desc')}</CardDescription>
        </CardHeader>
        <CardContent>
          {t('view-completed-services')}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCards;
