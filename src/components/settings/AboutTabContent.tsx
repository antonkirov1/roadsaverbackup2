
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from '@/components/ui/button';

interface AboutTabContentProps {
  t: (key: string) => string;
}

const AboutTabContent: React.FC<AboutTabContentProps> = ({ t }) => {
  return (
    <div className="mt-0">
      <ScrollArea className="h-[350px] w-full">
        <div className="space-y-2 text-center py-4 px-2">
          <h2 className="text-xl font-bold">RoadSaver</h2>
          <p className="text-sm text-muted-foreground">{t('version')} 1.0.0</p>
          
          <div className="mt-4">
            <p className="text-sm">
              {t('work-hours-line1')}
            </p>
            <p className="text-sm">
              {t('work-hours-line2')}
            </p>
            <p className="text-sm mt-2 text-orange-600 px-2 leading-relaxed">
              {t('outside-hours-contact')}
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
    </div>
  );
};

export default AboutTabContent;
