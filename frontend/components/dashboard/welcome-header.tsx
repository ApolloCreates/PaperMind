'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function WelcomeHeader() {
  const [greeting, setGreeting] = useState('Welcome');

  useEffect(() => {
    const hour = new Date().getHours();
    const newGreeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    setGreeting(newGreeting);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h1 className="text-4xl font-bold text-foreground mb-2">
        {greeting}, Research Coordinator
      </h1>
      <p className="text-lg text-muted-foreground">
        3 agents active • 12 research projects in progress • System status: optimal
      </p>
    </motion.div>
  );
}
