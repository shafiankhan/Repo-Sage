"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
import { MoreVertical, Mail, Shield, User, Crown } from 'lucide-react';

const teamMembers = [
  {
    id: '1',
    name: 'Shafian Khan',
    email: 'shafian@company.com',
    role: 'Owner',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
    status: 'active',
    joinedAt: '2023-01-15',
    lastActive: '2 hours ago',
  },
  {
    id: '2',
    name: 'Muqeet Ali',
    email: 'muqeet@company.com',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
    status: 'active',
    joinedAt: '2023-02-20',
    lastActive: '1 day ago',
  },
  {
    id: '3',
    name: 'Mohd Abrar',
    email: 'abrar@company.com',
    role: 'Developer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face',
    status: 'active',
    joinedAt: '2023-03-10',
    lastActive: '5 minutes ago',
  },
  {
    id: '4',
    name: 'Fawwaz',
    email: 'fawwaz@company.com',
    role: 'Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
    status: 'inactive',
    joinedAt: '2023-04-05',
    lastActive: '1 week ago',
  },
  {
    id: '5',
    name: 'Alex Johnson',
    email: 'alex@company.com',
    role: 'Viewer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
    status: 'pending',
    joinedAt: '2023-12-01',
    lastActive: 'Never',
  },
];

const roleIcons = {
  Owner: Crown,
  Admin: Shield,
  Developer: User,
  Viewer: User,
};

const roleColors = {
  Owner: 'bg-yellow-500/20 text-yellow-400',
  Admin: 'bg-purple-500/20 text-purple-400',
  Developer: 'bg-blue-500/20 text-blue-400',
  Viewer: 'bg-gray-500/20 text-gray-400',
};

export function TeamMembersList() {
  return (
    <div className="space-y-6">
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Team Members ({teamMembers.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamMembers.map((member, index) => {
            const RoleIcon = roleIcons[member.role as keyof typeof roleIcons];
            
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-white">{member.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={roleColors[member.role as keyof typeof roleColors]}
                      >
                        <RoleIcon className="w-3 h-3 mr-1" />
                        {member.role}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Mail className="w-3 h-3" />
                      {member.email}
                    </div>
                    <div className="text-xs text-gray-500">
                      Last active: {member.lastActive} • Joined {member.joinedAt}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge 
                    variant={member.status === 'active' ? 'default' : 'secondary'}
                    className={
                      member.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : member.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }
                  >
                    {member.status}
                  </Badge>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4 text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="glass-card border-white/20" align="end">
                      <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/5">
                        Edit Role
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/5">
                        Send Message
                      </DropdownMenuItem>
                      {member.status === 'pending' && (
                        <DropdownMenuItem className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
                          Resend Invitation
                        </DropdownMenuItem>
                      )}
                      {member.role !== 'Owner' && (
                        <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                          Remove Member
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}