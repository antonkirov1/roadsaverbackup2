
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

// Combine all translation categories - flatten the structure
const allTranslations = {
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
};

export type Language = 'en' | 'bg';

// Fixed useTranslation hook to work with the correct structure
export const useTranslation = (language: Language) => {
  return (key: string): string => {
    const translation = allTranslations[key];
    if (!translation || !translation[language]) {
      console.log(`Missing translation for key: ${key}`);
      return key;
    }
    return translation[language];
  };
};
