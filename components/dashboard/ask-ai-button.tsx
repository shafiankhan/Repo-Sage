"use client";

import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export function AskAIButton() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <Button
        size="lg"
        className="gradient-bg rounded-full h-14 w-14 shadow-2xl hover:scale-110 transition-transform"
        onClick={() => router.push('/chat')}
      >
        <Bot className="w-6 h-6" />
      </Button>
    </motion.div>
  );
}