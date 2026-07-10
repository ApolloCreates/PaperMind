'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Lightbulb, ArrowUpRight } from 'lucide-react';

const ideas = [
  {
    id: 1,
    title: 'Federated Learning for Privacy-Preserving AI',
    confidence: 94,
    relatedPapers: 24,
    researchGap: 'Partially Explored',
  },
  {
    id: 2,
    title: 'Energy-Efficient Inference Architectures',
    confidence: 87,
    relatedPapers: 18,
    researchGap: 'Emerging Gap',
  },
  {
    id: 3,
    title: 'Interpretable Reasoning in Language Models',
    confidence: 91,
    relatedPapers: 31,
    researchGap: 'Active Research',
  },
  {
    id: 4,
    title: 'Cross-Domain Transfer Learning Protocols',
    confidence: 78,
    relatedPapers: 12,
    researchGap: 'Major Gap',
  },
];

export function ResearchIdeas() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Research Ideas</h3>
        <div className="space-y-3">
          {ideas.map((idea) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg hover:border-amber-500/40 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-amber-500/20 p-2 rounded-lg">
                    <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                      {idea.title}
                    </h4>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Confidence</span>
                    <span className="text-xs font-semibold text-foreground">{idea.confidence}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${idea.confidence}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full rounded-full ${
                        idea.confidence >= 90
                          ? 'bg-green-500'
                          : idea.confidence >= 80
                            ? 'bg-amber-500'
                            : 'bg-orange-500'
                      }`}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{idea.relatedPapers} related papers</span>
                  <span
                    className={`px-2 py-0.5 rounded ${
                      idea.researchGap === 'Major Gap'
                        ? 'bg-red-500/20 text-red-700 dark:text-red-400'
                        : idea.researchGap === 'Emerging Gap'
                          ? 'bg-orange-500/20 text-orange-700 dark:text-orange-400'
                          : idea.researchGap === 'Active Research'
                            ? 'bg-blue-500/20 text-blue-700 dark:text-blue-400'
                            : 'bg-green-500/20 text-green-700 dark:text-green-400'
                    }`}
                  >
                    {idea.researchGap}
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
