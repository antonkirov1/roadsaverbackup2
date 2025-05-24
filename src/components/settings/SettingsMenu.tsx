
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { Settings, User, Flag, Phone, History, Euro, Info, Mail, MessageCircle } from 'lucide-react';
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
  const [showAccountEdit, setShowAccountEdit] = useState(false);
  const [newUsername, setNewUsername] = useState('user');
  const [newEmail, setNewEmail] = useState('demo@roadsaver.com');
  const [newPassword, setNewPassword] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('+359987654321');
  const [currentPassword, setCurrentPassword] = useState('');
  const [phoneError, setPhoneError] = useState('');
  
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

  const validatePhoneNumber = (phone: string) => {
    if (phone.length !== 13 || !phone.startsWith('+359')) {
      setPhoneError('Phone number must be exactly 13 characters starting with +359');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPhoneNumber(value);
    validatePhoneNumber(value);
  };

  const requestHistory = [
    { 
      id: 1, 
      type: 'flat-tyre', 
      date: '2024-01-15', 
      time: '14:30',
      completedTime: '15:45',
      status: 'completed',
      user: 'John Doe',
      employee: 'Mike Johnson'
    },
    { 
      id: 2, 
      type: 'out-of-fuel', 
      date: '2024-01-10', 
      time: '09:15',
      completedTime: '10:30',
      status: 'completed',
      user: 'Jane Smith',
      employee: 'Sarah Wilson'
    },
    { 
      id: 3, 
      type: 'car-battery', 
      date: '2024-01-05', 
      time: '16:20',
      completedTime: '17:15',
      status: 'completed',
      user: 'Bob Brown',
      employee: 'Tom Davis'
    },
    { 
      id: 4, 
      type: 'tow-truck', 
      date: '2024-01-02', 
      time: '11:45',
      completedTime: '13:00',
      status: 'completed',
      user: 'Alice Green',
      employee: 'Chris Lee'
    },
    { 
      id: 5, 
      type: 'other-car-problems', 
      date: '2023-12-28', 
      time: '08:20',
      completedTime: '09:30',
      status: 'completed',
      user: 'David White',
      employee: 'Emma Brown'
    }
  ];
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
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
            <TabsContent value="account" className="space-y-4 mt-0">
              <div className="flex items-center justify-center py-4">
                <AvatarUpload
                  currentAvatar={userAvatar}
                  onAvatarChange={handleAvatarChange}
                  defaultAvatar="/lovable-uploads/0a354359-97fd-4c78-a387-7423f09f2554.png"
                  size={80}
                  variant="user"
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">{t('user-account')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('username')}: {newUsername}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('email')}: {newEmail}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('phone-number')} {newPhoneNumber}
                </p>
              </div>
              
              <Button 
                onClick={() => setShowAccountEdit(true)}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Change account information
              </Button>
              
              <div className="space-y-2">
                <h3 className="font-medium">{t('language')}</h3>
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
                onClick={handleLogout}
              >
                {t('logout')}
              </Button>
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              <div className="text-center py-4">
                <History className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <h3 className="text-lg font-medium mb-2">{t('request-history')}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('requests-desc')}
                </p>
                
                <ScrollArea className="h-[250px] w-full">
                  <div className="space-y-2 text-left px-2">
                    {requestHistory.length > 0 ? (
                      requestHistory.map((request) => (
                        <div key={request.id} className="p-3 bg-secondary rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{t(request.type)}</span>
                            <span className="text-sm text-green-600">{t('completed')}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{request.date} - {request.time}</p>
                          <p className="text-sm text-muted-foreground">Completed: {request.completedTime}</p>
                          <p className="text-sm text-muted-foreground">User: {request.user}</p>
                          <p className="text-sm text-muted-foreground">Employee: {request.employee}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground">{t('no-requests')}</p>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
            
            <TabsContent value="payment" className="mt-0">
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
            
            <TabsContent value="about" className="mt-0">
              <ScrollArea className="h-[350px] w-full">
                <div className="space-y-2 text-center py-4 px-2">
                  <h2 className="text-xl font-bold">RoadSaver</h2>
                  <p className="text-sm text-muted-foreground">{t('version')} 1.0.0</p>
                  
                  <div className="mt-4">
                    <p className="text-sm">
                      Emergency road assistance service work hours:
                    </p>
                    <p className="text-sm">
                      Mon - Friday from 09:00 - 17:00.
                    </p>
                    <p className="text-sm mt-2 text-orange-600 px-2 leading-relaxed">
                      For service requests outside of working hours,<br />
                      please contact support
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">{t('contact-information')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('email')}: roadsaverapp@gmail.com
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t('phone')}: +359 888 123 456
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700 text-xs">
                        📘 Facebook
                      </Button>
                      <Button variant="outline" size="sm" className="bg-blue-500 text-white hover:bg-blue-600 text-xs">
                        💬 Messenger
                      </Button>
                      <Button variant="outline" size="sm" className="bg-green-500 text-white hover:bg-green-600 text-xs">
                        📱 WhatsApp
                      </Button>
                      <Button variant="outline" size="sm" className="bg-purple-600 text-white hover:bg-purple-700 text-xs">
                        📞 Viber
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>

        {/* Account Edit Dialog */}
        {showAccountEdit && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-background rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Change Account Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Change username</label>
                  <Input 
                    value={newUsername} 
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Change email</label>
                  <Input 
                    value={newEmail} 
                    onChange={(e) => setNewEmail(e.target.value)}
                    type="email"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Change phone number</label>
                  <Input 
                    value={newPhoneNumber} 
                    onChange={handlePhoneChange}
                    placeholder="+359XXXXXXXXX"
                  />
                  {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium">Change password</label>
                  <Input 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    placeholder="New password"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Current password</label>
                  <Input 
                    value={currentPassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    type="password"
                    placeholder="Enter current password"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => setShowAccountEdit(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    disabled={phoneError !== '' || !currentPassword}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      toast({
                        title: 'Account Updated',
                        description: 'Your account information has been updated successfully.'
                      });
                      setShowAccountEdit(false);
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SettingsMenu;
