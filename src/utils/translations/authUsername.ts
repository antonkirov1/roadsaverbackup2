
interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

export const authUsernameTranslations: TranslationGroup = {
  'username': {
    en: 'Username',
    bg: 'Потребителско име'
  },
  'enter-username': {
    en: 'Enter your username',
    bg: 'Въведете вашето потребителско име'
  },
  'username-min-length-error': {
    en: 'Username must be at least 3 characters',
    bg: 'Потребителското име трябва да е поне 3 символа'
  },
  'username-taken-error': {
    en: 'This username is already taken',
    bg: 'Това потребителско име е заето'
  },
  'username-profanity-error': {
    en: 'Username contains inappropriate words',
    bg: 'Потребителското име съдържа неподходящи думи'
  },
  'username-valid': {
    en: 'Username is available',
    bg: 'Потребителското име е налично'
  },
  'change-username-colon': {
    en: 'Change username:',
    bg: 'Промяна на потребителско име:'
  },
  'username-update-success': {
    en: 'Username updated successfully.',
    bg: 'Потребителското име е актуализирано успешно.'
  }
};

