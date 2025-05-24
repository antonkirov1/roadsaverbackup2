
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface LanguageSwitcherControlsProps {
  currentLanguage: 'en' | 'bg';
  onLanguageChange: (language: 'en' | 'bg') => void;
  t: (key: string) => string;
}

const LanguageSwitcherControls: React.FC<LanguageSwitcherControlsProps> = ({
  currentLanguage,
  onLanguageChange,
  t,
}) => {
  const handleToggleLanguage = () => {
    onLanguageChange(currentLanguage === 'en' ? 'bg' : 'en');
  };

  return (
    // Changed from right-4 to left-4 and adjusted z-index
    <div className="absolute top-3 left-4 flex items-center z-20"> 
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleLanguage}
        className="text-foreground hover:bg-accent/50 h-8 w-auto px-2 flex items-center gap-1"
        title={t('change-language')}
      >
        <Globe className="h-4 w-4 animate-globe-pulse" />
        <span className="text-xs font-medium">
          {currentLanguage.toUpperCase()}
        </span>
      </Button>
    </div>
  );
};

export default LanguageSwitcherControls;
