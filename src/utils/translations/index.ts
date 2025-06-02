
import { authGeneralTranslations } from './authGeneral';
import { authUsernameTranslations } from './authUsername';
import { authEmailTranslations } from './authEmail';
import { authPassword } from './authPassword';
import { authPhoneTranslations } from './authPhone';
import { authGenderTranslations } from './authGender';
import { authRegisterTranslations } from './authRegister';
import { authLoginTranslations } from './authLogin';
import { authSecretQuestions } from './authSecretQuestions';
import { generalTranslations } from './general';
import { uiTranslations } from './ui';
import { serviceTranslations } from './service';
import { emergencyTranslations } from './emergency';
import { settings } from './settings';
import { status } from './status';
import { themeTranslations } from './theme';

// Create a proper namespaced translation structure to avoid key conflicts
const createNamespacedTranslations = () => {
  return {
    en: {
      // Auth translations
      ...authGeneralTranslations.en,
      ...authUsernameTranslations.en,
      ...authEmailTranslations.en,
      ...authPassword.en,
      ...authPhoneTranslations.en,
      ...authGenderTranslations.en,
      ...authRegisterTranslations.en,
      ...authLoginTranslations.en,
      ...authSecretQuestions.en,
      
      // General app translations
      ...generalTranslations.en,
      ...uiTranslations.en,
      ...serviceTranslations.en,
      ...emergencyTranslations.en,
      ...settings.en,
      ...status.en,
      ...themeTranslations.en,
    },
    bg: {
      // Auth translations
      ...authGeneralTranslations.bg,
      ...authUsernameTranslations.bg,
      ...authEmailTranslations.bg,
      ...authPassword.bg,
      ...authPhoneTranslations.bg,
      ...authGenderTranslations.bg,
      ...authRegisterTranslations.bg,
      ...authLoginTranslations.bg,
      ...authSecretQuestions.bg,
      
      // General app translations
      ...generalTranslations.bg,
      ...uiTranslations.bg,
      ...serviceTranslations.bg,
      ...emergencyTranslations.bg,
      ...settings.bg,
      ...status.bg,
      ...themeTranslations.bg,
    },
  };
};

const translations = createNamespacedTranslations();

// Enhanced translation function with better fallback handling
export const useTranslation = (language: 'en' | 'bg') => {
  return (key: string) => {
    // First try to get the translation for the requested language
    const translation = translations[language]?.[key];
    
    // If translation exists, return it
    if (translation && translation.trim() !== '') {
      return translation;
    }
    
    // Fallback to English if translation doesn't exist in the requested language
    const englishFallback = translations.en?.[key];
    if (englishFallback && englishFallback.trim() !== '') {
      return englishFallback;
    }
    
    // If no translation exists at all, return the key itself
    return key;
  };
};

// Export the translations object for debugging purposes
export { translations };
