
import React from 'react';
import LanguageSwitcherControls from '@/components/settings/LanguageSwitcherControls';

interface EmployeeSettingsHeaderProps {
  currentLanguage: 'en' | 'bg';
  onLanguageChange: (language: 'en' | 'bg') => void;
  t: (key: string) => string;
}

const EmployeeSettingsHeader: React.FC<EmployeeSettingsHeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  t,
}) => {
  return (
    <div className="bg-blue-600 text-primary-foreground p-3 flex justify-between items-center flex-shrink-0 shadow-md">
      <h1 className="text-xl font-semibold font-clash">RoadSaver</h1>
      <div className="flex items-center">
        <LanguageSwitcherControls
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
          t={t}
          theme="employee"
        />
      </div>
    </div>
  );
};

export default EmployeeSettingsHeader;
