
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import RegisterFormFieldInput from './RegisterFormFieldInput';
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface SecretQuestionFieldProps {
  questionNumber: number;
  selectedQuestion: string;
  onQuestionChange: (value: string) => void;
  answer: string;
  onAnswerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  questionError: string;
  answerError: string;
  isQuestionValid: boolean;
  isAnswerValid: boolean;
  customQuestion: string;
  onCustomQuestionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customQuestionError: string;
  isCustomQuestionValid: boolean;
  t: (key: string) => string;
}

const secretQuestions = [
  'Where did you spend your honeymoon?',
  'Where did you meet your spouse?',
  'What is your oldest cousin\'s name?',
  'What is your youngest child\'s nickname?',
  'What is your oldest child\'s nickname?',
  'What is the first name of your oldest niece?',
  'What is the first name of your oldest nephew?',
  'What is the first name of your favorite aunt?',
  'What is the first name of your favorite uncle?',
  'What town was your father born in?',
  'What town was your mother born in?'
];

const SecretQuestionField: React.FC<SecretQuestionFieldProps> = ({
  questionNumber,
  selectedQuestion,
  onQuestionChange,
  answer,
  onAnswerChange,
  questionError,
  answerError,
  isQuestionValid,
  isAnswerValid,
  customQuestion,
  onCustomQuestionChange,
  customQuestionError,
  isCustomQuestionValid,
  t
}) => {
  const renderValidationIcon = (isValid: boolean, error: string) => {
    if (error) return <AlertCircle className="h-5 w-5 text-red-500" />;
    if (isValid) return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    return null;
  };

  const isCustomSelected = selectedQuestion === 'custom';

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`secret-question-${questionNumber}`}>
          {t('secret-question')} {questionNumber}:
        </Label>
        <div className="relative">
          <Select value={selectedQuestion} onValueChange={onQuestionChange}>
            <SelectTrigger className={`border-2 focus:ring-green-600 focus:border-green-600 ${questionError ? 'border-red-500' : isQuestionValid ? 'border-green-500' : ''}`}>
              <SelectValue placeholder={t('select-question')} />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
              {secretQuestions.map((question, index) => (
                <SelectItem key={index} value={question} className="hover:bg-gray-100">
                  {question}
                </SelectItem>
              ))}
              <SelectItem value="custom" className="hover:bg-gray-100">
                - {t('create-your-own-question')} -
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {renderValidationIcon(isQuestionValid, questionError)}
          </div>
        </div>
        {questionError && <p className="text-red-500 text-xs mt-1">{questionError}</p>}
      </div>

      {isCustomSelected && (
        <div className="space-y-2">
          <Label htmlFor={`custom-question-${questionNumber}`}>
            {t('create-your-own-question')}:
          </Label>
          <div className="relative">
            <Input
              id={`custom-question-${questionNumber}`}
              type="text"
              placeholder={t('enter-your-custom-question')}
              value={customQuestion}
              onChange={onCustomQuestionChange}
              className={`border-2 focus:ring-green-600 focus:border-green-600 ${customQuestionError ? 'border-red-500' : isCustomQuestionValid ? 'border-green-500' : ''}`}
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {renderValidationIcon(isCustomQuestionValid, customQuestionError)}
            </div>
          </div>
          {customQuestionError && <p className="text-red-500 text-xs mt-1">{customQuestionError}</p>}
        </div>
      )}

      <RegisterFormFieldInput
        id={`secret-answer-${questionNumber}`}
        label={t('your-answer')}
        type="text"
        placeholder={t('enter-your-answer')}
        value={answer}
        onChange={onAnswerChange}
        error={answerError}
        isValid={isAnswerValid}
        renderValidationIcon={renderValidationIcon}
        t={t}
        required
      />
    </div>
  );
};

export default SecretQuestionField;
