"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Brain, GitBranch, MessageSquare, TrendingUp, Users, Clock, Zap, Target } from 'lucide-react';

const metrics = [
  {
    title: 'Total AI Queries',
    value: '2,847',
    change: '+12%',
    changeType: 'positive',
    icon: Brain,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
  },
  {
    title: 'Active Projects',
    value: '23',
    change: '+2',
    changeType: 'positive',
    icon: GitBranch,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
  },
  {
    title: 'Meetings Analyzed',
    value: '156',
    change: '+8%',
    changeType: 'positive',
    icon: MessageSquare,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
  },
  {
    title: 'Productivity Score',
    value: '94%',
    change: '+5%',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
  },
  {
    title: 'Team Members',
    value: '12',
    change: '+3',
    changeType: 'positive',
    icon: Users,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/20',
  },
  {
    title: 'Avg Response Time',
    value: '1.2s',
    change: '-0.3s',
    changeType: 'positive',
    icon: Clock,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
  },
  {
    title: 'Credits Used',
    value: '1,234',
    change: '+156',
    changeType: 'neutral',
    icon: Zap,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/20',
  },
  {
    title: 'Goals Completed',
    value: '89%',
    change: '+12%',
    changeType: 'positive',
    icon: Target,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/20',
  },
];

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="glass-card border-white/10 hover:bg-white/5 transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="flex items-center space-x-1 text-sm">
                <span className={`${
                  metric.changeType === 'positive' 
                    ? 'text-green-400' 
                    : metric.changeType === 'negative'
                    ? 'text-red-400'
                    : 'text-gray-400'
                }`}>
                  {metric.change}
                </span>
                <span className="text-gray-400">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}