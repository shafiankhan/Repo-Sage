"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, FileText, Save, Copy, Lightbulb } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  files?: { name: string; line?: number }[];
}

interface ChatInterfaceProps {
  projectId: string;
}

const projectSpecificResponses = [
  {
    question: "How does authentication work in this project?",
    content: "**Authentication Implementation:**\n\n• **Firebase Auth Setup** (Line 8-15 in `firebase.ts`)\n  - Email/password authentication\n  - Google & GitHub OAuth providers\n  - Session persistence enabled\n\n• **Auth Context** (Line 25-45 in `auth-context.tsx`)\n  - Global authentication state\n  - User data management\n  - Real-time auth listeners\n\n• **Route Protection** (Line 12-30 in `layout.tsx`)\n  - Automatic redirect to login\n  - Loading states handled\n  - Protected dashboard routes",
    files: [
      { name: 'lib/firebase.ts', line: 8 },
      { name: 'contexts/auth-context.tsx', line: 25 },
      { name: 'app/(dashboard)/layout.tsx', line: 12 }
    ]
  },
  {
    question: "What's the project structure?",
    content: "**Project Architecture:**\n\n• **Next.js App Router** (Line 1-10 in `layout.tsx`)\n  - Route groups for organization\n  - Nested layouts for consistency\n  - Server and client components\n\n• **Component Structure** (Line 5-20 in `sidebar.tsx`)\n  - Feature-based organization\n  - Reusable UI components\n  - GitHub-inspired design system\n\n• **State Management** (Line 15-35 in `auth-context.tsx`)\n  - React Context for global state\n  - Firebase real-time updates\n  - Theme management with next-themes",
    files: [
      { name: 'app/layout.tsx', line: 1 },
      { name: 'components/dashboard/sidebar.tsx', line: 5 },
      { name: 'contexts/auth-context.tsx', line: 15 }
    ]
  },
  {
    question: "How does the commit history work?",
    content: "**Commit History Features:**\n\n• **Commit Display** (Line 20-40 in `commit-history.tsx`)\n  - Author information with avatars\n  - Commit messages and timestamps\n  - File change statistics\n\n• **Pull Request Integration** (Line 45-65 in `commit-history.tsx`)\n  - PR status tracking (open/merged/closed)\n  - Branch information display\n  - Merge commit identification\n\n• **Interactive Elements** (Line 70-90 in `commit-history.tsx`)\n  - Hover effects and animations\n  - External GitHub links\n  - Responsive design for mobile",
    files: [
      { name: 'components/project/commit-history.tsx', line: 20 },
      { name: 'components/project/commit-history.tsx', line: 45 },
      { name: 'components/project/commit-history.tsx', line: 70 }
    ]
  },
  {
    question: "How is the theme system implemented?",
    content: "**Theme Implementation:**\n\n• **Theme Provider** (Line 8-15 in `theme-provider.tsx`)\n  - next-themes integration\n  - System preference detection\n  - Persistent theme storage\n\n• **CSS Variables** (Line 25-60 in `globals.css`)\n  - Light and dark mode definitions\n  - GitHub-inspired color palette\n  - Smooth transitions between themes\n\n• **Theme Toggle** (Line 12-25 in `theme-toggle.tsx`)\n  - Animated sun/moon icons\n  - Accessible button design\n  - Smooth state transitions",
    files: [
      { name: 'components/theme-provider.tsx', line: 8 },
      { name: 'app/globals.css', line: 25 },
      { name: 'components/theme-toggle.tsx', line: 12 }
    ]
  }
];

const savedConversations = [
  { id: '1', title: 'Authentication implementation', timestamp: '2 hours ago' },
  { id: '2', title: 'Commit history features', timestamp: '1 day ago' },
  { id: '3', title: 'Theme system setup', timestamp: '3 days ago' },
  { id: '4', title: 'Component architecture', timestamp: '1 week ago' },
];

const suggestedQuestions = [
  "How does authentication work in this project?",
  "What's the project structure?",
  "How does the commit history work?",
  "How is the theme system implemented?",
  "What UI components are used?",
  "How does routing work?"
];

export function ChatInterface({ projectId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      
      for (const response of projectSpecificResponses) {
        if (queryLower.includes('auth') && response.question.includes('authentication')) return response;
        if (queryLower.includes('structure') && response.question.includes('structure')) return response;
        if (queryLower.includes('commit') && response.question.includes('commit')) return response;
        if (queryLower.includes('theme') && response.question.includes('theme')) return response;
      }
      
      return projectSpecificResponses[Math.floor(Math.random() * projectSpecificResponses.length)];
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
    <div className="space-y-4">
      {/* Saved Conversations */}
      <Card className="github-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            Project Conversations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {savedConversations.map((conversation) => (
              <Button 
                key={conversation.id}
                variant="ghost" 
                className="w-full justify-start hover:bg-accent"
              >
                <FileText className="w-4 h-4 mr-2" />
                <div className="flex flex-col items-start">
                  <span className="font-medium">{conversation.title}</span>
                  <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="github-card h-96">
        <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">Repo Guide</span>
              <span className="text-xs text-white/80">Project Assistant</span>
            </div>
            <span className="text-xs bg-green-500/20 text-green-200 px-2 py-1 rounded-full border border-green-400/30 ml-auto">
              ● Online
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground mt-8">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">Project Repo Guide</h3>
                <p className="mb-4">Ask me anything about this project's implementation!</p>
                
                {/* Suggested Questions */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Lightbulb className="w-4 h-4" />
                    Suggested questions:
                  </div>
                  <div className="grid gap-2">
                    {suggestedQuestions.slice(0, 3).map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-left h-auto p-2 whitespace-normal text-xs hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950 dark:hover:to-purple-950"
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
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : 'order-2'}`}>
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-auto' 
                        : 'bg-muted border border-border'
                    }`}>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                      
                      {message.files && (
                        <div className="mt-3 pt-3 border-t border-white/20">
                          <div className="text-xs text-muted-foreground mb-2">Referenced files:</div>
                          <div className="space-y-1">
                            {message.files.map((file, index) => (
                              <div key={index} className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 rounded px-2 py-1 border border-blue-200 dark:border-blue-800">
                                <FileText className="w-3 h-3" />
                                <code>
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
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
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
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                    <span className="text-xs ml-2">Analyzing project...</span>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about this project's implementation..."
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
        </CardContent>
      </Card>
    </div>
  );
}