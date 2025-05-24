
import React from 'react';
import { Button } from '@/components/ui/button';
import AvatarUpload from '@/components/ui/avatar-upload';
import { ScrollArea } from "@/components/ui/scroll-area"; // Added import
import { LogOut } from 'lucide-react';

interface AccountInfoDisplayProps {
  label: string;
  value: string;
}

const AccountInfoDisplay: React.FC<AccountInfoDisplayProps> = ({ label, value }) => (
  <div className="text-sm">
    <span className="font-medium text-muted-foreground">{label}: </span>
    <span>{value || 'N/A'}</span>
  </div>
);

interface AccountTabContentProps {
  t: (key: string) => string;
  userAvatar: string;
  handleAvatarChange: (file: File | null) => void;
  initialUsername: string;
  initialEmail: string;
  initialPhoneNumber: string;
  onEditAccountInfo: () => void;
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
  onLogout,
  defaultAvatar,
}) => {
  return (
    <ScrollArea className="h-full w-full pr-3"> {/* Changed to h-full to use parent's height */}
      <div className="space-y-6 py-4">
        <div className="flex flex-col items-center space-y-3">
          <AvatarUpload
            currentAvatar={userAvatar}
            onAvatarChange={handleAvatarChange}
            defaultAvatar={defaultAvatar}
            size={24} // Tailwind size (e.g. h-24 w-24)
          />
          <Button variant="outline" size="sm" onClick={onEditAccountInfo}>
            {t('change-account-info')}
          </Button>
        </div>

        <div className="space-y-2 rounded-lg border p-4">
          <h3 className="text-md font-semibold mb-2">{t('your-information')}</h3>
          <AccountInfoDisplay label={t('username')} value={initialUsername} />
          <AccountInfoDisplay label={t('email')} value={initialEmail} />
          <AccountInfoDisplay label={t('phone-number')} value={initialPhoneNumber} />
        </div>

        {/* Language settings removed from here */}

        <Button
          variant="destructive"
          className="w-full"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" /> {t('logout')}
        </Button>
      </div>
    </ScrollArea>
  );
};

export default AccountTabContent;
