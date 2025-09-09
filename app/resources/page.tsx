'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navigation } from '@/components/layout/Navigation';
import { 
  Video, 
  Headphones, 
  BookOpen, 
  Download, 
  Play, 
  Clock, 
  Star, 
  Search,
  Filter,
  Globe,
  Eye
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  content_type: 'video' | 'audio' | 'article' | 'guide';
  category: string;
  language: string;
  url?: string;
  duration?: number;
  difficulty_level: string;
  rating: number;
  view_count: number;
  is_featured: boolean;
  tags: string[];
}

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Anxiety Management Techniques (Urdu)',
    description: 'Comprehensive guide to managing anxiety with techniques explained in Urdu for better understanding by local students.',
    content_type: 'article',
    category: 'anxiety',
    language: 'ur',
    url: '/resources/anxiety-urdu-guide',
    difficulty_level: 'beginner',
    rating: 4.8,
    view_count: 1250,
    is_featured: true,
    tags: ['anxiety', 'urdu', 'breathing', 'relaxation']
  },
  {
    id: '2',
    title: 'Sleep Better Tonight - Hindi Audio',
    description: 'Relaxing sleep meditation and tips in Hindi to help you get better rest and improve your sleep quality.',
    content_type: 'audio',
    category: 'sleep',
    language: 'hi',
    url: '/resources/sleep-hindi-audio.mp3',
    duration: 900,
    difficulty_level: 'beginner',
    rating: 4.6,
    view_count: 890,
    is_featured: false,
    tags: ['sleep', 'hindi', 'meditation', 'relaxation']
  },
  {
    id: '3',
    title: 'Study Stress Management for Kashmir Students',
    description: 'Specific techniques for academic stress common in J&K educational system, including exam preparation strategies.',
    content_type: 'video',
    category: 'stress',
    language: 'en',
    url: '/resources/study-stress-kashmir.mp4',
    duration: 1200,
    difficulty_level: 'intermediate',
    rating: 4.9,
    view_count: 2100,
    is_featured: true,
    tags: ['stress', 'academic', 'kashmir', 'students']
  },
  {
    id: '4',
    title: 'Depression Support Guide (Kashmiri)',
    description: 'Understanding and coping with depression - explained in Kashmiri language for cultural sensitivity.',
    content_type: 'guide',
    category: 'depression',
    language: 'ks',
    url: '/resources/depression-kashmiri-guide',
    difficulty_level: 'beginner',
    rating: 4.7,
    view_count: 750,
    is_featured: false,
    tags: ['depression', 'kashmiri', 'support', 'coping']
  },
  {
    id: '5',
    title: 'Mindfulness Meditation - English',
    description: 'Learn basic mindfulness techniques to reduce stress and improve mental clarity.',
    content_type: 'video',
    category: 'mindfulness',
    language: 'en',
    duration: 600,
    difficulty_level: 'beginner',
    rating: 4.5,
    view_count: 1800,
    is_featured: false,
    tags: ['mindfulness', 'meditation', 'english']
  },
  {
    id: '6',
    title: 'Crisis Coping Strategies - Hindi',
    description: 'Emergency mental health strategies for crisis situations, explained in Hindi.',
    content_type: 'article',
    category: 'crisis',
    language: 'hi',
    difficulty_level: 'intermediate',
    rating: 4.8,
    view_count: 950,
    is_featured: true,
    tags: ['crisis', 'emergency', 'hindi', 'coping']
  },
  {
    id: '7',
    title: 'Breathing Exercises Audio - Urdu',
    description: 'Guided breathing exercises for anxiety relief, narrated in Urdu.',
    content_type: 'audio',
    category: 'anxiety',
    language: 'ur',
    duration: 480,
    difficulty_level: 'beginner',
    rating: 4.4,
    view_count: 680,
    is_featured: false,
    tags: ['breathing', 'anxiety', 'urdu', 'relaxation']
  },
  {
    id: '8',
    title: 'Social Anxiety in College - English',
    description: 'Strategies for dealing with social anxiety in college settings and building confidence.',
    content_type: 'guide',
    category: 'anxiety',
    language: 'en',
    difficulty_level: 'intermediate',
    rating: 4.6,
    view_count: 1400,
    is_featured: false,
    tags: ['social_anxiety', 'college', 'confidence', 'english']
  }
];

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'anxiety', label: 'Anxiety' },
  { value: 'depression', label: 'Depression' },
  { value: 'stress', label: 'Stress Management' },
  { value: 'sleep', label: 'Sleep' },
  { value: 'mindfulness', label: 'Mindfulness' },
  { value: 'crisis', label: 'Crisis Support' }
];

const languages = [
  { value: 'all', label: 'All Languages' },
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'Hindi' },
  { value: 'ur', label: 'Urdu' },
  { value: 'ks', label: 'Kashmiri' }
];

