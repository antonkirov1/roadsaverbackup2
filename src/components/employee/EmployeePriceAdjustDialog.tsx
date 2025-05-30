
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from '@/utils/translations';

interface EmployeePriceAdjustDialogProps {
  open: boolean;
  onClose: () => void;
  currentPrice: number;
  onSendQuote: (newPrice: number) => void;
  language: 'en' | 'bg';
}

const EmployeePriceAdjustDialog: React.FC<EmployeePriceAdjustDialogProps> = ({
  open,
  onClose,
  currentPrice,
  onSendQuote,
  language
}) => {
  const t = useTranslation(language);
  const [newPrice, setNewPrice] = useState<string>(currentPrice.toString());

  const handleSendQuote = () => {
    const price = parseFloat(newPrice);
    if (!newPrice || isNaN(price) || price <= 0) {
      alert('Please enter a valid price quote');
      return;
    }
    onSendQuote(price);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adjust Price Quote</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-price">New Price Quote (BGN)</Label>
            <Input
              id="new-price"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter new price quote..."
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSendQuote}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Send Price Quote
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeePriceAdjustDialog;
