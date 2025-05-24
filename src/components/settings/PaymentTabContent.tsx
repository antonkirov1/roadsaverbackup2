
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react'; 
import { ScrollArea } from "@/components/ui/scroll-area"; // Added import

interface PaymentTabContentProps {
  t: (key: string) => string;
}

const PaymentTabContent: React.FC<PaymentTabContentProps> = ({ t }) => {
  return (
    <ScrollArea className="h-full w-full pr-3"> {/* Changed to h-full */}
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
    </ScrollArea>
  );
};

export default PaymentTabContent;
