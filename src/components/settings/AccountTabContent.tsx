
import React from 'react';
import { Button } from '@/components/ui/button';
import AvatarUpload from '@/components/ui/avatar-upload';
import { ScrollArea } from "@/components/ui/scroll-area";
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
    <ScrollArea className="h-full w-full pr-3">
      <div className="flex flex-col justify-between h-full py-4"> {/* Main flex container */}
        {/* Top section: Avatar and Account Info */}
        <div className="space-y-6">
          <div className="flex flex-col items-center"> {/* Removed space-y-3 as button moved */}
            <AvatarUpload
              currentAvatar={userAvatar}
              onAvatarChange={handleAvatarChange}
              defaultAvatar={defaultAvatar}
              size={100} // Changed from 25 to 100 for 100px
            />
          </div>

          <div className="space-y-3 rounded-lg border p-4"> {/* Increased space-y for button */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-semibold">{t('account-information')}</h3>
              <Button
                size="sm" // Kept as sm
                onClick={onEditAccountInfo}
                className="bg-green-600 hover:bg-green-700 text-primary-foreground" // Green button, removed variant="outline"
              >
                {t('change-account-info')}
              </Button>
            </div>
            <AccountInfoDisplay label={t('username')} value={initialUsername} />
            <AccountInfoDisplay label={t('email')} value={initialEmail} />
            <AccountInfoDisplay label={t('phone-number')} value={initialPhoneNumber} />
          </div>
        </div>

        {/* Bottom section: Logout Button */}
        <div className="mt-6 flex justify-center"> {/* Container for centering logout */}
          <Button
            variant="destructive"
            size="sm" // Made smaller
            onClick={onLogout}
            className="w-1/2" // Set to 50% width of its container, centered by parent flex
          >
            <LogOut className="mr-2 h-4 w-4" /> {t('logout')}
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};

export default AccountTabContent;
