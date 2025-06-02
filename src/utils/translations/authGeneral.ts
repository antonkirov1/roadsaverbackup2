
interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

const authGeneralTranslations: TranslationGroup = {
  'logged-out': {
    en: 'Logged Out',
    bg: 'Излязохте'
  },
  'logged-out-msg': {
    en: 'You have been successfully logged out.',
    bg: 'Успешно излязохте от системата.'
  },
  'auth-error': {
    en: 'Authentication Failed',
    bg: 'Неуспешна автентикация'
  },
  'user-account': {
    en: 'User Account',
    bg: 'Потребителски акаунт'
  },
  'auth-subtitle': {
    en: 'Road assistance services for every need.',
    bg: 'Услуги за пътна помощ за всяка нужда.'
  },
  'switch-to-bulgarian': {
    en: 'Switch to Bulgarian',
    bg: 'Превключи на български'
  },
  'switch-to-english': {
    en: 'Switch to English',
    bg: 'Превключи на английски'
  },
  'error-title': {
    en: 'Error',
    bg: 'Грешка'
  },
  'change-account-info': {
    en: 'Change account information',
    bg: 'Промяна на информацията за акаунта'
  },
  'save': {
    en: 'Save',
    bg: 'Запази'
  },
  'update-success-title': {
    en: 'Update Successful',
    bg: 'Успешно актуализиране'
  },
  'optional-field': {
    en: 'optional',
    bg: 'незадължително'
  }
};

export const authGeneral = {
  en: Object.fromEntries(Object.entries(authGeneralTranslations).map(([key, value]) => [key, value.en])),
  bg: Object.fromEntries(Object.entries(authGeneralTranslations).map(([key, value]) => [key, value.bg]))
};
