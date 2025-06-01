
interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

export const generalTranslations: TranslationGroup = {
  'welcome': {
    en: 'Welcome',
    bg: 'Добре дошли'
  },
  'dashboard': {
    en: 'Dashboard',
    bg: 'Табло'
  },
  'settings': {
    en: 'Settings',
    bg: 'Настройки'
  },
  'logout': {
    en: 'Logout',
    bg: 'Изход'
  },
  'cancel': {
    en: 'Cancel',
    bg: 'Отказ'
  },
  'confirm': {
    en: 'Confirm',
    bg: 'Потвърди'
  },
  'save': {
    en: 'Save',
    bg: 'Запази'
  },
  'edit': {
    en: 'Edit',
    bg: 'Редактирай'
  },
  'delete': {
    en: 'Delete',
    bg: 'Изтрий'
  },
  'close': {
    en: 'Close',
    bg: 'Затвори'
  },
  'back': {
    en: 'Back',
    bg: 'Назад'
  },
  'next': {
    en: 'Next',
    bg: 'Напред'
  },
  'loading': {
    en: 'Loading...',
    bg: 'Зарежда...'
  },
  'error': {
    en: 'Error',
    bg: 'Грешка'
  },
  'success': {
    en: 'Success',
    bg: 'Успех'
  },
  'warning': {
    en: 'Warning',
    bg: 'Предупреждение'
  },
  'info': {
    en: 'Information',
    bg: 'Информация'
  },
  'yes': {
    en: 'Yes',
    bg: 'Да'
  },
  'no': {
    en: 'No',
    bg: 'Не'
  },
  'ok': {
    en: 'OK',
    bg: 'ОК'
  },
  'continue': {
    en: 'Continue',
    bg: 'Продължи'
  },
  'skip': {
    en: 'Skip',
    bg: 'Прескочи'
  },
  'retry': {
    en: 'Retry',
    bg: 'Опитай отново'
  },
  'refresh': {
    en: 'Refresh',
    bg: 'Обнови'
  },
  'update': {
    en: 'Update',
    bg: 'Актуализирай'
  },
  'upload': {
    en: 'Upload',
    bg: 'Качи'
  },
  'download': {
    en: 'Download',
    bg: 'Свали'
  },
  'share': {
    en: 'Share',
    bg: 'Споделя'
  },
  'copy': {
    en: 'Copy',
    bg: 'Копирай'
  },
  'paste': {
    en: 'Paste',
    bg: 'Постави'
  },
  'cut': {
    en: 'Cut',
    bg: 'Изрежи'
  },
  'select-all': {
    en: 'Select All',
    bg: 'Избери всички'
  },
  'clear': {
    en: 'Clear',
    bg: 'Изчисти'
  },
  'reset': {
    en: 'Reset',
    bg: 'Нулирай'
  },
  'submit': {
    en: 'Submit',
    bg: 'Изпрати'
  },
  'send': {
    en: 'Send',
    bg: 'Изпрати'
  },
  'receive': {
    en: 'Receive',
    bg: 'Получи'
  },
  'connect': {
    en: 'Connect',
    bg: 'Свържи'
  },
  'disconnect': {
    en: 'Disconnect',
    bg: 'Прекъсни'
  },
  'online': {
    en: 'Online',
    bg: 'Онлайн'
  },
  'offline': {
    en: 'Offline',
    bg: 'Офлайн'
  },
  'available': {
    en: 'Available',
    bg: 'Достъпен'
  },
  'unavailable': {
    en: 'Unavailable',
    bg: 'Недостъпен'
  },
  'enabled': {
    en: 'Enabled',
    bg: 'Включен'
  },
  'disabled': {
    en: 'Disabled',
    bg: 'Изключен'
  },
  'active': {
    en: 'Active',
    bg: 'Активен'
  },
  'inactive': {
    en: 'Inactive',
    bg: 'Неактивен'
  },
  'completed': {
    en: 'Completed',
    bg: 'Завършен'
  },
  'pending': {
    en: 'Pending',
    bg: 'Изчакване'
  },
  'failed': {
    en: 'Failed',
    bg: 'Неуспешен'
  },
  'processing': {
    en: 'Processing',
    bg: 'Обработва'
  },
  'searching': {
    en: 'Searching...',
    bg: 'Търси...'
  },
  'no-results': {
    en: 'No results found',
    bg: 'Няма намерени резултати'
  },
  'location-updated': {
    en: 'Location Updated',
    bg: 'Местоположението е обновено'
  },
  'location-updated-msg': {
    en: 'Your location has been successfully updated.',
    bg: 'Вашето местоположение беше успешно обновено.'
  },
  'location-access-denied': {
    en: 'Location Access Denied',
    bg: 'Достъпът до местоположение е отказан'
  },
  'location-access-message': {
    en: 'Please enable location access to get better service.',
    bg: 'Моля, разрешете достъп до местоположението за по-добро обслужване.'
  },
  'tap-to-view-details': {
    en: 'Tap to view details',
    bg: 'Докоснете за детайли'
  },
  'review-price-and-decide': {
    en: 'Review The Price And Decide',
    bg: 'Прегледайте цената и решете'
  },
  // Fixed index page texts - these will never change
  'app-subtitle': {
    en: 'Emergency road assistance when you need it most',
    bg: 'Спешна пътна помощ когато най-много се нуждаете от нея'
  },
  'user-app': {
    en: 'User App',
    bg: 'Потребителско приложение'
  },
  'for-customers': {
    en: 'For customers needing assistance',
    bg: 'За клиенти, нуждаещи се от помощ'
  },
  'open-user-app': {
    en: 'Open User App',
    bg: 'Отвори потребителското приложение'
  },
  'employee-app': {
    en: 'Employee App',
    bg: 'Служебно приложение'
  },
  'for-service-providers': {
    en: 'For service providers',
    bg: 'За доставчици на услуги'
  },
  'open-employee-app': {
    en: 'Open Employee App',
    bg: 'Отвори служебното приложение'
  }
};
