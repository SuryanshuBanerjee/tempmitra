'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/layout/Navigation';
import { Calendar as CalendarIcon, Clock, Video, Phone, MapPin, Star, Languages, Award } from 'lucide-react';
import { format } from 'date-fns';

interface Counselor {
  id: string;
  name: string;
  specialization: string;
  languages: string[];
  experience_years: number;
  rating: number;
  total_sessions: number;
  bio: string;
  availability: string[];
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function BookingPage() {
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [sessionType, setSessionType] = useState<string>('individual');
  const [sessionMode, setSessionMode] = useState<string>('video');
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState(false);
  
  // Mock data - replace with API call
  useEffect(() => {
    const mockCounselors: Counselor[] = [
      {
        id: '1',
        name: 'Dr. Priya Sharma',
        specialization: 'Clinical Psychology, Anxiety Disorders, Student Counseling',
        languages: ['English', 'Hindi', 'Urdu', 'Kashmiri'],
        experience_years: 8,
        rating: 4.8,
        total_sessions: 350,
        bio: 'Specialized in student mental health with focus on anxiety, depression, and academic stress. Fluent in local languages and culturally sensitive approaches.',
        availability: ['Monday 9:00-17:00', 'Tuesday 9:00-17:00', 'Wednesday 9:00-17:00']
      },
      {
        id: '2',
        name: 'Dr. Mohd Ahmed',
        specialization: 'Trauma Counseling, PTSD, Crisis Intervention',
        languages: ['English', 'Urdu', 'Kashmiri', 'Hindi'],
        experience_years: 12,
        rating: 4.9,
        total_sessions: 500,
        bio: 'Expert in trauma and crisis counseling, particularly experienced with conflict-related stress and student mental health issues.',
        availability: ['Monday 10:00-18:00', 'Wednesday 10:00-18:00', 'Friday 10:00-18:00']
      },
      {
        id: '3',
        name: 'Dr. Sarah Khan',
        specialization: 'Depression, Grief Counseling, Family Therapy',
        languages: ['English', 'Hindi', 'Kashmiri'],
        experience_years: 6,
        rating: 4.7,
        total_sessions: 280,
        bio: 'Compassionate counselor specializing in depression and grief support, with experience in family dynamics and relationship counseling.',
        availability: ['Tuesday 9:00-16:00', 'Thursday 9:00-16:00', 'Saturday 10:00-14:00']
      }
    ];
    setCounselors(mockCounselors);
  }, []);

  const generateTimeSlots = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const currentHour = today.getHours();
    
    for (let hour = 9; hour < 17; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      const isAvailable = !isToday || hour > currentHour;
      slots.push({ time, available: isAvailable });
      
      const halfHour = `${hour.toString().padStart(2, '0')}:30`;
      const isHalfHourAvailable = !isToday || hour > currentHour || (hour === currentHour && 30 > today.getMinutes());
      slots.push({ time: halfHour, available: isHalfHourAvailable });
    }
    
    return slots;
  };

