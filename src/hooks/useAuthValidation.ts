
import { useFieldValidation } from './useFieldValidation';

// Simulated "database" and profanity list - moved from RegisterForm
const simulatedExistingUsernames = ['admin', 'testuser', 'user123'];
const simulatedExistingEmails = ['admin@example.com', 'test@example.com'];
const profanityList = ['badword', 'curse', 'profane']; // Add more comprehensive list in a real app

export const useUsernameValidation = (t: (key: string) => string) => {
  return useFieldValidation<string>(
    '',
    [
      (username) => {
        if (!username) {
          return { isValid: false, errorMessage: '' };
        }
        if (username.length < 3) {
          return { isValid: false, errorMessage: t('username-min-length-error') || 'Username must be at least 3 characters' };
        }
        if (simulatedExistingUsernames.includes(username.toLowerCase())) {
          return { isValid: false, errorMessage: t('username-taken-error') };
        }
        if (profanityList.some(word => username.toLowerCase().includes(word))) {
          return { isValid: false, errorMessage: t('username-profanity-error') };
        }
        return { isValid: true, errorMessage: null };
      }
    ],
    [t]
  );
};

export const useEmailValidation = (t: (key: string) => string) => {
  return useFieldValidation<string>(
    '',
    [
      (email) => {
        if (!email) {
          return { isValid: false, errorMessage: '' };
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return { isValid: false, errorMessage: t('email-invalid-format') };
        }
        if (simulatedExistingEmails.includes(email.toLowerCase())) {
          return { isValid: false, errorMessage: t('email-taken-error') };
        }
        if (profanityList.some(word => email.toLowerCase().includes(word))) {
          return { isValid: false, errorMessage: t('email-profanity-error') };
        }
        return { isValid: true, errorMessage: null };
      }
    ],
    [t]
  );
};

export const usePhoneNumberValidation = (t: (key: string) => string) => {
  return useFieldValidation<string>(
    '+359',
    [
      (phoneNumber) => {
        // Allow empty or default placeholder initially without error
        if (!phoneNumber || phoneNumber === '+359' || phoneNumber.trim() === '+359') {
          return { isValid: true, errorMessage: null };
        }
        // Validate only if it's not empty and not the placeholder
        if (phoneNumber.length !== 13 || !phoneNumber.startsWith('+359')) {
          return { isValid: false, errorMessage: t('phone-invalid-format') };
        }
        return { isValid: true, errorMessage: null };
      }
    ],
    [t]
  );
};

export const usePasswordValidation = (t: (key: string) => string) => {
  return useFieldValidation<string>(
    '',
    [
      (password) => {
        if (!password) {
          return { isValid: false, errorMessage: '' };
        }
        if (password.length < 8) {
          return { isValid: false, errorMessage: t('password-length-error') };
        }
        if (!/[A-Z]/.test(password)) {
          return { isValid: false, errorMessage: t('password-uppercase-error') };
        }
        return { isValid: true, errorMessage: null };
      }
    ],
    [t]
  );
};

export const useConfirmPasswordValidation = (password: string, t: (key: string) => string) => {
  return useFieldValidation<string>(
    '',
    [
      (confirmPassword) => {
        if (!confirmPassword && !password) {
          return { isValid: false, errorMessage: '' };
        }
        if (password && confirmPassword && password !== confirmPassword) {
          return { isValid: false, errorMessage: t('passwords-do-not-match') };
        }
        if (password && !confirmPassword) {
          return { isValid: false, errorMessage: t('passwords-do-not-match') };
        }
        if (!password && confirmPassword) {
          return { isValid: false, errorMessage: '' };
        }
        return { isValid: true, errorMessage: null };
      }
    ],
    [password, t]
  );
};
