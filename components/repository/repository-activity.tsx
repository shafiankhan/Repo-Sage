"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  GitCommit, 
  GitBranch, 
  GitPullRequest, 
  GitMerge, 
  ExternalLink, 
  Clock, 
  User,
  Plus,
  Minus,
  FileText,
  Eye,
  MessageSquare,
  Check,
  X,
  AlertCircle,
  Activity
} from 'lucide-react';
import { format } from 'date-fns';

interface RepositoryActivityProps {
  projectId?: string;
  compact?: boolean;
  maxItems?: number;
  showTabs?: boolean;
}

const commits = [
  {
    id: '1',
    hash: 'a1b2c3d',
    message: 'feat: add dark/light theme toggle with GitHub-style design system',
    description: 'Implemented comprehensive theme switching with CSS variables, smooth transitions, and GitHub-inspired color palette. Added theme persistence and system preference detection.',
    author: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-15T10:30:00'),
    branch: 'feature/theme-toggle',
    type: 'feature',
    additions: 145,
    deletions: 32,
    files: 12,
    verified: true,
    changedFiles: [
      { name: 'components/theme-toggle.tsx', additions: 45, deletions: 0 },
      { name: 'app/globals.css', additions: 78, deletions: 12 },
      { name: 'components/theme-provider.tsx', additions: 22, deletions: 0 },
      { name: 'tailwind.config.ts', additions: 0, deletions: 20 }
    ]
  },
  {
    id: '2',
    hash: 'e4f5g6h',
    message: 'fix: resolve authentication state persistence across page refreshes',
    description: 'Fixed critical bug where users were logged out on page refresh. Improved Firebase auth state listener and added proper loading states.',
    author: {
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-14T16:45:00'),
    branch: 'main',
    type: 'fix',
    additions: 23,
    deletions: 8,
    files: 3,
    verified: true,
    changedFiles: [
      { name: 'contexts/auth-context.tsx', additions: 18, deletions: 5 },
      { name: 'lib/auth.ts', additions: 5, deletions: 3 },
      { name: 'app/(dashboard)/layout.tsx', additions: 0, deletions: 0 }
    ]
  },
  {
    id: '3',
    hash: 'i7j8k9l',
    message: 'Merge pull request #42 from feature/ai-chat-improvements',
    description: 'Enhanced AI chat interface with better responses, file references, and improved user experience. Added typing indicators and message persistence.',
    author: {
      name: 'Mike Chen',
      email: 'mike@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-14T14:20:00'),
    branch: 'main',
    type: 'merge',
    additions: 256,
    deletions: 84,
    files: 18,
    verified: true,
    prNumber: 42,
    changedFiles: [
      { name: 'components/chat/global-chat-interface.tsx', additions: 156, deletions: 45 },
      { name: 'components/project/chat-interface.tsx', additions: 89, deletions: 32 },
      { name: 'lib/chat-responses.ts', additions: 11, deletions: 7 }
    ]
  },
  {
    id: '4',
    hash: 'm0n1o2p',
    message: 'refactor: improve code organization and add comprehensive TypeScript types',
    description: 'Major refactoring to improve code maintainability. Added proper TypeScript interfaces, extracted reusable components, and improved error handling.',
    author: {
      name: 'Emily Brown',
      email: 'emily@example.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-13T11:15:00'),
    branch: 'refactor/typescript',
    type: 'refactor',
    additions: 189,
    deletions: 167,
    files: 25,
    verified: false,
    changedFiles: [
      { name: 'types/index.ts', additions: 45, deletions: 0 },
      { name: 'lib/types.ts', additions: 67, deletions: 23 },
      { name: 'components/ui/types.ts', additions: 34, deletions: 12 },
      { name: 'hooks/types.ts', additions: 43, deletions: 132 }
    ]
  },
  {
    id: '5',
    hash: 'q3r4s5t',
    message: 'docs: update README with comprehensive setup instructions',
    description: 'Added detailed setup guide, environment configuration, and troubleshooting section to improve developer onboarding experience.',
    author: {
      name: 'Alex Johnson',
      email: 'alex@example.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-12T09:30:00'),
    branch: 'docs/readme-update',
    type: 'docs',
    additions: 234,
    deletions: 45,
    files: 3,
    verified: true,
    changedFiles: [
      { name: 'README.md', additions: 189, deletions: 23 },
      { name: 'SETUP.md', additions: 45, deletions: 0 },
      { name: '.env.example', additions: 0, deletions: 22 }
    ]
  }
];

const pullRequests = [
  {
    id: '43',
    title: 'Add comprehensive commit history and PR tracking features',
    description: 'Implements detailed commit timeline with author information, file changes, and GitHub-style PR management. Includes status tracking, branch information, and interactive elements.',
    author: {
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
    },
    status: 'open',
    branch: 'feature/commit-history',
    baseBranch: 'main',
    date: new Date('2024-01-15T14:30:00'),
    commits: 5,
    additions: 234,
    deletions: 45,
    files: 8,
    reviews: 2,
    comments: 7,
    checks: { passed: 4, failed: 0, pending: 1 },
    labels: ['enhancement', 'ui']
  },
  {
    id: '42',
    title: 'Enhanced AI chat interface with better responses and file references',
    description: 'Major improvements to the AI chat system including better response formatting, file line references, typing indicators, and conversation persistence.',
    author: {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    status: 'merged',
    branch: 'feature/ai-chat-improvements',
    baseBranch: 'main',
    date: new Date('2024-01-14T14:20:00'),
    mergedDate: new Date('2024-01-14T14:20:00'),
    commits: 8,
    additions: 256,
    deletions: 84,
    files: 18,
    reviews: 3,
    comments: 12,
    checks: { passed: 5, failed: 0, pending: 0 },
    labels: ['enhancement', 'ai']
  },
  {
    id: '41',
    title: 'Implement GitHub-style theme system with dark/light mode',
    description: 'Complete theme system implementation with CSS variables, smooth transitions, and GitHub-inspired design. Includes system preference detection and theme persistence.',
    author: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    status: 'closed',
    branch: 'feature/theme-toggle',
    baseBranch: 'main',
    date: new Date('2024-01-13T10:30:00'),
    closedDate: new Date('2024-01-15T10:30:00'),
    commits: 3,
    additions: 145,
    deletions: 32,
    files: 12,
    reviews: 2,
    comments: 5,
    checks: { passed: 3, failed: 1, pending: 0 },
    labels: ['enhancement', 'design']
  }
];

const getCommitTypeColor = (type: string) => {
  switch (type) {
    case 'feature':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'fix':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'merge':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'refactor':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'docs':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
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

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'merged':
      return GitMerge;
    case 'open':
      return GitPullRequest;
    case 'closed':
      return X;
    default:
      return GitPullRequest;
  }
};

function CommitItem({ commit, compact = false, index }: { commit: any; compact?: boolean; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors ${compact ? 'p-3' : ''}`}
    >
      <div className="flex items-start gap-4">
        <Avatar className={`${compact ? 'w-6 h-6' : 'w-8 h-8'} mt-1`}>
          <AvatarImage src={commit.author.avatar} />
          <AvatarFallback>{commit.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className={`font-medium text-foreground ${compact ? 'text-sm' : ''} mb-1`}>
                {commit.message}
              </h3>
              {!compact && (
                <p className="text-sm text-muted-foreground mb-2">
                  {commit.description}
                </p>
              )}
              <div className={`flex items-center gap-3 ${compact ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                <span className="font-mono text-xs bg-muted px-2 py-1 rounded border">
                  {commit.hash}
                </span>
                <span>{commit.author.name}</span>
                <span>committed {format(commit.date, compact ? 'MMM d' : 'MMM d, HH:mm')}</span>
                {commit.verified && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <Check className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getCommitTypeColor(commit.type)}>
                {commit.type}
              </Badge>
              {!compact && (
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          
          <div className={`flex items-center gap-4 mt-3 ${compact ? 'text-xs' : 'text-sm'}`}>
            <div className="flex items-center gap-1">
              <GitBranch className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">{commit.branch}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-600 font-medium">+{commit.additions}</span>
              <span className="text-red-600 font-medium">-{commit.deletions}</span>
              <span className="text-muted-foreground">{commit.files} files</span>
            </div>
          </div>

          {/* Changed Files - only show in non-compact mode */}
          {!compact && commit.changedFiles && (
            <div className="mt-3 space-y-1">
              {commit.changedFiles.slice(0, 3).map((file: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between text-xs bg-muted/50 rounded px-2 py-1">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-muted-foreground" />
                    <span className="font-mono">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.additions > 0 && (
                      <span className="text-green-600">+{file.additions}</span>
                    )}
                    {file.deletions > 0 && (
                      <span className="text-red-600">-{file.deletions}</span>
                    )}
                  </div>
                </div>
              ))}
              {commit.changedFiles.length > 3 && (
                <div className="text-xs text-muted-foreground px-2">
                  +{commit.changedFiles.length - 3} more files
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function PullRequestItem({ pr, compact = false, index }: { pr: any; compact?: boolean; index: number }) {
  const StatusIcon = getStatusIcon(pr.status);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors ${compact ? 'p-3' : ''}`}
    >
      <div className="flex items-start gap-4">
        <StatusIcon className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} mt-1 ${
          pr.status === 'merged' ? 'text-purple-600' :
          pr.status === 'open' ? 'text-green-600' : 'text-red-600'
        }`} />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className={`font-medium text-foreground hover:text-blue-600 cursor-pointer ${compact ? 'text-sm' : ''} mb-1`}>
                {pr.title}
              </h3>
              {!compact && (
                <p className="text-sm text-muted-foreground mb-2">
                  {pr.description}
                </p>
              )}
              <div className={`flex items-center gap-2 ${compact ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                <span>#{pr.id}</span>
                <span>•</span>
                <span>
                  {pr.status === 'merged' ? 'merged' : 
                   pr.status === 'closed' ? 'closed' : 'opened'} {format(pr.date, 'MMM d')}
                </span>
                <span>•</span>
                <span>by {pr.author.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(pr.status)}>
                {pr.status}
              </Badge>
              {!compact && (
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          
          <div className={`flex items-center gap-4 mt-3 ${compact ? 'text-xs' : 'text-sm'}`}>
            <div className="flex items-center gap-1">
              <GitBranch className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">{pr.branch} → {pr.baseBranch}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-600 font-medium">+{pr.additions}</span>
              <span className="text-red-600 font-medium">-{pr.deletions}</span>
              <span className="text-muted-foreground">{pr.files} files</span>
            </div>
          </div>

          {/* PR Stats - only show in non-compact mode */}
          {!compact && (
            <>
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <GitCommit className="w-3 h-3" />
                  <span>{pr.commits} commits</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{pr.reviews} reviews</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>{pr.comments} comments</span>
                </div>
              </div>

              {/* Checks Status */}
              <div className="flex items-center gap-2 mt-3">
                {pr.checks.passed > 0 && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <Check className="w-3 h-3 mr-1" />
                    {pr.checks.passed} passed
                  </Badge>
                )}
                {pr.checks.failed > 0 && (
                  <Badge variant="outline" className="text-red-600 border-red-600">
                    <X className="w-3 h-3 mr-1" />
                    {pr.checks.failed} failed
                  </Badge>
                )}
                {pr.checks.pending > 0 && (
                  <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {pr.checks.pending} pending
                  </Badge>
                )}
              </div>

              {/* Labels */}
              {pr.labels && pr.labels.length > 0 && (
                <div className="flex items-center gap-2 mt-3">
                  {pr.labels.map((label: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {label}
                    </Badge>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        
        <Avatar className={`${compact ? 'w-5 h-5' : 'w-6 h-6'}`}>
          <AvatarImage src={pr.author.avatar} />
          <AvatarFallback>{pr.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
    </motion.div>
  );
}

export function RepositoryActivity({ 
  projectId, 
  compact = false, 
  maxItems = 10, 
  showTabs = true 
}: RepositoryActivityProps) {
  const displayCommits = commits.slice(0, maxItems);
  const displayPRs = pullRequests.slice(0, maxItems);

  if (!showTabs) {
    // Simple list view without tabs
    return (
      <div className="space-y-4">
        <div className="space-y-3">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Activity
          </h3>
          {displayCommits.map((commit, index) => (
            <CommitItem key={commit.id} commit={commit} compact={compact} index={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="commits" className="space-y-6">
      <TabsList className="github-card">
        <TabsTrigger value="commits" className="flex items-center gap-2">
          <GitCommit className="w-4 h-4" />
          Commits ({displayCommits.length})
        </TabsTrigger>
        <TabsTrigger value="pulls" className="flex items-center gap-2">
          <GitPullRequest className="w-4 h-4" />
          Pull Requests ({displayPRs.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="commits" className="space-y-4">
        <Card className="github-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitCommit className="w-5 h-5" />
              Commit History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {displayCommits.map((commit, index) => (
              <CommitItem key={commit.id} commit={commit} compact={compact} index={index} />
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="pulls" className="space-y-4">
        <Card className="github-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitPullRequest className="w-5 h-5" />
              Pull Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {displayPRs.map((pr, index) => (
              <PullRequestItem key={pr.id} pr={pr} compact={compact} index={index} />
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}