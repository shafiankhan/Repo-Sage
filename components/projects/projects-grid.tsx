"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { GitBranch, Star, ExternalLink, MessageSquare, Clock, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const projects = [
  {
    id: '1',
    name: 'Money Tracker',
    description: 'Full-stack e-commerce solution with React and Node.js',
    language: 'TypeScript',
    stars: 342,
    lastCommit: '2 hours ago',
    status: 'active',
    meetings: 12,
    aiQueries: 89,
    githubUrl: 'https://github.com/ayastreb/money-tracker',
  },
  {
    id: '2',
    name: 'Loan Repayment',
    description: 'Repayment plan for students',
    language: 'Kotlin',
    stars: 156,
    lastCommit: '1 day ago',
    status: 'archived',
    meetings: 8,
    aiQueries: 45,
    githubUrl: 'https://github.com/Muqeetali/DataNyx',
  },
  {
    id: '3',
    name: 'Analytics Dashboard',
    description: 'Real-time analytics and reporting dashboard',
    language: 'Python',
    stars: 89,
    lastCommit: '3 hours ago',
    status: 'active',
    meetings: 15,
    aiQueries: 123,
    githubUrl: 'https://github.com/user/analytics-dashboard',
  },
  {
    id: '4',
    name: 'AI Chatbot',
    description: 'Intelligent customer service chatbot with NLP',
    language: 'Python',
    stars: 234,
    lastCommit: '5 minutes ago',
    status: 'active',
    meetings: 6,
    aiQueries: 67,
    githubUrl: 'https://github.com/user/ai-chatbot',
  },
  {
    id: '5',
    name: 'Task Management Tool',
    description: 'Collaborative project management with real-time updates',
    language: 'JavaScript',
    stars: 78,
    lastCommit: '1 hour ago',
    status: 'active',
    meetings: 9,
    aiQueries: 34,
    githubUrl: 'https://github.com/user/task-manager',
  },
  {
    id: '6',
    name: 'Weather API Service',
    description: 'RESTful API for weather data with caching',
    language: 'Go',
    stars: 45,
    lastCommit: '2 days ago',
    status: 'maintenance',
    meetings: 3,
    aiQueries: 12,
    githubUrl: 'https://github.com/user/weather-api',
  },
];

const languageColors: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-500',
  Python: 'bg-green-500',
  Kotlin: 'bg-purple-500',
  Go: 'bg-cyan-500',
};

export function ProjectsGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="glass-card border-white/10 hover:bg-white/5 transition-all duration-300 hover:scale-105 h-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Link 
                      href={`/projects/${project.id}`} 
                      className="hover:text-blue-400 transition-colors truncate"
                    >
                      {project.name}
                    </Link>
                  </CardTitle>
                  <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={project.status === 'active' ? 'default' : 'secondary'}
                    className={
                      project.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : project.status === 'archived'
                        ? 'bg-gray-500/20 text-gray-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }
                  >
                    {project.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4 text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="glass-card border-white/20" align="end">
                      <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/5">
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/5">
                        View on GitHub
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-gray-400">
                    <div className={`w-3 h-3 rounded-full ${languageColors[project.language] || 'bg-gray-500'}`} />
                    {project.language}
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Star className="w-4 h-4" />
                    {project.stars}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock className="w-4 h-4" />
                  {project.lastCommit}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="text-center">
                  <div className="text-lg font-semibold text-white">{project.meetings}</div>
                  <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    Meetings
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-white">{project.aiQueries}</div>
                  <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                    <GitBranch className="w-3 h-3" />
                    AI Queries
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/5">
                  <Link href={`/projects/${project.id}`} className="flex items-center gap-1">
                    View Project
                  </Link>
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}