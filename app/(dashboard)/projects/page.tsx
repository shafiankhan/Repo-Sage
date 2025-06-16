"use client";

import { ProjectsGrid } from '@/components/projects/projects-grid';
import { AddProjectModal } from '@/components/projects/add-project-modal';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import { useState } from 'react';

export default function ProjectsPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Repositories</h1>
          <p className="text-muted-foreground mt-1">Manage your repositories and AI-powered insights.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Repository
          </Button>
        </div>
      </div>

      <ProjectsGrid />
      
      <AddProjectModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal} 
      />
    </div>
  );
}