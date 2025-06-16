"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatInterface } from './chat-interface';
import { RepositoryActivity } from '@/components/repository/repository-activity';
import { FileBrowser } from './file-browser';
import { TeamView } from './team-view';
import { Bot, GitCommit, Folder, Users } from 'lucide-react';

interface ProjectTabsProps {
  projectId: string;
}

export function ProjectTabs({ projectId }: ProjectTabsProps) {
  return (
    <Tabs defaultValue="commits" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 github-card">
        <TabsTrigger value="commits" className="flex items-center gap-2 data-[state=active]:bg-accent">
          <GitCommit className="w-4 h-4" />
          Commits
        </TabsTrigger>
        <TabsTrigger value="chat" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/20 data-[state=active]:to-purple-600/20 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border data-[state=active]:border-blue-200 dark:data-[state=active]:border-blue-800">
          <Bot className="w-4 h-4" />
          Repo Guide
        </TabsTrigger>
        <TabsTrigger value="files" className="flex items-center gap-2 data-[state=active]:bg-accent">
          <Folder className="w-4 h-4" />
          Files
        </TabsTrigger>
        <TabsTrigger value="team" className="flex items-center gap-2 data-[state=active]:bg-accent">
          <Users className="w-4 h-4" />
          Contributors
        </TabsTrigger>
      </TabsList>

      <TabsContent value="commits" className="space-y-4">
        <RepositoryActivity projectId={projectId} showTabs={true} />
      </TabsContent>

      <TabsContent value="chat" className="space-y-4">
        <ChatInterface projectId={projectId} />
      </TabsContent>

      <TabsContent value="files" className="space-y-4">
        <FileBrowser projectId={projectId} />
      </TabsContent>

      <TabsContent value="team" className="space-y-4">
        <TeamView projectId={projectId} />
      </TabsContent>
    </Tabs>
  );
}