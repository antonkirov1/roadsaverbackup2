import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  CarFront,
  Fuel, 
  Wrench, 
  Car, 
  Phone, 
  AlertTriangle
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';

interface ServiceCardProps {
  type: 'flat-tyre' | 'out-of-fuel' | 'other-car-problems' | 'tow-truck' | 'emergency' | 'support' | 'car-battery';
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ type, onClick }) => {
  const { language } = useApp();
  const t = useTranslation(language);
  
  const getIconAndTitle = () => {
    switch (type) {
      case 'flat-tyre':
        return { 
          icon: <CarFront className="h-10 w-10" />, 
          title: t('flat-tyre'),
          description: t('flat-tyre-desc')
        };
      case 'out-of-fuel':
        return { 
          icon: <Fuel className="h-10 w-10" />, 
          title: t('out-of-fuel'),
          description: t('out-of-fuel-desc')
        };
      case 'other-car-problems':
        return { 
          icon: <Wrench className="h-10 w-10" />, 
          title: t('other-car-problems'),
          description: t('other-car-problems-desc')
        };
      case 'car-battery':
        return { 
          icon: (
            <svg
              className="h-10 w-10"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <rect x="3" y="8" width="18" height="12" rx="2" />
              <line x1="7" y1="8" x2="7" y2="6" />
              <line x1="17" y1="8" x2="17" y2="6" />
              <line x1="7" y1="12" x2="17" y2="12" />
              <line x1="7" y1="16" x2="17" y2="16" />
            </svg>
          ),
          title: language === 'bg' ? 'Проблеми с акумулатора' : t('car-battery'),
          description: t('car-battery-desc')
        };
      case 'tow-truck':
        return { 
          icon: <Car className="h-10 w-10" />, 
          title: t('tow-truck'),
          description: t('tow-truck-desc')
        };
      case 'emergency':
        return { 
          icon: <AlertTriangle className="h-10 w-10" />, 
          title: t('emergency'),
          description: t('emergency-desc')
        };
      case 'support':
        return { 
          icon: <Phone className="h-10 w-10" />, 
          title: t('support'),
          description: t('support-desc')
        };
      default:
        return { 
          icon: <Wrench className="h-10 w-10" />, 
          title: t('service'),
          description: t('service-desc')
        };
    }
  };

  const { icon, title, description } = getIconAndTitle();

  return (
    <Card 
      className="p-4 hover:bg-secondary/70 transition-colors cursor-pointer flex flex-col items-center"
      onClick={onClick}
    >
      <div className="bg-green-600/10 p-4 rounded-full mb-3 text-green-600">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-1 text-center">{title}</h3>
      <p className="text-sm text-muted-foreground text-center">{description}</p>
    </Card>
  );
};

export default ServiceCard;