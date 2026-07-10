'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Zap, Brain, TrendingUp } from 'lucide-react';

const agents = [
  {
    id: 1,
    name: 'Literature Synthesizer',
    status: 'active',
    progress: 87,
    task: 'Processing 142 research papers',
    icon: Brain,
    color: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
  },
  {
    id: 2,
    name: 'Insight Extractor',
    status: 'active',
    progress: 64,
    task: 'Extracting key findings from corpus',
    icon: TrendingUp,
    color: 'bg-purple-500/20 text-purple-700 dark:text-purple-400',
  },
  {
    id: 3,
    name: 'Citation Mapper',
    status: 'active',
    progress: 92,
    task: 'Building citation network graph',
    icon: Zap,
    color: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
  },
];

export function ActiveAgents() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Active Agents</h3>
        <div className="space-y-4">
          {agents.map((agent) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-secondary/30 rounded-lg border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${agent.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{agent.name}</h4>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-700 dark:text-green-400">
                        <span className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full animate-pulse" />
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{agent.task}</p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${agent.progress}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-semibold text-foreground">{agent.progress}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
