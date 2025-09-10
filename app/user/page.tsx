'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/layout/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  MessageCircle, 
  Calendar, 
  Heart,
  BookOpen,
  BarChart,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Download,
  User,
  Settings,
  Bell,
  Activity
} from 'lucide-react';
import Link from 'next/link';

interface UserActivity {
  chat_sessions: number;
  assessments_completed: number;
  resources_accessed: number;
  last_login: string;
  upcoming_appointments: number;
  risk_level: string;
}

const mockUserActivity: UserActivity = {
  chat_sessions: 15,
  assessments_completed: 2,
  resources_accessed: 23,
  last_login: '2024-09-10T10:30:00Z',
  upcoming_appointments: 1,
  risk_level: 'low'
};

const quickActions = [
  {
    title: 'Start Chat Support',
    description: 'Get immediate AI-powered mental health support',
    icon: MessageCircle,
    href: '/chat',
    color: 'bg-sage-500 hover:bg-sage-600',
    iconBg: 'bg-sage-100',
    iconColor: 'text-sage-600'
  },
  {
    title: 'Take Assessment',
    description: 'Check your mental wellness with our assessments',
    icon: BarChart,
    href: '/screening',
    color: 'bg-blue-500 hover:bg-blue-600',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Book Counselor',
    description: 'Schedule a session with a professional counselor',
    icon: Calendar,
    href: '/booking',
    color: 'bg-purple-500 hover:bg-purple-600',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    title: 'Explore Resources',
    description: 'Access mental health resources and guides',
    icon: BookOpen,
    href: '/resources',
    color: 'bg-green-500 hover:bg-green-600',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  }
];

const recentResources = [
  {
    title: 'Stress Management for Students',
    type: 'Article',
    duration: '5 min read',
    category: 'Stress',
    downloaded: false
  },
  {
    title: 'Anxiety Relief Meditation',
    type: 'Audio',
    duration: '10 min',
    category: 'Anxiety',
    downloaded: true
  },
  {
    title: 'Better Sleep Habits',
    type: 'Guide',
    duration: '8 min read',
    category: 'Sleep',
    downloaded: false
  }
];

export default function UserDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activity, setActivity] = useState<UserActivity>(mockUserActivity);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'Your counselor session is scheduled for tomorrow at 2:00 PM',
      type: 'appointment',
      time: '1h ago',
      read: false
    },
    {
      id: 2,
      message: 'New resources available: Managing Exam Stress',
      type: 'resource',
      time: '3h ago',
      read: false
    }
  ]);

  const getRiskLevelInfo = (level: string) => {
    switch (level) {
      case 'low':
        return { color: 'bg-green-100 text-green-700', label: 'Good', icon: CheckCircle };
      case 'moderate':
        return { color: 'bg-yellow-100 text-yellow-700', label: 'Monitor', icon: AlertCircle };
      case 'high':
        return { color: 'bg-red-100 text-red-700', label: 'Support Needed', icon: AlertCircle };
      default:
        return { color: 'bg-gray-100 text-gray-700', label: 'Unknown', icon: AlertCircle };
    }
  };

  const riskInfo = getRiskLevelInfo(activity.risk_level);
  const RiskIcon = riskInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100 via-sand-50 to-sage-50">
      <Navigation />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-forest-600 mb-2">
              Welcome back, {user?.name || 'Student'}!
            </h1>
            <p className="text-forest-500">
              Your mental wellness dashboard - track your progress and access support
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass-effect gentle-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-forest-600">Chat Sessions</p>
                    <p className="text-2xl font-bold text-forest-700">{activity.chat_sessions}</p>
                  </div>
                  <div className="p-3 bg-sage-100 rounded-full">
                    <MessageCircle className="h-6 w-6 text-sage-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect gentle-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-forest-600">Assessments</p>
                    <p className="text-2xl font-bold text-forest-700">{activity.assessments_completed}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <BarChart className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect gentle-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-forest-600">Resources Used</p>
                    <p className="text-2xl font-bold text-forest-700">{activity.resources_accessed}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect gentle-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-forest-600">Wellness Status</p>
                    <Badge className={`${riskInfo.color} mt-1`}>
                      <RiskIcon className="h-3 w-3 mr-1" />
                      {riskInfo.label}
                    </Badge>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-forest-600 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action) => {
                  const IconComponent = action.icon;
                  return (
                    <Link href={action.href} key={action.title}>
                      <Card className="glass-effect gentle-shadow card-hover cursor-pointer h-full">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className={`p-3 ${action.iconBg} rounded-full`}>
                              <IconComponent className={`h-6 w-6 ${action.iconColor}`} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-forest-600 mb-1">{action.title}</h3>
                              <p className="text-sm text-forest-500">{action.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Notifications */}
            <div>
              <h2 className="text-xl font-semibold text-forest-600 mb-4">Recent Notifications</h2>
              <Card className="glass-effect gentle-shadow">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-3 rounded-lg ${
                          notification.read ? 'bg-gray-50' : 'bg-sage-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm text-forest-600">{notification.message}</p>
                            <p className="text-xs text-forest-400 mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-sage-500 rounded-full mt-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-sage-300 text-sage-600">
                    <Bell className="h-4 w-4 mr-2" />
                    View All Notifications
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Resources */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-forest-600 mb-4">Recently Accessed Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentResources.map((resource, index) => (
                <Card key={index} className="glass-effect gentle-shadow card-hover">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {resource.type}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3 text-forest-400" />
                        <span className="text-xs text-forest-400">{resource.duration}</span>
                      </div>
                    </div>
                    <h3 className="font-medium text-forest-600 mb-2">{resource.title}</h3>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-sage-100 text-sage-700 text-xs">
                        {resource.category}
                      </Badge>
                      <Button variant="outline" size="sm" className="border-sage-300 text-sage-600">
                        {resource.downloaded ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Downloaded
                          </>
                        ) : (
                          <>
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          {activity.upcoming_appointments > 0 && (
            <Card className="glass-effect gentle-shadow border-l-4 border-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-6 w-6 text-purple-600" />
                    <div>
                      <h3 className="font-semibold text-forest-600">Upcoming Appointment</h3>
                      <p className="text-sm text-forest-500">
                        You have a counselor session scheduled for tomorrow at 2:00 PM
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-purple-100 text-purple-700">
                    Anonymous Token: #MTR{user?.id?.slice(-4) || '1234'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}