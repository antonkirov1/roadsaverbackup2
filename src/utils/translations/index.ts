
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

// Combine all translation categories
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
};

export type Language = 'en' | 'bg';

// Keep the same useTranslation hook to maintain compatibility
export const useTranslation = (language: Language) => {
  return (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || key;
  };
};

