
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface LanguageSwitcherControlsProps {
  currentLanguage: 'en' | 'bg';
  onLanguageChange: (language: 'en' | 'bg') => void;
  t: (key: string) => string;
  className?: string; // Allow passing custom className for the wrapper
}

const LanguageSwitcherControls: React.FC<LanguageSwitcherControlsProps> = ({
  currentLanguage,
  onLanguageChange,
  t,
  className,
}) => {
  const handleToggleLanguage = () => {
    onLanguageChange(currentLanguage === 'en' ? 'bg' : 'en');
  };

  return (
    // Removed absolute positioning, parent will control layout. Added className prop.
    <div className={className}> 
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleLanguage}
        // Adjusted classes for better adaptability on different backgrounds
        // text-current will inherit color, hover:bg-black/20 provides subtle hover on dark/colored bg
        className="text-current hover:bg-black/20 h-8 w-auto px-2 flex items-center gap-1 rounded-md"
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
