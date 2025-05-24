
interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

export const authRegisterTranslations: TranslationGroup = {
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
  }
};

