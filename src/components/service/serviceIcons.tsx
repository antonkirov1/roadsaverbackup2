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

// Keep this hook if background removal is still desired for the new icon,
// otherwise, it can be simplified if the new icon is already processed.
// For now, I'll assume the new icon might also benefit or need this structure.
export const useTowTruckIcon = (processedTowTruckIconUrl: string | null) => {
  // Filter to turn black image to green and increase contrast for sharpness
  // This filter is specifically for making a black icon green.
  // If the new user-uploaded icon is already green or colored, this filter might not be ideal.
  // For now, we keep it, assuming it's a silhouette that needs coloring.
  const colorizeAndSharpenFilter = 'brightness(0) saturate(100%) invert(37%) sepia(61%) saturate(1358%) hue-rotate(95deg) brightness(99%) contrast(115%)';
  const combinedFilter = `drop-shadow(0px 0px 0.75px black) ${colorizeAndSharpenFilter}`;
  const greenFilterStyle = { filter: combinedFilter };
  
  // IMPORTANT: Replace '/lovable-uploads/user-tow-truck-icon.png' with the actual path of your uploaded icon.
  const iconSrc = processedTowTruckIconUrl || '/lovable-uploads/user-tow-truck-icon.png'; 
  
  return {
    iconSrc,
    greenFilterStyle // This style makes the icon green.
  };
};

export const processBackgroundRemoval = async (type: ServiceType, callback: (url: string | null) => void) => {
  if (type === 'tow-truck') {
    // IMPORTANT: Replace '/lovable-uploads/user-tow-truck-icon.png' with the actual path of your uploaded icon.
    const originalIconPath = '/lovable-uploads/user-tow-truck-icon.png'; 
    callback(originalIconPath); // Show original immediately

    // If your new icon is already transparent or doesn't need background removal,
    // you can simplify this or remove the removeBackground call.
    try {
      const imgElement = await loadImage(originalIconPath);
      // Assuming background removal is still desired for consistency or if the new image has a background.
      // If not, just use originalIconPath directly without processing.
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
  processedTowTruckIconUrl: string | null, // This will be the URL from processBackgroundRemoval or the direct path
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
    case 'car-battery': // Text changed via t('car-battery')
      animationClass = "animate-battery-flash-red";
      return { 
        icon: <BatteryCharging className={`${iconSizeClass} ${animationClass}`} />,
        title: t('car-battery'),
        description: t('car-battery-desc')
      };
    case 'tow-truck': // Text changed via t('tow-truck')
      animationClass = "animate-truck-pull"; // Kept existing animation
      // Use the hook to get the icon source and style
      // The processedTowTruckIconUrl passed to this function should be the result of processBackgroundRemoval
      const { iconSrc, greenFilterStyle } = useTowTruckIcon(processedTowTruckIconUrl);
      
      return { 
        icon: <img 
                src={iconSrc} 
                alt={t('tow-truck')} 
                className={`${iconSizeClass} ${animationClass}`} 
                style={greenFilterStyle} // Apply the green filter style
                onError={(e) => {
                  // Fallback if the image fails to load (e.g., path is incorrect)
                  // Consider a more robust fallback, like a default Lucide icon.
                  console.error('Error loading tow truck image:', iconSrc);
                  // Attempt to set a fallback or show error. For now, it will show broken image.
                  // (e.target as HTMLImageElement).src = '/path/to/default/fallback/icon.png';
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
