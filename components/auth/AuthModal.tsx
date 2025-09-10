'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Lock, Mail, Phone, GraduationCap, Calendar, Users } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: any) => void;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  age: string;
  gender: string;
  college: string;
  course: string;
  year: string;
  phone: string;
  emergency_contact: string;
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    age: '',
    gender: '',
    college: '',
    course: '',
    year: '',
    phone: '',
    emergency_contact: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        onAuthSuccess(data);
        toast.success(`Welcome back, ${data.name}!`);
        onClose();
        // Redirect to appropriate dashboard
        if (data.is_admin) {
          router.push('/dashboard');
        } else {
          router.push('/user');
        }
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (error) {
      // Fallback authentication when backend is not available
      if (loginData.email === 'admin@mitra.ac.in' && loginData.password === 'admin123') {
        const fallbackAdmin = {
          user_id: 'admin-demo',
          name: 'Admin User',
          email: 'admin@mitra.ac.in',
          is_admin: true
        };
        localStorage.setItem('user', JSON.stringify(fallbackAdmin));
        onAuthSuccess(fallbackAdmin);
        toast.success('Welcome back, Admin! (Demo Mode)');
        onClose();
        router.push('/dashboard');
      } else if (loginData.email === 'student1@gmail.com' && loginData.password === 'password123') {
        const fallbackStudent = {
          user_id: 'student-demo',
          name: 'Demo Student',
          email: 'student1@gmail.com',
          is_admin: false
        };
        localStorage.setItem('user', JSON.stringify(fallbackStudent));
        onAuthSuccess(fallbackStudent);
        toast.success('Welcome back, Demo Student! (Demo Mode)');
        onClose();
        router.push('/user');
      } else {
        toast.error('Backend not available. Use demo credentials: admin@mitra.ac.in/admin123 or student1@gmail.com/password123');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (registerData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...registrationData } = registerData;
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...registrationData,
          age: registerData.age ? parseInt(registerData.age) : null
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registration successful! Please login.');
        // Clear form
        setRegisterData({
          email: '',
          password: '',
          confirmPassword: '',
          name: '',
          age: '',
          gender: '',
          college: '',
          course: '',
          year: '',
          phone: '',
          emergency_contact: ''
        });
        // Switch to login tab
        const loginTab = document.querySelector('[data-value="login"]') as HTMLElement;
        loginTab?.click();
      } else {
        toast.error(data.error || 'Registration failed');
      }
    } catch (error) {
      // Fallback registration when backend is not available
      toast.success('Registration successful! (Demo Mode) Please login with your credentials.');
      // Clear form
      setRegisterData({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        age: '',
        gender: '',
        college: '',
        course: '',
        year: '',
        phone: '',
        emergency_contact: ''
      });
      // Switch to login tab
      const loginTab = document.querySelector('[data-value="login"]') as HTMLElement;
      loginTab?.click();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-forest-600">
            Welcome to MITRA
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" data-value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@college.edu"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-sage-500 hover:bg-sage-600" 
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
              
              <div className="text-center text-sm text-forest-500">
                <p>Demo credentials:</p>
                <p>Admin: admin@mitra.ac.in / admin123</p>
                <p>Student: student1@gmail.com / password123</p>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 h-4 w-4" />
                    <Input
                      id="register-name"
                      placeholder="Your full name"
                      value={registerData.name}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-age">Age</Label>
                  <Input
                    id="register-age"
                    type="number"
                    placeholder="22"
                    value={registerData.age}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, age: e.target.value }))}
                    min="16"
                    max="100"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 h-4 w-4" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="your.email@college.edu"
                    value={registerData.email}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 h-4 w-4" />
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Min 6 characters"
                      value={registerData.password}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 h-4 w-4" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={registerData.gender} onValueChange={(value) => setRegisterData(prev => ({ ...prev, gender: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="college">College/University</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 h-4 w-4" />
                  <Input
                    id="college"
                    placeholder="Kashmir University"
                    value={registerData.college}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, college: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    placeholder="Computer Science"
                    value={registerData.course}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, course: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Select value={registerData.year} onValueChange={(value) => setRegisterData(prev => ({ ...prev, year: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st Year">1st Year</SelectItem>
                      <SelectItem value="2nd Year">2nd Year</SelectItem>
                      <SelectItem value="3rd Year">3rd Year</SelectItem>
                      <SelectItem value="4th Year">4th Year</SelectItem>
                      <SelectItem value="Masters">Masters</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 h-4 w-4" />
                    <Input
                      id="phone"
                      placeholder="+91-9419-123456"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, phone: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emergency">Emergency Contact</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 h-4 w-4" />
                    <Input
                      id="emergency"
                      placeholder="+91-9419-654321"
                      value={registerData.emergency_contact}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, emergency_contact: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-sage-500 hover:bg-sage-600" 
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}