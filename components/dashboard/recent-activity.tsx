"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { GitCommit, MessageSquare, Bot, Upload } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'commit',
    title: 'Added user authentication',
    project: 'E-commerce Platform',
    user: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    time: '2 hours ago',
    icon: GitCommit,
  },
  {
    id: 2,
    type: 'meeting',
    title: 'Sprint planning meeting analyzed',
    project: 'Mobile Banking App',
    user: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    time: '4 hours ago',
    icon: MessageSquare,
  },
  {
    id: 3,
    type: 'ai',
    title: 'Asked about authentication flow',
    project: 'Analytics Dashboard',
    user: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    time: '6 hours ago',
    icon: Bot,
  },
  {
    id: 4,
    type: 'upload',
    title: 'Uploaded design review meeting',
    project: 'AI Chatbot',
    user: 'Emily Brown',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    time: '1 day ago',
    icon: Upload,
  },
];

const typeColors = {
  commit: 'bg-green-500/20 text-green-400',
  meeting: 'bg-blue-500/20 text-blue-400',
  ai: 'bg-purple-500/20 text-purple-400',
  upload: 'bg-yellow-500/20 text-yellow-400',
};

export function RecentActivity() {
  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className={`p-2 rounded-lg ${typeColors[activity.type as keyof typeof typeColors]}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {activity.title}
              </p>
              <p className="text-xs text-gray-400">{activity.project}</p>
              <div className="flex items-center gap-2 mt-2">
                <Avatar className="w-4 h-4">
                  <AvatarImage src={activity.avatar} />
                  <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-400">{activity.user}</span>
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