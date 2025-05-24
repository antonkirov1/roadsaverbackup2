
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Fuel, 
  Wrench, 
  Phone, 
  AlertTriangle,
  Mail,
  Disc3,
  BatteryCharging,
  Truck
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
    const iconSizeClass = "h-8 w-8 sm:h-10 sm:w-10";
    let animationClass = "";

    switch (type) {
      case 'flat-tyre':
        animationClass = "animate-deflate-pulse";
        return { 
          icon: <Disc3 className={`${iconSizeClass} ${animationClass}`} />, 
          title: t('flat-tyre'),
          description: t('flat-tyre-desc')
        };
      case 'out-of-fuel':
        animationClass = "animate-fuel-flicker";
        return { 
          icon: <Fuel className={`${iconSizeClass} ${animationClass}`} />, 
          title: t('out-of-fuel'),
          description: t('out-of-fuel-desc')
        };
      case 'other-car-problems':
        animationClass = "animate-wrench-turn";
        return { 
          icon: <Wrench className={`${iconSizeClass} ${animationClass}`} />, 
          title: t('other-car-problems'),
          description: t('other-car-problems-desc')
        };
      case 'car-battery':
        animationClass = "animate-battery-flash-red";
        return { 
          icon: <BatteryCharging className={`${iconSizeClass} ${animationClass}`} />,
          title: t('car-battery'),
          description: t('car-battery-desc')
        };
      case 'tow-truck':
        animationClass = "animate-truck-rumble";
        return { 
          icon: <Truck className={`${iconSizeClass} ${animationClass}`} />, 
          title: t('tow-truck'),
          description: t('tow-truck-desc')
        };
      case 'emergency':
        animationClass = "animate-pulse"; // Using standard pulse for emergency
        return { 
          icon: <AlertTriangle className={`${iconSizeClass} ${animationClass} text-red-500`} />, // Added text-red-500 for emergency icon
          title: t('emergency'),
          description: t('emergency-desc')
        };
      case 'support':
        animationClass = "animate-phone-ring";
        return { 
          icon: <Phone className={`${iconSizeClass} ${animationClass}`} />, 
          title: t('support'),
          description: t('support-desc')
        };
      default:
        return { 
          icon: <Wrench className={iconSizeClass} />, 
          title: t('service'),
          description: t('service-desc')
        };
    }
  };

  const { icon, title, description } = getIconAndTitle();

  return (
    <>
      <Card 
        className="group p-3 sm:p-4 hover:bg-secondary/70 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[120px] sm:min-h-[140px]" // Added justify-center
        onClick={handleClick}
      >
        <div className="bg-green-600/10 p-3 sm:p-4 rounded-full mb-2 sm:mb-3 text-green-600 transition-transform duration-200 group-hover:scale-110">
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
