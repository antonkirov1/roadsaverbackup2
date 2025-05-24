import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from '@/utils/translations';
import AccountEditModal from './AccountEditModal';
import AccountTabContent from './AccountTabContent';
import HistoryTabContent from './HistoryTabContent';
import PaymentTabContent from './PaymentTabContent';
import AboutTabContent from './AboutTabContent';
import SettingsTabsNavigation from './SettingsTabsNavigation';
import LanguageSwitcherControls from './LanguageSwitcherControls';
import { useAccountSettings } from '@/hooks/useAccountSettings';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface SettingsMenuProps {
  open: boolean;
  onClose: () => void;
  onLanguageChange: (language: 'en' | 'bg') => void;
  currentLanguage: 'en' | 'bg';
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ 
  open, 
  onClose,
  onLanguageChange,
  currentLanguage
}) => {
  const t = useTranslation(currentLanguage);
  const [showAccountEdit, setShowAccountEdit] = useState(false);
  const isMobile = useIsMobile();

  const {
    userAvatar,
    defaultUserAvatar,
    username,
    email,
    phoneNumber,
    currentPasswordForVerification,
    handleAvatarChange,
    handleUsernameSave,
    handleEmailSave,
    handlePhoneNumberSave,
    handlePasswordSave,
  } = useAccountSettings();
  
  const handleLogout = () => {
    toast({
      title: t('logged-out'),
      description: t('logged-out-msg')
    });
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        setShowAccountEdit(false); 
      }
      onClose();
    }}>
      <DialogContent 
        className={cn(
          "font-clash flex flex-col", // Common base styles
          // Mobile-first: full screen styles by default
          "fixed inset-0 w-full h-full max-w-full max-h-full rounded-none border-0", 
          // Tablet/Desktop: centered modal styles for 'sm' breakpoint and up
          "sm:relative sm:left-[50%] sm:top-[50%] sm:w-full sm:max-w-md sm:h-auto sm:max-h-[90vh] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg sm:border",
          // Padding adjustments based on isMobile, or could be responsive prefixes too
          `pt-${isMobile ? '10' : '6'} px-${isMobile ? '4' : '6'} pb-${isMobile ? '4' : '6'}`
          // Note: The original `p-6` from `dialog.tsx` is overridden by the specific paddings above.
          // The `shadow-lg` from `dialog.tsx` will apply for sm and up.
        )}
      > 
        <DialogHeader className="text-left mb-4 flex-shrink-0"> 
          <DialogTitle>{t('settings')}</DialogTitle>
          <DialogDescription>
            {t('configure-preferences')}
          </DialogDescription>
        </DialogHeader>
        
        <LanguageSwitcherControls 
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
          t={t}
        />
        
        <Tabs defaultValue="account" className="w-full flex flex-col flex-grow overflow-hidden">
          <div className="flex-shrink-0"> {/* Wrapper for TabsList to prevent it from growing */}
            <SettingsTabsNavigation t={t} />
          </div>
          
          {/* This div will contain all TabsContent and will manage overflow for tab content area */}
          <div className="flex-grow overflow-y-auto"> 
            <TabsContent value="account" className="mt-0 h-full">
              <AccountTabContent
                t={t}
                userAvatar={userAvatar}
                handleAvatarChange={handleAvatarChange}
                initialUsername={username}
                initialEmail={email}
                initialPhoneNumber={phoneNumber}
                onEditAccountInfo={() => setShowAccountEdit(true)}
                onLogout={handleLogout}
                defaultAvatar={defaultUserAvatar}
              />
            </TabsContent>
            
            <TabsContent value="history" className="mt-0 h-full">
              <HistoryTabContent t={t} />
            </TabsContent>
            
            <TabsContent value="payment" className="mt-0 h-full">
              <PaymentTabContent t={t} />
            </TabsContent>
            
            <TabsContent value="about" className="mt-0 h-full">
              <AboutTabContent t={t} />
            </TabsContent>
          </div>
        </Tabs>

        <AccountEditModal
          open={showAccountEdit}
          onClose={() => setShowAccountEdit(false)}
          currentLanguage={currentLanguage}
          initialData={{
            username: username,
            email: email,
            phoneNumber: phoneNumber,
          }}
          currentPasswordForVerification={currentPasswordForVerification}
          onUsernameSave={handleUsernameSave}
          onEmailSave={handleEmailSave}
          onPhoneNumberSave={handlePhoneNumberSave}
          onPasswordSave={handlePasswordSave}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SettingsMenu;
