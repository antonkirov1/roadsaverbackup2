
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast"; // Ensure this path is correct based on your project structure for use-toast
import { useTranslation } from '@/utils/translations';
import AccountEditFormField from './form-fields/AccountEditFormField';
import PasswordEditField from './form-fields/PasswordEditField';
import PasswordConfirmDialog from './dialogs/PasswordConfirmDialog';
// Save icon is now used within the sub-components

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

  const isPasswordValid = (password: string) => {
    return password.length >= 8 && /[A-Z]/.test(password);
  };

  const handleSaveAttempt = (field: string) => {
    if (field === 'phone' && !validatePhoneNumber(newPhoneNumber)) {
        toast({ title: t('phone-error-title'), description: t('phone-invalid-format'), variant: 'destructive' });
        return;
    }
    if (field === 'password' && !isPasswordValid(newPassword)) {
        toast({ title: t('password-error-title'), description: t('password-requirements'), variant: 'destructive' });
        return;
    }
    setFieldToUpdate(field);
    setShowPasswordConfirmDialog(true);
  };

  const executeSave = () => {
    if (fieldToUpdate === 'username') {
      onUsernameSave(newUsername);
      toast({ title: t('update-success-title'), description: t('username-update-success') });
      setIsUsernameChanged(false);
    } else if (fieldToUpdate === 'email') {
      onEmailSave(newEmail);
      toast({ title: t('update-success-title'), description: t('email-update-success') });
      setIsEmailChanged(false);
    } else if (fieldToUpdate === 'phone') {
      if (!validatePhoneNumber(newPhoneNumber)) return; // Re-validate
      onPhoneNumberSave(newPhoneNumber);
      toast({ title: t('update-success-title'), description: t('phone-update-success') });
      setIsPhoneNumberChanged(false);
    } else if (fieldToUpdate === 'password') {
      if (!isPasswordValid(newPassword)) { // Re-validate
          toast({ title: t('password-error-title'), description: t('password-requirements'), variant: 'destructive' });
          return;
      }
      onPasswordSave(newPassword);
      setNewPassword(''); 
      toast({ title: t('update-success-title'), description: t('password-update-success') });
      setIsNewPasswordChanged(false);
    }
    setShowPasswordConfirmDialog(false);
    setFieldToUpdate(null);
  };
  
  const handlePasswordDialogCancel = () => {
    setShowPasswordConfirmDialog(false);
    setFieldToUpdate(null);
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent className="bg-background rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('change-account-info')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <AccountEditFormField
            id="usernameEdit"
            label={t('change-username-colon')}
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            onSave={() => handleSaveAttempt('username')}
            isChanged={isUsernameChanged}
            t={t}
          />
          <AccountEditFormField
            id="emailEdit"
            label={t('change-email-colon')}
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            onSave={() => handleSaveAttempt('email')}
            isChanged={isEmailChanged}
            type="email"
            t={t}
          />
          <AccountEditFormField
            id="phoneEdit"
            label={t('change-phone-colon')}
            value={newPhoneNumber}
            onChange={handlePhoneChange}
            onSave={() => handleSaveAttempt('phone')}
            isChanged={isPhoneNumberChanged}
            saveButtonDisabled={!!phoneError}
            placeholder={t('phone-placeholder')}
            error={phoneError}
            t={t}
          />
          <PasswordEditField
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onSave={() => handleSaveAttempt('password')}
            isChanged={isNewPasswordChanged}
            isValid={isPasswordValid(newPassword)}
            t={t}
          />
          <div className="flex space-x-2 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              {t('cancel')}
            </Button>
          </div>
        </div>
      </DialogContent>

      <PasswordConfirmDialog
        open={showPasswordConfirmDialog}
        onOpenChange={setShowPasswordConfirmDialog}
        t={t}
        currentPasswordForVerification={currentPasswordForVerification}
        onConfirm={executeSave}
        onCancel={handlePasswordDialogCancel}
      />
    </Dialog>
  );
};

export default AccountEditModal;

