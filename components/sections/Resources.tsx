'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, TrendingUp, Download } from 'lucide-react';

const resourceCategories = [
  {
    title: 'Stress & Anxiety Management',
    description: 'Learn effective techniques to manage academic and personal stress.',
    resources: 12,
    rating: 4.8,
    color: 'sage',
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'Sleep & Wellness',
    description: 'Improve your sleep quality and establish healthy routines.',
    resources: 8,
    rating: 4.7,
    color: 'dusty',
    image: 'https://images.pexels.com/photos/935777/pexels-photo-935777.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'Academic Pressure',
    description: 'Strategies to handle exam stress and academic challenges.',
    resources: 15,
    rating: 4.9,
    color: 'forest',
    image: 'https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'Relationship & Social Support',
    description: 'Building healthy relationships and overcoming social anxiety.',
    resources: 10,
    rating: 4.6,
    color: 'sand',
    image: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const quickResources = [
  {
    title: 'Crisis Support',
    description: 'Immediate help for mental health emergencies',
    urgent: true,
  },
  {
    title: '5-Minute Breathing Exercise',
    description: 'Quick stress relief technique',
    urgent: false,
  },
  {
    title: 'Campus Counseling Center',
    description: 'Contact information and hours',
    urgent: false,
  },
];

export function Resources() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cream-50 to-sage-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-forest-600 mb-4">
            Mental Health Resources
          </h2>
          <p className="text-lg text-forest-500 max-w-2xl mx-auto">
            Curated resources to support your mental wellness journey, available in multiple formats and languages.
          </p>
        </div>

        {/* Quick Access Resources */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-forest-600 mb-6">Quick Access</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickResources.map((resource, index) => (
              <Card 
                key={resource.title} 
                className={`glass-effect border-l-4 ${
                  resource.urgent ? 'border-l-red-400 bg-red-50/50' : 'border-l-sage-400'
                } card-hover`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-forest-600">{resource.title}</h4>
                      <p className="text-sm text-forest-500">{resource.description}</p>
                    </div>
                    {resource.urgent && (
                      <Badge variant="destructive" className="ml-2">
                        Urgent
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Resource Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resourceCategories.map((category, index) => (
            <Card 
              key={category.title} 
              className="glass-effect gentle-shadow card-hover overflow-hidden animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${category.image})` }}>
                <div className="h-full bg-gradient-to-t from-forest-900/60 to-transparent flex items-end p-6">
                  <Badge className={`bg-${category.color}-500 text-white`}>
                    {category.resources} Resources
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-forest-600 flex items-center justify-between">
                  {category.title}
                  <div className="flex items-center text-sm text-sage-600">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    {category.rating}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-forest-500 mb-4">{category.description}</p>
                <div className="flex items-center justify-between text-sm text-forest-400 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    5-20 min read
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    1.2k+ helped
                  </div>
                </div>
                <div className="space-y-3">
                  <Button className={`w-full bg-${category.color}-500 hover:bg-${category.color}-600 text-white`}>
                    Explore Resources
                  </Button>
                  <Button variant="outline" className={`w-full border-${category.color}-300 text-${category.color}-600 hover:bg-${category.color}-50`}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Offline Pack
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-sage-500 text-sage-600 hover:bg-sage-50">
            <TrendingUp className="mr-2 h-5 w-5" />
            View All Resources
          </Button>
        </div>
      </div>
    </section>
  );
}