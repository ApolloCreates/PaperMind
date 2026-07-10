'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, FileText, Zap, MoreVertical } from 'lucide-react';

interface PanelTab {
  id: string;
  label: string;
  badge?: number;
}

const tabs: PanelTab[] = [
  { id: 'status', label: 'Agent Status' },
  { id: 'tasks', label: 'Current Tasks', badge: 3 },
  { id: 'papers', label: 'Papers', badge: 5 },
  { id: 'memory', label: 'Memory' },
  { id: 'jobs', label: 'Running Jobs', badge: 2 },
];

export function RightPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('status');

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          className="w-80 border-l border-border bg-card flex flex-col h-screen"
        >
          {/* Header */}
          <div className="border-b border-border p-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Context Panel</h3>
            <motion.button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-secondary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Tabs */}
          <div className="border-b border-border flex gap-2 p-4 overflow-x-auto">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-muted'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                {tab.label}
                {tab.badge && (
                  <span className="ml-1 bg-destructive/20 px-1.5 py-0.5 rounded text-xs text-destructive font-semibold">
                    {tab.badge}
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeTab === 'status' && <AgentStatus />}
            {activeTab === 'tasks' && <CurrentTasks />}
            {activeTab === 'papers' && <UploadedPapers />}
            {activeTab === 'memory' && <Memory />}
            {activeTab === 'jobs' && <RunningJobs />}
          </div>
        </motion.div>
      ) : (
        <motion.button
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-12 border-l border-border bg-card flex items-center justify-center hover:bg-secondary transition-colors group"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
        >
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function AgentStatus() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      <div className="bg-secondary rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Status</span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
            Active
          </span>
        </div>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <motion.div
            className="bg-primary h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ duration: 2 }}
          />
        </div>
        <p className="text-xs text-muted-foreground">Processing: 75%</p>
      </div>
      <div className="bg-secondary rounded-lg p-3">
        <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
        <p className="text-sm font-medium text-foreground">2 min ago</p>
      </div>
    </motion.div>
  );
}

function CurrentTasks() {
  const tasks = [
    { title: 'Analyzing paper', status: 'In Progress' },
    { title: 'Generating summary', status: 'Queued' },
    { title: 'Cross-reference check', status: 'In Progress' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
      {tasks.map((task, idx) => (
        <div key={idx} className="bg-secondary rounded-lg p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{task.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{task.status}</p>
            </div>
            <Zap className="w-4 h-4 text-yellow-500 flex-shrink-0" />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function UploadedPapers() {
  const papers = [
    { name: 'quantum_computing.pdf', date: 'Today' },
    { name: 'ai_trends_2024.pdf', date: 'Yesterday' },
    { name: 'neural_networks.pdf', date: '2 days ago' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
      {papers.map((paper, idx) => (
        <div key={idx} className="bg-secondary rounded-lg p-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-4 h-4 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{paper.name}</p>
              <p className="text-xs text-muted-foreground">{paper.date}</p>
            </div>
          </div>
          <MoreVertical className="w-3 h-3 text-muted-foreground flex-shrink-0" />
        </div>
      ))}
    </motion.div>
  );
}

function Memory() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      <div className="bg-secondary rounded-lg p-3">
        <p className="text-xs text-muted-foreground mb-1">Memory Usage</p>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <motion.div
            className="bg-primary h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '45%' }}
            transition={{ duration: 1.5 }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">45% of 10GB used</p>
      </div>
      <div className="bg-secondary rounded-lg p-3 text-xs text-muted-foreground">
        <p>Context window optimized for research synthesis</p>
      </div>
    </motion.div>
  );
}

function RunningJobs() {
  const jobs = [
    { name: 'Literature Review', progress: 60 },
    { name: 'Citation Analysis', progress: 30 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      {jobs.map((job, idx) => (
        <div key={idx} className="bg-secondary rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-foreground">{job.name}</p>
            <span className="text-xs text-muted-foreground">{job.progress}%</span>
          </div>
          <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
            <motion.div
              className="bg-primary h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${job.progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      ))}
    </motion.div>
  );
}
