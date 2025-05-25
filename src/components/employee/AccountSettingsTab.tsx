
import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import AvatarUpload from '@/components/ui/avatar-upload';
import { LogOut } from 'lucide-react';

interface AccountSettingsTabProps {
  t: (key: string) => string;
  employeeAvatar: string;
  onAvatarChange: (file: File | null) => void;
  onLogout: () => void;
}

const AccountSettingsTab: React.FC<AccountSettingsTabProps> = ({
  t,
  employeeAvatar,
  onAvatarChange,
  onLogout,
}) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <ScrollArea className="flex-grow">
        <div className="space-y-6 py-4">
          <div className="flex flex-col items-center">
            <AvatarUpload
              currentAvatar={employeeAvatar}
              onAvatarChange={onAvatarChange}
              defaultAvatar="/lovable-uploads/b99a5fde-0e9d-4b8e-b276-c43924ce1074.png" // Consider making this a prop or constant
              size={100}
            />
          </div>

          <div className="space-y-3 rounded-lg border p-4">
            <h3 className="text-md font-semibold">{t('user-account')}</h3>
            <p className="text-sm">
              <span className="font-medium text-muted-foreground">{t('username')}: </span>
              employee
            </p>
            <p className="text-sm">
              <span className="font-medium text-muted-foreground">{t('email')}: </span>
              employee@roadsaver.com
            </p>
          </div>
        </div>
      </ScrollArea>
      <div className="py-4 flex justify-center">
        <Button
          variant="destructive"
          size="sm"
          onClick={onLogout}
          className="w-1/2"
        >
          <LogOut className="mr-2 h-4 w-4" /> {t('logout')}
        </Button>
      </div>
    </div>
  );
};

export default AccountSettingsTab;
