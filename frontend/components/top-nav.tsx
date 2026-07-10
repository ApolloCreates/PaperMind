'use client';

import { motion } from 'framer-motion';
import { Search, Bell, Circle } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function TopNav() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6"
    >
      <div className="flex items-center gap-4 flex-1">
        <motion.div
          className="flex-1 max-w-md"
          whileHover={{ scale: 1.01 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects, papers..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </motion.div>

        <motion.select
          className="px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <option>Project Selector</option>
          <option>Recent Projects</option>
          <option>Archived</option>
        </motion.select>
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-3">
        <motion.button
          className="relative p-2 rounded-lg hover:bg-secondary transition-colors text-foreground"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-5 h-5" />
          <Circle className="absolute top-1 right-1 w-2 h-2 fill-red-500 text-red-500" />
        </motion.button>

        <ThemeToggle />

        <motion.button
          className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          A
        </motion.button>
      </div>
    </motion.header>
  );
}
