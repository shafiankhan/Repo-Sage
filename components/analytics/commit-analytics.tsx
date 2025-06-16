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
  TrendingUp,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';

const commits = [
  {
    id: '1',
    hash: 'a1b2c3d',
    message: 'feat: implement advanced authentication system with JWT tokens',
    description: 'Added comprehensive authentication with JWT token management, refresh token rotation, and secure session handling.',
    author: {
      name: 'Shafian Khan',
      email: 'shafian@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-15T10:30:00'),
    branch: 'feature/auth-system',
    type: 'feature',
    additions: 245,
    deletions: 32,
    files: 15,
    verified: true,
    changedFiles: [
      { name: 'lib/auth.ts', additions: 89, deletions: 12 },
      { name: 'middleware/auth.middleware.ts', additions: 67, deletions: 8 },
      { name: 'components/auth/login-form.tsx', additions: 45, deletions: 5 },
      { name: 'types/auth.types.ts', additions: 44, deletions: 7 }
    ]
  },
  {
    id: '2',
    hash: 'e4f5g6h',
    message: 'fix: resolve database connection pooling issues in production',
    description: 'Fixed critical database connection leaks and implemented proper connection pooling with retry logic.',
    author: {
      name: 'Muqeet Ali',
      email: 'muqeet@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-14T16:45:00'),
    branch: 'hotfix/db-connections',
    type: 'fix',
    additions: 78,
    deletions: 23,
    files: 8,
    verified: true,
    changedFiles: [
      { name: 'lib/database.ts', additions: 45, deletions: 15 },
      { name: 'config/db-config.ts', additions: 23, deletions: 5 },
      { name: 'utils/connection-pool.ts', additions: 10, deletions: 3 }
    ]
  },
  {
    id: '3',
    hash: 'i7j8k9l',
    message: 'Merge pull request #42 from feature/real-time-notifications',
    description: 'Implemented real-time notification system with WebSocket connections and push notification support.',
    author: {
      name: 'Mohd Abrar',
      email: 'abrar@example.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-14T14:20:00'),
    branch: 'main',
    type: 'merge',
    additions: 356,
    deletions: 84,
    files: 22,
    verified: true,
    prNumber: 42,
    changedFiles: [
      { name: 'lib/websocket.ts', additions: 156, deletions: 25 },
      { name: 'components/notifications/notification-center.tsx', additions: 89, deletions: 32 },
      { name: 'hooks/use-notifications.ts', additions: 67, deletions: 15 },
      { name: 'types/notification.types.ts', additions: 44, deletions: 12 }
    ]
  },
  {
    id: '4',
    hash: 'm0n1o2p',
    message: 'refactor: optimize API response times and implement caching strategy',
    description: 'Major performance improvements with Redis caching, query optimization, and response compression.',
    author: {
      name: 'Fawwaz',
      email: 'fawwaz@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-13T11:15:00'),
    branch: 'performance/api-optimization',
    type: 'refactor',
    additions: 189,
    deletions: 167,
    files: 18,
    verified: true,
    changedFiles: [
      { name: 'lib/cache.ts', additions: 67, deletions: 23 },
      { name: 'api/middleware/compression.ts', additions: 45, deletions: 12 },
      { name: 'utils/query-optimizer.ts', additions: 34, deletions: 89 },
      { name: 'config/redis.config.ts', additions: 43, deletions: 43 }
    ]
  },
  {
    id: '5',
    hash: 'q3r4s5t',
    message: 'feat: add comprehensive analytics dashboard with real-time metrics',
    description: 'Built analytics system with real-time data visualization, custom metrics, and exportable reports.',
    author: {
      name: 'Shafian Khan',
      email: 'shafian@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-12T09:30:00'),
    branch: 'feature/analytics-dashboard',
    type: 'feature',
    additions: 434,
    deletions: 45,
    files: 25,
    verified: true,
    changedFiles: [
      { name: 'components/analytics/dashboard.tsx', additions: 189, deletions: 23 },
      { name: 'lib/analytics.ts', additions: 123, deletions: 12 },
      { name: 'hooks/use-analytics.ts', additions: 67, deletions: 5 },
      { name: 'types/analytics.types.ts', additions: 55, deletions: 5 }
    ]
  }
];

