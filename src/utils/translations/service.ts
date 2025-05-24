interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

// Service-related translations
export const serviceTranslations: TranslationGroup = {
  'flat-tyre': {
    en: 'Flat Tyre',
    bg: 'Спукана гума'
  },
  'out-of-fuel': {
    en: 'Out of Fuel',
    bg: 'Без гориво'
  },
  'other-car-problems': {
    en: 'Other Car Problems',
    bg: 'Други проблеми с колата'
  },
  'car-battery': {
    en: 'Car Battery Issues',
    bg: 'Проблеми с батерията'
  },
  'tow-truck': {
    en: 'I Need a Tow Truck',
    bg: 'Нужен ми е влекач'
  },
  'emergency': {
    en: 'Call Emergency Services',
    bg: 'Спешни служби'
  },
  'support': {
    en: 'Contact Support',
    bg: 'Свържете се с поддръжка'
  },
  'flat-tyre-desc': {
    en: 'Get help changing a flat tyre',
    bg: 'Получете помощ за смяна на спукана гума'
  },
  'out-of-fuel-desc': {
    en: 'Request fuel delivery',
    bg: 'Заявка за доставка на гориво'
  },
  'other-car-problems-desc': {
    en: 'Get help with various car problems',
    bg: 'Получете помощ за различни проблеми с колата'
  },
  'car-battery-desc': {
    en: 'Get help with battery issues',
    bg: 'Получете помощ за проблеми с батерията'
  },
  'tow-truck-desc': {
    en: 'Request towing service',
    bg: 'Заявка за услуга с влекач'
  },
  'emergency-desc': {
    en: 'Contact emergency services',
    bg: 'Спешни служби'
  },
  'support-desc': {
    en: 'Speak with our support team',
    bg: 'Говорете с нашия екип за поддръжка'
  },
  'service': {
    en: 'Service',
    bg: 'Услуга'
  },
  'service-desc': {
    en: 'Request assistance',
    bg: 'Заявка за помощ'
  },
  'services': {
    en: 'Services',
    bg: 'Услуги'
  },
  'service-requests': {
    en: 'Service Requests',
    bg: 'Заявки за услуги'
  },
  'service-request': {
    en: 'Service Request:',
    bg: 'Заявка за услуга:'
  },
  'new-service-request': {
    en: 'You have received a new service request',
    bg: 'Получихте нова заявка за услуга'
  },
  'decline-service-request': {
    en: 'Decline Service Request',
    bg: 'Отказване на заявката за услуга'
  },
  'from': {
    en: 'From:',
    bg: 'От:'
  },
};
