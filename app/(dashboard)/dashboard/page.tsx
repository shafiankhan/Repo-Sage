"use client";

import { DashboardOverview } from '@/components/dashboard/overview';
import { ProjectGrid } from '@/components/dashboard/project-grid';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { RepositoryActivityWidget } from '@/components/dashboard/repository-activity-widget';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your repositories.</p>
        </div>
        <QuickActions />
      </div>

      <DashboardOverview />
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProjectGrid />
        </div>
        <div className="space-y-6">
          <RecentActivity />
          <RepositoryActivityWidget maxItems={4} />
        </div>
      </div>
    </div>
  );
}