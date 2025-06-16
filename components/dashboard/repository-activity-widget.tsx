"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { 
  GitCommit, 
  GitBranch, 
  GitPullRequest, 
  GitMerge, 
  ExternalLink, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

// Compact version for dashboard widgets
const recentActivity = [
  {
    id: '1',
    type: 'commit',
    hash: 'a1b2c3d',
    message: 'feat: add theme toggle',
    author: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-15T10:30:00'),
    branch: 'main',
    additions: 45,
    deletions: 12
  },
  {
    id: '2',
    type: 'pr_merged',
    prNumber: 42,
    title: 'AI chat improvements',
    author: {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-14T14:20:00'),
    additions: 156,
    deletions: 34
  },
  {
    id: '3',
    type: 'commit',
    hash: 'e4f5g6h',
    message: 'fix: auth persistence',
    author: {
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-14T16:45:00'),
    branch: 'main',
    additions: 23,
    deletions: 8
  },
  {
    id: '4',
    type: 'pr_opened',
    prNumber: 43,
    title: 'Add commit history features',
    author: {
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-15T14:30:00'),
    additions: 234,
    deletions: 45
  },
  {
    id: '5',
    type: 'commit',
    hash: 'm0n1o2p',
    message: 'refactor: improve types',
    author: {
      name: 'Emily Brown',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-13T11:15:00'),
    branch: 'refactor/typescript',
    additions: 89,
    deletions: 67
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'pr_merged':
      return GitMerge;
    case 'pr_opened':
    case 'pr_closed':
      return GitPullRequest;
    default:
      return GitCommit;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'pr_merged':
      return 'text-purple-600';
    case 'pr_opened':
      return 'text-green-600';
    case 'pr_closed':
      return 'text-red-600';
    default:
      return 'text-muted-foreground';
  }
};

const getActivityText = (activity: any) => {
  switch (activity.type) {
    case 'pr_merged':
      return `merged PR #${activity.prNumber}: ${activity.title}`;
    case 'pr_opened':
      return `opened PR #${activity.prNumber}: ${activity.title}`;
    case 'pr_closed':
      return `closed PR #${activity.prNumber}: ${activity.title}`;
    default:
      return activity.message;
  }
};

interface RepositoryActivityWidgetProps {
  maxItems?: number;
  showViewAll?: boolean;
}

export function RepositoryActivityWidget({ 
  maxItems = 5, 
  showViewAll = true 
}: RepositoryActivityWidgetProps) {
  const displayActivity = recentActivity.slice(0, maxItems);

  return (
    <Card className="github-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Repository Activity
        </CardTitle>
        {showViewAll && (
          <Button variant="ghost" size="sm" asChild>
            <Link href="/projects" className="flex items-center gap-1">
              View All
              <ArrowRight className="w-3 h-3" />
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {displayActivity.map((activity, index) => {
          const ActivityIcon = getActivityIcon(activity.type);
          const activityColor = getActivityColor(activity.type);
          const activityText = getActivityText(activity);
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <ActivityIcon className={`w-4 h-4 mt-1 ${activityColor}`} />
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {activityText}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <Avatar className="w-4 h-4">
                    <AvatarImage src={activity.author.avatar} />
                    <AvatarFallback className="text-xs">{activity.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{activity.author.name}</span>
                  <span>•</span>
                  <span>{format(activity.date, 'MMM d, HH:mm')}</span>
                </div>
                
                {activity.type === 'commit' && activity.branch && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <GitBranch className="w-3 h-3" />
                    <span>{activity.branch}</span>
                    <span>•</span>
                    <span className="text-green-600">+{activity.additions}</span>
                    <span className="text-red-600">-{activity.deletions}</span>
                  </div>
                )}
                
                {(activity.type.startsWith('pr_')) && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span className="text-green-600">+{activity.additions}</span>
                    <span className="text-red-600">-{activity.deletions}</span>
                  </div>
                )}
              </div>
              
              {activity.type === 'commit' && (
                <span className="text-xs font-mono bg-muted px-2 py-1 rounded border">
                  {activity.hash}
                </span>
              )}
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}