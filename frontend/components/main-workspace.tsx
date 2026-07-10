'use client';

import { motion } from 'framer-motion';
import { FileText, Zap, TrendingUp, Code, BookOpen, Lightbulb } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function MainWorkspace() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="flex-1 overflow-y-auto p-8 bg-background"
    >
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          className="text-3xl font-bold text-foreground mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Dashboard
        </motion.h1>
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Welcome back! Here&apos;s what you&apos;re working on.
        </motion.p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Projects', value: '8', icon: Zap },
          { label: 'Papers Analyzed', value: '124', icon: FileText },
          { label: 'Tasks Running', value: '3', icon: TrendingUp },
          { label: 'API Calls', value: '2.4K', icon: Code },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              className="bg-card border border-border rounded-lg p-6"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, borderColor: 'var(--color-primary)' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Active Projects */}
        <motion.div
          className="lg:col-span-2 bg-card border border-border rounded-lg p-6"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Active Projects</h2>
          <div className="space-y-3">
            {[
              { name: 'Quantum Computing Review', progress: 75, papers: 23 },
              { name: 'AI Ethics Study', progress: 45, papers: 18 },
              { name: 'Neural Architecture Search', progress: 90, papers: 34 },
            ].map((project, idx) => (
              <motion.div
                key={idx}
                className="p-4 bg-secondary rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer"
                whileHover={{ x: 4 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-foreground text-sm">{project.name}</p>
                    <p className="text-xs text-muted-foreground">{project.papers} papers</p>
                  </div>
                  <span className="text-xs font-semibold text-primary">{project.progress}%</span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-primary h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="bg-card border border-border rounded-lg p-6"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { icon: FileText, label: 'New Research' },
              { icon: Lightbulb, label: 'Start Workflow' },
              { icon: BookOpen, label: 'Browse Library' },
            ].map((action, idx) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={idx}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-muted transition-colors text-left"
                  whileHover={{ x: 4 }}
                >
                  <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Recent Papers */}
      <motion.div
        className="bg-card border border-border rounded-lg p-6"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Papers</h2>
        <div className="space-y-2">
          {[
            { title: 'Attention Is All You Need', date: 'Today' },
            { title: 'BERT: Pre-training Deep Bidirectional...', date: 'Yesterday' },
            { title: 'GPT-3: Language Models are Few-Shot...', date: '2 days ago' },
            { title: 'Transformer-XL: Attentive Language...', date: '3 days ago' },
          ].map((paper, idx) => (
            <motion.div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{paper.title}</p>
                  <p className="text-xs text-muted-foreground">{paper.date}</p>
                </div>
              </div>
              <motion.div
                className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-semibold flex-shrink-0"
                whileHover={{ scale: 1.05 }}
              >
                View
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.main>
  );
}
