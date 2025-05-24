
import React from 'react';
import { 
  Fuel, 
  Wrench, 
  Phone, 
  AlertTriangle,
  Mail,
  Disc3,
  BatteryCharging
} from 'lucide-react';
import { loadImage, removeBackground } from '@/utils/imageProcessing';

export type ServiceType = 'flat-tyre' | 'out-of-fuel' | 'other-car-problems' | 'tow-truck' | 'emergency' | 'support' | 'car-battery';

interface ServiceIconData {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const useTowTruckIcon = (processedTowTruckIconUrl: string | null) => {
  // Filter to turn black image to green and increase contrast for sharpness
  const colorizeAndSharpenFilter = 'brightness(0) saturate(100%) invert(37%) sepia(61%) saturate(1358%) hue-rotate(95deg) brightness(99%) contrast(115%)';
  // Prepend a drop-shadow filter with increased spread for thicker lines.
  const combinedFilter = `drop-shadow(0px 0px 0.75px black) ${colorizeAndSharpenFilter}`;
  const greenFilterStyle = { filter: combinedFilter };
  
  const iconSrc = processedTowTruckIconUrl || '/lovable-uploads/14fd5d8b-cd3a-4614-b664-52f591fae6f6.png';
  
  return {
    iconSrc,
    greenFilterStyle
  };
};

export const processBackgroundRemoval = async (type: ServiceType, callback: (url: string | null) => void) => {
  if (type === 'tow-truck') {
    const originalIconPath = '/lovable-uploads/14fd5d8b-cd3a-4614-b664-52f591fae6f6.png';
    callback(originalIconPath); // Show original immediately

    try {
      const imgElement = await loadImage(originalIconPath);
      const blob = await removeBackground(imgElement);
      const objectUrl = URL.createObjectURL(blob);
      callback(objectUrl);
      return objectUrl;
    } catch (error) {
      console.error('Failed to process tow truck icon, using original:', error);
      return null;
    }
  }
  return null;
};

export const getServiceIconAndTitle = (
  type: ServiceType, 
  t: (key: string) => string, 
  processedTowTruckIconUrl: string | null,
  iconSizeClass: string
): ServiceIconData => {
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
      const { iconSrc, greenFilterStyle } = useTowTruckIcon(processedTowTruckIconUrl);
      
      return { 
        icon: <img 
                src={iconSrc} 
                alt={t('tow-truck')} 
                className={`${iconSizeClass} ${animationClass}`} 
                style={greenFilterStyle} 
                onError={() => {
                  // If processing failed, fall back to the original
                  if (processedTowTruckIconUrl !== '/lovable-uploads/14fd5d8b-cd3a-4614-b664-52f591fae6f6.png') {
                    // This callback would need to be passed in or handled differently
                    console.error('Error loading processed image, falling back to original');
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

export const ContactDialogIcons = {
  email: <Mail className="h-4 w-4 mr-2" />,
  phone: <Phone className="h-4 w-4 mr-2" />
};
