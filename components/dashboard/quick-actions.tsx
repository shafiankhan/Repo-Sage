"use client";

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Github, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AddProjectModal } from '@/components/projects/add-project-modal';

export function QuickActions() {
  const router = useRouter();
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  const handleConnectRepository = () => {
    setShowAddProjectModal(true);
  };

  const handleStartAIChat = () => {
    router.push('/chat');
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="gradient-bg">
            <Plus className="w-4 h-4 mr-2" />
            Quick Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="glass-card border-white/20" align="end">
          <DropdownMenuItem 
            className="text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer"
            onClick={handleConnectRepository}
          >
            <Github className="mr-2 h-4 w-4" />
            Connect Repository
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer"
            onClick={handleStartAIChat}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Start AI Chat
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddProjectModal 
        open={showAddProjectModal} 
        onOpenChange={setShowAddProjectModal} 
      />
    </>
  );
}