"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload, FileAudio, FileVideo, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface UploadMeetingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadMeetingModal({ open, onOpenChange }: UploadMeetingModalProps) {
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project: '',
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('audio/') || file.type.startsWith('video/')) {
        setSelectedFile(file);
      } else {
        toast.error('Please upload an audio or video file');
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('audio/') || file.type.startsWith('video/')) {
        setSelectedFile(file);
      } else {
        toast.error('Please upload an audio or video file');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }
    
    setLoading(true);
    
    // Simulate upload and processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast.success('Meeting uploaded successfully! Processing will begin shortly.');
    setLoading(false);
    onOpenChange(false);
    setSelectedFile(null);
    setFormData({ title: '', description: '', project: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-white/20 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Upload Meeting</DialogTitle>
          <DialogDescription className="text-gray-400">
            Upload an audio or video file to generate transcripts, summaries, and action items.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-500/10' 
                : 'border-white/20 hover:border-white/40'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  {selectedFile.type.startsWith('audio/') ? (
                    <FileAudio className="w-8 h-8 text-blue-400" />
                  ) : (
                    <FileVideo className="w-8 h-8 text-blue-400" />
                  )}
                  <div className="text-left">
                    <p className="font-medium text-white">{selectedFile.name}</p>
                    <p className="text-sm text-gray-400">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFile(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 mx-auto text-gray-400" />
                <div>
                  <p className="text-lg font-medium text-white mb-2">
                    Drop your meeting file here
                  </p>
                  <p className="text-gray-400 mb-4">
                    Supports MP3, MP4, WAV, and other audio/video formats
                  </p>
                  <input
                    type="file"
                    accept="audio/*,video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Meeting Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Sprint Planning Meeting"
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project" className="text-white">Project</Label>
              <Select value={formData.project} onValueChange={(value) => setFormData({ ...formData, project: value })}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent className="glass-card border-white/20">
                  <SelectItem value="ecommerce">E-commerce Platform</SelectItem>
                  <SelectItem value="banking">Mobile Banking App</SelectItem>
                  <SelectItem value="analytics">Analytics Dashboard</SelectItem>
                  <SelectItem value="chatbot">AI Chatbot</SelectItem>
                  <SelectItem value="task-manager">Task Management Tool</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the meeting..."
              className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-white/20 text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !selectedFile}
              className="flex-1 gradient-bg"
            >
              {loading ? 'Uploading...' : 'Upload & Process'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}