'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, Heart, Shield, Clock } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export function Hero() {
  const { t } = useLanguage();
  
  return (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-forest-600 mb-6 animate-fade-in">
            {t('home.title')}
          </h1>
          <p className="text-xl sm:text-2xl text-forest-500 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in">
            {t('home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link href="/chat">
              <Button size="lg" className="bg-sage-500 hover:bg-sage-600 text-white px-8 py-4 text-lg">
                <MessageCircle className="mr-2 h-5 w-5" />
{t('home.getStarted')}
              </Button>
            </Link>
            <Link href="/resources">
              <Button size="lg" variant="outline" className="border-sage-500 text-sage-600 hover:bg-sage-50 px-8 py-4 text-lg">
                <Heart className="mr-2 h-5 w-5" />
{t('home.learnMore')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <Card className="p-6 text-center glass-effect gentle-shadow card-hover">
            <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-sage-600" />
            </div>
            <h3 className="font-semibold text-forest-600 mb-2">{t('home.confidential')}</h3>
            <p className="text-forest-500 text-sm">{t('home.confidentialDesc')}</p>
          </Card>
          <Card className="p-6 text-center glass-effect gentle-shadow card-hover">
            <div className="w-12 h-12 bg-dusty-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-dusty-500" />
            </div>
            <h3 className="font-semibold text-forest-600 mb-2">{t('home.available')}</h3>
            <p className="text-forest-500 text-sm">{t('home.availableDesc')}</p>
          </Card>
          <Card className="p-6 text-center glass-effect gentle-shadow card-hover">
            <div className="w-12 h-12 bg-sand-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-sand-600" />
            </div>
            <h3 className="font-semibold text-forest-600 mb-2">{t('home.stigmaFree')}</h3>
            <p className="text-forest-500 text-sm">{t('home.stigmaFreeDesc')}</p>
          </Card>
        </div>
      </div>
    </section>
  );
}