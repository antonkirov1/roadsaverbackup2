
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
      <DialogContent className="sm:max-w-md font-clash mx-4 max-h-[90vh] overflow-hidden pt-12"> {/* Added pt-12 for space for language switcher */}
        <DialogHeader className="text-left"> {/* Ensure header text is aligned left if needed */}
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
                // Language props removed as they are handled by LanguageSwitcherControls now
                // currentLanguage={currentLanguage} 
                // onLanguageChange={onLanguageChange}
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
