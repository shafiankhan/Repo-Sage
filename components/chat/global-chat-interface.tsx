"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, FileText, Save, Copy, Lightbulb } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  files?: { name: string; line?: number }[];
}

interface ChatInterfaceProps {
  projectId?: string;
}

const realisticMockResponses = [
  {
    question: "How does authentication work?",
    content: "**Authentication Flow:**\n\n• **Login Process** (Line 15-30 in `auth.ts`)\n  - User enters credentials\n  - Firebase validates email/password\n  - JWT token generated\n\n• **Session Management** (Line 45-60 in `auth-context.tsx`)\n  - Token stored in localStorage\n  - Auto-refresh every 50 minutes\n  - Logout clears all session data\n\n• **Route Protection** (Line 8-25 in `layout.tsx`)\n  - Check auth state on page load\n  - Redirect to login if not authenticated",
    files: [
      { name: 'lib/auth.ts', line: 15 },
      { name: 'contexts/auth-context.tsx', line: 45 },
      { name: 'app/(dashboard)/layout.tsx', line: 8 }
    ]
  },
  {
    question: "What's the project structure?",
    content: "**Project Architecture:**\n\n• **App Router Structure** (Line 1-10 in `layout.tsx`)\n  - `/app` directory for pages\n  - Route groups with `(dashboard)`\n  - Nested layouts for consistent UI\n\n• **Component Organization** (Line 5-20 in `sidebar.tsx`)\n  - Feature-based components\n  - Reusable UI in `/components/ui`\n  - Custom hooks in `/hooks`\n\n• **State Management** (Line 12-35 in `auth-context.tsx`)\n  - React Context for global state\n  - Local state with useState\n  - Firebase real-time listeners",
    files: [
      { name: 'app/layout.tsx', line: 1 },
      { name: 'components/dashboard/sidebar.tsx', line: 5 },
      { name: 'contexts/auth-context.tsx', line: 12 }
    ]
  },
  {
    question: "How does the theme toggle work?",
    content: "**Theme System:**\n\n• **Theme Provider** (Line 8-15 in `theme-provider.tsx`)\n  - next-themes for theme management\n  - System preference detection\n  - Persistent theme storage\n\n• **CSS Variables** (Line 20-50 in `globals.css`)\n  - Light/dark color definitions\n  - Automatic switching with `.dark` class\n  - GitHub-inspired color palette\n\n• **Toggle Component** (Line 12-25 in `theme-toggle.tsx`)\n  - Sun/moon icon animation\n  - Smooth transitions\n  - Accessible button design",
    files: [
      { name: 'components/theme-provider.tsx', line: 8 },
      { name: 'app/globals.css', line: 20 },
      { name: 'components/theme-toggle.tsx', line: 12 }
    ]
  },
  {
    question: "How is data fetched?",
    content: "**Data Fetching Strategy:**\n\n• **Firebase Integration** (Line 25-40 in `firebase.ts`)\n  - Firestore for real-time data\n  - Authentication state listeners\n  - Offline support with caching\n\n• **React Hooks** (Line 15-30 in `auth-context.tsx`)\n  - useEffect for data subscriptions\n  - useState for local state\n  - Custom hooks for reusability\n\n• **Error Handling** (Line 35-50 in `auth.ts`)\n  - Try-catch blocks\n  - User-friendly error messages\n  - Fallback UI states",
    files: [
      { name: 'lib/firebase.ts', line: 25 },
      { name: 'contexts/auth-context.tsx', line: 15 },
      { name: 'lib/auth.ts', line: 35 }
    ]
  }
];

const savedConversations = [
  { id: '1', title: 'Authentication implementation', timestamp: '2 hours ago' },
  { id: '2', title: 'Theme system setup', timestamp: '1 day ago' },
  { id: '3', title: 'Component architecture', timestamp: '3 days ago' },
  { id: '4', title: 'Data fetching patterns', timestamp: '1 week ago' },
];

