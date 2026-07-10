'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Plus, Upload, Settings, Zap } from 'lucide-react';

const actions = [
  {
    id: 1,
    icon: Plus,
    label: 'New Project',
    color: 'bg-blue-500/20 text-blue-700 dark:text-blue-400 hover:bg-blue-500/30',
  },
  {
    id: 2,
    icon: Upload,
    label: 'Upload Papers',
    color: 'bg-green-500/20 text-green-700 dark:text-green-400 hover:bg-green-500/30',
  },
  {
    id: 3,
    icon: Zap,
    label: 'Run Analysis',
    color: 'bg-amber-500/20 text-amber-700 dark:text-amber-400 hover:bg-amber-500/30',
  },
  {
    id: 4,
    icon: Settings,
    label: 'Agent Config',
    color: 'bg-purple-500/20 text-purple-700 dark:text-purple-400 hover:bg-purple-500/30',
  },
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-lg border border-border transition-all cursor-pointer flex flex-col items-center gap-2 ${action.color}`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-semibold text-center">{action.label}</span>
              </motion.button>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
