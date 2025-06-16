"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { GitCommit, GitBranch, GitPullRequest, GitMerge, ExternalLink, Clock, User } from 'lucide-react';
import { format } from 'date-fns';

interface CommitHistoryProps {
  projectId: string;
}

const commits = [
  {
    id: '1',
    hash: 'a1b2c3d',
    message: 'feat: add dark/light theme toggle with GitHub-style design',
    author: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-15T10:30:00'),
    branch: 'feature/theme-toggle',
    type: 'commit',
    additions: 45,
    deletions: 12,
    files: 8
  },
  {
    id: '2',
    hash: 'e4f5g6h',
    message: 'fix: resolve authentication state persistence issue',
    author: {
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-14T16:45:00'),
    branch: 'main',
    type: 'commit',
    additions: 23,
    deletions: 8,
    files: 3
  },
  {
    id: '3',
    hash: 'i7j8k9l',
    message: 'Merge pull request #42 from feature/ai-chat-improvements',
    author: {
      name: 'Mike Chen',
      email: 'mike@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-14T14:20:00'),
    branch: 'main',
    type: 'merge',
    additions: 156,
    deletions: 34,
    files: 12
  },
  {
    id: '4',
    hash: 'm0n1o2p',
    message: 'refactor: improve code organization and add TypeScript types',
    author: {
      name: 'Emily Brown',
      email: 'emily@example.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-13T11:15:00'),
    branch: 'refactor/typescript',
    type: 'commit',
    additions: 89,
    deletions: 67,
    files: 15
  },
  {
    id: '5',
    hash: 'q3r4s5t',
    message: 'docs: update README with setup instructions and features',
    author: {
      name: 'Alex Johnson',
      email: 'alex@example.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-12T09:30:00'),
    branch: 'docs/readme-update',
    type: 'commit',
    additions: 78,
    deletions: 12,
    files: 2
  }
];

const pullRequests = [
  {
    id: '42',
    title: 'Add AI chat improvements and better responses',
    author: {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    status: 'merged',
    branch: 'feature/ai-chat-improvements',
    date: new Date('2024-01-14T14:20:00'),
    commits: 8,
    additions: 156,
    deletions: 34
  },
  {
    id: '41',
    title: 'Implement GitHub-style theme system',
    author: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    status: 'open',
    branch: 'feature/theme-toggle',
    date: new Date('2024-01-15T10:30:00'),
    commits: 3,
    additions: 45,
    deletions: 12
  },
  {
    id: '40',
    title: 'Fix authentication persistence and add error handling',
    author: {
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
    },
    status: 'closed',
    branch: 'fix/auth-persistence',
    date: new Date('2024-01-13T16:45:00'),
    commits: 2,
    additions: 23,
    deletions: 8
  }
];

const getCommitIcon = (type: string) => {
  switch (type) {
    case 'merge':
      return GitMerge;
    case 'pull':
      return GitPullRequest;
    default:
      return GitCommit;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'merged':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'open':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'closed':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

export function CommitHistory({ projectId }: CommitHistoryProps) {
  return (
    <div className="space-y-6">
      {/* Pull Requests */}
      <Card className="github-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitPullRequest className="w-5 h-5" />
            Pull Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pullRequests.map((pr, index) => (
            <motion.div
              key={pr.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <GitPullRequest className={`w-5 h-5 mt-1 ${
                pr.status === 'merged' ? 'text-purple-600' :
                pr.status === 'open' ? 'text-green-600' : 'text-red-600'
              }`} />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground hover:text-blue-600 cursor-pointer">
                      {pr.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <span>#{pr.id}</span>
                      <span>•</span>
                      <span>opened {format(pr.date, 'MMM d')}</span>
                      <span>•</span>
                      <span>by {pr.author.name}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(pr.status)}>
                    {pr.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span>{pr.commits} commits</span>
                  <span className="text-green-600">+{pr.additions}</span>
                  <span className="text-red-600">-{pr.deletions}</span>
                  <span className="text-muted-foreground">{pr.branch}</span>
                </div>
              </div>
              
              <Avatar className="w-6 h-6">
                <AvatarImage src={pr.author.avatar} />
                <AvatarFallback>{pr.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Commit History */}
      <Card className="github-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCommit className="w-5 h-5" />
            Recent Commits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {commits.map((commit, index) => {
            const CommitIcon = getCommitIcon(commit.type);
            
            return (
              <motion.div
                key={commit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <CommitIcon className="w-5 h-5 mt-1 text-muted-foreground" />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">
                        {commit.message}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                          {commit.hash}
                        </span>
                        <span>•</span>
                        <span>{commit.author.name}</span>
                        <span>•</span>
                        <span>{format(commit.date, 'MMM d, HH:mm')}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3" />
                      <span>{commit.branch}</span>
                    </div>
                    <span className="text-green-600">+{commit.additions}</span>
                    <span className="text-red-600">-{commit.deletions}</span>
                    <span>{commit.files} files</span>
                  </div>
                </div>
                
                <Avatar className="w-6 h-6">
                  <AvatarImage src={commit.author.avatar} />
                  <AvatarFallback>{commit.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}