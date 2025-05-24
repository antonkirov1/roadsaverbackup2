
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  CarFront,
  Fuel, 
  Wrench, 
  Car, 
  Phone, 
  AlertTriangle,
  Mail,
  Globe
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
  const [showContactDialog, setShowContactDialog] = useState(false);
  
  const handleClick = () => {
    if (type === 'support') {
      setShowContactDialog(true);
    } else {
      onClick();
    }
  };

  const handleEmailContact = () => {
    window.location.href = 'mailto:roadsaverapp@gmail.com';
    setShowContactDialog(false);
  };

  const handlePhoneContact = () => {
    window.location.href = 'tel:+359888123456';
    setShowContactDialog(false);
  };
  
  const getIconAndTitle = () => {
    switch (type) {
      case 'flat-tyre':
        return { 
          icon: (
            <svg className="h-8 w-8 sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="8"/>
              <path d="M12 6v12"/>
              <path d="M6 12h12"/>
              <path d="M16 8l-8 8"/>
              <path d="M8 8l8 8"/>
            </svg>
          ), 
          title: t('flat-tyre'),
          description: t('flat-tyre-desc')
        };
      case 'out-of-fuel':
        return { 
          icon: <Fuel className="h-8 w-8 sm:h-10 sm:w-10" />, 
          title: t('out-of-fuel'),
          description: t('out-of-fuel-desc')
        };
      case 'other-car-problems':
        return { 
          icon: <Wrench className="h-8 w-8 sm:h-10 sm:w-10" />, 
          title: t('other-car-problems'),
          description: t('other-car-problems-desc')
        };
      case 'car-battery':
        return { 
          icon: (
            <svg
              className="h-8 w-8 sm:h-10 sm:w-10"
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
          title: t('car-battery'),
          description: t('car-battery-desc')
        };
      case 'tow-truck':
        return { 
          icon: (
            <svg className="h-8 w-8 sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
              <circle cx="7" cy="18" r="2"/>
              <path d="M15 18H9"/>
              <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
              <circle cx="17" cy="18" r="2"/>
              <path d="M8 8h6"/>
              <path d="M8 12h4"/>
            </svg>
          ), 
          title: t('tow-truck'),
          description: t('tow-truck-desc')
        };
      case 'emergency':
        return { 
          icon: <AlertTriangle className="h-8 w-8 sm:h-10 sm:w-10" />, 
          title: t('emergency'),
          description: t('emergency-desc')
        };
      case 'support':
        return { 
          icon: <Phone className="h-8 w-8 sm:h-10 sm:w-10" />, 
          title: t('support'),
          description: t('support-desc')
        };
      default:
        return { 
          icon: <Wrench className="h-8 w-8 sm:h-10 sm:w-10" />, 
          title: t('service'),
          description: t('service-desc')
        };
    }
  };

  const { icon, title, description } = getIconAndTitle();

  return (
    <>
      <Card 
        className="p-3 sm:p-4 hover:bg-secondary/70 transition-colors cursor-pointer flex flex-col items-center min-h-[120px] sm:min-h-[140px]"
        onClick={handleClick}
      >
        <div className="bg-green-600/10 p-3 sm:p-4 rounded-full mb-2 sm:mb-3 text-green-600">
          {icon}
        </div>
        <h3 className="text-sm sm:text-lg font-semibold mb-1 text-center leading-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground text-center leading-tight">{description}</p>
      </Card>

      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>{t('contact-options')}</DialogTitle>
            <DialogDescription>
              {t('support-desc')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Button 
              onClick={handleEmailContact}
              className="w-full justify-start bg-green-600 hover:bg-green-700"
            >
              <Mail className="h-4 w-4 mr-2" />
              {t('write-email')}
            </Button>
            <Button 
              onClick={handlePhoneContact}
              variant="outline"
              className="w-full justify-start"
            >
              <Phone className="h-4 w-4 mr-2" />
              {t('give-call')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceCard;
