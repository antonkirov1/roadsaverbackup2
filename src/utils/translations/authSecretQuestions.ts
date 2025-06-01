
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
  'enter-your-custom-question': {
    en: 'Enter your custom question',
    bg: 'Въведете вашия персонален въпрос'
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
  },
  'custom-question-required': {
    en: 'Please enter your custom question',
    bg: 'Моля, въведете вашия персонален въпрос'
  },
  'custom-question-too-short': {
    en: 'Custom question must be at least 5 characters',
    bg: 'Персоналният въпрос трябва да е поне 5 символа'
  }
};
