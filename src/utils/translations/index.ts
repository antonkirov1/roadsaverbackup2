import { authTranslations } from './auth';
import { serviceTranslations } from './service';
import { emergencyTranslations } from './emergency';
import { statusTranslations } from './status';
import { settingsTranslations } from './settings';
import { generalTranslations } from './general';
import { uiTranslations } from './ui';

// Combine all translation categories
export const translations = {
  ...authTranslations,
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
