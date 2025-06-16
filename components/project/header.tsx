"use client";

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { GitBranch, Star, Users, ExternalLink, Settings } from 'lucide-react';

interface ProjectHeaderProps {
  projectId: string;
}

export function ProjectHeader({ projectId }: ProjectHeaderProps) {
  // Mock data - in real app, fetch based on projectId
  const project = {
    name: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with React and Node.js',
    language: 'TypeScript',
    stars: 342,
    forks: 89,
    url: 'https://github.com/user/ecommerce-platform',
    status: 'active',
    members: [
      { name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
      { name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face' },
      { name: 'Mike Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6 border-white/10"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white">{project.name}</h1>
            <Badge 
              variant="default"
              className="bg-green-500/20 text-green-400"
            >
              {project.status}
            </Badge>
          </div>
          
          <p className="text-gray-400 text-lg max-w-2xl">{project.description}</p>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              {project.language}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              {project.stars}
            </div>
            <div className="flex items-center gap-1">
              <GitBranch className="w-4 h-4" />
              {project.forks} forks
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View on GitHub
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-gray-400" />
            <div className="flex -space-x-2">
              {project.members.map((member, index) => (
                <Avatar key={index} className="w-8 h-8 border-2 border-slate-900">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm text-gray-400">{project.members.length} members</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/5">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </motion.div>
  );
}