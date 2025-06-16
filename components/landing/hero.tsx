"use client";

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Zap, GitBranch, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { CodeAnimation } from './code-animation';

export function LandingHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
            >
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">AI-Powered Development</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Transform Your{' '}
              <span className="gradient-text">Code & Meetings</span>
              {' '}with AI
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              RepoSage combines intelligent code analysis with meeting intelligence to supercharge your development workflow. Get instant answers, smart summaries, and actionable insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all" asChild>
                <Link href="/auth/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5">
                <Play className="mr-2 w-4 h-4" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                <span>GitHub Integration</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <CodeAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}