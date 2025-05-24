import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { Settings, User, Flag, Phone, History, Euro, Info, Mail, MessageCircle, CheckCircle2, Save } from 'lucide-react';
import { useTranslation } from '@/utils/translations';
import AccountEditModal from './AccountEditModal';
import AccountTabContent from './AccountTabContent';
import HistoryTabContent from './HistoryTabContent';
import PaymentTabContent from './PaymentTabContent';
import AboutTabContent from './AboutTabContent';
import { useQuery } from '@tanstack/react-query';
import { fetchRequestHistory } from '@/utils/api';
import { RequestHistoryItem } from '@/types/history';

interface SettingsMenuProps {
  open: boolean;
  onClose: () => void;
  onLanguageChange: (language: 'en' | 'bg') => void;
  currentLanguage: 'en' | 'bg';
}

// In a real app, this would come from context or props, or a more robust state management.
// For this refactor, we keep it as is, but its `currentPassword` can be mutated.
const simulatedUser = { 
    username: 'user',
    email: 'demo@roadsaver.com',
    phoneNumber: '+359987654321',
    currentPassword: 'password123' 
};

const SettingsMenu: React.FC<SettingsMenuProps> = ({ 
  open, 
  onClose,
  onLanguageChange,
  currentLanguage
}) => {
  const t = useTranslation(currentLanguage);
  const defaultUserAvatar = '/lovable-uploads/0a354359-97fd-4c78-a387-7423f09f2554.png';
  const [userAvatar, setUserAvatar] = useState<string>(defaultUserAvatar);
  const [showAccountEdit, setShowAccountEdit] = useState(false);
  
  // These states will now reflect the "saved" values, updated by AccountEditModal callbacks
  const [initialUsername, setInitialUsername] = useState(simulatedUser.username);
  const [initialEmail, setInitialEmail] = useState(simulatedUser.email);
  const [initialPhoneNumber, setInitialPhoneNumber] = useState(simulatedUser.phoneNumber);

  // Fetch request history using TanStack Query
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

  const handleAvatarChange = (file: File | null) => {
    if (file) {
      console.log('Avatar file to upload:', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserAvatar(reader.result as string);
        toast({ title: "Avatar Updated", description: "Your avatar has been changed."});
      };
      reader.readAsDataURL(file);
    }
  };

  // Callbacks for AccountEditModal
  const handleUsernameSave = (newUsernameValue: string) => {
    setInitialUsername(newUsernameValue);
  };

  const handleEmailSave = (newEmailValue: string) => {
    setInitialEmail(newEmailValue);
  };

  const handlePhoneNumberSave = (newPhoneNumberValue: string) => {
    setInitialPhoneNumber(newPhoneNumberValue);
  };

  const handlePasswordSave = (newPasswordValue: string) => {
    simulatedUser.currentPassword = newPasswordValue;
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
          <TabsList className="grid grid-cols-4 mb-4 h-auto">
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
          
          <div className="min-h-[350px]">
            <TabsContent value="account" className="mt-0">
              <AccountTabContent
                t={t}
                userAvatar={userAvatar}
                handleAvatarChange={handleAvatarChange}
                initialUsername={initialUsername}
                initialEmail={initialEmail}
                initialPhoneNumber={initialPhoneNumber}
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
            username: initialUsername,
            email: initialEmail,
            phoneNumber: initialPhoneNumber,
          }}
          currentPasswordForVerification={simulatedUser.currentPassword}
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
