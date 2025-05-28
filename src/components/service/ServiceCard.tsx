import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import ContactDialog from './ContactDialog';
import { ServiceType, getServiceIconAndTitle, processBackgroundRemoval } from './serviceIcons';
interface ServiceCardProps {
  type: ServiceType;
  onClick: () => void;
}
const ServiceCard: React.FC<ServiceCardProps> = ({
  type,
  onClick
}) => {
  const {
    language
  } = useApp();
  const t = useTranslation(language);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [processedTowTruckIconUrl, setProcessedTowTruckIconUrl] = useState<string | null>(null);
  useEffect(() => {
    let objectUrlToRevoke: string | null = null;
    if (type === 'tow-truck') {
      objectUrlToRevoke = processBackgroundRemoval(type, setProcessedTowTruckIconUrl) as unknown as string;
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
  const iconSizeClass = "h-8 w-8 sm:h-10 sm:w-10";
  const {
    icon,
    title,
    description
  } = getServiceIconAndTitle(type, t, processedTowTruckIconUrl, iconSizeClass);
  return <>
      <Card className="group p-3 sm:p-4 hover:bg-secondary/70 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[120px] sm:min-h-[140px]" onClick={handleClick}>
        <div className="bg-green-600/10 p-3 sm:p-4 mb-2 sm:mb-3 text-green-600 transition-transform duration-200 group-hover:scale-110 rounded-sm">
          {icon}
        </div>
        <h3 className="text-sm sm:text-lg font-semibold mb-1 text-center leading-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground text-center leading-tight">{description}</p>
      </Card>

      <ContactDialog open={showContactDialog} onOpenChange={setShowContactDialog} onEmailContact={handleEmailContact} onPhoneContact={handlePhoneContact} contactOptionsText={t('contact-options')} supportDescText={t('support-desc')} writeEmailText={t('write-email')} giveCallText={t('give-call')} />
    </>;
};
export default ServiceCard;