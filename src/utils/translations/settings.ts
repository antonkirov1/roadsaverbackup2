interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

// Settings and UI-related translations
export const settingsTranslations: TranslationGroup = {
  'settings': {
    en: 'Settings',
    bg: 'Настройки'
  },
  'configure-preferences': {
    en: 'Configure your preferences and account settings',
    bg: 'Конфигурирайте вашите предпочитания и настройки на акаунта'
  },
  'account': {
    en: 'Account',
    bg: 'Акаунт'
  },
  'about': {
    en: 'About us',
    bg: 'За нас'
  },
  'payment': {
    en: 'Payment',
    bg: 'Плащане'
  },
  'history': {
    en: 'History',
    bg: 'История'
  },
  'user-account': {
    en: 'User Account',
    bg: 'Потребителски акаунт'
  },
  'username': {
    en: 'Username',
    bg: 'Потребителско име'
  },
  'email': {
    en: 'Email',
    bg: 'Имейл'
  },
  'language': {
    en: 'Language',
    bg: 'Език'
  },
  'english': {
    en: 'English',
    bg: 'Английски'
  },
  'bulgarian': {
    en: 'Bulgarian',
    bg: 'Български'
  },
  'logout': {
    en: 'Logout',
    bg: 'Изход'
  },
  'logged-out': {
    en: 'Logged Out',
    bg: 'Излязохте'
  },
  'logged-out-msg': {
    en: 'You have been logged out successfully',
    bg: 'Успешно излязохте от системата'
  },
  'version': {
    en: 'Version',
    bg: 'Версия'
  },
  'contact-information': {
    en: 'Contact Information',
    bg: 'Информация за контакт'
  },
  'phone': {
    en: 'Phone',
    bg: 'Телефон'
  },
  'payment-options': {
    en: 'Payment Options',
    bg: 'Опции за плащане'
  },
  'payment-future-update': {
    en: 'Payment options will be available in a future update.',
    bg: 'Опциите за плащане ще бъдат налични в бъдеща актуализация.'
  },
  'add-payment-method': {
    en: 'Add Payment Method',
    bg: 'Добавяне на метод за плащане'
  },
  'request-history': {
    en: 'Request History',
    bg: 'История на заявките'
  },
  'no-requests': {
    en: 'No requests found',
    bg: 'Няма намерени заявки'
  },
  'requests-desc': {
    en: 'View all your previous service requests',
    bg: 'Вижте всички ваши предишни заявки за услуги'
  },
  'phone-number': {
    en: 'Phone number:',
    bg: 'Телефонен номер:'
  },
  'phone-number-label': {
    en: 'Phone Number',
    bg: 'Телефонен номер'
  },
  'change-account-info': {
    en: 'Change Account Information',
    bg: 'Промяна на информация за акаунта'
  },
  'completed-time': {
    en: 'Completed',
    bg: 'Завършено в'
  },
  'user': {
    en: 'User',
    bg: 'Потребител'
  },
  'employee': {
    en: 'Employee',
    bg: 'Служител'
  },
  'flat-tyre': { en: 'Flat Tyre', bg: 'Спукана гума' },
  'out-of-fuel': { en: 'Out of Fuel', bg: 'Без гориво' },
  'car-battery': { en: 'Car Battery', bg: 'Акумулатор' },
  'tow-truck': { en: 'Tow Truck', bg: 'Пътна помощ (влекач)' },
  'other-car-problems': { en: 'Other Car Problems', bg: 'Други проблеми с автомобила' },
  'completed': { en: 'Completed', bg: 'Завършена' },
  'work-hours-line1': {
    en: 'Emergency road assistance service work hours:',
    bg: 'Работно време на спешна пътна помощ:'
  },
  'work-hours-line2': {
    en: 'Mon - Friday from 09:00 - 17:00.',
    bg: 'Пон - Петък от 09:00 - 17:00.'
  },
  'outside-hours-contact': {
    en: 'For service requests outside of working hours,\nplease contact support',
    bg: 'За заявки за услуги извън работно време,\nмоля, свържете се с поддръжката'
  }
};
