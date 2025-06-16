"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Bot, GitCommit, MessageSquare, Upload, FileText, Users, Zap } from 'lucide-react';

const activities = [
  {
    id: '1',
    type: 'ai_query',
    title: 'Asked about authentication flow',
    description: 'How does JWT token validation work in the middleware?',
    user: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    time: '2 minutes ago',
    project: 'E-commerce Platform',
    icon: Bot,
    color: 'bg-blue-500/20 text-blue-400',
  },
  {
    id: '2',
    type: 'meeting',
    title: 'Sprint planning meeting analyzed',
    description: 'Generated summary and action items for 45-minute session',
    user: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    time: '15 minutes ago',
    project: 'Mobile Banking App',
    icon: MessageSquare,
    color: 'bg-green-500/20 text-green-400',
  },
  {
    id: '3',
    type: 'commit',
    title: 'New commit analyzed',
    description: 'feat: add user profile management system',
    user: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    time: '1 hour ago',
    project: 'Analytics Dashboard',
    icon: GitCommit,
    color: 'bg-purple-500/20 text-purple-400',
  },
  {
    id: '4',
    type: 'upload',
    title: 'Meeting recording uploaded',
    description: 'Design review session - 30 minutes',
    user: 'Emily Brown',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    time: '2 hours ago',
    project: 'AI Chatbot',
    icon: Upload,
    color: 'bg-yellow-500/20 text-yellow-400',
  },
  {
    id: '5',
    type: 'ai_query',
    title: 'Code optimization suggestions',
    description: 'How can I improve the performance of this React component?',
    user: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
    time: '3 hours ago',
    project: 'Task Manager',
    icon: Bot,
    color: 'bg-blue-500/20 text-blue-400',
  },
  {
    id: '6',
    type: 'team',
    title: 'New team member added',
    description: 'David Kim joined the Analytics Dashboard project',
    user: 'System',
    avatar: '',
    time: '4 hours ago',
    project: 'Analytics Dashboard',
    icon: Users,
    color: 'bg-cyan-500/20 text-cyan-400',
  },
  {
    id: '7',
    type: 'ai_query',
    title: 'Database schema question',
    description: 'Explain the relationship between users and projects tables',
    user: 'Lisa Wang',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face',
    time: '5 hours ago',
    project: 'E-commerce Platform',
    icon: Bot,
    color: 'bg-blue-500/20 text-blue-400',
  },
  {
    id: '8',
    type: 'meeting',
    title: 'Daily standup processed',
    description: 'Generated team progress summary and blockers',
    user: 'Tom Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face',
    time: '6 hours ago',
    project: 'Weather API',
    icon: MessageSquare,
    color: 'bg-green-500/20 text-green-400',
  },
];

const activityTypes = {
  ai_query: { label: 'AI Query', icon: Bot },
  meeting: { label: 'Meeting', icon: MessageSquare },
  commit: { label: 'Commit', icon: GitCommit },
  upload: { label: 'Upload', icon: Upload },
  team: { label: 'Team', icon: Users },
};

export function ActivityFeed() {
  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className={`p-2 rounded-lg ${activity.color} flex-shrink-0`}>
              <activity.icon className="w-4 h-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                    {activity.description}
                  </p>
                </div>
                <Badge variant="outline" className="border-white/20 text-gray-400 text-xs flex-shrink-0">
                  {activityTypes[activity.type as keyof typeof activityTypes]?.label}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                {activity.avatar && (
                  <Avatar className="w-4 h-4">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback className="text-xs">{activity.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <span className="text-xs text-gray-400">{activity.user}</span>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-500">{activity.project}</span>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}