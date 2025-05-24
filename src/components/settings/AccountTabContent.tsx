
import React from 'react';
import { Button } from "@/components/ui/button";
import AvatarUpload from '@/components/ui/avatar-upload';
import { User } from 'lucide-react'; // Ensure User icon is imported if used directly, though it's for the TabTrigger

interface AccountTabContentProps {
  t: (key: string) => string;
  userAvatar: string;
  handleAvatarChange: (file: File | null) => void;
  initialUsername: string;
  initialEmail: string;
  initialPhoneNumber: string;
  onEditAccountInfo: () => void;
  currentLanguage: 'en' | 'bg';
  onLanguageChange: (language: 'en' | 'bg') => void;
  onLogout: () => void;
  defaultAvatar: string;
}

const AccountTabContent: React.FC<AccountTabContentProps> = ({
  t,
  userAvatar,
  handleAvatarChange,
  initialUsername,
  initialEmail,
  initialPhoneNumber,
  onEditAccountInfo,
  currentLanguage,
  onLanguageChange,
  onLogout,
  defaultAvatar,
}) => {
  return (
    <div className="space-y-4 mt-0">
      <div className="flex items-center justify-center py-4">
        <AvatarUpload
          currentAvatar={userAvatar}
          onAvatarChange={handleAvatarChange}
          defaultAvatar={defaultAvatar}
          size={80}
          variant="user"
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium">{t('user-account')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('username')}: {initialUsername}
        </p>
        <p className="text-sm text-muted-foreground">
          {t('email')}: {initialEmail}
        </p>
        <p className="text-sm text-muted-foreground">
          {t('phone-number-label')}: {initialPhoneNumber}
        </p>
      </div>
      
      <Button 
        onClick={onEditAccountInfo}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        {t('change-account-info')}
      </Button>
      
      <div className="space-y-2">
        <div className="flex space-x-2">
          <Button 
            variant={currentLanguage === 'en' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => onLanguageChange('en')}
            className={currentLanguage === 'en' ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            🇬🇧 {t('english')}
          </Button>
          <Button 
            variant={currentLanguage === 'bg' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => onLanguageChange('bg')}
            className={currentLanguage === 'bg' ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            🇧🇬 {t('bulgarian')}
          </Button>
        </div>
      </div>
      
      <Button 
        variant="destructive" 
        size="sm" 
        className="w-full"
        onClick={onLogout}
      >
        {t('logout')}
      </Button>
    </div>
  );
};

export default AccountTabContent;
