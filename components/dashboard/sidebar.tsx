"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Bot,
  Folder,
  Home,
  Settings,
  Users,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Repositories', href: '/projects', icon: Folder },
  { name: 'Repo Guide', href: '/chat', icon: Bot },
  { name: 'Commit History', href: '/analytics', icon: GitCommit },
  { name: 'Team', href: '/team', icon: Users },
];

const bottomNavigation = [
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

// Recent activity data for sidebar
const recentCommits = [
  {
    id: '1',
    hash: 'a1b2c3d',
    message: 'feat: add theme toggle',
    author: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-15T10:30:00'),
    branch: 'main'
  },
  {
    id: '2',
    hash: 'e4f5g6h',
    message: 'fix: auth persistence',
    author: {
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-14T16:45:00'),
    branch: 'main'
  },
  {
    id: '3',
    hash: 'i7j8k9l',
    message: 'refactor: improve types',
    author: {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-14T14:20:00'),
    branch: 'feature/types'
  }
];

const recentPRs = [
  {
    id: '42',
    title: 'Add AI chat improvements',
    status: 'open',
    author: {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-15T14:30:00')
  },
  {
    id: '41',
    title: 'Theme system implementation',
    status: 'merged',
    author: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    date: new Date('2024-01-14T10:30:00')
  }
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { userData } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0, width: collapsed ? 80 : 320 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-y-0 left-0 z-50 github-sidebar flex flex-col"
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GitBranch className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">RepoSage</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-muted-foreground hover:text-foreground"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const isRepoGuide = item.name === 'Repo Guide';
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? isRepoGuide 
                      ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                      : 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                  collapsed && 'justify-center'
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className={cn(
                  "w-5 h-5",
                  isActive && isRepoGuide && "text-blue-600 dark:text-blue-400"
                )} />
                {!collapsed && item.name}
              </Link>
            );
          })}
        </nav>

        {/* Repository Activity Section */}
        {!collapsed && (
          <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
            {/* Recent Commits */}
            <Card className="github-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <GitCommit className="w-4 h-4" />
                  Recent Commits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentCommits.map((commit) => (
                  <div key={commit.id} className="flex items-start gap-2">
                    <Avatar className="w-6 h-6 mt-0.5">
                      <AvatarImage src={commit.author.avatar} />
                      <AvatarFallback className="text-xs">{commit.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">
                        {commit.message}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span className="font-mono">{commit.hash}</span>
                        <span>•</span>
                        <span>{format(commit.date, 'MMM d')}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <GitBranch className="w-3 h-3" />
                        <span>{commit.branch}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
                  <Link href="/analytics">View All Commits</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Pull Requests */}
            <Card className="github-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <GitPullRequest className="w-4 h-4" />
                  Pull Requests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentPRs.map((pr) => (
                  <div key={pr.id} className="flex items-start gap-2">
                    <GitPullRequest className={`w-4 h-4 mt-1 ${
                      pr.status === 'merged' ? 'text-purple-600' :
                      pr.status === 'open' ? 'text-green-600' : 'text-red-600'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">
                        {pr.title}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>#{pr.id}</span>
                        <span>•</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs h-4 ${
                            pr.status === 'merged' ? 'text-purple-600 border-purple-600' :
                            pr.status === 'open' ? 'text-green-600 border-green-600' : 'text-red-600 border-red-600'
                          }`}
                        >
                          {pr.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>by {pr.author.name}</span>
                        <span>•</span>
                        <span>{format(pr.date, 'MMM d')}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
                  <Link href="/analytics">View All PRs</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="github-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Commits</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">PRs Merged</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Code Reviews</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Lines Added</span>
                  <span className="font-medium text-green-600">+456</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="px-4 py-4 border-t border-border space-y-1">
          {bottomNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                  collapsed && 'justify-center'
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className="w-5 h-5" />
                {!collapsed && item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}