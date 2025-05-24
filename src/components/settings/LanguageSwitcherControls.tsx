
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  // On mobile, a simpler version without tooltips
  if (isMobile) {
    return (
      <div className="absolute top-4 right-12 flex space-x-1 z-10">
        <Button
          variant={currentLanguage === 'en' ? 'secondary' : 'ghost'}
          size="icon"
          onClick={() => onLanguageChange('en')}
          className="h-8 w-8"
          aria-label={t('english')}
        >
          <span role="img" aria-label="British Flag">🇬🇧</span>
        </Button>
        <Button
          variant={currentLanguage === 'bg' ? 'secondary' : 'ghost'}
          size="icon"
          onClick={() => onLanguageChange('bg')}
          className="h-8 w-8"
          aria-label={t('bulgarian')}
        >
          <span role="img" aria-label="Bulgarian Flag">🇧🇬</span>
        </Button>
      </div>
    );
  }
  
  // Desktop version with tooltips
  return (
    <TooltipProvider delayDuration={300}>
      <div className="absolute top-4 right-12 flex space-x-1 z-10">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={currentLanguage === 'en' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => onLanguageChange('en')}
              className="h-8 w-8"
              aria-label={t('english')}
            >
              <span role="img" aria-label="British Flag">🇬🇧</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('english')}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={currentLanguage === 'bg' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => onLanguageChange('bg')}
              className="h-8 w-8"
              aria-label={t('bulgarian')}
            >
              <span role="img" aria-label="Bulgarian Flag">🇧🇬</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('bulgarian')}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default LanguageSwitcherControls;
