'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Heart, MessageCircle, Calendar, Users, BarChart } from 'lucide-react';
import Link from 'next/link';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Chat Support', href: '/chat', icon: MessageCircle },
    { label: 'Book Counselor', href: '/booking', icon: Calendar },
    { label: 'Resources', href: '/resources', icon: Heart },
    { label: 'Community', href: '/community', icon: Users },
    { label: 'Screening', href: '/screening', icon: BarChart },
    { label: 'Dashboard', href: '/dashboard', icon: BarChart },
  ];

    return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-sage-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="/Mitra Logo.png" 
                alt="MITRA Logo" 
                className="w-16 h-16 object-contain"
              />
              <span className="font-semibold text-xl text-forest-600">MITRA</span>
            </Link>
          </div>


          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-forest-600 hover:text-sage-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Button variant="default" className="bg-sage-500 hover:bg-sage-600 text-white">
              Signup / Login
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-forest-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden glass-effect border-t border-sage-200/30">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-forest-600 hover:text-sage-600 block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-2">
              <Button className="w-full bg-sage-500 hover:bg-sage-600 text-white">
                Signup/ Login
              </Button>
            </div>  
          </div>
        </div>
      )}
    </nav>
  );
}