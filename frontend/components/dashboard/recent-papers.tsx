'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { FileText, User, Calendar } from 'lucide-react';

const papers = [
  {
    id: 1,
    title: 'Neural Architecture Search for Efficient Transformers',
    authors: 'Chen et al.',
    date: '2026-01-15',
    citations: 342,
    status: 'reviewing',
  },
  {
    id: 2,
    title: 'Scalable Multimodal Reasoning with Vision-Language Models',
    authors: 'Rodriguez et al.',
    date: '2026-01-10',
    citations: 187,
    status: 'synthesized',
  },
  {
    id: 3,
    title: 'Adaptive Learning Rates in Neural Network Training',
    authors: 'Kim & Park',
    date: '2026-01-08',
    citations: 523,
    status: 'annotated',
  },
  {
    id: 4,
    title: 'Quantum-Inspired Optimization for Machine Learning',
    authors: 'Patel et al.',
    date: '2026-01-05',
    citations: 98,
    status: 'processing',
  },
];

const statusColors: Record<string, string> = {
  reviewing: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
  synthesized: 'bg-green-500/20 text-green-700 dark:text-green-400',
  annotated: 'bg-purple-500/20 text-purple-700 dark:text-purple-400',
  processing: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
};

export function RecentPapers() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Papers</h3>
        <div className="space-y-3">
          {papers.map((paper) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-secondary/20 rounded-lg border border-border hover:border-primary/30 transition-all hover:bg-secondary/30 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground text-sm mb-2 leading-tight">
                    {paper.title}
                  </h4>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {paper.authors}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {paper.date}
                    </div>
                    <div>{paper.citations} citations</div>
                  </div>
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusColors[paper.status]}`}
                  >
                    {paper.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
