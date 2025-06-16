"use client";

import { RepositoryActivity } from '@/components/repository/repository-activity';
import { CommitStats } from '@/components/analytics/commit-stats';

export default function CommitHistoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Commit History & Pull Requests</h1>
        <p className="text-muted-foreground mt-1">Track your repository activity, commit history, and pull request management across all projects.</p>
      </div>

      <CommitStats />
      
      <div className="w-full">
        <RepositoryActivity showTabs={true} />
      </div>
    </div>
  );
}