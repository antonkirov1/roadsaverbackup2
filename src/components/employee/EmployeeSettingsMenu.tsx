import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { User, History, Info, LogOut } from 'lucide-react';
import { useTranslation } from '@/utils/translations';
import AvatarUpload from '@/components/ui/avatar-upload';
import { ScrollArea } from "@/components/ui/scroll-area";
import LanguageSwitcherControls from '../settings/LanguageSwitcherControls';
import { cn } from '@/lib/utils';

interface EmployeeSettingsMenuProps {
  open: boolean;
  onClose: () => void;
  onLanguageChange: (language: 'en' | 'bg') => void;
  currentLanguage: 'en' | 'bg';
}

const EmployeeSettingsMenu: React.FC<EmployeeSettingsMenuProps> = ({ 
  open, 
  onClose,
  onLanguageChange,
  currentLanguage
}) => {
  const t = useTranslation(currentLanguage);
  const [employeeAvatar, setEmployeeAvatar] = useState<string>('/lovable-uploads/b99a5fde-0e9d-4b8e-b276-c43924ce1074.png');
  
  const handleLogout = () => {
    toast({
      title: t('logged-out'),
      description: t('logged-out-msg')
    });
    window.location.reload();
  };

  const handleAvatarChange = (file: File | null) => {
    if (file) {
      console.log('Avatar file to upload for employee:', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmployeeAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
      toast({ title: "Avatar Updated (Demo)", description: "Employee avatar preview changed." });
    }
  };

  const completedRequests = [
    { id: 1, type: 'flat-tyre', date: '2024-01-15', customer: 'John Doe' },
    { id: 2, type: 'out-of-fuel', date: '2024-01-14', customer: 'Jane Smith' },
    { id: 3, type: 'car-battery', date: '2024-01-13', customer: 'Mike Johnson' }
  ];

  const iconAnimation = "transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:rotate-[-10deg] group-data-[state=active]:scale-110 group-data-[state=active]:text-blue-500";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "fixed top-0 left-0 w-full h-full max-w-full max-h-full p-0", 
          "rounded-none border-none bg-background font-clash",
          "flex flex-col overflow-hidden",
          "translate-x-0 translate-y-0", 
          "data-[state=open]:animate-none data-[state=closed]:animate-none",
          "data-[state=open]:slide-in-from-left-0 data-[state=open]:slide-in-from-top-0" 
        )}
      > 
        <div className="bg-blue-600 text-primary-foreground p-3 flex justify-between items-center flex-shrink-0 shadow-md">
          <h1 className="text-xl font-semibold font-clash">RoadSaver</h1>
          <div className="flex items-center"> 
            <LanguageSwitcherControls 
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
              t={t}
            />
          </div>
        </div>

        <DialogHeader className="text-left px-4 pt-4 pb-2 flex-shrink-0"> 
          <DialogTitle>{t('settings')}</DialogTitle>
          <DialogDescription>
            {t('configure-preferences')} 
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="account" className="w-full flex flex-col flex-grow overflow-hidden">
          <div className="flex-shrink-0 px-4"> 
            <TabsList className="grid grid-cols-3 mb-3 -mt-2 h-auto"> 
              <TabsTrigger 
                value="account" 
                className="group flex flex-col items-center gap-1.5 py-2 px-1.5 text-sm data-[state=active]:p-1.5 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500" 
              >
                <User className={`h-4 w-4 ${iconAnimation}`} />
                <span className="leading-none">{t('account')}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="group flex flex-col items-center gap-1.5 py-2 px-1.5 text-sm data-[state=active]:p-1.5 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
              >
                <History className={`h-4 w-4 ${iconAnimation}`} />
                <span className="leading-none">{t('history')}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="about" 
                className="group flex flex-col items-center gap-1.5 py-2 px-1.5 text-sm data-[state=active]:p-1.5 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
              >
                <Info className={`h-4 w-4 ${iconAnimation}`} />
                <span className="leading-none">{t('about')}</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-grow overflow-y-auto px-4 pb-4">
            <TabsContent value="account" className="m-0 h-full">
              <div className="h-full flex flex-col justify-between">
                <ScrollArea className="flex-grow">
                  <div className="space-y-6 py-4">
                    <div className="flex flex-col items-center">
                      <AvatarUpload
                        currentAvatar={employeeAvatar}
                        onAvatarChange={handleAvatarChange}
                        defaultAvatar="/lovable-uploads/b99a5fde-0e9d-4b8e-b276-c43924ce1074.png"
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
                    onClick={handleLogout}
                    className="w-1/2"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> {t('logout')}
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="m-0 h-full">
              <div className="h-full flex flex-col overflow-hidden">
                <div className="text-center py-4 flex-shrink-0">
                  <History className="h-12 w-12 mx-auto text-blue-600 mb-2" />
                  <h3 className="text-lg font-medium mb-1">{t('completed-requests')}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t('completed-requests-desc')}
                  </p>
                </div>
                <ScrollArea className="flex-grow">
                  <div className="space-y-2 pb-4">
                    {completedRequests.length > 0 ? (
                      completedRequests.map((request) => (
                        <div key={request.id} className="p-3 bg-secondary rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{t(request.type)}</span>
                            <span className="text-sm text-blue-600">{t('completed')}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{request.customer}</p>
                          <p className="text-sm text-muted-foreground">{request.date}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground">{t('no-requests')}</p>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
            
            <TabsContent value="about" className="m-0 h-full">
              <div className="h-full flex flex-col overflow-hidden">
                <ScrollArea className="flex-grow">
                  <div className="space-y-4 text-center py-4">
                    <div>
                      <h2 className="text-xl font-bold">RoadSaver</h2>
                      <p className="text-sm text-muted-foreground">{t('version')} 1.0.0</p>
                    </div>
                    
                    <div className="text-sm">
                      <p>{t('work-hours-line1')}</p>
                      <p>{t('work-hours-line2')}</p>
                      <p className="mt-2 text-orange-600 px-2 leading-relaxed">
                        {t('outside-hours-contact-employee') || t('outside-hours-contact')}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">{t('contact-information')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t('email')}: roadsaverapp@gmail.com
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {t('phone')}: +359 888 123 456
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeSettingsMenu;
