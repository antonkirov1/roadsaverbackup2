
interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

// General and location related translations
export const generalTranslations: TranslationGroup = {
  'welcome': {
    en: 'Welcome to RoadSaver',
    bg: 'Добре дошли в RoadSaver'
  },
  'welcome-back': {
    en: 'Welcome back to RoadSaver',
    bg: 'Добре дошли отново в RoadSaver'
  },
  'update-location': {
    en: 'Update Your Location',
    bg: 'Актуализирайте местоположението си'
  },
  'location-updated': {
    en: 'Location Updated',
    bg: 'Местоположението е актуализирано'
  },
  'location-updated-msg': {
    en: 'Your location has been updated successfully.',
    bg: 'Местоположението ви беше актуализирано успешно.'
  },
  'customer-location': {
    en: 'Customer Location',
    bg: 'Местоположение на клиента'
  },
  'call-support': {
    en: 'Calling Support',
    bg: 'Свързване с поддръжка'
  },
  'connecting-support': {
    en: 'Connecting you to our support team...',
    bg: 'Свързване с екипа за поддръжка...'
  },
  'contact-support': {
    en: 'Contact Support',
    bg: 'Свържете се с поддръжка'
  },
  'return-home': {
    en: 'Return to Home',
    bg: 'Върнете се към началото'
  },
  'page-not-found': {
    en: 'Oops! Page not found',
    bg: 'Упс! Страницата не е намерена'
  },
  'location-access-denied': {
    en: 'Location Access Denied',
    bg: 'Отказан достъп до местоположение'
  },
  'location-access-message': {
    en: 'Using default location. For a better experience, please enable location services.',
    bg: 'Използване на местоположение по подразбиране. За по-добро преживяване, моля активирайте услугите за местоположение.'
  },
  '404': {
    en: '404',
    bg: '404'
  },
  'employee-dashboard': {
    en: 'RoadSaver Employee',
    bg: 'RoadSaver Служител'
  },
  'access-dashboard': {
    en: 'Access your employee dashboard',
    bg: 'Достъп до вашето служителско табло'
  },
  'open-user-app': {
    en: 'Open User App',
    bg: 'Отвори потребителско приложение'
  },
  'open-employee-app': {
    en: 'Open Employee App',
    bg: 'Отвори приложение за служители'
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
    en: 'For customers needing roadside assistance',
    bg: 'За клиенти, нуждаещи се от пътна помощ'
  },
  'for-service-providers': {
    en: 'For service providers and staff',
    bg: 'За доставчици на услуги и персонал'
  },
  'demo-accounts': {
    en: 'Demo Accounts:',
    bg: 'Демо акаунти:'
  },
  'new': {
    en: 'New',
    bg: 'Нов'
  },
  'minimum': {
    en: 'minimum',
    bg: 'минимум'
  },
  'employee-login-successful': {
    en: 'Employee Login Successful',
    bg: 'Успешен вход на служител'
  },
  'welcome-employee-dashboard': {
    en: 'Welcome to the RoadSaver employee dashboard!',
    bg: 'Добре дошли в служителското табло на RoadSaver!'
  },
};
