
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Globe, CheckCircle2, AlertCircle } from "lucide-react";
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';

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
      setUsernameError(t('username-min-length-error') || 'Username must be at least 3 characters'); // Add translation key if needed
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
    if (!phoneNumber || phoneNumber === '+359') {
        setPhoneError('');
        setIsPhoneValid(false);
        return;
    }
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
        setIsConfirmPasswordValid(false);
        return;
    }
    if (password && confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError(t('passwords-do-not-match'));
      setIsConfirmPasswordValid(false);
    } else if (password && confirmPassword && password === confirmPassword) {
      setConfirmPasswordError('');
      setIsConfirmPasswordValid(true);
    } else {
      setConfirmPasswordError('');
      setIsConfirmPasswordValid(false);
    }
  }, [password, confirmPassword, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isPhoneValid || !gender) {
      toast({
        title: t("error-title"),
        description: t("fill-all-fields"),
        variant: "destructive",
      });
      // Show specific errors if not already visible
      if (!isUsernameValid && !usernameError) setUsernameError(t('enter-username'));
      if (!isEmailValid && !emailError) setEmailError(t('email-invalid-format'));
      if (!isPhoneValid && !phoneError) setPhoneError(t('phone-invalid-format'));
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
      onRegister({ username, email, password, gender, phoneNumber });
      setIsLoading(false);
    }, 1500);
  };

  const renderValidationIcon = (isValid: boolean, error: string) => {
    if (error) return <AlertCircle className="h-5 w-5 text-red-500" />;
    if (isValid) return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    return null;
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
              <div className="space-y-2">
                <Label htmlFor="register-username">{t('username')}</Label>
                <div className="relative">
                  <Input
                    id="register-username"
                    placeholder={t('enter-username')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className={`border-2 focus:ring-green-600 focus:border-green-600 ${usernameError ? 'border-red-500' : isUsernameValid ? 'border-green-500' : ''}`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    {renderValidationIcon(isUsernameValid, usernameError)}
                  </div>
                </div>
                {usernameError && <p className="text-red-500 text-xs mt-1">{usernameError}</p>}
                {!usernameError && isUsernameValid && <p className="text-green-500 text-xs mt-1">{t('username-valid')}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">{t('email')}</Label>
                 <div className="relative">
                    <Input
                      id="register-email"
                      type="email"
                      placeholder={t('enter-email-placeholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={`border-2 focus:ring-green-600 focus:border-green-600 ${emailError ? 'border-red-500' : isEmailValid ? 'border-green-500' : ''}`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {renderValidationIcon(isEmailValid, emailError)}
                    </div>
                </div>
                {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                {!emailError && isEmailValid && <p className="text-green-500 text-xs mt-1">{t('email-valid')}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-phone">{t('phone-number-label')} *</Label>
                <div className="relative">
                    <Input
                      id="register-phone"
                      type="tel"
                      placeholder={t('phone-placeholder')}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className={`border-2 focus:ring-green-600 focus:border-green-600 ${phoneError ? 'border-red-500' : isPhoneValid ? 'border-green-500' : ''}`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {renderValidationIcon(isPhoneValid, phoneError)}
                    </div>
                </div>
                {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                <p className="text-xs text-muted-foreground">{t('phone-helper-text')}</p>
              </div>

              <div className="space-y-2">
                <Label>{t('gender-label')}</Label>
                <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="man" id="man" />
                    <Label htmlFor="man" className="text-sm">{t('man-label')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="woman" id="woman" />
                    <Label htmlFor="woman" className="text-sm">{t('woman-label')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not-specified" id="not-specified" />
                    <Label htmlFor="not-specified" className="text-sm">{t('not-specified-label')}</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">
                  {t('password')}
                  <span className="block text-xs text-muted-foreground mt-1">
                    {t('password-requirements')}
                  </span>
                </Label>
                <div className="relative">
                  <Input
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('create-password-placeholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`border-2 pr-10 focus:ring-green-600 focus:border-green-600 ${passwordError ? 'border-red-500' : isPasswordValid ? 'border-green-500' : ''}`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{zIndex: 1}} // Ensure button is clickable
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="text-gray-500" />
                    ) : (
                      <Eye size={18} className="text-gray-500" />
                    )}
                  </button>
                   <div className="absolute inset-y-0 right-10 pr-1 flex items-center pointer-events-none"> {/* Adjusted right padding for icon */}
                        {renderValidationIcon(isPasswordValid, passwordError)}
                    </div>
                </div>
                 {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                 {!passwordError && isPasswordValid && <p className="text-green-500 text-xs mt-1">{t('password-valid')}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">{t('confirm-password')}</Label>
                 <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('confirm-password-placeholder')}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className={`border-2 focus:ring-green-600 focus:border-green-600 ${confirmPasswordError ? 'border-red-500' : isConfirmPasswordValid ? 'border-green-500' : ''}`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {renderValidationIcon(isConfirmPasswordValid, confirmPasswordError)}
                    </div>
                </div>
                {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
                {!confirmPasswordError && isConfirmPasswordValid && <p className="text-green-500 text-xs mt-1">{t('confirm-password-valid')}</p>}
              </div>
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
                disabled={isLoading || !isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isPhoneValid}
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