  const handleBookAppointment = async () => {
    if (!selectedCounselor || !selectedDate || !selectedTime) {
      alert('Please select all required fields');
      return;
    }

    setLoading(true);
    
    // Mock booking - replace with API call
    const bookingData = {
      student_id: 'mock-student-id', // Replace with actual user ID
      counselor_id: selectedCounselor.id,
      scheduled_datetime: new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${selectedTime}:00`).toISOString(),
      type: sessionType,
      mode: sessionMode,
      notes: notes
    };

    // Simulate API call
    setTimeout(() => {
      alert(`Appointment booked successfully with ${selectedCounselor.name} on ${format(selectedDate, 'PPP')} at ${selectedTime}`);
      setLoading(false);
      // Reset form
      setSelectedCounselor(null);
      setSelectedTime('');
      setNotes('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100 via-sand-50 to-sage-50">
      <Navigation />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-forest-600 mb-2">
              Book Counseling Session
            </h1>
            <p className="text-forest-500">
              Connect with qualified mental health professionals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Counselors List */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-forest-600 mb-4">Available Counselors</h2>
              <div className="space-y-4">
                {counselors.map((counselor) => (
                  <Card 
                    key={counselor.id} 
                    className={`glass-effect gentle-shadow card-hover cursor-pointer transition-all ${
                      selectedCounselor?.id === counselor.id ? 'ring-2 ring-sage-500' : ''
                    }`}
                    onClick={() => setSelectedCounselor(counselor)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-forest-600 text-lg">{counselor.name}</h3>
                          <p className="text-forest-500 text-sm">{counselor.specialization}</p>
                        </div>
                        <Badge variant="secondary" className="bg-sage-100 text-sage-700">
                          <Star className="h-3 w-3 mr-1" />
                          {counselor.rating}
                        </Badge>
                      </div>
                      
                      <p className="text-forest-600 text-sm mb-4">{counselor.bio}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-forest-500">
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1" />
                          {counselor.experience_years} years exp.
                        </div>
                        <div className="flex items-center">
                          <Languages className="h-4 w-4 mr-1" />
                          {counselor.languages.join(', ')}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {counselor.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-1">
              <Card className="glass-effect gentle-shadow sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center text-forest-600">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    Schedule Appointment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedCounselor ? (
                    <div className="p-3 bg-sage-50 rounded-lg">
                      <p className="font-medium text-sage-700">{selectedCounselor.name}</p>
                      <p className="text-sm text-sage-600">{selectedCounselor.specialization.split(',')[0]}</p>
                    </div>
                  ) : (
                    <p className="text-forest-500 text-sm">Please select a counselor first</p>
                  )}

                  {selectedCounselor && (
                    <>
                      {/* Session Type */}
                      <div>
                        <label className="block text-sm font-medium text-forest-600 mb-2">
                          Session Type
                        </label>
                        <Select value={sessionType} onValueChange={setSessionType}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="individual">Individual Session</SelectItem>
                            <SelectItem value="group">Group Session</SelectItem>
                            <SelectItem value="crisis">Crisis Session</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Session Mode */}
                      <div>
                        <label className="block text-sm font-medium text-forest-600 mb-2">
                          Session Mode
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            variant={sessionMode === 'video' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSessionMode('video')}
                            className="flex flex-col items-center py-3 h-auto"
                          >
                            <Video className="h-4 w-4 mb-1" />
                            <span className="text-xs">Video</span>
                          </Button>
                          <Button
                            variant={sessionMode === 'phone' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSessionMode('phone')}
                            className="flex flex-col items-center py-3 h-auto"
                          >
                            <Phone className="h-4 w-4 mb-1" />
                            <span className="text-xs">Phone</span>
                          </Button>
                          <Button
                            variant={sessionMode === 'in-person' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSessionMode('in-person')}
                            className="flex flex-col items-center py-3 h-auto"
                          >
                            <MapPin className="h-4 w-4 mb-1" />
                            <span className="text-xs">In-Person</span>
                          </Button>
                        </div>
                      </div>

                      {/* Date Selection */}
                      <div>
                        <label className="block text-sm font-medium text-forest-600 mb-2">
                          Select Date
                        </label>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date() || date.getDay() === 0}
                          className="rounded-md border"
                        />
                      </div>

                      {/* Time Selection */}
                      {selectedDate && (
                        <div>
                          <label className="block text-sm font-medium text-forest-600 mb-2">
                            Select Time
                          </label>
                          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                            {generateTimeSlots(selectedDate).map((slot) => (
                              <Button
                                key={slot.time}
                                variant={selectedTime === slot.time ? 'default' : 'outline'}
                                size="sm"
                                disabled={!slot.available}
                                onClick={() => setSelectedTime(slot.time)}
                                className="text-xs"
                              >
                                <Clock className="h-3 w-3 mr-1" />
                                {slot.time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Notes */}
                      <div>
                        <label className="block text-sm font-medium text-forest-600 mb-2">
                          Additional Notes (Optional)
                        </label>
                        <Textarea
                          placeholder="Briefly describe what you'd like to discuss..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={3}
                        />
                      </div>

                      {/* Book Button */}
                      <Button
                        onClick={handleBookAppointment}
                        disabled={!selectedTime || loading}
                        className="w-full bg-sage-500 hover:bg-sage-600 text-white"
                      >
                        {loading ? 'Booking...' : 'Book Appointment'}
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Emergency Notice */}
          <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
            <p className="text-sm text-red-700">
              <strong>Emergency:</strong> If you're in immediate crisis, please call Kashmir Mental Health Helpline: 
              <strong> +91-1942-506062</strong> or Emergency Services: <strong>112</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}