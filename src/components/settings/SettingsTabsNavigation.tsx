
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, History, Euro, Info } from 'lucide-react'; // Changed from DollarSign to Euro

interface SettingsTabsNavigationProps {
  t: (key: string) => string;
}

const SettingsTabsNavigation: React.FC<SettingsTabsNavigationProps> = ({ t }) => {
  // Enhanced animation: more pronounced scale, slight rotation on hover, and subtle pulse on active.
  const iconAnimation = "transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:rotate-[-10deg] group-data-[state=active]:scale-125 group-data-[state=active]:text-green-600 group-data-[state=active]:animate-pulse-subtle";

  return (
    <TabsList className="grid grid-cols-4 mb-2 -mt-2 h-auto">
      <TabsTrigger value="account" className="group flex flex-col items-center gap-1 p-2 text-xs data-[state=active]:py-[7px] data-[state=active]:px-2">
        <User className={`h-3 w-3 ${iconAnimation}`} />
        <span className="leading-tight">{t('account')}</span>
      </TabsTrigger>
      <TabsTrigger value="history" className="group flex flex-col items-center gap-1 p-2 text-xs data-[state=active]:py-[7px] data-[state=active]:px-2">
        <History className={`h-3 w-3 ${iconAnimation}`} />
        <span className="leading-tight">{t('history')}</span>
      </TabsTrigger>
      <TabsTrigger value="payment" className="group flex flex-col items-center gap-1 p-2 text-xs data-[state=active]:py-[7px] data-[state=active]:px-2">
        <Euro className={`h-3 w-3 ${iconAnimation}`} /> 
        <span className="leading-tight">{t('payment')}</span>
      </TabsTrigger>
      <TabsTrigger value="about" className="group flex flex-col items-center gap-1 p-2 text-xs data-[state=active]:py-[7px] data-[state=active]:px-2">
        <Info className={`h-3 w-3 ${iconAnimation}`} />
        <span className="leading-tight">{t('about')}</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default SettingsTabsNavigation;
