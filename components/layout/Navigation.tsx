'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Heart, MessageCircle, Calendar, Users, BarChart, LogOut, User as UserIcon, Shield } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageToggle } from '@/components/ui/language-toggle';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, logout, isLoading } = useAuth();
  const { t } = useLanguage();

  const getNavItems = () => {
    const baseItems = [
      { label: t('nav.chatSupport'), href: '/chat', icon: MessageCircle },
      { label: t('nav.bookCounselor'), href: '/booking', icon: Calendar },
      { label: t('nav.resources'), href: '/resources', icon: Heart },
      { label: t('nav.community'), href: '/community', icon: Users },
      { label: t('nav.assessments'), href: '/screening', icon: BarChart },
    ];

    // Add admin dashboard only for admin users
    if (user?.is_admin) {
      baseItems.push({ label: t('nav.adminDashboard'), href: '/dashboard', icon: Shield });
    }

    return baseItems;
  };

  const handleAuthSuccess = (userData: any) => {
    setShowAuthModal(false);
  };

    return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-sage-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-shrink-0 mr-8">
            <Link href="/" className="flex items-center space-x-3">
              <img 
                src="/Mitra Logo.png" 
                alt="MITRA Logo" 
                className="w-14 h-14 object-contain"
              />
              <span className="font-semibold text-xl text-forest-600">MITRA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block flex-1">
            <div className="flex items-center justify-center space-x-1 xl:space-x-2">
              {getNavItems().map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-forest-600 hover:text-sage-600 px-2 py-2 rounded-md text-xs xl:text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block flex-shrink-0">
            <div className="flex items-center space-x-2">
              <LanguageToggle />
              <ThemeToggle />
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <UserIcon className="h-4 w-4" />
                      <span>{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="font-medium">
                      {user.name}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-sm text-gray-500">
                      {user.email}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {user.is_admin && (
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center">
                          <Shield className="h-4 w-4 mr-2" />
                          {t('nav.adminDashboard')}
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('nav.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="default" 
                  className="bg-sage-500 hover:bg-sage-600 text-white"
                  onClick={() => setShowAuthModal(true)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : t('nav.loginSignup')}
                </Button>
              )}
            </div>
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
            {getNavItems().map((item) => (
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
            <div className="pt-2 space-y-2">
              <div className="flex justify-center space-x-2">
                <LanguageToggle />
                <ThemeToggle />
              </div>
              {user ? (
                <div className="space-y-2">
                  <div className="px-3 py-2 text-sm text-forest-600 font-medium">
                    {user.name}
                  </div>
                  {user.is_admin && (
                    <Link 
                      href="/dashboard" 
                      className="block px-3 py-2 text-forest-600 hover:text-sage-600 flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      {t('nav.adminDashboard')}
                    </Link>
                  )}
                  <Button 
                    onClick={logout} 
                    variant="outline"
                    className="w-full text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('nav.logout')}
                  </Button>
                </div>
              ) : (
                <Button 
                  className="w-full bg-sage-500 hover:bg-sage-600 text-white"
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsOpen(false);
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : t('nav.loginSignup')}
                </Button>
              )}
            </div>  
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onAuthSuccess={handleAuthSuccess}
      />
    </nav>
  );
}