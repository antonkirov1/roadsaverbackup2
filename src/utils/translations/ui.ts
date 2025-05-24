
interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

// UI elements and buttons translations
export const uiTranslations: TranslationGroup = {
  'cancel': {
    en: 'Cancel',
    bg: 'Отказ'
  },
  'submit': {
    en: 'Submit',
    bg: 'Изпращане'
  },
  'close': {
    en: 'Close',
    bg: 'Затвори'
  },
  'send': {
    en: 'Send',
    bg: 'Изпрати'
  },
  'accept': {
    en: 'Accept',
    bg: 'Приеми'
  },
  'decline': {
    en: 'Decline',
    bg: 'Откажи'
  },
  'error': {
    en: 'Error',
    bg: 'Грешка'
  },
  'please-fill-fields': {
    en: 'Please fill in all fields',
    bg: 'Моля, попълнете всички полета'
  },
  'valid-email': {
    en: 'Please enter a valid email address',
    bg: 'Моля, въведете валиден имейл адрес'
  },
  'password-error': {
    en: 'Password Error',
    bg: 'Грешка в паролата'
  },
  'passwords-no-match': {
    en: 'Passwords do not match',
    bg: 'Паролите не съвпадат'
  },
  'alert': {
    en: 'Alert',
    bg: 'Предупреждение'
  },
  'alert-title': {
    en: 'Alert Title',
    bg: 'Заглавие на предупреждение'
  },
  'alert-description': {
    en: 'Alert Description',
    bg: 'Описание на предупреждение'
  },
};
