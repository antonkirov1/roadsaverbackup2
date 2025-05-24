interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

// Status and request-related translations
export const statusTranslations: TranslationGroup = {
  'pending': {
    en: 'Pending',
    bg: 'Чакащ'
  },
  'accepted': {
    en: 'Accepted',
    bg: 'Приет'
  },
  'declined': {
    en: 'Declined',
    bg: 'Отказан'
  },
  'completed': {
    en: 'Completed',
    bg: 'Завършен'
  },
  'new-request': {
    en: 'New Request',
    bg: 'Нова заявка'
  },
  'request-accepted': {
    en: 'Request Accepted',
    bg: 'Заявката е приета'
  },
  'request-declined': {
    en: 'Request Declined',
    bg: 'Заявката е отказана'
  },
  'customer-location': {
    en: 'Customer Location',
    bg: 'Местоположение на клиента'
  },
  'accept': {
    en: 'Accept',
    bg: 'Приемам'
  },
  'decline': {
    en: 'Decline',
    bg: 'Отказвам'
  },
  'close': {
    en: 'Close',
    bg: 'Затваряне'
  },
  'completed-requests': {
    en: 'Completed Requests',
    bg: 'Завършени заявки'
  },
  'completed-requests-desc': {
    en: 'View all completed service requests',
    bg: 'Вижте всички завършени заявки за услуги'
  }
};
