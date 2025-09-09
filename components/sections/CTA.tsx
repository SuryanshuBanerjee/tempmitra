'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, Phone, Mail } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="glass-effect gentle-shadow p-8 md:p-12 text-center bg-gradient-to-br from-sage-50 to-cream-50 border-sage-200/30">
          <h2 className="text-3xl sm:text-4xl font-bold text-forest-600 mb-4">
            You're Not Alone in This Journey
          </h2>
          <p className="text-lg text-forest-500 mb-8 max-w-2xl mx-auto">
            Taking the first step to seek help is brave. Our team of qualified counselors and support 
            staff are here to provide you with the care and resources you need to thrive.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="h-6 w-6 text-sage-600" />
              </div>
              <h3 className="font-semibold text-forest-600 mb-1">Chat Support</h3>
              <p className="text-sm text-forest-500">Available 24/7</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-dusty-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="h-6 w-6 text-dusty-500" />
              </div>
              <h3 className="font-semibold text-forest-600 mb-1">Crisis Hotline</h3>
              <p className="text-sm text-forest-500">Immediate assistance</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-sand-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="h-6 w-6 text-sand-600" />
              </div>
              <h3 className="font-semibold text-forest-600 mb-1">Email Support</h3>
              <p className="text-sm text-forest-500">Response within 24hrs</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-sage-500 hover:bg-sage-600 text-white px-8 py-4">
              Get Help Now
            </Button>
            <Button size="lg" variant="outline" className="border-forest-500 text-forest-600 hover:bg-forest-50 px-8 py-4">
              Schedule Appointment
            </Button>
          </div>

          <div className="mt-8 p-4 bg-cream-100 rounded-lg border-l-4 border-dusty-400">
            <p className="text-sm text-forest-600">
              <strong>Crisis Support:</strong> If you're in immediate danger or having thoughts of self-harm, 
              please call emergency services (112) or contact your local crisis hotline immediately.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}