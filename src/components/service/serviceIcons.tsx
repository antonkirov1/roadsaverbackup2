
import React from 'react';
import { Fuel, Wrench, Phone, AlertTriangle, Mail, Disc3, BatteryCharging } from 'lucide-react';
import { loadImage, removeBackground } from '@/utils/imageProcessing';

export type ServiceType = 'flat-tyre' | 'out-of-fuel' | 'other-car-problems' | 'tow-truck' | 'emergency' | 'support' | 'car-battery';

interface ServiceIconData {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Individual icon configurations
const iconConfigurations: Record<ServiceType, {
  customSvgUrl?: string;
  animationClass: string;
  colorFilter?: string;
  darkModeColorFilter?: string;
  fallbackLucideIcon: React.ComponentType<any>;
}> = {
  'flat-tyre': {
    customSvgUrl: '/lovable-uploads/flat-tire.svg',
    animationClass: 'animate-deflate-wobble',
    colorFilter: 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)',
    darkModeColorFilter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
    fallbackLucideIcon: Disc3
  },
  'out-of-fuel': {
    customSvgUrl: '/lovable-uploads/Out Of Fuel.svg',
    animationClass: 'animate-fuel-pulse-flash',
    colorFilter: 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)',
    darkModeColorFilter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
    fallbackLucideIcon: Fuel
  },
  'other-car-problems': {
    customSvgUrl: '/lovable-uploads/other-car-problems.svg',
    animationClass: 'animate-wrench-turn',
    colorFilter: 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)',
    darkModeColorFilter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
    fallbackLucideIcon: Wrench
  },
  'car-battery': {
    customSvgUrl: '/lovable-uploads/jumper_cables_with_battery.svg',
    animationClass: 'animate-battery-flash-red',
    colorFilter: 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)',
    darkModeColorFilter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
    fallbackLucideIcon: BatteryCharging
  },
  'tow-truck': {
    customSvgUrl: '/lovable-uploads/tow-truck.svg',
    animationClass: 'animate-truck-pull',
    colorFilter: 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)',
    darkModeColorFilter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
    fallbackLucideIcon: Wrench
  },
  'support': {
    customSvgUrl: '/lovable-uploads/contact-support.svg',
    animationClass: 'animate-phone-ring',
    colorFilter: 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)',
    darkModeColorFilter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
    fallbackLucideIcon: Phone
  },
  'emergency': {
    animationClass: 'animate-emergency-alert-flash',
    fallbackLucideIcon: AlertTriangle
  }
};

export const useTowTruckIcon = (processedTowTruckIconUrl: string | null) => {
  const iconSrc = processedTowTruckIconUrl || '/lovable-uploads/28a97b53-1b48-4014-8db6-7628e5299a5e.png';
  return {
    iconSrc,
    greenFilterStyle: {}
  };
};

export const processBackgroundRemoval = async (type: ServiceType, callback: (url: string | null) => void) => {
  if (type === 'tow-truck') {
    const originalIconPath = '/lovable-uploads/28a97b53-1b48-4014-8db6-7628e5299a5e.png';
    callback(originalIconPath);

    try {
      const imgElement = await loadImage(originalIconPath);
      const blob = await removeBackground(imgElement);
      const objectUrl = URL.createObjectURL(blob);
      callback(objectUrl);
      return objectUrl;
    } catch (error) {
      console.error('Failed to process tow truck icon, using original:', error);
      callback(originalIconPath);
      return null;
    }
  }
  return null;
};

export const getServiceIconAndTitle = (type: ServiceType, t: (key: string) => string, processedTowTruckIconUrl: string | null, iconSizeClass: string): ServiceIconData => {
  const config = iconConfigurations[type];
  
  // Handle icons with custom SVGs
  if (config.customSvgUrl) {
    return {
      icon: <img 
        src={config.customSvgUrl} 
        alt={t(type)} 
        className={`w-8 h-8 sm:w-10 sm:h-10 ${config.animationClass} object-contain filter-icon-color ${type === 'car-battery' ? 'car-battery-icon' : ''}`}
        onError={(e) => {
          console.error(`Failed to load custom SVG for ${type}, falling back to Lucide icon`);
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />,
      title: t(type),
      description: t(`${type}-desc`)
    };
  }

  // Fallback to Lucide icons
  const LucideIcon = config.fallbackLucideIcon;
  const iconColor = type === 'emergency' ? 'text-red-500' : 'text-black dark:text-white';
  
  return {
    icon: <LucideIcon className={`${iconSizeClass} ${config.animationClass} ${iconColor}`} />,
    title: t(type),
    description: t(`${type}-desc`)
  };
};

export const ContactDialogIcons = {
  email: <Mail className="h-4 w-4 mr-2" />,
  phone: <Phone className="h-4 w-4 mr-2" />
};
