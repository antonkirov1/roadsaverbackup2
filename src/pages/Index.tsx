import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Car, Globe, Database } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import ThemeToggle from '@/components/ui/theme-toggle';

const Index = () => {
  const {
    language,
    setLanguage
  } = useApp();
  const t = useTranslation(language);

  const handleLanguageToggle = () => {
    const newLanguage = language === 'en' ? 'bg' : 'en';
    setLanguage(newLanguage);
    console.log('Language changed to:', newLanguage);
    console.log('Testing translation:', t('Road Assistance'));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-600/20 to-background p-4 font-clash">
      {/* Top right controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <ThemeToggle showLabels={false} size="sm" />
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLanguageToggle}
            aria-label={t(language === 'en' ? 'switch-to-bulgarian' : 'switch-to-english')}
            className="h-10 w-10 bg-green-600 text-white hover:bg-green-700"
          >
            <Globe className="h-4 w-4" />
          </Button>
          <span className="absolute -bottom-1 -right-1 text-xs bg-white text-green-600 px-1 rounded">
            {language.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">RoadSaver</h1>
          <p className="text-muted-foreground">{t('app-subtitle')}</p>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('User App')}</CardTitle>
              <CardDescription>{t('For Customers Needing Assistance')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/user">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <User className="mr-2 h-5 w-5" /> {t('Open User App')}
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('Employee App')}</CardTitle>
              <CardDescription>{t('For Service Providers')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/employee">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Car className="mr-2 h-5 w-5" /> {t('Open Employee App')}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('RoadSaver Account Manager')}</CardTitle>
              <CardDescription>{t('Manage User And Employee Accounts')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Database className="mr-2 h-5 w-5" /> {t('Open Account Manager')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
