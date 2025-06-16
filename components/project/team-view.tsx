"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { 
  Users, 
  GitCommit, 
  GitPullRequest, 
  MessageSquare, 
  Calendar,
  Award,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';
import { format } from 'date-fns';

interface TeamViewProps {
  projectId: string;
}

const contributors = [
  {
    id: '1',
    name: 'Shafian Khan',
    username: 'shafian-khan',
    email: 'shafian@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
    role: 'Lead Developer',
    joinDate: new Date('2023-06-15'),
    lastActive: new Date('2024-01-15T10:30:00'),
    stats: {
      commits: 156,
      pullRequests: 23,
      reviews: 45,
      linesAdded: 12450,
      linesRemoved: 3200
    },
    languages: ['TypeScript', 'React', 'Node.js'],
    isOwner: true
  },
  {
    id: '2',
    name: 'Muqeet Ali',
    username: 'muqeet-ali',
    email: 'muqeet@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
    role: 'Backend Developer',
    joinDate: new Date('2023-08-20'),
    lastActive: new Date('2024-01-14T16:45:00'),
    stats: {
      commits: 89,
      pullRequests: 18,
      reviews: 32,
      linesAdded: 8900,
      linesRemoved: 2100
    },
    languages: ['TypeScript', 'PostgreSQL', 'Redis'],
    isOwner: false
  },
  {
    id: '3',
    name: 'Mohd Abrar',
    username: 'mohd-abrar',
    email: 'abrar@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face',
    role: 'Full Stack Developer',
    joinDate: new Date('2023-09-10'),
    lastActive: new Date('2024-01-14T14:20:00'),
    stats: {
      commits: 134,
      pullRequests: 21,
      reviews: 38,
      linesAdded: 11200,
      linesRemoved: 2800
    },
    languages: ['TypeScript', 'Python', 'PostgreSQL'],
    isOwner: false
  },
  {
    id: '4',
    name: 'Fawwaz',
    username: 'fawwaz',
    email: 'fawwaz@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
    role: 'DevOps Engineer',
    joinDate: new Date('2023-10-05'),
    lastActive: new Date('2024-01-13T11:15:00'),
    stats: {
      commits: 67,
      pullRequests: 12,
      reviews: 28,
      linesAdded: 5600,
      linesRemoved: 1400
    },
    languages: ['Docker', 'AWS', 'Terraform'],
    isOwner: false
  },
  {
    id: '5',
    name: 'Alex Johnson',
    username: 'alexj',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
    role: 'Frontend Developer',
    joinDate: new Date('2023-11-12'),
    lastActive: new Date('2024-01-12T09:30:00'),
    stats: {
      commits: 78,
      pullRequests: 15,
      reviews: 22,
      linesAdded: 7800,
      linesRemoved: 1900
    },
    languages: ['React', 'CSS', 'TypeScript'],
    isOwner: false
  }
];

const teamStats = {
  totalCommits: contributors.reduce((sum, c) => sum + c.stats.commits, 0),
  totalPRs: contributors.reduce((sum, c) => sum + c.stats.pullRequests, 0),
  totalReviews: contributors.reduce((sum, c) => sum + c.stats.reviews, 0),
  totalLines: contributors.reduce((sum, c) => sum + c.stats.linesAdded, 0),
  activeMembers: contributors.filter(c => {
    const daysSinceActive = (Date.now() - c.lastActive.getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceActive <= 7;
  }).length
};

const getActivityLevel = (lastActive: Date) => {
  const daysSince = (Date.now() - lastActive.getTime()) / (1000 * 60 * 60 * 24);
  if (daysSince <= 1) return { level: 'Very Active', color: 'text-green-600' };
  if (daysSince <= 7) return { level: 'Active', color: 'text-blue-600' };
  if (daysSince <= 30) return { level: 'Moderate', color: 'text-yellow-600' };
  return { level: 'Inactive', color: 'text-red-600' };
};

export function TeamView({ projectId }: TeamViewProps) {
  return (
    <div className="space-y-6">
      {/* Team Overview Stats */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card className="github-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Team Members</p>
                <p className="text-2xl font-bold">{contributors.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="github-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <GitCommit className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Total Commits</p>
                <p className="text-2xl font-bold">{teamStats.totalCommits}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="github-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <GitPullRequest className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Pull Requests</p>
                <p className="text-2xl font-bold">{teamStats.totalPRs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="github-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Code Reviews</p>
                <p className="text-2xl font-bold">{teamStats.totalReviews}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="github-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-600" />
              <div>
                <p className="text-sm font-medium">Active Members</p>
                <p className="text-2xl font-bold">{teamStats.activeMembers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contributors List */}
      <Card className="github-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Contributors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {contributors.map((contributor, index) => {
            const activity = getActivityLevel(contributor.lastActive);
            
            return (
              <motion.div
                key={contributor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={contributor.avatar} />
                    <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-foreground">{contributor.name}</h3>
                          {contributor.isOwner && (
                            <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                              <Award className="w-3 h-3 mr-1" />
                              Owner
                            </Badge>
                          )}
                          <Badge variant="outline" className={activity.color}>
                            {activity.level}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">@{contributor.username} • {contributor.role}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>Joined {format(contributor.joinDate, 'MMM yyyy')}</span>
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          <span>Last active {format(contributor.lastActive, 'MMM d, HH:mm')}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Contribution Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-3 text-sm">
                      <div className="text-center">
                        <p className="font-medium text-foreground">{contributor.stats.commits}</p>
                        <p className="text-muted-foreground">Commits</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-foreground">{contributor.stats.pullRequests}</p>
                        <p className="text-muted-foreground">PRs</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-foreground">{contributor.stats.reviews}</p>
                        <p className="text-muted-foreground">Reviews</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-green-600">+{contributor.stats.linesAdded.toLocaleString()}</p>
                        <p className="text-muted-foreground">Added</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-red-600">-{contributor.stats.linesRemoved.toLocaleString()}</p>
                        <p className="text-muted-foreground">Removed</p>
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-sm text-muted-foreground">Languages:</span>
                      <div className="flex gap-1">
                        {contributor.languages.map((lang, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>

      {/* Top Contributors */}
      <Card className="github-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Top Contributors This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contributors
              .sort((a, b) => b.stats.commits - a.stats.commits)
              .slice(0, 3)
              .map((contributor, index) => (
                <div key={contributor.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                    index === 1 ? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300' :
                    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                  }`}>
                    {index + 1}
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={contributor.avatar} />
                    <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{contributor.name}</p>
                    <p className="text-sm text-muted-foreground">{contributor.stats.commits} commits</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-green-600">+{contributor.stats.linesAdded.toLocaleString()}</p>
                    <p className="text-red-600">-{contributor.stats.linesRemoved.toLocaleString()}</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}