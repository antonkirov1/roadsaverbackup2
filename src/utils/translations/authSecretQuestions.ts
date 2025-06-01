
interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

export const authSecretQuestionsTranslations: TranslationGroup = {
  'secret-question': {
    en: 'Secret Question',
    bg: 'Таен въпрос'
  },
  'your-answer': {
    en: 'Your Answer',
    bg: 'Вашият отговор'
  },
  'select-question': {
    en: '- Select -',
    bg: '- Изберете -'
  },
  'create-your-own-question': {
    en: 'Create your own question',
    bg: 'Създайте свой въпрос'
  },
  'enter-your-answer': {
    en: 'Enter your answer',
    bg: 'Въведете вашия отговор'
  },
  'secret-answer-required': {
    en: 'Answer is required',
    bg: 'Отговорът е задължителен'
  },
  'secret-answer-too-short': {
    en: 'Answer must be at least 2 characters',
    bg: 'Отговорът трябва да е поне 2 символа'
  },
  'secret-question-required': {
    en: 'Please select a question',
    bg: 'Моля, изберете въпрос'
  }
};
