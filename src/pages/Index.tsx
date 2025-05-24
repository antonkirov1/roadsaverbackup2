
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Car } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';

const Index = () => {
  const { language, setLanguage } = useApp();
  const t = useTranslation(language);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-600/20 to-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">RoadSaver</h1>
          <p className="text-muted-foreground">Emergency Road Assistance Services</p>
          <div className="flex justify-center mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setLanguage(language === 'en' ? 'bg' : 'en')}
            >
              {language === 'en' ? 'BG' : 'EN'}
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('user-app')}</CardTitle>
              <CardDescription>{t('for-customers')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/user">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <User className="mr-2 h-5 w-5" /> {t('open-user-app')}
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('employee-app')}</CardTitle>
              <CardDescription>{t('for-service-providers')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/employee">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Car className="mr-2 h-5 w-5" /> {t('open-employee-app')}
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
