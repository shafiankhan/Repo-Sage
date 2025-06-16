"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Play, Download, MessageSquare, Clock, Users, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const meetings = [
  {
    id: '1',
    title: 'Sprint Planning - Q1 2024',
    description: 'Planning session for upcoming sprint with feature prioritization',
    duration: '45 minutes',
    participants: 8,
    date: new Date('2024-01-15T10:00:00'),
    status: 'processed',
    transcript: true,
    summary: true,
    actionItems: 5,
    project: 'E-commerce Platform',
  },
  {
    id: '2',
    title: 'Architecture Review',
    description: 'Technical discussion on microservices migration strategy',
    duration: '1 hour 20 minutes',
    participants: 5,
    date: new Date('2024-01-12T14:30:00'),
    status: 'processed',
    transcript: true,
    summary: true,
    actionItems: 3,
    project: 'Banking App',
  },
  {
    id: '3',
    title: 'Daily Standup',
    description: 'Regular team sync and progress updates',
    duration: '15 minutes',
    participants: 6,
    date: new Date('2024-01-10T09:00:00'),
    status: 'processing',
    transcript: false,
    summary: false,
    actionItems: 0,
    project: 'Analytics Dashboard',
  },
  {
    id: '4',
    title: 'Client Demo Preparation',
    description: 'Preparing for upcoming client presentation and demo',
    duration: '30 minutes',
    participants: 4,
    date: new Date('2024-01-08T16:00:00'),
    status: 'processed',
    transcript: true,
    summary: true,
    actionItems: 7,
    project: 'AI Chatbot',
  },
  {
    id: '5',
    title: 'Code Review Session',
    description: 'Reviewing recent pull requests and discussing improvements',
    duration: '1 hour',
    participants: 3,
    date: new Date('2024-01-05T11:00:00'),
    status: 'processed',
    transcript: true,
    summary: true,
    actionItems: 2,
    project: 'Task Manager',
  },
  {
    id: '6',
    title: 'Security Audit Discussion',
    description: 'Reviewing security findings and remediation plans',
    duration: '50 minutes',
    participants: 7,
    date: new Date('2024-01-03T13:00:00'),
    status: 'failed',
    transcript: false,
    summary: false,
    actionItems: 0,
    project: 'Weather API',
  },
];

export function MeetingsGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {meetings.map((meeting, index) => (
        <motion.div
          key={meeting.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="glass-card border-white/10 hover:bg-white/5 transition-all duration-300 hover:scale-105 h-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-white text-lg">{meeting.title}</CardTitle>
                  <p className="text-sm text-gray-400 line-clamp-2">{meeting.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{meeting.project}</span>
                    <span>•</span>
                    <span>{format(meeting.date, 'MMM d, yyyy')}</span>
                  </div>
                </div>
                <Badge 
                  variant="default"
                  className={
                    meeting.status === 'processed' 
                      ? 'bg-green-500/20 text-green-400' 
                      : meeting.status === 'processing'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }
                >
                  {meeting.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  {meeting.duration}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Users className="w-4 h-4" />
                  {meeting.participants} people
                </div>
              </div>

              {meeting.status === 'processed' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Available:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {meeting.transcript && (
                      <Badge variant="outline\" className="border-blue-500/50 text-blue-400">
                        Transcript
                      </Badge>
                    )}
                    {meeting.summary && (
                      <Badge variant="outline" className="border-green-500/50 text-green-400">
                        Summary
                      </Badge>
                    )}
                    {meeting.actionItems > 0 && (
                      <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                        {meeting.actionItems} Actions
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {meeting.status === 'processing' && (
                <div className="flex items-center gap-2 text-yellow-400 text-sm">
                  <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              )}

              {meeting.status === 'failed' && (
                <div className="text-red-400 text-sm">
                  Processing failed. Please try uploading again.
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 border-white/20 text-white hover:bg-white/5"
                  disabled={meeting.status !== 'processed'}
                >
                  <Play className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-gray-400 hover:text-white"
                  disabled={meeting.status !== 'processed'}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}