"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const codeSnippets = [
  {
    title: "AI Code Analysis",
    code: `// Ask RepoSage anything about your code
> "How does authentication work in this app?"

✨ RepoSage analyzes your codebase...

📁 Found in: auth/middleware.ts, lib/auth.ts
🔐 Authentication uses JWT tokens with refresh rotation
⚡ Middleware protects routes automatically
🛡️ Rate limiting prevents brute force attacks`,
  },
  {
    title: "Meeting Intelligence", 
    code: `🎯 Meeting Summary - Sprint Planning

👥 Participants: 5 engineers, 2 PMs
⏱️ Duration: 45 minutes

📋 Key Decisions:
• Migrate to microservices architecture
• Implement feature flags for gradual rollout
• Add comprehensive error monitoring

🎯 Action Items:
• @john: Setup monitoring dashboard (Due: Friday)
• @sarah: Create feature flag system (Due: Next week)`,
  },
  {
    title: "Smart Commit Analysis",
    code: `📝 Commit: feat(auth): add social login support

🧠 AI Summary:
Added OAuth integration for Google and GitHub sign-in.
New components handle social auth flow with proper
error handling and user session management.

📊 Impact:
• 3 new files added
• Authentication system enhanced
• User experience improved
• Security best practices followed`,
  }
];

export function CodeAnimation() {
  const [currentSnippet, setCurrentSnippet] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <motion.div
        className="code-block rounded-xl p-6 font-mono text-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-400 text-xs">
            {codeSnippets[currentSnippet].title}
          </span>
        </div>
        
        <motion.div
          key={currentSnippet}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-gray-300 whitespace-pre-line leading-relaxed"
        >
          {codeSnippets[currentSnippet].code}
        </motion.div>
      </motion.div>

      {/* Floating indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {codeSnippets.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSnippet(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSnippet 
                ? 'bg-blue-500 w-6' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}