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
  'username-min-length-error': {
    en: 'Username must be at least 3 characters',
    bg: 'Потребителското име трябва да е поне 3 символа'
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
  'join-roadsaver-desc': {
    en: 'Join RoadSaver for emergency road assistance',
    bg: 'Присъединете се към RoadSaver за спешна пътна помощ'
  },
  'enter-email-placeholder': {
    en: 'Enter your email address',
    bg: 'Въведете вашия имейл адрес'
  },
  'phone-number-label': {
    en: 'Phone Number',
    bg: 'Телефонен номер'
  },
  'phone-placeholder': {
    en: '+359XXXXXXXXX',
    bg: '+359XXXXXXXXX'
  },
  'phone-helper-text': {
    en: 'Must be 13 characters starting with +359',
    bg: 'Трябва да е 13 символа, започващ с +359'
  },
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
  },
  'create-password-placeholder': {
    en: 'Create a password',
    bg: 'Създайте парола'
  },
  'confirm-password-placeholder': {
    en: 'Confirm your password',
    bg: 'Потвърдете вашата парола'
  },
  'error-title': {
    en: 'Error',
    bg: 'Грешка'
  },
  'fill-all-fields': {
    en: 'Please fill in all required fields',
    bg: 'Моля, попълнете всички задължителни полета'
  },
  'phone-error-title': {
    en: 'Phone Number Error',
    bg: 'Грешка в телефонния номер'
  },
  'phone-invalid-format': {
    en: 'Phone number must be exactly 13 characters starting with +359',
    bg: 'Телефонният номер трябва да е точно 13 символа, започващ с +359'
  },
  'email-invalid-format': {
    en: 'Please enter a valid email address',
    bg: 'Моля, въведете валиден имейл адрес'
  },
  'password-error-title': {
    en: 'Password Error',
    bg: 'Грешка в паролата'
  },
  'password-length-error': {
    en: 'Password must be at least 8 characters long',
    bg: 'Паролата трябва да е поне 8 символа'
  },
  'password-uppercase-error': {
    en: 'Password must contain at least one uppercase letter',
    bg: 'Паролата трябва да съдържа поне една главна буква'
  },
  'passwords-do-not-match': {
    en: 'Passwords do not match',
    bg: 'Паролите не съвпадат'
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
  'email-taken-error': {
    en: 'This email is already registered',
    bg: 'Този имейл вече е регистриран'
  },
  'email-profanity-error': {
    en: 'Email contains inappropriate words',
    bg: 'Имейлът съдържа неподходящи думи'
  },
  'email-valid': {
    en: 'Email address is valid',
    bg: 'Имейл адресът е валиден'
  },
  'password-valid': {
    en: 'Password is strong',
    bg: 'Паролата е силна'
  },
  'confirm-password-valid': {
    en: 'Passwords match',
    bg: 'Паролите съвпадат'
  },
  'change-account-info': {
    en: 'Change account information',
    bg: 'Промяна на информацията за акаунта'
  },
  'change-username-colon': {
    en: 'Change username:',
    bg: 'Промяна на потребителско име:'
  },
  'change-email-colon': {
    en: 'Change email:',
    bg: 'Промяна на имейл:'
  },
  'change-phone-colon': {
    en: 'Change phone number:',
    bg: 'Промяна на телефонен номер:'
  },
  'change-password-colon': {
    en: 'Change password:',
    bg: 'Промяна на парола:'
  },
  'save': {
    en: 'Save',
    bg: 'Запази'
  },
  'current-password-prompt-title': {
    en: 'Confirm Change',
    bg: 'Потвърди промяната'
  },
  'current-password-prompt-desc': {
    en: 'Please enter your current password to save changes.',
    bg: 'Моля, въведете текущата си парола, за да запазите промените.'
  },
  'enter-current-password': {
    en: 'Enter current password',
    bg: 'Въведете текуща парола'
  },
  'incorrect-password-error': {
    en: 'Incorrect password',
    bg: 'Грешна парола'
  },
  'update-success-title': {
    en: 'Update Successful',
    bg: 'Успешно актуализиране'
  },
  'username-update-success': {
    en: 'Username updated successfully.',
    bg: 'Потребителското име е актуализирано успешно.'
  },
  'email-update-success': {
    en: 'Email updated successfully.',
    bg: 'Имейлът е актуализиран успешно.'
  },
  'phone-update-success': {
    en: 'Phone number updated successfully.',
    bg: 'Телефонният номер е актуализиран успешно.'
  },
  'password-update-success': {
    en: 'Password updated successfully.',
    bg: 'Паролата е актуализирана успешно.'
  },
  'new-password-placeholder': {
    en: 'New password',
    bg: 'Нова парола'
  },
  'show-password': {
    en: 'Show password',
    bg: 'Покажи паролата'
  },
  'hide-password': {
    en: 'Hide password',
    bg: 'Скрий паролата'
  },
  'optional-field': {
    en: 'optional',
    bg: 'незадължително'
  }
};
