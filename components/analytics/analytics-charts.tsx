"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const usageData = [
  { name: 'Jan', queries: 400, meetings: 24 },
  { name: 'Feb', queries: 300, meetings: 13 },
  { name: 'Mar', queries: 500, meetings: 28 },
  { name: 'Apr', queries: 780, meetings: 39 },
  { name: 'May', queries: 890, meetings: 48 },
  { name: 'Jun', queries: 1200, meetings: 56 },
];

const projectData = [
  { name: 'E-commerce', queries: 450 },
  { name: 'Banking App', queries: 320 },
  { name: 'Analytics', queries: 280 },
  { name: 'AI Chatbot', queries: 200 },
  { name: 'Task Manager', queries: 150 },
];

const languageData = [
  { name: 'TypeScript', value: 35, color: '#3B82F6' },
  { name: 'JavaScript', value: 25, color: '#F59E0B' },
  { name: 'Python', value: 20, color: '#10B981' },
  { name: 'Kotlin', value: 12, color: '#8B5CF6' },
  { name: 'Go', value: 8, color: '#06B6D4' },
];

export function AnalyticsCharts() {
  return (
    <div className="space-y-6">
      {/* Usage Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Usage Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="queries" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="AI Queries"
                />
                <Line 
                  type="monotone" 
                  dataKey="meetings" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Meetings"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Project Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Project Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={projectData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Bar dataKey="queries" fill="#8B5CF6" name="AI Queries" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Language Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Language Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={languageData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {languageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}