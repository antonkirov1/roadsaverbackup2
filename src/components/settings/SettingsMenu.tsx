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
import LanguageSwitcherControls from './LanguageSwitcherControls'; // Added import
import { useAccountSettings } from '@/hooks/useAccountSettings';

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
      <DialogContent className="w-[calc(100%-2rem)] sm:w-full sm:max-w-md mx-auto font-clash max-h-[90vh] overflow-hidden pt-12 px-4 pb-4"> {/* Adjusted for alignment: width, mx-auto, and padding */}
        <DialogHeader className="text-left mb-4"> {/* Added mb-4 for spacing under header */}
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
        
        <Tabs defaultValue="account" className="w-full">
          <SettingsTabsNavigation t={t} />
          
          {/* Changed min-h-[350px] to h-[400px] to better accommodate consistent ScrollArea height */}
          <div className="h-[400px]"> 
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
