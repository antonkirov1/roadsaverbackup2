
interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

export const generalTranslations: TranslationGroup = {
  'app-subtitle': {
    en: 'Emergency road assistance when you need it most',
    bg: 'Спешна пътна помощ, когато най-много я нуждаете'
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
  },
  'welcome': {
    en: 'Welcome',
    bg: 'Добре дошли'
  },
  'services': {
    en: 'Services',
    bg: 'Услуги'
  },
  'ongoing-requests': {
    en: 'Ongoing Requests',
    bg: 'Текущи заявки'
  },
  'no-ongoing-requests': {
    en: 'No ongoing requests',
    bg: 'Няма текущи заявки'
  },
  'dashboard': {
    en: 'Dashboard',
    bg: 'Табло'
  },
  'employee-dashboard': {
    en: 'Dashboard for Employees',
    bg: 'Табло за служители'
  },
  'settings': {
    en: 'Settings',
    bg: 'Настройки'
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
    bg: 'Смени език'
  },
  'update-location': {
    en: 'Update Location',
    bg: 'Обнови местоположение'
  },
  'location-updated': {
    en: 'Location Updated',
    bg: 'Местоположението е обновено'
  },
  'location-updated-msg': {
    en: 'Your location has been successfully updated',
    bg: 'Вашето местоположение беше успешно обновено'
  },
  'location-access-denied': {
    en: 'Location Access Denied',
    bg: 'Отказан достъп до местоположение'
  },
  'location-access-message': {
    en: 'Please allow location access for better service',
    bg: 'Моля, разрешете достъп до местоположението за по-добро обслужване'
  },
  'emergency-services': {
    en: 'Emergency Services',
    bg: 'Спешни услуги'
  },
  'save': {
    en: 'Save',
    bg: 'Запази'
  },
  'cancel': {
    en: 'Cancel',
    bg: 'Отказ'
  },
  'confirm': {
    en: 'Confirm',
    bg: 'Потвърди'
  },
  'yes': {
    en: 'Yes',
    bg: 'Да'
  },
  'no': {
    en: 'No',
    bg: 'Не'
  },
  'edit': {
    en: 'Edit',
    bg: 'Редактирай'
  },
  'delete': {
    en: 'Delete',
    bg: 'Изтрий'
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
  'close': {
    en: 'Close',
    bg: 'Затвори'
  },
  'submit': {
    en: 'Submit',
    bg: 'Изпрати'
  },
  'search': {
    en: 'Search',
    bg: 'Търси'
  },
  'filter': {
    en: 'Filter',
    bg: 'Филтър'
  },
  'all': {
    en: 'All',
    bg: 'Всички'
  },
  'none': {
    en: 'None',
    bg: 'Няма'
  },
  'select': {
    en: 'Select',
    bg: 'Избери'
  },
  'back': {
    en: 'Back',
    bg: 'Назад'
  },
  'next': {
    en: 'Next',
    bg: 'Напред'
  },
  'previous': {
    en: 'Previous',
    bg: 'Предишен'
  },
  'continue': {
    en: 'Continue',
    bg: 'Продължи'
  },
  'finish': {
    en: 'Finish',
    bg: 'Завърши'
  },
  'start': {
    en: 'Start',
    bg: 'Започни'
  },
  'stop': {
    en: 'Stop',
    bg: 'Спри'
  },
  'pause': {
    en: 'Pause',
    bg: 'Пауза'
  },
  'resume': {
    en: 'Resume',
    bg: 'Продължи'
  },
  'retry': {
    en: 'Retry',
    bg: 'Опитай отново'
  },
  'refresh': {
    en: 'Refresh',
    bg: 'Обнови'
  },
  'clear': {
    en: 'Clear',
    bg: 'Изчисти'
  },
  'employee-assigned': {
    en: 'Employee Assigned',
    bg: 'Назначен служител'
  },
  'call-employee': {
    en: 'Call The Employee',
    bg: 'Обади се на служителя'
  },
  'request-in-progress': {
    en: 'Request in Progress',
    bg: 'Заявка в ход'
  },
  'service-completed': {
    en: 'Service Completed',
    bg: 'Услугата завършена'
  },
  'completed-time': {
    en: 'Completed Time',
    bg: 'Час на завършване'
  },
  'user': {
    en: 'User',
    bg: 'Потребител'
  },
  'employee': {
    en: 'Employee',
    bg: 'Служител'
  }
};