const suggestedQuestions = [
  "How does authentication work?",
  "What's the project structure?",
  "How does the theme toggle work?",
  "How is data fetched?",
  "What UI components are used?",
  "How does routing work?"
];

export function GlobalChatInterface({ projectId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Find the best matching response
    const findBestResponse = (query: string) => {
      const queryLower = query.toLowerCase();
      
      for (const response of realisticMockResponses) {
        if (queryLower.includes('auth') && response.question.includes('authentication')) return response;
        if (queryLower.includes('structure') && response.question.includes('structure')) return response;
        if (queryLower.includes('theme') && response.question.includes('theme')) return response;
        if (queryLower.includes('data') && response.question.includes('data')) return response;
      }
      
      return realisticMockResponses[Math.floor(Math.random() * realisticMockResponses.length)];
    };

    // Simulate AI response
    setTimeout(() => {
      const selectedResponse = findBestResponse(textToSend);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: selectedResponse.content,
        timestamp: new Date(),
        files: selectedResponse.files,
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSend(question);
  };

  return (
    <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
      {/* Saved Conversations */}
      <div className="lg:col-span-1">
        <Card className="github-card h-full">
          <CardHeader>
            <CardTitle className="text-lg">Conversations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {savedConversations.map((conversation) => (
              <Button
                key={conversation.id}
                variant="ghost"
                className="w-full justify-start text-left h-auto p-3 hover:bg-accent"
              >
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span className="font-medium truncate">{conversation.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <div className="lg:col-span-3">
        <Card className="github-card h-full flex flex-col">
          <CardHeader className="border-b border-border bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold">Repo Guide</span>
                <span className="text-xs text-white/80">Your AI Code Assistant</span>
              </div>
              <span className="text-xs bg-green-500/20 text-green-200 px-2 py-1 rounded-full border border-green-400/30 ml-auto">
                ● Online
              </span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground mt-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl flex items-center justify-center">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Welcome to Repo Guide</h3>
                  <p className="mb-6">Your intelligent code assistant that understands your repository structure and provides detailed explanations with precise code references.</p>
                  
                  {/* Suggested Questions */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Lightbulb className="w-4 h-4" />
                      Try asking about:
                    </div>
                    <div className="grid gap-2">
                      {suggestedQuestions.slice(0, 6).map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-left h-auto p-3 whitespace-normal hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950 dark:hover:to-purple-950 transition-all duration-200"
                          onClick={() => handleSuggestedQuestion(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'ai' && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`max-w-[85%] ${message.type === 'user' ? 'order-1' : 'order-2'}`}>
                      <div className={`p-4 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-auto' 
                          : 'bg-muted border border-border'
                      }`}>
                        <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                        
                        {message.files && message.files.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-white/20">
                            <div className="text-sm text-muted-foreground mb-2 font-medium">Referenced files:</div>
                            <div className="grid gap-1">
                              {message.files.map((file, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 rounded px-2 py-1 border border-blue-200 dark:border-blue-800">
                                  <FileText className="w-3 h-3" />
                                  <code className="text-xs">
                                    {file.name}
                                    {file.line && <span className="text-muted-foreground">:{file.line}</span>}
                                  </code>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {message.type === 'ai' && (
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="ghost" className="h-6 px-2 text-muted-foreground hover:text-foreground">
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                          <Button size="sm" variant="ghost" className="h-6 px-2 text-muted-foreground hover:text-foreground">
                            <Save className="w-3 h-3 mr-1" />
                            Save
                          </Button>
                        </div>
                      )}
                    </div>

                    {message.type === 'user' && (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.photoURL || ''} />
                        <AvatarFallback>
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                      <span className="text-sm ml-2">Analyzing your repository...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about your code, architecture, or implementation..."
                  className="github-input"
                />
                <Button 
                  onClick={() => handleSend()} 
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                💡 Ask about specific files, functions, or implementation details
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}