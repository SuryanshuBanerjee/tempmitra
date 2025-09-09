'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, Heart, Shield, Clock } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-forest-600 mb-6 animate-fade-in">
            Your Mental Health{' '}
            <span className="text-sage-500">Matters</span>
          </h1>
          <p className="text-xl sm:text-2xl text-forest-500 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in">
            A safe, confidential, and supportive digital space for college students 
            to access mental health resources, connect with counselors, and find community support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link href="/chat">
              <Button size="lg" className="bg-sage-500 hover:bg-sage-600 text-white px-8 py-4 text-lg">
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Chat Support
              </Button>
            </Link>
            <Link href="/resources">
              <Button size="lg" variant="outline" className="border-sage-500 text-sage-600 hover:bg-sage-50 px-8 py-4 text-lg">
                <Heart className="mr-2 h-5 w-5" />
                Explore Resources
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
            <h3 className="font-semibold text-forest-600 mb-2">100% Confidential</h3>
            <p className="text-forest-500 text-sm">Your privacy is protected. All conversations and data are encrypted and anonymous.</p>
          </Card>
          <Card className="p-6 text-center glass-effect gentle-shadow card-hover">
            <div className="w-12 h-12 bg-dusty-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-dusty-500" />
            </div>
            <h3 className="font-semibold text-forest-600 mb-2">24/7 Available</h3>
            <p className="text-forest-500 text-sm">Support is available around the clock whenever you need it most.</p>
          </Card>
          <Card className="p-6 text-center glass-effect gentle-shadow card-hover">
            <div className="w-12 h-12 bg-sand-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-sand-600" />
            </div>
            <h3 className="font-semibold text-forest-600 mb-2">Stigma-Free</h3>
            <p className="text-forest-500 text-sm">A judgment-free zone designed to make seeking help feel comfortable and safe.</p>
          </Card>
        </div>
      </div>
    </section>
  );
}