'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Navigation } from '@/components/layout/Navigation';
import { 
  Plus, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Eye, 
  Reply, 
  Search,
  Clock,
  Users,
  Heart,
  AlertTriangle,
  CheckCircle,
  User
} from 'lucide-react';
import { format } from 'date-fns';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author_name: string;
  upvotes: number;
  downvotes: number;
  reply_count: number;
  view_count: number;
  created_at: string;
  tags: string[];
  is_anonymous: boolean;
  is_moderated: boolean;
  is_helpful?: boolean;
}

interface ForumReply {
  id: string;
  content: string;
  author_name: string;
  upvotes: number;
  downvotes: number;
  created_at: string;
  is_anonymous: boolean;
  is_helpful: boolean;
}

const mockPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Dealing with Exam Anxiety - Need Support',
    content: 'Hi everyone, I\'m a 3rd year student at Kashmir University and I\'m struggling with severe anxiety before exams. My heart races and I can\'t concentrate while studying. This has been affecting my performance and I\'m getting more anxious about it. Has anyone experienced something similar? What helped you cope?',
    category: 'academic_stress',
    author_name: 'Anonymous',
    upvotes: 24,
    downvotes: 1,
    reply_count: 12,
    view_count: 156,
    created_at: '2024-09-08T14:30:00Z',
    tags: ['anxiety', 'exams', 'help', 'student_life'],
    is_anonymous: true,
    is_moderated: true,
    is_helpful: true
  },
  {
    id: '2',
    title: 'Feeling Isolated After Moving to Srinagar for Studies',
    content: 'I moved from a small town in Jammu to Srinagar for my engineering course at NIT. It\'s been 6 months but I still feel very lonely and homesick. Making friends seems difficult and I miss my family terribly. How did others cope with this transition? Any tips for connecting with people here?',
    category: 'social_support',
    author_name: 'Student_2024',
    upvotes: 18,
    downvotes: 0,
    reply_count: 8,
    view_count: 98,
    created_at: '2024-09-07T09:15:00Z',
    tags: ['loneliness', 'college', 'homesickness', 'social_anxiety'],
    is_anonymous: false,
    is_moderated: true
  },
  {
    id: '3',
    title: 'Success Story: Overcoming Depression with Support',
    content: 'I wanted to share my journey of overcoming depression over the past year. It wasn\'t easy, but with the help of counseling, support from this community, and gradual lifestyle changes, I\'m in a much better place now. To anyone struggling - please know that it gets better and you\'re not alone.',
    category: 'success_stories',
    author_name: 'HopefulSoul',
    upvotes: 45,
    downvotes: 0,
    reply_count: 15,
    view_count: 234,
    created_at: '2024-09-06T16:20:00Z',
    tags: ['depression', 'recovery', 'hope', 'success'],
    is_anonymous: false,
    is_moderated: true,
    is_helpful: true
  },
  {
    id: '4',
    title: 'Sleep Problems Due to Academic Pressure',
    content: 'I\'ve been having trouble sleeping for the past month. My mind keeps racing with thoughts about assignments, upcoming exams, and career concerns. I end up staying awake until 3-4 AM and then feel exhausted the next day. This cycle is getting worse. Any practical sleep tips?',
    category: 'sleep_wellness',
    author_name: 'Anonymous',
    upvotes: 12,
    downvotes: 0,
    reply_count: 6,
    view_count: 67,
    created_at: '2024-09-05T22:45:00Z',
    tags: ['sleep', 'insomnia', 'academic_pressure', 'stress'],
    is_anonymous: true,
    is_moderated: true
  },
  {
    id: '5',
    title: 'Family Pressure and Mental Health',
    content: 'Dealing with constant pressure from family about career choices and academic performance. They mean well but it\'s affecting my mental health. Sometimes I feel like I\'m not living my own life. How do you balance family expectations with your own well-being?',
    category: 'family_support',
    author_name: 'Anonymous',
    upvotes: 31,
    downvotes: 2,
    reply_count: 20,
    view_count: 187,
    created_at: '2024-09-04T11:30:00Z',
    tags: ['family', 'pressure', 'expectations', 'mental_health'],
    is_anonymous: true,
    is_moderated: true
  }
];

