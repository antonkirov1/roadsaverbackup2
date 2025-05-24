
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, History, Euro, Info } from 'lucide-react';

interface SettingsTabsNavigationProps {
  t: (key: string) => string;
}

const SettingsTabsNavigation: React.FC<SettingsTabsNavigationProps> = ({ t }) => {
  const iconAnimation = "transition-transform group-hover:scale-110 group-data-[state=active]:scale-110";

  return (
    <TabsList className="grid grid-cols-4 mb-2 -mt-2 h-auto">
      <TabsTrigger value="account" className="group flex flex-col items-center gap-1 p-2 text-xs data-[state=active]:py-[7px] data-[state=active]:px-2"> {/* Adjusted padding for active state */}
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
