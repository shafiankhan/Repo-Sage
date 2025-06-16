"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { GitBranch, Star, ExternalLink, MessageSquare, Clock } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    id: 1,
    name: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with React and Node.js',
    language: 'TypeScript',
    stars: 342,
    lastCommit: '2 hours ago',
    status: 'active',
    meetings: 12,
    aiQueries: 89,
  },
  {
    id: 2,
    name: 'Mobile Banking App',
    description: 'Secure banking application with biometric authentication',
    language: 'Kotlin',
    stars: 156,
    lastCommit: '1 day ago',
    status: 'archived',
    meetings: 8,
    aiQueries: 45,
  },
  {
    id: 3,
    name: 'Analytics Dashboard',
    description: 'Real-time analytics and reporting dashboard',
    language: 'Python',
    stars: 89,
    lastCommit: '3 hours ago',
    status: 'active',
    meetings: 15,
    aiQueries: 123,
  },
  {
    id: 4,
    name: 'AI Chatbot',
    description: 'Intelligent customer service chatbot with NLP',
    language: 'Python',
    stars: 234,
    lastCommit: '5 minutes ago',
    status: 'active',
    meetings: 6,
    aiQueries: 67,
  },
];

export function ProjectGrid() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Your Projects</h2>
        <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
          View All
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass-card border-white/10 hover:bg-white/5 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-white flex items-center gap-2">
                      <Link href={`/dashboard/projects/${project.id}`} className="hover:text-blue-400 transition-colors">
                        {project.name}
                      </Link>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </CardTitle>
                    <p className="text-sm text-gray-400">{project.description}</p>
                  </div>
                  <Badge 
                    variant={project.status === 'active' ? 'default' : 'secondary'}
                    className={project.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}
                  >
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-gray-400">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
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
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}