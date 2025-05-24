
interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

// Authentication related translations
export const authTranslations: TranslationGroup = {
  'sign-in': {
    en: 'Sign In',
    bg: 'Вход'
  },
  'create-account': {
    en: 'Create Account',
    bg: 'Създаване на акаунт'
  },
  'username': {
    en: 'Username',
    bg: 'Потребителско име'
  },
  'email': {
    en: 'Email',
    bg: 'Имейл'
  },
  'password': {
    en: 'Password',
    bg: 'Парола'
  },
  'confirm-password': {
    en: 'Confirm Password',
    bg: 'Потвърдете паролата'
  },
  'back-to-login': {
    en: 'Back to Login',
    bg: 'Обратно към входа'
  },
  'signing-in': {
    en: 'Signing in...',
    bg: 'Влизане...'
  },
  'creating-account': {
    en: 'Creating Account...',
    bg: 'Създаване на акаунт...'
  },
  'logged-out': {
    en: 'Logged Out',
    bg: 'Излязохте'
  },
  'logged-out-msg': {
    en: 'You have been successfully logged out.',
    bg: 'Успешно излязохте от системата.'
  },
  'invalid-username-password': {
    en: 'Invalid username or password',
    bg: 'Невалидно потребителско име или парола'
  },
  'auth-error': {
    en: 'Authentication Failed',
    bg: 'Неуспешна автентикация'
  },
  'please-enter-both': {
    en: 'Please enter both username and password',
    bg: 'Моля, въведете потребителско име и парола'
  },
  'password-requirements': {
    en: 'Must be at least 8 characters with 1 uppercase letter',
    bg: 'Трябва да е поне 8 символа с 1 главна буква'
  },
  'enter-username': {
    en: 'Enter your username',
    bg: 'Въведете вашето потребителско име'
  },
  'enter-password': {
    en: 'Enter your password',
    bg: 'Въведете вашата парола'
  },
  'registration-successful': {
    en: 'Registration Successful',
    bg: 'Успешна регистрация'
  },
  'account-created': {
    en: 'Your account has been created successfully',
    bg: 'Вашият акаунт беше създаден успешно'
  },
  'user-account': {
    en: 'User Account',
    bg: 'Потребителски акаунт'
  },
  'auth-subtitle': {
    en: 'Emergency road assistance.',
    bg: 'Спешна пътна помощ.'
  },
  'switch-to-bulgarian': {
    en: 'Switch to Bulgarian',
    bg: 'Превключи на български'
  },
  'switch-to-english': {
    en: 'Switch to English',
    bg: 'Превключи на английски'
  },
  'login-successful': {
    en: 'Login Successful',
    bg: 'Успешен вход'
  },
  'welcome-to-roadsaver': {
    en: 'Welcome to RoadSaver!',
    bg: 'Добре дошли в RoadSaver!'
  },
  'account-created-welcome': {
    en: 'Your account has been created. Welcome!',
    bg: 'Акаунтът ви е създаден. Добре дошли!'
  },
};

