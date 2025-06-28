
import React, { useState } from 'react';
import { X, MessageCircle, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { doctorService } from '@/services/doctorService';

interface ChatBotProps {
  onClose: () => void;
  onSymptomSelected: (symptom: string) => void;
}

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  suggestions?: string[];
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose, onSymptomSelected }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your healthcare assistant. I can help you find the right type of doctor based on your symptoms. What's bothering you today?",
      suggestions: ['Skin problems', 'Stomach pain', 'Chest pain', 'Headache', 'Joint pain']
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const commonSymptoms = {
    'skin problems': ['acne', 'rash', 'itching', 'hair loss'],
    'stomach pain': ['acidity', 'indigestion', 'nausea', 'bloating'],
    'chest pain': ['breathing difficulty', 'heart palpitations', 'chest tightness'],
    'headache': ['migraine', 'tension headache', 'sinus headache'],
    'joint pain': ['knee pain', 'back pain', 'shoulder pain', 'arthritis']
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate bot response
    const botResponse = generateBotResponse(message.toLowerCase());
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  const generateBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    
    // Check for symptoms and suggest specialists
    const specialties = doctorService.getSpecialtyForSymptom(input);
    
    if (specialties.length > 0 && specialties[0] !== 'General Physician') {
      const specialty = specialties[0];
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: `Based on your symptoms, I recommend consulting a ${specialty}. They specialize in treating conditions like yours. Would you like me to help you find nearby ${specialty.toLowerCase()}s?`,
        suggestions: [`Find ${specialty}`, 'Tell me more', 'Other symptoms']
      };
    }

    // Check for common symptom categories
    for (const [category, symptoms] of Object.entries(commonSymptoms)) {
      if (input.includes(category.split(' ')[0]) || symptoms.some(s => input.includes(s))) {
        return {
          id: Date.now().toString(),
          type: 'bot',
          content: `I understand you're experiencing ${category}. Can you be more specific about your symptoms?`,
          suggestions: symptoms
        };
      }
    }

    // Default response for unclear input
    return {
      id: Date.now().toString(),
      type: 'bot',
      content: "I'd like to help you better. Could you describe your symptoms more specifically? For example, where is the pain located, when did it start, or what type of discomfort are you feeling?",
      suggestions: ['Skin problems', 'Stomach issues', 'Chest/Heart', 'Head/Neck', 'Bones/Joints']
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion.startsWith('Find ')) {
      const symptom = suggestion.replace('Find ', '').toLowerCase();
      onSymptomSelected(symptom);
      return;
    }
    
    handleSendMessage(suggestion);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md h-96 flex flex-col bg-white">
        <CardHeader className="pb-4 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-600" />
              Health Assistant
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0">
          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="flex items-start gap-2">
                    {message.type === 'bot' && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    {message.type === 'user' && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    <p className="text-sm">{message.content}</p>
                  </div>
                  
                  {message.suggestions && (
                    <div className="mt-3 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="mr-1 mb-1 cursor-pointer hover:bg-blue-100 text-xs"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your symptoms..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(input)}
                className="flex-1"
              />
              <Button 
                onClick={() => handleSendMessage(input)}
                disabled={!input.trim() || isTyping}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;
