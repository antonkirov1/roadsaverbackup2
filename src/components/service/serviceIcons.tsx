
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
  // Improved filter to make the icon green and more visible
  const colorizeAndSharpenFilter = 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)';
  const combinedFilter = `drop-shadow(1px 1px 1px rgba(0,0,0,0.2)) ${colorizeAndSharpenFilter}`;
  const greenFilterStyle = { filter: combinedFilter };
  
  // Use the correct path for the new tow truck icon
  const iconSrc = processedTowTruckIconUrl || '/lovable-uploads/28a97b53-1b48-4014-8db6-7628e5299a5e.png'; 
  
  return {
    iconSrc,
    greenFilterStyle
  };
};

export const processBackgroundRemoval = async (type: ServiceType, callback: (url: string | null) => void) => {
  if (type === 'tow-truck') {
    // Use the correct path for the new tow truck icon
    const originalIconPath = '/lovable-uploads/28a97b53-1b48-4014-8db6-7628e5299a5e.png'; 
    callback(originalIconPath); // Show original immediately

    try {
      const imgElement = await loadImage(originalIconPath);
      const blob = await removeBackground(imgElement); 
      const objectUrl = URL.createObjectURL(blob);
      callback(objectUrl);
      return objectUrl;
    } catch (error) {
      console.error('Failed to process tow truck icon, using original:', error);
      callback(originalIconPath); // Fallback to original if processing fails
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
    case 'car-battery': // Updated text to "Car Battery Issues"
      animationClass = "animate-battery-flash-red";
      return { 
        icon: <BatteryCharging className={`${iconSizeClass} ${animationClass}`} />,
        title: t('car-battery'), // This key points to "Car Battery Issues"
        description: t('car-battery-desc')
      };
    case 'tow-truck': // Updated text to "I Need A Tow Truck"
      animationClass = "animate-truck-pull"; 
      const { iconSrc, greenFilterStyle } = useTowTruckIcon(processedTowTruckIconUrl);
      
      return { 
        icon: <img 
                src={iconSrc} 
                alt={t('tow-truck')} 
                className={`${iconSizeClass} ${animationClass}`} 
                style={greenFilterStyle}
                onError={(e) => {
                  console.error('Error loading tow truck image:', e);
                  // Fallback if the image fails to load - updated to new image path
                  (e.target as HTMLImageElement).src = '/lovable-uploads/28a97b53-1b48-4014-8db6-7628e5299a5e.png';
                }}
              />, 
        title: t('tow-truck'), // This key points to "I Need A Tow Truck"
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

