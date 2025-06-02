
import { useState, useEffect } from 'react';

type ValidationRule<T> = (value: T) => { isValid: boolean; errorMessage: string | null };

export const useFieldValidation = <T,>(
  initialValue: T, 
  validationRules: ValidationRule<T>[], 
  dependencyValues: any[] = []
) => {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (value === initialValue && typeof initialValue !== 'boolean') {
      // Don't validate empty initial values
      setError('');
      setIsValid(false);
      return;
    }

    // Apply all validation rules in sequence
    for (const rule of validationRules) {
      const { isValid, errorMessage } = rule(value);
      if (!isValid) {
        setError(errorMessage || '');
        setIsValid(false);
        return;
      }
    }

    // If all validations pass
    setError('');
    setIsValid(true);
  }, [value, ...dependencyValues]);

  return {
    value,
    setValue,
    error,
    setError,
    isValid,
    setIsValid,
  };
};

// Utility functions for loading blacklists
export const loadBlacklist = async (filePath: string): Promise<string[]> => {
  try {
    const response = await fetch(filePath);
    const text = await response.text();
    return text.split('\n').map(word => word.trim().toLowerCase()).filter(word => word.length > 0);
  } catch (error) {
    console.error(`Failed to load blacklist from ${filePath}:`, error);
    return [];
  }
};
