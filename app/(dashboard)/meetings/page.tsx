"use client";

import { MeetingsGrid } from '@/components/meetings/meetings-grid';
import { UploadMeetingModal } from '@/components/meetings/upload-meeting-modal';
import { Button } from '@/components/ui/button';
import { Upload, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function MeetingsPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Meetings</h1>
          <p className="text-gray-400 mt-1">Upload and analyze your team meetings with AI.</p>
        </div>
        <Button 
          className="gradient-bg"
          onClick={() => setShowUploadModal(true)}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Meeting
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search meetings, transcripts..."
            className="pl-9 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
      </div>

      <MeetingsGrid />
      
      <UploadMeetingModal 
        open={showUploadModal} 
        onOpenChange={setShowUploadModal} 
      />
    </div>
  );
}