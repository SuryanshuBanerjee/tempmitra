'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navigation } from '@/components/layout/Navigation';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import {
  Users,
  MessageCircle,
  Calendar,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Heart,
  Shield,
  BookOpen,
  Phone
} from 'lucide-react';

interface AnalyticsData {
  overview: {
    total_users: number;
    total_sessions: number;
    crisis_sessions: number;
    total_appointments: number;
    new_users_week: number;
  };
  risk_distribution: Record<string, number>;
  common_issues: {
    anxiety: number;
    depression: number;
  };
}

const mockAnalytics: AnalyticsData = {
  overview: {
    total_users: 1247,
    total_sessions: 3890,
    crisis_sessions: 23,
    total_appointments: 445,
    new_users_week: 89
  },
  risk_distribution: {
    'low': 650,
    'mild': 380,
    'moderate': 150,
    'moderately_severe': 45,
    'severe': 22
  },
  common_issues: {
    anxiety: 1250,
    depression: 890
  }
};

const monthlyData = [
  { month: 'Mar', users: 890, sessions: 2100, appointments: 250 },
  { month: 'Apr', users: 950, sessions: 2450, appointments: 290 },
  { month: 'May', users: 1020, sessions: 2800, appointments: 340 },
  { month: 'Jun', users: 1100, sessions: 3200, appointments: 380 },
  { month: 'Jul', users: 1180, sessions: 3600, appointments: 420 },
  { month: 'Aug', users: 1247, sessions: 3890, appointments: 445 }
];

const weeklyActivityData = [
  { day: 'Mon', sessions: 45, crisis: 2 },
  { day: 'Tue', sessions: 52, crisis: 1 },
  { day: 'Wed', sessions: 48, crisis: 3 },
  { day: 'Thu', sessions: 61, crisis: 1 },
  { day: 'Fri', sessions: 38, crisis: 0 },
  { day: 'Sat', sessions: 25, crisis: 1 },
  { day: 'Sun', sessions: 31, crisis: 2 }
];

