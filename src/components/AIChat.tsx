import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, User, Minimize2, Maximize2, MessageCircle } from 'lucide-react';
import { ChatMessage } from '@/types';

export const AIChat = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hi! I'm your AI assistant. I can help you with programming questions, explain concepts, debug code, and guide you through problem-solving. What would you like to know?",
      isAI: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Simple keyword-based responses for demo
    if (message.includes('python')) {
      return "Python is a great language! Here are some tips:\n\n• Use meaningful variable names\n• Follow PEP 8 style guidelines\n• Leverage built-in functions like enumerate(), zip()\n• Consider using list comprehensions for simple operations\n\nWhat specific Python concept would you like help with?";
    }
    
    if (message.includes('javascript') || message.includes('js')) {
      return "JavaScript tips:\n\n• Use const/let instead of var\n• Learn async/await for handling promises\n• Understand the difference between == and ===\n• Practice with array methods like map(), filter(), reduce()\n\nNeed help with a specific JS problem?";
    }
    
    if (message.includes('sql') || message.includes('database')) {
      return "SQL best practices:\n\n• Use proper indexing for performance\n• Write readable queries with proper formatting\n• Use JOINs instead of subqueries when possible\n• Always validate user input to prevent injection\n\nWhat's your database question?";
    }
    
    if (message.includes('algorithm') || message.includes('complexity')) {
      return "Algorithm analysis tips:\n\n• Start with brute force, then optimize\n• Consider time vs space complexity tradeoffs\n• Practice common patterns: two pointers, sliding window, etc.\n• Use Big O notation to analyze efficiency\n\nWhich algorithm concept interests you?";
    }
    
    if (message.includes('error') || message.includes('debug')) {
      return "Debugging strategies:\n\n• Read the error message carefully\n• Use print statements or debugger\n• Check variable values at each step\n• Isolate the problem with minimal test cases\n\nShare your error message and I'll help analyze it!";
    }
    
    return "I understand you're asking about programming concepts. Could you provide more specific details about:\n\n• What language you're working with\n• The specific problem you're facing\n• Any error messages you're seeing\n• What you've already tried\n\nThis will help me give you more targeted assistance!";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      isAI: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(input),
        isAI: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-14 h-14 bg-gradient-primary hover:shadow-glow transition-all duration-300 shadow-elevated"
        >
          <Bot className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px]">
      <Card className="h-full border-border shadow-elevated bg-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Bot className="w-5 h-5 text-primary" />
              <span>AI Assistant</span>
              <Badge variant="secondary" className="text-xs">Online</Badge>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
              className="p-1 h-auto"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex flex-col h-full pb-0">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    message.isAI
                      ? 'bg-muted text-foreground'
                      : 'bg-gradient-primary text-primary-foreground'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.isAI && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    {!message.isAI && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground rounded-lg px-3 py-2 text-sm max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="flex space-x-2 pt-2 border-t border-border">
            <Input
              placeholder="Ask me anything about programming..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-input border-border"
            />
            <Button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="px-3 bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};