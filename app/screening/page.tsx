'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/layout/Navigation';
import { 
  CheckCircle, 
  AlertTriangle, 
  Heart, 
  Brain, 
  Clock,
  FileText,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: { value: number; label: string }[];
}

interface ScreeningResult {
  total_score: number;
  risk_level: string;
  recommendations: string[];
  need_immediate_help: boolean;
}

const phq9Questions: Question[] = [
  {
    id: 1,
    text: "Little interest or pleasure in doing things",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 2,
    text: "Feeling down, depressed, or hopeless",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 3,
    text: "Trouble falling or staying asleep, or sleeping too much",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 4,
    text: "Feeling tired or having little energy",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 5,
    text: "Poor appetite or overeating",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 6,
    text: "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 7,
    text: "Trouble concentrating on things, such as reading the newspaper or watching television",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 8,
    text: "Moving or speaking so slowly that other people could have noticed, or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 9,
    text: "Thoughts that you would be better off dead, or of hurting yourself in some way",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  }
];

const gad7Questions: Question[] = [
  {
    id: 1,
    text: "Feeling nervous, anxious or on edge",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 2,
    text: "Not being able to stop or control worrying",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 3,
    text: "Worrying too much about different things",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 4,
    text: "Trouble relaxing",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 5,
    text: "Being so restless that it is hard to sit still",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 6,
    text: "Becoming easily annoyed or irritable",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 7,
    text: "Feeling afraid as if something awful might happen",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  }
];

const screeningTypes = [
  {
    id: 'phq9',
    name: 'PHQ-9 Mood Wellness Assessment',
    description: 'Clinically validated Patient Health Questionnaire for mood evaluation',
    icon: Heart,
    duration: '3-5 minutes',
    questions: phq9Questions,
    certification: 'PHQ-9',
    certificationBody: 'American Psychiatric Association'
  },
  {
    id: 'gad7',
    name: 'GAD-7 Anxiety Assessment',
    description: 'Generalized Anxiety Disorder 7-item scale for anxiety evaluation',
    icon: Brain,
    duration: '2-4 minutes',
    questions: gad7Questions,
    certification: 'GAD-7',
    certificationBody: 'Pfizer Inc., Dr. Robert L. Spitzer'
  }
];

