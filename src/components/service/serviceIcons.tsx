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

// Placeholder mapping for custom SVG icons.
// Replace these with actual paths after uploading your SVGs.
const customServiceSvgUrls: Partial<Record<ServiceType, string>> = {
  'flat-tyre': undefined, // e.g., '/lovable-uploads/flat-tyre.svg'
  'out-of-fuel': undefined, // e.g., '/lovable-uploads/out-of-fuel.svg'
  'car-battery': '/lovable-uploads/car-battery.svg', // Updated
  'other-car-problems': undefined, // e.g., '/lovable-uploads/other-car-problems.svg'
  'tow-truck': undefined, // e.g., '/lovable-uploads/tow-truck.svg' (This will override the special PNG handling if provided)
  'support': undefined, // e.g., '/lovable-uploads/support.svg'
  // 'emergency' can also be customized if needed
};

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
  const customSvgUrl = customServiceSvgUrls[type];

  if (customSvgUrl) {
    // Determine animation based on type, even for custom SVGs
    switch (type) {
      case 'flat-tyre': animationClass = "animate-deflate-wobble"; break;
      case 'out-of-fuel': animationClass = "animate-fuel-sputter-flash"; break;
      case 'other-car-problems': animationClass = "animate-wrench-turn"; break;
      case 'car-battery': animationClass = "animate-battery-flash-red"; break;
      case 'tow-truck': animationClass = "animate-truck-pull"; break;
      case 'support': animationClass = "animate-phone-ring"; break;
      case 'emergency': animationClass = "animate-emergency-alert-flash"; break;
    }
    return {
      icon: <img src={customSvgUrl} alt={t(type)} className={`${iconSizeClass} ${animationClass}`} />,
      title: t(type),
      description: t(`${type}-desc`)
    };
  }

  // Fallback to existing Lucide icons or special tow-truck logic if no custom SVG is provided
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
    case 'car-battery': // This case will now be handled by customSvgUrl if defined, otherwise fallback here
      animationClass = "animate-battery-flash-red";
      return { 
        icon: <BatteryCharging className={`${iconSizeClass} ${animationClass}`} />,
        title: t('car-battery'),
        description: t('car-battery-desc')
      };
    case 'tow-truck': // This specific logic for tow-truck PNG remains if no custom SVG is set for it
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
                  (e.target as HTMLImageElement).src = '/lovable-uploads/28a97b53-1b48-4014-8db6-7628e5299a5e.png';
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
