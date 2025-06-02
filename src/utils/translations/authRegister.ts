
interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

const authRegisterTranslations: TranslationGroup = {
  'create-account': {
    en: 'Create Account',
    bg: 'Създаване на акаунт'
  },
  'creating-account': {
    en: 'Creating Account...',
    bg: 'Създаване на акаунт...'
  },
  'registration-successful': {
    en: 'Registration Successful',
    bg: 'Успешна регистрация'
  },
  'account-created': {
    en: 'Your account has been created successfully',
    bg: 'Вашият акаунт беше създаден успешно'
  },
  'account-created-welcome': {
    en: 'Your account has been created. Welcome!',
    bg: 'Акаунтът ви е създаден. Добре дошли!'
  },
  'join-roadsaver-desc': {
    en: 'Join RoadSaver to get assistance with your problems on the road.',
    bg: 'Присъединете се към RoadSaver, за да получите съдействие при проблеми на пътя.'
  },
  'fill-all-fields': {
    en: 'Please fill in all required fields',
    bg: 'Моля, попълнете всички задължителни полета'
  },
  'password-requirements': {
    en: 'Must be at least 8 characters with 1 uppercase letter',
    bg: 'Трябва да е поне 8 символа с 1 главна буква'
  }
};

export const authRegister = {
  en: Object.fromEntries(Object.entries(authRegisterTranslations).map(([key, value]) => [key, value.en])),
  bg: Object.fromEntries(Object.entries(authRegisterTranslations).map(([key, value]) => [key, value.bg]))
};
