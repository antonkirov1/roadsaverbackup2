
import { useState } from 'react';
import {
  useSecretQuestionValidation,
  useSecretQuestionDropdownValidation
} from './useSecretQuestionValidation';

export const useSecretQuestions = (t: (key: string) => string) => {
  // Secret Question 1
  const [secretQuestion1, setSecretQuestion1] = useState('');
  const {
    value: secretAnswer1,
    setValue: setSecretAnswer1,
    error: secretAnswer1Error,
    isValid: isSecretAnswer1Valid
  } = useSecretQuestionValidation(t);

  const {
    value: secretQuestion1Validation,
    setValue: setSecretQuestion1Validation,
    error: secretQuestion1Error,
    isValid: isSecretQuestion1Valid
  } = useSecretQuestionDropdownValidation(t);

  // Secret Question 2
  const [secretQuestion2, setSecretQuestion2] = useState('');
  const {
    value: secretAnswer2,
    setValue: setSecretAnswer2,
    error: secretAnswer2Error,
    isValid: isSecretAnswer2Valid
  } = useSecretQuestionValidation(t);

  const {
    value: secretQuestion2Validation,
    setValue: setSecretQuestion2Validation,
    error: secretQuestion2Error,
    isValid: isSecretQuestion2Valid
  } = useSecretQuestionDropdownValidation(t);

  const handleSecretQuestion1Change = (value: string) => {
    setSecretQuestion1(value);
    setSecretQuestion1Validation(value);
  };

  const handleSecretQuestion2Change = (value: string) => {
    setSecretQuestion2(value);
    setSecretQuestion2Validation(value);
  };

  const isSecretQuestionsValid = isSecretQuestion1Valid && isSecretAnswer1Valid && 
                                isSecretQuestion2Valid && isSecretAnswer2Valid;

  return {
    // Question 1
    secretQuestion1,
    secretAnswer1,
    setSecretAnswer1,
    secretQuestion1Error,
    secretAnswer1Error,
    isSecretQuestion1Valid,
    isSecretAnswer1Valid,
    handleSecretQuestion1Change,
    
    // Question 2
    secretQuestion2,
    secretAnswer2,
    setSecretAnswer2,
    secretQuestion2Error,
    secretAnswer2Error,
    isSecretQuestion2Valid,
    isSecretAnswer2Valid,
    handleSecretQuestion2Change,
    
    // Overall validation
    isSecretQuestionsValid
  };
};
