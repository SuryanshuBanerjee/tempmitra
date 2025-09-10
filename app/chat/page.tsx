'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Heart, AlertCircle, Phone, MessageSquare } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import Link from 'next/link';
import Script from 'next/script';

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

const quickReplies = {
  en: [
    "I'm feeling anxious",
    "I'm stressed about exams", 
    "I can't sleep well",
    "I feel overwhelmed",
    "I need someone to talk to",
  ],
  hi: [
    "मुझे चिंता हो रही है",
    "परीक्षा को लेकर तनाव है",
    "नींद नहीं आ रही",
    "बहुत परेशान हूं",
    "किसी से बात करनी है",
  ]
};

const urgentKeywords = {
  en: ['suicide', 'self-harm', 'crisis', 'emergency', 'hurt myself', 'kill myself', 'end my life'],
  hi: ['आत्महत्या', 'खुदको नुकसान', 'संकट', 'आपातकाल', 'अपने आप को चोट', 'मरना चाहता हूं', 'जिंदगी खत्म करना']
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [useAdvancedMode, setUseAdvancedMode] = useState(false);
  const { user } = useAuth();
  const { language } = useLanguage();

  const isUrgentMessage = (text: string) => {
    const currentKeywords = [...urgentKeywords.en, ...urgentKeywords.hi];
    return currentKeywords.some(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const getBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    const responses = {
      en: {
        urgent: "I'm very concerned about your safety. Please reach out for immediate help:\n🆘 National Suicide Prevention: 9152987821\n🚨 Emergency Services: 112\n🏥 Kashmir Mental Health Helpline: 01942506062\n\nYou matter and you're not alone. Would you like me to help you connect with a crisis counselor right now?",
        anxiety: "I hear that you're feeling anxious, and that takes courage to share. Here are some immediate techniques that can help:\n\n🫁 **Breathing Exercise**: Breathe in for 4 counts, hold for 4, breathe out for 6 counts. Repeat 5 times.\n\n🖐️ **5-4-3-2-1 Grounding**: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.\n\n💭 **Remind yourself**: 'This feeling is temporary and will pass.'\n\nWould you like me to guide you through a longer relaxation exercise, or would you prefer to explore what's triggering your anxiety?",
        stress: "Academic stress is incredibly common, especially in competitive environments like those in J&K. You're not alone in feeling this way. Here's what can help:\n\n📚 **Study Tips**: Break tasks into 25-minute chunks (Pomodoro technique), take regular breaks every hour.\n\n⚖️ **Perspective**: Your grades don't define your worth. You are valuable regardless of performance.\n\n🎯 **Prioritization**: Focus on progress, not perfection. What's the most important task you need to tackle today?\n\n🧘 **Self-Care**: Are you eating well, staying hydrated, and getting enough sleep?\n\nWhat specific aspect of your studies is causing the most stress right now?",
        depression: "Thank you for trusting me with something so difficult. Depression can make everything feel overwhelming and hopeless, but please know that these feelings, while very real, are temporary.\n\n🌅 **Small Steps Matter**: Even getting out of bed or taking a shower is an accomplishment when you're struggling.\n\n🤝 **Connection**: You've reached out here, which shows incredible strength. Have you been able to talk to anyone else about how you're feeling?\n\n💪 **Your Strength**: Remember times when you've overcome challenges before. That strength is still within you.\n\nWould you like to talk about what's been weighing on you, or would you prefer some coping strategies for right now?",
        sleep: "Sleep issues can really impact everything - your mood, energy, and ability to cope with stress. Let's work on improving your sleep:\n\n🌙 **Sleep Hygiene**:\n• Set a consistent bedtime and wake time\n• Avoid screens 1 hour before bed\n• Keep your room cool, dark, and quiet\n• No caffeine after 2 PM\n\n🧘 **Relaxation**: Try progressive muscle relaxation - tense and release each muscle group from toes to head.\n\n📱 **Worry Time**: If thoughts keep you awake, write them down to address tomorrow.\n\nWhat usually keeps you awake - racing thoughts, physical discomfort, or something else?",
        loneliness: "Feeling lonely is one of the hardest emotions to bear, especially when you're away from home. Your feelings are completely valid.\n\n🏠 **Homesickness**: Missing home while building a new life is natural. Both feelings can coexist.\n\n👥 **Small Connections**: Even brief interactions - with classmates, roommates, or neighbors - can help. Quality over quantity.\n\n🎯 **Activities**: Consider joining clubs, study groups, or volunteer opportunities that align with your interests.\n\n🤗 **Self-Compassion**: Be patient with yourself. Building meaningful connections takes time.\n\nWhat kind of social connections are you most missing right now?",
        academic: "Academic pressure can feel overwhelming, but remember that your education journey is unique to you.\n\n📊 **Healthy Perspective**: Grades are important, but they're just one measure of your growth and learning.\n\n🎯 **Goal Setting**: Focus on learning goals rather than just performance goals. What do you want to understand better?\n\n⏰ **Time Management**: Use techniques like time-blocking and the Eisenhower Matrix to prioritize tasks.\n\n🤝 **Support Systems**: Don't hesitate to reach out to professors, classmates, or tutoring services.\n\nWhat specific academic challenge is causing you the most concern?",
        relationships: "Relationship difficulties can be really emotionally draining. It's important to remember that healthy relationships require effort from all parties.\n\n💬 **Communication**: Clear, honest communication is key. Are you able to express your feelings openly?\n\n🚧 **Boundaries**: It's okay to set boundaries to protect your mental health and well-being.\n\n🪞 **Self-Reflection**: Sometimes relationship issues help us understand ourselves better. What patterns do you notice?\n\n❤️ **Self-Care**: Don't neglect your own needs while trying to fix relationship problems.\n\nWould you like to talk about what's happening in your relationships, or do you need strategies for communicating better?",
        motivation: "Loss of motivation is incredibly common, especially during challenging times. You're not broken - you're human.\n\n🌱 **Start Small**: Choose one tiny task you can complete today. Success builds on success.\n\n🎯 **Reconnect with Purpose**: What originally excited you about your goals? Can you remember that feeling?\n\n⚡ **Energy Management**: Sometimes we need to address basic needs first - sleep, nutrition, movement.\n\n🏆 **Celebrate Small Wins**: Acknowledge every step forward, no matter how small.\n\nWhat's one small thing you could do today that would make you feel a bit more accomplished?",
        greeting: "Hello! I'm here to provide you with mental health support and resources. I'm trained to help with anxiety, stress, depression, sleep issues, academic pressure, and more.\n\n🤝 **Safe Space**: This is a judgment-free zone where you can share whatever is on your mind.\n\n🔒 **Confidential**: Our conversation is private and secure.\n\n🌍 **Available 24/7**: I'm here whenever you need support.\n\nHow are you feeling today? Is there something specific you'd like to talk about?",
        thanks: "You're very welcome! It means a lot that you felt comfortable reaching out. Remember:\n\n💪 **Your Courage**: It takes strength to ask for help, and you've shown that strength today.\n\n🌟 **You Matter**: Your feelings and experiences are valid and important.\n\n🤝 **Always Here**: I'm available whenever you need support, day or night.\n\nIs there anything else on your mind that you'd like to discuss?",
        positive: "I'm so glad to hear you're feeling good! It's wonderful when we have moments of positivity and hope.\n\n🌟 **Celebrate**: Take a moment to really acknowledge this good feeling. You deserve it!\n\n💾 **Remember**: Try to hold onto this feeling and remember what contributed to it. These positive moments can be anchors during harder times.\n\n🌱 **Growth**: Feeling good doesn't mean everything is perfect, and that's okay. You're growing and learning.\n\nWhat's contributing to your positive feelings today?",
        default: "Thank you for sharing that with me. It takes courage to reach out, and I'm glad you did.\n\n🤝 **I'm Here**: Whatever you're going through, you don't have to face it alone.\n\n💬 **Open Communication**: Feel free to share as much or as little as you're comfortable with.\n\n🛡️ **Safe Space**: This is a judgment-free environment where your feelings are valid.\n\nHow can I best support you right now? Would you like to talk about what's on your mind, or would you prefer some specific coping strategies?"
      },
      hi: {
        urgent: "मुझे आपकी सुरक्षा की बहुत चिंता है। कृपया तुरंत सहायता के लिए संपर्क करें:\n🆘 राष्ट्रीय आत्महत्या रोकथाम: 9152987821\n🚨 आपातकालीन सेवाएं: 112\n🏥 कश्मीर मानसिक स्वास्थ्य हेल्पलाइन: 01942506062\n\nआप महत्वपूर्ण हैं और आप अकेले नहीं हैं। क्या आप चाहेंगे कि मैं आपको अभी एक संकट सलाहकार से जोड़ने में मदद करूं?",
        anxiety: "मैं समझ रहा हूं कि आप चिंतित महसूस कर रहे हैं, और इसे साझा करने में साहस लगता है। यहां कुछ तत्काल तकनीकें हैं जो मदद कर सकती हैं:\n\n🫁 **सांस लेने का अभ्यास**: 4 गिनती के लिए सांस लें, 4 के लिए रोकें, 6 गिनती के लिए छोड़ें। 5 बार दोहराएं।\n\n🖐️ **5-4-3-2-1 ग्राउंडिंग**: 5 चीजों के नाम बताएं जो आप देखते हैं, 4 जिन्हें आप छू सकते हैं, 3 जो आप सुनते हैं, 2 जिन्हें आप सूंघते हैं, 1 जिसका आप स्वाद लेते हैं।\n\n💭 **खुद को याद दिलाएं**: 'यह भावना अस्थायी है और गुजर जाएगी।'\n\nक्या आप चाहेंगे कि मैं आपको लंबे आराम अभ्यास से गुजारूं, या आप यह जानना पसंद करेंगे कि आपकी चिंता का कारण क्या है?",
        stress: "शैक्षणिक तनाव बेहद आम है, विशेष रूप से जम्मू और कश्मीर जैसे प्रतिस्पर्धी माहौल में। इस तरह महसूस करने में आप अकेले नहीं हैं। यहां है जो मदद कर सकता है:\n\n📚 **अध्ययन की युक्तियां**: कार्यों को 25-मिनट के टुकड़ों में बांटें (पोमोडोरो तकनीक), हर घंटे नियमित ब्रेक लें।\n\n⚖️ **दृष्टिकोण**: आपके अंक आपकी योग्यता को परिभाषित नहीं करते। प्रदर्शन की परवाह किए बिना आप मूल्यवान हैं।\n\n🎯 **प्राथमिकता**: पूर्णता नहीं, प्रगति पर ध्यान दें। आज आपको कौन सा सबसे महत्वपूर्ण कार्य करना है?\n\n🧘 **आत्म-देखभाल**: क्या आप अच्छा खा रहे हैं, हाइड्रेटेड रह रहे हैं, और पर्याप्त नींद ले रहे हैं?\n\nअभी आपकी पढ़ाई का कौन सा विशेष हिस्सा सबसे ज्यादा तनाव दे रहा है?",
        depression: "इतनी कठिन बात मेरे साथ साझा करने के लिए धन्यवाद। अवसाद सब कुछ को भारी और निराशाजनक लगा सकता है, लेकिन कृपया जान लें कि ये भावनाएं, जो बहुत वास्तविक हैं, अस्थायी हैं।\n\n🌅 **छोटे कदम महत्वपूर्ण हैं**: जब आप संघर्ष कर रहे हों तो बिस्तर से उठना या नहाना भी एक उपलब्धि है।\n\n🤝 **संपर्क**: आपने यहां संपर्क किया है, जो अविश्वसनीय शक्ति दिखाता है। क्या आप किसी और से अपनी भावनाओं के बारे में बात कर पाए हैं?\n\n💪 **आपकी शक्ति**: उन समयों को याद करें जब आपने पहले चुनौतियों को पार किया था। वह शक्ति अभी भी आपके भीतर है।\n\nक्या आप इस बारे में बात करना चाहेंगे कि आपको क्या परेशान कर रहा है, या आप अभी के लिए कुछ मुकाबला रणनीतियां पसंद करेंगे?",
        sleep: "नींद की समस्याएं वास्तव में सब कुछ को प्रभावित कर सकती हैं - आपका मूड, ऊर्जा, और तनाव से निपटने की क्षमता। आइए आपकी नींद सुधारने पर काम करें:\n\n🌙 **नींद की स्वच्छता**:\n• एक निरंतर सोने और जागने का समय निर्धारित करें\n• सोने से 1 घंटे पहले स्क्रीन से बचें\n• अपने कमरे को ठंडा, अंधेरा और शांत रखें\n• दोपहर 2 बजे के बाद कैफीन न लें\n\n🧘 **आराम**: प्रगतिशील मांसपेशी आराम की कोशिश करें - पैर की अंगुलियों से सिर तक प्रत्येक मांसपेशी समूह को तनाव और छोड़ें।\n\n📱 **चिंता का समय**: यदि विचार आपको जगाए रखते हैं, तो उन्हें कल के लिए लिख दें।\n\nआपको आमतौर पर क्या जगाए रखता है - दौड़ते विचार, शारीरिक असहजता, या कुछ और?",
        loneliness: "अकेलापन महसूस करना सबसे कठिन भावनाओं में से एक है, विशेष रूप से जब आप घर से दूर हों। आपकी भावनाएं पूरी तरह से वैध हैं।\n\n🏠 **घर की याद**: नई जिंदगी बनाते समय घर की याद करना स्वाभाविक है। दोनों भावनाएं एक साथ रह सकती हैं।\n\n👥 **छोटे कनेक्शन**: यहां तक कि संक्षिप्त बातचीत - सहपाठियों, रूममेट्स, या पड़ोसियों के साथ - भी मदद कर सकती हैं। गुणवत्ता मात्रा से बेहतर है।\n\n🎯 **गतिविधियां**: ऐसे क्लब, स्टडी ग्रुप, या स्वयंसेवी अवसरों में शामिल होने पर विचार करें जो आपकी रुचियों से मेल खाते हैं।\n\n🤗 **आत्म-करुणा**: अपने साथ धैर्य रखें। अर्थपूर्ण कनेक्शन बनाने में समय लगता है।\n\nअभी आप किस तरह के सामाजिक कनेक्शन सबसे ज्यादा मिस कर रहे हैं?",
        academic: "शैक्षणिक दबाव भारी लग सकता है, लेकिन याद रखें कि आपकी शिक्षा यात्रा आपके लिए अनूठी है।\n\n📊 **स्वस्थ दृष्टिकोण**: अंक महत्वपूर्ण हैं, लेकिन वे आपकी वृद्धि और सीखने का केवल एक मापदंड हैं।\n\n🎯 **लक्ष्य निर्धारण**: केवल प्रदर्शन लक्ष्यों के बजाय सीखने के लक्ष्यों पर ध्यान दें। आप क्या बेहतर समझना चाहते हैं?\n\n⏰ **समय प्रबंधन**: कार्यों को प्राथमिकता देने के लिए टाइम-ब्लॉकिंग और आइजनहावर मैट्रिक्स जैसी तकनीकों का उपयोग करें।\n\n🤝 **सहायता प्रणालियां**: प्रोफेसरों, सहपाठियों, या ट्यूटरिंग सेवाओं से संपर्क करने में झिझक न करें।\n\nकौन सी विशिष्ट शैक्षणिक चुनौती आपको सबसे ज्यादा परेशान कर रही है?",
        relationships: "रिश्तों की कठिनाइयां वास्तव में भावनात्मक रूप से थका देने वाली हो सकती हैं। यह याद रखना महत्वपूर्ण है कि स्वस्थ रिश्तों के लिए सभी पक्षों से प्रयास की आवश्यकता होती है।\n\n💬 **संवाद**: स्पष्ट, ईमानदार संवाद महत्वपूर्ण है। क्या आप अपनी भावनाओं को खुले तौर पर व्यक्त कर पा रहे हैं?\n\n🚧 **सीमाएं**: अपने मानसिक स्वास्थ्य और कल्याण की रक्षा के लिए सीमाएं निर्धारित करना ठीक है।\n\n🪞 **आत्म-चिंतन**: कभी-कभी रिश्तों की समस्याएं हमें खुद को बेहतर समझने में मदद करती हैं। आप कौन से पैटर्न देखते हैं?\n\n❤️ **आत्म-देखभाल**: रिश्तों की समस्याओं को ठीक करने की कोशिश करते समय अपनी जरूरतों की उपेक्षा न करें।\n\nक्या आप अपने रिश्तों में क्या हो रहा है इस बारे में बात करना चाहेंगे, या आपको बेहतर संवाद की रणनीतियों की जरूरत है?",
        motivation: "प्रेरणा की हानि बेहद आम है, विशेष रूप से चुनौतीपूर्ण समय के दौरान। आप टूटे हुए नहीं हैं - आप इंसान हैं।\n\n🌱 **छोटी शुरुआत करें**: एक छोटा काम चुनें जिसे आप आज पूरा कर सकें। सफलता सफलता पर निर्मित होती है।\n\n🎯 **उद्देश्य से फिर से जुड़ें**: आपके लक्ष्यों के बारे में मूल रूप से क्या रोमांचक था? क्या आप उस भावना को याद कर सकते हैं?\n\n⚡ **ऊर्जा प्रबंधन**: कभी-कभी हमें पहले बुनियादी जरूरतों को पूरा करना पड़ता है - नींद, पोषण, गति।\n\n🏆 **छोटी जीत का जश्न मनाएं**: आगे बढ़ने वाले हर कदम को स्वीकार करें, चाहे वह कितना भी छोटा हो।\n\nआज आप एक छोटी सी चीज क्या कर सकते हैं जिससे आप थोड़ा और accomplished महसूस करें?",
        greeting: "नमस्ते! मैं आपको मानसिक स्वास्थ्य सहायता और संसाधन प्रदान करने के लिए यहां हूं। मैं चिंता, तनाव, अवसाद, नींद की समस्याओं, शैक्षणिक दबाव, और अधिक में मदद करने के लिए प्रशिक्षित हूं।\n\n🤝 **सुरक्षित स्थान**: यह एक निर्णय-मुक्त क्षेत्र है जहां आप अपने मन में जो कुछ भी है उसे साझा कर सकते हैं।\n\n🔒 **गोपनीय**: हमारी बातचीत निजी और सुरक्षित है।\n\n🌍 **24/7 उपलब्ध**: जब भी आपको सहायता की आवश्यकता हो, मैं यहां हूं।\n\nआज आप कैसा महसूस कर रहे हैं? क्या कुछ विशेष है जिसके बारे में आप बात करना चाहेंगे?",
        thanks: "आपका बहुत-बहुत स्वागत है! यह जानकर अच्छा लगता है कि आपने संपर्क करने में सहजता महसूस की। याद रखें:\n\n💪 **आपका साहस**: सहायता मांगने में शक्ति लगती है, और आपने आज वह शक्ति दिखाई है।\n\n🌟 **आप महत्वपूर्ण हैं**: आपकी भावनाएं और अनुभव वैध और महत्वपूर्ण हैं।\n\n🤝 **हमेशा यहां**: जब भी आपको सहायता की आवश्यकता हो, दिन या रात, मैं उपलब्ध हूं।\n\nक्या आपके मन में कुछ और है जिसके बारे में आप चर्चा करना चाहेंगे?",
        positive: "यह सुनकर मुझे बहुत खुशी हुई कि आप अच्छा महसूस कर रहे हैं! जब हमारे पास सकारात्मकता और उम्मीद के क्षण होते हैं तो यह अद्भुत होता है।\n\n🌟 **जश्न मनाएं**: इस अच्छी भावना को वास्तव में स्वीकार करने के लिए एक पल लें। आप इसके हकदार हैं!\n\n💾 **याद रखें**: इस भावना को पकड़ने की कोशिश करें और याद रखें कि इसमें क्या योगदान था। ये सकारात्मक क्षण कठिन समय के दौरान लंगर का काम कर सकते हैं।\n\n🌱 **विकास**: अच्छा महसूस करने का मतलब यह नहीं है कि सब कुछ परफेक्ट है, और यह ठीक है। आप बढ़ रहे हैं और सीख रहे हैं।\n\nआज आपकी सकारात्मक भावनाओं में क्या योगदान दे रहा है?",
        default: "मेरे साथ इसे साझा करने के लिए धन्यवाद। संपर्क करने में साहस लगता है, और मुझे खुशी है कि आपने किया।\n\n🤝 **मैं यहां हूं**: आप जो भी सामना कर रहे हैं, आपको इसका अकेले सामना नहीं करना पड़ेगा।\n\n💬 **खुला संवाद**: जितना आप चाहें उतना या जितना कम आप सहज महसूस करें, साझा करने के लिए स्वतंत्र महसूस करें।\n\n🛡️ **सुरक्षित स्थान**: यह एक निर्णय-मुक्त वातावरण है जहां आपकी भावनाएं वैध हैं।\n\nमैं अभी आपकी सबसे अच्छी सहायता कैसे कर सकता हूं? क्या आप अपने मन की बात कहना चाहेंगे, या आप कुछ विशिष्ट मुकाबला रणनीतियां पसंद करेंगे?"
      }
    };

    // Crisis detection
    if (isUrgentMessage(userMessage)) {
      return {
        text: responses[language].urgent,
        type: 'urgent' as const,
      };
    }
    
    // Anxiety patterns
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('panic') ||
        lowerMessage.includes('चिंता') || lowerMessage.includes('परेशान') || lowerMessage.includes('घबराहट')) {
      return {
        text: responses[language].anxiety,
        type: 'resource' as const,
      };
    }
    
    // Stress patterns  
    if (lowerMessage.includes('stress') || lowerMessage.includes('exam') || lowerMessage.includes('pressure') ||
        lowerMessage.includes('तनाव') || lowerMessage.includes('परीक्षा') || lowerMessage.includes('दबाव')) {
      return {
        text: responses[language].stress,
        type: 'resource' as const,
      };
    }
    
    // Depression patterns
    if (lowerMessage.includes('depress') || lowerMessage.includes('sad') || lowerMessage.includes('hopeless') ||
        lowerMessage.includes('empty') || lowerMessage.includes('उदास') || lowerMessage.includes('निराश')) {
      return {
        text: responses[language].depression,
        type: 'resource' as const,
      };
    }
    
    // Sleep patterns
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired') ||
        lowerMessage.includes('नींद') || lowerMessage.includes('अनिद्रा') || lowerMessage.includes('थक')) {
      return {
        text: responses[language].sleep,
        type: 'resource' as const,
      };
    }
    
    // Loneliness patterns
    if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated') ||
        lowerMessage.includes('homesick') || lowerMessage.includes('अकेला') || lowerMessage.includes('अलग')) {
      return {
        text: responses[language].loneliness,
        type: 'resource' as const,
      };
    }
    
    // Academic patterns
    if (lowerMessage.includes('grades') || lowerMessage.includes('study') || lowerMessage.includes('college') ||
        lowerMessage.includes('university') || lowerMessage.includes('अंक') || lowerMessage.includes('पढ़ाई')) {
      return {
        text: responses[language].academic,
        type: 'resource' as const,
      };
    }
    
    // Relationship patterns
    if (lowerMessage.includes('relationship') || lowerMessage.includes('friend') || lowerMessage.includes('family') ||
        lowerMessage.includes('fight') || lowerMessage.includes('रिश्ते') || lowerMessage.includes('दोस्त')) {
      return {
        text: responses[language].relationships,
        type: 'resource' as const,
      };
    }
    
    // Motivation patterns
    if (lowerMessage.includes('motivat') || lowerMessage.includes('lazy') || lowerMessage.includes('procrastinat') ||
        lowerMessage.includes('give up') || lowerMessage.includes('प्रेरणा') || lowerMessage.includes('आलस')) {
      return {
        text: responses[language].motivation,
        type: 'resource' as const,
      };
    }
    
    // Greeting patterns
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') ||
        lowerMessage.includes('namaste') || lowerMessage.includes('नमस्ते') || lowerMessage.includes('आदाब')) {
      return {
        text: responses[language].greeting,
        type: 'normal' as const,
      };
    }
    
    // Thanks patterns
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('grateful') ||
        lowerMessage.includes('धन्यवाद') || lowerMessage.includes('शुक्रिया')) {
      return {
        text: responses[language].thanks,
        type: 'normal' as const,
      };
    }
    
    // Positive patterns
    if (lowerMessage.includes('good') || lowerMessage.includes('better') || lowerMessage.includes('happy') ||
        lowerMessage.includes('great') || lowerMessage.includes('अच्छा') || lowerMessage.includes('खुश')) {
      return {
        text: responses[language].positive,
        type: 'normal' as const,
      };
    }
    
    return {
      text: responses[language].default,
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
      // Use advanced mode (backend API) or simple mode (local)
      if (useAdvancedMode) {
        const response = await fetch('http://localhost:5000/api/chat/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: user?.user_id || 'demo-user',
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
      } else {
        // Simple mode - use local comprehensive responses
        const botResponse = getBotResponse(messageText);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse.text,
          sender: 'bot',
          timestamp: new Date(),
          type: botResponse.type,
        };
        
        setMessages(prev => [...prev, botMessage]);
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
      
      {/* Google Dialogflow Script */}
      <Script 
        src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"
        strategy="afterInteractive"
      />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-forest-600 mb-2">
              {language === 'hi' ? 'AI मानसिक स्वास्थ्य सहायता चैट' : 'AI Mental Health Support Chat'}
            </h1>
            <p className="text-forest-500">
              {language === 'hi' ? 'सुरक्षित, गोपनीय, और तत्काल सहायता के लिए 24/7 उपलब्ध' : 'Safe, confidential, and available 24/7 for immediate support'}
            </p>
            
            {/* Advanced Mode Toggle */}
            <div className="flex justify-center mt-4 space-x-4">
              <Button
                variant={useAdvancedMode ? 'outline' : 'default'}
                onClick={() => setUseAdvancedMode(false)}
                className="flex items-center space-x-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span>{language === 'hi' ? 'सामान्य चैट' : 'Simple Chat'}</span>
              </Button>
              <Button
                variant={useAdvancedMode ? 'default' : 'outline'}
                onClick={() => setUseAdvancedMode(true)}
                className="flex items-center space-x-2"
              >
                <Bot className="h-4 w-4" />
                <span>{language === 'hi' ? 'उन्नत AI सहायता' : 'Advanced AI Support'}</span>
              </Button>
            </div>
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
            <CardHeader className={`${useAdvancedMode ? 'bg-blue-gradient' : 'bg-sage-gradient'} text-white rounded-t-lg`}>
              <CardTitle className="flex items-center">
                {useAdvancedMode ? <Bot className="h-6 w-6 mr-2" /> : <MessageSquare className="h-6 w-6 mr-2" />}
                {language === 'hi' ? 'MITRA सहायता चैट' : 'MITRA Support Chat'}
                <Badge variant="secondary" className="ml-auto bg-white/20 text-white">
                  {language === 'hi' ? 'ऑनलाइन' : 'Online'}
                </Badge>
              </CardTitle>
              <p className="text-sm text-white/80 mt-1">
                {useAdvancedMode 
                  ? (language === 'hi' ? 'उन्नत AI मोड - अधिक विस्तृत सहायता' : 'Advanced AI Mode - Enhanced detailed support')
                  : (language === 'hi' ? 'सामान्य मोड - त्वरित सहायता' : 'Simple Mode - Quick support')
                }
              </p>
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
                      className={`max-w-[85%] p-3 rounded-lg ${
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
                        <div className="flex-1">
                          <div className="whitespace-pre-wrap">{message.text}</div>
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
                <p className="text-sm text-forest-500 mb-2">
                  {language === 'hi' ? 'त्वरित उत्तर:' : 'Quick replies:'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies[language].map((reply) => (
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
                    placeholder={language === 'hi' ? "अपना संदेश यहाँ लिखें..." : "Type your message here..."}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 border-sage-300 focus:border-sage-500"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className={`${useAdvancedMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-sage-500 hover:bg-sage-600'} text-white`}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Google Dialogflow Widget - Advanced Mode Only */}
          {useAdvancedMode && (
            <Card className="glass-effect gentle-shadow mt-6">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Bot className="h-6 w-6 mr-2" />
                  {language === 'hi' ? 'Google AI सहायक (कार्य प्रगति पर)' : 'Google AI Assistant (Work in Progress)'}
                  <Badge variant="secondary" className="ml-auto bg-white/20 text-white">
                    {language === 'hi' ? 'प्रयोगात्मक' : 'Experimental'}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-white/80 mt-1">
                  {language === 'hi' 
                    ? 'यह Google Dialogflow द्वारा संचालित एक प्रयोगात्मक AI सहायक है। यदि यह लोड नहीं होता है, तो ऊपर के MITRA चैट का उपयोग करें।'
                    : 'This is an experimental AI assistant powered by Google Dialogflow. If it doesn\'t load, please use the MITRA chat above.'
                  }
                </p>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <p className="text-forest-600 mb-2">
                    {language === 'hi' 
                      ? '🚧 विकास में: Google AI एकीकरण'
                      : '🚧 In Development: Google AI Integration'
                    }
                  </p>
                  <p className="text-sm text-forest-500">
                    {language === 'hi'
                      ? 'यह फीचर अभी भी विकसित हो रहा है। बेहतर अनुभव के लिए ऊपर वाले MITRA चैट का उपयोग करें।'
                      : 'This feature is still being developed. For a better experience, please use the MITRA chat above.'
                    }
                  </p>
                </div>
                
                {/* Dialogflow Messenger Container */}
                <div className="min-h-[300px] flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    {/* Dialogflow will render here when ready */}
                    <df-messenger
                      intent="WELCOME"
                      chat-title={language === 'hi' ? 'MITRA मानसिक स्वास्थ्य सहायता' : 'MITRA Mental Health Support'}
                      agent-id="a4324459-01e5-49f4-916a-3b6615bf1c72"
                      language-code={language === 'hi' ? 'hi' : 'en'}
                      className="w-full h-full"
                    />
                    <div className="mt-4 text-gray-500">
                      <Bot className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm">
                        {language === 'hi' ? 'Google AI लोड हो रहा है...' : 'Loading Google AI...'}
                      </p>
                      <p className="text-xs mt-1">
                        {language === 'hi' 
                          ? 'यदि यह लोड नहीं होता है, तो यह अभी भी विकास में है।'
                          : 'If this doesn\'t load, it\'s still in development.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-600 text-center">
                    {language === 'hi'
                      ? '💡 सुझाव: अभी के लिए ऊपर वाले MITRA चैट का उपयोग करें जो पूरी तरह कार्यात्मक है और बेहतर अनुभव प्रदान करता है।'
                      : '💡 Tip: For now, use the MITRA chat above which is fully functional and provides better experience.'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Additional Resources */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="glass-effect p-4">
              <h3 className="font-semibold text-forest-600 mb-2">Need More Help?</h3>
              <p className="text-sm text-forest-500 mb-3">
                Connect with a professional counselor for personalized support.
              </p>
              <Button variant="outline" size="sm" className="border-sage-300 text-sage-600" asChild>
                <Link href="/booking">Book Counselor Session</Link>
              </Button>
            </Card>
            
            <Card className="glass-effect p-4">
              <h3 className="font-semibold text-forest-600 mb-2">Join Community</h3>
              <p className="text-sm text-forest-500 mb-3">
                Connect with other students in our moderated support forums.
              </p>
              <Button variant="outline" size="sm" className="border-dusty-300 text-dusty-500" asChild>
                <Link href="/community">Visit Community Forum</Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}