const pullRequests = [
  {
    id: '45',
    title: 'Implement advanced user role management system',
    description: 'Complete role-based access control with granular permissions, role inheritance, and dynamic permission assignment.',
    author: {
      name: 'Muqeet Ali',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    status: 'open',
    branch: 'feature/role-management',
    baseBranch: 'main',
    date: new Date('2024-01-15T14:30:00'),
    commits: 8,
    additions: 567,
    deletions: 89,
    files: 18,
    reviews: 3,
    comments: 12,
    checks: { passed: 6, failed: 0, pending: 2 },
    labels: ['enhancement', 'security', 'backend']
  },
  {
    id: '44',
    title: 'Add comprehensive error tracking and monitoring',
    description: 'Integrated Sentry for error tracking, custom error boundaries, and detailed logging system with alerting.',
    author: {
      name: 'Fawwaz',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
    },
    status: 'merged',
    branch: 'feature/error-tracking',
    baseBranch: 'main',
    date: new Date('2024-01-14T10:20:00'),
    mergedDate: new Date('2024-01-14T16:45:00'),
    commits: 12,
    additions: 345,
    deletions: 67,
    files: 15,
    reviews: 4,
    comments: 18,
    checks: { passed: 8, failed: 0, pending: 0 },
    labels: ['enhancement', 'monitoring', 'devops']
  },
  {
    id: '43',
    title: 'Optimize database queries and implement connection pooling',
    description: 'Performance improvements with query optimization, connection pooling, and database indexing strategies.',
    author: {
      name: 'Mohd Abrar',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
    },
    status: 'merged',
    branch: 'performance/db-optimization',
    baseBranch: 'main',
    date: new Date('2024-01-13T09:15:00'),
    mergedDate: new Date('2024-01-14T11:30:00'),
    commits: 6,
    additions: 234,
    deletions: 156,
    files: 12,
    reviews: 3,
    comments: 9,
    checks: { passed: 7, failed: 0, pending: 0 },
    labels: ['performance', 'database', 'optimization']
  },
  {
    id: '42',
    title: 'Real-time notification system with WebSocket support',
    description: 'Complete notification system with real-time updates, push notifications, and customizable notification preferences.',
    author: {
      name: 'Shafian Khan',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    status: 'closed',
    branch: 'feature/notifications',
    baseBranch: 'main',
    date: new Date('2024-01-12T14:20:00'),
    closedDate: new Date('2024-01-14T14:20:00'),
    commits: 15,
    additions: 456,
    deletions: 123,
    files: 20,
    reviews: 5,
    comments: 22,
    checks: { passed: 9, failed: 1, pending: 0 },
    labels: ['enhancement', 'real-time', 'websocket']
  }
];

const commitStats = {
  totalCommits: 156,
  thisWeek: 23,
  thisMonth: 89,
  topContributor: 'Shafian Khan',
  avgCommitsPerDay: 3.2,
  linesAdded: 12450,
  linesRemoved: 3200
};

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

export function CommitAnalytics() {
  return (
    <div className="space-y-6">
      {/* Commit Statistics Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="github-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <GitCommit className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total Commits</p>
                <p className="text-2xl font-bold">{commitStats.totalCommits}</p>
                <p className="text-xs text-muted-foreground">+{commitStats.thisWeek} this week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="github-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">This Month</p>
                <p className="text-2xl font-bold">{commitStats.thisMonth}</p>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="github-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Lines Added</p>
                <p className="text-2xl font-bold">{commitStats.linesAdded.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Code contributions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="github-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Daily Average</p>
                <p className="text-2xl font-bold">{commitStats.avgCommitsPerDay}</p>
                <p className="text-xs text-muted-foreground">commits per day</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="commits" className="space-y-6">
        <TabsList className="github-card">
          <TabsTrigger value="commits" className="flex items-center gap-2">
            <GitCommit className="w-4 h-4" />
            Recent Commits ({commits.length})
          </TabsTrigger>
          <TabsTrigger value="pulls" className="flex items-center gap-2">
            <GitPullRequest className="w-4 h-4" />
            Pull Requests ({pullRequests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="commits" className="space-y-4">
          <Card className="github-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitCommit className="w-5 h-5" />
                Commit History & Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {commits.map((commit, index) => (
                <motion.div
                  key={commit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarImage src={commit.author.avatar} />
                      <AvatarFallback>{commit.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground mb-1">
                            {commit.message}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {commit.description}
                          </p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="font-mono text-xs bg-muted px-2 py-1 rounded border">
                              {commit.hash}
                            </span>
                            <span className="font-medium">{commit.author.name}</span>
                            <span>committed {format(commit.date, 'MMM d, HH:mm')}</span>
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
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-3 text-sm">
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

                      {/* Changed Files */}
                      <div className="mt-3 space-y-1">
                        {commit.changedFiles.slice(0, 3).map((file, idx) => (
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
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pulls" className="space-y-4">
          <Card className="github-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitPullRequest className="w-5 h-5" />
                Pull Request Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pullRequests.map((pr, index) => {
                const StatusIcon = getStatusIcon(pr.status);
                
                return (
                  <motion.div
                    key={pr.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <StatusIcon className={`w-5 h-5 mt-1 ${
                        pr.status === 'merged' ? 'text-purple-600' :
                        pr.status === 'open' ? 'text-green-600' : 'text-red-600'
                      }`} />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground hover:text-blue-600 cursor-pointer mb-1">
                              {pr.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {pr.description}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>#{pr.id}</span>
                              <span>•</span>
                              <span>
                                {pr.status === 'merged' ? 'merged' : 
                                 pr.status === 'closed' ? 'closed' : 'opened'} {format(pr.date, 'MMM d')}
                              </span>
                              <span>•</span>
                              <span className="font-medium">by {pr.author.name}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(pr.status)}>
                              {pr.status}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-3 text-sm">
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

                        {/* PR Stats */}
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
                            {pr.labels.map((label, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {label}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={pr.author.avatar} />
                        <AvatarFallback>{pr.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}