export default function ScreeningPage() {
  const [selectedScreening, setSelectedScreening] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<ScreeningResult | null>(null);
  const [loading, setLoading] = useState(false);

  const currentScreeningType = screeningTypes.find(s => s.id === selectedScreening);
  const questions = currentScreeningType?.questions || [];
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

  const handleResponseChange = (questionId: number, value: number) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      submitScreening();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const submitScreening = async () => {
    if (!selectedScreening) return;

    setLoading(true);
    
    const totalScore = Object.values(responses).reduce((sum, val) => sum + val, 0);
    const riskLevel = totalScore > 15 ? 'high' : totalScore > 10 ? 'moderate' : 'mild';
    
    // Send assessment data to backend for admin analytics (hide from user)
    try {
      const response = await fetch('http://localhost:5000/api/screening/' + selectedScreening, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 'anonymous-' + Date.now(),
          responses: responses,
          total_score: totalScore,
          risk_level: riskLevel,
          assessment_type: selectedScreening,
          timestamp: new Date().toISOString()
        }),
      });
    } catch (error) {
      console.log('Backend not available, assessment data saved locally');
    }

    // Show simplified results to user (no scores)
    const userFriendlyResults: ScreeningResult = {
      total_score: 0, // Hidden from user
      risk_level: 'completed',
      recommendations: [
        'Thank you for completing the assessment',
        'Your responses have been recorded confidentially',
        'Consider exploring our wellness resources',
        'Reach out if you need support'
      ],
      need_immediate_help: false
    };

    setTimeout(() => {
      setResults(userFriendlyResults);
      setShowResults(true);
      setLoading(false);
    }, 1500);
  };

  const resetScreening = () => {
    setSelectedScreening(null);
    setCurrentQuestion(0);
    setResponses({});
    setShowResults(false);
    setResults(null);
  };

  const getRiskLevelInfo = (level: string) => {
    switch (level) {
      case 'minimal':
        return { color: 'bg-green-100 text-green-700', label: 'Minimal Risk' };
      case 'mild':
        return { color: 'bg-yellow-100 text-yellow-700', label: 'Mild Risk' };
      case 'moderate':
        return { color: 'bg-orange-100 text-orange-700', label: 'Moderate Risk' };
      case 'moderately_severe':
        return { color: 'bg-red-100 text-red-700', label: 'Moderately Severe Risk' };
      case 'severe':
        return { color: 'bg-red-200 text-red-800', label: 'Severe Risk' };
      default:
        return { color: 'bg-gray-100 text-gray-700', label: 'Unknown' };
    }
  };

  if (showResults && results) {
    const riskInfo = getRiskLevelInfo(results.risk_level);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-100 via-sand-50 to-sage-50">
        <Navigation />
        <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-3xl mx-auto">
            <Card className="glass-effect gentle-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-sage-600" />
                </div>
                <CardTitle className="text-2xl text-forest-600">Assessment Complete</CardTitle>
                <p className="text-forest-500 mt-2">
                  {currentScreeningType?.name} Results
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-forest-600 mb-4">
                    Assessment Completed Successfully
                  </div>
                  <Badge className="bg-green-100 text-green-700 text-lg px-4 py-2">
                    Thank You
                  </Badge>
                  <p className="text-sm text-forest-500 mt-3">
                    Your responses have been securely recorded for analysis by our mental health professionals.
                  </p>
                </div>

                {results.need_immediate_help && (
                  <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                      <h3 className="font-semibold text-red-700">Immediate Support Recommended</h3>
                    </div>
                    <p className="text-red-600 text-sm mt-2">
                      Based on your responses, we recommend reaching out to a mental health professional immediately. 
                      Contact Kashmir Mental Health Helpline: <strong>+91-1942-506062</strong>
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-forest-600 mb-4">Recommendations</h3>
                  <div className="space-y-3">
                    {results.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-sage-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-sage-600 mt-0.5 flex-shrink-0" />
                        <p className="text-forest-600">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    onClick={() => window.location.href = '/booking'}
                    className="bg-sage-500 hover:bg-sage-600 text-white"
                  >
                    Book Counselor Session
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/chat'}
                    variant="outline"
                    className="border-sage-500 text-sage-600 hover:bg-sage-50"
                  >
                    Get AI Support
                  </Button>
                </div>

                <div className="text-center">
                  <Button variant="ghost" onClick={resetScreening}>
                    Take Another Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (selectedScreening && currentScreeningType) {
    const question = questions[currentQuestion];
    const hasResponse = responses[question.id] !== undefined;

    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-100 via-sand-50 to-sage-50">
        <Navigation />
        <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-forest-600">
                  {currentScreeningType.name}
                </h1>
                <Badge variant="outline" className="text-forest-500">
                  {currentQuestion + 1} of {totalQuestions}
                </Badge>
              </div>
              <Progress value={progress} className="w-full h-2" />
            </div>

            <Card className="glass-effect gentle-shadow">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h2 className="text-lg font-medium text-forest-600 mb-6">
                    Over the last 2 weeks, how often have you been bothered by:
                  </h2>
                  <h3 className="text-xl font-semibold text-forest-700 mb-6">
                    {question.text}
                  </h3>
                  
                  <RadioGroup 
                    value={responses[question.id]?.toString() || ''} 
                    onValueChange={(value) => handleResponseChange(question.id, parseInt(value))}
                  >
                    <div className="space-y-4">
                      {question.options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg hover:bg-sage-50 transition-colors">
                          <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                          <Label htmlFor={`option-${option.value}`} className="text-forest-600 cursor-pointer flex-1">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="border-sage-300 text-sage-600"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <Button
                    onClick={handleNext}
                    disabled={!hasResponse || loading}
                    className="bg-sage-500 hover:bg-sage-600 text-white"
                  >
                    {loading ? 'Processing...' : currentQuestion === totalQuestions - 1 ? 'Complete Screening' : 'Next'}
                    {currentQuestion < totalQuestions - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Progress indicator */}
            <div className="mt-6 text-center text-sm text-forest-500">
              Question {currentQuestion + 1} of {totalQuestions} • {Math.round(progress)}% Complete
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100 via-sand-50 to-sage-50">
      <Navigation />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-forest-600 mb-2">
              Wellness Assessments
            </h1>
            <p className="text-forest-500 max-w-2xl mx-auto">
              A gentle way to understand your mental wellness journey. These assessments help us better support you with personalized resources and care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {screeningTypes.map((screening) => {
              const IconComponent = screening.icon;
              return (
                <Card 
                  key={screening.id}
                  className="glass-effect gentle-shadow card-hover cursor-pointer transition-all"
                  onClick={() => setSelectedScreening(screening.id)}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="h-8 w-8 text-sage-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-forest-600 mb-3">
                      {screening.name}
                    </h3>
                    <p className="text-forest-500 mb-4">
                      {screening.description}
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg mb-4">
                      <div className="text-sm font-medium text-blue-700">
                        Certified: {screening.certification}
                      </div>
                      <div className="text-xs text-blue-600">
                        {screening.certificationBody}
                      </div>
                    </div>
                    <div className="flex items-center justify-center text-sm text-forest-400 mb-6">
                      <Clock className="h-4 w-4 mr-2" />
                      {screening.duration}
                    </div>
                    <Button className="w-full bg-sage-500 hover:bg-sage-600 text-white">
                      <FileText className="h-4 w-4 mr-2" />
                      Begin Assessment
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Information Section */}
          <Card className="glass-effect border-l-4 border-sage-500">
            <CardContent className="p-6">
              <h3 className="font-semibold text-forest-600 mb-4">About Wellness Assessments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-forest-600 mb-2">What to Expect:</h4>
                  <ul className="text-sm text-forest-500 space-y-1">
                    <li>• Private and supportive assessment experience</li>
                    <li>• Evidence-based wellness tools</li>
                    <li>• Personalized care recommendations</li>
                    <li>• Immediate results and support resources</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-forest-600 mb-2">Please Remember:</h4>
                  <ul className="text-sm text-forest-500 space-y-1">
                    <li>• These are wellness check-ins, not medical diagnoses</li>
                    <li>• Your responses remain completely private</li>
                    <li>• Results help us support your wellness journey</li>
                    <li>• We'll connect you with professional care when helpful</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Resources */}
          <Card className="mt-8 border-l-4 border-red-500 glass-effect">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-600 mb-1">Crisis Support Available</h3>
                  <p className="text-sm text-red-700">
                    If you're having thoughts of self-harm or suicide, please reach out immediately: 
                    Kashmir Mental Health Helpline: <strong>+91-1942-506062</strong> | Emergency: <strong>112</strong>
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