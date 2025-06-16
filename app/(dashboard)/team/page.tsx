"use client";

import { TeamMembersList } from '@/components/team/team-members-list';
import { InviteMemberModal } from '@/components/team/invite-member-modal';
import { Button } from '@/components/ui/button';
import { UserPlus, Settings } from 'lucide-react';
import { useState } from 'react';

export default function TeamPage() {
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Team</h1>
          <p className="text-gray-400 mt-1">Manage your team members and permissions.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
            <Settings className="w-4 h-4 mr-2" />
            Team Settings
          </Button>
          <Button 
            className="gradient-bg"
            onClick={() => setShowInviteModal(true)}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
        </div>
      </div>

      <TeamMembersList />
      
      <InviteMemberModal 
        open={showInviteModal} 
        onOpenChange={setShowInviteModal} 
      />
    </div>
  );
}