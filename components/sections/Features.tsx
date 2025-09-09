'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Users, 
  Brain, 
  Headphones,
  Video,
  BarChart
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'AI-Guided Chat Support',
    description: 'Get immediate help with our intelligent chatbot that offers coping strategies and connects you to professionals when needed.',
    icon: MessageCircle,
    href: '/chat',
    color: 'sage',
  },
  {
    title: 'Counselor Booking',
    description: 'Schedule confidential appointments with qualified mental health professionals and campus counselors.',
    icon: Calendar,
    href: '/booking',
    color: 'dusty',
  },
  {
    title: 'Resource Library',
    description: 'Access a comprehensive collection of mental wellness guides, articles, and educational materials.',
    icon: BookOpen,
    href: '/resources',
    color: 'forest',
  },
  {
    title: 'Peer Support Community',
    description: 'Connect with other students in moderated support groups and forums facilitated by trained volunteers.',
    icon: Users,
    href: '/community',
    color: 'sand',
  },
  {
    title: 'Mindfulness Tools',
    description: 'Practice meditation, breathing exercises, and mindfulness techniques to manage stress and anxiety.',
    icon: Brain,
    href: '/mindfulness',
    color: 'sage',
  },
  {
    title: 'Audio Resources',
    description: 'Listen to guided relaxation sessions, sleep stories, and calming soundscapes in multiple languages.',
    icon: Headphones,
    href: '/audio',
    color: 'dusty',
  },
  {
    title: 'Video Guidance',
    description: 'Watch expert-led videos on mental health topics, coping strategies, and wellness practices.',
    icon: Video,
    href: '/videos',
    color: 'forest',
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor your mental wellness journey with mood tracking and personalized insights.',
    icon: BarChart,
    href: '/progress',
    color: 'sand',
  },
];

export function Features() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-forest-600 mb-4">
            Comprehensive Mental Health Support
          </h2>
          <p className="text-lg text-forest-500 max-w-2xl mx-auto">
            Everything you need to maintain your mental wellness in one secure, accessible platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="glass-effect gentle-shadow card-hover animate-fade-in border-none"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full bg-${feature.color}-100 flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
                </div>
                <CardTitle className="text-forest-600 text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-forest-500 text-center mb-4">
                  {feature.description}
                </CardDescription>
                <Link href={feature.href}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`w-full border-${feature.color}-300 text-${feature.color}-600 hover:bg-${feature.color}-50`}
                  >
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}