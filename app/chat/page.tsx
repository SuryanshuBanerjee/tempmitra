'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Heart, AlertCircle, Phone } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'normal' | 'urgent' | 'resource';
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hello! I'm here to provide you with mental health support and resources. How are you feeling today?",
    sender: 'bot',
    timestamp: new Date(),
  },
];

const quickReplies = [
  "I'm feeling anxious",
  "I'm stressed about exams", 
  "I can't sleep well",
  "I feel overwhelmed",
  "I need someone to talk to",
];

const urgentKeywords = ['suicide', 'self-harm', 'crisis', 'emergency', 'hurt myself'];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const isUrgentMessage = (text: string) => {
    return urgentKeywords.some(keyword => 
      text.toLowerCase().includes(keyword)
    );
  };

  const getBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (isUrgentMessage(userMessage)) {
      return {
        text: "I'm concerned about your safety. Please consider reaching out to emergency services (112) or our crisis hotline immediately. Would you like me to connect you with a counselor right now?",
        type: 'urgent' as const,
      };
    }
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
      return {
        text: "I understand you're feeling anxious. Try this breathing exercise: breathe in for 4 counts, hold for 4, breathe out for 6. Would you like more anxiety management resources?",
        type: 'resource' as const,
      };
    }
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('exam')) {
      return {
        text: "Academic stress is very common. Here are some quick tips: take regular breaks, prioritize tasks, and remember that your worth isn't defined by grades. Would you like to book a session with a counselor?",
        type: 'resource' as const,
      };
    }
    
    if (lowerMessage.includes('sleep')) {
      return {
        text: "Sleep issues can really affect your mental health. Try establishing a bedtime routine, avoiding screens before bed, and creating a calm environment. I can share some sleep hygiene resources if you'd like.",
        type: 'resource' as const,
      };
    }
    
    return {
      text: "Thank you for sharing that with me. It's important that you reached out. Remember, seeking help is a sign of strength. How can I best support you right now?",
      type: 'normal' as const,
    };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      // Try to use the backend API
      const response = await fetch('http://localhost:5000/api/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 'demo-user',
          message: messageText,
          session_id: sessionStorage.getItem('chat_session_id')
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Store session ID
        if (data.session_id) {
          sessionStorage.setItem('chat_session_id', data.session_id);
        }

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: 'bot',
          timestamp: new Date(),
          type: data.type,
        };
        
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('Backend not available');
      }
    } catch (error) {
      // Fallback to local bot logic if backend is not available
      const botResponse = getBotResponse(messageText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        type: botResponse.type,
      };
      
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    setInputText(reply);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100 via-sand-50 to-sage-50">
      <Navigation />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-forest-600 mb-2">
              AI Mental Health Support Chat
            </h1>
            <p className="text-forest-500">
              Safe, confidential, and available 24/7 for immediate support
            </p>
          </div>

          {/* Emergency Alert */}
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-sm text-red-700">
                <strong>Emergency:</strong> If you're in immediate danger, please call 112 or contact emergency services.
              </p>
              <Button size="sm" variant="outline" className="ml-auto border-red-400 text-red-600 hover:bg-red-50">
                <Phone className="h-4 w-4 mr-2" />
                Crisis Line
              </Button>
            </div>
          </div>

          <Card className="glass-effect gentle-shadow">
            <CardHeader className="bg-sage-gradient text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <Bot className="h-6 w-6 mr-2" />
                MindWell Support Chat
                <Badge variant="secondary" className="ml-auto bg-white/20 text-white">
                  Online
                </Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-sage-500 text-white'
                          : message.type === 'urgent'
                          ? 'bg-red-50 text-red-800 border border-red-200'
                          : message.type === 'resource'
                          ? 'bg-sand-50 text-sand-800 border border-sand-200'
                          : 'bg-white text-forest-600 border border-sage-200'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === 'bot' && (
                          <Bot className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        )}
                        {message.sender === 'user' && (
                          <User className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        )}
                        <div>
                          <p>{message.text}</p>
                          <p className="text-xs opacity-60 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-lg border border-sage-200 max-w-[70%]">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-5 w-5" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Replies */}
              <div className="px-4 py-2 border-t border-sage-100">
                <p className="text-sm text-forest-500 mb-2">Quick replies:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <Button
                      key={reply}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs border-sage-300 text-sage-600 hover:bg-sage-50"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-sage-100">
                <div className="flex space-x-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message here..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 border-sage-300 focus:border-sage-500"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-sage-500 hover:bg-sage-600 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="glass-effect p-4">
              <h3 className="font-semibold text-forest-600 mb-2">Need More Help?</h3>
              <p className="text-sm text-forest-500 mb-3">
                Connect with a professional counselor for personalized support.
              </p>
              <Button variant="outline" size="sm" className="border-sage-300 text-sage-600">
                Book Counselor Session
              </Button>
            </Card>
            
            <Card className="glass-effect p-4">
              <h3 className="font-semibold text-forest-600 mb-2">Join Community</h3>
              <p className="text-sm text-forest-500 mb-3">
                Connect with other students in our moderated support forums.
              </p>
              <Button variant="outline" size="sm" className="border-dusty-300 text-dusty-500">
                Visit Community Forum
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}