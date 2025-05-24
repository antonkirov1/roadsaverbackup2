import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Added Dialog
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from '@/utils/translations';
import { Save } from 'lucide-react';

interface AccountEditModalProps {
  open: boolean;
  onClose: () => void;
  currentLanguage: 'en' | 'bg';
  initialData: {
    username: string;
    email: string;
    phoneNumber: string;
  };
  currentPasswordForVerification: string;
  onUsernameSave: (username: string) => void;
  onEmailSave: (email: string) => void;
  onPhoneNumberSave: (phone: string) => void;
  onPasswordSave: (password: string) => void;
}

const AccountEditModal: React.FC<AccountEditModalProps> = ({
  open,
  onClose,
  currentLanguage,
  initialData,
  currentPasswordForVerification,
  onUsernameSave,
  onEmailSave,
  onPhoneNumberSave,
  onPasswordSave,
}) => {
  const t = useTranslation(currentLanguage);

  const [newUsername, setNewUsername] = useState(initialData.username);
  const [isUsernameChanged, setIsUsernameChanged] = useState(false);

  const [newEmail, setNewEmail] = useState(initialData.email);
  const [isEmailChanged, setIsEmailChanged] = useState(false);

  const [newPhoneNumber, setNewPhoneNumber] = useState(initialData.phoneNumber);
  const [isPhoneNumberChanged, setIsPhoneNumberChanged] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [isNewPasswordChanged, setIsNewPasswordChanged] = useState(false);

  const [showPasswordConfirmDialog, setShowPasswordConfirmDialog] = useState(false);
  const [passwordToConfirm, setPasswordToConfirm] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [fieldToUpdate, setFieldToUpdate] = useState<string | null>(null);

  useEffect(() => {
    setNewUsername(initialData.username);
    setNewEmail(initialData.email);
    setNewPhoneNumber(initialData.phoneNumber);
    setNewPassword('');
    setIsUsernameChanged(false);
    setIsEmailChanged(false);
    setIsPhoneNumberChanged(false);
    setIsNewPasswordChanged(false);
    setPhoneError('');
  }, [initialData, open]);

  useEffect(() => {
    setIsUsernameChanged(newUsername !== initialData.username);
  }, [newUsername, initialData.username]);

  useEffect(() => {
    setIsEmailChanged(newEmail !== initialData.email);
  }, [newEmail, initialData.email]);

  useEffect(() => {
    setIsPhoneNumberChanged(newPhoneNumber !== initialData.phoneNumber);
  }, [newPhoneNumber, initialData.phoneNumber]);

  useEffect(() => {
    setIsNewPasswordChanged(newPassword !== '');
  }, [newPassword]);

  const validatePhoneNumber = (phone: string) => {
    if (phone.length !== 13 || !phone.startsWith('+359')) {
      setPhoneError(t('phone-invalid-format'));
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

  const handleSaveAttempt = (field: string) => {
    if (field === 'phone' && !validatePhoneNumber(newPhoneNumber)) {
        toast({ title: t('phone-error-title'), description: t('phone-invalid-format'), variant: 'destructive' });
        return;
    }
    if (field === 'password' && (newPassword.length < 8 || !/[A-Z]/.test(newPassword))) {
        toast({ title: t('password-error-title'), description: t('password-requirements'), variant: 'destructive' });
        return;
    }
    setFieldToUpdate(field);
    setPasswordToConfirm('');
    setPasswordConfirmError('');
    setShowPasswordConfirmDialog(true);
  };

  const handleConfirmPasswordAndSave = () => {
    if (passwordToConfirm !== currentPasswordForVerification) {
      setPasswordConfirmError(t('incorrect-password-error'));
      return;
    }

    if (fieldToUpdate === 'username') {
      onUsernameSave(newUsername);
      toast({ title: t('update-success-title'), description: t('username-update-success') });
    } else if (fieldToUpdate === 'email') {
      onEmailSave(newEmail);
      toast({ title: t('update-success-title'), description: t('email-update-success') });
    } else if (fieldToUpdate === 'phone') {
      if (!validatePhoneNumber(newPhoneNumber)) return; // Re-validate before saving
      onPhoneNumberSave(newPhoneNumber);
      toast({ title: t('update-success-title'), description: t('phone-update-success') });
    } else if (fieldToUpdate === 'password') {
      if (newPassword.length < 8 || !/[A-Z]/.test(newPassword)) {
          toast({ title: t('password-error-title'), description: t('password-requirements'), variant: 'destructive' });
          setShowPasswordConfirmDialog(false); // Close confirm dialog as validation failed earlier than expected here
          return;
      }
      onPasswordSave(newPassword);
      setNewPassword(''); // Clear field
      toast({ title: t('update-success-title'), description: t('password-update-success') });
    }

    setShowPasswordConfirmDialog(false);
    setFieldToUpdate(null);
    // Reset relevant changed states after successful save, parent will update initialData prop which triggers useEffect
    if (fieldToUpdate === 'username') setIsUsernameChanged(false);
    if (fieldToUpdate === 'email') setIsEmailChanged(false);
    if (fieldToUpdate === 'phone') setIsPhoneNumberChanged(false);
    if (fieldToUpdate === 'password') setIsNewPasswordChanged(false);
  };

  // The `if (!open) return null;` check is handled by the Dialog component's open prop.
  // The Dialog component itself will not render if `open` is false.

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent
        className="bg-background rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
        // Removed manual positioning overrides and event handlers like onClick, onEscapeKeyDown, onInteractOutside
        // as the Dialog component and its DialogContent will manage these.
      >
        <DialogHeader>
          <DialogTitle>{t('change-account-info')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="usernameEdit" className="text-sm font-medium">{t('change-username-colon')}</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="usernameEdit"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                disabled={!isUsernameChanged}
                onClick={() => handleSaveAttempt('username')}
              >
                <Save className="h-4 w-4 mr-1 sm:mr-2" /> <span className="hidden sm:inline">{t('save')}</span>
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="emailEdit" className="text-sm font-medium">{t('change-email-colon')}</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="emailEdit"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                type="email"
              />
              <Button size="sm" className="bg-green-600 hover:bg-green-700" disabled={!isEmailChanged} onClick={() => handleSaveAttempt('email')}>
                <Save className="h-4 w-4 mr-1 sm:mr-2" /> <span className="hidden sm:inline">{t('save')}</span>
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="phoneEdit" className="text-sm font-medium">{t('change-phone-colon')}</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="phoneEdit"
                value={newPhoneNumber}
                onChange={handlePhoneChange}
                placeholder={t('phone-placeholder')}
              />
              <Button size="sm" className="bg-green-600 hover:bg-green-700" disabled={!isPhoneNumberChanged || !!phoneError} onClick={() => handleSaveAttempt('phone')}>
                <Save className="h-4 w-4 mr-1 sm:mr-2" /> <span className="hidden sm:inline">{t('save')}</span>
              </Button>
            </div>
            {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
          </div>
          <div>
            <Label htmlFor="passwordEdit" className="text-sm font-medium">{t('change-password-colon')}</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="passwordEdit"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                placeholder={t('new-password-placeholder')}
              />
              <Button size="sm" className="bg-green-600 hover:bg-green-700" disabled={!isNewPasswordChanged || newPassword.length < 8 || !/[A-Z]/.test(newPassword)} onClick={() => handleSaveAttempt('password')}>
                <Save className="h-4 w-4 mr-1 sm:mr-2" /> <span className="hidden sm:inline">{t('save')}</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{t('password-requirements')}</p>
          </div>
          <div className="flex space-x-2 pt-4">
            <Button
              onClick={onClose} // This still correctly calls setShowAccountEdit(false) from SettingsMenu
              variant="outline"
              className="flex-1"
            >
              {t('cancel')}
            </Button>
          </div>
        </div>
      </DialogContent>

      {/* The AlertDialog for password confirmation remains, it's a separate dialog flow. */}
      <AlertDialog open={showPasswordConfirmDialog} onOpenChange={setShowPasswordConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('current-password-prompt-title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('current-password-prompt-desc')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder={t('enter-current-password')}
              value={passwordToConfirm}
              onChange={(e) => {
                setPasswordToConfirm(e.target.value);
                setPasswordConfirmError('');
              }}
            />
            {passwordConfirmError && <p className="text-red-500 text-sm">{passwordConfirmError}</p>}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setFieldToUpdate(null)}>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmPasswordAndSave}
              disabled={!passwordToConfirm}
              className="bg-green-600 hover:bg-green-700"
            >
              {t('save')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
};

export default AccountEditModal;
