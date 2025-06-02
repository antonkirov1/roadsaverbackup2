
const themeTranslations = {
  'dark-mode': {
    en: 'Dark Mode',
    bg: 'Тъмен режим'
  },
  'light-mode': {
    en: 'Light Mode',
    bg: 'Светъл режим'
  },
  'theme': {
    en: 'Theme',
    bg: 'Тема'
  },
  'appearance': {
    en: 'Appearance',
    bg: 'Външен вид'
  }
};

export const theme = {
  en: Object.fromEntries(Object.entries(themeTranslations).map(([key, value]) => [key, value.en])),
  bg: Object.fromEntries(Object.entries(themeTranslations).map(([key, value]) => [key, value.bg]))
};
