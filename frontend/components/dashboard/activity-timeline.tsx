'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { CheckCircle, Clock, AlertCircle, Info } from 'lucide-react';

const activities = [
  {
    id: 1,
    time: '2:45 PM',
    title: 'Literature synthesis completed',
    description: 'Processed 142 papers across 8 research domains',
    type: 'success',
    icon: CheckCircle,
  },
  {
    id: 2,
    time: '2:30 PM',
    title: 'Agent workflow started',
    description: 'Initiated multi-agent consensus building on methodology',
    type: 'info',
    icon: Info,
  },
  {
    id: 3,
    time: '2:12 PM',
    title: 'Data processing ongoing',
    description: 'Citation network analysis 67% complete',
    type: 'warning',
    icon: Clock,
  },
  {
    id: 4,
    time: '1:58 PM',
    title: 'Duplicate detection flagged',
    description: '3 similar papers identified and consolidated',
    type: 'alert',
    icon: AlertCircle,
  },
  {
    id: 5,
    time: '1:30 PM',
    title: 'New research papers ingested',
    description: 'Added 18 papers from arXiv and Conference proceedings',
    type: 'success',
    icon: CheckCircle,
  },
];

const typeColors: Record<string, string> = {
  success: 'bg-green-500/20 text-green-700 dark:text-green-400',
  info: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
  warning: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
  alert: 'bg-red-500/20 text-red-700 dark:text-red-400',
};

export function ActivityTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex gap-4"
              >
                <div className="relative flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    className={`p-2 rounded-full ${typeColors[activity.type]}`}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.div>
                  {index < activities.length - 1 && (
                    <div className="w-0.5 h-12 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-foreground text-sm">{activity.title}</h4>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
