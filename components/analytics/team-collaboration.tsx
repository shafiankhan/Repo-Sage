"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { 
  Users, 
  GitCommit, 
  GitPullRequest, 
  MessageSquare, 
  Award,
  TrendingUp,
  Clock,
  Star,
  Target
} from 'lucide-react';
import { format } from 'date-fns';

const teamMembers = [
  {
    id: '1',
    name: 'Shafian Khan',
    username: 'shafian-khan',
    email: 'shafian@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
    role: 'Lead Developer',
    isLead: true,
    stats: {
      commits: 45,
      pullRequests: 12,
      reviews: 28,
      linesAdded: 3450,
      linesRemoved: 890
    },
    recentActivity: 'Merged authentication system PR',
    lastActive: new Date('2024-01-15T10:30:00'),
    languages: ['TypeScript', 'React', 'Node.js']
  },
  {
    id: '2',
    name: 'Muqeet Ali',
    username: 'muqeet-ali',
    email: 'muqeet@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
    role: 'Backend Developer',
    isLead: false,
    stats: {
      commits: 38,
      pullRequests: 9,
      reviews: 22,
      linesAdded: 2890,
      linesRemoved: 567
    },
    recentActivity: 'Fixed database connection issues',
    lastActive: new Date('2024-01-14T16:45:00'),
    languages: ['Node.js', 'PostgreSQL', 'Redis']
  },
  {
    id: '3',
    name: 'Mohd Abrar',
    username: 'mohd-abrar',
    email: 'abrar@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face',
    role: 'Full Stack Developer',
    isLead: false,
    stats: {
      commits: 32,
      pullRequests: 8,
      reviews: 19,
      linesAdded: 2340,
      linesRemoved: 445
    },
    recentActivity: 'Implemented notification system',
    lastActive: new Date('2024-01-14T14:20:00'),
    languages: ['TypeScript', 'React', 'WebSocket']
  },
  {
    id: '4',
    name: 'Fawwaz',
    username: 'fawwaz',
    email: 'fawwaz@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
    role: 'DevOps Engineer',
    isLead: false,
    stats: {
      commits: 28,
      pullRequests: 7,
      reviews: 15,
      linesAdded: 1890,
      linesRemoved: 234
    },
    recentActivity: 'Optimized API performance',
    lastActive: new Date('2024-01-13T11:15:00'),
    languages: ['Docker', 'AWS', 'Terraform']
  }
];

const collaborationStats = {
  totalCommits: teamMembers.reduce((sum, member) => sum + member.stats.commits, 0),
  totalPRs: teamMembers.reduce((sum, member) => sum + member.stats.pullRequests, 0),
  totalReviews: teamMembers.reduce((sum, member) => sum + member.stats.reviews, 0),
  avgResponseTime: '2.3 hours',
  teamVelocity: '+15%'
};

const getActivityLevel = (lastActive: Date) => {
  const daysSince = (Date.now() - lastActive.getTime()) / (1000 * 60 * 60 * 24);
  if (daysSince <= 1) return { level: 'Very Active', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900' };
  if (daysSince <= 3) return { level: 'Active', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900' };
  if (daysSince <= 7) return { level: 'Moderate', color: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-900' };
  return { level: 'Inactive', color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900' };
};

export function TeamCollaboration() {
  return (
    <div className="space-y-6">
      {/* Team Stats Overview */}
      <Card className="github-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Collaboration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-lg font-bold text-foreground">{collaborationStats.totalCommits}</div>
              <div className="text-muted-foreground">Total Commits</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-lg font-bold text-foreground">{collaborationStats.totalPRs}</div>
              <div className="text-muted-foreground">Pull Requests</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-lg font-bold text-foreground">{collaborationStats.totalReviews}</div>
              <div className="text-muted-foreground">Code Reviews</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-lg font-bold text-green-600">{collaborationStats.teamVelocity}</div>
              <div className="text-muted-foreground">Team Velocity</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card className="github-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Team Members
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamMembers.map((member, index) => {
            const activity = getActivityLevel(member.lastActive);
            
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground text-sm">{member.name}</h3>
                        {member.isLead && (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-600 text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            Lead
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{member.role}</p>
                      <p className="text-xs text-muted-foreground">{member.recentActivity}</p>
                    </div>
                    <Badge variant="outline" className={`${activity.color} border-current text-xs`}>
                      {activity.level}
                    </Badge>
                  </div>
                  
                  {/* Member Stats */}
                  <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                    <div className="text-center">
                      <div className="font-medium text-foreground">{member.stats.commits}</div>
                      <div className="text-muted-foreground">Commits</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-foreground">{member.stats.pullRequests}</div>
                      <div className="text-muted-foreground">PRs</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-foreground">{member.stats.reviews}</div>
                      <div className="text-muted-foreground">Reviews</div>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex items-center gap-1 mt-2">
                    {member.languages.slice(0, 2).map((lang, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                    {member.languages.length > 2 && (
                      <span className="text-xs text-muted-foreground">+{member.languages.length - 2}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Last active {format(member.lastActive, 'MMM d, HH:mm')}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>

      {/* Quick Team Metrics */}
      <Card className="github-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            This Week
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Avg Response Time</span>
            <span className="font-medium text-foreground">{collaborationStats.avgResponseTime}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">PRs Merged</span>
            <span className="font-medium text-foreground">8</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Code Reviews</span>
            <span className="font-medium text-foreground">24</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Team Velocity</span>
            <span className="font-medium text-green-600">{collaborationStats.teamVelocity}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}