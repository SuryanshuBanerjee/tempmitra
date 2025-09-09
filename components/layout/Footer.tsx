'use client';

import Link from 'next/link';
import { Heart, Phone, Mail, MapPin, Clock } from 'lucide-react';

const quickLinks = [
  { label: 'Chat Support', href: '/chat' },
  { label: 'Book Counselor', href: '/booking' },
  { label: 'Resources', href: '/resources' },
];

const supportLinks = [
  { label: 'Community Forum', href: '/community' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Contact Us', href: '/contact' },
];

const emergencyContacts = [
  { label: 'Emergency Services', number: '112' },
  { label: 'Mental Health Helpline', number: '1800-599-0019' },
  { label: 'Campus Counseling', number: '+91-XXXX-XXXX' },
];

export function Footer() {
  return (
    <footer className="bg-forest-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              </div>
              <span className="font-semibold text-xl">Mitra</span>
            
            <p className="text-forest-200 text-sm">
              Supporting student mental health with compassionate, confidential, and comprehensive care.
            </p>
            <div className="space-y-2 text-sm text-forest-200">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Government of Jammu and Kashmir</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Available 24/7</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Access</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-forest-200 hover:text-sage-300 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-forest-200 hover:text-sage-300 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Emergency Contacts</h3>
            <ul className="space-y-3">
              {emergencyContacts.map((contact) => (
                <li key={contact.label}>
                  <div className="text-sm">
                    <div className="text-forest-200">{contact.label}</div>
                    <a 
                      href={`tel:${contact.number}`}
                      className="text-sage-300 hover:text-sage-200 font-semibold"
                    >
                      {contact.number}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 p-3 bg-forest-700 rounded-lg">
              <p className="text-xs text-forest-100">
                <strong>Crisis Alert:</strong> If you're in immediate danger, call emergency services immediately.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-forest-500 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-forest-200 text-sm">
              © 2025 Mitra  . Developed for Government of Jammu and Kashmir. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="mailto:support@mindwell.edu" className="text-forest-200 hover:text-sage-300">
                <Mail className="h-5 w-5" />
              </a>
              <a href="tel:+91-XXXX-XXXX" className="text-forest-200 hover:text-sage-300">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}