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
import { Badge } from '@/components/ui/badge';
import { Mail, X, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface InviteMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteMemberModal({ open, onOpenChange }: InviteMemberModalProps) {
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState('');
  const [role, setRole] = useState('Developer');
  const [message, setMessage] = useState('');

  const addEmail = () => {
    if (currentEmail && !emails.includes(currentEmail)) {
      if (validateEmail(currentEmail)) {
        setEmails([...emails, currentEmail]);
        setCurrentEmail('');
      } else {
        toast.error('Please enter a valid email address');
      }
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter(email => email !== emailToRemove));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addEmail();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emails.length === 0) {
      toast.error('Please add at least one email address');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success(`Invitations sent to ${emails.length} member${emails.length > 1 ? 's' : ''}!`);
    setLoading(false);
    onOpenChange(false);
    setEmails([]);
    setCurrentEmail('');
    setRole('Developer');
    setMessage('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-white/20 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Invite Team Members</DialogTitle>
          <DialogDescription className="text-gray-400">
            Send invitations to new team members to join your workspace.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email Addresses</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={currentEmail}
                  onChange={(e) => setCurrentEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="colleague@company.com"
                  className="pl-9 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              <Button
                type="button"
                onClick={addEmail}
                disabled={!currentEmail}
                className="gradient-bg"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Email Tags */}
            {emails.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {emails.map((email) => (
                  <Badge
                    key={email}
                    variant="outline"
                    className="border-blue-500/50 text-blue-400 pr-1"
                  >
                    {email}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1 hover:bg-red-500/20"
                      onClick={() => removeEmail(email)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <Label htmlFor="role" className="text-white">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="glass-card border-white/20">
                <SelectItem value="Admin">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Admin</span>
                    <span className="text-xs text-gray-400">Full access to all features</span>
                  </div>
                </SelectItem>
                <SelectItem value="Developer">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Developer</span>
                    <span className="text-xs text-gray-400">Can manage projects and code</span>
                  </div>
                </SelectItem>
                <SelectItem value="Viewer">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Viewer</span>
                    <span className="text-xs text-gray-400">Read-only access</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Custom Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-white">Custom Message (Optional)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message to the invitation..."
              className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              rows={3}
            />
          </div>

          {/* Preview */}
          {emails.length > 0 && (
            <div className="glass-card rounded-lg p-4 border-white/10">
              <h4 className="text-white font-medium mb-2">Invitation Preview</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <p>• {emails.length} member{emails.length > 1 ? 's' : ''} will be invited</p>
                <p>• Role: {role}</p>
                <p>• They will receive an email invitation to join your workspace</p>
              </div>
            </div>
          )}

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
              disabled={loading || emails.length === 0}
              className="flex-1 gradient-bg"
            >
              {loading ? 'Sending Invitations...' : `Send ${emails.length} Invitation${emails.length > 1 ? 's' : ''}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}