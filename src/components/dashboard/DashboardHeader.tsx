
import React from 'react';
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DashboardHeaderProps {
  user: any;
  language: string;
  onLanguageChange: (language: 'en' | 'bg') => void;
  onSignOut: () => void;
  t: (key: string) => string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  user,
  language,
  onLanguageChange,
  onSignOut,
  t
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-6">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{t('welcome')} {user?.username || 'User'}</h1>
          <p className="text-muted-foreground">{t('dashboard-desc')}</p>
        </div>
      </div>

      <div className="space-x-2 flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-9">
              <span className="sr-only">Toggle Theme</span>
              {isDarkMode ? (
                <SunIcon className="h-4 w-4" />
              ) : (
                <MoonIcon className="h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={toggleDarkMode}>
              {isDarkMode ? 'Light' : 'Dark'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-9">
              {language}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Select Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onLanguageChange('en')}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onLanguageChange('bg')}>
              Bulgarian
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" onClick={onSignOut}>
          {t('sign-out')}
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
