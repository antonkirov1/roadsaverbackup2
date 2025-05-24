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
    // Use the new user-uploaded icon path
    const originalIconPath = '/lovable-uploads/2d14545a-f9c9-43ff-b59c-b7e1b3b6765e.png'; 
    callback(originalIconPath); // Show original immediately

    try {
      const imgElement = await loadImage(originalIconPath);
      // Assuming background removal is still desired for consistency or if the new image has a background.
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
    case 'car-battery': // Text is t('car-battery') which should resolve to "Car Battery Issues"
      animationClass = "animate-battery-flash-red";
      return { 
        icon: <BatteryCharging className={`${iconSizeClass} ${animationClass}`} />,
        title: t('car-battery'), // This key points to "Car Battery Issues"
        description: t('car-battery-desc')
      };
    case 'tow-truck': // Text is t('tow-truck') which should resolve to "I Need A Tow Truck"
      animationClass = "animate-truck-pull"; 
      // The processedTowTruckIconUrl passed to this function should be the result of processBackgroundRemoval
      // or the direct path to the new icon `/lovable-uploads/2d14545a-f9c9-43ff-b59c-b7e1b3b6765e.png` if processing fails/isn't used.
      const { iconSrc, greenFilterStyle } = useTowTruckIcon(processedTowTruckIconUrl || '/lovable-uploads/2d14545a-f9c9-43ff-b59c-b7e1b3b6765e.png');
      
      return { 
        icon: <img 
                src={iconSrc} 
                alt={t('tow-truck')} 
                className={`${iconSizeClass} ${animationClass}`} 
                style={greenFilterStyle} // Apply the green filter style
                onError={(e) => {
                  console.error('Error loading tow truck image:', iconSrc);
                  // Fallback for the image, ensuring it still tries to load the new icon path
                  (e.target as HTMLImageElement).src = '/lovable-uploads/2d14545a-f9c9-43ff-b59c-b7e1b3b6765e.png';
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
