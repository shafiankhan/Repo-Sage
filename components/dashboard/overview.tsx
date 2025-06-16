"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Brain, GitBranch, MessageSquare, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: 'AI Queries',
    value: '28',
    change: '+12%',
    icon: Brain,
    color: 'text-blue-400',
  },
  {
    title: 'Repositories',
    value: '7',
    change: '+2',
    icon: GitBranch,
    color: 'text-green-400',
  },
  {
    title: 'Productivity Score',
    value: '94%',
    change: '+5%',
    icon: TrendingUp,
    color: 'text-yellow-400',
  },
];

export function DashboardOverview() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="glass-card border-white/10 hover:bg-white/5 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="flex items-center space-x-1 text-sm">
                <span className="text-green-400">{stat.change}</span>
                <span className="text-gray-400">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}