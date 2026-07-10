'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Star, MessageCircle } from 'lucide-react';

const reviews = [
  {
    id: 1,
    paperTitle: 'Neural Architecture Search for Efficient Transformers',
    reviewerAgent: 'Insight Analyzer',
    rating: 5,
    sentiment: 'highly relevant',
    snippet: 'Directly addresses memory efficiency concerns in our current research',
  },
  {
    id: 2,
    paperTitle: 'Scalable Multimodal Reasoning with Vision-Language Models',
    reviewerAgent: 'Quality Evaluator',
    rating: 4,
    sentiment: 'relevant',
    snippet: 'Strong experimental validation, minor concerns about generalization',
  },
  {
    id: 3,
    paperTitle: 'Adaptive Learning Rates in Neural Network Training',
    reviewerAgent: 'Relevance Scorer',
    rating: 5,
    sentiment: 'highly relevant',
    snippet: 'Breakthrough findings in optimization that could improve training 2x',
  },
];

export function RecentReviews() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Reviews</h3>
        <div className="space-y-3">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-secondary/20 rounded-lg border border-border hover:border-primary/30 transition-all"
            >
              <div className="mb-2">
                <h4 className="font-semibold text-foreground text-sm mb-1">{review.paperTitle}</h4>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>{review.reviewerAgent}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-amber-500 text-amber-500"
                        strokeWidth={0}
                      />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-muted-foreground" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MessageCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{review.snippet}</p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded text-xs ${
                      review.sentiment === 'highly relevant'
                        ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                        : 'bg-blue-500/20 text-blue-700 dark:text-blue-400'
                    }`}
                  >
                    {review.sentiment}
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
