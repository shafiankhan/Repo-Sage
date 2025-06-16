"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Brain, MessageSquare, Database, Clock } from 'lucide-react';

const usageData = [
  {
    title: 'AI Queries',
    current: 847,
    limit: 1000,
    icon: Brain,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500',
  },
  {
    title: 'Meeting Minutes',
    current: 156,
    limit: 200,
    icon: MessageSquare,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500',
  },
  {
    title: 'Storage Used',
    current: 2.4,
    limit: 5,
    unit: 'GB',
    icon: Database,
    color: 'text-green-400',
    bgColor: 'bg-green-500',
  },
  {
    title: 'API Calls',
    current: 12847,
    limit: 15000,
    icon: Clock,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500',
  },
];

export function UsageMetrics() {
  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Usage This Month</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {usageData.map((metric, index) => {
          const percentage = (metric.current / metric.limit) * 100;
          const isNearLimit = percentage > 80;
          
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className={`w-4 h-4 ${metric.color}`} />
                  <span className="text-white font-medium">{metric.title}</span>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${isNearLimit ? 'text-yellow-400' : 'text-white'}`}>
                    {metric.current.toLocaleString()}{metric.unit && ` ${metric.unit}`} / {metric.limit.toLocaleString()}{metric.unit && ` ${metric.unit}`}
                  </div>
                  <div className={`text-xs ${isNearLimit ? 'text-yellow-400' : 'text-gray-400'}`}>
                    {percentage.toFixed(1)}% used
                  </div>
                </div>
              </div>
              
              <Progress 
                value={percentage} 
                className="h-2"
                style={{
                  '--progress-background': isNearLimit ? '#f59e0b' : metric.bgColor.replace('bg-', '#'),
                } as React.CSSProperties}
              />
              
              {isNearLimit && (
                <div className="text-xs text-yellow-400 flex items-center gap-1">
                  ⚠️ Approaching limit - consider upgrading your plan
                </div>
              )}
            </motion.div>
          );
        })}
        
        <div className="pt-4 border-t border-white/10">
          <div className="text-sm text-gray-400 mb-2">Billing cycle resets in:</div>
          <div className="text-white font-medium">12 days</div>
        </div>
      </CardContent>
    </Card>
  );
}