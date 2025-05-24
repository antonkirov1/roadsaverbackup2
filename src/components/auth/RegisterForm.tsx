
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Globe, CheckCircle2, AlertCircle } from "lucide-react";
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import RegisterFormFieldInput from './RegisterFormFieldInput';
import RegisterGenderSelector from './RegisterGenderSelector';

interface RegisterFormProps {
  onRegister: (userData: { username: string; email: string; password: string; gender?: string; phoneNumber?: string }) => void;
  onCancel: () => void;
}

// Simulated "database" and profanity list
const simulatedExistingUsernames = ['admin', 'testuser', 'user123'];
const simulatedExistingEmails = ['admin@example.com', 'test@example.com'];
const profanityList = ['badword', 'curse', 'profane']; // Add more comprehensive list in a real app

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, onCancel }) => {
  const { language, setLanguage } = useApp();
  const t = useTranslation(language);
  
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  
  const [phoneNumber, setPhoneNumber] = useState('+359');
  const [phoneError, setPhoneError] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const [gender, setGender] = useState('man');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Username validation
  useEffect(() => {
    if (!username) {
      setUsernameError('');
      setIsUsernameValid(false);
      return;
    }
    if (username.length < 3) {
      setUsernameError(t('username-min-length-error') || 'Username must be at least 3 characters');
      setIsUsernameValid(false);
    } else if (simulatedExistingUsernames.includes(username.toLowerCase())) {
      setUsernameError(t('username-taken-error'));
      setIsUsernameValid(false);
    } else if (profanityList.some(word => username.toLowerCase().includes(word))) {
      setUsernameError(t('username-profanity-error'));
      setIsUsernameValid(false);
    } else {
      setUsernameError('');
      setIsUsernameValid(true);
    }
  }, [username, t]);

  // Email validation
  useEffect(() => {
    if (!email) {
      setEmailError('');
      setIsEmailValid(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(t('email-invalid-format'));
      setIsEmailValid(false);
    } else if (simulatedExistingEmails.includes(email.toLowerCase())) {
      setEmailError(t('email-taken-error'));
      setIsEmailValid(false);
    } else if (profanityList.some(word => email.toLowerCase().includes(word))) {
      setEmailError(t('email-profanity-error'));
      setIsEmailValid(false);
    } else {
      setEmailError('');
      setIsEmailValid(true);
    }
  }, [email, t]);
  
  // Phone number validation
  useEffect(() => {
    // Allow empty or default placeholder initially without error
    if (!phoneNumber || phoneNumber === '+359' || phoneNumber.trim() === '+359') {
        setPhoneError('');
        // Consider if an empty optional field should be 'valid' or just 'not invalid'
        // For submission, it will be checked if it's required and empty
        setIsPhoneValid(phoneNumber.trim() !== '+359' && phoneNumber.trim() !== ''); // Valid if it's not the placeholder and not empty
        if (phoneNumber.trim() === '+359' || phoneNumber.trim() === '') {
            setIsPhoneValid(true); // Treat as valid if empty or placeholder, submission logic handles if truly required
        }
        return;
    }
    // Validate only if it's not empty and not the placeholder
    if (phoneNumber.length !== 13 || !phoneNumber.startsWith('+359')) {
      setPhoneError(t('phone-invalid-format'));
      setIsPhoneValid(false);
    } else {
      setPhoneError('');
      setIsPhoneValid(true);
    }
  }, [phoneNumber, t]);

  // Password validation
  useEffect(() => {
    if (!password) {
      setPasswordError('');
      setIsPasswordValid(false);
      return;
    }
    if (password.length < 8) {
      setPasswordError(t('password-length-error'));
      setIsPasswordValid(false);
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError(t('password-uppercase-error'));
      setIsPasswordValid(false);
    } else {
      setPasswordError('');
      setIsPasswordValid(true);
    }
  }, [password, t]);

  // Confirm password validation
  useEffect(() => {
    if (!confirmPassword && !password) {
        setConfirmPasswordError('');
        setIsConfirmPasswordValid(false); // Or true if an empty confirm is fine when password is empty
        return;
    }
    if (password && confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError(t('passwords-do-not-match'));
      setIsConfirmPasswordValid(false);
    } else if (password && confirmPassword && password === confirmPassword) {
      setConfirmPasswordError('');
      setIsConfirmPasswordValid(true);
    } else if (password && !confirmPassword) { // Password is typed but confirm is not
      setConfirmPasswordError(t('passwords-do-not-match')); // Or a specific "please confirm password"
      setIsConfirmPasswordValid(false);
    }
    else {
      setConfirmPasswordError('');
       // If password is empty, confirm password validity depends on whether it's also empty
      setIsConfirmPasswordValid(!password);
    }
  }, [password, confirmPassword, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Re-check phone validity for submission, ensuring it's not just the placeholder if it's meant to be filled
    const isActualPhoneValid = (phoneNumber.trim() === '' || phoneNumber.trim() === '+359') ? true : isPhoneValid;


    if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isActualPhoneValid || !gender) {
      toast({
        title: t("error-title"),
        description: t("fill-all-fields"),
        variant: "destructive",
      });
      // Show specific errors if not already visible
      if (!isUsernameValid && !usernameError) setUsernameError(t('enter-username'));
      if (!isEmailValid && !emailError) setEmailError(t('email-invalid-format'));
      if (!isActualPhoneValid && !phoneError && phoneNumber.trim() !== '' && phoneNumber.trim() !== '+359') setPhoneError(t('phone-invalid-format'));
      if (!isPasswordValid && !passwordError) setPasswordError(t('password-requirements'));
      if (!isConfirmPasswordValid && !confirmPasswordError) setConfirmPasswordError(t('passwords-do-not-match'));
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: t("registration-successful"),
        description: t("account-created"),
      });
      onRegister({ 
        username, 
        email, 
        password, 
        gender, 
        phoneNumber: (phoneNumber.trim() === '' || phoneNumber.trim() === '+359') ? undefined : phoneNumber 
      });
      setIsLoading(false);
    }, 1500);
  };

  const renderValidationIcon = (isValid: boolean, error: string) => {
    if (error) return <AlertCircle className="h-5 w-5 text-red-500" />;
    if (isValid) return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    return null;
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-background font-clash">
      <div className="absolute top-4 right-4 z-10">
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setLanguage(language === 'en' ? 'bg' : 'en')}
            aria-label={t(language === 'en' ? 'switch-to-bulgarian' : 'switch-to-english')}
            className="h-10 w-10 bg-green-600 text-white hover:bg-green-700"
          >
            <Globe className="h-4 w-4" />
          </Button>
          <span className="absolute -bottom-1 -right-1 text-xs bg-white text-green-600 px-1 rounded">
            {language.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{t('create-account')}</CardTitle>
            <CardDescription>
              {t('join-roadsaver-desc')}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <RegisterFormFieldInput
                id="register-username"
                label={t('username')}
                type="text"
                placeholder={t('enter-username')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={usernameError}
                isValid={isUsernameValid}
                renderValidationIcon={renderValidationIcon}
                successMessage={t('username-valid')}
                t={t}
                required
              />
              
              <RegisterFormFieldInput
                id="register-email"
                label={t('email')}
                type="email"
                placeholder={t('enter-email-placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                isValid={isEmailValid}
                renderValidationIcon={renderValidationIcon}
                successMessage={t('email-valid')}
                t={t}
                required
              />

              <RegisterFormFieldInput
                id="register-phone"
                label={t('phone-number-label') + " (" + t('optional-field') + ")"}
                type="tel"
                placeholder={t('phone-placeholder')}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                error={phoneError}
                isValid={isPhoneValid}
                renderValidationIcon={renderValidationIcon}
                helperText={t('phone-helper-text')}
                t={t}
              />
              
              <RegisterGenderSelector
                gender={gender}
                onGenderChange={setGender}
                t={t}
              />
              
              <RegisterFormFieldInput
                id="register-password"
                label={t('password')}
                type="password"
                placeholder={t('create-password-placeholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                isValid={isPasswordValid}
                renderValidationIcon={renderValidationIcon}
                successMessage={t('password-valid')}
                showPasswordToggle
                onToggleShowPassword={handleToggleShowPassword}
                currentShowPasswordState={showPassword}
                t={t}
                required
                inputClassName="pr-10" // Space for the eye icon
                validationIconContainerClassName="absolute inset-y-0 right-10 pr-1 flex items-center pointer-events-none" // Position validation icon next to eye
              />
              
              <RegisterFormFieldInput
                id="confirm-password"
                label={t('confirm-password')}
                type="password"
                placeholder={t('confirm-password-placeholder')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={confirmPasswordError}
                isValid={isConfirmPasswordValid}
                renderValidationIcon={renderValidationIcon}
                successMessage={t('confirm-password-valid')}
                currentShowPasswordState={showPassword} // Uses the same state as the main password field for visibility
                t={t}
                required
              />
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                {t('back-to-login')}
              </Button>
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700"
                disabled={isLoading || !isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || (!isPhoneValid && phoneNumber !== '+359' && phoneNumber !== '')}
              >
                {isLoading ? t('creating-account') : t('create-account')}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;
