import { startTransition } from "react";

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
    en: 'Out Of Fuel',
    bg: 'Без гориво'
  },
  'other-car-problems': {
    en: 'Other Car Problems',
    bg: 'Други проблеми с колата'
  },
  'car-battery-problems': {
    en: 'Car Battery Problems/My car would not start.',
    bg: 'Проблеми с акумулатора/Колата ми не пали.'
  },
  'tow-truck': {
    en: 'I Need A Tow Truck.',
    bg: 'Нужен ми е влекач.'
  },
  'emergency': {
    en: 'Call Emergency Services',
    bg: 'Свържете се със Спешните служби'
  },
  'support': {
    en: 'Contact Support',
    bg: 'Свържете се с поддръжката'
  },
  'flat-tyre-desc': {
    en: 'Get help changing a flat tyre.',
    bg: 'Получете помощ за смяна на сукана гума.'
  },
  'out-of-fuel-desc': {
    en: 'Request fuel delivery',
    bg: 'Доставка на гориво'
  },
  'other-car-problems-desc': {
    en: 'Get help with various car problems.',
    bg: 'Получете помощ при други проблеми с автомобила ви.'
  },
  'car-battery-desc': {
    en: 'Get help with your car battery issues or with ignition issues.',
    bg: 'Помощ при проблеми с акумулатора, или ако колата ви не пали.'
    
    
  },
  'tow-truck-desc': {
    en: 'Request a towing service',
    bg: 'Заявка за влекач'
  },
  'emergency-desc': {
    en: 'Contact emergency services',
    bg: 'Свържете се със Спешни служби'
  },
  'support-desc': {
    en: 'Speak with our support team.',
    bg: 'Говорете с нашия екип за поддръжка.'
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
    en: 'You have received a new service request.',
    bg: 'Получихте нова заявка за услуга.'
  },
  'decline-service-request': {
    en: 'Decline Service Request',
    bg: 'Отказване на заявката за услуга'
  },
  'from': {
    en: 'From:',
    bg: 'От:'
  },
  'write-email': {
    en: 'Write us an email.',
    bg: 'Напишете ни имейл.'
  },
  'give-call': {
    en: 'Give us a call.',
    bg: 'Обадете ни се.'
  },
  'contact-options': {
    en: 'Contact Options',
    bg: 'Опции за контакт'
  },
  'new-request': {
    en: 'New Request',
    bg: 'Нова заявка'
  },
  'outside-hours': {
    en: 'For service requests outside of working hours, please contact support.',
    bg: 'За заявки за услуги извън работното време, моля свържете се с поддръжката.'
  },
  'phone-number': {
    en: 'Phone number:',
    bg: 'Телефонен номер:'
  },
  'completed-at': {
    en: 'Completed at',
    bg: 'Завършено в'
  }
};
