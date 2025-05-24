
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, History, Euro, Info } from 'lucide-react';

interface SettingsTabsNavigationProps {
  t: (key: string) => string;
}

const SettingsTabsNavigation: React.FC<SettingsTabsNavigationProps> = ({ t }) => {
  return (
    <TabsList className="grid grid-cols-4 mb-2 -mt-2 h-auto"> {/* Adjusted margins: mb-4 to mb-2, added -mt-2 */}
      <TabsTrigger value="account" className="flex flex-col items-center gap-1 p-2 text-xs">
        <User className="h-3 w-3" />
        <span className="leading-tight">{t('account')}</span>
      </TabsTrigger>
      <TabsTrigger value="history" className="flex flex-col items-center gap-1 p-2 text-xs">
        <History className="h-3 w-3" />
        <span className="leading-tight">{t('history')}</span>
      </TabsTrigger>
      <TabsTrigger value="payment" className="flex flex-col items-center gap-1 p-2 text-xs">
        <Euro className="h-3 w-3" />
        <span className="leading-tight">{t('payment')}</span>
      </TabsTrigger>
      <TabsTrigger value="about" className="flex flex-col items-center gap-1 p-2 text-xs">
        <Info className="h-3 w-3" />
        <span className="leading-tight">{t('about')}</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default SettingsTabsNavigation;
