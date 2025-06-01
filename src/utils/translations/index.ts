import { authGeneralTranslations } from './authGeneral';
import { authLoginTranslations } from './authLogin';
import { authRegisterTranslations } from './authRegister';
import { authPasswordTranslations } from './authPassword';
import { authUsernameTranslations } from './authUsername';
import { authEmailTranslations } from './authEmail';
import { authPhoneTranslations } from './authPhone';
import { authGenderTranslations } from './authGender';
import { serviceTranslations } from './service';
import { emergencyTranslations } from './emergency';
import { statusTranslations } from './status';
import { settingsTranslations } from './settings';
import { generalTranslations } from './general';
import { uiTranslations } from './ui';
import { themeTranslations } from './theme';
import { authSecretQuestionsTranslations } from './authSecretQuestions';

// Combine all translation categories properly
export const translations = {
  ...authGeneralTranslations,
  ...authLoginTranslations,
  ...authRegisterTranslations,
  ...authPasswordTranslations,
  ...authUsernameTranslations,
  ...authEmailTranslations,
  ...authPhoneTranslations,
  ...authGenderTranslations,
  ...serviceTranslations,
  ...emergencyTranslations,
  ...statusTranslations,
  ...settingsTranslations,
  ...generalTranslations,
  ...uiTranslations,
  ...themeTranslations,
  ...authSecretQuestionsTranslations,
};

export type Language = 'en' | 'bg';

// Fixed useTranslation hook with debugging
export const useTranslation = (language: Language) => {
  return (key: string): string => {
    const translation = translations[key];
    
    // Debug logging to help identify issues
    if (!translation) {
      console.log('Translation not found for key:', key);
      return key;
    }
    
    const result = translation[language];
    if (!result) {
      console.log('Language not found for key:', key, 'language:', language, 'available:', Object.keys(translation));
      return translation['en'] || key; // Fallback to English
    }
    
    return result;
  };
};
