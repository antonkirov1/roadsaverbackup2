
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
        className="fixed inset-0 w-full h-full max-w-full max-h-full p-0 rounded-none border-none bg-background font-clash flex flex-col overflow-hidden"
      > 
        <DialogHeader className="text-left px-4 pt-4 pb-2 flex-shrink-0"> 
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
          <div className="flex-shrink-0 px-4"> 
            <SettingsTabsNavigation t={t} />
          </div>
          
          <div className="flex-grow overflow-hidden px-4 pb-4"> 
            <TabsContent value="account" className="m-0 h-full">
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
            
            <TabsContent value="history" className="m-0 h-full">
              <HistoryTabContent t={t} />
            </TabsContent>
            
            <TabsContent value="payment" className="m-0 h-full">
              <PaymentTabContent t={t} />
            </TabsContent>
            
            <TabsContent value="about" className="m-0 h-full">
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
