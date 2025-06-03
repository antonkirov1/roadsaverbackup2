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

const mergeTranslations = (...translationObjects: any[]) => {
  const merged = { en: {}, bg: {} };
  
  translationObjects.forEach(obj => {
    Object.assign(merged.en, obj.en);
    Object.assign(merged.bg, obj.bg);
  });
  
  return merged;
};

const translations = mergeTranslations(
  authGeneralTranslations,
  authUsernameTranslations,
  authEmailTranslations,
  authPassword,
  authPhoneTranslations,
  authGenderTranslations,
  authRegisterTranslations,
  authLoginTranslations,
  authSecretQuestions,
  generalTranslations,
  uiTranslations,
  serviceTranslations,
  emergencyTranslations,
  settings,
  status,
  themeTranslations
);

export const useTranslation = (language: 'en' | 'bg') => {
  return (key: string) => {
    return translations[language][key] || key;
  };
};
