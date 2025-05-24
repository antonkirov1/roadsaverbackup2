import React, { useState, useEffect } from 'react';
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
  BatteryCharging
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import { loadImage, removeBackground } from '@/utils/imageProcessing';

interface ServiceCardProps {
  type: 'flat-tyre' | 'out-of-fuel' | 'other-car-problems' | 'tow-truck' | 'emergency' | 'support' | 'car-battery';
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ type, onClick }) => {
  const { language } = useApp();
  const t = useTranslation(language);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [processedTowTruckIconUrl, setProcessedTowTruckIconUrl] = useState<string | null>(null);

  useEffect(() => {
    let objectUrlToRevoke: string | null = null;

    if (type === 'tow-truck') {
      // Update to the new image path provided by the user
      const originalIconPath = '/lovable-uploads/14fd5d8b-cd3a-4614-b664-52f591fae6f6.png';
      setProcessedTowTruckIconUrl(originalIconPath); // Show original immediately

      const processImage = async () => {
        try {
          const imgElement = await loadImage(originalIconPath);
          const blob = await removeBackground(imgElement);
          objectUrlToRevoke = URL.createObjectURL(blob);
          setProcessedTowTruckIconUrl(objectUrlToRevoke);
        } catch (error) {
          console.error('Failed to process tow truck icon, using original:', error);
          // Already set to original, so no change needed on error if we want to keep showing original
        }
      };
      processImage();
    }

    return () => {
      if (objectUrlToRevoke) {
        URL.revokeObjectURL(objectUrlToRevoke);
      }
    };
  }, [type]);
  
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
        animationClass = "animate-deflate-wobble";
        return { 
          icon: <Disc3 className={`${iconSizeClass} ${animationClass}`} />, 
          title: t('flat-tyre'),
          description: t('flat-tyre-desc')
        };
      case 'out-of-fuel':
        animationClass = "animate-fuel-sputter-flash";
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
        animationClass = "animate-truck-pull";
        // Filter to turn black image to green and increase contrast for sharpness
        const colorizeAndSharpenFilter = 'brightness(0) saturate(100%) invert(37%) sepia(61%) saturate(1358%) hue-rotate(95deg) brightness(99%) contrast(115%)';
        // Prepend a drop-shadow filter with increased spread for thicker lines.
        const combinedFilter = `drop-shadow(0px 0px 0.75px black) ${colorizeAndSharpenFilter}`;
        const greenFilterStyle = { filter: combinedFilter };
        
        const iconSrc = processedTowTruckIconUrl || '/lovable-uploads/14fd5d8b-cd3a-4614-b664-52f591fae6f6.png';
        
        return { 
          icon: <img 
                  src={iconSrc} 
                  alt={t('tow-truck')} 
                  className={`${iconSizeClass} ${animationClass}`} 
                  style={greenFilterStyle} 
                  onError={() => {
                    if (processedTowTruckIconUrl !== '/lovable-uploads/14fd5d8b-cd3a-4614-b664-52f591fae6f6.png') {
                         setProcessedTowTruckIconUrl('/lovable-uploads/14fd5d8b-cd3a-4614-b664-52f591fae6f6.png');
                    }
                  }}
                />, 
          title: t('tow-truck'),
          description: t('tow-truck-desc')
        };
      case 'emergency':
        animationClass = "animate-emergency-alert-flash";
        return { 
          icon: <AlertTriangle className={`${iconSizeClass} ${animationClass} text-red-500`} />,
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
        className="group p-3 sm:p-4 hover:bg-secondary/70 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[120px] sm:min-h-[140px]"
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
