
// Add missing translations for settings menu
interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

// General translations that don't fit in other categories
export const generalTranslations: TranslationGroup = {
  'app-subtitle': {
    en: 'Road assistance services for every need',
    bg: 'Услуги за пътна помощ за всяка нужда'
  },
  'user-app': {
    en: 'User App',
    bg: 'Потребителско приложение'
  },
  'employee-app': {
    en: 'Employee App',
    bg: 'Приложение за служители'
  },
  'for-customers': {
    en: 'For customers needing road assistance',
    bg: 'За клиенти, нуждаещи се от пътна помощ'
  },
  'for-service-providers': {
    en: 'For service providers and employees',
    bg: 'За доставчици на услуги и служители'
  },
  'open-user-app': {
    en: 'Open User App',
    bg: 'Отвори потребителско приложение'
  },
  'open-employee-app': {
    en: 'Open Employee App',
    bg: 'Отвори приложение за служители'
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
  'change-language': {
    en: 'Change Language',
    bg: 'Промяна на езика'
  },
  'location-updated': {
    en: 'Location Updated',
    bg: 'Местоположението е актуализирано'
  },
  'location-updated-msg': {
    en: 'Your location has been updated successfully',
    bg: 'Вашето местоположение беше актуализирано успешно'
  },
  'current-phone': {
    en: 'Current phone number:',
    bg: 'Текущ телефонен номер:'
  },
  'account-info': {
    en: 'Account information',
    bg: 'Информация за акаунта'
  }
};
