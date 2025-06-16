"use client";

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Github, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 glass-card"
      role="banner"
      as="header"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-white">RepoSage</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#docs" className="text-gray-300 hover:text-white transition-colors">
              Docs
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button size="sm" className="gradient-bg" asChild>
              <Link href="/auth/signup">Start Free Trial</Link>
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-card border-t border-white/10"
        >
          <div className="px-4 py-4 space-y-4">
            <Link href="#features" className="block text-gray-300 hover:text-white">
              Features
            </Link>
            <Link href="#pricing" className="block text-gray-300 hover:text-white">
              Pricing
            </Link>
            <Link href="#docs" className="block text-gray-300 hover:text-white">
              Docs
            </Link>
            <div className="pt-4 space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
             <Button size="sm" className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all" asChild>
  <Link href="/auth/signup">Start Free Trial</Link>

              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}