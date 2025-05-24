import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
// Tooltip components are not used in this version as per the dashboard example for simplicity in settings
// import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
// import { useIsMobile } from '@/hooks/use-mobile'; // Not strictly needed for this specific control if we make it consistent

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
  // const isMobile = useIsMobile(); // Keeping it simple and consistent with dashboard header button

  const handleToggleLanguage = () => {
    onLanguageChange(currentLanguage === 'en' ? 'bg' : 'en');
  };

  return (
    <div className="absolute top-3 right-4 flex items-center z-20"> {/* Adjusted top to align better, increased z-index */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleLanguage}
        className="text-foreground hover:bg-accent/50 h-8 w-auto px-2 flex items-center gap-1" // Adjusted for text
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
