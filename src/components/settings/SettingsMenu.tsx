
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent } from "@/components/ui/tabs";
// Button and ScrollArea might not be directly used here anymore, but kept if sub-components might need context from them
// For now, they are not used directly in this refactored SettingsMenu.
// Removed: Button, ScrollArea from direct imports if not used. toast is used in the hook.
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from '@/utils/translations';
import AccountEditModal from './AccountEditModal';
import AccountTabContent from './AccountTabContent';
import HistoryTabContent from './HistoryTabContent';
import PaymentTabContent from './PaymentTabContent';
import AboutTabContent from './AboutTabContent';
import SettingsTabsNavigation from './SettingsTabsNavigation'; // New import
import { useAccountSettings } from '@/hooks/useAccountSettings'; // New import
import { useQuery } from '@tanstack/react-query';
import { fetchRequestHistory } from '@/utils/api';
import { RequestHistoryItem } from '@/types/history';

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
  
  const { 
    data: requestHistory, 
    isLoading: isLoadingHistory, 
    error: historyError 
  } = useQuery<RequestHistoryItem[], Error>({
    queryKey: ['requestHistory'], 
    queryFn: fetchRequestHistory
  });

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
      <DialogContent className="sm:max-w-md font-clash mx-4 max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{t('settings')}</DialogTitle>
          <DialogDescription>
            {t('configure-preferences')}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="account" className="w-full">
          <SettingsTabsNavigation t={t} />
          
          <div className="min-h-[350px]">
            <TabsContent value="account" className="mt-0">
              <AccountTabContent
                t={t}
                userAvatar={userAvatar}
                handleAvatarChange={handleAvatarChange}
                initialUsername={username}
                initialEmail={email}
                initialPhoneNumber={phoneNumber}
                onEditAccountInfo={() => setShowAccountEdit(true)}
                currentLanguage={currentLanguage}
                onLanguageChange={onLanguageChange}
                onLogout={handleLogout}
                defaultAvatar={defaultUserAvatar}
              />
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              <HistoryTabContent 
                t={t} 
                requestHistory={requestHistory} 
                isLoading={isLoadingHistory}
                error={historyError}
              />
            </TabsContent>
            
            <TabsContent value="payment" className="mt-0">
              <PaymentTabContent t={t} />
            </TabsContent>
            
            <TabsContent value="about" className="mt-0">
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

