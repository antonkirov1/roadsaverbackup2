
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardServicesProps {
  onServiceSelect: (service: string) => void;
  t: (key: string) => string;
}

const DashboardServices: React.FC<DashboardServicesProps> = ({
  onServiceSelect,
  t
}) => {
  const services = [
    'flat-tyre',
    'out-of-fuel',
    'car-battery',
    'tow-truck',
    'other-car-problems',
    'support'
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {services.map((service) => (
        <Card 
          key={service}
          className="hover:bg-secondary transition-colors cursor-pointer" 
          onClick={() => onServiceSelect(service)}
        >
          <CardHeader>
            <CardTitle>{t(service)}</CardTitle>
            <CardDescription>{t(`${service}-desc`)}</CardDescription>
          </CardHeader>
          <CardContent>
            {t(`${service}-content`)}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardServices;
