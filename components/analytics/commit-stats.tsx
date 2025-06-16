"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { GitCommit, GitBranch, GitPullRequest, TrendingUp, Users, Clock, Plus, Minus } from 'lucide-react';

const stats = [
  {
    title: 'Total Commits',
    value: '1,247',
    change: '+23',
    changeType: 'positive',
    icon: GitCommit,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
  },
  {
    title: 'Active Branches',
    value: '12',
    change: '+3',
    changeType: 'positive',
    icon: GitBranch,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
  },
  {
    title: 'Pull Requests',
    value: '89',
    change: '+8',
    changeType: 'positive',
    icon: GitPullRequest,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
  },
  {
    title: 'Code Velocity',
    value: '94%',
    change: '+5%',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
  },
  {
    title: 'Contributors',
    value: '8',
    change: '+2',
    changeType: 'positive',
    icon: Users,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/20',
  },
  {
    title: 'Avg Merge Time',
    value: '2.3h',
    change: '-0.5h',
    changeType: 'positive',
    icon: Clock,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
  },
  {
    title: 'Lines Added',
    value: '12.4K',
    change: '+2.1K',
    changeType: 'positive',
    icon: Plus,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
  },
  {
    title: 'Lines Removed',
    value: '3.2K',
    change: '+890',
    changeType: 'neutral',
    icon: Minus,
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
  },
];

export function CommitStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="github-card hover:bg-accent/50 transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="flex items-center space-x-1 text-sm">
                <span className={`${
                  stat.changeType === 'positive' 
                    ? 'text-green-600 dark:text-green-400' 
                    : stat.changeType === 'negative'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-muted-foreground'
                }`}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}