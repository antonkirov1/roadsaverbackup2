
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Users, Globe } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import ThemeToggle from '@/components/ui/theme-toggle';

const Index = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useApp();
  const t = useTranslation(language);

  console.log('Index component mounted, language:', language);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600/10 to-background font-clash">
      {/* Header with theme toggle and language switcher */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <ThemeToggle showLabels={false} size="sm" />
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setLanguage(language === 'en' ? 'bg' : 'en')}
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

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            RoadSaver
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            {t('app-subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* User App Card */}
          <Card className="border-2 hover:border-green-500 transition-colors cursor-pointer" onClick={() => navigate('/user')}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                <Car className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">{t('user-app')}</CardTitle>
              <CardDescription className="text-lg">
                {t('for-customers')}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                {t('open-user-app')}
              </Button>
            </CardContent>
          </Card>

          {/* Employee App Card */}
          <Card className="border-2 hover:border-blue-500 transition-colors cursor-pointer" onClick={() => navigate('/employee')}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">{t('employee-app')}</CardTitle>
              <CardDescription className="text-lg">
                {t('for-service-providers')}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                {t('open-employee-app')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
