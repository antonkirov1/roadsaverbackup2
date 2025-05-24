
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
            <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
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
          title: t('car-battery'),
          description: t('car-battery-desc')
        };
      case 'tow-truck':
        return { 
          icon: (
            <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="2" y="8" width="10" height="6" rx="1"/>
              <rect x="14" y="6" width="8" height="10" rx="1"/>
              <circle cx="6" cy="18" r="2"/>
              <circle cx="18" cy="18" r="2"/>
              <path d="M8 18h6"/>
              <path d="M12 8v2"/>
              <path d="M16 10h2"/>
            </svg>
          ), 
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
    <>
      <Card 
        className="p-4 hover:bg-secondary/70 transition-colors cursor-pointer flex flex-col items-center"
        onClick={handleClick}
      >
        <div className="bg-green-600/10 p-4 rounded-full mb-3 text-green-600">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-1 text-center">{title}</h3>
        <p className="text-sm text-muted-foreground text-center">{description}</p>
      </Card>

      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
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
