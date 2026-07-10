'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  index?: number;
}

export function StatCard({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  trendValue,
  index = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="bg-primary/10 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        {trend && (
          <div
            className={`text-sm font-semibold px-2 py-1 rounded ${
              trend === 'up'
                ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                : trend === 'down'
                  ? 'bg-red-500/20 text-red-700 dark:text-red-400'
                  : 'bg-gray-500/20 text-gray-700 dark:text-gray-400'
            }`}
          >
            {trendValue}
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-muted-foreground mb-1">{label}</h3>
      <p className="text-3xl font-bold text-foreground mb-2">{value}</p>
      {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
    </motion.div>
  );
}
