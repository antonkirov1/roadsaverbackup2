import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Globe, CheckCircle2, AlertCircle } from "lucide-react";
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import RegisterFormFieldInput from './RegisterFormFieldInput';
import RegisterGenderSelector from './RegisterGenderSelector';
import RegisterFormHeader from './RegisterFormHeader';
import RegisterFormActions from './RegisterFormActions';
import SecretQuestionField from './SecretQuestionField';
import {
  useUsernameValidation,
  useEmailValidation,
  usePhoneNumberValidation,
  usePasswordValidation,
  useConfirmPasswordValidation
} from '@/hooks/useAuthValidation';
import {
  useSecretQuestionValidation,
  useSecretQuestionDropdownValidation
} from '@/hooks/useSecretQuestionValidation';

interface RegisterFormProps {
  onRegister: (userData: { 
    username: string; 
    email: string; 
    password: string; 
    gender?: string; 
    phoneNumber?: string;
    secretQuestion1?: string;
    secretAnswer1?: string;
    secretQuestion2?: string;
    secretAnswer2?: string;
  }) => void;
  onCancel: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, onCancel }) => {
  const { language, setLanguage } = useApp();
  const t = useTranslation(language);
  
  const {
    value: username,
    setValue: setUsername,
    error: usernameError,
    isValid: isUsernameValid
  } = useUsernameValidation(t);

  const {
    value: email,
    setValue: setEmail,
    error: emailError,
    isValid: isEmailValid
  } = useEmailValidation(t);

  const {
    value: phoneNumber,
    setValue: setPhoneNumber,
    error: phoneError,
    isValid: isPhoneValid
  } = usePhoneNumberValidation(t);

  const {
    value: password,
    setValue: setPassword,
    error: passwordError,
    isValid: isPasswordValid
  } = usePasswordValidation(t);

  const {
    value: confirmPassword,
    setValue: setConfirmPassword,
    error: confirmPasswordError,
    isValid: isConfirmPasswordValid
  } = useConfirmPasswordValidation(password, t);

  const [gender, setGender] = useState('man');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Secret Question 1
  const [secretQuestion1, setSecretQuestion1] = useState('');
  const {
    value: secretAnswer1,
    setValue: setSecretAnswer1,
    error: secretAnswer1Error,
    isValid: isSecretAnswer1Valid
  } = useSecretQuestionValidation(t);

  const {
    value: secretQuestion1Validation,
    setValue: setSecretQuestion1Validation,
    error: secretQuestion1Error,
    isValid: isSecretQuestion1Valid
  } = useSecretQuestionDropdownValidation(t);

  // Secret Question 2
  const [secretQuestion2, setSecretQuestion2] = useState('');
  const {
    value: secretAnswer2,
    setValue: setSecretAnswer2,
    error: secretAnswer2Error,
    isValid: isSecretAnswer2Valid
  } = useSecretQuestionValidation(t);

  const {
    value: secretQuestion2Validation,
    setValue: setSecretQuestion2Validation,
    error: secretQuestion2Error,
    isValid: isSecretQuestion2Valid
  } = useSecretQuestionDropdownValidation(t);

  const handleSecretQuestion1Change = (value: string) => {
    setSecretQuestion1(value);
    setSecretQuestion1Validation(value);
  };

  const handleSecretQuestion2Change = (value: string) => {
    setSecretQuestion2(value);
    setSecretQuestion2Validation(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isSecretQuestionsValid = isSecretQuestion1Valid && isSecretAnswer1Valid && 
                                  isSecretQuestion2Valid && isSecretAnswer2Valid;
    
    if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || 
        !isPhoneValid || !gender || !isSecretQuestionsValid) {
      toast({
        title: t("error-title"),
        description: t("fill-all-fields"),
        variant: "destructive",
      });
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
        phoneNumber: phoneNumber,
        secretQuestion1,
        secretAnswer1,
        secretQuestion2,
        secretAnswer2
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

  const isOverallFormValid = isUsernameValid && isEmailValid && isPasswordValid && 
                            isConfirmPasswordValid && isPhoneValid && !!gender &&
                            isSecretQuestion1Valid && isSecretAnswer1Valid &&
                            isSecretQuestion2Valid && isSecretAnswer2Valid;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600/10 to-background font-clash">
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
          <RegisterFormHeader t={t} />
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
                label={t('phone-number-label')}
                type="tel"
                placeholder={t('phone-placeholder')}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                error={phoneError}
                isValid={isPhoneValid}
                renderValidationIcon={renderValidationIcon}
                helperText={t('phone-helper-text')}
                t={t}
                required
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
                inputClassName="pr-10"
                validationIconContainerClassName="absolute inset-y-0 right-10 pr-1 flex items-center pointer-events-none"
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
                currentShowPasswordState={showPassword}
                t={t}
                required
              />
              
              <SecretQuestionField
                questionNumber={1}
                selectedQuestion={secretQuestion1}
                onQuestionChange={handleSecretQuestion1Change}
                answer={secretAnswer1}
                onAnswerChange={(e) => setSecretAnswer1(e.target.value)}
                questionError={secretQuestion1Error}
                answerError={secretAnswer1Error}
                isQuestionValid={isSecretQuestion1Valid}
                isAnswerValid={isSecretAnswer1Valid}
                t={t}
              />

              <SecretQuestionField
                questionNumber={2}
                selectedQuestion={secretQuestion2}
                onQuestionChange={handleSecretQuestion2Change}
                answer={secretAnswer2}
                onAnswerChange={(e) => setSecretAnswer2(e.target.value)}
                questionError={secretQuestion2Error}
                answerError={secretAnswer2Error}
                isQuestionValid={isSecretQuestion2Valid}
                isAnswerValid={isSecretAnswer2Valid}
                t={t}
              />
            </CardContent>
            
            <RegisterFormActions 
              t={t}
              onCancel={onCancel}
              isLoading={isLoading}
              isFormValid={isOverallFormValid}
            />
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;
