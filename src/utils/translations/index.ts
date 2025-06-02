
import { authGeneral } from './authGeneral';
import { authUsername } from './authUsername';
import { authEmail } from './authEmail';
import { authPassword } from './authPassword';
import { authPhone } from './authPhone';
import { authGender } from './authGender';
import { authRegister } from './authRegister';
import { authLogin } from './authLogin';
import { authSecretQuestions } from './authSecretQuestions';
import { general } from './general';
import { ui } from './ui';
import { service } from './service';
import { emergency } from './emergency';
import { settings } from './settings';
import { status } from './status';
import { theme } from './theme';

const mergeTranslations = (...translationObjects: any[]) => {
  const merged = { en: {}, bg: {} };
  
  translationObjects.forEach(obj => {
    Object.assign(merged.en, obj.en);
    Object.assign(merged.bg, obj.bg);
  });
  
  return merged;
};

const translations = mergeTranslations(
  authGeneral,
  authUsername,
  authEmail,
  authPassword,
  authPhone,
  authGender,
  authRegister,
  authLogin,
  authSecretQuestions,
  general,
  ui,
  service,
  emergency,
  settings,
  status,
  theme
);

export const useTranslation = (language: 'en' | 'bg') => {
  return (key: string) => {
    return translations[language][key] || key;
  };
};
