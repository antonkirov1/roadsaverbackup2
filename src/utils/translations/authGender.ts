
interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

const authGenderTranslations: TranslationGroup = {
  'gender-label': {
    en: 'Gender',
    bg: 'Пол'
  },
  'man-label': {
    en: 'Man',
    bg: 'Мъж'
  },
  'woman-label': {
    en: 'Woman',
    bg: 'Жена'
  },
  'not-specified-label': {
    en: 'Not specified',
    bg: 'Не е посочено'
  }
};

export const authGender = {
  en: Object.fromEntries(Object.entries(authGenderTranslations).map(([key, value]) => [key, value.en])),
  bg: Object.fromEntries(Object.entries(authGenderTranslations).map(([key, value]) => [key, value.bg]))
};