const difficultyLevels = [
  { value: 'all', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
];

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [filteredResources, setFilteredResources] = useState<Resource[]>(mockResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    let filtered = resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage;
      const matchesDifficulty = selectedDifficulty === 'all' || resource.difficulty_level === selectedDifficulty;
      const matchesType = selectedType === 'all' || resource.content_type === selectedType;

      return matchesSearch && matchesCategory && matchesLanguage && matchesDifficulty && matchesType;
    });

    // Sort by featured first, then by rating
    filtered.sort((a, b) => {
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return b.rating - a.rating;
    });

    setFilteredResources(filtered);
  }, [searchTerm, selectedCategory, selectedLanguage, selectedDifficulty, selectedType, resources]);

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'audio': return Headphones;
      case 'article': return BookOpen;
      case 'guide': return BookOpen;
      default: return BookOpen;
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return null;
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  const getLanguageLabel = (code: string) => {
    const lang = languages.find(l => l.value === code);
    return lang?.label || code;
  };

  const handleResourceClick = (resource: Resource) => {
    // Increment view count
    setResources(prev => prev.map(r => 
      r.id === resource.id ? { ...r, view_count: r.view_count + 1 } : r
    ));
    
    // In a real app, this would open the resource or navigate to it
    alert(`Opening resource: ${resource.title}`);
  };

  const featuredResources = filteredResources.filter(r => r.is_featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100 via-sand-50 to-sage-50">
      <Navigation />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-forest-600 mb-2">
              Mental Health Resources
            </h1>
            <p className="text-forest-500">
              Comprehensive resources in multiple languages for your mental well-being
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8 glass-effect">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 h-4 w-4" />
                    <Input
                      placeholder="Search resources..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(language => (
                      <SelectItem key={language.value} value={language.value}>
                        {language.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Content Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="article">Articles</SelectItem>
                    <SelectItem value="guide">Guides</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => {
                  const IconComponent = getContentIcon(resource.content_type);
                  return (
                    <Card 
                      key={resource.id} 
                      className="glass-effect gentle-shadow card-hover cursor-pointer transition-all"
                      onClick={() => handleResourceClick(resource)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`p-2 rounded-full ${
                              resource.content_type === 'video' ? 'bg-red-100 text-red-600' :
                              resource.content_type === 'audio' ? 'bg-purple-100 text-purple-600' :
                              'bg-blue-100 text-blue-600'
                            }`}>
                              <IconComponent className="h-4 w-4" />
                            </div>
                            {resource.is_featured && (
                              <Badge className="bg-sage-100 text-sage-700">Featured</Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">{resource.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg text-forest-600 line-clamp-2">
                          {resource.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-forest-500 text-sm mb-4 line-clamp-3">
                          {resource.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-forest-400 mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                              <Globe className="h-3 w-3 mr-1" />
                              {getLanguageLabel(resource.language)}
                            </div>
                            {resource.duration && (
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatDuration(resource.duration)}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {resource.view_count}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {resource.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Button 
                          className="w-full bg-sage-500 hover:bg-sage-600 text-white"
                          size="sm"
                        >
                          <Play className="h-3 w-3 mr-2" />
                          Access Resource
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="featured">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredResources.map((resource) => {
                  const IconComponent = getContentIcon(resource.content_type);
                  return (
                    <Card 
                      key={resource.id} 
                      className="glass-effect gentle-shadow card-hover cursor-pointer"
                      onClick={() => handleResourceClick(resource)}
                    >
                      <CardHeader>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`p-2 rounded-full ${
                            resource.content_type === 'video' ? 'bg-red-100 text-red-600' :
                            resource.content_type === 'audio' ? 'bg-purple-100 text-purple-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <Badge className="bg-sage-100 text-sage-700">Featured</Badge>
                        </div>
                        <CardTitle className="text-forest-600">{resource.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-forest-500 text-sm mb-4">{resource.description}</p>
                        <Button className="w-full bg-sage-500 hover:bg-sage-600 text-white">
                          <Play className="h-4 w-4 mr-2" />
                          Access Resource
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="video">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.filter(r => r.content_type === 'video').map((resource) => (
                  <Card 
                    key={resource.id} 
                    className="glass-effect gentle-shadow card-hover cursor-pointer"
                    onClick={() => handleResourceClick(resource)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="p-2 bg-red-100 rounded-full">
                            <Video className="h-4 w-4 text-red-600" />
                          </div>
                          {resource.duration && (
                            <Badge variant="secondary">{formatDuration(resource.duration)}</Badge>
                          )}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="ml-1 text-sm">{resource.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-forest-600">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-forest-500 text-sm mb-4">{resource.description}</p>
                      <Button className="w-full bg-sage-500 hover:bg-sage-600 text-white">
                        <Play className="h-4 w-4 mr-2" />
                        Watch Video
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="audio">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.filter(r => r.content_type === 'audio').map((resource) => (
                  <Card 
                    key={resource.id} 
                    className="glass-effect gentle-shadow card-hover cursor-pointer"
                    onClick={() => handleResourceClick(resource)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="p-2 bg-purple-100 rounded-full">
                            <Headphones className="h-4 w-4 text-purple-600" />
                          </div>
                          {resource.duration && (
                            <Badge variant="secondary">{formatDuration(resource.duration)}</Badge>
                          )}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="ml-1 text-sm">{resource.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-forest-600">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-forest-500 text-sm mb-4">{resource.description}</p>
                      <Button className="w-full bg-sage-500 hover:bg-sage-600 text-white">
                        <Play className="h-4 w-4 mr-2" />
                        Listen Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Emergency Resources */}
          <Card className="mt-8 border-l-4 border-red-500 glass-effect">
            <CardHeader>
              <CardTitle className="text-red-600">Emergency Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-forest-600 mb-2">Crisis Helplines</h4>
                  <p className="text-sm text-forest-500 mb-1">Kashmir Mental Health: <strong>+91-1942-506062</strong></p>
                  <p className="text-sm text-forest-500 mb-1">National Suicide Prevention: <strong>9152987821</strong></p>
                  <p className="text-sm text-forest-500">Emergency Services: <strong>112</strong></p>
                </div>
                <div>
                  <h4 className="font-semibold text-forest-600 mb-2">Quick Access</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Crisis Coping Strategies
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Emergency Contacts
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}