const riskLevelColors = {
  'low': '#10b981',
  'mild': '#f59e0b', 
  'moderate': '#f97316',
  'moderately_severe': '#ef4444',
  'severe': '#dc2626'
};

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<AnalyticsData>(mockAnalytics);
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  // Redirect non-admin users
  useEffect(() => {
    if (!isLoading && (!user || !user.is_admin)) {
      router.push('/user');
    }
  }, [user, isLoading, router]);

  // Show loading or redirect if not admin
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-100 via-sand-50 to-sage-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sage-500 mx-auto"></div>
          <p className="mt-4 text-forest-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !user.is_admin) {
    return null; // This will show briefly before redirect
  }

  // Prepare data for risk distribution pie chart
  const riskPieData = Object.entries(analytics.risk_distribution).map(([level, count]) => ({
    name: level.replace('_', ' ').toUpperCase(),
    value: count,
    color: riskLevelColors[level as keyof typeof riskLevelColors] || '#6b7280'
  }));

  const issueData = [
    { name: 'Anxiety', value: analytics.common_issues.anxiety, color: '#8b5cf6' },
    { name: 'Depression', value: analytics.common_issues.depression, color: '#06b6d4' },
    { name: 'Stress', value: 650, color: '#f59e0b' },
    { name: 'Sleep Issues', value: 420, color: '#10b981' }
  ];

  const calculatePercentageChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return { change: change.toFixed(1), isPositive: change > 0 };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100 via-sand-50 to-sage-50">
      <Navigation />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-forest-600 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-forest-500">
              Monitor mental health trends and platform usage
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">User Analytics</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="crisis">Crisis Monitoring</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="glass-effect gentle-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-forest-600">Total Users</p>
                        <p className="text-2xl font-bold text-forest-700">{analytics.overview.total_users.toLocaleString()}</p>
                        <div className="flex items-center mt-2">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm text-green-600">+{analytics.overview.new_users_week} this week</span>
                        </div>
                      </div>
                      <div className="p-3 bg-sage-100 rounded-full">
                        <Users className="h-6 w-6 text-sage-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect gentle-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-forest-600">Chat Sessions</p>
                        <p className="text-2xl font-bold text-forest-700">{analytics.overview.total_sessions.toLocaleString()}</p>
                        <div className="flex items-center mt-2">
                          <Activity className="h-4 w-4 text-blue-500 mr-1" />
                          <span className="text-sm text-blue-600">300 this week</span>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-full">
                        <MessageCircle className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect gentle-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-forest-600">Appointments</p>
                        <p className="text-2xl font-bold text-forest-700">{analytics.overview.total_appointments.toLocaleString()}</p>
                        <div className="flex items-center mt-2">
                          <Calendar className="h-4 w-4 text-purple-500 mr-1" />
                          <span className="text-sm text-purple-600">45 scheduled</span>
                        </div>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-full">
                        <Calendar className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect gentle-shadow border-l-4 border-red-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-red-600">Crisis Sessions</p>
                        <p className="text-2xl font-bold text-red-700">{analytics.overview.crisis_sessions}</p>
                        <div className="flex items-center mt-2">
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-sm text-red-600">Requires attention</span>
                        </div>
                      </div>
                      <div className="p-3 bg-red-100 rounded-full">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Growth Chart */}
                <Card className="glass-effect gentle-shadow">
                  <CardHeader>
                    <CardTitle className="text-forest-600">Platform Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="users" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="sessions" stackId="2" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Risk Distribution */}
                <Card className="glass-effect gentle-shadow">
                  <CardHeader>
                    <CardTitle className="text-forest-600">Risk Level Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={riskPieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {riskPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Weekly Activity */}
              <Card className="glass-effect gentle-shadow">
                <CardHeader>
                  <CardTitle className="text-forest-600">Weekly Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sessions" fill="#8b5cf6" name="Total Sessions" />
                      <Bar dataKey="crisis" fill="#ef4444" name="Crisis Sessions" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="glass-effect gentle-shadow">
                    <CardHeader>
                      <CardTitle className="text-forest-600">User Demographics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold text-forest-600 mb-4">By College</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-forest-600">Kashmir University</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-sage-200 rounded-full h-2">
                                  <div className="w-12 bg-sage-500 h-2 rounded-full"></div>
                                </div>
                                <span className="text-sm font-medium">450</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-forest-600">NIT Srinagar</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-sage-200 rounded-full h-2">
                                  <div className="w-10 bg-sage-500 h-2 rounded-full"></div>
                                </div>
                                <span className="text-sm font-medium">320</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-forest-600">Govt. College Srinagar</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-sage-200 rounded-full h-2">
                                  <div className="w-8 bg-sage-500 h-2 rounded-full"></div>
                                </div>
                                <span className="text-sm font-medium">280</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-forest-600">Others</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-sage-200 rounded-full h-2">
                                  <div className="w-6 bg-sage-500 h-2 rounded-full"></div>
                                </div>
                                <span className="text-sm font-medium">197</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-forest-600 mb-4">By Year</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-forest-600">1st Year</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-blue-200 rounded-full h-2">
                                  <div className="w-8 bg-blue-500 h-2 rounded-full"></div>
                                </div>
                                <span className="text-sm font-medium">285</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-forest-600">2nd Year</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-blue-200 rounded-full h-2">
                                  <div className="w-10 bg-blue-500 h-2 rounded-full"></div>
                                </div>
                                <span className="text-sm font-medium">340</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-forest-600">3rd Year</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-blue-200 rounded-full h-2">
                                  <div className="w-12 bg-blue-500 h-2 rounded-full"></div>
                                </div>
                                <span className="text-sm font-medium">380</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-forest-600">4th Year+</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-blue-200 rounded-full h-2">
                                  <div className="w-6 bg-blue-500 h-2 rounded-full"></div>
                                </div>
                                <span className="text-sm font-medium">242</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="glass-effect gentle-shadow">
                    <CardHeader>
                      <CardTitle className="text-forest-600">Recent Registrations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-sage-50 rounded-lg">
                          <div>
                            <p className="font-medium text-forest-600">Aamir K.</p>
                            <p className="text-sm text-forest-500">Kashmir University</p>
                          </div>
                          <span className="text-xs text-forest-400">2h ago</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-sage-50 rounded-lg">
                          <div>
                            <p className="font-medium text-forest-600">Fatima S.</p>
                            <p className="text-sm text-forest-500">NIT Srinagar</p>
                          </div>
                          <span className="text-xs text-forest-400">4h ago</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-sage-50 rounded-lg">
                          <div>
                            <p className="font-medium text-forest-600">Rohit P.</p>
                            <p className="text-sm text-forest-500">Govt. College</p>
                          </div>
                          <span className="text-xs text-forest-400">6h ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sessions">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <Card className="glass-effect gentle-shadow">
                  <CardHeader>
                    <CardTitle className="text-forest-600">Session Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={[
                        { type: 'AI Chat', count: 2890, color: '#8b5cf6' },
                        { type: 'Counselor', count: 445, color: '#06b6d4' },
                        { type: 'Peer Support', count: 555, color: '#10b981' }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="glass-effect gentle-shadow">
                  <CardHeader>
                    <CardTitle className="text-forest-600">Most Common Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={issueData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {issueData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-effect gentle-shadow">
                <CardHeader>
                  <CardTitle className="text-forest-600">Session Duration Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-forest-600">12.5 min</div>
                      <div className="text-sm text-forest-500">Average AI Chat</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-forest-600">45 min</div>
                      <div className="text-sm text-forest-500">Average Counselor Session</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-forest-600">8.2 min</div>
                      <div className="text-sm text-forest-500">Average Forum Interaction</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="crisis">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <Card className="glass-effect gentle-shadow border-l-4 border-red-500">
                  <CardHeader>
                    <CardTitle className="text-red-600">Crisis Alerts (Last 24h)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          <div>
                            <p className="font-medium text-red-700">High Risk Keywords Detected</p>
                            <p className="text-sm text-red-600">User ID: U-1234 | IP: 192.168.1.45</p>
                            <p className="text-xs text-red-500">Location: Srinagar, Kashmir | College: Kashmir University</p>
                            <p className="text-xs text-red-500">Keywords: "suicide", "end it all", "no hope"</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-red-100 text-red-700 mb-1">URGENT</Badge>
                          <p className="text-xs text-red-600">2 min ago</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-yellow-600" />
                          <div>
                            <p className="font-medium text-yellow-700">Multiple Crisis Sessions</p>
                            <p className="text-sm text-yellow-600">User ID: U-5678 | IP: 10.0.0.23</p>
                            <p className="text-xs text-yellow-500">Location: Jammu | College: Govt. College Jammu</p>
                            <p className="text-xs text-yellow-500">3 crisis sessions today, PHQ-9 score: 18</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-yellow-100 text-yellow-700 mb-1">MONITOR</Badge>
                          <p className="text-xs text-yellow-600">45 min ago</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="h-5 w-5 text-orange-600" />
                          <div>
                            <p className="font-medium text-orange-700">Repeated Distress Keywords</p>
                            <p className="text-sm text-orange-600">User ID: U-9101 | IP: 172.16.0.10</p>
                            <p className="text-xs text-orange-500">Location: Anantnag, Kashmir | College: NIT Srinagar</p>
                            <p className="text-xs text-orange-500">Keywords: "overwhelmed", "can't cope", "failing"</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-orange-100 text-orange-700 mb-1">REVIEW</Badge>
                          <p className="text-xs text-orange-600">1h ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect gentle-shadow">
                  <CardHeader>
                    <CardTitle className="text-forest-600">Crisis Response Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-forest-600">Average Response Time</span>
                        <span className="font-bold text-green-600">2.3 minutes</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-forest-600">Counselor Escalations</span>
                        <span className="font-bold text-forest-600">18/23 (78%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-forest-600">Emergency Contacts Made</span>
                        <span className="font-bold text-forest-600">5</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                        <Phone className="h-4 w-4 mr-2" />
                        View Crisis Protocol
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-effect gentle-shadow">
                <CardHeader>
                  <CardTitle className="text-forest-600">Crisis Keywords Trending</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={[
                      { week: 'Week 1', anxiety: 45, depression: 32, crisis: 2 },
                      { week: 'Week 2', anxiety: 52, depression: 38, crisis: 4 },
                      { week: 'Week 3', anxiety: 48, depression: 35, crisis: 3 },
                      { week: 'Week 4', anxiety: 58, depression: 42, crisis: 5 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="anxiety" stroke="#f59e0b" strokeWidth={2} />
                      <Line type="monotone" dataKey="depression" stroke="#06b6d4" strokeWidth={2} />
                      <Line type="monotone" dataKey="crisis" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}