const categories = [
  { value: 'all', label: 'All Posts', color: 'bg-gray-100' },
  { value: 'academic_stress', label: 'Academic Stress', color: 'bg-red-100' },
  { value: 'social_support', label: 'Social Support', color: 'bg-blue-100' },
  { value: 'anxiety_depression', label: 'Anxiety & Depression', color: 'bg-purple-100' },
  { value: 'family_support', label: 'Family & Relationships', color: 'bg-green-100' },
  { value: 'sleep_wellness', label: 'Sleep & Wellness', color: 'bg-yellow-100' },
  { value: 'success_stories', label: 'Success Stories', color: 'bg-emerald-100' },
  { value: 'crisis_support', label: 'Crisis Support', color: 'bg-pink-100' }
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<ForumPost[]>(mockPosts);
  const [filteredPosts, setFilteredPosts] = useState<ForumPost[]>(mockPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showCreatePost, setShowCreatePost] = useState(false);
  
  // New post form states
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('');
  const [newPostAnonymous, setNewPostAnonymous] = useState(true);

  useEffect(() => {
    let filtered = posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort posts
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
        break;
      case 'discussed':
        filtered.sort((a, b) => b.reply_count - a.reply_count);
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, sortBy, posts]);

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim() || !newPostCategory) {
      alert('Please fill in all required fields');
      return;
    }

    const newPost: ForumPost = {
      id: Math.random().toString(36).substr(2, 9),
      title: newPostTitle,
      content: newPostContent,
      category: newPostCategory,
      author_name: newPostAnonymous ? 'Anonymous' : 'Current User',
      upvotes: 0,
      downvotes: 0,
      reply_count: 0,
      view_count: 0,
      created_at: new Date().toISOString(),
      tags: extractTags(newPostContent),
      is_anonymous: newPostAnonymous,
      is_moderated: false
    };

    setPosts(prev => [newPost, ...prev]);
    
    // Reset form
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostCategory('');
    setNewPostAnonymous(true);
    setShowCreatePost(false);
  };

  const extractTags = (content: string): string[] => {
    const words = content.toLowerCase().split(' ');
    const commonTags = ['stress', 'anxiety', 'depression', 'sleep', 'study', 'exam', 'family', 'help'];
    return commonTags.filter(tag => content.toLowerCase().includes(tag));
  };

  const handleVote = (postId: string, type: 'up' | 'down') => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          upvotes: type === 'up' ? post.upvotes + 1 : post.upvotes,
          downvotes: type === 'down' ? post.downvotes + 1 : post.downvotes
        };
      }
      return post;
    }));
  };

  const getCategoryInfo = (categoryValue: string) => {
    return categories.find(c => c.value === categoryValue) || categories[0];
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return format(date, 'MMM dd');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100 via-sand-50 to-sage-50">
      <Navigation />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-forest-600 mb-2">
              Peer Support Community
            </h1>
            <p className="text-forest-500">
              Connect with fellow students in a safe, moderated environment
            </p>
          </div>

          {/* Community Guidelines */}
          <Card className="mb-6 border-l-4 border-sage-500 glass-effect">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Heart className="h-5 w-5 text-sage-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-forest-600 mb-1">Community Guidelines</h3>
                  <p className="text-sm text-forest-500">
                    Be respectful, supportive, and kind. Remember that real people with real struggles are behind every post. 
                    Trained moderators review all posts for safety.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Create Post Button */}
              <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-sage-500 hover:bg-sage-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Post</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-forest-600 mb-2">
                        Title *
                      </label>
                      <Input
                        placeholder="Describe your topic briefly..."
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-forest-600 mb-2">
                        Category *
                      </label>
                      <Select value={newPostCategory} onValueChange={setNewPostCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.filter(c => c.value !== 'all').map(category => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-forest-600 mb-2">
                        Content *
                      </label>
                      <Textarea
                        placeholder="Share your thoughts, experiences, or questions. Be as detailed as you'd like - this community is here to support you."
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        rows={6}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={newPostAnonymous}
                        onChange={(e) => setNewPostAnonymous(e.target.checked)}
                        className="rounded border-sage-300"
                      />
                      <label htmlFor="anonymous" className="text-sm text-forest-600">
                        Post anonymously (recommended for privacy)
                      </label>
                    </div>

                    <div className="flex space-x-3">
                      <Button onClick={handleCreatePost} className="bg-sage-500 hover:bg-sage-600">
                        Create Post
                      </Button>
                      <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Categories */}
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="text-sm text-forest-600">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.value}
                      variant={selectedCategory === category.value ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setSelectedCategory(category.value)}
                      className="w-full justify-start text-sm"
                    >
                      <div className={`w-2 h-2 rounded-full mr-2 ${category.color.replace('bg-', 'bg-')}`} />
                      {category.label}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Community Stats */}
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="text-sm text-forest-600">Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-forest-500">Total Posts</span>
                    <span className="font-medium text-forest-600">{posts.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-forest-500">Active Members</span>
                    <span className="font-medium text-forest-600">1,247</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-forest-500">Helpful Posts</span>
                    <span className="font-medium text-forest-600">
                      {posts.filter(p => p.is_helpful).length}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search and Sort */}
              <Card className="mb-6 glass-effect">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 h-4 w-4" />
                        <Input
                          placeholder="Search posts..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="discussed">Most Discussed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Posts List */}
              <div className="space-y-6">
                {filteredPosts.map((post) => {
                  const categoryInfo = getCategoryInfo(post.category);
                  return (
                    <Card key={post.id} className="glass-effect gentle-shadow card-hover">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-forest-400" />
                              <span className="text-sm text-forest-500">{post.author_name}</span>
                            </div>
                            <Badge className={`text-xs ${categoryInfo.color} border-0`}>
                              {categoryInfo.label}
                            </Badge>
                            {post.is_helpful && (
                              <Badge className="bg-emerald-100 text-emerald-700 border-0">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Helpful
                              </Badge>
                            )}
                            {post.is_moderated && (
                              <Badge className="bg-blue-100 text-blue-700 border-0">
                                Moderated
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-forest-400">{getTimeAgo(post.created_at)}</span>
                        </div>

                        <h3 className="text-lg font-semibold text-forest-600 mb-3 cursor-pointer hover:text-sage-600">
                          {post.title}
                        </h3>

                        <p className="text-forest-500 mb-4 line-clamp-3">
                          {post.content}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleVote(post.id, 'up')}
                                className="h-8 px-2"
                              >
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                {post.upvotes}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleVote(post.id, 'down')}
                                className="h-8 px-2"
                              >
                                <ThumbsDown className="h-4 w-4 mr-1" />
                                {post.downvotes}
                              </Button>
                            </div>

                            <div className="flex items-center text-sm text-forest-500">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {post.reply_count} replies
                            </div>

                            <div className="flex items-center text-sm text-forest-500">
                              <Eye className="h-4 w-4 mr-1" />
                              {post.view_count} views
                            </div>
                          </div>

                          <Button size="sm" variant="outline">
                            <Reply className="h-4 w-4 mr-2" />
                            Reply
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

                {filteredPosts.length === 0 && (
                  <Card className="glass-effect text-center py-12">
                    <CardContent>
                      <Users className="h-12 w-12 text-forest-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-forest-600 mb-2">No posts found</h3>
                      <p className="text-forest-500">
                        {searchTerm || selectedCategory !== 'all' 
                          ? 'Try adjusting your search or filters'
                          : 'Be the first to start a conversation!'}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Notice */}
          <Card className="mt-8 border-l-4 border-red-500 glass-effect">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-600 mb-1">Crisis Support</h3>
                  <p className="text-sm text-red-700">
                    If you're in immediate danger or crisis, please contact emergency services (112) or 
                    Kashmir Mental Health Helpline: <strong>+91-1942-506062</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}