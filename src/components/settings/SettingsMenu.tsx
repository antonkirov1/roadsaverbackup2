import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Settings, User, Flag, Phone, History } from 'lucide-react';
import { useTranslation } from '@/utils/translations';
import AvatarUpload from '@/components/ui/avatar-upload';

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
  const [userAvatar, setUserAvatar] = useState<string>('/lovable-uploads/0a354359-97fd-4c78-a387-7423f09f2554.png');
  
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
    }
  };

  const requestHistory = [
    { id: 1, type: 'flat-tyre', date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'out-of-fuel', date: '2024-01-10', status: 'completed' },
    { id: 3, type: 'car-battery', date: '2024-01-05', status: 'completed' }
  ];
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('settings')}</DialogTitle>
          <DialogDescription>
            {t('configure-preferences')}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="account">{t('account')}</TabsTrigger>
            <TabsTrigger value="history">{t('history')}</TabsTrigger>
            <TabsTrigger value="payment">{t('payment')}</TabsTrigger>
            <TabsTrigger value="about">About Us</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-4">
            <div className="flex items-center justify-center py-4">
              <AvatarUpload
                currentAvatar={userAvatar}
                onAvatarChange={handleAvatarChange}
                defaultAvatar="/lovable-uploads/0a354359-97fd-4c78-a387-7423f09f2554.png"
                size={48}
                variant="user"
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">{t('user-account')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('username')}: user
              </p>
              <p className="text-sm text-muted-foreground">
                {t('email')}: demo@roadsaver.com
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">{t('language')}</h3>
              <div className="flex space-x-2">
                <Button 
                  variant={currentLanguage === 'en' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => onLanguageChange('en')}
                  className={currentLanguage === 'en' ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  <Flag className="h-4 w-4 mr-2" /> {t('english')}
                </Button>
                <Button 
                  variant={currentLanguage === 'bg' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => onLanguageChange('bg')}
                  className={currentLanguage === 'bg' ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  <Flag className="h-4 w-4 mr-2" /> {t('bulgarian')}
                </Button>
              </div>
            </div>
            
            <Button 
              variant="destructive" 
              size="sm" 
              className="w-full"
              onClick={handleLogout}
            >
              {t('logout')}
            </Button>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <div className="text-center py-4">
              <History className="h-12 w-12 mx-auto text-green-600 mb-4" />
              <h3 className="text-lg font-medium mb-2">{t('request-history')}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t('requests-desc')}
              </p>
              
              <div className="space-y-2 text-left">
                {requestHistory.length > 0 ? (
                  requestHistory.map((request) => (
                    <div key={request.id} className="p-3 bg-secondary rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{t(request.type)}</span>
                        <span className="text-sm text-green-600">{t('completed')}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{request.date}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">{t('no-requests')}</p>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="payment" className="space-y-4">
            <div className="py-8 text-center">
              <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">{t('payment-options')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('payment-future-update')}
              </p>
              
              <Button className="mt-4 bg-green-600 hover:bg-green-700" disabled>
                {t('add-payment-method')}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="about" className="space-y-4">
            <div className="space-y-2 text-center py-4">
              <h2 className="text-xl font-bold">RoadSaver</h2>
              <p className="text-sm text-muted-foreground">{t('version')} 1.0.0</p>
              
              <div className="mt-4">
                <p className="text-sm">
                  Emergency road assistance service work hours: Mon - Friday from 09:00 - 17:00.
                </p>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">{t('contact-information')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('email')}: roadsaverapp@gmail.com
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('phone')}: +359 888 123 456
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsMenu;