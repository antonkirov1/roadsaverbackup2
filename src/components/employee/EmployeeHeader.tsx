
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Settings } from 'lucide-react';
import { useTranslation } from '@/utils/translations';

interface EmployeeHeaderProps {
  language: 'en' | 'bg';
  onLanguageChange: (language: 'en' | 'bg') => void;
  onLogout: () => void;
  onSettingsOpen: () => void;
}

const EmployeeHeader: React.FC<EmployeeHeaderProps> = ({
  language,
  onLanguageChange,
  onLogout,
  onSettingsOpen
}) => {
  const t = useTranslation(language);
  
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0 z-10">
      <h1 className="text-xl font-bold">{t('employee-dashboard')}</h1>
      <div className="flex gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onLanguageChange(language === 'en' ? 'bg' : 'en')}
          className="text-white hover:bg-white/20"
        >
          {language === 'en' ? 'BG' : 'EN'}
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onSettingsOpen}
          className="text-white hover:bg-white/20"
        >
          <Settings className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onLogout}
          className="text-white hover:bg-white/20"
        >
          <User className="h-5 w-5 mr-1" /> {t('logout')}
        </Button>
      </div>
    </header>
  );
};

export default EmployeeHeader;
