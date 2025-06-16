"use client";

import { motion } from 'framer-motion';
import { 
  Brain, 
  GitBranch, 
  MessageSquare, 
  BarChart3, 
  Shield, 
  Zap,
  Code,
  Users,
  Clock
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "AI Code Intelligence",
    description: "Ask questions about your codebase and get instant, contextual answers with file references and explanations.",
  },
  {
    icon: GitBranch,
    title: "Smart Commit Analysis",
    description: "Automatically generate human-readable summaries of commits, PRs, and code changes.",
  },
  {
    icon: MessageSquare,
    title: "Meeting Intelligence",
    description: "Upload meeting recordings to get transcripts, summaries, action items, and searchable Q&A.",
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description: "Track team productivity, code quality metrics, and collaboration patterns with detailed insights.",
  },
  {
    icon: Code,
    title: "File Browser",
    description: "Navigate your repository with AI-enhanced search and intelligent code exploration.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share insights, save important conversations, and collaborate effectively across your team.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with end-to-end encryption and granular access controls.",
  },
  {
    icon: Clock,
    title: "Real-time Sync",
    description: "Stay updated with live repository changes and instant notifications.",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description: "Connect your GitHub repositories in seconds and start getting AI insights immediately.",
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Everything You Need for{' '}
            <span className="gradient-text">Modern Development</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            RepoSage combines cutting-edge AI with intuitive design to transform how you understand, 
            collaborate on, and manage your codebases and meetings.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card rounded-xl p-6 h-full hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}