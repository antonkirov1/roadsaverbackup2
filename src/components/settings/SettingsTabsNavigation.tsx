
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, History, Euro, Info } from 'lucide-react'; // Changed from DollarSign to Euro

interface SettingsTabsNavigationProps {
  t: (key: string) => string;
}

const SettingsTabsNavigation: React.FC<SettingsTabsNavigationProps> = ({ t }) => {
  // Enhanced animation with rotation and scaling effects
  const iconAnimation = "transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:rotate-[-10deg] group-data-[state=active]:scale-110 group-data-[state=active]:text-green-600";

  return (
    <TabsList className="grid grid-cols-4 mb-2 -mt-2 h-auto">
      <TabsTrigger 
        value="account" 
        className="group flex flex-col items-center gap-1 py-1 px-1 text-xs data-[state=active]:p-1" // Reduced padding
      >
        <User className={`h-3 w-3 ${iconAnimation}`} />
        <span className="leading-none">{t('account')}</span>
      </TabsTrigger>
      <TabsTrigger 
        value="history" 
        className="group flex flex-col items-center gap-1 py-1 px-1 text-xs data-[state=active]:p-1" // Reduced padding
      >
        <History className={`h-3 w-3 ${iconAnimation}`} />
        <span className="leading-none">{t('history')}</span>
      </TabsTrigger>
      <TabsTrigger 
        value="payment" 
        className="group flex flex-col items-center gap-1 py-1 px-1 text-xs data-[state=active]:p-1" // Reduced padding
      >
        <Euro className={`h-3 w-3 ${iconAnimation}`} /> 
        <span className="leading-none">{t('payment')}</span>
      </TabsTrigger>
      <TabsTrigger 
        value="about" 
        className="group flex flex-col items-center gap-1 py-1 px-1 text-xs data-[state=active]:p-1" // Reduced padding
      >
        <Info className={`h-3 w-3 ${iconAnimation}`} />
        <span className="leading-none">{t('about')}</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default SettingsTabsNavigation;
