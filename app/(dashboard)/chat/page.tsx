"use client";

import { GlobalChatInterface } from '@/components/chat/global-chat-interface';

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Repo Guide</h1>
        <p className="text-muted-foreground mt-1">Your intelligent AI assistant that understands your codebase and provides detailed explanations with precise code references.</p>
      </div>
      
      <GlobalChatInterface />
    </div>
  );
}